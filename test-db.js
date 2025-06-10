const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'postgres',
});

async function testDatabase() {
  try {
    const client = await pool.connect();
    console.log('Подключение к базе данных установлено');

    // Проверяем таблицу leads
    const result = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'leads'
      );
    `);

    if (result.rows[0].exists) {
      console.log('Таблица leads существует');
      
      // Показываем структуру таблицы
      const tableInfo = await client.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = 'leads';
      `);
      
      console.log('\nСтруктура таблицы leads:');
      tableInfo.rows.forEach(row => {
        console.log(`${row.column_name}: ${row.data_type}`);
      });

      // Пробуем добавить тестовую запись
      const testLead = {
        name: 'Тестовый пользователь',
        phone: '+7999999999',
        message: 'Тестовое сообщение'
      };

      const insertResult = await client.query(`
        INSERT INTO leads (name, phone, message)
        VALUES ($1, $2, $3)
        RETURNING *;
      `, [testLead.name, testLead.phone, testLead.message]);

      console.log('\nТестовая запись добавлена:', insertResult.rows[0]);
    } else {
      console.log('Таблица leads не существует');
    }

    client.release();
  } catch (err) {
    console.error('Ошибка:', err);
  } finally {
    pool.end();
  }
}

testDatabase(); 