import type { Animal, FilterMode, SeenState } from "../types";

/** Lowercase + strip accents so "leon" matches "León". */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

export function matchesQuery(animal: Animal, query: string): boolean {
  const q = normalize(query);
  if (!q) return true;
  return (
    normalize(animal.commonName).includes(q) ||
    (animal.scientificName ? normalize(animal.scientificName).includes(q) : false)
  );
}

export function matchesFilter(
  animal: Animal,
  filter: FilterMode,
  seenState: SeenState,
): boolean {
  if (filter === "all") return true;
  const seen = seenState[animal.id]?.seen ?? false;
  return filter === "seen" ? seen : !seen;
}

/** Apply the search query and the All/Seen/Pending filter together. */
export function filterAnimals(
  animals: Animal[],
  query: string,
  filter: FilterMode,
  seenState: SeenState,
): Animal[] {
  return animals.filter(
    (a) => matchesQuery(a, query) && matchesFilter(a, filter, seenState),
  );
}

/** Count of animals marked as seen (only those still in the catalogue). */
export function countSeen(animals: Animal[], seenState: SeenState): number {
  return animals.reduce(
    (n, a) => n + (seenState[a.id]?.seen ? 1 : 0),
    0,
  );
}
