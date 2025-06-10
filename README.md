# Telegram Bot с WebApp и Supabase

Этот проект представляет собой Telegram-бота, который позволяет пользователям оставлять заявки через WebApp и сохраняет их в базе данных Supabase.

## Требования

- Node.js (версия 14 или выше)
- npm
- Telegram Bot Token
- Supabase проект
- Размещенный WebApp

## Установка

1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл `.env` в корневой директории проекта и заполните его следующими переменными:
```
TELEGRAM_TOKEN=your_telegram_bot_token
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
ADMIN_ID=your_admin_telegram_id
FRONTEND_URL=your_frontend_webapp_url
```

## Запуск

Для запуска бота выполните:
```bash
node bot.js
```

## Структура проекта

- `bot.js` - Основной файл с логикой бота
- `supabase.js` - Модуль для работы с Supabase
- `.env` - Файл с переменными окружения
- `README.md` - Документация проекта

## Функциональность

- Команда `/start` показывает приветственное сообщение с кнопкой для открытия WebApp
- WebApp позволяет пользователям оставить заявку (имя, телефон, сообщение)
- Заявки сохраняются в таблице 'leads' в Supabase
- Администратор получает уведомления о новых заявках
- Пользователь получает подтверждение об успешной отправке заявки 