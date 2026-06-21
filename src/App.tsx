import { useEffect, useMemo, useState } from "react";
import type {
  Animal,
  Difficulty,
  FilterMode,
  JournalState,
  SeenState,
  Zone,
  ZoneId,
} from "./types";
import { animals } from "./data/animals";
import { filterAnimals, countSeen } from "./lib/search";
import {
  getZone,
  categoriesOf,
  DIFFICULTY_ORDER,
  DIFFICULTY_LABEL,
} from "./lib/zones";
import {
  loadSeen,
  saveSeen,
  toggleSeen,
  loadJournal,
  saveJournal,
} from "./lib/storage";
import { AnimalGrid } from "./components/AnimalGrid";
import { AnimalDetail } from "./components/AnimalDetail";
import { NamibiaMap } from "./components/NamibiaMap";
import { ZoneView } from "./components/ZoneView";
import { Settings } from "./components/Settings";
import { Itinerary } from "./components/Itinerary";
import { SafariTips } from "./components/SafariTips";
import { ShoppingList } from "./components/ShoppingList";

type View =
  | { name: "list" }
  | { name: "map" }
  | { name: "zone"; zone: Zone; from?: View }
  | { name: "detail"; animal: Animal; from: View }
  | { name: "settings" }
  | { name: "itinerary" }
  | { name: "tips" }
  | { name: "shopping" };

const nowIso = () => new Date().toISOString();

