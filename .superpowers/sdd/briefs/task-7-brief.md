# Task 7: Full Verification, Responsive Polish & Production Build

**Files:**
- Modify: `index.html`, `src/css/main.css` (if any adjustments needed)
- Test: `npm run build`

**Interfaces:**
- Produces: Verified production bundle in `dist/`

- [ ] **Step 1: Check print stylesheet `src/css/print.css`**

Ensure that 80G tax exemption, URNs, PAN, and revised estimates are cleanly formatted in print / PDF generation mode.

- [ ] **Step 2: Test language switching across all 4 languages (EN, TA, HI, KN)**

Verify:
- Trust title, registration number, PAN, 80G/12A information.
- Bhattarak Swamiji blessing excerpt and PDF download link.
- Revised estimate total and item descriptions.
- Progress gallery captions.
- Notice text.

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: Success with 0 errors.

- [ ] **Step 4: Final verification and commit**

```bash
git add -A
git commit -m "chore: complete temple website update with 80G/12A, certified estimates, and progress gallery"
```
