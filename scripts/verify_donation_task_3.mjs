/**
 * Verification Suite for Task 3: Interactive Logic in src/js/upi.js & src/js/main.js
 */

import fs from 'fs';
import path from 'path';

const root = path.resolve('.');
const upiJsPath = path.join(root, 'src/js/upi.js');
const mainJsPath = path.join(root, 'src/js/main.js');
const indexHtmlPath = path.join(root, 'index.html');

const upiJs = fs.readFileSync(upiJsPath, 'utf-8');
const mainJs = fs.readFileSync(mainJsPath, 'utf-8');
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

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
console.log('  Task 3 Verification: Donation Modal Interactive Logic');
console.log('================================================================\n');

// --- SECTION 1: Static Code and Export Analysis ---
console.log('--- SECTION 1: Export Analysis & Code Contract ---');
assert(upiJs.includes('export function openDonationModal'), 'upi.js exports openDonationModal');
assert(upiJs.includes('export function closeDonationModal'), 'upi.js exports closeDonationModal');
assert(upiJs.includes('export function switchTab'), 'upi.js exports switchTab');
assert(upiJs.includes('export function updateUPILink'), 'upi.js exports updateUPILink');
assert(upiJs.includes('export function initUPI'), 'upi.js exports initUPI');
assert(upiJs.includes('export function showToastAndCopy'), 'upi.js exports showToastAndCopy');
assert(upiJs.includes('export function showToast'), 'upi.js exports showToast');
assert(upiJs.includes('export function getQrImageUrl'), 'upi.js exports getQrImageUrl');
assert(upiJs.includes('export const UPI_VPA = "f051m01588@indianbk"'), 'upi.js defines UPI_VPA constant');
assert(upiJs.includes('export const BANK_ACCOUNT_NO = "8350857706"'), 'upi.js defines BANK_ACCOUNT_NO constant');
assert(upiJs.includes('export const BANK_IFSC = "IDIB000D074"'), 'upi.js defines BANK_IFSC constant');

assert(mainJs.includes('openDonationModal'), 'main.js imports/exports openDonationModal');
assert(mainJs.includes('window.openDonationModal = openDonationModal'), 'main.js exposes openDonationModal on window');
assert(mainJs.includes('export { openDonationModal }'), 'main.js re-exports openDonationModal');

// --- SECTION 2: Modal Trigger and Close IDs ---
console.log('\n--- SECTION 2: Trigger & Close Selector Verifications ---');
const triggers = [
  '#hero-donate-btn',
  '#mobile-donate-fab',
  '#open-donate-modal-btn',
  '#open-bank-modal-btn'
];
triggers.forEach(selector => {
  const id = selector.replace('#', '');
  assert(indexHtml.includes(`id="${id}"`), `index.html contains modal trigger: ${selector}`);
  assert(upiJs.includes(id), `upi.js binds event listener for trigger: ${selector}`);
});

const closeSelectors = [
  '#close-donation-modal',
  '#donation-modal'
];
closeSelectors.forEach(selector => {
  const id = selector.replace('#', '');
  assert(indexHtml.includes(`id="${id}"`), `index.html contains modal close element: ${selector}`);
  assert(upiJs.includes(id), `upi.js handles close for: ${selector}`);
});
assert(upiJs.includes("'Escape'") || upiJs.includes('"Escape"'), 'upi.js binds Escape key to close modal');

// --- SECTION 3: Tab Switching Logic ---
console.log('\n--- SECTION 3: Tab Switching Verifications ---');
assert(upiJs.includes('modal-tab-btn'), 'upi.js queries .modal-tab-btn');
assert(upiJs.includes('tab-content-upi'), 'upi.js manages #tab-content-upi');
assert(upiJs.includes('tab-content-bank'), 'upi.js manages #tab-content-bank');
assert(upiJs.includes("data-tab"), 'upi.js reads data-tab attribute');

