# Namibia Wildlife 🦌

Offline-first naturalist field guide for a trip to Namibia. A fixed catalogue of
~40-50 animals — each with a cut-out illustration, where to see it in Namibia,
and a few fun facts — with search by name and a "seen" check. Styled as a
classic Audubon-style natural-history plate.

Two ways to browse: the **Catálogo** (search + grid) and an illustrated **Mapa**
of Namibia's seven main wildlife regions. Each region is a clickable polygon over
the artwork (keyboard-navigable); opening one shows its climate and terrain, then
the animals you can expect there ordered from easiest to hardest to spot, with
filters by animal type and by spotting difficulty.

- Region shapes, climate/terrain text and the region→animal mapping live in
  `src/data/zones.ts`.
- Per-animal spotting difficulty lives in `src/data/difficulty.ts`.
- Pure helpers (grouping, filtering, lookups) and their tests are in
  `src/lib/zones.ts`.
- The climate/terrain text, the region→animal mapping and the difficulty ratings
  are backed by public sources documented in
  [`docs/zone-sources.md`](docs/zone-sources.md) (official Namibian sources first).

Built to work **fully offline** (installable PWA) so it keeps working in the
parks where there's no signal. The seen-state is stored on the device, with an
export/import backup so nothing gets lost.

## Stack

- Vite + React + TypeScript
- PWA via `vite-plugin-pwa` (Workbox) — full offline precache
- Self-hosted serif fonts (Cinzel + EB Garamond) via `@fontsource`
- Deployed to GitHub Pages

## Develop

```bash
npm install
npm run dev      # local dev server
npm test         # run the unit tests (pure search & storage logic)
npm run build    # production build into dist/
```

## Deploy

Pushing to `main` runs the tests and publishes to GitHub Pages
(`.github/workflows/deploy.yml`). Enable Pages → "GitHub Actions" in the repo
settings once.

The app is served from `/<repo>/`, configured via `base` in `vite.config.ts`.

## Adding the real animals

The catalogue lives in `src/data/animals.ts` (currently sample entries).

1. Drop each cut-out image (ideally a transparent-background PNG) into
   `src/assets/animals/`.
2. Import it in `animals.ts` and add the entry: `commonName`, optional
   `scientificName`, `whereToSee[]`, `funFacts[]`.

The catalogue is part of the source, so it's bundled into the app and can never
be lost.

## Design spec

See [`docs/specs/2026-06-21-namibia-wildlife-design.md`](docs/specs/2026-06-21-namibia-wildlife-design.md).
