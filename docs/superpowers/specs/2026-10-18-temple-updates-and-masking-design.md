# Specification: Temple Website Updates, Revised Estimates, 80G/12A Tax Exemptions & Aadhaar Masking

- **Date**: 2026-10-18
- **Status**: Approved
- **Repository**: `d:\otv_temple_donation\otv-jain-temple-donation`

---

## 1. Overview & Objectives

The 1008 Sri Virshabanath Bhagwan Jain Temple at Othalavadi has achieved significant legal, structural, and civil milestones:
1. **Trust Registration**: Formed under the Indian Trust Act 1882 as **1008 SHRI VIRSHABANATH BHAGAWAN JAIN TEMPLE TRUST, OTHALAVADI** (Reg No. 14/2026, registered 17/06/2026).
2. **Tax Exemptions**: Successfully granted Income Tax Provisional Approvals under:
   - **Section 80G** (URN: `AAATZ4555BF20261`, granting 50% tax deductions to donors)
   - **Section 12A** (URN: `AAATZ4555BE20261`, recognizing public religious/charitable trust status)
   - **PAN**: `AAATZ4555B`
3. **Certified Civil Engineering Estimates**: Detailed estimates prepared by **Er. K. Sundararajan (Licensed Building Surveyor)** totaling **₹76,16,000** (~₹76.16 Lakhs) across 3 sub-projects:
   - Existing Temple Renovation: ₹31,60,000
   - Muni Maharaj Guest House Building: ₹18,61,000
   - Multipurpose Hall Building: ₹25,95,000
4. **Bhattarak Swamiji Blessing Letter**: Official blessing and appeal signed by **Thirumalai Arhatagiri Swasthi Shri Thavalakeerthi Bhattarak Swamiji** and trust office bearers in 4 languages (English, Tamil, Hindi, Kannada).
5. **Temple Works Progress**: Verified on-ground milestones including Bhoomi Pooja (26/08/2026), Borewell & Motor Fitting (Sept 2026), and Ground Levelling (Oct 2026) across 20 cents of donated land.
6. **Privacy & Security Requirement**: Mask Aadhaar card details in the 22-page registered Trust Deed to comply with UIDAI privacy standards (masking first 8 digits as `XXXX-XXXX-####` and blacking out QR codes on ID card copies).

---

## 2. Document Masking & Asset Ingestion Pipeline

### 2.1 Aadhaar Masking Specification (`VIRSHABANATH BHAGAWAN JAIN TRUST OTHALAVADI.pdf`)
* **Input Document**: `D:\Temple_docs\trust_registration\VIRSHABANATH BHAGAWAN JAIN TRUST OTHALAVADI.pdf` (22 pages scanned A4 raster PDF).
* **Target Pages & Elements**:
  * **Page 1**: Redact President L. Dharmabalan's Aadhaar `951274366497` -> overlay opaque background and stamp `XXXX-XXXX-6497`.
  * **Page 2**: Redact 7 Aadhaar numbers (N. Ponnappan `XXXX-XXXX-6830`, P. Rajaperumal `XXXX-XXXX-5087`, P. Rishabadass `XXXX-XXXX-4076`, C. Dharanenthira Kumar `XXXX-XXXX-9304`, U. Rajaperumal `XXXX-XXXX-3548`, A. Ajithbabu `XXXX-XXXX-5176`, A. Vijayakumar `XXXX-XXXX-4111`).
  * **Page 3**: Redact 5 Executive Member Aadhaar numbers (P. Soundhararajan `XXXX-XXXX-2026`, J. Baskaran `XXXX-XXXX-4848`, S. Sekhar `XXXX-XXXX-7830`, D. Saranraj `XXXX-XXXX-5148`, S. Sugan Raj `XXXX-XXXX-7029`).
  * **Page 13**: Redact 2 Witness Aadhaar numbers (Padmaprabha `XXXX-XXXX-7559`, Devakumar `XXXX-XXXX-6829`).
  * **Pages 14–19**: Photo identity card photocopies:
    * Redact the 12-digit Aadhaar numbers to show only `XXXX-XXXX-####`.
    * Blackout the QR codes completely (prevent QR decoding of identity tokens).
    * Redact any visible Virtual ID (VID) or enrollment numbers.
  * **Pages 20–22**: Retain official government registration and seal pages intact (already masked as `xxxxxxxx6497` by the Sub-Registrar).
* **Output Destination**: `public/assets/docs/trust_registration_masked.pdf`.

### 2.2 Asset Synchronization from `D:\Temple_docs`
* **Official Documents** (`public/assets/docs/`):
  * `trust_registration_masked.pdf`
  * `form_12A_provisional_registration.pdf`
  * `form_80G_provisional_approval.pdf`
  * `estimate_1_temple_renovation.pdf`
  * `estimate_2_muni_maharaj_guest_house.pdf`
  * `estimate_3_multipurpose_hall.pdf`
  * `bhattarak_letter_en.pdf`, `bhattarak_letter_ta.pdf`, `bhattarak_letter_hi.pdf`, `bhattarak_letter_kn.pdf`
  * `notice_en.pdf`, `notice_ta.pdf`, `notice_hi.pdf`, `notice_kn.pdf`
* **Progress Images** (`public/assets/images/progress/`):
  * `bhoomi_pooja/` (6 images from `D:\Temple_docs\Temple_works\Bhoomi_pooja`)
  * `borewell/` (3 images from `D:\Temple_docs\Temple_works\borewell_and_motor_fitting`)
  * `ground_levelling/` (3 images from `D:\Temple_docs\Temple_works\ground_levelling_to_start_new_buildings`)

