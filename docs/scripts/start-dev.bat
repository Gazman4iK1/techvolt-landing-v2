@echo off
echo ========================================
echo   TechVolt Landing - DEV середовище
echo ========================================

echo [1/3] Перевірка Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ПОМИЛКА: Node.js не встановлено!
    echo Завантаж з https://nodejs.org/
    pause
    exit /b 1
)
echo OK - Node.js встановлено

echo [2/3] Встановлення залежностей...
call npm install
if %errorlevel% neq 0 (
    echo ПОМИЛКА: npm install не вдався!
    pause
    exit /b 1
)
echo OK - Залежності встановлено

echo [3/3] Запуск локального сервера...
echo Сайт буде доступний на http://localhost:3000
echo Натисни Ctrl+C для зупинки
call npx serve .
