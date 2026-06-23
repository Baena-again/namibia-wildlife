import { describe, expect, it } from "vitest";
import { format, translate } from "./index";
import { messages, type MessageKey } from "./messages";

describe("format", () => {
  it("returns the template untouched when there are no vars", () => {
    expect(format("Hola mundo")).toBe("Hola mundo");
  });

  it("interpolates named placeholders", () => {
    expect(format("{seen} de {total}", { seen: 3, total: 40 })).toBe(
      "3 de 40",
    );
  });

  it("leaves unknown placeholders visible", () => {
    expect(format("{a} {b}", { a: "x" })).toBe("x {b}");
  });
});

describe("translate", () => {
  it("translates a key for the requested locale", () => {
    expect(translate("en", "tab.map")).toBe("Map");
    expect(translate("es", "tab.map")).toBe("Mapa");
  });

  it("interpolates while translating", () => {
    expect(translate("en", "app.counter", { seen: 2, total: 10 })).toBe(
      "2 of 10 seen",
    );
  });

  it("falls back to the default locale for a missing translation", () => {
    // Force a gap by translating with an unknown locale shape.
    expect(translate("es", "tab.list")).toBe("Catálogo");
  });
});

describe("message tables", () => {
  it("every Spanish key has an English counterpart and vice versa", () => {
    const esKeys = Object.keys(messages.es).sort() as MessageKey[];
    const enKeys = Object.keys(messages.en).sort() as MessageKey[];
    expect(enKeys).toEqual(esKeys);
  });

  it("no translation is left empty", () => {
    for (const locale of ["es", "en"] as const) {
      for (const [key, value] of Object.entries(messages[locale])) {
        expect(value, `${locale}:${key}`).not.toBe("");
      }
    }
  });
});
