// ─── API ──────────────────────────────────────────────────────────────────────
export const API_BASE = "http://localhost:4000";

// ─── App metadata ─────────────────────────────────────────────────────────────
export const APP_NAME    = "Demo Frontend";
export const APP_VERSION = "1.0.0";

// ─── Toast durations (ms) ─────────────────────────────────────────────────────
export const TOAST_DURATION_DEFAULT = 3500;
export const TOAST_DURATION_ERROR   = 5000;
export const TOAST_DURATION_SUCCESS = 3000;

// ─── Toast types ──────────────────────────────────────────────────────────────
export const TOAST_TYPE = {
  SUCCESS: "success",
  ERROR:   "error",
  INFO:    "info",
};

// ─── HTTP methods ─────────────────────────────────────────────────────────────
export const HTTP_METHOD = {
  GET:    "GET",
  POST:   "POST",
  PUT:    "PUT",
  DELETE: "DELETE",
};

// ─── Route paths ──────────────────────────────────────────────────────────────
export const ROUTES = {
  HOME:        "/",
  USERS:       "/users",
  USER_DETAIL: "/users/:id",
  USERS_JSON:  "/users/json",
};

// ─── Nav items (used by Sidebar) ──────────────────────────────────────────────
export const NAV_ITEMS = [
  { to: ROUTES.HOME,       icon: "◈", label: "Home"       },
  { to: ROUTES.USERS,      icon: "⬡", label: "DB Users"   },
  { to: ROUTES.USERS_JSON, icon: "◧", label: "JSON Users" },
];

// ─── Endpoint registry (used by Home page) ────────────────────────────────────
export const ENDPOINTS = [
  { method: HTTP_METHOD.GET,    path: "/",            desc: "Server health check"     },
  { method: HTTP_METHOD.GET,    path: "/users",       desc: "Fetch all DB users"      },
  { method: HTTP_METHOD.POST,   path: "/users",       desc: "Create a DB user"        },
  { method: HTTP_METHOD.PUT,    path: "/users/:id",   desc: "Update a DB user"        },
  { method: HTTP_METHOD.DELETE, path: "/users/:id",   desc: "Delete a DB user"        },
  { method: HTTP_METHOD.GET,    path: "/users/json",  desc: "Fetch JSON file users"   },
  { method: HTTP_METHOD.POST,   path: "/users/json",  desc: "Save user to JSON file"  },
];

// ─── Quick-link cards (used by Home page) ─────────────────────────────────────
export const QUICK_LINKS = [
  {
    to:    ROUTES.USERS,
    icon:  "⬡",
    label: "Manage DB Users",
    desc:  "Create, edit, delete MySQL users",
  },
  {
    to:    ROUTES.USERS_JSON,
    icon:  "◧",
    label: "Manage JSON Users",
    desc:  "Read & write to the filesystem JSON store",
  },
];

// ─── Method badge colour map ───────────────────────────────────────────────────
export const METHOD_COLOR = {
  GET:    { bg: "rgba(52,211,153,0.12)",  fg: "var(--green)"   },
  POST:   { bg: "rgba(124,107,255,0.15)", fg: "var(--accent2)" },
  PUT:    { bg: "rgba(251,191,36,0.12)",  fg: "var(--amber)"   },
  DELETE: { bg: "rgba(248,113,113,0.12)", fg: "var(--red)"     },
};