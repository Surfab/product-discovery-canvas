// collections.js — Factory + CRUD per le 6 collezioni (~250 righe duplicate ridotte a una).
// Espone: COLLECTIONS (definitions), renderCollection, renderAll, CRUD raw, reorder.
// NON sa nulla di confirm dialog né undo — quelli sono orchestrati in events.js.





const ID_REF_FIELDS = new Set(['opportunityId', 'solutionId', 'experimentId']);
const DND_COLLECTIONS = new Set(['personas', 'opportunities', 'solutions', 'assumptions', 'experiments']);

// Ogni collezione dichiara: defaults() per i campi del nuovo item, renderItem(item) per la card HTML,
// e (opzionale) onAfterUpdate/onAfterRemove per side-effect (matrix refresh, ecc.)
const COLLECTIONS = {
    personas: {
        defaults: () => ({ name: '', segment: '', painpoints: '' }),
        renderItem: (p) => `
            <div class="item">
                <div class="item-row">
                    <input type="text" placeholder="${escapeHtml(t('ph_persona_name'))}" value="${escapeHtml(p.name)}" data-coll="personas" data-id="${p.id}" data-field="name">
                    <button class="delete-btn" data-action="delete" data-coll="personas" data-id="${p.id}" aria-label="${escapeHtml(t('aria_delete'))}">×</button>
                </div>
                <input type="text" placeholder="${escapeHtml(t('ph_persona_segment'))}" value="${escapeHtml(p.segment)}" data-coll="personas" data-id="${p.id}" data-field="segment">
                <input type="text" placeholder="${escapeHtml(t('ph_persona_painpoints'))}" value="${escapeHtml(p.painpoints)}" data-coll="personas" data-id="${p.id}" data-field="painpoints">
            </div>`
    },
    opportunities: {
        defaults: () => ({ text: '', priority: 'medium' }),
        renderItem: (o) => `
            <div class="item" data-item-id="${o.id}">
                <div class="item-row">
                    <input type="text" placeholder="${escapeHtml(t('ph_opportunity_text'))}" value="${escapeHtml(o.text)}" data-coll="opportunities" data-id="${o.id}" data-field="text">
                    <button class="delete-btn" data-action="delete" data-coll="opportunities" data-id="${o.id}" aria-label="${escapeHtml(t('aria_delete'))}">×</button>
                </div>
                <div class="item-controls">
                    <select data-coll="opportunities" data-id="${o.id}" data-field="priority">
                        <option value="high" ${o.priority === 'high' ? 'selected' : ''}>${escapeHtml(t('prio_high'))}</option>
                        <option value="medium" ${o.priority === 'medium' ? 'selected' : ''}>${escapeHtml(t('prio_medium'))}</option>
                        <option value="low" ${o.priority === 'low' ? 'selected' : ''}>${escapeHtml(t('prio_low'))}</option>
                    </select>
                    <span class="priority-badge priority-${o.priority}">${escapeHtml(o.priority.toUpperCase())}</span>
                </div>
            </div>`,
        // REFACTOR M2: aggiorna SOLO il badge invece di ri-renderizzare la lista
        // (preserva il focus su input vicini)
        onAfterUpdate(item, field) {
            if (field === 'priority') {
                const row = $(`.item[data-item-id="${item.id}"]`);
                const badge = row?.querySelector('.priority-badge');
                if (badge) {
                    badge.className = `priority-badge priority-${item.priority}`;
                    badge.textContent = item.priority.toUpperCase();
                }
            }
        }
    },
    solutions: {
        defaults: () => ({ name: '', description: '', effort: 'M', impact: 'medium', matrixX: 50, matrixY: 50, manuallyPositioned: false }),
        renderItem: (s) => `
            <div class="item">
                <div class="item-row">
                    <input type="text" placeholder="${escapeHtml(t('ph_solution_name'))}" value="${escapeHtml(s.name)}" data-coll="solutions" data-id="${s.id}" data-field="name">
                    <button class="delete-btn" data-action="delete" data-coll="solutions" data-id="${s.id}" aria-label="${escapeHtml(t('aria_delete'))}">×</button>
                </div>
                <input type="text" placeholder="${escapeHtml(t('ph_solution_description'))}" value="${escapeHtml(s.description)}" data-coll="solutions" data-id="${s.id}" data-field="description">
                <div class="item-controls">
                    <select data-coll="solutions" data-id="${s.id}" data-field="effort">
                        <option value="S" ${s.effort === 'S' ? 'selected' : ''}>Effort: S</option>
                        <option value="M" ${s.effort === 'M' ? 'selected' : ''}>Effort: M</option>
                        <option value="L" ${s.effort === 'L' ? 'selected' : ''}>Effort: L</option>
                    </select>
                    <select data-coll="solutions" data-id="${s.id}" data-field="impact">
                        <option value="low" ${s.impact === 'low' ? 'selected' : ''}>Impact: ${escapeHtml(t('impact_low'))}</option>
                        <option value="medium" ${s.impact === 'medium' ? 'selected' : ''}>Impact: ${escapeHtml(t('impact_medium'))}</option>
                        <option value="high" ${s.impact === 'high' ? 'selected' : ''}>Impact: ${escapeHtml(t('impact_high'))}</option>
                    </select>
                </div>
            </div>`,
        onAfterUpdate(item, field) {
            // Comportamento confermato: cambiare effort/impact resetta il drag manuale
            if (field === 'effort' || field === 'impact') {
                item.manuallyPositioned = false;
                renderMatrix();
            } else if (field === 'name') {
                // Il nome appare anche in matrice e nelle connections
                renderMatrix();
                if (uiState.connectionsOpen) renderCollection('connections');
            }
        },
        onAfterRemove() {
            renderMatrix();
            if (uiState.connectionsOpen) renderCollection('connections');
        }
    },
    assumptions: {
        defaults: () => ({ text: '', risk: 'medium', type: 'desirability' }),
        renderItem: (a) => `
            <div class="item">
                <div class="item-row">
                    <input type="text" placeholder="${escapeHtml(t('ph_assumption_text'))}" value="${escapeHtml(a.text)}" data-coll="assumptions" data-id="${a.id}" data-field="text">
                    <button class="delete-btn" data-action="delete" data-coll="assumptions" data-id="${a.id}" aria-label="${escapeHtml(t('aria_delete'))}">×</button>
                </div>
                <div class="item-controls">
                    <select data-coll="assumptions" data-id="${a.id}" data-field="type">
                        <option value="desirability" ${a.type === 'desirability' ? 'selected' : ''}>Desirability</option>
                        <option value="feasibility" ${a.type === 'feasibility' ? 'selected' : ''}>Feasibility</option>
                        <option value="viability" ${a.type === 'viability' ? 'selected' : ''}>Viability</option>
                    </select>
                    <select data-coll="assumptions" data-id="${a.id}" data-field="risk">
                        <option value="critical" ${a.risk === 'critical' ? 'selected' : ''}>${escapeHtml(t('risk_critical'))}</option>
                        <option value="high" ${a.risk === 'high' ? 'selected' : ''}>${escapeHtml(t('risk_high'))}</option>
                        <option value="medium" ${a.risk === 'medium' ? 'selected' : ''}>${escapeHtml(t('risk_medium'))}</option>
                        <option value="low" ${a.risk === 'low' ? 'selected' : ''}>${escapeHtml(t('risk_low'))}</option>
                    </select>
                </div>
            </div>`
    },
    experiments: {
        defaults: () => ({ name: '', method: '', duration: '', success: '' }),
        renderItem: (e) => `
            <div class="item">
                <div class="item-row">
                    <input type="text" placeholder="${escapeHtml(t('ph_experiment_name'))}" value="${escapeHtml(e.name)}" data-coll="experiments" data-id="${e.id}" data-field="name">
                    <button class="delete-btn" data-action="delete" data-coll="experiments" data-id="${e.id}" aria-label="${escapeHtml(t('aria_delete'))}">×</button>
                </div>
                <input type="text" placeholder="${escapeHtml(t('ph_experiment_method'))}" value="${escapeHtml(e.method)}" data-coll="experiments" data-id="${e.id}" data-field="method">
                <input type="text" placeholder="${escapeHtml(t('ph_experiment_duration'))}" value="${escapeHtml(e.duration)}" data-coll="experiments" data-id="${e.id}" data-field="duration">
                <input type="text" placeholder="${escapeHtml(t('ph_experiment_success'))}" value="${escapeHtml(e.success)}" data-coll="experiments" data-id="${e.id}" data-field="success">
            </div>`,
        onAfterUpdate(item, field) {
            if (field === 'name' && uiState.connectionsOpen) renderCollection('connections');
        }
    },
    connections: {
        defaults: () => ({ opportunityId: null, solutionId: null, experimentId: null }),
        renderItem: (c) => {
            const oppOpts = canvasData.opportunities.map(o => `<option value="${o.id}" ${c.opportunityId === o.id ? 'selected' : ''}>${escapeHtml(o.text || 'N/A')}</option>`).join('');
            const solOpts = canvasData.solutions.map(s => `<option value="${s.id}" ${c.solutionId === s.id ? 'selected' : ''}>${escapeHtml(s.name || 'N/A')}</option>`).join('');
            const expOpts = canvasData.experiments.map(e => `<option value="${e.id}" ${c.experimentId === e.id ? 'selected' : ''}>${escapeHtml(e.name || 'N/A')}</option>`).join('');
            return `
                <div class="connection-item">
                    <select class="connection-select" data-coll="connections" data-id="${c.id}" data-field="opportunityId">
                        <option value="">${escapeHtml(t('select_opportunity'))}</option>${oppOpts}
                    </select>
                    <span class="connection-arrow">→</span>
                    <select class="connection-select" data-coll="connections" data-id="${c.id}" data-field="solutionId">
                        <option value="">${escapeHtml(t('select_solution'))}</option>${solOpts}
                    </select>
                    <span class="connection-arrow">→</span>
                    <select class="connection-select" data-coll="connections" data-id="${c.id}" data-field="experimentId">
                        <option value="">${escapeHtml(t('select_experiment'))}</option>${expOpts}
                    </select>
                    <button class="delete-btn" data-action="delete" data-coll="connections" data-id="${c.id}" aria-label="${escapeHtml(t('aria_delete'))}">×</button>
                </div>`;
        }
    }
};

