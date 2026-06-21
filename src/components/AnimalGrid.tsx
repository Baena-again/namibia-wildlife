import type { Animal, SeenState } from "../types";
import { AnimalImage } from "./AnimalImage";

type Props = {
  animals: Animal[];
  seenState: SeenState;
  onSelect: (animal: Animal) => void;
};

export function AnimalGrid({ animals, seenState, onSelect }: Props) {
  if (animals.length === 0) {
    return <p className="empty">Ningún animal coincide con la búsqueda.</p>;
  }
  return (
    <div className="grid">
      {animals.map((animal) => {
        const seen = seenState[animal.id]?.seen ?? false;
        return (
          <button
            key={animal.id}
            className={`specimen ${seen ? "is-seen" : "is-pending"}`}
            onClick={() => onSelect(animal)}
          >
            <span className="specimen-figure">
              <AnimalImage src={animal.image} alt={animal.commonName} />
            </span>
            <span className="specimen-name">{animal.commonName}</span>
            <span className="specimen-seen">{seen ? "Visto" : ""}</span>
          </button>
        );
      })}
    </div>
  );
}
