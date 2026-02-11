# 📘 **Product Discovery Canvas - README**

## 🎯 **Overview**

**Product Discovery Canvas** is an interactive framework designed to guide the product discovery process, from defining goals to validating assumptions through concrete experiments.

Designed for Product Managers, Product Owners, AI Product Leaders and Innovation Teams who want a structured, experiment-driven discovery workflow.

![Screenshot](https://github.com/user-attachments/assets/d42e6d35-161f-4de8-a2c4-bed1d7d6c620)

## ✨ **Key Features**

### 🌐 **Multilingual**

* Italian and English with instant switch
* Elegant selector in the top right corner (🇮🇹 ITA / 🇬🇧 ENG)
* All labels, placeholders, and messages translated
* Language automatically saved in the browser



## 📊 **Canvas Sections**

* **Outcome (Goal)** – Measurable objective the product must achieve
* **Users & Personas** – User profiles with segment and pain points
* **Opportunities** – Problems and needs identified through research
* **User Benefits (JTBD)** – Jobs To Be Done framework
* **Solutions** – Feature ideas with Effort/Impact evaluation
* **Assumptions** – Hypotheses to validate (Desirability/Feasibility/Viability)
* **Experiments** – Concrete tests with method, duration, and success criteria
* **Success Metrics** – KPIs and evaluation metrics



## 🛠️ **Advanced Features**

### 📈 **Impact vs Effort Matrix (2x2)**

* Graphical visualization of solutions
* Auto-positioning based on Effort (S/M/L) and Impact (Low/Medium/High)
* 4 colored quadrants for prioritization

### 🔗 **Visual Connections**

* Links between Opportunities → Solutions → Experiments
* Dropdown to connect elements
* Full traceability of the decision-making process



## 💾 **Data Management**

* **Save**: Browser localStorage (auto-save)
* **Restore**: Load last saved canvas
* **Export JSON**: Structured and shareable backup
* **Import JSON**: Reload canvas from file
* **Export CSV**: Table for Excel/Sheets analysis
* **Export PDF**: Printable document (requires html2pdf.js CDN)



## 📦 **Pre-filled Templates**

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



## 🎨 **Design and UX**

* Elegant purple/blue gradient header
* Always-visible status indicator ("✓ Ready")
* Toast notifications for action confirmation
* Colored buttons for quick actions
* Colored priority badges (High/Medium/Low)
* Red delete buttons (×) on each item
* Responsive mobile-first design



## 🚀 **Quick Start**

### **Installation**

```
# No installation required! It is a standalone HTML file
# Download product_discovery_canvas_FINAL.html
```

### **Basic Usage**

1. Open product_discovery_canvas_FINAL.html in your browser
2. Choose language (ITA/ENG)
3. Load a template to get started OR
4. Start from scratch by clicking "+ Add" in each section



## 🔄 **Recommended Workflow**

1. **Define the Outcome** – What do you want to achieve?
2. **Add Personas** – Who are you building for?
3. **Identify Opportunities** – What problems are you solving?
4. **Write JTBD** – What do users want to accomplish?
5. **Propose Solutions** – Feature ideas, evaluate Effort/Impact
6. **View the Matrix** – Prioritize solutions
7. **List Assumptions** – What needs validation?
8. **Plan Experiments** – How will you validate assumptions?
9. **Define Metrics** – How will you measure success?
10. **Create Connections** – Trace Opportunity → Solution → Experiment



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



## 💾 **Data Format**

### **JSON Structure**

### Struttura JSON

```json
{
  "outcome": "string",
  "stakeholders": "string",
  "jtbd": "string",
  "metrics": "string",
  "personas": [
    {
      "id": 123456789,
      "name": "string",
      "segment": "string",
      "painpoints": "string"
    }
  ],
  "opportunities": [
    {
      "id": 123456790,
      "text": "string",
      "priority": "high|medium|low"
    }
  ],
  "solutions": [
    {
      "id": 123456791,
      "name": "string",
      "description": "string",
      "effort": "S|M|L",
      "impact": "low|medium|high",
      "matrixX": 50,
      "matrixY": 50
    }
  ],
  "assumptions": [
    {
      "id": 123456792,
      "text": "string",
      "type": "desirability|feasibility|viability",
      "risk": "critical|high|medium|low"
    }
  ],
  "experiments": [
    {
      "id": 123456793,
      "name": "string",
      "method": "string",
      "duration": "string",
      "success": "string"
    }
  ],
  "connections": [
    {
      "id": 123456794,
      "opportunityId": 123456790,
      "solutionId": 123456791,
      "experimentId": 123456793
    }
  ]
}
```




## 🔧 **Technical Requirements**

### **Supported Browsers**

* ✅ Chrome/Edge 90+
* ✅ Firefox 88+
* ✅ Safari 14+
* ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### **Dependencies**

* html2pdf.js (CDN) – Only for PDF export

* localStorage API – For data persistence

* No installation required

* Zero configuration

* No server required

* Works offline (after first load)



## 📚 **Use Cases**

### **1. Product Manager**

* Define product roadmap
* Prioritize features with 2x2 matrix
* Present canvas to stakeholders (PDF export)

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
* Export for project documentation


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
* Do not overload with too many solutions, max 5-7


## 🔐 **Privacy and Security**

* **Local data**: Everything saved in the browser (localStorage)
* **Zero server**: No data sent online
* **Full privacy**: No tracking or analytics
* **Portability**: JSON export to migrate data



## 🐛 **Troubleshooting**

### **Canvas does not save data**

* Check that localStorage is enabled
* Make sure you are not in private browsing mode

### **Templates do not load**

* Reload the page (F5)
* Check that JavaScript is enabled
* Check browser console for errors

### **PDF export does not work**

* Check internet connection (for html2pdf.js CDN)
* Use JSON export as an alternative

### **Language does not change**

* Click the language button (🇮🇹 ITA / 🇬🇧 ENG)
* Reload the page if the issue persists


## 📈 **Future Roadmap**

* [ ] Drag & drop to reorder items
* [ ] Undo/Redo (Ctrl+Z)
* [ ] Periodic auto-backup
* [ ] Canvas versioning
* [ ] Real-time collaboration (cloud sync)
* [ ] Additional templates (eCommerce, HealthTech, EdTech)
* [ ] Dark mode
* [ ] Mobile app wrapper



## 📄 **License**

**MIT License** – Free for personal and commercial use



## 🤝 **Contributions**

This is a standalone tool. For improvements:

* Edit the HTML file
* Test locally
* Share your version



## 📞 **Support**

For questions or issues:

* Open the file in a text editor for customization
* Inspect browser console (F12) for debugging
* All data is stored in browser localStorage



**Version:** 1.0.0
**Last update:** February 2026
**Author:** Fabrizio Quaglio Cotti



🚀 **Enjoy! Suggestions are always welcome!**
