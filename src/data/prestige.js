/**
 * Niveaux de prestige dans Marvel Heroes Omega.
 * Le prestige de base de tout héros est White.
 */
export const PRESTIGE_LEVELS = [
  { id: "white",  label: "White",           color: "#ffffff" },
  { id: "green",  label: "Green",           color: "#27ae60" },
  { id: "blue",   label: "Blue",            color: "#2980b9" },
  { id: "purple", label: "Purple",          color: "#8e44ad" },
  { id: "orange", label: "Orange",          color: "#e67e22" },
  { id: "red",    label: "Red",             color: "#e74c3c" },
  { id: "cosmic", label: "Cosmic (Yellow)", color: "#f1c40f" },
];

export const DEFAULT_PRESTIGE = "white";

export function getPrestigeById(id) {
  return PRESTIGE_LEVELS.find((p) => p.id === id) || PRESTIGE_LEVELS[0];
}
