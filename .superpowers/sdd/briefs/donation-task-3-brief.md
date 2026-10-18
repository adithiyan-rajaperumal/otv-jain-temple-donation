# Task 3 Brief: Interactive Logic in `src/js/upi.js` & `src/js/main.js`

## Objective
Implement complete interactive logic for the new Donation Modal, tab switching, unified amount selector, live QR generation, mobile FAB trigger, and one-click copy buttons in `src/js/upi.js` and `src/js/main.js`.

## Target Files
- `src/js/upi.js`
- `src/js/main.js`

## Functional Requirements

### 1. Modal Control API (`openDonationModal(initialTab = 'upi')`)
Export `openDonationModal` from `src/js/upi.js`:
- Adds `.active` class to `#donation-modal`.
- Sets the active tab:
  - If `initialTab === 'bank'`: activates the bank tab button and displays `#tab-content-bank`.
  - Otherwise: activates the UPI tab button and displays `#tab-content-upi`.
- Calls `updateUPILink()` to ensure QR code and deep link reflect the selected amount.
- Focuses close button or active tab for accessibility.

### 2. Modal Triggers
Wire event listeners for:
- `#hero-donate-btn`: calls `openDonationModal('upi')` (prevent default navigation).
- `#mobile-donate-fab`: calls `openDonationModal('upi')`.
- `#open-donate-modal-btn`: calls `openDonationModal('upi')`.
- `#open-bank-modal-btn`: calls `openDonationModal('bank')`.

### 3. Modal Close Handlers
- Close button (`#close-donation-modal`): removes `.active` from `#donation-modal`.
- Backdrop click: clicking outside `.modal-content` on `#donation-modal` closes the modal.
- `Escape` key: adds a `keydown` listener so pressing `Escape` closes `#donation-modal` when it is active.

### 4. Tab Switching
- Listen to click events on `.modal-tab-btn`:
  - Read `data-tab` (`'upi'` or `'bank'`).
  - Toggle `.active` class on `.modal-tab-btn` buttons.
  - Show the matching `#tab-content-${tab}` (add `.active` class) and hide the other tab pane.

### 5. Unified Amount Selection & QR Code Generation
- Track `currentAmount` (default `'11000'`).
- Chip buttons (`.chip` inside `#donation-modal`):
  - On click: remove `.active` from all chips, add `.active` to clicked chip.
  - Set `currentAmount = chip.getAttribute('data-amount')`.
  - Clear `#custom-amount-input` value.
  - Call `updateUPILink()`.
- Custom amount input (`#custom-amount-input`):
  - Filter input to numeric only (`replace(/[^0-9]/g, '')`).
  - If value > 0: remove `.active` from all chips, set `currentAmount = val`.
  - If value is cleared: set `currentAmount = '11000'` (or keep default).
  - Call `updateUPILink()`.
- Live QR & Deep Link (`updateUPILink()`):
  - Construct UPI URL: `upi://pay?pa=f051m01588%40indianbk&pn=SHRI%20VIRSHABANATH%20BHAGAWAN%20JAIN%20TEMPLE%20OTHALAVADI&am=${currentAmount}&cu=INR&tn=Othalavadi%20Temple%20Renovation`
  - Update `#pay-upi-btn` `href` attribute.
  - Construct QR image URL using QuickChart: `https://quickchart.io/qr?text=${encodeURIComponent(upiUrl)}&size=300&margin=1`
  - Update `.qr-modal-img, .modal-qr-image` `src` attribute.

### 6. One-Click Copy Actions
Support copy and toast notifications for:
- VPA buttons: `#copy-vpa-btn` (overview card) and `#modal-copy-vpa-btn` (modal) -> `f051m01588@indianbk`
- Account No buttons: `#copy-acc-btn` (overview card) and `#copy-acc-btn-modal` (modal) -> `8350857706`
- IFSC buttons: `#copy-ifsc-btn` (overview card) and `#copy-ifsc-btn-modal` (modal) -> `IDIB000D074`

### 7. Download QR Code Action
- `#download-qr-btn`: fetches the QuickChart image blob and downloads `1008_Temple_UPI_QR_₹${currentAmount}.png`, with fallback to `window.open`.

## Verification
- Test all event listeners, functions, and handlers.
- Run `npm run test:all` to ensure no regressions.

## Git Commit
Commit message: `feat(logic): implement donation modal open/close, tab switching, and live qr generation in upi.js`
