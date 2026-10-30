// exports.js — JSON / CSV / PDF export + JSON import (with schema validation).








function triggerDownload(blob, ext) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'canvas-' + new Date().toISOString().split('T')[0] + '.' + ext;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000); // no leak della blob URL
}

function exportJSON() {
    const blob = new Blob([JSON.stringify(canvasData, null, 2)], { type: 'application/json' });
    triggerDownload(blob, 'json');
    showToast('toast_exported');
}

function exportCSV() {
    const rows = [['Section', 'Field', 'Value']];
    rows.push(['Outcome', 'Goal', canvasData.outcome]);
    rows.push(['Outcome', 'Stakeholders', canvasData.stakeholders]);
    canvasData.personas.forEach((p, i) => {
        rows.push([`Persona ${i + 1}`, 'Name', p.name]);
        rows.push([`Persona ${i + 1}`, 'Segment', p.segment]);
        rows.push([`Persona ${i + 1}`, 'Pain Points', p.painpoints]);
    });
    canvasData.opportunities.forEach((o, i) => {
        rows.push([`Opportunity ${i + 1}`, 'Text', o.text]);
        rows.push([`Opportunity ${i + 1}`, 'Priority', o.priority]);
    });
    rows.push(['JTBD', 'Jobs To Be Done', canvasData.jtbd]);
    canvasData.solutions.forEach((s, i) => {
        rows.push([`Solution ${i + 1}`, 'Name', s.name]);
        rows.push([`Solution ${i + 1}`, 'Description', s.description]);
        rows.push([`Solution ${i + 1}`, 'Effort', s.effort]);
        rows.push([`Solution ${i + 1}`, 'Impact', s.impact]);
    });
    canvasData.assumptions.forEach((a, i) => {
        rows.push([`Assumption ${i + 1}`, 'Text', a.text]);
        rows.push([`Assumption ${i + 1}`, 'Type', a.type]);
        rows.push([`Assumption ${i + 1}`, 'Risk', a.risk]);
    });
    canvasData.experiments.forEach((e, i) => {
        rows.push([`Experiment ${i + 1}`, 'Name', e.name]);
        rows.push([`Experiment ${i + 1}`, 'Method', e.method]);
        rows.push([`Experiment ${i + 1}`, 'Duration', e.duration]);
        rows.push([`Experiment ${i + 1}`, 'Success', e.success]);
    });
    rows.push(['Metrics', 'Success Metrics', canvasData.metrics]);
    const csv = rows.map(r => r.map(csvEscape).join(',')).join('\n') + '\n';
    // REFACTOR M9: BOM UTF-8 — Excel apre correttamente gli accenti
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
    triggerDownload(blob, 'csv');
    showToast('toast_exported');
}

// PDF export: usa window.print() nativo — niente più html2canvas/CORS issues.
// L'utente sceglie "Salva come PDF" dal dialog di stampa del browser.
function exportPDF() {
    const prevMatrix = uiState.matrixOpen;
    const prevConn = uiState.connectionsOpen;
    // Apri matrice + connections se hanno dati, così appaiono nel PDF
    if (canvasData.solutions.some(s => s.name)) setMatrixOpen(true);
    if (canvasData.connections.length) setConnectionsOpen(true);
    const cleanup = () => {
        setMatrixOpen(prevMatrix);
        setConnectionsOpen(prevConn);
        window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);
    // micro-delay per dare al DOM il tempo di renderizzare matrix/connections
    setTimeout(() => window.print(), 150);
}

function importJSON(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const data = safeParse(e.target.result);
        if (!data) { alert(t('json_invalid')); event.target.value = ''; return; }
        // REFACTOR VALIDATION: schema check prima di applicare
        const v = validateImportedData(data);
        if (!v.ok) { alert(t('json_schema_error', { detail: v.error })); event.target.value = ''; return; }
        applyCanvasState(data);
        renderAll();
        scheduleAutosave();
        showToast('toast_imported');
    };
    reader.readAsText(file);
    event.target.value = ''; // re-import same file possibile
}
