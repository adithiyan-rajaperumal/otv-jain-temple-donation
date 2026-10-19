/**
 * Master End-to-End Verification Suite for Donation Modal Redesign
 * 
 * Verifies:
 * 1. 4-Language i18n keys for donation redesign (193/193 keys per language in src/js/data/)
 * 2. In-page #donate-section (.donation-card, badges, action buttons, quick credentials strip)
 * 3. Mobile Floating Action Pill (#mobile-donate-fab, .fab-icon, .fab-text, @media min-width: 769px)
 * 4. Dedicated Donation Modal (#donation-modal, .donation-modal-content, #close-donation-modal, .modal-tabs, tabs)
 * 5. Tab 1 UPI & QR components (.unified-amount-grid, 5 chips, .custom-amount-pill, #custom-amount-input, .modal-vpa-pill, .modal-qr-card, #pay-upi-btn, #download-qr-btn)
 * 6. Tab 2 Direct Bank Transfer components (.modal-bank-box, .bank-credential-rows, .bank-row, copy buttons)
 * 7. Interactive behavior simulation:
 *    - Default amount ₹11,000 (Stone Plaque Tier)
 *    - Preset chip clicking updates active state, pay link href, and QR code URL
 *    - Custom amount input updates pay link href and QR code URL
 *    - Triggers (#hero-donate-btn, #mobile-donate-fab, #open-donate-modal-btn, #open-bank-modal-btn) open modal with initial tab
 *    - Close button, backdrop click, and Escape key dismiss modal
 *    - Copy buttons invoke toast notification
 */

import fs from 'fs';
import path from 'path';
import { en } from '../src/js/data/en.js';
import { ta } from '../src/js/data/ta.js';
import { hi } from '../src/js/data/hi.js';
import { kn } from '../src/js/data/kn.js';

const root = path.resolve('.');
const indexHtmlPath = path.join(root, 'index.html');
const mainCssPath = path.join(root, 'src/css/main.css');
const upiJsPath = path.join(root, 'src/js/upi.js');
const mainJsPath = path.join(root, 'src/js/main.js');

const rawIndexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
const rawMainCss = fs.readFileSync(mainCssPath, 'utf-8');
const rawUpiJs = fs.readFileSync(upiJsPath, 'utf-8');
const rawMainJs = fs.readFileSync(mainJsPath, 'utf-8');

const indexHtml = rawIndexHtml.replace(/\r\n/g, '\n');
const mainCss = rawMainCss.replace(/\r\n/g, '\n');
const upiJs = rawUpiJs.replace(/\r\n/g, '\n');
const mainJs = rawMainJs.replace(/\r\n/g, '\n');

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
console.log('  Master Verification: Donation Modal Redesign End-to-End Suite');
console.log('================================================================\n');

// -------------------------------------------------------------
// SECTION 1: 4-Language i18n Keys Verification (193/193 keys)
// -------------------------------------------------------------
console.log('--- SECTION 1: 4-Language i18n Symmetry & Donation Redesign Keys ---');

const langs = [
  { code: 'en', name: 'English', data: en },
  { code: 'ta', name: 'Tamil', data: ta },
  { code: 'hi', name: 'Hindi', data: hi },
  { code: 'kn', name: 'Kannada', data: kn }
];

const baseKeys = Object.keys(en);
assert(baseKeys.length >= 193, `Base language (EN) has comprehensive keys (${baseKeys.length} >= 193)`);

