/* eslint-disable react/prop-types */
import styles from "./Toast.module.css";

const ICONS = { success: "✓", error: "✕", info: "◈" };

export default function Toast({ toasts }) {
  return (
    <div className={styles.container}>
      {toasts.map((t) => (
        <div key={t.id} className={`${styles.toast} ${styles[t.type]}`}>
          <span className={styles.icon}>{ICONS[t.type]}</span>
          {t.msg}
        </div>
      ))}
    </div>
  );
}