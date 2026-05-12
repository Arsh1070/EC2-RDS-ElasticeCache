// db/redis.js  —  AWS ElastiCache (Redis) client
const { createClient } = require("redis");

let client;

async function getRedisClient() {
  if (client && client.isOpen) return client;

  const url = process.env.REDIS_URL
    // e.g. redis://my-cache.xxxx.use1.cache.amazonaws.com:6379
    ?? `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT || 6379}`;

  client = createClient({
      url,
      socket: {
      // ElastiCache Cluster Mode — set to true if you use cluster mode enabled
      tls: process.env.REDIS_TLS === "true",
      rejectUnauthorized: true,
      connectTimeout: 5_000,
      reconnectStrategy:  (retries) => Math.min(retries * 100, 3_000), // cap at 3 s
    },
  });

  client.on("error", (err) => console.error("[Redis] error:", err.message));
  client.on("connect", () => console.log("[Redis] connected →", url));
  client.on("reconnecting",() => console.warn("[Redis] reconnecting..."));

  await client.connect();
  return client;
}

/** Graceful shutdown hook */
async function closeRedis() {
  if (client?.isOpen) await client.quit();
}

module.exports = { getRedisClient, closeRedis };