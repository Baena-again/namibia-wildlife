import { describe, it, expect } from "vitest";
import {
  getZone,
  getZoneAnimals,
  zonesForAnimal,
  groupByCategory,
  countZoneSeen,
  categoriesOf,
  sortByDifficulty,
  groupByDifficulty,
  filterZoneAnimals,
  difficultyOf,
  DIFFICULTY_ORDER,
} from "./zones";
import { zones, zoneAnimalIds } from "../data/zones";
import { animalDifficulty } from "../data/difficulty";
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

describe("difficulty", () => {
  it("reads an animal's difficulty and defaults to media", () => {
    expect(difficultyOf("african-elephant")).toBe("facil");
    expect(difficultyOf("leopard")).toBe("dificil");
    expect(difficultyOf("not-a-real-animal")).toBe("media");
  });

  it("every catalogue animal has an explicit difficulty", () => {
    const missing = animals
      .filter((a) => !(a.id in animalDifficulty))
      .map((a) => a.id);
    expect(missing).toEqual([]);
  });

  it("every difficulty value is a valid level", () => {
    for (const level of Object.values(animalDifficulty)) {
      expect(DIFFICULTY_ORDER).toContain(level);
    }
  });
});

describe("sortByDifficulty", () => {
  it("orders from easiest to hardest and does not mutate the input", () => {
    const input = getZoneAnimals("etosha", animals);
    const sorted = sortByDifficulty(input);
    const rank = (a: Animal) => DIFFICULTY_ORDER.indexOf(difficultyOf(a.id));
    for (let i = 1; i < sorted.length; i++) {
      expect(rank(sorted[i])).toBeGreaterThanOrEqual(rank(sorted[i - 1]));
    }
    expect(input).not.toBe(sorted);
  });
});

describe("groupByDifficulty", () => {
  it("returns groups in easy→hard order and skips empty ones", () => {
    const groups = groupByDifficulty(getZoneAnimals("etosha", animals));
    const order = groups.map((g) => g.difficulty);
    expect(order).toEqual(["facil", "media", "dificil"]);
    for (const g of groups) expect(g.animals.length).toBeGreaterThan(0);
  });

  it("omits a difficulty with no animals", () => {
    const onlyEasy: Animal[] = [
      { id: "giraffe", commonName: "Giraffe", image: "", whereToSee: [], funFacts: [] },
    ];
    expect(groupByDifficulty(onlyEasy).map((g) => g.difficulty)).toEqual(["facil"]);
  });
});

describe("categoriesOf", () => {
  it("lists distinct categories in catalogue order", () => {
    const cats = categoriesOf(getZoneAnimals("costa", animals));
    expect(cats).toContain("Especies costeras");
    expect(new Set(cats).size).toBe(cats.length);
  });
});

describe("filterZoneAnimals", () => {
  const zoneAnimals = getZoneAnimals("etosha", animals);

  it("no filters returns everything", () => {
    expect(filterZoneAnimals(zoneAnimals, "", null)).toHaveLength(zoneAnimals.length);
  });

  it("filters by category", () => {
    const r = filterZoneAnimals(zoneAnimals, "Aves", null);
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((a) => a.category === "Aves")).toBe(true);
  });

  it("filters by difficulty", () => {
    const r = filterZoneAnimals(zoneAnimals, "", "facil");
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((a) => difficultyOf(a.id) === "facil")).toBe(true);
  });

  it("combines both filters", () => {
    const r = filterZoneAnimals(zoneAnimals, "Aves", "facil");
    expect(r.every((a) => a.category === "Aves" && difficultyOf(a.id) === "facil")).toBe(true);
  });
});

describe("zone polygons", () => {
  it("every zone has a polygon with at least three points in range", () => {
    for (const z of zones) {
      expect(z.polygon.length).toBeGreaterThanOrEqual(3);
      for (const [x, y] of z.polygon) {
        expect(x).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThanOrEqual(100);
        expect(y).toBeGreaterThanOrEqual(0);
        expect(y).toBeLessThanOrEqual(100);
      }
    }
  });
});
