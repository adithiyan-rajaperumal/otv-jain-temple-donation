# Temple Website Updates, Revised Estimates, 80G/12A Tax Exemptions & Aadhaar Masking Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement comprehensive website updates for the 1008 Sri Virshabanath Bhagwan Jain Temple, including certified revised estimates (₹76.16 Lakhs), 80G & 12A Income Tax exemption benefits, Arihantagiri Mutt Bhattarak Swamiji blessing letter, on-ground work progress gallery, and privacy-compliant Aadhaar masking for the 22-page registered Trust Deed.

**Architecture:** 
- A Node.js masking pipeline using `pdf-lib` applies opaque redactions and `XXXX-XXXX-####` stamps to all trustee/witness Aadhaar numbers and blacks out QR codes on card copies.
- Client-side vanilla JS and modern CSS modules handle 4-language localization (EN, TA, HI, KN), responsive layout with mobile-first cards and tabs, interactive photo lightbox, and dynamic downloads.
- Static assets are structured under `public/assets/docs/` and `public/assets/images/progress/` for fast Vite bundling.

**Tech Stack:** Node.js, `pdf-lib`, Vite 6, HTML5, CSS3 (Mobile-First CSS Grid/Flexbox), Vanilla ES6 Modules.

## Global Constraints

- **Mobile First**: All layouts, tables, cards, and modal components must be fully responsive, legible, and touch-friendly on mobile screens down to 360px width.
- **Privacy Compliance**: All Aadhaar numbers on deed text pages (1, 2, 3, 13) must mask the first 8 digits as `XXXX-XXXX-####`, and all ID card photos (pages 14–19) must have Aadhaar numbers masked and QR codes blacked out. The original unmasked document at `D:\Temple_docs` must remain untouched.
- **Localization**: All 4 languages (English, Tamil, Hindi, Kannada) must be supported without missing translation keys or broken strings.
- **Production Build**: `npm run build` must succeed without errors.

---

### Task 1: Aadhaar Masking & Secure Trust Document Generation

**Files:**
- Create: `scripts/mask_trust_deed.mjs`
- Test: `scripts/verify_masked_deed.mjs`
- Output: `public/assets/docs/trust_registration_masked.pdf`

**Interfaces:**
- Consumes: `D:\Temple_docs\trust_registration\VIRSHABANATH BHAGAWAN JAIN TRUST OTHALAVADI.pdf`
- Produces: `public/assets/docs/trust_registration_masked.pdf` with masked text overlays and blacked out QR codes.

- [ ] **Step 1: Write masking script `scripts/mask_trust_deed.mjs`**

