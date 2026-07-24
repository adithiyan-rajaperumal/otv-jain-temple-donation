import { proposalData } from './data/proposalData.js';
import { t } from './i18n.js';

export function renderProposalTable() {
  const container = document.getElementById('proposal-table-container');
  if (!container) return;

  let html = `
    <div class="table-responsive">
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
    html += `
      <tr>
        <td>${item.id}</td>
        <td><strong>${t(item.descKey)}</strong></td>
        <td>${item.qty}</td>
        <td>${item.rate}</td>
        <td class="text-right font-weight-bold">${item.formattedAmount}</td>
      </tr>
    `;
  });

  html += `
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

  container.innerHTML = html;
}

export function initProposalActions() {
  const printBtn = document.getElementById('print-proof-btn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}
