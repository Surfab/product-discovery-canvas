# 📘 **Product Discovery Canvas - README**

## 🎯 **Overview**

**Product Discovery Canvas** is an interactive framework designed to guide the product discovery process, from defining goals to validating assumptions through concrete experiments.

Designed for Product Managers, Product Owners, AI Product Leaders and Innovation Teams who want a structured, experiment-driven discovery workflow.

> **Version 2.0** — Redesigned UI (Notion/Linear-style), bug fixes on the Impact/Effort matrix, new export options (PNG, URL sharing), presentation mode, and 6 pre-filled templates.

🌍 Live demo: https://surfab.github.io/product-discovery-canvas/

<img width="2760" height="2328" alt="product_discovery_canvas" src="https://github.com/user-attachments/assets/41614cbf-4175-4210-a50b-9821bb05cb21" />


---

## ✨ **Key Features**

### 🌐 **Multilingual**

* Italian and English with instant switch
* Elegant selector in the top right corner (🇮🇹 ITA / 🇬🇧 ENG)
* All labels, placeholders, and messages translated
* Language automatically saved in the browser

### 🎨 **Redesigned UI (v2)**

* Neutral warm palette — off-white `#fafaf9`, texts `#1a1a18`, warm grays
* Single accent: indigo `#5b5fc7` (Linear-style), used only for active states and focus
* Typography: **Manrope** (UI) + **JetBrains Mono** (micro-labels and numbers)
* Sections as individual cards with thin border, numbered `01`–`08`
* Buttons unified in 3 variants: ghost (default), dark solid (primary), ghost-red (destructive)
* Recalibrated dark mode — background `#0d0d0c`, surface `#161614`

### 🔗 **URL Sharing**

* New "Share" button in the toolbar
* Canvas state compressed with gzip + base64-url, stored in the page hash (`#share=g.xxxxx…`)
* ~60% compression vs plain JSON
* On open, if a share hash is detected: state loads, schema is validated, confirmation toast appears

### 🎤 **Presentation Mode**

* New "Present" button — triggers browser Fullscreen API
* Hides all editing UI: toolbar, template selector, drag handles, add/delete controls
* Inputs become read-only with no chrome — looks like native text
* Floating "Exit" button top-right with Esc hint

---

## 📊 **Canvas Sections**

| # | Section | Description |
|---|---|---|
| 01 | **Outcome (Goal)** | Measurable objective the product must achieve |
| 02 | **Users & Personas** | User profiles with segment and pain points |
| 03 | **Opportunities** | Problems and needs identified through research |
| 04 | **User Benefits (JTBD)** | Jobs To Be Done framework |
| 05 | **Solutions** | Feature ideas with Effort/Impact evaluation |
| 06 | **Assumptions** | Hypotheses to validate (Desirability/Feasibility/Viability) |
| 07 | **Experiments** | Concrete tests with method, duration, and success criteria |
| 08 | **Success Metrics** | KPIs and evaluation metrics |

---

## 🛠️ **Advanced Features**

### 📈 **Impact vs Effort Matrix (2×2)**

* Graphical visualization of solutions on a quadrant grid
* Auto-positioning based on Effort (S/M/L) and Impact (Low/Medium/High)
* **Fixed in v2** — quadrant labels and colors now match the standard convention:

| | Low Effort | High Effort |
|---|---|---|
| **High Impact** | 🟢 Quick Wins | 🟡 Major Projects |
| **Low Impact** | ⚫ Fill-ins | 🔴 Avoid |

* **New in v2** — Export as PNG (1600×1100px, Canvas2D-based, no CORS issues)

### 🔗 **Visual Connections**

* Links between Opportunities → Solutions → Experiments
* Dropdown to connect elements
* Full traceability of the decision-making process

---

## 💾 **Data Management**

| Action | Description |
|---|---|
| **Auto-save** | Browser localStorage, triggers on every change |
| **Restore** | Load last saved canvas |
| **Export JSON** | Structured and shareable backup |
| **Import JSON** | Reload canvas from file |
| **Export CSV** | Table for Excel/Sheets analysis |
| **Export PDF** | Native `window.print()` — no CDN required (v2) |
| **Export PNG** | Matrix snapshot, 1600×1100px (new in v2) |
| **Share URL** | Compressed state in page hash (new in v2) |

---

## 📦 **Pre-filled Templates**

Each template includes: measurable outcome, 1–2 detailed personas, prioritized opportunities, solutions pre-positioned on the matrix, typed assumptions (desirability/feasibility/viability) with risk level, and an experiment with success criteria.

### 💳 **Fintech**
* Use case: KYC automation for fintech
* Goal: Increase signup → payment conversion by 25%
* Solution: Automatic ID document OCR

