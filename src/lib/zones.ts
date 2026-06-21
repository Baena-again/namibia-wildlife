import type {
  Animal,
  CategoryGroup,
  Difficulty,
  DifficultyGroup,
  SeenState,
  Zone,
  ZoneId,
} from "../types";
import { zones, zoneAnimalIds } from "../data/zones";
import { animalDifficulty } from "../data/difficulty";

const UNCATEGORISED = "Otros";

/** Spotting difficulty from easiest to hardest. */
export const DIFFICULTY_ORDER: Difficulty[] = ["facil", "media", "dificil"];

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  facil: "Fácil de ver",
  media: "Con suerte",
  dificil: "Difícil de ver",
};

/** Spotting difficulty of an animal; defaults to "media" if unspecified. */
export function difficultyOf(animalId: string): Difficulty {
  return animalDifficulty[animalId] ?? "media";
}

export function getZone(id: ZoneId): Zone | undefined {
  return zones.find((z) => z.id === id);
}

/**
 * Animals expected in a zone, in the catalogue's own order (so the grouping
 * below stays stable regardless of how `zoneAnimalIds` was written).
 */
export function getZoneAnimals(zoneId: ZoneId, animals: Animal[]): Animal[] {
  const ids = new Set(zoneAnimalIds[zoneId] ?? []);
  return animals.filter((a) => ids.has(a.id));
}

/** All zones an animal belongs to — used to fill "Dónde verlo" on the detail. */
export function zonesForAnimal(animalId: string): Zone[] {
  return zones.filter((z) => (zoneAnimalIds[z.id] ?? []).includes(animalId));
}

/**
 * Group animals by their `category`, preserving the order in which each
 * category first appears in the given list.
 */
export function groupByCategory(animals: Animal[]): CategoryGroup[] {
  const groups: CategoryGroup[] = [];
  const byCategory = new Map<string, CategoryGroup>();
  for (const animal of animals) {
    const category = animal.category ?? UNCATEGORISED;
    let group = byCategory.get(category);
    if (!group) {
      group = { category, animals: [] };
      byCategory.set(category, group);
      groups.push(group);
    }
    group.animals.push(animal);
  }
  return groups;
}

/** Distinct categories present among the given animals, in catalogue order. */
export function categoriesOf(animals: Animal[]): string[] {
  const seen: string[] = [];
  for (const a of animals) {
    const c = a.category ?? UNCATEGORISED;
    if (!seen.includes(c)) seen.push(c);
  }
  return seen;
}

/** Sort a copy of the list from easiest to hardest to spot. */
export function sortByDifficulty(animals: Animal[]): Animal[] {
  const rank = (a: Animal) => DIFFICULTY_ORDER.indexOf(difficultyOf(a.id));
  return [...animals].sort((a, b) => rank(a) - rank(b));
}

/** Group animals by spotting difficulty, easiest first; skips empty groups. */
export function groupByDifficulty(animals: Animal[]): DifficultyGroup[] {
  return DIFFICULTY_ORDER.map((difficulty) => ({
    difficulty,
    label: DIFFICULTY_LABEL[difficulty],
    animals: animals.filter((a) => difficultyOf(a.id) === difficulty),
  })).filter((g) => g.animals.length > 0);
}

/**
 * Apply the zone view's two filters together: by animal category ("" = all)
 * and by spotting difficulty (null = all).
 */
export function filterZoneAnimals(
  animals: Animal[],
  category: string,
  difficulty: Difficulty | null,
): Animal[] {
  return animals.filter(
    (a) =>
      (category === "" || (a.category ?? UNCATEGORISED) === category) &&
      (difficulty === null || difficultyOf(a.id) === difficulty),
  );
}

/** How many animals of a zone are already marked as seen. */
export function countZoneSeen(
  zoneId: ZoneId,
  animals: Animal[],
  seenState: SeenState,
): number {
  return getZoneAnimals(zoneId, animals).reduce(
    (n, a) => n + (seenState[a.id]?.seen ? 1 : 0),
    0,
  );
}
