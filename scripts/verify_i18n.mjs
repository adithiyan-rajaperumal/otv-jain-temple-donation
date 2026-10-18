import { en } from '../src/js/data/en.js';
import { ta } from '../src/js/data/ta.js';
import { hi } from '../src/js/data/hi.js';
import { kn } from '../src/js/data/kn.js';
import { proposalData } from '../src/js/data/proposalData.js';

console.log('=== Checking 4-Language Localization & Data Architecture ===\n');

const langs = [
  { name: 'en', data: en },
  { name: 'ta', data: ta },
  { name: 'hi', data: hi },
  { name: 'kn', data: kn }
];

const enKeys = Object.keys(en);
console.log(`Base language (EN) key count: ${enKeys.length}`);

let hasErrors = false;

if (enKeys.length !== 204) {
  console.error(`❌ Expected base language (EN) key count to be 204, got ${enKeys.length}`);
  hasErrors = true;
} else {
  console.log('✓ Base language (EN) key count is 204');
}

// 1. Check Key Symmetry
for (const lang of langs) {
  const keys = Object.keys(lang.data);
  console.log(`Language [${lang.name.toUpperCase()}] key count: ${keys.length}`);

  if (keys.length !== 204) {
    console.error(`❌ Language [${lang.name.toUpperCase()}] expected 204 keys, got ${keys.length}`);
    hasErrors = true;
  }

  const missingFromLang = enKeys.filter(k => !keys.includes(k));
  const extraInLang = keys.filter(k => !enKeys.includes(k));

  if (missingFromLang.length > 0) {
    console.error(`❌ [${lang.name}] is MISSING ${missingFromLang.length} keys:`, missingFromLang);
    hasErrors = true;
  }

  if (extraInLang.length > 0) {
    console.error(`❌ [${lang.name}] has ${extraInLang.length} EXTRA keys not in EN:`, extraInLang);
    hasErrors = true;
  }

  // Check for undefined or empty string values
  for (const k of keys) {
    const val = lang.data[k];
    if (val === undefined || val === null || (typeof val === 'string' && val.trim() === '')) {
      console.error(`❌ [${lang.name}] Key '${k}' has empty or undefined value!`);
      hasErrors = true;
    }
  }
}

// 2. Check Proposal Data Structure
console.log('\n=== Checking proposalData.js Certified Estimates & Combined Budget ===');
if (proposalData.grandTotal !== 12616000) {
  console.error(`❌ Expected proposalData.grandTotal to be 12616000, got ${proposalData.grandTotal}`);
  hasErrors = true;
} else {
  console.log('✓ proposalData.grandTotal is 12616000');
}

if (proposalData.formattedGrandTotal !== '₹1,26,16,000') {
  console.error(`❌ Expected formattedGrandTotal "₹1,26,16,000", got "${proposalData.formattedGrandTotal}"`);
  hasErrors = true;
} else {
  console.log('✓ proposalData.formattedGrandTotal is "₹1,26,16,000"');
}

if (proposalData.civilSubtotal !== 7616000) {
  console.error(`❌ Expected proposalData.civilSubtotal to be 7616000, got ${proposalData.civilSubtotal}`);
  hasErrors = true;
} else {
  console.log('✓ proposalData.civilSubtotal is 7616000 (Certified Civil Works)');
}

if (proposalData.pradhistaSubtotal !== 5000000) {
  console.error(`❌ Expected proposalData.pradhistaSubtotal to be 5000000, got ${proposalData.pradhistaSubtotal}`);
  hasErrors = true;
} else {
  console.log('✓ proposalData.pradhistaSubtotal is 5000000 (Panchakalyana Pradhista 5-Day Estimate)');
}

if (!Array.isArray(proposalData.packages) || proposalData.packages.length !== 4) {
  console.error(`❌ Expected proposalData.packages to have 4 packages, got ${proposalData.packages?.length}`);
  hasErrors = true;
} else {
  console.log('✓ proposalData.packages has 4 packages (3 Civil + 1 Pradhista)');
  
  const expectedTotals = [3160000, 1861000, 2595000, 5000000];
  let sum = 0;
  proposalData.packages.forEach((pkg, idx) => {
    sum += pkg.total;
    if (pkg.total !== expectedTotals[idx]) {
      console.error(`❌ Package ${pkg.id} total mismatch: expected ${expectedTotals[idx]}, got ${pkg.total}`);
      hasErrors = true;
    } else {
      console.log(`  ✓ Package ${pkg.id} (${pkg.titleKey}): ${pkg.formattedTotal}`);
    }
  });

  // Verify Package 4 items sum
  const pkg4 = proposalData.packages.find(p => p.id === 'pkg_4');
  if (!pkg4) {
    console.error('❌ Package pkg_4 not found in proposalData.packages!');
    hasErrors = true;
  } else {
    const pkg4ItemsSum = pkg4.items.reduce((acc, item) => acc + item.amount, 0);
    if (pkg4ItemsSum !== 5000000) {
      console.error(`❌ Package 4 items sum (${pkg4ItemsSum}) does not equal 5000000!`);
      hasErrors = true;
    } else {
      console.log(`  ✓ Package 4 items sum (${pkg4ItemsSum}) matches Package 4 total (5000000)`);
    }
  }

  if (sum !== 12616000) {
    console.error(`❌ Sum of packages (${sum}) does not equal 12616000!`);
    hasErrors = true;
  } else {
    console.log(`✓ Sum of packages (${sum}) matches Grand Total (12616000)`);
  }
}

