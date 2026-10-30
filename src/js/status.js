// status.js — Toast (top-right) + status indicator (toolbar).



let toastTimer;
function showToast(key, isError) {
    const toast = $('#toast');
    toast.textContent = t(key);
    toast.classList.toggle('error', !!isError);
    toast.style.display = 'block';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.style.display = 'none'; }, TOAST_MS);
}

// REFACTOR M10: stato di salvataggio visibile nell'indicatore (idle / saving / saved HH:MM / error)
function setStatus(state, time) {
    const el = $('#status-indicator');
    el.classList.remove('saving', 'error');
    if (state === 'saving') {
        el.classList.add('saving');
        el.textContent = t('status_saving');
    } else if (state === 'saved') {
        el.textContent = t('status_saved', { time: formatTime(time || new Date()) });
    } else if (state === 'error') {
        el.classList.add('error');
        el.textContent = t('toast_save_error');
    } else {
        el.textContent = t('status_ready');
    }
}
