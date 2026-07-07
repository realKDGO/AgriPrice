'use strict';

const mysql = require('mysql2/promise');

/**
 * db.js — MySQL2 connection pool.
 *
 * Using a pool (not a single connection) is best practice for Express:
 * it handles concurrent requests and auto-reconnects on dropped connections.
 *
 * Usage in models:
 *   const db = require('../config/db');
 *   const [rows] = await db.query('SELECT * FROM table');
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'agriprice',
  waitForConnections: true,
  connectionLimit: 10,       // Max simultaneous connections
  queueLimit: 0,             // Unlimited queued requests
  timezone: '+08:00',        // Philippine Standard Time (PST)
});

/**
 * Test the DB connection on server startup.
 * Call this from server.js after dotenv is loaded.
 */
async function testConnection() {
  try {
    const conn = await pool.getConnection();
    console.log('✅  MySQL connected successfully');
    conn.release();
  } catch (err) {
    console.error('❌  MySQL connection failed:', err.message);
    // Do not crash the server — allow retry or graceful degradation
  }
}

module.exports = { pool, testConnection };
