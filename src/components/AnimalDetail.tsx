import type { Animal } from "../types";
import { AnimalImage } from "./AnimalImage";
import { zonesForAnimal } from "../lib/zones";

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
  backLabel = "Volver al catálogo",
}: Props) {
  // The catalogue's `whereToSee` is empty for now, so fall back to the map zones.
  const places =
    animal.whereToSee.length > 0
      ? animal.whereToSee
      : zonesForAnimal(animal.id).map((z) => z.name);

  return (
    <article className="detail">
      <button className="back-link" onClick={onBack}>
        ← {backLabel}
      </button>

      <figure className="detail-figure">
        <AnimalImage src={animal.image} alt={animal.commonName} />
      </figure>

      <h1 className="title">{animal.commonName}</h1>
      {animal.scientificName && (
        <span className="scientific">{animal.scientificName}</span>
      )}

      {places.length > 0 && (
        <section className="detail-section">
          <h2 className="label">Dónde verlo</h2>
          <ul>
            {places.map((place) => (
              <li key={place}>{place}</li>
            ))}
          </ul>
        </section>
      )}

      {animal.funFacts.length > 0 && (
        <section className="detail-section">
          <h2 className="label">Datos curiosos</h2>
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
        {seen ? "✓ Visto" : "Marcar como visto"}
      </button>
    </article>
  );
}
