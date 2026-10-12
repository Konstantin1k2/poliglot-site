/**
 * Модальные окна: программы и контакты.
 * Управляет открытием, закрытием, блокировкой прокрутки и возвратом фокуса.
 */
(() => {
  const modals = Array.from(document.querySelectorAll('.modal'));
  if (!modals.length) return;

  const programsModal = document.getElementById('programs-modal');
  const contactModal = document.getElementById('contact-modal');
  let lastTrigger = null;

  const openModal = (modal, trigger) => {
    if (!modal) return;

    modals.forEach((item) => {
      item.classList.remove('open');
      item.setAttribute('aria-hidden', 'true');
    });

    lastTrigger = trigger || null;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const focusTarget = modal.querySelector('.modal-close');
    if (focusTarget) focusTarget.focus();
  };

  const closeModals = () => {
    const hasOpenModal = modals.some((modal) => modal.classList.contains('open'));
    if (!hasOpenModal) return;

    modals.forEach((modal) => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    });

    document.body.style.overflow = '';

    if (lastTrigger) {
      lastTrigger.focus();
      lastTrigger = null;
    }
  };

  document.querySelectorAll('.js-open-programs').forEach((trigger) => {
    trigger.addEventListener('click', () => openModal(programsModal, trigger));
  });

  document.querySelectorAll('.js-open-contact').forEach((trigger) => {
    trigger.addEventListener('click', () => openModal(contactModal, trigger));
  });

  document.querySelectorAll('[data-close-modal], [data-close-contact-modal], .modal-close').forEach((element) => {
    element.addEventListener('click', closeModals);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModals();
  });
})();
