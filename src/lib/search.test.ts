import { describe, it, expect } from "vitest";
import {
  normalize,
  matchesQuery,
  filterAnimals,
  countSeen,
} from "./search";
import type { Animal, SeenState } from "../types";

const animals: Animal[] = [
  { id: "lion", commonName: "León", scientificName: "Panthera leo", image: "", whereToSee: [], funFacts: [] },
  { id: "ele", commonName: "Elefante", scientificName: "Loxodonta africana", image: "", whereToSee: [], funFacts: [] },
  { id: "oryx", commonName: "Órix", image: "", whereToSee: [], funFacts: [] },
];

describe("normalize", () => {
  it("lowercases and strips accents", () => {
    expect(normalize("LeÓn")).toBe("leon");
    expect(normalize("  Órix ")).toBe("orix");
  });
});

describe("matchesQuery", () => {
  it("matches accent-insensitively on common name", () => {
    expect(matchesQuery(animals[0], "leon")).toBe(true);
    expect(matchesQuery(animals[0], "LEÓN")).toBe(true);
  });
  it("matches on scientific name", () => {
    expect(matchesQuery(animals[1], "loxodonta")).toBe(true);
  });
  it("empty query matches everything", () => {
    expect(matchesQuery(animals[2], "")).toBe(true);
  });
  it("does not match unrelated text", () => {
    expect(matchesQuery(animals[0], "jirafa")).toBe(false);
  });
});

describe("filterAnimals", () => {
  const seen: SeenState = { lion: { seen: true }, ele: { seen: false } };

  it("filters by seen", () => {
    const r = filterAnimals(animals, "", "seen", seen);
    expect(r.map((a) => a.id)).toEqual(["lion"]);
  });
  it("filters by pending (missing record counts as pending)", () => {
    const r = filterAnimals(animals, "", "pending", seen);
    expect(r.map((a) => a.id)).toEqual(["ele", "oryx"]);
  });
  it("combines query and filter", () => {
    const r = filterAnimals(animals, "ele", "pending", seen);
    expect(r.map((a) => a.id)).toEqual(["ele"]);
  });
  it("'all' returns everything regardless of seen", () => {
    expect(filterAnimals(animals, "", "all", seen)).toHaveLength(3);
  });
});

describe("countSeen", () => {
  it("counts only animals still in the catalogue", () => {
    const seen: SeenState = { lion: { seen: true }, ghost: { seen: true } };
    expect(countSeen(animals, seen)).toBe(1);
  });
});
