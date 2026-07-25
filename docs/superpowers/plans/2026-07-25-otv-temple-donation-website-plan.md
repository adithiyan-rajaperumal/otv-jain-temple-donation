# OTV Jain Temple Donation Website Updates Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate Panchakalyana Pradhista into temple appeal content, make Tamil the default site language, update Bhattarak Swamiji/Mutt mapping (Option A), and fix mobile layout & button text alignment issues.

**Architecture:** Update multi-lingual datasets (`ta.js`, `en.js`, `hi.js`, `kn.js`), set default language in `i18n.js` and `main.js` to Tamil (`ta`), update HTML meta/structure fallbacks, and enhance CSS navbar layout and button typography alignment rules in `main.css`.

**Tech Stack:** HTML5, Vanilla JavaScript (ES modules), CSS3 (Flexbox/Grid, CSS Variables, Fluid Typography).

## Global Constraints
- Target Language Default: Tamil (`ta`).
- Option A Bhattarak Mapping: Swasti Sri Dhavalakeerthi Bhattaraka Swamiji (Arihantagiri Jain Mutt) placed 1st; Swasti Sri Lakshmisena Bhattaraka Swamiji (Mel Sithamur Jain Mutt) placed 2nd.
- Scope Scope: Renovation (Jirnoddhara), Tyagi Nivas construction, and Panchakalyana Pradhista.
- Mobile First: Zero horizontal overflow on 320px–400px viewports; all buttons touch-friendly with flex-centered text alignment.

---

### Task 1: Update Language Datasets (`ta.js`, `en.js`, `hi.js`, `kn.js`)

**Files:**
- Modify: `d:/otv_temple_donation/otv-jain-temple-donation/src/js/data/ta.js:1-65`
- Modify: `d:/otv_temple_donation/otv-jain-temple-donation/src/js/data/en.js:1-65`
- Modify: `d:/otv_temple_donation/otv-jain-temple-donation/src/js/data/hi.js:1-60`
- Modify: `d:/otv_temple_donation/otv-jain-temple-donation/src/js/data/kn.js:1-60`

**Interfaces:**
- Consumes: Existing translation key structure consumed by `i18n.js`.
- Produces: Updated translations for `hero_heading`, `hero_blessing`, and `notice_body` reflecting Panchakalyan and Option A Bhattarak mapping.

- [ ] **Step 1: Update Tamil translations in `src/js/data/ta.js`**

