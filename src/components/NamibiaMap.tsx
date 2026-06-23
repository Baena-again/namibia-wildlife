import type { Animal, SeenState, ZoneId } from "../types";
import { zones } from "../data/zones";
import { countZoneSeen, getZoneAnimals } from "../lib/zones";
import mapImage from "../assets/namibia-map.webp";
import { useT } from "../i18n";

type Props = {
  animals: Animal[];
  seenState: SeenState;
  onSelect: (zoneId: ZoneId) => void;
};

export function NamibiaMap({ animals, seenState, onSelect }: Props) {
  const t = useT();
  return (
    <div className="map">
      <div className="map-figure">
        <img className="map-img" src={mapImage} alt={t("map.imgAlt")} />

        <svg
          className="map-overlay"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="false"
        >
          {zones.map((zone) => {
            const total = getZoneAnimals(zone.id, animals).length;
            const seen = countZoneSeen(zone.id, animals, seenState);
            const done = total > 0 && seen === total;
            const points = zone.polygon.map((p) => p.join(",")).join(" ");
            return (
              <polygon
                key={zone.id}
                className={`map-area ${done ? "is-done" : ""}`}
                points={points}
                vectorEffect="non-scaling-stroke"
                role="button"
                tabIndex={0}
                aria-label={t("map.areaAria", {
                  zone: zone.name,
                  seen,
                  total,
                })}
                onClick={() => onSelect(zone.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(zone.id);
                  }
                }}
              >
                <title>{zone.name}</title>
              </polygon>
            );
          })}
        </svg>
      </div>

      <p className="map-hint">{t("map.hint")}</p>

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
