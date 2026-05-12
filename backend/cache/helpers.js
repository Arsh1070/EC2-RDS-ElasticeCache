// cache/helpers.js  —  Thin wrapper around Redis for cache-aside pattern
const { getRedisClient } = require("../db/redis");

const USERS_LIST_KEY = "users:all";            // GET /api/users
const USER_KEY = (id) => `users:${id}`; // individual user (optional)
const DEFAULT_TTL = 60;                     // seconds

/**
 * Cache-aside: try Redis first, fall back to loader(), then prime the cache.
 * @param {string}   key      Redis key
 * @param {Function} loader   Async function that returns the real data
 * @param {number}   ttl      Seconds to live
 */
async function cacheAside(key, loader, ttl = DEFAULT_TTL) {
  const redis = await getRedisClient();

  const cached = await redis.get(key);
  if (cached) {
    console.log(`[Cache] hit for key: ${key}`);
    return { data: JSON.parse(cached), fromCache: true };
  }

  const data = await loader();
  await redis.setEx(key, ttl, JSON.stringify(data));
  console.log(`[Cache] miss for key: ${key} — loaded and cached`);
  return { data, fromCache: false };
}

/**
 * Invalidate one or more keys (call on write operations).
 */
async function invalidateKeys(...keys) {
  const redis = await getRedisClient();
  if (keys.length) await redis.del(keys);
}

module.exports = {
  USERS_LIST_KEY,
  USER_KEY,
  cacheAside,
  invalidateKeys,
};