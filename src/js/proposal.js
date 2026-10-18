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

  // 1. Grand Total Budget Banner with Combined Project Budget & Engineer Certification
  let html = `
    <div class="budget-banner proposal-grand-total-banner">
      <div class="banner-top-row">
        <div class="banner-title-group">
          <span class="banner-subtitle" data-i18n="revised_estimate_subtitle">${t('revised_estimate_subtitle')}</span>
          <h4 class="banner-title" data-i18n="revised_estimate_title">${t('revised_estimate_title')}</h4>
        </div>
        <div class="banner-amount-badge">
          <span class="amount-label" data-i18n="grand_project_budget_label">${t('grand_project_budget_label')}</span>
          <strong class="total-badge">${proposalData.formattedGrandTotal} <span class="amount-lakhs">(~₹1.26 Crores)</span></strong>
        </div>
      </div>

      <div class="banner-sub-budgets">
        <div class="sub-budget-pill">
          <span class="sub-budget-icon">🏛️</span>
          <div class="sub-budget-info">
            <span class="sub-budget-label" data-i18n="civil_works_subtotal_label">${t('civil_works_subtotal_label')}</span>
            <strong class="sub-budget-val">${proposalData.formattedCivilSubtotal}</strong>
          </div>
        </div>
        <div class="sub-budget-pill">
          <span class="sub-budget-icon">🪔</span>
          <div class="sub-budget-info">
            <span class="sub-budget-label" data-i18n="pradhista_subtotal_label">${t('pradhista_subtotal_label')}</span>
            <strong class="sub-budget-val">${proposalData.formattedPradhistaSubtotal}</strong>
          </div>
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

  // 2. 4 Modular Package Cards (3 Civil Works + 1 Panchakalyana Pradhista Estimate)
  html += `<div class="proposal-packages-list">`;

  proposalData.packages.forEach((pkg, index) => {
    const pkgNum = index + 1;
    const isCeremonial = !!pkg.isCeremonialEstimate;
    const downloadFilename = `Estimate_${pkgNum}_${pkg.id}.pdf`;

    html += `
      <div class="package-card ${isCeremonial ? 'pkg-ceremonial' : ''}" id="package-card-${pkg.id}">
        <!-- Package Header -->
        <div class="package-card-header">
          <div class="package-header-main">
            <div class="package-badge-row">
              <span class="package-badge">Package ${pkgNum}</span>
              ${isCeremonial
                ? `<span class="package-verified-tag badge-ceremonial-estimate" data-i18n="${pkg.badgeKey}">${t(pkg.badgeKey)}</span>`
                : `<span class="package-verified-tag">✓ Certified</span>`
              }
            </div>
            <h4 class="package-title" data-i18n="${pkg.titleKey}">${t(pkg.titleKey)}</h4>
            <p class="package-subtitle" data-i18n="${pkg.subtitleKey}">${t(pkg.subtitleKey)}</p>
          </div>
          <div class="package-header-right">
            <div class="package-amount-wrap">
              <span class="package-amount-label" data-i18n="package_subtotal">${t('package_subtotal')}</span>
              <strong class="package-amount-badge">${pkg.formattedTotal}</strong>
            </div>
            ${isCeremonial
              ? `<div class="ceremonial-note-pill no-print">
                   <span class="pill-icon">🪔</span>
                   <span class="pill-text" data-i18n="${pkg.badgeKey}">${t(pkg.badgeKey)}</span>
                 </div>`
              : `<div class="doc-actions-group package-actions-group no-print">
                   <button type="button" class="btn btn-outline btn-package-pdf btn-view-pdf" data-pdf-url="${pkg.pdf}" data-pdf-title="${t(pkg.titleKey)}" data-pdf-filename="${downloadFilename}">
                     <span class="doc-icon">👁️</span> <span data-i18n="btn_view_pdf">${t('btn_view_pdf')}</span>
                   </button>
                   <a href="${pkg.pdf}" download="${downloadFilename}" class="btn btn-outline btn-package-pdf" data-i18n="btn_download_${pkg.id}">
                     ${t('btn_download_' + pkg.id)}
                   </a>
                 </div>`
            }
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

    // Itemized Breakdown Table (Desktop / Tablet > 600px & Print)
    html += `
      <div class="table-responsive package-table-responsive package-table-desktop">
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

      <!-- Mobile Stacked Item Cards (<= 600px) -->
      <div class="package-cards-mobile no-print">
    `;

    pkg.items.forEach(item => {
      html += `
        <div class="proposal-item-card">
          <div class="card-item-header">
            <span class="item-number-badge">#${item.id}</span>
            <div class="card-item-title-wrap">
              <h5 class="card-item-title" data-i18n="${item.descKey}">${t(item.descKey)}</h5>
              ${item.detail ? `<div class="item-detail-note">${item.detail}</div>` : ''}
            </div>
          </div>
          <div class="card-item-details">
            <div class="detail-pill">
              <small data-i18n="th_qty">${t('th_qty')}</small>
              <strong>${item.qty}</strong>
            </div>
            <div class="detail-pill">
              <small data-i18n="th_rate">${t('th_rate')}</small>
              <strong>${item.rate}</strong>
            </div>
          </div>
          <div class="card-item-footer">
            <span data-i18n="th_amount">${t('th_amount')}</span>
            <strong class="card-amount-badge">${item.formattedAmount}</strong>
          </div>
        </div>
      `;
    });

    html += `
        <div class="package-mobile-subtotal-card">
          <span data-i18n="package_subtotal">${t('package_subtotal')}</span>
          <strong class="package-subtotal-val">${pkg.formattedTotal}</strong>
        </div>
      </div>
    `;

    if (isCeremonial) {
      html += `
        <div class="package-ceremonial-footer-note text-center">
          <small><span class="note-icon">🪔</span> <span data-i18n="${pkg.subtitleKey}">${t(pkg.subtitleKey)}</span></small>
        </div>
      `;
    }

    html += `</div>`;
  });

  html += `</div>`;

  // 3. Grand Summary Card with 4-Package Breakdown Formula
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
          <span class="formula-label" data-i18n="${proposalData.packages[0].titleKey}">${t(proposalData.packages[0].titleKey)}</span>
          <strong class="formula-val">${proposalData.packages[0].formattedTotal}</strong>
        </div>
        <span class="formula-op">+</span>
        <div class="formula-block">
          <span class="formula-label" data-i18n="${proposalData.packages[1].titleKey}">${t(proposalData.packages[1].titleKey)}</span>
          <strong class="formula-val">${proposalData.packages[1].formattedTotal}</strong>
        </div>
        <span class="formula-op">+</span>
        <div class="formula-block">
          <span class="formula-label" data-i18n="${proposalData.packages[2].titleKey}">${t(proposalData.packages[2].titleKey)}</span>
          <strong class="formula-val">${proposalData.packages[2].formattedTotal}</strong>
        </div>
        <span class="formula-op">+</span>
        <div class="formula-block formula-pradhista">
          <span class="formula-label" data-i18n="${proposalData.packages[3].titleKey}">${t(proposalData.packages[3].titleKey)}</span>
          <strong class="formula-val">${proposalData.packages[3].formattedTotal}</strong>
        </div>
        <span class="formula-eq">=</span>
        <div class="formula-block formula-total">
          <span class="formula-label" data-i18n="grand_project_budget_label">${t('grand_project_budget_label')}</span>
          <strong class="formula-val-total">${proposalData.formattedGrandTotal}</strong>
          <span class="formula-sub">(~₹1.26 Crores)</span>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

export const renderProposal = renderProposalTable;

export function initProposalActions() {
  // Legacy print-proof-btn removed in favor of direct in-page PDF modal viewing
}
