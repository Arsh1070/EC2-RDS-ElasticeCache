// require("dotenv").config(); // loads .env in local dev; ECS/EC2 uses real env vars
const express = require("express");
const { bootstrapDatabase } = require("./db/bootstrap");
const { getRedisClient } = require("./db/redis");
const { closeRedis } = require("./db/redis");
const usersRouter = require("./routes/users");

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Mount users router
app.use("/api/users", usersRouter);

// Health-check endpoint (useful for ALB / ECS target groups)
app.get("/health", (req, res) => res.json({ status: "ok" }));

// ─── Startup ─────────────────────────────────────────────────────────────────
async function start() {
  try {
    // 1. Run DDL against RDS (idempotent — safe to repeat across replicas)
    await bootstrapDatabase();

    // 2. Eagerly verify Redis connection
    await getRedisClient();


    // 3. Start HTTP server
    app.listen(PORT, () => {
      console.log(`[App] listening on port ${PORT} | instance: ${process.env.APP_NAME}`);
    });
  } catch (err) {
    console.error("[App] startup failed:", err);
    process.exit(1);
  }
}

// ─── Graceful shutdown (SIGTERM from ECS / Docker) ───────────────────────────
async function shutdown(signal) {
  console.log(`[App] received ${signal} — shutting down`);
  await closeRedis();
  process.exit(0);
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT",  () => shutdown("SIGINT"));

start();