for (const lang of langs) {
  const keys = Object.keys(lang.data);
  assert(keys.length === baseKeys.length, `[${lang.code.toUpperCase()}] Key count matches base EN (${keys.length}/${baseKeys.length})`);

  const missing = baseKeys.filter(k => !keys.includes(k));
  assert(missing.length === 0, `[${lang.code.toUpperCase()}] 0 missing keys from base`);

  const extra = keys.filter(k => !baseKeys.includes(k));
  assert(extra.length === 0, `[${lang.code.toUpperCase()}] 0 extra keys not in base`);

  let emptyCount = 0;
  for (const k of keys) {
    const val = lang.data[k];
    if (val === undefined || val === null || (typeof val === 'string' && val.trim() === '')) {
      emptyCount++;
    }
  }
  assert(emptyCount === 0, `[${lang.code.toUpperCase()}] 0 empty or undefined translation keys`);
}

// Check critical donation modal redesign keys across all 4 languages
const redesignKeys = [
  'modal_donation_title',
  'tab_upi_qr',
  'tab_bank_transfer',
  'btn_open_donation_portal',
  'btn_open_bank_portal',
  'donation_card_subtitle',
  'fab_donate',
  'scan_qr_instantly_hint',
  'select_amount_label',
  'custom_amount_placeholder',
  'btn_pay_upi_app',
  'btn_download_qr',
  'qr_modal_tip',
  'bank_details_heading',
  'acc_name_label',
  'acc_no_label',
  'bank_name_label',
  'ifsc_label',
  'vpa_label',
  'btn_copy_vpa',
  'btn_copy',
  'plaque_tier'
];

for (const key of redesignKeys) {
  const inAll = langs.every(l => typeof l.data[key] === 'string' && l.data[key].trim().length > 0);
  assert(inAll, `Redesign key '${key}' is non-empty across all 4 languages`);
}

// -------------------------------------------------------------
// SECTION 2: In-Page #donate-section Verification
// -------------------------------------------------------------
console.log('\n--- SECTION 2: In-Page Sacred Contribution Card (#donate-section) ---');

assert(indexHtml.includes('id="donate-section"'), 'index.html contains #donate-section');
assert(indexHtml.includes('class="card donation-card"') || indexHtml.includes('class="donation-card'), 'index.html styles #donate-section with .donation-card');
assert(indexHtml.includes('data-i18n="donation_title"'), '#donate-section contains data-i18n="donation_title"');
assert(indexHtml.includes('data-i18n="donation_card_subtitle"'), '#donate-section contains data-i18n="donation_card_subtitle"');

// Badges
assert(indexHtml.includes('class="donation-card-badges"'), '#donate-section contains .donation-card-badges');
assert(indexHtml.includes('80G 50% Tax Exemption'), '#donate-section contains 80G Tax Exemption badge');
assert(indexHtml.includes('Stone Plaque Tier'), '#donate-section contains Stone Plaque Tier badge');

// Action buttons
assert(indexHtml.includes('id="open-donate-modal-btn"'), '#donate-section contains #open-donate-modal-btn');
assert(indexHtml.includes('data-i18n="btn_open_donation_portal"'), '#open-donate-modal-btn uses data-i18n="btn_open_donation_portal"');
assert(indexHtml.includes('id="open-bank-modal-btn"'), '#donate-section contains #open-bank-modal-btn');
assert(indexHtml.includes('data-i18n="btn_open_bank_portal"'), '#open-bank-modal-btn uses data-i18n="btn_open_bank_portal"');

// Quick credentials strip
assert(indexHtml.includes('class="quick-credentials-strip"'), '#donate-section contains .quick-credentials-strip');
assert(indexHtml.includes('class="credential-pill"'), '#donate-section contains .credential-pill');
assert(indexHtml.includes('id="copy-vpa-btn"'), '#donate-section contains #copy-vpa-btn');
assert(indexHtml.includes('id="copy-acc-btn"'), '#donate-section contains #copy-acc-btn');
assert(indexHtml.includes('id="copy-ifsc-btn"'), '#donate-section contains #copy-ifsc-btn');
assert(indexHtml.includes('f051m01588@indianbk'), '#donate-section contains UPI VPA f051m01588@indianbk');
assert(indexHtml.includes('8350857706'), '#donate-section contains Bank Account 8350857706');
assert(indexHtml.includes('IDIB000D074'), '#donate-section contains Bank IFSC IDIB000D074');

