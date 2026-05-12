import { useState } from "react";
import styles from "./AddUserForm.module.css";

export default function AddUserForm({
  onSubmit,
  submitLabel = "Add user",
  loading = false,
}) {
  const [form, setForm] = useState({ name: "", email: "" });

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    await onSubmit(form);
    setForm({ name: "", email: "" });
  };

  const isDisabled = loading || !form.name || !form.email;

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Add new user</p>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label className={styles.label}>Name</label>
          <input
            className={styles.input}
            value={form.name}
            onChange={set("name")}
            placeholder="Jane Doe"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder="jane@example.com"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </div>
      </div>

      <button
        className={styles.submitBtn}
        onClick={handleSubmit}
        disabled={isDisabled}
      >
        ＋ {submitLabel}
      </button>
    </div>
  );
}