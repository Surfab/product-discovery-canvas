// Modalità presentazione: read-only fullscreen del canvas per show-and-tell.
// Toggle via bottone o tasto P. ESC esce. Sincronizza con fullscreen API.

const PRESENT_CLASS = 'presentation-mode';

function isPresenting() { return document.body.classList.contains(PRESENT_CLASS); }

function enterPresentation() {
    if (isPresenting()) return;
    document.body.classList.add(PRESENT_CLASS);
    // Apri matrice + connections se hanno dati, così il pubblico li vede
    if (canvasData.solutions.some(s => s.name) && !uiState.matrixOpen) setMatrixOpen(true);
    if (canvasData.connections.length && !uiState.connectionsOpen) setConnectionsOpen(true);
    // Fullscreen API (best-effort, può fallire se l'utente non ha gestureato di recente)
    const el = document.documentElement;
    const req = el.requestFullscreen || el.webkitRequestFullscreen;
    try { req?.call(el)?.catch?.(() => {}); } catch (_) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function exitPresentation() {
    if (!isPresenting()) return;
    document.body.classList.remove(PRESENT_CLASS);
    const exit = document.exitFullscreen || document.webkitExitFullscreen;
    try { exit?.call(document)?.catch?.(() => {}); } catch (_) {}
}

function togglePresentation() {
    if (isPresenting()) exitPresentation();
    else enterPresentation();
}

// Se l'utente esce dal fullscreen via ESC del browser, allinea lo stato
function bindPresentationSync() {
    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement && isPresenting()) {
            document.body.classList.remove(PRESENT_CLASS);
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isPresenting()) {
            e.preventDefault();
            exitPresentation();
        }
    });
}