// CSS rules for In-page section
assert(mainCss.includes('.donation-card'), 'main.css styles .donation-card');
assert(mainCss.includes('.donation-card-subtext'), 'main.css styles .donation-card-subtext');
assert(mainCss.includes('.donation-card-badges'), 'main.css styles .donation-card-badges');
assert(mainCss.includes('.donation-portal-actions'), 'main.css styles .donation-portal-actions');
assert(mainCss.includes('.quick-credentials-strip'), 'main.css styles .quick-credentials-strip');
assert(mainCss.includes('.credential-pill'), 'main.css styles .credential-pill');
assert(mainCss.includes('.btn-copy-chip'), 'main.css styles .btn-copy-chip');

// -------------------------------------------------------------
// SECTION 3: Mobile Floating Action Pill (#mobile-donate-fab)
// -------------------------------------------------------------
console.log('\n--- SECTION 3: Mobile Floating Action Pill (#mobile-donate-fab) ---');

assert(indexHtml.includes('id="mobile-donate-fab"'), 'index.html contains #mobile-donate-fab');
assert(indexHtml.includes('class="mobile-donate-fab no-print"'), '#mobile-donate-fab has class mobile-donate-fab no-print');
assert(indexHtml.includes('class="fab-icon"'), '#mobile-donate-fab contains .fab-icon');
assert(indexHtml.includes('class="fab-text"'), '#mobile-donate-fab contains .fab-text');
assert(indexHtml.includes('data-i18n="fab_donate"'), '#mobile-donate-fab contains data-i18n="fab_donate"');

// CSS rules for Mobile FAB
assert(mainCss.includes('.mobile-donate-fab'), 'main.css styles .mobile-donate-fab');
assert(mainCss.includes('border-radius: 30px') || mainCss.includes('border-radius:30px'), '.mobile-donate-fab has 30px border radius');
assert(mainCss.includes('min-height: 48px'), '.mobile-donate-fab has min-height: 48px');
assert(mainCss.includes('min-width: 140px'), '.mobile-donate-fab has min-width: 140px');

// Desktop hidden media query (@media (min-width: 769px))
const desktopFabQuery = mainCss.includes('@media (min-width: 769px)') &&
  (mainCss.includes('.mobile-donate-fab { display: none !important; }') ||
   mainCss.includes('.mobile-donate-fab {\n    display: none !important;'));
assert(desktopFabQuery, 'main.css hides .mobile-donate-fab on desktop screens (@media min-width: 769px)');

// -------------------------------------------------------------
// SECTION 4: Dedicated Donation Modal (#donation-modal)
// -------------------------------------------------------------
console.log('\n--- SECTION 4: Dedicated Donation Modal (#donation-modal) ---');

assert(indexHtml.includes('id="donation-modal"'), 'index.html contains #donation-modal');
assert(indexHtml.includes('class="modal-content donation-modal-content"'), 'index.html contains .donation-modal-content');
assert(indexHtml.includes('id="close-donation-modal"'), 'index.html contains #close-donation-modal');
assert(indexHtml.includes('class="modal-tabs"'), 'index.html contains .modal-tabs');
assert(indexHtml.includes('id="donation-modal-title"'), 'index.html contains #donation-modal-title');
assert(indexHtml.includes('data-i18n="modal_donation_title"'), '#donation-modal-title uses data-i18n="modal_donation_title"');

// Modal tab buttons
assert(indexHtml.includes('data-tab="upi"'), 'index.html has tab button for UPI (data-tab="upi")');
assert(indexHtml.includes('data-tab="bank"'), 'index.html has tab button for Bank (data-tab="bank")');
assert(indexHtml.includes('id="tab-content-upi"'), 'index.html contains #tab-content-upi');
assert(indexHtml.includes('id="tab-content-bank"'), 'index.html contains #tab-content-bank');

