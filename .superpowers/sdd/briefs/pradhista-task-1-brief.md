# Task 1 Brief: Data Architecture & 4-Language Localization

## Objective
Update `src/js/data/proposalData.js` and all 4 language dictionaries (`en.js`, `ta.js`, `hi.js`, `kn.js`) to support Package 4 (5-Day Panchakalyana Pradhista Mahotsava Estimate, ₹50 Lakhs) and recalculate the combined Grand Project Budget to **₹1,26,16,000 (~₹1.26 Crores)** alongside the certified civil works (₹76,16,000).

## Target Files
- `src/js/data/proposalData.js`
- `src/js/data/en.js`
- `src/js/data/ta.js`
- `src/js/data/hi.js`
- `src/js/data/kn.js`
- `scripts/verify_i18n.mjs`

---

## Deliverables

### 1. `src/js/data/proposalData.js`
- Set:
  - `grandTotal`: `12616000`
  - `formattedGrandTotal`: `"₹1,26,16,000"`
  - `totalEstimate`: `12616000`
  - `formattedTotal`: `"₹1,26,16,000"`
  - `civilSubtotal`: `7616000`
  - `formattedCivilSubtotal`: `"₹76,16,000"`
  - `pradhistaSubtotal`: `5000000`
  - `formattedPradhistaSubtotal`: `"₹50,00,000"`
- Append Package 4 to `packages`:
  ```javascript
  {
    id: "pkg_4",
    titleKey: "pkg_4_title",
    subtitleKey: "pkg_4_subtitle",
    badgeKey: "pkg_4_badge",
    total: 5000000,
    formattedTotal: "₹50,00,000",
    isCeremonialEstimate: true,
    items: [
      {
        id: 1,
        descKey: "pkg_4_item_1",
        detail: "5 Days Continuous Annadanam & devotee arrangements",
        qty: "5 Days",
        rate: "Estimate",
        amount: 3000000,
        formattedAmount: "₹30,00,000"
      },
      {
        id: 2,
        descKey: "pkg_4_item_2",
        detail: "Vidhan, Homam, Pooja Sacred Items & Samagri",
        qty: "Pooja Samagri",
        rate: "Estimate",
        amount: 1000000,
        formattedAmount: "₹10,00,000"
      },
      {
        id: 3,
        descKey: "pkg_4_item_3",
        detail: "Pandhal, Stage, Lighting, Sound System, Generator Rent & General Logistics",
        qty: "Event Setup",
        rate: "Estimate",
        amount: 1000000,
        formattedAmount: "₹10,00,000"
      }
    ]
  }
  ```
- Also append item to `items` array for backward compatibility:
  ```javascript
  { id: 9, descKey: "pkg_4_title", qty: "Panchakalyana Pradhista", rate: "5 Days Estimate", amount: 5000000, formattedAmount: "₹50,00,000" }
  ```

---

### 2. Localization Keys (11 keys to add symmetrically across EN, TA, HI, KN)

#### English (`src/js/data/en.js`):
```javascript
  pkg_4_title: "Panchakalyana Pradhista Mahotsava (5-Day Sacred Festival)",
  pkg_4_subtitle: "Estimated expenditure for 5-day continuous Annadanam, Vidhan, sacred pooja samagri, pandhal, lighting & logistics",
  pkg_4_badge: "🪔 5-Day Sacred Festival Estimate",
  pkg_4_item_1: "Food for 5 Days (Continuous Annadanam for Devotees) & Pradhista Arrangements",
  pkg_4_item_2: "Vidhan, Homam, Pooja Sacred Items & Samagri",
  pkg_4_item_3: "Pandhal, Stage, Lighting, Sound System, Generator Rent & General Logistics",
  grand_project_budget_label: "COMBINED TOTAL PROJECT BUDGET (RENOVATION + PRADHISTA):",
  civil_works_subtotal_label: "Certified Civil Engineering Works Subtotal (Packages 1-3):",
  pradhista_subtotal_label: "Panchakalyana Pradhista 5-Day Estimate Subtotal:",
  btn_view_pdf: "👁️ View Document",
  pdf_modal_fallback_text: "Having trouble viewing? Open directly in new tab or download using the button above.",
```