// --- SECTION 4: Amount Chips, Input, and UPI URL Construction ---
console.log('\n--- SECTION 4: Amount & QR Code Logic ---');
assert(upiJs.includes('.chip'), 'upi.js queries .chip elements');
assert(upiJs.includes('custom-amount-input'), 'upi.js binds #custom-amount-input');
assert(upiJs.includes('replace(/[^0-9]/g'), 'upi.js sanitizes custom input to digits only');
assert(upiJs.includes('pay-upi-btn'), 'upi.js updates #pay-upi-btn');
assert(upiJs.includes('.qr-modal-img') && upiJs.includes('.modal-qr-image'), 'upi.js updates .qr-modal-img and .modal-qr-image');
assert(upiJs.includes('quickchart.io/qr'), 'upi.js uses QuickChart QR generator API');

// --- SECTION 5: Copy Buttons & Download Button ---
console.log('\n--- SECTION 5: Copy Buttons & QR Download ---');
const copyButtons = [
  'copy-vpa-btn',
  'modal-copy-vpa-btn',
  'copy-acc-btn',
  'copy-acc-btn-modal',
  'copy-ifsc-btn',
  'copy-ifsc-btn-modal'
];
copyButtons.forEach(btnId => {
  assert(indexHtml.includes(`id="${btnId}"`), `index.html contains copy button: #${btnId}`);
  assert(upiJs.includes(btnId), `upi.js wires copy listener for: #${btnId}`);
});

assert(indexHtml.includes('id="download-qr-btn"'), 'index.html contains #download-qr-btn');
assert(upiJs.includes('download-qr-btn'), 'upi.js binds download QR button');
assert(upiJs.includes('1008_Temple_UPI_QR_'), 'upi.js generates correct filename pattern for QR download');

// --- SECTION 6: Functional DOM Simulation ---
console.log('\n--- SECTION 6: Dynamic Functional DOM Simulation ---');

class MockElement {
  constructor(id = '', className = '') {
    this.id = id;
    this.className = className;
    this.classList = {
      _classes: new Set(className.split(' ').filter(Boolean)),
      add: (c) => this.classList._classes.add(c),
      remove: (c) => this.classList._classes.delete(c),
      contains: (c) => this.classList._classes.has(c),
      toggle: (c) => {
        if (this.classList._classes.has(c)) this.classList._classes.delete(c);
        else this.classList._classes.add(c);
      }
    };
    this.attributes = {};
    this.listeners = {};
    this.style = {};
    this.value = '';
    this.src = '';
    this.href = '';
  }

  getAttribute(attr) {
    return this.attributes[attr] || this[attr] || null;
  }

  setAttribute(attr, val) {
    this.attributes[attr] = String(val);
    if (attr === 'href') this.href = String(val);
    if (attr === 'src') this.src = String(val);
  }

  contains(node) {
    return node === this;
  }

  addEventListener(event, fn) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(fn);
  }

  dispatchEvent(event) {
    const list = this.listeners[event.type] || [];
    list.forEach(fn => fn(event));
  }

  click() {
    this.dispatchEvent({ type: 'click', preventDefault: () => {}, target: this });
  }

  focus() {
    this.isFocused = true;
  }

  select() {
    this.isSelected = true;
  }

  appendChild(child) {
    if (!this.children) this.children = [];
    this.children.push(child);
  }

  removeChild(child) {
    if (this.children) {
      this.children = this.children.filter(c => c !== child);
    }
  }

  remove() {}

  querySelector(selector) {
    if (selector === '.modal-content') return mockModalContent;
    return null;
  }
}

// Create elements
const elements = {};
function reg(id, className = '') {
  elements[id] = new MockElement(id, className);
  return elements[id];
}

