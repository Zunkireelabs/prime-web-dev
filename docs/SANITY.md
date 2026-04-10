# Sanity CMS — Prime Ceramics

Reference for the Sanity-backed tile catalog system. Read this before modifying schemas, running migration scripts, or onboarding a new catalog.

---

## Overview

Sanity is the **source of truth** for all tile catalog data. The site is a static Next.js export, so Sanity content is fetched once at **build time** (not runtime):

```
Sanity → scripts/generate-catalog-data.ts → src/data/catalog/sanity-products.json → Next.js build → static HTML
```

The site does not call Sanity at runtime. Changes in Sanity only appear on the site after a rebuild + deploy.

**Project**: `3jv6o4t6` · dataset `production` · API version `2026-04-01`

---

## Schema (`src/sanity/schemas/`)

### `tileCatalog`
Catalog groupings (e.g. "Wall 300×600", "Vitrified 400×400"). One document per catalog.

| Field | Purpose |
|---|---|
| `name` | Display name ("Wall Tiles 300×600") |
| `slug` | URL-safe identifier |
| `catalogId` | System identifier — **must match** the `CatalogName` union in `src/data/catalog/types.ts` |
| `description` | Short description shown in admin |
| `coverImage` | Optional cover image |

### `tileProduct`
Individual tile products, each references a `tileCatalog`.

| Field | Purpose |
|---|---|
| `name`, `slug` | Display + URL |
| `catalog` | Reference to `tileCatalog` |
| `category` | Ceramic / Vitrified / Stone Look / etc. |
| `series` | Sub-grouping within a catalog (e.g. "Classic", "Plaster") |
| `collection` | Optional — used only for Spirit of Nepal |
| `size`, `finish`, `application` | Product specs |
| `hasMatchingFloor` | Optional — references another product slug |
| `variants` | Optional — list of variant names |
| `image` | Single product image (with alt text) |
| `sortOrder` | Manual ordering (lower = first). Default 100. |
| **`hidden`** | **If `true`, the product is hidden from the website but preserved in Studio.** |

---

## The "hidden" pattern

**Principle**: Never delete a tile. If a tile has no image, hide it. The client can later open Studio, upload an image, uncheck "Hidden", and the tile reappears on the site.

**How it works**:
- Default: `hidden: false`
- Set via: Studio toggle, or reconcile script
- GROQ filter in `scripts/generate-catalog-data.ts`:
  ```groq
  *[_type == "tileProduct" && !(hidden == true)]
  ```
- **Backward compatible**: documents without the field are treated as visible (`undefined !== true`), so legacy products keep rendering without migration.

**When to hide**:
- Tile name exists in the client's catalog but no image is available yet
- Tile was in the old data but isn't in the current source folder and has no image
- Product needs to be temporarily withdrawn from the site but preserved for later

**When NOT to hide** (keep visible):
- Tile has an image — never hide it, never delete it
- Tile is in the current source folder

**Studio UX**: hidden products display with a 🔒 prefix and "HIDDEN" suffix in the list view. Client can filter to see only hidden products by sorting / searching.

---

## Environment

`.env.local` (gitignored):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=3jv6o4t6
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-04-01
SANITY_API_TOKEN=sk...
```

`SANITY_API_TOKEN` must have **Editor** permissions. Create at https://sanity.io/manage → project → API → Tokens.

**Never commit `.env.local`.** It's in `.gitignore` by default.

---

## Scripts (`scripts/`)

### Inspection — read-only, safe anytime

**`sanity-inspect.ts`**
Prints current catalog state: catalog counts, products per catalog, image coverage, and full listing of the 400×400 catalog with visible/hidden state.

```bash
export $(grep -v '^#' .env.local | xargs)
npx tsx scripts/sanity-inspect.ts
```

### Reconciliation — idempotent, safe

**`sanity-reconcile-<catalog>.ts`** (currently: `sanity-reconcile-400x400.ts`)
Diffs local TypeScript data against Sanity and patches/creates/hides as needed. This is the **canonical pattern** for bringing a catalog in sync with its source folder.

Default is **dry-run** (no writes). Pass `--confirm` to execute.

```bash
# 1. Preview all intended changes
npx tsx scripts/sanity-reconcile-400x400.ts

# 2. Execute after reviewing
npx tsx scripts/sanity-reconcile-400x400.ts --confirm
```

**How it works**:
1. Fetches existing products in the catalog from Sanity
2. Builds a normalized-name match map from the local TS data
3. For each existing product:
   - Match found in new data → **patch** series/category/application to new values, set `hidden: false`
   - No match, has image → **patch**, preserve visible in a sensible series
   - No match, no image → **patch** `hidden: true` (preserved, not deleted)
4. For each local tile with no existing match → **create** new document

**Idempotent**: safe to re-run any time. Running it again with no data changes is a no-op.

### Image pipeline

**`sanity-upload-images.ts`** — uploads a folder of images to Sanity as assets and writes `scripts/image-map-<catalog>.json` mapping filename → assetId.

```bash
npx tsx scripts/sanity-upload-images.ts \
  --dir "public/images/catalog/vitrified-400x400" \
  --catalog vitrified-400x400 \
  --resume
