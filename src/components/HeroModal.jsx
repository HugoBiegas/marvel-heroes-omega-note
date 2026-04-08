import { useState } from "react";
import { getInitials, getHeroImagePath } from "../data/heroes";
import StarRating from "./StarRating";

export default function HeroModal({
  hero,
  rating,
  comments,
  activePerson,
  onRate,
  onAddComment,
  onDeleteComment,
}) {
  const [text, setText] = useState("");
  const [imgError, setImgError] = useState(false);

  const handleSubmit = () => {
    if (!text.trim()) return;
    onAddComment(text.trim());
    setText("");
  };

  return (
    <div>
      {/* Banner with image */}
      <div
        style={{
          height: 120,
          borderRadius: 12,
          marginBottom: 20,
          background: `linear-gradient(135deg, ${hero.color}cc, ${hero.color}33)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {!imgError ? (
          <img
            src={getHeroImagePath(hero.slug)}
            alt={hero.name}
            onError={() => setImgError(true)}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              objectPosition: "top center",
            }}
          />
        ) : (
          <span
            style={{
              fontSize: 56,
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              color: "#fff",
              opacity: 0.9,
            }}
          >
            {getInitials(hero.name)}
          </span>
        )}
      </div>

      {/* Rating */}
      <div style={{ marginBottom: 20 }}>
        <label className="label">Note (plaisir de jeu)</label>
        {activePerson ? (
          <StarRating rating={rating} onRate={onRate} size={28} />
        ) : (
          <p style={{ color: "var(--text-dim)", fontSize: 13, margin: 0 }}>
            Sélectionnez une personne pour noter.
          </p>
        )}
      </div>

      {/* Comments */}
      <div>
        <label className="label">Commentaires</label>

        {comments.length === 0 && (
          <p style={{ color: "var(--text-ghost)", fontSize: 13 }}>Aucun commentaire.</p>
        )}

        <div style={{ maxHeight: 200, overflowY: "auto", marginBottom: 12 }}>
          {comments.map((c, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg-primary)",
                borderRadius: 8,
                padding: "10px 12px",
                marginBottom: 8,
                border: "1px solid var(--border)",
              }}
            >
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "#ccc" }}>
                {c.text}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 6,
                }}
              >
                <span style={{ fontSize: 11, color: "var(--text-ghost)" }}>
                  {new Date(c.date).toLocaleDateString("fr-FR")}
                </span>
                <button
                  onClick={() => onDeleteComment(i)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--red-dark)",
                    cursor: "pointer",
                    fontSize: 12,
                  }}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>

        {activePerson ? (
          <div style={{ display: "flex", gap: 8 }}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder="Votre commentaire..."
              rows={2}
              className="input"
              style={{ resize: "vertical", flex: 1 }}
            />
            <button onClick={handleSubmit} className="btn-primary" style={{ alignSelf: "flex-end" }}>
              OK
            </button>
          </div>
        ) : (
          <p style={{ color: "var(--text-dim)", fontSize: 13 }}>
            Sélectionnez une personne pour commenter.
          </p>
        )}
      </div>
    </div>
  );
}
