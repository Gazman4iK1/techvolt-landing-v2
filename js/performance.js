/**
 * @fileoverview Система моніторингу продуктивності TechVolt Landing.
 * Вимірює час виконання критичних операцій, використання пам'яті
 * та збирає метрики для аналізу.
 *
 * @module performance
 * @version 1.0.0
 */

/**
 * Сховище для зібраних метрик продуктивності.
 * @type {Map<string, Array<number>>}
 */
const metricsStore = new Map();

/**
 * Сховище активних вимірювань (start markers).
 * @type {Map<string, number>}
 */
const activeMarkers = new Map();

/**
 * Система моніторингу продуктивності.
 * @namespace Perf
 */
const Perf = {

  /**
   * Починає вимірювання часу для операції.
   * @param {string} name - Назва операції
   */
  start(name) {
    activeMarkers.set(name, performance.now());
    if (typeof Logger !== 'undefined') {
      Logger.debug('Perf', `Початок вимірювання: ${name}`);
    }
  },

  /**
   * Завершує вимірювання та зберігає результат.
   * @param {string} name - Назва операції
   * @returns {number} Час виконання у мілісекундах
   */
  end(name) {
    const start = activeMarkers.get(name);
    if (start === undefined) {
      return 0;
    }
    const duration = performance.now() - start;
    activeMarkers.delete(name);

    if (!metricsStore.has(name)) {
      metricsStore.set(name, []);
    }
    metricsStore.get(name).push(duration);

    if (typeof Logger !== 'undefined') {
      Logger.debug('Perf', `${name}: ${duration.toFixed(2)}ms`);
    }
    return duration;
  },

  /**
   * Вимірює час виконання функції.
   * @param {string} name - Назва операції
   * @param {Function} fn - Функція для вимірювання
   * @returns {*} Результат виконання функції
   */
  measure(name, fn) {
    this.start(name);
    const result = fn();
    this.end(name);
    return result;
  },

  /**
   * Повертає статистику для операції.
   * @param {string} name - Назва операції
   * @returns {Object} Об'єкт зі статистикою (avg, min, max, count)
   */
  stats(name) {
    const measurements = metricsStore.get(name) || [];
    if (!measurements.length) {
      return { avg: 0, min: 0, max: 0, count: 0 };
    }
    const sum = measurements.reduce((a, b) => a + b, 0);
    return {
      avg: (sum / measurements.length).toFixed(2),
      min: Math.min(...measurements).toFixed(2),
      max: Math.max(...measurements).toFixed(2),
      count: measurements.length
    };
  },

  /**
   * Повертає метрики Web Vitals з Performance API браузера.
   * LCP, FID, CLS є ключовими показниками Google Core Web Vitals.
   * @returns {Object} Об'єкт з Web Vitals метриками
   */
  getWebVitals() {
    const nav = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');

    const fcp = paint.find(e => e.name === 'first-contentful-paint');

    return {
      ttfb: nav ? nav.responseStart.toFixed(0) + 'ms' : 'n/a',
      fcp: fcp ? fcp.startTime.toFixed(0) + 'ms' : 'n/a',
      domContentLoaded: nav ? nav.domContentLoadedEventEnd.toFixed(0) + 'ms' : 'n/a',
      loadComplete: nav ? nav.loadEventEnd.toFixed(0) + 'ms' : 'n/a',
      domElements: document.querySelectorAll('*').length
    };
  },

  /**
   * Повертає інформацію про використання пам'яті (Chrome only).
   * @returns {Object|null} Об'єкт з метриками пам'яті або null
   */
  getMemoryInfo() {
    if (!performance.memory) {
      return null;
    }
    const mb = (bytes) => (bytes / 1024 / 1024).toFixed(2) + ' MB';
    return {
      used: mb(performance.memory.usedJSHeapSize),
      total: mb(performance.memory.totalJSHeapSize),
      limit: mb(performance.memory.jsHeapSizeLimit)
    };
  },

  /**
   * Виводить повний звіт продуктивності в консоль.
   */
  report() {
    const vitals = this.getWebVitals();
    const memory = this.getMemoryInfo();

    console.group('%c TechVolt Performance Report', 'color: #ff2d78; font-weight: bold; font-size: 14px');
    console.log('%c Web Vitals', 'font-weight: bold');
    console.log('TTFB:', vitals.ttfb);
    console.log('FCP:', vitals.fcp);
    console.log('DOM Content Loaded:', vitals.domContentLoaded);
    console.log('Load Complete:', vitals.loadComplete);
    console.log('DOM Elements:', vitals.domElements);

    if (memory) {
      console.log('%c Memory', 'font-weight: bold');
      console.log('Used:', memory.used);
      console.log('Total:', memory.total);
    }

    if (metricsStore.size) {
      console.log('%c Custom Metrics', 'font-weight: bold');
      metricsStore.forEach((_, name) => {
        const s = this.stats(name);
        console.log(`${name}: avg=${s.avg}ms min=${s.min}ms max=${s.max}ms (${s.count} runs)`);
      });
    }

    console.groupEnd();

    if (typeof Logger !== 'undefined') {
      Logger.info('Perf', 'Performance report', { vitals, memory });
    }
  }
};

// Автоматичний звіт після повного завантаження сторінки
window.addEventListener('load', () => {
  setTimeout(() => {
    Perf.report();
  }, 500);
});
