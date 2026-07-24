# 1008 Sri Vrishabanath Bhagwan Temple Renovation & Donation Static Website Design

## 1. Overview
A mobile-first, ultra-fast static website created to facilitate renovation donations for the historic **1008 Sri Vrishabanath Bhagwan Jain Temple** located in Othalavadi Village, Chetpet Taluk, Tiruvannamalai District, Tamil Nadu.

The site is designed for deployment on **Cloudflare Pages**, featuring dynamic instant multi-language switching (**English**, **Tamil**, **Hindi**, and **Kannada**), mobile native UPI payment launcher with preset amounts, bank transfer detail copying, interactive temple image gallery, multi-language notice proofs, and itemized renovation proposal details extracted from the technical estimate PDF with clean PDF proof export.

---

## 2. User Review & Approvals

- **Language Support**: Instant dynamic switching between English, Tamil (தமிழ்), Hindi (हिंदी), and Kannada (ಕನ್ನಡ) without page reloads. Default language is English.
- **UPI & Payment UX**: Interactive preset amount chips (₹1,008, ₹5,000, ₹11,000 Stone Plaque Tier, ₹25,000, ₹50,000, and custom amount). Tapping "Pay via UPI App" on mobile devices dynamically launches installed UPI apps (GPay, PhonePe, Paytm, BHIM) with recipient VPA (`f051m01588@indianbk`) and pre-filled amount. Also includes one-tap Copy UPI ID, Copy Bank Details, and full-screen QR code zoom modal.
- **Renovation Proposal & Estimates**: Full itemized 11-work breakdown totaling ₹1,27,30,740 (~₹1.27 Crores), Yathi Nivas 3,000 sq.ft building architecture specs, and dual PDF options: downloading the original proposal PDF and exporting a clean, formatted web-to-pdf print proof document.
- **Deployment Platform**: Cloudflare Pages (Vite + Vanilla HTML/CSS/JS build).

---

## 3. Core Architecture & Asset Structure

### Workspace Structure (`d:\otv_temple_donation\otv-jain-temple-donation`)
```
otv-jain-temple-donation/
├── index.html                  # Main SPA HTML structure with SEO & WhatsApp OpenGraph tags
├── package.json                # Project manifest & build scripts
├── vite.config.js              # Vite static build configuration
├── public/
│   ├── favicon.ico
│   └── assets/
│       ├── images/
│       │   ├── temple/         # 21 high-res photos copied from desktop asset folder
│       │   ├── notices/        # Scanned proof & color notice images in all languages
│       │   └── upi-qr.png      # UPI QR code image asset
│       └── docs/
│           └── proposal.pdf    # 1008_Sri_Vrishabanath_Temple_Merged_Updated.pdf
└── src/
    ├── css/
    │   ├── main.css            # Temple theme (Terracotta #8B2613 & Gold #D4AF37), responsive grid
    │   └── print.css           # Clean PDF proof printing stylesheet
    └── js/
        ├── data/
        │   ├── en.js           # English strings & notice content
        │   ├── ta.js           # Tamil strings & notice content
        │   ├── hi.js           # Hindi strings & notice content
        │   ├── kn.js           # Kannada strings & notice content
        │   └── proposalData.js # 11-item estimate breakdown & Yathi Nivas specs
        ├── i18n.js             # Language toggle & dynamic DOM text updater
        ├── upi.js              # UPI link generator, preset selector, clipboard copy & toast notifications
        ├── gallery.js          # Touch-friendly lightbox modal for temple photos
        ├── proposal.js         # Interactive estimate table renderer & PDF proof print handler
        └── main.js             # Application initialization
```

---

## 4. Key Components & Implementation Specifications

