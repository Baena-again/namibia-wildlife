export type Animal = {
  id: string;
  /** Common name — rendered in small-caps. */
  commonName: string;
  /** Scientific name — always rendered in italic. May be unknown for now. */
  scientificName?: string;
  /** Bundled image asset URL (resolved at build time). */
  image: string;
  /** Plate/category from the source presentation. */
  category?: string;
  /** Where to see it in Namibia: parks / regions. */
  whereToSee: string[];
  /** A few fun facts. */
  funFacts: string[];
};

/** Per-animal seen state, persisted on the device. */
export type SeenRecord = {
  seen: boolean;
  /** ISO timestamp of when it was marked seen. */
  seenAt?: string;
};

export type SeenState = Record<string, SeenRecord>;

export type FilterMode = "all" | "seen" | "pending";

/** The seven main wildlife regions of Namibia used by the map. */
export type ZoneId =
  | "etosha"
  | "kaokoland"
  | "zambezi"
  | "costa"
  | "namib"
  | "central"
  | "kalahari";

export type Zone = {
  id: ZoneId;
  /** Full name, shown as the heading. */
  name: string;
  /** Short label drawn on the map. */
  short: string;
  /** Where it is, in plain words (e.g. "Noroeste"). */
  region: string;
  /** One-line description shown under the heading. */
  blurb: string;
  /** Pin position inside the map's SVG viewBox. */
  x: number;
  y: number;
  /** Text-anchor for the map label. */
  labelAnchor: "start" | "middle" | "end";
  /** Vertical offset of the map label from the pin. */
  labelDy: number;
};

/** A group of animals sharing the same `category`, for the zone view. */
export type CategoryGroup = {
  category: string;
  animals: Animal[];
};
