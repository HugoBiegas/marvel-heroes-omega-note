import { useRef } from "react";

const LOGO_URL = "https://itembase.mhbugle.com/skins/marvelheroes/logo.png";

export default function Header({
  persons, activePerson, onSelectPerson, onAddPerson, onDeletePerson,
  onImport, onExport, onCompare, isPersisted,
}) {
  const fileRef = useRef(null);

  return (
    <header style={{
      background: "linear-gradient(180deg, var(--bg-card) 0%, var(--bg-primary) 100%)",
      borderBottom: "2px solid var(--red)", padding: "12px 24px",
      position: "sticky", top: 0, zIndex: 100,
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
      }}>
        {/* Logo */}
        <img
          src={LOGO_URL} alt="Marvel Heroes Omega"
          style={{ height: 36, marginRight: "auto" }}
          onError={(e) => {
            e.target.style.display = "none";
            if (e.target.nextSibling) e.target.nextSibling.style.display = "flex";
          }}
        />
        <div style={{ display: "none", alignItems: "center", gap: 8, marginRight: "auto" }}>
          <div style={{
            background: "linear-gradient(135deg, var(--red), var(--red-light))",
            borderRadius: 6, padding: "4px 10px",
            fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16,
            letterSpacing: 2, textTransform: "uppercase",
          }}>MARVEL</div>
          <span style={{
            fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14,
            color: "var(--text-muted)", textTransform: "uppercase",
          }}>Heroes Omega</span>
        </div>

        {/* Persist indicator */}
        <span title={isPersisted ? "Stockage persistant actif" : "Stockage non persistant"}
          style={{ fontSize: 13, cursor: "default" }}>
          {isPersisted ? "🟢" : "🟡"}
        </span>

        {/* Person selector + add + delete */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <select
            value={activePerson || ""}
            onChange={(e) => onSelectPerson(e.target.value || null)}
            className="input"
            style={{ width: "auto", minWidth: 140, padding: "7px 10px", cursor: "pointer", fontSize: 13 }}
          >
            <option value="">-- Personne --</option>
            {persons.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <button
            onClick={onAddPerson}
            className="btn-primary"
            style={{ padding: "7px 12px", fontSize: 16, lineHeight: 1, borderRadius: 8 }}
            title="Ajouter une personne"
          >+</button>
          {activePerson && (
            <button
              onClick={onDeletePerson}
              className="btn-secondary"
              style={{ padding: "7px 10px", fontSize: 14, lineHeight: 1, borderRadius: 8, color: "var(--red)" }}
              title="Supprimer cette personne"
            >🗑</button>
          )}
        </div>

        {/* Compare */}
        {persons.length >= 2 && (
          <button onClick={onCompare} className="btn-secondary" style={{ padding: "7px 12px", fontSize: 11 }}>
            ⚔️ Comparer
          </button>
        )}

        {/* Import / Export */}
        <input type="file" ref={fileRef} accept=".json"
          onChange={(e) => { if (e.target.files[0]) onImport(e.target.files[0]); e.target.value = ""; }}
          style={{ display: "none" }}
        />
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={() => fileRef.current?.click()}
            className="btn-secondary" style={{ padding: "7px 10px", fontSize: 11 }}>
            📥 Import
          </button>
          <button onClick={onExport} disabled={!activePerson}
            className="btn-secondary" style={{ padding: "7px 10px", fontSize: 11, opacity: activePerson ? 1 : 0.4 }}>
            📤 Export
          </button>
        </div>
      </div>
    </header>
  );
}
