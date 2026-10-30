// state.js — Canvas data model, ID generator, UI state, constants.
// `canvasData` è esposto come `let` export: ES modules propagano la live binding,
// quindi i consumer vedono il nuovo riferimento dopo ogni applyCanvasState().

const STORAGE_KEY = 'productDiscoveryCanvas';
const LANG_KEY = 'canvasLanguage';
const UI_STATE_KEY = 'canvasUIState';
const AUTOSAVE_MS = 1000;
const TOAST_MS = 2500;
const COLL_NAMES = ['personas', 'opportunities', 'solutions', 'assumptions', 'experiments', 'connections'];
const TOP_FIELDS = ['outcome', 'stakeholders', 'jtbd', 'metrics'];

function emptyState() {
    return {
        outcome: '', stakeholders: '', jtbd: '', metrics: '',
        personas: [], opportunities: [], solutions: [],
        assumptions: [], experiments: [], connections: []
    };
}

let canvasData = emptyState();
const uiState = { matrixOpen: false, connectionsOpen: false };

// REFACTOR P2: counter monotono — niente più Date.now() collidibile
let idCounter = 1;
function nextId() { return idCounter++; }
function syncIdCounter(data) {
    let maxId = 0;
    for (const name of COLL_NAMES) {
        for (const item of (data[name] || [])) {
            const n = Number(item.id);
            if (Number.isFinite(n) && n > maxId) maxId = n;
        }
    }
    idCounter = maxId + 1;
}

// Sostituisce canvasData con un nuovo state validato.
// NOTA: NON ri-renderizza — il caller chiama renderAll() esplicitamente.
// Questo evita un ciclo state↔collections e rende il flusso ovvio.
function applyCanvasState(data) {
    const base = emptyState();
    for (const f of TOP_FIELDS) base[f] = typeof data[f] === 'string' ? data[f] : '';
    for (const name of COLL_NAMES) base[name] = Array.isArray(data[name]) ? data[name] : [];
    canvasData = base;
    syncIdCounter(canvasData);
}

// True se il canvas non contiene niente da perdere (usato prima di sovrascriverlo)
function isCanvasEmpty(data) {
    if (!data) return true;
    return TOP_FIELDS.every(f => !String(data[f] || '').trim())
        && COLL_NAMES.every(name => !(data[name] || []).length);
}

// Deep clone — lo stato è solo dati primitivi
function snapshotState() {
    return JSON.parse(JSON.stringify(canvasData));
}

function loadUIState() {
    const s = safeParse(localStorage.getItem(UI_STATE_KEY)) || {};
    uiState.matrixOpen = !!s.matrixOpen;
    uiState.connectionsOpen = !!s.connectionsOpen;
}
function saveUIState() {
    try { localStorage.setItem(UI_STATE_KEY, JSON.stringify(uiState)); } catch (_) {}
}
