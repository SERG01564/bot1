const { Pool } = require('pg');
require('dotenv').config();

// Инициализация пула соединений с PostgreSQL
const pool = new Pool({
    host: process.env.PGHOST || 'host.docker.internal',
    port: process.env.PGPORT || 5433,
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'postgres',
    database: process.env.PGDATABASE || 'postgres'
});

/**
 * Сохраняет данные заявки в таблицу leads
 * @param {Object} data - Данные заявки (name, phone, message)
 * @returns {Promise<Object>} Результат операции
 */
async function saveLead(data) {
    try {
        const result = await pool.query(
            'INSERT INTO leads (name, phone, message) VALUES ($1, $2, $3) RETURNING *',
            [data.name, data.phone, data.message]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Ошибка при сохранении заявки:', error);
        throw error;
    }
}

module.exports = { saveLead }; 