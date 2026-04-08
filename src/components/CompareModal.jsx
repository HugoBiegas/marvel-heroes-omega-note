import { useState } from "react";
import { HEROES, getHeroImagePath, getInitials } from "../data/heroes";
import { getPrestigeById, DEFAULT_PRESTIGE } from "../data/prestige";
import StarRating from "./StarRating";

export default function CompareModal({ open, onClose, persons, data }) {
  const [selected, setSelected] = useState([]);
  const [heroFilter, setHeroFilter] = useState("");
  const [expandedComments, setExpandedComments] = useState({});

  if (!open) return null;

  const personNames = Object.keys(data.persons);

  const togglePerson = (name) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const toggleComments = (key) => {
    setExpandedComments((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredHeroes = HEROES.filter((h) =>
    h.name.toLowerCase().includes(heroFilter.toLowerCase())
  );

  const getPersonHero = (personName, heroName) => {
    const p = data.persons[personName] || {};
    return {
      rating: p.ratings?.[heroName] || 0,
      level: p.levels?.[heroName] || 0,
      prestige: p.prestiges?.[heroName] || DEFAULT_PRESTIGE,
      owned: p.owned?.[heroName] ?? false,
      comments: p.comments?.[heroName] || [],
    };
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 1000,
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        padding: "40px 16px", overflowY: "auto",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg-card)", borderRadius: 16, padding: 28,
          maxWidth: 1100, width: "100%", border: "1px solid var(--border-light)",
          boxShadow: "var(--shadow-modal)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{
            margin: 0, fontSize: 20, color: "var(--text)",
            fontFamily: "var(--font-display)", textTransform: "uppercase",
          }}>Comparaison</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: 24, cursor: "pointer" }}>✕</button>
        </div>

        {/* Person selector */}
        <div style={{ marginBottom: 20 }}>
          <label className="label">Personnes à comparer</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {personNames.map((name) => (
              <button
                key={name}
                onClick={() => togglePerson(name)}
                style={{
                  background: selected.includes(name) ? "var(--red)" : "var(--bg-primary)",
                  color: selected.includes(name) ? "#fff" : "var(--text-muted)",
                  border: `1px solid ${selected.includes(name) ? "var(--red)" : "var(--border-light)"}`,
                  borderRadius: 20, padding: "6px 14px", cursor: "pointer", fontSize: 13, fontWeight: 600,
                  transition: "all 0.15s",
                }}
              >{name}</button>
            ))}
          </div>
        </div>

        {selected.length < 2 && (
          <p style={{ color: "var(--text-dim)", fontSize: 13, textAlign: "center", padding: "20px 0" }}>
            Sélectionnez au moins 2 personnes pour comparer.
          </p>
        )}

        {selected.length >= 2 && (
          <>
            <input
              type="text" placeholder="🔍 Filtrer les héros..."
              value={heroFilter} onChange={(e) => setHeroFilter(e.target.value)}
              className="input" style={{ maxWidth: 250, fontSize: 13, marginBottom: 16 }}
            />

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--border-light)" }}>
                    <th style={{ ...thStyle, minWidth: 130, textAlign: "left" }}>Héros</th>
                    {selected.map((name) => (
                      <th key={name} style={{ ...thStyle, minWidth: 160 }}>
                        <span style={{ color: "var(--red-light)", fontFamily: "var(--font-display)", textTransform: "uppercase" }}>
                          {name}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredHeroes.map((hero) => {
                    const anyData = selected.some((name) => {
                      const d = getPersonHero(name, hero.name);
                      return d.rating > 0 || d.level > 0 || d.owned || d.comments.length > 0;
                    });
                    if (!anyData) return null;

                    return (
                      <tr key={hero.slug} style={{ borderBottom: "1px solid var(--border)" }}>
                        {/* Hero name */}
                        <td style={{ padding: "10px 8px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{
                              width: 32, height: 32, borderRadius: 6, overflow: "hidden",
                              background: `linear-gradient(135deg, ${hero.color}cc, ${hero.color}44)`,
                              flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                              <img
                                src={getHeroImagePath(hero.slug)} alt=""
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  e.target.parentElement.innerHTML = `<span style="font-size:12px;font-weight:700;color:#fff">${getInitials(hero.name)}</span>`;
                                }}
                              />
                            </div>
                            <span style={{
                              fontWeight: 700, fontFamily: "var(--font-display)",
                              textTransform: "uppercase", fontSize: 11,
                            }}>{hero.name}</span>
                          </div>
                        </td>

                        {/* Person columns */}
                        {selected.map((name) => {
                          const d = getPersonHero(name, hero.name);
                          const prest = getPrestigeById(d.prestige);
                          const commentKey = `${hero.slug}-${name}`;
                          const isExpanded = expandedComments[commentKey];

                          return (
                            <td key={name} style={{ padding: "10px 8px", verticalAlign: "top" }}>
                              {/* Owned + Stars */}
                              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                <span style={{
                                  fontSize: 10, fontWeight: 700,
                                  color: d.owned ? "#27ae60" : "#555",
                                  background: d.owned ? "#27ae6022" : "#55555522",
                                  padding: "2px 6px", borderRadius: 4,
                                }}>
                                  {d.owned ? "✓" : "✗"}
                                </span>
                                <StarRating rating={d.rating} size={12} />
                              </div>

                              {/* Level + Prestige */}
                              <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>
                                Niv. <strong>{d.level}</strong>
                                {d.prestige !== "white" && (
                                  <span style={{ color: prest.color, marginLeft: 6, fontWeight: 700, fontSize: 10 }}>
                                    {prest.label}
                                  </span>
                                )}
                              </div>

                              {/* Comments: expandable */}
                              {d.comments.length > 0 && (
                                <div>
                                  <button
                                    onClick={() => toggleComments(commentKey)}
                                    style={{
                                      background: "none", border: "none", color: "var(--text-dim)",
                                      cursor: "pointer", fontSize: 11, padding: 0,
                                      display: "flex", alignItems: "center", gap: 4,
                                    }}
                                  >
                                    <span style={{
                                      display: "inline-block", transition: "transform 0.2s",
                                      transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                                    }}>▶</span>
                                    💬 {d.comments.length} commentaire{d.comments.length > 1 ? "s" : ""}
                                  </button>

                                  {isExpanded && (
                                    <div style={{ marginTop: 6 }}>
                                      {d.comments.map((c, i) => (
                                        <div key={i} style={{
                                          background: "var(--bg-primary)", borderRadius: 6,
                                          padding: "6px 8px", marginBottom: 4,
                                          border: "1px solid var(--border)", fontSize: 11,
                                        }}>
                                          <p style={{ margin: 0, color: "#bbb", lineHeight: 1.5 }}>{c.text}</p>
                                          <span style={{ fontSize: 10, color: "var(--text-ghost)" }}>
                                            {new Date(c.date).toLocaleDateString("fr-FR")}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const thStyle = {
  padding: "10px 8px", textAlign: "center",
  fontFamily: "'Oswald', sans-serif", fontSize: 13,
  color: "#aaa", textTransform: "uppercase", letterSpacing: 0.5,
};
