import { t } from './i18n.js';

export const progressItems = [
  {
    id: 1,
    src: '/assets/images/progress/bhoomi_pooja/Bhoomi_pooja_1.png',
    category: 'bhoomi_pooja',
    captionKey: 'progress_photo_bp_1',
    date: '26-08-2026',
    badge: 'Bhoomi Pooja'
  },
  {
    id: 2,
    src: '/assets/images/progress/bhoomi_pooja/Bhoomi_pooja_2.jpg',
    category: 'bhoomi_pooja',
    captionKey: 'progress_photo_bp_2',
    date: '26-08-2026',
    badge: 'Bhoomi Pooja'
  },
  {
    id: 3,
    src: '/assets/images/progress/bhoomi_pooja/Bhoomi_pooja_3.jpg',
    category: 'bhoomi_pooja',
    captionKey: 'progress_photo_bp_3',
    date: '26-08-2026',
    badge: 'Bhoomi Pooja'
  },
  {
    id: 4,
    src: '/assets/images/progress/bhoomi_pooja/Bhoomi_pooja_4.jpg',
    category: 'bhoomi_pooja',
    captionKey: 'progress_photo_bp_4',
    date: '26-08-2026',
    badge: 'Bhoomi Pooja'
  },
  {
    id: 5,
    src: '/assets/images/progress/bhoomi_pooja/Bhoomi_pooja_5.jpg',
    category: 'bhoomi_pooja',
    captionKey: 'progress_photo_bp_5',
    date: '26-08-2026',
    badge: 'Bhoomi Pooja'
  },
  {
    id: 6,
    src: '/assets/images/progress/bhoomi_pooja/Bhoomi_pooja_6.jpg',
    category: 'bhoomi_pooja',
    captionKey: 'progress_photo_bp_6',
    date: '26-08-2026',
    badge: 'Bhoomi Pooja'
  },
  {
    id: 7,
    src: '/assets/images/progress/borewell/borewell_and_motor_fitting_1.jpg',
    category: 'borewell',
    captionKey: 'progress_photo_bw_1',
    date: 'Sept 2026',
    badge: 'Borewell & Motor'
  },
  {
    id: 8,
    src: '/assets/images/progress/borewell/borewell_and_motor_fitting_2.jpg',
    category: 'borewell',
    captionKey: 'progress_photo_bw_2',
    date: 'Sept 2026',
    badge: 'Borewell & Motor'
  },
  {
    id: 9,
    src: '/assets/images/progress/borewell/borewell_and_motor_fitting_3.jpg',
    category: 'borewell',
    captionKey: 'progress_photo_bw_3',
    date: 'Sept 2026',
    badge: 'Borewell & Motor'
  },
  {
    id: 10,
    src: '/assets/images/progress/ground_levelling/ground_levelling_to_start_new_buildings_1.jpg',
    category: 'ground_levelling',
    captionKey: 'progress_photo_gl_1',
    date: 'Oct 2026',
    badge: 'Ground Levelling'
  },
  {
    id: 11,
    src: '/assets/images/progress/ground_levelling/ground_levelling_to_start_new_buildings_2.jpg',
    category: 'ground_levelling',
    captionKey: 'progress_photo_gl_2',
    date: 'Oct 2026',
    badge: 'Ground Levelling'
  },
  {
    id: 12,
    src: '/assets/images/progress/ground_levelling/ground_levelling_to_start_new_buildings_3.jpg',
    category: 'ground_levelling',
    captionKey: 'progress_photo_gl_3',
    date: 'Oct 2026',
    badge: 'Ground Levelling'
  }
];

export const templeImages = [
  { src: '/assets/images/temple/god.jpg', title: 'Moolavar Bhagwan Sri Adinathar (Aniyadha Azhagar)' },
  { src: '/assets/images/temple/Brammadeva_temple.jpg', title: 'Sri Brahmadeva Temple Shrine' },
  { src: '/assets/images/temple/padmavathi_temple.jpg', title: 'Sri Padmavati Mata Temple Shrine' },
  { src: '/assets/images/temple/front_view_with_manasthambam.jpg', title: 'Temple Front View with Manastambha' },
  { src: '/assets/images/temple/main_temple_gopuram.jpg', title: 'Main Temple Gopuram & Vimana Tower' },
  { src: '/assets/images/temple/temple_entrance.jpg', title: 'Main Temple Entrance Gate' },
  { src: '/assets/images/temple/temple_entrance (2).jpg', title: 'Main Temple Entrance Gateway Arch' },
  { src: '/assets/images/temple/temple_entrance_inner_view.jpg', title: 'Temple Entrance Gate Inner View' },
  { src: '/assets/images/temple/temple_entrance_long_view.jpg', title: 'Temple Entrance Long View' },
  { src: '/assets/images/temple/main_temple_left_side_gopuram_view.jpg', title: 'Main Temple Left Side Gopuram View' },
  { src: '/assets/images/temple/main_temple_left_side_view_gopuram.jpg', title: 'Main Temple Left Side Elevation' },
  { src: '/assets/images/temple/main_temple_right_side.jpg', title: 'Main Temple Right Side View' },
  { src: '/assets/images/temple/main_temple_from_right_side_view.jpg', title: 'Main Temple View from Right' },
  { src: '/assets/images/temple/main_temple_elevated.jpg', title: 'Main Temple Elevated View' },
  { src: '/assets/images/temple/main_temple_front_view_from_left.jpg', title: 'Main Temple Front View (Left)' },
  { src: '/assets/images/temple/main_temple_front_from_left.jpg', title: 'Main Temple Front Corridor' },
  { src: '/assets/images/temple/main_temple_back_view_from_left.jpg', title: 'Main Temple Rear View' },
  { src: '/assets/images/temple/main_temple_back_view_from_left2.jpg', title: 'Main Temple Rear Side View' },
  { src: '/assets/images/temple/walkway_inside_temple.jpg', title: 'Paved Walkway Inside Temple' },
  { src: '/assets/images/temple/proposed_plan_land_adjacent_to_temple.jpg', title: 'Proposed Yathi Nivas Construction Site Land' },
  { src: '/assets/images/temple/temple_view_from_proposed_building_site.jpg', title: 'Temple View from Proposed Yathi Nivas Site' }
];

