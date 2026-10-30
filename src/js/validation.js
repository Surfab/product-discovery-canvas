// validation.js — Schema check on imported JSON.
// Validazione "soft": accetta campi extra (forward-compatible), rifiuta solo tipi sbagliati o enum fuori range.

const ITEM_SCHEMA = {
    personas:      { strings: ['name', 'segment', 'painpoints'] },
    opportunities: { strings: ['text'], enums: { priority: ['high', 'medium', 'low'] } },
    solutions:     { strings: ['name', 'description'], enums: { effort: ['S', 'M', 'L'], impact: ['low', 'medium', 'high'] } },
    assumptions:   { strings: ['text'], enums: { risk: ['critical', 'high', 'medium', 'low'], type: ['desirability', 'feasibility', 'viability'] } },
    experiments:   { strings: ['name', 'method', 'duration', 'success'] },
    connections:   {} // solo riferimenti numerici, controllati lato render
};

function validateImportedData(data) {
    if (typeof data !== 'object' || data === null || Array.isArray(data)) {
        return { ok: false, error: 'root must be an object' };
    }
    for (const f of TOP_FIELDS) {
        if (data[f] !== undefined && typeof data[f] !== 'string') {
            return { ok: false, error: `"${f}" must be a string` };
        }
    }
    for (const [name, schema] of Object.entries(ITEM_SCHEMA)) {
        if (data[name] === undefined) continue;
        if (!Array.isArray(data[name])) return { ok: false, error: `"${name}" must be an array` };
        for (let i = 0; i < data[name].length; i++) {
            const item = data[name][i];
            if (typeof item !== 'object' || item === null) {
                return { ok: false, error: `${name}[${i}] must be an object` };
            }
            for (const s of (schema.strings || [])) {
                if (item[s] !== undefined && typeof item[s] !== 'string') {
                    return { ok: false, error: `${name}[${i}].${s} must be a string` };
                }
            }
            for (const [key, allowed] of Object.entries(schema.enums || {})) {
                if (item[key] !== undefined && !allowed.includes(item[key])) {
                    return { ok: false, error: `${name}[${i}].${key} must be one of: ${allowed.join(', ')}` };
                }
            }
        }
    }
    return { ok: true };
}
