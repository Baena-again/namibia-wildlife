import { useState } from "react";
import type { Animal, Difficulty, SeenState, Zone } from "../types";
import {
  getZoneAnimals,
  countZoneSeen,
  filterZoneAnimals,
  groupByDifficulty,
  DIFFICULTY_ORDER,
  DIFFICULTY_LABEL,
} from "../lib/zones";
import { AnimalGrid } from "./AnimalGrid";

type Props = {
  zone: Zone;
  animals: Animal[];
  seenState: SeenState;
  onSelect: (animal: Animal) => void;
  onToggleSeen: (id: string) => void;
  onBack: () => void;
};

export function ZoneView({
  zone,
  animals,
  seenState,
  onSelect,
  onToggleSeen,
  onBack,
}: Props) {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);

  const zoneAnimals = getZoneAnimals(zone.id, animals);
  const seen = countZoneSeen(zone.id, animals, seenState);

  const filtered = filterZoneAnimals(zoneAnimals, "", difficulty);
  const groups = groupByDifficulty(filtered);

  return (
    <div className="zone-view">
      <button className="back-link" onClick={onBack}>
        ← Volver al mapa
      </button>

      <header className="zone-header">
        <div className="subtitle">{zone.region}</div>
        <h1 className="title">{zone.name}</h1>
        <p className="zone-blurb">{zone.blurb}</p>
        <dl className="zone-facts">
          <div>
            <dt className="label">Clima</dt>
            <dd>{zone.climate}</dd>
          </div>
          <div>
            <dt className="label">Terreno</dt>
            <dd>{zone.terrain}</dd>
          </div>
        </dl>
        <div className="counter">
          {seen} de {zoneAnimals.length} vistos aquí
        </div>
      </header>

      <div className="zone-filters">
        <div className="zone-filter">
          <span className="label zone-filter-label">Dificultad</span>
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
                onClick={() => setDifficulty(d)}
              >
                {DIFFICULTY_LABEL[d]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {groups.length === 0 ? (
        <p className="empty">Ningún animal coincide con estos filtros.</p>
      ) : (
        groups.map((group) => (
          <section key={group.difficulty} className="zone-group">
            <h2 className={`zone-group-title label diff-${group.difficulty}`}>
              {group.label}
              <span className="zone-group-count">{group.animals.length}</span>
            </h2>
            <AnimalGrid
              animals={group.animals}
              seenState={seenState}
              onSelect={onSelect}
              onToggleSeen={onToggleSeen}
              grouped={false}
            />
          </section>
        ))
      )}
    </div>
  );
}
