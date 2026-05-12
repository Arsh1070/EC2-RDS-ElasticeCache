/**
 * theme.js
 * JS mirror of the CSS custom properties defined in index.css.
 * Use these in any context where CSS variables are not available
 * (e.g. canvas drawing, charting libraries, dynamic inline styles).
 *
 * Source of truth is always index.css — keep in sync if you change colours.
 */

export const color = {
  // Backgrounds
  bg:       "#0a0a0f",
  surface:  "#111118",
  surface2: "#18181f",
  surface3: "#1f1f28",

  // Borders
  border:  "#2a2a38",
  border2: "#3a3a4a",

  // Accent (purple)
  accent:    "#7c6bff",
  accent2:   "#a78bfa",
  accentDim: "#1e1a3a",

  // Semantic
  green:       "#34d399",
  greenDim:    "#0d2318",
  greenBorder: "#1a4a30",

  red:       "#f87171",
  redDim:    "#2d0f0f",
  redBorder: "#5a1a1a",

  amber:    "#fbbf24",
  amberDim: "#2a1f06",

  // Text
  text:  "#f0f0ff",
  muted: "#7070a0",
  dim:   "#404060",
};

export const font = {
  sans: "'Syne', sans-serif",
  mono: "'DM Mono', monospace",
};

export const radius = {
  sm: "6px",
  md: "10px",
  lg: "14px",
};

/** Returns the foreground + background colour pair for a given HTTP method. */
export function methodColors(method) {
  const map = {
    GET:    { bg: "rgba(52,211,153,0.12)",  fg: color.green   },
    POST:   { bg: "rgba(124,107,255,0.15)", fg: color.accent2 },
    PUT:    { bg: "rgba(251,191,36,0.12)",  fg: color.amber   },
    DELETE: { bg: "rgba(248,113,113,0.12)", fg: color.red     },
  };
  return map[method] ?? { bg: color.surface2, fg: color.muted };
}