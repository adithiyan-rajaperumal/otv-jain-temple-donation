# Panchakalyana Pradhista Estimate, In-Page PDF Viewer Modal & Section Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the ₹50 Lakhs Panchakalyana Pradhista 5-day estimate into a combined ₹1.26 Crore temple project budget, add an in-page interactive PDF viewer modal for all official documents with download capabilities, and clean up redundant legacy notice scans and print buttons.

**Architecture:** 
1. Expand `proposalData.js` and symmetric 4-language i18n dictionaries to support Package 4 (Panchakalyana Pradhista, 3 itemized categories totaling ₹50 Lakhs) alongside the 3 certified civil packages (₹76.16 Lakhs) yielding a grand total of ₹1,26,16,000 (~₹1.26 Crores).
2. Refactor `index.html` to remove the 4 legacy scan thumbnails and the redundant `#print-proof-btn`, and add the semantic `#pdf-modal` lightbox container.
3. Implement `src/js/pdfModal.js` to handle iframe embedding, direct downloads, accessibility, focus trapping, and backdrop/escape dismissal; update `proposal.js` to render Package 4 and the 4-part formula.
4. Add responsive styling in `src/css/main.css` for the PDF modal, Package 4 card, and dual view/download button groups.
5. Create an automated verification suite `scripts/verify_pradhista_and_pdf_viewer.mjs` wired into `scripts/verify_all.mjs`.

**Tech Stack:** Vanilla JavaScript (ES Modules), HTML5 semantic markup, CSS3 (Flexbox/Grid/Backdrop-filter), Vite, Node.js test runner.

---

## Global Constraints

- 100% key symmetry across all 4 language dictionaries (`en.js`, `ta.js`, `hi.js`, `kn.js`).
- Sum of Package 1 (₹31,60,000) + Package 2 (₹18,61,000) + Package 3 (₹25,95,000) = ₹76,16,000 (Certified Civil Works).
- Sum of Package 4 items (₹30,00,000 + ₹10,00,000 + ₹10,00,000) = ₹50,00,000 (Panchakalyana Pradhista 5-Day Estimate).
- Combined Grand Project Total = ₹1,26,16,000 (~₹1.26 Crores).
- Mobile-first responsiveness down to 360px without horizontal overflow.
- Minimum 44px touch targets on all interactive controls.
- All verification test suites must pass 100% via `npm run test:all`.
- Vite production build must succeed with 0 errors via `npm run build`.

---

### Task 1: Data Architecture & 4-Language Localization

**Files:**
- Modify: `src/js/data/proposalData.js`
- Modify: `src/js/data/en.js`
- Modify: `src/js/data/ta.js`
- Modify: `src/js/data/hi.js`
- Modify: `src/js/data/kn.js`
- Test: `scripts/verify_i18n.mjs`

**Interfaces:**
- Consumes: Existing package structures and i18n translation objects.
- Produces: `proposalData.grandTotal = 12616000`, `proposalData.civilSubtotal = 7616000`, `proposalData.pradhistaSubtotal = 5000000`, `proposalData.packages[3]` (`pkg_4`), and 11 new symmetric translation keys.

- [ ] **Step 1: Update `src/js/data/proposalData.js`**
  - Set `grandTotal: 12616000`, `formattedGrandTotal: "₹1,26,16,000"`, `totalEstimate: 12616000`, `formattedTotal: "₹1,26,16,000"`.
  - Add `civilSubtotal: 7616000`, `formattedCivilSubtotal: "₹76,16,000"`.
  - Add `pradhistaSubtotal: 5000000`, `formattedPradhistaSubtotal: "₹50,00,000"`.
  - Append `pkg_4` to `packages`:
    ```javascript
    {
      id: "pkg_4",
      titleKey: "pkg_4_title",
      subtitleKey: "pkg_4_subtitle",
      badgeKey: "pkg_4_badge",
      total: 5000000,
      formattedTotal: "₹50,00,000",
      isCeremonialEstimate: true,
      items: [
        { id: 1, descKey: "pkg_4_item_1", detail: "5 Days Continuous Annadanam & devotee arrangements", qty: "5 Days", rate: "Estimate", amount: 3000000, formattedAmount: "₹30,00,000" },
        { id: 2, descKey: "pkg_4_item_2", detail: "Vidhan, Homam, Pooja Sacred Items & Samagri", qty: "Pooja Samagri", rate: "Estimate", amount: 1000000, formattedAmount: "₹10,00,000" },
        { id: 3, descKey: "pkg_4_item_3", detail: "Pandhal, Stage, Lighting, Sound System, Generator Rent & General Logistics", qty: "Event Setup", rate: "Estimate", amount: 1000000, formattedAmount: "₹10,00,000" }
      ]
    }
    ```
  - Also append item to `items` array for backward compatibility:
    ```javascript
    { id: 9, descKey: "pkg_4_title", qty: "Panchakalyana Pradhista", rate: "5 Days Estimate", amount: 5000000, formattedAmount: "₹50,00,000" }
    ```

