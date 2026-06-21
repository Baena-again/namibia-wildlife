import type {
  SeenState,
  SeenRecord,
  JournalState,
  ShoppingState,
} from "../types";

const STORAGE_KEY = "namibia-wildlife:seen:v1";
const JOURNAL_KEY = "namibia-wildlife:journal:v1";
const SHOPPING_KEY = "namibia-wildlife:shopping:v1";
const EXPORT_VERSION = 1;

export type BackupFile = {
  app: "namibia-wildlife";
  version: number;
  exportedAt: string;
  seen: SeenState;
  /** Trip logbook notes; absent in older backups. */
  journal: JournalState;
  /** Checked shopping-list items; absent in older backups. */
  shopping: ShoppingState;
};

/* ----------------------------- pure logic ----------------------------- */

/** Flip an animal's seen state, stamping seenAt when it becomes seen. */
export function toggleSeen(
  state: SeenState,
  id: string,
  now: string,
): SeenState {
  const current = state[id]?.seen ?? false;
  const next: SeenRecord = current
    ? { seen: false }
    : { seen: true, seenAt: now };
  return { ...state, [id]: next };
}

/** Build the JSON-serializable backup payload. */
export function buildBackup(
  state: SeenState,
  journal: JournalState,
  shopping: ShoppingState,
  now: string,
): BackupFile {
  return {
    app: "namibia-wildlife",
    version: EXPORT_VERSION,
    exportedAt: now,
    seen: state,
    journal,
    shopping,
  };
}

/** Merge imported shopping checks; a locally-known item keeps its own value. */
export function mergeShopping(
  current: ShoppingState,
  incoming: ShoppingState,
): ShoppingState {
  const merged: ShoppingState = { ...current };
  for (const [key, checked] of Object.entries(incoming)) {
    if (!(key in merged)) merged[key] = checked;
  }
  return merged;
}

/**
 * Merge imported journal notes into the current ones. To avoid clobbering
 * notes typed on this device, an imported note only fills a day that is
 * currently empty.
 */
export function mergeJournal(
  current: JournalState,
  incoming: JournalState,
): JournalState {
  const merged: JournalState = { ...current };
  for (const [id, text] of Object.entries(incoming)) {
    if (!merged[id]?.trim() && text?.trim()) merged[id] = text;
  }
  return merged;
}

/** Merge an imported backup into existing state (imported "seen" wins). */
export function mergeBackup(
  current: SeenState,
  incoming: SeenState,
): SeenState {
  const merged: SeenState = { ...current };
  for (const [id, rec] of Object.entries(incoming)) {
    const existing = merged[id];
    // Prefer a "seen" record; keep the earliest seenAt we know about.
    if (rec.seen || !existing) {
      merged[id] = {
        seen: rec.seen || (existing?.seen ?? false),
        seenAt: rec.seenAt ?? existing?.seenAt,
      };
    }
  }
  return merged;
}

/** Parse + validate raw JSON text from an imported file. Throws on garbage. */
export function parseBackup(raw: string): BackupFile {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    throw new Error("El archivo no es un JSON válido.");
  }
  if (
    typeof data !== "object" ||
    data === null ||
    (data as { app?: unknown }).app !== "namibia-wildlife" ||
    typeof (data as { seen?: unknown }).seen !== "object" ||
    (data as { seen?: unknown }).seen === null
  ) {
    throw new Error("No parece una copia de seguridad de Namibia Wildlife.");
  }
  const seenRaw = (data as { seen: Record<string, unknown> }).seen;
  const seen: SeenState = {};
  for (const [id, value] of Object.entries(seenRaw)) {
    if (value && typeof value === "object" && "seen" in value) {
      const v = value as { seen?: unknown; seenAt?: unknown };
      seen[id] = {
        seen: Boolean(v.seen),
        seenAt: typeof v.seenAt === "string" ? v.seenAt : undefined,
      };
    }
  }
  const journalRaw = (data as { journal?: unknown }).journal;
  const journal: JournalState = {};
  if (journalRaw && typeof journalRaw === "object") {
    for (const [id, value] of Object.entries(
      journalRaw as Record<string, unknown>,
    )) {
      if (typeof value === "string") journal[id] = value;
    }
  }
  const shoppingRaw = (data as { shopping?: unknown }).shopping;
  const shopping: ShoppingState = {};
  if (shoppingRaw && typeof shoppingRaw === "object") {
    for (const [key, value] of Object.entries(
      shoppingRaw as Record<string, unknown>,
    )) {
      if (typeof value === "boolean") shopping[key] = value;
    }
  }
  return {
    app: "namibia-wildlife",
    version: Number((data as { version?: unknown }).version) || EXPORT_VERSION,
    exportedAt:
      typeof (data as { exportedAt?: unknown }).exportedAt === "string"
        ? (data as { exportedAt: string }).exportedAt
        : "",
    seen,
    journal,
    shopping,
  };
}

/* --------------------------- side effects ----------------------------- */

export function loadSeen(): SeenState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as SeenState) : {};
  } catch {
    return {};
  }
}

/** Persist state. Returns false if storage is unavailable. */
export function saveSeen(state: SeenState): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function loadJournal(): JournalState {
  try {
    const raw = localStorage.getItem(JOURNAL_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object"
      ? (parsed as JournalState)
      : {};
  } catch {
    return {};
  }
}

/** Persist the trip logbook notes. Returns false if storage is unavailable. */
export function saveJournal(state: JournalState): boolean {
  try {
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function loadShopping(): ShoppingState {
  try {
    const raw = localStorage.getItem(SHOPPING_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object"
      ? (parsed as ShoppingState)
      : {};
  } catch {
    return {};
  }
}

/** Persist the shopping checks. Returns false if storage is unavailable. */
export function saveShopping(state: ShoppingState): boolean {
  try {
    localStorage.setItem(SHOPPING_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}
