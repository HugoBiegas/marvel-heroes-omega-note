import { useState, useEffect, useCallback } from "react";
import { HEROES } from "./data/heroes";
import {
  isPersisted,
  loadData,
  saveData,
  exportPerson,
  readImportFile,
} from "./utils/storage";
import ConsentScreen from "./components/ConsentScreen";
import Header from "./components/Header";
import HeroCard from "./components/HeroCard";
import Modal from "./components/Modal";
import HeroModal from "./components/HeroModal";
import ConfirmModal from "./components/ConfirmModal";

export default function App() {
  const [started, setStarted] = useState(false);
  const [persisted, setPersisted] = useState(false);
  const [data, setData] = useState({ persons: {} });
  const [activePerson, setActivePerson] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedHero, setSelectedHero] = useState(null);
  const [showHeroModal, setShowHeroModal] = useState(false);
  const [showAddPerson, setShowAddPerson] = useState(false);
  const [newPersonName, setNewPersonName] = useState("");
  const [confirmOverwrite, setConfirmOverwrite] = useState(null);
  const [pendingImport, setPendingImport] = useState(null);

  // Vérifier si déjà persisté au chargement
  useEffect(() => {
    (async () => {
      const already = await isPersisted();
      if (already) {
        setPersisted(true);
        setStarted(true);
        const loaded = loadData();
        setData(loaded);
        const persons = Object.keys(loaded.persons);
        if (persons.length > 0) setActivePerson(persons[0]);
      }
    })();
  }, []);

  const updateData = useCallback((d) => {
    setData(d);
    saveData(d);
  }, []);

  // Consent terminé
  const handleConsentComplete = (granted) => {
    setPersisted(granted);
    setStarted(true);
    const loaded = loadData();
    setData(loaded);
    const persons = Object.keys(loaded.persons);
    if (persons.length > 0) setActivePerson(persons[0]);
  };

  // ---- Person data ----
  const personData =
    activePerson && data.persons[activePerson]
      ? data.persons[activePerson]
      : { ratings: {}, comments: {} };

  const addPerson = () => {
    const name = newPersonName.trim();
    if (!name) return;
    const d = {
      ...data,
      persons: {
        ...data.persons,
        [name]: data.persons[name] || { ratings: {}, comments: {} },
      },
    };
    updateData(d);
    setActivePerson(name);
    setNewPersonName("");
    setShowAddPerson(false);
  };

  const setRating = (heroName, val) => {
    if (!activePerson) return;
    updateData({
      ...data,
      persons: {
        ...data.persons,
        [activePerson]: {
          ...personData,
          ratings: { ...personData.ratings, [heroName]: val },
        },
      },
    });
  };

  const addComment = (heroName, text) => {
    if (!activePerson) return;
    const existing = personData.comments[heroName] || [];
    updateData({
      ...data,
      persons: {
        ...data.persons,
        [activePerson]: {
          ...personData,
          comments: {
            ...personData.comments,
            [heroName]: [...existing, { text, date: new Date().toISOString() }],
          },
        },
      },
    });
  };

  const deleteComment = (heroName, idx) => {
    const existing = [...(personData.comments[heroName] || [])];
    existing.splice(idx, 1);
    updateData({
      ...data,
      persons: {
        ...data.persons,
        [activePerson]: {
          ...personData,
          comments: { ...personData.comments, [heroName]: existing },
        },
      },
    });
  };

  const handleExport = () => {
    if (!activePerson) return;
    exportPerson(activePerson, personData);
  };

  const handleImport = async (file) => {
    try {
      const imported = await readImportFile(file);
      if (data.persons[imported.name]) {
        setPendingImport(imported);
        setConfirmOverwrite(imported.name);
      } else {
        const d = {
          ...data,
          persons: { ...data.persons, [imported.name]: imported.data },
        };
        updateData(d);
        setActivePerson(imported.name);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const confirmImportAction = () => {
    if (!pendingImport) return;
    const d = {
      ...data,
      persons: { ...data.persons, [pendingImport.name]: pendingImport.data },
    };
    updateData(d);
    setActivePerson(pendingImport.name);
    setPendingImport(null);
    setConfirmOverwrite(null);
  };

  const filtered = HEROES.filter((h) =>
    h.name.toLowerCase().includes(search.toLowerCase())
  );
  const persons = Object.keys(data.persons);
  const heroObj = selectedHero ? HEROES.find((h) => h.name === selectedHero) : null;

  // ---- Consent screen (si pas encore persisté) ----
  if (!started) {
    return <ConsentScreen onComplete={handleConsentComplete} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
      <Header
        persons={persons}
        activePerson={activePerson}
        onSelectPerson={setActivePerson}
        onAddPerson={() => setShowAddPerson(true)}
        onImport={handleImport}
        onExport={handleExport}
        isPersisted={persisted}
      />

      {/* Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a0a0a 0%, var(--bg-primary) 50%, #0a0a1a 100%)",
          padding: "40px 24px 28px",
          textAlign: "center",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(26px, 5vw, 48px)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 4,
            margin: "0 0 8px",
            background: "linear-gradient(135deg, var(--red-light), var(--gold))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Marvel Heroes Omega
        </h1>
        <p style={{ color: "var(--text-dim)", fontSize: 14, margin: 0, fontStyle: "italic" }}>
          Notez et commentez les 63 héros jouables • Plaisir de jeu
        </p>

        {activePerson && (
          <div
            style={{
              marginTop: 14,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "var(--bg-card)",
              padding: "6px 16px",
              borderRadius: 20,
              border: "1px solid var(--border-light)",
            }}
          >
            <span style={{ color: "var(--text-muted)", fontSize: 13 }}>Notes de :</span>
            <span
              style={{
                color: "var(--red-light)",
                fontWeight: 700,
                fontFamily: "var(--font-display)",
                textTransform: "uppercase",
              }}
            >
              {activePerson}
            </span>
          </div>
        )}
      </div>

      {/* Search */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 24px 0" }}>
        <input
          type="text"
          placeholder="🔍 Rechercher un héros..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input"
          style={{ maxWidth: 400, fontSize: 15 }}
        />
      </div>

      {/* Grid */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: 24,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))",
          gap: 16,
        }}
      >
        {filtered.map((hero) => (
          <HeroCard
            key={hero.slug}
            hero={hero}
            rating={personData.ratings[hero.name] || 0}
            commentCount={(personData.comments[hero.name] || []).length}
            onClick={() => {
              setSelectedHero(hero.name);
              setShowHeroModal(true);
            }}
          />
        ))}
      </div>

      {/* Hero Modal */}
      <Modal
        open={showHeroModal && !!heroObj}
        onClose={() => setShowHeroModal(false)}
        title={selectedHero || ""}
      >
        {heroObj && (
          <HeroModal
            hero={heroObj}
            rating={personData.ratings[selectedHero] || 0}
            comments={personData.comments[selectedHero] || []}
            activePerson={activePerson}
            onRate={(val) => setRating(selectedHero, val)}
            onAddComment={(text) => addComment(selectedHero, text)}
            onDeleteComment={(idx) => deleteComment(selectedHero, idx)}
          />
        )}
      </Modal>

      {/* Add Person */}
      <Modal
        open={showAddPerson}
        onClose={() => setShowAddPerson(false)}
        title="Ajouter une personne"
      >
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={newPersonName}
            onChange={(e) => setNewPersonName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addPerson()}
            placeholder="Nom de la personne..."
            className="input"
            style={{ flex: 1 }}
            autoFocus
          />
          <button onClick={addPerson} className="btn-primary">Ajouter</button>
        </div>
      </Modal>

      {/* Confirm Overwrite */}
      <ConfirmModal
        open={!!confirmOverwrite}
        message={`La personne "${confirmOverwrite}" existe déjà. Voulez-vous écraser ses notes et commentaires avec les données importées ?`}
        onConfirm={confirmImportAction}
        onCancel={() => { setConfirmOverwrite(null); setPendingImport(null); }}
      />

      <footer
        style={{
          textAlign: "center",
          padding: "32px 24px",
          borderTop: "1px solid var(--bg-card)",
          color: "var(--text-footer)",
          fontSize: 12,
        }}
      >
        Marvel Heroes Omega — Fan Site — Jeu fermé le 27 novembre 2017
      </footer>
    </div>
  );
}
