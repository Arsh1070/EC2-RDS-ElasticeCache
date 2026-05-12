import { useEffect, useState, useContext } from "react";
import { fetchJsonUsers, createJsonUser } from "../api/users";
import { ToastContext } from "../App";
import AddUserForm from "../components/AddUserForm";
import {
  PageHeader, StatsRow, StatCard, Card,
  Table, Button, Spinner,
} from "../components/ui/UI";
import styles from "./UsersJson.module.css";

export default function UsersJson() {
  const toast             = useContext(ToastContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding]   = useState(false);
  const [view, setView]       = useState("table"); // "table" | "raw"

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchJsonUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (e) {
      toast(e.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async (form) => {
    setAdding(true);
    try {
      const res = await createJsonUser(form);
      toast(res.message || "Saved to JSON file", "success");
      load();
    } catch (e) {
      toast(e.message, "error");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div>
      <PageHeader title="JSON File Users" sub="Filesystem storage · users/users.json" />

      <StatsRow>
        <StatCard label="Records in file" value={users.length} accent="green" />
        <StatCard label="File path"        value="users/users.json" />
        <StatCard label="Endpoints"        value="GET + POST" />
      </StatsRow>

      <AddUserForm onSubmit={handleAdd} loading={adding} submitLabel="Save to JSON" />

      <Card
        title="Stored records"
        action={
          <div className={styles.viewToggle}>
            <button
              className={`${styles.toggleBtn} ${view === "table" ? styles.active : ""}`}
              onClick={() => setView("table")}
            >Table</button>
            <button
              className={`${styles.toggleBtn} ${view === "raw" ? styles.active : ""}`}
              onClick={() => setView("raw")}
            >Raw JSON</button>
            <Button variant="ghost" size="sm" onClick={load}>↺</Button>
          </div>
        }
      >
        {loading ? (
          <Spinner text="Reading from file…" />
        ) : view === "table" ? (
          <Table
            columns={["#", "Name", "Email"]}
            empty={users.length === 0 ? "No records in JSON file yet." : undefined}
          >
            {users.map((u, i) => (
              <tr key={i}>
                <td style={{ fontFamily: "var(--mono)", color: "var(--dim)", fontSize: "0.8rem" }}>{i + 1}</td>
                <td style={{ fontWeight: 600 }}>{u.name}</td>
                <td style={{ fontFamily: "var(--mono)", color: "var(--muted)", fontSize: "0.82rem" }}>{u.email}</td>
              </tr>
            ))}
          </Table>
        ) : (
          <pre className={styles.jsonBox}>
            {JSON.stringify(users, null, 2)}
          </pre>
        )}
      </Card>
    </div>
  );
}
