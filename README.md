# TechVolt Landing — Лендінг бакалаврської роботи

> Односторінковий лендінг для представлення бакалаврської роботи «Розробка інтернет-магазину електроніки TechVolt»

[![GitHub Pages](https://img.shields.io/badge/Demo-Live-brightgreen)](https://Gazman4iK1.github.io/techvolt-landing-v2/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🌐 Посилання

- **Лендінг (UA):** https://Gazman4iK1.github.io/techvolt-landing-v2/
- **Лендінг (EN):** https://Gazman4iK1.github.io/techvolt-landing-v2/en/
- **Документація:** https://Gazman4iK1.github.io/techvolt-landing-v2/docs/api/
- **Репозиторій:** https://github.com/Gazman4iK1/techvolt-landing-v2

---

## 🗂️ Структура проєкту

```
techvolt-landing-v2/
├── index.html              # Головна сторінка (UA)
├── style.css               # Спільні стилі
├── script.js               # JavaScript логіка
├── en/
│   └── index.html          # Англійська версія
├── docs/
│   ├── linting.md          # Документація лінтингу
│   ├── generate_docs.md    # Інструкція генерації документації
│   ├── deployment.md       # Інструкція розгортання (production)
│   ├── update.md           # Інструкція оновлення
│   ├── backup.md           # Інструкція резервного копіювання
│   ├── api/                # Згенерована JSDoc документація
│   └── scripts/            # Скрипти автоматизації
├── .github/
│   └── workflows/
│       └── docs.yml        # CI/CD pipeline
├── robots.txt              # SEO
├── sitemap.xml             # Карта сайту
├── favicon.svg             # Іконка
├── site.webmanifest        # Web App Manifest
├── jsdoc.config.json       # Конфігурація JSDoc
├── .eslintrc.js            # Конфігурація ESLint
├── .stylelintrc.json       # Конфігурація Stylelint
├── .htmlhintrc             # Конфігурація HTMLHint
├── .eslintignore           # Ігнорування ESLint
├── package.json            # npm конфігурація
└── README.md               # Цей файл
```

---

## 🚀 Швидкий старт для розробника

### Вимоги

Перед початком переконайся що встановлено:

| Програма | Версія | Посилання |
|---------|--------|-----------|
| Git | будь-яка | https://git-scm.com/ |
| Node.js | 18+ | https://nodejs.org/ |
| Браузер | сучасний | Chrome / Firefox / Edge |

### Крок 1 — Встановлення Git

**Windows:**
1. Завантаж з https://git-scm.com/download/win
2. Встанови з налаштуваннями за замовчуванням
3. Перевір: `git --version`

**macOS:**
```bash
brew install git
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update && sudo apt install git
```

### Крок 2 — Встановлення Node.js

**Windows / macOS:** завантаж з https://nodejs.org/ (LTS версія)

**Linux:**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs
```

Перевір встановлення:
```bash
node --version  # v20.x.x
npm --version   # 10.x.x
```

### Крок 3 — Клонування репозиторію

```bash
git clone https://github.com/Gazman4iK1/techvolt-landing-v2.git
cd techvolt-landing-v2
```

### Крок 4 — Встановлення залежностей

```bash
npm install
```

### Крок 5 — Запуск проєкту

Проєкт є статичним сайтом — просто відкрий `index.html` у браузері.

**Варіант А — відкрити файл напряму:**
```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

**Варіант Б — локальний сервер (рекомендовано):**
```bash
npx serve .
# Сайт доступний на http://localhost:3000
```

### Крок 6 — Корисні команди

```bash
npm run lint          # Перевірити якість коду
npm run lint:fix      # Автовиправлення помилок
npm run docs          # Згенерувати документацію
npm run check         # Повна перевірка (лінт + документація)
```

---

## 📝 Стандарти документування

Детальна інструкція: [docs/generate_docs.md](docs/generate_docs.md)

Коротко — кожна функція в JS повинна мати JSDoc коментар:

```js
/**
 * Короткий опис функції.
 * @param {string} name - Опис параметру
 * @returns {boolean} Опис результату
 * @example
 * myFunction('test'); // => true
 */
```

Після будь-яких змін у коді — оновити документацію: `npm run docs`

---

## 🔀 Стратегія гілкування (GitHub Flow)

1. Створи гілку від `main`: `git checkout -b feature/назва`
2. Зроби зміни та закомітуй
3. Відкрий Pull Request на GitHub
4. Після review — злий в `main`

---

## 📄 Ліцензія

MIT License — дивись [LICENSE](LICENSE)
