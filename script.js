/**
 * @fileoverview Головний JavaScript файл лендінгу TechVolt.
 * Відповідає за навігацію, активні посилання та плавний скрол.
 * Інтегровано Logger та ErrorHandler для логування та обробки помилок.
 *
 * @module script
 * @author Gazman4iK1
 * @version 1.3.0
 */

// ===== НАВІГАЦІЯ (виправлено лінтером ESLint) =====

/**
 * Елемент кнопки бургер-меню.
 * @type {HTMLElement|null}
 */
const burger = document.getElementById('burger');

/**
 * Контейнер навігаційних посилань.
 * @type {HTMLElement|null}
 */
const navList = document.querySelector('.nav__list');

/**
 * Ініціалізує бургер-меню для мобільної навігації.
 * Логує відкриття/закриття меню на рівні DEBUG.
 *
 * @example
 * // Після кліку на burger:
 * // navList отримує клас 'open'
 * // burger отримує aria-expanded="true"
 */
if (burger && navList) {
  burger.addEventListener('click', () => {
    try {
      const isOpen = navList.classList.toggle('open');
      burger.setAttribute('aria-expanded', isOpen);
      burger.setAttribute('aria-label', isOpen ? 'Закрити меню' : 'Відкрити меню');
      Logger.debug('Navigation', `Бургер-меню ${isOpen ? 'відкрито' : 'закрито'}`);
    } catch (e) {
      ErrorHandler.handle(e, 'Navigation', { action: 'burger-click' });
    }
  });

  navList.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navList.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
} else {
  Logger.warn('Navigation', 'Елементи навігації не знайдено', {
    burger: !!burger,
    navList: !!navList
  });
}

// ===== АКТИВНЕ ПОСИЛАННЯ ПРИ СКРОЛІ =====

/**
 * Колекція секцій сторінки з атрибутом id.
 * @type {NodeList}
 */
const sections = document.querySelectorAll('section[id]');

/**
 * Колекція навігаційних посилань.
 * @type {NodeList}
 */
const navLinks = document.querySelectorAll('.nav__link');

/**
 * Intersection Observer для визначення активної секції при скролі.
 * Логує зміну активної секції на рівні DEBUG.
 *
 * @type {IntersectionObserver}
 *
 * @example
 * // Коли користувач скролить до секції #methodology:
 * // <a href="#methodology" class="nav__link active">Методологія</a>
 */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
      Logger.debug('Navigation', `Активна секція: #${entry.target.id}`);
    }
  });
}, { threshold: 0.4 });

sections.forEach((section) => observer.observe(section));

Logger.info('Navigation', 'Intersection Observer ініціалізовано', {
  sectionsCount: sections.length
});

// ===== ПЛАВНИЙ СКРОЛ =====

/**
 * Ініціалізує плавний скрол для всіх якірних посилань сторінки.
 * Логує переходи між секціями на рівні INFO.
 *
 * @example
 * // <a href="#about">Про роботу</a>
 * // При кліку — плавно прокручує до <section id="about">
 */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function handleClick(e) {
    try {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        Logger.info('Navigation', `Перехід до секції: ${this.getAttribute('href')}`);
      }
    } catch (e) {
      ErrorHandler.handle(e, 'Navigation', {
        action: 'smooth-scroll',
        href: this.getAttribute('href')
      });
    }
  });
});

Logger.info('App', 'Ініціалізацію script.js завершено');
