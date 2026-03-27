@echo off
echo ========================================
echo   TechVolt Landing - Резервне копіювання
echo ========================================

for /f "tokens=1-3 delims=/ " %%a in ('date /t') do set DATE=%%c%%b%%a
for /f "tokens=1-2 delims=: " %%a in ('time /t') do set TIME=%%a%%b
set BACKUP_NAME=backup-%DATE%-%TIME%

echo [1/2] Створення Git тегу...
git tag -a "%BACKUP_NAME%" -m "Резервна копія %DATE%"
git push origin --tags
echo OK - Тег %BACKUP_NAME% створено

echo [2/2] Створення локального архіву...
git archive --format=zip HEAD -o "%BACKUP_NAME%.zip"
echo OK - Архів %BACKUP_NAME%.zip створено

echo.
echo Резервна копія успішно створена!
pause
