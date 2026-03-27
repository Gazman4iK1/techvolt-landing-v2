/**
 * @fileoverview Система логування TechVolt Landing.
 * Підтримує рівні DEBUG, INFO, WARN, ERROR, CRITICAL.
 * Рівень логування визначається через localStorage без перекомпіляції.
 *
 * @module logger
 * @version 1.0.0
 */

/**
 * Рівні логування у порядку зростання важливості.
 * @enum {number}
 */
const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  CRITICAL: 4
};

/**
 * Зчитує мінімальний рівень логування з localStorage або
 * змінної оточення window.TECHVOLT_LOG_LEVEL без перекомпіляції.
 *
 * Способи встановлення рівня (без перекомпіляції):
 *   localStorage.setItem('TECHVOLT_LOG_LEVEL', 'DEBUG')
 *   або window.TECHVOLT_LOG_LEVEL = 'DEBUG' у консолі браузера
 *
 * @returns {number} Числове значення мінімального рівня логування
 */
function getMinLogLevel() {
  const stored =
    localStorage.getItem('TECHVOLT_LOG_LEVEL') ||
    window.TECHVOLT_LOG_LEVEL ||
    'INFO';
  return LOG_LEVELS[stored.toUpperCase()] ?? LOG_LEVELS.INFO;
}

/**
 * Генерує унікальний ідентифікатор сесії для трасування.
 * @returns {string} Унікальний ID сесії формату sess_XXXXXXXX
 */
function generateSessionId() {
  return 'sess_' + Math.random().toString(36).slice(2, 10).toUpperCase();
}

const SESSION_ID = generateSessionId();

/**
 * Форматує повідомлення логу з усіма метаданими.
 *
 * @param {string} level - Рівень логування
 * @param {string} module - Назва модуля
 * @param {string} message - Повідомлення
 * @param {Object} [context={}] - Додаткові дані контексту
 * @returns {Object} Форматований об'єкт логу
 */
function formatLog(level, module, message, context = {}) {
  return {
    timestamp: new Date().toISOString(),
    level,
    module,
    message,
    sessionId: SESSION_ID,
    url: window.location.href,
    userAgent: navigator.userAgent.slice(0, 80),
    ...context
  };
}

/**
 * Зберігає лог у localStorage (ротація — максимум 100 записів).
 * При перевищенні ліміту видаляє 20 найстаріших записів.
 *
 * @param {Object} logEntry - Об'єкт логу для збереження
 */
function persistLog(logEntry) {
  try {
    const logs = JSON.parse(localStorage.getItem('techvolt_logs') || '[]');
    logs.push(logEntry);
    if (logs.length > 100) {
      logs.splice(0, 20);
    }
    localStorage.setItem('techvolt_logs', JSON.stringify(logs));
  } catch (e) {
    // localStorage може бути недоступний — мовчки ігноруємо
  }
}

/**
 * Головна функція логування.
 *
 * @param {string} level - Рівень логування (DEBUG/INFO/WARN/ERROR/CRITICAL)
 * @param {string} module - Назва модуля що логує
 * @param {string} message - Текст повідомлення
 * @param {Object} [context={}] - Додаткові дані для діагностики
 */
function log(level, module, message, context = {}) {
  const levelNum = LOG_LEVELS[level] ?? LOG_LEVELS.INFO;
  if (levelNum < getMinLogLevel()) {
    return;
  }

  const entry = formatLog(level, module, message, context);
  const prefix = `[${entry.timestamp}] [${level}] [${module}]`;

  switch (level) {
    case 'DEBUG':
      console.debug(prefix, message, context);
      break;
    case 'INFO':
      console.info(prefix, message, context);
      break;
    case 'WARN':
      console.warn(prefix, message, context);
      break;
    case 'ERROR':
    case 'CRITICAL':
      console.error(prefix, message, context);
      persistLog(entry);
      break;
    default:
      console.log(prefix, message, context);
  }
}

/**
 * Публічний API логера.
 * @namespace Logger
 */
const Logger = {
  /**
   * Повертає поточний ідентифікатор сесії.
   * @returns {string}
   */
  getSessionId: () => SESSION_ID,

  /**
   * Логує повідомлення рівня DEBUG.
   * @param {string} module - Модуль
   * @param {string} message - Повідомлення
   * @param {Object} [ctx] - Контекст
   */
  debug: (module, message, ctx) => log('DEBUG', module, message, ctx),

  /**
   * Логує повідомлення рівня INFO.
   * @param {string} module - Модуль
   * @param {string} message - Повідомлення
   * @param {Object} [ctx] - Контекст
   */
  info: (module, message, ctx) => log('INFO', module, message, ctx),

  /**
   * Логує повідомлення рівня WARN.
   * @param {string} module - Модуль
   * @param {string} message - Повідомлення
   * @param {Object} [ctx] - Контекст
   */
  warn: (module, message, ctx) => log('WARN', module, message, ctx),

  /**
   * Логує повідомлення рівня ERROR.
   * @param {string} module - Модуль
   * @param {string} message - Повідомлення
   * @param {Object} [ctx] - Контекст
   */
  error: (module, message, ctx) => log('ERROR', module, message, ctx),

  /**
   * Логує повідомлення рівня CRITICAL.
   * @param {string} module - Модуль
   * @param {string} message - Повідомлення
   * @param {Object} [ctx] - Контекст
   */
  critical: (module, message, ctx) => log('CRITICAL', module, message, ctx),

  /**
   * Повертає всі збережені логи з localStorage.
   * @returns {Array} Масив об'єктів логів
   */
  getLogs: () => {
    try {
      return JSON.parse(localStorage.getItem('techvolt_logs') || '[]');
    } catch {
      return [];
    }
  },

  /**
   * Очищає всі збережені логи.
   */
  clearLogs: () => localStorage.removeItem('techvolt_logs'),

  /**
   * Встановлює мінімальний рівень логування без перекомпіляції.
   * @param {string} level - Назва рівня (DEBUG/INFO/WARN/ERROR/CRITICAL)
   */
  setLevel: (level) => {
    localStorage.setItem('TECHVOLT_LOG_LEVEL', level.toUpperCase());
    console.info(`[Logger] Рівень логування змінено на ${level.toUpperCase()}`);
  }
};

Logger.info('App', 'TechVolt Landing запущено', {
  sessionId: SESSION_ID,
  page: window.location.pathname,
  logLevel: Object.keys(LOG_LEVELS).find(k => LOG_LEVELS[k] === getMinLogLevel())
});
