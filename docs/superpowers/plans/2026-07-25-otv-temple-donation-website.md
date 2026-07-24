# 1008 Sri Vrishabanath Temple Donation Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-first, high-performance static website for 1008 Sri Vrishabanath Bhagwan Jain Temple renovation donation with multi-language notices (English, Tamil, Hindi, Kannada), interactive UPI payment launcher, 11-item renovation PDF proposal viewer with PDF export proof, temple image gallery, and Cloudflare Pages deployment readiness.

**Architecture:** A lightweight Vite static single-page application using modular Vanilla JavaScript and Vanilla CSS. Assets (temple images, notice scans, upi-qr, PDF proposal) will be stored in `public/assets/`. DOM manipulation and state management (language, selected UPI donation amount, lightbox) will be handled via focused JS modules.

**Tech Stack:** Vite, HTML5, Vanilla CSS3 (Custom CSS design system with CSS Variables & Glassmorphic components), Vanilla JavaScript (ES Modules).

## Global Constraints
- Target hosting platform: Cloudflare Pages (`npm run build` -> `dist`).
- Default Language: English (`en`), with dynamic switching to Tamil (`ta`), Hindi (`hi`), and Kannada (`kn`).
- UPI Recipient VPA: `f051m01588@indianbk`
- UPI Payee Name: `SHRI VIRSHABANATH BHAGAWAN JAIN TEMPLE OTHALAVADI`
- Bank A/C: `8350857706` | Indian Bank Devikapuram | IFSC: `IDIB000D074`
- Trustee Contacts: President D. Dharmapalan (6369346503), Secretary N. Ponnappan (9788391633), Treasurer P. Rajaperumal (9524026692).
- Temple Google Maps Link: `https://share.google/9k4PHPMGBsX1xCUaL`

---

### Task 1: Project Setup & Asset Migration

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `public/assets/images/temple/` (copy 21 JPG images from `C:\Users\Uthayasri\Desktop\Otv Temple\Temple_pictures`)
- Create: `public/assets/images/notices/` (copy notice scans from `C:\Users\Uthayasri\Desktop\Otv Temple\Notices`)
- Create: `public/assets/images/upi-qr.png` (copy from `C:\Users\Uthayasri\Desktop\Otv Temple\upi-qr.png`)
- Create: `public/assets/docs/proposal.pdf` (copy from `C:\Users\Uthayasri\Desktop\Otv Temple\proposal\1008_Sri_Vrishabanath_Temple_Merged_Updated.pdf`)

- [ ] **Step 1: Create package.json and vite.config.js**

