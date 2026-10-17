import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PDFParse } = require('pdf-parse');

async function parsePdf(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const parser = new PDFParse({ data: dataBuffer });
    await parser.load();
    const res = await parser.getText();
    return {
      file: filePath,
      pages: res.total,
      text: res.text
    };
  } catch (err) {
    return {
      file: filePath,
      error: err.message
    };
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

  let fullOutput = '';
  for (const f of files) {
    console.log(`Reading ${f}...`);
    const r = await parsePdf(f);
    fullOutput += `\n\n=======================================================\nFILE: ${f}\n`;
    if (r.error) {
      fullOutput += `ERROR: ${r.error}\n`;
    } else {
      fullOutput += `PAGES: ${r.pages}\nTEXT LENGTH: ${r.text.length}\n`;
      fullOutput += `--- CONTENT ---\n${r.text}\n--- END CONTENT ---\n`;
    }
  }

  fs.writeFileSync('./scripts/parsed_docs_summary.txt', fullOutput);
  console.log('Saved summary to ./scripts/parsed_docs_summary.txt');
}

main();
