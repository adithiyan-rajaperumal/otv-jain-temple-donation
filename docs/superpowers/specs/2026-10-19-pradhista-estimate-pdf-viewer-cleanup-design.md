# Design Specification: Panchakalyana Pradhista Estimate, In-Page PDF Viewer Modal & Section Cleanup

**Date:** 2026-10-19  
**Status:** Approved  
**Branch:** `feat/pradhista-estimate-pdf-viewer-cleanup` (branched from `main`)

---

## 1. Overview & Objectives

This specification defines 4 interconnected improvements to the 1008 Sri Virshabanath Bhagwan Jain Temple website:
1. **Panchakalyana Pradhista 5-Day Estimate (Package 4) & Grand Budget Architecture**:
   - Add the ₹50 Lakhs rough estimate for the 5-day Panchakalyana Pradhista Mahotsava across 3 itemized categories: Annadanam & logistics (₹30L), Vidhan & sacred pooja items (₹10L), and Pandhal, stage, lighting & generator (₹10L).
   - Sum this alongside the 3 existing certified civil packages (₹76,16,000) for a combined Total Project Budget of **₹1,26,16,000 (~₹1.26 Crores)**.
2. **Remove Redundant Legacy Scanned Notice Images**:
   - Clean up the 4 legacy blurry scan thumbnails in the Notice section (`.notice-proofs`) to streamline page layout.
3. **Remove Redundant Print Button**:
   - Remove the `🖨️ Print / Save Clean PDF Proof` button (`#print-proof-btn`) from the estimate section.
4. **Interactive In-Page PDF Lightbox Modal (`#pdf-modal`)**:
   - Create a dedicated, accessible in-page modal to preview any official PDF document (estimates, 80G, 12A, Trust deed, Swamiji blessing letter, official notice) directly in the browser, with an integrated `[📥 Download PDF]` button and fallback direct-link.

---

## 2. Data Architecture & 4-Language Localization

