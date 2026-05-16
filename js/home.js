/* ============================================================
   MEBL – home.js  (carousel auto-play)
   ============================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {

    /* ── Gallery video hover ─────────────────────────────── */
    document.querySelectorAll('.gallery-item').forEach(item => {
      const video = item.querySelector('.gallery-video');
      if (!video) return;
      item.addEventListener('mouseenter', () => {
        video.play().catch(() => {});
      });
      item.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
      });
    });

    const track = document.getElementById('carouselTrack');
    if (!track) return;

    const dots = document.querySelectorAll('.carousel-dot');
    let current = 0;
    const total = track.children.length;
    const INTERVAL = 5000;

    function goTo(index) {
      current = (index + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    dots.forEach(dot => {
      dot.addEventListener('click', () => goTo(Number(dot.dataset.index)));
    });

    let timer = setInterval(() => goTo(current + 1), INTERVAL);

    track.addEventListener('mouseenter', () => clearInterval(timer));
    track.addEventListener('mouseleave', () => {
      timer = setInterval(() => goTo(current + 1), INTERVAL);
    });

    /* touch swipe */
    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    }, { passive: true });
  });
})();
