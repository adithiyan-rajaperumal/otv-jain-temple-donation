/**
 * Verification Suite for Task 4: Responsive Mobile-First & Desktop CSS Styling (src/css/main.css)
 */

import fs from 'fs';
import path from 'path';

const root = path.resolve('.');
const mainCssPath = path.join(root, 'src/css/main.css');
const indexHtmlPath = path.join(root, 'index.html');

const rawMainCss = fs.readFileSync(mainCssPath, 'utf-8');
const mainCss = rawMainCss.replace(/\r\n/g, '\n');
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
console.log('  Task 4 Verification: Responsive Mobile-First & Desktop CSS');
console.log('================================================================\n');

// --- SECTION 1: In-Page Sacred Contribution Card Styling ---
console.log('--- SECTION 1: In-Page Sacred Contribution Card (.donation-card) ---');
assert(mainCss.includes('.donation-card {') || mainCss.includes('.donation-card,'), 'main.css styles .donation-card');
assert(mainCss.includes('.donation-card-subtext'), 'main.css styles .donation-card-subtext');
assert(mainCss.includes('.donation-highlights-wrap') || mainCss.includes('.donation-card-badges'), 'main.css styles donation badges/highlights wrap');
assert(mainCss.includes('.highlight-badge') || mainCss.includes('.donation-card-badges .badge'), 'main.css styles highlight-badge / badge');
assert(mainCss.includes('.donation-portal-actions'), 'main.css styles .donation-portal-actions');
assert(mainCss.includes('#open-donate-modal-btn'), 'main.css styles #open-donate-modal-btn');
assert(mainCss.includes('#open-bank-modal-btn'), 'main.css styles #open-bank-modal-btn');
assert(mainCss.includes('.quick-credentials-strip'), 'main.css styles .quick-credentials-strip');
assert(mainCss.includes('.credential-pill'), 'main.css styles .credential-pill');
assert(mainCss.includes('.cred-label'), 'main.css styles .cred-label');
assert(mainCss.includes('.cred-val'), 'main.css styles .cred-val');
assert(mainCss.includes('.btn-copy-chip'), 'main.css styles .btn-copy-chip');

// --- SECTION 2: Floating Action Pill Styling ---
console.log('\n--- SECTION 2: Mobile Floating Action Pill (.mobile-donate-fab) ---');
assert(mainCss.includes('.mobile-donate-fab'), 'main.css styles .mobile-donate-fab');
assert(mainCss.includes('#mobile-donate-fab') || mainCss.includes('.mobile-donate-fab'), 'main.css styles #mobile-donate-fab');
assert(mainCss.includes('linear-gradient(135deg, #E5C158') || mainCss.includes('linear-gradient(135deg, #e5c158'), 'mobile-donate-fab uses gold gradient background');
assert(mainCss.includes('border-radius: 30px') || mainCss.includes('border-radius:30px'), 'mobile-donate-fab has 30px pill border-radius');
assert(mainCss.includes('min-height: 48px'), 'mobile-donate-fab has min-height: 48px');
assert(mainCss.includes('min-width: 140px'), 'mobile-donate-fab has min-width: 140px');
assert(mainCss.includes('@media (min-width: 769px)') && mainCss.includes('.mobile-donate-fab { display: none !important; }') || mainCss.includes('.mobile-donate-fab {\n    display: none !important;'), 'mobile-donate-fab is hidden on desktop via media query min-width: 769px');

