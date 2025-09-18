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

echo "✅ Сборка завершена успешно!"
echo "📁 Файлы готовы в папке dist/"
echo ""
echo "🔄 Теперь выполните следующие команды:"
echo "git add ."
echo "git commit -m 'Deploy: Update built files and GitHub Actions'"
echo "git push origin main"
echo ""
echo "🌐 После push сайт будет доступен по адресу:"
echo "https://volodymyrt02.github.io/Your_view_Benahavis/"