#### Tamil (`src/js/data/ta.js`):
```javascript
  pkg_4_title: "5 நாட்கள் பஞ்சகல்யாண பிரதிஷ்டா பெருவிழா",
  pkg_4_subtitle: "5 நாள் அன்னதானம், விதான், பூஜை திரவியங்கள், பந்தல், மின் அலங்காரம் மற்றும் மேடை அமைப்புகள் உத்தேச மதிப்பீடு",
  pkg_4_badge: "🪔 5-நாள் பெருவிழா உத்தேச மதிப்பீடு",
  pkg_4_item_1: "5 நாட்களுக்கான அன்னதானம் மற்றும் பிரதிஷ்டா உணவு உபசரிப்பு ஏற்பாடுகள்",
  pkg_4_item_2: "விதான், ஹோமம், விசேஷ பூஜை திரவியங்கள் மற்றும் மங்கலப் பொருட்கள்",
  pkg_4_item_3: "பந்தல், மேடை, அலங்கார விளக்குகள், ஒலிபெருக்கி, ஜெனரேட்டர் வாடகை மற்றும் இதர பொது ஏற்பாடுகள்",
  grand_project_budget_label: "மொத்த திருப்பணி மற்றும் பஞ்சகல்யாண பிரதிஷ்டா திட்ட பட்ஜெட்:",
  civil_works_subtotal_label: "பொறியாளர் சான்றளித்த கட்டுமான பணிகள் கூட்டுத்தொகை (பிரிவு 1-3):",
  pradhista_subtotal_label: "பஞ்சகல்யாண பிரதிஷ்டா 5-நாள் உத்தேச கூட்டுத்தொகை:",
  btn_view_pdf: "👁️ ஆவணத்தை காண்க",
  pdf_modal_fallback_text: "திரையில் பார்க்க இயலவில்லையா? புதிய பக்கத்தில் நேரடியாக திறக்க அல்லது மேலே உள்ள பட்டனைப் பயன்படுத்தி பதிவிறக்கவும்.",
```

#### Hindi (`src/js/data/hi.js`):
```javascript
  pkg_4_title: "पंचकल्याणक प्रतिष्ठा महोत्सव (5 दिवसीय पावन समारोह)",
  pkg_4_subtitle: "5 दिवसीय निरंतर अन्नदान, विधान, पावन पूजन सामग्री, शामियाना, विद्युत सज्जा एवं व्यवस्था व्यय का अनुमान",
  pkg_4_badge: "🪔 5-दिवसीय पावन महोत्सव अनुमान",
  pkg_4_item_1: "5 दिनों हेतु अन्नदान (भक्तों के लिए निरंतर भोजन व्यवस्था) एवं प्रतिष्ठा प्रबंध",
  pkg_4_item_2: "विधान, होम, पूजन सामग्री एवं विशेष पावन द्रव्य",
  pkg_4_item_3: "पंडाल, मंच, प्रकाश व्यवस्था, ध्वनि यंत्र, जनरेटर किराया एवं समस्त व्यवस्थाएं",
  grand_project_budget_label: "कुल जीर्णोद्धार एवं पंचकल्याणक प्रतिष्ठा परियोजना बजट:",
  civil_works_subtotal_label: "प्रमाणित सिविल निर्माण कार्य उप-योग (पैकेज 1-3):",
  pradhista_subtotal_label: "पंचकल्याणक प्रतिष्ठा 5-दिवसीय अनुमान उप-योग:",
  btn_view_pdf: "👁️ दस्तावेज़ देखें",
  pdf_modal_fallback_text: "देखने में समस्या हो रही है? सीधे नए टैब में खोलें या ऊपर दिए गए बटन से डाउनलोड करें।",
```

