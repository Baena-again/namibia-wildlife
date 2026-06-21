import type { Animal, CategoryGroup, SeenState, Zone, ZoneId } from "../types";
import { zones, zoneAnimalIds } from "../data/zones";

const UNCATEGORISED = "Otros";

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
