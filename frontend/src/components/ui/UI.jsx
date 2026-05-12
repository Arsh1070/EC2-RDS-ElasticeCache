import styles from "./UI.module.css";

/* ── Button ─────────────────────────────────────── */
const SIZE_MAP    = { md: styles.sizeMd, sm: styles.sizeSm, lg: styles.sizeLg };
const VARIANT_MAP = {
  primary:  styles.primary,
  ghost:    styles.ghost,
  danger:   styles.danger,
  success:  styles.successBtn,
};

export function Button({ variant = "primary", size = "md", children, ...props }) {
  return (
    <button
      className={[styles.btn, VARIANT_MAP[variant], SIZE_MAP[size]].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}

/* ── Input ──────────────────────────────────────── */
export function Input({ label, ...props }) {
  return (
    <div className={styles.field}>
      {label && <label className={styles.label}>{label}</label>}
      <input className={styles.input} {...props} />
    </div>
  );
}

/* ── Card ───────────────────────────────────────── */
export function Card({ title, children, action }) {
  return (
    <div className={styles.card}>
      {(title || action) && (
        <div className={styles.cardHeader}>
          {title && <p className={styles.cardTitle}>{title}</p>}
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

/* ── StatCard ───────────────────────────────────── */
const STAT_VALUE_CLASS = {
  accent: styles.statValueAccent,
  green:  styles.statValueGreen,
  amber:  styles.statValueAmber,
};

export function StatCard({ label, value, accent }) {
  const valueClass = STAT_VALUE_CLASS[accent] ?? styles.statValue;
  return (
    <div className={styles.statCard}>
      <p className={styles.statLabel}>{label}</p>
      <p className={valueClass}>{value}</p>
    </div>
  );
}

/* ── Badge ──────────────────────────────────────── */
const BADGE_MAP = {
  default: styles.badgeDefault,
  accent:  styles.badgeAccent,
  green:   styles.badgeGreen,
  amber:   styles.badgeAmber,
};

export function Badge({ children, variant = "default" }) {
  return (
    <span className={[styles.badge, BADGE_MAP[variant] ?? styles.badgeDefault].join(" ")}>
      {children}
    </span>
  );
}

/* ── Method Badge ───────────────────────────────── */
const METHOD_MAP = {
  GET:    styles.methodGET,
  POST:   styles.methodPOST,
  PUT:    styles.methodPUT,
  DELETE: styles.methodDELETE,
};

export function MethodBadge({ method }) {
  return (
    <span className={[styles.methodBadge, METHOD_MAP[method]].filter(Boolean).join(" ")}>
      {method}
    </span>
  );
}

/* ── Table ──────────────────────────────────────── */
export function Table({ columns, children, empty }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>{columns.map((col) => <th key={col}>{col}</th>)}</tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
      {empty && <div className={styles.empty}>{empty}</div>}
    </div>
  );
}

/* ── Spinner ────────────────────────────────────── */
export function Spinner({ text = "Loading…" }) {
  return (
    <div className={styles.spinner}>
      <div className={styles.spinnerDot} />
      <span>{text}</span>
    </div>
  );
}

/* ── Modal ──────────────────────────────────────── */
export function Modal({ onClose, children }) {
  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>{children}</div>
    </div>
  );
}

export function ModalTitle({ children }) {
  return <p className={styles.modalTitle}>{children}</p>;
}

export function ModalActions({ children }) {
  return <div className={styles.modalActions}>{children}</div>;
}

/* ── Page Header ────────────────────────────────── */
export function PageHeader({ title, sub }) {
  return (
    <div className={styles.pageHeader}>
      <h1 className={styles.pageTitle}>{title}</h1>
      {sub && <p className={styles.pageSub}>{sub}</p>}
    </div>
  );
}

/* ── Stats Row ──────────────────────────────────── */
export function StatsRow({ children }) {
  return <div className={styles.statsRow}>{children}</div>;
}

/* ── Form Grid ──────────────────────────────────── */
export function FormGrid({ children }) {
  return <div className={styles.formGrid}>{children}</div>;
}