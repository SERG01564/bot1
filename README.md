# Telegram Bot с WebApp и PostgreSQL

Этот проект представляет собой Telegram-бота, который позволяет пользователям оставлять заявки через WebApp и сохраняет их в базе данных PostgreSQL.

## Требования

- Node.js (версия 14 или выше)
- npm
- Docker и Docker Compose
- Telegram Bot Token

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
ADMIN_ID=your_admin_telegram_id
FRONTEND_URL=your_frontend_webapp_url
```

## Запуск базы данных

Проект использует Docker для запуска PostgreSQL и pgAdmin. Для запуска выполните:
```bash
docker-compose up -d
```

После запуска:
- PostgreSQL будет доступен на порту 5432
- pgAdmin будет доступен на порту 5050 (логин: admin@admin.com, пароль: admin)

## Запуск бота

Для запуска бота выполните:
```bash
node bot.js
```

## Структура проекта

- `bot.js` - Основной файл с логикой бота
- `db.js` - Модуль для работы с PostgreSQL
- `docker-compose.yml` - Конфигурация Docker
- `supabase/migrations/` - SQL миграции для создания таблиц
- `.env` - Файл с переменными окружения
- `README.md` - Документация проекта

## Функциональность

- Команда `/start` показывает приветственное сообщение с кнопкой для открытия WebApp
- WebApp позволяет пользователям оставить заявку (имя, телефон, сообщение)
- Заявки сохраняются в таблице 'leads' в PostgreSQL
- Администратор получает уведомления о новых заявках
- Пользователь получает подтверждение об успешной отправке заявки

## Структура базы данных

Таблица `leads`:
- `id` (BIGSERIAL) - Уникальный идентификатор
- `name` (TEXT) - Имя пользователя
- `phone` (TEXT) - Телефон пользователя
- `message` (TEXT) - Сообщение пользователя
- `created_at` (TIMESTAMPTZ) - Дата и время создания заявки 