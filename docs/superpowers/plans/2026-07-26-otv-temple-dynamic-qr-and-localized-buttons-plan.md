# Dynamic Amount QR Generator & Localized Buttons Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement real-time dynamic amount UPI QR code generation, a "Download QR to Gallery" button for single-phone mobile users, and complete localization for all payment & sticky UI action buttons.

**Architecture:** Update multi-lingual datasets (`ta.js`, `en.js`, `hi.js`, `kn.js`), add `data-i18n` attributes in `index.html`, update `upi.js` logic to dynamically compute QuickChart QR URLs and handle image downloads, and add QR modal styling in `main.css`.

**Tech Stack:** HTML5, Vanilla JavaScript (ES modules), CSS3.

## Global Constraints
- Target Languages: `ta` (default), `en`, `hi`, `kn`.
- Recipient VPA: `f051m01588@indianbk`
- Recipient Name: `1008 SHRI VIRSHABANATH BHAGWAN JAIN TEMPLE TRUST`
- Download File Format: PNG (`1008_Temple_UPI_QR_<amount>.png`).

---

### Task 1: Update Translation Datasets (`ta.js`, `en.js`, `hi.js`, `kn.js`)

**Files:**
- Modify: `d:/otv_temple_donation/otv-jain-temple-donation/src/js/data/ta.js:1-65`
- Modify: `d:/otv_temple_donation/otv-jain-temple-donation/src/js/data/en.js:1-65`
- Modify: `d:/otv_temple_donation/otv-jain-temple-donation/src/js/data/hi.js:1-65`
- Modify: `d:/otv_temple_donation/otv-jain-temple-donation/src/js/data/kn.js:1-65`

**Interfaces:**
- Consumes: Translation keys consumed by `i18n.js`.
- Produces: Disambiguated button keys (`btn_donate_now`, `btn_pay_upi_app`, `sacred_contribution`, `btn_view_qr`, `btn_download_qr`, `btn_copy_vpa`, `vpa_label`, `custom_amount_placeholder`, `qr_modal_tip`).

- [ ] **Step 1: Update Tamil translations in `src/js/data/ta.js`**

Add/update keys:
```javascript
  sacred_contribution: "திருப்பணி நன்கொடை",
  btn_donate_now: "⚡ நன்கொடை அளிக்க",
  btn_pay_upi_app: "📱 UPI செயலி மூலம் நேரடியாக செலுத்த",
  btn_view_qr: "🔍 UPI QR குறியீட்டை காண்க & ஸ்கேன் செய்க",
  btn_download_qr: "📥 QR குறியீட்டை படமாக பதிவிறக்கு (Save to Gallery)",
  btn_copy_vpa: "📋 UPI குறியீட்டை பிரதி எடு",
  vpa_label: "UPI பெறுநர் கணக்கு (VPA):",
  custom_amount_placeholder: "அல்லது விரும்பிய தொகையை உள்ளிடவும்",
  qr_modal_tip: "மொபைலில் பார்ப்பவர்கள்: QR படத்தை போன் கேலரியில் சேமித்து -> GPay/PhonePe செயலியை திறந்து -> Scan QR -> Upload from Gallery என்பதைத் தேர்ந்தெடுக்கவும்."
```

- [ ] **Step 2: Update English translations in `src/js/data/en.js`**

```javascript
  sacred_contribution: "Sacred Contribution",
  btn_donate_now: "⚡ Donate Now",
  btn_pay_upi_app: "📱 Pay Directly via Any UPI App",
  btn_view_qr: "🔍 View & Scan UPI QR Code",
  btn_download_qr: "📥 Download QR Code to Gallery",
  btn_copy_vpa: "📋 Copy UPI ID",
  vpa_label: "UPI Recipient VPA:",
  custom_amount_placeholder: "Or enter custom amount",
  qr_modal_tip: "Browsing on mobile? Download QR image to gallery -> Open GPay/PhonePe -> Scan QR -> Select 'Upload from Gallery'."
```

- [ ] **Step 3: Update Hindi and Kannada translations in `src/js/data/hi.js` and `src/js/data/kn.js`**

