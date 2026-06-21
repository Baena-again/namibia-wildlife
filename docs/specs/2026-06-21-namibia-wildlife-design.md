# Namibia Wildlife — Design Spec

**Date:** 2026-06-21
**Status:** Approved

## Purpose

A small offline-first field-guide app for a trip to Namibia. It shows a fixed
catalogue of ~40-50 animals (name + photo extracted from a provided
presentation), with where to find each one in Namibia plus a few fun facts.
Users can search by name and mark each animal as "seen" (check). Everything must
work fully offline and the seen-state must not be lost.

## Requirements

- Fixed catalogue of ~40-50 Namibian animals. Source: a PPT/PDF presentation
  (name + cropped photo per animal extracted by the developer).
- Per-animal info (where to see it in Namibia, fun facts) is researched and
  filled in, then reviewed by the user.
- Search by common name.
- Mark each animal as seen/not seen (check), persisted on the device.
- 100% offline. No server. Each device is independent (no cross-device sync).
- The seen-state must survive — plus an export/import backup as a safety net.

## Architecture

- **Vite + React + TypeScript**, built to a static site.
- **PWA** (vite-plugin-pwa / Workbox) → installable, full offline via service
  worker precache.
- **GitHub Pages** hosting (free, fixed URL). Base path `/namibia-wildlife/`.
- Animal photos are **bundled** in the build (never depend on network).
- Fonts self-hosted via `@fontsource` (Cinzel, EB Garamond) → no CDN, true
  offline.

### Data model

```ts
type Animal = {
  id: string;
  commonName: string;        // shown in small-caps
  scientificName?: string;   // always italic
  image: string;             // bundled asset path
  whereToSee: string[];      // parks / regions in Namibia
  funFacts: string[];
};
```

- The catalogue lives in source (`src/data/animals.ts`) → part of the code,
  never lost.
- Seen-state lives in `localStorage` as `{ [animalId]: { seen, seenAt? } }`.

### Components / screens

- **AnimalGrid** (home): regular grid of cut-out animals on the ivory canvas.
  Search bar on top. Filter: All / Seen / Pending. Counter "23/47 seen".
- **AnimalDetail**: large illustration, where-to-see, fun facts, seen toggle.
- **Settings**: export backup (`.json` download) and import backup.

### Pure logic (unit-tested)

- `search.ts` — `filterAnimals(animals, query, filter, seenState)`.
- `storage.ts` — serialize/parse/merge of seen-state for export/import; toggle.

## Visual system — "naturalist plate / field guide"

Audubon / natural-history-museum-poster aesthetic.

- **Canvas:** warm uniform **ivory** background across the whole app. No cards,
  no borders, no boxes. Animals are **cut-outs** (transparent PNGs) on the ivory
  with a **soft shadow** beneath each. Regular grid.
- **Typography (all serif, zero sans-serif):**
  - **Cinzel**, uppercase → titles (the free "Trajan" of the plates).
  - **Small-caps** → labels and common name.
  - **EB Garamond** → body text.
  - Scientific name **always italic**.
- **Colour:** earthy, sober palette (ivory, sepia, olive, stone grey). Vivid
  colours only on purely decorative details. A single strong accent — a **muted
  terracotta** — reserved exclusively for the action state (the "seen" check).
- **Tone:** no gradients, glassmorphism, very rounded corners, modern coloured
  icons or energetic animations. Only **slow opacity transitions**, a
  contemplative mood, the interface almost invisible so the illustrations lead.
- **Sunlight legibility:** dark text, actionable elements a touch more
  contrasted so they read in bright sun.

### Image handling (decided once real photos are seen)

Ideally photos are transparent-background PNGs so animals sit "cut out" on the
ivory. If the PPT photos have backgrounds, options:
1. Remove background during processing (auto attempt; user reviews odd ones).
2. Show in a soft-edged vignette/oval (antique-plate style) if cropping is rough.

## Error handling / edge cases

- Image fails to load → placeholder silhouette.
- `localStorage` unavailable → soft notice; app still works (just won't remember
  checks).
- Invalid imported JSON → error message, nothing breaks.

## Testing

- Vitest for pure logic: search/filter, check toggle, export/import
  serialize/parse/merge. No tests for static text rendering.

## Work plan

1. Create the GitHub repo + base scaffold (this step). ✅
2. User provides the PPT/PDF → extract animals + photos.
3. Research "where to see + facts" per animal → user reviews.
4. Finish the app, publish to GitHub Pages, install on phones.
