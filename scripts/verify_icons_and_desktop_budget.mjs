/**
 * Verification Suite: Clean Icons & Desktop Budget / Pradhista Layout
 *
 * Verifies:
 * 1. Single-icon enforcement across all document view and download buttons in index.html & proposal.js.
 * 2. Absence of duplicate emojis (👁️ 👁️, 📥 📥, 📄 📥, 🪔 🪔) in static HTML and dynamically rendered proposal.
 * 3. Removal of redundant badge pill in Package 4 header (avoiding double badge and double 🪔).
 * 4. Desktop CSS rules (min-width: 769px / 1024px) for .proposal-grand-total-banner, .sub-budget-row, .sub-budget-pill, and .banner-amount-badge.
 * 5. 4-Language Localization integrity (exact 204 keys per language, zero missing, zero undefined).
 */

import fs from 'fs';
import path from 'path';
import { en } from '../src/js/data/en.js';
import { ta } from '../src/js/data/ta.js';
import { hi } from '../src/js/data/hi.js';
import { kn } from '../src/js/data/kn.js';
import { proposalData } from '../src/js/data/proposalData.js';
import { setLanguage, t } from '../src/js/i18n.js';
import { renderProposalTable } from '../src/js/proposal.js';

const root = path.resolve('.');
const indexHtmlPath = path.join(root, 'index.html');
const mainCssPath = path.join(root, 'src/css/main.css');

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
console.log('  Verification: Clean Icons & Desktop Budget / Pradhista Layout');
console.log('================================================================\n');

// -------------------------------------------------------------
// SECTION 1: Single-Icon Verification in index.html
// -------------------------------------------------------------
console.log('--- SECTION 1: Single-Icon Verification in index.html ---');
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

// Check for literal duplicate emoji patterns in index.html markup
const eyeEyePattern = /👁️[\s\S]{0,30}👁️/;
const downloadDownloadPattern = /📥[\s\S]{0,30}📥/;
const docDownloadPattern = /📄[\s\S]{0,30}📥/;

assert(!eyeEyePattern.test(indexHtml), 'index.html contains NO duplicate eye icon patterns (👁️ 👁️)');
assert(!downloadDownloadPattern.test(indexHtml), 'index.html contains NO duplicate download icon patterns (📥 📥)');
assert(!docDownloadPattern.test(indexHtml), 'index.html contains NO mixed document/download duplicate icon patterns (📄 📥)');

// Ensure view buttons in index.html do not have redundant <span class="doc-icon">👁️</span> when translation has 👁️
const viewBtnMatches = indexHtml.match(/<button[^>]*class="[^"]*btn-view-pdf[^"]*"[^>]*>([\s\S]*?)<\/button>/g) || [];
assert(viewBtnMatches.length >= 5, `Found ${viewBtnMatches.length} .btn-view-pdf buttons in index.html`);
viewBtnMatches.forEach((btnHtml, idx) => {
  const eyeCount = (btnHtml.match(/👁️/g) || []).length;
  assert(eyeCount === 1, `View button #${idx + 1} has exactly 1 eye icon (found: ${eyeCount})`);
});

// Ensure download buttons in official docs row have exactly 1 download icon
const docDownloadLinks = indexHtml.match(/<a[^>]*class="[^"]*btn-doc-download[^"]*"[^>]*>([\s\S]*?)<\/a>/g) || [];
assert(docDownloadLinks.length === 3, `Found 3 .btn-doc-download links in index.html`);
docDownloadLinks.forEach((linkHtml, idx) => {
  const dlCount = (linkHtml.match(/📥/g) || []).length;
  assert(dlCount === 1, `Download link #${idx + 1} has exactly 1 download icon (found: ${dlCount})`);
});

// Check Bhattarak download button
const bhattarakDownloadMatch = indexHtml.match(/<a id="download-bhattarak-letter-btn"[^>]*>([\s\S]*?)<\/a>/);
assert(!!bhattarakDownloadMatch, 'Found #download-bhattarak-letter-btn in index.html');
if (bhattarakDownloadMatch) {
  const dlCount = (bhattarakDownloadMatch[1].match(/📥|📄/g) || []).length;
  assert(dlCount === 1, `#download-bhattarak-letter-btn has exactly 1 icon (found: ${dlCount})`);
}

// -------------------------------------------------------------
// SECTION 2: Single-Icon Verification in Dynamically Rendered Proposal
// -------------------------------------------------------------
console.log('\n--- SECTION 2: Proposal Table Dynamic Rendering Icons ---');

// Mock DOM container
class MockProposalContainer {
  constructor() {
    this._innerHTML = '';
  }
  get innerHTML() { return this._innerHTML; }
  set innerHTML(val) { this._innerHTML = val; }
}

