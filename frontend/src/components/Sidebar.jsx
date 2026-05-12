import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { API_BASE, NAV_ITEMS } from "../etc";


export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        user<span>mgr</span>
      </div>

      <nav className={styles.nav}>
        <p className={styles.navLabel}>Navigation</p>
        {NAV_ITEMS.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
          >
            <span className={styles.navIcon}>{icon}</span>
            {label}
            {to === "/" && <span className={styles.statusDot} />}
          </NavLink>
        ))}
      </nav>

      <div className={styles.footer}>
        <p className={styles.footerLabel}>base url</p>
        <p className={styles.footerValue}>EC2 Server</p>
      </div>
    </aside>
  );
}