### ⚖️ **Legal Tech**
* Use case: AI for contract analysis
* Goal: Reduce contract review time from 45 to 15 minutes
* Solution: AI clause analyzer with risk scoring

### ☁️ **SaaS B2B**
* Use case: Upsell from basic to premium plan
* Goal: Increase MRR by 30%
* Solution: Contextual in-app upgrade prompts

### 🛒 **E-commerce / Retail** *(new in v2)*
* Use case: Cart abandonment + mobile checkout
* Persona: Giulia, 28 years old

### ❤️ **Healthcare / Medtech** *(new in v2)*
* Use case: Therapy adherence for chronic patients
* Personas: Carlo (patient) + Marta (caregiver)

### 🤖 **AI / ML Product** *(new in v2)*
* Use case: Internal AI assistant with RAG + source citations
* Persona: Sara, Sales Manager

---

## 🎨 **Design and UX**

* Clean neutral header — warm off-white background, indigo accent (replaces purple/blue gradient)
* Always-visible status indicator: colored dot + label (✓ Ready / Saving… / Error)
* Toast notifications for action confirmation with undo support
* Buttons: ghost (default), dark solid (primary), ghost-red (destructive)
* Colored priority badges with mono font labels
* Drag handle hidden until hover, indigo focus ring on items
* Modal with blur backdrop
* Custom SVG chevron on selects
* Subtle scrollbar matching the active theme
* Responsive mobile-first design

---

## 🚀 **Quick Start**

### **Installation**

```
# No installation required — it is a standalone HTML file
# Download index.html (or the fully offline standalone version)
```

**Offline version:** `Product Discovery Canvas (standalone).html` (~328 KB) — fonts embedded, zero external dependencies.

### **Basic Usage**

1. Open `index.html` in your browser
2. Choose language (ITA/ENG)
3. Load a template to get started OR
4. Start from scratch by clicking "+ Add" in each section

---

## 🔄 **Recommended Workflow**

1. **Define the Outcome** – What do you want to achieve?
2. **Add Personas** – Who are you building for?
3. **Identify Opportunities** – What problems are you solving?
4. **Write JTBD** – What do users want to accomplish?
5. **Propose Solutions** – Feature ideas, evaluate Effort/Impact
6. **View the Matrix** – Prioritize solutions, export as PNG if needed
7. **List Assumptions** – What needs validation?
8. **Plan Experiments** – How will you validate assumptions?
9. **Define Metrics** – How will you measure success?
10. **Create Connections** – Trace Opportunity → Solution → Experiment
11. **Share or Present** – Use URL sharing or presentation mode

---

## 📝 **Field Details**

### **Personas (3 fields)**
* **Name**: e.g. "Laura, 32-year-old Freelancer"
* **Segment**: e.g. "Millennial with VAT number, tech-savvy"
* **Pain Points**: e.g. "Paper documents, long processing times"

### **Opportunities (2 fields)**
* **Description**: The specific problem
* **Priority**: High (HIGH) / Medium (MEDIUM) / Low (LOW)

### **Solutions (4 fields)**
* **Name**: Solution title
* **Description**: Short explanation
* **Effort**: S (Small) / M (Medium) / L (Large)
* **Impact**: Low / Medium / High

### **Assumptions (3 fields)**
* **Text**: The hypothesis to validate
* **Type**: Desirability / Feasibility / Viability
* **Risk**: Critical / High / Medium / Low

### **Experiments (4 fields)**
* **Name**: Experiment title
* **Method**: e.g. "A/B test", "Interview", "Prototype test"
* **Duration**: e.g. "2 weeks", "1 month"
* **Success Criteria**: e.g. ">80% completion rate"

---

## 💾 **Data Format**

### **JSON Structure**

```json
{
  "outcome": "string",
  "stakeholders": "string",
  "jtbd": "string",
  "metrics": "string",
  "personas": [
    { "id": 123456789, "name": "string", "segment": "string", "painpoints": "string" }
  ],
  "opportunities": [
    { "id": 123456790, "text": "string", "priority": "high|medium|low" }
  ],
  "solutions": [
    { "id": 123456791, "name": "string", "description": "string", "effort": "S|M|L", "impact": "low|medium|high", "matrixX": 50, "matrixY": 50 }
  ],
  "assumptions": [
    { "id": 123456792, "text": "string", "type": "desirability|feasibility|viability", "risk": "critical|high|medium|low" }
  ],
  "experiments": [
    { "id": 123456793, "name": "string", "method": "string", "duration": "string", "success": "string" }
  ],
  "connections": [
    { "id": 123456794, "opportunityId": 123456790, "solutionId": 123456791, "experimentId": 123456793 }
  ]
}
```

