// ─── Prime Ceramics — Full Product Catalog ───

export type { CatalogProduct, CatalogName, CatalogFinish, CatalogApplication, CatalogCategory } from "./types";

export { eleganz600x1200, eleganz600x1200Specs } from "./eleganz-600x1200";
export { vitrified600x600 } from "./vitrified-600x600";
export { wall300x450 } from "./wall-300x450";
export { wall300x600 } from "./wall-300x600";
export { spiritOfNepal } from "./spirit-of-nepal";

import type { CatalogProduct, CatalogName, CatalogFinish } from "./types";
import { eleganz600x1200 } from "./eleganz-600x1200";
import { vitrified600x600 } from "./vitrified-600x600";
import { wall300x450 } from "./wall-300x450";
import { wall300x600 } from "./wall-300x600";
import { spiritOfNepal } from "./spirit-of-nepal";

// ── All products combined ──

export const allProducts: CatalogProduct[] = [
  ...wall300x450,
  ...wall300x600,
  ...vitrified600x600,
  ...eleganz600x1200,
  ...spiritOfNepal,
];

// ── Filter helpers ──

export const getBySize = (size: string): CatalogProduct[] =>
  allProducts.filter((p) => p.size === size);

export const getByFinish = (finish: CatalogFinish): CatalogProduct[] =>
  allProducts.filter((p) => p.finish === finish);

export const getBySeries = (series: string): CatalogProduct[] =>
  allProducts.filter((p) => p.series === series);

export const getByCatalog = (catalog: CatalogName): CatalogProduct[] =>
  allProducts.filter((p) => p.catalog === catalog);

export const getByCollection = (collection: string): CatalogProduct[] =>
  allProducts.filter((p) => p.collection === collection);

export const getByApplication = (app: string): CatalogProduct[] =>
  allProducts.filter((p) => p.application === app);

export const searchTiles = (query: string): CatalogProduct[] => {
  const q = query.toLowerCase();
  return allProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.series.toLowerCase().includes(q) ||
      (p.collection && p.collection.toLowerCase().includes(q))
  );
};

// ── Stats ──

export const catalogStats = {
  totalProducts: allProducts.length,
  catalogs: {
    "wall-300x450": wall300x450.length,
    "wall-300x600": wall300x600.length,
    "vitrified-600x600": vitrified600x600.length,
    "eleganz-600x1200": eleganz600x1200.length,
    "spirit-of-nepal": spiritOfNepal.length,
  },
  sizes: [...new Set(allProducts.map((p) => p.size))],
  finishes: [...new Set(allProducts.map((p) => p.finish))],
  series: [...new Set(allProducts.map((p) => p.series))],
};
