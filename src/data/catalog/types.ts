// ─── Prime Ceramics — Product Catalog Types ───

export type CatalogName =
  | "wall-300x450"
  | "wall-300x600"
  | "vitrified-600x600"
  | "eleganz-600x1200"
  | "spirit-of-nepal";

export type CatalogFinish =
  | "Glossy"
  | "Matt"
  | "High Gloss"
  | "Carving"
  | "Satin"
  | "Rustic"
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
}
