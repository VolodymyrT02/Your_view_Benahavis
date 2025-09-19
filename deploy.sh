#!/bin/bash

set -e

echo "🚀 Начинаем деплой на GitHub Pages..."

if ! command -v node &> /dev/null; then
  echo "❌ Node.js не установлен. Установите Node.js и повторите попытку."
  exit 1
fi

if ! command -v npm &> /dev/null; then
  echo "❌ npm не найден. Установите npm и повторите попытку."
  exit 1
fi

echo "📦 Обновляем зависимости..."
npm install

echo "🔨 Собираем проект..."
npm run build

echo "🌐 Публикуем содержимое папки dist в ветку gh-pages..."
npx gh-pages -d dist -b gh-pages -f

echo "✅ Готово! Статический сайт обновлён."
echo "ℹ️ Убедитесь, что в настройках GitHub Pages выбран источник "gh-pages"."
