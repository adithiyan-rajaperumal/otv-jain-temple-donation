/**
 * Verification Suite for Task 4: Responsive CSS Styling (src/css/main.css)
 * Panchakalyana Pradhista & PDF Lightbox Viewer
 */

import fs from 'fs';
import path from 'path';

const root = path.resolve('.');
const mainCssPath = path.join(root, 'src/css/main.css');
const indexHtmlPath = path.join(root, 'index.html');
const proposalJsPath = path.join(root, 'src/js/proposal.js');

const rawMainCss = fs.readFileSync(mainCssPath, 'utf-8');
const mainCss = rawMainCss.replace(/\r\n/g, '\n');
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
const proposalJs = fs.readFileSync(proposalJsPath, 'utf-8');

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
console.log('  Task 4 Verification: Responsive CSS Styling');
console.log('  (Panchakalyana Pradhista & PDF Lightbox Viewer)');
console.log('================================================================\n');

// --- SECTION 1: In-Page PDF Lightbox Viewer (#pdf-modal) ---
console.log('--- SECTION 1: In-Page PDF Lightbox Viewer (#pdf-modal) ---');
assert(mainCss.includes('#pdf-modal {') || mainCss.includes('#pdf-modal,') || mainCss.includes('#pdf-modal\n'), 'main.css styles #pdf-modal');
assert(mainCss.includes('backdrop-filter: blur(6px)'), '#pdf-modal has backdrop blur(6px)');
assert(mainCss.includes('z-index: 1050'), '#pdf-modal has z-index: 1050');
assert(mainCss.includes('#pdf-modal.active') && mainCss.includes('display: flex'), '#pdf-modal.active displays flex overlay');

assert(mainCss.includes('.pdf-modal-content'), 'main.css styles .pdf-modal-content');
assert(mainCss.includes('max-width: 920px'), '.pdf-modal-content has max-width: 920px');
assert(mainCss.includes('height: 88vh'), '.pdf-modal-content has height: 88vh');
assert(mainCss.includes('border-radius: 14px'), '.pdf-modal-content has border-radius: 14px');
assert(mainCss.includes('border: 1.5px solid var(--border-gold)'), '.pdf-modal-content has gold border');
assert(mainCss.includes('box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35)'), '.pdf-modal-content has deep shadow');

assert(mainCss.includes('.pdf-modal-header'), 'main.css styles .pdf-modal-header');
assert(mainCss.includes('background: #FCFAF6'), '.pdf-modal-header has warm cream background');
assert(mainCss.includes('border-bottom: 1px solid #EBE4DA'), '.pdf-modal-header has bottom border');

assert(mainCss.includes('.pdf-modal-title-wrap'), 'main.css styles .pdf-modal-title-wrap');
assert(mainCss.includes('.pdf-modal-title'), 'main.css styles .pdf-modal-title');
assert(mainCss.includes('text-overflow: ellipsis') && mainCss.includes('white-space: nowrap'), '.pdf-modal-title has ellipsis truncation');

assert(mainCss.includes('.pdf-modal-controls'), 'main.css styles .pdf-modal-controls');
assert(mainCss.includes('#pdf-modal .modal-close') || mainCss.includes('#close-pdf-modal'), 'main.css styles modal close button inside controls');
assert(mainCss.includes('position: static'), 'close-pdf-modal uses position: static for flex containment');

assert(mainCss.includes('.pdf-modal-body'), 'main.css styles .pdf-modal-body');
assert(mainCss.includes('background: #323639'), '.pdf-modal-body has dark viewer background');
assert(mainCss.includes('#pdf-modal-frame'), 'main.css styles #pdf-modal-frame');
assert(mainCss.includes('width: 100%') && mainCss.includes('height: 100%'), '#pdf-modal-frame is full body dimensions');

assert(mainCss.includes('.pdf-modal-footer'), 'main.css styles .pdf-modal-footer');
assert(mainCss.includes('#pdf-modal-direct-link'), 'main.css styles #pdf-modal-direct-link');
assert(mainCss.includes('text-decoration: underline'), '#pdf-modal-direct-link has underline');

