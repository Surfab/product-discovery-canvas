// persistence.js — localStorage save/load + autosave (debounced 1s).



function saveCanvas(showFeedback) {
    try {
        setStatus('saving');
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...canvasData, savedAt: new Date().toISOString() }));
        setStatus('saved', new Date());
        if (showFeedback) showToast('toast_saved');
    } catch (err) {
        console.error('saveCanvas failed', err);
        setStatus('error');
        showToast('toast_save_error', true);
    }
}

// REFACTOR P7: autosave debounced 1s — chiamato da ogni mutation di canvasData
const scheduleAutosave = debounce(() => saveCanvas(false), AUTOSAVE_MS);

function loadFromStorage() {
    return safeParse(localStorage.getItem(STORAGE_KEY));
}
