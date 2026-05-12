
// Changes vs original:
//   • db       → AWS RDS pool  (mysql2/promise, same API you already use)
//   • Redis    → cache-aside on GET /api/users
//   • Writes   → invalidate Redis so the next GET is always fresh
//   • DDL      → moved to db/bootstrap.js (runs once at startup, not per-request)

const { Router } = require("express");
const { getRDSPool } = require("../db/rds");
const {
  USERS_LIST_KEY,
  cacheAside,
  invalidateKeys,
} = require("../cache/helpers");

const router = Router();

// ─── POST /api/users ────────────────────────────────────────────────────────
router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "name and email are required" });
    }

    const db = getRDSPool();
    const APP_NAME = process.env.APP_NAME ?? null;

    const [result] = await db.execute(
      "INSERT INTO users (name, email, server) VALUES (?, ?, ?)",
      [name, email, APP_NAME]
    );

    // Invalidate the list cache so next GET fetches fresh data from RDS
    await invalidateKeys(USERS_LIST_KEY);

    return res.status(201).json({
      id: result.insertId,
      name,
      email,
      server: APP_NAME,
    });
  } catch (err) {
    // MySQL duplicate-entry → user-friendly message
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "Email already exists" });
    }
    console.error("[POST /users]", err);
    return res.status(500).json({ error: err.message });
  }
});

// ─── GET /api/users ─────────────────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const db = getRDSPool();

    const { data: users, fromCache } = await cacheAside(
      USERS_LIST_KEY,
      async () => {
        const [rows] = await db.execute("SELECT * FROM users");
        return rows;
      }
    );

    return res.json({
      users,
      source: process.env.APP_NAME,
      fromCache,                        // handy for debugging; remove in prod if preferred
    });
  } catch (err) {
    console.error("[GET /users]", err);
    return res.status(500).json({ error: err.message });
  }
});

// ─── PUT /api/users/:id ──────────────────────────────────────────────────────
router.put("/:id", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "name and email are required" });
    }

    const db = getRDSPool();
    const [result] = await db.execute(
      "UPDATE users SET name=?, email=? WHERE id=?",
      [name, email, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    await invalidateKeys(USERS_LIST_KEY);

    return res.json({ message: "Updated" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "Email already exists" });
    }
    console.error("[PUT /users/:id]", err);
    return res.status(500).json({ error: err.message });
  }
});

// ─── DELETE /api/users/:id ───────────────────────────────────────────────────
router.delete("/:id", async (req, res) => {
  try {
    const db = getRDSPool();
    const [result] = await db.execute(
      "DELETE FROM users WHERE id=?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    await invalidateKeys(USERS_LIST_KEY);

    return res.json({ message: "Deleted" });
  } catch (err) {
    console.error("[DELETE /users/:id]", err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;