```javascript
import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

async function maskTrustDeed() {
  const inputPath = 'D:/Temple_docs/trust_registration/VIRSHABANATH BHAGAWAN JAIN TRUST OTHALAVADI.pdf';
  const outputDir = path.resolve('public/assets/docs');
  fs.mkdirSync(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, 'trust_registration_masked.pdf');

  const pdfBytes = fs.readFileSync(inputPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const pages = pdfDoc.getPages();

  // Helper to draw text mask
  const maskText = (page, x, y, width, height, replacementText) => {
    page.drawRectangle({
      x,
      y,
      width,
      height,
      color: rgb(1, 1, 1),
    });
    if (replacementText) {
      page.drawText(replacementText, {
        x: x + 2,
        y: y + 2,
        size: 9.5,
        font,
        color: rgb(0, 0, 0),
      });
    }
  };

  // Helper to draw black redaction box (for QR codes and card numbers)
  const redactBox = (page, x, y, width, height) => {
    page.drawRectangle({
      x,
      y,
      width,
      height,
      color: rgb(0, 0, 0),
    });
  };

  // Page 1: President Aadhaar (holding Aadhar Number 951274366497)
  maskText(pages[0], 418, 203, 90, 14, 'XXXX-XXXX-6497');

  // Page 2: Trustees & Executive Members
  // 2. N. Ponnappan (728881696830)
  maskText(pages[1], 270, 718, 88, 14, 'XXXX-XXXX-6830');
  // 3. P. Rajaperumal (833735865087)
  maskText(pages[1], 430, 629, 88, 14, 'XXXX-XXXX-5087');
  // 4. P. Rishabadass (941208954076)
  maskText(pages[1], 308, 540, 88, 14, 'XXXX-XXXX-4076');
  // 5. C. Dharanenthira Kumar (868648169304)
  maskText(pages[1], 430, 451, 88, 14, 'XXXX-XXXX-9304');
  // 6. U. Rajaperumal (623703943548)
  maskText(pages[1], 318, 362, 88, 14, 'XXXX-XXXX-3548');
  // Exec 1. A. Ajithbabu (243490805176)
  maskText(pages[1], 152, 282, 88, 14, 'XXXX-XXXX-5176');
  // Exec 2. A. Vijayakumar (961019954111)
  maskText(pages[1], 232, 246, 88, 14, 'XXXX-XXXX-4111');

  // Page 3: Executive Members
  // Exec 3. P. Soundhararajan (784657542026)
  maskText(pages[2], 232, 770, 88, 14, 'XXXX-XXXX-2026');
  // Exec 4. J. Baskaran (291261624848)
  maskText(pages[2], 162, 734, 88, 14, 'XXXX-XXXX-4848');
  // Exec 5. S. Sekhar (570514817830)
  maskText(pages[2], 102, 698, 88, 14, 'XXXX-XXXX-7830');
  // Exec 6. D. Saranraj (540931485148)
  maskText(pages[2], 102, 662, 88, 14, 'XXXX-XXXX-5148');
  // Exec 7. S. Sugan Raj (592305657029)
  maskText(pages[2], 232, 626, 88, 14, 'XXXX-XXXX-7029');

  // Page 13: Witnesses
  // Witness 1: Padmaprabha (2963 1697 7559)
  maskText(pages[12], 175, 638, 95, 14, 'XXXX-XXXX-7559');
  // Witness 2: Devakumar (3549 6560 6829)
  maskText(pages[12], 175, 508, 95, 14, 'XXXX-XXXX-6829');

  // Page 14: Card Copies (Dharmabalan, Ponnappan, Rajaperumal)
  // Dharmabalan: numbers + QR codes
  maskText(pages[13], 126, 658, 80, 13, 'XXXX-XXXX-6497');
  maskText(pages[13], 385, 658, 80, 13, 'XXXX-XXXX-6497');
  redactBox(pages[13], 230, 670, 48, 52); // front QR
  redactBox(pages[13], 480, 670, 56, 56); // back QR
  // Ponnappan: numbers + QR codes
  maskText(pages[13], 102, 485, 80, 13, 'XXXX-XXXX-6830');
  maskText(pages[13], 395, 485, 80, 13, 'XXXX-XXXX-6830');
  redactBox(pages[13], 208, 498, 48, 52); // front QR
  redactBox(pages[13], 472, 498, 56, 56); // back QR
  // Rajaperumal: numbers + QR codes
  maskText(pages[13], 102, 292, 80, 13, 'XXXX-XXXX-5075');
  maskText(pages[13], 315, 292, 80, 13, 'XXXX-XXXX-5075');
  redactBox(pages[13], 208, 305, 48, 52); // front QR
  redactBox(pages[13], 452, 292, 90, 36); // back barcode/QR

  // Page 15: Card Copies (Rishabadass, Dharanenthira Kumar, U. Rajaperumal)
  // Rishabadass
  maskText(pages[14], 126, 666, 80, 13, 'XXXX-XXXX-4076');
  maskText(pages[14], 400, 666, 80, 13, 'XXXX-XXXX-4076');
  redactBox(pages[14], 230, 678, 48, 52);
  redactBox(pages[14], 475, 678, 56, 56);
  // Dharanenthira Kumar
  maskText(pages[14], 118, 492, 80, 13, 'XXXX-XXXX-9304');
  redactBox(pages[14], 120, 480, 130, 12); // VID
  redactBox(pages[14], 230, 502, 48, 52);
  redactBox(pages[14], 475, 478, 56, 56);
  // U. Rajaperumal
  maskText(pages[14], 105, 302, 80, 13, 'XXXX-XXXX-3548');
  maskText(pages[14], 385, 302, 80, 13, 'XXXX-XXXX-3548');
  redactBox(pages[14], 200, 312, 48, 52);
  redactBox(pages[14], 452, 302, 80, 40);

  // Page 16: Card Copies (Ajithbabu, Vijayakumar, Suganraj)
  // Ajithbabu
  maskText(pages[15], 112, 664, 80, 13, 'XXXX-XXXX-5176');
  maskText(pages[15], 375, 664, 80, 13, 'XXXX-XXXX-5176');
  redactBox(pages[15], 205, 676, 48, 52);
  redactBox(pages[15], 450, 676, 56, 56);
  // Vijayakumar
  maskText(pages[15], 105, 485, 80, 13, 'XXXX-XXXX-4111');
  maskText(pages[15], 368, 480, 80, 13, 'XXXX-XXXX-4111');
  redactBox(pages[15], 200, 498, 48, 52);
  redactBox(pages[15], 445, 498, 56, 56);
  // Suganraj
  maskText(pages[15], 108, 300, 80, 13, 'XXXX-XXXX-7029');
  maskText(pages[15], 372, 300, 80, 13, 'XXXX-XXXX-7029');
  redactBox(pages[15], 108, 288, 130, 12); // VID
  redactBox(pages[15], 372, 288, 130, 12); // VID
  redactBox(pages[15], 215, 310, 48, 52);
  redactBox(pages[15], 445, 310, 56, 56);

  // Page 17: Sekhar S (Full sheet letter Aadhaar)
  maskText(pages[16], 98, 372, 90, 15, 'XXXX-XXXX-7830');
  maskText(pages[16], 122, 230, 80, 13, 'XXXX-XXXX-7830');
  maskText(pages[16], 382, 230, 80, 13, 'XXXX-XXXX-7830');
  redactBox(pages[16], 210, 450, 56, 56); // Letter QR
  redactBox(pages[16], 215, 240, 48, 52); // Card front QR
  redactBox(pages[16], 460, 240, 56, 56); // Card back QR

  // Page 18: Card Copies (Saranraj, Baskaran, Soundrarajan)
  // Saranraj
  maskText(pages[17], 122, 655, 80, 13, 'XXXX-XXXX-5148');
  maskText(pages[17], 400, 655, 80, 13, 'XXXX-XXXX-5148');
  redactBox(pages[17], 225, 668, 48, 52);
  redactBox(pages[17], 472, 668, 56, 56);
  redactBox(pages[17], 120, 642, 130, 12); // VID
  redactBox(pages[17], 395, 642, 130, 12); // VID
  // Baskaran
  maskText(pages[17], 110, 476, 80, 13, 'XXXX-XXXX-4848');
  maskText(pages[17], 375, 476, 80, 13, 'XXXX-XXXX-4848');
  redactBox(pages[17], 205, 488, 48, 52);
  redactBox(pages[17], 448, 488, 56, 56);
  redactBox(pages[17], 108, 464, 130, 12); // VID
  // Soundrarajan
  maskText(pages[17], 106, 292, 80, 13, 'XXXX-XXXX-2026');
  maskText(pages[17], 365, 292, 80, 13, 'XXXX-XXXX-2026');
  redactBox(pages[17], 200, 305, 48, 52);
  redactBox(pages[17], 455, 295, 65, 52);

  // Page 19: Witness Cards (Padmaprabha, Devakumar)
  // Padmaprabha
  maskText(pages[18], 125, 580, 80, 13, 'XXXX-XXXX-7559');
  maskText(pages[18], 410, 580, 80, 13, 'XXXX-XXXX-7559');
  redactBox(pages[18], 240, 592, 48, 52);
  redactBox(pages[18], 480, 592, 56, 56);
  // Devakumar
  maskText(pages[18], 145, 396, 80, 13, 'XXXX-XXXX-6826');
  maskText(pages[18], 410, 396, 80, 13, 'XXXX-XXXX-6826');
  redactBox(pages[18], 258, 410, 48, 52);
  redactBox(pages[18], 480, 410, 56, 56);
  redactBox(pages[18], 145, 385, 120, 10); // VID
  redactBox(pages[18], 410, 385, 120, 10); // VID

  const maskedPdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, maskedPdfBytes);
  console.log(`Masked document saved to ${outputPath}`);
}

maskTrustDeed().catch(err => {
  console.error('Error masking trust deed:', err);
  process.exit(1);
});
```

