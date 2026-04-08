/**
 * Barre de filtres : tri, recherche, filtres owned/level/prestige.
 */
export default function FilterBar({
  search,
  onSearchChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  filterOwned,
  onFilterOwnedChange,
}) {
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "20px 24px 0",
        display: "flex",
        gap: 12,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Rechercher un héros..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="input"
        style={{ maxWidth: 220, fontSize: 14 }}
      />

      {/* Sort by */}
      <select
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value)}
        className="input"
        style={{ width: "auto", padding: "8px 12px", cursor: "pointer" }}
      >
        <option value="name">Tri : Nom</option>
        <option value="rating">Tri : Note</option>
        <option value="level">Tri : Niveau</option>
        <option value="prestige">Tri : Prestige</option>
        <option value="comments">Tri : Commentaires</option>
      </select>

      {/* Sort order */}
      <button
        onClick={() => onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")}
        className="btn-secondary"
        style={{ padding: "8px 14px", fontSize: 13, minWidth: 40 }}
        title={sortOrder === "asc" ? "Croissant" : "Décroissant"}
      >
        {sortOrder === "asc" ? "↑" : "↓"}
      </button>

      {/* Filter owned */}
      <select
        value={filterOwned}
        onChange={(e) => onFilterOwnedChange(e.target.value)}
        className="input"
        style={{ width: "auto", padding: "8px 12px", cursor: "pointer" }}
      >
        <option value="all">Tous les héros</option>
        <option value="owned">Possédés uniquement</option>
        <option value="notowned">Non possédés</option>
      </select>
    </div>
  );
}
