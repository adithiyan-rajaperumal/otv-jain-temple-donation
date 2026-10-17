# Task 1: Aadhaar Masking & Secure Trust Document Generation

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