// Modal CSS styling
assert(mainCss.includes('#donation-modal'), 'main.css styles #donation-modal');
assert(mainCss.includes('.donation-modal-content'), 'main.css styles .donation-modal-content');
assert(mainCss.includes('max-width: 820px'), '.donation-modal-content has max-width: 820px');
assert(mainCss.includes('border-radius: 18px'), '.donation-modal-content has border-radius: 18px');
assert(mainCss.includes('backdrop-filter: blur(6px)'), '#donation-modal has backdrop-filter: blur(6px)');
assert(mainCss.includes('.modal-tabs'), 'main.css styles .modal-tabs');
assert(mainCss.includes('.modal-tab-btn'), 'main.css styles .modal-tab-btn');
assert(mainCss.includes('.tab-pane'), 'main.css styles .tab-pane');

// -------------------------------------------------------------
// SECTION 5: Tab 1 UPI & QR Components
// -------------------------------------------------------------
console.log('\n--- SECTION 5: Tab 1 UPI & QR Components ---');

assert(indexHtml.includes('class="unified-amount-grid"'), 'index.html contains .unified-amount-grid');

const expectedAmounts = ['1008', '5000', '11000', '25000', '50000'];
expectedAmounts.forEach(amt => {
  assert(indexHtml.includes(`data-amount="${amt}"`), `index.html contains preset amount chip for ₹${amt}`);
});

// Stone Plaque tier active by default
assert(indexHtml.includes('data-amount="11000"') && indexHtml.includes('class="chip active" data-amount="11000"'), '₹11,000 chip is marked active by default');
assert(indexHtml.includes('data-i18n="plaque_tier"'), '₹11,000 chip includes Stone Plaque Tier label');

assert(indexHtml.includes('class="custom-amount-pill"'), 'index.html contains .custom-amount-pill');
assert(indexHtml.includes('id="custom-amount-input"'), 'index.html contains #custom-amount-input');
assert(indexHtml.includes('class="modal-vpa-pill"'), 'index.html contains .modal-vpa-pill');
assert(indexHtml.includes('id="modal-copy-vpa-btn"'), 'index.html contains #modal-copy-vpa-btn');
assert(indexHtml.includes('class="modal-qr-card"'), 'index.html contains .modal-qr-card');
assert(indexHtml.includes('class="modal-qr-image qr-modal-img"'), 'index.html contains modal QR image');
assert(indexHtml.includes('id="pay-upi-btn"'), 'index.html contains #pay-upi-btn');
assert(indexHtml.includes('id="download-qr-btn"'), 'index.html contains #download-qr-btn');

// CSS rules for Tab 1
assert(mainCss.includes('.modal-upi-layout'), 'main.css styles .modal-upi-layout');
assert(mainCss.includes('grid-template-columns: 1.15fr 0.85fr'), '.modal-upi-layout uses 1.15fr 0.85fr desktop 2-column layout');
assert(mainCss.includes('.unified-amount-grid'), 'main.css styles .unified-amount-grid');
assert(mainCss.includes('grid-template-columns: repeat(3, 1fr)'), '.unified-amount-grid has 3 columns');
assert(mainCss.includes('.custom-amount-pill'), 'main.css styles .custom-amount-pill');
assert(mainCss.includes('.modal-vpa-pill'), 'main.css styles .modal-vpa-pill');
assert(mainCss.includes('.modal-qr-card'), 'main.css styles .modal-qr-card');
assert(mainCss.includes('.modal-qr-image'), 'main.css styles .modal-qr-image');
assert(mainCss.includes('max-width: 200px'), '.modal-qr-image has max-width: 200px');

// -------------------------------------------------------------
// SECTION 6: Tab 2 Direct Bank Transfer Components
// -------------------------------------------------------------
console.log('\n--- SECTION 6: Tab 2 Direct Bank Transfer Components ---');