```json
{
  "name": "otv-jain-temple-donation",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

- [ ] **Step 2: Copy assets from desktop folders into project public directory using PowerShell**

```powershell
New-Item -ItemType Directory -Force -Path "public/assets/images/temple", "public/assets/images/notices", "public/assets/docs"
Copy-Item "C:\Users\Uthayasri\Desktop\Otv Temple\Temple_pictures\*.jpg" "public/assets/images/temple/"
Copy-Item "C:\Users\Uthayasri\Desktop\Otv Temple\Notices\*.*" "public/assets/images/notices/"
Copy-Item "C:\Users\Uthayasri\Desktop\Otv Temple\upi-qr.png" "public/assets/images/upi-qr.png"
Copy-Item "C:\Users\Uthayasri\Desktop\Otv Temple\proposal\1008_Sri_Vrishabanath_Temple_Merged_Updated.pdf" "public/assets/docs/proposal.pdf"
```

- [ ] **Step 3: Run npm install**

Run: `npm install`
Expected: Dependencies installed cleanly.

- [ ] **Step 4: Commit**

```bash
git add package.json vite.config.js public/
git commit -m "feat: setup Vite project structure and migrate temple assets"
```

---

### Task 2: Data Dictionaries & i18n Localization Engine

**Files:**
- Create: `src/js/data/en.js`
- Create: `src/js/data/ta.js`
- Create: `src/js/data/hi.js`
- Create: `src/js/data/kn.js`
- Create: `src/js/data/proposalData.js`
- Create: `src/js/i18n.js`

**Interfaces:**
- Consumes: User language selection event (`en`, `ta`, `hi`, `kn`).
- Produces: `setLanguage(langCode)`, `getCurrentLanguage()`, `t(key)` helper.

- [ ] **Step 1: Write proposalData.js with 11 engineering estimate items & Yathi Nivas specs**

```javascript
export const proposalData = {
  totalEstimate: 12730740,
  formattedTotal: "₹1,27,30,740",
  yathiNivasSpecs: {
    builtUpArea: "3000 Sq.ft",
    plotArea: "693.12 m² (7460 Sq.ft)",
    rooms: "6 Spacious Rooms with attached bathrooms",
    features: ["Central Lounge (20'x20')", "Puja/Meditation Room (10'x8')", "Wide Verandah (20'x8')", "Store Room"]
  },
  items: [
    { id: 1, descKey: "est_item_1", qty: "125 m²", rate: "₹4,000 / m²", amount: 500000, formattedAmount: "₹5,00,000" },
    { id: 2, descKey: "est_item_2", qty: "25 m²", rate: "₹18,000 / m²", amount: 450000, formattedAmount: "₹4,50,000" },
    { id: 3, descKey: "est_item_3", qty: "120 m", rate: "₹2,700 / m", amount: 324000, formattedAmount: "₹3,24,000" },
    { id: 4, descKey: "est_item_4", qty: "1 Temple", rate: "Lump Sum", amount: 100000, formattedAmount: "₹1,00,000" },
    { id: 5, descKey: "est_item_5", qty: "1 No (80m)", rate: "₹1,250 / m", amount: 100000, formattedAmount: "₹1,00,000" },
    { id: 6, descKey: "est_item_6", qty: "278.70 m²", rate: "₹30,200 / m²", amount: 8416740, formattedAmount: "₹84,16,740" },
    { id: 7, descKey: "est_item_7", qty: "800 sq.ft", rate: "₹4,000 / sq.ft", amount: 320000, formattedAmount: "₹3,20,000" },
    { id: 8, descKey: "est_item_8", qty: "200 m", rate: "₹2,000 / m", amount: 400000, formattedAmount: "₹4,00,000" },
    { id: 9, descKey: "est_item_9", qty: "8000 sq.ft", rate: "₹200 / sq.ft", amount: 1200000, formattedAmount: "₹12,00,000" },
    { id: 10, descKey: "est_item_10", qty: "24 Idols", rate: "₹30,000 / Idol", amount: 720000, formattedAmount: "₹7,20,000" },
    { id: 11, descKey: "est_item_11", qty: "1 System", rate: "Lump Sum", amount: 200000, formattedAmount: "₹2,00,000" }
  ]
};
```

- [ ] **Step 2: Write language text dictionaries (en.js, ta.js, hi.js, kn.js)**

Populate complete translations for notice text, titles, hero section, trustee info, and estimate item descriptions verbatim from the text files (`English.txt`, `Hindhi.txt`, `Kannada.txt`).

- [ ] **Step 3: Create src/js/i18n.js localization manager**

```javascript
import { en } from './data/en.js';
import { ta } from './data/ta.js';
import { hi } from './data/hi.js';
import { kn } from './data/kn.js';

const translations = { en, ta, hi, kn };
let currentLang = 'en';

export function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  document.documentElement.lang = lang;
  
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  const htmlElements = document.querySelectorAll('[data-i18n-html]');
  htmlElements.forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

export function t(key) {
  return translations[currentLang][key] || key;
}

