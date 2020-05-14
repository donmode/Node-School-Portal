const { createPool } = require("mysql");

const pool = createPool({
  port: process.env.DB_PORT || 3306,
  host: process.env.DB_HOST || "us-cdbr-east-06.cleardb.net",
  user: process.env.DB_USER || "bbe685dc43840b",
  password: process.env.DB_PASSWORD || "087ed103",
  database: process.env.MYSQL_DB || "heroku_fe2fcb48d4bdaa0",
  connectionLimit: process.env.MYSQL_DB_CONNECTION_LIMIT || 50,
});

module.exports = pool;
