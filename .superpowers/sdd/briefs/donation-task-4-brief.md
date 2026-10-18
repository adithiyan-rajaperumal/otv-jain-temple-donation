# Task 4 Brief: Responsive Mobile-First & Desktop CSS Styling (`src/css/main.css`)

## Objective
Implement clean, beautiful, mobile-first and desktop-optimized CSS rules in `src/css/main.css` for the new in-page Sacred Contribution Overview Card (`#donate-section`), mobile Floating Action Pill (`#mobile-donate-fab`), and the dedicated 2-column / tabbed Donation Modal (`#donation-modal`).

## Target File
- `src/css/main.css`

## Styling Specifications

### 1. In-Page Sacred Contribution Card (`#donate-section`)
- Style `.donation-card`:
  - Background: `#FCFAF6` with gold border `1px solid var(--border-gold)` and `border-radius: var(--radius-lg)` (16px).
  - Center-aligned header and subtitle `.donation-card-subtext` (`font-size: 0.95rem; line-height: 1.6; color: var(--text-dark); max-width: 720px; margin: 0 auto 16px auto;`).
  - `.donation-highlights-wrap`: flex row with gap `8px`, `justify-content: center`, wrap on small screens.
  - `.highlight-badge`: pill shape, subtle terracotta/gold border, `font-size: 0.8rem; font-weight: 600; padding: 6px 14px;`.
  - `.donation-portal-actions`: flex row with gap `14px`, `justify-content: center; margin: 20px 0; flex-wrap: wrap;`.
  - `#open-donate-modal-btn`: prominent gold gradient button (`btn btn-gold btn-lg`).
  - `#open-bank-modal-btn`: elegant outline button (`btn btn-outline`).
  - `.quick-credentials-strip`: clean row at bottom of card with subtle dashed border top (`padding-top: 14px; border-top: 1px dashed var(--border-gold)`), showing UPI ID and Bank Account with compact copy buttons.

### 2. Floating Action Pill (`#mobile-donate-fab`)
- Style `.mobile-donate-fab`:
  - `position: fixed; bottom: 20px; right: 16px; z-index: 999;`
  - Shape: rounded pill (`border-radius: 30px; padding: 12px 20px; min-height: 48px; min-width: 140px;`)
  - Background: `linear-gradient(135deg, #E5C158 0%, #D4AF37 100%)`
  - Border: `1px solid rgba(139, 38, 19, 0.2)`
  - Text: `color: #5C1D0D; font-weight: 700; font-size: 0.95rem; display: inline-flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer;`
  - Shadow: `0 4px 18px rgba(139, 38, 19, 0.35);`
  - Active/press state: `transform: scale(0.96); box-shadow: 0 2px 10px rgba(139, 38, 19, 0.3);`
  - Hidden on desktop: `@media (min-width: 769px) { .mobile-donate-fab { display: none !important; } }`

### 3. Dedicated Donation Modal (`#donation-modal`)
- Style `.modal` & `.donation-modal-content`:
  - Backdrop: `background: rgba(0, 0, 0, 0.65); backdrop-filter: blur(6px);`
  - Content box: `max-width: 820px; width: 100%; max-height: 90vh; overflow-y: auto; background: #FFFDF9; border: 1.5px solid var(--border-gold); border-radius: 18px; padding: 24px; box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25);`
  - Close button `#close-donation-modal`: top right, `font-size: 1.8rem; width: 44px; height: 44px; cursor: pointer;`
- Modal header:
  - Icon `🪔` and title `#donation-modal-title` (`color: var(--primary-terracotta); font-size: 1.25rem; font-weight: 700; margin: 0 0 16px 0;`).
- Tab switcher `.modal-tabs`:
  - `display: flex; gap: 8px; justify-content: center; background: #F3ECE1; padding: 5px; border-radius: 30px; margin: 0 auto 20px auto; max-width: 440px;`
  - `.modal-tab-btn`: `flex: 1; border: none; background: transparent; padding: 10px 16px; border-radius: 26px; font-weight: 600; font-size: 0.90rem; cursor: pointer; color: var(--text-dark); transition: all 0.2s ease; text-align: center;`
  - `.modal-tab-btn.active`: `background: var(--primary-terracotta); color: #FFFFFF; box-shadow: 0 3px 10px rgba(139, 38, 19, 0.25);`
