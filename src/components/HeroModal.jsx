import { useState } from "react";
import { getInitials, getHeroImagePath, getBuildUrl } from "../data/heroes";
import { PRESTIGE_LEVELS, getPrestigeById } from "../data/prestige";
import StarRating from "./StarRating";

export default function HeroModal({
  hero, rating, comments, level, prestige, owned,
  onRate, onAddComment, onDeleteComment, onLevelChange, onPrestigeChange, onOwnedChange,
}) {
  const [text, setText] = useState("");
  const [imgError, setImgError] = useState(false);
  const prestigeData = getPrestigeById(prestige);

  const handleSubmit = () => {
    if (!text.trim()) return;
    onAddComment(text.trim());
    setText("");
  };

  return (
    <div>
      <div style={{
        height: 180, borderRadius: 12, marginBottom: 16,
        background: `linear-gradient(135deg, ${hero.color}55, ${hero.color}22)`,
        display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
      }}>
        {!imgError ? (
          <img src={getHeroImagePath(hero.slug)} alt={hero.nameFr}
            onError={() => setImgError(true)}
            style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
          />
        ) : (
          <span style={{
            fontSize: 56, fontFamily: "var(--font-display)", fontWeight: 700, color: "#fff", opacity: 0.9,
          }}>{getInitials(hero.nameFr)}</span>
        )}
      </div>

      {/* Owned + Build */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center", flexWrap: "wrap" }}>
        <button onClick={() => onOwnedChange(!owned)} style={{
          background: owned ? "#27ae60" : "#555", color: "#fff", border: "none", borderRadius: 8,
          padding: "8px 16px", cursor: "pointer", fontWeight: 700, fontSize: 13, transition: "background 0.15s",
        }}>{owned ? "✓ Possédé" : "✗ Non possédé"}</button>
        <a href={getBuildUrl(hero)} target="_blank" rel="noopener noreferrer" style={{
          background: "linear-gradient(135deg, #2471a3, #1a5276)", color: "#fff", borderRadius: 8,
          padding: "8px 16px", fontWeight: 700, fontSize: 13, textDecoration: "none",
          display: "inline-flex", alignItems: "center", gap: 6, transition: "filter 0.15s",
        }}
          onMouseEnter={(e) => e.currentTarget.style.filter = "brightness(1.2)"}
          onMouseLeave={(e) => e.currentTarget.style.filter = "none"}
        >🔧 Build</a>
      </div>

      {/* Level + Prestige */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
        <div>
          <label className="label">Niveau (0-60)</label>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input type="range" min={0} max={60} value={level}
              onChange={(e) => onLevelChange(Number(e.target.value))}
              style={{ flex: 1, accentColor: hero.color }} />
            <span style={{
              fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18,
              color: "var(--text)", minWidth: 30, textAlign: "right",
            }}>{level}</span>
          </div>
        </div>
        <div>
          <label className="label">Prestige</label>
          <select value={prestige} onChange={(e) => onPrestigeChange(e.target.value)}
            className="input" style={{
              padding: "8px 12px", cursor: "pointer",
              borderColor: prestigeData.color !== "#ffffff" ? prestigeData.color + "88" : undefined,
            }}>
            {PRESTIGE_LEVELS.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
          </select>
        </div>
      </div>

      {/* Rating */}
      <div style={{ marginBottom: 20 }}>
        <label className="label">Note (plaisir de jeu)</label>
        <StarRating rating={rating} onRate={onRate} size={28} />
      </div>

      {/* Comments */}
      <div>
        <label className="label">Commentaires</label>
        {comments.length === 0 && <p style={{ color: "var(--text-ghost)", fontSize: 13 }}>Aucun commentaire.</p>}
        <div style={{ maxHeight: 200, overflowY: "auto", marginBottom: 12 }}>
          {comments.map((c, i) => (
            <div key={i} style={{
              background: "var(--bg-primary)", borderRadius: 8,
              padding: "10px 12px", marginBottom: 8, border: "1px solid var(--border)",
            }}>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "#ccc" }}>{c.text}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                <span style={{ fontSize: 11, color: "var(--text-ghost)" }}>
                  {new Date(c.date).toLocaleDateString("fr-FR")}
                </span>
                <button onClick={() => onDeleteComment(i)}
                  style={{ background: "none", border: "none", color: "var(--red-dark)", cursor: "pointer", fontSize: 12 }}>
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <textarea value={text} onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }}
            placeholder="Votre commentaire..." rows={2}
            className="input" style={{ resize: "vertical", flex: 1 }} />
          <button onClick={handleSubmit} className="btn-primary" style={{ alignSelf: "flex-end" }}>OK</button>
        </div>
      </div>
    </div>
  );
}
