import { en } from './data/en.js';
import { ta } from './data/ta.js';
import { hi } from './data/hi.js';
import { kn } from './data/kn.js';

const translations = { en, ta, hi, kn };
let currentLang = 'en';

export function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  document.documentElement.lang = lang;
  
  // Text content updates
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // HTML content updates
  const htmlElements = document.querySelectorAll('[data-i18n-html]');
  htmlElements.forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  // Notice Body update
  const noticeContainer = document.getElementById('notice-text-content');
  if (noticeContainer && translations[lang].notice_body) {
    noticeContainer.innerHTML = translations[lang].notice_body.replace(/\n/g, '<br/>');
  }

  document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

export function t(key) {
  return (translations[currentLang] && translations[currentLang][key]) ? translations[currentLang][key] : key;
}

export function getCurrentLanguage() {
  return currentLang;
}
