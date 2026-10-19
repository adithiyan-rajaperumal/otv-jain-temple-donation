# Task 2 Report: DOM Restructuring in `index.html` (Notice Cleanup, Print Removal & PDF Modal)

**Status:** DONE  
**Branch:** `feat/pradhista-estimate-pdf-viewer-cleanup`  
**Commit SHA:** `081727f0c60e00bee0eef028ef930a629b5538c7`  

---

## 1. Summary of Deliverables

### A. Removal of Legacy Thumbnails & Print Button
- **Removed `.notice-proofs`**: Deleted the redundant `.notice-proofs` block containing the 4 color scan thumbnails (`english_notice_color.jpg`, `tamil_notice_colour.jpg`, `hindhi_notice_color.jpg`, `kannada_notice_color.jpg`) from the Notice section.
- **Removed `#print-proof-btn`**: Deleted the legacy `🖨️ Print / Save Clean PDF Proof` button from `#proposal-section`.

### B. In-Page PDF Lightbox Modal (`#pdf-modal`)
- Injected the accessible, responsive `#pdf-modal` container directly below `#donation-modal`:
  - Header: `#pdf-modal-title` with document icon, `#pdf-modal-download-btn` for direct download, and `#close-pdf-modal` close trigger.
  - Body: `#pdf-modal-frame` `<iframe>` (initialized to `about:blank`, sandboxed/styled for document previews).
  - Footer: `#pdf-modal-direct-link` with `data-i18n="pdf_modal_fallback_text"` for fallback browser viewing in a new tab.

### C. Dual Action Document Cards (View + Download)
- **`#tax-exemptions` (`.trust-doc-downloads.tax-docs-actions`)**:
  Wrapped each credential document into `.doc-action-card.doc-actions-group` featuring dual action buttons:
  1. **80G Approval**: `[👁️ View Document]` (`.btn-doc-view.btn-view-pdf` with metadata attributes) + `[📥 Download 80G Approval (PDF)]`
  2. **12A Certificate**: `[👁️ View Document]` + `[📥 Download 12A Certificate (PDF)]`
  3. **Masked Trust Deed**: `[👁️ View Document]` + `[📥 Download Masked Trust Deed (PDF)]`
- **`#bhattarak-blessing-section` (`.blessing-actions`)**:
  Added `#view-bhattarak-letter-btn` (`.btn-view-pdf` with `data-pdf-url="/assets/docs/bhattarak_letter_ta.pdf"`) alongside existing `#download-bhattarak-letter-btn`.
- **`#notice-section` (`.notice-actions`)**:
  Added `id="notice-section"` and `#view-notice-pdf-btn` (`.btn-view-pdf` with `data-pdf-url="/assets/docs/notice_ta.pdf"`) alongside existing `#download-notice-pdf-btn`.

---

## 2. Verification Command Output

Executed `scripts/verify_pradhista_task_2.mjs`:
```
=== Verifying Task 2: DOM Restructuring in index.html ===

--- 1. Absence of Legacy Elements ---
✓ [PASS] Absent as expected: .notice-proofs container
✓ [PASS] Absent as expected: #print-proof-btn element
✓ [PASS] Absent as expected: Printed Notice Color Scans & Proofs text
✓ [PASS] Absent as expected: Legacy notice thumbnail <img> english_notice_color.jpg
✓ [PASS] Absent as expected: Legacy notice thumbnail <img> tamil_notice_colour.jpg
✓ [PASS] Absent as expected: Legacy notice thumbnail <img> hindhi_notice_color.jpg
✓ [PASS] Absent as expected: Legacy notice thumbnail <img> kannada_notice_color.jpg

--- 2. Presence and Structure of #pdf-modal ---
✓ [PASS] Found: #pdf-modal container
✓ [PASS] Found: .pdf-modal-content
✓ [PASS] Found: .pdf-modal-header
✓ [PASS] Found: #pdf-modal-title
✓ [PASS] Found: #pdf-modal-download-btn
✓ [PASS] Found: #close-pdf-modal
✓ [PASS] Found: .pdf-modal-body
✓ [PASS] Found: #pdf-modal-frame iframe
✓ [PASS] Found: #pdf-modal-direct-link fallback link
✓ [PASS] Found: data-i18n="pdf_modal_fallback_text"

--- 3. Dual Document Action Buttons ---
✓ [PASS] Found: 80G View button
✓ [PASS] Found: 80G Download button
✓ [PASS] Found: 12A View button
✓ [PASS] Found: 12A Download button
✓ [PASS] Found: Trust Deed View button
✓ [PASS] Found: Trust Deed Download button
✓ [PASS] Found: Bhattarak Letter View button (#view-bhattarak-letter-btn)
✓ [PASS] Found: Bhattarak Letter Download button (#download-bhattarak-letter-btn)
✓ [PASS] Found: Notice PDF View button (#view-notice-pdf-btn)
✓ [PASS] Found: Notice PDF Download button (#download-notice-pdf-btn)

Total .btn-view-pdf buttons found: 5
✓ [PASS] Exactly 5 .btn-view-pdf buttons present (80G, 12A, Trust Deed, Bhattarak Letter, Notice)

--- 4. Tag Closure & Integrity Sanity Check ---
✓ [PASS] Tag <div> balanced: 124 open, 124 close
✓ [PASS] Tag <section> balanced: 9 open, 9 close
✓ [PASS] Tag <button> balanced: 36 open, 36 close
✓ [PASS] Tag <a> balanced: 17 open, 17 close
✓ [PASS] Tag <span> balanced: 90 open, 90 close
✓ [PASS] Tag <p> balanced: 18 open, 18 close
✓ [PASS] Tag <h3> balanced: 10 open, 10 close
✓ [PASS] Tag <h4> balanced: 10 open, 10 close
✓ [PASS] Tag <small> balanced: 6 open, 6 close
✓ [PASS] Tag <iframe> balanced: 1 open, 1 close

====================================
🎉 Task 2 verification PASSED cleanly!
```
