import fs from 'fs';
import path from 'path';

console.log('=== Verifying Task 2: DOM Restructuring in index.html ===\n');

const htmlPath = path.resolve('index.html');
const html = fs.readFileSync(htmlPath, 'utf-8');

let hasErrors = false;

// 1. Verify absence of legacy elements
console.log('--- 1. Absence of Legacy Elements ---');
const absentChecklist = [
  { desc: '.notice-proofs container', test: !html.includes('notice-proofs') },
  { desc: '#print-proof-btn element', test: !html.includes('id="print-proof-btn"') },
  { desc: 'Printed Notice Color Scans & Proofs text', test: !html.includes('Printed Notice Color Scans & Proofs') },
  { desc: 'Legacy notice thumbnail <img> english_notice_color.jpg', test: !html.includes('english_notice_color.jpg') },
  { desc: 'Legacy notice thumbnail <img> tamil_notice_colour.jpg', test: !html.includes('tamil_notice_colour.jpg') },
  { desc: 'Legacy notice thumbnail <img> hindhi_notice_color.jpg', test: !html.includes('hindhi_notice_color.jpg') },
  { desc: 'Legacy notice thumbnail <img> kannada_notice_color.jpg', test: !html.includes('kannada_notice_color.jpg') }
];

absentChecklist.forEach(item => {
  if (item.test) {
    console.log(`✓ [PASS] Absent as expected: ${item.desc}`);
  } else {
    console.error(`❌ [FAIL] Found unexpected element: ${item.desc}`);
    hasErrors = true;
  }
});

// 2. Verify #pdf-modal and its elements
console.log('\n--- 2. Presence and Structure of #pdf-modal ---');
const modalChecklist = [
  { desc: '#pdf-modal container', test: html.includes('id="pdf-modal"') },
  { desc: '.pdf-modal-content', test: html.includes('class="modal-content pdf-modal-content"') },
  { desc: '.pdf-modal-header', test: html.includes('class="pdf-modal-header"') },
  { desc: '#pdf-modal-title', test: html.includes('id="pdf-modal-title"') },
  { desc: '#pdf-modal-download-btn', test: html.includes('id="pdf-modal-download-btn"') },
  { desc: '#close-pdf-modal', test: html.includes('id="close-pdf-modal"') },
  { desc: '.pdf-modal-body', test: html.includes('class="pdf-modal-body"') },
  { desc: '#pdf-modal-frame iframe', test: html.includes('id="pdf-modal-frame"') },
  { desc: '#pdf-modal-direct-link fallback link', test: html.includes('id="pdf-modal-direct-link"') },
  { desc: 'data-i18n="pdf_modal_fallback_text"', test: html.includes('data-i18n="pdf_modal_fallback_text"') }
];

modalChecklist.forEach(item => {
  if (item.test) {
    console.log(`✓ [PASS] Found: ${item.desc}`);
  } else {
    console.error(`❌ [FAIL] Missing: ${item.desc}`);
    hasErrors = true;
  }
});

// 3. Verify Document Actions & Dual View/Download Buttons
console.log('\n--- 3. Dual Document Action Buttons ---');
const docActionChecklist = [
  // 80G
  { desc: '80G View button', test: html.includes('data-pdf-url="/assets/docs/form_80G_provisional_approval.pdf"') },
  { desc: '80G Download button', test: html.includes('href="/assets/docs/form_80G_provisional_approval.pdf"') && html.includes('download="1008_Sri_Vrishabanath_Temple_Form_80G_Approval.pdf"') },
  // 12A
  { desc: '12A View button', test: html.includes('data-pdf-url="/assets/docs/form_12A_provisional_registration.pdf"') },
  { desc: '12A Download button', test: html.includes('href="/assets/docs/form_12A_provisional_registration.pdf"') && html.includes('download="1008_Sri_Vrishabanath_Temple_Form_12A_Registration.pdf"') },
  // Trust Deed
  { desc: 'Trust Deed View button', test: html.includes('data-pdf-url="/assets/docs/trust_registration_masked.pdf"') },
  { desc: 'Trust Deed Download button', test: html.includes('href="/assets/docs/trust_registration_masked.pdf"') && html.includes('download="1008_Sri_Vrishabanath_Temple_Trust_Deed_Masked.pdf"') },
  // Bhattarak Swamiji Letter
  { desc: 'Bhattarak Letter View button (#view-bhattarak-letter-btn)', test: html.includes('id="view-bhattarak-letter-btn"') },
  { desc: 'Bhattarak Letter Download button (#download-bhattarak-letter-btn)', test: html.includes('id="download-bhattarak-letter-btn"') },
  // Notice PDF
  { desc: 'Notice PDF View button (#view-notice-pdf-btn)', test: html.includes('id="view-notice-pdf-btn"') },
  { desc: 'Notice PDF Download button (#download-notice-pdf-btn)', test: html.includes('id="download-notice-pdf-btn"') }
];

docActionChecklist.forEach(item => {
  if (item.test) {
    console.log(`✓ [PASS] Found: ${item.desc}`);
  } else {
    console.error(`❌ [FAIL] Missing: ${item.desc}`);
    hasErrors = true;
  }
});

const viewPdfButtons = (html.match(/class="[^"]*btn-view-pdf[^"]*"/g) || []).length;
console.log(`\nTotal .btn-view-pdf buttons found: ${viewPdfButtons}`);
if (viewPdfButtons === 5) {
  console.log('✓ [PASS] Exactly 5 .btn-view-pdf buttons present (80G, 12A, Trust Deed, Bhattarak Letter, Notice)');
} else {
  console.error(`❌ [FAIL] Expected 5 .btn-view-pdf buttons, found ${viewPdfButtons}`);
  hasErrors = true;
}

// 4. HTML tag nesting & integrity sanity check
console.log('\n--- 4. Tag Closure & Integrity Sanity Check ---');
const tags = ['div', 'section', 'button', 'a', 'span', 'p', 'h3', 'h4', 'small', 'iframe'];
tags.forEach(tag => {
  const openRegex = new RegExp(`<${tag}(\\s+[^>]*)?>`, 'gi');
  const closeRegex = new RegExp(`</${tag}>`, 'gi');
  const openCount = (html.match(openRegex) || []).length;
  const closeCount = (html.match(closeRegex) || []).length;
  if (openCount === closeCount) {
    console.log(`✓ [PASS] Tag <${tag}> balanced: ${openCount} open, ${closeCount} close`);
  } else {
    console.error(`❌ [FAIL] Tag <${tag}> imbalanced: ${openCount} open vs ${closeCount} close`);
    hasErrors = true;
  }
});

console.log('\n====================================');
if (hasErrors) {
  console.error('❌ Task 2 verification FAILED with errors.');
  process.exit(1);
} else {
  console.log('🎉 Task 2 verification PASSED cleanly!');
  process.exit(0);
}