export default function App() {
  const [seenState, setSeenState] = useState<SeenState>(() => loadSeen());
  const [journal, setJournal] = useState<JournalState>(() => loadJournal());
  const [storageOk, setStorageOk] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterMode>("all");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [view, setView] = useState<View>({ name: "map" });
  // Which shopping stop to scroll to when opened from the logbook (null = top).
  const [shoppingFocus, setShoppingFocus] = useState<string | null>(null);

  // Persist whenever the seen-state changes.
  useEffect(() => {
    setStorageOk(saveSeen(seenState));
  }, [seenState]);

  // Persist the trip logbook notes as they're written.
  useEffect(() => {
    saveJournal(journal);
  }, [journal]);

  const categories = useMemo(() => categoriesOf(animals), []);
  const visible = useMemo(
    () =>
      filterAnimals(
        animals,
        { query, filter, category, difficulty },
        seenState,
      ),
    [query, filter, category, difficulty, seenState],
  );
  const seenCount = useMemo(
    () => countSeen(animals, seenState),
    [seenState],
  );

  function handleToggleSeen(id: string) {
    setSeenState((prev) => toggleSeen(prev, id, nowIso()));
  }

  function handleSetNote(dayId: string, text: string) {
    setJournal((prev) => ({ ...prev, [dayId]: text }));
  }

  function openShopping(dayId: string) {
    setShoppingFocus(dayId);
    setView({ name: "shopping" });
  }

  function handleImport(seen: SeenState, journalIn: JournalState) {
    setSeenState(seen);
    setJournal(journalIn);
  }

  function openZone(zoneId: ZoneId, from?: View) {
    const zone = getZone(zoneId);
    if (zone) setView({ name: "zone", zone, from });
  }

  if (view.name === "detail") {
    const from = view.from;
    return (
      <AnimalDetail
        animal={view.animal}
        seen={seenState[view.animal.id]?.seen ?? false}
        onToggleSeen={() => handleToggleSeen(view.animal.id)}
        onBack={() => setView(from)}
        backLabel={
          from.name === "zone"
            ? `Volver a ${from.zone.short}`
            : from.name === "itinerary"
              ? "Volver al cuaderno"
              : undefined
        }
      />
    );
  }

  if (view.name === "zone") {
    const back = view.from ?? { name: "map" as const };
    return (
      <ZoneView
        zone={view.zone}
        animals={animals}
        seenState={seenState}
        onSelect={(animal) =>
          setView({ name: "detail", animal, from: view })
        }
        onToggleSeen={handleToggleSeen}
        onBack={() => setView(back)}
      />
    );
  }

  if (view.name === "settings") {
    return (
      <Settings
        seenState={seenState}
        journal={journal}
        onImport={handleImport}
        onBack={() => setView({ name: "list" })}
        nowIso={nowIso}
      />
    );
  }

  // The top-level tabs, in display order (Catálogo stays last).
  const tabs = [
    { name: "map", label: "Mapa" },
    { name: "itinerary", label: "Cuaderno" },
    { name: "tips", label: "Trucos" },
    { name: "shopping", label: "Compra" },
    { name: "list", label: "Catálogo" },
  ] as const;

  function goTab(name: (typeof tabs)[number]["name"]) {
    if (name === "shopping") setShoppingFocus(null);
    setView({ name } as View);
    window.scrollTo(0, 0);
  }

  return (
    <>
      <header className="app-header">
        <h1>Namibia Wildlife</h1>
        <div className="subtitle">Guía de campo</div>
        <div className="counter">
          {seenCount} de {animals.length} vistos
        </div>
      </header>

      <nav className="tabs">
        {tabs.map((t) => (
          <button
            key={t.name}
            className={`tab ${view.name === t.name ? "active" : ""}`}
            onClick={() => goTab(t.name)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {!storageOk && (
        <p className="notice">
          Este navegador no guarda datos: los animales marcados se perderán al
          cerrar. Prueba a instalar la app en la pantalla de inicio.
        </p>
      )}

      {view.name === "map" && (
        <>
          <p className="map-intro">
            Toca una zona de Namibia para ver qué animales esperar allí.
          </p>
          <NamibiaMap
            animals={animals}
            seenState={seenState}
            onSelect={openZone}
          />
        </>
      )}

      {view.name === "itinerary" && (
        <Itinerary
          animals={animals}
          seenState={seenState}
          journal={journal}
          onSetNote={handleSetNote}
          onSelectAnimal={(animal) =>
            setView({ name: "detail", animal, from: { name: "itinerary" } })
          }
          onOpenZone={(zoneId) => openZone(zoneId, { name: "itinerary" })}
          onOpenShopping={openShopping}
        />
      )}

      {view.name === "tips" && <SafariTips />}

      {view.name === "shopping" && <ShoppingList focus={shoppingFocus} />}

      {view.name === "list" && (
        <>
          <div className="controls">
            <input
              className="search-input"
              type="search"
              placeholder="Buscar por nombre…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="filters">
              {(["all", "seen", "pending"] as FilterMode[]).map((mode) => (
                <button
                  key={mode}
                  className={`filter-btn ${filter === mode ? "active" : ""}`}
                  onClick={() => setFilter(mode)}
                >
                  {mode === "all"
                    ? "Todos"
                    : mode === "seen"
                      ? "Vistos"
                      : "Pendientes"}
                </button>
              ))}
            </div>

            <div className="catalogue-filter">
              <span className="label catalogue-filter-label">
                Fáciles de ver
              </span>
              <div className="chips">
                <button
                  className={`chip ${difficulty === null ? "active" : ""}`}
                  onClick={() => setDifficulty(null)}
                >
                  Todas
                </button>
                {DIFFICULTY_ORDER.map((d) => (
                  <button
                    key={d}
                    className={`chip chip-${d} ${difficulty === d ? "active" : ""}`}
                    onClick={() => setDifficulty(difficulty === d ? null : d)}
                  >
                    {DIFFICULTY_LABEL[d]}
                  </button>
                ))}
              </div>
            </div>

            <div className="catalogue-filter">
              <span className="label catalogue-filter-label">
                Categoría
              </span>
              <div className="chips">
                <button
                  className={`chip ${category === "" ? "active" : ""}`}
                  onClick={() => setCategory("")}
                >
                  Todas
                </button>
                {categories.map((c) => (
                  <button
                    key={c}
                    className={`chip ${category === c ? "active" : ""}`}
                    onClick={() => setCategory(category === c ? "" : c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <AnimalGrid
            animals={visible}
            seenState={seenState}
            onSelect={(animal) =>
              setView({ name: "detail", animal, from: { name: "list" } })
            }
            onToggleSeen={handleToggleSeen}
          />
        </>
      )}

      <nav className="foot-nav">
        <button onClick={() => setView({ name: "settings" })}>
          Copia de seguridad
        </button>
      </nav>
    </>
  );
}
