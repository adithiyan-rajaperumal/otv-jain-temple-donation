# Task 3 Report: Interactive Logic in `src/js/upi.js` & `src/js/main.js`

- **Status:** COMPLETED (DONE)
- **Branch:** `feat/donation-modal-redesign`
- **Commit SHA:** `d2eeb8edac88f7cec50191f13d2073624afbf78b` (`d2eeb8e`)
- **Verification Suites:**
  - Task 3 Verification Suite: `node scripts/verify_donation_task_3.mjs` (82/82 tests passed)
  - Master Verification Suite: `npm run test:all` (171/171 tests passed)
  - Production Build: `npm run build` (Clean build with zero errors)

---

## 1. Summary of Work Completed

Successfully implemented all interactive logic for the new Sacred Donation Modal, tab switching, live QR code generation, mobile FAB trigger, and one-click copy buttons in `src/js/upi.js` and `src/js/main.js`:

1. **Modal Control API (`openDonationModal` & `closeDonationModal`)**:
   - Exported `openDonationModal(initialTab = 'upi')` and `closeDonationModal()`.
   - Adds `.active` class to `#donation-modal` and sets initial active tab (`'upi'` or `'bank'`).
   - Automatically refreshes QR code and payment deep link via `updateUPILink()`.
   - Focuses `#close-donation-modal` for keyboard accessibility, preserving `lastFocusedElement` to return focus upon modal closure.

2. **Modal Triggers**:
   - `#hero-donate-btn`: Bound to `openDonationModal('upi')` (with default anchor navigation prevented).
   - `#mobile-donate-fab`: Bound to `openDonationModal('upi')`.
   - `#open-donate-modal-btn`: Bound to `openDonationModal('upi')`.
   - `#open-bank-modal-btn`: Bound to `openDonationModal('bank')`.

3. **Modal Close Handlers**:
   - Close button (`#close-donation-modal`): Removes `.active` class.
   - Backdrop click: Clicking outside `.modal-content` on `#donation-modal` dismisses the modal.
   - `Escape` key: Document-level listener dismisses `#donation-modal` whenever it is active.

4. **Tab Switching (`switchTab(tab = 'upi')`)**:
   - Manages `.modal-tab-btn` buttons, toggling `.active` and updating `aria-selected` attributes (`true`/`false`).
   - Switches visibility between `#tab-content-upi` and `#tab-content-bank` panes.

5. **Unified Amount Selection & Dynamic Live QR Generation**:
   - Preset chips (`.chip`): ₹1,008, ₹5,000, ₹11,000 (default), ₹25,000, ₹50,000. Clicking a chip sets `currentAmount`, clears custom input, and triggers `updateUPILink()`.
   - Custom amount input (`#custom-amount-input`): Sanitizes input strictly to digits (`replace(/[^0-9]/g, '')`). Typing a positive number deactivates preset chips and live updates QR code; clearing input resets to default ₹11,000.
   - Deep-link (`#pay-upi-btn`): Generates dynamic UPI URI with amount, payee name, and notes.
   - Live QR (`.qr-modal-img, .modal-qr-image`): Renders 300x300 QuickChart QR code matching the exact amount.

6. **One-Click Copy Feedback**:
   - Wired all 6 copy buttons with clipboard copy and instant toast notifications:
     - UPI ID: `#copy-vpa-btn` (overview card) & `#modal-copy-vpa-btn` (modal) -> `f051m01588@indianbk`
     - Bank Account Number: `#copy-acc-btn` (overview card) & `#copy-acc-btn-modal` (modal) -> `8350857706`
     - IFSC Code: `#copy-ifsc-btn` (overview card) & `#copy-ifsc-btn-modal` (modal) -> `IDIB000D074`

7. **Download QR Code Action**:
   - `#download-qr-btn`: Fetches QuickChart image blob and initiates automatic download of `1008_Temple_UPI_QR_₹${currentAmount}.png`, with safe fallback to `window.open`.

8. **Module Integration in `src/js/main.js`**:
   - Imported `openDonationModal` from `./upi.js`.
   - Exposed `window.openDonationModal = openDonationModal` for global and console access.
   - Re-exported `openDonationModal` from `main.js`.

---

## 2. Verified APIs & Identifiers

