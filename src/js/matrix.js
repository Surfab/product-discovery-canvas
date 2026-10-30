// matrix.js — Impact vs Effort 2x2 matrix render + drag.



const EFFORT_TO_X = { S: 25, M: 50, L: 75 };
const IMPACT_TO_Y = { high: 25, medium: 50, low: 75 };

function renderMatrix() {
    // REFACTOR M5: render solo se visibile (anche al toggle si chiama renderMatrix)
    if (!uiState.matrixOpen) return;
    const grid = $('#matrix-grid');
    if (!grid) return;
    grid.querySelectorAll('.matrix-item').forEach(i => i.remove());
    canvasData.solutions.filter(s => s.name).forEach(s => {
        const hasCustomPos = Number.isFinite(Number(s.matrixX)) && Number.isFinite(Number(s.matrixY)) && s.manuallyPositioned;
        if (!hasCustomPos) {
            s.matrixX = EFFORT_TO_X[s.effort] ?? 50;
            s.matrixY = IMPACT_TO_Y[s.impact] ?? 50;
        }
        const item = document.createElement('div');
        item.className = 'matrix-item';
        item.textContent = s.name;
        item.style.left = s.matrixX + '%';
        item.style.top = s.matrixY + '%';
        grid.appendChild(item);
        enableMatrixDrag(item, grid, s);
    });
}

function enableMatrixDrag(item, grid, solution) {
    item.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        item.setPointerCapture?.(event.pointerId);
        const onMove = (e) => {
            const rect = grid.getBoundingClientRect();
            solution.matrixX = clamp(((e.clientX - rect.left) / rect.width) * 100, 2, 98);
            solution.matrixY = clamp(((e.clientY - rect.top) / rect.height) * 100, 2, 98);
            solution.manuallyPositioned = true;
            item.style.left = solution.matrixX + '%';
            item.style.top = solution.matrixY + '%';
        };
        const onUp = () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
            window.removeEventListener('pointercancel', onUp);
            item.releasePointerCapture?.(event.pointerId);
            scheduleAutosave(); // salva la posizione custom
        };
        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
        window.addEventListener('pointercancel', onUp);
    });
}

function setMatrixOpen(open) {
    uiState.matrixOpen = open;
    $('#matrix-container').classList.toggle('active', open);
    if (open) renderMatrix();
    saveUIState();
}
function toggleMatrix() { setMatrixOpen(!uiState.matrixOpen); }
