import fs from 'fs';
import path from 'path';

const root = path.resolve('.');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf-8');
const mainCss = fs.readFileSync(path.join(root, 'src/css/main.css'), 'utf-8');
const mainJs = fs.readFileSync(path.join(root, 'src/js/main.js'), 'utf-8');

console.log('--- Checking HTML Elements ---');
const requiredHtmlSnippets = [
  'id="tax-exemptions"',
  'class="tax-benefit-banner"',
  'data-i18n="tax_80g_benefit_banner"',
  'data-i18n="tax_80g_subtitle"',
  'data-i18n="trust_reg_details"',
  'data-i18n="trust_reg_no_label"',
  'data-i18n="trust_reg_no_val"',
  'data-i18n="trust_reg_date_label"',
  'data-i18n="trust_reg_date_val"',
  'data-i18n="trust_members_label"',
  'data-i18n="trust_members_val"',
  'data-i18n="trust_land_label"',
  'data-i18n="trust_land_val"',
  'data-i18n="pan_label"',
  'AAATZ4555B',
  'id="copy-pan-btn"',
  'data-i18n="urn_80g_label"',
  'AAATZ4555BF20261',
  'id="copy-80g-btn"',
  'data-i18n="urn_12a_label"',
  'AAATZ4555BE20261',
  'id="copy-12a-btn"',
  '/assets/docs/form_80G_provisional_approval.pdf',
  '/assets/docs/form_12A_provisional_registration.pdf',
  '/assets/docs/trust_registration_masked.pdf',
  'id="bhattarak-blessing-section"',
  'data-i18n="bhattarak_title_designation"',
  'data-i18n="bhattarak_blessing_title"',
  'data-i18n="bhattarak_blessing_subtitle"',
  'data-i18n="bhattarak_name"',
  'data-i18n="bhattarak_summary"',
  'id="download-bhattarak-letter-btn"'
];

let htmlPass = true;
for (const snippet of requiredHtmlSnippets) {
  if (html.includes(snippet)) {
    console.log(`[PASS] HTML contains: ${snippet}`);
  } else {
    console.error(`[FAIL] HTML missing: ${snippet}`);
    htmlPass = false;
  }
}

console.log('\n--- Checking CSS Rules ---');
const requiredCssSelectors = [
  '.tax-card',
  '.tax-benefit-banner',
  '.tax-banner-icon',
  '.tax-badge-wrap',
  '.tax-highlight-tag',
  '.tax-validity-tag',
  '.trust-credentials-grid',
  '.credential-card',
  '.identifier-items',
  '.identifier-item',
  '.identifier-code',
  '.copy-btn',
  '.copy-btn.btn-copied',
  '.trust-doc-downloads',
  '.btn-doc-download',
  '.blessing-card',
  '.badge-sacred',
  '.blessing-box',
  '.blessing-quote',
  '@media (max-width: 640px)'
];

let cssPass = true;
for (const selector of requiredCssSelectors) {
  if (mainCss.includes(selector)) {
    console.log(`[PASS] CSS contains: ${selector}`);
  } else {
    console.error(`[FAIL] CSS missing: ${selector}`);
    cssPass = false;
  }
}

console.log('\n--- Checking JS Implementation ---');
const requiredJsSnippets = [
  'initCredentialCopyButtons',
  'updateBhattarakDownloadLink',
  'copy-pan-btn',
  'AAATZ4555B',
  'download-bhattarak-letter-btn',
  'bhattarak_letter_',
  'languageChanged'
];

let jsPass = true;
for (const snip of requiredJsSnippets) {
  if (mainJs.includes(snip)) {
    console.log(`[PASS] JS contains: ${snip}`);
  } else {
    console.error(`[FAIL] JS missing: ${snip}`);
    jsPass = false;
  }
}

console.log('\n--- Checking Translation Key Coverage across 4 Languages ---');
import { en } from '../src/js/data/en.js';
import { ta } from '../src/js/data/ta.js';
import { hi } from '../src/js/data/hi.js';
import { kn } from '../src/js/data/kn.js';

const langs = { en, ta, hi, kn };
const i18nKeysToCheck = [
  'tax_exemption_title',
  'tax_80g_benefit_banner',
  'tax_80g_subtitle',
  'trust_reg_details',
  'trust_reg_no_label',
  'trust_reg_no_val',
  'trust_reg_date_label',
  'trust_reg_date_val',
  'trust_members_label',
  'trust_members_val',
  'trust_land_label',
  'trust_land_val',
  'pan_label',
  'pan_val',
  'urn_80g_label',
  'urn_80g_val',
  'urn_12a_label',
  'urn_12a_val',
  'tax_assessment_years_label',
  'tax_assessment_years_val',
  'btn_copy_pan',
  'pan_copied',
  'btn_download_80g',
  'btn_download_12a',
  'btn_download_trust_deed',
  'bhattarak_blessing_title',
  'bhattarak_blessing_subtitle',
  'bhattarak_name',
  'bhattarak_title_designation',
  'bhattarak_summary',
  'btn_download_bhattarak_letter'
];

let i18nPass = true;
for (const [langName, dict] of Object.entries(langs)) {
  for (const key of i18nKeysToCheck) {
    if (!dict[key]) {
      console.error(`[FAIL] Language '${langName}' missing key: ${key}`);
      i18nPass = false;
    }
  }
}
if (i18nPass) {
  console.log(`[PASS] All ${i18nKeysToCheck.length} keys present across EN, TA, HI, and KN.`);
}

console.log('\n--- Checking PDF Assets Existence in public/assets/docs ---');
const docs = [
  'form_80G_provisional_approval.pdf',
  'form_12A_provisional_registration.pdf',
  'trust_registration_masked.pdf',
  'bhattarak_letter_en.pdf',
  'bhattarak_letter_ta.pdf',
  'bhattarak_letter_hi.pdf',
  'bhattarak_letter_kn.pdf'
];

let docsPass = true;
for (const doc of docs) {
  const p = path.join(root, 'public/assets/docs', doc);
  if (fs.existsSync(p) && fs.statSync(p).size > 1000) {
    console.log(`[PASS] Doc exists & valid size: ${doc} (${fs.statSync(p).size} bytes)`);
  } else {
    console.error(`[FAIL] Missing or empty doc: ${doc}`);
    docsPass = false;
  }
}

if (htmlPass && cssPass && jsPass && i18nPass && docsPass) {
  console.log('\n✅ ALL TASK 4 VERIFICATIONS PASSED SUCCESSFULLY!');
  process.exit(0);
} else {
  console.error('\n❌ SOME VERIFICATIONS FAILED');
  process.exit(1);
}