| Target Identifier | Type | Trigger / Event | Action / Effect |
|---|---|---|---|
| `openDonationModal(initialTab)` | Exported Function | Direct call / Trigger buttons | Opens `#donation-modal`, switches to initialTab, calls `updateUPILink()` |
| `closeDonationModal()` | Exported Function | Direct call / Close handlers | Closes modal and restores previous focus |
| `switchTab(tab)` | Exported Function | Direct call / Tab click | Toggles `.active` on tab buttons and panes |
| `#hero-donate-btn` | ID (`<a>`) | `click` | Calls `openDonationModal('upi')` |
| `#mobile-donate-fab` | ID (`<button>`) | `click` | Calls `openDonationModal('upi')` |
| `#open-donate-modal-btn` | ID (`<button>`) | `click` | Calls `openDonationModal('upi')` |
| `#open-bank-modal-btn` | ID (`<button>`) | `click` | Calls `openDonationModal('bank')` |
| `#close-donation-modal` | ID (`<button>`) | `click` | Calls `closeDonationModal()` |
| `#donation-modal` | ID (`<div>`) | `click` (outside) | Calls `closeDonationModal()` |
| `document` | Object | `keydown` (`Escape`) | Calls `closeDonationModal()` when modal is active |
| `.modal-tab-btn` | Class (`<button>`) | `click` | Calls `switchTab(data-tab)` |
| `.chip` | Class (`<button>`) | `click` | Selects preset amount, clears custom input, updates QR |
| `#custom-amount-input` | ID (`<input>`) | `input` | Sanitizes digits, sets custom amount, updates QR |
| `#pay-upi-btn` | ID (`<a>`) | Dynamic `href` | Deep link to open UPI apps with current amount |
| `.qr-modal-img` | Class (`<img>`) | Dynamic `src` | QuickChart live QR image URL |
| `#download-qr-btn` | ID (`<button>`) | `click` | Downloads `1008_Temple_UPI_QR_₹${amount}.png` |
| `#copy-vpa-btn`, `#modal-copy-vpa-btn` | ID (`<button>`) | `click` | Copies VPA & shows toast |
| `#copy-acc-btn`, `#copy-acc-btn-modal` | ID (`<button>`) | `click` | Copies Account No & shows toast |
| `#copy-ifsc-btn`, `#copy-ifsc-btn-modal` | ID (`<button>`) | `click` | Copies IFSC Code & shows toast |

---

## 3. Verification & Validation Evidence

