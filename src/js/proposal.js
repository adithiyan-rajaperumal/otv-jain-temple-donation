import { proposalData } from './data/proposalData.js';
import { t } from './i18n.js';

const SPEC_LABEL_MAP = {
  maharajRoom: 'spec_maharaj_room',
  mathajiRoom: 'spec_mathaji_room',
  guestRoom: 'spec_guest_room',
  kitchen: 'spec_kitchen',
  verandah: 'spec_verandah',
  prochanaHall: 'spec_prochana_hall',
  hallArea: 'spec_hall_area',
  columns: 'spec_columns',
  roof: 'spec_roof',
  flooring: 'spec_flooring'
};

const SPEC_FALLBACK_LABELS = {
  maharajRoom: 'Muni Maharaj Room',
  mathajiRoom: 'Mathaji Room',
  guestRoom: 'Pilgrim Guest Room',
  kitchen: 'Kitchen & Dining',
  verandah: 'Verandah & Shed',
  prochanaHall: 'Pravachan Hall',
  hallArea: 'Main Hall Area',
  columns: 'RCC Columns',
  roof: 'Roofing Structure',
  flooring: 'Flooring'
};

export function renderProposalTable() {
  const container = document.getElementById('proposal-table-container');
  if (!container) return;

  const eng = proposalData.engineer;

  // 1. Grand Total Budget Banner with Engineer Certification
  let html = `
    <div class="budget-banner proposal-grand-total-banner">
      <div class="banner-top-row">
        <div class="banner-title-group">
          <span class="banner-subtitle" data-i18n="revised_estimate_subtitle">${t('revised_estimate_subtitle')}</span>
          <h4 class="banner-title" data-i18n="revised_estimate_title">${t('revised_estimate_title')}</h4>
        </div>
        <div class="banner-amount-badge">
          <span class="amount-label" data-i18n="total_certified_budget">${t('total_certified_budget')}</span>
          <strong class="total-badge">${proposalData.formattedGrandTotal} <span class="amount-lakhs">(~₹76.16 Lakhs)</span></strong>
        </div>
      </div>

      <div class="engineer-cert-badge-box">
        <div class="cert-shield-icon">🏛️</div>
        <div class="cert-details">
          <div class="cert-headline" data-i18n="engineer_certified_badge">${t('engineer_certified_badge')}</div>
          <div class="cert-subtext">
            <strong>${eng.name}</strong> (${eng.qualification}) — ${eng.role}<br />
            <span>📍 ${eng.address} • 📞 +91 ${eng.phone}</span>
          </div>
        </div>
        <div class="cert-status-badge">
          <span data-i18n="certified_civil_estimate">✓ ${t('certified_civil_estimate')}</span>
        </div>
      </div>
    </div>
  `;

  // 2. 3 Modular Package Cards
  html += `<div class="proposal-packages-list">`;

  proposalData.packages.forEach((pkg, index) => {
    const pkgNum = index + 1;
    const downloadFilename = `Estimate_${pkgNum}_${pkg.id}.pdf`;

    html += `
      <div class="package-card" id="package-card-${pkg.id}">
        <!-- Package Header -->
        <div class="package-card-header">
          <div class="package-header-main">
            <div class="package-badge-row">
              <span class="package-badge">Package ${pkgNum}</span>
              <span class="package-verified-tag">✓ Certified</span>
            </div>
            <h4 class="package-title" data-i18n="${pkg.titleKey}">${t(pkg.titleKey)}</h4>
            <p class="package-subtitle" data-i18n="${pkg.subtitleKey}">${t(pkg.subtitleKey)}</p>
          </div>
          <div class="package-header-right">
            <div class="package-amount-wrap">
              <span class="package-amount-label" data-i18n="package_subtotal">${t('package_subtotal')}</span>
              <strong class="package-amount-badge">${pkg.formattedTotal}</strong>
            </div>
            <a href="${pkg.pdf}" download="${downloadFilename}" class="btn btn-outline btn-package-pdf no-print" data-i18n="btn_download_${pkg.id}">
              ${t('btn_download_' + pkg.id)}
            </a>
          </div>
        </div>
    `;

    // Architectural & Dimensions Specs (Package 2 & Package 3)
    if (pkg.specs && Object.keys(pkg.specs).length > 0) {
      html += `
        <div class="package-specs-section">
          <h5 class="specs-title">
            <span class="specs-icon">📐</span>
            <span data-i18n="specs_heading">${t('specs_heading')}</span>
          </h5>
          <div class="specs-grid">
      `;

      for (const [key, val] of Object.entries(pkg.specs)) {
        const labelKey = SPEC_LABEL_MAP[key] || key;
        const fallback = SPEC_FALLBACK_LABELS[key] || key;
        const label = t(labelKey) !== labelKey ? t(labelKey) : fallback;

        html += `
          <div class="spec-pill">
            <span class="spec-label" data-i18n="${labelKey}">${label}</span>
            <strong class="spec-val">${val}</strong>
          </div>
        `;
      }

      html += `
          </div>
        </div>
      `;
    }

    // Itemized Breakdown Table (Responsive with overflow-x scrolling)
    html += `
      <div class="table-responsive package-table-responsive">
        <table class="proposal-table package-item-table">
          <thead>
            <tr>
              <th class="th-num">#</th>
              <th class="th-desc" data-i18n="th_description">${t('th_description')}</th>
              <th class="th-qty" data-i18n="th_qty">${t('th_qty')}</th>
              <th class="th-rate" data-i18n="th_rate">${t('th_rate')}</th>
              <th class="th-amount text-right" data-i18n="th_amount">${t('th_amount')}</th>
            </tr>
          </thead>
          <tbody>
    `;

    pkg.items.forEach(item => {
      html += `
        <tr>
          <td class="col-id">${item.id}</td>
          <td class="col-desc">
            <strong data-i18n="${item.descKey}">${t(item.descKey)}</strong>
            ${item.detail ? `<div class="item-detail-note">${item.detail}</div>` : ''}
          </td>
          <td class="col-qty"><span class="badge-dim">${item.qty}</span></td>
          <td class="col-rate">${item.rate}</td>
          <td class="col-amount text-right font-weight-bold">${item.formattedAmount}</td>
        </tr>
      `;
    });

    html += `
          </tbody>
          <tfoot>
            <tr class="package-subtotal-row">
              <td colspan="4" class="text-right">
                <strong data-i18n="package_subtotal">${t('package_subtotal')}</strong>
              </td>
              <td class="text-right package-subtotal-val font-weight-bold">${pkg.formattedTotal}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    `;
  });

  html += `</div>`;

  // 3. Grand Summary Card with 3-Package Breakdown Formula
  html += `
    <div class="proposal-grand-summary-card">
      <div class="grand-summary-header">
        <span class="summary-shield">🏛️</span>
        <div>
          <h4 class="summary-title" data-i18n="view_all_packages">${t('view_all_packages')}</h4>
          <small class="summary-subtitle">${eng.name} (${eng.qualification}) • Reg. No: ${eng.regNo}</small>
        </div>
      </div>
      <div class="grand-summary-formula">
        <div class="formula-block">
          <span class="formula-label">Pkg 1: Temple Renovation</span>
          <strong class="formula-val">₹31,60,000</strong>
        </div>
        <span class="formula-op">+</span>
        <div class="formula-block">
          <span class="formula-label">Pkg 2: Muni Guest House</span>
          <strong class="formula-val">₹18,61,000</strong>
        </div>
        <span class="formula-op">+</span>
        <div class="formula-block">
          <span class="formula-label">Pkg 3: Multipurpose Hall</span>
          <strong class="formula-val">₹25,95,000</strong>
        </div>
        <span class="formula-eq">=</span>
        <div class="formula-block formula-total">
          <span class="formula-label" data-i18n="total_certified_budget">${t('total_certified_budget')}</span>
          <strong class="formula-val-total">₹76,16,000</strong>
          <span class="formula-sub">(~₹76.16 Lakhs)</span>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

export const renderProposal = renderProposalTable;

export function initProposalActions() {
  const printBtn = document.getElementById('print-proof-btn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}
