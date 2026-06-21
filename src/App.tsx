import { useEffect, useMemo, useState } from "react";
import type { Animal, FilterMode, SeenState } from "./types";
import { animals } from "./data/animals";
import { filterAnimals, countSeen } from "./lib/search";
import { loadSeen, saveSeen, toggleSeen } from "./lib/storage";
import { AnimalGrid } from "./components/AnimalGrid";
import { AnimalDetail } from "./components/AnimalDetail";
import { Settings } from "./components/Settings";

type View =
  | { name: "list" }
  | { name: "detail"; animal: Animal }
  | { name: "settings" };

const nowIso = () => new Date().toISOString();

export default function App() {
  const [seenState, setSeenState] = useState<SeenState>(() => loadSeen());
  const [storageOk, setStorageOk] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterMode>("all");
  const [view, setView] = useState<View>({ name: "list" });

  // Persist whenever the seen-state changes.
  useEffect(() => {
    setStorageOk(saveSeen(seenState));
  }, [seenState]);

  const visible = useMemo(
    () => filterAnimals(animals, query, filter, seenState),
    [query, filter, seenState],
  );
  const seenCount = useMemo(
    () => countSeen(animals, seenState),
    [seenState],
  );

  function handleToggleSeen(id: string) {
    setSeenState((prev) => toggleSeen(prev, id, nowIso()));
  }

  if (view.name === "detail") {
    return (
      <AnimalDetail
        animal={view.animal}
        seen={seenState[view.animal.id]?.seen ?? false}
        onToggleSeen={() => handleToggleSeen(view.animal.id)}
        onBack={() => setView({ name: "list" })}
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

  return (
    <>
      <header className="app-header">
        <h1>Namibia Wildlife</h1>
        <div className="subtitle">Guía de campo</div>
        <div className="counter">
          {seenCount} de {animals.length} vistos
        </div>
      </header>

      {!storageOk && (
        <p className="notice">
          Este navegador no guarda datos: los animales marcados se perderán al
          cerrar. Prueba a instalar la app en la pantalla de inicio.
        </p>
      )}

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
              {mode === "all" ? "Todos" : mode === "seen" ? "Vistos" : "Pendientes"}
            </button>
          ))}
        </div>
      </div>

      <AnimalGrid
        animals={visible}
        seenState={seenState}
        onSelect={(animal) => setView({ name: "detail", animal })}
      />

      <nav className="foot-nav">
        <button onClick={() => setView({ name: "settings" })}>
          Copia de seguridad
        </button>
      </nav>
    </>
  );
}
