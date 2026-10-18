# Task 2 Brief: DOM Restructuring in `index.html`

## Objective
Refactor `#donate-section` in `index.html` into the dignified Sacred Contribution Overview Card, replace the bulky `.sticky-donate-bar` with the sleek Floating Action Pill (`#mobile-donate-fab`), and implement the dedicated `#donation-modal` dialog with Tab 1 (UPI & QR) and Tab 2 (Direct Bank Transfer).

## Target File
- `index.html`

## Detailed Changes Required

### 1. In-Page `#donate-section` (Sacred Contribution Overview Card)
Replace the existing inline form inside `#donate-section` with:
- Card class: `<section id="donate-section" class="card donation-card">`
- Title: `<h3 class="section-title" data-i18n="donation_title">Make a Sacred Contribution</h3>`
- Subtitle paragraph: `<p class="donation-card-subtext" data-i18n="donation_card_subtitle">...</p>`
- Highlights pills / badges:
  - 80G 50% Tax Exemption badge
  - ₹11,000+ Stone Plaque Tier badge
- Main action buttons container (`.donation-portal-actions.no-print`):
  - Primary button:
    `<button id="open-donate-modal-btn" class="btn btn-gold btn-lg"><span data-i18n="btn_open_donation_portal">⚡ Open Sacred Donation Portal</span></button>`
  - Secondary button:
    `<button id="open-bank-modal-btn" class="btn btn-outline"><span data-i18n="btn_open_bank_portal">🏛️ View Bank Transfer Details</span></button>`
- Quick credentials strip (`.quick-credentials-strip`):
  - VPA Pill: `UPI ID:` `f051m01588@indianbk` with `<button id="copy-vpa-btn" class="btn-copy-chip" data-i18n="btn_copy_vpa">📋 Copy UPI ID</button>`
  - Bank Pill: Indian Bank, A/C `8350857706`, IFSC `IDIB000D074` with copy actions (`copy-acc-btn`, `copy-ifsc-btn`) preserved for print and direct copy.

### 2. Replace `.sticky-donate-bar` with Floating Action Pill (`#mobile-donate-fab`)
Remove the bulky `.sticky-donate-bar` (which had the 20-character VPA string and labels) and replace with:
```html
<!-- Floating Mobile Quick-Donate Pill (FAB) -->
<button id="mobile-donate-fab" class="mobile-donate-fab no-print" aria-label="Donate Now">
  <span class="fab-icon">⚡</span>
  <span class="fab-text" data-i18n="fab_donate">⚡ Donate Now</span>
</button>
```

