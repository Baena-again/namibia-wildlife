import type { Animal, SeenState, ZoneId } from "../types";
import { zones } from "../data/zones";
import { countZoneSeen, getZoneAnimals } from "../lib/zones";
import mapImage from "../assets/namibia-map.webp";

type Props = {
  animals: Animal[];
  seenState: SeenState;
  onSelect: (zoneId: ZoneId) => void;
};

export function NamibiaMap({ animals, seenState, onSelect }: Props) {
  return (
    <div className="map">
      <div className="map-figure">
        <img
          className="map-img"
          src={mapImage}
          alt="Mapa ilustrado de Namibia con sus zonas de fauna"
        />

        {zones.map((zone) => {
          const total = getZoneAnimals(zone.id, animals).length;
          const seen = countZoneSeen(zone.id, animals, seenState);
          const done = total > 0 && seen === total;
          return (
            <button
              key={zone.id}
              className={`map-pin-btn ${done ? "is-done" : ""}`}
              style={{ left: `${zone.mx}%`, top: `${zone.my}%` }}
              aria-label={`${zone.name}: ${seen} de ${total} vistos`}
              onClick={() => onSelect(zone.id)}
            >
              <span className="map-pin-dot">{done ? "✓" : ""}</span>
            </button>
          );
        })}
      </div>

      <ul className="map-legend">
        {zones.map((zone) => {
          const total = getZoneAnimals(zone.id, animals).length;
          const seen = countZoneSeen(zone.id, animals, seenState);
          return (
            <li key={zone.id}>
              <button className="map-legend-btn" onClick={() => onSelect(zone.id)}>
                <span className="map-legend-name">{zone.name}</span>
                <span className="map-legend-meta">
                  {zone.region} · {seen}/{total}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
