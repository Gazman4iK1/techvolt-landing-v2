# Документація з лінтингу — TechVolt Landing

## Зміст

1. [Обрані інструменти](#обрані-інструменти)
2. [Причини вибору](#причини-вибору)
3. [Базові правила](#базові-правила)
4. [Інструкція з запуску](#інструкція-з-запуску)
5. [Git Hooks](#git-hooks)
6. [Інтеграція з процесом збірки](#інтеграція-з-процесом-збірки)

---

## Обрані інструменти

| Інструмент | Версія | Призначення |
|-----------|--------|-------------|
| **ESLint** | ^8.57.0 | Статичний аналіз JavaScript |
| **Stylelint** | ^16.0.0 | Статичний аналіз CSS |
| **HTMLHint** | ^1.1.4 | Статичний аналіз HTML |
| **Husky** | ^9.0.0 | Git hooks |
| **lint-staged** | ^15.0.0 | Лінтинг лише змінених файлів |

---

## Причини вибору

### ESLint
- Найпопулярніший лінтер для JavaScript (50M+ завантажень/тиждень)
- Гнучка конфігурація через `.eslintrc.js`
- Підтримує автоматичне виправлення (`--fix`)
- Великий набір вбудованих правил та плагінів

### Stylelint
- Стандарт для лінтингу CSS
- Підтримує `stylelint-config-standard` — перевірені правила
- Інтегрується з будь-яким процесом збірки

### HTMLHint
- Легковісний інструмент для HTML
- Перевіряє семантику, доступність, структуру документу
- Швидко працює без додаткових залежностей

---

## Базові правила

### ESLint (`.eslintrc.js`)

| Правило | Значення | Пояснення |
|---------|---------|-----------|
| `indent` | 2 пробіли | Єдиний стиль відступів |
| `quotes` | single | Одинарні лапки для рядків |
| `semi` | always | Обов'язкові крапки з комою |
| `no-trailing-spaces` | error | Заборона пробілів в кінці рядків |
| `no-unused-vars` | warn | Попередження про невикористані змінні |
| `no-var` | error | Використовувати `const`/`let` замість `var` |
| `prefer-const` | error | Використовувати `const` де можливо |
| `eqeqeq` | always | Строге порівняння `===` замість `==` |
| `curly` | error | Обов'язкові фігурні дужки в блоках |

### Stylelint (`.stylelintrc.json`)

| Правило | Пояснення |
|---------|-----------|
| `indentation: 2` | Відступи 2 пробіли |
| `color-hex-length: short` | Скорочений hex (`#fff` замість `#ffffff`) |
| `no-duplicate-selectors` | Заборона дублювання селекторів |
| `block-no-empty` | Заборона порожніх блоків |
| `selector-class-pattern` | BEM-подібні класи |

### HTMLHint (`.htmlhintrc`)

| Правило | Пояснення |
|---------|-----------|
| `doctype-first` | DOCTYPE має бути першим |
| `tag-pair` | Всі теги мають бути закриті |
| `attr-value-double-quotes` | Подвійні лапки для атрибутів |
| `id-unique` | Унікальні id на сторінці |
| `alt-require` | Обов'язковий alt для зображень |
| `title-require` | Обов'язковий тег title |

---

## Інструкція з запуску

### Встановлення залежностей

```bash
npm install
```

### Запуск лінтерів

```bash
# Перевірити всі файли
npm run lint

# Тільки JavaScript
npm run lint:js

# Тільки CSS
npm run lint:css

# Тільки HTML
npm run lint:html

# Автоматичне виправлення
npm run lint:fix
```

### Перегляд результатів

```bash
# Детальний звіт ESLint
npx eslint script.js --format stylish

# Підрахунок помилок
npx eslint script.js --format json | node -e "
  const data = JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
  const errors = data.reduce((s,f) => s + f.errorCount, 0);
  const warns = data.reduce((s,f) => s + f.warningCount, 0);
  console.log('Errors:', errors, '| Warnings:', warns);
"
```

---

## Git Hooks

Pre-commit хук налаштовано через **Husky** + **lint-staged**.

### Як це працює

1. Перед кожним `git commit` автоматично запускається лінтер
2. `lint-staged` перевіряє **лише змінені файли** (швидше)
3. Якщо є помилки — коміт блокується
4. Якщо помилок немає — коміт проходить

### Налаштування (вже виконано)

```bash
# Ініціалізація husky
npx husky init

# Вміст .husky/pre-commit
npm run lint
```

### Конфігурація lint-staged (`package.json`)

```json
"lint-staged": {
  "*.js": ["eslint --fix"],
  "*.css": ["stylelint --fix"],
  "*.html": ["htmlhint"]
}
```

---

## Інтеграція з процесом збірки

Лінтинг інтегровано як npm-скрипт `check`, який виконує повну перевірку:

```bash
npm run check
```

Це еквівалентно послідовному запуску:
```bash
npm run lint:js && npm run lint:css && npm run lint:html
```

### Рекомендований workflow

```
git add .  →  pre-commit hook  →  lint-staged  →  git commit
```

Якщо хук заблокував коміт:
```bash
npm run lint:fix   # автовиправлення
git add .
git commit -m "..."
```