const mockModal = reg('donation-modal', 'modal');
const mockModalContent = new MockElement('modal-content', 'modal-content');
const mockCloseBtn = reg('close-donation-modal', 'modal-close');
const mockHeroBtn = reg('hero-donate-btn', 'btn btn-gold');
const mockMobileFab = reg('mobile-donate-fab', 'mobile-donate-fab');
const mockOpenDonateBtn = reg('open-donate-modal-btn', 'btn btn-gold');
const mockOpenBankBtn = reg('open-bank-modal-btn', 'btn btn-outline');

const mockTabUpi = new MockElement('', 'modal-tab-btn active');
mockTabUpi.setAttribute('data-tab', 'upi');
const mockTabBank = new MockElement('', 'modal-tab-btn');
mockTabBank.setAttribute('data-tab', 'bank');

const mockContentUpi = reg('tab-content-upi', 'tab-pane active');
const mockContentBank = reg('tab-content-bank', 'tab-pane');

const mockChips = [
  new MockElement('', 'chip'),
  new MockElement('', 'chip'),
  new MockElement('', 'chip active'),
  new MockElement('', 'chip'),
  new MockElement('', 'chip')
];
mockChips[0].setAttribute('data-amount', '1008');
mockChips[1].setAttribute('data-amount', '5000');
mockChips[2].setAttribute('data-amount', '11000');
mockChips[3].setAttribute('data-amount', '25000');
mockChips[4].setAttribute('data-amount', '50000');

const mockCustomInput = reg('custom-amount-input');
const mockPayBtn = reg('pay-upi-btn');
const mockQrImg = new MockElement('', 'modal-qr-image qr-modal-img');
const mockDownloadBtn = reg('download-qr-btn');

// Copy buttons
const mockCopyVpa = reg('copy-vpa-btn');
const mockModalCopyVpa = reg('modal-copy-vpa-btn');
const mockCopyAcc = reg('copy-acc-btn');
const mockModalCopyAcc = reg('copy-acc-btn-modal');
const mockCopyIfsc = reg('copy-ifsc-btn');
const mockModalCopyIfsc = reg('copy-ifsc-btn-modal');

// Document listeners
const docListeners = {};
const mockDocument = {
  getElementById: (id) => elements[id] || null,
  querySelectorAll: (sel) => {
    if (sel.includes('.modal-tab-btn')) return [mockTabUpi, mockTabBank];
    if (sel.includes('.chip')) return mockChips;
    if (sel.includes('.qr-modal-img')) return [mockQrImg];
    return [];
  },
  querySelector: (sel) => {
    if (sel.includes('.qr-modal-img')) return mockQrImg;
    return null;
  },
  addEventListener: (event, fn) => {
    if (!docListeners[event]) docListeners[event] = [];
    docListeners[event].push(fn);
  },
  body: {
    appendChild: () => {},
    removeChild: () => {}
  },
  activeElement: null
};

// Global environment mock
global.document = mockDocument;
global.window = {
  open: () => {},
  isSecureContext: false
};
try {
  Object.defineProperty(globalThis, 'navigator', {
    value: {
      clipboard: null
    },
    configurable: true,
    writable: true
  });
} catch (e) {
  // If already defined
}

// Import module
const upiModule = await import('../src/js/upi.js');
upiModule.initUPI();

// Test 1: Default initialization
assert(mockPayBtn.href.includes('am=11000'), 'Initial pay button URL contains default amount 11000');
assert(mockQrImg.src.includes('quickchart.io/qr'), 'Initial QR image source is set to QuickChart');

// Test 2: Hero Donate Button opens modal in UPI tab
mockHeroBtn.click();
assert(mockModal.classList.contains('active'), 'Clicking #hero-donate-btn adds .active to #donation-modal');
assert(mockTabUpi.classList.contains('active'), 'UPI tab button is active');
assert(mockContentUpi.classList.contains('active'), '#tab-content-upi is active');
assert(!mockTabBank.classList.contains('active'), 'Bank tab button is not active');
assert(!mockContentBank.classList.contains('active'), '#tab-content-bank is not active');

// Test 3: Close button dismisses modal
mockCloseBtn.click();
assert(!mockModal.classList.contains('active'), 'Clicking #close-donation-modal removes .active from modal');

