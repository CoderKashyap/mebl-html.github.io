/* MEBL – components.js
   Injects the shared navbar and footer into every page.

   Usage (root pages):
     <div id="navbar-placeholder" data-transparent="true"></div>
     ...
     <div id="footer-placeholder"></div>
     <script src="js/components.js" data-base=""></script>

   Usage (sub-pages like products/, policies/):
     <script src="../js/components.js" data-base="../"></script>
*/

(function () {
  'use strict';

  /* Capture base path synchronously — document.currentScript is null
     inside async callbacks, so we grab it here at script-execution time. */
  const base = (function () {
    const s = document.currentScript;
    return s ? (s.getAttribute('data-base') || '') : '';
  })();

  function buildNavbar(b, transparent) {
    return (
      '<div id="navbar"' + (transparent ? ' class="transparent"' : '') + '>\n' +
      '  <header>\n' +
      '    <nav class="nav-inner">\n' +
      '      <ul class="nav-menu">\n' +
      '        <div class="nav-half">\n' +
      '          <li><a href="' + b + 'index.html" class="nav-link">Home</a></li>\n' +
      '          <li class="nav-dropdown">\n' +
      '            <button class="nav-dropdown-btn">Meet Our Brews</button>\n' +
      '            <ul class="nav-dropdown-menu">\n' +
      '              <li><a href="' + b + 'products/stok.html">Stok</a></li>\n' +
      '              <li><a href="' + b + 'products/lemount.html">Lemount</a></li>\n' +
      '              <li><a href="' + b + 'products/mount-6000.html">Mount\'s 6000</a></li>\n' +
      '              <li><a href="' + b + 'products/dabang.html">Dabang</a></li>\n' +
      '            </ul>\n' +
      '          </li>\n' +
      '          <li class="nav-dropdown nav-media-dropdown">\n' +
      '            <button class="nav-dropdown-btn" data-href="' + b + 'media.html">Media</button>\n' +
      '            <ul class="nav-dropdown-menu">\n' +
      '              <li class="nav-media-all"><a href="' + b + 'media.html">All Media</a></li>\n' +
      '              <li><a href="' + b + 'press-release.html">Press Release</a></li>\n' +
      '              <li><a href="' + b + 'events-awards.html">Events / Awards</a></li>\n' +
      '              <li><a href="' + b + 'stories.html">Stories</a></li>\n' +
      '            </ul>\n' +
      '          </li>\n' +
      '        </div>\n' +
      '        <div class="nav-half nav-half-right">\n' +
      '          <li><a href="' + b + 'career.html" class="nav-link">Career</a></li>\n' +
      '          <li><a href="' + b + 'investor-relations.html" class="nav-link">Investor Relations</a></li>\n' +
      '          <li><a href="' + b + 'about-us.html" class="nav-link">About us</a></li>\n' +
      '        </div>\n' +
      '      </ul>\n' +
      '      <div class="nav-logo">\n' +
      '        <a href="' + b + 'index.html">\n' +
      '          <img src="' + b + 'img/logo.webp" alt="Mount Everest Breweries logo" />\n' +
      '        </a>\n' +
      '      </div>\n' +
      '      <div class="hamburger" aria-label="Toggle menu">\n' +
      '        <span class="bar"></span>\n' +
      '        <span class="bar"></span>\n' +
      '        <span class="bar"></span>\n' +
      '      </div>\n' +
      '    </nav>\n' +
      '  </header>\n' +
      '</div>'
    );
  }

  function buildFooter(b) {
    return (
      '<footer class="site-footer">\n' +
      '  <div class="footer-inner">\n' +
      '    <div class="footer-top">\n' +
      '      <div class="footer-brand">\n' +
      '        <div class="footer-logo">\n' +
      '          <img src="' + b + 'img/logo-mneumonic.webp" alt="MEBL logo" />\n' +
      '        </div>\n' +
      '        <img class="footer-mobile-logo" src="' + b + 'img/logo.webp" alt="MEBL logo" />\n' +
      '        <div class="footer-name-msg">\n' +
      '          <div class="footer-company-name">Mount Everest Breweries Limited</div>\n' +
      '          <div class="footer-message">Thanks for stopping by our corner of the internet!<br />Whether you\'re here to sip, savor, or join our brewing journey, we\'re excited to have you along.</div>\n' +
      '          <div class="footer-socials">\n' +
      '            <a href="https://www.linkedin.com/company/mount-everest-breweries-limited/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>\n' +
      '          </div>\n' +
      '        </div>\n' +
      '      </div>\n' +
      '      <div class="footer-nav">\n' +
      '        <nav>\n' +
      '          <ul>\n' +
      '            <li><a href="' + b + 'index.html">Home</a></li>\n' +
      '            <li><a href="' + b + 'index.html#meet-our-beers">Meet Our Brews</a></li>\n' +
      '            <li><a href="' + b + 'career.html">Careers</a></li>\n' +
      '            <li><a href="' + b + 'media.html">Media</a></li>\n' +
      '            <li><a href="' + b + 'investor-relations.html">Investor Relations</a></li>\n' +
      '            <li><a href="' + b + 'about-us.html">About us</a></li>\n' +
      '          </ul>\n' +
      '        </nav>\n' +
      '      </div>\n' +
      '      <div class="footer-contact">\n' +
      '        <div class="footer-contact-item">\n' +
      '          <img src="' + b + 'icons/phone.svg" alt="phone" />\n' +
      '          <span>0731-4780400/500</span>\n' +
      '        </div>\n' +
      '        <div class="footer-contact-item">\n' +
      '          <img src="' + b + 'icons/location.svg" alt="address" />\n' +
      '          <span>4th Floor BPK Star Tower,<br />Above Shoppers Stop,<br />AB Road,<br />Indore – 452008.</span>\n' +
      '        </div>\n' +
      '      </div>\n' +
      '      <div class="footer-mobile-socials">\n' +
      '        <a href="https://www.linkedin.com/company/mount-everest-breweries-limited/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>\n' +
      '      </div>\n' +
      '    </div>\n' +
      '    <div class="footer-bottom">\n' +
      '      <a href="' + b + 'policies/privacy-policy.html">Privacy Policy</a>\n' +
      '      <a href="' + b + 'policies/terms.html">Terms of use</a>\n' +
      '      <div class="footer-copyright">© 2026–Present Mount Everest Breweries LTD. All Rights Reserved.</div>\n' +
      '    </div>\n' +
      '  </div>\n' +
      '</footer>'
    );
  }

  function inject() {
    var navPlaceholder = document.getElementById('navbar-placeholder');
    if (navPlaceholder) {
      var transparent = navPlaceholder.getAttribute('data-transparent') === 'true';
      var navDiv = document.createElement('div');
      navDiv.innerHTML = buildNavbar(base, transparent);
      navPlaceholder.parentNode.replaceChild(navDiv.firstElementChild, navPlaceholder);
    }

    var footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
      var footerDiv = document.createElement('div');
      footerDiv.innerHTML = buildFooter(base);
      footerPlaceholder.parentNode.replaceChild(footerDiv.firstElementChild, footerPlaceholder);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
