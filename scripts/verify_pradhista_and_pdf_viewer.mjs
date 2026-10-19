/**
 * Master Verification Suite: Panchakalyana Pradhista & In-Page PDF Lightbox Viewer
 * 
 * Comprehensive End-to-End Verification Covering:
 * 1. 4-Language Localization Symmetry (exact 204 keys, 0 missing, 0 empty, all 11 new keys)
 * 2. Proposal Data Architecture & Budget Totals (₹1,26,16,000 grand total, ₹76.16L civil, ₹50.00L pradhista, 4 packages)
 * 3. DOM Restructuring & Section Cleanup (absence of .notice-proofs & #print-proof-btn, presence of #pdf-modal & triggers)
 * 4. Proposal Rendering Simulation (top banner ₹1,26,16,000, civil/pradhista sub-pills, Package 4 card, 4-part formula)
 * 5. PDF Modal Interactive Simulation (open, close, escape key, backdrop dismissal, focus, overflow)
 * 6. Responsive CSS Verification (#pdf-modal, .pdf-modal-content, .pkg-ceremonial, media queries for 768px, 480px, 360px)
 */

import fs from 'fs';
import path from 'path';
import { en } from '../src/js/data/en.js';
import { ta } from '../src/js/data/ta.js';
import { hi } from '../src/js/data/hi.js';
import { kn } from '../src/js/data/kn.js';
import { proposalData } from '../src/js/data/proposalData.js';
import { setLanguage, t } from '../src/js/i18n.js';
import { openPdfModal, closePdfModal, initPdfModal } from '../src/js/pdfModal.js';
import { renderProposalTable, initProposalActions } from '../src/js/proposal.js';

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
console.log('  Master Verification: Panchakalyana Pradhista & PDF Viewer');
console.log('================================================================\n');

// -------------------------------------------------------------
// SECTION 1: 4-Language Localization Symmetry & New Keys
// -------------------------------------------------------------
console.log('--- SECTION 1: 4-Language Localization Symmetry & New Keys ---');

const langs = [
  { code: 'en', name: 'English', data: en },
  { code: 'ta', name: 'Tamil', data: ta },
  { code: 'hi', name: 'Hindi', data: hi },
  { code: 'kn', name: 'Kannada', data: kn }
];

const baseKeys = Object.keys(en);
assert(baseKeys.length === 204, `Base language (EN) has exactly 204 keys (found: ${baseKeys.length})`);

const pradhistaKeys = [
  'pkg_4_title',
  'pkg_4_subtitle',
  'pkg_4_badge',
  'pkg_4_item_1',
  'pkg_4_item_2',
  'pkg_4_item_3',
  'grand_project_budget_label',
  'civil_works_subtotal_label',
  'pradhista_subtotal_label',
  'btn_view_pdf',
  'pdf_modal_fallback_text'
];

for (const lang of langs) {
  const keys = Object.keys(lang.data);
  assert(keys.length === 204, `[${lang.code.toUpperCase()}] Key count is exactly 204 (${keys.length}/204)`);

  const missing = baseKeys.filter(k => !keys.includes(k));
  assert(missing.length === 0, `[${lang.code.toUpperCase()}] 0 missing keys compared to base EN`);

  const extra = keys.filter(k => !baseKeys.includes(k));
  assert(extra.length === 0, `[${lang.code.toUpperCase()}] 0 extra keys not in base EN`);

  let emptyCount = 0;
  for (const k of keys) {
    const val = lang.data[k];
    if (val === undefined || val === null || (typeof val === 'string' && val.trim() === '')) {
      emptyCount++;
    }
  }
  assert(emptyCount === 0, `[${lang.code.toUpperCase()}] 0 empty or undefined string values`);

  // Assert presence of all 11 new keys
  const missingPradhista = pradhistaKeys.filter(k => !keys.includes(k));
  assert(missingPradhista.length === 0, `[${lang.code.toUpperCase()}] All 11 Panchakalyana Pradhista & PDF Viewer keys present`);
}