- [ ] **Step 2: Run masking script and verify generation**

Run: `node ./scripts/mask_trust_deed.mjs`
Expected: `Masked document saved to .../trust_registration_masked.pdf`

- [ ] **Step 3: Write verification test and inspect masked pages**

Run: `node -e "const fs = require('fs'); const { PDFDocument } = require('pdf-lib'); PDFDocument.load(fs.readFileSync('public/assets/docs/trust_registration_masked.pdf')).then(d => console.log('Pages:', d.getPageCount()))"`
Expected: `Pages: 22`

- [ ] **Step 4: Commit**

```bash
git add scripts/mask_trust_deed.mjs public/assets/docs/trust_registration_masked.pdf
git commit -m "feat: implement Aadhaar masking and generate secure trust deed PDF"
```

---

### Task 2: Asset Synchronization & Organization

**Files:**
- Create: `scripts/sync_assets.mjs`
- Target Directories:
  - `public/assets/docs/`
  - `public/assets/images/progress/`

**Interfaces:**
- Consumes: `D:\Temple_docs\`
- Produces: Normalized PDF and image assets inside `public/assets/`

- [ ] **Step 1: Write `scripts/sync_assets.mjs`**

```javascript
import fs from 'fs';
import path from 'path';

const DOCS_SOURCE = 'D:/Temple_docs';
const PUBLIC_DOCS = path.resolve('public/assets/docs');
const PUBLIC_PROGRESS = path.resolve('public/assets/images/progress');

