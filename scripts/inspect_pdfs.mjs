import { PDFDocument } from 'pdf-lib';
import fs from 'fs';

async function inspectDoc(filePath) {
  const bytes = fs.readFileSync(filePath);
  const doc = await PDFDocument.load(bytes);
  console.log(`\n=== File: ${filePath} ===`);
  console.log(`Page count: ${doc.getPageCount()}`);
  for (let i = 0; i < doc.getPageCount(); i++) {
    const page = doc.getPage(i);
    const { width, height } = page.getSize();
    console.log(`  Page ${i + 1}: ${width.toFixed(1)} x ${height.toFixed(1)}`);
  }
}

async function main() {
  const files = [
    'D:/Temple_docs/trust_registration/VIRSHABANATH BHAGAWAN JAIN TRUST OTHALAVADI.pdf',
    'D:/Temple_docs/form_12A_80G/AAATZ4555BE20261_signed (1).pdf',
    'D:/Temple_docs/form_12A_80G/AAATZ4555BF20261_signed.pdf',
    'D:/Temple_docs/Revised_estimate/Estimate 1.pdf',
    'D:/Temple_docs/Revised_estimate/Estimate 2.pdf',
    'D:/Temple_docs/Revised_estimate/Estimate 3.pdf',
    'D:/Temple_docs/Notices/Notice English.pdf',
    'D:/Temple_docs/Notices/Notice Hindi.pdf',
    'D:/Temple_docs/Notices/Notice Kanada.pdf',
    'D:/Temple_docs/Notices/Notice Tamil.pdf',
    'D:/Temple_docs/Letter_from_arihantagiri/English.pdf',
    'D:/Temple_docs/Letter_from_arihantagiri/Hindi.pdf',
    'D:/Temple_docs/Letter_from_arihantagiri/Kanada.pdf',
    'D:/Temple_docs/Letter_from_arihantagiri/Tamil.pdf'
  ];
  for (const f of files) {
    if (fs.existsSync(f)) {
      await inspectDoc(f);
    } else {
      console.log(`Not found: ${f}`);
    }
  }
}

main().catch(err => console.error(err));