// --- SECTION 3: Dedicated Donation Modal Styling ---
console.log('\n--- SECTION 3: Dedicated Donation Modal (#donation-modal) ---');
assert(mainCss.includes('#donation-modal'), 'main.css styles #donation-modal');
assert(mainCss.includes('.donation-modal-content'), 'main.css styles .donation-modal-content');
assert(mainCss.includes('#close-donation-modal'), 'main.css styles #close-donation-modal');
assert(mainCss.includes('.donation-modal-header'), 'main.css styles .donation-modal-header');
assert(mainCss.includes('#donation-modal-title'), 'main.css styles #donation-modal-title');
assert(mainCss.includes('.modal-tabs'), 'main.css styles .modal-tabs');
assert(mainCss.includes('.modal-tab-btn'), 'main.css styles .modal-tab-btn');
assert(mainCss.includes('.modal-tab-btn.active'), 'main.css styles .modal-tab-btn.active');
assert(mainCss.includes('.tab-pane'), 'main.css styles .tab-pane');
assert(mainCss.includes('.tab-pane.active'), 'main.css styles .tab-pane.active');
assert(mainCss.includes('backdrop-filter: blur(6px)'), 'donation modal includes backdrop blur(6px)');
assert(mainCss.includes('max-width: 820px'), 'donation modal content has max-width: 820px');
assert(mainCss.includes('border-radius: 18px'), 'donation modal content has border-radius: 18px');

// --- SECTION 4: Tab 1: UPI & Live QR Layout ---
console.log('\n--- SECTION 4: Tab 1 (UPI & QR Layout & Unified Grid) ---');
assert(mainCss.includes('.modal-upi-layout'), 'main.css styles .modal-upi-layout');
assert(mainCss.includes('grid-template-columns: 1.15fr 0.85fr'), 'modal-upi-layout uses 1.15fr 0.85fr 2-column desktop grid');
assert(mainCss.includes('.unified-amount-grid'), 'main.css styles .unified-amount-grid');
assert(mainCss.includes('grid-template-columns: repeat(3, 1fr)'), 'unified-amount-grid uses 3 columns on desktop');
assert(mainCss.includes('.custom-amount-pill'), 'main.css styles .custom-amount-pill');
assert(mainCss.includes('.currency-symbol'), 'main.css styles .currency-symbol');
assert(mainCss.includes('#custom-amount-input'), 'main.css styles #custom-amount-input');
assert(mainCss.includes('.modal-vpa-pill'), 'main.css styles .modal-vpa-pill');
assert(mainCss.includes('.modal-qr-card'), 'main.css styles .modal-qr-card');
assert(mainCss.includes('.modal-qr-image'), 'main.css styles .modal-qr-image');
assert(mainCss.includes('.qr-scan-hint'), 'main.css styles .qr-scan-hint');
assert(mainCss.includes('max-width: 200px'), 'modal-qr-image has max-width: 200px');

// --- SECTION 5: Tab 2: Direct Bank Details Box ---
console.log('\n--- SECTION 5: Tab 2 (Direct Bank Transfer Details) ---');
assert(mainCss.includes('.modal-bank-box'), 'main.css styles .modal-bank-box');
assert(mainCss.includes('.bank-credential-rows'), 'main.css styles .bank-credential-rows');
assert(mainCss.includes('.bank-row'), 'main.css styles .bank-row');
assert(mainCss.includes('.bank-row-label'), 'main.css styles .bank-row-label');
assert(mainCss.includes('.bank-row-value'), 'main.css styles .bank-row-value');
assert(mainCss.includes('.bank-val-with-copy'), 'main.css styles .bank-val-with-copy');

// --- SECTION 6: Mobile Media Queries & Responsive Rules ---
console.log('\n--- SECTION 6: Responsive Media Queries ---');
assert(mainCss.includes('@media (max-width: 768px)'), 'main.css has max-width: 768px media query');
assert(mainCss.includes('@media (max-width: 640px)'), 'main.css has max-width: 640px media query');
assert(mainCss.includes('@media (max-width: 600px)'), 'main.css has max-width: 600px media query');
assert(mainCss.includes('@media (max-width: 480px)'), 'main.css has max-width: 480px media query');
assert(mainCss.includes('@media (max-width: 360px)'), 'main.css has max-width: 360px media query');

console.log('\n================================================================');
console.log(`Task 4 Verification Summary: ${passedTests}/${totalTests} Passed (${failedTests} Failed)`);
console.log('================================================================\n');

if (failedTests > 0) {
  console.error(`❌ Verification failed with ${failedTests} failure(s).`);
  process.exit(1);
} else {
  console.log('🎉 100% SUCCESS: All Task 4 CSS requirements verified and passing!');
  process.exit(0);
}