fs.mkdirSync(PUBLIC_DOCS, { recursive: true });
fs.mkdirSync(path.join(PUBLIC_PROGRESS, 'bhoomi_pooja'), { recursive: true });
fs.mkdirSync(path.join(PUBLIC_PROGRESS, 'borewell'), { recursive: true });
fs.mkdirSync(path.join(PUBLIC_PROGRESS, 'ground_levelling'), { recursive: true });

// Copy Official Documents
const docCopies = [
  { src: 'form_12A_80G/AAATZ4555BE20261_signed (1).pdf', dest: 'form_12A_provisional_registration.pdf' },
  { src: 'form_12A_80G/AAATZ4555BF20261_signed.pdf', dest: 'form_80G_provisional_approval.pdf' },
  { src: 'Revised_estimate/Estimate 1.pdf', dest: 'estimate_1_temple_renovation.pdf' },
  { src: 'Revised_estimate/Estimate 2.pdf', dest: 'estimate_2_muni_maharaj_guest_house.pdf' },
  { src: 'Revised_estimate/Estimate 3.pdf', dest: 'estimate_3_multipurpose_hall.pdf' },
  { src: 'Letter_from_arihantagiri/English.pdf', dest: 'bhattarak_letter_en.pdf' },
  { src: 'Letter_from_arihantagiri/Tamil.pdf', dest: 'bhattarak_letter_ta.pdf' },
  { src: 'Letter_from_arihantagiri/Hindi.pdf', dest: 'bhattarak_letter_hi.pdf' },
  { src: 'Letter_from_arihantagiri/Kanada.pdf', dest: 'bhattarak_letter_kn.pdf' },
  { src: 'Notices/Notice English.pdf', dest: 'notice_en.pdf' },
  { src: 'Notices/Notice Tamil.pdf', dest: 'notice_ta.pdf' },
  { src: 'Notices/Notice Hindi.pdf', dest: 'notice_hi.pdf' },
  { src: 'Notices/Notice Kanada.pdf', dest: 'notice_kn.pdf' },
];

