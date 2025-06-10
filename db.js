const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  port: process.env.PGPORT || 5432,
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'postgres',
  database: process.env.PGDATABASE || 'postgres',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
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