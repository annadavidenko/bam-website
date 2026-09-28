/* =========================================
   BAM | Biophilic Anchor Method
   Master Script
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================
     1. Mobile Nav Toggle
     ========================================= */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');

  const closeMenu = () => {
    if (!navToggle || !navLinks) return;
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = !navLinks.classList.contains('open');
      navToggle.classList.toggle('open', willOpen);
      navLinks.classList.toggle('open', willOpen);
      navToggle.setAttribute('aria-expanded', String(willOpen));
      document.body.style.overflow = willOpen ? 'hidden' : '';
    });

    // Close when any nav link is tapped
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        closeMenu();
        navToggle.focus();
      }
    });

    // Close when clicking outside the nav
    document.addEventListener('click', (e) => {
      if (!navLinks.classList.contains('open')) return;
      if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
        closeMenu();
      }
    });

    // Reset when resizing back to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900 && navLinks.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  /* =========================================
     2. Fade-up on Scroll
     ========================================= */
  const fadeEls = document.querySelectorAll('.fade-up');

  if (fadeEls.length) {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || !('IntersectionObserver' in window)) {
      // Reveal everything immediately for accessibility / old browsers
      fadeEls.forEach(el => el.classList.add('visible'));
    } else {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px'
      });

      fadeEls.forEach(el => observer.observe(el));
    }
  }

});
