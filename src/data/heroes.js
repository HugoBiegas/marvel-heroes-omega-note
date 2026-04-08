/**
 * Liste des 63 héros jouables de Marvel Heroes Omega.
 *
 * - name    : clé anglaise (utilisée pour le stockage des données)
 * - nameFr  : nom affiché en français sur le site
 * - slug    : pour les images locales (public/heroes/{slug}.png)
 * - buildSlug : pour itembase (si différent du slug)
 */

export const HEROES = [
  { name: "Angela", nameFr: "Angela", slug: "angela", color: "#c0392b" },
  { name: "Ant-Man", nameFr: "Ant-Man", slug: "ant-man", color: "#e74c3c" },
  { name: "Beast", nameFr: "Le Fauve", slug: "beast", color: "#2980b9" },
  { name: "Black Bolt", nameFr: "Flèche Noire", slug: "black-bolt", color: "#2c3e50" },
  { name: "Black Cat", nameFr: "La Chatte Noire", slug: "black-cat", color: "#7f8c8d" },
  { name: "Black Panther", nameFr: "La Panthère Noire", slug: "black-panther", color: "#1a1a2e" },
  { name: "Black Widow", nameFr: "La Veuve Noire", slug: "black-widow", color: "#c0392b" },
  { name: "Blade", nameFr: "Blade", slug: "blade", color: "#2d2d2d" },
  { name: "Cable", nameFr: "Cable", slug: "cable", color: "#7f8c8d" },
  { name: "Captain America", nameFr: "Captain America", slug: "captain-america", color: "#2471a3" },
  { name: "Captain Marvel", nameFr: "Captain Marvel", slug: "captain-marvel", color: "#c0392b" },
  { name: "Carnage", nameFr: "Carnage", slug: "carnage", color: "#922b21" },
  { name: "Colossus", nameFr: "Colosse", slug: "colossus", color: "#566573" },
  { name: "Cyclops", nameFr: "Cyclope", slug: "cyclops", color: "#d4ac0d" },
  { name: "Daredevil", nameFr: "Daredevil", slug: "daredevil", color: "#922b21" },
  { name: "Deadpool", nameFr: "Deadpool", slug: "deadpool", color: "#c0392b" },
  { name: "Doctor Doom", nameFr: "Docteur Fatalis", slug: "doctor-doom", buildSlug: "dr-doom", color: "#1e8449" },
  { name: "Doctor Strange", nameFr: "Docteur Strange", slug: "doctor-strange", buildSlug: "dr-strange", color: "#6c3483" },
  { name: "Elektra", nameFr: "Elektra", slug: "elektra", color: "#c0392b" },
  { name: "Emma Frost", nameFr: "Emma Frost", slug: "emma-frost", color: "#d5d8dc" },
  { name: "Gambit", nameFr: "Gambit", slug: "gambit", color: "#6c3483" },
  { name: "Ghost Rider", nameFr: "Ghost Rider", slug: "ghost-rider", color: "#d35400" },
  { name: "Green Goblin", nameFr: "Le Bouffon Vert", slug: "green-goblin", color: "#1e8449" },
  { name: "Hawkeye", nameFr: "Œil-de-Faucon", slug: "hawkeye", color: "#6c3483" },
  { name: "Hulk", nameFr: "Hulk", slug: "hulk", color: "#1e8449" },
  { name: "Human Torch", nameFr: "La Torche Humaine", slug: "human-torch", color: "#d35400" },
  { name: "Iceman", nameFr: "Iceberg", slug: "iceman", color: "#5dade2" },
  { name: "Invisible Woman", nameFr: "La Femme Invisible", slug: "invisible-woman", color: "#5dade2" },
  { name: "Iron Fist", nameFr: "Iron Fist", slug: "iron-fist", color: "#27ae60" },
  { name: "Iron Man", nameFr: "Iron Man", slug: "iron-man", color: "#c0392b" },
  { name: "Jean Grey", nameFr: "Jean Grey", slug: "jean-grey", color: "#c0392b" },
  { name: "Juggernaut", nameFr: "Le Fléau", slug: "juggernaut", color: "#922b21" },
  { name: "Kitty Pryde", nameFr: "Kitty Pryde", slug: "kitty-pryde", color: "#8e44ad" },
  { name: "Loki", nameFr: "Loki", slug: "loki", color: "#1e8449" },
  { name: "Luke Cage", nameFr: "Luke Cage", slug: "luke-cage", color: "#d4ac0d" },
  { name: "Magik", nameFr: "Magik", slug: "magik", color: "#8e44ad" },
  { name: "Magneto", nameFr: "Magnéto", slug: "magneto", color: "#922b21" },
  { name: "Moon Knight", nameFr: "Moon Knight", slug: "moon-knight", color: "#bdc3c7" },
  { name: "Mr. Fantastic", nameFr: "M. Fantastique", slug: "mr-fantastic", color: "#2471a3" },
  { name: "Nick Fury", nameFr: "Nick Fury", slug: "nick-fury", color: "#2c3e50" },
  { name: "Nightcrawler", nameFr: "Diablo", slug: "nightcrawler", color: "#1a1a6e" },
  { name: "Nova", nameFr: "Nova", slug: "nova", color: "#d4ac0d" },
  { name: "Psylocke", nameFr: "Psylocke", slug: "psylocke", color: "#8e44ad" },
  { name: "Punisher", nameFr: "Le Punisher", slug: "punisher", color: "#2c3e50" },
  { name: "Rocket Raccoon", nameFr: "Rocket", slug: "rocket-raccoon", color: "#d35400" },
  { name: "Rogue", nameFr: "Malicia", slug: "rogue", color: "#27ae60" },
  { name: "Scarlet Witch", nameFr: "La Sorcière Rouge", slug: "scarlet-witch", color: "#c0392b" },
  { name: "She-Hulk", nameFr: "Miss Hulk", slug: "she-hulk", color: "#27ae60" },
  { name: "Silver Surfer", nameFr: "Le Surfer d'Argent", slug: "silver-surfer", color: "#bdc3c7" },
  { name: "Spider-Man", nameFr: "Spider-Man", slug: "spider-man", color: "#c0392b" },
  { name: "Squirrel Girl", nameFr: "Squirrel Girl", slug: "squirrel-girl", color: "#a0522d" },
  { name: "Star-Lord", nameFr: "Star-Lord", slug: "star-lord", color: "#c0392b" },
  { name: "Storm", nameFr: "Tornade", slug: "storm", color: "#5dade2" },
  { name: "Taskmaster", nameFr: "Taskmaster", slug: "taskmaster", color: "#d4ac0d" },
  { name: "Thing", nameFr: "La Chose", slug: "thing", color: "#d35400" },
  { name: "Thor", nameFr: "Thor", slug: "thor", color: "#2471a3" },
  { name: "Ultron", nameFr: "Ultron", slug: "ultron", color: "#566573" },
  { name: "Venom", nameFr: "Venom", slug: "venom", color: "#1a1a2e" },
  { name: "Vision", nameFr: "La Vision", slug: "vision", color: "#27ae60" },
  { name: "War Machine", nameFr: "Machine de Guerre", slug: "war-machine", color: "#566573" },
  { name: "Winter Soldier", nameFr: "Le Soldat de l'Hiver", slug: "winter-soldier", buildSlug: "winter_soldier", color: "#566573" },
  { name: "Wolverine", nameFr: "Wolverine", slug: "wolverine", color: "#d4ac0d" },
  { name: "X-23", nameFr: "X-23", slug: "x-23", color: "#2c3e50" },
];

export function getInitials(name) {
  return name.split(/[\s.-]+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

export function getHeroImagePath(slug) {
  return `${import.meta.env.BASE_URL}heroes/${slug}.png`;
}

export function getBuildUrl(hero) {
  const s = hero.buildSlug || hero.slug;
  return `https://itembase.mhbugle.com/builds/${s}/`;
}
