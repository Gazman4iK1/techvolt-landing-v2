/**
 * @fileoverview Централізована обробка помилок TechVolt Landing.
 * Перехоплює всі необроблені помилки, генерує унікальні ID,
 * зберігає контекст та відображає зрозумілі повідомлення користувачам.
 *
 * @module error-handler
 * @version 1.0.0
 */

/**
 * Локалізовані повідомлення про помилки для користувачів.
 * Технічні деталі приховані — показуються лише зрозумілі інструкції.
 * @enum {Object}
 */
const ERROR_MESSAGES = {
  uk: {
    network: {
      title: 'Проблема з підключенням',
      message: 'Не вдалося завантажити дані. Перевірте підключення до інтернету.',
      action: 'Оновіть сторінку або спробуйте пізніше.'
    },
    storage: {
      title: 'Помилка збереження',
      message: 'Не вдалося зберегти дані кошика. Можливо, браузер заблокував доступ до сховища.',
      action: 'Перевірте налаштування браузера або спробуйте інший браузер.'
    },
    navigation: {
      title: 'Помилка навігації',
      message: 'Не вдалося перейти до потрібного розділу.',
      action: 'Спробуйте натиснути посилання ще раз або оновіть сторінку.'
    },
    unknown: {
      title: 'Щось пішло не так',
      message: 'Виникла непередбачена помилка.',
      action: 'Оновіть сторінку. Якщо проблема повторюється — повідомте нас.'
    }
  },
  en: {
    network: {
      title: 'Connection problem',
      message: 'Failed to load data. Please check your internet connection.',
      action: 'Refresh the page or try again later.'
    },
    storage: {
      title: 'Storage error',
      message: 'Failed to save cart data. Your browser may have blocked storage access.',
      action: 'Check your browser settings or try a different browser.'
    },
    navigation: {
      title: 'Navigation error',
      message: 'Could not navigate to the requested section.',
      action: 'Try clicking the link again or refresh the page.'
    },
    unknown: {
      title: 'Something went wrong',
      message: 'An unexpected error occurred.',
      action: 'Refresh the page. If the problem persists, please let us know.'
    }
  }
};

/**
 * Визначає мову інтерфейсу для локалізації повідомлень.
 * @returns {'uk'|'en'} Код мови
 */
function getLocale() {
  return document.documentElement.lang === 'en' ? 'en' : 'uk';
}

/**
 * Генерує унікальний ідентифікатор помилки для трасування.
 * Формат: ERR-TIMESTAMP-RANDOM
 *
 * @returns {string} Унікальний ID помилки, наприклад ERR-1234567890-AB3F
 */