### 2.1 `src/js/data/proposalData.js` Updates
- `grandTotal`: `12616000` (formatted: `"₹1,26,16,000"`, label: `"~₹1.26 Crores"`)
- `civilSubtotal`: `7616000` (formatted: `"₹76,16,000"`)
- `pradhistaSubtotal`: `5000000` (formatted: `"₹50,00,000"`)
- Add `pkg_4` to `packages`:
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
      {
        id: 1,
        descKey: "pkg_4_item_1",
        detail: "Continuous Annadanam for devotees & pilgrim arrangements for 5 days",
        qty: "5 Days",
        rate: "Estimated",
        amount: 3000000,
        formattedAmount: "₹30,00,000"
      },
      {
        id: 2,
        descKey: "pkg_4_item_2",
        detail: "Vidhan, Homam, Pooja Sacred Items & Samagri",
        qty: "Pooja Samagri",
        rate: "Estimated",
        amount: 1000000,
        formattedAmount: "₹10,00,000"
      },
      {
        id: 3,
        descKey: "pkg_4_item_3",
        detail: "Pandhal, Stage, Sound & Lighting, Generator Rent & General Logistics",
        qty: "Event Setup",
        rate: "Estimated",
        amount: 1000000,
        formattedAmount: "₹10,00,000"
      }
    ]
  }
  ```

### 2.2 Translation Keys (`en.js`, `ta.js`, `hi.js`, `kn.js`)
Symmetric 4-language keys to add:
- `pkg_4_title`:
  - EN: "Panchakalyana Pradhista Mahotsava (5-Day Sacred Festival)"
  - TA: "5 நாட்கள் பஞ்சகல்யாண பிரதிஷ்டா பெருவிழா"
  - HI: "पंचकल्याणक प्रतिष्ठा महोत्सव (5 दिवसीय पावन समारोह)"
  - KN: "ಪಂಚಕಲ್ಯಾಣ ಪ್ರತಿಷ್ಠಾ ಮಹೋತ್ಸವ (5 ದಿನಗಳ ಪವಿತ್ರ ಸಮಾರಂಭ)"
- `pkg_4_subtitle`:
  - EN: "Estimated expenditure for 5-day continuous Annadanam, Vidhan, sacred pooja samagri, pandhal, lighting & logistics"
  - TA: "5 நாள் அன்னதானம், விதான், பூஜை திரவியங்கள், பந்தல், மின் அலங்காரம் மற்றும் மேடை அமைப்புகள் உத்தேச மதிப்பீடு"
  - HI: "5 दिवसीय निरंतर अन्नदान, विधान, पावन पूजन सामग्री, शामियाना, विद्युत सज्जा एवं व्यवस्था व्यय का अनुमान"
  - KN: "5 ದಿನಗಳ ನಿರಂತರ ಅನ್ನದಾನ, ವಿಧಾನ, ಪೂಜಾ ಸಾಮಗ್ರಿಗಳು, ಪೆಂಡಾಲ್, ವಿದ್ಯುತ್ ದೀಪಾಲಂಕಾರ ಮತ್ತು ವ್ಯವಸ್ಥೆಗಳ ಅಂದಾಜು"
- `pkg_4_badge`:
  - EN: "🪔 5-Day Sacred Festival Estimate"
  - TA: "🪔 5-நாள் பெருவிழா உத்தேச மதிப்பீடு"
  - HI: "🪔 5-दिवसीय पावन महोत्सव अनुमान"
  - KN: "🪔 5-ದಿನಗಳ ಪವಿತ್ರ ಮಹೋತ್ಸವ ಅಂದಾಜು"
- `pkg_4_item_1`:
  - EN: "Food for 5 Days (Continuous Annadanam for Devotees) & Pradhista Arrangements"
  - TA: "5 நாட்களுக்கான அன்னதானம் மற்றும் பிரதிஷ்டா உணவு உபசரிப்பு ஏற்பாடுகள்"
  - HI: "5 दिनों हेतु अन्नदान (भक्तों के लिए निरंतर भोजन व्यवस्था) एवं प्रतिष्ठा प्रबंध"
  - KN: "5 ದಿನಗಳ ಅನ್ನದಾನ (ಭಕ್ತರಿಗೆ ನಿರಂತರ ಊಟೋಪಹಾರ) ಮತ್ತು ಪ್ರತಿಷ್ಠಾ ವ್ಯವಸ್ಥೆಗಳು"
- `pkg_4_item_2`:
  - EN: "Vidhan, Homam, Pooja Sacred Items & Samagri"
  - TA: "விதான், ஹோமம், விசேஷ பூஜை திரவியங்கள் மற்றும் மங்கலப் பொருட்கள்"
  - HI: "विधान, होम, पूजन सामग्री एवं विशेष पावन द्रव्य"
  - KN: "ವಿಧಾನ, ಹೋಮ, ಪೂಜಾ ಸಾಮಗ್ರಿಗಳು ಮತ್ತು ವಿಶೇಷ ಪವಿತ್ರ ದ್ರವ್ಯಗಳು"
- `pkg_4_item_3`:
  - EN: "Pandhal, Stage, Lighting, Sound System, Generator Rent & General Logistics"
  - TA: "பந்தல், மேடை, அலங்கார விளக்குகள், ஒலிபெருக்கி, ஜெனரேட்டர் வாடகை மற்றும் இதர பொது ஏற்பாடுகள்"
  - HI: "पंडाल, मंच, प्रकाश व्यवस्था, ध्वनि यंत्र, जनरेटर किराया एवं समस्त व्यवस्थाएं"
  - KN: "ಪೆಂಡಾಲ್, ವೇದಿಕೆ, ದೀಪಾಲಂಕಾರ, ಧ್ವನಿವರ್ಧಕ, ಜನರೇಟರ್ ಬಾಡಿಗೆ ಮತ್ತು ಸಾಮಾನ್ಯ ವ್ಯವಸ್ಥೆಗಳು"
- `grand_project_budget_label`:
  - EN: "COMBINED TOTAL PROJECT BUDGET (RENOVATION + PRADHISTA):"
  - TA: "மொத்த திருப்பணி மற்றும் பஞ்சகல்யாண பிரதிஷ்டா திட்ட பட்ஜெட்:"
  - HI: "कुल जीर्णोद्धार एवं पंचकल्याणक प्रतिष्ठा परियोजना बजट:"
  - KN: "ಒಟ್ಟು ಜೀರ್ಣೋದ್ಧಾರ ಮತ್ತು ಪಂಚಕಲ್ಯಾಣ ಪ್ರತಿಷ್ಠಾ ಯೋಜನಾ ಬಜೆಟ್:"
- `civil_works_subtotal_label`:
  - EN: "Certified Civil Engineering Works Subtotal (Packages 1-3):"
  - TA: "பொறியாளர் சான்றளித்த கட்டுமான பணிகள் கூட்டுத்தொகை (பிரிவு 1-3):"
  - HI: "प्रमाणित सिविल निर्माण कार्य उप-योग (पैकेज 1-3):"
  - KN: "ಪ್ರಮಾಣೀಕೃತ ಸಿವಿಲ್ ಕಾಮಗಾರಿಗಳ ಉಪ-ಮೊತ್ತ (ಪ್ಯಾಕೇಜ್ 1-3):"
- `pradhista_subtotal_label`:
  - EN: "Panchakalyana Pradhista 5-Day Estimate Subtotal:"
  - TA: "பஞ்சகல்யாண பிரதிஷ்டா 5-நாள் உத்தேச கூட்டுத்தொகை:"
  - HI: "पंचकल्याणक प्रतिष्ठा 5-दिवसीय अनुमान उप-योग:"
  - KN: "ಪಂಚಕಲ್ಯಾಣ ಪ್ರತಿಷ್ಠಾ 5-ದಿನಗಳ ಅಂದಾಜು ಉಪ-ಮೊತ್ತ:"
- `btn_view_pdf`:
  - EN: "👁️ View Document"
  - TA: "👁️ ஆவணத்தை காண்க"
  - HI: "👁️ दस्तावेज़ देखें"
  - KN: "👁️ ದಾಖಲೆಯನ್ನು ವೀಕ್ಷಿಸಿ"
- `pdf_modal_fallback_text`:
  - EN: "Having trouble viewing? Open directly in new tab or download using the button above."
  - TA: "திரையில் பார்க்க இயலவில்லையா? புதிய பக்கத்தில் நேரடியாக திறக்க அல்லது மேலே உள்ள பட்டனைப் பயன்படுத்தி பதிவிறக்கவும்."
  - HI: "देखने में समस्या हो रही है? सीधे नए टैब में खोलें या ऊपर दिए गए बटन से डाउनलोड करें।"
  - KN: "ವೀಕ್ಷಿಸಲು ತೊಂದರೆಯಾಗುತ್ತಿದೆಯೇ? ನೇರವಾಗಿ ಹೊಸ ಟ್ಯಾಬ್‌ನಲ್ಲಿ ತೆರೆಯಿರಿ ಅಥವಾ ಮೇಲಿನ ಬಟನ್ ಬಳಸಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ."

---

## 3. UI & DOM Architecture

### 3.1 PDF Lightbox Modal (`#pdf-modal`) in `index.html`
Place directly alongside `#donation-modal` and `#lightbox-modal`:
```html
<div id="pdf-modal" class="modal no-print" role="dialog" aria-modal="true" aria-labelledby="pdf-modal-title">
  <div class="modal-content pdf-modal-content">
    <div class="pdf-modal-header">
      <div class="pdf-modal-title-wrap">
        <span class="pdf-modal-icon">📄</span>
        <h3 id="pdf-modal-title" class="pdf-modal-title">Official Document</h3>
      </div>
      <div class="pdf-modal-controls">
        <a id="pdf-modal-download-btn" href="#" download class="btn btn-gold btn-sm" data-i18n="btn_download">
          📥 Download PDF
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

### 3.2 Dual Action Buttons on Documents
Across all official documents (Estimate 1, Estimate 2, Estimate 3, 80G, 12A, Masked Trust Deed, Swamiji Blessing Letter, Official Notice):
- Primary button: `[👁️ View PDF]` (`.btn-view-pdf` with `data-pdf-url="..."` and `data-pdf-title="..."`)
- Secondary button: `[📥 Download]` (`.btn-download-pdf` with `download` attribute)
- Or a unified dual-action pill group so users can either preview or download with one tap.

### 3.3 Estimate Section Updates (`#proposal-section` & `src/js/proposal.js`)
- Render Package 4 Card alongside Packages 1, 2, 3:
  - Header: Package 4 Title with gold/terracotta badge `🪔 5-Day Sacred Festival Estimate`.
  - Itemized table with the 3 categories (Food & Annadanam ₹30L, Vidhan & Pooja items ₹10L, Pandhal, stage, sound, lighting & generator ₹10L).
  - Total banner: **₹50,00,000**.
