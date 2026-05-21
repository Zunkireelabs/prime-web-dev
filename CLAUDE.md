# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview
Premium tile brand website. Static Next.js 14 export with dark luxury aesthetic.
Design inspired by: Simpolo (minimalism) + Jaquar (typography/showcase) + Kajaria (structure/browsing).

## Tech Stack
- **Framework:** Next.js 14 (static export, `output: "export"`)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4 + PostCSS
- **Animation:** GSAP 3.12 (FREE tier only) + Lenis smooth scroll
- **CMS:** Sanity v3 (headless, data fetched at build time)
- **Icons:** Lucide React
- **Utilities:** clsx + tailwind-merge

## Commands
```bash
npm run dev          # Local dev server (localhost:3000)
npm run build        # Static export → ./out/
npm run lint         # ESLint
npm run prebuild     # Fetch Sanity data → src/data/sanity-*.json
npm run studio       # Sanity Studio dev (localhost:3333)
npx sanity build     # Build Studio → ./dist/
```

## Deployment
- **Staging:** Push to `staging` branch triggers GitHub Actions → deploys to dev-primetiles.zunkireelabs.com
- **Production:** Manual workflow_dispatch → deploys to primeceramics.com.np
- **Sanity Studio:** Built static files deployed to studio.primeceramics.com.np via SCP
- **Sanity Webhook:** Auto-triggers staging rebuild when content is published in Sanity Studio

```bash
git push origin main:staging    # Deploy to staging
npx sanity build && scp ...     # Redeploy Studio (see deploy history)
```

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
- **Schemas:** `src/sanity/schemas/` — tileProduct, tileCatalog, heroBanner, newsArticle, etc.
- **Desk structure:** `src/sanity/desk-structure.ts` — Products (by Size), Catalogs, Website Content, Operations
- **Plugins:** `src/sanity/plugins/bulk-upload/` — custom Bulk Upload tool in Studio sidebar
- **Presentation tool:** Live preview showing staging site alongside editor
- **GROQ queries:** `src/lib/queries.ts`

### Product Data Pipeline
- **Catalog sizes:** 300×300, 300×450, 300×600, 400×400, 600×600, 600×1200 mm
- **Catalog IDs:** wall-300x450, wall-300x600, floor-300x300, vitrified-400x400, vitrified-600x600, eleganz-600x1200, spirit-of-nepal
- **Product grid:** Size is single-select (radio buttons), defaults to 600×1200mm
- **Grid columns scale with tile width:** 300mm→6cols, 400mm→4cols, 600mm→3cols
- **Card aspect ratio:** Physical tile proportions (300×300→1:1, 300×450→2:3, 600×1200→1:2)
- **Image rotation:** `imageRotation` field (0/90/180/270°) for landscape→portrait conversion
- **Gallery:** `hasGallery` toggle enables multiple images with labels (Mockup, Room Scene, Detail, etc.) and `showFirst` control
- **HL tiles** (highlighters) are hidden from product grid, shown in detail panel's Series Variants section
- **Art Panel tiles** (Thangka/Mithila Art) are hidden from product grid and CollectionsGrid
- **Spirit of Nepal** has a dedicated `/spirit-of-nepal` page

### Bulk Upload Scripts
```bash
# All-in-one: CSV + images → Sanity products
npx tsx scripts/bulk-upload.ts --csv products.csv --images ./photos --confirm

# Generate data from Sanity
source .env.local && export NEXT_PUBLIC_SANITY_PROJECT_ID NEXT_PUBLIC_SANITY_DATASET && npm run prebuild
```
CSV columns: `image_name, product_name, size, series, finish, tile_type (Wall/Floor/Both), category, spaces`

## Design System
- **Light-first**: Base bg `#FAFAF8`, alt `#F2F0EC`, dark `#1A1815`
- **Ink**: Primary `#3D3A36`, light `#7A7670`, muted `#B0ACA6` (never pure black)
- **Accent**: Warm sienna `#96704C` — used sparingly on hover/lines only
- **Type**: Cormorant Garamond (headings, weight 300) + Inter (body, weight 300)
- **Transitions**: 0.3s linear, no bouncy easing
- **Buttons**: Text-link style CTAs (`.link-arrow`), filled buttons used sparingly

## Data Layer
All site content is centralized in `src/data/`:
```
src/data/
├── types.ts          — TypeScript interfaces for all data
├── catalog/          — Product catalog (types, index, sanity-products.json, local fallbacks)
├── collections.ts    — Tile collections, product categories, browse data
├── hero.ts           — Hero slides (Sanity → local fallback)
├── news.ts           — Press coverage (Sanity → local fallback)
├── projects.ts       — Project case studies (Sanity → local fallback)
├── testimonials.ts   — Customer testimonials (Sanity → local fallback)
├── dealers.ts        — Dealer locations (Sanity → local fallback)
├── catalogs.ts       — Catalog entries (Sanity → local fallback)
├── careers.ts        — Job openings (Sanity → local fallback)
├── navigation.ts     — Nav items, mega menu, footer
├── about.ts          — Vision, mission, milestones, certifications
├── spirit.ts         — Spirit of Nepal showcase items
└── index.ts          — Re-exports everything
```
**Rule:** Never hardcode data in components. Always import from `src/data/`.

## Important Rules
- GSAP: FREE tier only — no Club plugins
- Images: unoptimized (static export) — use pre-optimized assets
- NEVER deploy to production unless explicitly asked
- NEVER hardcode colors — always use CSS variables
- Transitions: 0.3s linear only
- Sanity data fallback: always filter out entries with empty images before using Sanity data
- Product grid: size is single-select, defaults to 600×1200mm, HL tiles and Art Panels hidden
- When rebuilding Sanity Studio: `npx sanity build` then SCP `dist/` contents to `studio.primeceramics.com.np`

## URLs
- **Staging:** https://dev-primetiles.zunkireelabs.com
- **Production:** https://primeceramics.com.np
- **Sanity Studio:** https://studio.primeceramics.com.np
- **Sanity Dashboard:** https://manage.sanity.io (project: 3jv6o4t6)
