# Інструкція з резервного копіювання — TechVolt Landing

## Стратегія резервного копіювання

Проєкт є статичним сайтом — весь код зберігається в Git репозиторії.
Резервне копіювання реалізується через Git теги та GitHub механізми.

### Типи резервних копій

| Тип | Частота | Інструмент |
|-----|---------|------------|
| Повна (Git тег) | Перед кожним оновленням | git tag |
| Інкрементальна | Кожен коміт | git commit |
| Архівна | Щомісяця | GitHub Export |

---

## Процедура резервного копіювання

### 1. Git тег (основний метод)

```bash
# Перед будь-яким оновленням
git tag -a backup-$(date +%Y%m%d-%H%M) -m "Резервна копія $(date)"
git push origin --tags
```

### 2. Локальний архів

```bash
# Windows (PowerShell)
git archive --format=zip HEAD -o backup-$(Get-Date -Format "yyyyMMdd").zip

# Linux / macOS
git archive --format=zip HEAD -o backup-$(date +%Y%m%d).zip
```

### 3. Архів через GitHub

1. Зайди на сторінку репо
2. **Code** → **Download ZIP**
3. Збережи архів у надійному місці

---

## Резервне копіювання конфігурацій

Всі конфігураційні файли зберігаються в репозиторії:

```
.eslintrc.js          # ESLint
.stylelintrc.json     # Stylelint
.htmlhintrc           # HTMLHint
jsdoc.config.json     # JSDoc
package.json          # npm
.github/workflows/    # CI/CD
```

Вони автоматично включаються в кожну резервну копію.

---

## Автоматизація резервного копіювання

Скрипт автоматичного бекапу знаходиться в `docs/scripts/backup.sh` та `docs/scripts/backup.bat`.

```bash
# Linux / macOS
chmod +x docs/scripts/backup.sh
./docs/scripts/backup.sh

# Windows
docs\scripts\backup.bat
```

---

## Процедура відновлення

### Відновлення з Git тегу

```bash
# Переглянь доступні теги
git tag -l | grep backup

# Відновись до конкретної резервної копії
git checkout backup-20250101-1200

# Або створи нову гілку з резервної копії
git checkout -b restore/20250101 backup-20250101-1200
```

### Повне відновлення репозиторію

```bash
# Клонуй репо заново
git clone https://github.com/Gazman4iK1/techvolt-landing-v2.git
cd techvolt-landing-v2

# Переключись на потрібний тег
git checkout backup-YYYYMMDD
```

### Відновлення з архіву

```bash
# Розпакуй архів
unzip backup-20250101.zip -d techvolt-restored/
cd techvolt-restored/
npm install
```

---

## Перевірка цілісності

```bash
# Перевір цілісність git репозиторію
git fsck

# Переконайся що всі файли на місці
git status

# Запусти повну перевірку
npm run check
```

---

## Зберігання та ротація

- Теги зберігаються в GitHub необмежено
- Локальні архіви — видаляй копії старші 3 місяців
- Рекомендовано мати мінімум 3 останні резервні копії