// -------------------------------------------------------------
// SECTION 2: Proposal Data Architecture & Budget Totals
// -------------------------------------------------------------
console.log('\n--- SECTION 2: Proposal Data Architecture & Budget Totals ---');

assert(proposalData.grandTotal === 12616000, `proposalData.grandTotal is exactly 12616000 (found: ${proposalData.grandTotal})`);
assert(proposalData.formattedGrandTotal === '₹1,26,16,000', `proposalData.formattedGrandTotal is "₹1,26,16,000" (found: "${proposalData.formattedGrandTotal}")`);
assert(proposalData.civilSubtotal === 7616000, `proposalData.civilSubtotal is exactly 7616000 (found: ${proposalData.civilSubtotal})`);
assert(proposalData.pradhistaSubtotal === 5000000, `proposalData.pradhistaSubtotal is exactly 5000000 (found: ${proposalData.pradhistaSubtotal})`);
assert(proposalData.civilSubtotal + proposalData.pradhistaSubtotal === proposalData.grandTotal, 'Civil Subtotal (₹76.16L) + Pradhista Subtotal (₹50.00L) equals Grand Total (₹1,26,16,000)');

assert(Array.isArray(proposalData.packages) && proposalData.packages.length === 4, `proposalData contains exactly 4 packages (found: ${proposalData.packages.length})`);

const pkg1 = proposalData.packages[0];
const pkg2 = proposalData.packages[1];
const pkg3 = proposalData.packages[2];
const pkg4 = proposalData.packages[3];

assert(pkg1.id === 'pkg_1' && pkg1.total === 3160000, 'Package 1 (Temple Renovation) is ₹31,60,000');
assert(pkg2.id === 'pkg_2' && pkg2.total === 1861000, 'Package 2 (Muni Maharaj Quarters) is ₹18,61,000');
assert(pkg3.id === 'pkg_3' && pkg3.total === 2595000, 'Package 3 (Multipurpose Hall) is ₹25,95,000');
assert(pkg4.id === 'pkg_4' && pkg4.total === 5000000, 'Package 4 (Panchakalyana Pradhista) is ₹50,00,000');

assert(Array.isArray(pkg4.items) && pkg4.items.length === 3, `Package 4 has exactly 3 itemized lines (found: ${pkg4.items.length})`);
assert(pkg4.items[0].amount === 3000000, 'Package 4 Item 1 (Annadanam) is ₹30,00,000');
assert(pkg4.items[1].amount === 1000000, 'Package 4 Item 2 (Vidhan/Pooja) is ₹10,00,000');
assert(pkg4.items[2].amount === 1000000, 'Package 4 Item 3 (Pandhal/Stage) is ₹10,00,000');

const pkg4Sum = pkg4.items.reduce((sum, item) => sum + item.amount, 0);
assert(pkg4Sum === 5000000, `Package 4 items sum strictly equals ₹50,00,000 (${pkg4Sum})`);

const allPackagesSum = pkg1.total + pkg2.total + pkg3.total + pkg4.total;
assert(allPackagesSum === 12616000, `Sum of all 4 package totals (${allPackagesSum}) strictly equals grand total (12616000)`);

// -------------------------------------------------------------
// SECTION 3: DOM Restructuring & Section Cleanup (index.html)
// -------------------------------------------------------------
console.log('\n--- SECTION 3: DOM Restructuring & Section Cleanup ---');

const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

// Absence of legacy elements
assert(!indexHtml.includes('notice-proofs'), '.notice-proofs does NOT exist in index.html');
assert(!indexHtml.includes('id="print-proof-btn"'), '#print-proof-btn does NOT exist in index.html');
assert(!indexHtml.includes('Printed Notice Color Scans & Proofs'), 'Legacy notice scans title completely removed from index.html');
assert(!indexHtml.includes('english_notice_color.jpg'), 'Legacy english_notice_color.jpg thumbnail absent');
assert(!indexHtml.includes('tamil_notice_colour.jpg'), 'Legacy tamil_notice_colour.jpg thumbnail absent');
assert(!indexHtml.includes('hindhi_notice_color.jpg'), 'Legacy hindhi_notice_color.jpg thumbnail absent');
assert(!indexHtml.includes('kannada_notice_color.jpg'), 'Legacy kannada_notice_color.jpg thumbnail absent');

