/**
 * Слайдер фотографий в hero-блоке.
 * Автопрокрутка останавливается при наведении, фокусе и на скрытой вкладке,
 * а также полностью отключается при prefers-reduced-motion.
 * Прогресс-бар и счётчик синхронизируются со сменой слайдов.
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
  const progress = document.querySelector('.hero-slider-progress');
  const counter = document.querySelector('.slider-counter');

  if (!slider || slides.length < 2 || dots.length !== slides.length) return;

  let activeIndex = 0;
  let autoplayId = null;
  let progressAnimation = null;

  const total = slides.length;

  const updateCounter = () => {
    if (counter) counter.textContent = `${activeIndex + 1} / ${total}`;
  };

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

    updateCounter();
    restartProgress();
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
    restartProgress();
  };

  const restartProgress = () => {
    if (!progress) return;
    if (progressAnimation) {
      progressAnimation.cancel();
      progressAnimation = null;
    }
    progress.style.width = '0%';
    if (prefersReducedMotion || document.hidden) return;
    progressAnimation = progress.animate(
      [{ width: '0%' }, { width: '100%' }],
      { duration: AUTOPLAY_DELAY, easing: 'linear' }
    );
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

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoplay();
      if (progressAnimation) { progressAnimation.cancel(); progressAnimation = null; }
    } else {
      startAutoplay();
    }
  });

  showSlide(0);
  startAutoplay();
})();