function renderCollection(name) {
    const list = $(`#${name}-list`);
    if (!list) return;
    // REFACTOR P11: render connections solo se visibile (evita lavoro a vuoto)
    if (name === 'connections' && !uiState.connectionsOpen) return;
    // REFACTOR DND: aggiunge drag-handle e data-dnd-* solo sulle collezioni riordinabili,
    // così i renderItem restano "data-only" senza preoccuparsi del drag
    const supportsDnd = DND_COLLECTIONS.has(name);
    const dragLabel = escapeHtml(t('aria_drag'));
    list.innerHTML = canvasData[name].map(item => {
        let html = COLLECTIONS[name].renderItem(item);
        if (supportsDnd) {
            html = html.replace('<div class="item"', `<div class="item" data-dnd-coll="${name}" data-dnd-id="${item.id}"`);
            const handle = `<span class="drag-handle" draggable="true" data-dnd-coll="${name}" data-dnd-id="${item.id}" aria-label="${dragLabel}" title="${dragLabel}">⋮⋮</span>`;
            html = html.replace('<div class="item-row">', `<div class="item-row">${handle}`);
        }
        return html;
    }).join('');
}

function renderAll() {
    for (const name of COLL_NAMES) renderCollection(name);
    renderMatrix();
    // Sincronizza i top-fields nel DOM
    for (const f of TOP_FIELDS) {
        const el = $(`#${f}`);
        if (el) el.value = canvasData[f] ?? '';
    }
}