### A. Header & Sticky Quick-Donate Bar
- **Top Bar**: Sacred Jain symbol (Ahinsa / Swastika motif), Temple Title, Emergency Trustee Contact drawer button, and multi-language pill switcher (`ENG` | `தமிழ்` | `हिंदी` | `ಕನ್ನಡ`).
- **Sticky Mobile Bottom Bar**: Fixed quick action bar visible on mobile devices with a primary golden "⚡ Pay via UPI" button.

### B. Mobile UPI Payment Engine
- **UPI VPA Details**: `f051m01588@indianbk`
- **Payee Name**: `SHRI VIRSHABANATH BHAGAWAN JAIN TEMPLE OTHALAVADI`
- **Amount Chips**:
  - `₹1,008` (Sacred Offering)
  - `₹5,000` (Devotee Contribution)
  - `₹11,000` ⭐ **Stone Plaque Donor Tier** (Name engraved on permanent stone plaque)
  - `₹25,000` (Pillar Sponsor)
  - `₹50,000` (Major Benefactor)
  - `Custom Amount Input`
- **Dynamic URI Generator**: `upi://pay?pa=f051m01588%40indianbk&pn=SHRI%20VIRSHABANATH%20BHAGAWAN%20JAIN%20TEMPLE%20OTHALAVADI&am=${amount}&cu=INR`
- **Copy Buttons**: Copy UPI VPA, Bank Account No (`8350857706`), IFSC (`IDIB000D074`) with animated toast feedback ("Copied to clipboard!").

### C. Multilingual Notice & Proof Section
- Displays full authentic notice text translated into English, Tamil, Hindi, and Kannada.
- Includes tabs to view scanned **Color Notice Photos** and **Black & White Proof Scans**.

### D. Renovation Estimates & PDF Proof Generator
- Displays the 11 key work items from the engineering estimate:
  1. Garbhagriha leaky terrace repair (125 m²) – ₹5,00,000
  2. Moolavar Gopuram repairs & color wash (25 m²) – ₹4,50,000
  3. Temple compound wall raising & barbed fencing (120 m) – ₹3,24,000
  4. Complete temple re-wiring – ₹1,00,000
  5. Lightning arrestor erection (80m) – ₹1,00,000
  6. Yathi Nivas new construction (278.70 m² / 3,000 sq.ft) – ₹84,16,740
  7. Restroom (4 Nos) & Bathroom (4 Nos) construction – ₹3,20,000
  8. Compound wall for Yathi Nivas (200 m) – ₹4,00,000
  9. Footstone / Granite flooring around temple (8,000 sq.ft) – ₹12,00,000
  10. 24 Tirthankara Mandapam construction (24 idols @ ₹30k) – ₹7,20,000
  11. Borewell & overhead water tank with electric motors – ₹2,00,000
  - **Total**: ₹1,27,30,740 (~₹1.27 Crores)
- **PDF Options**:
  - Direct download button for `proposal.pdf`.
  - Print/Export Proof button that triggers browser print mode formatted with `@media print` CSS for saving a official donation summary proof.

### E. Responsive Photo Gallery
- Grid view of all 21 temple images with touch gestures, swipe/click lightbox modal for full-screen view.

### F. Trustee Contact Information
- **President**: D. Dharmapalan (+91 6369346503)
- **Secretary**: N. Ponnappan (+91 9788391633)
- **Treasurer**: P. Rajaperumal (+91 9524026692)
- Bank Branch: Indian Bank, Devikapuram Branch (Code 02322)

---

## 5. Verification & Testing Plan

1. **Mobile Responsiveness**: Test on mobile screen viewports (360px, 390px, 412px) and tablet/desktop layouts.
2. **UPI Deep Linking**: Verify `upi://` link generation with custom and preset amounts.
3. **i18n Testing**: Verify all 4 languages (English, Tamil, Hindi, Kannada) render correctly without text clipping.
4. **PDF Generation & Download**: Verify original PDF download links and web-to-pdf print output layout.
5. **Static Build Check**: Execute `npm run build` and test the static output directory `dist` for Cloudflare deployment readiness.
