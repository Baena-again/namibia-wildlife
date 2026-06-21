import type { SeenState, SeenRecord } from "../types";

const STORAGE_KEY = "namibia-wildlife:seen:v1";
const EXPORT_VERSION = 1;

export type BackupFile = {
  app: "namibia-wildlife";
  version: number;
  exportedAt: string;
  seen: SeenState;
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
export function buildBackup(state: SeenState, now: string): BackupFile {
  return {
    app: "namibia-wildlife",
    version: EXPORT_VERSION,
    exportedAt: now,
    seen: state,
  };
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
  return {
    app: "namibia-wildlife",
    version: Number((data as { version?: unknown }).version) || EXPORT_VERSION,
    exportedAt:
      typeof (data as { exportedAt?: unknown }).exportedAt === "string"
        ? (data as { exportedAt: string }).exportedAt
        : "",
    seen,
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
