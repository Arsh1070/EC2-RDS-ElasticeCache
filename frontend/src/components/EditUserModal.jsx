/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./EditUserModal.module.css";

export default function EditUserModal({ user, onClose, onSave }) {
  const [name, setName]     = useState(user.name);
  const [email, setEmail]   = useState(user.email);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name || !email) return;
    setSaving(true);
    await onSave(user.id, { name, email });
    setSaving(false);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <p className={styles.title}>
          Edit user <span className={styles.idHighlight}>#{user.id}</span>
        </p>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label className={styles.label}>Name</label>
            <input
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button
            className={styles.saveBtn}
            onClick={handleSave}
            disabled={saving || !name || !email}
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}