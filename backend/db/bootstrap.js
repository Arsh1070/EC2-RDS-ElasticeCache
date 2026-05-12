// db/bootstrap.js  —  Run once at startup; idempotent DDL
const { getRDSPool } = require("./rds");

async function bootstrapDatabase() {
  const db = getRDSPool();

  // RDS instance is already tied to one database — no "CREATE DATABASE" needed.
  // Just ensure the table exists.
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id     INT AUTO_INCREMENT PRIMARY KEY,
      name   VARCHAR(255) NOT NULL,
      email  VARCHAR(255) UNIQUE NOT NULL,
      server VARCHAR(255)
    )
  `);

  console.log("[Bootstrap] users table ready");
}

module.exports = { bootstrapDatabase };