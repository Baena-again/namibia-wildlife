import type { Animal, SeenState } from "../types";
import { AnimalImage } from "./AnimalImage";

type Props = {
  animals: Animal[];
  seenState: SeenState;
  onSelect: (animal: Animal) => void;
};

/** Group animals by category, preserving the order in which they appear. */
function groupByCategory(animals: Animal[]): { category: string; items: Animal[] }[] {
  const groups: { category: string; items: Animal[] }[] = [];
  const index = new Map<string, number>();
  for (const animal of animals) {
    const category = animal.category ?? "Otros";
    let at = index.get(category);
    if (at === undefined) {
      at = groups.length;
      index.set(category, at);
      groups.push({ category, items: [] });
    }
    groups[at].items.push(animal);
  }
  return groups;
}

export function AnimalGrid({ animals, seenState, onSelect }: Props) {
  if (animals.length === 0) {
    return <p className="empty">Ningún animal coincide con la búsqueda.</p>;
  }
  return (
    <>
      {groupByCategory(animals).map(({ category, items }) => (
        <section key={category} className="catalogue-group">
          <h2 className="group-heading">{category}</h2>
          <div className="grid">
            {items.map((animal) => {
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
        </section>
      ))}
    </>
  );
}
