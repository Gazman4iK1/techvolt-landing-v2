# Інструкція з розгортання у production — TechVolt Landing

## Архітектура проєкту

```
┌─────────────────────────────────────────┐
│           Користувач (браузер)          │
└──────────────────┬──────────────────────┘
                   │ HTTPS
┌──────────────────▼──────────────────────┐
│         GitHub Pages (CDN)              │
│  - Статичний веб-сервер                 │
│  - Автоматичний SSL/TLS                 │
│  - Глобальна CDN мережа                 │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│         GitHub Repository               │
│  - Вихідний код (main гілка)            │
│  - GitHub Actions CI/CD                 │
│  - Artifacts (docs/api)                 │
└─────────────────────────────────────────┘
```

**Компоненти проєкту:**
- Веб-сервер: GitHub Pages (статичний хостинг)
- Application server: відсутній (статичний сайт)
- СУБД: відсутня (localStorage для кошика)
- Файлове сховище: GitHub репозиторій
- CDN: вбудована в GitHub Pages
- CI/CD: GitHub Actions

---

## Вимоги до середовища

### Апаратне забезпечення (для локальної розробки)

| Компонент | Мінімум | Рекомендовано |
|-----------|---------|---------------|
| CPU | будь-який x64 | 2+ ядра |
| RAM | 512 MB | 4 GB |
| Диск | 100 MB | 1 GB |
| ОС | Windows 10 / macOS 11 / Ubuntu 20.04 | остання версія |

### Програмне забезпечення

| Програма | Версія | Призначення |
|---------|--------|-------------|
| Git | 2.x+ | Контроль версій |
| Node.js | 18 LTS+ | npm інструменти |
| Браузер | сучасний | Перегляд сайту |

---

## Розгортання на GitHub Pages

### Крок 1 — Підготовка репозиторію

```bash
# Переконайся що main гілка актуальна
git checkout main
git pull origin main
```

### Крок 2 — Налаштування GitHub Pages

1. Зайди в репо → **Settings** → **Pages**
2. Source: **GitHub Actions**
3. Збережи налаштування

### Крок 3 — Деплой через push

```bash
git push origin main
```

GitHub Actions автоматично:
1. Встановлює Node.js та залежності
2. Генерує JSDoc документацію
3. Публікує сайт на GitHub Pages

### Крок 4 — Перевірка працездатності

Після деплою (2-5 хвилин) перевір:

```
https://Gazman4iK1.github.io/techvolt-landing-v2/
https://Gazman4iK1.github.io/techvolt-landing-v2/en/
https://Gazman4iK1.github.io/techvolt-landing-v2/docs/api/
```

**Чеклист перевірки:**
- [ ] Головна сторінка завантажується
- [ ] Англійська версія доступна
- [ ] Навігація між секціями працює
- [ ] Бургер-меню відкривається на мобільному
- [ ] Документація доступна

---

## Розгортання на власному сервері (альтернатива)

### Встановлення Nginx

```bash
sudo apt update
sudo apt install nginx
```

### Копіювання файлів

```bash
sudo cp -r . /var/www/techvolt/
sudo chown -R www-data:www-data /var/www/techvolt/
```

### Конфігурація Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/techvolt;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(css|js|png|svg|ico|webmanifest)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
sudo nginx -t
sudo systemctl restart nginx
```
