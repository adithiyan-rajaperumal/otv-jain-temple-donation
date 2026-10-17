import fs from 'fs';
import path from 'path';
import { proposalData } from '../src/js/data/proposalData.js';
import { en } from '../src/js/data/en.js';
import { ta } from '../src/js/data/ta.js';
import { hi } from '../src/js/data/hi.js';
import { kn } from '../src/js/data/kn.js';
import { renderProposalTable, initProposalActions } from '../src/js/proposal.js';
import { setLanguage } from '../src/js/i18n.js';

const root = path.resolve('d:/otv_temple_donation/otv-jain-temple-donation');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf-8');
const mainCss = fs.readFileSync(path.join(root, 'src/css/main.css'), 'utf-8');
const printCss = fs.readFileSync(path.join(root, 'src/css/print.css'), 'utf-8');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`[PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${message}`);
    failedTests++;
  }
}

console.log('=== TEST SUITE 1: Static HTML & Budget Verification ===\n');

// 1.1 Old Budget purged
assert(!html.includes('1,27,30,740'), 'Old budget figure ₹1,27,30,740 completely removed from index.html');
assert(!html.includes('1.27 Crores'), 'Old "1.27 Crores" text removed from index.html');

// 1.2 Revised Budget present
assert(html.includes('76,16,000'), 'Certified grand total ₹76,16,000 present in index.html');
assert(html.includes('76.16 Lakhs'), 'Certified grand total label ~₹76.16 Lakhs present in index.html');

// 1.3 Download buttons for 3 estimate PDFs
assert(html.includes('/assets/docs/estimate_1_temple_renovation.pdf'), 'Package 1 estimate PDF link present in index.html');
assert(html.includes('/assets/docs/estimate_2_muni_maharaj_guest_house.pdf'), 'Package 2 estimate PDF link present in index.html');
assert(html.includes('/assets/docs/estimate_3_multipurpose_hall.pdf'), 'Package 3 estimate PDF link present in index.html');

// 1.4 Print proof button retained
assert(html.includes('id="print-proof-btn"'), 'Print proof button #print-proof-btn retained in index.html');
assert(html.includes('id="proposal-table-container"'), 'Container #proposal-table-container present for mounting');

console.log('\n=== TEST SUITE 2: proposalData.js Certified Estimates & Arithmetic ===\n');

// 2.1 Grand Total
assert(proposalData.grandTotal === 7616000, 'Grand total is exactly 7616000');
assert(proposalData.formattedGrandTotal === '₹76,16,000', 'Formatted grand total is "₹76,16,000"');

// 2.2 Engineer details
assert(proposalData.engineer.name === 'Er. K. Sundararajan', 'Engineer name is Er. K. Sundararajan');
assert(proposalData.engineer.regNo === '038/LS/2019/00015', 'Engineer registration number is 038/LS/2019/00015');

// 2.3 3 Packages exist
assert(Array.isArray(proposalData.packages) && proposalData.packages.length === 3, 'proposalData contains exactly 3 modular packages');

const pkg1 = proposalData.packages[0];
const pkg2 = proposalData.packages[1];
const pkg3 = proposalData.packages[2];

// 2.4 Package totals and sum of items
const pkg1Sum = pkg1.items.reduce((acc, item) => acc + item.amount, 0);
assert(pkg1.total === 3160000, 'Package 1 total is 3160000 (₹31.60 Lakhs)');
assert(pkg1Sum === pkg1.total, `Package 1 item sum (${pkg1Sum}) matches package total (${pkg1.total})`);

const pkg2Sum = pkg2.items.reduce((acc, item) => acc + item.amount, 0);
assert(pkg2.total === 1861000, 'Package 2 total is 1861000 (₹18.61 Lakhs)');
assert(pkg2Sum === pkg2.total, `Package 2 item sum (${pkg2Sum}) matches package total (${pkg2.total})`);

const pkg3Sum = pkg3.items.reduce((acc, item) => acc + item.amount, 0);
assert(pkg3.total === 2595000, 'Package 3 total is 2595000 (₹25.95 Lakhs)');
assert(pkg3Sum === pkg3.total, `Package 3 item sum (${pkg3Sum}) matches package total (${pkg3.total})`);

// 2.5 Combined sum
const combinedPackagesTotal = pkg1.total + pkg2.total + pkg3.total;
assert(combinedPackagesTotal === proposalData.grandTotal, `Sum of 3 packages (${combinedPackagesTotal}) strictly equals grand total (${proposalData.grandTotal})`);

// 2.6 Specs in Package 2 and Package 3
assert(pkg2.specs && pkg2.specs.maharajRoom && pkg2.specs.mathajiRoom, 'Package 2 contains room specs (Maharaj room, Mathaji room)');
assert(pkg3.specs && pkg3.specs.hallArea && pkg3.specs.columns && pkg3.specs.roof, 'Package 3 contains technical specs (hallArea, columns, roof)');

console.log('\n=== TEST SUITE 3: Physical PDF File Assets on Disk ===\n');