```javascript
export const ta = {
  temple_title: "1008 ஸ்ரீ விருஷபநாத ஜிநாலயம்",
  temple_location: "ஓதலவாடி, திருவண்ணாமலை மாவட்டம், தமிழ்நாடு",
  hero_heading: "திருக்கோயில் திருப்பணி, தியாகி நிவாஸ் புதிய கட்டிடம் மற்றும் பஞ்சகல்யாண பிரதிஷ்டை நிதி உதவி வேண்டுகோள்",
  hero_blessing: "அரஹந்தகிரி ஜைன மடம் ஸ்வஸ்திஸ்ரீ தவளகீர்த்தி பட்டாரக சுவாமிகள் & மேல் சித்தாமூர் ஜைன மடம் ஸ்வஸ்திஸ்ரீ லட்சுமிசேன பட்டாரக சுவாமிகள் ஆகிய இருமடாதிபதிகளின் நல்வழிகாட்டுதலுடன்",
  history_brief: "10-ஆம் நூற்றாண்டுக்கும் முற்பட்ட வரலாற்று சிறப்புமிக்க சமண ஸ்தலம். ஓலைச்சுவடி எழுத்தாளர்கள் வாழ்ந்த 'ஓலைப்பாடி' தலம். சோழ மன்னன் ஓதலன் அருள்மிகு ஆதிநாதரை 'அணியாத அழகர்' என போற்றி கல்வெட்டுகளையும் பள்ளிச்சந்த கொடைகளையும் வழங்கியுள்ளார்.",
  btn_donate_now: "⚡ UPI செயலி வழியாக நன்கொடை அளிக்க",
  btn_view_proposal: "📋 திருப்பணி திட்டமதிப்பீடு காண்க",
  donation_title: "திருப்பணிக்கு உங்கள் நன்நன்கொடையை வழங்கிடுக",
  select_amount_label: "நன்கொடை தொகையை தேர்ந்தெடுக்கவும்:",
  plaque_tier: "கல்வெட்டு நன்கொடையாளர் பிரிவு",
  bank_details_heading: "வங்கி கணக்கு விவரங்கள் (Direct Bank Transfer)",
  acc_name_label: "கணக்கு பெயர்:",
  acc_no_label: "கணக்கு எண்:",
  bank_name_label: "வங்கி பெயர்:",
  ifsc_label: "IFSC குறியீடு:",
  btn_copy: "பிரதி எடு (Copy)",
  
  notice_title: "ஓதலவாடி ஷ்ராவக - ஷ்ராவிகைகளின் திருப்பணி அழைப்பு",
  proposal_title: "திருப்பணி திட்ட மதிப்பீடு மற்றும் தியாகி நிவாஸ் வரைபடம்",
  gallery_title: "திருக்கோயில் புகைப்படத் தொகுப்பு",
  contact_title: "நிர்வாகிகள் தொடர்பு மற்றும் அமைவிடம்",
  
  role_president: "தலைவர்",
  role_secretary: "செயலாளர்",
  role_treasurer: "பொருளாளர்",
  btn_call: "📞 அழைக்க",
  
  routes_heading: "பயண வழிகள் மற்றும் அருகிலுள்ள தொலைவு",
  routes_body: "• ஆரணி: 18 கி.மீ | • சேத்பட்டு: 19 கி.மீ | • வந்தவாசி: 48 கி.மீ | • திருவண்ணாமலை: 55 கி.மீ | • திண்டிவனம்: 71 கி.மீ | • விழுப்புரம்: 85 கி.மீ",
  
  location_heading: "திருக்கோயில் அமைவிடம் & வழிகாட்டுதல்",
  location_body: "1008 ஸ்ரீ விருஷபநாத பகவான் ஜைன கோவில், ஓதலவாடி கிராமம், சேத்பட்டு வட்டம், திருவண்ணாமலை மாவட்டம், தமிழ்நாடு – 632326 (GPS: 12.54798, 79.24764)",
  btn_open_maps: "📍 கூகுள் மேப்பில் வழிகாட்டுதல் பெறுக",

  // Table Headers
  th_description: "திருப்பணி விவரம்",
  th_qty: "அளவு / பரப்பளவு",
  th_rate: "அலகு விலை",
  th_amount: "மொத்த தொகை",
  total_estimated_amount: "மொத்த கணக்கிடப்பட்ட திருப்பணி செலவு:",

  // Estimate Items
  est_item_1: "கர்ப்பகிருஹத்தின் முன் உள்ள மண்டபத்தின் கசியும் கூரையை சீரமைத்தல் (125 m²)",
  est_item_2: "மூலவர் கோபுரம் மற்றும் விமான சீரமைப்பு, வண்ணம்பூசுதல் (25 m²)",
  est_item_3: "திருக்கோயில் சுற்றுச்சுவரை 2 அடி உயர்த்திக் கட்டி கம்பிவேலி அமைத்தல் (120 m)",
  est_item_4: "திருக்கோயில் முழுவதுமான புதிய மின்சார வயரிங் பணிகள்",
  est_item_5: "மூலவர் கோபுரத்தின் மேல் புதிய மின்னல் தாங்கி (Lightning Arrestor) அமைத்தல்",
  est_item_6: "தியாகி நிவாஸ் (யதி நிவாஸ்) புதிய கட்டடம் கட்டுதல் (3000 சதுர அடி)",
  est_item_7: "புதிய கழிவறைகள் (4) மற்றும் குளியலறைகள் (4) கட்டுதல்",
  est_item_8: "தியாகி நிவாஸ் கட்டிடத்தை சுற்றி புதிய சுற்றுச்சுவர் அமைத்தல் (200m)",
  est_item_9: "திருக்கோயில் பிரகாரத்தை சுற்றி கருங்கல் / கிரானைட் பாதை அமைத்தல் (8000 சதுர அடி)",
  est_item_10: "24 தீர்த்தங்கரர் சிலைகள் மற்றும் அதற்கான மண்டபம் நிறுவுதல்",
  est_item_11: "ஆழ்துளை கிணறு (Borewell) மற்றும் மேல்நிலை நீர்த்தேக்க தொட்டி அமைத்தல்",

  // Notice body
  notice_body: `அனைத்து ஷ்ராவக - ஷ்ராவிகைகளுக்கும், கிராம பொதுமக்களுக்கும் வணக்கம்.

