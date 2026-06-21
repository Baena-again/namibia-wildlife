export type Animal = {
  id: string;
  /** Common name in Spanish — the primary label, rendered in small-caps. */
  commonName: string;
  /** Common name in English — shown as a secondary label. */
  commonNameEn?: string;
  /** Scientific name — always rendered in italic. May be unknown for now. */
  scientificName?: string;
  /** Bundled image asset URL (resolved at build time). */
  image: string;
  /** Plate/category from the source presentation. */
  category?: string;
  /** A short description of the animal. */
  description?: string;
  /** How to tell it apart from similar-looking species. */
  distinguish?: string;
  /** Practical tips for actually spotting it in the field. */
  spottingTips?: string;
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

/** Per-day free-text journal notes, keyed by itinerary day id. Persisted. */
export type JournalState = Record<string, string>;

export type FilterMode = "all" | "seen" | "pending";

/** How hard the animal is to actually spot on a trip. */
export type Difficulty = "facil" | "media" | "dificil";

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
  /** One-line general description shown under the heading. */
  blurb: string;
  /** Short note on the climate. */
  climate: string;
  /** Short note on the terrain / characteristics. */
  terrain: string;
  /**
   * Clickable area over the map image, as `[x, y]` points in percentages of
   * the image width / height (so it scales with any display size).
   */
  polygon: [number, number][];
};

/** A group of animals sharing the same `category`, for the zone view. */
export type CategoryGroup = {
  category: string;
  animals: Animal[];
};

/** A group of animals sharing the same spotting difficulty. */
export type DifficultyGroup = {
  difficulty: Difficulty;
  label: string;
  animals: Animal[];
};