---

## 3. Website Structure & UI Component Design

### 3.1 Hero & Navigation Updates
* Update temple title and metadata to reflect the formally registered trust.
* Display trust registration badge: `Reg No. 14/2026 • Registered Trust • 80G Tax Exemption Available`.

### 3.2 Bank & UPI Donation Updates
* Ensure bank account details match the registered bank account:
  * **Account Name**: `1008 SHRI VIRSHABANATH BHAGAWAN JAIN TEMPLE TRUST, OTHALAVADI`
  * **Account Number**: `8350857706`
  * **Bank**: Indian Bank (Devikapuram Branch, Code 02322)
  * **IFSC**: `IDIB000D074`
  * **UPI ID**: `f051m01588@indianbk`
  * **PAN**: `AAATZ4555B` (with copy action)

### 3.3 New Section: Registered Trust & 80G / 12A Tax Exemptions
* **Tax Benefit Callout**:
  * "Donations are eligible for 50% Tax Exemption under Section 80G of the Indian Income Tax Act."
* **Credentials Card**:
  * Trust Reg No: `14/2026` (Registered on 17/06/2026 at Chetpet/Polur Sub-Registrar)
  * 80G Provisional Approval URN: `AAATZ4555BF20261` (TY 2026-27 to 2028-29)
  * 12A Provisional Registration URN: `AAATZ4555BE20261` (TY 2026-27 to 2028-29)
* **Official Document Downloads**:
  * 📄 Download 80G Certificate (PDF)
  * 📄 Download 12A Certificate (PDF)
  * 📄 Download Registered Trust Deed (Aadhaar Secured PDF)

### 3.4 Section: Pontiff Blessing (Arihantagiri Mutt Bhattarak Letter)
* **Spiritual Guidance**:
  * Excerpt from the official blessing letter of **Bhattarak Chintamani Swasthi Shri Dhavalakeerthi Bhattacharya Swamiji** (Arihantagiri Jain Mutt, Thirumalai).
  * Dynamic localization for English, Tamil, Hindi, and Kannada.
  * Download button for the complete 2-page blessing letter in the selected language.

### 3.5 Revised Estimates Section (Grand Total: ₹76,16,000)
* **Grand Total Banner**:
  * Certified Estimate: **₹76,16,000 (~₹76.16 Lakhs)** by Er. K. Sundararajan (Licensed Building Surveyor).
* **3 Modular Interactive Cards / Accordions**:
  1. **Existing Temple Renovation (₹31,60,000)**:
     * Compound wall (700m): ₹10,90,000
     * Main Temple Works: ₹5,03,000
     * Gopuram Construction: ₹3,56,000
     * Weathering Course Replacement: ₹2,32,000
     * Marble Cut Stone Flooring for Outside Pragaram: ₹8,96,000
     * Front Kodungai Construction: ₹83,000
     * Download Estimate 1 PDF
  2. **Muni Maharaj Guest House Building (₹18,61,000)**:
     * Maharaj Room (12' x 12'), Mathaji Room (11'3" x 12'), Guest Room (10' x 9') with attached bathrooms
     * Prochana (Discourse) Hall (44' x 50' GI sheet roof)
     * Verandah & Kitchen (8' x 12')
     * Download Estimate 2 PDF & Floor Plan
  3. **Multipurpose Hall Building (₹25,95,000)**:
     * 2,200 sq.ft hall (50' x 44')
     * 21 RCC columns, plinth beam, and brickwork
     * High-grade Tata roof sheets on heavy-duty steel truss
     * Download Estimate 3 PDF
* **Donor Sponsorship Callout**:
  * Specific room or package sponsorship, and stone plaque inscriptions for contributions of ₹11,000 and above.

### 3.6 New Section: Temple Works Progress Gallery
* **Timeline Milestones**:
  * **Milestone 1: Bhoomi Pooja (26-08-2026)** — 6 photos with Swasthi Shri Thavalakeerthi Swamiji.
  * **Milestone 2: Borewell & Motor Fitting (Sept 2026)** — 3 photos showing borewell drilling, casing, and water connection.
  * **Milestone 3: Ground Levelling for New Buildings (Oct 2026)** — 3 photos showing JCB levelling the 20 cents donated land.
* **Filter Chips**:
  * `All Works (12)`, `Bhoomi Pooja`, `Borewell`, `Ground Levelling`.
* **Interactive Lightbox Integration**:
  * Full-resolution view with captions and dates when clicked.

### 3.7 Localization (i18n) Updates
* Update `en.js`, `ta.js`, `hi.js`, and `kn.js` with keys for:
  * 80G/12A tax exemption banner and details
  * Trust registration credentials
  * Revised estimate headings and item labels
  * Bhattarak Swamiji blessing summary
  * Works progress gallery headings and milestone captions
  * Notice text refreshed across all 4 languages

---

## 4. Verification & Testing Criteria
1. **Masking Integrity**: Verify that all 13 Aadhaar numbers in deed text and all Aadhaar card images on pages 14–19 are properly masked/redacted without leaking personal identifiers.
2. **Build Verification**: Run `npm run build` with Vite to ensure 0 build errors or broken links.
3. **Responsive UI**: Check mobile and desktop rendering of the new sections (tax exemption, tabbed estimates, progress gallery).
4. **Localization**: Confirm switching between EN, TA, HI, KN updates all new text, notice text, and Bhattarak letter excerpts accurately.