திருவண்ணாமலை மாவட்டம், சேத்பட்டு வட்டம், ஓதலவாடி கிராமத்தில் எழுந்தருளியுள்ள ஸ்ரீ 1008 விருஷபநாத ஜிநாலயத்தின் முழுமையான சீரமைப்பு, ஜீர்ணோத்தார திருப்பணிகள், தியாகி நிவாஸ் புதிய கட்டிட கட்டுமான பணிகள் மற்றும் அதனைத் தொடர்ந்து பஞ்சகல்யாண பிரதிஷ்டை மகோற்சவத்தை, அரஹந்தகிரி ஜைன மடம் ஸ்வஸ்திஸ்ரீ தவளகீர்த்தி பட்டாரக சுவாமிகள் மற்றும் மேல் சித்தாமூர் ஜைன மடம் ஸ்வஸ்திஸ்ரீ லட்சுமிசேன பட்டாரக சுவாமிகள் அவர்களின் நல்வழிகாட்டுதலின்படி நிறைவேற்ற ஏகமனதாக தீர்மானிக்கப்பட்டுள்ளது.

இத்திருக்கோயில் 10-ஆம் நூற்றாண்டுக்கும் முற்பட்டது. சோழ மன்னன் ஓதலன் மற்றும் சம்புவராய மன்னர்கள் இக்கோயிலுக்கு பள்ளிச்சந்த நிலக்கொடைகளை வழங்கி "ஸ்வஸ்திஸ்ரீ அணியாத அழகர் ஜிநாலயம்" என கல்வெட்டுகளில் பொறித்துள்ளனர்.

ரூ. 11,000/- அல்லது அதற்கு மேல் ரொக்கமாகவோ அல்லது பொருட்களாகவோ நன்கொடை அளிப்பவர்களின் பெயர்கள் திருக்கோயில் வளாகத்தில் கல்வெட்டில் நிரந்தரமாக பொறிக்கப்படும்.`
};
```

- [ ] **Step 2: Update English translations in `src/js/data/en.js`**