assert(indexHtml.includes('class="bank-details-box modal-bank-box"') || indexHtml.includes('class="modal-bank-box'), 'index.html contains .modal-bank-box');
assert(indexHtml.includes('class="bank-credential-rows"'), 'index.html contains .bank-credential-rows');
assert(indexHtml.includes('class="bank-row"'), 'index.html contains .bank-row');
assert(indexHtml.includes('id="copy-acc-btn-modal"'), 'index.html contains #copy-acc-btn-modal');
assert(indexHtml.includes('id="copy-ifsc-btn-modal"'), 'index.html contains #copy-ifsc-btn-modal');

// Bank details text
assert(indexHtml.includes('1008 SHRI VIRSHABANATH BHAGWAN JAIN TEMPLE TRUST, OTHALAVADI'), 'Tab 2 contains Trust account name');
assert(indexHtml.includes('8350857706'), 'Tab 2 contains Account No 8350857706');
assert(indexHtml.includes('Indian Bank (Devikapuram Branch - Code 02322)'), 'Tab 2 contains Bank name');
assert(indexHtml.includes('IDIB000D074'), 'Tab 2 contains IFSC Code IDIB000D074');

// CSS rules for Tab 2
assert(mainCss.includes('.modal-bank-box'), 'main.css styles .modal-bank-box');
assert(mainCss.includes('.bank-credential-rows'), 'main.css styles .bank-credential-rows');
assert(mainCss.includes('.bank-row'), 'main.css styles .bank-row');
assert(mainCss.includes('.bank-row-label'), 'main.css styles .bank-row-label');
assert(mainCss.includes('.bank-row-value'), 'main.css styles .bank-row-value');
assert(mainCss.includes('.bank-val-with-copy'), 'main.css styles .bank-val-with-copy');

// -------------------------------------------------------------
// SECTION 7: Interactive Behavior Simulation (DOM Emulation)
// -------------------------------------------------------------
console.log('\n--- SECTION 7: Interactive Behavior Simulation ---');

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
    this.children = [];
    this.value = '';
    this.src = '';
    this.href = '';
    this.textContent = '';
  }

  getAttribute(attr) {
    return this.attributes[attr] || this[attr] || null;
  }

  setAttribute(attr, val) {
    this.attributes[attr] = String(val);
    if (attr === 'href') this.href = String(val);
    if (attr === 'src') this.src = String(val);
  }

  removeAttribute(attr) {
    delete this.attributes[attr];
  }

  contains(node) {
    if (node === this) return true;
    return this.children.some(child => child === node || (child.contains && child.contains(node)));
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
    if (global.document) global.document.activeElement = this;
  }

  select() {
    this.isSelected = true;
  }

  appendChild(child) {
    this.children.push(child);
    return child;
  }

  removeChild(child) {
    this.children = this.children.filter(c => c !== child);
    return child;
  }

  remove() {
    if (this.parent) {
      this.parent.removeChild(this);
    }
  }

  querySelector(selector) {
    if (selector === '.modal-content') return mockModalContent;
    return null;
  }
}

// Build DOM Mock Map
const elementMap = {};
function createMockEl(id, className = '') {
  const el = new MockElement(id, className);
  elementMap[id] = el;
  return el;
}

const mockModal = createMockEl('donation-modal', 'modal');
const mockModalContent = new MockElement('modal-content', 'modal-content');
mockModal.appendChild(mockModalContent);

const mockCloseBtn = createMockEl('close-donation-modal', 'modal-close');
const mockHeroBtn = createMockEl('hero-donate-btn', 'btn btn-gold');
const mockMobileFab = createMockEl('mobile-donate-fab', 'mobile-donate-fab');
const mockOpenDonateBtn = createMockEl('open-donate-modal-btn', 'btn btn-gold');
const mockOpenBankBtn = createMockEl('open-bank-modal-btn', 'btn btn-outline');

