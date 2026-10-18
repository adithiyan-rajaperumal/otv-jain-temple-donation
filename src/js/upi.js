export const UPI_VPA = "f051m01588@indianbk";
export const PAYEE_NAME = "SHRI VIRSHABANATH BHAGAWAN JAIN TEMPLE OTHALAVADI";
export const BANK_ACCOUNT_NO = "8350857706";
export const BANK_IFSC = "IDIB000D074";
export const DEFAULT_AMOUNT = "11000";

let currentAmount = DEFAULT_AMOUNT;
let lastFocusedElement = null;

export function getCurrentAmount() {
  return currentAmount;
}

export function setCurrentAmount(amount) {
  currentAmount = String(amount);
  updateUPILink();
}

export function getUpiUrl(amount = currentAmount) {
  const amountParam = amount ? `&am=${amount}` : '';
  const noteParam = `&tn=${encodeURIComponent("Othalavadi Temple Renovation")}`;
  return `upi://pay?pa=${encodeURIComponent(UPI_VPA)}&pn=${encodeURIComponent(PAYEE_NAME)}${amountParam}&cu=INR${noteParam}`;
}

export function getQrImageUrl(amount = currentAmount) {
  const upiUrl = getUpiUrl(amount);
  return `https://quickchart.io/qr?text=${encodeURIComponent(upiUrl)}&size=300&margin=1`;
}

export function updateUPILink() {
  const upiUrl = getUpiUrl(currentAmount);
  const payBtn = document.getElementById('pay-upi-btn');
  if (payBtn) {
    payBtn.setAttribute('href', upiUrl);
  }

  const qrUrl = getQrImageUrl(currentAmount);
  const qrImages = document.querySelectorAll('.qr-modal-img, .modal-qr-image');
  qrImages.forEach(img => {
    img.src = qrUrl;
  });
}

export function switchTab(tab = 'upi') {
  const normalizedTab = tab === 'bank' ? 'bank' : 'upi';
  const tabBtns = document.querySelectorAll('.modal-tab-btn');
  const upiPane = document.getElementById('tab-content-upi');
  const bankPane = document.getElementById('tab-content-bank');

  tabBtns.forEach(btn => {
    const isTarget = btn.getAttribute('data-tab') === normalizedTab;
    if (isTarget) {
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    }
  });

  if (normalizedTab === 'bank') {
    if (upiPane) upiPane.classList.remove('active');
    if (bankPane) bankPane.classList.add('active');
  } else {
    if (bankPane) bankPane.classList.remove('active');
    if (upiPane) upiPane.classList.add('active');
  }
}

export function openDonationModal(initialTab = 'upi') {
  if (typeof document === 'undefined') return;
  lastFocusedElement = document.activeElement;
  const modal = document.getElementById('donation-modal');
  if (!modal) return;

  switchTab(initialTab);
  updateUPILink();
  modal.classList.add('active');

  const closeBtn = document.getElementById('close-donation-modal');
  if (closeBtn) {
    closeBtn.focus();
  }
}

export function closeDonationModal() {
  if (typeof document === 'undefined') return;
  const modal = document.getElementById('donation-modal');
  if (modal) {
    modal.classList.remove('active');
  }
  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
  }
}

