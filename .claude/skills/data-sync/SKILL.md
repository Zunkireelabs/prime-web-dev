---
name: data-sync
description: Manage centralized data in src/data/ — add, update, remove entries, validate types, check for orphaned images. Use when user asks to add tiles, update collections, change stats, or manage any catalog/content data.
---

# Data Sync Skill — Prime Ceramics

## Data Architecture

All site content lives in `src/data/`:

```
src/data/
├── index.ts          — Re-exports everything
├── types.ts          — TypeScript interfaces
├── collections.ts    — Tile collections, product categories, browse data, category strips
├── spaces.ts         — Room/application types
├── hero.ts           — Hero slides (HeroMain + HeroCarousel)
├── projects.ts       — Project case studies + featured project
├── showrooms.ts      — Showroom locations + office/factory/dealers
├── clients.ts        — Client logos
├── testimonials.ts   — Customer testimonials
├── stats.ts          — Company statistics
├── craft.ts          — Manufacturing process steps
├── spirit.ts         — Spirit of Nepal collection items
└── navigation.ts     — Nav items, mega menu data, footer columns
```

## How to Add/Update Data

### Adding a New Collection
1. Read `src/data/collections.ts`
2. Add to the `collections` array with ALL required fields:
   ```ts
   { name: "...", slug: "...", category: "...", sizes: ["..."], image: "..." }
   ```
3. The collection automatically appears in CollectionsGrid marquee
4. If it should appear in mega menu, also add to `megaCollections` in `navigation.ts`

### Adding a New Product Category
1. Add to `productCategories` array in `collections.ts`
2. Requires: `label`, `name`, `description`, `image`
3. Automatically appears in ProductShowcase sticky cards

### Adding Browse Items
1. Add to the relevant tab in `browseData` object in `collections.ts`
2. Tabs: `Finishes`, `Sizes`, `Colors`, `Types`

### Adding a Space
1. Add to `spaces` array in `spaces.ts`
2. Requires: `name`, `short`, `subtitle`, `image`

### Adding a Project
1. Add to `projects` array in `projects.ts`
2. Requires: `title`, `type`, `tile`, `image`
3. To change featured project, update `featuredProject` object

### Adding a Showroom
1. Add to `showrooms` array in `showrooms.ts`
2. Requires: `name`, `city`, `address`, `image`
3. Optional: `hours`, `phone`, `mapUrl`

### Adding a Client
1. Add to `clients` array in `clients.ts`
2. Requires: `name`, `logo`, `width`, `height`
3. Logo should be in `/images/clients/`

### Adding a Testimonial
1. Add to `testimonials` array in `testimonials.ts`
2. Requires: `quote`, `author`, `role`, `project`

### Updating Stats
1. Edit `stats` array in `stats.ts`
2. Icon must match a Lucide icon name: Layers, Ruler, Store, Award

### Adding a Craft Step
1. Add to `craftSteps` array in `craft.ts`
2. Requires: `num`, `title`, `text`

## Validation Checklist

After any data change, verify:

1. **Type safety** — Does the entry match its TypeScript interface?
2. **Required fields** — Are all non-optional fields present?
3. **Image exists** — Does the referenced image path exist in `/public/`?
4. **Slug unique** — For collections, is the slug unique?
5. **No duplicates** — Is the entry not already in the array?
6. **Build passes** — Run `npm run build` to catch type errors

## Image Path Conventions

```
/images/tiles/       — Individual tile/collection product images (.png)
/images/products/    — Category showcase images (.jpg)
/images/spaces/      — Room/application images (.jpg)
/images/hero/        — Hero slides and backgrounds (.jpg)
/images/gallery/     — Project gallery images (.jpg)
/images/locations/   — Showroom/office photos (.jpg)
/images/clients/     — Client logos (.png)
/images/services/    — Service category images (.jpg)
```

## Orphan Check

Scan for:
- Data entries referencing images that don't exist in `/public/`
- Images in `/public/images/` not referenced by any data file
- Collections in mega menu that don't exist in `collections` array

## Rules
- ALWAYS read the data file before modifying it
- ALWAYS validate against the TypeScript interface in `types.ts`
- ALWAYS check that referenced images exist
- NEVER modify component files — only modify `src/data/` files
- NEVER add duplicate entries
- Run build check after changes to catch type errors
