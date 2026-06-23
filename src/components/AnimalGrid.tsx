import type { Animal, SeenState } from "../types";
import { AnimalImage } from "./AnimalImage";
import { useT } from "../i18n";

type Props = {
  animals: Animal[];
  seenState: SeenState;
  onSelect: (animal: Animal) => void;
  onToggleSeen: (id: string) => void;
  /** Group the grid under category headings (catalogue) or show it flat (zone). */
  grouped?: boolean;
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

function Card({
  animal,
  seen,
  onSelect,
  onToggleSeen,
}: {
  animal: Animal;
  seen: boolean;
  onSelect: (animal: Animal) => void;
  onToggleSeen: (id: string) => void;
}) {
  const t = useT();
  return (
    <div className={`specimen ${seen ? "is-seen" : "is-pending"}`}>
      <button className="specimen-open" onClick={() => onSelect(animal)}>
        <span className="specimen-figure">
          <AnimalImage src={animal.image} alt={animal.commonName} />
        </span>
        <span className="specimen-name">{animal.commonName}</span>
        {animal.commonNameEn && (
          <span className="specimen-name-en">{animal.commonNameEn}</span>
        )}
      </button>
      <button
        className={`specimen-toggle ${seen ? "is-seen" : ""}`}
        onClick={() => onToggleSeen(animal.id)}
        aria-pressed={seen}
        aria-label={
          seen
            ? t("grid.markUnseenAria", { name: animal.commonName })
            : t("grid.markSeenAria", { name: animal.commonName })
        }
      >
        {seen ? t("grid.seen") : t("grid.markSeen")}
      </button>
    </div>
  );
}

export function AnimalGrid({
  animals,
  seenState,
  onSelect,
  onToggleSeen,
  grouped = true,
}: Props) {
  const t = useT();
  if (animals.length === 0) {
    return <p className="empty">{t("grid.empty")}</p>;
  }

  const cards = (items: Animal[]) => (
    <div className="grid">
      {items.map((animal) => (
        <Card
          key={animal.id}
          animal={animal}
          seen={seenState[animal.id]?.seen ?? false}
          onSelect={onSelect}
          onToggleSeen={onToggleSeen}
        />
      ))}
    </div>
  );

  if (!grouped) return cards(animals);

  return (
    <>
      {groupByCategory(animals).map(({ category, items }) => (
        <section key={category} className="catalogue-group">
          <h2 className="group-heading">{category}</h2>
          {cards(items)}
        </section>
      ))}
    </>
  );
}
