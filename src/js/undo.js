// undo.js — Snapshot deep-clone + 5s countdown snackbar + restore on click.
// Il caller passa lo snapshot già pronto; questo modulo gestisce solo la UI dello snackbar
// e il restore. Non sa NIENTE di delete/reset/altre operazioni — è generico.






const UNDO_MS = 5000;
const undoState = { snapshot: null, timer: null };

function showUndoSnackbar(messageKey, snapshot) {
    undoState.snapshot = snapshot;
    const bar = $('#snackbar');
    $('#snackbar-msg').textContent = t(messageKey);
    $('#snackbar-action').textContent = t('snackbar_undo');
    bar.classList.add('visible');
    // Reset dell'animazione della progress bar (force reflow)
    const prog = $('#snackbar-progress');
    prog.style.animation = 'none';
    void prog.offsetWidth;
    prog.style.animation = `snackbarProgress ${UNDO_MS}ms linear forwards`;
    clearTimeout(undoState.timer);
    undoState.timer = setTimeout(hideUndoSnackbar, UNDO_MS);
}

function hideUndoSnackbar() {
    $('#snackbar').classList.remove('visible');
    clearTimeout(undoState.timer);
    undoState.timer = null;
    undoState.snapshot = null;
}

function performUndo() {
    if (!undoState.snapshot) { hideUndoSnackbar(); return; }
    applyCanvasState(undoState.snapshot);
    renderAll();
    hideUndoSnackbar();
    scheduleAutosave();
    showToast('toast_undo');
}
