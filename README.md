# Marvel Heroes Omega — Notes & Avis

Fan site dédié aux 63 héros jouables de **Marvel Heroes Omega** (jeu fermé le 27 novembre 2017).

## Fonctionnalités

- **63 héros** avec portraits, grille responsive et recherche instantanée
- **Système de profils** : créez des personnes (Hugo, Marie…) pour séparer les avis
- **Notes ★** de 1 à 5 par héros et par personne
- **Commentaires** liés à la personne active
- **Stockage persistant** via `navigator.storage.persist()` :
  - Le navigateur affiche sa popup native d'autorisation
  - Les données survivent au nettoyage automatique du navigateur
  - Aucune donnée n'est envoyée sur internet
- **Export / Import JSON** par personne avec détection de doublon
- Logo officiel Marvel Heroes Omega

## Images des héros

Récupérer les portraits depuis https://itembase.mhbugle.com/heroes/ et les placer dans :

```
public/heroes/{slug}.png
```

Exemple : `iron-man.png`, `spider-man.png`, `wolverine.png`

Liste complète des slugs dans `src/data/heroes.js`.

## Installation

```bash
npm install
npm run dev
```

## Déploiement GitHub Pages

```bash
# Adapter base dans vite.config.js au nom du repo
npm run build
# Publier dist/ via GitHub Pages
```

## Architecture

```
src/
├── main.jsx
├── App.jsx                  # État global + navigator.storage.persist()
├── styles.css
├── components/
│   ├── ConsentScreen.jsx    # Écran initial (demande stockage persistant)
│   ├── ConfirmModal.jsx
│   ├── Header.jsx           # Logo, profil, import/export
│   ├── HeroCard.jsx         # Carte héros (image + fallback initiales)
│   ├── HeroModal.jsx        # Note + commentaires
│   ├── Modal.jsx
│   └── StarRating.jsx
├── data/
│   └── heroes.js            # 63 héros (nom, slug, couleur)
└── utils/
    └── storage.js           # persist() + localStorage + export/import
public/
└── heroes/                  # Portraits à ajouter manuellement
```
