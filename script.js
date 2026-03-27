/**
 * @fileoverview Головний JavaScript файл лендінгу TechVolt.
 * Відповідає за навігацію, активні посилання та плавний скрол.
 * Інтегровано Logger, ErrorHandler та Perf для моніторингу.
 *
 * @module script
 * @author Gazman4iK1
 * @version 1.4.0
 */

// ===== ІНІЦІАЛІЗАЦІЯ =====
Perf.start('script-init');

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
 * Оптимізація: використовує requestAnimationFrame для батчингу оновлень DOM.
 *
 * @type {IntersectionObserver}
 */
const observer = new IntersectionObserver((entries) => {
  requestAnimationFrame(() => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
        Logger.debug('Navigation', `Активна секція: #${entry.target.id}`);
      }
    });
  });
}, { threshold: 0.4 });

sections.forEach((section) => observer.observe(section));

Logger.info('Navigation', 'Intersection Observer ініціалізовано', {
  sectionsCount: sections.length
});

// ===== ПЛАВНИЙ СКРОЛ =====

/**
 * Ініціалізує плавний скрол для всіх якірних посилань сторінки.
 * Оптимізація: делегування подій — один обробник замість N.
 */
document.addEventListener('click', function handleGlobalClick(e) {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) {
    return;
  }
  try {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      Perf.start('smooth-scroll');
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      Perf.end('smooth-scroll');
      Logger.info('Navigation', `Перехід до секції: ${anchor.getAttribute('href')}`);
    }
  } catch (err) {
    ErrorHandler.handle(err, 'Navigation', {
      action: 'smooth-scroll',
      href: anchor.getAttribute('href')
    });
  }
});

// ===== КЕШУВАННЯ DOM-ЗАПИТІВ =====

/**
 * Кеш часто використовуваних DOM-елементів.
 * Оптимізація: уникає повторних querySelector викликів у циклах.
 * @type {Map<string, Element>}
 */
const domCache = new Map();

/**
 * Повертає DOM-елемент з кешу або виконує пошук.
 * @param {string} selector - CSS-селектор
 * @returns {Element|null}
 */
function cachedQuery(selector) {
  if (!domCache.has(selector)) {
    domCache.set(selector, document.querySelector(selector));
  }
  return domCache.get(selector);
}

// ===== ЗАВЕРШЕННЯ ІНІЦІАЛІЗАЦІЇ =====
const initTime = Perf.end('script-init');
Logger.info('App', `Ініціалізацію script.js завершено за ${initTime.toFixed(2)}ms`);
