const express = require('express');
const path = require('path');
const { saveLead } = require('./supabase');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Инициализация бота
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: false });

// Middleware для парсинга JSON
app.use(express.json());

// Статические файлы
app.use(express.static('public'));

// API endpoint для сохранения заявок
app.post('/api/leads', async (req, res) => {
    try {
        const { name, phone, message } = req.body;

        // Сохраняем в базу данных
        const lead = await saveLead({ name, phone, message });

        // Отправляем уведомление админу
        const adminMessage = `
Новая заявка!
Имя: ${name}
Телефон: ${phone}
Сообщение: ${message}
        `;
        
        await bot.sendMessage(process.env.ADMIN_ID, adminMessage);

        res.json({ success: true, data: lead });
    } catch (error) {
        console.error('Ошибка при сохранении заявки:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Ошибка при сохранении заявки' 
        });
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
}); 