/**
 * Единый источник контактных данных школы.
 * Подставляет актуальные телефон, адрес и часы работы
 * во все элементы с атрибутом data-contact-field.
 */
(() => {
  const CONTACTS = {
    'phone-primary': { label: '+7-4212-66-35-68', href: 'tel:+74212663568' },
    'phone-secondary': { label: '+7-914-195-05-95', href: 'tel:+79141950595' },
    email: { label: 'info@poliglot27.ru', href: 'mailto:info@poliglot27.ru' },
    address: { label: 'ул. Профессора Даниловского, 29а, офис 21' },
    city: { label: 'г. Хабаровск' },
    hours: { label: 'Пн–Пт, с 10:00 до 20:00' },
    instagram: { label: '@poliglot27', href: 'https://www.instagram.com/poliglot27/' },
    'map-link': { href: 'https://2gis.ru/khabarovsk/search/%D1%83%D0%BB%D0%B8%D1%86%D0%B0%20%D0%BF%D1%80%D0%BE%D1%84%D0%B5%D1%81%D1%81%D0%BE%D1%80%D0%B0%20%D0%B4%D0%B0%D0%BD%D0%B8%D0%BB%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B3%D0%BE%2029%D0%B0' }
  };

  const applyContact = (element, contact) => {
    if (!contact) return;

    if (contact.href && element.tagName === 'A') {
      element.setAttribute('href', contact.href);
    }

    if (contact.label && !element.hasAttribute('data-contact-keep-label')) {
      element.textContent = contact.label;
    }
  };

  document.querySelectorAll('[data-contact-field]').forEach((element) => {
    applyContact(element, CONTACTS[element.dataset.contactField]);
  });
})();