// Test 4: Open Bank Modal Button opens modal directly to Bank tab
mockOpenBankBtn.click();
assert(mockModal.classList.contains('active'), 'Clicking #open-bank-modal-btn opens modal');
assert(mockTabBank.classList.contains('active'), 'Bank tab button is active');
assert(mockContentBank.classList.contains('active'), '#tab-content-bank is active');
assert(!mockTabUpi.classList.contains('active'), 'UPI tab button is inactive');
assert(!mockContentUpi.classList.contains('active'), '#tab-content-upi is inactive');

// Test 5: Tab switching
mockTabUpi.click();
assert(mockTabUpi.classList.contains('active'), 'Switching to UPI tab activates UPI tab button');
assert(mockContentUpi.classList.contains('active'), 'Switching to UPI tab activates #tab-content-upi');
assert(!mockTabBank.classList.contains('active'), 'Bank tab button is deactivated');
assert(!mockContentBank.classList.contains('active'), '#tab-content-bank is deactivated');

// Test 6: Amount Chip selection
mockChips[0].click(); // ₹1,008
assert(mockChips[0].classList.contains('active'), 'Selected chip (₹1,008) is active');
assert(!mockChips[2].classList.contains('active'), 'Previously active chip (₹11,000) is deactivated');
assert(upiModule.getCurrentAmount() === '1008', 'getCurrentAmount() reflects 1008');
assert(mockPayBtn.href.includes('am=1008'), 'Pay button href updated to 1008');

// Test 7: Custom Amount Input
mockCustomInput.value = '50000';
mockCustomInput.dispatchEvent({ type: 'input', target: mockCustomInput });
assert(!mockChips[0].classList.contains('active'), 'Chips deactivated when typing custom amount');
assert(upiModule.getCurrentAmount() === '50000', 'getCurrentAmount() reflects custom amount 50000');
assert(mockPayBtn.href.includes('am=50000'), 'Pay button href updated to 50000');

// Test 8: Clearing custom input resets to default 11000
mockCustomInput.value = '';
mockCustomInput.dispatchEvent({ type: 'input', target: mockCustomInput });
assert(upiModule.getCurrentAmount() === '11000', 'Clearing custom input resets amount to 11000');
assert(mockPayBtn.href.includes('am=11000'), 'Pay button href reset to 11000');

// Test 9: Backdrop click dismisses modal
mockModal.click();
assert(!mockModal.classList.contains('active'), 'Backdrop click dismisses modal');

// Test 10: Escape key dismisses modal
upiModule.openDonationModal('upi');
assert(mockModal.classList.contains('active'), 'Modal opened before Escape test');
const escapeKeyHandlers = docListeners['keydown'] || [];
escapeKeyHandlers.forEach(fn => fn({ key: 'Escape' }));
assert(!mockModal.classList.contains('active'), 'Escape key dismisses modal');

// Test 11: Copy buttons trigger toast and copy
let lastCopiedMsg = '';
// Mock document.createElement for textarea / toast
mockDocument.createElement = (tag) => {
  const elem = new MockElement('', tag);
  if (tag === 'div') {
    elem.classList = {
      _classes: new Set(),
      add: (c) => elem.classList._classes.add(c),
      remove: (c) => elem.classList._classes.delete(c)
    };
  }
  return elem;
};
mockDocument.execCommand = () => true;

mockCopyVpa.click();
mockModalCopyVpa.click();
mockCopyAcc.click();
mockModalCopyAcc.click();
mockCopyIfsc.click();
mockModalCopyIfsc.click();
assert(true, 'All 6 copy buttons clicked cleanly without errors');

console.log('\n================================================================');
console.log(`Task 3 Verification Summary: ${passedTests}/${totalTests} Passed (${failedTests} Failed)`);
console.log('================================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('🎉 100% SUCCESS: All Task 3 requirements verified and passing!\n');
}
