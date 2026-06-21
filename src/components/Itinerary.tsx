import { useMemo } from "react";
import type { Animal, JournalState, SeenState, ZoneId } from "../types";
import { itinerary } from "../data/itinerary";
import { getZone } from "../lib/zones";
import { AnimalImage } from "./AnimalImage";

type Props = {
  animals: Animal[];
  seenState: SeenState;
  journal: JournalState;
  onSetNote: (dayId: string, text: string) => void;
  onSelectAnimal: (animal: Animal) => void;
  onOpenZone: (zoneId: ZoneId) => void;
  onBack?: () => void;
};

export function Itinerary({
  animals,
  seenState,
  journal,
  onSetNote,
  onSelectAnimal,
  onOpenZone,
  onBack,
}: Props) {
  const byId = useMemo(
    () => new Map(animals.map((a) => [a.id, a])),
    [animals],
  );

  return (
    <section className="itinerary">
      {onBack && (
        <button className="back-link" onClick={onBack}>
          ← Volver
        </button>
      )}
      <h1 className="title">Cuaderno de bitácora</h1>
      <p className="notice">
        Nuestra ruta por Namibia, día a día. Toca la zona para ver todos sus
        animales, abre una ficha tocando una foto, y escribe abajo lo que
        hayáis visto y hecho — se guarda en este dispositivo.
      </p>

      <ol className="itin-list">
        {itinerary.map((day) => {
          const zone = day.zone ? getZone(day.zone) : undefined;
          const dayAnimals = day.animalIds
            .map((id) => byId.get(id))
            .filter((a): a is Animal => Boolean(a));
          return (
            <li key={day.id} className="itin-day">
              <div className="itin-day-head">
                <span className="itin-daynum">Día {day.dayNumber}</span>
                <span className="itin-date">{day.label}</span>
                {zone && (
                  <button
                    className="itin-zone"
                    onClick={() => onOpenZone(zone.id)}
                  >
                    {zone.short} ›
                  </button>
                )}
              </div>

              <h2 className="itin-title">{day.title}</h2>
              <p className="itin-route">
                <span>{day.start}</span>
                <span className="itin-arrow">→</span>
                <span>{day.end}</span>
              </p>
              <p className="itin-summary">{day.summary}</p>
              {day.driving && <p className="itin-driving">🚗 {day.driving}</p>}
              {day.lodging && (
                <p className="itin-lodging">
                  🛏 {day.lodging.name}
                  {day.lodging.phone && (
                    <>
                      {" · "}
                      <a href={`tel:${day.lodging.phone.replace(/\s+/g, "")}`}>
                        {day.lodging.phone}
                      </a>
                    </>
                  )}
                </p>
              )}
              {day.activity && (
                <p className="itin-lodging">
                  🚙 {day.activity.name}
                  {day.activity.phone && (
                    <>
                      {" · "}
                      <a href={`tel:${day.activity.phone.replace(/\s+/g, "")}`}>
                        {day.activity.phone}
                      </a>
                    </>
                  )}
                  {day.activity.url && (
                    <>
                      {" · "}
                      <a
                        href={day.activity.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        web
                      </a>
                    </>
                  )}
                </p>
              )}

              {dayAnimals.length > 0 && (
                <div className="itin-animals">
                  {dayAnimals.map((a) => (
                    <button
                      key={a.id}
                      className={`itin-thumb ${seenState[a.id]?.seen ? "is-seen" : ""}`}
                      onClick={() => onSelectAnimal(a)}
                    >
                      <span className="itin-thumb-fig">
                        <AnimalImage src={a.image} alt={a.commonName} />
                      </span>
                      <span className="itin-thumb-name">{a.commonName}</span>
                    </button>
                  ))}
                </div>
              )}

              <label className="journal-field">
                <span className="label">Mi diario</span>
                <textarea
                  className="journal-note"
                  placeholder="¿Qué hemos visto y hecho hoy?"
                  value={journal[day.id] ?? ""}
                  onChange={(e) => onSetNote(day.id, e.target.value)}
                  rows={3}
                />
              </label>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