In `hi.js`:
```javascript
  sacred_contribution: "पावन दान सहयोग",
  btn_donate_now: "⚡ दान दें",
  btn_pay_upi_app: "📱 UPI ऐप से सीधे भुगतान करें",
  btn_view_qr: "🔍 UPI QR कोड देखें एवं स्कैन करें",
  btn_download_qr: "📥 QR कोड गैलरी में सेव करें",
  btn_copy_vpa: "📋 UPI आईडी कॉपी करें",
  vpa_label: "UPI प्राप्तकर्ता वीपीए:",
  custom_amount_placeholder: "या अपनी इच्छानुसार राशि दर्ज करें",
  qr_modal_tip: "मोबाइल पर देख रहे हैं? QR इमेज गैलरी में सेव करें -> GPay/PhonePe खोलें -> Scan QR -> 'Upload from Gallery' चुनें।"
```

In `kn.js`:
```javascript
  sacred_contribution: "ಪವಿತ್ರ ಕಾಣಿಕೆ",
  btn_donate_now: "⚡ ದೇಣಿಗೆ ನೀಡಿ",
  btn_pay_upi_app: "📱 UPI ಆಪ್ ಮೂಲಕ ನೇರವಾಗಿ ಪಾವತಿಸಿ",
  btn_view_qr: "🔍 UPI QR ಕೋಡ್ ವೀಕ್ಷಿಸಿ ಮತ್ತು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
  btn_download_qr: "📥 QR ಕೋಡ್ ಗ್ಯಾಲರಿಗೆ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
  btn_copy_vpa: "📋 UPI ಐಡಿ ಕಾಪಿ ಮಾಡಿ",
  vpa_label: "UPI ಸ್ವೀಕರಿಸುವವರ ವಿಪಿಎ:",
  custom_amount_placeholder: "ಅಥವಾ ನಿಮ್ಮಿಷ್ಟದ ಮೊತ್ತವನ್ನು ನಮೂದಿಸಿ",
  qr_modal_tip: "ಮೊಬೈಲ್‌ನಲ್ಲಿ ನೋಡುತ್ತಿದ್ದೀರಾ? QR ಚಿತ್ರವನ್ನು ಗ್ಯಾಲರಿಗೆ ಸೇವ್ ಮಾಡಿ -> GPay/PhonePe ತೆರೆಯಿರಿ -> Scan QR -> 'Upload from Gallery' ಆಯ್ಕೆಮಾಡಿ."
```

- [ ] **Step 4: Commit translation dataset changes**

```bash
git add src/js/data/ta.js src/js/data/en.js src/js/data/hi.js src/js/data/kn.js
git commit -m "feat: add translation keys for dynamic QR, gallery download, and localized buttons"
```

---

### Task 2: Add `data-i18n` Attributes & Download Button in `index.html`

**Files:**
- Modify: `d:/otv_temple_donation/otv-jain-temple-donation/index.html:95-135, 258-275`

**Interfaces:**
- Consumes: `data-i18n` attributes.
- Produces: Fully localized markup and QR download button in modal.

- [ ] **Step 1: Update Donation Card and Sticky Bar HTML in `index.html`**

1. In `#donate-section`:
   - `<span class="vpa-label" data-i18n="vpa_label">`
   - `<button id="copy-vpa-btn" data-i18n="btn_copy_vpa">`
   - `<input type="text" id="custom-amount-input" data-i18n-placeholder="custom_amount_placeholder" />`
   - `<a id="pay-upi-btn" class="btn-upi-pay"><span data-i18n="btn_pay_upi_app">`
   - `<button id="view-qr-btn" data-i18n="btn_view_qr">`
2. In Sticky Mobile Quick-Donate Bar:
   - `<small data-i18n="sacred_contribution">`
   - `<a href="#donate-section" class="btn btn-gold btn-sm" data-i18n="btn_donate_now">`
3. In `#qr-modal`:
   - Add `<button id="download-qr-btn" class="btn btn-gold btn-block" style="margin-top:12px;" data-i18n="btn_download_qr">`
   - Add `<p class="qr-tip" data-i18n="qr_modal_tip">`

- [ ] **Step 2: Commit `index.html` changes**

```bash
git add index.html
git commit -m "feat: localize UI action buttons and add QR gallery download button in index.html"
```

---

### Task 3: Implement Dynamic QR Code & Gallery Download in `src/js/upi.js`

**Files:**
- Modify: `d:/otv_temple_donation/otv-jain-temple-donation/src/js/upi.js:1-90`

**Interfaces:**
- Consumes: Amount inputs, `#pay-upi-btn`, `#qr-modal-img`, `#download-qr-btn`.
- Produces: Real-time dynamic QR code generation and 1-tap photo gallery download.

- [ ] **Step 1: View `src/js/upi.js`**