- Tab panes:
  - `.tab-pane`: `display: none;`
  - `.tab-pane.active`: `display: block; animation: tabFadeIn 0.2s ease;`

### 4. Tab 1: UPI & QR Layout (`.modal-upi-layout`)
- Desktop (> 768px):
  - `display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 24px; align-items: start;`
  - Left column: Unified amount grid, VPA pill, mobile direct pay button, tax exemption callout.
  - Right column: Live QR code card, scan hint, download QR button, mobile gallery instructions.
- Mobile (<= 768px):
  - `display: flex; flex-direction: column; gap: 16px;`

### 5. Unified Amount Grid (`.unified-amount-grid`)
- Layout:
  - Desktop: `display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 10px 0 16px 0;`
  - Mobile (<= 640px): `grid-template-columns: repeat(2, 1fr); gap: 8px;`
- Chips (`.chip` inside modal):
  - `min-height: 44px; border-radius: 8px; border: 1.5px solid #E2D9CF; background: #FFFFFF; font-weight: 600; font-size: 0.92rem; color: var(--text-dark); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s ease;`
  - Active chip (`.chip.active`): `background: var(--primary-terracotta); color: #FFFFFF; border-color: var(--primary-terracotta); box-shadow: 0 3px 10px rgba(139, 38, 19, 0.25);`
- Custom input pill (`.custom-amount-pill`):
  - `display: flex; align-items: center; min-height: 44px; border-radius: 8px; border: 1.5px solid #E2D9CF; background: #FFFFFF; padding: 0 10px; box-sizing: border-box;`
  - Focus-within state: `border-color: var(--primary-terracotta); box-shadow: 0 0 0 2px rgba(139, 38, 19, 0.15);`
  - Symbol `.currency-symbol`: `font-weight: 700; color: var(--primary-terracotta); font-size: 1rem; margin-right: 4px;`
  - Input `#custom-amount-input`: `border: none; background: transparent; width: 100%; outline: none; font-size: 0.92rem; font-weight: 600; color: var(--text-dark);`

### 6. Modal VPA Pill & Live QR Card
- `.modal-vpa-pill`:
  - `background: #FFFFFF; border: 1px solid #EBE4DA; border-radius: 8px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 14px;`
- `.modal-qr-card`:
  - `background: #FFFFFF; border: 1px solid #EBE4DA; border-radius: 12px; padding: 16px; text-align: center;`
  - `.modal-qr-image`: `max-width: 200px; width: 100%; height: auto; border-radius: 8px; border: 1px solid #EBE4DA; margin: 0 auto 10px auto; display: block;`
  - `.qr-scan-hint`: `font-size: 0.80rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 10px;`

### 7. Tab 2: Direct Bank Details Box (`.modal-bank-box`)
- `.bank-credential-rows`: `display: flex; flex-direction: column; gap: 10px;`
- `.bank-row`: `background: #FFFFFF; border: 1px solid #EBE4DA; border-radius: 8px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; gap: 10px;`
- Responsive wrap for narrow viewports.

### 8. Mobile & Narrow Viewport Rules
- `@media (max-width: 480px)`:
  - Modal content padding: `16px 12px;`
  - Modal tabs padding: `8px 12px; font-size: 0.82rem;`
  - FAB button: `bottom: 16px; right: 12px; padding: 10px 16px; font-size: 0.88rem;`
- `@media (max-width: 360px)`:
  - Modal content padding: `12px 8px;`
  - Amount grid chips font-size: `0.82rem;`
  - Ensure zero horizontal scroll bleed.

## Verification
- Run `npm run test:all` to ensure zero test regressions.
- Verify production build with `npm run build`.

## Git Commit
Commit message: `feat(css): style donation modal, in-page contribution card, and mobile floating action pill`
