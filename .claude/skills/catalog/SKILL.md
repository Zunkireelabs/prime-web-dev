---
name: catalog
description: Manage the tile catalog data including collections, products, sizes, finishes, colors, and categories. Use when user asks to add, update, or manage tile products, collections, or catalog data.
---

# Tile Catalog Skill — Prime Ceramics

## Data Structure

### Collection
```typescript
interface Collection {
  name: string;         // "Calacatta Luxe"
  slug: string;         // "calacatta-luxe"
  category: TileCategory;
  description: string;
  sizes: string[];      // ["60×120 cm", "120×260 cm"]
  finishes: Finish[];
  colors: string[];
  thickness: string;    // "9mm" / "12mm"
  application: Application[];
  image: string;        // Primary product image path
  gallery: string[];    // Additional images
  features: string[];   // ["Frost Resistant", "Rectified", "V4 Shade Variation"]
  specs: {
    waterAbsorption: string;  // "<0.5%"
    breakingStrength: string; // ">2000N"
    slipResistance: string;   // "R10"
    peiRating: string;        // "PEI 4"
  };
}
```

### Categories
```typescript
type TileCategory =
  | "Porcelain"
  | "Ceramic"
  | "Natural Stone"
  | "Large Format"
  | "Mosaics"
  | "Outdoor";
```

### Finishes
```typescript
type Finish =
  | "Matt"
  | "Glossy"
  | "Polished"
  | "Rustic"
  | "Satin"
  | "Carving"
  | "Lappato"
  | "Structured";
```

### Applications
```typescript
type Application =
  | "Living Room"
  | "Bathroom"
  | "Kitchen"
  | "Bedroom"
  | "Outdoor"
  | "Commercial"
  | "Staircase"
  | "Elevation"
  | "Countertop";
```

### Standard Sizes
```
30×30 cm, 30×60 cm, 60×60 cm, 60×120 cm,
80×80 cm, 80×160 cm, 120×120 cm, 120×240 cm
```

## Current Collections
| # | Name | Category | Key Size |
|---|------|----------|----------|
| 1 | Calacatta Luxe | Porcelain | 120×260 cm |
| 2 | Terra Nova | Natural Stone | 80×80 cm |
| 3 | Nordic Wood | Wood Effect | 20×120 cm |
| 4 | Urban Concrete | Concrete Effect | 60×120 cm |
| 5 | Sahara Gold | Large Format | 120×120 cm |
| 6 | Onyx Noir | Porcelain | 60×120 cm |

## Adding a New Collection
1. Add product image to `public/images/services/`
2. Add data to the relevant section component's data array
3. If new category: add to FindBySpace, CollectionsStrip, and BrowseBy
4. Update footer links if needed
5. Update SEO keywords in layout.tsx if new category

## Catalog Data Location
Currently hardcoded in section components. When catalog grows:
1. Create `src/data/collections.ts` with typed collection array
2. Create `src/data/categories.ts` with category metadata
3. Import in components instead of inline arrays
4. This enables filtering, searching, and dynamic page generation

## Image Naming Convention
```
Collection images: /images/collections/[slug].jpg
Space images:      /images/spaces/[space-slug].jpg
Project images:    /images/projects/[project-slug].jpg
Showroom images:   /images/showrooms/[city-slug].jpg
```