function generateErrorId() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ERR-${ts}-${rand}`;
}

/**
 * Визначає тип помилки для вибору відповідного повідомлення.
 *
 * @param {Error} error - Об'єкт помилки
 * @returns {string} Тип помилки (network/storage/navigation/unknown)
 */
function classifyError(error) {
  const msg = (error.message || '').toLowerCase();
  if (msg.includes('fetch') || msg.includes('network') || msg.includes('load')) {
    return 'network';
  }
  if (msg.includes('storage') || msg.includes('quota') || msg.includes('localstorage')) {
    return 'storage';
  }
  if (msg.includes('navigation') || msg.includes('scroll') || msg.includes('element')) {
    return 'navigation';
  }
  return 'unknown';
}

/**
 * Відображає зрозуміле повідомлення про помилку для користувача.
 * Показує toast-сповіщення з локалізованим текстом та ID помилки.
 *
 * @param {string} errorId - Унікальний ID помилки
 * @param {string} type - Тип помилки
 */
function showUserError(errorId, type) {
  const locale = getLocale();
  const msgs = ERROR_MESSAGES[locale][type] || ERROR_MESSAGES[locale].unknown;

  let toast = document.getElementById('techvolt-error-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'techvolt-error-toast';
    toast.style.cssText = [
      'position:fixed', 'bottom:24px', 'left:50%',
      'transform:translateX(-50%)', 'max-width:420px', 'width:90%',
      'background:var(--bg-card,#16161f)', 'border:1px solid rgba(255,45,120,0.3)',
      'border-radius:12px', 'padding:16px 20px', 'z-index:9999',
      'font-family:var(--font-body,sans-serif)', 'color:var(--text,#f0f0f8)',
      'box-shadow:0 8px 32px rgba(0,0,0,0.4)', 'opacity:0',
      'transition:opacity 0.3s ease'
    ].join(';');
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <div style="font-weight:700;margin-bottom:6px;font-size:1rem">${msgs.title}</div>
    <div style="font-size:0.9rem;opacity:0.85;margin-bottom:8px">${msgs.message}</div>
    <div style="font-size:0.85rem;opacity:0.7;margin-bottom:12px">${msgs.action}</div>
    <div style="display:flex;justify-content:space-between;align-items:center;gap:12px">
      <span style="font-size:0.72rem;opacity:0.45;font-family:monospace">ID: ${errorId}</span>
      <button onclick="ErrorHandler.report('${errorId}')"
        style="padding:6px 14px;background:rgba(255,45,120,0.15);border:1px solid rgba(255,45,120,0.3);
        border-radius:8px;color:inherit;cursor:pointer;font-size:0.8rem">
        ${locale === 'en' ? 'Report problem' : 'Повідомити про проблему'}
      </button>
    </div>`;

  requestAnimationFrame(() => { toast.style.opacity = '1'; });
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 8000);
}

/**
 * Публічний API обробника помилок.
 * @namespace ErrorHandler
 */
const ErrorHandler = {
  /**
   * Обробляє помилку: логує, генерує ID, показує повідомлення користувачу.
   *
   * @param {Error|string} error - Помилка або текст помилки
   * @param {string} [module='App'] - Модуль де виникла помилка
   * @param {Object} [context={}] - Додатковий контекст (стан, параметри)
   * @returns {string} Унікальний ID помилки
   *
   * @example
   * try {
   *   riskyOperation();
   * } catch (e) {
   *   ErrorHandler.handle(e, 'Cart', { productId: 5, action: 'add' });
   * }
   */
  handle(error, module = 'App', context = {}) {
    const errorId = generateErrorId();
    const type = classifyError(error instanceof Error ? error : new Error(String(error)));

    if (typeof Logger !== 'undefined') {
      Logger.error(module, error.message || String(error), {
        errorId,
        type,
        stack: error.stack ? error.stack.slice(0, 300) : undefined,
        sessionId: Logger.getSessionId(),
        ...context
      });
    }

    showUserError(errorId, type);
    return errorId;
  },

  /**
   * Відкриває форму повідомлення про проблему з попередньо заповненим ID.
   * @param {string} errorId - ID помилки для звіту
   */
  report(errorId) {
    const locale = getLocale();
    const subject = locale === 'en'
      ? `Bug report: ${errorId}`
      : `Помилка: ${errorId}`;
    const body = locale === 'en'
      ? `Error ID: ${errorId}\nPage: ${window.location.href}\nSteps to reproduce:\n1. `
      : `ID помилки: ${errorId}\nСторінка: ${window.location.href}\nКроки відтворення:\n1. `;
    window.location.href = `mailto:support@techvolt.ua?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
};

// Глобальне перехоплення необроблених помилок JavaScript
window.addEventListener('error', (event) => {
  ErrorHandler.handle(event.error || new Error(event.message), 'GlobalHandler', {
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno
  });
});

// Глобальне перехоплення необроблених Promise rejection
window.addEventListener('unhandledrejection', (event) => {
  const error = event.reason instanceof Error
    ? event.reason
    : new Error(String(event.reason));
  ErrorHandler.handle(error, 'PromiseHandler', {
    type: 'unhandledRejection'
  });
});

if (typeof Logger !== 'undefined') {
  Logger.info('ErrorHandler', 'Систему обробки помилок ініціалізовано', {
    locale: getLocale(),
    sessionId: Logger.getSessionId()
  });
}