- [ ] **Step 2: Add 11 new translation keys across `en.js`, `ta.js`, `hi.js`, `kn.js`**
  Keys to add symmetrically:
  - `pkg_4_title`
  - `pkg_4_subtitle`
  - `pkg_4_badge`
  - `pkg_4_item_1`
  - `pkg_4_item_2`
  - `pkg_4_item_3`
  - `grand_project_budget_label`
  - `civil_works_subtotal_label`
  - `pradhista_subtotal_label`
  - `btn_view_pdf`
  - `pdf_modal_fallback_text`

- [ ] **Step 3: Update `scripts/verify_i18n.mjs` to validate the new totals and keys**
  - Verify `proposalData.grandTotal === 12616000`.
  - Verify `proposalData.packages.length === 4`.
  - Verify sum of 4 packages equals `12616000`.
  - Verify key count is 204 keys per language.

- [ ] **Step 4: Run test to verify passes**
  Run: `node scripts/verify_i18n.mjs`  
  Expected: PASS (100% key symmetry and data integrity).

- [ ] **Step 5: Commit Task 1 changes**
  ```bash
  git add src/js/data/proposalData.js src/js/data/en.js src/js/data/ta.js src/js/data/hi.js src/js/data/kn.js scripts/verify_i18n.mjs
  git commit -m "feat(data): add panchakalyana pradhista estimate and localization keys across 4 languages"
  ```

---

### Task 2: DOM Restructuring in `index.html` (Notice Cleanup, Print Removal & PDF Modal)

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: Translation keys from Task 1.
- Produces: `#pdf-modal` container, cleaned `#notice-card` (without `.notice-proofs`), cleaned `#proposal-section` (without `#print-proof-btn`), and dual view/download button markup.

- [ ] **Step 1: Remove `.notice-proofs` from `index.html`**
  - Delete lines containing `.notice-proofs` and the 4 legacy scan `<img>` tags in the Notice section.

- [ ] **Step 2: Remove `#print-proof-btn` from `index.html`**
  - Delete the `<button id="print-proof-btn" class="btn btn-gold" data-i18n="btn_print_proof">` element in `#proposal-section`.

- [ ] **Step 3: Add `#pdf-modal` container to `index.html`**
  - Insert `#pdf-modal` directly below `#donation-modal`:
    ```html
    <!-- Fullscreen / Lightbox PDF Document Viewer Modal -->
    <div id="pdf-modal" class="modal no-print" role="dialog" aria-modal="true" aria-labelledby="pdf-modal-title">
      <div class="modal-content pdf-modal-content">
        <div class="pdf-modal-header">
          <div class="pdf-modal-title-wrap">
            <span class="pdf-modal-icon">📄</span>
            <h3 id="pdf-modal-title" class="pdf-modal-title">Official Document</h3>
          </div>
          <div class="pdf-modal-controls">
            <a id="pdf-modal-download-btn" href="#" download class="btn btn-gold btn-sm">
              <span class="btn-icon">📥</span> <span data-i18n="btn_download">Download PDF</span>
            </a>
            <button id="close-pdf-modal" class="modal-close" aria-label="Close document viewer">&times;</button>
          </div>
        </div>
        <div class="pdf-modal-body">
          <iframe id="pdf-modal-frame" src="about:blank" title="PDF Document Viewer" frameborder="0"></iframe>
        </div>
        <div class="pdf-modal-footer text-center">
          <small>
            <span data-i18n="pdf_modal_fallback_text">Having trouble viewing?</span>
            <a id="pdf-modal-direct-link" href="#" target="_blank" rel="noopener noreferrer">
              🔗 Open in new tab
            </a>
          </small>
        </div>
      </div>
    </div>
    ```

- [ ] **Step 4: Update document action buttons across `index.html`**
  - In `#tax-exemptions` (`.tax-docs-actions`):
    Convert single download buttons to dual action groups:
    - 80G Approval: `[👁️ View PDF]` (`.btn-view-doc` with `data-pdf-url="/assets/docs/form_80G_provisional_approval.pdf"`) + `[📥 Download]`
    - 12A Certificate: `[👁️ View PDF]` + `[📥 Download]`
    - Masked Trust Deed: `[👁️ View PDF]` + `[📥 Download]`
  - In `#bhattarak-blessing-section`:
    Add `[👁️ View Blessing Letter]` alongside download.
  - In `#notice-section`:
    Add `[👁️ View Official Notice PDF]` (`#view-notice-pdf-btn`) alongside `#download-notice-pdf-btn`.

