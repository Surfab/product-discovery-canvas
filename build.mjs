// build.mjs — genera index.html (file unico, offline) a partire da src/.
// Uso: node build.mjs   (nessuna dipendenza npm)
//
// - inline di src/styles.css e src/fonts.css (font woff2 convertiti in data URI)
// - concatena gli <script src="js/..."> di src/index.html, nello stesso ordine,
//   dentro un'unica IIFE in strict mode
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'src';
const read = (p) => readFileSync(join(SRC, p), 'utf8');

let html = read('index.html');

const fontsCss = read('fonts.css').replace(/url\("(fonts\/[^"]+\.woff2)"\)/g, (_, p) =>
    `url("data:font/woff2;base64,${readFileSync(join(SRC, p)).toString('base64')}")`);
html = html.replace('<link rel="stylesheet" href="fonts.css">', () => `<style>\n${fontsCss}</style>`);
html = html.replace('<link rel="stylesheet" href="styles.css">', () => `<style>\n${read('styles.css')}</style>`);

const scriptTags = [...html.matchAll(/^ *<script src="(js\/[^"]+)"><\/script>\n/gm)];
if (scriptTags.length === 0) throw new Error('Nessun <script src="js/..."> trovato in src/index.html');
const modules = scriptTags.map(([, p]) => `// ─── src/${p} ───\n${read(p)}`).join('');
const bundle = `    <script>\n(function(){\n'use strict';\n${modules}})();\n</script>\n`;
html = html.replace(scriptTags.map(m => m[0]).join(''), () => bundle);

const banner = '<!-- File generato da build.mjs a partire da src/. Non modificarlo a mano: modifica src/ e rilancia `node build.mjs`. -->\n';
html = html.replace(/^<!DOCTYPE html>\n/i, (d) => d + banner);

writeFileSync('index.html', html);
console.log(`index.html generato: ${scriptTags.length} moduli, ${(html.length / 1024).toFixed(0)} KB`);
