const { Telegraf, Markup } = require('telegraf');
const { saveLead } = require('./supabase');
require('dotenv').config();

// Инициализация бота
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

// Обработка команды /start
bot.command('start', async (ctx) => {
    const webAppUrl = process.env.FRONTEND_URL;
    
    await ctx.reply(
        'Добро пожаловать! Нажмите кнопку ниже, чтобы оставить заявку.',
        Markup.keyboard([
            Markup.button.webApp('Оставить заявку', webAppUrl)
        ]).resize()
    );
});

// Обработка данных от WebApp
bot.on('web_app_data', async (ctx) => {
    try {
        // Парсинг данных из WebApp
        const data = JSON.parse(ctx.message.web_app_data.data);
        
        // Сохранение заявки в Supabase
        await saveLead(data);
        
        // Отправка уведомления администратору
        await bot.telegram.sendMessage(
            process.env.ADMIN_ID,
            `📝 Новая заявка!\n\nИмя: ${data.name}\nТелефон: ${data.phone}\nСообщение: ${data.message}`
        );
        
        // Подтверждение пользователю
        await ctx.reply('Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.');
    } catch (error) {
        console.error('Ошибка при обработке заявки:', error);
        await ctx.reply('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.');
    }
});

// Запуск бота
bot.launch()
    .then(() => console.log('Бот успешно запущен'))
    .catch((err) => console.error('Ошибка при запуске бота:', err));

// Включение graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM')); 