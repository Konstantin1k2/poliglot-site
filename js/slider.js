/**
 * Слайдер фотографий в hero-блоке.
 * Автопрокрутка останавливается при наведении, фокусе и на скрытой вкладке,
 * а также полностью отключается при prefers-reduced-motion.
 */
(() => {
  const AUTOPLAY_DELAY = 5200;

  const prefersReducedMotion = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const slider = document.querySelector('.hero-slider');
  const slides = Array.from(document.querySelectorAll('.hero-slide'));
  const dots = Array.from(document.querySelectorAll('.slider-dot'));
  const prevButton = document.querySelector('.slider-arrow-prev');
  const nextButton = document.querySelector('.slider-arrow-next');

  if (!slider || slides.length < 2 || dots.length !== slides.length) return;

  let activeIndex = 0;
  let autoplayId = null;

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, position) => {
      slide.classList.toggle('is-active', position === activeIndex);
    });

    dots.forEach((dot, position) => {
      const isActive = position === activeIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-pressed', String(isActive));
    });
  };

  const stopAutoplay = () => {
    if (autoplayId === null) return;
    window.clearInterval(autoplayId);
    autoplayId = null;
  };

  const startAutoplay = () => {
    stopAutoplay();
    if (document.hidden || prefersReducedMotion) return;

    autoplayId = window.setInterval(() => showSlide(activeIndex + 1), AUTOPLAY_DELAY);
  };

  dots.forEach((dot, position) => {
    dot.addEventListener('click', () => {
      showSlide(position);
      startAutoplay();
    });
  });

  prevButton?.addEventListener('click', () => {
    showSlide(activeIndex - 1);
    startAutoplay();
  });

  nextButton?.addEventListener('click', () => {
    showSlide(activeIndex + 1);
    startAutoplay();
  });

  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);
  slider.addEventListener('focusin', stopAutoplay);
  slider.addEventListener('focusout', startAutoplay);

  document.addEventListener('visibilitychange', startAutoplay);

  showSlide(0);
  startAutoplay();
})();
