# Design Specification: Dynamic Amount QR Generator, Gallery Download & Disambiguated Localized Buttons

**Date**: 2026-07-26  
**Topic**: Real-time Dynamic UPI QR Generation, Download QR to Gallery, and Button Label Localization

---

## 1. Overview & Goals

This design specification details three key UX enhancements for the OTV Jain Temple Donation Website:
1. **Disambiguated Localized Button System**: Separate the scroll-navigation CTA (`btn_donate_now`) from the direct payment app launcher (`btn_pay_upi_app`), and localize all remaining UI action labels across Tamil, English, Hindi, and Kannada.
2. **Dynamic Amount UPI QR Code**: Dynamically generate UPI QR codes containing the recipient VPA (`f051m01588@indianbk`), recipient trust name, and exact selected donation amount (`am=${amount}`) so scanning auto-fills the payment details in GPay / PhonePe / Paytm / BHIM.
3. **Download QR Code to Gallery**: Provide a 1-tap download button inside the QR modal allowing single-phone mobile users to save the QR image to their gallery and upload it within GPay/PhonePe's "Scan QR from Gallery" feature.

---

## 2. Technical Architecture & Specifications

### 2.1 Disambiguated Translation Datasets (`ta.js`, `en.js`, `hi.js`, `kn.js`)

Add/Update keys:
- `sacred_contribution`:
  - `ta`: `"திருப்பணி நன்கொடை"`
  - `en`: `"Sacred Contribution"`
  - `hi`: `"पावन दान सहयोग"`
  - `kn`: `"ಪವಿತ್ರ ಕಾಣಿಕೆ"`
- `btn_donate_now`:
  - `ta`: `"⚡ நன்கொடை அளிக்க"`
  - `en`: `"⚡ Donate Now"`
  - `hi`: `"⚡ दान दें"`
  - `kn`: `"⚡ ದೇಣಿಗೆ ನೀಡಿ"`
- `btn_pay_upi_app`:
  - `ta`: `"📱 UPI செயலி மூலம் நேரடியாக செலுத்த"`
  - `en`: `"📱 Pay Directly via Any UPI App"`
  - `hi`: `"📱 UPI ऐप से सीधे भुगतान करें"`
  - `kn`: `"📱 UPI ಆಪ್ ಮೂಲಕ ನೇರವಾಗಿ ಪಾವತಿಸಿ"`
- `btn_view_qr`:
  - `ta`: `"🔍 UPI QR குறியீட்டை காண்க & ஸ்கேன் செய்க"`
  - `en`: `"🔍 View & Scan UPI QR Code"`
  - `hi`: `"🔍 UPI QR कोड देखें एवं स्कैन करें"`
  - `kn`: `"🔍 UPI QR ಕೋಡ್ ವೀಕ್ಷಿಸಿ ಮತ್ತು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ"`
- `btn_download_qr`:
  - `ta`: `"📥 QR குறியீட்டை படமாக பதிவிறக்கு (Save to Gallery)"`
  - `en`: `"📥 Download QR Code to Gallery"`
  - `hi`: `"📥 QR कोड गैलरी में सेव करें"`
  - `kn`: `"📥 QR ಕೋಡ್ ಗ್ಯಾಲರಿಗೆ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ"`
- `btn_copy_vpa`:
  - `ta`: `"📋 UPI குறியீட்டை பிரதி எடு"`
  - `en`: `"📋 Copy UPI ID"`
  - `hi`: `"📋 UPI आईडी कॉपी करें"`
  - `kn`: `"📋 UPI ಐಡಿ ಕಾಪಿ ಮಾಡಿ"`
- `vpa_label`:
  - `ta`: `"UPI பெறுநர் கணக்கு (VPA):"`
  - `en`: `"UPI Recipient VPA:"`
  - `hi`: `"UPI प्राप्तकर्ता वीपीए:"`
  - `kn`: `"UPI ಸ್ವೀಕರಿಸುವವರ ವಿಪಿಎ:"`
- `custom_amount_placeholder`:
  - `ta`: `"அல்லது விரும்பிய தொகையை உள்ளிடவும்"`
  - `en`: `"Or enter custom amount"`
  - `hi`: `"या अपनी इच्छानुसार राशि दर्ज करें"`
  - `kn`: `"ಅಥವಾ ನಿಮ್ಮಿಷ್ಟದ ಮೊತ್ತವನ್ನು ನಮೂದಿಸಿ"`

### 2.2 Dynamic QR Generation & Gallery Download (`src/js/upi.js` & `index.html`)

- **UPI URI Format**:
  `upi://pay?pa=f051m01588@indianbk&pn=1008+SHRI+VIRSHABANATH+BHAGWAN+JAIN+TEMPLE+TRUST&am=${amount}&cu=INR&tn=Othalavadi+Temple+Renovation`
- **Dynamic QR Rendering**:
  - Render dynamic QR code SVG/PNG URL using QuickChart QR API (`https://quickchart.io/qr?text=...&size=300`) or client-side SVG generator.
  - On amount chip click or custom input change, update the `#qr-modal-img` source and `#pay-upi-btn` href dynamically.
- **Gallery Download Implementation**:
  - Add download button `#download-qr-btn` in `#qr-modal`.
  - When clicked, fetches the current QR image blob and triggers browser file save: `1008_Temple_UPI_QR_${amount}.png`.
  - Display user tip inside modal: *"devotees browsing on mobile can save QR image to gallery, open GPay/PhonePe -> Scan QR -> Upload from Gallery"*.

---

## 3. Verification Plan

1. **Button Disambiguation**:
   - Verify Hero CTA button reads `"⚡ நன்கொடை அளிக்க"` (Tamil) and scrolls down to `#donate-section`.
   - Verify payment button inside card reads `"📱 UPI செயலி மூலம் நேரடியாக செலுத்த"`.
   - Verify sticky mobile bar label reads `"திருப்பணி நன்கொடை"`.
2. **Dynamic QR Code**:
   - Select ₹11,000 chip -> Open QR Modal -> Verify QR URL contains `am=11000`.
   - Change custom amount to ₹5,000 -> Verify QR updates to `am=5000`.
3. **Gallery Download**:
   - Click `"📥 Download QR Code to Gallery"` -> Verify image downloads as `1008_Temple_UPI_QR_11000.png`.
