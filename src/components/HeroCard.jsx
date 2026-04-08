import { useState } from "react";
import { getInitials, getHeroImagePath } from "../data/heroes";
import { getPrestigeById, DEFAULT_PRESTIGE } from "../data/prestige";
import StarRating from "./StarRating";

export default function HeroCard({ hero, rating, commentCount, level, prestige, owned, onClick }) {
  const [imgError, setImgError] = useState(false);
  const prest = prestige || DEFAULT_PRESTIGE;
  const prestigeData = getPrestigeById(prest);
  const isNotOwned = owned === false;

  return (
    <div
      onClick={onClick}
      style={{
        background: "var(--bg-card)", borderRadius: 14, overflow: "hidden",
        cursor: "pointer", border: isNotOwned ? "1px solid #333" : "1px solid var(--border)",
        transition: "all 0.2s", position: "relative", opacity: isNotOwned ? 0.5 : 1,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = hero.color;
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 8px 30px ${hero.color}33`;
        e.currentTarget.style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = isNotOwned ? "#333" : "var(--border)";
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.opacity = isNotOwned ? "0.5" : "1";
      }}
    >
      <div style={{
        height: 150, background: `linear-gradient(135deg, ${hero.color}cc, ${hero.color}44)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
      }}>
        {!imgError ? (
          <img src={getHeroImagePath(hero.slug)} alt={hero.nameFr}
            onError={() => setImgError(true)}
            style={{ height: "100%", width: "100%", objectFit: "cover", objectPosition: "top center" }}
          />
        ) : (
          <span style={{
            fontSize: 48, fontFamily: "var(--font-display)", fontWeight: 700,
            color: "#fff", opacity: 0.9, textShadow: "0 2px 10px rgba(0,0,0,0.5)",
          }}>{getInitials(hero.nameFr)}</span>
        )}
        <div style={{ position: "absolute", top: 6, left: 6, display: "flex", gap: 4 }}>
          <span style={{
            background: owned ? "#27ae6099" : "#e74c3c99",
            borderRadius: 6, padding: "2px 6px", fontSize: 10, fontWeight: 700, color: "#fff",
          }}>{owned ? "✓" : "✗"}</span>
          {prest !== "white" && (
            <span style={{
              background: "rgba(0,0,0,0.6)", borderRadius: 6, padding: "2px 6px",
              fontSize: 10, fontWeight: 700, color: prestigeData.color,
              border: `1px solid ${prestigeData.color}44`,
            }}>P</span>
          )}
        </div>
        {commentCount > 0 && (
          <span style={{
            position: "absolute", top: 6, right: 6, background: "var(--red)",
            borderRadius: 10, padding: "2px 7px", fontSize: 11, fontWeight: 700, color: "#fff",
          }}>💬 {commentCount}</span>
        )}
        {level > 0 && (
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
            padding: "12px 8px 6px", display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          }}>
            <span style={{ fontSize: 11, color: "#ccc", fontWeight: 600 }}>
              Niv. <strong style={{ color: "#fff", fontSize: 13 }}>{level}</strong>
            </span>
            {prest !== "white" && (
              <span style={{ fontSize: 10, color: prestigeData.color, fontWeight: 700 }}>{prestigeData.label}</span>
            )}
          </div>
        )}
      </div>
      <div style={{ padding: "10px 12px" }}>
        <div style={{
          fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13,
          textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>{hero.nameFr}</div>
        <StarRating rating={rating} size={14} />
      </div>
    </div>
  );
}
