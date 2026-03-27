# TechVolt Landing — Лендінг бакалаврської роботи

> Лабораторна робота №2 — Лендінг для бакалаврської роботи з використанням стратегії **GitHub Flow**

[![GitHub Pages](https://img.shields.io/badge/Demo-Live-brightgreen)](https://Gazman4iK1.github.io/techvolt-landing/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../techvolt/LICENSE)
[![Valid HTML5](https://img.shields.io/badge/HTML5-Valid-orange)](https://validator.w3.org/)

---

## 🌐 Посилання

- **Лендінг (UA):** https://Gazman4iK1.github.io/techvolt-landing/
- **Лендінг (EN):** https://Gazman4iK1.github.io/techvolt-landing/en/
- **Репозиторій магазину:** https://github.com/Gazman4iK1/techvolt

---

## 📋 Про проєкт

Односторінковий лендінг для представлення бакалаврської роботи на тему **«Розробка інтернет-магазину електроніки TechVolt»**.

---

## 🗂️ Структура

```
techvolt-landing/
├── index.html          # Головна сторінка (UA)
├── style.css           # Стилі (спільні для обох версій)
├── script.js           # JavaScript
├── en/
│   └── index.html      # Англійська версія (feature-гілка)
├── robots.txt          # Інструкції для пошукових роботів
├── sitemap.xml         # Карта сайту для SEO
├── favicon.svg         # SVG favicon
├── site.webmanifest    # Web App Manifest
└── README.md           # Документація
```

---

## 🔀 Стратегія гілкування: GitHub Flow

| Гілка | Призначення |
|-------|-------------|
| `main` | Основна гілка, завжди стабільна, деплоїться на GitHub Pages |
| `feature/initial-setup` | Базова структура проєкту |
| `feature/seo-accessibility` | SEO та доступність |
| `feature/content` | Контентне наповнення |
| `feature/styling` | Стилізація та адаптивність |
| `feature/english-version` | Англійська версія сайту |

### Принципи GitHub Flow:
1. `main` завжди готова до деплою
2. Нова функціональність — нова гілка від `main`
3. Гілка зливається через Pull Request
4. Після злиття — деплой на GitHub Pages

---

## ✅ Технічні вимоги

| Вимога | Статус |
|--------|--------|
| Семантична HTML5 розмітка | ✅ |
| ARIA-атрибути | ✅ |
| Skip link (доступність) | ✅ |
| Schema.org розмітка | ✅ |
| Open Graph теги | ✅ |
| robots.txt | ✅ |
| sitemap.xml | ✅ |
| Favicon (SVG + PNG) | ✅ |
| Web App Manifest | ✅ |
| Адаптивний дизайн | ✅ |
| Англійська версія | ✅ |
