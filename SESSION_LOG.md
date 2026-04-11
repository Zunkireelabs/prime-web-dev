# Prime Ceramics — Session Activity Log

> This file records every work session, changes made, and deployment history.
> Updated after each session by Claude Code.

---

## Session 1 — 2026-03-19
**Focus:** Initial project setup
**Commit:** `b234967`

- Scaffolded Next.js 14 static export project
- Set up Tailwind CSS v4, PostCSS, TypeScript strict
- Configured dark luxury theme foundation
- Added GSAP 3.12 + Lenis smooth scroll

---

## Session 2 — 2026-03-29
**Focus:** Complete site build + redesign
**Commits:** `fe898a9` → `01e2198`

- **`fe898a9`** — Complete site redesign: all pages (Home, Catalog, Dealers, About, Services), all sections, data layer, animations
- **`ad502eb`** — Performance: image optimization, bundle size, lazy loading
- **`d153f4f`** — Responsive: touch targets, breakpoints, mobile layouts
- **`48c30d9`** — SEO & a11y: metadata, structured data, keyboard nav, contrast
- **`29ff0a6`** — About page: premium luxury redesign with warm gold palette
- **`01e2198`** — Design system: reusable luxury tokens and components (Premium.tsx, globals.css)

---

## Session 3 — 2026-04-05 *(Today)*
**Focus:** Full site-wide spacing & consistency optimization for client showcase
**Deployed to:** https://dev-primetiles.zunkireelabs.com

### What was done:

#### Phase 1 — Site-Wide Spacing Standardization (50+ files, 200+ values)

All Tailwind spacing classes converted to mandatory inline styles per project rule.

**Spacing rhythm enforced across every section:**
| Element           | Standard Value |
|-------------------|---------------|
| Eyebrow → Heading | 16px          |
| Heading → Desc    | 24px          |
| Desc → Content    | 48px          |
| Header → Content  | 56–64px       |
| Section padding   | clamp(100px, 12vw, 180px) |
| Hero bottom pad   | clamp(80px, 8vw, 120px)   |
| Card gaps         | 24–32px       |
| Column gaps       | 40–56px       |

**Homepage (16 sections fixed):**
- HeroMain — eyebrow/heading/CTA spacing, bottom nav gap
- BrandIntro — expandable content margins, stats grid
- BrowseBy — tabs, eyebrow, bottom CTA
- FindBySpace — header, accordion, mobile carousel
- ProductShowcase — card tag/title/divider/description/CTA
- CollectionsGrid — category tabs, card margins, divider
- StatsBar — 8pt grid enforced (14px→16px, 10px→12px)
- SpiritSection — eyebrow, description, card spacing
- VirtualShowroom — heading, description, buttons, info grid
- ClientsSection — logo grid, bottom divider
- CTASection — contact strip reduced (80→64px), responsive mobile grid
- Testimonials — CSS var classes → inline clamp
- DealerNetwork, FactoryBanner, TextMarquee — minor fixes

**Header & Footer:**
- Header height: clamp(64px, 8vw, 88px) fluid scaling
- Nav gap, actions gap, mobile menu all inline
- Footer: responsive mobile grid (4→2→1 cols)

**Catalog Page (5 sections):**
- CatalogHero, CatalogStats, CatalogFilter, CatalogGrid, CatalogShowcase

**Dealers Page (3 sections):**
- DealersHero height standardized to match CatalogHero
- NepalMap hardcoded rgba → CSS variables

**About & Awards Pages (10+ components):**
- All 9 about sub-components fixed
- Awards page fully converted

**Services Page:**
- Main content padding to inline

**UI Components:**
- LoadingScreen, FloatingEnquiry, BackToTop

#### Phase 2 — Catalog Page Deep Polish

**CatalogHero — Major overhaul:**
- Image height: 65vh → 70vh (no more cut image)
- Object-position: `center 40%` (shows room properly)
- Image brightness: 0.55 → 0.65 (less muddy)
- Text opacity: white/65 → white/90 (fully readable now)
- Sub-text: white/35 → white/60
- Gradient strength doubled for contrast
- Added eyebrow decorative line + gold divider
- CTA: link-arrow → btn-gold (more prominent)
- Added warm accent glow

**CatalogStats — Redesigned:**
- Inline text → vertical stat numbers with serif font
- Added dividers between stats
- Warm ambient glow background
- More generous padding

**CatalogShowcase — Polished:**
- Added eyebrow decorative line (consistent pattern)
- Card hover zoom + overlay gradient
- Gold accent line on card hover
- Description color improved
- Header margin increased for breathing room

**CatalogFilter:**
- Sticky top matches dynamic header height
- Bottom border added