// Presence of #pdf-modal and controls
assert(indexHtml.includes('id="pdf-modal"'), '#pdf-modal exists in index.html');
assert(indexHtml.includes('pdf-modal-content'), '.pdf-modal-content exists in index.html');
assert(indexHtml.includes('id="pdf-modal-title"'), '#pdf-modal-title exists in index.html');
assert(indexHtml.includes('id="pdf-modal-frame"'), '#pdf-modal-frame iframe exists in index.html');
assert(indexHtml.includes('id="close-pdf-modal"'), '#close-pdf-modal close button exists in index.html');
assert(indexHtml.includes('id="pdf-modal-download-btn"'), '#pdf-modal-download-btn exists in index.html');
assert(indexHtml.includes('id="pdf-modal-direct-link"'), '#pdf-modal-direct-link fallback link exists in index.html');
assert(indexHtml.includes('data-i18n="pdf_modal_fallback_text"'), 'Fallback text i18n attribute present in pdf modal');

// Presence of document view triggers (.btn-view-pdf with data-pdf-url)
const viewPdfButtons = (indexHtml.match(/btn-view-pdf/g) || []).length;
assert(viewPdfButtons >= 5, `index.html contains at least 5 .btn-view-pdf buttons (found: ${viewPdfButtons})`);
assert(indexHtml.includes('data-pdf-url="/assets/docs/form_80G_provisional_approval.pdf"'), '80G document has data-pdf-url trigger');
assert(indexHtml.includes('data-pdf-url="/assets/docs/form_12A_provisional_registration.pdf"'), '12A document has data-pdf-url trigger');
assert(indexHtml.includes('data-pdf-url="/assets/docs/trust_registration_masked.pdf"'), 'Trust Deed document has data-pdf-url trigger');
assert(indexHtml.includes('id="view-bhattarak-letter-btn"'), '#view-bhattarak-letter-btn view trigger exists');
assert(indexHtml.includes('id="view-notice-pdf-btn"'), '#view-notice-pdf-btn view trigger exists');

// -------------------------------------------------------------
// SECTION 4: Proposal Rendering Simulation Across 4 Languages
// -------------------------------------------------------------
console.log('\n--- SECTION 4: Proposal Rendering Simulation Across 4 Languages ---');

// Setup global CustomEvent if not present
if (typeof global.CustomEvent === 'undefined') {
  global.CustomEvent = class CustomEvent {
    constructor(type, params = {}) {
      this.type = type;
      this.detail = params.detail || {};
    }
  };
}

// Mock DOM Element for proposal table container
class MockProposalElement {
  constructor(tag, id = '') {
    this.tagName = tag.toUpperCase();
    this.id = id;
    this._innerHTML = '';
  }
  get innerHTML() { return this._innerHTML; }
  set innerHTML(val) { this._innerHTML = val; }
}

const mockProposalContainer = new MockProposalElement('div', 'proposal-table-container');

// Setup global mock document for rendering
global.document = {
  documentElement: { lang: 'en' },
  getElementById: (id) => {
    if (id === 'proposal-table-container') return mockProposalContainer;
    return null;
  },
  querySelectorAll: () => [],
  addEventListener: () => {},
  dispatchEvent: () => {}
};

