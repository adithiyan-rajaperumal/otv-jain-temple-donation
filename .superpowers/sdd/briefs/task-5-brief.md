# Task 5: UI Implementation — Revised Estimates (₹76.16 Lakhs Breakdown)

**Files:**
- Modify: `index.html`
- Modify: `src/js/proposal.js`
- Modify: `src/css/main.css`

**Interfaces:**
- Consumes: `proposalData` (Grand Total ₹76,16,000, 3 sub-packages)
- Produces: Interactive tabbed / card interface rendering the itemized civil engineering estimates and PDF download buttons.

- [ ] **Step 1: Refactor `src/js/proposal.js` to render the 3 packages**

- Render Grand Total Banner: ₹76,16,000 with engineer certification badge (Er. K. Sundararajan).
- Render 3 Package Cards:
  1. Main Temple Renovation (₹31,60,000)
  2. Muni Maharaj Guest House (₹18,61,000)
  3. Multipurpose Hall Building (₹25,95,000)
- Render itemized tables inside each card with responsive horizontal scroll or card items on mobile.
- Add direct download links for `estimate_1_temple_renovation.pdf`, `estimate_2_muni_maharaj_guest_house.pdf`, `estimate_3_multipurpose_hall.pdf`.

- [ ] **Step 2: Update `index.html` proposal container**

Ensure proposal container cleanly mounts the new component.

- [ ] **Step 3: Add CSS styles for Package Cards and Mobile Tables in `src/css/main.css`**

- [ ] **Step 4: Test in browser across screen sizes**

- [ ] **Step 5: Commit**

```bash
git add src/js/proposal.js src/css/main.css index.html
git commit -m "feat: implement modular ₹76.16L revised estimate component with 3 certified packages"
```

---
