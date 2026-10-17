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
  const maskText = (page, x, y, width, height, replacementText, fontSize = 9.5) => {
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
        y: y + 3.5,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      });
    }
  };

  // Helper to draw black redaction box
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
  maskText(pages[0], 360, 217, 95, 16, 'XXXX-XXXX-6497');

  // Page 2: Trustees & Executive Members
  // 2. N. Ponnappan (728881696830)
  maskText(pages[1], 240, 700, 95, 16, 'XXXX-XXXX-6830');
  // 3. P. Rajaperumal (833735865087)
  maskText(pages[1], 390, 612, 95, 16, 'XXXX-XXXX-5087');
  // 4. P. Rishabadass (941208954076)
  maskText(pages[1], 270, 523, 95, 16, 'XXXX-XXXX-4076');
  // 5. C. Dharanenthira Kumar (868648169304)
  maskText(pages[1], 390, 434, 95, 16, 'XXXX-XXXX-9304');
  // 6. U. Rajaperumal (623703943548)
  maskText(pages[1], 265, 345, 95, 16, 'XXXX-XXXX-3548');
  // Exec 1. A. Ajithbabu (243490805176)
  maskText(pages[1], 145, 265, 95, 16, 'XXXX-XXXX-5176');
  // Exec 2. A. Vijayakumar (961019954111)
  maskText(pages[1], 220, 229, 95, 16, 'XXXX-XXXX-4111');

  // Page 3: Executive Members
  // Exec 3. P. Soundhararajan (784657542026)
  maskText(pages[2], 225, 753, 95, 16, 'XXXX-XXXX-2026');
  // Exec 4. J. Baskaran (291261624848)
  maskText(pages[2], 150, 717, 95, 16, 'XXXX-XXXX-4848');
  // Exec 5. S. Sekhar (570514817830)
  maskText(pages[2], 95, 681, 95, 16, 'XXXX-XXXX-7830');
  // Exec 6. D. Saranraj (540931485148)
  maskText(pages[2], 95, 645, 95, 16, 'XXXX-XXXX-5148');
  // Exec 7. S. Sugan Raj (592305657029)
  maskText(pages[2], 225, 609, 95, 16, 'XXXX-XXXX-7029');

  // Page 13: Witnesses
  // Witness 1: Padmaprabha (2963 1697 7559)
  maskText(pages[12], 160, 534, 110, 16, 'XXXX-XXXX-7559');
  // Witness 2: Devakumar (3549 6560 6829)
  maskText(pages[12], 160, 405, 110, 16, 'XXXX-XXXX-6829');

  // Helper for 3 cards per page
  const maskCardPage = (pageIdx, topMask, midMask, botMask) => {
    const page = pages[pageIdx];
    // Top card (front & back numbers + QRs)
    maskText(page, 105, 642, 115, 22, topMask.frontText);
    maskText(page, 365, 650, 115, 22, topMask.backText);
    redactBox(page, 225, 665, 55, 58);
    redactBox(page, 470, 665, 65, 62);
    if (topMask.frontVid) redactBox(page, 105, 626, 140, 14);
    if (topMask.backVid) redactBox(page, 365, 634, 140, 14);

    // Middle card
    maskText(page, 105, 432, 115, 22, midMask.frontText);
    maskText(page, 365, 440, 115, 22, midMask.backText);
    redactBox(page, 195, 492, 55, 58);
    redactBox(page, 440, 492, 65, 62);
    if (midMask.frontVid) redactBox(page, 100, 416, 140, 14);
    if (midMask.backVid) redactBox(page, 365, 424, 140, 14);

    // Bottom card
    maskText(page, 105, 228, 115, 22, botMask.frontText);
    maskText(page, 365, 236, 115, 22, botMask.backText);
    redactBox(page, 195, 302, 55, 58);
    redactBox(page, 445, 288, 95, 50);
    if (botMask.frontVid) redactBox(page, 100, 212, 140, 14);
    if (botMask.backVid) redactBox(page, 365, 218, 140, 14);
  };

  // Page 14: Dharmabalan, Ponnappan, Rajaperumal
  maskCardPage(13,
    { frontText: 'XXXX-XXXX-6497', backText: 'XXXX-XXXX-6497' },
    { frontText: 'XXXX-XXXX-6830', backText: 'XXXX-XXXX-6830' },
    { frontText: 'XXXX-XXXX-5075', backText: 'XXXX-XXXX-5075' }
  );

  // Page 15: Rishabadass, Dharanenthira, U. Rajaperumal
  maskCardPage(14,
    { frontText: 'XXXX-XXXX-4076', backText: 'XXXX-XXXX-4076' },
    { frontText: 'XXXX-XXXX-9304', backText: 'XXXX-XXXX-9304', frontVid: true },
    { frontText: 'XXXX-XXXX-3548', backText: 'XXXX-XXXX-3548' }
  );

  // Page 16: Ajithbabu, Vijayakumar, Suganraj
  maskCardPage(15,
    { frontText: 'XXXX-XXXX-5176', backText: 'XXXX-XXXX-5176' },
    { frontText: 'XXXX-XXXX-4111', backText: 'XXXX-XXXX-4111' },
    { frontText: 'XXXX-XXXX-7029', backText: 'XXXX-XXXX-7029', frontVid: true, backVid: true }
  );

  // Page 17: Sekhar S (Full sheet letter Aadhaar + Card)
  maskText(pages[16], 85, 365, 160, 28, 'XXXX-XXXX-7830', 14);
  maskText(pages[16], 115, 206, 115, 22, 'XXXX-XXXX-7830');
  maskText(pages[16], 395, 212, 115, 22, 'XXXX-XXXX-7830');
  redactBox(pages[16], 205, 445, 60, 60); // Letter QR
  redactBox(pages[16], 210, 236, 52, 56); // Card front QR
  redactBox(pages[16], 455, 236, 62, 60); // Card back QR

  // Page 18: Saranraj, Baskaran, Soundrarajan
  maskCardPage(17,
    { frontText: 'XXXX-XXXX-5148', backText: 'XXXX-XXXX-5148', frontVid: true, backVid: true },
    { frontText: 'XXXX-XXXX-4848', backText: 'XXXX-XXXX-4848', frontVid: true },
    { frontText: 'XXXX-XXXX-2026', backText: 'XXXX-XXXX-2026' }
  );

  // Page 19: Witness Cards (Padmaprabha, Devakumar)
  // Padmaprabha
  maskText(pages[18], 115, 562, 115, 22, 'XXXX-XXXX-7559');
  maskText(pages[18], 365, 570, 115, 22, 'XXXX-XXXX-7559');
  redactBox(pages[18], 235, 588, 55, 58);
  redactBox(pages[18], 475, 588, 65, 62);
  // Devakumar
  maskText(pages[18], 130, 376, 115, 22, 'XXXX-XXXX-6826');
  redactBox(pages[18], 125, 360, 140, 14); // VID
  maskText(pages[18], 365, 376, 115, 22, 'XXXX-XXXX-6826');
  redactBox(pages[18], 360, 360, 140, 14); // VID
  redactBox(pages[18], 250, 405, 55, 58);
  redactBox(pages[18], 475, 405, 65, 62);

  const maskedPdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, maskedPdfBytes);
  console.log(`Masked document saved successfully to ${outputPath} (${maskedPdfBytes.length} bytes)`);
}

maskTrustDeed().catch(err => {
  console.error('Error masking trust deed:', err);
  process.exit(1);
});
