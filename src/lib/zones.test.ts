import { describe, it, expect } from "vitest";
import {
  getZone,
  getZoneAnimals,
  zonesForAnimal,
  groupByCategory,
  countZoneSeen,
} from "./zones";
import { zones, zoneAnimalIds } from "../data/zones";
import { animals } from "../data/animals";
import type { Animal, SeenState, ZoneId } from "../types";

const sample: Animal[] = [
  { id: "lion", commonName: "León", image: "", category: "Felinos", whereToSee: [], funFacts: [] },
  { id: "oryx", commonName: "Órix", image: "", category: "Herbívoros", whereToSee: [], funFacts: [] },
  { id: "kudu", commonName: "Kudu", image: "", category: "Herbívoros", whereToSee: [], funFacts: [] },
  { id: "ghost", commonName: "Cangrejo", image: "", whereToSee: [], funFacts: [] },
];

describe("groupByCategory", () => {
  it("groups by category preserving first-seen order", () => {
    const groups = groupByCategory(sample);
    expect(groups.map((g) => g.category)).toEqual([
      "Felinos",
      "Herbívoros",
      "Otros",
    ]);
    expect(groups[1].animals.map((a) => a.id)).toEqual(["oryx", "kudu"]);
  });

  it("falls back to 'Otros' when category is missing", () => {
    const groups = groupByCategory([sample[3]]);
    expect(groups[0].category).toBe("Otros");
  });
});

describe("getZoneAnimals", () => {
  it("returns animals in catalogue order, not the order listed in the zone", () => {
    const etosha = getZoneAnimals("etosha", animals);
    const ids = etosha.map((a) => a.id);
    const catalogueOrder = animals.map((a) => a.id).filter((id) => ids.includes(id));
    expect(ids).toEqual(catalogueOrder);
  });

  it("only returns animals that exist in the catalogue", () => {
    const ids = new Set(animals.map((a) => a.id));
    for (const a of getZoneAnimals("costa", animals)) {
      expect(ids.has(a.id)).toBe(true);
    }
  });
});

describe("zone data integrity", () => {
  it("has exactly seven zones with matching id lists", () => {
    expect(zones).toHaveLength(7);
    for (const z of zones) {
      expect(Array.isArray(zoneAnimalIds[z.id])).toBe(true);
    }
  });

  it("every zone references only real animal ids", () => {
    const ids = new Set(animals.map((a) => a.id));
    for (const z of zones) {
      for (const animalId of zoneAnimalIds[z.id]) {
        expect(ids.has(animalId), `${animalId} in ${z.id}`).toBe(true);
      }
    }
  });

  it("no duplicate ids within a single zone", () => {
    for (const z of zones) {
      const list = zoneAnimalIds[z.id];
      expect(new Set(list).size).toBe(list.length);
    }
  });

  it("every animal in the catalogue belongs to at least one zone", () => {
    const assigned = new Set<string>();
    for (const id of Object.keys(zoneAnimalIds) as ZoneId[]) {
      for (const animalId of zoneAnimalIds[id]) assigned.add(animalId);
    }
    const orphans = animals.filter((a) => !assigned.has(a.id)).map((a) => a.id);
    expect(orphans).toEqual([]);
  });
});

describe("zonesForAnimal", () => {
  it("returns every zone an animal appears in", () => {
    const result = zonesForAnimal("african-elephant").map((z) => z.id).sort();
    expect(result).toEqual(["etosha", "kaokoland", "zambezi"]);
  });

  it("returns an empty array for an unknown animal", () => {
    expect(zonesForAnimal("not-a-real-animal")).toEqual([]);
  });
});

describe("getZone", () => {
  it("finds a zone by id", () => {
    expect(getZone("namib")?.short).toBe("Namib");
  });
});

describe("countZoneSeen", () => {
  it("counts only seen animals within the zone", () => {
    const seen: SeenState = { lion: { seen: true }, springbok: { seen: false } };
    expect(countZoneSeen("etosha", animals, seen)).toBe(1);
  });
});
