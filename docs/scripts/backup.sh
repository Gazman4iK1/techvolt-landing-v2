#!/bin/bash
echo "========================================"
echo "  TechVolt Landing - Резервне копіювання"
echo "========================================"

BACKUP_NAME="backup-$(date +%Y%m%d-%H%M)"

echo "[1/2] Створення Git тегу..."
git tag -a "$BACKUP_NAME" -m "Резервна копія $(date)"
git push origin --tags
echo "OK - Тег $BACKUP_NAME створено"

echo "[2/2] Створення локального архіву..."
git archive --format=zip HEAD -o "${BACKUP_NAME}.zip"
echo "OK - Архів ${BACKUP_NAME}.zip створено"

echo ""
echo "Резервна копія успішно створена!"
echo "Тег: $BACKUP_NAME"
echo "Архів: ${BACKUP_NAME}.zip"
