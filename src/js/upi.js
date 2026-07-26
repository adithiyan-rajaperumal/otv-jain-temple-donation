const UPI_VPA = "f051m01588@indianbk";
const PAYEE_NAME = "SHRI VIRSHABANATH BHAGAWAN JAIN TEMPLE OTHALAVADI";

export function initUPI() {
  const chips = document.querySelectorAll('.chip');
  const customInput = document.getElementById('custom-amount-input');
  const payBtn = document.getElementById('pay-upi-btn');
  const copyVpaBtn = document.getElementById('copy-vpa-btn');
  const copyAccBtn = document.getElementById('copy-acc-btn');
  const copyIfscBtn = document.getElementById('copy-ifsc-btn');
  const qrModalBtn = document.getElementById('view-qr-btn');
  const qrModal = document.getElementById('qr-modal');
  const closeQrBtn = document.getElementById('close-qr-modal');

  let currentAmount = "11000";

  const downloadQrBtn = document.getElementById('download-qr-btn');
  const qrModalImg = document.querySelector('.qr-modal-img');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const val = chip.getAttribute('data-amount');
      if (val !== 'custom') {
        currentAmount = val;
        if (customInput) customInput.value = '';
      }
      updateUPILink();
    });
  });

  if (customInput) {
    customInput.addEventListener('input', (e) => {
      const val = e.target.value.replace(/[^0-9]/g, '');
      e.target.value = val;
      if (val) {
        chips.forEach(c => c.classList.remove('active'));
        currentAmount = val;
      } else {
        currentAmount = "11000";
      }
      updateUPILink();
    });
  }

  function getQrImageUrl(amount) {
    const amountParam = amount ? `&am=${amount}` : '';
    const noteParam = `&tn=${encodeURIComponent("Othalavadi Temple Renovation")}`;
    const upiUrl = `upi://pay?pa=${encodeURIComponent(UPI_VPA)}&pn=${encodeURIComponent(PAYEE_NAME)}${amountParam}&cu=INR${noteParam}`;
    return `https://quickchart.io/qr?text=${encodeURIComponent(upiUrl)}&size=300&margin=1`;
  }

  function updateUPILink() {
    const amountParam = currentAmount ? `&am=${currentAmount}` : '';
    const noteParam = `&tn=${encodeURIComponent("Othalavadi Temple Renovation")}`;
    const upiUrl = `upi://pay?pa=${encodeURIComponent(UPI_VPA)}&pn=${encodeURIComponent(PAYEE_NAME)}${amountParam}&cu=INR${noteParam}`;
    if (payBtn) {
      payBtn.setAttribute('href', upiUrl);
    }
    if (qrModalImg) {
      qrModalImg.src = getQrImageUrl(currentAmount);
    }
  }

  if (copyVpaBtn) {
    copyVpaBtn.addEventListener('click', () => showToastAndCopy(UPI_VPA, "UPI ID (f051m01588@indianbk) copied to clipboard!"));
  }
  if (copyAccBtn) {
    copyAccBtn.addEventListener('click', () => showToastAndCopy("8350857706", "Bank Account Number (8350857706) copied!"));
  }
  if (copyIfscBtn) {
    copyIfscBtn.addEventListener('click', () => showToastAndCopy("IDIB000D074", "IFSC Code (IDIB000D074) copied!"));
  }

  if (qrModalBtn && qrModal) {
    qrModalBtn.addEventListener('click', () => {
      updateUPILink();
      qrModal.classList.add('active');
    });
  }
  if (closeQrBtn && qrModal) {
    closeQrBtn.addEventListener('click', () => qrModal.classList.remove('active'));
  }

  if (downloadQrBtn) {
    downloadQrBtn.addEventListener('click', async () => {
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
