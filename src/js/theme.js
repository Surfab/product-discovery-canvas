// theme.js — Dark/light theme: prefers-color-scheme + manual override persisted.


const THEME_KEY = 'canvasTheme';

function getInitialTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const toggle = $('#theme-toggle');
    if (toggle) {
        toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        toggle.setAttribute('aria-label', t('theme_label'));
        toggle.setAttribute('title', t('theme_label'));
    }
}

function toggleTheme() {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(THEME_KEY, next); } catch (_) {}
    applyTheme(next);
}

// Segue il sistema solo se non c'è un override manuale dell'utente
function watchSystemTheme(callback) {
    window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener?.('change', e => {
        if (!localStorage.getItem(THEME_KEY)) callback(e.matches ? 'dark' : 'light');
    });
}
