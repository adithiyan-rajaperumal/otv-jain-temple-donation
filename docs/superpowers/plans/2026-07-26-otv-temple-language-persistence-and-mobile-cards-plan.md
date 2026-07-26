# Language Persistence & Mobile Proposal Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement `localStorage` and URL parameter language persistence across page reloads, and add a responsive mobile stacked card view (`< 600px`) for the estimate proposal list.

**Architecture:** Update `i18n.js` with `resolveInitialLanguage()` and `localStorage` persistence, update `main.js` language selector sync, enhance `proposal.js` to render both desktop table and mobile card list markup, and add media query rules in `main.css`.

**Tech Stack:** HTML5, Vanilla JavaScript (ES modules), CSS3 (Flexbox/Grid, Media Queries).

## Global Constraints
- Target Languages: `ta` (default), `en`, `hi`, `kn`.
- Persistence Key: `'temple_lang'` in `localStorage`.
- Breakpoint for Mobile Cards: `<= 600px` screen width.
- Zero horizontal overflow bleed on mobile viewports.

---

### Task 1: Language Persistence in `i18n.js` and `main.js`

**Files:**
- Modify: `d:/otv_temple_donation/otv-jain-temple-donation/src/js/i18n.js:1-48`
- Modify: `d:/otv_temple_donation/otv-jain-temple-donation/src/js/main.js:13-42`

**Interfaces:**
- Consumes: `translations`, `setLanguage(lang)`.
- Produces: `resolveInitialLanguage()` exported from `i18n.js`.

- [ ] **Step 1: Update `src/js/i18n.js` to add `resolveInitialLanguage()` and save to `localStorage`**

```javascript
import { en } from './data/en.js';
import { ta } from './data/ta.js';
import { hi } from './data/hi.js';
import { kn } from './data/kn.js';

const translations = { en, ta, hi, kn };
let currentLang = 'ta';

export function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  document.documentElement.lang = lang;
  
  // Save preference to localStorage
  try {
    localStorage.setItem('temple_lang', lang);
  } catch (e) {
    // Storage inaccessible fallback
  }

  // Text content updates
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // HTML content updates
  const htmlElements = document.querySelectorAll('[data-i18n-html]');
  htmlElements.forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  // Notice Body update
  const noticeContainer = document.getElementById('notice-text-content');
  if (noticeContainer && translations[lang].notice_body) {
    noticeContainer.innerHTML = translations[lang].notice_body.replace(/\n/g, '<br/>');
  }

  document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

export function resolveInitialLanguage() {
  const validLangs = ['ta', 'en', 'hi', 'kn'];
  
  // 1. Check URL query param ?lang=xx
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang && validLangs.includes(urlLang)) {
      return urlLang;
    }
  } catch (e) {}

  // 2. Check localStorage
  try {
    const savedLang = localStorage.getItem('temple_lang');
    if (savedLang && validLangs.includes(savedLang)) {
      return savedLang;
    }
  } catch (e) {}

  // 3. Fallback default
  return 'ta';
}

export function t(key) {
  return (translations[currentLang] && translations[currentLang][key]) ? translations[currentLang][key] : key;
}

export function getCurrentLanguage() {
  return currentLang;
}
```

- [ ] **Step 2: Update `src/js/main.js` to call `resolveInitialLanguage()` and update active button UI**

```javascript
import { setLanguage, resolveInitialLanguage } from './i18n.js';
import { initUPI } from './upi.js';
import { renderProposalTable, initProposalActions } from './proposal.js';
import { initGallery } from './gallery.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Modules
  initUPI();

  // Determine initial language
  const initialLang = resolveInitialLanguage();
  setLanguage(initialLang);

  // Sync Language Switching Buttons Active Class
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    if (btn.getAttribute('data-lang') === initialLang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }

    btn.addEventListener('click', () => {
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const lang = btn.getAttribute('data-lang');
      setLanguage(lang);
      renderProposalTable(); // re-render table headers with selected language
    });
  });

  renderProposalTable();
  initProposalActions();
  initGallery();

  // Proof Images & Architectural Plans Lightbox Viewer
  const proofImgs = document.querySelectorAll('.proof-thumbnails img, .plan-card img');
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');

  proofImgs.forEach(img => {
    img.addEventListener('click', () => {
      if (lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
      }
    });
  });
});
```

- [ ] **Step 3: Commit language persistence changes**

```bash
git add src/js/i18n.js src/js/main.js
git commit -m "feat: implement localStorage and URL parameter language persistence"
```

---

### Task 2: Mobile Proposal Cards Markup in `proposal.js`

**Files:**
- Modify: `d:/otv_temple_donation/otv-jain-temple-donation/src/js/proposal.js:1-50`

**Interfaces:**
- Consumes: `proposalData`, `t(key)`.
- Produces: Dual output `#proposal-table-container` with desktop table and mobile cards list.

- [ ] **Step 1: View `src/js/proposal.js` contents**

Let's view `src/js/proposal.js`.

- [ ] **Step 2: Update `src/js/proposal.js` to render mobile cards alongside desktop table**

