import { setLanguage, resolveInitialLanguage, getCurrentLanguage, t } from './i18n.js';
import { initUPI, showToast, showToastAndCopy } from './upi.js';
import { renderProposalTable, initProposalActions } from './proposal.js';
import { initGallery, openLightbox } from './gallery.js';

function initCredentialCopyButtons() {
  const copyButtons = [
    { id: 'copy-pan-btn', fallbackText: 'AAATZ4555B', labelKey: 'btn_copy_pan', fallbackLabel: 'Copy PAN' },
    { id: 'copy-80g-btn', fallbackText: 'AAATZ4555BF20261', labelKey: 'btn_copy_urn', fallbackLabel: '📋 Copy URN' },
    { id: 'copy-12a-btn', fallbackText: 'AAATZ4555BE20261', labelKey: 'btn_copy_urn', fallbackLabel: '📋 Copy URN' }
  ];

  copyButtons.forEach(cfg => {
    const btn = document.getElementById(cfg.id);
    if (!btn) return;

    btn.addEventListener('click', () => {
      const copyVal = btn.getAttribute('data-copy') || cfg.fallbackText;
      const originalText = btn.textContent;
      const copiedMsg = t('pan_copied') || '✓ Copied!';

      const setCopiedState = () => {
        btn.textContent = copiedMsg;
        btn.classList.add('btn-copied');
        showToast(`${btn.getAttribute('data-label') || 'Credential'} (${copyVal}) copied to clipboard!`);
        setTimeout(() => {
          if (cfg.labelKey) {
            btn.textContent = t(cfg.labelKey) || originalText;
          } else {
            btn.textContent = cfg.fallbackLabel || originalText;
          }
          btn.classList.remove('btn-copied');
        }, 2000);
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(copyVal)
          .then(setCopiedState)
          .catch(() => {
            showToastAndCopy(copyVal, `${copyVal} copied!`);
            setCopiedState();
          });
      } else {
        showToastAndCopy(copyVal, `${copyVal} copied!`);
        setCopiedState();
      }
    });
  });
}

function updateBhattarakDownloadLink(lang) {
  const btn = document.getElementById('download-bhattarak-letter-btn');
  if (!btn) return;
  const currentLang = lang || getCurrentLanguage() || 'ta';
  const pdfPath = `/assets/docs/bhattarak_letter_${currentLang}.pdf`;
  const filename = `Bhattarak_Swamiji_Blessing_Appeal_${currentLang}.pdf`;
  btn.setAttribute('href', pdfPath);
  btn.setAttribute('download', filename);
}

function updateNoticeDownloadLink(lang) {
  const btn = document.getElementById('download-notice-pdf-btn');
  if (!btn) return;
  const currentLang = lang || getCurrentLanguage() || 'ta';
  const pdfPath = `/assets/docs/notice_${currentLang}.pdf`;
  const filename = `Official_Notice_${currentLang}.pdf`;
  btn.setAttribute('href', pdfPath);
  btn.setAttribute('download', filename);
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Modules
  initUPI();

  // Determine initial language
  const initialLang = resolveInitialLanguage();
  setLanguage(initialLang);

  // Sync Language Switching Buttons Active Class
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    if (btn.getAttribute('data-lang') === initialLang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }

    btn.addEventListener('click', () => {
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const lang = btn.getAttribute('data-lang');
      setLanguage(lang);
      updateBhattarakDownloadLink(lang);
      updateNoticeDownloadLink(lang);
      renderProposalTable(); // re-render table headers with selected language
    });
  });

  // Initialize Credential Copy Buttons
  initCredentialCopyButtons();

  // Initialize Download Links
  updateBhattarakDownloadLink(initialLang);
  updateNoticeDownloadLink(initialLang);

  document.addEventListener('languageChanged', (e) => {
    if (e.detail && e.detail.lang) {
      updateBhattarakDownloadLink(e.detail.lang);
      updateNoticeDownloadLink(e.detail.lang);
    }
    renderProposalTable();
  });

  const bhattarakBtn = document.getElementById('download-bhattarak-letter-btn');
  if (bhattarakBtn) {
    bhattarakBtn.addEventListener('click', () => {
      updateBhattarakDownloadLink(getCurrentLanguage());
    });
  }

  const noticeBtn = document.getElementById('download-notice-pdf-btn');
  if (noticeBtn) {
    noticeBtn.addEventListener('click', () => {
      updateNoticeDownloadLink(getCurrentLanguage());
    });
  }

  renderProposalTable();
  initProposalActions();
  initGallery();

  // Proof Images & Architectural Plans Lightbox Viewer with keyboard accessibility
  const proofImgs = document.querySelectorAll('.proof-thumbnails img, .plan-card img');
  proofImgs.forEach(img => {
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    const openImgLightbox = () => {
      const caption = img.getAttribute('title') || img.getAttribute('alt') || '';
      openLightbox(img.src, caption);
    };
    img.addEventListener('click', openImgLightbox);
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openImgLightbox();
      }
    });
  });
});

