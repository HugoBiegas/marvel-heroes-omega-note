import { useState } from "react";

/**
 * Écran initial qui demande l'autorisation de stockage persistant
 * via navigator.storage.persist().
 * Le navigateur affiche sa propre popup native d'autorisation.
 */
export default function ConsentScreen({ onComplete }) {
  const [requesting, setRequesting] = useState(false);
  const [denied, setDenied] = useState(false);

  const handleRequest = async () => {
    setRequesting(true);
    try {
      if (navigator.storage && navigator.storage.persist) {
        const granted = await navigator.storage.persist();
        if (granted) {
          onComplete(true);
        } else {
          setDenied(true);
          // On laisse quand même continuer, juste avec un warning
        }
      } else {
        // API non supportée, on continue sans
        onComplete(false);
      }
    } catch {
      onComplete(false);
    }
    setRequesting(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        style={{
          background: "var(--bg-card)",
          borderRadius: 20,
          padding: 40,
          maxWidth: 520,
          textAlign: "center",
          border: "1px solid var(--border-light)",
        }}
      >
        <img
          src="https://itembase.mhbugle.com/skins/marvelheroes/logo.png"
          alt="Marvel Heroes Omega"
          style={{ height: 60, marginBottom: 20 }}
          onError={(e) => (e.target.style.display = "none")}
        />

        {!denied ? (
          <>
            <h1
              style={{
                color: "var(--text)",
                fontFamily: "var(--font-display)",
                margin: "0 0 12px",
                textTransform: "uppercase",
                fontSize: 22,
              }}
            >
              Stockage Persistant
            </h1>
            <p
              style={{
                color: "var(--text-muted)",
                lineHeight: 1.7,
                fontSize: 14,
                margin: "0 0 8px",
              }}
            >
              Ce site va demander à votre navigateur l'autorisation de{" "}
              <strong style={{ color: "var(--text)" }}>
                conserver des données dans le stockage persistant
              </strong>{" "}
              de votre appareil.
            </p>
            <p
              style={{
                color: "var(--text-dim)",
                lineHeight: 1.7,
                fontSize: 13,
                margin: "0 0 8px",
              }}
            >
              Vos notes et commentaires seront sauvegardés directement sur votre
              disque dur. Aucune donnée n'est envoyée sur internet.
            </p>
            <p
              style={{
                color: "var(--text-dim)",
                lineHeight: 1.7,
                fontSize: 13,
                margin: "0 0 28px",
              }}
            >
              En autorisant, même si vous effacez les cookies ou l'historique,
              vos données Marvel Heroes resteront intactes.
            </p>
            <button
              onClick={handleRequest}
              className="btn-primary"
              disabled={requesting}
              style={{ fontSize: 15, padding: "12px 28px" }}
            >
              {requesting ? "⏳ En attente..." : "🛡️ Autoriser le stockage persistant"}
            </button>
          </>
        ) : (
          <>
            <h1
              style={{
                color: "#e67e22",
                fontFamily: "var(--font-display)",
                margin: "0 0 12px",
                textTransform: "uppercase",
                fontSize: 20,
              }}
            >
              Stockage non persistant
            </h1>
            <p
              style={{
                color: "var(--text-muted)",
                lineHeight: 1.7,
                fontSize: 14,
                margin: "0 0 8px",
              }}
            >
              Le navigateur n'a pas accordé le stockage persistant. Vos données
              seront quand même sauvegardées, mais elles pourraient être effacées
              si vous nettoyez les données du navigateur.
            </p>
            <p
              style={{
                color: "var(--text-dim)",
                lineHeight: 1.7,
                fontSize: 13,
                margin: "0 0 28px",
              }}
            >
              Vous pouvez utiliser l'export/import pour sauvegarder manuellement.
            </p>
            <button
              onClick={() => onComplete(false)}
              className="btn-primary"
              style={{ fontSize: 15, padding: "12px 28px" }}
            >
              Continuer quand même
            </button>
          </>
        )}
      </div>
    </div>
  );
}