export function initUPI() {
  if (typeof document === 'undefined') return;

  const modal = document.getElementById('donation-modal');
  const closeBtn = document.getElementById('close-donation-modal');
  const heroDonateBtn = document.getElementById('hero-donate-btn');
  const mobileFab = document.getElementById('mobile-donate-fab');
  const openDonateModalBtn = document.getElementById('open-donate-modal-btn');
  const openBankModalBtn = document.getElementById('open-bank-modal-btn');
  const tabBtns = document.querySelectorAll('.modal-tab-btn');
  const chips = document.querySelectorAll('#donation-modal .chip, .chip');
  const customInput = document.getElementById('custom-amount-input');
  const downloadQrBtn = document.getElementById('download-qr-btn');

  // 1. Modal triggers
  if (heroDonateBtn) {
    heroDonateBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openDonationModal('upi');
    });
  }

  if (mobileFab) {
    mobileFab.addEventListener('click', (e) => {
      e.preventDefault();
      openDonationModal('upi');
    });
  }

  if (openDonateModalBtn) {
    openDonateModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openDonationModal('upi');
    });
  }

  if (openBankModalBtn) {
    openBankModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openDonationModal('bank');
    });
  }

  // 2. Modal close handlers
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDonationModal();
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      const modalContent = modal.querySelector('.modal-content');
      if (e.target === modal || (modalContent && typeof modalContent.contains === 'function' && !modalContent.contains(e.target))) {
        closeDonationModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      const activeModal = document.getElementById('donation-modal');
      if (activeModal && activeModal.classList.contains('active')) {
        closeDonationModal();
      }
    }
  });

  // 3. Tab switching buttons
  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = btn.getAttribute('data-tab') || 'upi';
      switchTab(targetTab);
    });
  });

  // 4. Preset amount chips
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const val = chip.getAttribute('data-amount');
      if (val && val !== 'custom') {
        currentAmount = val;
        if (customInput) customInput.value = '';
      }
      updateUPILink();
    });
  });

  // 5. Custom amount input
  if (customInput) {
    customInput.addEventListener('input', (e) => {
      const val = e.target.value.replace(/[^0-9]/g, '');
      e.target.value = val;
      if (val && parseInt(val, 10) > 0) {
        chips.forEach(c => c.classList.remove('active'));
        currentAmount = val;
      } else {
        currentAmount = DEFAULT_AMOUNT;
      }
      updateUPILink();
    });
  }

  // 6. One-click copy buttons
  const vpaButtons = ['copy-vpa-btn', 'modal-copy-vpa-btn'];
  vpaButtons.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        showToastAndCopy(UPI_VPA, `UPI ID (${UPI_VPA}) copied to clipboard!`);
      });
    }
  });

  const accButtons = ['copy-acc-btn', 'copy-acc-btn-modal'];
  accButtons.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        showToastAndCopy(BANK_ACCOUNT_NO, `Bank Account Number (${BANK_ACCOUNT_NO}) copied!`);
      });
    }
  });

  const ifscButtons = ['copy-ifsc-btn', 'copy-ifsc-btn-modal'];
  ifscButtons.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        showToastAndCopy(BANK_IFSC, `IFSC Code (${BANK_IFSC}) copied!`);
      });
    }
  });

  // 7. Download QR code button
  if (downloadQrBtn) {
    downloadQrBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        const qrUrl = getQrImageUrl(currentAmount);
        const response = await fetch(qrUrl);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = `1008_Temple_UPI_QR_₹${currentAmount}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
        showToast("QR Code image downloaded to gallery!");
      } catch (err) {
        window.open(getQrImageUrl(currentAmount), '_blank');
      }
    });
  }

  // Backwards compatibility for legacy QR modal if present
  const legacyQrModalBtn = document.getElementById('view-qr-btn');
  if (legacyQrModalBtn) {
    legacyQrModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openDonationModal('upi');
    });
  }

  // Initialize links on load
  updateUPILink();
}

export function showToastAndCopy(text, message) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(message);
    }).catch(() => {
      fallbackCopyTextToClipboard(text, message);
    });
  } else {
    fallbackCopyTextToClipboard(text, message);
  }
}

function fallbackCopyTextToClipboard(text, message) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(message);
  } catch (err) {
    showToast("Copy failed, please copy manually.");
  }
  document.body.removeChild(textArea);
}

export function showToast(message) {
  const container = document.getElementById('toast-container') || createToastContainer();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function createToastContainer() {
  const c = document.createElement('div');
  c.id = 'toast-container';
  c.className = 'toast-container';
  document.body.appendChild(c);
  return c;
}
