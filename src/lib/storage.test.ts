import { describe, it, expect } from "vitest";
import {
  toggleSeen,
  buildBackup,
  mergeBackup,
  parseBackup,
} from "./storage";
import type { SeenState } from "../types";

const NOW = "2026-06-21T10:00:00.000Z";

describe("toggleSeen", () => {
  it("marks an unseen animal as seen with a timestamp", () => {
    const next = toggleSeen({}, "lion", NOW);
    expect(next.lion).toEqual({ seen: true, seenAt: NOW });
  });
  it("unmarks a seen animal and drops the timestamp", () => {
    const next = toggleSeen({ lion: { seen: true, seenAt: NOW } }, "lion", NOW);
    expect(next.lion).toEqual({ seen: false });
  });
  it("does not mutate the input", () => {
    const state: SeenState = { lion: { seen: false } };
    toggleSeen(state, "lion", NOW);
    expect(state.lion).toEqual({ seen: false });
  });
});

describe("buildBackup / parseBackup round-trip", () => {
  it("round-trips state through JSON", () => {
    const state: SeenState = { lion: { seen: true, seenAt: NOW } };
    const json = JSON.stringify(buildBackup(state, NOW));
    const parsed = parseBackup(json);
    expect(parsed.seen).toEqual(state);
    expect(parsed.app).toBe("namibia-wildlife");
  });
});

describe("parseBackup validation", () => {
  it("rejects invalid JSON", () => {
    expect(() => parseBackup("{not json")).toThrow();
  });
  it("rejects JSON from another app", () => {
    expect(() => parseBackup(JSON.stringify({ app: "other", seen: {} }))).toThrow();
  });
  it("drops malformed per-animal records", () => {
    const parsed = parseBackup(
      JSON.stringify({ app: "namibia-wildlife", seen: { lion: { seen: 1 }, bad: 42 } }),
    );
    expect(parsed.seen.lion).toEqual({ seen: true, seenAt: undefined });
    expect(parsed.seen.bad).toBeUndefined();
  });
});

describe("mergeBackup", () => {
  it("imported seen wins over local pending", () => {
    const current: SeenState = { lion: { seen: false } };
    const incoming: SeenState = { lion: { seen: true, seenAt: NOW } };
    expect(mergeBackup(current, incoming).lion).toEqual({ seen: true, seenAt: NOW });
  });
  it("keeps a local seen even if import is pending", () => {
    const current: SeenState = { ele: { seen: true, seenAt: NOW } };
    const incoming: SeenState = { ele: { seen: false } };
    expect(mergeBackup(current, incoming).ele.seen).toBe(true);
  });
  it("adds animals only present in the import", () => {
    expect(mergeBackup({}, { oryx: { seen: true } }).oryx.seen).toBe(true);
  });
});
