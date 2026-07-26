# Design Specification: Language Persistence & Mobile Proposal Cards

**Date**: 2026-07-26  
**Topic**: LocalStorage / URL Language Persistence & Dual Mobile Card / Desktop Table Layout

---

## 1. Overview & Goals

This design specification details two user experience enhancements for the OTV Jain Temple Donation Website:
1. **Language Persistence**: Remember the user's selected language across page reloads using `localStorage` and URL query parameters (`?lang=ta|en|hi|kn`).
2. **Mobile Proposal Cards View**: Replace the horizontal scrollable table on mobile devices (`< 600px`) with clean, vertical stacked proposal cards for effortless readability.

---

## 2. Technical Architecture & Specifications

### 2.1 Language Persistence (`src/js/i18n.js` & `src/js/main.js`)

- **Precedence Chain for Resolving Initial Language**:
  1. `URLSearchParams(window.location.search).get('lang')` (if valid: `en`, `ta`, `hi`, `kn`).
  2. `localStorage.getItem('temple_lang')` (if valid: `en`, `ta`, `hi`, `kn`).
  3. Default fallback: Tamil (`ta`).
- **State Updates**:
  - Tapping any language button (`.lang-btn`) calls `setLanguage(lang)` which saves `localStorage.setItem('temple_lang', lang)`.
  - `.lang-btn` active pill class syncs automatically with the active language.

### 2.2 Dual Mobile Cards & Desktop Table (`src/js/proposal.js` & `src/css/main.css`)

- **Markup Generation in `proposal.js`**:
  - `renderProposalTable()` generates both:
    1. Desktop HTML `<table>` (`.proposal-table-desktop`).
    2. Mobile cards container (`.proposal-cards-mobile`).
- **Mobile Card Component Structure (`.proposal-item-card`)**:
  - **Item Number & Description**: `<h4 class="card-item-title">#N Description</h4>`
  - **Details Pills**: Quantity (`t('th_qty')`) and Unit Rate (`t('th_rate')`) side-by-side.
  - **Total Amount**: Highlighted badge with formatted amount (`₹X,XX,XXX`).
- **Responsive Display Rules in `main.css`**:
  - `@media (max-width: 600px)`: Show `.proposal-cards-mobile`, hide `.proposal-table-desktop` and `.table-responsive`.
  - `@media (min-width: 601px)`: Show `.proposal-table-desktop`, hide `.proposal-cards-mobile`.

---

## 3. Verification Plan

1. **Language Persistence**:
   - Switch language to English (`ENG`), refresh browser -> Verify site stays in English.
   - Open URL with `?lang=hi` -> Verify site loads in Hindi and active pill updates.
2. **Mobile Cards**:
   - View site on 320px–400px mobile viewport -> Verify proposal table transforms into cards with 0 horizontal scroll bleed.
   - View site on desktop -> Verify traditional 4-column table displays cleanly.