```

- `--resume` skips already-uploaded files (idempotent — safe to re-run)
- Asset IDs are stored in `scripts/image-map-<catalog>.json` and the combined `scripts/image-map.json` (both gitignored)

**`sanity-link-images.ts`** — reads the image maps, fuzzy-matches filenames to product slugs, and patches each product with an image reference.

```bash
npx tsx scripts/sanity-link-images.ts
```

- Skips products that already have an image (safe to re-run)
- Prints unmatched products at the end — review those and add to `sanity-link-images-manual.ts` if needed

**`sanity-link-images-manual.ts`** — manual override for edge cases the fuzzy matcher misses. Add explicit name → filename mappings to the config inside the script.

### Obsolete / one-shot scripts

These exist for historical reasons but should not be used for new work:
- `sanity-migrate.ts` — creates **all** documents from scratch. **Not idempotent** — creates duplicates on re-run. Only for initial setup or after a full wipe. Use reconcile for updates.
- `sanity-fix-400x400-catalog.ts` — one-shot from Apr 9 that reassigned misplaced products. No longer needed.
- `mac-upload.ts`, `run.js`, `upload-all.sh` — standalone variants with hardcoded credentials, used from a separate machine. Don't use from this repo.

---

## Adding a new catalog (recipe)

When the client provides a source folder for a new size (e.g. 600×600):

1. **Create the local TS data file** — `src/data/catalog/<catalog>.ts`:
   - Follow the pattern in `vitrified-400x400.ts`
   - Group tiles into sub-series by product family
   - Use the `slugify()` helper for deterministic slugs
   - Image paths: `/images/catalog/<catalog>/<slug>.jpg`

2. **Copy images** — `public/images/catalog/<catalog>/` with slug-normalized filenames. Use explicit `cp` commands (not find/loops) to keep the mapping deterministic.

3. **Wire into the catalog index** — add an import and spread to `src/data/catalog/index.ts`.

4. **Update the showcase count** — `src/data/catalogs.ts` entry for this catalog.

5. **Copy the reconcile script** — `cp scripts/sanity-reconcile-400x400.ts scripts/sanity-reconcile-<catalog>.ts` and update:
   - `CATALOG_REF` constant
   - GROQ filter
   - Import line

6. **Dry-run** → review → **confirm**:
   ```bash
   npx tsx scripts/sanity-reconcile-<catalog>.ts
   npx tsx scripts/sanity-reconcile-<catalog>.ts --confirm
   ```

7. **Upload images** and **link**:
   ```bash
   npx tsx scripts/sanity-upload-images.ts \
     --dir "public/images/catalog/<catalog>" \
     --catalog <catalog> --resume
   npx tsx scripts/sanity-link-images.ts
   ```

8. **Verify**:
   ```bash
   npx tsx scripts/sanity-inspect.ts
   ```

9. **Local test**:
   ```bash
   npx tsx scripts/generate-catalog-data.ts
   npm run dev
   # Visit /catalog and click the size tab
   ```

10. **Commit** in logical chunks:
    - `data(catalog): add <catalog> products from source folder`
    - `chore(scripts): add sanity-reconcile-<catalog>`
    - `docs: log session X in SESSION_LOG.md`

11. **Deploy** via `./deploy.sh dev` after local verification.

---

## Gotchas

- **`sanity-migrate.ts` is not idempotent.** Use reconcile for any updates to an existing catalog. Migrate is only for cold-start from an empty Sanity dataset.
- **Studio needs a restart** after schema changes to show new fields. Run `npm run studio` (or refresh Studio in browser) after editing `src/sanity/schemas/`.
- **Images uploaded as assets are never deleted automatically.** Even when the referencing product is deleted or the field is unset, the asset blob remains. Periodically run Sanity Studio's "Clean up unused assets" to reclaim storage.
- **GROQ `!hidden` does NOT match docs without the field.** Always use `!(hidden == true)` for backward compatibility with legacy documents.
- **Generate script only runs during `npm run build`**, not `npm run dev`. For local dev against Sanity data, run it manually first:
  ```bash
  export $(grep -v '^#' .env.local | xargs)
  npx tsx scripts/generate-catalog-data.ts
  ```
- **`sanity-products.json` is gitignored.** It's a build artifact — always regenerated from Sanity. Never commit it.
- **`.gitattributes`** currently only marks `*.pdf` as LFS-tracked. JPGs commit as regular files. If this changes, ensure `git-lfs` is installed (`brew install git-lfs && git lfs install`).
- **Token safety**: if a token leaks, immediately revoke it at sanity.io/manage → API → Tokens and rotate `.env.local`.
