# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview
Premium tile brand website. Static Next.js 14 export with dark luxury aesthetic.
Design inspired by: Simpolo (minimalism) + Jaquar (typography/showcase) + Kajaria (structure/browsing).

## Tech Stack
- **Framework:** Next.js 14 (static export, `output: "export"`)
- **Language:** TypeScript (strict). Path alias `@/*` → `src/*`
- **Styling:** Tailwind CSS v4 (PostCSS-first — no `tailwind.config` file; config lives in `src/app/globals.css` `@theme` block + `postcss.config.mjs`)
- **Animation:** GSAP 3.12 (FREE tier only) + Lenis smooth scroll. Three.js / React Three Fiber components live in `src/components/three/` (MaterialShowcase, ParticleField, TileHero)
- **CMS:** Sanity v3 (headless, data fetched at build time)
- **Icons:** Lucide React
- **Utilities:** clsx + tailwind-merge (`cn()`); `xlsx` powers the Bulk Upload Studio tool
- **No test runner** is configured (no jest/vitest/playwright) — there are no tests to run
- ESLint runs via `next lint`, but `next.config.mjs` sets `eslint.ignoreDuringBuilds: true`, so builds never block on lint

## Commands
```bash
npm run dev          # Local dev server (localhost:3000)
npm run build        # Static export → ./out/ (auto-runs `prebuild` first via npm lifecycle hook)
npm run prebuild     # Fetch Sanity data → src/data/sanity-*.json (runs both generate scripts)
npm run lint         # ESLint (next lint)
npm run studio       # Sanity Studio dev (localhost:3333)
npm run deploy-studio # sanity deploy → *.sanity.studio (see Deployment note re: self-hosted SCP)
```
> `prebuild` is an npm lifecycle hook — `npm run build` runs it automatically. Run it standalone only to refresh `src/data/sanity-*.json` without a full build.