### 3. Dedicated Donation Modal (`#donation-modal`)
Add `#donation-modal` (can replace or encompass the old `#qr-modal`):
```html
<!-- Full Featured Donation Modal -->
<div id="donation-modal" class="modal no-print" role="dialog" aria-modal="true" aria-labelledby="donation-modal-title">
  <div class="modal-content donation-modal-content">
    <button id="close-donation-modal" class="modal-close" aria-label="Close dialog">&times;</button>
    
    <!-- Modal Header -->
    <div class="donation-modal-header text-center">
      <span class="modal-header-icon">🪔</span>
      <h3 id="donation-modal-title" data-i18n="modal_donation_title">Sacred Renovation Contribution Portal</h3>
    </div>

    <!-- Tab Navigation -->
    <div class="modal-tabs">
      <button class="modal-tab-btn active" data-tab="upi">
        <span data-i18n="tab_upi_qr">📱 UPI & QR Code</span>
      </button>
      <button class="modal-tab-btn" data-tab="bank">
        <span data-i18n="tab_bank_transfer">🏛️ Direct Bank Transfer</span>
      </button>
    </div>

    <!-- Tab 1: UPI & Live QR Code -->
    <div id="tab-content-upi" class="tab-pane active">
      <div class="modal-upi-layout">
        
        <!-- Left Column: Amount Selector & Controls -->
        <div class="modal-upi-left">
          <label class="selector-label" data-i18n="select_amount_label">Select Donation Amount:</label>
          <div class="unified-amount-grid">
            <button class="chip" data-amount="1008">₹1,008</button>
            <button class="chip" data-amount="5000">₹5,000</button>
            <button class="chip active" data-amount="11000">₹11,000 ⭐ <span data-i18n="plaque_tier">Stone Plaque Tier</span></button>
            <button class="chip" data-amount="25000">₹25,000</button>
            <button class="chip" data-amount="50000">₹50,000</button>
            <div class="custom-amount-pill">
              <span class="currency-symbol">₹</span>
              <input type="text" id="custom-amount-input" placeholder="Other amount" data-i18n-placeholder="custom_amount_placeholder" inputmode="numeric" />
            </div>
          </div>

          <div class="modal-vpa-pill">
            <div class="vpa-info">
              <span class="vpa-label" data-i18n="vpa_label">UPI Recipient VPA:</span>
              <strong class="vpa-text">f051m01588@indianbk</strong>
            </div>
            <button id="modal-copy-vpa-btn" class="btn btn-sm btn-outline copy-btn" data-copy="f051m01588@indianbk" data-i18n="btn_copy_vpa">
              📋 Copy UPI ID
            </button>
          </div>

          <!-- Mobile Direct Pay Button -->
          <div class="modal-upi-actions">
            <a id="pay-upi-btn" href="#" class="btn-upi-pay">
              <span data-i18n="btn_pay_upi_app">📱 Pay Directly via Any UPI App</span>
              <span class="btn-upi-subtext">Google Pay • PhonePe • Paytm • BHIM</span>
            </a>
          </div>

          <div class="modal-tax-note">
            <small>🛡️ Eligible for 50% Tax Exemption under Section 80G. Donors contributing ₹11,000+ receive stone plaque inscription.</small>
          </div>
        </div>

        <!-- Right Column: Live QR Code -->
        <div class="modal-upi-right text-center">
          <div class="modal-qr-card">
            <img src="/assets/images/upi-qr.png" alt="Live UPI QR Code" class="modal-qr-image qr-modal-img" />
            <p class="qr-scan-hint" data-i18n="scan_qr_instantly_hint">Scan this QR code with Google Pay, PhonePe, Paytm, BHIM, or any banking app on your phone</p>
            <button id="download-qr-btn" class="btn btn-gold btn-block" data-i18n="btn_download_qr">
              📥 Download QR Code to Gallery
            </button>
            <p class="qr-modal-tip" data-i18n="qr_modal_tip">
              Browsing on mobile? Download QR image to gallery -> Open GPay/PhonePe -> Scan QR -> Select 'Upload from Gallery'.
            </p>
          </div>
        </div>

      </div>
    </div>

    <!-- Tab 2: Direct Bank Transfer Details -->
    <div id="tab-content-bank" class="tab-pane">
      <div class="bank-details-box modal-bank-box">
        <h4 data-i18n="bank_details_heading">Direct Bank Transfer Details</h4>
        <div class="bank-credential-rows">
          <div class="bank-row">
            <span class="bank-row-label" data-i18n="acc_name_label">Account Name:</span>
            <strong class="bank-row-value">1008 SHRI VIRSHABANATH BHAGWAN JAIN TEMPLE TRUST, OTHALAVADI</strong>
          </div>
          <div class="bank-row">
            <span class="bank-row-label" data-i18n="acc_no_label">Account No:</span>
            <div class="bank-val-with-copy">
              <strong class="bank-row-value">8350857706</strong>
              <button id="copy-acc-btn-modal" class="btn btn-sm btn-outline copy-btn" data-copy="8350857706" data-i18n="btn_copy">Copy</button>
            </div>
          </div>
          <div class="bank-row">
            <span class="bank-row-label" data-i18n="bank_name_label">Bank Name:</span>
            <strong class="bank-row-value">Indian Bank (Devikapuram Branch - Code 02322)</strong>
          </div>
          <div class="bank-row">
            <span class="bank-row-label" data-i18n="ifsc_label">IFSC Code:</span>
            <div class="bank-val-with-copy">
              <strong class="bank-row-value">IDIB000D074</strong>
              <button id="copy-ifsc-btn-modal" class="btn btn-sm btn-outline copy-btn" data-copy="IDIB000D074" data-i18n="btn_copy">Copy</button>
            </div>
          </div>
          <div class="bank-row">
            <span class="bank-row-label">Branch & Location:</span>
            <span class="bank-row-value">Devikapuram Branch, Chetpet Taluk, Tiruvannamalai District, Tamil Nadu – 632326</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>
```

### 4. Also update Hero CTA button:
In `.hero-cta-group`:
Change the `href="#donate-section"` on `.btn-gold` to include an ID `#hero-donate-btn` (or keep both `href="#donate-section"` and ID) so clicking it immediately opens `#donation-modal`.

## Verification
- Inspect `index.html` structure to verify valid HTML, all tags closed.
- Verify all required IDs are present: `#donate-section`, `#open-donate-modal-btn`, `#open-bank-modal-btn`, `#mobile-donate-fab`, `#donation-modal`, `#close-donation-modal`, `.chip`, `#custom-amount-input`, `#pay-upi-btn`, `#download-qr-btn`, `#modal-copy-vpa-btn`.

## Git Commit
Commit message: `feat(ui): restructure index.html with in-page contribution card, mobile FAB, and donation modal`
