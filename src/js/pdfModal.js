/**
 * In-Page PDF Document Viewer Modal Component
 * 
 * Provides accessible, responsive in-page lightbox viewing for official temple documents:
 * - Form 80G Approval
 * - Form 12A Registration
 * - Masked Registered Trust Deed
 * - Bhattarak Swamiji Blessing Appeal (multilingual)
 * - Official Renovation Notice (multilingual)
 * - Certified Package 1, 2, 3 Engineering Estimates
 * 
 * Features:
 * - Dynamic iframe rendering with download and direct tab opening fallbacks
 * - Keyboard navigation (Escape dismissal) and backdrop click dismissal
 * - Focus management and background scroll-lock
 * - Delegated click listening for .btn-view-pdf, .btn-view-doc, and [data-pdf-url]
 */

let lastFocusedElement = null;

/**
 * Open the in-page PDF document viewer modal
 * @param {string} pdfUrl - Path to PDF document
 * @param {string} [titleText] - Localized or readable title of the document
 * @param {string} [downloadFilename] - Optional filename for download attribute
 */
export function openPdfModal(pdfUrl, titleText, downloadFilename) {
  const modal = document.getElementById('pdf-modal');
  if (!modal) return;

  lastFocusedElement = document.activeElement;

  const titleEl = document.getElementById('pdf-modal-title');
  if (titleEl) {
    titleEl.textContent = titleText || 'Official Document';
  }

  const frame = document.getElementById('pdf-modal-frame');
  if (frame) {
    frame.src = pdfUrl;
  }

  const downloadBtn = document.getElementById('pdf-modal-download-btn');
  if (downloadBtn) {
    downloadBtn.setAttribute('href', pdfUrl);
    if (downloadFilename) {
      downloadBtn.setAttribute('download', downloadFilename);
    } else {
      downloadBtn.removeAttribute('download');
    }
  }

  const directLink = document.getElementById('pdf-modal-direct-link');
  if (directLink) {
    directLink.setAttribute('href', pdfUrl);
  }

  modal.classList.add('active');
  if (document.body) {
    document.body.style.overflow = 'hidden';
  }

  const closeBtn = document.getElementById('close-pdf-modal');
  if (closeBtn && typeof closeBtn.focus === 'function') {
    closeBtn.focus();
  }
}

/**
 * Close the in-page PDF document viewer modal and free iframe resources
 */
export function closePdfModal() {
  const modal = document.getElementById('pdf-modal');
  if (!modal) return;

  modal.classList.remove('active');

  const frame = document.getElementById('pdf-modal-frame');
  if (frame) {
    frame.src = 'about:blank';
  }

  if (document.body) {
    document.body.style.overflow = '';
  }

  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    try {
      lastFocusedElement.focus();
    } catch (_) {
      // Ignore errors if element is disconnected
    }
  }
}

/**
 * Initialize event listeners for PDF modal controls and view trigger buttons
 */
export function initPdfModal() {
  const modal = document.getElementById('pdf-modal');
  if (!modal) return;

  if (modal.dataset && modal.dataset.pdfModalInitialized === 'true') {
    return;
  }

  const closeBtn = document.getElementById('close-pdf-modal');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closePdfModal();
    });
  }

  // Backdrop click dismisses modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closePdfModal();
    }
  });

  // Escape key dismisses modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closePdfModal();
    }
  });

  // Delegated click listener for all PDF viewer trigger buttons & links
  document.addEventListener('click', (e) => {
    const trigger = e.target && e.target.closest && e.target.closest('.btn-view-pdf, .btn-view-doc, [data-pdf-url]');
    if (trigger) {
      // Do not intercept action buttons inside the modal itself
      if (trigger.id === 'pdf-modal-download-btn' || trigger.id === 'pdf-modal-direct-link') {
        return;
      }

      e.preventDefault();
      const pdfUrl = trigger.getAttribute('data-pdf-url') || trigger.getAttribute('href');
      const titleText = trigger.getAttribute('data-pdf-title') || trigger.getAttribute('title') || trigger.textContent.trim();
      const downloadFilename = trigger.getAttribute('data-pdf-filename') || trigger.getAttribute('download') || '';

      if (pdfUrl && pdfUrl !== '#' && pdfUrl !== 'about:blank') {
        openPdfModal(pdfUrl, titleText, downloadFilename);
      }
    }
  });

  if (modal.dataset) {
    modal.dataset.pdfModalInitialized = 'true';
  }
}
