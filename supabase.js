const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Инициализация клиента Supabase
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

/**
 * Сохраняет данные заявки в таблицу leads
 * @param {Object} data - Данные заявки (name, phone, message)
 * @returns {Promise<Object>} Результат операции
 */
async function saveLead(data) {
    try {
        const { data: result, error } = await supabase
            .from('leads')
            .insert([data]);

        if (error) throw error;
        return result;
    } catch (error) {
        console.error('Ошибка при сохранении заявки:', error);
        throw error;
    }
}

module.exports = { saveLead }; 