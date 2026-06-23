import { useEffect } from "react";
import type { Animal } from "../types";
import { AnimalImage } from "./AnimalImage";
import { zonesForAnimal } from "../lib/zones";
import { useT } from "../i18n";

type Props = {
  animal: Animal;
  seen: boolean;
  onToggleSeen: () => void;
  onBack: () => void;
  backLabel?: string;
};

export function AnimalDetail({
  animal,
  seen,
  onToggleSeen,
  onBack,
  backLabel,
}: Props) {
  const t = useT();
  // Open the detail scrolled to the top so the animal is always in view,
  // regardless of how far the previous list/zone was scrolled down.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [animal.id]);

  // The catalogue's `whereToSee` is empty for now, so fall back to the map zones.
  const places =
    animal.whereToSee.length > 0
      ? animal.whereToSee
      : zonesForAnimal(animal.id).map((z) => z.name);

  return (
    <article className="detail">
      <button className="back-link" onClick={onBack}>
        ← {backLabel ?? t("detail.backCatalogue")}
      </button>

      <figure className="detail-figure">
        <AnimalImage src={animal.image} alt={animal.commonName} />
      </figure>

      <h1 className="title">{animal.commonName}</h1>
      {animal.commonNameEn && (
        <span className="common-en">{animal.commonNameEn}</span>
      )}
      {animal.scientificName && (
        <span className="scientific">{animal.scientificName}</span>
      )}

      {animal.size && (
        <dl className="size-card" aria-label={t("detail.sizeAria")}>
          <div className="size-item">
            <dt>{t("detail.size")}</dt>
            <dd>{animal.size.measure}</dd>
          </div>
          <div className="size-item">
            <dt>{t("detail.weight")}</dt>
            <dd>{animal.size.weight}</dd>
          </div>
          {animal.size.compare && (
            <div className="size-item size-compare">
              <dt>{t("detail.reference")}</dt>
              <dd>{animal.size.compare}</dd>
            </div>
          )}
        </dl>
      )}

      {animal.description && (
        <p className="detail-lead">{animal.description}</p>
      )}

      {animal.distinguish && (
        <section className="detail-section">
          <h2 className="label">{t("detail.distinguish")}</h2>
          <p className="detail-text">{animal.distinguish}</p>
        </section>
      )}

      {places.length > 0 && (
        <section className="detail-section">
          <h2 className="label">{t("detail.whereToSee")}</h2>
          <ul>
            {places.map((place) => (
              <li key={place}>{place}</li>
            ))}
          </ul>
        </section>
      )}

      {animal.spottingTips && (
        <section className="detail-section">
          <h2 className="label">{t("detail.spottingTips")}</h2>
          <p className="detail-text">{animal.spottingTips}</p>
        </section>
      )}

      {animal.funFacts.length > 0 && (
        <section className="detail-section">
          <h2 className="label">{t("detail.funFacts")}</h2>
          <ul>
            {animal.funFacts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </section>
      )}

      <button
        className={`seen-toggle ${seen ? "is-seen" : ""}`}
        onClick={onToggleSeen}
      >
        {seen ? t("detail.seen") : t("detail.markSeen")}
      </button>
    </article>
  );
}