for (const { src, dest } of docCopies) {
  const fullSrc = path.join(DOCS_SOURCE, src);
  const fullDest = path.join(PUBLIC_DOCS, dest);
  if (fs.existsSync(fullSrc)) {
    fs.copyFileSync(fullSrc, fullDest);
    console.log(`Copied: ${src} -> ${dest}`);
  }
}

// Copy Progress Photos
const copyFolder = (srcDir, targetSubDir) => {
  const fullSrc = path.join(DOCS_SOURCE, 'Temple_works', srcDir);
  const files = fs.readdirSync(fullSrc);
  files.forEach((file, idx) => {
    const ext = path.extname(file).toLowerCase();
    const cleanName = `${srcDir}_${idx + 1}${ext.includes('png') ? '.png' : '.jpg'}`;
    fs.copyFileSync(path.join(fullSrc, file), path.join(PUBLIC_PROGRESS, targetSubDir, cleanName));
    console.log(`Copied progress photo: ${file} -> ${cleanName}`);
  });
};

copyFolder('Bhoomi_pooja', 'bhoomi_pooja');
copyFolder('borewell_and_motor_fitting', 'borewell');
copyFolder('ground_levelling_to_start_new_buildings', 'ground_levelling');
console.log('Asset synchronization complete!');
```

- [ ] **Step 2: Run asset sync and verify files**

Run: `node ./scripts/sync_assets.mjs`
Expected: `Asset synchronization complete!`

- [ ] **Step 3: Commit**

```bash
git add scripts/sync_assets.mjs public/assets/
git commit -m "feat: sync revised estimates, 12A/80G docs, and progress photos into public assets"
```

---

### Task 3: Data Architecture & 4-Language Localization

**Files:**
- Modify: `src/js/data/proposalData.js`
- Modify: `src/js/data/en.js`
- Modify: `src/js/data/ta.js`
- Modify: `src/js/data/hi.js`
- Modify: `src/js/data/kn.js`

**Interfaces:**
- Consumes: Certified figures from Er. K. Sundararajan (Total: ₹76,16,000)
- Produces: Localized translation maps for new sections (80G/12A, Trust details, Bhattarak letter, 3-package estimates, works progress gallery).

- [ ] **Step 1: Update `src/js/data/proposalData.js` with revised estimates**

Update structure to contain:
- `grandTotal: 7616000`
- `formattedGrandTotal: "₹76,16,000"`
- `packages: [ { id: "pkg_1", titleKey: "pkg_1_title", total: 3160000, formattedTotal: "₹31,60,000", pdf: "/assets/docs/estimate_1_temple_renovation.pdf", items: [...] }, ... ]` for Package 1 (Existing Temple Renovation), Package 2 (Muni Maharaj Guest House Building - ₹18,61,000), Package 3 (Multipurpose Hall Building - ₹25,95,000).

- [ ] **Step 2: Update `en.js`, `ta.js`, `hi.js`, `kn.js`**

Add translation keys:
- `tax_exemption_title`, `tax_80g_benefit_banner`, `trust_reg_details`, `pan_label`, `urn_80g_label`, `urn_12a_label`, `btn_download_80g`, `btn_download_12a`, `btn_download_trust_deed`
- `bhattarak_blessing_title`, `bhattarak_name`, `bhattarak_summary`, `btn_download_bhattarak_letter`
- `revised_estimate_title`, `revised_estimate_subtitle`, `engineer_certified_badge`
- `pkg_1_title`, `pkg_2_title`, `pkg_3_title`, and item descriptions
- `progress_title`, `progress_subtitle`, `tab_all_works`, `tab_bhoomi_pooja`, `tab_borewell`, `tab_ground_levelling`
- Updated notice text reflecting the registered trust name and 10 works.

- [ ] **Step 3: Verify no missing keys in any language**

Write and run `node ./scripts/verify_i18n.mjs` checking keys symmetry between `en.js`, `ta.js`, `hi.js`, and `kn.js`.

- [ ] **Step 4: Commit**

```bash
git add src/js/data/
git commit -m "feat: update proposal data with certified ₹76.16L estimates and 4-language i18n keys"
```

---

### Task 4: UI Implementation — Trust Credentials & 80G/12A Tax Exemptions Section

**Files:**
- Modify: `index.html`
- Modify: `src/css/main.css`
- Modify: `src/js/main.js`

**Interfaces:**
- Consumes: I18n keys and document paths from Task 2 & Task 3
- Produces: Responsive tax exemption card with one-click PAN copy and PDF download triggers.

- [ ] **Step 1: Add HTML markup for Trust & 80G/12A Section in `index.html`**

Directly under the donation card:
- 80G Tax Benefit Banner (`50% Tax Deduction under Section 80G`)
- Registered Trust Info Grid (Reg No: 14/2026, Date: 17/06/2026, 108 Members, 20 Cents Land)
- PAN Copy Box (`AAATZ4555B` with copy button)
- 80G URN (`AAATZ4555BF20261`) & 12A URN (`AAATZ4555BE20261`)
- Download Action Buttons for 80G, 12A, and Masked Trust Deed.

- [ ] **Step 2: Add Bhattarak Swamiji Blessing Card in `index.html`**

- Pontiff guidance badge
- Swasthi Shri Thavalakeerthi Swamiji blessing excerpt
- 4-language toggle / dynamic PDF download link (`/assets/docs/bhattarak_letter_{lang}.pdf`).

- [ ] **Step 3: Add CSS styles in `src/css/main.css`**

- Responsive grid for tax exemption metrics
- Golden callout box for 80G deduction
- Copy button states (Copy -> Copied!)

- [ ] **Step 4: Add copy handler in `src/js/main.js` for PAN**

```javascript
// Copy PAN
const copyPanBtn = document.getElementById('copy-pan-btn');
if (copyPanBtn) {
  copyPanBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('AAATZ4555B').then(() => {
      copyPanBtn.textContent = '✓ Copied!';
      setTimeout(() => { copyPanBtn.textContent = 'Copy PAN'; }, 2000);
    });
  });
}
```

- [ ] **Step 5: Test and verify on mobile breakpoint (375px) and desktop**

- [ ] **Step 6: Commit**

```bash
git add index.html src/css/main.css src/js/main.js
git commit -m "feat: add 80G/12A tax exemption section and Bhattarak blessing letter showcase"
```

---

### Task 5: UI Implementation — Revised Estimates (₹76.16 Lakhs Breakdown)

**Files:**
- Modify: `index.html`
- Modify: `src/js/proposal.js`
- Modify: `src/css/main.css`

**Interfaces:**
- Consumes: `proposalData` (Grand Total ₹76,16,000, 3 sub-packages)
- Produces: Interactive tabbed / card interface rendering the itemized civil engineering estimates and PDF download buttons.

- [ ] **Step 1: Refactor `src/js/proposal.js` to render the 3 packages**

- Render Grand Total Banner: ₹76,16,000 with engineer certification badge (Er. K. Sundararajan).
- Render 3 Package Cards:
  1. Main Temple Renovation (₹31,60,000)
  2. Muni Maharaj Guest House (₹18,61,000)
  3. Multipurpose Hall Building (₹25,95,000)
- Render itemized tables inside each card with responsive horizontal scroll or card items on mobile.
- Add direct download links for `estimate_1_temple_renovation.pdf`, `estimate_2_muni_maharaj_guest_house.pdf`, `estimate_3_multipurpose_hall.pdf`.

- [ ] **Step 2: Update `index.html` proposal container**

Ensure proposal container cleanly mounts the new component.

- [ ] **Step 3: Add CSS styles for Package Cards and Mobile Tables in `src/css/main.css`**

- [ ] **Step 4: Test in browser across screen sizes**

- [ ] **Step 5: Commit**

```bash
git add src/js/proposal.js src/css/main.css index.html
git commit -m "feat: implement modular ₹76.16L revised estimate component with 3 certified packages"
```

---

### Task 6: UI Implementation — Temple Works Progress Gallery

**Files:**
- Modify: `index.html`
- Modify: `src/js/gallery.js`
- Modify: `src/css/main.css`

**Interfaces:**
- Consumes: 12 progress photos in `public/assets/images/progress/`
- Produces: Filterable progress gallery with milestone chips and lightbox enlargement.

- [ ] **Step 1: Add progress photos data structure in `src/js/gallery.js`**

Define progress milestones:
- Category 1: `bhoomi_pooja` (6 photos, 26-08-2026, Swasthi Shri Thavalakeerthi Swamiji)
- Category 2: `borewell` (3 photos, Sept 2026, Borewell & motor fitting)
- Category 3: `ground_levelling` (3 photos, Oct 2026, Ground levelling for new buildings)

- [ ] **Step 2: Add Progress Gallery Section markup in `index.html`**

```html
<section id="progress-section" class="card progress-card no-print">
  <h3 class="section-title" data-i18n="progress_title">Temple Work Progress</h3>
  <p class="section-subtitle" data-i18n="progress_subtitle">Live on-ground progress of renovation and expansion works</p>
  <div class="progress-tabs">
    <button class="progress-tab active" data-filter="all">All Works (12)</button>
    <button class="progress-tab" data-filter="bhoomi_pooja">Bhoomi Pooja</button>
    <button class="progress-tab" data-filter="borewell">Borewell & Motor</button>
    <button class="progress-tab" data-filter="ground_levelling">Ground Levelling</button>
  </div>
  <div id="progress-grid" class="progress-grid"></div>
