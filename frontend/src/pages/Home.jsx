import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchHealth, fetchUsers, fetchJsonUsers } from "../api/users";
import {
  PageHeader, StatsRow, StatCard, Card,
  Table, MethodBadge, Spinner
} from "../components/ui/UI";
import styles from "./Home.module.css";
import { ENDPOINTS, QUICK_LINKS } from "../etc";


export default function Home() {
  const [health, setHealth]     = useState(null);
  const [dbCount, setDbCount]   = useState(null);
  const [jsonCount, setJsonCount] = useState(null);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    Promise.allSettled([
      fetchHealth().then(setHealth).catch(() => setHealth("unreachable")),
      fetchUsers().then((d) => setDbCount(d.users?.length ?? 0)).catch(() => setDbCount("—")),
      fetchJsonUsers().then((d) => setJsonCount(Array.isArray(d) ? d.length : 0)).catch(() => setJsonCount("—")),
    ]).finally(() => setLoading(false));
  }, []);

  const isOnline = health && health !== "unreachable";

  return (
    <div>
      <PageHeader title="Overview" sub="API dashboard · Express.js backend" />

      <StatsRow>
        <StatCard
          label="Server status"
          value={loading ? "…" : isOnline ? "Online" : "Offline"}
          accent={isOnline ? "green" : undefined}
        />
        <StatCard label="DB users"   value={dbCount   ?? "…"} accent="accent" />
        <StatCard label="JSON users" value={jsonCount  ?? "…"} accent="green"  />
      </StatsRow>

      {/* Server banner */}
      <Card>
        <div className={styles.serverBanner}>
          <div className={`${styles.statusLight} ${isOnline ? styles.online : styles.offline}`} />
          <div>
            <p className={styles.serverLabel}>Server response</p>
            {loading
              ? <Spinner text="Pinging server…" />
              : <p className={styles.serverMsg}>{health}</p>
            }
          </div>
        </div>
      </Card>

      {/* Quick links */}
      <div className={styles.quickLinks}>
        {QUICK_LINKS.map(({ to, label, icon, desc }) => (
          <Link key={to} to={to} className={styles.quickCard}>
            <span className={styles.quickIcon}>{icon}</span>
            <div>
              <p className={styles.quickLabel}>{label}</p>
              <p className={styles.quickDesc}>{desc}</p>
            </div>
            <span className={styles.quickArrow}>→</span>
          </Link>
        ))}
      </div>

      {/* Endpoint table */}
      <Card title="Registered endpoints">
        <Table columns={["Method", "Path", "Description"]}>
          {ENDPOINTS.map((e, i) => (
            <tr key={i}>
              <td><MethodBadge method={e.method} /></td>
              <td style={{ fontFamily: "var(--mono)", fontSize: "0.82rem" }}>{e.path}</td>
              <td style={{ color: "var(--muted)", fontSize: "0.875rem" }}>{e.desc}</td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  );
}
