# Task 5 Brief: Master Verification, Integration & Production Build

## Objective
Implement a comprehensive master verification suite `scripts/verify_pradhista_and_pdf_viewer.mjs`, wire it into `scripts/verify_all.mjs`, update any outdated assertions in `verify_all.mjs`, ensure `npm run test:all` passes 100% with zero regressions, and run a clean production build (`npm run build`).

## Target Files
- Create: `scripts/verify_pradhista_and_pdf_viewer.mjs`
- Modify: `scripts/verify_all.mjs`
- Update: `dist/` (via `npm run build`)

---

## Detailed Deliverables

### 1. Master Verification Script: `scripts/verify_pradhista_and_pdf_viewer.mjs`
Build an end-to-end verification script with clear section logging and strict assertions:
- **Section 1: 4-Language Localization Symmetry**:
  - Load `en.js`, `ta.js`, `hi.js`, `kn.js`.
  - Assert exact 204 keys per language.
  - Assert 0 missing keys, 0 extra keys, 0 empty string values.
  - Assert presence of all 11 new keys in all 4 languages.
- **Section 2: Proposal Data Architecture & Budget Totals**:
  - Assert `proposalData.grandTotal === 12616000` (`"₹1,26,16,000"`).
  - Assert `proposalData.civilSubtotal === 7616000`.
  - Assert `proposalData.pradhistaSubtotal === 5000000`.
  - Assert 4 packages in `packages` array.
  - Assert Package 4 items sum to 5000000 (3000000 + 1000000 + 1000000).
  - Assert sum of all 4 package totals equals 12616000.
- **Section 3: DOM Restructuring & Section Cleanup**:
  - Assert `.notice-proofs` does NOT exist in `index.html`.
  - Assert `#print-proof-btn` does NOT exist in `index.html`.
  - Assert `#pdf-modal` exists with `.pdf-modal-content`, `#pdf-modal-frame`, `#close-pdf-modal`, `#pdf-modal-download-btn`, and `#pdf-modal-direct-link`.
  - Assert document view buttons exist with `.btn-view-pdf` and `data-pdf-url`.
- **Section 4: Proposal Rendering Simulation**:
  - Simulate `renderProposalTable()` in JSDOM / mock DOM.
  - Assert top banner contains ₹1,26,16,000 and sub-pills for Civil Works (₹76.16L) and Pradhista (₹50.00L).
  - Assert no `undefined` strings in generated HTML.
  - Assert Package 4 card renders with title, badge, and the 3 itemized lines.
  - Assert 4-part formula card renders cleanly.
- **Section 5: PDF Modal Interactive Simulation**:
  - Test `openPdfModal(url, title, filename)`: sets frame `src`, title, download link, adds `.active`, sets `overflow: hidden`.
  - Test `closePdfModal()`: removes `.active`, resets frame `src` to `'about:blank'`, restores overflow.
  - Test `Escape` key dismissal.
  - Test backdrop click dismissal.
- **Section 6: Responsive CSS Verification**:
  - Assert CSS rules in `src/css/main.css` for `#pdf-modal`, `.pdf-modal-content`, `.package-card.pkg-ceremonial`, `.badge-ceremonial-estimate`, `.sub-budget-pill`.
  - Assert responsive media queries for 768px, 480px, 360px.

### 2. Integration into `scripts/verify_all.mjs`
- Add `verify_pradhista_and_pdf_viewer.mjs` to `subSuites` in Section 1 of `verify_all.mjs`.
- In `verify_all.mjs`:
  - Update Section 2 `proposalData` checks if it asserted prior ₹76.16L budget to now validate the updated ₹1.26 Cr grand total.
  - Update legacy sub-suite calls if needed so that `npm run test:all` executes cleanly.

### 3. Production Build
- Run `npm run build` and ensure Vite bundles without errors or warnings.

---

## Verification
- Run: `node scripts/verify_pradhista_and_pdf_viewer.mjs`
- Run: `npm run test:all` (100% pass)
- Run: `npm run build` (0 errors)

## Git Commit
Commit message:
`test(pradhista): add master verification suite for pradhista estimate and pdf viewer`