```javascript
export const en = {
  temple_title: "1008 Sri Virshabanath Jinalayam",
  temple_location: "Othalavadi, Tiruvannamalai Dist, Tamil Nadu",
  hero_heading: "Sacred Renovation, Tyagi Niwas Construction & Pancha Kalyana Pradhista Appeal",
  hero_blessing: "Under the benign guidance of Swasti Sri Dhavalakeerthi Bhattaraka Swamiji (Arihantagiri Jain Mutt) & Swasti Sri Lakshmisena Bhattaraka Swamiji (Mel Sithamur Jain Mutt)",
  history_brief: "An ancient 10th-century Jain pilgrimage shrine historically known as 'Olaipadi' and patronized by Chola King Othalan, who praised Lord Adinathar as 'Aniyatha Azhagar'. Inscriptions confirm Pallichandam land gifts granted to this Jinalayam.",
  btn_donate_now: "⚡ Pay via Any UPI App",
  btn_view_proposal: "📋 View Renovation Estimate",
  donation_title: "Contribute towards Temple Renovation",
  select_amount_label: "Choose Donation Amount:",
  plaque_tier: "Stone Plaque Donor Tier",
  bank_details_heading: "Direct Bank Transfer Details",
  acc_name_label: "Account Name:",
  acc_no_label: "Account No:",
  bank_name_label: "Bank Name:",
  ifsc_label: "IFSC Code:",
  btn_copy: "Copy",
  
  notice_title: "Sacred Appeal Notice from Shravakas & Shravikas",
  proposal_title: "Technical Work Estimates & Yathi Nivas Plan",
  gallery_title: "Temple Photo Gallery",
  contact_title: "Trustee Contacts & Location",
  
  role_president: "President",
  role_secretary: "Secretary",
  role_treasurer: "Treasurer",
  btn_call: "📞 Call",
  
  routes_heading: "Travel Routes & Nearby Distances",
  routes_body: "• Arni: 18 km | • Chetpet: 19 km | • Vandavasi: 48 km | • Tiruvannamalai: 55 km | • Tindivanam: 71 km | • Villupuram: 85 km",
  
  location_heading: "Temple Location & Directions",
  location_body: "1008 Sri Vrishabanath Bhagwan Jain Temple, Othalavadi Village, Chetpet Taluk, Tiruvannamalai District, Tamil Nadu – 632326 (GPS: 12.54798, 79.24764)",
  btn_open_maps: "📍 Open Location in Google Maps",
  
  // Table Headers
  th_description: "Description of Work",
  th_qty: "Quantity / Area",
  th_rate: "Unit Rate",
  th_amount: "Total Amount",
  total_estimated_amount: "TOTAL ESTIMATED BUDGET:",

  // Estimate Items
  est_item_1: "Repairs to existing leaky terrace in front of Garbhagriha Mandapam",
  est_item_2: "Repairs & color wash to Moolavar Gopuram (Inside Temple)",
  est_item_3: "Repairs & height extension (2 ft) of compound wall with barbed fencing",
  est_item_4: "Complete electrical rewiring of the entire Jinalayam",
  est_item_5: "Erection of new lightning arrestor (80m) above Moolavar Gopuram",
  est_item_6: "New construction of Yathi Nivas (Tyagi Niwas) building (3000 sq.ft)",
  est_item_7: "New construction of Restrooms (4 Nos) & Bathrooms (4 Nos)",
  est_item_8: "Construction of surrounding compound wall for Yathi Nivas (200m)",
  est_item_9: "Stone & granite slab pathway flooring around the temple (8000 sq.ft)",
  est_item_10: "Construction of Mandapam with idols for 24 Tirthankaras",
  est_item_11: "Borewell installation & overhead water storage tank with motors",

  // Notice body
  notice_body: `To all Shravakas, Shravikas, and Dharma-loving Devotees,

Under the divine guidance of Swasti Sri Dhavalakeerthi Bhattaraka Swamiji (Arihantagiri Jain Mutt) and Swasti Sri Lakshmisena Bhattaraka Swamiji (Mel Sithamur Jain Mutt), the village public of Othalavadi along with all Shravakas and Shravikas have unanimously resolved to execute the complete renovation and restoration of 1008 Sri Virshabanath Jinalaya, construct a new Tyagi Niwas building, and perform the Pancha Kalyana Pradhista Mahotsava following the renovation.

The antiquity of the Othalavadi Jinalaya dates back prior to the 10th century AD. Inscriptions reveal that Chola King Othalan and Mallinatha Sambuvarayar kings granted 'Pallichandam' (tax-free land gifts) to this temple, extolling the main deity as "Swasti Sri Aniyadha Azhagar Jinalayam".

Donors contributing ₹11,000/- or above in cash or materials will have their names permanently engraved on a stone plaque in the temple premises. Devotees interested in bearing the entire cost of a specific work item are also warmly welcomed.`
};
```

- [ ] **Step 3: Update Hindi and Kannada translations in `src/js/data/hi.js` and `src/js/data/kn.js`**

