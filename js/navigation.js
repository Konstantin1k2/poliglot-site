/**
 * Мобильное меню, подсветка текущей страницы и год в подвале.
 */
(() => {
  const MOBILE_BREAKPOINT = 980;
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  const setMenuState = (isOpen) => {
    if (!navToggle || !navMenu) return;

    navMenu.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  };

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      setMenuState(!navMenu.classList.contains('open'));
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuState(false));
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) setMenuState(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setMenuState(false);
    });
  }

  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach((link) => {
    const targetFile = (link.getAttribute('href') || '').split('/').pop();

    if (targetFile !== currentFile || link.classList.contains('btn')) return;

    link.classList.add('is-active');
    link.setAttribute('aria-current', 'page');
  });

  const currentYear = String(new Date().getFullYear());
  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = currentYear;
  });

  // Подсветка (тень) шапки при скролле
  const headerSticky = document.querySelector('.header-sticky');
  if (headerSticky) {
    const updateHeaderShadow = () => {
      headerSticky.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    updateHeaderShadow();
    window.addEventListener('scroll', updateHeaderShadow, { passive: true });
  }

  const revealTargets = document.querySelectorAll('.section, .hero, .cta-box, .map-shell, .feature-box, .course-card, .benefit-box, .review-card, .step-card, .feature-item');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach((element) => {
      element.classList.add('reveal');
      observer.observe(element);
    });
  } else {
    revealTargets.forEach((element) => element.classList.add('is-visible'));
  }
})();
