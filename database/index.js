const pgp = require('pg-promise')();
require('dotenv').config(); // Loads .env variables

const db = pgp(process.env.DATABASE_URL);

module.exports = db;
