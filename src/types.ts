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