export function getCurrentLanguage() {
  return currentLang;
}
```

- [ ] **Step 4: Verify i18n logic with a quick node check**

Run: `node -e "import('./src/js/i18n.js').then(m => console.log('i18n module imports clean'))"`
Expected: Module loads clean.

- [ ] **Step 5: Commit**

```bash
git add src/js/data/ src/js/i18n.js
git commit -m "feat: add multilingual data dictionaries and i18n localization engine"
```

---

### Task 3: CSS Styling & Temple Design System

**Files:**
- Create: `src/css/main.css`
- Create: `src/css/print.css`

- [ ] **Step 1: Write main.css with CSS Variables & Responsive Components**

```css
:root {
  --primary-terracotta: #8B2613;
  --primary-gold: #D4AF37;
  --accent-gold-bright: #F3C623;
  --bg-cream: #FFFDF9;
  --bg-card: #FFFFFF;
  --text-dark: #1F1A17;
  --text-muted: #5C524B;
  --border-gold: rgba(212, 175, 55, 0.3);
  --shadow-card: 0 10px 30px rgba(139, 38, 19, 0.08);
  --radius-lg: 16px;
  --radius-md: 10px;
  --font-main: 'Outfit', 'Inter', system-ui, -apple-system, sans-serif;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--bg-cream);
  color: var(--text-dark);
  font-family: var(--font-main);
  line-height: 1.6;
}

/* Glassmorphism & Cards */
.card {
  background: var(--bg-card);
  border: 1px solid var(--border-gold);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  padding: 24px;
  margin-bottom: 24px;
}

/* Golden Accent Header */
.section-title {
  color: var(--primary-terracotta);
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 16px;
  position: relative;
}
.section-title::after {
  content: "🪔 ☸ 🪔";
  display: block;
  font-size: 0.9rem;
  color: var(--primary-gold);
  margin-top: 4px;
}

/* Sticky Bottom Mobile Bar */
.sticky-donate-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 253, 249, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--border-gold);
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
}
@media (min-width: 768px) {
  .sticky-donate-bar { display: none; }
}

/* Preset Chips */
.preset-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
}
.chip {
  background: #F7F3EE;
  border: 1px solid #E2D9CF;
  padding: 10px 16px;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}
.chip.active {
  background: var(--primary-terracotta);
  color: white;
  border-color: var(--primary-terracotta);
  box-shadow: 0 4px 12px rgba(139, 38, 19, 0.25);
}

