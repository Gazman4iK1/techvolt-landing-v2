# Інструкція з оновлення — TechVolt Landing

## Підготовка до оновлення

### 1. Перевірка поточного стану

```bash
# Перевір поточну версію
git log --oneline -5

# Перевір чи є незакомічені зміни
git status

# Перевір що всі тести проходять
npm run check
```

### 2. Створення резервної копії

```bash
# Зафіксуй поточний стан тегом
git tag -a backup-$(date +%Y%m%d) -m "Резервна копія перед оновленням"
git push origin --tags
```

### 3. Перевірка сумісності

- [ ] Перевір чи нові зміни не ламають існуючий функціонал
- [ ] Запусти лінтер: `npm run lint`
- [ ] Перевір відображення на мобільних пристроях
- [ ] Перевір обидві мовні версії (UA та EN)

### 4. Планування простою

Проєкт є статичним сайтом на GitHub Pages — простій під час оновлення не перевищує 2-5 хвилин (час деплою CI/CD).

---

## Процес оновлення

### Крок 1 — Створити feature-гілку

```bash
git checkout main
git pull origin main
git checkout -b feature/назва-оновлення
```

### Крок 2 — Внести зміни

```bash
# Редагуй файли
# Перевір якість коду
npm run lint
npm run docs
```

### Крок 3 — Закомітити зміни

```bash
git add .
git commit -m "Опис змін"
git push origin feature/назва-оновлення
```

### Крок 4 — Pull Request та Merge

1. Відкрий Pull Request на GitHub
2. Перевір зміни у PR preview
3. Натисни **Merge pull request**
4. GitHub Actions автоматично задеплоїть зміни

### Крок 5 — Перевірка після оновлення

```
https://Gazman4iK1.github.io/techvolt-landing-v2/
```

**Чеклист:**
- [ ] Сайт завантажується
- [ ] Нові зміни відображаються коректно
- [ ] Навігація працює
- [ ] Мобільна версія працює
- [ ] EN версія доступна

### Крок 6 — Тег нової версії

```bash
git checkout main
git pull origin main
git tag -a v1.x.0 -m "Опис нової версії"
git push origin --tags
```

---

## Процедура відкату (Rollback)

### Варіант А — Відкат до попереднього тегу

```bash
# Переглянь доступні теги
git tag -l

# Відкотись до конкретного тегу
git checkout main
git revert HEAD
git push origin main
```

### Варіант Б — Відкат до конкретного коміту

```bash
# Знайди хеш потрібного коміту
git log --oneline

# Створи revert коміт
git revert ХЕШ_КОМІТУ
git push origin main
```

### Варіант В — Жорсткий відкат (крайній захід)

```bash
# Відкотись до резервного тегу
git checkout -b hotfix/rollback
git reset --hard backup-YYYYMMDD
git push origin hotfix/rollback --force
# Відкрий PR та злий в main
```

> ⚠️ Після відкату перевір сайт за всіма пунктами чеклісту!