```javascript
import { proposalData } from './data/proposalData.js';
import { t } from './i18n.js';

export function renderProposalTable() {
  const container = document.getElementById('proposal-table-container');
  if (!container) return;

  // 1. Desktop Table HTML
  let desktopHtml = `
    <div class="table-responsive proposal-table-desktop">
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
    desktopHtml += `
      <tr>
        <td>${item.id}</td>
        <td>${t(item.descKey)}</td>
        <td>${item.qty}</td>
        <td>${item.rate}</td>
        <td class="text-right font-weight-bold">${item.formattedAmount}</td>
      </tr>
    `;
  });

  desktopHtml += `
        <tr class="total-row">
          <td colspan="4" class="font-weight-bold">${t('total_estimated_amount')}</td>
          <td class="text-right font-weight-bold" style="color: var(--primary-terracotta);">${proposalData.formattedTotal}</td>
        </tr>
      </tbody>
    </table>
  </div>
  `;

  // 2. Mobile Stacked Cards HTML (< 600px)
  let mobileCardsHtml = `<div class="proposal-cards-mobile">`;

  proposalData.items.forEach(item => {
    mobileCardsHtml += `
      <div class="proposal-item-card">
        <div class="card-item-header">
          <span class="item-number-badge">#${item.id}</span>
          <h4 class="card-item-title">${t(item.descKey)}</h4>
        </div>
        <div class="card-item-details">
          <div class="detail-pill">
            <small>${t('th_qty')}</small>
            <strong>${item.qty}</strong>
          </div>
          <div class="detail-pill">
            <small>${t('th_rate')}</small>
            <strong>${item.rate}</strong>
          </div>
        </div>
        <div class="card-item-footer">
          <span>${t('th_amount')}</span>
          <strong class="card-amount-badge">${item.formattedAmount}</strong>
        </div>
      </div>
    `;
  });

  mobileCardsHtml += `
    <div class="proposal-mobile-total-card">
      <span>${t('total_estimated_amount')}</span>
      <strong class="total-amount-highlight">${proposalData.formattedTotal}</strong>
    </div>
  </div>
  `;

  container.innerHTML = desktopHtml + mobileCardsHtml;
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

- [ ] **Step 3: Commit proposal.js changes**

```bash
git add src/js/proposal.js
git commit -m "feat: render mobile proposal cards alongside desktop table"
```

---

### Task 3: Mobile Proposal Cards Styling in `main.css`

**Files:**
- Modify: `d:/otv_temple_donation/otv-jain-temple-donation/src/css/main.css:480-515`

**Interfaces:**
- Consumes: `.proposal-table-desktop`, `.proposal-cards-mobile`, `.proposal-item-card`.
- Produces: Responsive card list styling under 600px.

- [ ] **Step 1: Add mobile cards CSS rules in `src/css/main.css`**

```css
/* Responsive Proposal Cards vs Table */
@media (min-width: 601px) {
  .proposal-cards-mobile {
    display: none !important;
  }
  .proposal-table-desktop {
    display: block;
  }
}

@media (max-width: 600px) {
  .proposal-table-desktop, .table-responsive {
    display: none !important;
  }
  .proposal-cards-mobile {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 20px;
  }
}

.proposal-item-card {
  background: #FFFDF9;
  border: 1px solid #EFE5D8;
  border-left: 4px solid var(--primary-terracotta);
  border-radius: var(--radius-md);
  padding: 14px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.card-item-header {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 10px;
}

.item-number-badge {
  background: var(--primary-terracotta);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 12px;
  flex-shrink: 0;
  margin-top: 2px;
}

.card-item-title {
  margin: 0;
  font-size: 0.94rem;
  color: var(--primary-terracotta);
  line-height: 1.35;
}

.card-item-details {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.detail-pill {
  background: #F8F3EC;
  border-radius: 6px;
  padding: 6px 10px;
  flex: 1;
  min-width: 120px;
}

.detail-pill small {
  display: block;
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-bottom: 2px;
}

.detail-pill strong {
  font-size: 0.85rem;
  color: var(--text-dark);
}

.card-item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px dashed #EFE5D8;
  padding-top: 8px;
  font-size: 0.88rem;
  color: var(--text-muted);
}

.card-amount-badge {
  color: var(--primary-terracotta);
  font-size: 1rem;
  font-weight: 700;
}

.proposal-mobile-total-card {
  background: var(--primary-terracotta);
  color: white;
  padding: 14px 16px;
  border-radius: var(--radius-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: 0.95rem;
  margin-top: 6px;
}

.total-amount-highlight {
  color: var(--accent-gold-bright);
  font-size: 1.15rem;
}
```

- [ ] **Step 2: Commit CSS changes**

```bash
git add src/css/main.css
git commit -m "style: add mobile stacked cards styles for proposal estimates"
```

---

### Task 4: End-to-End Verification & Build Check

- [ ] **Step 1: Run Vite build**

Run: `npx vite build`
Expected: Clean build with zero errors.

- [ ] **Step 2: Commit final build artifacts & push**
