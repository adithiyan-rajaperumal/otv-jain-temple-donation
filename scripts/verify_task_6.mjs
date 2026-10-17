import fs from 'fs';
import path from 'path';

const root = path.resolve('.');
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`[PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${message}`);
    failedTests++;
  }
}

console.log('====================================================');
console.log('   Task 6 Verification: Temple Works Progress Gallery');
console.log('====================================================\n');

// 1. Verify Image Assets in public and dist
console.log('--- 1. Verifying Progress Photo Files on Disk ---');
const expectedPhotos = [
  'public/assets/images/progress/bhoomi_pooja/Bhoomi_pooja_1.jpg',
  'public/assets/images/progress/bhoomi_pooja/Bhoomi_pooja_2.jpg',
  'public/assets/images/progress/bhoomi_pooja/Bhoomi_pooja_3.jpg',
  'public/assets/images/progress/bhoomi_pooja/Bhoomi_pooja_4.jpg',
  'public/assets/images/progress/bhoomi_pooja/Bhoomi_pooja_5.jpg',
  'public/assets/images/progress/bhoomi_pooja/Bhoomi_pooja_6.jpg',
  'public/assets/images/progress/borewell/borewell_and_motor_fitting_1.jpg',
  'public/assets/images/progress/borewell/borewell_and_motor_fitting_2.jpg',
  'public/assets/images/progress/borewell/borewell_and_motor_fitting_3.jpg',
  'public/assets/images/progress/ground_levelling/ground_levelling_to_start_new_buildings_1.jpg',
  'public/assets/images/progress/ground_levelling/ground_levelling_to_start_new_buildings_2.jpg',
  'public/assets/images/progress/ground_levelling/ground_levelling_to_start_new_buildings_3.jpg'
];

expectedPhotos.forEach(p => {
  const fullPath = path.join(root, p);
  const exists = fs.existsSync(fullPath);
  const size = exists ? fs.statSync(fullPath).size : 0;
  assert(exists && size > 0, `Photo exists: ${p} (${Math.round(size / 1024)} KB)`);
});

// 2. Verify Data Structure in gallery.js
console.log('\n--- 2. Verifying gallery.js Data Structure & Exports ---');
const { progressItems, renderProgressGallery, openLightbox, closeLightbox, initProgressTabs, initTempleGallery, initGallery } = await import('../src/js/gallery.js');

assert(Array.isArray(progressItems), 'gallery.js exports progressItems array');
assert(progressItems.length === 12, `progressItems has exactly 12 items (found ${progressItems.length})`);

const bpItems = progressItems.filter(i => i.category === 'bhoomi_pooja');
const bwItems = progressItems.filter(i => i.category === 'borewell');
const glItems = progressItems.filter(i => i.category === 'ground_levelling');

assert(bpItems.length === 6, `Bhoomi Pooja category count is 6 (found ${bpItems.length})`);
assert(bwItems.length === 3, `Borewell category count is 3 (found ${bwItems.length})`);
assert(glItems.length === 3, `Ground Levelling category count is 3 (found ${glItems.length})`);