const mockTabUpi = new MockElement('', 'modal-tab-btn active');
mockTabUpi.setAttribute('data-tab', 'upi');
const mockTabBank = new MockElement('', 'modal-tab-btn');
mockTabBank.setAttribute('data-tab', 'bank');

const mockContentUpi = createMockEl('tab-content-upi', 'tab-pane active');
const mockContentBank = createMockEl('tab-content-bank', 'tab-pane');

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

const mockCustomInput = createMockEl('custom-amount-input');
const mockPayBtn = createMockEl('pay-upi-btn');
const mockQrImg = new MockElement('', 'modal-qr-image qr-modal-img');
const mockDownloadBtn = createMockEl('download-qr-btn');

// Copy Buttons
const mockCopyVpa = createMockEl('copy-vpa-btn');
const mockModalCopyVpa = createMockEl('modal-copy-vpa-btn');
const mockCopyAcc = createMockEl('copy-acc-btn');
const mockModalCopyAcc = createMockEl('copy-acc-btn-modal');
const mockCopyIfsc = createMockEl('copy-ifsc-btn');
const mockModalCopyIfsc = createMockEl('copy-ifsc-btn-modal');

// Toast container
const createdToasts = [];
const mockToastContainer = createMockEl('toast-container', 'toast-container');

// Document listeners
const docListeners = {};
const mockDocument = {
  activeElement: null,
  getElementById: (id) => elementMap[id] || null,
  querySelectorAll: (sel) => {
    if (sel.includes('.modal-tab-btn')) return [mockTabUpi, mockTabBank];
    if (sel.includes('.chip')) return mockChips;
    if (sel.includes('.qr-modal-img') || sel.includes('.modal-qr-image')) return [mockQrImg];
    return [];
  },
  querySelector: (sel) => {
    if (sel.includes('.qr-modal-img') || sel.includes('.modal-qr-image')) return mockQrImg;
    return null;
  },
  createElement: (tag) => {
    const el = new MockElement('', tag);
    if (tag === 'div') {
      createdToasts.push(el);
    }
    return el;
  },
  addEventListener: (event, fn) => {
    if (!docListeners[event]) docListeners[event] = [];
    docListeners[event].push(fn);
  },
  body: {
    appendChild: (child) => {
      mockToastContainer.appendChild(child);
      return child;
    },
    removeChild: (child) => {
      mockToastContainer.removeChild(child);
      return child;
    }
  },
  execCommand: () => true
};

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
  // If navigator is already defined or read-only
}

// Import upi module
const upiModule = await import('../src/js/upi.js');
upiModule.initUPI();

// 1. Initial State verification
assert(upiModule.getCurrentAmount() === '11000', 'Initial amount is ₹11,000 (Stone Plaque Tier default)');
assert(mockPayBtn.href.includes('am=11000'), 'Initial pay button link contains am=11000');
assert(mockQrImg.src.includes('quickchart.io/qr'), 'Initial QR code image points to QuickChart API');
assert(mockQrImg.src.includes('am%3D11000') || mockQrImg.src.includes('am=11000'), 'Initial QR code image encodes default amount 11000');

// 2. Preset Chip Interactions
mockChips[0].click(); // ₹1,008
assert(mockChips[0].classList.contains('active'), 'Clicking ₹1,008 chip activates it');
assert(!mockChips[2].classList.contains('active'), 'Previous ₹11,000 chip loses active state');
assert(upiModule.getCurrentAmount() === '1008', 'getCurrentAmount() returns 1008 after clicking ₹1,008 chip');
assert(mockPayBtn.href.includes('am=1008'), 'Pay button href reflects ₹1,008');
assert(mockQrImg.src.includes('am%3D1008') || mockQrImg.src.includes('am=1008'), 'QR code URL reflects ₹1,008');