// 3. Check Critical New Keys in Base Language
const requiredKeyGroups = {
  '80G & 12A Credentials': [
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
    'btn_download_trust_deed'
  ],
  'Bhattarak Swamiji Blessing': [
    'bhattarak_blessing_title',
    'bhattarak_blessing_subtitle',
    'bhattarak_name',
    'bhattarak_title_designation',
    'bhattarak_summary',
    'btn_download_bhattarak_letter'
  ],
  'Revised Estimates': [
    'revised_estimate_title',
    'revised_estimate_subtitle',
    'engineer_certified_badge',
    'total_certified_budget',
    'pkg_1_title',
    'pkg_1_subtitle',
    'pkg_1_item_1',
    'pkg_1_item_2',
    'pkg_1_item_3',
    'pkg_1_item_4',
    'pkg_1_item_5',
    'pkg_1_item_6',
    'btn_download_pkg_1',
    'pkg_2_title',
    'pkg_2_subtitle',
    'pkg_2_item_1',
    'pkg_2_item_2',
    'pkg_2_item_3',
    'pkg_2_item_4',
    'pkg_2_item_5',
    'pkg_2_item_6',
    'pkg_2_item_7',
    'btn_download_pkg_2',
    'pkg_3_title',
    'pkg_3_subtitle',
    'pkg_3_item_1',
    'pkg_3_item_2',
    'pkg_3_item_3',
    'pkg_3_item_4',
    'pkg_3_item_5',
    'btn_download_pkg_3'
  ],
  'Progress Gallery': [
    'progress_title',
    'progress_subtitle',
    'tab_all_works',
    'tab_bhoomi_pooja',
    'tab_borewell',
    'tab_ground_levelling',
    'progress_photo_bp_1',
    'progress_photo_bp_2',
    'progress_photo_bp_3',
    'progress_photo_bp_4',
    'progress_photo_bp_5',
    'progress_photo_bp_6',
    'progress_photo_bw_1',
    'progress_photo_bw_2',
    'progress_photo_bw_3',
    'progress_photo_gl_1',
    'progress_photo_gl_2',
    'progress_photo_gl_3'
  ],
  'Notice & Works Breakdown': [
    'notice_title',
    'notice_subtitle',
    'notice_works_heading',
    'notice_work_1',
    'notice_work_2',
    'notice_work_3',
    'notice_work_4',
    'notice_work_5',
    'notice_work_6',
    'notice_work_7',
    'notice_work_8',
    'notice_work_9',
    'notice_work_10',
    'notice_trust_name',
    'notice_signoff',
    'btn_download_notice',
    'notice_body'
  ],
  'Donation Modal & FAB': [
    'modal_donation_title',
    'tab_upi_qr',
    'tab_bank_transfer',
    'btn_open_donation_portal',
    'btn_open_bank_portal',
    'donation_card_subtitle',
    'fab_donate',
    'scan_qr_instantly_hint'
  ],
  'Panchakalyana Pradhista & PDF Viewer': [
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
  ]
};

console.log('\n=== Checking Key Presence by Feature Group ===');
for (const [group, keys] of Object.entries(requiredKeyGroups)) {
  const missing = keys.filter(k => !enKeys.includes(k));
  if (missing.length > 0) {
    console.error(`❌ Group [${group}] missing keys:`, missing);
    hasErrors = true;
  } else {
    console.log(`✓ Group [${group}]: All ${keys.length} keys present across all languages.`);
  }
}

if (hasErrors) {
  console.error('\n❌ Verification FAILED with errors.');
  process.exit(1);
} else {
  console.log('\n🎉 ALL VERIFICATIONS PASSED: 100% Key Symmetry and Data Integrity!');
  process.exit(0);
}
