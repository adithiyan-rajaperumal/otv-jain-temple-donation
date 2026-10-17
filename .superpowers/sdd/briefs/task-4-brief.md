# Task 4: UI Implementation — Trust Credentials & 80G/12A Tax Exemptions Section

**Files:**
- Modify: `index.html`
- Modify: `src/css/main.css`
- Modify: `src/js/main.js`

**Interfaces:**
- Consumes: I18n keys and document paths from Task 2 & Task 3
- Produces: Responsive tax exemption card with one-click PAN copy and PDF download triggers.

- [ ] **Step 1: Add HTML markup for Trust & 80G/12A Section in `index.html`**

Directly under the donation card:
- 80G Tax Benefit Banner (`50% Tax Deduction under Section 80G`)
- Registered Trust Info Grid (Reg No: 14/2026, Date: 17/06/2026, 108 Members, 20 Cents Land)
- PAN Copy Box (`AAATZ4555B` with copy button)
- 80G URN (`AAATZ4555BF20261`) & 12A URN (`AAATZ4555BE20261`)
- Download Action Buttons for 80G, 12A, and Masked Trust Deed.

- [ ] **Step 2: Add Bhattarak Swamiji Blessing Card in `index.html`**

- Pontiff guidance badge
- Swasthi Shri Thavalakeerthi Swamiji blessing excerpt
- 4-language toggle / dynamic PDF download link (`/assets/docs/bhattarak_letter_{lang}.pdf`).

- [ ] **Step 3: Add CSS styles in `src/css/main.css`**

- Responsive grid for tax exemption metrics
- Golden callout box for 80G deduction
- Copy button states (Copy -> Copied!)

- [ ] **Step 4: Add copy handler in `src/js/main.js` for PAN**

```javascript
// Copy PAN
const copyPanBtn = document.getElementById('copy-pan-btn');
if (copyPanBtn) {
  copyPanBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('AAATZ4555B').then(() => {
      copyPanBtn.textContent = '✓ Copied!';
      setTimeout(() => { copyPanBtn.textContent = 'Copy PAN'; }, 2000);
    });
  });
}
```

- [ ] **Step 5: Test and verify on mobile breakpoint (375px) and desktop**

- [ ] **Step 6: Commit**

```bash
git add index.html src/css/main.css src/js/main.js
git commit -m "feat: add 80G/12A tax exemption section and Bhattarak blessing letter showcase"
```

---
