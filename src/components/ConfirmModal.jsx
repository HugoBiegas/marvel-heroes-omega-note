/**
 * Modale de confirmation avec boutons Annuler / Confirmer.
 * Utilisée pour demander la confirmation d'écrasement lors d'un import.
 */
export default function ConfirmModal({ open, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        zIndex: 1100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        style={{
          background: "var(--bg-card)",
          borderRadius: 16,
          padding: 28,
          maxWidth: 440,
          width: "100%",
          border: "1px solid var(--red)",
          boxShadow: "var(--shadow-confirm)",
        }}
      >
        <p
          style={{
            color: "var(--text)",
            fontSize: 15,
            lineHeight: 1.6,
            margin: "0 0 24px",
          }}
        >
          {message}
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <button onClick={onCancel} className="btn-secondary">
            Annuler
          </button>
          <button onClick={onConfirm} className="btn-danger">
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}
