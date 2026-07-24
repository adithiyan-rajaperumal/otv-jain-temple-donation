export function initGallery() {
  const container = document.getElementById('gallery-grid');
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  if (!container) return;

  const images = [
    { src: '/assets/images/temple/IMG-20260722-WA0047.jpg', title: 'Moolavar Bhagwan Sri Adinathar (Aniyadha Azhagar)' },
    { src: '/assets/images/temple/IMG-20260722-WA0036.jpg', title: 'Sri Padmavati Mata Shrine' },
    { src: '/assets/images/temple/IMG-20260722-WA0035.jpg', title: 'Main Jinalayam Mukhamandapam & Gopuram Side View' },
    { src: '/assets/images/temple/IMG-20260722-WA0026.jpg', title: 'Granitic Manastambha (Pillar of Honor)' },
    { src: '/assets/images/temple/IMG-20260722-WA0040.jpg', title: 'Temple Entrance Gateway & Archway' },
    { src: '/assets/images/temple/IMG-20260722-WA0041.jpg', title: 'Gateway View towards Manastambha' },
    { src: '/assets/images/temple/IMG-20260722-WA0044.jpg', title: 'Moolavar Gopuram & Vimana Tower' },
    { src: '/assets/images/temple/IMG-20260722-WA0045.jpg', title: 'Gopuram Vrishabha (Bull) Sculpture' },
    { src: '/assets/images/temple/IMG-20260722-WA0038.jpg', title: 'Manastambha Base & Pillared Mukhamandapam' },
    { src: '/assets/images/temple/IMG-20260722-WA0039.jpg', title: 'Proposed Yathi Nivas Construction Ground' },
    { src: '/assets/images/temple/IMG-20260722-WA0033.jpg', title: 'Prakaram Pathway & Loudspeaker Tower' },
    { src: '/assets/images/temple/IMG-20260722-WA0031.jpg', title: 'Outer Prakaram Inscription Wall' },
    { src: '/assets/images/temple/IMG-20260722-WA0042.jpg', title: 'Temple Precincts & Surrounding Wall' },
    { src: '/assets/images/temple/IMG-20260722-WA0043.jpg', title: 'Paved Stone Flooring Precincts' },
    { src: '/assets/images/temple/IMG-20260722-WA0020.jpg', title: 'White Vimana Tower Close-up' },
    { src: '/assets/images/temple/IMG-20260722-WA0018.jpg', title: 'Temple Gopuram & Cloudscape' },
    { src: '/assets/images/temple/IMG-20260722-WA0024.jpg', title: 'Front Pillared Corridor' },
    { src: '/assets/images/temple/IMG-20260722-WA0029.jpg', title: 'Entrance Arch Front View' },
    { src: '/assets/images/temple/IMG-20260722-WA0034.jpg', title: 'Temple Sanctum External Wall' }
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