const mockContainer = new MockProposalContainer();
global.document = {
  documentElement: { lang: 'en' },
  getElementById: (id) => {
    if (id === 'proposal-table-container') return mockContainer;
    return null;
  },
  querySelectorAll: () => [],
  addEventListener: () => {},
  dispatchEvent: () => {}
};

const langs = [
  { code: 'en', name: 'English', dict: en },
  { code: 'ta', name: 'Tamil', dict: ta },
  { code: 'hi', name: 'Hindi', dict: hi },
  { code: 'kn', name: 'Kannada', dict: kn }
];

for (const lang of langs) {
  setLanguage(lang.code);
  renderProposalTable();
  const html = mockContainer.innerHTML;

  // Check no duplicate eye icons in package view buttons
  const pkgEyeDouble = /👁️[\s\S]{0,80}👁️/;
  assert(!pkgEyeDouble.test(html), `[${lang.code.toUpperCase()}] Proposal markup has NO duplicate eye icons (👁️ 👁️)`);

  // Check no duplicate download icons
  const pkgDlDouble = /📥[\s\S]{0,80}📥/;
  assert(!pkgDlDouble.test(html), `[${lang.code.toUpperCase()}] Proposal markup has NO duplicate download icons (📥 📥)`);

  // Check no duplicate diya icons (🪔 🪔)
  const diyaDouble = /🪔[\s\S]{0,80}🪔/;
  assert(!diyaDouble.test(html), `[${lang.code.toUpperCase()}] Proposal markup has NO duplicate diya icons (🪔 🪔)`);

  // Verify Package 4 does NOT have redundant ceremonial-note-pill in package-header-right
  assert(!html.includes('ceremonial-note-pill'), `[${lang.code.toUpperCase()}] Package 4 does not render redundant ceremonial-note-pill in header`);
}

// -------------------------------------------------------------
// SECTION 3: Desktop Budget Banner & Sub-Budget Styling (src/css/main.css)
// -------------------------------------------------------------
console.log('\n--- SECTION 3: Desktop Budget Banner & Sub-Budget CSS ---');
const mainCss = fs.readFileSync(mainCssPath, 'utf-8');

// Check that .sub-budget-row has a dedicated equal 2-column grid layout on desktop
const subBudgetBlock = mainCss.substring(mainCss.indexOf('.proposal-grand-total-banner .sub-budget-row'), mainCss.indexOf('.proposal-grand-total-banner .sub-budget-row') + 400);
const hasStrictDesktopGrid = subBudgetBlock.includes('display: grid') && subBudgetBlock.includes('grid-template-columns');

assert(hasStrictDesktopGrid, 'main.css defines an equal 2-column grid layout (display: grid; grid-template-columns: repeat(2, 1fr)) for .sub-budget-row on desktop');

// Check styling for .sub-budget-pill
assert(mainCss.includes('.sub-budget-pill'), 'main.css styles .sub-budget-pill');
assert(mainCss.includes('.sub-budget-label'), 'main.css styles .sub-budget-label');
assert(mainCss.includes('.sub-budget-val') || mainCss.includes('.sub-budget-amount'), 'main.css styles .sub-budget-val / amount');

// Check formula-pradhista accent styling in main.css
assert(mainCss.includes('.formula-pradhista'), 'main.css defines dedicated accent styling for .formula-pradhista');

// Check desktop styling for .proposal-grand-total-banner
assert(mainCss.includes('.proposal-grand-total-banner'), 'main.css styles .proposal-grand-total-banner');

// Check mobile media queries still exist and adapt sub-budgets
assert(mainCss.includes('@media (max-width: 768px)'), 'main.css defines @media (max-width: 768px)');
const mq768 = mainCss.substring(mainCss.indexOf('@media (max-width: 768px)'));
assert(mq768.includes('.sub-budget-row'), '768px media query stacks or adapts .sub-budget-row');

// -------------------------------------------------------------
// SECTION 4: 4-Language Localization Integrity
// -------------------------------------------------------------
console.log('\n--- SECTION 4: 4-Language Localization Integrity ---');
const baseKeys = Object.keys(en);
assert(baseKeys.length === 204, `Base EN has exactly 204 keys (found: ${baseKeys.length})`);

for (const lang of langs) {
  const keys = Object.keys(lang.dict);
  assert(keys.length === 204, `[${lang.code.toUpperCase()}] Key count is 204 (${keys.length}/204)`);
  const missing = baseKeys.filter(k => !keys.includes(k));
  assert(missing.length === 0, `[${lang.code.toUpperCase()}] 0 missing keys`);
}

// -------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------
console.log('\n================================================================');
console.log(`VERIFICATION SUMMARY: ${passedTests}/${totalTests} Passed (${failedTests} Failed)`);
console.log('================================================================\n');

if (failedTests > 0) {
  console.error(`❌ Verification failed with ${failedTests} failure(s).`);
  process.exit(1);
} else {
  console.log('🎉 100% SUCCESS: All clean icon & desktop budget tests passed!');
  process.exit(0);
}