let currentFilter = 'all';

export function getCategoryBadge(category, fallbackBadge) {
  const tabKey = `tab_${category}`;
  const tabLabel = t(tabKey);
  if (tabLabel && tabLabel !== tabKey) {
    return tabLabel.replace(/\s*\(\d+\)$/, '').trim();
  }
  return fallbackBadge;
}

export function openLightbox(src, caption = '') {
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');

  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  if (lightboxCaption) {
    if (caption) {
      lightboxCaption.textContent = caption;
      lightboxCaption.style.display = 'block';
    } else {
      lightboxCaption.textContent = '';
      lightboxCaption.style.display = 'none';
    }
  }
  lightbox.classList.add('active');
}

export function closeLightbox() {
  const lightbox = document.getElementById('lightbox-modal');
  if (lightbox) {
    lightbox.classList.remove('active');
  }
}

export function renderProgressGallery(filter = 'all') {
  currentFilter = filter;
  const grid = document.getElementById('progress-grid');
  if (!grid) return;

  const filteredItems = filter === 'all'
    ? progressItems
    : progressItems.filter(item => item.category === filter);

  if (filteredItems.length === 0) {
    grid.innerHTML = '<div class="progress-empty" style="text-align:center; padding:24px; color:var(--text-muted);">No progress photos found for this category.</div>';
    return;
  }

  const html = filteredItems.map(item => {
    const caption = t(item.captionKey) || item.captionKey;
    const badgeText = getCategoryBadge(item.category, item.badge);
    return `
      <div class="progress-card-item" data-category="${item.category}" data-id="${item.id}" role="button" tabindex="0" aria-label="${caption}">
        <div class="progress-img-wrap">
          <img src="${item.src}" alt="${caption}" loading="lazy" class="progress-thumb" />
          <span class="progress-badge progress-badge-${item.category}">${badgeText}</span>
          <span class="progress-date">${item.date}</span>
        </div>
        <div class="progress-info">
          <p class="progress-caption" title="${caption}">${caption}</p>
        </div>
      </div>
    `;
  }).join('');

  grid.innerHTML = html;

  // Bind click & keyboard interactions
  grid.querySelectorAll('.progress-card-item').forEach(card => {
    const itemId = parseInt(card.getAttribute('data-id'), 10);
    const item = progressItems.find(p => p.id === itemId);
    if (!item) return;

    const clickHandler = () => {
      const caption = t(item.captionKey) || item.captionKey;
      const badgeText = getCategoryBadge(item.category, item.badge);
      openLightbox(item.src, `${badgeText} (${item.date}) — ${caption}`);
    };

    card.addEventListener('click', clickHandler);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        clickHandler();
      }
    });
  });
}

export function initProgressTabs() {
  const tabs = document.querySelectorAll('.progress-tab');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.getAttribute('data-filter') || 'all';
      renderProgressGallery(filter);
    });
  });
}

export function initTempleGallery() {
  const container = document.getElementById('gallery-grid');
  if (!container) return;

  let html = '';
  templeImages.forEach((img, idx) => {
    html += `
      <div class="gallery-item" data-index="${idx}" role="button" tabindex="0" aria-label="${img.title}">
        <img src="${img.src}" alt="${img.title}" loading="lazy" />
        <div class="gallery-caption">${img.title}</div>
      </div>
    `;
  });

  container.innerHTML = html;

  container.querySelectorAll('.gallery-item').forEach(item => {
    const idx = parseInt(item.getAttribute('data-index'), 10);
    const clickHandler = () => {
      openLightbox(templeImages[idx].src, templeImages[idx].title);
    };

    item.addEventListener('click', clickHandler);
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        clickHandler();
      }
    });
  });
}

export function initLightbox() {
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxClose = document.getElementById('lightbox-close');

  if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }
}

export function initGallery() {
  initTempleGallery();
  renderProgressGallery('all');
  initProgressTabs();
  initLightbox();

  // Dynamically re-render progress captions whenever language changes
  document.addEventListener('languageChanged', () => {
    renderProgressGallery(currentFilter);
  });
}