</section>
```

- [ ] **Step 3: Implement filtering and lightbox integration in `src/js/gallery.js`**

Clicking any photo opens existing `#lightbox-modal` with enlarged photo and descriptive milestone text.

- [ ] **Step 4: Add CSS styles for Progress Grid and Filter Chips in `src/css/main.css`**

- Responsive grid: `grid-template-columns: repeat(auto-fill, minmax(180px, 1fr))` on mobile, `minmax(240px, 1fr)` on desktop.
- Touch-friendly filter pill buttons.

- [ ] **Step 5: Verify lightbox and filter interaction**

- [ ] **Step 6: Commit**

```bash
git add src/js/gallery.js index.html src/css/main.css
git commit -m "feat: add interactive Temple Works Progress gallery with milestone filtering and lightbox"
```

---

### Task 7: Full Verification, Responsive Polish & Production Build

**Files:**
- Modify: `index.html`, `src/css/main.css` (if any adjustments needed)
- Test: `npm run build`

**Interfaces:**
- Produces: Verified production bundle in `dist/`

- [ ] **Step 1: Check print stylesheet `src/css/print.css`**

Ensure that 80G tax exemption, URNs, PAN, and revised estimates are cleanly formatted in print / PDF generation mode.

- [ ] **Step 2: Test language switching across all 4 languages (EN, TA, HI, KN)**

Verify:
- Trust title, registration number, PAN, 80G/12A information.
- Bhattarak Swamiji blessing excerpt and PDF download link.
- Revised estimate total and item descriptions.
- Progress gallery captions.
- Notice text.

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: Success with 0 errors.

- [ ] **Step 4: Final verification and commit**

```bash
git add -A
git commit -m "chore: complete temple website update with 80G/12A, certified estimates, and progress gallery"
```
