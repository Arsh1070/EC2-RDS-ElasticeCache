// import { API_BASE } from "../etc/constants";
import { safeFetch, jsonBody } from "../etc/helpers";

// ── DB Users ──────────────────────────────────────────────────────────────────

/** GET /users → { users: [], source: "" } */
export async function fetchUsers() {
  const res = await safeFetch(`/api/users`);
  return res.json();
}

/**
 * Fetch a single user by ID.
 * The API has no GET /users/:id, so we fetch all and filter client-side.
 */
export async function fetchUserById(id) {
  const data = await fetchUsers();
  const user = data.users?.find((u) => String(u.id) === String(id));
  if (!user) throw new Error(`User #${id} not found`);
  return user;
}

/** POST /users → { id, name, email, server } */
export async function createUser({ name, email }) {
  const res = await safeFetch(`/api/users`, jsonBody("POST", { name, email }));
  return res.json();
}

/** PUT /users/:id → "Updated" */
export async function updateUser(id, { name, email }) {
  const res = await safeFetch(`/api/users/${id}`, jsonBody("PUT", { name, email }));
  return res.text();
}

/** DELETE /users/:id → "Deleted" */
export async function deleteUser(id) {
  const res = await safeFetch(`/api/users/${id}`, { method: "DELETE" });
  return res.text();
}

// ── JSON File Users ───────────────────────────────────────────────────────────

/** GET /users/json → [] */
export async function fetchJsonUsers() {
  const res = await safeFetch(`/api/users/json`);
  return res.json();
}

/** POST /users/json → { message, user } */
export async function createJsonUser({ name, email }) {
  const res = await safeFetch(`/api/users/json`, jsonBody("POST", { name, email }));
  return res.json();
}

// ── Health ────────────────────────────────────────────────────────────────────

/** GET / → plain text greeting */
export async function fetchHealth() {
  const res = await safeFetch(`/api/`);
  return res.text();
}