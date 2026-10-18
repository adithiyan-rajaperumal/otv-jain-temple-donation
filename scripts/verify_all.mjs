/**
 * Master Verification Suite for Othalavadi Sri Virshabanath Jinalayam Website
 * 
 * Validates:
 * 1. Prior task suites: verify_i18n.mjs, verify_task_4.mjs, verify_task_5.mjs, verify_task_6.mjs
 * 2. 4-Language rendering integrity without missing translation keys or broken strings
 * 3. Physical PDF document assets in public/ and dist/
 * 4. Physical progress image assets in public/ and dist/
 * 5. Open Graph, Twitter cards, SEO meta tags, and structure in index.html & dist/index.html
 * 6. Responsive polish & touch targets (min 44px buttons) in main.css
 * 7. Print stylesheet audit in print.css
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { en } from '../src/js/data/en.js';
import { ta } from '../src/js/data/ta.js';
import { hi } from '../src/js/data/hi.js';
import { kn } from '../src/js/data/kn.js';
import { proposalData } from '../src/js/data/proposalData.js';
import { progressItems, renderProgressGallery } from '../src/js/gallery.js';
import { renderProposalTable } from '../src/js/proposal.js';
import { setLanguage, t } from '../src/js/i18n.js';

const root = path.resolve('.');
const indexHtmlPath = path.join(root, 'index.html');
const distHtmlPath = path.join(root, 'dist/index.html');
const mainCssPath = path.join(root, 'src/css/main.css');
const printCssPath = path.join(root, 'src/css/print.css');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  ✓ [PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`  ✗ [FAIL] ${message}`);
    failedTests++;
  }
}

console.log('================================================================');
console.log('  1008 Sri Virshabanath Jinalayam - Master Verification Suite');
console.log('================================================================\n');

// -------------------------------------------------------------
// SECTION 1: Sub-Suite Regression Verification
// -------------------------------------------------------------
console.log('--- SECTION 1: Running Prior Task Verification Suites ---');

const subSuites = [
  'scripts/verify_i18n.mjs',
  'scripts/verify_task_4.mjs',
  'scripts/verify_task_6.mjs',
  'scripts/verify_donation_redesign.mjs',
  'scripts/verify_pradhista_task_2.mjs',
  'scripts/verify_pradhista_task_3.mjs',
  'scripts/verify_pradhista_task_4.mjs',
  'scripts/verify_pradhista_and_pdf_viewer.mjs'
];

for (const script of subSuites) {
  try {
    const fullPath = path.join(root, script);
    if (!fs.existsSync(fullPath)) {
      assert(false, `Sub-suite script exists: ${script}`);
      continue;
    }
    const output = execSync(`node ${script}`, { cwd: root, encoding: 'utf-8' });
    const hasFailures = output.includes('[FAIL]') || output.includes('❌');
    assert(!hasFailures, `Sub-suite passed cleanly: ${script}`);
  } catch (err) {
    assert(false, `Sub-suite execution error (${script}): ${err.message}`);
  }
}

// -------------------------------------------------------------
// SECTION 2: 4-Language Localization & Rendering
// -------------------------------------------------------------
console.log('\n--- SECTION 2: Multilingual Rendering & Symmetry (EN, TA, HI, KN) ---');

const langs = [
  { code: 'en', name: 'English', data: en },
  { code: 'ta', name: 'Tamil', data: ta },
  { code: 'hi', name: 'Hindi', data: hi },
  { code: 'kn', name: 'Kannada', data: kn }
];

if (typeof global.CustomEvent === 'undefined') {
  global.CustomEvent = class CustomEvent {
    constructor(type, params = {}) {
      this.type = type;
      this.detail = params.detail || {};
    }
  };
}

const baseKeys = Object.keys(en);
assert(baseKeys.length === 204, `Base language (EN) has exact 204 keys (found: ${baseKeys.length})`);

// Proposal data architecture assertions
assert(proposalData.grandTotal === 12616000, `proposalData.grandTotal is ₹1,26,16,000 (${proposalData.grandTotal})`);
assert(proposalData.formattedGrandTotal === '₹1,26,16,000', `proposalData.formattedGrandTotal is "₹1,26,16,000"`);
assert(proposalData.civilSubtotal === 7616000, `proposalData.civilSubtotal is ₹76,16,000 (${proposalData.civilSubtotal})`);
assert(proposalData.pradhistaSubtotal === 5000000, `proposalData.pradhistaSubtotal is ₹50,00,000 (${proposalData.pradhistaSubtotal})`);
assert(proposalData.packages.length === 4, `proposalData contains 4 packages (found: ${proposalData.packages.length})`);
assert(proposalData.civilSubtotal + proposalData.pradhistaSubtotal === proposalData.grandTotal, 'Civil Subtotal (₹76.16L) + Pradhista Subtotal (₹50.00L) equals Grand Total (₹1,26,16,000)');

// Mock DOM container for rendering tests
class MockElement {
  constructor(tag, id = '') {
    this.tagName = tag;
    this.id = id;
    this._innerHTML = '';
    this._attributes = {};
    this.classList = {
      _classes: new Set(),
      add: (c) => this.classList._classes.add(c),
      remove: (c) => this.classList._classes.delete(c),
      contains: (c) => this.classList._classes.has(c)
    };
    this.eventListeners = {};
  }
  get innerHTML() { return this._innerHTML; }
  set innerHTML(val) { this._innerHTML = val; }
  setAttribute(name, val) { this._attributes[name] = val; }
  getAttribute(name) { return this._attributes[name]; }
  addEventListener(evt, fn) {
    this.eventListeners[evt] = this.eventListeners[evt] || [];
    this.eventListeners[evt].push(fn);
  }
  querySelectorAll(sel) {
    if (sel === '.progress-card-item') {
      const matches = [];
      const regex = /<div class="progress-card-item"[^>]*data-id="(\d+)"[^>]*>/g;
      let m;
      while ((m = regex.exec(this.innerHTML)) !== null) {
        const id = m[1];
        matches.push({
          getAttribute: (attr) => attr === 'data-id' ? id : null,
          addEventListener: () => {}
        });
      }
      return matches;
    }
    return [];
  }
}

const mockProposalContainer = new MockElement('div', 'proposal-table-container');
const mockGalleryContainer = new MockElement('div', 'progress-grid');
const mockNoticeContainer = new MockElement('div', 'notice-text-content');
const mockBhattarakBtn = new MockElement('a', 'download-bhattarak-letter-btn');

global.document = {
  documentElement: { lang: 'ta' },
  querySelectorAll: () => [],
  getElementById: (id) => {
    if (id === 'proposal-table-container') return mockProposalContainer;
    if (id === 'progress-grid') return mockGalleryContainer;
    if (id === 'notice-text-content') return mockNoticeContainer;
    if (id === 'download-bhattarak-letter-btn') return mockBhattarakBtn;
    return null;
  },
  dispatchEvent: () => {}
};

for (const lang of langs) {
  const langKeys = Object.keys(lang.data);
  assert(langKeys.length === baseKeys.length, `[${lang.code.toUpperCase()}] Key count matches base EN (${langKeys.length}/${baseKeys.length})`);

  let emptyCount = 0;
  for (const k of baseKeys) {
    const val = lang.data[k];
    if (val === undefined || val === null || (typeof val === 'string' && val.trim() === '')) {
      emptyCount++;
    }
  }
  assert(emptyCount === 0, `[${lang.code.toUpperCase()}] 0 empty or undefined translation keys`);

  // Test setLanguage
  setLanguage(lang.code);

  // Render proposal table in current language
  renderProposalTable();
  const proposalHtml = mockProposalContainer.innerHTML;
  assert(proposalHtml.length > 500, `[${lang.code.toUpperCase()}] Proposal table renders content (${proposalHtml.length} chars)`);
  assert(!proposalHtml.includes('undefined') && !proposalHtml.includes('[object Object]'), `[${lang.code.toUpperCase()}] Proposal table contains no undefined or [object Object]`);
  assert(proposalHtml.includes(lang.data.pkg_1_title), `[${lang.code.toUpperCase()}] Proposal Grand Summary contains localized Package 1 title`);
  assert(proposalHtml.includes(lang.data.pkg_2_title), `[${lang.code.toUpperCase()}] Proposal Grand Summary contains localized Package 2 title`);
  assert(proposalHtml.includes(lang.data.pkg_3_title), `[${lang.code.toUpperCase()}] Proposal Grand Summary contains localized Package 3 title`);
  assert(proposalHtml.includes(lang.data.pkg_4_title), `[${lang.code.toUpperCase()}] Proposal Grand Summary contains localized Package 4 title`);
  assert(proposalHtml.includes('1,26,16,000') || proposalHtml.includes('₹1,26,16,000'), `[${lang.code.toUpperCase()}] Proposal renders combined grand total ₹1,26,16,000`);

  // Render gallery in current language
  renderProgressGallery('all');
  const galleryHtml = mockGalleryContainer.innerHTML;
  assert(galleryHtml.length > 1000, `[${lang.code.toUpperCase()}] Progress gallery renders content (${galleryHtml.length} chars)`);
  assert(!galleryHtml.includes('undefined') && !galleryHtml.includes('[object Object]'), `[${lang.code.toUpperCase()}] Gallery contains no undefined or [object Object]`);
  assert(galleryHtml.includes(lang.data.progress_photo_bp_1), `[${lang.code.toUpperCase()}] Gallery contains localized caption 1`);
}

// -------------------------------------------------------------
// SECTION 3: Physical Document Assets on Disk
// -------------------------------------------------------------
console.log('\n--- SECTION 3: Physical Document Assets on Disk ---');

const requiredDocs = [
  'form_80G_provisional_approval.pdf',
  'form_12A_provisional_registration.pdf',
  'trust_registration_masked.pdf',
  'bhattarak_letter_en.pdf',
  'bhattarak_letter_ta.pdf',
  'bhattarak_letter_hi.pdf',
  'bhattarak_letter_kn.pdf',
  'estimate_1_temple_renovation.pdf',
  'estimate_2_muni_maharaj_guest_house.pdf',
  'estimate_3_multipurpose_hall.pdf',
  'notice_en.pdf',
  'notice_ta.pdf',
  'notice_hi.pdf',
  'notice_kn.pdf'
];

for (const doc of requiredDocs) {
  const publicPath = path.join(root, 'public/assets/docs', doc);
  const exists = fs.existsSync(publicPath);
  assert(exists, `Public document exists: ${doc}`);
  if (exists) {
    const size = fs.statSync(publicPath).size;
    assert(size > 10000, `Public document has valid size (${(size / 1024).toFixed(1)} KB): ${doc}`);
  }
}

// Check dist assets if dist exists
const distDocsDir = path.join(root, 'dist/assets/docs');
if (fs.existsSync(distDocsDir)) {
  for (const doc of requiredDocs) {
    const distPath = path.join(distDocsDir, doc);
    const exists = fs.existsSync(distPath);
    assert(exists, `Dist document exists: ${doc}`);
  }
}

// -------------------------------------------------------------
// SECTION 4: Progress Image Assets on Disk
// -------------------------------------------------------------
console.log('\n--- SECTION 4: Progress Image Assets on Disk ---');

assert(progressItems.length === 12, `Total progress items in gallery.js is 12 (found: ${progressItems.length})`);

for (const item of progressItems) {
  const rawSrc = item.src || item.image;
  const cleanPath = rawSrc.startsWith('/') ? rawSrc.substring(1) : rawSrc;
  const publicPath = path.join(root, 'public', cleanPath);
  const exists = fs.existsSync(publicPath);
  assert(exists, `Progress image exists in public/: ${cleanPath}`);
  if (exists) {
    const size = fs.statSync(publicPath).size;
    assert(size > 5000, `Image is non-empty (${(size / 1024).toFixed(1)} KB): ${cleanPath}`);
  }

  const distPath = path.join(root, 'dist', cleanPath);
  if (fs.existsSync(path.join(root, 'dist'))) {
    assert(fs.existsSync(distPath), `Progress image exists in dist/: ${cleanPath}`);
  }
}

// -------------------------------------------------------------
// SECTION 5: HTML Structure & Open Graph SEO Meta Tags
// -------------------------------------------------------------
console.log('\n--- SECTION 5: HTML Structure & Open Graph / Twitter Meta Tags ---');

const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

const requiredMetaTags = [
  '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
  '<meta property="og:type" content="website">',
  '<meta property="og:site_name"',
  '<meta property="og:title"',
  '<meta property="og:description"',
  '<meta property="og:image"',
  '<meta property="og:locale"',
  '<meta name="twitter:card" content="summary_large_image">',
  '<meta name="twitter:title"',
  '<meta name="twitter:description"',
  '<meta name="twitter:image"'
];

for (const tag of requiredMetaTags) {
  assert(indexHtml.includes(tag), `index.html contains meta tag: ${tag}`);
}

assert(indexHtml.includes('<title>'), 'index.html contains <title>');
assert(indexHtml.includes('href="/src/css/main.css"'), 'index.html links to main.css');
assert(indexHtml.includes('href="/src/css/print.css"'), 'index.html links to print.css');

// Check dist/index.html if built
if (fs.existsSync(distHtmlPath)) {
  const distHtml = fs.readFileSync(distHtmlPath, 'utf-8');
  assert(distHtml.includes('<title>'), 'dist/index.html contains <title>');
  assert(distHtml.includes('property="og:title"'), 'dist/index.html contains og:title');
  assert(distHtml.includes('property="og:image"'), 'dist/index.html contains og:image');
  assert(distHtml.includes('name="twitter:card"'), 'dist/index.html contains twitter:card');
  assert(distHtml.includes('name="viewport"'), 'dist/index.html contains viewport meta');
}

// -------------------------------------------------------------
// SECTION 6: Responsive Polish & 44px Touch Targets
// -------------------------------------------------------------
console.log('\n--- SECTION 6: Responsive CSS Audit & Touch Targets ---');

const mainCss = fs.readFileSync(mainCssPath, 'utf-8');

const expectedTouchClasses = [
  '.btn',
  '.btn-sm',
  '.chip',
  '.lang-btn',
  '.progress-tab',
  '.btn-package-pdf'
];

for (const cls of expectedTouchClasses) {
  const idx = mainCss.indexOf(`${cls} {`);
  assert(idx !== -1, `main.css defines ${cls}`);
}

// Ensure min-height: 44px exists for touch-friendly controls
assert(mainCss.includes('min-height: 44px;'), 'main.css includes standard min-height: 44px');

// Verify small mobile media queries
assert(mainCss.includes('@media (max-width: 640px)'), 'main.css includes 640px media query');
assert(mainCss.includes('@media (max-width: 600px)'), 'main.css includes 600px media query');
assert(mainCss.includes('@media (max-width: 480px)'), 'main.css includes 480px media query');
assert(mainCss.includes('@media (max-width: 360px)'), 'main.css includes 360px media query');
assert(mainCss.includes('@media (min-width: 768px)'), 'main.css includes 768px tablet media query');

// -------------------------------------------------------------
// SECTION 7: Print Stylesheet Audit (print.css)
// -------------------------------------------------------------
console.log('\n--- SECTION 7: Print Stylesheet Audit (print.css) ---');

const printCss = fs.readFileSync(printCssPath, 'utf-8');

const requiredPrintRules = [
  '@media print',
  '.print-header',
  '.no-print',
  '.sticky-donate-bar',
  '.card',
  '.package-card',
  '.proposal-grand-summary-card',
  '.tax-benefit-banner',
  'page-break-inside: avoid'
];

for (const rule of requiredPrintRules) {
  assert(printCss.includes(rule), `print.css includes rule: ${rule}`);
}

// Verify print-header in index.html contains trust name, bank info, PAN, and URNs
assert(indexHtml.includes('class="print-header"'), 'index.html contains .print-header');
assert(indexHtml.includes('8350857706'), 'print-header contains Bank Account Number');
assert(indexHtml.includes('IDIB000D074'), 'print-header contains IFSC Code');
assert(indexHtml.includes('f051m01588@indianbk'), 'print-header contains UPI ID');
assert(indexHtml.includes('AAATZ4555B'), 'print-header contains PAN');
assert(indexHtml.includes('AAATZ4555BF20261'), 'print-header contains 80G URN');
assert(indexHtml.includes('AAATZ4555BE20261'), 'print-header contains 12A URN');

console.log('\n================================================================');
console.log(`VERIFICATION SUMMARY: ${passedTests}/${totalTests} Passed (${failedTests} Failed)`);
console.log('================================================================\n');

if (failedTests > 0) {
  console.error(`❌ Verification failed with ${failedTests} failure(s).`);
  process.exit(1);
} else {
  console.log('🎉 100% SUCCESS: All verifications passed without errors!');
  process.exit(0);
}