- Update Grand Total Budget Banner at top of proposal:
  - Grand Total: **₹1,26,16,000 (~₹1.26 Crores)**.
  - Sub-pills:
    - Civil Engineering Works (Pkgs 1–3): **₹76,16,000**
    - Panchakalyana Pradhista (Pkg 4): **₹50,00,000**
- Update Grand Summary Formula at bottom of proposal:
  - 4-item formula: `Pkg 1 (₹31.60L) + Pkg 2 (₹18.61L) + Pkg 3 (₹25.95L) + Pkg 4 (₹50.00L) = ₹1,26,16,000 (~₹1.26 Crores)`.
- Remove `#print-proof-btn` (`🖨️ Print / Save Clean PDF Proof`).

### 3.4 Notice Section Updates (`index.html`)
- Remove `.notice-proofs` (the 4 legacy scan thumbnails).
- Keep `#notice-text-content` and update the notice PDF trigger to provide both `[👁️ View Official Notice PDF]` and `[📥 Download PDF]`.

---

## 4. Interactive Logic (`src/js/main.js` & `src/js/proposal.js`)

1. **`openPdfModal(pdfUrl, titleKeyOrText, downloadFilename)`**:
   - Updates `#pdf-modal-title` with localized or provided title.
   - Sets `#pdf-modal-frame` `src` to `pdfUrl`.
   - Sets `#pdf-modal-download-btn` `href` and `download` attribute.
   - Sets `#pdf-modal-direct-link` `href` to `pdfUrl`.
   - Adds `.active` class to `#pdf-modal`.
   - Disables body scrolling (`document.body.style.overflow = 'hidden'`).