Let's view `src/js/upi.js`.

- [ ] **Step 2: Update `src/js/upi.js` to dynamically generate QR codes and handle gallery download**

```javascript
import { t } from './i18n.js';

export function initUPI() {
  const vpa = "f051m01588@indianbk";
  const payeeName = "1008 SHRI VIRSHABANATH BHAGWAN JAIN TEMPLE TRUST";
  let currentAmount = 11000;

  const chips = document.querySelectorAll('.chip');
  const customInput = document.getElementById('custom-amount-input');
  const payUpiBtn = document.getElementById('pay-upi-btn');
  const copyVpaBtn = document.getElementById('copy-vpa-btn');
  const copyAccBtn = document.getElementById('copy-acc-btn');
  const copyIfscBtn = document.getElementById('copy-ifsc-btn');
  const viewQrBtn = document.getElementById('view-qr-btn');
  const qrModal = document.getElementById('qr-modal');
  const closeQrBtn = document.getElementById('close-qr-modal');
  const qrModalImg = document.querySelector('.qr-modal-img');
  const downloadQrBtn = document.getElementById('download-qr-btn');

  function buildUpiUrl(amount) {
    const note = encodeURIComponent("Othalavadi Temple Renovation");
    const name = encodeURIComponent(payeeName);
    return `upi://pay?pa=${vpa}&pn=${name}&am=${amount}&cu=INR&tn=${note}`;
  }

  function getQrImageUrl(amount) {
    const upiUri = buildUpiUrl(amount);
    return `https://quickchart.io/qr?text=${encodeURIComponent(upiUri)}&size=300&margin=1`;
  }

  function updatePaymentState(amount) {
    currentAmount = amount;
    
    // Update Pay UPI Button Href
    if (payUpiBtn) {
      payUpiBtn.href = buildUpiUrl(amount);
    }

    // Update Modal QR Image
    if (qrModalImg) {
      qrModalImg.src = getQrImageUrl(amount);
    }
  }

  // Preset Chips
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      if (customInput) customInput.value = '';
      const amt = parseInt(chip.getAttribute('data-amount'), 10);
      updatePaymentState(amt);
    });
  });

  // Custom Amount Input
  if (customInput) {
    customInput.addEventListener('input', (e) => {
      chips.forEach(c => c.classList.remove('active'));
      const val = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10);
      if (val && val > 0) {
        updatePaymentState(val);
      } else {
        updatePaymentState(11000);
      }
    });
  }

  // Copy Buttons Helper
  function copyText(text, btnElement) {
    navigator.clipboard.writeText(text).then(() => {
      const originalText = btnElement.textContent;
      btnElement.textContent = "✓ Copied!";
      setTimeout(() => {
        btnElement.textContent = originalText;
      }, 2000);
    });
  }

  if (copyVpaBtn) copyVpaBtn.addEventListener('click', () => copyText(vpa, copyVpaBtn));
  if (copyAccBtn) copyAccBtn.addEventListener('click', () => copyText("8350857706", copyAccBtn));
  if (copyIfscBtn) copyIfscBtn.addEventListener('click', () => copyText("IDIB000D074", copyIfscBtn));

  // QR Modal
  if (viewQrBtn && qrModal) {
    viewQrBtn.addEventListener('click', () => {
      updatePaymentState(currentAmount);
      qrModal.classList.add('active');
    });
  }
  if (closeQrBtn && qrModal) {
    closeQrBtn.addEventListener('click', () => {
      qrModal.classList.remove('active');
    });
  }

  // Gallery Download Handler
  if (downloadQrBtn) {
    downloadQrBtn.addEventListener('click', async () => {
      try {
        const qrUrl = getQrImageUrl(currentAmount);
        const response = await fetch(qrUrl);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = `1008_Temple_UPI_QR_₹${currentAmount}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
      } catch (err) {
        window.open(getQrImageUrl(currentAmount), '_blank');
      }
    });
  }

  // Initialize Default State (₹11,000)
  updatePaymentState(11000);
}
```

- [ ] **Step 3: Commit `upi.js` changes**

```bash
git add src/js/upi.js
git commit -m "feat: dynamic amount UPI QR code generation and gallery download handler"
```

---

### Task 4: End-to-End Verification & Build Check

- [ ] **Step 1: Run Vite build**

Run: `npx vite build`
Expected: Clean build with zero errors.

- [ ] **Step 2: Commit final build artifacts & push**
