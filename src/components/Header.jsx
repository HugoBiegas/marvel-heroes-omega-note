import { useRef } from "react";

const LOGO_URL = "https://itembase.mhbugle.com/skins/marvelheroes/logo.png";

export default function Header({
  persons,
  activePerson,
  onSelectPerson,
  onAddPerson,
  onImport,
  onExport,
  isPersisted,
}) {
  const fileRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) onImport(file);
    e.target.value = "";
  };

  return (
    <header
      style={{
        background: "linear-gradient(180deg, var(--bg-card) 0%, var(--bg-primary) 100%)",
        borderBottom: "2px solid var(--red)",
        padding: "12px 24px",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: 14,
          flexWrap: "wrap",
        }}
      >
        {/* Logo */}
        <img
          src={LOGO_URL}
          alt="Marvel Heroes Omega"
          style={{ height: 40, marginRight: "auto" }}
          onError={(e) => {
            e.target.style.display = "none";
            if (e.target.nextSibling) e.target.nextSibling.style.display = "flex";
          }}
        />
        <div style={{ display: "none", alignItems: "center", gap: 8, marginRight: "auto" }}>
          <div
            style={{
              background: "linear-gradient(135deg, var(--red), var(--red-light))",
              borderRadius: 6, padding: "4px 10px",
              fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16,
              letterSpacing: 2, textTransform: "uppercase",
            }}
          >
            MARVEL
          </div>
          <span style={{
            fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14,
            color: "var(--text-muted)", textTransform: "uppercase",
          }}>
            Heroes Omega
          </span>
        </div>

        {/* Persist indicator */}
        <span
          title={isPersisted ? "Stockage persistant actif" : "Stockage non persistant"}
          style={{ fontSize: 14, cursor: "default" }}
        >
          {isPersisted ? "🟢" : "🟡"}
        </span>

        {/* Person selector */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <select
            value={activePerson || ""}
            onChange={(e) => onSelectPerson(e.target.value || null)}
            className="input"
            style={{ width: "auto", minWidth: 150, padding: "8px 12px", cursor: "pointer" }}
          >
            <option value="">-- Personne --</option>
            {persons.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <button
            onClick={onAddPerson}
            className="btn-primary"
            style={{ padding: "8px 14px", fontSize: 18, lineHeight: 1, borderRadius: 8 }}
            title="Ajouter une personne"
          >
            +
          </button>
        </div>

        {/* Import / Export */}
        <input
          type="file" ref={fileRef} accept=".json"
          onChange={handleFileChange} style={{ display: "none" }}
        />
        <div style={{ display: "flex", gap: 6 }}>
          <button
            onClick={() => fileRef.current?.click()}
            className="btn-secondary"
            style={{ padding: "8px 12px", fontSize: 11 }}
          >
            📥 Import
          </button>
          <button
            onClick={onExport}
            disabled={!activePerson}
            className="btn-secondary"
            style={{ padding: "8px 12px", fontSize: 11, opacity: activePerson ? 1 : 0.4 }}
          >
            📤 Export
          </button>
        </div>
      </div>
    </header>
  );
}