### 3.1. Task 3 Specific Verification Suite (`scripts/verify_donation_task_3.mjs`)
```text
================================================================
  Task 3 Verification: Donation Modal Interactive Logic
================================================================

--- SECTION 1: Export Analysis & Code Contract ---
  ✓ [PASS] upi.js exports openDonationModal
  ✓ [PASS] upi.js exports closeDonationModal
  ✓ [PASS] upi.js exports switchTab
  ✓ [PASS] upi.js exports updateUPILink
  ✓ [PASS] upi.js exports initUPI
  ✓ [PASS] upi.js exports showToastAndCopy
  ✓ [PASS] upi.js exports showToast
  ✓ [PASS] upi.js exports getQrImageUrl
  ✓ [PASS] upi.js defines UPI_VPA constant
  ✓ [PASS] upi.js defines BANK_ACCOUNT_NO constant
  ✓ [PASS] upi.js defines BANK_IFSC constant
  ✓ [PASS] main.js imports/exports openDonationModal
  ✓ [PASS] main.js exposes openDonationModal on window
  ✓ [PASS] main.js re-exports openDonationModal

--- SECTION 2: Trigger & Close Selector Verifications ---
  ✓ [PASS] index.html contains modal trigger: #hero-donate-btn
  ✓ [PASS] upi.js binds event listener for trigger: #hero-donate-btn
  ✓ [PASS] index.html contains modal trigger: #mobile-donate-fab
  ✓ [PASS] upi.js binds event listener for trigger: #mobile-donate-fab
  ✓ [PASS] index.html contains modal trigger: #open-donate-modal-btn
  ✓ [PASS] upi.js binds event listener for trigger: #open-donate-modal-btn
  ✓ [PASS] index.html contains modal trigger: #open-bank-modal-btn
  ✓ [PASS] upi.js binds event listener for trigger: #open-bank-modal-btn
  ✓ [PASS] index.html contains modal close element: #close-donation-modal
  ✓ [PASS] upi.js handles close for: #close-donation-modal
  ✓ [PASS] index.html contains modal close element: #donation-modal
  ✓ [PASS] upi.js handles close for: #donation-modal
  ✓ [PASS] upi.js binds Escape key to close modal

--- SECTION 3: Tab Switching Verifications ---
  ✓ [PASS] upi.js queries .modal-tab-btn
  ✓ [PASS] upi.js manages #tab-content-upi
  ✓ [PASS] upi.js manages #tab-content-bank
  ✓ [PASS] upi.js reads data-tab attribute

--- SECTION 4: Amount & QR Code Logic ---
  ✓ [PASS] upi.js queries .chip elements
  ✓ [PASS] upi.js binds #custom-amount-input
  ✓ [PASS] upi.js sanitizes custom input to digits only
  ✓ [PASS] upi.js updates #pay-upi-btn
  ✓ [PASS] upi.js updates .qr-modal-img and .modal-qr-image
  ✓ [PASS] upi.js uses QuickChart QR generator API

--- SECTION 5: Copy Buttons & QR Download ---
  ✓ [PASS] index.html contains copy button: #copy-vpa-btn
  ✓ [PASS] upi.js wires copy listener for: #copy-vpa-btn
  ✓ [PASS] index.html contains copy button: #modal-copy-vpa-btn
  ✓ [PASS] upi.js wires copy listener for: #modal-copy-vpa-btn
  ✓ [PASS] index.html contains copy button: #copy-acc-btn
  ✓ [PASS] upi.js wires copy listener for: #copy-acc-btn
  ✓ [PASS] index.html contains copy button: #copy-acc-btn-modal
  ✓ [PASS] upi.js wires copy listener for: #copy-acc-btn-modal
  ✓ [PASS] index.html contains copy button: #copy-ifsc-btn
  ✓ [PASS] upi.js wires copy listener for: #copy-ifsc-btn
  ✓ [PASS] index.html contains copy button: #copy-ifsc-btn-modal
  ✓ [PASS] upi.js wires copy listener for: #copy-ifsc-btn-modal
  ✓ [PASS] index.html contains #download-qr-btn
  ✓ [PASS] upi.js binds download QR button
  ✓ [PASS] upi.js generates correct filename pattern for QR download

--- SECTION 6: Dynamic Functional DOM Simulation ---
  ✓ [PASS] Initial pay button URL contains default amount 11000
  ✓ [PASS] Initial QR image source is set to QuickChart
  ✓ [PASS] Clicking #hero-donate-btn adds .active to #donation-modal
  ✓ [PASS] UPI tab button is active
  ✓ [PASS] #tab-content-upi is active
  ✓ [PASS] Bank tab button is not active
  ✓ [PASS] #tab-content-bank is not active
  ✓ [PASS] Clicking #close-donation-modal removes .active from modal
  ✓ [PASS] Clicking #open-bank-modal-btn opens modal
  ✓ [PASS] Bank tab button is active
  ✓ [PASS] #tab-content-bank is active
  ✓ [PASS] UPI tab button is inactive
  ✓ [PASS] #tab-content-upi is inactive
  ✓ [PASS] Switching to UPI tab activates UPI tab button
  ✓ [PASS] Switching to UPI tab activates #tab-content-upi
  ✓ [PASS] Bank tab button is deactivated
  ✓ [PASS] #tab-content-bank is deactivated
  ✓ [PASS] Selected chip (₹1,008) is active
  ✓ [PASS] Previously active chip (₹11,000) is deactivated
  ✓ [PASS] getCurrentAmount() reflects 1008
  ✓ [PASS] Pay button href updated to 1008
  ✓ [PASS] Chips deactivated when typing custom amount
  ✓ [PASS] getCurrentAmount() reflects custom amount 50000
  ✓ [PASS] Pay button href updated to 50000
  ✓ [PASS] Clearing custom input resets amount to 11000
  ✓ [PASS] Pay button href reset to 11000
  ✓ [PASS] Backdrop click dismisses modal
  ✓ [PASS] Modal opened before Escape test
  ✓ [PASS] Escape key dismisses modal
  ✓ [PASS] All 6 copy buttons clicked cleanly without errors

================================================================
Task 3 Verification Summary: 82/82 Passed (0 Failed)
================================================================

🎉 100% SUCCESS: All Task 3 requirements verified and passing!
```

### 3.2. Master Test Suite Regression Check (`npm run test:all`)
```text
================================================================
VERIFICATION SUMMARY: 171/171 Passed (0 Failed)
================================================================

🎉 100% SUCCESS: All verifications passed without errors!
```

### 3.3. Production Build Compilation Check (`npm run build`)
```text
vite v6.4.3 building for production...
transforming...
✓ 14 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                  38.43 kB │ gzip:  9.22 kB
dist/assets/index-D9l-hHSh.css   41.07 kB │ gzip:  7.88 kB
dist/assets/index-BkgZdfPF.js   143.22 kB │ gzip: 33.14 kB
✓ built in 404ms
```
