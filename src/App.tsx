import { useEffect, useMemo, useState } from "react";
import type {
  Animal,
  Difficulty,
  FilterMode,
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
import { loadSeen, saveSeen, toggleSeen } from "./lib/storage";
import { AnimalGrid } from "./components/AnimalGrid";
import { AnimalDetail } from "./components/AnimalDetail";
import { NamibiaMap } from "./components/NamibiaMap";
import { ZoneView } from "./components/ZoneView";
import { Settings } from "./components/Settings";

type View =
  | { name: "list" }
  | { name: "map" }
  | { name: "zone"; zone: Zone }
  | { name: "detail"; animal: Animal; from: View }
  | { name: "settings" };

const nowIso = () => new Date().toISOString();

export default function App() {
  const [seenState, setSeenState] = useState<SeenState>(() => loadSeen());
  const [storageOk, setStorageOk] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterMode>("all");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [view, setView] = useState<View>({ name: "list" });

  // Persist whenever the seen-state changes.
  useEffect(() => {
    setStorageOk(saveSeen(seenState));
  }, [seenState]);

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

  function openZone(zoneId: ZoneId) {
    const zone = getZone(zoneId);
    if (zone) setView({ name: "zone", zone });
  }

  if (view.name === "detail") {
    const from = view.from;
    return (
      <AnimalDetail
        animal={view.animal}
        seen={seenState[view.animal.id]?.seen ?? false}
        onToggleSeen={() => handleToggleSeen(view.animal.id)}
        onBack={() => setView(from)}
        backLabel={from.name === "zone" ? `Volver a ${from.zone.short}` : undefined}
      />
    );
  }

  if (view.name === "zone") {
    return (
      <ZoneView
        zone={view.zone}
        animals={animals}
        seenState={seenState}
        onSelect={(animal) =>
          setView({ name: "detail", animal, from: view })
        }
        onToggleSeen={handleToggleSeen}
        onBack={() => setView({ name: "map" })}
      />
    );
  }

  if (view.name === "settings") {
    return (
      <Settings
        seenState={seenState}
        onImport={setSeenState}
        onBack={() => setView({ name: "list" })}
        nowIso={nowIso}
      />
    );
  }

  const isMap = view.name === "map";

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
        <button
          className={`tab ${!isMap ? "active" : ""}`}
          onClick={() => setView({ name: "list" })}
        >
          Catálogo
        </button>
        <button
          className={`tab ${isMap ? "active" : ""}`}
          onClick={() => setView({ name: "map" })}
        >
          Mapa
        </button>
      </nav>

      {!storageOk && (
        <p className="notice">
          Este navegador no guarda datos: los animales marcados se perderán al
          cerrar. Prueba a instalar la app en la pantalla de inicio.
        </p>
      )}

      {isMap ? (
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
      ) : (
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
