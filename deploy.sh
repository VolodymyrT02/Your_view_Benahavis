#!/bin/bash

# Скрипт для быстрого деплоя на GitHub Pages
echo "🚀 Начинаем деплой на GitHub Pages..."

# Проверяем наличие Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не установлен. Установите Node.js и повторите попытку."
    exit 1
fi

# Проверяем наличие npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm не найден. Установите npm и повторите попытку."
    exit 1
fi

# Устанавливаем зависимости
echo "📦 Устанавливаем зависимости..."
npm install

# Собираем проект
echo "🔨 Собираем проект..."
npm run build

# Проверяем, что папка dist создана
if [ ! -d "dist" ]; then
    echo "❌ Папка dist не создана. Проверьте конфигурацию Vite."
    exit 1
fi

echo "📤 Переносим результаты сборки в корень репозитория..."
rm -rf assets
mkdir -p assets
cp dist/assets/* assets/
cp dist/index.html index.html
chmod 644 index.html

echo "✅ Сборка завершена успешно!"
echo "📁 Обновлённые файлы готовы к коммиту"
echo ""
echo "🔄 Выполните:"
echo "git add assets index.html"
echo "git commit -m 'Deploy: обновление сборки'"
echo "git push origin main"
echo ""
echo "🌐 После push сайт будет доступен по адресу:"
echo "https://volodymyrt02.github.io/Your_view_Benahavis/"