---

## 🔧 **Technical Requirements**

### **Supported Browsers**

* ✅ Chrome/Edge 90+
* ✅ Firefox 88+
* ✅ Safari 14+
* ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### **Dependencies**

* `localStorage` API – Required for data persistence
* `CompressionStream` API – Used for URL sharing (Chrome 80+, Firefox 113+, Safari 16.4+)
* ~~html2pdf.js (CDN)~~ – Removed in v2, replaced by native `window.print()`
* No server required — zero configuration — works offline

---

## 📚 **Use Cases**

### **1. Product Manager**
* Define product roadmap
* Prioritize features with 2×2 matrix
* Present canvas to stakeholders (PDF export or presentation mode)

### **2. UX Researcher**
* Document user research insights
* Map pain points and opportunities
* Share personas with the team

### **3. Startup Founder**
* Validate product-market fit
* Plan MVP with effort/impact evaluation
* Track critical assumptions to validate

### **4. Innovation Team**
* Product discovery workshops
* Collaborative solution brainstorming
* Export for project documentation (JSON, CSV, PDF, PNG)

---

## 🎓 **Best Practices**

### ✅ **DO**
* Involve the team in filling out the canvas
* Validate high-risk assumptions first
* Use templates as a starting point
* Export regularly in JSON for backup
* Always connect Opportunity → Solution → Experiment

### ❌ **DON'T**
* Do not skip defining a clear Outcome
* Do not underestimate Solution Effort
* Do not ignore critical assumptions
* Do not forget to define Success Metrics
* Do not overload with too many solutions (max 5–7)

---

## 🔐 **Privacy and Security**

* **Local data**: Everything saved in the browser (localStorage)
* **Zero server**: No data sent online
* **Full privacy**: No tracking or analytics
* **Portability**: JSON export to migrate data
* **URL sharing**: State is compressed client-side — no server involved

---

## 🐛 **Troubleshooting**

### **Canvas does not save data**
* Check that localStorage is enabled
* Make sure you are not in private browsing mode

### **Templates do not load**
* Reload the page (F5)
* Check that JavaScript is enabled
* Check browser console for errors

### **PDF export does not work**
* Use the browser's "Print" dialog → "Save as PDF"
* No external CDN is required in v2

### **PNG export does not work**
* Requires Chrome 80+, Firefox 88+, or Safari 14+
* Check browser console for errors

### **URL sharing does not work**
* Requires `CompressionStream` API: Chrome 80+, Firefox 113+, Safari 16.4+
* The link includes the full canvas state in the hash — it can be long

### **Language does not change**
* Click the language button (🇮🇹 ITA / 🇬🇧 ENG)
* Reload the page if the issue persists

---

## 📈 **Future Roadmap**

* ✅ ~~Drag & drop to reorder items~~ (drag handles added in v2)
* ✅ ~~Dark mode~~ (recalibrated in v2)
* ✅ ~~Additional templates (eCommerce, HealthTech, AI/ML)~~ (added in v2)
* Undo/Redo (Ctrl+Z)
* Periodic auto-backup
* Canvas versioning
* Real-time collaboration (cloud sync)
* Mobile app wrapper

---

## 📋 **Changelog**

### v2.0.0 — May 2026
* 🎨 Full UI redesign: neutral warm palette, indigo accent, Manrope + JetBrains Mono typography
* 🐛 Fixed inverted quadrant labels on Impact/Effort matrix
* 🐛 Fixed PDF export — removed html2pdf.js CDN, replaced with native `window.print()`
* 📸 New: PNG export for the matrix (Canvas2D, 1600×1100px)
* 🔗 New: URL sharing (gzip + base64 in page hash)
* 🎤 New: Presentation mode (fullscreen, read-only)
* 📌 Matrix pills widened to 220px max
* 📦 New templates: E-commerce / Retail, Healthcare / Medtech, AI / ML Product
* 🌙 Recalibrated dark mode (`#0d0d0c` background, `#161614` surface)

### v1.0.0 — February 2026
* Initial release

---

## 📄 **License**

**GPL-3.0** – Free for personal and commercial use. See [LICENSE](LICENSE).

---

## 🤝 **Contributions**

The canvas is a standalone file. To contribute:

1. Edit `index.html`
2. Test locally in your browser
3. Open a PR with a short description of the change

---

## 📞 **Support**

For questions or issues:
* Open the file in a text editor for customization
* Inspect browser console (F12) for debugging
* All data is stored in browser localStorage

**Version:** 2.0.0
**Last update:** May 2026
**Author:** Fabrizio Quaglio Cotti

🚀 **Enjoy! Suggestions are always welcome!**
