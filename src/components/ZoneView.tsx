import type { Animal, SeenState, Zone } from "../types";
import { getZoneAnimals, groupByCategory, countZoneSeen } from "../lib/zones";
import { AnimalGrid } from "./AnimalGrid";

type Props = {
  zone: Zone;
  animals: Animal[];
  seenState: SeenState;
  onSelect: (animal: Animal) => void;
  onBack: () => void;
};

export function ZoneView({ zone, animals, seenState, onSelect, onBack }: Props) {
  const zoneAnimals = getZoneAnimals(zone.id, animals);
  const groups = groupByCategory(zoneAnimals);
  const seen = countZoneSeen(zone.id, animals, seenState);

  return (
    <div className="zone-view">
      <button className="back-link" onClick={onBack}>
        ← Volver al mapa
      </button>

      <header className="zone-header">
        <div className="subtitle">{zone.region}</div>
        <h1 className="title">{zone.name}</h1>
        <p className="zone-blurb">{zone.blurb}</p>
        <div className="counter">
          {seen} de {zoneAnimals.length} vistos aquí
        </div>
      </header>

      {groups.map((group) => (
        <section key={group.category} className="zone-group">
          <h2 className="zone-group-title label">{group.category}</h2>
          <AnimalGrid
            animals={group.animals}
            seenState={seenState}
            onSelect={onSelect}
          />
        </section>
      ))}
    </div>
  );
}