mockChips[3].click(); // ₹25,000
assert(mockChips[3].classList.contains('active'), 'Clicking ₹25,000 chip activates it');
assert(upiModule.getCurrentAmount() === '25000', 'getCurrentAmount() returns 25000');
assert(mockPayBtn.href.includes('am=25000'), 'Pay button href reflects ₹25,000');

mockChips[4].click(); // ₹50,000
assert(upiModule.getCurrentAmount() === '50000', 'getCurrentAmount() returns 50000');
assert(mockPayBtn.href.includes('am=50000'), 'Pay button href reflects ₹50,000');

mockChips[1].click(); // ₹5,000
assert(upiModule.getCurrentAmount() === '5000', 'getCurrentAmount() returns 5000');
assert(mockPayBtn.href.includes('am=5000'), 'Pay button href reflects ₹5,000');

mockChips[2].click(); // ₹11,000
assert(upiModule.getCurrentAmount() === '11000', 'getCurrentAmount() returns 11000');
assert(mockPayBtn.href.includes('am=11000'), 'Pay button href reflects ₹11,000');

// 3. Custom Amount Input Interactions
mockCustomInput.value = '21000';
mockCustomInput.dispatchEvent({ type: 'input', target: mockCustomInput });
assert(!mockChips.some(c => c.classList.contains('active')), 'Typing custom amount deactivates all preset chips');
assert(upiModule.getCurrentAmount() === '21000', 'Custom input 21000 updates current amount');
assert(mockPayBtn.href.includes('am=21000'), 'Pay button href updated to custom 21000');
assert(mockQrImg.src.includes('am%3D21000') || mockQrImg.src.includes('am=21000'), 'QR code URL updated to custom 21000');

// Non-numeric sanitization
mockCustomInput.value = 'abc35000xyz';
mockCustomInput.dispatchEvent({ type: 'input', target: mockCustomInput });
assert(mockCustomInput.value === '35000', 'Custom amount input sanitizes non-numeric characters to digits only');
assert(upiModule.getCurrentAmount() === '35000', 'Current amount sanitized to 35000');
assert(mockPayBtn.href.includes('am=35000'), 'Pay button href reflects sanitized 35000');

// Clearing custom input resets to default ₹11,000
mockCustomInput.value = '';
mockCustomInput.dispatchEvent({ type: 'input', target: mockCustomInput });
assert(upiModule.getCurrentAmount() === '11000', 'Clearing custom amount input resets amount to default 11000');
assert(mockPayBtn.href.includes('am=11000'), 'Pay button href resets to default 11000');

// 4. Modal Triggers & Initial Tabs
// Trigger A: Hero Donate Button
mockHeroBtn.click();
assert(mockModal.classList.contains('active'), 'Clicking #hero-donate-btn opens modal with .active');
assert(mockTabUpi.classList.contains('active'), 'UPI tab button is active when opened via hero button');
assert(mockContentUpi.classList.contains('active'), '#tab-content-upi is active');
assert(!mockTabBank.classList.contains('active'), 'Bank tab button is inactive');
assert(!mockContentBank.classList.contains('active'), '#tab-content-bank is inactive');

// Dismissal 1: Close button
mockCloseBtn.click();
assert(!mockModal.classList.contains('active'), 'Clicking #close-donation-modal dismisses modal');

// Trigger B: Mobile FAB
mockMobileFab.click();
assert(mockModal.classList.contains('active'), 'Clicking #mobile-donate-fab opens modal');
assert(mockTabUpi.classList.contains('active'), 'UPI tab is active when opened via mobile FAB');

// Dismissal 2: Backdrop click
mockModal.click();
assert(!mockModal.classList.contains('active'), 'Clicking modal backdrop dismisses modal');

// Trigger C: In-Page Open Donate Portal Button
mockOpenDonateBtn.click();
assert(mockModal.classList.contains('active'), 'Clicking #open-donate-modal-btn opens modal');
assert(mockTabUpi.classList.contains('active'), 'UPI tab is active when opened via in-page donate button');

