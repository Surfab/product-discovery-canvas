// Esporta la matrice Impact/Effort come immagine PNG renderizzata via Canvas2D.
// Non usa html2canvas (no CORS issues), disegna tutto a mano con il design system.

function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}

function exportMatrixPNG() {
    const solutions = canvasData.solutions.filter(s => s.name);
    if (!solutions.length) { showToast('toast_matrix_empty', true); return; }

    try {
        const W = 1600, H = 1100;
        const M_LEFT = 130, M_RIGHT = 90, M_TOP = 140, M_BOTTOM = 110;
        const canvas = document.createElement('canvas');
        canvas.width = W; canvas.height = H;
        const ctx = canvas.getContext('2d');

        const FONT_SANS = '"Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        const FONT_MONO = '"JetBrains Mono", ui-monospace, monospace';

        // Background
        ctx.fillStyle = '#fafaf9';
        ctx.fillRect(0, 0, W, H);

        // Eyebrow
        ctx.fillStyle = '#8a877f';
        ctx.font = '500 14px ' + FONT_MONO;
        ctx.textAlign = 'left';
        ctx.fillText('PRODUCT DISCOVERY', M_LEFT, 50);

        // Title
        ctx.fillStyle = '#1a1a18';
        ctx.font = '700 36px ' + FONT_SANS;
        ctx.fillText('Impact / Effort Matrix', M_LEFT, 92);

        // Outcome (subtitle, truncated)
        if (canvasData.outcome) {
            ctx.fillStyle = '#57544f';
            ctx.font = '400 16px ' + FONT_SANS;
            const o = canvasData.outcome.replace(/\s+/g, ' ').trim();
            const maxW = W - M_LEFT - M_RIGHT;
            let txt = o;
            while (ctx.measureText(txt).width > maxW && txt.length > 0) txt = txt.slice(0, -1);
            if (txt.length < o.length) txt = txt.slice(0, -1) + '…';
            ctx.fillText(txt, M_LEFT, 120);
        }

        // Plot area
        const px = M_LEFT, py = M_TOP, pw = W - M_LEFT - M_RIGHT, ph = H - M_TOP - M_BOTTOM;

        // Quadrant backgrounds (semantic colors molto soft)
        // Layout: SINISTRA = LOW effort, DESTRA = HIGH effort | ALTO = HIGH impact, BASSO = LOW impact
        ctx.fillStyle = 'rgba(31, 122, 75, 0.10)';  ctx.fillRect(px, py, pw/2, ph/2);                    // TL: HIGH impact / LOW effort = QUICK WINS (verde)
        ctx.fillStyle = 'rgba(176, 127, 30, 0.08)'; ctx.fillRect(px + pw/2, py, pw/2, ph/2);             // TR: HIGH impact / HIGH effort = Major Projects (giallo)
        ctx.fillStyle = 'rgba(115, 115, 110, 0.05)';ctx.fillRect(px, py + ph/2, pw/2, ph/2);             // BL: LOW impact / LOW effort = Fill-ins (grigio)
        ctx.fillStyle = 'rgba(196, 61, 61, 0.07)';  ctx.fillRect(px + pw/2, py + ph/2, pw/2, ph/2);      // BR: LOW impact / HIGH effort = AVOID (rosso)

        // Grid lines
        ctx.strokeStyle = '#d6d6d1';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(px + pw/2, py); ctx.lineTo(px + pw/2, py + ph);
        ctx.moveTo(px, py + ph/2); ctx.lineTo(px + pw, py + ph/2);
        ctx.stroke();

        // Border
        ctx.strokeStyle = '#c8c8c3';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(px, py, pw, ph);

        // Quadrant labels — TL = quick wins, TR = major, BL = fill-ins, BR = avoid
        ctx.font = '700 12px ' + FONT_MONO;
        ctx.fillStyle = '#8a877f';
        const pad = 18;
        ctx.textAlign = 'left';
        ctx.fillText('HIGH IMPACT', px + pad, py + pad + 6);
        ctx.fillText('LOW EFFORT',  px + pad, py + pad + 22);
        ctx.textAlign = 'right';
        ctx.fillText('HIGH IMPACT', px + pw - pad, py + pad + 6);
        ctx.fillText('HIGH EFFORT', px + pw - pad, py + pad + 22);
        ctx.textAlign = 'left';
        ctx.fillText('LOW IMPACT', px + pad, py + ph - pad - 18);
        ctx.fillText('LOW EFFORT', px + pad, py + ph - pad - 2);
        ctx.textAlign = 'right';
        ctx.fillText('LOW IMPACT',  px + pw - pad, py + ph - pad - 18);
        ctx.fillText('HIGH EFFORT', px + pw - pad, py + ph - pad - 2);

        // Axis labels (Effort →, Impact ↑)
        ctx.fillStyle = '#57544f';
        ctx.font = '600 14px ' + FONT_SANS;
        ctx.textAlign = 'center';
        ctx.fillText('← Low effort     EFFORT     High effort →', px + pw/2, py + ph + 48);
        ctx.save();
        ctx.translate(M_LEFT - 60, py + ph/2);
        ctx.rotate(-Math.PI/2);
        ctx.fillText('← Low impact     IMPACT     High impact →', 0, 0);
        ctx.restore();

        // Items — disegnati come pill nere col nome (gestisce overlap con stagger leggero)
        ctx.font = '600 15px ' + FONT_SANS;
        ctx.textBaseline = 'middle';

        // Helper for label truncation
        function truncate(text, maxWidth) {
            if (ctx.measureText(text).width <= maxWidth) return text;
            let t = text;
            while (ctx.measureText(t + '…').width > maxWidth && t.length > 0) t = t.slice(0, -1);
            return t + '…';
        }

        solutions.forEach((s) => {
            const mx = (Number.isFinite(s.matrixX) ? s.matrixX : 50) / 100;
            const my = (Number.isFinite(s.matrixY) ? s.matrixY : 50) / 100;
            const cx = px + pw * mx;
            const cy = py + ph * my;
            const label = truncate(s.name, 260);
            const tw = ctx.measureText(label).width;
            const padX = 14, padY = 9;
            const w = tw + padX * 2;
            const h = 17 + padY * 2;

            // Subtle drop shadow
            ctx.fillStyle = 'rgba(15, 15, 13, 0.10)';
            roundRect(ctx, cx - w/2, cy - h/2 + 3, w, h, 8);
            ctx.fill();

            // Pill
            ctx.fillStyle = '#1a1a18';
            roundRect(ctx, cx - w/2, cy - h/2, w, h, 8);
            ctx.fill();

            // Label
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.fillText(label, cx, cy + 1);
        });

        // Footer
        ctx.fillStyle = '#8a877f';
        ctx.font = '500 13px ' + FONT_SANS;
        ctx.textAlign = 'left';
        ctx.fillText('Product Discovery Canvas', M_LEFT, H - 38);
        ctx.textAlign = 'right';
        const dateStr = new Date().toLocaleDateString();
        ctx.fillText(dateStr + '  •  ' + solutions.length + (solutions.length === 1 ? ' soluzione' : ' soluzioni'), W - M_RIGHT, H - 38);

        canvas.toBlob(blob => {
            if (!blob) { showToast('toast_png_error', true); return; }
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'matrix-' + new Date().toISOString().split('T')[0] + '.png';
            document.body.appendChild(a); a.click(); a.remove();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
            showToast('toast_exported');
        }, 'image/png');
    } catch (err) {
        console.error('PNG export failed', err);
        showToast('toast_png_error', true);
    }
}