## Deployment
Staging (dev-primetiles.zunkireelabs.com) was decommissioned 2026-07-31 — no more pre-prod environment, `main` deploys straight to prod.
- **Production** (`deploy-prod.yml`): push to `main` branch (or manual `workflow_dispatch`), gated by `production` environment → GitHub Actions builds the static export and force-pushes it to the `prod-dist` branch → an on-box cron on the cPanel host (`rara.hosting.nom`, `*/10 * * * *`, `~/deploy/cpanel-pull.sh`) pulls `prod-dist` and publishes it live at primeceramics.com.np. cPanel blocks inbound SSH from datacenter IPs, so GH Actions cannot push directly — deploys land within ~10 min of the workflow finishing, not instantly. Manual force: `ssh primeceramics@27.111.18.110 'bash ~/deploy/cpanel-pull.sh'`.
- **Sanity Webhook** (`sanity-webhook-rebuild.yml`): `repository_dispatch` (`sanity-content-updated`) re-runs the production build/publish when content is published
- **Sanity Studio:** the project self-hosts Studio at studio.primeceramics.com.np via `npx sanity build` + SCP of `dist/` (NOT `npm run deploy-studio`, which targets Sanity's hosted `*.sanity.studio`)

```bash
# Redeploy self-hosted Studio (cPanel server: rara.hosting.nom, user: primeceramics)
npx sanity build && scp -r dist/* primeceramics@27.111.18.110:/home/primeceramics/public_html/studio.primeceramics.com.np/
```
> After SCP, **clear the nginx cache** from cPanel (rara.hosting.nom:2083 → right sidebar → "Nginx Caching" → "Clear Cache"), then hard-refresh the Studio. Without this, cPanel's nginx serves stale cached Studio files.

## Architecture

### Data Flow
```
Sanity CMS → (prebuild scripts) → src/data/sanity-*.json → Next.js static export → ./out/
```
- All Sanity data is fetched at **build time** by `scripts/generate-catalog-data.ts` and `scripts/generate-sanity-data.ts`
- Data is saved as JSON files in `src/data/` which are imported by components
- Each data file has a **fallback pattern**: tries Sanity JSON first, falls back to local TypeScript data
- Sanity data with empty images is filtered out to prevent overriding local fallbacks with broken entries

### Sanity CMS
- **Project ID:** 3jv6o4t6, **Dataset:** production
- **Studio:** Standalone (not embedded in Next.js), runs via `sanity dev`
- **Schemas:** `src/sanity/schemas/` — tileProduct, tileCatalog, heroBanner, newsArticle, roomMockup, dealer, jobOpening, projectHighlight, testimonial
- **Desk structure:** `src/sanity/desk-structure.ts` — Products (by Size), Catalogs, Website Content, Operations
- **Plugins:** `src/sanity/plugins/bulk-upload/` — BulkUploadTool + BulkDeleteTool in Studio sidebar; uses `useClient()` hook (never hardcode write tokens)
- **Custom input:** `src/sanity/components/AuthenticatedImageInput.tsx` — compresses images client-side (canvas → JPEG ≤3000px, 88% quality) before calling `client.assets.upload()`. This is required because: (a) the built-in image input uses a cookie-based client that returns 503 from self-hosted studios, and (b) Sanity's image worker times out on large/raw files. Always use `useClient()` for uploads — never hardcode tokens.
- **Presentation tool:** Live preview showing prod site alongside editor
- **GROQ queries:** `src/lib/queries.ts`

### Product Data Pipeline
- **Catalog sizes:** 300×300, 300×450, 300×600, 400×400, 600×600, 600×1200 mm
- **Catalog IDs:** wall-300x450, wall-300x600, floor-300x300, vitrified-400x400, vitrified-600x600, eleganz-600x1200, spirit-of-nepal
- **Product grid:** Size is single-select (radio buttons), defaults to 600×1200mm
- **Grid columns:** 300×300/300×600→6cols, 300×450→4cols (landscape), 400×400→4cols, 600×600/600×1200→3cols
- **Card aspect ratio:** 300×450mm is LANDSCAPE (450:300), all others use physical w:h ratio. Applied everywhere via `tileAspectRatio()` and `tileImageFrameStyle()` in `src/lib/utils.ts`
- **Tile scaling system:** `--tile-base` CSS variable defines the pixel size of a 1200mm tile in a given context. `tileContainerWidth(size)` and `tileContainerHeight(size)` return `calc(var(--tile-base) * mm/1200)` expressions. Set `--tile-base` on a parent via `tileCardCSSVars()`.
- **Image rotation:** `imageRotation` field (0/90/180/270°) for landscape→portrait conversion
- **Gallery:** `hasGallery` toggle enables multiple images with labels (Mockup, Room Scene, Detail, etc.) and `showFirst` control
- **HL tiles** (highlighters) are visible in product grid and also shown in detail panel's Series Variants section
- **Art Panel tiles** (Thangka/Mithila Art) are hidden from product grid and CollectionsGrid
- **Smart size filter:** shows product count per size, greys out empty sizes, auto-switches when current size has zero results
- **Scoped filter options:** Category, Collection, Finish, Series options only show values that exist in the selected size; empty filter groups are hidden entirely
- **Spirit of Nepal** has a dedicated `/spirit-of-nepal` page

### CRM Integration
Lead forms post to an EdgeX CRM via `src/lib/leads.ts`. Requires env vars:
```
NEXT_PUBLIC_CRM_ENDPOINT       # General enquiry / quote form endpoint
NEXT_PUBLIC_CRM_API_KEY        # Shared API key
NEXT_PUBLIC_CATALOG_CRM_ENDPOINT  # Optional: separate catalog download endpoint (falls back to CRM_ENDPOINT)
NEXT_PUBLIC_CATALOG_CRM_API_KEY   # Optional: separate key (falls back to CRM_API_KEY)
```
`submitQuoteLead()` — contact/quote forms. `submitCatalogLead()` — catalogue download gate.

### Bulk Upload Scripts
```bash
# All-in-one: CSV + images → Sanity products
npx tsx scripts/bulk-upload.ts --csv products.csv --images ./photos --confirm

# Generate data from Sanity
source .env.local && export NEXT_PUBLIC_SANITY_PROJECT_ID NEXT_PUBLIC_SANITY_DATASET && npm run prebuild
```
CSV columns: `image_name, product_name, size, series, finish, tile_type (Wall/Floor/Both), category, spaces`

Other one-off scripts in `scripts/`: `attach-images-by-name.ts`, `remove-redundant-catalogs.ts`, `sanity-import-csv.ts`, `sanity-export-csv.ts`, `sanity-migrate.ts`, `sanity-link-images.ts`, `update-mockup-rooms.mjs`.

## Design System

### Color Tokens (defined in `src/app/globals.css` `@theme`)
- **Surfaces:** `--color-surface: #f7f4ef` · `--color-surface-alt: #ebe4d8` · `--color-surface-dark: #0f0c09`
- **Ink:** `--color-ink: #2b241c` · `--color-ink-light: #5e5650` · `--color-ink-muted: #6f6254` · `--color-ink-faint: #d5cfc6`
- **On-dark ink:** `--color-ink-on-dark: #e8dcc8` · `--color-ink-on-dark-light: #a89d8e`
- **Accent (gold):** `--color-accent: #b58a52` · `--color-accent-light: #d7b98a` · `--color-accent-hover: #c9a06a`
- **Brand red:** `--color-red: #D62027` · `--color-red-deep: #751115` — used for logo accent only, never for general UI
- **Legacy aliases:** `--bg`, `--bg-alt`, `--bg-dark`, `--ink`, `--ink-light`, `--accent`, etc. are backwards-compat CSS vars that map to the above tokens. New code should use `--color-*` / Tailwind `bg-surface`, `text-ink`, `text-accent`, etc.

### Typography & Spacing
- **Type:** `font-display` → Cormorant Garamond (weight 300) · `font-body` → Inter (weight 300)
- **Spacing tokens:** `--spacing-gutter: clamp(18px, 5vw, 56px)` · `--spacing-section: clamp(64px, 8vw, 112px)`
- **Animation tokens:** `--animate-duration-fast: 200ms` · `--animate-duration-base: 350ms` · `--animate-duration-slow: 600ms`
- **Transitions:** 0.3s linear only — no bouncy easing
- **Buttons:** Text-link style CTAs (`.link-arrow`), filled buttons used sparingly

## Data Layer
All site content is centralized in `src/data/`:
```
src/data/
├── types.ts          — TypeScript interfaces for all data
├── catalog/          — Product catalog (types, index, sanity-products.json, local fallbacks per size)
├── collections.ts    — Tile collections, productCategories (with optional sizeFilter/seriesFilter), browseData
├── spaces.ts         — Room/space definitions used by FindBySpace accordion
├── hero.ts           — Hero slides (Sanity → local fallback)
├── news.ts           — Press coverage
├── projects.ts       — Project case studies
├── testimonials.ts   — Customer testimonials
├── dealers.ts        — Dealer locations
├── catalogs.ts       — Catalog entries (PDF downloads)
├── careers.ts        — Job openings
├── navigation.ts     — Nav items, mega menu, footer
├── about.ts          — Vision, mission, milestones, certifications
├── spirit.ts         — Spirit of Nepal showcase items
└── index.ts          — Re-exports everything
```
**Rule:** Never hardcode data in components. Always import from `src/data/`.

`ProductCategory` in `collections.ts` supports three optional routing fields: `seriesFilter` (links to `?series=`), `sizeFilter` (links to `?size=`), `categoryFilter` fallback (links to `?category=`). Priority: `sizeFilter` → `seriesFilter` → category name.

## App Routes
`src/app/` pages: `/` (home), `/products` (ProductsBrowser with URL-param filters), `/catalog`, `/spirit-of-nepal`, `/about`, `/dealers`, `/careers`, `/news`, `/projects`, `/resources`, `/services`, `/csr`, `/calculator`, `/tile-scale`, `/privacy`, `/terms`

## Important Rules
- GSAP: FREE tier only — no Club plugins
- Images: unoptimized (static export) — use pre-optimized assets
- NEVER deploy to production unless explicitly asked
- NEVER hardcode colors — always use CSS variables (`--color-*` preferred, legacy `--ink`/`--accent` aliases acceptable)
- Transitions: 0.3s linear only
- Sanity data fallback: always filter out entries with empty images before using Sanity data
- Product grid: size is single-select, defaults to 600×1200mm, Art Panels hidden
- When rebuilding Sanity Studio: `npx sanity build` then SCP `dist/` contents to `studio.primeceramics.com.np`

## URLs
- **Production:** https://primeceramics.com.np
- **Sanity Studio:** https://studio.primeceramics.com.np
- **Sanity Dashboard:** https://manage.sanity.io (project: 3jv6o4t6)
