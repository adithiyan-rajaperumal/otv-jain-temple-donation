# Task 2 Brief: DOM Restructuring in `index.html` (Notice Cleanup, Print Removal & PDF Modal)

## Objective
Refactor `index.html` to:
1. Remove the 4 redundant legacy scan thumbnails in the Notice section (`.notice-proofs`).
2. Remove the redundant `#print-proof-btn` (`🖨️ Print / Save Clean PDF Proof`) from the estimate section.
3. Add the semantic, accessible `#pdf-modal` container for viewing official PDFs in-page.
4. Upgrade document action buttons across `index.html` to provide both `[👁️ View PDF]` and `[📥 Download PDF]`.

## Target File
- `index.html`

---

## Detailed Requirements

### 1. Remove `.notice-proofs` in Notice Section
Locate and delete the entire `.notice-proofs` block (lines ~379-388):
```html
<div class="notice-proofs no-print">
  <h4 style="color:var(--primary-terracotta);" data-i18n="notice_proofs_heading">Printed Notice Color Scans & Proofs</h4>
  <div class="proof-thumbnails">
    ...
  </div>
</div>
```
Ensure `#notice-text-content` and the notice actions remain intact.

### 2. Remove `#print-proof-btn` in Proposal Section
Locate and delete the `<button id="print-proof-btn" ...>` element in `#proposal-section` (lines ~405-407).

### 3. Add `#pdf-modal` Container
Insert `#pdf-modal` right below `#donation-modal`:
```html
  <!-- In-Page PDF Lightbox Modal -->
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

### 4. Dual View & Download Buttons on Document Cards
- In `#tax-exemptions` (`.tax-docs-actions`):
  Wrap each document into a clean `.doc-action-card` or `.doc-action-item` with dual buttons:
  - 80G Approval:
    - `<button type="button" class="btn btn-doc-view btn-view-pdf" data-pdf-url="/assets/docs/form_80G_provisional_approval.pdf" data-pdf-title="Form 80G Provisional Approval" data-pdf-filename="1008_Sri_Vrishabanath_Temple_Form_80G_Approval.pdf"><span class="doc-icon">👁️</span> <span data-i18n="btn_view_pdf">👁️ View Document</span></button>`
    - `<a href="/assets/docs/form_80G_provisional_approval.pdf" download="1008_Sri_Vrishabanath_Temple_Form_80G_Approval.pdf" class="btn btn-doc-download" target="_blank" rel="noopener noreferrer"><span class="doc-icon">📥</span> <span class="doc-btn-text" data-i18n="btn_download_80g">📥 Download 80G Approval (PDF)</span></a>`
  - 12A Certificate:
    - `<button type="button" class="btn btn-doc-view btn-view-pdf" data-pdf-url="/assets/docs/form_12A_provisional_registration.pdf" data-pdf-title="Form 12A Provisional Registration" data-pdf-filename="1008_Sri_Vrishabanath_Temple_Form_12A_Registration.pdf"><span class="doc-icon">👁️</span> <span data-i18n="btn_view_pdf">👁️ View Document</span></button>`
    - `<a href="/assets/docs/form_12A_provisional_registration.pdf" download="1008_Sri_Vrishabanath_Temple_Form_12A_Registration.pdf" class="btn btn-doc-download" target="_blank" rel="noopener noreferrer"><span class="doc-icon">📥</span> <span class="doc-btn-text" data-i18n="btn_download_12a">📥 Download 12A Certificate (PDF)</span></a>`
  - Masked Trust Deed:
    - `<button type="button" class="btn btn-doc-view btn-view-pdf" data-pdf-url="/assets/docs/trust_registration_masked.pdf" data-pdf-title="Registered Trust Deed (Masked)" data-pdf-filename="1008_Sri_Vrishabanath_Temple_Trust_Deed_Masked.pdf"><span class="doc-icon">👁️</span> <span data-i18n="btn_view_pdf">👁️ View Document</span></button>`
    - `<a href="/assets/docs/trust_registration_masked.pdf" download="1008_Sri_Vrishabanath_Temple_Trust_Deed_Masked.pdf" class="btn btn-doc-download" target="_blank" rel="noopener noreferrer"><span class="doc-icon">📥</span> <span class="doc-btn-text" data-i18n="btn_download_trust_deed">📥 Download Masked Trust Deed (PDF)</span></a>`

- In `#bhattarak-blessing-section` (`.blessing-actions`):
  Add `#view-bhattarak-letter-btn`:
  - `<button id="view-bhattarak-letter-btn" type="button" class="btn btn-outline btn-view-pdf" data-pdf-url="/assets/docs/bhattarak_letter_ta.pdf" data-pdf-title="Bhattarak Swamiji Blessing Appeal"><span class="doc-icon">👁️</span> <span data-i18n="btn_view_pdf">👁️ View Document</span></button>`
  - Alongside existing `#download-bhattarak-letter-btn`.

- In `#notice-section` (`.notice-actions`):
  Add `#view-notice-pdf-btn`:
  - `<button id="view-notice-pdf-btn" type="button" class="btn btn-gold btn-sm btn-view-pdf" data-pdf-url="/assets/docs/notice_ta.pdf" data-pdf-title="Official Renovation Notice"><span class="doc-icon">👁️</span> <span data-i18n="btn_view_pdf">👁️ View Document</span></button>`
  - Alongside existing `#download-notice-pdf-btn`.

---

## Verification
- Valid HTML structure without unclosed tags.
- `#notice-proofs` is absent.
- `#print-proof-btn` is absent.
- `#pdf-modal` exists with `#pdf-modal-frame`, `#close-pdf-modal`, `#pdf-modal-download-btn`.

## Git Commit
Commit message:
`feat(ui): add pdf-modal, remove legacy notice scans and print button in index.html`
