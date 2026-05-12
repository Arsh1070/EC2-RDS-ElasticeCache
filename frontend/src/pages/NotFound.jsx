import { Link } from "react-router-dom";
import { ROUTES } from "../etc/constants";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.sub}>
        The route you requested doesn't exist in this app.
      </p>
      <Link to={ROUTES.HOME} className={styles.homeLink}>
        ← Back to home
      </Link>
    </div>
  );
}