for (const lang of langs) {
  setLanguage(lang.code);
  renderProposalTable();
  const html = mockProposalContainer.innerHTML;

  assert(html.length > 1000, `[${lang.code.toUpperCase()}] Proposal table renders non-empty markup (${html.length} chars)`);
  assert(!html.includes('undefined'), `[${lang.code.toUpperCase()}] Proposal markup has 0 "undefined" occurrences`);
  assert(!html.includes('[object Object]'), `[${lang.code.toUpperCase()}] Proposal markup has 0 "[object Object]" occurrences`);

  // Assert Top Combined Budget Banner
  assert(html.includes('1,26,16,000') || html.includes('₹1,26,16,000'), `[${lang.code.toUpperCase()}] Top banner displays ₹1,26,16,000`);
  assert(html.includes('76,16,000'), `[${lang.code.toUpperCase()}] Top banner displays Civil Works subtotal (₹76,16,000)`);
  assert(html.includes(lang.data.civil_works_subtotal_label), `[${lang.code.toUpperCase()}] Top banner displays localized civil works subtotal label`);
  assert(html.includes('50,00,000'), `[${lang.code.toUpperCase()}] Top banner displays Pradhista subtotal (₹50,00,000)`);
  assert(html.includes(lang.data.pradhista_subtotal_label), `[${lang.code.toUpperCase()}] Top banner displays localized pradhista subtotal label`);

  // Assert Package 4 Ceremonial Card
  assert(html.includes('id="package-card-pkg_4"'), `[${lang.code.toUpperCase()}] Package 4 card rendered with id="package-card-pkg_4"`);
  assert(html.includes('pkg-ceremonial'), `[${lang.code.toUpperCase()}] Package 4 card has pkg-ceremonial class`);
  assert(html.includes(lang.data.pkg_4_title), `[${lang.code.toUpperCase()}] Package 4 displays localized title`);
  assert(html.includes(lang.data.pkg_4_subtitle), `[${lang.code.toUpperCase()}] Package 4 displays localized subtitle`);
  assert(html.includes(lang.data.pkg_4_badge), `[${lang.code.toUpperCase()}] Package 4 displays localized ceremonial badge`);
  assert(html.includes(lang.data.pkg_4_item_1) && html.includes('30,00,000'), `[${lang.code.toUpperCase()}] Package 4 displays Item 1 and ₹30,00,000`);
  assert(html.includes(lang.data.pkg_4_item_2) && html.includes('10,00,000'), `[${lang.code.toUpperCase()}] Package 4 displays Item 2 and ₹10,00,000`);
  assert(html.includes(lang.data.pkg_4_item_3), `[${lang.code.toUpperCase()}] Package 4 displays Item 3`);
  assert(!html.includes('href="undefined"'), `[${lang.code.toUpperCase()}] Package 4 has no broken href="undefined"`);

  // Assert 4-Part Formula Card
  assert(html.includes('grand-summary-formula'), `[${lang.code.toUpperCase()}] Grand summary formula container rendered`);
  assert(html.includes(lang.data.pkg_1_title), `[${lang.code.toUpperCase()}] Formula includes Package 1 title`);
  assert(html.includes(lang.data.pkg_2_title), `[${lang.code.toUpperCase()}] Formula includes Package 2 title`);
  assert(html.includes(lang.data.pkg_3_title), `[${lang.code.toUpperCase()}] Formula includes Package 3 title`);
  assert(html.includes(lang.data.pkg_4_title), `[${lang.code.toUpperCase()}] Formula includes Package 4 title`);
  assert(html.includes('formula-pradhista'), `[${lang.code.toUpperCase()}] Formula contains formula-pradhista accent block`);

  // Assert Packages 1, 2, 3 have dual action buttons (View & Download)
  assert(html.includes('btn-view-pdf') && html.includes('data-pdf-url="/assets/docs/estimate_1_temple_renovation.pdf"'), `[${lang.code.toUpperCase()}] Package 1 has View PDF button`);
  assert(html.includes('btn-view-pdf') && html.includes('data-pdf-url="/assets/docs/estimate_2_muni_maharaj_guest_house.pdf"'), `[${lang.code.toUpperCase()}] Package 2 has View PDF button`);
  assert(html.includes('btn-view-pdf') && html.includes('data-pdf-url="/assets/docs/estimate_3_multipurpose_hall.pdf"'), `[${lang.code.toUpperCase()}] Package 3 has View PDF button`);
}

// -------------------------------------------------------------
// SECTION 5: PDF Modal Interactive Simulation
// -------------------------------------------------------------
console.log('\n--- SECTION 5: PDF Modal Interactive Simulation ---');

