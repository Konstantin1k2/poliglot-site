const schoolContacts = {
  phonePrimary: { label: '+7 (4212) 66-35-68', href: 'tel:+74212663568' },
  phoneSecondary: { label: '+7-914-195-05-95', href: 'tel:+79141950595' },
  email: { label: 'info@poliglot27.ru', href: 'mailto:info@poliglot27.ru' },
  address: 'ул. Профессора Даниловского, 29а, офис 21',
  city: 'г. Хабаровск',
  hours: 'Пн–Пт, с 10:00 до 20:00',
  mapUrl: 'https://2gis.ru/habarovsk/search/%D1%83%D0%BB%D0%B8%D1%86%D0%B0%20%D0%BF%D1%80%D0%BE%D1%84%D0%B5%D1%81%D1%81%D0%BE%D1%80%D0%B0%20%D0%B4%D0%B0%D0%BD%D0%B8%D0%BB%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B3%D0%BE%2029%D0%B0'
};

const hydrateContactFields = () => {
  const fieldMap = {
    'phone-primary': { text: schoolContacts.phonePrimary.label, href: schoolContacts.phonePrimary.href },
    'phone-secondary': { text: schoolContacts.phoneSecondary.label, href: schoolContacts.phoneSecondary.href },
    email: { text: schoolContacts.email.label, href: schoolContacts.email.href },
    address: { text: schoolContacts.address },
    city: { text: schoolContacts.city },
    hours: { text: schoolContacts.hours },
    'map-link': { href: schoolContacts.mapUrl }
  };

  document.querySelectorAll('[data-contact-field]').forEach((element) => {
    const config = fieldMap[element.dataset.contactField];
    if (!config) return;

    if (config.href && (element.tagName === 'A' || element.hasAttribute('data-force-link'))) {
      element.setAttribute('href', config.href);
    }

    if (config.text && !element.hasAttribute('data-contact-keep-label')) {
      element.textContent = config.text;
    }
  });
};

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('open');
  });
}

const programsModal = document.getElementById('programs-modal');
const contactModal = document.getElementById('contact-modal');
const openProgramsBtn = document.querySelector('.js-open-programs');
const openContactBtns = document.querySelectorAll('.js-open-contact');
const closeModalBtn = document.querySelector('.modal-close');
const closeContactBtn = document.querySelector('[data-close-contact="true"]');
const modalBackdrop = document.querySelector('[data-close-modal="true"]');
const contactModalBackdrop = document.querySelector('[data-close-contact-modal="true"]');

const closeModal = () => {
  if (programsModal) {
    programsModal.classList.remove('open');
    programsModal.setAttribute('aria-hidden', 'true');
  }

  if (contactModal) {
    contactModal.classList.remove('open');
    contactModal.setAttribute('aria-hidden', 'true');
  }
};

const openModal = () => {
  if (!programsModal) return;
  programsModal.classList.add('open');
  programsModal.setAttribute('aria-hidden', 'false');
};

const openContactModal = () => {
  if (!contactModal) return;
  closeModal();
  contactModal.classList.add('open');
  contactModal.setAttribute('aria-hidden', 'false');
};

if (openProgramsBtn) {
  openProgramsBtn.addEventListener('click', openModal);
}

openContactBtns.forEach((button) => {
  button.addEventListener('click', (event) => {
    const href = button.getAttribute('href');
    if (href && href.startsWith('#') === false && !href.startsWith('tel:') && !href.startsWith('mailto:')) {
      event.preventDefault();
    }
    openContactModal();
  });
});

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeModal);
}

if (closeContactBtn) {
  closeContactBtn.addEventListener('click', closeModal);
}

if (modalBackdrop) {
  modalBackdrop.addEventListener('click', closeModal);
}

if (contactModalBackdrop) {
  contactModalBackdrop.addEventListener('click', closeModal);
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && (programsModal?.classList.contains('open') || contactModal?.classList.contains('open'))) {
    closeModal();
  }
});

const yearNode = document.querySelector('[data-year]');
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

hydrateContactFields();
