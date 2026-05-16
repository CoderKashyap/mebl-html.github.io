/* ============================================================
   MEBL – blog.js  (search/filter for blog listing)
   ============================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('blogSearch');
    const clearBtn = document.getElementById('clearSearch');
    const resultCount = document.getElementById('resultCount');
    const cards = document.querySelectorAll('#blogCards .blog-card');
    const noResults = document.getElementById('noResults');
    const resetBtn = document.getElementById('resetSearch');

    if (!searchInput) return;

    function filter(query) {
      const q = query.trim().toLowerCase();
      let visible = 0;

      cards.forEach(card => {
        const title = (card.dataset.title || '').toLowerCase();
        const author = (card.dataset.author || '').toLowerCase();
        const date = (card.dataset.date || '').toLowerCase();
        const match = !q || title.includes(q) || author.includes(q) || date.includes(q);
        card.style.display = match ? '' : 'none';
        if (match) visible++;
      });

      clearBtn.style.display = q ? 'flex' : 'none';

      if (q) {
        resultCount.textContent = visible === 0
          ? `No articles found for "${query}"`
          : `${visible} article${visible !== 1 ? 's' : ''} found`;
      } else {
        resultCount.textContent = '';
      }

      if (noResults) noResults.style.display = visible === 0 ? 'flex' : 'none';
    }

    searchInput.addEventListener('input', () => filter(searchInput.value));

    clearBtn?.addEventListener('click', () => {
      searchInput.value = '';
      filter('');
      searchInput.focus();
    });

    resetBtn?.addEventListener('click', () => {
      searchInput.value = '';
      filter('');
    });
  });
})();