/* Toast Notifications */
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
}
.toast {
  background: var(--primary-terracotta);
  color: white;
  padding: 12px 24px;
  border-radius: var(--radius-md);
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
  margin-bottom: 10px;
  animation: fadeIn 0.3s ease;
}
```

- [ ] **Step 2: Write print.css for clean PDF proof document output**

```css
@media print {
  body {
    background: white !important;
    color: black !important;
  }
  .no-print, .sticky-donate-bar, .language-selector, nav, .gallery-section, .proof-images-section {
    display: none !important;
  }
  .print-header {
    display: block !important;
    text-align: center;
    border-bottom: 2px solid #8B2613;
    padding-bottom: 12px;
    margin-bottom: 20px;
  }
  .card {
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ccc;
    padding: 8px;
    font-size: 11pt;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/css/
git commit -m "style: implement temple design system, responsive styles, and print css"
```

---

### Task 4: Interactive Mobile UPI Engine Component

**Files:**
- Create: `src/js/upi.js`

**Interfaces:**
- Consumes: Preset click event, custom amount input, copy button clicks, QR modal toggle.
- Produces: `initUPI()`, `copyToClipboard(text, message)`, `generateUPILink(amount)`.

- [ ] **Step 1: Create src/js/upi.js**

```javascript
const UPI_VPA = "f051m01588@indianbk";
const PAYEE_NAME = "SHRI VIRSHABANATH BHAGAWAN JAIN TEMPLE OTHALAVADI";

export function initUPI() {
  const chips = document.querySelectorAll('.chip');
  const customInput = document.getElementById('custom-amount-input');
  const payBtn = document.getElementById('pay-upi-btn');
  const copyVpaBtn = document.getElementById('copy-vpa-btn');
  const copyAccBtn = document.getElementById('copy-acc-btn');
  const copyIfscBtn = document.getElementById('copy-ifsc-btn');
  const qrModalBtn = document.getElementById('view-qr-btn');
  const qrModal = document.getElementById('qr-modal');
  const closeQrBtn = document.getElementById('close-qr-modal');

  let currentAmount = "11000";

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const val = chip.getAttribute('data-amount');
      if (val !== 'custom') {
        currentAmount = val;
        if (customInput) customInput.value = '';
      }
      updateUPILink();
    });
  });

  if (customInput) {
    customInput.addEventListener('input', (e) => {
      const val = e.target.value.replace(/[^0-9]/g, '');
      e.target.value = val;
      if (val) {
        chips.forEach(c => c.classList.remove('active'));
        currentAmount = val;
        updateUPILink();
      }
    });
  }

  function updateUPILink() {
    const amountParam = currentAmount ? `&am=${currentAmount}` : '';
    const upiUrl = `upi://pay?pa=${encodeURIComponent(UPI_VPA)}&pn=${encodeURIComponent(PAYEE_NAME)}${amountParam}&cu=INR`;
    if (payBtn) {
      payBtn.setAttribute('href', upiUrl);
    }
  }

  if (copyVpaBtn) {
    copyVpaBtn.addEventListener('click', () => showToastAndCopy(UPI_VPA, "UPI ID copied to clipboard!"));
  }
  if (copyAccBtn) {
    copyAccBtn.addEventListener('click', () => showToastAndCopy("8350857706", "Bank Account Number copied!"));
  }
  if (copyIfscBtn) {
    copyIfscBtn.addEventListener('click', () => showToastAndCopy("IDIB000D074", "IFSC Code copied!"));
  }

  if (qrModalBtn && qrModal) {
    qrModalBtn.addEventListener('click', () => qrModal.classList.add('active'));
  }
  if (closeQrBtn && qrModal) {
    closeQrBtn.addEventListener('click', () => qrModal.classList.remove('active'));
  }

  updateUPILink();
}

export function showToastAndCopy(text, message) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(message);
  }).catch(() => {
    showToast("Copy failed, please copy manually.");
  });
}

