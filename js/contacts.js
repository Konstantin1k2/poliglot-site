/**
 * Единый источник контактных данных школы.
 * Подставляет актуальные телефон, адрес и часы работы
 * во все элементы с атрибутом data-contact-field.
 */
(() => {
  const CONTACTS = {
    'phone-primary': { label: '+66-35-68', href: 'tel:+74212663568' },
    'phone-secondary': { label: '+7-914-195-05-95', href: 'tel:+79141950595' },
    email: { label: 'info@poliglot27.ru', href: 'mailto:info@poliglot27.ru' },
    address: { label: 'ул. Профессора Даниловского, 29а, офис 21' },
    city: { label: 'г. Хабаровск' },
    hours: { label: 'Пн–Пт, с 10:00 до 20:00' },
    instagram: { label: '@poliglot27', href: 'https://www.instagram.com/poliglot27/' }
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