// --- SECTION 2: Package 4 Ceremonial Card & Top Budget Sub-Pills ---
console.log('\n--- SECTION 2: Package 4 Ceremonial Card & Top Budget Sub-Pills ---');
assert(mainCss.includes('.package-card.pkg-ceremonial'), 'main.css styles .package-card.pkg-ceremonial');
assert(mainCss.includes('border: 2px solid rgba(212, 175, 55, 0.5)'), '.pkg-ceremonial has 2px gold border');
assert(mainCss.includes('linear-gradient(180deg, #FFFDF9 0%, #FFF9F0 100%)'), '.pkg-ceremonial has warm gradient background');

assert(mainCss.includes('.badge-ceremonial-estimate'), 'main.css styles .badge-ceremonial-estimate');
assert(mainCss.includes('linear-gradient(135deg, #8B2613 0%, #B84728 100%)'), '.badge-ceremonial-estimate has terracotta gradient background');
assert(mainCss.includes('border-radius: 20px'), '.badge-ceremonial-estimate has 20px pill border-radius');
assert(mainCss.includes('.ceremonial-note-pill'), 'main.css styles .ceremonial-note-pill');

assert(mainCss.includes('.proposal-grand-total-banner .sub-budget-row') || mainCss.includes('.sub-budget-row'), 'main.css styles .sub-budget-row');
assert(mainCss.includes('.sub-budget-pill'), 'main.css styles .sub-budget-pill');
assert(mainCss.includes('border: 1px solid #E8DEC8'), '.sub-budget-pill has subtle gold border');
assert(mainCss.includes('.sub-budget-label'), 'main.css styles .sub-budget-label');
assert(mainCss.includes('.sub-budget-amount') || mainCss.includes('.sub-budget-val'), 'main.css styles .sub-budget-amount / .sub-budget-val');

// --- SECTION 3: Dual Document Action Buttons ---
console.log('\n--- SECTION 3: Dual Document Action Buttons ---');
assert(mainCss.includes('.doc-actions-group'), 'main.css styles .doc-actions-group');
assert(mainCss.includes('display: inline-flex') && mainCss.includes('gap: 8px'), '.doc-actions-group uses inline-flex with 8px gap');
assert(mainCss.includes('.doc-action-card'), 'main.css styles .doc-action-card');
assert(mainCss.includes('.btn-doc-view'), 'main.css styles .btn-doc-view');
assert(mainCss.includes('min-height: 40px'), '.btn-doc-view has touch-friendly min-height: 40px');
assert(mainCss.includes('border: 1.5px solid var(--primary-terracotta)'), '.btn-doc-view has terracotta border');
assert(mainCss.includes('.btn-doc-download'), 'main.css styles .btn-doc-download');

// --- SECTION 4: Responsive Breakpoints ---
console.log('\n--- SECTION 4: Responsive Media Queries (768px, 480px, 360px) ---');

// Extract @media blocks for targeted inspection
function extractMediaBlock(css, query) {
  const queryIndex = css.indexOf(query);
  if (queryIndex === -1) return '';
  const braceOpen = css.indexOf('{', queryIndex);
  if (braceOpen === -1) return '';
  
  let depth = 1;
  let idx = braceOpen + 1;
  while (idx < css.length && depth > 0) {
    if (css[idx] === '{') depth++;
    else if (css[idx] === '}') depth--;
    idx++;
  }
  return css.substring(braceOpen + 1, idx - 1);
}

// Check 768px
const media768 = extractMediaBlock(mainCss, '@media (max-width: 768px)');
assert(media768.length > 0, 'main.css contains @media (max-width: 768px) block');
assert(media768.includes('.pdf-modal-content'), '768px media query adapts .pdf-modal-content');
assert(media768.includes('width: 96%'), '768px .pdf-modal-content has width: 96%');
assert(media768.includes('height: 90vh'), '768px .pdf-modal-content has height: 90vh');
assert(media768.includes('.pdf-modal-header') && media768.includes('padding: 10px 14px'), '768px .pdf-modal-header has padding: 10px 14px');
assert(media768.includes('.sub-budget-row') && media768.includes('flex-direction: column'), '768px .sub-budget-row stacks vertically');