export function showToast(message) {
  const container = document.getElementById('toast-container') || createToastContainer();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function createToastContainer() {
  const c = document.createElement('div');
  c.id = 'toast-container';
  c.className = 'toast-container';
  document.body.appendChild(c);
  return c;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/js/upi.js
git commit -m "feat: implement interactive mobile UPI payment launcher and clipboard logic"
```

---

### Task 5: Renovation Estimates & PDF Proof Generator Component

**Files:**
- Create: `src/js/proposal.js`

**Interfaces:**
- Consumes: `proposalData`, language change event.
- Produces: `renderProposalTable()`, `initProposalActions()`.

- [ ] **Step 1: Create src/js/proposal.js**

```javascript
import { proposalData } from './data/proposalData.js';
import { t } from './i18n.js';

export function renderProposalTable() {
  const container = document.getElementById('proposal-table-container');
  if (!container) return;

  let html = `
    <div class="table-responsive">
      <table class="proposal-table">
        <thead>
          <tr>
            <th>#</th>
            <th>${t('th_description')}</th>
            <th>${t('th_qty')}</th>
            <th>${t('th_rate')}</th>
            <th class="text-right">${t('th_amount')}</th>
          </tr>
        </thead>
        <tbody>
  `;

  proposalData.items.forEach(item => {
    html += `
      <tr>
        <td>${item.id}</td>
        <td><strong>${t(item.descKey)}</strong></td>
        <td>${item.qty}</td>
        <td>${item.rate}</td>
        <td class="text-right font-weight-bold">${item.formattedAmount}</td>
      </tr>
    `;
  });

  html += `
        </tbody>
        <tfoot>
          <tr class="total-row">
            <td colspan="4" class="text-right"><strong>${t('total_estimated_amount')}</strong></td>
            <td class="text-right total-amount">${proposalData.formattedTotal}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  `;

  container.innerHTML = html;
}

export function initProposalActions() {
  const printBtn = document.getElementById('print-proof-btn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/js/proposal.js
git commit -m "feat: add renovation estimates renderer and PDF proof print handler"
```

---

### Task 6: Temple Image Gallery & Lightbox Component

**Files:**
- Create: `src/js/gallery.js`

- [ ] **Step 1: Create src/js/gallery.js**

```javascript
export function initGallery() {
  const container = document.getElementById('gallery-grid');
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  if (!container) return;

  const images = [
    { src: '/assets/images/temple/IMG-20260722-WA0018.jpg', title: 'Sri Vrishabanath Bhagwan Moolavar' },
    { src: '/assets/images/temple/IMG-20260722-WA0020.jpg', title: 'Moolavar Gopuram & Temple Tower' },
    { src: '/assets/images/temple/IMG-20260722-WA0024.jpg', title: 'Front Mandapam & Pillars' },
    { src: '/assets/images/temple/IMG-20260722-WA0026.jpg', title: 'Manastambha (Pillar of Honor)' },
    { src: '/assets/images/temple/IMG-20260722-WA0029.jpg', title: 'Temple Entrance Gate' },
    { src: '/assets/images/temple/IMG-20260722-WA0031.jpg', title: 'Prakaram & Outer Pathway' },
    { src: '/assets/images/temple/IMG-20260722-WA0033.jpg', title: 'Inscriptions & Chola Heritage' },
    { src: '/assets/images/temple/IMG-20260722-WA0034.jpg', title: 'Temple Precincts' },
    { src: '/assets/images/temple/IMG-20260722-WA0035.jpg', title: 'Front View of Jinalayam' },
    { src: '/assets/images/temple/IMG-20260722-WA0036.jpg', title: 'Sanctum View' },
    { src: '/assets/images/temple/IMG-20260722-WA0037.jpg', title: 'Tyagi Niwas Proposed Plot' },
    { src: '/assets/images/temple/IMG-20260722-WA0038.jpg', title: 'Around Garbhagriha' }
  ];

  let html = '';
  images.forEach((img, idx) => {
    html += `
      <div class="gallery-item" data-index="${idx}">
        <img src="${img.src}" alt="${img.title}" loading="lazy" />
        <div class="gallery-caption">${img.title}</div>
      </div>
    `;
  });

  container.innerHTML = html;

  container.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const idx = item.getAttribute('data-index');
      lightboxImg.src = images[idx].src;
      lightbox.classList.add('active');
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/js/gallery.js
git commit -m "feat: implement responsive temple photo gallery with lightbox viewer"
```

---

### Task 7: Complete SPA Assembly & SEO Meta Tags (`index.html` & `src/js/main.js`)

**Files:**
- Create: `index.html`
- Create: `src/js/main.js`

- [ ] **Step 1: Write index.html with Semantic Layout, WhatsApp OpenGraph Meta Tags, and Navigation**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>1008 Sri Vrishabanath Bhagwan Temple Renovation & Donation | Othalavadi</title>
  
  <!-- SEO & Social Media Meta Tags -->
  <meta name="description" content="Support the ancient 10th-century 1008 Sri Vrishabanath Bhagwan Jain Temple Renovation & Tyagi Niwas Construction at Othalavadi. Donate via UPI / Bank Transfer.">
  <meta property="og:title" content="1008 Sri Vrishabanath Bhagwan Temple Renovation & Donation">
  <meta property="og:description" content="Contribute towards the holy renovation & Tyagi Niwas construction of the historic Jain Temple in Othalavadi.">
  <meta property="og:image" content="/assets/images/temple/IMG-20260722-WA0018.jpg">
  <meta property="og:type" content="website">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="/src/css/main.css">
  <link rel="stylesheet" href="/src/css/print.css">
</head>
<body>

  <!-- Print Header for PDF Proof -->
  <div class="print-header" style="display:none;">
    <h1>1008 SRI VIRSHABANATH BHAGWAN JAIN TEMPLE TRUST</h1>
    <p>Othalavadi Village, Chetpet Taluk, Tiruvannamalai District, Tamil Nadu – 632326</p>
    <p>Bank Account: 8350857706 | IFSC: IDIB000D074 | Indian Bank Devikapuram</p>
    <hr>
  </div>

  <!-- Header Navigation -->
  <header class="navbar no-print">
    <div class="nav-container">
      <div class="brand">
        <span class="symbol">🪔</span>
        <div>
          <h1 class="brand-title" data-i18n="temple_title">1008 Sri Virshabanath Jinalayam</h1>
          <span class="brand-sub" data-i18n="temple_location">Othalavadi, Tiruvannamalai Dist</span>
        </div>
      </div>

      <!-- Language Selector -->
      <div class="language-selector">
        <button class="lang-btn active" data-lang="en">ENG</button>
        <button class="lang-btn" data-lang="ta">தமிழ்</button>
        <button class="lang-btn" data-lang="hi">हिंदी</button>
        <button class="lang-btn" data-lang="kn">ಕನ್ನಡ</button>
      </div>
    </div>
  </header>

  <!-- Main Content Container -->
  <main class="container">
    
    <!-- Hero Section -->
    <section class="hero-card card text-center">
      <img src="/assets/images/temple/IMG-20260722-WA0018.jpg" alt="Sri Vrishabanath Bhagwan" class="hero-image" />
      <h2 class="hero-title" data-i18n="hero_heading">Sacred Appeal for Renovation & Restoration</h2>
      <p class="hero-subtitle" data-i18n="hero_blessing">Under the guidance of Bhattarak Chintamani Swasti Sri Dhavalakeerthi Swamiji & Swasti Sri Lakshmisena Swamiji</p>
      
      <div class="hero-history">
        <span class="badge">10th Century Chola Antiquity</span>
        <p data-i18n="history_brief">Historical inscriptions reveal Chola King Othalan & Mallinatha Sambuvarayar granted land gifts ('Pallichandam') to "Swasti Sri Aniyadha Azhagar Jinalayam".</p>
      </div>

      <div class="hero-cta-group no-print">
        <a href="#donate-section" class="btn btn-gold" data-i18n="btn_donate_now">⚡ Donate via UPI</a>
        <a href="#proposal-section" class="btn btn-outline" data-i18n="btn_view_proposal">📋 View Work Estimate</a>
      </div>
    </section>

    <!-- UPI Donation Section -->
    <section id="donate-section" class="card donation-card">
      <h3 class="section-title" data-i18n="donation_title">Make a Sacred Contribution</h3>
      
      <div class="vpa-box">
        <div class="vpa-info">
          <span class="vpa-label">UPI ID (VPA):</span>
          <strong class="vpa-text">f051m01588@indianbk</strong>
        </div>
        <button id="copy-vpa-btn" class="btn btn-sm btn-outline">📋 Copy UPI ID</button>
      </div>

      <!-- Preset Amount Selector -->
      <div class="amount-selector">
        <label class="selector-label" data-i18n="select_amount_label">Select Donation Amount:</label>
        <div class="preset-chips">
          <button class="chip" data-amount="1008">₹1,008</button>
          <button class="chip" data-amount="5000">₹5,000</button>
          <button class="chip active" data-amount="11000">₹11,000 ⭐ <span data-i18n="plaque_tier">Stone Plaque Tier</span></button>
          <button class="chip" data-amount="25000">₹25,000</button>
          <button class="chip" data-amount="50000">₹50,000</button>
        </div>

        <div class="custom-amount-wrap">
          <span>₹</span>
          <input type="text" id="custom-amount-input" placeholder="Or enter custom amount" />
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="donation-actions no-print">
        <a id="pay-upi-btn" href="#" class="btn btn-primary btn-block btn-lg">
          📱 Pay via Any UPI App (GPay / PhonePe / Paytm / BHIM)
        </a>
        <button id="view-qr-btn" class="btn btn-outline btn-block">🔍 View UPI QR Code</button>
      </div>

      <!-- Bank Details Card -->
      <div class="bank-details-box">
        <h4 data-i18n="bank_details_heading">Direct Bank Transfer Details</h4>
        <p><strong>Account Name:</strong> 1008 SHRI VIRSHABANATH BHAGWAN JAIN TEMPLE TRUST, OTHALAVADI</p>
        <p><strong>Account No:</strong> 8350857706 <button id="copy-acc-btn" class="btn-link">Copy</button></p>
        <p><strong>Bank:</strong> Indian Bank (Devikapuram Branch - 02322)</p>
        <p><strong>IFSC Code:</strong> IDIB000D074 <button id="copy-ifsc-btn" class="btn-link">Copy</button></p>
      </div>
    </section>

    <!-- Notice Section -->
    <section class="card notice-card">
      <h3 class="section-title" data-i18n="notice_title">Official Renovation Notice</h3>
      <div id="notice-text-content" class="notice-content"></div>
      
      <!-- Proof Images Accordion -->
      <div class="notice-proofs no-print">
        <h4>Printed Notice Scans & Proofs</h4>
        <div class="proof-thumbnails">
          <img src="/assets/images/notices/english_notice_color.jpg" alt="English Notice Color" />
          <img src="/assets/images/notices/tamil_notice_colour.jpg" alt="Tamil Notice Color" />
          <img src="/assets/images/notices/hindhi_notice_color.jpg" alt="Hindi Notice Color" />
          <img src="/assets/images/notices/kannada_notice_color.jpg" alt="Kannada Notice Color" />
        </div>
      </div>
    </section>

    <!-- Renovation Proposal & Estimates (Requirement 3) -->
    <section id="proposal-section" class="card proposal-card">
      <h3 class="section-title" data-i18n="proposal_title">Work Estimation & Proposed Yathi Nivas Structure</h3>
      
      <div class="proposal-actions no-print">
        <a href="/assets/docs/proposal.pdf" download="1008_Sri_Vrishabanath_Temple_Renovation_Proposal.pdf" class="btn btn-outline">
          📄 Download Original Proposal PDF
        </a>
        <button id="print-proof-btn" class="btn btn-gold">
          🖨️ Print / Save Clean PDF Proof
        </button>
      </div>

      <!-- Total Budget Banner -->
      <div class="budget-banner">
        <span>Total Estimated Renovation Budget:</span>
        <strong class="total-badge">₹1,27,30,740 (~₹1.27 Crores)</strong>
      </div>

      <div id="proposal-table-container"></div>

      <!-- Yathi Nivas Specs -->
      <div class="yathi-nivas-box">
        <h4>Proposed Yathi Nivas Structure Specifications</h4>
        <ul>
          <li><strong>Total Proposed Built Up Area:</strong> 3,000 Sq.Feet</li>
          <li><strong>Land Survey Area:</strong> 693.12 m² (Plot Nos 3, 4A, 4B)</li>
          <li><strong>Accommodations:</strong> 6 Spacious Rooms with attached toilets, Central Lounge (20'x20'), Puja/Meditation Room (10'x8'), Store Room, and Wide Entrance Verandah.</li>
        </ul>
      </div>
    </section>

    <!-- Temple Gallery Section -->
    <section class="card gallery-section no-print">
      <h3 class="section-title" data-i18n="gallery_title">Temple Photo Gallery</h3>
      <div id="gallery-grid" class="gallery-grid"></div>
    </section>

    <!-- Contacts & Google Maps Section -->
    <section class="card contact-card">
      <h3 class="section-title" data-i18n="contact_title">Trustee Contacts & Location</h3>
      
      <div class="contacts-grid">
        <div class="contact-item">
          <strong>D. Dharmapalan</strong>
          <span>President</span>
          <a href="tel:6369346503" class="btn btn-sm btn-outline">📞 Call 6369346503</a>
        </div>
        <div class="contact-item">
          <strong>N. Ponnappan</strong>
          <span>Secretary</span>
          <a href="tel:9788391633" class="btn btn-sm btn-outline">📞 Call 9788391633</a>
        </div>
        <div class="contact-item">
          <strong>P. Rajaperumal</strong>
          <span>Treasurer</span>
          <a href="tel:9524026692" class="btn btn-sm btn-outline">📞 Call 9524026692</a>
        </div>
      </div>

      <!-- Google Maps Card -->
      <div class="location-box text-center">
        <h4>Temple Location & Directions</h4>
        <p>1008 Sri Vrishabanath Bhagwan Jain Temple, Othalavadi Village, Chetpet Taluk, Tiruvannamalai District, Tamil Nadu – 632326</p>
        <a href="https://share.google/9k4PHPMGBsX1xCUaL" target="_blank" rel="noopener noreferrer" class="btn btn-gold">
          📍 Open in Google Maps
        </a>
      </div>
    </section>

  </main>

  <!-- Sticky Mobile Quick-Donate Bar -->
  <div class="sticky-donate-bar no-print">
    <div>
      <small style="display:block; color:var(--text-muted);">Sacred Offering</small>
      <strong style="color:var(--primary-terracotta);">UPI: f051m01588@indianbk</strong>
    </div>
    <a href="#donate-section" class="btn btn-gold btn-sm">⚡ Donate Now</a>
  </div>

  <!-- Fullscreen QR Code Modal -->
  <div id="qr-modal" class="modal no-print">
    <div class="modal-content text-center">
      <button id="close-qr-modal" class="modal-close">&times;</button>
      <h3>Scan UPI QR Code</h3>
      <img src="/assets/images/upi-qr.png" alt="UPI QR Code" class="qr-modal-img" />
      <p>Scan with Google Pay, PhonePe, Paytm, BHIM, or any UPI App</p>
    </div>
  </div>

  <!-- Lightbox Modal for Gallery -->
  <div id="lightbox-modal" class="modal no-print">
    <div class="modal-content lightbox-content">
      <button id="lightbox-close" class="modal-close">&times;</button>
      <img id="lightbox-img" src="" alt="Temple Photo" />
    </div>
  </div>

  <script type="module" src="/src/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create src/js/main.js Application Initializer**

```javascript
import { setLanguage } from './i18n.js';
import { initUPI } from './upi.js';
import { renderProposalTable, initProposalActions } from './proposal.js';
import { initGallery } from './gallery.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Modules
  initUPI();
  renderProposalTable();
  initProposalActions();
  initGallery();

  // Language Switching Buttons
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const lang = btn.getAttribute('data-lang');
      setLanguage(lang);
      renderProposalTable(); // re-render table headers with current language
    });
  });

  // Default Language
  setLanguage('en');
});
```

- [ ] **Step 3: Commit**

```bash
git add index.html src/js/main.js
git commit -m "feat: complete SPA assembly, SEO meta tags, Google Maps link, and module binding"
```

---

### Task 8: Build Verification & Cloudflare Readiness Test

**Files:**
- Output: `dist/`

- [ ] **Step 1: Execute Vite Build Command**

Run: `npm run build`
Expected: Output created in `dist/` folder with index.html and optimized bundled JS/CSS assets.

- [ ] **Step 2: Preview production build locally**

Run: `npm run preview`
Expected: Local preview server started cleanly on localhost port.

- [ ] **Step 3: Commit dist verification check**

```bash
git add .
git commit -m "build: verify static production build for Cloudflare Pages"
```
