#!/bin/bash
echo "========================================"
echo "  TechVolt Landing - PRODUCTION деплой"
echo "========================================"

echo "[1/4] Перевірка коду..."
npm run lint || { echo "ПОМИЛКА: Лінтер виявив помилки!"; exit 1; }
echo "OK - Код пройшов перевірку"

echo "[2/4] Генерація документації..."
npm run docs || { echo "ПОМИЛКА: Генерація документації не вдалась!"; exit 1; }
echo "OK - Документація згенерована"

echo "[3/4] Створення резервної копії..."
git tag -a "backup-$(date +%Y%m%d-%H%M)" -m "Резервна копія перед деплоєм"
git push origin --tags
echo "OK - Резервна копія створена"

echo "[4/4] Деплой на GitHub Pages..."
git add .
git commit -m "chore: автоматичний деплой $(date +%Y-%m-%d)"
git push origin main
echo "OK - Деплой запущено"
echo ""
echo "Сайт буде оновлено через 2-5 хвилин:"
echo "https://Gazman4iK1.github.io/techvolt-landing-v2/"
