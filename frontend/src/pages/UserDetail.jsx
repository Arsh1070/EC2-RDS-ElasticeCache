import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchUserById, updateUser, deleteUser } from "../api/users";
import { ToastContext } from "../App";
import EditUserModal from "../components/EditUserModal";
import {
  PageHeader, Card, Badge, Button, Spinner, StatsRow, StatCard,
} from "../components/ui/UI";
import styles from "./UserDetail.module.css";

export default function UserDetail() {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const toast        = useContext(ToastContext);
  const [user, setUser]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchUserById(id);
      setUser(data);
    } catch (e) {
      toast(e.message, "error");
      navigate("/users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [id]);

  const handleUpdate = async (uid, data) => {
    try {
      await updateUser(uid, data);
      toast("User updated", "success");
      load();
    } catch (e) {
      toast(e.message, "error");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Permanently delete this user?")) return;
    try {
      await deleteUser(id);
      toast("User deleted", "success");
      navigate("/users");
    } catch (e) {
      toast(e.message, "error");
    }
  };

  if (loading) {
    return (
      <div>
        <PageHeader title={`User #${id}`} sub="Loading…" />
        <Card><Spinner text="Fetching user…" /></Card>
      </div>
    );
  }

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div>
      <div className={styles.breadcrumb}>
        <Link to="/users" className={styles.backLink}>← DB Users</Link>
        <span className={styles.breadSep}>/</span>
        <span className={styles.breadCurrent}>User #{id}</span>
      </div>

      <div className={styles.heroCard}>
        <div className={styles.avatar}>{initials}</div>
        <div className={styles.heroInfo}>
          <h1 className={styles.heroName}>{user.name}</h1>
          <p className={styles.heroEmail}>{user.email}</p>
          <div className={styles.heroBadges}>
            <Badge variant="accent">ID #{user.id}</Badge>
            <Badge variant="green">{user.server}</Badge>
          </div>
        </div>
        <div className={styles.heroActions}>
          <Button variant="ghost" onClick={() => setEditing(true)}>Edit user</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
      </div>

      <StatsRow>
        <StatCard label="User ID"  value={`#${user.id}`}  accent="accent" />
        <StatCard label="Server"   value={user.server || "—"} />
        <StatCard label="Status"   value="Active"         accent="green"  />
      </StatsRow>

      <Card title="User details">
        <div className={styles.detailGrid}>
          {[
            { label: "Full name",  value: user.name  },
            { label: "Email",      value: user.email },
            { label: "Server",     value: user.server || "—" },
            { label: "User ID",    value: `#${user.id}` },
          ].map(({ label, value }) => (
            <div key={label} className={styles.detailRow}>
              <span className={styles.detailLabel}>{label}</span>
              <span className={styles.detailValue}>{value}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card title="API endpoints for this user">
        <div className={styles.endpointList}>
          {[
            { method: "PUT",    path: `/users/${id}`, desc: "Update this user's name & email" },
            { method: "DELETE", path: `/users/${id}`, desc: "Permanently delete this user"    },
          ].map((e) => (
            <div key={e.method} className={styles.endpointRow}>
              <span className={`${styles.methodTag} ${styles[`m${e.method}`]}`}>{e.method}</span>
              <span className={styles.endpointPath}>{e.path}</span>
              <span className={styles.endpointDesc}>{e.desc}</span>
            </div>
          ))}
        </div>
      </Card>

      {editing && (
        <EditUserModal
          user={user}
          onClose={() => setEditing(false)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}
