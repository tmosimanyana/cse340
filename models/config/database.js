const { Pool } = require('pg'); // Using 'pg' library for PostgreSQL
require('dotenv').config(); // Load environment variables from .env file

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure this is in your .env file
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;