// Dismissal 3: Escape key
const keydownHandlers = docListeners['keydown'] || [];
assert(keydownHandlers.length > 0, 'Escape key handler is registered on document');
keydownHandlers.forEach(fn => fn({ key: 'Escape' }));
assert(!mockModal.classList.contains('active'), 'Pressing Escape dismisses modal');

// Trigger D: In-Page View Bank Transfer Details Button
mockOpenBankBtn.click();
assert(mockModal.classList.contains('active'), 'Clicking #open-bank-modal-btn opens modal');
assert(mockTabBank.classList.contains('active'), 'Bank tab button is active when opened via bank button');
assert(mockContentBank.classList.contains('active'), '#tab-content-bank is active');
assert(!mockTabUpi.classList.contains('active'), 'UPI tab button is inactive');
assert(!mockContentUpi.classList.contains('active'), '#tab-content-upi is inactive');

// Tab switching inside modal
mockTabUpi.click();
assert(mockTabUpi.classList.contains('active'), 'Switching to UPI tab activates UPI tab button');
assert(mockContentUpi.classList.contains('active'), 'Switching to UPI tab displays #tab-content-upi');
assert(!mockTabBank.classList.contains('active'), 'Bank tab button is deactivated');
assert(!mockContentBank.classList.contains('active'), '#tab-content-bank is hidden');

mockTabBank.click();
assert(mockTabBank.classList.contains('active'), 'Switching back to Bank tab activates Bank tab button');
assert(mockContentBank.classList.contains('active'), '#tab-content-bank is displayed');

// Close modal again
mockCloseBtn.click();

// 5. One-Click Copy Actions & Toast Notifications
createdToasts.length = 0; // reset toast tracking

mockCopyVpa.click();
assert(createdToasts.length >= 1, 'Clicking #copy-vpa-btn creates a toast notification');
assert(createdToasts[createdToasts.length - 1].textContent.includes('UPI ID') || createdToasts[createdToasts.length - 1].textContent.includes('f051m01588@indianbk'), 'Toast for VPA copy confirms UPI ID copied');

mockModalCopyVpa.click();
assert(createdToasts.length >= 2, 'Clicking #modal-copy-vpa-btn creates toast notification');

mockCopyAcc.click();
assert(createdToasts.length >= 3, 'Clicking #copy-acc-btn creates toast notification');
assert(createdToasts[createdToasts.length - 1].textContent.includes('Account Number') || createdToasts[createdToasts.length - 1].textContent.includes('8350857706'), 'Toast confirms Account Number copied');

mockModalCopyAcc.click();
assert(createdToasts.length >= 4, 'Clicking #copy-acc-btn-modal creates toast notification');

mockCopyIfsc.click();
assert(createdToasts.length >= 5, 'Clicking #copy-ifsc-btn creates toast notification');
assert(createdToasts[createdToasts.length - 1].textContent.includes('IFSC') || createdToasts[createdToasts.length - 1].textContent.includes('IDIB000D074'), 'Toast confirms IFSC copied');

mockModalCopyIfsc.click();
assert(createdToasts.length >= 6, 'Clicking #copy-ifsc-btn-modal creates toast notification');

// 6. QR Code Download Action
assert(mockDownloadBtn.listeners['click'] && mockDownloadBtn.listeners['click'].length > 0, 'Download QR button has click listener registered');

console.log('\n================================================================');
console.log(`Donation Redesign Verification: ${passedTests}/${totalTests} Passed (${failedTests} Failed)`);
console.log('================================================================\n');

if (failedTests > 0) {
  console.error(`❌ Verification failed with ${failedTests} failure(s).`);
  process.exit(1);
} else {
  console.log('🎉 100% SUCCESS: Donation modal redesign master verification passed cleanly!');
  process.exit(0);
}