class MockInteractiveDOMElement {
  constructor(tag, id = '', className = '') {
    this.tagName = tag.toUpperCase();
    this.id = id;
    this._className = className;
    this.textContent = '';
    this.src = '';
    this.href = '';
    this.style = { overflow: '' };
    this.attributes = {};
    this.dataset = {};
    this.eventListeners = {};
    this.parentNode = null;

    const self = this;
    this.classList = {
      _classes: new Set(className ? className.split(/\s+/).filter(Boolean) : []),
      add(cls) {
        self.classList._classes.add(cls);
        self._className = Array.from(self.classList._classes).join(' ');
      },
      remove(cls) {
        self.classList._classes.delete(cls);
        self._className = Array.from(self.classList._classes).join(' ');
      },
      contains(cls) {
        return self.classList._classes.has(cls);
      }
    };
  }

  setAttribute(name, val) {
    this.attributes[name] = String(val);
    if (name === 'href') this.href = String(val);
    if (name === 'src') this.src = String(val);
    if (name.startsWith('data-')) {
      const prop = name.slice(5).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      this.dataset[prop] = String(val);
    }
  }

  getAttribute(name) {
    if (name === 'href') return this.href || this.attributes[name] || null;
    if (name === 'src') return this.src || this.attributes[name] || null;
    if (name === 'download') return this.attributes['download'] || null;
    return this.attributes[name] !== undefined ? this.attributes[name] : null;
  }

  removeAttribute(name) {
    delete this.attributes[name];
    if (name === 'download') delete this.attributes['download'];
  }

  focus() {
    global.document.activeElement = this;
  }

  addEventListener(type, listener) {
    if (!this.eventListeners[type]) this.eventListeners[type] = [];
    this.eventListeners[type].push(listener);
  }

  dispatchEvent(evt) {
    const list = this.eventListeners[evt.type] || [];
    for (const fn of list) {
      fn(evt);
    }
  }

  closest(selector) {
    let current = this;
    while (current) {
      if (selector.split(',').some(part => {
        const p = part.trim();
        if (p.startsWith('.')) return current.classList.contains(p.slice(1));
        if (p.startsWith('#')) return current.id === p.slice(1);
        if (p.startsWith('[data-pdf-url]')) return current.getAttribute('data-pdf-url') !== null;
        return false;
      })) {
        return current;
      }
      current = current.parentNode;
    }
    return null;
  }
}

const mockModal = new MockInteractiveDOMElement('div', 'pdf-modal', 'modal no-print');
const mockTitle = new MockInteractiveDOMElement('h3', 'pdf-modal-title', 'pdf-modal-title');
const mockFrame = new MockInteractiveDOMElement('iframe', 'pdf-modal-frame');
mockFrame.src = 'about:blank';
const mockDownloadBtn = new MockInteractiveDOMElement('a', 'pdf-modal-download-btn', 'btn btn-gold btn-sm');
const mockCloseBtn = new MockInteractiveDOMElement('button', 'close-pdf-modal', 'modal-close');
const mockDirectLink = new MockInteractiveDOMElement('a', 'pdf-modal-direct-link');
const mockBody = new MockInteractiveDOMElement('body');

const triggerBtn = new MockInteractiveDOMElement('button', 'view-estimate-1-btn', 'btn btn-outline btn-view-pdf');
triggerBtn.setAttribute('data-pdf-url', '/assets/docs/estimate_1_temple_renovation.pdf');
triggerBtn.setAttribute('data-pdf-title', 'Estimate 1 - Temple Renovation');
triggerBtn.setAttribute('data-pdf-filename', 'Estimate_1_Temple_Renovation.pdf');

const domMap = {
  'pdf-modal': mockModal,
  'pdf-modal-title': mockTitle,
  'pdf-modal-frame': mockFrame,
  'pdf-modal-download-btn': mockDownloadBtn,
  'close-pdf-modal': mockCloseBtn,
  'pdf-modal-direct-link': mockDirectLink,
  'view-estimate-1-btn': triggerBtn
};

const documentEventListeners = {};

