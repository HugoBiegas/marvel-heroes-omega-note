/**
 * Liste complète des 63 héros jouables de Marvel Heroes Omega.
 *
 * - slug : utilisé pour les images locales (public/heroes/{slug}.png)
 * - buildSlug : utilisé pour le lien vers itembase.mhbugle.com/builds/{buildSlug}/
 *   (uniquement renseigné si différent du slug)
 */

export const HEROES = [
  { name: "Angela", slug: "angela", color: "#c0392b" },
  { name: "Ant-Man", slug: "ant-man", color: "#e74c3c" },
  { name: "Beast", slug: "beast", color: "#2980b9" },
  { name: "Black Bolt", slug: "black-bolt", color: "#2c3e50" },
  { name: "Black Cat", slug: "black-cat", color: "#7f8c8d" },
  { name: "Black Panther", slug: "black-panther", color: "#1a1a2e" },
  { name: "Black Widow", slug: "black-widow", color: "#c0392b" },
  { name: "Blade", slug: "blade", color: "#2d2d2d" },
  { name: "Cable", slug: "cable", color: "#7f8c8d" },
  { name: "Captain America", slug: "captain-america", color: "#2471a3" },
  { name: "Captain Marvel", slug: "captain-marvel", color: "#c0392b" },
  { name: "Carnage", slug: "carnage", color: "#922b21" },
  { name: "Colossus", slug: "colossus", color: "#566573" },
  { name: "Cyclops", slug: "cyclops", color: "#d4ac0d" },
  { name: "Daredevil", slug: "daredevil", color: "#922b21" },
  { name: "Deadpool", slug: "deadpool", color: "#c0392b" },
  { name: "Doctor Doom", slug: "doctor-doom", buildSlug: "dr-doom", color: "#1e8449" },
  { name: "Doctor Strange", slug: "doctor-strange", buildSlug: "dr-strange", color: "#6c3483" },
  { name: "Elektra", slug: "elektra", color: "#c0392b" },
  { name: "Emma Frost", slug: "emma-frost", color: "#d5d8dc" },
  { name: "Gambit", slug: "gambit", color: "#6c3483" },
  { name: "Ghost Rider", slug: "ghost-rider", color: "#d35400" },
  { name: "Green Goblin", slug: "green-goblin", color: "#1e8449" },
  { name: "Hawkeye", slug: "hawkeye", color: "#6c3483" },
  { name: "Hulk", slug: "hulk", color: "#1e8449" },
  { name: "Human Torch", slug: "human-torch", color: "#d35400" },
  { name: "Iceman", slug: "iceman", color: "#5dade2" },
  { name: "Invisible Woman", slug: "invisible-woman", color: "#5dade2" },
  { name: "Iron Fist", slug: "iron-fist", color: "#27ae60" },
  { name: "Iron Man", slug: "iron-man", color: "#c0392b" },
  { name: "Jean Grey", slug: "jean-grey", color: "#c0392b" },
  { name: "Juggernaut", slug: "juggernaut", color: "#922b21" },
  { name: "Kitty Pryde", slug: "kitty-pryde", color: "#8e44ad" },
  { name: "Loki", slug: "loki", color: "#1e8449" },
  { name: "Luke Cage", slug: "luke-cage", color: "#d4ac0d" },
  { name: "Magik", slug: "magik", color: "#8e44ad" },
  { name: "Magneto", slug: "magneto", color: "#922b21" },
  { name: "Moon Knight", slug: "moon-knight", color: "#bdc3c7" },
  { name: "Mr. Fantastic", slug: "mr-fantastic", color: "#2471a3" },
  { name: "Nick Fury", slug: "nick-fury", color: "#2c3e50" },
  { name: "Nightcrawler", slug: "nightcrawler", color: "#1a1a6e" },
  { name: "Nova", slug: "nova", color: "#d4ac0d" },
  { name: "Psylocke", slug: "psylocke", color: "#8e44ad" },
  { name: "Punisher", slug: "punisher", color: "#2c3e50" },
  { name: "Rocket Raccoon", slug: "rocket-raccoon", color: "#d35400" },
  { name: "Rogue", slug: "rogue", color: "#27ae60" },
  { name: "Scarlet Witch", slug: "scarlet-witch", color: "#c0392b" },
  { name: "She-Hulk", slug: "she-hulk", color: "#27ae60" },
  { name: "Silver Surfer", slug: "silver-surfer", color: "#bdc3c7" },
  { name: "Spider-Man", slug: "spider-man", color: "#c0392b" },
  { name: "Squirrel Girl", slug: "squirrel-girl", color: "#a0522d" },
  { name: "Star-Lord", slug: "star-lord", color: "#c0392b" },
  { name: "Storm", slug: "storm", color: "#5dade2" },
  { name: "Taskmaster", slug: "taskmaster", color: "#d4ac0d" },
  { name: "Thing", slug: "thing", color: "#d35400" },
  { name: "Thor", slug: "thor", color: "#2471a3" },
  { name: "Ultron", slug: "ultron", color: "#566573" },
  { name: "Venom", slug: "venom", color: "#1a1a2e" },
  { name: "Vision", slug: "vision", color: "#27ae60" },
  { name: "War Machine", slug: "war-machine", color: "#566573" },
  { name: "Winter Soldier", slug: "winter-soldier", buildSlug: "winter_soldier", color: "#566573" },
  { name: "Wolverine", slug: "wolverine", color: "#d4ac0d" },
  { name: "X-23", slug: "x-23", color: "#2c3e50" },
];

export function getInitials(name) {
  return name.split(/[\s.-]+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

export function getHeroImagePath(slug) {
  return `${import.meta.env.BASE_URL}heroes/${slug}.png`;
}

/**
 * Retourne l'URL du build sur itembase.mhbugle.com
 */
export function getBuildUrl(hero) {
  const s = hero.buildSlug || hero.slug;
  return `https://itembase.mhbugle.com/builds/${s}/`;
}