// Check 480px
const media480 = extractMediaBlock(mainCss, '@media (max-width: 480px)');
assert(media480.length > 0, 'main.css contains @media (max-width: 480px) block');
assert(media480.includes('.pdf-modal-content'), '480px media query adapts .pdf-modal-content');
assert(media480.includes('width: 98%'), '480px .pdf-modal-content has width: 98%');
assert(media480.includes('height: 94vh'), '480px .pdf-modal-content has height: 94vh');
assert(media480.includes('border-radius: 10px'), '480px .pdf-modal-content has border-radius: 10px');
assert(media480.includes('.pdf-modal-header') && media480.includes('padding: 8px 10px'), '480px .pdf-modal-header has padding: 8px 10px');
assert(media480.includes('.pdf-modal-title') && media480.includes('font-size: 0.88rem'), '480px .pdf-modal-title has font-size: 0.88rem');
assert(media480.includes('#pdf-modal-download-btn'), '480px media query styles #pdf-modal-download-btn');
assert(media480.includes('min-height: 36px'), '480px #pdf-modal-download-btn has min-height: 36px');
assert(media480.includes('.doc-actions-group') && media480.includes('width: 100%'), '480px .doc-actions-group is full width');
assert(media480.includes('.doc-actions-group .btn') && media480.includes('flex: 1 1 auto'), '480px doc action buttons expand to fill row');

// Check 360px
const media360 = extractMediaBlock(mainCss, '@media (max-width: 360px)');
assert(media360.length > 0, 'main.css contains @media (max-width: 360px) block');
assert(media360.includes('.pdf-modal-content') && media360.includes('height: 96vh'), '360px .pdf-modal-content has height: 96vh');
assert(media360.includes('.pdf-modal-title') && media360.includes('font-size: 0.82rem'), '360px .pdf-modal-title has font-size: 0.82rem');
assert(media360.includes('.doc-actions-group') && media360.includes('flex-direction: column'), '360px .doc-actions-group stacks buttons vertically');
assert(media360.includes('.doc-actions-group .btn') && media360.includes('width: 100%'), '360px doc action buttons take 100% width');

// --- SECTION 5: DOM & Template Markup Alignment ---
console.log('\n--- SECTION 5: DOM & Template Markup Alignment ---');
assert(indexHtml.includes('id="pdf-modal"'), 'index.html contains #pdf-modal');
assert(indexHtml.includes('class="modal-content pdf-modal-content"'), 'index.html contains .pdf-modal-content');
assert(indexHtml.includes('class="pdf-modal-header"'), 'index.html contains .pdf-modal-header');
assert(indexHtml.includes('class="pdf-modal-body"'), 'index.html contains .pdf-modal-body');
assert(indexHtml.includes('id="pdf-modal-frame"'), 'index.html contains #pdf-modal-frame');
assert(indexHtml.includes('class="pdf-modal-footer'), 'index.html contains .pdf-modal-footer');
assert(indexHtml.includes('id="pdf-modal-direct-link"'), 'index.html contains #pdf-modal-direct-link');
assert(indexHtml.includes('class="doc-action-card doc-actions-group"'), 'index.html contains doc-action-card doc-actions-group');
assert(indexHtml.includes('btn-doc-view'), 'index.html contains btn-doc-view buttons');
assert(indexHtml.includes('btn-doc-download'), 'index.html contains btn-doc-download buttons');

assert(proposalJs.includes('pkg-ceremonial'), 'proposal.js renders pkg-ceremonial class');
assert(proposalJs.includes('badge-ceremonial-estimate'), 'proposal.js renders badge-ceremonial-estimate class');
assert(proposalJs.includes('sub-budget-pill'), 'proposal.js renders sub-budget-pill class');
assert(proposalJs.includes('sub-budget-row'), 'proposal.js renders sub-budget-row class');

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
