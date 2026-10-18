# Task 5 Brief: Master Verification, Responsive Audit & Production Build

## Objective
Implement an end-to-end master verification test script `scripts/verify_donation_redesign.mjs` for the new Donation Modal Redesign, wire it into `scripts/verify_all.mjs`, run all verification suites and production build, ensure 100% test pass with zero regressions, and prepare the branch for whole-branch review and merge.

## Key Deliverables

1. **`scripts/verify_donation_redesign.mjs`**:
   - Verify 4-language i18n keys for the donation redesign (193/193 keys per language in `src/js/data/`).
   - Verify In-Page `#donate-section` (`.donation-card`, badges, action buttons, quick credentials strip).
   - Verify Mobile Floating Action Pill (`#mobile-donate-fab`, `.fab-icon`, `.fab-text`, desktop hidden rule `@media (min-width: 769px)`).
   - Verify Dedicated Donation Modal (`#donation-modal`, `.donation-modal-content`, `#close-donation-modal`, `.modal-tabs`, Tab 1 `#tab-content-upi`, Tab 2 `#tab-content-bank`).
   - Verify Tab 1 UPI & QR components (`.unified-amount-grid`, 5 preset chips, `.custom-amount-pill`, `#custom-amount-input`, `.modal-vpa-pill`, `.modal-qr-card`, `#pay-upi-btn`, `#download-qr-btn`).
   - Verify Tab 2 Direct Bank Transfer components (`.modal-bank-box`, `.bank-credential-rows`, `.bank-row`, copy buttons).
   - Verify interactive behavior simulation with jsdom:
     - Default amount ₹11,000 (Stone Plaque Tier).
     - Preset chip clicking updates active state, pay link href, and QR code URL.
     - Custom amount input updates pay link href and QR code URL.
     - Triggers (`#hero-donate-btn`, `#mobile-donate-fab`, `#open-donate-modal-btn`, `#open-bank-modal-btn`) properly open the modal with the specified initial tab.
     - Close button, backdrop click, and Escape key properly dismiss the modal.
     - Copy buttons invoke toast notification.

2. **Integration into `scripts/verify_all.mjs`**:
   - Add `verify_donation_redesign.mjs` to the sub-suites executed by `scripts/verify_all.mjs`.
   - Ensure `npm run test:all` runs all suites cleanly.

3. **Production Build & Verification**:
   - Run `npm run test:all`.
   - Run `npm run build`.

## Verification Criteria
- All tests in `scripts/verify_donation_redesign.mjs` pass.
- `npm run test:all` completes with 100% pass across all suites.
- `npm run build` succeeds with 0 errors.

## Git Commit
Commit message:
`test(donation): add end-to-end verification script for donation modal redesign`