// CRUD "raw" — niente confirm, niente undo: quelli sono orchestrati da events.js
function collectionAdd(name) {
    const def = COLLECTIONS[name];
    if (!def) return;
    canvasData[name].push({ id: nextId(), ...def.defaults() });
    renderCollection(name);
    // Se aggiungo opp/sol/exp, le connections devono vedere il nuovo item nei dropdown
    if (uiState.connectionsOpen && name !== 'connections') renderCollection('connections');
    scheduleAutosave();
}

function collectionUpdate(name, id, field, value) {
    const def = COLLECTIONS[name];
    if (!def) return;
    const item = canvasData[name].find(x => x.id === id);
    if (!item) return;
    item[field] = value;
    def.onAfterUpdate?.(item, field);
    scheduleAutosave();
}

function collectionDelete(name, id) {
    const def = COLLECTIONS[name];
    if (!def) return;
    canvasData[name] = canvasData[name].filter(x => x.id !== id);
    renderCollection(name);
    def.onAfterRemove?.();
    scheduleAutosave();
}

function reorderCollection(coll, srcId, targetId, before) {
    const arr = canvasData[coll];
    if (!Array.isArray(arr)) return;
    const srcIdx = arr.findIndex(x => x.id === srcId);
    if (srcIdx < 0) return;
    const [moved] = arr.splice(srcIdx, 1);
    let targetIdx = arr.findIndex(x => x.id === targetId);
    if (targetIdx < 0) targetIdx = arr.length;
    arr.splice(before ? targetIdx : targetIdx + 1, 0, moved);
    renderCollection(coll);
    scheduleAutosave();
}

function setConnectionsOpen(open) {
    uiState.connectionsOpen = open;
    $('#connections-container').classList.toggle('active', open);
    if (open) renderCollection('connections');
    saveUIState();
}
function toggleConnections() { setConnectionsOpen(!uiState.connectionsOpen); }
