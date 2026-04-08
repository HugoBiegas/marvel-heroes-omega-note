/**
 * Stockage persistant sur le disque de l'utilisateur.
 *
 * Utilise navigator.storage.persist() pour demander au navigateur
 * de ne JAMAIS effacer les données, même lors d'un nettoyage automatique.
 * Les données sont stockées dans localStorage et protégées par ce flag.
 *
 * Le navigateur affiche sa propre popup d'autorisation native.
 */

const STORAGE_KEY = "mho_data";

/**
 * Demande au navigateur de rendre le stockage persistant.
 * Affiche la popup native du navigateur si nécessaire.
 * @returns {Promise<boolean>} true si le stockage est persistant
 */
export async function requestPersistentStorage() {
  if (navigator.storage && navigator.storage.persist) {
    const granted = await navigator.storage.persist();
    return granted;
  }
  return false;
}

/**
 * Vérifie si le stockage persistant est déjà accordé.
 * @returns {Promise<boolean>}
 */
export async function isPersisted() {
  if (navigator.storage && navigator.storage.persisted) {
    return await navigator.storage.persisted();
  }
  return false;
}

/**
 * Charge les données depuis localStorage.
 * @returns {{ persons: Record<string, { ratings: object, comments: object }> }}
 */
export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // Données corrompues
  }
  return { persons: {} };
}

/**
 * Sauvegarde les données dans localStorage (protégé par persist).
 */
export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Stockage plein ou indisponible
  }
}

/**
 * Exporte les données d'une personne en fichier JSON téléchargeable.
 */
export function exportPerson(name, personData) {
  const blob = new Blob(
    [JSON.stringify({ name, data: personData }, null, 2)],
    { type: "application/json" }
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `mho_${name}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Lit un fichier d'import (données d'une personne).
 * @returns {Promise<{ name: string, data: object }>}
 */
export function readImportFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (!parsed.name || !parsed.data) {
          reject(new Error("Fichier invalide : champs 'name' et 'data' requis."));
          return;
        }
        resolve(parsed);
      } catch {
        reject(new Error("Erreur de lecture du fichier JSON."));
      }
    };
    reader.onerror = () => reject(new Error("Impossible de lire le fichier."));
    reader.readAsText(file);
  });
}
