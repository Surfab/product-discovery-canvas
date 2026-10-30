// main.js — Bootstrap dell'app: theme, state, language, UI, listeners.










function init() {
    // 1. Lingua iniziale (da localStorage)
    const lang = localStorage.getItem(LANG_KEY) || 'it';
    setLang(lang);

    // 2. Tema applicato PRIMA del primo render — evita flash bianco
    applyTheme(getInitialTheme());
    watchSystemTheme(applyTheme);

    // 3. UI state (matrice/connections aperti?)
    loadUIState();

    // 4. Stato del canvas — prima prova dall'hash di condivisione, poi da localStorage
    (async () => {
        const fromHash = await tryLoadFromHash();
        if (!fromHash) {
            const saved = loadFromStorage();
            if (saved) applyCanvasState(saved);
        }
        renderAll();

        // 5. i18n DOM (placeholder, label, ecc.)
        switchLanguage(lang);

        // 6. Ripristina visibilità sezioni opzionali
        $('#matrix-container').classList.toggle('active', uiState.matrixOpen);
        $('#connections-container').classList.toggle('active', uiState.connectionsOpen);
        if (uiState.matrixOpen) renderMatrix();
        if (uiState.connectionsOpen) renderCollection('connections');

        // 8. Status iniziale
        if (!fromHash) {
            const saved = loadFromStorage();
            if (saved?.savedAt) {
                const d = new Date(saved.savedAt);
                if (!Number.isNaN(d.getTime())) setStatus('saved', d);
            }
        }
    })();

    // 7. Listener globali
    bindEvents();
    bindDragAndDrop();
    bindPresentationSync();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
