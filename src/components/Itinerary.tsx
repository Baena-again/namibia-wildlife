import { useMemo } from "react";
import type { Animal, JournalState, SeenState, ZoneId } from "../types";
import { itinerary } from "../data/itinerary";
import { shopping } from "../data/shopping";
import { getZone } from "../lib/zones";
import { AnimalImage } from "./AnimalImage";
import { useT } from "../i18n";

type Props = {
  animals: Animal[];
  seenState: SeenState;
  journal: JournalState;
  onSetNote: (dayId: string, text: string) => void;
  onSelectAnimal: (animal: Animal) => void;
  onOpenZone: (zoneId: ZoneId) => void;
  onOpenShopping: (dayId: string) => void;
  onBack?: () => void;
};

export function Itinerary({
  animals,
  seenState,
  journal,
  onSetNote,
  onSelectAnimal,
  onOpenZone,
  onOpenShopping,
  onBack,
}: Props) {
  const t = useT();
  const byId = useMemo(
    () => new Map(animals.map((a) => [a.id, a])),
    [animals],
  );
  const shoppingByDay = useMemo(
    () => new Map(shopping.map((s) => [s.dayId, s])),
    [],
  );

  return (
    <section className="itinerary">
      {onBack && (
        <button className="back-link" onClick={onBack}>
          ← {t("itinerary.back")}
        </button>
      )}
      <h1 className="title">{t("itinerary.title")}</h1>
      <p className="notice">{t("itinerary.intro")}</p>

      <ol className="itin-list">
        {itinerary.map((day) => {
          const zone = day.zone ? getZone(day.zone) : undefined;
          const stop = shoppingByDay.get(day.id);
          const dayAnimals = day.animalIds
            .map((id) => byId.get(id))
            .filter((a): a is Animal => Boolean(a));
          return (
            <li key={day.id} className="itin-day">
              <div className="itin-day-head">
                <span className="itin-daynum">
                  {t("itinerary.day", { n: day.dayNumber })}
                </span>
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
                      <a href={`tel:${day.lodging.phone.replace(/[^+\d]/g, "")}`}>
                        {day.lodging.phone}
                      </a>
                    </>
                  )}
                  {day.lodging.altPhones?.map((p) => (
                    <span key={p}>
                      {" / "}
                      <a href={`tel:${p.replace(/[^+\d]/g, "")}`}>{p}</a>
                    </span>
                  ))}
                  {day.lodging.address && (
                    <span className="itin-address">{day.lodging.address}</span>
                  )}
                  {(day.lodging.mapUrl || day.lodging.coords) && (
                    <span className="itin-maps">
                      {day.lodging.mapUrl && (
                        <a
                          href={day.lodging.mapUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          📍 {t("itinerary.openMaps")}
                        </a>
                      )}
                      {day.lodging.coords && (
                        <span className="itin-coords">{day.lodging.coords}</span>
                      )}
                    </span>
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
                        {t("itinerary.web")}
                      </a>
                    </>
                  )}
                </p>
              )}

              {stop && (
                <button
                  className="itin-shopping-link"
                  onClick={() => onOpenShopping(day.id)}
                >
                  {stop.title} ›
                </button>
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

              {day.tips && day.tips.length > 0 && (
                <div className="itin-tips">
                  <h3 className="itin-tips-label label">
                    {t("itinerary.onTheRoad")}
                  </h3>
                  <ul>
                    {day.tips.map((tip) => (
                      <li key={tip}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              <label className="journal-field">
                <span className="label">{t("itinerary.myDiary")}</span>
                <textarea
                  className="journal-note"
                  placeholder={t("itinerary.diaryPlaceholder")}
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
