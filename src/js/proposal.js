import { proposalData } from './data/proposalData.js';
import { t } from './i18n.js';

export function renderProposalTable() {
  const container = document.getElementById('proposal-table-container');
  if (!container) return;

  // 1. Desktop Table HTML
  let desktopHtml = `
    <div class="table-responsive proposal-table-desktop">
      <table class="proposal-table">
        <thead>
          <tr>
            <th>#</th>
            <th>${t('th_description')}</th>
            <th>${t('th_qty')}</th>
            <th>${t('th_rate')}</th>
            <th class="text-right">${t('th_amount')}</th>
          </tr>
        </thead>
        <tbody>
  `;

  proposalData.items.forEach(item => {
    desktopHtml += `
      <tr>
        <td>${item.id}</td>
        <td><strong>${t(item.descKey)}</strong></td>
        <td>${item.qty}</td>
        <td>${item.rate}</td>
        <td class="text-right font-weight-bold">${item.formattedAmount}</td>
      </tr>
    `;
  });

  desktopHtml += `
        </tbody>
        <tfoot>
          <tr class="total-row">
            <td colspan="4" class="text-right"><strong>${t('total_estimated_amount')}</strong></td>
            <td class="text-right total-amount font-weight-bold" style="color:var(--primary-terracotta); font-size:1.1rem;">${proposalData.formattedTotal}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  `;

  // 2. Mobile Stacked Cards HTML (< 600px)
  let mobileCardsHtml = `<div class="proposal-cards-mobile">`;

  proposalData.items.forEach(item => {
    mobileCardsHtml += `
      <div class="proposal-item-card">
        <div class="card-item-header">
          <span class="item-number-badge">#${item.id}</span>
          <h4 class="card-item-title">${t(item.descKey)}</h4>
        </div>
        <div class="card-item-details">
          <div class="detail-pill">
            <small>${t('th_qty')}</small>
            <strong>${item.qty}</strong>
          </div>
          <div class="detail-pill">
            <small>${t('th_rate')}</small>
            <strong>${item.rate}</strong>
          </div>
        </div>
        <div class="card-item-footer">
          <span>${t('th_amount')}</span>
          <strong class="card-amount-badge">${item.formattedAmount}</strong>
        </div>
      </div>
    `;
  });

  mobileCardsHtml += `
    <div class="proposal-mobile-total-card">
      <span>${t('total_estimated_amount')}</span>
      <strong class="total-amount-highlight">${proposalData.formattedTotal}</strong>
    </div>
  </div>
  `;

  container.innerHTML = desktopHtml + mobileCardsHtml;
}

export function initProposalActions() {
  const printBtn = document.getElementById('print-proof-btn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}