- [ ] **Step 5: Verify markup structure**
  - Validate HTML syntax and ensure all opening tags have matching closing tags.

- [ ] **Step 6: Commit Task 2 changes**
  ```bash
  git add index.html
  git commit -m "feat(ui): add pdf-modal, remove legacy notice scans and print button in index.html"
  ```

---

### Task 3: Interactive Logic & Proposal Rendering (`pdfModal.js`, `proposal.js`, `main.js`)

**Files:**
- Create: `src/js/pdfModal.js`
- Modify: `src/js/proposal.js`
- Modify: `src/js/main.js`
- Test: `scripts/verify_pradhista_task_3.mjs`

**Interfaces:**
- Consumes: `proposalData.packages` (including `pkg_4`), `t(key)` from `i18n.js`.
- Produces: `openPdfModal(url, title, filename)` and `closePdfModal()` exported from `src/js/pdfModal.js` and exposed on `window`.

- [ ] **Step 1: Create `src/js/pdfModal.js`**
  Implement:
  - `openPdfModal(pdfUrl, titleText, downloadFilename)`:
    - Update `#pdf-modal-title`.
    - Update `#pdf-modal-frame` `src` with `pdfUrl`.
    - Update `#pdf-modal-download-btn` `href` and `download` attribute.
    - Update `#pdf-modal-direct-link` `href`.
    - Add `.active` to `#pdf-modal`.
    - Set `document.body.style.overflow = 'hidden'`.
    - Focus `#close-pdf-modal`.
  - `closePdfModal()`:
    - Remove `.active` from `#pdf-modal`.
    - Set `#pdf-modal-frame` `src` to `about:blank`.
    - Restore `document.body.style.overflow = ''`.
    - Return focus to trigger element.
  - Event listeners: `#close-pdf-modal` click, backdrop click, and `Escape` key handler.

- [ ] **Step 2: Update `src/js/proposal.js`**
  - Update `renderProposalTable()`:
    - Top banner: Display Combined Project Total `₹1,26,16,000 (~₹1.26 Crores)` with sub-badges:
      - 🏛️ Certified Civil Works (Pkgs 1–3): ₹76,16,000
      - 🪔 Panchakalyana Pradhista 5-Day Estimate (Pkg 4): ₹50,00,000
    - Render Package 4 Card:
      - Title: `pkg_4_title`
      - Badge: `pkg_4_badge` (`🪔 5-Day Sacred Festival Estimate`)
      - Itemized table with the 3 items (Food & Annadanam ₹30L, Vidhan & Pooja items ₹10L, Event logistics & Pandhal ₹10L).
      - Total amount pill: `₹50,00,000`.
      - Note: *"Sacred religious festival estimate for 5-day Panchakalyana Pradhista Mahotsava"*.
    - Packages 1, 2, 3: Add `[👁️ View Estimate PDF]` button with `data-pdf-url` alongside `[📥 Download PDF]`.
    - Grand Summary Formula:
      $$\text{Pkg 1 (₹31.60L)} + \text{Pkg 2 (₹18.61L)} + \text{Pkg 3 (₹25.95L)} + \text{Pkg 4 (₹50.00L)} = \mathbf{₹1,26,16,000}$$
    - Clean up `initProposalActions` (remove old `window.print` listener).

- [ ] **Step 3: Update `src/js/main.js`**
  - Import `initPdfModal`, `openPdfModal` from `./pdfModal.js`.
  - Expose `openPdfModal` on `window`.
  - Wire dynamic PDF view/download links for Bhattarak letter and Notice PDF on language change.
  - Bind click listeners on all `.btn-view-pdf, .btn-view-doc, [data-pdf-url]` to invoke `openPdfModal()`.

- [ ] **Step 4: Write test script `scripts/verify_pradhista_task_3.mjs`**
  - Validate `openPdfModal` and `closePdfModal` exports.
  - Validate simulation of opening and closing `#pdf-modal`.
  - Validate Package 4 rendering and grand total calculations.

- [ ] **Step 5: Run tests**
  Run: `node scripts/verify_pradhista_task_3.mjs`  
  Expected: PASS.

- [ ] **Step 6: Commit Task 3 changes**
  ```bash
  git add src/js/pdfModal.js src/js/proposal.js src/js/main.js scripts/verify_pradhista_task_3.mjs
  git commit -m "feat(logic): implement pdf modal viewer and render package 4 pradhista estimate"
  ```

---

### Task 4: Responsive CSS Styling (`src/css/main.css`)

**Files:**
- Modify: `src/css/main.css`
- Test: `scripts/verify_pradhista_task_4.mjs`