In `hi.js`:
- `hero_heading`: `"मंदिर जीर्णोद्धार, त्यागी निवास निर्माण एवं पंचकल्याणक प्रतिष्ठा हेतु पावन अपील"`
- `hero_blessing`: `"अरहंतगिरि जैन मठ स्वस्ति श्री धवलकीर्ति भट्टारक स्वामीजी एवं मेलसित्तामूर जैन मठ स्वस्ति श्री लक्ष्मीसेन भट्टारक स्वामीजी के पावन मार्गदर्शन में"`
- `notice_body`: Update with Swasti Sri Dhavalakeerthi Bhattaraka Swamiji (Arihantagiri Jain Mutt) & Swasti Sri Lakshmisena Bhattaraka Swamiji (Mel Sithamur Jain Mutt) and Panchakalyanak Pratishta.

In `kn.js`:
- `hero_heading`: `"ದೇವಾಲಯ ಜೀರ್ಣೋದ್ಧಾರ, ತ್ಯಾಗಿ ನಿವಾಸ ನಿರ್ಮಾಣ ಹಾಗೂ ಪಂಚಕಲ್ಯಾಣ ಪ್ರತಿಷ್ಠಾಪನೆಯ ಪವಿತ್ರ ಮನವಿ"`
- `hero_blessing`: `"ಅರಿಹಂತಗಿರಿ ಜೈನ್ ಮಠದ ಸ್ವಸ್ತಿ ಶ್ರೀ ಧವಳಕೀರ್ತಿ ಭಟ್ಟಾರಕ ಸ್ವಾಮೀಜಿ ಮತ್ತು ಮೇಲ್ ಸಿತ್ತಾಮೂರ್ ಜೈನ್ ಮಠದ ಸ್ವಸ್ತಿ ಶ್ರೀ ಲಕ್ಷ್ಮೀಸೇನ ಭಟ್ಟಾರಕ ಸ್ವಾಮೀಜಿ ಅವರ ದಿವ್ಯ ಮಾರ್ಗದರ್ಶನದಲ್ಲಿ"`
- `notice_body`: Update with Dhavalakeerthi Swamiji (Arihantagiri) & Lakshmisena Swamiji (Mel Sithamur) and Panchakalyana Pradhista.

- [ ] **Step 4: Commit translation changes**

```bash
git add src/js/data/ta.js src/js/data/en.js src/js/data/hi.js src/js/data/kn.js
git commit -m "feat: update translations for Panchakalyanam, default Tamil, and Option A Bhattarak mapping"
```

---

### Task 2: Configure Default Language to Tamil (`ta`) in JavaScript & HTML

**Files:**
- Modify: `d:/otv_temple_donation/otv-jain-temple-donation/src/js/i18n.js:7`
- Modify: `d:/otv_temple_donation/otv-jain-temple-donation/src/js/main.js:40`
- Modify: `d:/otv_temple_donation/otv-jain-temple-donation/index.html:2, 55-66, 78-79`

**Interfaces:**
- Consumes: `setLanguage('ta')` function from `i18n.js`.
- Produces: Default site load in Tamil with Tamil active button pill state.

- [ ] **Step 1: Set `currentLang = 'ta'` in `src/js/i18n.js`**

In `src/js/i18n.js`:
Change line 7 from `let currentLang = 'en';` to `let currentLang = 'ta';`.

- [ ] **Step 2: Initialize Tamil on load in `src/js/main.js`**

In `src/js/main.js`:
Change `setLanguage('en');` on line 40 to `setLanguage('ta');`.

- [ ] **Step 3: Update `index.html` default lang attributes and active button state**

In `index.html`:
- Change `<html lang="en">` to `<html lang="ta">`.
- In language selector, change active class from ENG to Tamil:
  ```html
  <div class="language-selector">
    <button class="lang-btn" data-lang="en">ENG</button>
    <button class="lang-btn active" data-lang="ta">தமிழ்</button>
    <button class="lang-btn" data-lang="hi">हिंदी</button>
    <button class="lang-btn" data-lang="kn">ಕನ್ನಡ</button>
  </div>
  ```
