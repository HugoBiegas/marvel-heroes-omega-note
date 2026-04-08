import { useState, useEffect, useCallback, useMemo } from "react";
import { HEROES } from "./data/heroes";
import { PRESTIGE_LEVELS, DEFAULT_PRESTIGE } from "./data/prestige";
import {
  isPersisted, loadData, saveData, exportPerson, readImportFile,
} from "./utils/storage";
import ConsentScreen from "./components/ConsentScreen";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import HeroCard from "./components/HeroCard";
import Modal from "./components/Modal";
import HeroModal from "./components/HeroModal";
import ConfirmModal from "./components/ConfirmModal";
import CompareModal from "./components/CompareModal";

/** Crée les données par défaut d'une nouvelle personne */
function createDefaultPerson() {
  const owned = {};
  const prestiges = {};
  HEROES.forEach((h) => {
    owned[h.name] = false;
    prestiges[h.name] = DEFAULT_PRESTIGE;
  });
  return { ratings: {}, comments: {}, levels: {}, prestiges, owned };
}

export default function App() {
  const [started, setStarted] = useState(false);
  const [persistedState, setPersistedState] = useState(false);
  const [data, setData] = useState({ persons: {} });
  const [activePerson, setActivePerson] = useState(null);

  // Filters
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterOwned, setFilterOwned] = useState("all");

  // Modals
  const [selectedHero, setSelectedHero] = useState(null);
  const [showHeroModal, setShowHeroModal] = useState(false);
  const [showAddPerson, setShowAddPerson] = useState(false);
  const [showNoPersonWarning, setShowNoPersonWarning] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [newPersonName, setNewPersonName] = useState("");
  const [confirmOverwrite, setConfirmOverwrite] = useState(null);
  const [pendingImport, setPendingImport] = useState(null);

  // Init
  useEffect(() => {
    (async () => {
      const already = await isPersisted();
      if (already) {
        setPersistedState(true);
        setStarted(true);
        const loaded = loadData();
        setData(loaded);
        const ps = Object.keys(loaded.persons);
        if (ps.length > 0) setActivePerson(ps[0]);
      }
    })();
  }, []);

  const updateData = useCallback((d) => {
    setData(d);
    saveData(d);
  }, []);

  const handleConsentComplete = (granted) => {
    setPersistedState(granted);
    setStarted(true);
    const loaded = loadData();
    setData(loaded);
    const ps = Object.keys(loaded.persons);
    if (ps.length > 0) setActivePerson(ps[0]);
  };

  // ---- Person data with safe defaults ----
  const personData = useMemo(() => {
    if (activePerson && data.persons[activePerson]) {
      const p = data.persons[activePerson];
      return {
        ratings: p.ratings || {},
        comments: p.comments || {},
        levels: p.levels || {},
        prestiges: p.prestiges || {},
        owned: p.owned || {},
      };
    }
    return { ratings: {}, comments: {}, levels: {}, prestiges: {}, owned: {} };
  }, [activePerson, data]);

  // ---- Update person field helper ----
  const updatePersonField = useCallback((field, heroName, value) => {
    if (!activePerson) return;
    const current = data.persons[activePerson] || createDefaultPerson();
    updateData({
      ...data,
      persons: {
        ...data.persons,
        [activePerson]: {
          ...current,
          [field]: { ...(current[field] || {}), [heroName]: value },
        },
      },
    });
  }, [activePerson, data, updateData]);

  // ---- Hero click ----
  const handleHeroClick = (heroName) => {
    if (!activePerson) { setShowNoPersonWarning(true); return; }
    setSelectedHero(heroName);
    setShowHeroModal(true);
  };

  // ---- Add person ----
  const addPerson = () => {
    const name = newPersonName.trim();
    if (!name) return;
    if (!data.persons[name]) {
      updateData({
        ...data,
        persons: { ...data.persons, [name]: createDefaultPerson() },
      });
    }
    setActivePerson(name);
    setNewPersonName("");
    setShowAddPerson(false);
  };

  // ---- Delete person ----
  const deletePerson = () => {
    if (!activePerson) return;
    const newPersons = { ...data.persons };
    delete newPersons[activePerson];
    updateData({ ...data, persons: newPersons });
    const remaining = Object.keys(newPersons);
    setActivePerson(remaining.length > 0 ? remaining[0] : null);
    setShowDeleteConfirm(false);
  };

  // ---- Comments ----
  const addComment = (heroName, text) => {
    if (!activePerson) return;
    const current = data.persons[activePerson] || createDefaultPerson();
    const existing = current.comments?.[heroName] || [];
    updateData({
      ...data,
      persons: {
        ...data.persons,
        [activePerson]: {
          ...current,
          comments: { ...(current.comments || {}), [heroName]: [...existing, { text, date: new Date().toISOString() }] },
        },
      },
    });
  };

  const deleteComment = (heroName, idx) => {
    const current = data.persons[activePerson] || createDefaultPerson();
    const existing = [...(current.comments?.[heroName] || [])];
    existing.splice(idx, 1);
    updateData({
      ...data,
      persons: {
        ...data.persons,
        [activePerson]: {
          ...current,
          comments: { ...(current.comments || {}), [heroName]: existing },
        },
      },
    });
  };

  // ---- Import / Export ----
  const handleExport = () => {
    if (!activePerson) return;
    exportPerson(activePerson, data.persons[activePerson]);
  };

  const handleImport = async (file) => {
    try {
      const imported = await readImportFile(file);
      if (data.persons[imported.name]) {
        setPendingImport(imported);
        setConfirmOverwrite(imported.name);
      } else {
        updateData({ ...data, persons: { ...data.persons, [imported.name]: imported.data } });
        setActivePerson(imported.name);
      }
    } catch (err) { alert(err.message); }
  };

  const confirmImportAction = () => {
    if (!pendingImport) return;
    updateData({ ...data, persons: { ...data.persons, [pendingImport.name]: pendingImport.data } });
    setActivePerson(pendingImport.name);
    setPendingImport(null);
    setConfirmOverwrite(null);
  };

  // ---- Filtering + Sorting ----
  const prestigeIndex = (id) => PRESTIGE_LEVELS.findIndex((p) => p.id === id);

  const sortedHeroes = useMemo(() => {
    let list = HEROES.filter((h) => h.name.toLowerCase().includes(search.toLowerCase()));

    if (filterOwned === "owned") list = list.filter((h) => personData.owned[h.name] === true);
    else if (filterOwned === "notowned") list = list.filter((h) => !personData.owned[h.name]);

    list.sort((a, b) => {
      let va, vb;
      switch (sortBy) {
        case "rating":
          va = personData.ratings[a.name] || 0; vb = personData.ratings[b.name] || 0; break;
        case "level":
          va = personData.levels[a.name] || 0; vb = personData.levels[b.name] || 0; break;
        case "prestige":
          va = prestigeIndex(personData.prestiges[a.name] || DEFAULT_PRESTIGE);
          vb = prestigeIndex(personData.prestiges[b.name] || DEFAULT_PRESTIGE); break;
        case "comments":
          va = (personData.comments[a.name] || []).length;
          vb = (personData.comments[b.name] || []).length; break;
        default:
          va = a.name.toLowerCase(); vb = b.name.toLowerCase();
          return sortOrder === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
      }
      return sortOrder === "asc" ? va - vb : vb - va;
    });
    return list;
  }, [search, sortBy, sortOrder, filterOwned, personData]);

  const persons = Object.keys(data.persons);
  const heroObj = selectedHero ? HEROES.find((h) => h.name === selectedHero) : null;

  if (!started) return <ConsentScreen onComplete={handleConsentComplete} />;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
      <Header
        persons={persons}
        activePerson={activePerson}
        onSelectPerson={setActivePerson}
        onAddPerson={() => setShowAddPerson(true)}
        onDeletePerson={() => setShowDeleteConfirm(true)}
        onImport={handleImport}
        onExport={handleExport}
        onCompare={() => setShowCompare(true)}
        isPersisted={persistedState}
      />

      {/* Banner */}
      <div style={{
        background: "linear-gradient(135deg, #1a0a0a 0%, var(--bg-primary) 50%, #0a0a1a 100%)",
        padding: "36px 24px 24px", textAlign: "center", borderBottom: "1px solid var(--border)",
      }}>
        <h1 style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(24px, 5vw, 44px)",
          fontWeight: 700, textTransform: "uppercase", letterSpacing: 4, margin: "0 0 8px",
          background: "linear-gradient(135deg, var(--red-light), var(--gold))",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>Marvel Heroes Omega</h1>
        <p style={{ color: "var(--text-dim)", fontSize: 14, margin: 0, fontStyle: "italic" }}>
          Notez et commentez les 63 héros jouables • Plaisir de jeu
        </p>
        {activePerson ? (
          <div style={{
            marginTop: 12, display: "inline-flex", alignItems: "center", gap: 8,
            background: "var(--bg-card)", padding: "5px 14px", borderRadius: 20,
            border: "1px solid var(--border-light)",
          }}>
            <span style={{ color: "var(--text-muted)", fontSize: 12 }}>Notes de :</span>
            <span style={{
              color: "var(--red-light)", fontWeight: 700, fontFamily: "var(--font-display)",
              textTransform: "uppercase",
            }}>{activePerson}</span>
          </div>
        ) : (
          <p style={{ color: "#e67e22", fontSize: 13, marginTop: 12 }}>
            ⚠️ Sélectionnez ou créez une personne pour commencer.
          </p>
        )}
      </div>

      {/* Filters */}
      <FilterBar
        search={search} onSearchChange={setSearch}
        sortBy={sortBy} onSortByChange={setSortBy}
        sortOrder={sortOrder} onSortOrderChange={setSortOrder}
        filterOwned={filterOwned} onFilterOwnedChange={setFilterOwned}
      />

      {/* Grid */}
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "16px 24px 24px",
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 14,
      }}>
        {sortedHeroes.map((hero) => (
          <HeroCard
            key={hero.slug} hero={hero}
            rating={personData.ratings[hero.name] || 0}
            commentCount={(personData.comments[hero.name] || []).length}
            level={personData.levels[hero.name] || 0}
            prestige={personData.prestiges[hero.name] || DEFAULT_PRESTIGE}
            owned={personData.owned[hero.name] ?? false}
            onClick={() => handleHeroClick(hero.name)}
          />
        ))}
        {sortedHeroes.length === 0 && (
          <p style={{ gridColumn: "1/-1", textAlign: "center", color: "var(--text-dim)", padding: 40 }}>
            Aucun héros trouvé.
          </p>
        )}
      </div>

      {/* Hero Detail */}
      <Modal open={showHeroModal && !!heroObj} onClose={() => setShowHeroModal(false)} title={selectedHero || ""}>
        {heroObj && (
          <HeroModal
            hero={heroObj}
            rating={personData.ratings[selectedHero] || 0}
            comments={personData.comments[selectedHero] || []}
            level={personData.levels[selectedHero] || 0}
            prestige={personData.prestiges[selectedHero] || DEFAULT_PRESTIGE}
            owned={personData.owned[selectedHero] ?? false}
            onRate={(val) => updatePersonField("ratings", selectedHero, val)}
            onAddComment={(text) => addComment(selectedHero, text)}
            onDeleteComment={(idx) => deleteComment(selectedHero, idx)}
            onLevelChange={(val) => updatePersonField("levels", selectedHero, val)}
            onPrestigeChange={(val) => updatePersonField("prestiges", selectedHero, val)}
            onOwnedChange={(val) => updatePersonField("owned", selectedHero, val)}
          />
        )}
      </Modal>

      {/* No person warning */}
      <Modal open={showNoPersonWarning} onClose={() => setShowNoPersonWarning(false)} title="Aucune personne sélectionnée">
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7, margin: "0 0 8px" }}>
            Vous devez <strong style={{ color: "var(--text)" }}>créer ou sélectionner une personne</strong> avant de pouvoir interagir avec un héros.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 16 }}>
            {persons.length > 0 && (
              <select
                onChange={(e) => { if (e.target.value) { setActivePerson(e.target.value); setShowNoPersonWarning(false); } }}
                className="input" style={{ width: "auto", minWidth: 160, padding: "10px 12px", cursor: "pointer" }}
                defaultValue=""
              >
                <option value="" disabled>Personne existante</option>
                {persons.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            )}
            <button onClick={() => { setShowNoPersonWarning(false); setShowAddPerson(true); }} className="btn-primary">
              + Créer une personne
            </button>
          </div>
        </div>
      </Modal>

      {/* Add Person */}
      <Modal open={showAddPerson} onClose={() => setShowAddPerson(false)} title="Ajouter une personne">
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={newPersonName} onChange={(e) => setNewPersonName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addPerson()}
            placeholder="Nom de la personne..." className="input" style={{ flex: 1 }} autoFocus
          />
          <button onClick={addPerson} className="btn-primary">Ajouter</button>
        </div>
      </Modal>

      {/* Delete Person Confirm */}
      <ConfirmModal
        open={showDeleteConfirm}
        message={`Voulez-vous vraiment supprimer "${activePerson}" et toutes ses données (notes, commentaires, niveaux, prestiges) ? Cette action est irréversible.`}
        onConfirm={deletePerson}
        onCancel={() => setShowDeleteConfirm(false)}
      />

      {/* Compare */}
      <CompareModal open={showCompare} onClose={() => setShowCompare(false)} persons={persons} data={data} />

      {/* Import Overwrite Confirm */}
      <ConfirmModal
        open={!!confirmOverwrite}
        message={`La personne "${confirmOverwrite}" existe déjà. Voulez-vous écraser ses données avec celles importées ?`}
        onConfirm={confirmImportAction}
        onCancel={() => { setConfirmOverwrite(null); setPendingImport(null); }}
      />

      <footer style={{
        textAlign: "center", padding: "32px 24px", borderTop: "1px solid var(--bg-card)",
        color: "var(--text-footer)", fontSize: 12,
      }}>
        Marvel Heroes Omega — Fan Site — Jeu fermé le 27 novembre 2017
      </footer>
    </div>
  );
}
