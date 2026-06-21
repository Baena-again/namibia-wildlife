import type { Animal, Difficulty, FilterMode, SeenState } from "../types";
import { difficultyOf } from "./zones";

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
    (animal.commonNameEn ? normalize(animal.commonNameEn).includes(q) : false) ||
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

const UNCATEGORISED = "Otros";

/** Filters applied together in the catalogue. */
export type CatalogueFilters = {
  query: string;
  filter: FilterMode;
  /** "" = all categories. */
  category: string;
  /** null = all difficulties. */
  difficulty: Difficulty | null;
};

/** Apply search query, seen/pending, category and difficulty together. */
export function filterAnimals(
  animals: Animal[],
  { query, filter, category, difficulty }: CatalogueFilters,
  seenState: SeenState,
): Animal[] {
  return animals.filter(
    (a) =>
      matchesQuery(a, query) &&
      matchesFilter(a, filter, seenState) &&
      (category === "" || (a.category ?? UNCATEGORISED) === category) &&
      (difficulty === null || difficultyOf(a.id) === difficulty),
  );
}

/** Count of animals marked as seen (only those still in the catalogue). */
export function countSeen(animals: Animal[], seenState: SeenState): number {
  return animals.reduce(
    (n, a) => n + (seenState[a.id]?.seen ? 1 : 0),
    0,
  );
}