**CatalogGrid:**
- Unreliable section-pad class → inline padding

**Page Flow:**
- Added wave transitions before/after CatalogStats
- Added diagonal transition before CTA

### Build Result:
```
Route (app)                    Size     First Load JS
┌ ○ /                          6.14 kB  159 kB
├ ○ /about                     11 kB    164 kB
├ ○ /about/awards              14.3 kB  167 kB
├ ○ /catalog                   2.84 kB  153 kB
├ ○ /dealers                   32.3 kB  182 kB
└ ○ /services                  5.32 kB  155 kB
```
Zero build errors. Zero type errors. All 9 pages compiled.

### Deployments:
1. **12:12 PM** — Dev deploy after Phase 1 (full spacing fix)
2. **12:24 PM** — Dev deploy after Phase 2 (catalog page deep polish)

---

## Session 4 — 2026-04-10
**Focus:** Vitrified 400×400 catalog — reconciliation with real source folder + Sanity "hide don't delete" pattern

### Context
- Resumed on a fresh clone of the repo on a new Mac (previous machine unavailable).
- Inspected Sanity and found the `vitrified-400x400` catalog had **29 products**:
  - 7 real tiles with linked images (from Apr 9 work)
  - 22 "ghost" tiles from previous data extraction — names only, no images, no matching source files
- Client provided the actual 400×400 source folder (`/Prime Tiles/400X400 MM/`) containing **49 real tiles**: 27 top-level + 18 Outdoor Tiles + 4 Parking Tiles.
- Local data file (`vitrified-600x600.ts` patio/driveway sub-arrays) only matched 9 of the real source tiles — the rest were fabricated.

### Key decisions
- **"Hide, don't delete" policy** — tiles without images are preserved in Sanity with `hidden: true`. Client can later upload an image and uncheck "Hidden" in Studio. Zero data loss.
- **Never delete a tile that has an image**, even if it's not in the current source folder (Cosmic Beige kept as visible).
- **Split 400×400 into its own data file** — `src/data/catalog/vitrified-400x400.ts` with 11 series grouped by product family (Classic, Elite, Epoque, Intex, Monarch, Pedra, Plaster, Decorative, Zealdotted, Outdoor, Parking).
- Renamed `Zeal Dotted Brown` → `Zealdotted Brown` to match the source filename.

### What was done

**Local data / codebase**
- Created `src/data/catalog/vitrified-400x400.ts` — 49 tiles, 11 series.
- Cleaned `src/data/catalog/vitrified-600x600.ts` — removed 19 fake patio + 10 fake driveway sub-arrays; tightened the `tile()` helper signature. Now 78 real 600×600 entries, matching the `catalogs.ts` count.
- Updated `src/data/catalog/index.ts` to import `vitrified400x400`.
- Updated `src/data/catalogs.ts` — showcase count `29 designs` → `49 designs`.
- Updated `scripts/sanity-migrate.ts` — imports and spreads `vitrified400x400`.
- Created `public/images/catalog/vitrified-400x400/` with 49 JPGs (slug-normalized filenames).

**Sanity schema + site filter**
- Added `hidden: boolean` field to `tileProduct` schema with 🔒 preview badge.
- Updated `scripts/generate-catalog-data.ts` GROQ to `*[_type == "tileProduct" && !(hidden == true)]` — backward compatible since docs without the field are treated as visible.

**Tooling (new reusable scripts)**
- `scripts/sanity-inspect.ts` — read-only inventory tool (catalogs, product counts, image coverage, hidden state). Safe to run anytime.
- `scripts/sanity-reconcile-400x400.ts` — idempotent reconcile with `--dry-run` (default) and `--confirm`. Matches by normalized name, patches existing, creates net-new, hides orphans-without-images.

**Execution against Sanity**
- Dry-run reviewed, then executed with `--confirm`: **10 patched, 1 preserved visible, 18 hidden, 39 created**.
- Uploaded 49 images via `sanity-upload-images.ts --dir public/images/catalog/vitrified-400x400 --catalog vitrified-400x400 --resume`.
- Linked images via `sanity-link-images.ts` — 43 newly linked, 18 unmatched (the intentionally-hidden fake tiles).

### End state

**Sanity `vitrified-400x400`**: 68 total products
- **50 visible** (49 from the source folder + Cosmic Beige preserved) — all with images
- **18 hidden** (Plain White, Plain Ivory, Hexagon Grey Dry/Brown Mixed, Grey/Brown Crushed Coated, Ridge Petals Brown/Blue, Cobble Grey/Dark, Pebble Multi, Slate Rock, Cement Grey/Dark, Brick Mosaic, River Stone, Granite Grey/Dark) — preserved for client to add images later

