const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'postgres',
});

async function saveLead({ name, phone, message }) {
  const query = `
    INSERT INTO leads (name, phone, message)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [name, phone, message];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

module.exports = { saveLead }; 