global.document = {
  body: mockBody,
  documentElement: { lang: 'en' },
  activeElement: triggerBtn,
  getElementById(id) {
    return domMap[id] || null;
  },
  querySelectorAll() {
    return [];
  },
  querySelector() {
    return null;
  },
  addEventListener(type, fn) {
    if (!documentEventListeners[type]) documentEventListeners[type] = [];
    documentEventListeners[type].push(fn);
  },
  dispatchEvent(evt) {
    const list = documentEventListeners[evt.type] || [];
    for (const fn of list) {
      fn(evt);
    }
  }
};

// 1. Initialize modal listeners
initPdfModal();
assert(mockModal.dataset.pdfModalInitialized === 'true', 'initPdfModal successfully initialized and marked dataset flag');

// 2. Test openPdfModal
triggerBtn.focus();
openPdfModal('/assets/docs/form_80G_provisional_approval.pdf', 'Form 80G Approval', 'Form_80G.pdf');

assert(mockModal.classList.contains('active'), 'openPdfModal adds "active" class to #pdf-modal');
assert(mockTitle.textContent === 'Form 80G Approval', 'openPdfModal sets title text correctly');
assert(mockFrame.src === '/assets/docs/form_80G_provisional_approval.pdf', 'openPdfModal sets iframe src to PDF path');
assert(mockDownloadBtn.href === '/assets/docs/form_80G_provisional_approval.pdf', 'openPdfModal sets download button href');
assert(mockDownloadBtn.getAttribute('download') === 'Form_80G.pdf', 'openPdfModal sets download filename attribute');
assert(mockDirectLink.href === '/assets/docs/form_80G_provisional_approval.pdf', 'openPdfModal sets direct tab link href');
assert(mockBody.style.overflow === 'hidden', 'openPdfModal sets document.body.style.overflow = "hidden"');
assert(global.document.activeElement === mockCloseBtn, 'openPdfModal transfers focus to #close-pdf-modal for accessibility');

// 3. Test closePdfModal
closePdfModal();

assert(!mockModal.classList.contains('active'), 'closePdfModal removes "active" class from #pdf-modal');
assert(mockFrame.src === 'about:blank', 'closePdfModal resets iframe src to "about:blank" to free memory');
assert(mockBody.style.overflow === '', 'closePdfModal restores document.body.style.overflow to empty string');
assert(global.document.activeElement === triggerBtn, 'closePdfModal restores focus to the trigger element that opened it');

// 4. Test Escape key dismissal
openPdfModal('/assets/docs/test_doc.pdf', 'Test Escape Dismissal');
assert(mockModal.classList.contains('active'), 'Modal is open prior to Escape key press');
global.document.dispatchEvent({ type: 'keydown', key: 'Escape' });
assert(!mockModal.classList.contains('active'), 'Pressing Escape dismisses the PDF modal');
assert(mockFrame.src === 'about:blank', 'Escape key dismissal resets iframe src to "about:blank"');
assert(mockBody.style.overflow === '', 'Escape key dismissal restores document.body.style.overflow');

// 5. Test Backdrop click dismissal
openPdfModal('/assets/docs/test_doc2.pdf', 'Test Backdrop Dismissal');
assert(mockModal.classList.contains('active'), 'Modal is open prior to backdrop click');
// Clicking backdrop (target is the modal overlay itself)
mockModal.dispatchEvent({ type: 'click', target: mockModal });
assert(!mockModal.classList.contains('active'), 'Clicking modal backdrop dismisses the PDF modal');
assert(mockFrame.src === 'about:blank', 'Backdrop click dismissal resets iframe src to "about:blank"');
assert(mockBody.style.overflow === '', 'Backdrop click dismissal restores document.body.style.overflow');

// -------------------------------------------------------------
// SECTION 6: Responsive CSS Verification (src/css/main.css)
// -------------------------------------------------------------
console.log('\n--- SECTION 6: Responsive CSS Verification ---');

const mainCss = fs.readFileSync(mainCssPath, 'utf-8');

