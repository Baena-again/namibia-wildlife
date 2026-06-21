import type { Animal, SeenState, ZoneId } from "../types";
import { zones } from "../data/zones";
import { countZoneSeen, getZoneAnimals } from "../lib/zones";

type Props = {
  animals: Animal[];
  seenState: SeenState;
  onSelect: (zoneId: ZoneId) => void;
};

/** Stylised outline of Namibia (incl. the Caprivi strip), viewBox 320×420. */
const NAMIBIA_PATH =
  "M14,27 L62,175 L74,213 L88,334 L116,398 L210,393 L214,55 L310,52 L312,40 L214,38 Z";

export function NamibiaMap({ animals, seenState, onSelect }: Props) {
  return (
    <div className="map">
      <svg
        className="map-svg"
        viewBox="0 0 320 420"
        role="group"
        aria-label="Mapa de las zonas de Namibia"
      >
        <path className="map-land" d={NAMIBIA_PATH} />

        {zones.map((zone) => {
          const total = getZoneAnimals(zone.id, animals).length;
          const seen = countZoneSeen(zone.id, animals, seenState);
          const done = total > 0 && seen === total;
          return (
            <g
              key={zone.id}
              className={`map-zone ${done ? "is-done" : ""}`}
              role="button"
              tabIndex={0}
              aria-label={`${zone.name}: ${seen} de ${total} vistos`}
              onClick={() => onSelect(zone.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(zone.id);
                }
              }}
            >
              {/* generous invisible hit target for touch */}
              <circle className="map-hit" cx={zone.x} cy={zone.y} r={22} />
              <circle className="map-pin" cx={zone.x} cy={zone.y} r={7} />
              <text
                className="map-label"
                x={zone.x}
                y={zone.y}
                dy={zone.labelDy}
                dx={zone.labelAnchor === "end" ? -10 : 0}
                textAnchor={zone.labelAnchor}
              >
                {zone.short}
              </text>
            </g>
          );
        })}
      </svg>

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
