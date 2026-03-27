/**
 * @fileoverview Головний JavaScript файл лендінгу TechVolt.
 * Відповідає за три основні функції:
 * - Мобільна навігація (бургер-меню)
 * - Підсвічування активного посилання при скролі
 * - Плавний скрол до секцій
 *
 * @module script
 * @author Gazman4iK1
 * @version 1.2.0
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
 *
 * Логіка роботи:
 * - При кліку toggleє клас 'open' на navList
 * - Оновлює ARIA-атрибути (WCAG 2.1)
 * - При кліку на посилання — закриває меню
 *
 * @example
 * // Після кліку на burger:
 * // navList отримує клас 'open'
 * // burger отримує aria-expanded="true"
 */
if (burger && navList) {
  burger.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    burger.setAttribute('aria-expanded', isOpen);
    burger.setAttribute('aria-label', isOpen ? 'Закрити меню' : 'Відкрити меню');
  });

  navList.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navList.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
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
 *
 * Алгоритм:
 * 1. Спостерігає за кожною секцією з id
 * 2. Коли секція займає більше 40% viewport — вважається активною
 * 3. Додає клас 'active' до відповідного навігаційного посилання
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
    }
  });
}, { threshold: 0.4 });

sections.forEach((section) => observer.observe(section));

// ===== ПЛАВНИЙ СКРОЛ =====

/**
 * Ініціалізує плавний скрол для всіх якірних посилань сторінки.
 *
 * Бізнес-логіка:
 * - Знаходить всі посилання вигляду href="#..."
 * - При кліку блокує стандартну поведінку браузера
 * - Запускає плавну прокрутку до цільового елементу
 * - Якщо елемент не знайдено — нічого не робить
 *
 * @example
 * // <a href="#about">Про роботу</a>
 * // При кліку — плавно прокручує до <section id="about">
 */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function handleClick(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
