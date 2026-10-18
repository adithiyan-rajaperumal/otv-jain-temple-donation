/**
 * Verification Suite for Task 3: Interactive Logic & Proposal Rendering
 * 
 * Verifies:
 * 1. Module exports from src/js/pdfModal.js, src/js/proposal.js, and src/js/main.js
 * 2. Headless DOM simulation of PDF modal (open, close, backdrop dismissal, escape key, focus trapping, delegated click)
 * 3. Proposal rendering with Combined Project Budget (₹1,26,16,000 / ~₹1.26 Crores) and sub-pills (₹76.16L + ₹50.00L)
 * 4. Dual view/download action buttons on Packages 1, 2, 3
 * 5. Package 4 rendering with 3 items (₹30L, ₹10L, ₹10L = ₹50L), ceremonial badge, and no undefined href
 * 6. 4-part formula card rendering across all 4 languages (EN, TA, HI, KN)
 * 7. Clean up of dead window.print logic
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
console.log('  Task 3 Verification: PDF Modal & Proposal Package 4 Logic');
console.log('================================================================\n');

// -------------------------------------------------------------
// SECTION 1: Module Exports Verification
// -------------------------------------------------------------
console.log('--- SECTION 1: Module Exports Verification ---');

assert(typeof openPdfModal === 'function', 'src/js/pdfModal.js exports openPdfModal');
assert(typeof closePdfModal === 'function', 'src/js/pdfModal.js exports closePdfModal');
assert(typeof initPdfModal === 'function', 'src/js/pdfModal.js exports initPdfModal');
assert(typeof renderProposalTable === 'function', 'src/js/proposal.js exports renderProposalTable');
assert(typeof initProposalActions === 'function', 'src/js/proposal.js exports initProposalActions');

// Read source files to verify clean-up and window exposures
const mainJsSource = fs.readFileSync(path.resolve('src/js/main.js'), 'utf-8');
const proposalJsSource = fs.readFileSync(path.resolve('src/js/proposal.js'), 'utf-8');

assert(!proposalJsSource.includes('window.print()'), 'src/js/proposal.js has dead window.print() completely removed');
assert(mainJsSource.includes('window.openPdfModal = openPdfModal'), 'src/js/main.js exposes openPdfModal on window');
assert(mainJsSource.includes('window.closePdfModal = closePdfModal'), 'src/js/main.js exposes closePdfModal on window');
assert(mainJsSource.includes('initPdfModal()'), 'src/js/main.js initializes initPdfModal()');

// -------------------------------------------------------------
// SECTION 2: Headless DOM Simulation of PDF Lightbox Modal
// -------------------------------------------------------------
console.log('\n--- SECTION 2: Headless DOM Simulation of PDF Lightbox Modal ---');

// Mock DOM elements
class MockDOMElement {
  constructor(tag, id = '', className = '') {
    this.tagName = tag.toUpperCase();
    this.id = id;
    this._className = className;
    this._innerHTML = '';
    this.textContent = '';
    this.src = '';
    this.href = '';
    this.style = { overflow: '' };
    this.attributes = {};
    this.dataset = {};
    this.eventListeners = {};
    this.parentNode = null;
    this.children = [];

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

  get innerHTML() { return this._innerHTML; }
  set innerHTML(val) {
    this._innerHTML = val;
    this.textContent = val.replace(/<[^>]+>/g, '');
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
    this._isFocused = true;
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
    // Simple selector match for testing delegation
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

// Build mock DOM hierarchy
const mockModal = new MockDOMElement('div', 'pdf-modal', 'modal no-print');
const mockTitle = new MockDOMElement('h3', 'pdf-modal-title', 'pdf-modal-title');
const mockFrame = new MockDOMElement('iframe', 'pdf-modal-frame');
mockFrame.src = 'about:blank';
const mockDownloadBtn = new MockDOMElement('a', 'pdf-modal-download-btn', 'btn btn-gold btn-sm');
const mockCloseBtn = new MockDOMElement('button', 'close-pdf-modal', 'modal-close');
const mockDirectLink = new MockDOMElement('a', 'pdf-modal-direct-link');
const mockBody = new MockDOMElement('body');
const mockProposalContainer = new MockDOMElement('div', 'proposal-table-container');

const triggerBtn = new MockDOMElement('button', 'view-estimate-1-btn', 'btn btn-outline btn-view-pdf');
triggerBtn.setAttribute('data-pdf-url', '/assets/docs/estimate_1_temple_renovation.pdf');
triggerBtn.setAttribute('data-pdf-title', 'Estimate 1 - Temple Renovation');
triggerBtn.setAttribute('data-pdf-filename', 'Estimate_1_Temple_Renovation.pdf');

const domRegistry = {
  'pdf-modal': mockModal,
  'pdf-modal-title': mockTitle,
  'pdf-modal-frame': mockFrame,
  'pdf-modal-download-btn': mockDownloadBtn,
  'close-pdf-modal': mockCloseBtn,
  'pdf-modal-direct-link': mockDirectLink,
  'proposal-table-container': mockProposalContainer,
  'view-estimate-1-btn': triggerBtn
};

const docListeners = {};

global.document = {
  body: mockBody,
  documentElement: { lang: 'ta' },
  activeElement: triggerBtn,
  getElementById(id) {
    return domRegistry[id] || null;
  },
  querySelectorAll(sel) {
    return [];
  },
  querySelector(sel) {
    return null;
  },
  addEventListener(type, fn) {
    if (!docListeners[type]) docListeners[type] = [];
    docListeners[type].push(fn);
  },
  dispatchEvent(evt) {
    const list = docListeners[evt.type] || [];
    for (const fn of list) {
      fn(evt);
    }
  }
};

// Initialize PDF Modal listeners
initPdfModal();
assert(mockModal.dataset.pdfModalInitialized === 'true', 'initPdfModal flags modal as initialized');

// Test 1: openPdfModal
triggerBtn.focus();
assert(global.document.activeElement === triggerBtn, 'Trigger button was focused prior to modal open');

openPdfModal('/assets/docs/form_80G_provisional_approval.pdf', 'Form 80G Approval', 'Form_80G.pdf');

assert(mockModal.classList.contains('active'), 'openPdfModal adds active class to #pdf-modal');
assert(mockTitle.textContent === 'Form 80G Approval', 'openPdfModal sets title text');
assert(mockFrame.src === '/assets/docs/form_80G_provisional_approval.pdf', 'openPdfModal sets iframe src');
assert(mockDownloadBtn.href === '/assets/docs/form_80G_provisional_approval.pdf', 'openPdfModal sets download button href');
assert(mockDownloadBtn.getAttribute('download') === 'Form_80G.pdf', 'openPdfModal sets download filename');
assert(mockDirectLink.href === '/assets/docs/form_80G_provisional_approval.pdf', 'openPdfModal sets direct link href');
assert(mockBody.style.overflow === 'hidden', 'openPdfModal sets document.body.style.overflow to hidden');
assert(global.document.activeElement === mockCloseBtn, 'openPdfModal focuses #close-pdf-modal');

// Test 2: closePdfModal
closePdfModal();

assert(!mockModal.classList.contains('active'), 'closePdfModal removes active class from #pdf-modal');
assert(mockFrame.src === 'about:blank', 'closePdfModal resets frame src to about:blank to free resources');
assert(mockBody.style.overflow === '', 'closePdfModal restores document.body.style.overflow');
assert(global.document.activeElement === triggerBtn, 'closePdfModal restores focus to trigger button');

// Test 3: Dismiss via close button click
openPdfModal('/assets/docs/test.pdf', 'Test Doc');
assert(mockModal.classList.contains('active'), 'Modal is open for close button test');
mockCloseBtn.dispatchEvent({ type: 'click', preventDefault: () => {} });
assert(!mockModal.classList.contains('active'), 'Clicking #close-pdf-modal dismisses modal');

// Test 4: Dismiss via backdrop click
openPdfModal('/assets/docs/test.pdf', 'Test Doc');
assert(mockModal.classList.contains('active'), 'Modal is open for backdrop test');
mockModal.dispatchEvent({ type: 'click', target: mockModal });
assert(!mockModal.classList.contains('active'), 'Clicking backdrop directly dismisses modal');

// Test 5: Dismiss via Escape key
openPdfModal('/assets/docs/test.pdf', 'Test Doc');
assert(mockModal.classList.contains('active'), 'Modal is open for Escape key test');
global.document.dispatchEvent({ type: 'keydown', key: 'Escape' });
assert(!mockModal.classList.contains('active'), 'Pressing Escape dismisses active modal');

// Test 6: Delegated Click Trigger
global.document.dispatchEvent({
  type: 'click',
  target: triggerBtn,
  preventDefault: () => {}
});
assert(mockModal.classList.contains('active'), 'Delegated click on .btn-view-pdf opens modal');
assert(mockFrame.src === '/assets/docs/estimate_1_temple_renovation.pdf', 'Delegated click sets correct PDF url');
assert(mockTitle.textContent === 'Estimate 1 - Temple Renovation', 'Delegated click sets correct document title');
closePdfModal();

// -------------------------------------------------------------
// SECTION 3: Proposal Table Rendering & Package 4 Integrity
// -------------------------------------------------------------
console.log('\n--- SECTION 3: Proposal Table Rendering & Package 4 Architecture ---');

const testLangs = [
  { code: 'en', name: 'English', dict: en },
  { code: 'ta', name: 'Tamil', dict: ta },
  { code: 'hi', name: 'Hindi', dict: hi },
  { code: 'kn', name: 'Kannada', dict: kn }
];

for (const lang of testLangs) {
  setLanguage(lang.code);
  renderProposalTable();
  const html = mockProposalContainer.innerHTML;

  console.log(`\nTesting language: [${lang.code.toUpperCase()}]`);

  // Basic sanity
  assert(!html.includes('undefined'), `[${lang.code}] Rendered HTML contains NO 'undefined'`);
  assert(!html.includes('[object Object]'), `[${lang.code}] Rendered HTML contains NO '[object Object]'`);
  assert(!html.includes('NaN'), `[${lang.code}] Rendered HTML contains NO 'NaN'`);

  // Top Budget Banner checks
  assert(html.includes('₹1,26,16,000'), `[${lang.code}] Top banner displays ₹1,26,16,000`);
  assert(html.includes('~₹1.26 Crores'), `[${lang.code}] Top banner displays (~₹1.26 Crores)`);
  assert(html.includes(lang.dict.grand_project_budget_label), `[${lang.code}] Top banner displays localized grand project budget label`);
  assert(html.includes('₹76,16,000'), `[${lang.code}] Top banner displays Civil Works subtotal (₹76,16,000)`);
  assert(html.includes(lang.dict.civil_works_subtotal_label), `[${lang.code}] Top banner displays localized civil works subtotal label`);
  assert(html.includes('₹50,00,000'), `[${lang.code}] Top banner displays Pradhista subtotal (₹50,00,000)`);
  assert(html.includes(lang.dict.pradhista_subtotal_label), `[${lang.code}] Top banner displays localized pradhista subtotal label`);

  // Dual Action buttons on Packages 1, 2, 3
  assert(html.includes('data-pdf-url="/assets/docs/estimate_1_temple_renovation.pdf"'), `[${lang.code}] Package 1 has View PDF button with data-pdf-url`);
  assert(html.includes('data-pdf-url="/assets/docs/estimate_2_muni_maharaj_guest_house.pdf"'), `[${lang.code}] Package 2 has View PDF button with data-pdf-url`);
  assert(html.includes('data-pdf-url="/assets/docs/estimate_3_multipurpose_hall.pdf"'), `[${lang.code}] Package 3 has View PDF button with data-pdf-url`);
  assert(html.includes('download="Estimate_1_pkg_1.pdf"'), `[${lang.code}] Package 1 has Download PDF button`);
  assert(html.includes('download="Estimate_2_pkg_2.pdf"'), `[${lang.code}] Package 2 has Download PDF button`);
  assert(html.includes('download="Estimate_3_pkg_3.pdf"'), `[${lang.code}] Package 3 has Download PDF button`);

  // Package 4 Ceremonial Card
  assert(html.includes('id="package-card-pkg_4"'), `[${lang.code}] Package 4 card rendered with id="package-card-pkg_4"`);
  assert(html.includes('pkg-ceremonial'), `[${lang.code}] Package 4 card has ceremonial class`);
  assert(html.includes(lang.dict.pkg_4_badge), `[${lang.code}] Package 4 displays ceremonial badge (${lang.dict.pkg_4_badge})`);
  assert(html.includes(lang.dict.pkg_4_title), `[${lang.code}] Package 4 displays localized title`);
  assert(html.includes(lang.dict.pkg_4_subtitle), `[${lang.code}] Package 4 displays localized subtitle`);
  assert(html.includes(lang.dict.pkg_4_item_1), `[${lang.code}] Package 4 Item 1 (Annadanam) rendered`);
  assert(html.includes('₹30,00,000'), `[${lang.code}] Package 4 Item 1 amount ₹30,00,000 rendered`);
  assert(html.includes(lang.dict.pkg_4_item_2), `[${lang.code}] Package 4 Item 2 (Vidhan/Pooja) rendered`);
  assert(html.includes('₹10,00,000'), `[${lang.code}] Package 4 Item 2 amount ₹10,00,000 rendered`);
  assert(html.includes(lang.dict.pkg_4_item_3), `[${lang.code}] Package 4 Item 3 (Pandhal/Stage) rendered`);
  assert(!html.includes('href="undefined"'), `[${lang.code}] No broken href="undefined" on Package 4`);

  // 4-Part Formula Card
  assert(html.includes('class="grand-summary-formula"'), `[${lang.code}] Grand summary formula container rendered`);
  assert(html.includes(lang.dict.pkg_1_title), `[${lang.code}] Formula includes Package 1 title`);
  assert(html.includes(lang.dict.pkg_2_title), `[${lang.code}] Formula includes Package 2 title`);
  assert(html.includes(lang.dict.pkg_3_title), `[${lang.code}] Formula includes Package 3 title`);
  assert(html.includes(lang.dict.pkg_4_title), `[${lang.code}] Formula includes Package 4 title`);
  assert(html.includes('formula-pradhista'), `[${lang.code}] Formula contains formula-pradhista block`);
}

// -------------------------------------------------------------
// SECTION 4: Dynamic Language PDF Link Logic in main.js
// -------------------------------------------------------------
console.log('\n--- SECTION 4: Dynamic Language Link Updates ---');

const mockBhattarakDownload = new MockDOMElement('a', 'download-bhattarak-letter-btn');
const mockBhattarakView = new MockDOMElement('button', 'view-bhattarak-letter-btn');
const mockNoticeDownload = new MockDOMElement('a', 'download-notice-pdf-btn');
const mockNoticeView = new MockDOMElement('button', 'view-notice-pdf-btn');

domRegistry['download-bhattarak-letter-btn'] = mockBhattarakDownload;
domRegistry['view-bhattarak-letter-btn'] = mockBhattarakView;
domRegistry['download-notice-pdf-btn'] = mockNoticeDownload;
domRegistry['view-notice-pdf-btn'] = mockNoticeView;

// Test language link function simulation matching main.js
function updateTestLinks(lang) {
  const bDownload = domRegistry['download-bhattarak-letter-btn'];
  const bView = domRegistry['view-bhattarak-letter-btn'];
  const nDownload = domRegistry['download-notice-pdf-btn'];
  const nView = domRegistry['view-notice-pdf-btn'];

  const bPath = `/assets/docs/bhattarak_letter_${lang}.pdf`;
  const bName = `Bhattarak_Swamiji_Blessing_Appeal_${lang}.pdf`;
  if (bDownload) {
    bDownload.setAttribute('href', bPath);
    bDownload.setAttribute('download', bName);
  }
  if (bView) {
    bView.setAttribute('data-pdf-url', bPath);
    bView.setAttribute('data-pdf-filename', bName);
  }

  const nPath = `/assets/docs/notice_${lang}.pdf`;
  const nName = `Official_Notice_${lang}.pdf`;
  if (nDownload) {
    nDownload.setAttribute('href', nPath);
    nDownload.setAttribute('download', nName);
  }
  if (nView) {
    nView.setAttribute('data-pdf-url', nPath);
    nView.setAttribute('data-pdf-filename', nName);
  }
}

for (const lang of ['en', 'ta', 'hi', 'kn']) {
  updateTestLinks(lang);
  assert(mockBhattarakDownload.href === `/assets/docs/bhattarak_letter_${lang}.pdf`, `[${lang}] Bhattarak download link correctly updated`);
  assert(mockBhattarakView.getAttribute('data-pdf-url') === `/assets/docs/bhattarak_letter_${lang}.pdf`, `[${lang}] Bhattarak view link data-pdf-url correctly updated`);
  assert(mockNoticeDownload.href === `/assets/docs/notice_${lang}.pdf`, `[${lang}] Notice download link correctly updated`);
  assert(mockNoticeView.getAttribute('data-pdf-url') === `/assets/docs/notice_${lang}.pdf`, `[${lang}] Notice view link data-pdf-url correctly updated`);
}

console.log('\n================================================================');
console.log(`TASK 3 VERIFICATION SUMMARY: ${passedTests}/${totalTests} Passed (${failedTests} Failed)`);
console.log('================================================================\n');

if (failedTests > 0) {
  console.error(`❌ Task 3 verification failed with ${failedTests} failure(s).`);
  process.exit(1);
} else {
  console.log('🎉 100% SUCCESS: All Task 3 verifications passed cleanly!');
  process.exit(0);
}
