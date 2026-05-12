// db/rds.js  —  AWS RDS (MySQL) connection pool
const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

const sslConfig = process.env.RDS_SSL === "true"
  ? {
  rejectUnauthorized: true,
  ca: fs.readFileSync(path.join(__dirname, '../../certs/global-bundle.pem')),
}
  : undefined;

let pool;

function getRDSPool() {
  if (pool) return pool;

  pool = mysql.createPool({
    host: process.env.RDS_HOST,       // e.g. mydb.xxxx.us-east-1.rds.amazonaws.com
    port: parseInt(process.env.RDS_PORT || "3306"),
    user: process.env.RDS_USER,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE,   // "testdb"

    // Pool tuning — scale to your replica count (3 nodes × 10 = 30 total)
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

    // Resilience
    enableKeepAlive: true,
    keepAliveInitialDelay: 30000,

    // SSL is mandatory for RDS in production
    ssl: sslConfig
  });

  // Surface pool errors instead of silent crashes
  pool.on("connection", (conn) => {
    conn.on("error", (err) => {
      console.error("[RDS] connection error:", err.code);
    });
  });

  console.log("[RDS] pool created →", process.env.RDS_HOST);
  return pool;
}

module.exports = { getRDSPool };