// #pdf-modal component styling
assert(mainCss.includes('#pdf-modal {') || mainCss.includes('#pdf-modal'), 'main.css styles #pdf-modal');
assert(mainCss.includes('.pdf-modal-content {') || mainCss.includes('.pdf-modal-content'), 'main.css styles .pdf-modal-content');
assert(mainCss.includes('.pdf-modal-header {') || mainCss.includes('.pdf-modal-header'), 'main.css styles .pdf-modal-header');
assert(mainCss.includes('.pdf-modal-title {') || mainCss.includes('.pdf-modal-title'), 'main.css styles .pdf-modal-title');
assert(mainCss.includes('.pdf-modal-body {') || mainCss.includes('.pdf-modal-body'), 'main.css styles .pdf-modal-body');
assert(mainCss.includes('#pdf-modal-frame {') || mainCss.includes('#pdf-modal-frame'), 'main.css styles #pdf-modal-frame');
assert(mainCss.includes('.pdf-modal-footer {') || mainCss.includes('.pdf-modal-footer'), 'main.css styles .pdf-modal-footer');
assert(mainCss.includes('#pdf-modal-direct-link'), 'main.css styles #pdf-modal-direct-link');

// Ceremonial card & budget sub-pill styling
assert(mainCss.includes('.pkg-ceremonial') || mainCss.includes('.package-card.pkg-ceremonial'), 'main.css styles .package-card.pkg-ceremonial');
assert(mainCss.includes('.badge-ceremonial-estimate'), 'main.css styles .badge-ceremonial-estimate');
assert(mainCss.includes('.sub-budget-row'), 'main.css styles .sub-budget-row');
assert(mainCss.includes('.sub-budget-pill'), 'main.css styles .sub-budget-pill');
assert(mainCss.includes('.sub-budget-label'), 'main.css styles .sub-budget-label');
assert(mainCss.includes('.sub-budget-amount') || mainCss.includes('.sub-budget-val'), 'main.css styles .sub-budget-amount');

// Dual document action buttons
assert(mainCss.includes('.doc-actions-group'), 'main.css styles .doc-actions-group');
assert(mainCss.includes('.btn-doc-view'), 'main.css styles .btn-doc-view');
assert(mainCss.includes('.btn-doc-download'), 'main.css styles .btn-doc-download');

// Responsive media queries: 768px, 480px, 360px
assert(mainCss.includes('@media (max-width: 768px)'), 'main.css defines @media (max-width: 768px) tablet query');
assert(mainCss.includes('@media (max-width: 480px)'), 'main.css defines @media (max-width: 480px) mobile query');
assert(mainCss.includes('@media (max-width: 360px)'), 'main.css defines @media (max-width: 360px) small screen query');

// Verify responsive adaptations for modal in media queries
const mq768 = mainCss.substring(mainCss.indexOf('@media (max-width: 768px)'));
assert(mq768.includes('.pdf-modal-content'), '768px media query adapts .pdf-modal-content');
assert(mq768.includes('.sub-budget-row'), '768px media query stacks .sub-budget-row');

const mq480 = mainCss.substring(mainCss.indexOf('@media (max-width: 480px)'));
assert(mq480.includes('.pdf-modal-content'), '480px media query adapts .pdf-modal-content');
assert(mq480.includes('.pdf-modal-title'), '480px media query scales down .pdf-modal-title font');
assert(mq480.includes('.doc-actions-group'), '480px media query adapts .doc-actions-group');

const mq360 = mainCss.substring(mainCss.indexOf('@media (max-width: 360px)'));
assert(mq360.includes('.pdf-modal-content'), '360px media query adapts .pdf-modal-content');
assert(mq360.includes('.doc-actions-group'), '360px media query adapts .doc-actions-group');

// -------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------
console.log('\n================================================================');
console.log(`MASTER VERIFICATION SUMMARY: ${passedTests}/${totalTests} Passed (${failedTests} Failed)`);
console.log('================================================================\n');

if (failedTests > 0) {
  console.error(`❌ Master verification failed with ${failedTests} failure(s).`);
  process.exit(1);
} else {
  console.log('🎉 100% SUCCESS: All Panchakalyana Pradhista & PDF Viewer verifications passed cleanly!');
  process.exit(0);
}
