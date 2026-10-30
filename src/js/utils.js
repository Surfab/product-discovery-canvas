// utils.js — Pure helpers (no DOM state, no imports).

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => root.querySelectorAll(sel);

function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
}

function toIntOrNull(value) {
    const n = Number.parseInt(value, 10);
    return Number.isNaN(n) ? null : n;
}

function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }

function csvEscape(value) {
    return `"${String(value ?? '').replace(/"/g, '""')}"`;
}

// Safe JSON.parse — niente più crash con storage corrotto o file invalidi
function safeParse(str) {
    if (!str) return null;
    try { return JSON.parse(str); } catch (err) { console.warn('JSON parse failed', err); return null; }
}

function debounce(fn, ms) {
    let to;
    return (...args) => { clearTimeout(to); to = setTimeout(() => fn(...args), ms); };
}

function formatTime(d) {
    return d.toTimeString().slice(0, 5); // HH:MM locale
}
