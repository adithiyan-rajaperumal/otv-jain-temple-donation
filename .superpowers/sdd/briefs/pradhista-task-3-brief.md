# Task 3 Brief: Interactive Logic & Proposal Rendering (`pdfModal.js`, `proposal.js`, `main.js`)

## Objective
Implement `src/js/pdfModal.js` to manage the in-page PDF viewer modal, update `src/js/proposal.js` to render Package 4 (Panchakalyana Pradhista Mahotsava ₹50L) with dual view/download estimate buttons and the 4-part formula card totaling ₹1.26 Crores, and connect all view triggers in `src/js/main.js`.

## Target Files
- Create: `src/js/pdfModal.js`
- Modify: `src/js/proposal.js`
- Modify: `src/js/main.js`
- Test: `scripts/verify_pradhista_task_3.mjs`

---

## Deliverables

### 1. `src/js/pdfModal.js`
Create and export:
- `openPdfModal(pdfUrl, titleText, downloadFilename)`:
  - If `#pdf-modal` exists:
    - Update `#pdf-modal-title` text with `titleText` (fallback to "Official Document").
    - Set `#pdf-modal-frame` `src` to `pdfUrl`.
    - Set `#pdf-modal-download-btn` `href` to `pdfUrl` and `download` attribute to `downloadFilename || ''`.
    - Set `#pdf-modal-direct-link` `href` to `pdfUrl`.
    - Add class `active` to `#pdf-modal`.
    - Set `document.body.style.overflow = 'hidden'`.
    - Focus `#close-pdf-modal`.
- `closePdfModal()`:
  - Remove class `active` from `#pdf-modal`.
  - Set `#pdf-modal-frame` `src` to `about:blank`.
  - Restore `document.body.style.overflow = ''`.
  - Restore focus to previous active element.
- `initPdfModal()`:
  - Binds `#close-pdf-modal` click -> `closePdfModal()`.
  - Binds backdrop click (when clicking `#pdf-modal` directly outside `.pdf-modal-content`) -> `closePdfModal()`.
  - Binds `Escape` key on `document` -> if `#pdf-modal.active`, call `closePdfModal()`.
  - Binds delegation or click listeners on any element with `.btn-view-pdf`, `.btn-view-doc`, or `[data-pdf-url]`.

### 2. `src/js/proposal.js`
- **Top Budget Banner**:
  - Grand project budget: **`₹1,26,16,000`** (`~₹1.26 Crores`).
  - Label: `grand_project_budget_label` (`t('grand_project_budget_label')`).
  - Sub-pills:
    - Civil Engineering Works Subtotal (Packages 1-3): **`₹76,16,000`** (`proposalData.formattedCivilSubtotal`).
    - Panchakalyana Pradhista 5-Day Estimate (Package 4): **`₹50,00,000`** (`proposalData.formattedPradhistaSubtotal`).
- **Package 4 Card**:
  - Render alongside Packages 1, 2, 3:
    - Distinct sacred badge: `pkg_4_badge` (`🪔 5-Day Sacred Festival Estimate`).
    - Title: `pkg_4_title`.
    - Subtitle: `pkg_4_subtitle`.
    - Itemized table with the 3 items (Food & Annadanam ₹30L, Vidhan & Pooja items ₹10L, Pandhal, stage & logistics ₹10L).
    - Total: **`₹50,00,000`**.
    - For PDF download/view buttons: Package 4 has no PDF (`isCeremonialEstimate: true`), so render a festival note pill instead of a PDF button (prevents `href="undefined"`).
- **Packages 1, 2, 3 Dual Actions**:
  - In each certified package card (Package 1, 2, 3):
    - Provide both `[👁️ View Estimate PDF]` (`.btn.btn-outline.btn-view-pdf` with `data-pdf-url`, `data-pdf-title`, `data-pdf-filename`) AND `[📥 Download Estimate PDF]`.
- **Grand Summary Formula Card**:
  $$\text{Pkg 1 (₹31.60L)} + \text{Pkg 2 (₹18.61L)} + \text{Pkg 3 (₹25.95L)} + \text{Pkg 4 (₹50.00L)} = \mathbf{₹1,26,16,000}$$
- Clean up `initProposalActions` (remove old `window.print` listener).

### 3. `src/js/main.js`
- Import and initialize `initPdfModal`, `openPdfModal`.
- Expose `openPdfModal` on `window`.
- Wire dynamic update of Bhattarak view button (`#view-bhattarak-letter-btn`) and Notice view button (`#view-notice-pdf-btn`) whenever language changes (in `updateBhattarakDownloadLink` and `updateNoticeDownloadLink`).
- Re-bind view buttons after `renderProposalTable()`.

---

## Verification
- Create `scripts/verify_pradhista_task_3.mjs`:
  - Assert `openPdfModal` and `closePdfModal` exports.
  - Test simulated modal open and close via headless DOM.
  - Assert Package 4 renders with the 3 items and ₹50,00,000 total.
  - Assert top budget banner displays ₹1,26,16,000 without `undefined`.
  - Assert 4-part formula renders cleanly.
- Run: `node scripts/verify_pradhista_task_3.mjs` (must pass 100%).

## Git Commit
Commit message:
`feat(logic): implement pdf modal viewer and render package 4 pradhista estimate`