**Other catalogs untouched**: wall-300x600 still has 74 linked images, everything else unchanged.

**Sanity totals**: 531 products, 124 with images (before session: 492 products, 81 with images).

**Build**: `npm run build` passes. Catalog page renders 50 tiles under the 400×400 size tab.

### Deployments
- **Local dev verified** on http://localhost:3001/catalog.
- **Dev server deploy**: not yet done in this session.

### Not done / TODO (Session 5+)
- Deploy to `dev-primetiles.zunkireelabs.com` (needs local docker context check first).
- Apply the same reconcile pattern to the other catalogs, one folder at a time: 300×600, 600×1200, Spirit of Nepal, 300×450 (when source becomes available).
- Decide whether to apply `hidden: true` globally to all no-image products across other catalogs.
- Untracked in-progress files (`src/app/products/`, `src/components/sections/Products*.tsx`, `src/components/ui/TileCard.tsx`, modifications to `Header.tsx`, `CatalogGrid.tsx`, `navigation.ts`) appear to be leftover from a previous session and are NOT committed as part of Session 4.

### Session 4 continued — Vitrified 600×600 reconciliation

Applied the CSV workflow to the 600×600 catalog as the second test case.

**Source folder layout** (`/Prime Tiles/tiles category and product /600X600 MM/`):
- Elegant Series — 28 files, **only 2 real products** (CEMENTO SLATE, CRYPTIC_PINK_ENDLESS). The other 26 are `600X600 NEW LAUNCH DESIGNS-01..26.png` — catalog spread pages, not individual product photos.
- Marble Series — 5 products
- Plain Series — 6 products
- Stone Series — 4 products
- Woody Series — 26 files (25 products + 1 garbage `600x600.jpg` placeholder)
- **Total real: 42 products** out of 69 files.

**Catalog-from-folder enhancements** (for this catalog and future ones):
- Added `SKIP_PATTERNS` to filter out non-product files (catalog spreads matching `NEW LAUNCH DESIGNS`, numeric-only filenames like `600x600.jpg`).
- Added `stripFolderSuffix()` to turn "Elegant Series" → "Elegant", "Woody Series" → "Woody", etc.
- Added heuristics for common look-based folder names: Wood Look, Stone Look, Marble Look, Monochrome, Vitrified.

**Reconcile result** (after one CSV typo fix: "Woody Imppression" → "Woody Impression"):
- **33 patched** (existing Sanity products updated to new series/category, set visible)
- **9 created** (Milky Crema, Echo Dark, Antiquity Natural/Pearl/base, 3D Gloss, Edged Wood Intence, Gingham Toss, Timbre Mat)
- **45 hidden** (Zotak/Dyna/Lenox/Smoky/Cloudy/Armani/Griege/Vinyl/Norwich/Eleganza Teak/Serendipity Multi/etc. — all preserved for client to add images later)
- **End state**: 42 visible + 45 hidden = 87 total in vitrified-600x600.

**Image pipeline notes**:
- Staging flow: `python3` script to copy 42 source images into `~/prime-tiles-staging/600x600/` with slug-normalized filenames before upload.
- `lavish-log.jpg` was 251 MB (10299×10299 CMYK) and hit Sanity's upload size limit (503). Resized the staged copy to 2400px / ~10 MB with `sips`. Original source file untouched.
- Sanity API returned transient 503s on several files during upload. Resolved by reducing `--batch` to 2 then 1 and retrying with `--resume`.

**Bug found + fixed in `sanity-link-images.ts`**:
- The fuzzy matcher was over-matching: `antiquity.jpg` linked to `Antiquity`, `Antiquity Multi`, and `Antiquity Biege` (it stripped the suffix and matched the stem). Same for `serendipity.jpg` → `Serendipity` and `Serendipity Multi`.
- The 3 mis-matched products (`Antiquity Multi`, `Antiquity Biege`, `Serendipity Multi`) were correctly marked `hidden: true` so they stayed off the site, but had wrong image references.
- **Fix 1**: Added `!(hidden == true)` guard to the linker's GROQ target query so it never touches hidden products.
- **Fix 2**: Wrote `scripts/sanity-unlink-orphan-images.ts` one-shot to clean up the 3 mis-linked products after the fact.

**Sanity totals after 600×600 work**:
- 540 products (up from 531 — 9 net-new)
- 169 with images (up from 124 — 45 newly linked, minus 3 unlinked orphans)

**Committed snapshot**: `data-exports/vitrified-600x600.csv` captures the final state (42 visible with image, 45 hidden without).

---

<!-- Future sessions append below this line -->
