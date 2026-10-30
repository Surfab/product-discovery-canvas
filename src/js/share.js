// Condivisione via URL: stato compresso in #share=... nell'hash.
// Usa CompressionStream (gzip) se disponibile, altrimenti fallback a base64-url plain.

function _bytesToB64Url(bytes) {
    let s = '';
    const chunk = 0x8000;
    for (let i = 0; i < bytes.length; i += chunk) {
        s += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
    }
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function _b64UrlToBytes(str) {
    let s = str.replace(/-/g, '+').replace(/_/g, '/');
    while (s.length % 4) s += '=';
    const bin = atob(s);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
}

async function encodeShare(data) {
    const json = JSON.stringify(data);
    if (typeof CompressionStream === 'function') {
        const stream = new Blob([json]).stream().pipeThrough(new CompressionStream('gzip'));
        const buf = await new Response(stream).arrayBuffer();
        return 'g.' + _bytesToB64Url(new Uint8Array(buf));
    }
    return 'p.' + _bytesToB64Url(new TextEncoder().encode(json));
}

async function decodeShare(str) {
    if (!str || str.length < 3) return null;
    const prefix = str.slice(0, 2);
    const payload = str.slice(2);
    try {
        if (prefix === 'g.' && typeof DecompressionStream === 'function') {
            const bytes = _b64UrlToBytes(payload);
            const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
            return JSON.parse(await new Response(stream).text());
        }
        if (prefix === 'p.') {
            return JSON.parse(new TextDecoder().decode(_b64UrlToBytes(payload)));
        }
    } catch (e) {
        console.warn('decodeShare failed', e);
    }
    return null;
}

async function _copyToClipboard(text) {
    // 1. Modern Clipboard API
    if (navigator.clipboard?.writeText) {
        try { await navigator.clipboard.writeText(text); return true; } catch (_) { /* fallthrough */ }
    }
    // 2. Legacy execCommand fallback (richiede selection visibile)
    try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.cssText = 'position:fixed;left:0;top:0;width:1px;height:1px;opacity:0;pointer-events:none;';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        ta.setSelectionRange(0, text.length);
        const ok = document.execCommand('copy');
        ta.remove();
        return ok;
    } catch (_) { return false; }
}

async function shareLink() {
    try {
        const enc = await encodeShare(canvasData);
        const url = location.origin + location.pathname + '#share=' + enc;
        // Aggiorna anche la URL della finestra corrente (utile per refresh)
        history.replaceState(null, '', '#share=' + enc);
        const ok = await _copyToClipboard(url);
        if (ok) {
            showToast('toast_link_copied');
        } else {
            // Ultimo fallback: prompt nativo, l'utente può copiare con cmd+C
            window.prompt(t('btn_share'), url);
        }
    } catch (err) {
        console.error('shareLink failed', err);
        showToast('toast_link_copy_error', true);
    }
}

async function tryLoadFromHash() {
    const m = /#share=([^&]+)/.exec(location.hash);
    if (!m) return false;
    const data = await decodeShare(m[1]);
    if (!data) { showToast('toast_share_invalid', true); return false; }
    const v = validateImportedData(data);
    if (!v.ok) { showToast('toast_share_invalid', true); return false; }
    applyCanvasState(data);
    showToast('toast_share_loaded');
    return true;
}
