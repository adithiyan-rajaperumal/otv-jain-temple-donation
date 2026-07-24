export function initGallery() {
  const container = document.getElementById('gallery-grid');
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  if (!container) return;

  const images = [
    { src: '/assets/images/temple/IMG-20260722-WA0018.jpg', title: 'Sri Vrishabanath Bhagwan Moolavar (Aniyadha Azhagar)' },
    { src: '/assets/images/temple/IMG-20260722-WA0020.jpg', title: 'Moolavar Gopuram & Vimana Tower' },
    { src: '/assets/images/temple/IMG-20260722-WA0024.jpg', title: 'Front Mandapam & Pillars' },
    { src: '/assets/images/temple/IMG-20260722-WA0026.jpg', title: 'Manastambha (Pillar of Honor)' },
    { src: '/assets/images/temple/IMG-20260722-WA0029.jpg', title: 'Temple Entrance Gate & Arch' },
    { src: '/assets/images/temple/IMG-20260722-WA0031.jpg', title: 'Prakaram & Outer Pathway' },
    { src: '/assets/images/temple/IMG-20260722-WA0033.jpg', title: 'Inscriptions & Chola Heritage Walls' },
    { src: '/assets/images/temple/IMG-20260722-WA0034.jpg', title: 'Temple Premises & Courtyard' },
    { src: '/assets/images/temple/IMG-20260722-WA0035.jpg', title: 'Front View of Jinalayam' },
    { src: '/assets/images/temple/IMG-20260722-WA0036.jpg', title: 'Sanctum & Garbhagriha Entrance' },
    { src: '/assets/images/temple/IMG-20260722-WA0037.jpg', title: 'Tyagi Niwas Proposed Construction Site' },
    { src: '/assets/images/temple/IMG-20260722-WA0038.jpg', title: 'Around Garbhagriha Wall' },
    { src: '/assets/images/temple/IMG-20260722-WA0039.jpg', title: 'Temple Complex Ground View' },
    { src: '/assets/images/temple/IMG-20260722-WA0040.jpg', title: 'Rear View of Temple' },
    { src: '/assets/images/temple/IMG-20260722-WA0041.jpg', title: 'Side Elevation View' },
    { src: '/assets/images/temple/IMG-20260722-WA0042.jpg', title: 'Temple Boundary Pathway' },
    { src: '/assets/images/temple/IMG-20260722-WA0043.jpg', title: 'Temple Open Grounds' },
    { src: '/assets/images/temple/IMG-20260722-WA0044.jpg', title: 'Inner Mandapam Sculptures' },
    { src: '/assets/images/temple/IMG-20260722-WA0045.jpg', title: 'Sri Brahmadeva Shrine Area' },
    { src: '/assets/images/temple/IMG-20260722-WA0046.jpg', title: 'Borewell & Water Tank Site' },
    { src: '/assets/images/temple/IMG-20260722-WA0047.jpg', title: 'Temple Compound Entrance' }
  ];

  let html = '';
  images.forEach((img, idx) => {
    html += `
      <div class="gallery-item" data-index="${idx}">
        <img src="${img.src}" alt="${img.title}" loading="lazy" />
        <div class="gallery-caption">${img.title}</div>
      </div>
    `;
  });

  container.innerHTML = html;

  container.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const idx = item.getAttribute('data-index');
      lightboxImg.src = images[idx].src;
      lightbox.classList.add('active');
    });
  });

  if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('active');
    });
  }
}
