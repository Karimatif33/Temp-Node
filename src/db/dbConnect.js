const { Pool } = require("pg");
require('dotenv').config()
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client:", err.stack);
  }
  console.log("Connected to the database");
  release(); // release the client back to the pool
});

module.exports = {
  pool,
  connect: async () => {
    return await pool.connect();
  },
  end: async () => {
    await pool.end();
  },
};
