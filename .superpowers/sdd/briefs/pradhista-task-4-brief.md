# Task 4 Brief: Responsive CSS Styling (`src/css/main.css`)

## Objective
Implement clean, responsive mobile-first and desktop CSS styling in `src/css/main.css` for:
1. The new `#pdf-modal` (In-page PDF Lightbox Viewer).
2. Package 4 ceremonial estimate card (`.package-card.pkg-ceremonial`), badge (`.badge-ceremonial-estimate`), and top budget sub-pills (`.sub-budget-pill`).
3. Dual document action button groups (`.doc-actions-group`, `.btn-doc-view`, `.btn-doc-download`).
4. Responsive adaptations down to 360px micro-viewports.

## Target File
- `src/css/main.css`

---

## Detailed Styling Specifications

### 1. In-Page PDF Modal Viewer (`#pdf-modal`)
- `#pdf-modal`:
  - Fixed full-screen overlay with dark backdrop `rgba(0, 0, 0, 0.75)` and `backdrop-filter: blur(6px)`.
  - `z-index: 1050`.
  - Hidden by default (`display: none`), visible with flex centering on `.active` (`display: flex; align-items: center; justify-content: center;`).
- `.pdf-modal-content`:
  - `max-width: 920px; width: 95%; height: 88vh; display: flex; flex-direction: column; padding: 0; border-radius: 14px; overflow: hidden; background: #FFFDF9; border: 1.5px solid var(--border-gold); box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);`
- `.pdf-modal-header`:
  - Warm cream background `#FCFAF6`, `padding: 12px 18px; border-bottom: 1px solid #EBE4DA; display: flex; justify-content: space-between; align-items: center; gap: 12px;`
- `.pdf-modal-title-wrap`:
  - `display: flex; align-items: center; gap: 8px; min-width: 0;`
- `.pdf-modal-title`:
  - `margin: 0; font-size: 1.05rem; font-weight: 700; color: var(--primary-terracotta); text-overflow: ellipsis; white-space: nowrap; overflow: hidden;`
- `.pdf-modal-controls`:
  - `display: flex; align-items: center; gap: 10px; flex-shrink: 0;`
- `.pdf-modal-body`:
  - `flex: 1 1 auto; width: 100%; height: 100%; background: #323639; position: relative; overflow: hidden;`
- `#pdf-modal-frame`:
  - `width: 100%; height: 100%; border: none; display: block;`
- `.pdf-modal-footer`:
  - `background: #FCFAF6; padding: 8px 14px; border-top: 1px solid #EBE4DA; font-size: 0.80rem; color: var(--text-muted);`
- `#pdf-modal-direct-link`:
  - `color: var(--primary-terracotta); font-weight: 600; text-decoration: underline; margin-left: 4px;`

### 2. Package 4 Ceremonial Card & Top Budget Sub-Pills
- `.package-card.pkg-ceremonial`:
  - Border: `2px solid rgba(212, 175, 55, 0.5)`
  - Background: `linear-gradient(180deg, #FFFDF9 0%, #FFF9F0 100%)`
- `.badge-ceremonial-estimate`:
  - Background: `linear-gradient(135deg, #8B2613 0%, #B84728 100%)`
  - Color: `#FFF; padding: 6px 14px; border-radius: 20px; font-size: 0.82rem; font-weight: 600; border: 1px solid rgba(212, 175, 55, 0.4);`
- `.proposal-grand-total-banner .sub-budget-row`:
  - `display: flex; gap: 12px; justify-content: center; margin-top: 12px; flex-wrap: wrap;`
- `.sub-budget-pill`:
  - `background: #FFFFFF; border: 1px solid #E8DEC8; border-radius: 8px; padding: 8px 14px; display: inline-flex; align-items: center; gap: 8px; font-size: 0.84rem;`
  - `.sub-budget-label`: `color: var(--text-muted); font-weight: 600;`
  - `.sub-budget-amount`: `color: var(--primary-terracotta); font-weight: 700;`

### 3. Dual Document Action Buttons
- `.doc-actions-group`:
  - `display: inline-flex; gap: 8px; align-items: center; flex-wrap: wrap;`
- `.btn-doc-view`:
  - `.btn .btn-outline`: terracotta/gold border, touch-friendly min-height 40px.

### 4. Responsive Breakpoints
- `@media (max-width: 768px)`:
  - `.pdf-modal-content`: `width: 96%; height: 90vh;`
  - `.pdf-modal-header`: `padding: 10px 14px;`
  - `.sub-budget-row`: `flex-direction: column; gap: 8px; align-items: stretch;`
- `@media (max-width: 480px)`:
  - `.pdf-modal-content`: `width: 98%; height: 94vh; border-radius: 10px;`
  - `.pdf-modal-header`: `padding: 8px 10px;`
  - `.pdf-modal-title`: `font-size: 0.88rem;`
  - `#pdf-modal-download-btn`: `padding: 6px 10px; font-size: 0.78rem; min-height: 36px;`
  - `.doc-actions-group`: `width: 100%;`
  - `.doc-actions-group .btn`: `flex: 1 1 auto; text-align: center;`
- `@media (max-width: 360px)`:
  - `.pdf-modal-content`: `height: 96vh;`
  - `.pdf-modal-title`: `font-size: 0.82rem;`
  - `.doc-actions-group`: `flex-direction: column; gap: 6px;`
  - `.doc-actions-group .btn`: `width: 100%;`

---

## Verification
- Write `scripts/verify_pradhista_task_4.mjs`:
  - Assert existence and properties of `.pdf-modal-content`, `#pdf-modal`, `.pdf-modal-header`, `.pdf-modal-body`, `#pdf-modal-frame`.
  - Assert existence of `.package-card.pkg-ceremonial`, `.badge-ceremonial-estimate`, `.sub-budget-pill`.
  - Assert responsive media query rules (768px, 480px, 360px).
- Run: `node scripts/verify_pradhista_task_4.mjs` (must pass 100%).

## Git Commit
Commit message:
`feat(css): style pdf modal viewer, package 4 ceremonial card, and dual action buttons`
