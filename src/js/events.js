// events.js — Event delegation + UI orchestration.
// Questo è il modulo "coordinatore": confirm dialog → operazione raw → undo snackbar.
// I moduli sottostanti (collections, modal, undo) restano puri/dichiarativi.












function switchLanguage(lang) {
    if (!setLang(lang)) return;
    try { localStorage.setItem(LANG_KEY, lang); } catch (_) {}
    $$('.lang-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
    // REFACTOR C6: textContent ovunque, niente innerHTML
    $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    renderAll();
}

// REFACTOR MODAL+UNDO: il delete combina confirm dialog + snapshot + collectionDelete + snackbar
async function handleDelete(coll, id) {
    const ok = await confirmDialog({
        title: t('modal_delete_title'),
        message: t('confirm_delete'),
        danger: true
    });
    if (!ok) return;
    const snap = snapshotState();
    collectionDelete(coll, id);
    showUndoSnackbar('snackbar_deleted', snap);
}

async function handleReset() {
    const ok = await confirmDialog({
        title: t('modal_reset_title'),
        message: t('modal_reset_msg'),
        danger: true
    });
    if (!ok) return;
    const snap = snapshotState();
    applyCanvasState(emptyState());
    renderAll();
    saveCanvas(false);
    showUndoSnackbar('snackbar_reset', snap);
}

function handleRestore() {
    const data = loadFromStorage();
    if (!data) { showToast('toast_no_save', true); return; }
    applyCanvasState(data);
    renderAll();
    showToast('toast_loaded');
}

function bindEvents() {
    // ===== CLICK =====
    document.addEventListener('click', (e) => {
        // Click sul backdrop (fuori dal dialog) annulla
        if (e.target.id === 'modal-backdrop') { closeModal(false); return; }
        const trigger = e.target.closest('[data-action]');
        if (!trigger) return;
        const action = trigger.dataset.action;
        const id = trigger.dataset.id ? Number(trigger.dataset.id) : null;
        const coll = trigger.dataset.coll;
        switch (action) {
            case 'lang': switchLanguage(trigger.dataset.lang); break;
            case 'save': saveCanvas(true); break;
            case 'restore': handleRestore(); break;
            case 'export-json': exportJSON(); break;
            case 'export-csv': exportCSV(); break;
            case 'export-pdf': exportPDF(); break;
            case 'reset': handleReset(); break;
            case 'toggle-matrix': toggleMatrix(); break;
            case 'toggle-connections': toggleConnections(); break;
            case 'toggle-presentation': togglePresentation(); break;
            case 'export-matrix-png': exportMatrixPNG(); break;
            case 'share': shareLink(); break;
            case 'template': loadTemplate(trigger.dataset.template); break;
            case 'add': collectionAdd(coll); break;
            case 'delete': handleDelete(coll, id); break;
            case 'toggle-theme': toggleTheme(); break;
            case 'undo': performUndo(); break;
            case 'modal-confirm': closeModal(true); break;
            case 'modal-cancel': closeModal(false); break;
        }
    });

    // ===== INPUT (testo): live update + autosave =====
    document.addEventListener('input', (e) => {
        const el = e.target;
        if (el.dataset.fieldTop && TOP_FIELDS.includes(el.dataset.fieldTop)) {
            canvasData[el.dataset.fieldTop] = el.value;
            scheduleAutosave();
            return;
        }
        if (el.dataset.coll && el.dataset.id && el.dataset.field && el.tagName !== 'SELECT') {
            collectionUpdate(el.dataset.coll, Number(el.dataset.id), el.dataset.field, el.value);
        }
    });

    // ===== CHANGE: solo per <select> (e file input di import) =====
    document.addEventListener('change', (e) => {
        const el = e.target;
        if (el.id === 'import-json') { importJSON(e); return; }
        if (el.tagName === 'SELECT' && el.dataset.coll && el.dataset.id && el.dataset.field) {
            const field = el.dataset.field;
            // Coercion per i campi che memorizzano riferimenti numerici (connections)
            const value = ID_REF_FIELDS.has(field) ? toIntOrNull(el.value) : el.value;
            collectionUpdate(el.dataset.coll, Number(el.dataset.id), field, value);
        }
    });

    // ===== KEYDOWN: ESC=cancel, Enter=confirm (solo quando il dialog è aperto) =====
    document.addEventListener('keydown', (e) => {
        if (!isModalOpen()) return;
        if (e.key === 'Escape') { e.preventDefault(); closeModal(false); }
        else if (e.key === 'Enter') { e.preventDefault(); closeModal(true); }
    });
}
