// dnd.js — HTML5 drag & drop riordino entro la stessa lista.
// NOTA: Stage 2 sostituirà questo con un sistema pointer-based per parità touch/mobile.


let dragSrc = null;

function clearDropTargets() {
    $$('.drop-before, .drop-after').forEach(el => el.classList.remove('drop-before', 'drop-after'));
}

function bindDragAndDrop() {
    document.addEventListener('dragstart', (e) => {
        const handle = e.target.closest('.drag-handle[draggable="true"]');
        if (!handle) return;
        const coll = handle.dataset.dndColl;
        const id = Number(handle.dataset.dndId);
        const item = handle.closest('.item');
        if (!item) return;
        dragSrc = { coll, id, element: item };
        item.classList.add('dragging');
        try {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', String(id)); // richiesto da Firefox
            e.dataTransfer.setDragImage(item, 10, 10); // preview = card intera, non l'handle
        } catch (_) {}
    });

    document.addEventListener('dragend', () => {
        if (dragSrc?.element) dragSrc.element.classList.remove('dragging');
        clearDropTargets();
        dragSrc = null;
    });

    document.addEventListener('dragover', (e) => {
        if (!dragSrc) return;
        const target = e.target.closest('.item[data-dnd-coll]');
        if (!target || target === dragSrc.element || target.dataset.dndColl !== dragSrc.coll) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        const rect = target.getBoundingClientRect();
        const before = (e.clientY - rect.top) < rect.height / 2;
        clearDropTargets();
        target.classList.add(before ? 'drop-before' : 'drop-after');
    });

    document.addEventListener('drop', (e) => {
        if (!dragSrc) return;
        const target = e.target.closest('.item[data-dnd-coll]');
        clearDropTargets();
        if (!target || target === dragSrc.element || target.dataset.dndColl !== dragSrc.coll) return;
        e.preventDefault();
        const rect = target.getBoundingClientRect();
        const before = (e.clientY - rect.top) < rect.height / 2;
        reorderCollection(dragSrc.coll, dragSrc.id, Number(target.dataset.dndId), before);
    });
}
