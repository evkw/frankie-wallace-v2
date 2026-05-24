# Agent Notes

## Baseline
- This repo is a single Astro 5 site (not a monorepo) with Tailwind via Vite plugin; core config is in `astro.config.mjs` and `src/content.config.ts`.
- Ignore `README.md` for project setup decisions: it is mostly Astro starter text plus script notes; prefer `package.json` scripts and actual page/content code.

## Commands You Can Actually Run
- Install deps: `npm install`
- Dev server: `npm run dev`
- Production build: `npm run build`
- Preview build: `npm run preview`
- Astro CLI passthrough (including checks): `npm run astro -- <command>` (example: `npm run astro -- check`)
- There are no dedicated `test`, `lint`, or `typecheck` npm scripts right now; do not assume they exist.

## Content + Routing Coupling
- Gallery and blog routes are static-generated from Astro content collections (`getCollection` + `getStaticPaths` in `src/pages/gallery/*`, `src/pages/gallery-item/*`, `src/pages/journal/*`).
- Gallery category values are strict and must stay aligned across schema + routes: `childrensBooks`, `venues`, `surfacePattern` (see `src/content.config.ts` and `src/pages/gallery/[category].astro`).
- Gallery item pages expect JSON files under `src/data/gallery/*.json`; sample portfolio expects `src/data/sample-portfolio/sample-portfolio.json`.

## Data/Asset Generation Scripts
- `scripts/prepare-images.js` converts source images to `public/images/{id}/` and writes a gallery JSON record to `src/data/gallery/{id}.json`.
- `scripts/add-samples.js` appends converted images to `public/images/sample-portfolio/` and appends entries in `src/data/sample-portfolio/sample-portfolio.json` (it does not replace existing entries).
- Both scripts require `sharp` and accept positional input path plus `--key=value` options; run with `node scripts/<script>.js ...`.

## Behavior Quirks Worth Preserving
- Protected gallery access is client-gated via `localStorage.isMember === "true"`; non-members are redirected to `/password` from gallery list/detail pages.
- `Layout.astro` injects Google Analytics only in production (`import.meta.env.PROD`) but always injects Flodesk script; keep this split intact unless explicitly changing tracking/newsletter behavior.
