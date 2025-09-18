# 🚀 Инструкция по деплою лендинга на GitHub Pages

## 📋 Проблема
Ваш проект использует Vite + React, но на GitHub Pages размещен исходный код вместо собранной версии. Браузер не может загрузить модули ES6 напрямую.

## ✅ Решение

### Автоматический деплой (рекомендуется):

1. **Настройте GitHub Pages:**
   - Перейдите в репозиторий: https://github.com/VolodymyrT02/Your_view_Benahavis
   - Settings → Pages
   - Source: измените с "Deploy from a branch" на **"GitHub Actions"**

2. **Закоммитьте файлы:**
   ```bash
   git add .
   git commit -m "Add GitHub Actions workflow for deployment"
   git push origin main
   ```

3. **Проверьте деплой:**
   - Перейдите во вкладку "Actions" в GitHub
   - Дождитесь завершения деплоя (зеленая галочка)
   - Сайт будет доступен: https://volodymyrt02.github.io/Your_view_Benahavis/

### Ручной деплой:

1. **Установите зависимости:**
   ```bash
   npm install
   ```

2. **Соберите проект:**
   ```bash
   npm run build
   ```

3. **Используйте готовый скрипт:**
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

## 🔧 Что исправлено:

1. ✅ **GitHub Actions workflow** - автоматическая сборка и деплой
2. ✅ **Файл .nojekyll** - отключение Jekyll обработки
3. ✅ **Vite конфигурация** - уже настроена правильно с base: "/Your_view_Benahavis/"
4. ✅ **Скрипт деплоя** - для быстрой ручной сборки

## 🖥 Горячие клавиши для консоли на Mac:
- **Safari**: `Cmd + Option + C`
- **Chrome**: `Cmd + Option + I`

## 🐛 Если что-то не работает:

1. Проверьте вкладку **Actions** в GitHub репозитории
2. Посмотрите логи сборки на наличие ошибок
3. Убедитесь, что в **Settings → Pages** выбран "GitHub Actions"
4. Очистите кэш браузера: `Cmd + Shift + R`

## 🎯 Ожидаемый результат:
После успешного деплоя ваш лендинг будет полностью функционировать по адресу:
**https://volodymyrt02.github.io/Your_view_Benahavis/**
