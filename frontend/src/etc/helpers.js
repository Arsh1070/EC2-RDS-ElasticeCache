// ─── String helpers ───────────────────────────────────────────────────────────

/**
 * Returns initials from a full name (max 2 chars, uppercase).
 * e.g. "Jane Doe" → "JD"
 */
export function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Truncates a string to `max` characters, appending "…" if needed.
 */
export function truncate(str = "", max = 40) {
  return str.length > max ? str.slice(0, max) + "…" : str;
}

/**
 * Capitalises the first letter of a string.
 */
export function capitalise(str = "") {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ─── Validation helpers ───────────────────────────────────────────────────────

/**
 * Returns true if the string looks like a valid email address.
 */
export function isValidEmail(email = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Returns true if all required user form fields are filled and valid.
 */
export function isValidUserForm({ name, email }) {
  return name.trim().length > 0 && isValidEmail(email);
}

// ─── API helpers ──────────────────────────────────────────────────────────────

/**
 * Wraps a fetch call; throws a normalised Error if the response is not ok.
 */
export async function safeFetch(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text().catch(() => `HTTP ${res.status}`);
    throw new Error(text || `Request failed with status ${res.status}`);
  }
  return res;
}

/**
 * Builds a JSON POST/PUT options object.
 */
export function jsonBody(method, data) {
  return {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
}

// ─── Formatting helpers ───────────────────────────────────────────────────────

/**
 * Formats a number with comma separators.
 * e.g. 1234567 → "1,234,567"
 */
export function formatNumber(n) {
  return Number(n).toLocaleString();
}

/**
 * Returns a relative time string for a given ISO date string.
 * e.g. "2 minutes ago", "just now"
 */
export function relativeTime(isoString) {
  const diff = Math.floor((Date.now() - new Date(isoString)) / 1000);
  if (diff < 10)  return "just now";
  if (diff < 60)  return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}