import { PDFDocument } from 'pdf-lib';
import fs from 'fs';

async function split() {
  const bytes = fs.readFileSync('D:/Temple_docs/trust_registration/VIRSHABANATH BHAGAWAN JAIN TRUST OTHALAVADI.pdf');
  const srcDoc = await PDFDocument.load(bytes);
  fs.mkdirSync('./scratch/trust_pages', { recursive: true });
  for (let i = 0; i < srcDoc.getPageCount(); i++) {
    const newDoc = await PDFDocument.create();
    const [copiedPage] = await newDoc.copyPages(srcDoc, [i]);
    newDoc.addPage(copiedPage);
    const pdfBytes = await newDoc.save();
    fs.writeFileSync(`./scratch/trust_pages/page_${String(i + 1).padStart(2, '0')}.pdf`, pdfBytes);
  }
  console.log('Split complete! Generated 22 page PDFs.');
}

split().catch(e => console.error(e));
