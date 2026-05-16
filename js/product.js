(function () {
  function setupFloatingBottles() {
    var floatingImgs = document.querySelectorAll('.subcategory-img.floating-bottle');
    if (!floatingImgs.length) return;

    function handleScroll() {
      if (window.innerWidth <= 780) {
        floatingImgs.forEach(function (img) {
          img.style.transform = '';
        });
        return;
      }

      floatingImgs.forEach(function (img) {
        var optionsSection = img.closest('.product-options');
        if (!optionsSection) return;

        var height = optionsSection.getBoundingClientRect().height;
        var rect = optionsSection.getBoundingClientRect();
        var diff = Math.max(0, Math.min(rect.top, window.innerHeight));

        if (diff > 0) {
          var scale = 1 + (2.0 * diff / height);
          img.style.transform = 'translateY(-' + (diff * 0.9) + 'px) scale(' + scale + ')';
        } else {
          img.style.transform = 'translateY(0) scale(1)';
        }
      });
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', setupFloatingBottles);
})();
