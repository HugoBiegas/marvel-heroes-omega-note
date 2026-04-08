import { useState } from "react";
import { getInitials, getHeroImagePath } from "../data/heroes";
import StarRating from "./StarRating";

export default function HeroCard({ hero, rating, commentCount, onClick }) {
  const [imgError, setImgError] = useState(false);
  const imgSrc = getHeroImagePath(hero.slug);

  return (
    <div
      onClick={onClick}
      style={{
        background: "var(--bg-card)",
        borderRadius: 14,
        overflow: "hidden",
        cursor: "pointer",
        border: "1px solid var(--border)",
        transition: "all 0.2s",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = hero.color;
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 8px 30px ${hero.color}33`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        style={{
          height: 160,
          background: `linear-gradient(135deg, ${hero.color}cc, ${hero.color}44)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {!imgError ? (
          <img
            src={imgSrc}
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
              fontSize: 48,
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              color: "#fff",
              opacity: 0.9,
              textShadow: "0 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            {getInitials(hero.name)}
          </span>
        )}
        {commentCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              background: "var(--red)",
              borderRadius: 10,
              padding: "2px 7px",
              fontSize: 11,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            💬 {commentCount}
          </span>
        )}
      </div>
      <div style={{ padding: "12px 14px" }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 14,
            textTransform: "uppercase",
            letterSpacing: 0.5,
            marginBottom: 6,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {hero.name}
        </div>
        <StarRating rating={rating} size={16} />
      </div>
    </div>
  );
}
