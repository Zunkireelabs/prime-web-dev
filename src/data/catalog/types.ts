// ─── Prime Ceramics — Product Catalog Types ───

export type CatalogName =
  | "wall-300x450"
  | "wall-300x600"
  | "floor-300x300"
  | "vitrified-400x400"
  | "vitrified-600x600"
  | "eleganz-600x1200"
  | "spirit-of-nepal";

export type CatalogFinish =
  | "Glossy"
  | "Matt"
  | "High Gloss"
  | "Carving"
  | "Satin"

  | "Polished";

export type CatalogApplication =
  | "Wall"
  | "Floor"
  | "Wall & Floor"
  | "Elevation"
  | "Outdoor"
  | "Patio"
  | "Driveway"
  | "Art Panel";

export type CatalogCategory =
  | "Ceramic"
  | "Vitrified"
  | "Glazed Vitrified"
  | "Porcelain"
  | "Wood Look"
  | "Stone Look"
  | "Marble Look"
  | "Monochrome"
  | "Patio"
  | "Driveway"
  | "Special Edition"
  | "Art"
  | "Cultural Heritage";

// Fixed schema enum order — see the `spaces` field in src/sanity/schemas/tileProduct.ts.
// Products can carry leftover freeform tags from before this enum was enforced;
// anything filtered against this list will ignore that junk.
export const CANONICAL_SPACES = [
  "Living Room", "Bedroom", "Kitchen", "Bathroom", "Dining Room", "Office",
  "Balcony", "Outdoor", "Commercial", "Restaurant", "Hotel", "Hospital",
  "Apartment", "Showroom", "Staircase", "Elevation", "Parking",
] as const;

export interface CatalogProduct {
  name: string;
  slug: string;
  catalog: CatalogName;
  category: CatalogCategory;
  series: string;
  collection?: string;
  size: string;
  finish: CatalogFinish;
  application: CatalogApplication;
  hasMatchingFloor?: string;
  variants?: string[];
  image: string;
  imageRotation?: number;
  hasGallery?: boolean;
  gallery?: { url: string; label?: string; caption?: string }[];
  showFirst?: "product" | "gallery";
  panelLayout?: {
    cols: number;
    rows: number;
    orientation: "horizontal" | "vertical";
  };
  spaces?: string[];
  outdoor?: boolean;
}