2. **`closePdfModal()`**:
   - Removes `.active` class from `#pdf-modal`.
   - Resets `#pdf-modal-frame` `src` to `about:blank` to free memory and audio/execution.
   - Restores body scrolling.
3. **Accessibility**:
   - Closes on close button click, backdrop click, or `Escape` key press.
   - Sets initial focus to `#close-pdf-modal` and restores focus on close.
4. **Wiring All PDF View Triggers**:
   - Bind click listeners on all `[data-pdf-url]` elements across the application.

---

## 5. Responsive CSS Styling (`src/css/main.css`)

- `.pdf-modal-content`:
  - `max-width: 900px; width: 95%; height: 88vh; display: flex; flex-direction: column; padding: 0; border-radius: 14px; overflow: hidden;`
- `.pdf-modal-header`:
  - `background: #FCFAF6; padding: 12px 18px; border-bottom: 1px solid var(--border-gold); display: flex; justify-content: space-between; align-items: center;`
- `.pdf-modal-body`:
  - `flex: 1 1 auto; width: 100%; height: 100%; background: #525659; position: relative;`
- `#pdf-modal-frame`:
  - `width: 100%; height: 100%; border: none;`
- `.pdf-modal-footer`:
  - `background: #FCFAF6; padding: 8px 14px; border-top: 1px solid #EBE4DA; font-size: 0.80rem;`
- Mobile Adaptations (`@media (max-width: 480px)`):
  - `.pdf-modal-content`: `width: 98%; height: 92vh;`
  - `.pdf-modal-header`: `padding: 10px 12px;`
  - `.pdf-modal-title`: `font-size: 0.90rem;`

---

## 6. Verification Plan & Test Strategy

1. **`scripts/verify_i18n.mjs`**:
   - Verify 100% key symmetry across EN, TA, HI, KN for all new keys.
2. **`scripts/verify_pradhista_and_pdf_viewer.mjs`**:
   - Verify `proposalData.js` totals:
     - `grandTotal === 12616000`
     - Sum of Package 1 + 2 + 3 + 4 === `12616000`
     - Package 4 itemized amounts sum to `5000000` (30L + 10L + 10L)
   - Verify `#proposal-section` renders all 4 packages and the updated Grand Summary formula.
   - Verify `#print-proof-btn` is completely removed.
   - Verify `.notice-proofs` is completely removed from `index.html`.
   - Verify `#pdf-modal` exists in `index.html` with iframe, header, download button, and close button.
   - Verify `openPdfModal()` and `closePdfModal()` interactive behavior with jsdom simulation.
3. **Integration & Build**:
   - Integrate into `scripts/verify_all.mjs`.
   - `npm run test:all` passes 100%.
   - `npm run build` succeeds cleanly with 0 errors.
