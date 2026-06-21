import type { Animal } from "../types";
import { AnimalImage } from "./AnimalImage";

type Props = {
  animal: Animal;
  seen: boolean;
  onToggleSeen: () => void;
  onBack: () => void;
};

export function AnimalDetail({ animal, seen, onToggleSeen, onBack }: Props) {
  return (
    <article className="detail">
      <button className="back-link" onClick={onBack}>
        ← Volver al catálogo
      </button>

      <figure className="detail-figure">
        <AnimalImage src={animal.image} alt={animal.commonName} />
      </figure>

      <h1 className="title">{animal.commonName}</h1>
      {animal.scientificName && (
        <span className="scientific">{animal.scientificName}</span>
      )}

      {animal.whereToSee.length > 0 && (
        <section className="detail-section">
          <h2 className="label">Dónde verlo</h2>
          <ul>
            {animal.whereToSee.map((place) => (
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
