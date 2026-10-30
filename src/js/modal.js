// modal.js — Custom confirm dialog (Promise-based, replaces native confirm()).
// API: const ok = await confirmDialog({ title, message, confirmText, cancelText, danger });


const modalState = { resolver: null, lastFocus: null };

function confirmDialog({ title, message, confirmText, cancelText, danger } = {}) {
    const backdrop = $('#modal-backdrop');
    $('#modal-title').textContent = title || t('modal_confirm');
    $('#modal-body').textContent = message || '';
    const confirmBtn = $('#modal-confirm');
    const cancelBtn = $('#modal-cancel');
    confirmBtn.textContent = confirmText || t('modal_confirm');
    cancelBtn.textContent = cancelText || t('modal_cancel');
    // Variante pericolosa: bottone primario rosso
    confirmBtn.classList.toggle('btn-danger', !!danger);
    confirmBtn.classList.toggle('btn-primary', !danger);
    modalState.lastFocus = document.activeElement;
    backdrop.classList.add('visible');
    confirmBtn.focus({ preventScroll: true });
    return new Promise(resolve => { modalState.resolver = resolve; });
}

function closeModal(result) {
    $('#modal-backdrop').classList.remove('visible');
    const r = modalState.resolver;
    modalState.resolver = null;
    if (r) r(result);
    const lf = modalState.lastFocus;
    modalState.lastFocus = null;
    if (lf && typeof lf.focus === 'function') {
        try { lf.focus({ preventScroll: true }); } catch (_) {}
    }
}

function isModalOpen() {
    return $('#modal-backdrop').classList.contains('visible');
}
