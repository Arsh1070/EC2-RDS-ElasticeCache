import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { fetchUsers, createUser, deleteUser, updateUser } from "../api/users";
import { ToastContext } from "../App";
import AddUserForm from "../components/AddUserForm";
import EditUserModal from "../components/EditUserModal";
import {
  PageHeader, StatsRow, StatCard, Card,
  Table, Badge, Button, Spinner,
} from "../components/ui/UI";
import styles from "./Users.module.css";

export default function UsersPage() {
  const toast = useContext(ToastContext);
  const [users, setUsers]     = useState([]);
  const [source, setSource]   = useState("");
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null);
  const [adding, setAdding]   = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchUsers();
      setUsers(data.users || []);
      setSource(data.source || "");
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
      await createUser(form);
      toast("User created", "success");
      load();
    } catch (e) {
      toast(e.message, "error");
    } finally {
      setAdding(false);
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await updateUser(id, data);
      toast("User updated", "success");
      load();
    } catch (e) {
      toast(e.message, "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await deleteUser(id);
      toast("User deleted", "success");
      load();
    } catch (e) {
      toast(e.message, "error");
    }
  };

  return (
    <div>
      <PageHeader title="MySQL Users" sub="CRUD operations · POST PUT DELETE /users" />

      <StatsRow>
        <StatCard label="Total records" value={users.length} accent="accent" />
        <StatCard
          label="Source server"
          value={source || "—"}
          accent={source ? "green" : undefined}
        />
        <StatCard label="Endpoint" value="GET /users" />
      </StatsRow>

      <AddUserForm onSubmit={handleAdd} loading={adding} submitLabel="Add to DB" />

      <Card
        title="User records"
        action={
          <Button variant="ghost" size="sm" onClick={load}>
            ↺ Refresh
          </Button>
        }
      >
        {loading ? (
          <Spinner text="Fetching from database…" />
        ) : (
          <Table
            columns={["ID", "Name", "Email", "Server", "Actions"]}
            empty={users.length === 0 ? "No users yet. Add one above." : undefined}
          >
            {users.map((u) => (
              <tr key={u.id}>
                <td className={styles.tdId}>#{u.id}</td>
                <td>
                  <Link to={`/users/${u.id}`} className={styles.nameLink}>
                    {u.name}
                  </Link>
                </td>
                <td className={styles.tdEmail}>{u.email}</td>
                <td><Badge variant="accent">{u.server}</Badge></td>
                <td>
                  <div className={styles.rowActions}>
                    <Button variant="ghost" size="sm" onClick={() => setEditUser(u)}>
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(u.id)}>
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        )}
      </Card>

      {editUser && (
        <EditUserModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}