**Interfaces:**
- Consumes: Class and ID names from Tasks 2 & 3 (`#pdf-modal`, `.pdf-modal-content`, `.doc-actions-group`, `.package-card.pkg-ceremonial`).
- Produces: Fully styled, responsive components down to 360px viewport.

- [ ] **Step 1: Add PDF Modal Styles in `src/css/main.css`**
  - Style `#pdf-modal`: backdrop filter blur(6px), dark overlay, z-index 1050.
  - Style `.pdf-modal-content`: flex column, max-width 920px, height 88vh, border-radius 14px, overflow hidden, gold border.
  - Style `.pdf-modal-header`: warm cream background `#FCFAF6`, flex row, bold title, action controls.
  - Style `.pdf-modal-body`: flex 1 1 auto, relative, 100% height, dark neutral viewer background.
  - Style `#pdf-modal-frame`: 100% width, 100% height, border none.
  - Style `.pdf-modal-footer`: clean notice, subtle border top, link styling.

- [ ] **Step 2: Style Package 4 Ceremonial Card & Grand Summary Breakdown**
  - Add `.package-card.pkg-ceremonial` styles: subtle sacred terracotta / gold gradient header, warm accent borders.
  - Style `.badge-ceremonial-estimate`: warm terracotta pill with gold border.
  - Style sub-badges in `.proposal-grand-total-banner`: `.sub-budget-pill` highlighting Civil Works (₹76.16L) and Pradhista (₹50.00L).
  - Style `.doc-actions-group`: inline-flex gap 8px, wrap on small screens.

- [ ] **Step 3: Responsive Media Queries**
  - `@media (max-width: 768px)`: `.pdf-modal-content` width 96%, height 90vh.
  - `@media (max-width: 480px)`: `.pdf-modal-content` width 98%, height 92vh, padding 0.
  - `@media (max-width: 360px)`: `.doc-actions-group` flex column, 100% width buttons.

- [ ] **Step 4: Run test to verify CSS rules**
  Run: `node scripts/verify_pradhista_task_4.mjs`  
  Expected: PASS.

- [ ] **Step 5: Commit Task 4 changes**
  ```bash
  git add src/css/main.css scripts/verify_pradhista_task_4.mjs
  git commit -m "feat(css): style pdf modal viewer, package 4 ceremonial card, and dual action buttons"
  ```

---

### Task 5: Master Verification, Integration & Production Build

**Files:**
- Create: `scripts/verify_pradhista_and_pdf_viewer.mjs`
- Modify: `scripts/verify_all.mjs`
- Test: `npm run test:all`, `npm run build`

**Interfaces:**
- Consumes: All outputs from Tasks 1–4.
- Produces: Integrated test suite, verified production bundles in `dist/`.

- [ ] **Step 1: Write `scripts/verify_pradhista_and_pdf_viewer.mjs`**
  Comprehensive assertions covering:
  - 4-language i18n symmetry (204/204 keys per language).
  - Package 4 data integrity (₹50L sum, items ₹30L, ₹10L, ₹10L).
  - Grand total budget calculation: ₹1,26,16,000 (~₹1.26 Crores).
  - `#notice-proofs` completely removed from `index.html`.
  - `#print-proof-btn` completely removed from `index.html`.
  - `#pdf-modal` DOM structure, iframe, download button, and close controls.
  - DOM simulation for `openPdfModal()` and `closePdfModal()`.
  - Responsive CSS checks for `#pdf-modal` and Package 4 styling.

- [ ] **Step 2: Wire `scripts/verify_pradhista_and_pdf_viewer.mjs` into `scripts/verify_all.mjs`**
  - Add to `subSuites` in Section 1 of `verify_all.mjs`.

- [ ] **Step 3: Run master verification suite**
  Run: `npm run test:all`  
  Expected: PASS (100% of all suites passing).

- [ ] **Step 4: Run production build**
  Run: `npm run build`  
  Expected: Vite build succeeds with 0 errors.

- [ ] **Step 5: Commit Task 5 changes**
  ```bash
  git add scripts/verify_pradhista_and_pdf_viewer.mjs scripts/verify_all.mjs dist/
  git commit -m "test(pradhista): add master verification suite for pradhista estimate and pdf viewer"
  ```

---

## Plan Self-Review
- **Spec Coverage:** Covers all 4 user requirements from the spec (Package 4 ₹50L estimate, notice scans removal, print button removal, and in-page PDF viewer modal).
- **Placeholder Scan:** Zero placeholders, complete code structures provided.
- **Type Consistency:** Method signatures (`openPdfModal(url, title, filename)`), package keys (`pkg_4_title`, etc.), and DOM IDs (`#pdf-modal`, `#pdf-modal-frame`) are consistent across tasks.
