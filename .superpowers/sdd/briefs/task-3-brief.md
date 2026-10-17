# Task 3: Data Architecture & 4-Language Localization

**Files:**
- Modify: `src/js/data/proposalData.js`
- Modify: `src/js/data/en.js`
- Modify: `src/js/data/ta.js`
- Modify: `src/js/data/hi.js`
- Modify: `src/js/data/kn.js`

**Interfaces:**
- Consumes: Certified figures from Er. K. Sundararajan (Total: ₹76,16,000)
- Produces: Localized translation maps for new sections (80G/12A, Trust details, Bhattarak letter, 3-package estimates, works progress gallery).

- [ ] **Step 1: Update `src/js/data/proposalData.js` with revised estimates**

Update structure to contain:
- `grandTotal: 7616000`
- `formattedGrandTotal: "₹76,16,000"`
- `packages: [ { id: "pkg_1", titleKey: "pkg_1_title", total: 3160000, formattedTotal: "₹31,60,000", pdf: "/assets/docs/estimate_1_temple_renovation.pdf", items: [...] }, ... ]` for Package 1 (Existing Temple Renovation), Package 2 (Muni Maharaj Guest House Building - ₹18,61,000), Package 3 (Multipurpose Hall Building - ₹25,95,000).

- [ ] **Step 2: Update `en.js`, `ta.js`, `hi.js`, `kn.js`**

Add translation keys:
- `tax_exemption_title`, `tax_80g_benefit_banner`, `trust_reg_details`, `pan_label`, `urn_80g_label`, `urn_12a_label`, `btn_download_80g`, `btn_download_12a`, `btn_download_trust_deed`
- `bhattarak_blessing_title`, `bhattarak_name`, `bhattarak_summary`, `btn_download_bhattarak_letter`
- `revised_estimate_title`, `revised_estimate_subtitle`, `engineer_certified_badge`
- `pkg_1_title`, `pkg_2_title`, `pkg_3_title`, and item descriptions
- `progress_title`, `progress_subtitle`, `tab_all_works`, `tab_bhoomi_pooja`, `tab_borewell`, `tab_ground_levelling`
- Updated notice text reflecting the registered trust name and 10 works.

- [ ] **Step 3: Verify no missing keys in any language**

Write and run `node ./scripts/verify_i18n.mjs` checking keys symmetry between `en.js`, `ta.js`, `hi.js`, and `kn.js`.

- [ ] **Step 4: Commit**

```bash
git add src/js/data/
git commit -m "feat: update proposal data with certified ₹76.16L estimates and 4-language i18n keys"
```

---