const pdfPaths = [
  'public/assets/docs/estimate_1_temple_renovation.pdf',
  'public/assets/docs/estimate_2_muni_maharaj_guest_house.pdf',
  'public/assets/docs/estimate_3_multipurpose_hall.pdf'
];

pdfPaths.forEach(relPath => {
  const fullPath = path.join(root, relPath);
  const exists = fs.existsSync(fullPath);
  assert(exists, `Physical file exists: ${relPath}`);
  if (exists) {
    const stats = fs.statSync(fullPath);
    assert(stats.size > 10000, `File size is substantial (${stats.size} bytes): ${relPath}`);
  }
});

console.log('\n=== TEST SUITE 4: DOM Rendering & Multilingual Component Test ===\n');

// Mock browser DOM environment
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
  get innerHTML() {
    return this._innerHTML;
  }
  set innerHTML(val) {
    this._innerHTML = val;
  }
  setAttribute(name, val) {
    this._attributes[name] = val;
  }
  getAttribute(name) {
    return this._attributes[name];
  }
  addEventListener(evt, fn) {
    this.eventListeners[evt] = this.eventListeners[evt] || [];
    this.eventListeners[evt].push(fn);
  }
}

const mockContainer = new MockElement('div', 'proposal-table-container');
const mockPrintBtn = new MockElement('button', 'print-proof-btn');

global.document = {
  documentElement: { lang: 'ta' },
  getElementById: (id) => {
    if (id === 'proposal-table-container') return mockContainer;
    if (id === 'print-proof-btn') return mockPrintBtn;
    return null;
  },
  querySelectorAll: () => [],
  dispatchEvent: () => {}
};
global.window = {
  print: () => {}
};

// Test rendering across 4 languages
const testLangs = ['ta', 'en', 'hi', 'kn'];

testLangs.forEach(lang => {
  setLanguage(lang);
  renderProposalTable();
  const rendered = mockContainer.innerHTML;

  assert(rendered.length > 500, `[${lang.toUpperCase()}] renderProposalTable() generates non-empty DOM`);
  assert(rendered.includes('proposal-grand-total-banner'), `[${lang.toUpperCase()}] Grand total banner rendered`);
  assert(rendered.includes('₹76,16,000'), `[${lang.toUpperCase()}] ₹76,16,000 rendered`);
  assert(rendered.includes('Er. K. Sundararajan'), `[${lang.toUpperCase()}] Engineer certification rendered`);
  assert(rendered.includes('038/LS/2019/00015'), `[${lang.toUpperCase()}] Engineer Reg No rendered`);
  assert(rendered.includes('package-card-pkg_1'), `[${lang.toUpperCase()}] Package 1 card rendered`);
  assert(rendered.includes('package-card-pkg_2'), `[${lang.toUpperCase()}] Package 2 card rendered`);
  assert(rendered.includes('package-card-pkg_3'), `[${lang.toUpperCase()}] Package 3 card rendered`);
  assert(rendered.includes('estimate_1_temple_renovation.pdf'), `[${lang.toUpperCase()}] Package 1 PDF download link rendered`);
  assert(rendered.includes('estimate_2_muni_maharaj_guest_house.pdf'), `[${lang.toUpperCase()}] Package 2 PDF download link rendered`);
  assert(rendered.includes('estimate_3_multipurpose_hall.pdf'), `[${lang.toUpperCase()}] Package 3 PDF download link rendered`);
  assert(rendered.includes('proposal-grand-summary-card'), `[${lang.toUpperCase()}] Grand summary card rendered`);
});

// Test print action listener
initProposalActions();
assert(mockPrintBtn.eventListeners['click'] && mockPrintBtn.eventListeners['click'].length > 0, 'initProposalActions attaches click listener to print button');

console.log('\n=== TEST SUITE 5: Responsive Mobile-First CSS Verification ===\n');

const requiredCssRules = [
  '.budget-banner.proposal-grand-total-banner',
  '.package-card',
  '.package-card-header',
  '.package-badge',
  '.package-verified-tag',
  '.package-specs-section',
  '.specs-grid',
  '.spec-pill',
  '.package-table-responsive',
  '.package-item-table',
  '.proposal-grand-summary-card',
  '.grand-summary-formula',
  '.btn-package-pdf',
  '@media (max-width: 600px)'
];

requiredCssRules.forEach(rule => {
  assert(mainCss.includes(rule), `main.css includes rule: ${rule}`);
});

assert(mainCss.includes('min-width: 520px'), 'main.css ensures .package-item-table has min-width: 520px for horizontal scrolling');
assert(mainCss.includes('overflow-x: auto'), 'main.css ensures table responsive wrappers have overflow-x: auto');
assert(printCss.includes('.package-card'), 'print.css includes .package-card styling');

console.log(`\n========================================`);
console.log(`TEST SUMMARY: ${passedTests}/${totalTests} Passed (${failedTests} Failed)`);
console.log(`========================================\n`);

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('✅ All Task 5 verification checks passed with 100% success!');
}
