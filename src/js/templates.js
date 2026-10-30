// templates.js — pre-filled templates (fintech, legaltech, saas).
// Gli ID vengono assegnati al momento del load via nextId() — niente più Date.now() collidibili.




const TEMPLATES = {
    fintech: {
        outcome: 'Aumentare la conversion da signup a primo pagamento del 25% nei prossimi 3 mesi',
        stakeholders: 'Product Manager, Growth Team, Compliance',
        jtbd: 'Quando apro un conto corrente online, voglio completare KYC in meno di 5 minuti, così che posso iniziare a usare la carta immediatamente',
        metrics: 'Time to first transaction: da 48h a 10 minuti | Tasso completamento KYC: da 60% a 85% | NPS onboarding: da 40 a 65',
        personas: [{ name: 'Laura, Freelance 32 anni', segment: 'Millennial con partita IVA, tech-savvy', painpoints: 'Documenti cartacei, tempi lunghi' }],
        opportunities: [{ text: 'Processo KYC richiede troppi documenti e upload multipli', priority: 'high' }],
        solutions: [{ name: 'OCR automatico per documento identità', description: 'Scan con camera smartphone + AI validation', effort: 'M', impact: 'high', matrixX: 35, matrixY: 20, manuallyPositioned: true }],
        assumptions: [{ text: 'Gli utenti preferiscono scan automatico rispetto a upload manuale foto', risk: 'high', type: 'desirability' }],
        experiments: [{ name: 'Prototype test OCR con 20 utenti', method: 'Usability test su prototipo Figma', duration: '1 settimana', success: '>80% completano processo, <3 minuti tempo medio' }],
        connections: []
    },
    legaltech: {
        outcome: 'Ridurre il tempo di review contratti da 45 a 15 minuti per gli avvocati partner',
        stakeholders: 'Head of Legal, Partner Studio, IT',
        jtbd: 'Quando analizzo un contratto commerciale, voglio identificare automaticamente clausole rischiose, così che posso focalizzarmi solo sui punti critici',
        metrics: 'Tempo review: da 45 a 15 min | Clausole rischiose identificate: 95% accuracy | Adozione tool: 80% avvocati entro 2 mesi',
        personas: [{ name: 'Marco, Senior Associate', segment: 'Avvocato 5+ anni esperienza, gestisce 20+ contratti/settimana', painpoints: 'Lettura ripetitiva, rischio di oversight, deadline stretti' }],
        opportunities: [{ text: 'Avvocati perdono tempo su clausole standard invece di focalizzarsi su custom', priority: 'high' }],
        solutions: [{ name: 'AI clause analyzer con highlight rischi', description: 'NLP per categorizzare clausole + risk scoring', effort: 'L', impact: 'high', matrixX: 75, matrixY: 25, manuallyPositioned: true }],
        assumptions: [{ text: 'Avvocati si fidano dei suggerimenti AI se spiegati con rationale', risk: 'critical', type: 'desirability' }],
        experiments: [{ name: 'Pilot con 5 studi legali partner', method: 'Beta test 30 giorni con feedback settimanale', duration: '1 mese', success: 'NPS >50, 70% adozione daily use' }],
        connections: []
    },
    saas: {
        outcome: 'Aumentare MRR del 30% migliorando upsell da piano base a premium',
        stakeholders: 'VP Product, Customer Success, Sales',
        jtbd: 'Quando il mio team cresce oltre 10 persone, voglio funzionalità avanzate di permessi, così che posso delegare senza perdere controllo',
        metrics: 'Upgrade rate: da 8% a 15% | ARPU: da €49 a €75 | Time to upgrade: da 90 a 45 giorni',
        personas: [{ name: 'Sofia, Operations Manager', segment: 'PMI 10-50 dipendenti, usa tool da 6+ mesi', painpoints: 'Limiti piano base bloccano crescita, non chiaro valore premium' }],
        opportunities: [{ text: 'Utenti non capiscono quali feature premium risolverebbero i loro problemi', priority: 'high' }],
        solutions: [{ name: 'In-app upgrade prompts contestuali', description: 'Mostra CTA upgrade quando utente raggiunge limite piano', effort: 'S', impact: 'medium', matrixX: 25, matrixY: 50, manuallyPositioned: true }],
        assumptions: [{ text: 'Utenti accettano di upgradare se vedono ROI immediato (es: sblocco team member)', risk: 'medium', type: 'viability' }],
        experiments: [{ name: 'A/B test su prompt upgrade', method: 'A: no prompt | B: prompt contestuale | C: prompt + trial 14gg', duration: '3 settimane', success: 'Variant con >12% upgrade rate vince' }],
        connections: []
    },
    ecommerce: {
        outcome: 'Ridurre il cart abandonment del 15% migliorando il checkout su mobile entro Q3',
        stakeholders: 'Head of E-commerce, UX Lead, CRO Team, Mobile Engineering',
        jtbd: 'Quando faccio shopping dal telefono nei ritagli di tempo, voglio completare il pagamento in pochi tap, così che non perdo il carrello cambiando contesto',
        metrics: 'Cart abandonment: da 72% a 60% | Mobile conversion rate: da 1.8% a 2.8% | Checkout time medio: da 3 min a 90 sec | Wallet payments: da 12% a 35%',
        personas: [{ name: 'Giulia, 28 anni — Mobile shopper', segment: 'Millennial, acquista in pausa pranzo o sul divano', painpoints: 'Checkout lunghi, form con tastiera, dover ricordare password' }],
        opportunities: [
            { text: 'Form di checkout con troppi campi obbligatori e tastiera tipo testo dove serve numerica', priority: 'high' },
            { text: 'Utenti non riconoscono che possono pagare in 1 tap con Apple/Google Pay', priority: 'medium' }
        ],
        solutions: [
            { name: 'One-tap checkout con guest mode', description: 'Apple/Google Pay in primo piano + checkout senza account', effort: 'M', impact: 'high', matrixX: 30, matrixY: 22, manuallyPositioned: true },
            { name: 'Autocomplete indirizzo + tastiera dinamica', description: 'Google Places API + input mode adattivo per CVV/CAP', effort: 'S', impact: 'medium', matrixX: 22, matrixY: 48, manuallyPositioned: true }
        ],
        assumptions: [
            { text: 'Gli utenti mobile preferiscono guest checkout rispetto a creare un account', risk: 'high', type: 'desirability' },
            { text: 'Apple Pay è accettato come trust signal sufficiente per acquisti >100€', risk: 'medium', type: 'desirability' }
        ],
        experiments: [{ name: 'A/B test guest checkout', method: 'Split test su 20% traffico mobile: A=signup forzato vs B=guest opzionale', duration: '2 settimane', success: 'Variant B con >2.5% mobile conversion + cart abandonment <65%' }],
        connections: []
    },
    healthcare: {
        outcome: 'Aumentare l\'aderenza terapeutica del 30% nei pazienti cronici con app companion entro 12 mesi',
        stakeholders: 'Medical Director, Compliance & GDPR, Patient Advocacy, Pharma Partner',
        jtbd: 'Quando devo prendere farmaci ogni giorno per una condizione cronica, voglio un sistema che mi ricordi al momento giusto e capisca il mio contesto, così che non salto dosi e mantengo la terapia',
        metrics: 'Aderenza terapeutica auto-riportata: da 50% a 80% | Refill puntuali in farmacia: +40% | Visite di routine completate: +25% | NPS 30gg post-dimissioni: >50',
        personas: [
            { name: 'Carlo, 65 anni — Paziente diabetico T2', segment: 'Senior, smartphone basic-user, pensionato', painpoints: 'Dimentica dosi in giornate fuori routine, difficoltà con notifiche multiple, non si fida delle app' },
            { name: 'Marta, 42 anni — Caregiver figlia', segment: 'Adulto attivo che assiste un genitore', painpoints: 'Non sa se la madre ha preso i farmaci, ansia, telefonate continue' }
        ],
        opportunities: [
            { text: 'I reminder generici (sveglia alle 8) vengono ignorati quando la routine cambia (viaggio, festa)', priority: 'high' },
            { text: 'I caregiver familiari non hanno visibilità sull\'aderenza senza chiamate continue', priority: 'medium' }
        ],
        solutions: [
            { name: 'Smart reminder con conferma dose', description: 'Notifica contestuale (no GPS, calendario opzionale) con conferma "presa / saltata / posticipata"', effort: 'L', impact: 'high', matrixX: 65, matrixY: 18, manuallyPositioned: true },
            { name: 'Dashboard caregiver in lettura', description: 'Vista web read-only condivisa con familiare, alert solo su salti ripetuti', effort: 'M', impact: 'medium', matrixX: 45, matrixY: 42, manuallyPositioned: true }
        ],
        assumptions: [
            { text: 'I pazienti senior accettano notifiche multiple al giorno se ben designed e con un solo tap di conferma', risk: 'critical', type: 'desirability' },
            { text: 'I caregiver vogliono solo alert su anomalie, non report quotidiani', risk: 'medium', type: 'desirability' }
        ],
        experiments: [{ name: 'Pilot con studio medico partner', method: 'Beta su 30 pazienti diabetici per 60 giorni, telefonate settimanali strutturate', duration: '2 mesi', success: 'Aderenza self-reported >75% in 60gg e drop-out <20%' }],
        connections: []
    },
    aiml: {
        outcome: 'Lanciare un AI assistant interno con >70% di query business risolte autonomamente entro Q2',
        stakeholders: 'CTO, Data Science Team, Customer Support Lead, Privacy Officer',
        jtbd: 'Quando ho una domanda sui dati aziendali (vendite, churn, performance), voglio una risposta affidabile in linguaggio naturale con fonti citate, così che non devo aprire un ticket al data team',
        metrics: 'Query risolte autonomamente: >70% | Hallucination rate misurato: <5% | Time-to-answer: <10 sec p95 | NPS utenti business: >45 | Ticket al data team: -50%',
        personas: [{ name: 'Sara, Sales Manager', segment: 'Manager business, no SQL, decisioni data-driven', painpoints: 'Dashboard troppo rigide, dipendenza dal data team, attese lunghe per domande non standard' }],
        opportunities: [
            { text: 'Per ogni domanda fuori dai report standard servono giorni e un ticket al data team', priority: 'high' },
            { text: 'Gli utenti non si fidano di risposte AI se non vedono la fonte del dato', priority: 'high' }
        ],
        solutions: [
            { name: 'Chat AI con accesso al data warehouse', description: 'LLM + RAG su data warehouse, ogni risposta cita la query SQL e la sorgente', effort: 'L', impact: 'high', matrixX: 78, matrixY: 20, manuallyPositioned: true },
            { name: 'Feedback loop su risposte (👍 / 👎 + nota)', description: 'Ogni risposta tracciata, le 👎 vanno in coda di review settimanale del data team', effort: 'S', impact: 'medium', matrixX: 18, matrixY: 45, manuallyPositioned: true }
        ],
        assumptions: [
            { text: 'Gli utenti business si fidano dell\'AI solo se vedono le fonti citate e possono ispezionare la query', risk: 'critical', type: 'desirability' },
            { text: 'Il modello base + RAG raggiunge <5% hallucination su domande di analytics tipiche', risk: 'critical', type: 'feasibility' }
        ],
        experiments: [{ name: 'Beta parallelo dashboard + AI', method: 'Use parallelo su 20 sales person per 4 settimane (dashboard tradizionale + AI in parallelo)', duration: '1 mese', success: 'Utilizzo settimanale >60% degli utenti beta + NPS >40 + hallucination misurato <8%' }],
        connections: []
    }
};

function loadTemplate(type) {
    const tpl = TEMPLATES[type];
    if (!tpl) return;
    const cloned = emptyState();
    for (const f of TOP_FIELDS) cloned[f] = tpl[f] || '';
    for (const name of COLL_NAMES) {
        cloned[name] = (tpl[name] || []).map(o => ({ ...o, id: nextId() }));
    }
    applyCanvasState(cloned);
    renderAll();
    scheduleAutosave();
    showToast('toast_loaded');
}