#### Kannada (`src/js/data/kn.js`):
```javascript
  pkg_4_title: "ಪಂಚಕಲ್ಯಾಣ ಪ್ರತಿಷ್ಠಾ ಮಹೋತ್ಸವ (5 ದಿನಗಳ ಪವಿತ್ರ ಸಮಾರಂಭ)",
  pkg_4_subtitle: "5 ದಿನಗಳ ನಿರಂತರ ಅನ್ನದಾನ, ವಿಧಾನ, ಪೂಜಾ ಸಾಮಗ್ರಿಗಳು, ಪೆಂಡಾಲ್, ವಿದ್ಯುತ್ ದೀಪಾಲಂಕಾರ ಮತ್ತು ವ್ಯವಸ್ಥೆಗಳ ಅಂದಾಜು",
  pkg_4_badge: "🪔 5-ದಿನಗಳ ಪವಿತ್ರ ಮಹೋತ್ಸವ ಅಂದಾಜು",
  pkg_4_item_1: "5 ದಿನಗಳ ಅನ್ನದಾನ (ಭಕ್ತರಿಗೆ ನಿರಂತರ ಊಟೋಪಹಾರ) ಮತ್ತು ಪ್ರತಿಷ್ಠಾ ವ್ಯವಸ್ಥೆಗಳು",
  pkg_4_item_2: "ವಿಧಾನ, ಹೋಮ, ಪೂಜಾ ಸಾಮಗ್ರಿಗಳು ಮತ್ತು ವಿಶೇಷ ಪವಿತ್ರ ದ್ರವ್ಯಗಳು",
  pkg_4_item_3: "ಪೆಂಡಾಲ್, ವೇದಿಕೆ, ದೀಪಾಲಂಕಾರ, ಧ್ವನಿವರ್ಧಕ, ಜನರೇಟರ್ ಬಾಡಿಗೆ ಮತ್ತು ಸಾಮಾನ್ಯ ವ್ಯವಸ್ಥೆಗಳು",
  grand_project_budget_label: "ಒಟ್ಟು ಜೀರ್ಣೋದ್ಧಾರ ಮತ್ತು ಪಂಚಕಲ್ಯಾಣ ಪ್ರತಿಷ್ಠಾ ಯೋಜನಾ ಬಜೆಟ್:",
  civil_works_subtotal_label: "ಪ್ರಮಾಣೀಕೃತ ಸಿವಿಲ್ ಕಾಮಗಾರಿಗಳ ಉಪ-ಮೊತ್ತ (ಪ್ಯಾಕೇಜ್ 1-3):",
  pradhista_subtotal_label: "ಪಂಚಕಲ್ಯಾಣ ಪ್ರತಿಷ್ಠಾ 5-ದಿನಗಳ ಅಂದಾಜು ಉಪ-ಮೊತ್ತ:",
  btn_view_pdf: "👁️ ದಾಖಲೆಯನ್ನು ವೀಕ್ಷಿಸಿ",
  pdf_modal_fallback_text: "ವೀಕ್ಷಿಸಲು ತೊಂದರೆಯಾಗುತ್ತಿದೆಯೇ? ನೇರವಾಗಿ ಹೊಸ ಟ್ಯಾಬ್‌ನಲ್ಲಿ ತೆರೆಯಿರಿ ಅಥವಾ ಮೇಲಿನ ಬಟನ್ ಬಳಸಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.",
```

---

### 3. Update `scripts/verify_i18n.mjs`
- Update package validation:
  - Expect `proposalData.grandTotal === 12616000`
  - Expect `proposalData.formattedGrandTotal === "₹1,26,16,000"`
  - Expect `proposalData.packages.length === 4`
  - Check Package 4 total is 5000000 and matches sum of its 3 items (3000000 + 1000000 + 1000000)
  - Verify key count (204 keys per language).
  - Add `Group [Panchakalyana Pradhista & PDF Viewer]` with the 11 new keys.

---

## Verification
- Run `node scripts/verify_i18n.mjs` — all checks must pass with 100% key symmetry and data integrity.

## Git Commit
Commit message:
`feat(data): add panchakalyana pradhista estimate and localization keys across 4 languages`
