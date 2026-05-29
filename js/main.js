/* ============================================================
   MEBL – main.js
   Handles: age-gate check, navbar scroll behaviour, mobile menu,
   product dropdown, smooth page transitions.
   ============================================================ */

(function () {
  'use strict';

  /* ── Lenis smooth scroll ─────────────────────────────────── */
  function startLenis() {
    const lenis = new Lenis({
      duration: 0.7,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smooth: true,
      smoothTouch: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  if (typeof Lenis !== 'undefined') {
    startLenis();
  } else {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/lenis@1.1.20/dist/lenis.min.js';
    s.onload = startLenis;
    document.head.appendChild(s);
  }

  /* ── Age gate ────────────────────────────────────────────── */
  const AGE_KEY = 'verification';

  function checkAgeGate() {
    const exempt = [
      'age-verification.html',
      'age-restriction.html',
      'privacy-policy.html',
      'terms.html',
    ];
    const path = window.location.pathname;
    const page = path.split('/').pop() || '';
    if (exempt.some(p => page.includes(p) || path.includes(p.replace('.html', '')))) return;

    const verified = localStorage.getItem(AGE_KEY);
    if (verified !== 'true') {
      window.location.href = resolveRoot('age-verification.html');
    }
  }

  /* resolve root-relative URL from any sub-page */
  function resolveRoot(file) {
    const depth = window.location.pathname.split('/').filter(Boolean).length - 1;
    const prefix = depth > 0 ? '../'.repeat(depth) : '';
    return prefix + file;
  }

  /* ── Navbar ──────────────────────────────────────────────── */
  function initNavbar() {
    const navbar = document.getElementById('navbar'); 
    if (!navbar) return;

    const startsTransparent = navbar.classList.contains('transparent');
    let prevScroll = window.scrollY;

    function onScroll() {
      const cur = window.scrollY;
      if (startsTransparent) {
        if (cur < 20) {
          navbar.classList.add('transparent');
        } else {
          navbar.classList.remove('transparent');
        }
      }
      if (cur <= 20) {
        navbar.classList.remove('hide');
      } else if (prevScroll > cur) {
        navbar.classList.remove('hide');
      } else if (cur > prevScroll) {
        navbar.classList.add('hide');
      }
      prevScroll = cur;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile hamburger menu ───────────────────────────────── */
  function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    /* close on link click */
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  /* ── Dropdowns (mobile tap + desktop navigate) ──────────── */
  function initDropdown() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    if (!dropdowns.length) return;

    /* Desktop: buttons with data-href navigate on click */
    if (window.innerWidth > 780) {
      dropdowns.forEach(function (dropdown) {
        const btn = dropdown.querySelector('.nav-dropdown-btn');
        if (btn && btn.getAttribute('data-href')) {
          btn.addEventListener('click', function () {
            window.location.href = btn.getAttribute('data-href');
          });
        }
      });
      return;
    }

    /* Mobile: each dropdown becomes a centered popup modal */
    dropdowns.forEach(function (dropdown) {
      const btn = dropdown.querySelector('.nav-dropdown-btn');
      const menu = dropdown.querySelector('.nav-dropdown-menu');
      if (!btn || !menu) return;

      /* move menu to body so it escapes the navbar stacking context
         (backdrop-filter on #navbar traps z-index of descendants) */
      document.body.appendChild(menu);

      const overlay = document.createElement('div');
      overlay.className = 'nav-dropdown-overlay';
      document.body.appendChild(overlay);

      function openPopup() {
        menu.classList.add('open');
        overlay.classList.add('open');
      }

      function closePopup() {
        menu.classList.remove('open');
        overlay.classList.remove('open');
      }

      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        openPopup();
      });

      overlay.addEventListener('click', closePopup);

      menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closePopup);
      });
    });
  }

  /* ── Smooth scroll for anchor links ─────────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const id = this.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (window.history?.replaceState) {
          window.history.replaceState(null, '', '#' + id);
        }
      });
    });
  }

  /* ── Init ─────────────────────────────────────────────────  */
  document.addEventListener('DOMContentLoaded', () => {
    checkAgeGate();
    initNavbar();
    initMobileMenu();
    initDropdown();
    initSmoothScroll();
  });
})();
