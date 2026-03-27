#!/bin/bash
echo "========================================"
echo "  TechVolt Landing - DEV середовище"
echo "========================================"

echo "[1/3] Перевірка Node.js..."
if ! command -v node &> /dev/null; then
    echo "ПОМИЛКА: Node.js не встановлено!"
    echo "Завантаж з https://nodejs.org/"
    exit 1
fi
echo "OK - $(node --version)"

echo "[2/3] Встановлення залежностей..."
npm install || { echo "ПОМИЛКА: npm install не вдався!"; exit 1; }
echo "OK - Залежності встановлено"

echo "[3/3] Запуск локального сервера..."
echo "Сайт доступний на http://localhost:3000"
echo "Натисни Ctrl+C для зупинки"
npx serve .