progressItems.forEach((item, idx) => {
  const hasFields = item.id && item.src && item.category && item.captionKey && item.date && item.badge;
  const webPathExists = fs.existsSync(path.join(root, 'public', item.src.replace(/^\//, '')));
  assert(hasFields && webPathExists, `Item ${idx + 1} (${item.src}): Valid schema & public asset exists`);
});

assert(typeof renderProgressGallery === 'function', 'renderProgressGallery is exported as a function');
assert(typeof openLightbox === 'function', 'openLightbox is exported as a function');
assert(typeof closeLightbox === 'function', 'closeLightbox is exported as a function');
assert(typeof initProgressTabs === 'function', 'initProgressTabs is exported as a function');
assert(typeof initGallery === 'function', 'initGallery is exported as a function');

// 3. Verify i18n Translations
console.log('\n--- 3. Verifying i18n Translation Keys Across 4 Languages ---');
const { en } = await import('../src/js/data/en.js');
const { ta } = await import('../src/js/data/ta.js');
const { hi } = await import('../src/js/data/hi.js');
const { kn } = await import('../src/js/data/kn.js');

const langs = [
  { code: 'en', dict: en },
  { code: 'ta', dict: ta },
  { code: 'hi', dict: hi },
  { code: 'kn', dict: kn }
];

const requiredKeys = [
  'progress_title',
  'progress_subtitle',
  'tab_all_works',
  'tab_bhoomi_pooja',
  'tab_borewell',
  'tab_ground_levelling'
];

langs.forEach(({ code, dict }) => {
  requiredKeys.forEach(k => {
    assert(dict[k] && dict[k].length > 0, `[${code}] has header/tab key: ${k}`);
  });

  progressItems.forEach(item => {
    assert(dict[item.captionKey] && dict[item.captionKey].length > 0, `[${code}] has caption key: ${item.captionKey}`);
  });
});

// 4. Verify index.html Markup
console.log('\n--- 4. Verifying index.html Markup ---');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf-8');

const requiredHtmlSnippets = [
  'id="progress-section"',
  'class="card progress-card no-print"',
  'data-i18n="progress_title"',
  'data-i18n="progress_subtitle"',
  'class="progress-tabs"',
  'class="progress-tab active"',
  'data-filter="all"',
  'data-i18n="tab_all_works"',
  'data-filter="bhoomi_pooja"',
  'data-i18n="tab_bhoomi_pooja"',
  'data-filter="borewell"',
  'data-i18n="tab_borewell"',
  'data-filter="ground_levelling"',
  'data-i18n="tab_ground_levelling"',
  'id="progress-grid"',
  'id="lightbox-modal"',
  'id="lightbox-img"',
  'id="lightbox-caption"'
];

requiredHtmlSnippets.forEach(snippet => {
  assert(html.includes(snippet), `HTML contains: ${snippet}`);
});

// 5. Verify CSS Styles in main.css
console.log('\n--- 5. Verifying CSS Rules in main.css ---');
const css = fs.readFileSync(path.join(root, 'src/css/main.css'), 'utf-8');

const requiredCssSnippets = [
  '.progress-card',
  '.progress-tabs',
  '.progress-tab',
  '.progress-tab.active',
  '.progress-grid',
  'minmax(160px, 1fr)',
  'minmax(240px, 1fr)',
  '.progress-card-item',
  '.progress-img-wrap',
  '.progress-thumb',
  '.progress-badge',
  '.progress-badge-bhoomi_pooja',
  '.progress-badge-borewell',
  '.progress-badge-ground_levelling',
  '.progress-date',
  '.progress-caption',
  '.lightbox-caption'
];

requiredCssSnippets.forEach(snippet => {
  assert(css.includes(snippet), `CSS contains: ${snippet}`);
});

// 6. Functional DOM Simulation
console.log('\n--- 6. Simulating DOM & Gallery Functionality ---');
// Create minimal DOM environment for testing
const mockGrid = {
  innerHTML: '',
  querySelectorAll(sel) {
    if (sel === '.progress-card-item') {
      const matches = [];
      const regex = /<div class="progress-card-item"[^>]*data-id="(\d+)"[^>]*>/g;
      let m;
      while ((m = regex.exec(this.innerHTML)) !== null) {
        const id = m[1];
        matches.push({
          getAttribute: (attr) => attr === 'data-id' ? id : null,
          addEventListener: () => {}
        });
      }
      return matches;
    }
    return [];
  }
};

const mockLightbox = {
  classList: {
    classes: new Set(),
    add(c) { this.classes.add(c); },
    remove(c) { this.classes.delete(c); },
    contains(c) { return this.classes.has(c); }
  }
};
const mockLightboxImg = { src: '' };
const mockLightboxCaption = { textContent: '', style: { display: 'none' } };

global.document = {
  getElementById(id) {
    if (id === 'progress-grid') return mockGrid;
    if (id === 'lightbox-modal') return mockLightbox;
    if (id === 'lightbox-img') return mockLightboxImg;
    if (id === 'lightbox-caption') return mockLightboxCaption;
    return null;
  },
  querySelectorAll() { return []; },
  addEventListener() {}
};

// Test render 'all'
renderProgressGallery('all');
assert(mockGrid.innerHTML.includes('progress-card-item'), 'renderProgressGallery("all") generates progress-card-item HTML');
const allCardMatches = (mockGrid.innerHTML.match(/class="progress-card-item"/g) || []).length;
assert(allCardMatches === 12, `renderProgressGallery("all") rendered 12 cards (found ${allCardMatches})`);

// Test render 'bhoomi_pooja'
renderProgressGallery('bhoomi_pooja');
const bpCardMatches = (mockGrid.innerHTML.match(/class="progress-card-item"/g) || []).length;
assert(bpCardMatches === 6, `renderProgressGallery("bhoomi_pooja") rendered 6 cards (found ${bpCardMatches})`);

// Test render 'borewell'
renderProgressGallery('borewell');
const bwCardMatches = (mockGrid.innerHTML.match(/class="progress-card-item"/g) || []).length;
assert(bwCardMatches === 3, `renderProgressGallery("borewell") rendered 3 cards (found ${bwCardMatches})`);

// Test render 'ground_levelling'
renderProgressGallery('ground_levelling');
const glCardMatches = (mockGrid.innerHTML.match(/class="progress-card-item"/g) || []).length;
assert(glCardMatches === 3, `renderProgressGallery("ground_levelling") rendered 3 cards (found ${glCardMatches})`);

// Test openLightbox
openLightbox('/assets/images/progress/borewell/borewell_and_motor_fitting_1.jpg', 'Test Borewell Caption');
assert(mockLightboxImg.src.includes('borewell_and_motor_fitting_1.jpg'), 'openLightbox set correct image src');
assert(mockLightboxCaption.textContent === 'Test Borewell Caption', 'openLightbox set correct caption text');
assert(mockLightboxCaption.style.display === 'block', 'openLightbox displayed caption block');
assert(mockLightbox.classList.contains('active'), 'openLightbox marked modal as active');

// Test closeLightbox
closeLightbox();
assert(!mockLightbox.classList.contains('active'), 'closeLightbox removed active class from modal');

console.log('\n====================================================');
console.log(`Verification Complete: ${passedTests}/${totalTests} tests PASSED, ${failedTests} FAILED`);
console.log('====================================================');

if (failedTests > 0) {
  process.exit(1);
}