- Update SEO meta description and title to highlight Pancha Kalyana Pradhista in Tamil & English.

- [ ] **Step 4: Commit default language changes**

```bash
git add src/js/i18n.js src/js/main.js index.html
git commit -m "feat: set default site language to Tamil (ta)"
```

---

### Task 3: Mobile-First Responsive CSS & Button Alignment Overhaul

**Files:**
- Modify: `d:/otv_temple_donation/otv-jain-temple-donation/src/css/main.css:42-165, 258-344`

**Interfaces:**
- Consumes: DOM classes `.navbar`, `.site-title`, `.btn`, `.btn-upi-pay`, `.chip`, `.hero-card`.
- Produces: Responsive mobile layout with zero overflow bleed and perfectly aligned Tamil button text.

- [ ] **Step 1: Refactor Header Navbar CSS in `src/css/main.css`**

Update `.navbar`, `.header-content`, `.site-title`, and `.language-selector` CSS:

```css
/* Navbar Mobile-First Fixes */
.navbar {
  background: var(--primary-terracotta);
  color: white;
  padding: 10px 14px;
  position: sticky;
  top: 0;
  z-index: 900;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  width: 100%;
  box-sizing: border-box;
}

.header-content {
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  box-sizing: border-box;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0; /* Prevents flex children from overflowing */
}

.site-title {
  margin: 0;
  font-size: clamp(1rem, 4vw, 1.2rem);
  font-weight: 700;
  color: var(--accent-gold-bright);
  line-height: 1.3;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.site-subtitle {
  font-size: 0.76rem;
  opacity: 0.92;
  display: block;
  margin-top: 2px;
}

@media (max-width: 640px) {
  .header-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 10px;
  }
  .logo {
    flex-direction: column;
    text-align: center;
    width: 100%;
  }
  .language-selector {
    width: 100%;
    max-width: 360px;
    justify-content: space-around;
    margin: 4px auto 0 auto;
  }
}
```

- [ ] **Step 2: Refactor Button Alignment & Typography CSS in `src/css/main.css`**

Update `.btn`, `.btn-upi-pay`, `.preset-chips`, and `.chip`:

```css
/* Buttons System */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 8px;
  padding: 10px 18px;
  min-height: 44px; /* Touch friendly */
  border-radius: 30px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s ease;
  font-size: 0.92rem;
  line-height: 1.35;
  box-sizing: border-box;
  word-break: normal;
}

.btn-upi-pay {
  background: linear-gradient(135deg, var(--primary-terracotta) 0%, #A32E18 100%);
  color: white;
  padding: 12px 18px;
  min-height: 52px;
  border-radius: 30px;
  font-weight: 700;
  font-size: 1rem;
  text-align: center;
  box-shadow: 0 6px 18px rgba(139, 38, 19, 0.35);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  text-decoration: none;
  border: none;
  width: 100%;
  box-sizing: border-box;
  line-height: 1.3;
}

.preset-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin: 12px 0 16px 0;
}

.chip {
  background: #F7F3EE;
  border: 1px solid #E2D9CF;
  padding: 8px 14px;
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.88rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--text-dark);
  text-align: center;
  line-height: 1.3;
}
```

- [ ] **Step 3: Test and Commit CSS Changes**

```bash
git add src/css/main.css
git commit -m "style: fix mobile header overflow and button text alignment"
```

---

### Task 4: End-to-End Verification & Build Check

**Files:**
- None (Verification of workspace files)

- [ ] **Step 1: Test Vite build**

Run: `npx vite build`
Expected: Clean build into `dist/` with no errors.

- [ ] **Step 2: Final git status check and verification**

Run: `git status`
Expected: Working tree clean.

- [ ] **Step 3: Final commit if any remaining tweaks exist**
