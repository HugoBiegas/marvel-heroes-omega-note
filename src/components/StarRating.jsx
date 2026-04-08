/**
 * Composant d'étoiles cliquables pour noter un héros de 1 à 5.
 */
export default function StarRating({ rating = 0, onRate, size = 20 }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          onClick={onRate ? () => onRate(i) : undefined}
          style={{
            cursor: onRate ? "pointer" : "default",
            fontSize: size,
            color: i <= rating ? "var(--gold)" : "var(--text-ghost)",
            transition: "color 0.15s",
            userSelect: "none",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
