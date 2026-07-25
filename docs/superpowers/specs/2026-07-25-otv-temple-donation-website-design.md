# Design Specification: OTV Jain Temple Donation Website Updates

**Date**: 2026-07-25  
**Topic**: Panchakalyan Integration, Tamil Default Language, Mobile-First Layout & Bhattarak Order Correction

---

## 1. Overview & Goals

This design specification details updates to the 1008 Sri Vrishabanath Bhagwan Jain Temple donation website at Othalavadi. The key objectives are:
1. **Panchakalyan (Pancha Kalyana Pradhista / பஞ்சகல்யாண பிரதிஷ்டை)**: Update the scope across hero titles, notices, meta tags, and proposal descriptions to reflect that Panchakalyan will take place following renovation.
2. **Default Language**: Change default active language to Tamil (`ta`) as the primary target audience is Tamil-speaking.
3. **Mobile-First Responsive Layout & Button Overhaul**: Eliminate right-side header overflow on mobile devices, fix text wrap and vertical alignment in buttons (especially for Tamil text), and ensure dynamic layout scalability.
4. **Bhattarak Swamiji & Mutt Alignment (Option A)**:
   - Pair **Swasti Sri Dhavalakeerthi Bhattaraka Swamiji** with **Arihantagiri Jain Mutt** (placed 1st in Bhattarak order).
   - Pair **Swasti Sri Lakshmisena Bhattaraka Swamiji** with **Mel Sithamur Jain Mutt**.

---

## 2. Multi-lingual Content Specifications

### 2.1 Hero Headings & Blessings

- **Tamil (`ta`)**:
  - `hero_heading`: "திருக்கோயில் திருப்பணி, தியாகி நிவாஸ் புதிய கட்டிடம் மற்றும் பஞ்சகல்யாண பிரதிஷ்டை நிதி உதவி வேண்டுகோள்"
  - `hero_blessing`: "அரஹந்தகிரி ஜைன மடம் ஸ்வஸ்திஸ்ரீ தவளகீர்த்தி பட்டாரக சுவாமிகள் & மேல் சித்தாமூர் ஜைன மடம் ஸ்வஸ்திஸ்ரீ லட்சுமிசேன பட்டாரக சுவாமிகள் ஆகிய இருமடாதிபதிகளின் நல்வழிகாட்டுதலுடன்"
- **English (`en`)**:
  - `hero_heading`: "Sacred Renovation, Tyagi Niwas Construction & Pancha Kalyana Pradhista Appeal"
  - `hero_blessing`: "Under the benign guidance of Swasti Sri Dhavalakeerthi Bhattaraka Swamiji (Arihantagiri Jain Mutt) & Swasti Sri Lakshmisena Bhattaraka Swamiji (Mel Sithamur Jain Mutt)"
- **Hindi (`hi`)**:
  - `hero_heading`: "मंदिर जीर्णोद्धार, त्यागी निवास निर्माण एवं पंचकल्याणक प्रतिष्ठा हेतु पावन अपील"
  - `hero_blessing`: "अरहंतगिरि जैन मठ स्वस्ति श्री धवलकीर्ति भट्टारक स्वामीजी एवं मेलसित्तामूर जैन मठ स्वस्ति श्री लक्ष्मीसेन भट्टारक स्वामीजी के पावन मार्गदर्शन में"
- **Kannada (`kn`)**:
  - `hero_heading`: "ದೇವಾಲಯ ಜೀರ್ಣೋದ್ಧಾರ, ತ್ಯಾಗಿ ನಿವಾಸ ನಿರ್ಮಾಣ ಹಾಗೂ ಪಂಚಕಲ್ಯಾಣ ಪ್ರತಿಷ್ಠಾಪನೆಯ ಪವಿತ್ರ ಮನವಿ"
  - `hero_blessing`: "ಅರಿಹಂತಗಿರಿ ಜೈನ್ ಮಠದ ಸ್ವಸ್ತಿ ಶ್ರೀ ಧವಳಕೀರ್ತಿ ಭಟ್ಟಾರಕ ಸ್ವಾಮೀಜಿ ಮತ್ತು ಮೇಲ್ ಸಿತ್ತಾಮೂರ್ ಜೈನ್ ಮಠದ ಸ್ವಸ್ತಿ ಶ್ರೀ ಲಕ್ಷ್ಮೀಸೇನ ಭಟ್ಟಾರಕ ಸ್ವಾಮೀಜಿ ಅವರ ದಿವ್ಯ ಮಾರ್ಗದರ್ಶನದಲ್ಲಿ"

### 2.2 Official Notice Body Updates

All notice bodies in `ta.js`, `en.js`, `hi.js`, and `kn.js` will explicitly state:
1. Restoration and Jirnoddhara renovation of Sri 1008 Virshabanath Jinalaya.
2. New construction of Tyagi Niwas building.
3. Conducting sacred **Panchakalyana Mahotsava Pradhista** after completion of renovation work.
4. Correct pairing of Swasti Sri Dhavalakeerthi Swamiji (Arihantagiri) and Swasti Sri Lakshmisena Swamiji (Mel Sithamur).

---

## 3. Frontend & Responsive Layout Architecture

### 3.1 Header Navbar (`.navbar`)

- Refactor `.header-content` for mobile viewports (`< 640px`):
  - Stack logo block and language selector cleanly.
  - Set `.site-title` font size dynamically using fluid typography (`clamp(1.05rem, 4.5vw, 1.25rem)`) and line-height `1.3`.
  - Prevent title overflow beyond right screen edge.
- Language Selector Pills:
  - Default active pill set to Tamil (`ta`).
  - Equal spacing and padding on mobile screens.

### 3.2 Button System & Typography (`.btn`, `.btn-upi-pay`, `.chip`)

- Set `display: inline-flex; align-items: center; justify-content: center; text-align: center;`.
- Set `min-height: 44px; line-height: 1.35; box-sizing: border-box;`.
- Responsive padding and word-wrap for multi-word Tamil labels (e.g. `📋 திருப்பணி திட்டமதிப்பீடு காண்க`).
- Standardize `.btn-upi-pay` and `.btn-gold` button structures so icons and text align gracefully without awkward clipping.

### 3.3 Default Language Settings

- Update `i18n.js`: `let currentLang = 'ta';`
- Update `main.js`: `setLanguage('ta')` on load and set `.lang-btn[data-lang="ta"]` active.
- Update `index.html`: Set default `<html lang="ta">` and fallback static DOM labels to Tamil.

---

## 4. Verification Plan

1. Verify layout across mobile, tablet, and desktop viewports (320px, 375px, 414px, 768px, 1024px) for zero horizontal scrolling or title clipping.
2. Verify default language initialization to Tamil (`ta`) upon fresh load.
3. Verify language switching across all 4 languages (`ta`, `en`, `hi`, `kn`) to confirm Panchakalyanam and Bhattarak names update accurately.
4. Verify button text alignment and touch target usability.
