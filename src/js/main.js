import { setLanguage, resolveInitialLanguage } from './i18n.js';
import { initUPI } from './upi.js';
import { renderProposalTable, initProposalActions } from './proposal.js';
import { initGallery } from './gallery.js';

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
      renderProposalTable(); // re-render table headers with selected language
    });
  });

  renderProposalTable();
  initProposalActions();
  initGallery();

  // Proof Images & Architectural Plans Lightbox Viewer
  const proofImgs = document.querySelectorAll('.proof-thumbnails img, .plan-card img');
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');

  proofImgs.forEach(img => {
    img.addEventListener('click', () => {
      if (lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
      }
    });
  });
});
