# Donation Modal & Sacred Contribution Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the temple donation experience across devices by introducing a dedicated interactive Donation Modal (popup with Tab 1: UPI & Live QR Code, Tab 2: Direct Bank Transfer), an elegant in-page Sacred Contribution Overview Card, and a sleek mobile Floating Action Pill (FAB) replacing the bulky sticky bottom bar.

**Architecture:** 
1. The main page `#donate-section` is upgraded to an inspiring overview card featuring cause highlights (renovation, 80G tax benefit, ₹11,000+ stone plaque tier), quick credentials, and buttons to open the modal.
2. A new `#donation-modal` provides a focused, high-conversion donation experience with unified amount chips + integrated custom input pill, a live desktop-ready QR code scanner, mobile deep-links, and bank details with 1-click copy.
3. The bloated `.sticky-donate-bar` is replaced with a mobile-friendly Floating Action Pill (`#mobile-donate-fab`) in the bottom-right corner.

**Tech Stack:** Vanilla JavaScript (ES Modules), HTML5, Responsive CSS (Flexbox & CSS Grid), QuickChart QR API, Vite Build Tool.

## Global Constraints

- 100% key symmetry across all 4 language files: `src/js/data/{en,ta,hi,kn}.js`.
- Responsive down to 360px viewports with zero horizontal scrolling.
- Minimum 44px touch targets on interactive buttons.
- Modal accessibility: `Esc` key dismiss, backdrop click dismiss, accessible close button.
- Production build `npm run build` must succeed with 0 errors.
- Master verification suite `npm run test:all` must pass 100%.

---

### Task 1: Data Architecture & 4-Language Localization

**Files:**
- Modify: `src/js/data/en.js`
- Modify: `src/js/data/ta.js`
- Modify: `src/js/data/hi.js`
- Modify: `src/js/data/kn.js`
- Test: `node scripts/verify_i18n.mjs`

**Interfaces:**
- Produces: 8 new symmetric translation keys:
  - `modal_donation_title`
  - `tab_upi_qr`
  - `tab_bank_transfer`
  - `btn_open_donation_portal`
  - `btn_open_bank_portal`
  - `donation_card_subtitle`
  - `fab_donate`
  - `scan_qr_instantly_hint`

- [ ] **Step 1: Add new translation keys to `src/js/data/en.js`**
- [ ] **Step 2: Add symmetric translation keys to `src/js/data/ta.js`**
- [ ] **Step 3: Add symmetric translation keys to `src/js/data/hi.js`**
- [ ] **Step 4: Add symmetric translation keys to `src/js/data/kn.js`**
- [ ] **Step 5: Run `node scripts/verify_i18n.mjs` to ensure 100% key symmetry**
- [ ] **Step 6: Commit Task 1 changes to git**

---

### Task 2: DOM Restructuring in `index.html`

**Files:**
- Modify: `index.html:93-140` (In-Page `#donate-section`)
- Modify: `index.html:520-543` (Replace `.sticky-donate-bar` with `#mobile-donate-fab` and add `#donation-modal`)
- Test: `index.html` structure inspection

**Interfaces:**
- Consumes: Keys from Task 1
- Produces:
  - `#open-donate-modal-btn`, `#open-bank-modal-btn` on in-page card
  - `#mobile-donate-fab` button
  - `#donation-modal` with `.modal-tab-btn`, `#tab-content-upi`, `#tab-content-bank`, `#modal-preset-chips`, `#modal-custom-amount-input`, `#modal-pay-upi-btn`, `#modal-qr-img`, `#modal-download-qr-btn`

- [ ] **Step 1: Refactor `#donate-section` in `index.html` into the Sacred Contribution Overview Card**
- [ ] **Step 2: Replace `.sticky-donate-bar` with the Floating Action Pill `#mobile-donate-fab`**
- [ ] **Step 3: Implement `#donation-modal` dialog structure with Tab 1 (UPI & QR) and Tab 2 (Direct Bank Transfer)**
- [ ] **Step 4: Integrate the unified amount grid (5 preset chips + inline custom input pill) inside Tab 1**
- [ ] **Step 5: Commit Task 2 changes to git**

---

### Task 3: Interactive Logic in `src/js/upi.js` & `src/js/main.js`

**Files:**
- Modify: `src/js/upi.js`
- Modify: `src/js/main.js`
- Test: Script verification for event handlers and modal triggers

**Interfaces:**
- Consumes: Modal DOM elements from Task 2
- Produces: Modal opening/closing API, dynamic amount calculation, live QR update, tab switching, and one-click copy feedback

- [ ] **Step 1: Implement modal opening logic with target tab support (`openDonationModal(tab = 'upi')`) in `src/js/upi.js`**
- [ ] **Step 2: Bind Hero CTA, `#mobile-donate-fab`, `#open-donate-modal-btn`, and `#open-bank-modal-btn` to `openDonationModal`**
- [ ] **Step 3: Implement tab switcher (`UPI & QR` vs `Bank Transfer`) inside the modal**
- [ ] **Step 4: Connect unified amount chips + custom input box to update live QR code and UPI link**
- [ ] **Step 5: Implement modal close handlers (close button `&times;`, `Esc` key, outside backdrop click)**
- [ ] **Step 6: Wire one-click copy buttons inside Tab 2 with feedback toast**
- [ ] **Step 7: Commit Task 3 changes to git**

---

### Task 4: Responsive Mobile-First & Desktop CSS Styling (`src/css/main.css`)

**Files:**
- Modify: `src/css/main.css`
- Test: Visual inspection and responsive queries (360px, 480px, 768px, 1024px)

**Interfaces:**
- Consumes: Classes from Tasks 2 & 3
- Produces: Clean, modern, responsive styles for `#donate-section`, `#mobile-donate-fab`, and `#donation-modal`

- [ ] **Step 1: Style in-page `#donate-section` overview card (gold border, badges, buttons, credentials pill)**
- [ ] **Step 2: Style `#mobile-donate-fab` (fixed bottom-right floating action pill, hidden on desktop $\ge 768\text{px}$)**
- [ ] **Step 3: Style `#donation-modal` (backdrop-blur, max-width 780px, tab navigation bar, close button)**
- [ ] **Step 4: Style unified amount selector (CSS Grid with seamless custom amount input pill matching `.chip` aesthetics)**
- [ ] **Step 5: Style desktop 2-column layout (> 768px) with side-by-side QR code scanner**
- [ ] **Step 6: Add mobile responsive rules for $\le 768\text{px}$, $480\text{px}$, and $360\text{px}$**
- [ ] **Step 7: Commit Task 4 changes to git**

---

### Task 5: Master Verification, End-to-End Testing & Production Build

**Files:**
- Create: `scripts/verify_donation_redesign.mjs`
- Modify: `scripts/verify_all.mjs` (include new sub-suite)
- Test: Full test run `npm run test:all`
- Build: `npm run build`

**Interfaces:**
- Validates: Zero regressions across all prior suites and 100% pass on new donation modal functionality

- [ ] **Step 1: Write `scripts/verify_donation_redesign.mjs` to test DOM elements, modal triggers, and i18n keys**
- [ ] **Step 2: Add `verify_donation_redesign.mjs` to `scripts/verify_all.mjs`**
- [ ] **Step 3: Run `npm run test:all` and verify all tests pass**
- [ ] **Step 4: Run `npm run build` to compile the production bundle into `dist/`**
- [ ] **Step 5: Verify production bundle with `npm run test:all`**
- [ ] **Step 6: Commit and push changes to `origin/main`**
