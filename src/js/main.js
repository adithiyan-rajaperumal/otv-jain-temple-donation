import { setLanguage } from './i18n.js';
import { initUPI } from './upi.js';
import { renderProposalTable, initProposalActions } from './proposal.js';
import { initGallery } from './gallery.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Modules
  initUPI();
  renderProposalTable();
  initProposalActions();
  initGallery();

  // Language Switching Buttons
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const lang = btn.getAttribute('data-lang');
      setLanguage(lang);
      renderProposalTable(); // re-render table headers with selected language
    });
  });

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

  // Default Language
  setLanguage('en');
});
