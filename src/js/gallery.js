export function initGallery() {
  const container = document.getElementById('gallery-grid');
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  if (!container) return;

  const images = [
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
