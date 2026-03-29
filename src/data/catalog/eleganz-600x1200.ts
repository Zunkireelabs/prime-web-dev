import type { CatalogProduct } from "./types";

// ─── Eleganz 600×1200mm — Glazed Vitrified Tiles ───
// Brand: "eleganz" | 50 designs | 4 surface finishes
// Catalog: Product Catalogue 2025

const C = "eleganz-600x1200" as const;
const S = "600×1200 mm";
const CAT = "Glazed Vitrified" as const;

// ── GLOSSY SERIES ──

const glossy: CatalogProduct[] = [
  { name: "Grey Imperial", slug: "grey-imperial", catalog: C, category: CAT, series: "Glossy", size: S, finish: "Glossy", application: "Floor", image: "/images/catalog/eleganz/grey-imperial.jpg" },
  { name: "Grey William", slug: "grey-william", catalog: C, category: CAT, series: "Glossy", size: S, finish: "Glossy", application: "Floor", image: "/images/catalog/eleganz/grey-william.jpg" },
  { name: "Botticino", slug: "botticino-600x1200", catalog: C, category: CAT, series: "Glossy", size: S, finish: "Glossy", application: "Floor", image: "/images/catalog/eleganz/botticino.jpg" },
  { name: "Graphite Silver", slug: "graphite-silver", catalog: C, category: CAT, series: "Glossy", size: S, finish: "Glossy", application: "Floor", image: "/images/catalog/eleganz/graphite-silver.jpg" },
  { name: "Fantasy Crema Decor", slug: "fantasy-crema-decor", catalog: C, category: CAT, series: "Glossy", size: S, finish: "Glossy", application: "Wall & Floor", image: "/images/catalog/eleganz/fantasy-crema-decor.jpg" },
  { name: "Fantasy Crema", slug: "fantasy-crema", catalog: C, category: CAT, series: "Glossy", size: S, finish: "Glossy", application: "Floor", image: "/images/catalog/eleganz/fantasy-crema.jpg" },
  { name: "Madison Grey", slug: "madison-grey", catalog: C, category: CAT, series: "Glossy", size: S, finish: "Glossy", application: "Floor", image: "/images/catalog/eleganz/madison-grey.jpg" },
  { name: "Silken Gris Decor", slug: "silken-gris-decor", catalog: C, category: CAT, series: "Glossy", size: S, finish: "Glossy", application: "Wall & Floor", image: "/images/catalog/eleganz/silken-gris-decor.jpg" },
  { name: "Silken Gris", slug: "silken-gris", catalog: C, category: CAT, series: "Glossy", size: S, finish: "Glossy", application: "Floor", image: "/images/catalog/eleganz/silken-gris.jpg" },
  { name: "Natural Onyx", slug: "natural-onyx", catalog: C, category: CAT, series: "Glossy", size: S, finish: "Glossy", application: "Floor", image: "/images/catalog/eleganz/natural-onyx.jpg" },
  { name: "Shimmer Onyx", slug: "shimmer-onyx", catalog: C, category: CAT, series: "Glossy", size: S, finish: "Glossy", application: "Floor", image: "/images/catalog/eleganz/shimmer-onyx.jpg" },
  { name: "Rocado Decor", slug: "rocado-decor", catalog: C, category: CAT, series: "Glossy", size: S, finish: "Glossy", application: "Wall & Floor", image: "/images/catalog/eleganz/rocado-decor.jpg" },
  { name: "Rocado", slug: "rocado", catalog: C, category: CAT, series: "Glossy", size: S, finish: "Glossy", application: "Floor", image: "/images/catalog/eleganz/rocado.jpg" },
  { name: "Statuario Antico Decor", slug: "statuario-antico-decor", catalog: C, category: CAT, series: "Glossy", size: S, finish: "Glossy", application: "Wall & Floor", image: "/images/catalog/eleganz/statuario-antico-decor.jpg" },
  { name: "Statuario Antico", slug: "statuario-antico", catalog: C, category: CAT, series: "Glossy", size: S, finish: "Glossy", application: "Floor", image: "/images/catalog/eleganz/statuario-antico.jpg" },
  { name: "Statuario Ice Decor", slug: "statuario-ice-decor", catalog: C, category: CAT, series: "Glossy", size: S, finish: "Glossy", application: "Wall & Floor", image: "/images/catalog/eleganz/statuario-ice-decor.jpg" },
  { name: "Statuario Ice", slug: "statuario-ice", catalog: C, category: CAT, series: "Glossy", size: S, finish: "Glossy", application: "Floor", image: "/images/catalog/eleganz/statuario-ice.jpg" },
];

// ── HIGH GLOSS SERIES ──

const highGloss: CatalogProduct[] = [
  { name: "Amazonite Blue", slug: "amazonite-blue", catalog: C, category: CAT, series: "High Gloss", size: S, finish: "High Gloss", application: "Wall & Floor", image: "/images/catalog/eleganz/amazonite-blue.jpg" },
  { name: "Cardinal Brown", slug: "cardinal-brown", catalog: C, category: CAT, series: "High Gloss", size: S, finish: "High Gloss", application: "Wall & Floor", image: "/images/catalog/eleganz/cardinal-brown.jpg" },
  { name: "Azure Aqua", slug: "azure-aqua", catalog: C, category: CAT, series: "High Gloss", size: S, finish: "High Gloss", application: "Wall & Floor", image: "/images/catalog/eleganz/azure-aqua.jpg" },
  { name: "Obsidian Blue", slug: "obsidian-blue", catalog: C, category: CAT, series: "High Gloss", size: S, finish: "High Gloss", application: "Wall & Floor", image: "/images/catalog/eleganz/obsidian-blue.jpg" },
  { name: "Emerald Green", slug: "emerald-green", catalog: C, category: CAT, series: "High Gloss", size: S, finish: "High Gloss", application: "Wall & Floor", image: "/images/catalog/eleganz/emerald-green.jpg" },
  { name: "Aqua Marine", slug: "aqua-marine", catalog: C, category: CAT, series: "High Gloss", size: S, finish: "High Gloss", application: "Wall & Floor", image: "/images/catalog/eleganz/aqua-marine.jpg" },
  { name: "Emperador Brown", slug: "emperador-brown-1200", catalog: C, category: CAT, series: "High Gloss", size: S, finish: "High Gloss", application: "Floor", image: "/images/catalog/eleganz/emperador-brown.jpg" },
  { name: "Nero Marquina", slug: "nero-marquina", catalog: C, category: CAT, series: "High Gloss", size: S, finish: "High Gloss", application: "Floor", image: "/images/catalog/eleganz/nero-marquina.jpg" },
  { name: "Volcanic Blue", slug: "volcanic-blue", catalog: C, category: CAT, series: "High Gloss", size: S, finish: "High Gloss", application: "Wall & Floor", image: "/images/catalog/eleganz/volcanic-blue.jpg" },
  { name: "Portoro Black", slug: "portoro-black", catalog: C, category: CAT, series: "High Gloss", size: S, finish: "High Gloss", application: "Wall & Floor", image: "/images/catalog/eleganz/portoro-black.jpg" },
  { name: "Sanibell White", slug: "sanibell-white", catalog: C, category: CAT, series: "High Gloss", size: S, finish: "High Gloss", application: "Floor", image: "/images/catalog/eleganz/sanibell-white.jpg" },
];

// ── MATT SERIES ──

const matt: CatalogProduct[] = [
  { name: "Bedrock Decor", slug: "bedrock-decor", catalog: C, category: CAT, series: "Matt", size: S, finish: "Matt", application: "Wall & Floor", image: "/images/catalog/eleganz/bedrock-decor.jpg" },
  { name: "Bedrock Light", slug: "bedrock-light", catalog: C, category: CAT, series: "Matt", size: S, finish: "Matt", application: "Floor", image: "/images/catalog/eleganz/bedrock-light.jpg" },
  { name: "Bedrock Brown Decor", slug: "bedrock-brown-decor", catalog: C, category: CAT, series: "Matt", size: S, finish: "Matt", application: "Wall & Floor", image: "/images/catalog/eleganz/bedrock-brown-decor.jpg" },
  { name: "Bedrock Crema", slug: "bedrock-crema", catalog: C, category: CAT, series: "Matt", size: S, finish: "Matt", application: "Floor", image: "/images/catalog/eleganz/bedrock-crema.jpg" },
  { name: "Bedrock Brown", slug: "bedrock-brown", catalog: C, category: CAT, series: "Matt", size: S, finish: "Matt", application: "Floor", image: "/images/catalog/eleganz/bedrock-brown.jpg" },
  { name: "Castle Grey Decor", slug: "castle-grey-decor", catalog: C, category: CAT, series: "Matt", size: S, finish: "Matt", application: "Wall & Floor", image: "/images/catalog/eleganz/castle-grey-decor.jpg" },
  { name: "Castle Light Grey", slug: "castle-light-grey", catalog: C, category: CAT, series: "Matt", size: S, finish: "Matt", application: "Floor", image: "/images/catalog/eleganz/castle-light-grey.jpg" },
  { name: "Castle Grey", slug: "castle-grey", catalog: C, category: CAT, series: "Matt", size: S, finish: "Matt", application: "Floor", image: "/images/catalog/eleganz/castle-grey.jpg" },
  { name: "Castle Beige Decor", slug: "castle-beige-decor", catalog: C, category: CAT, series: "Matt", size: S, finish: "Matt", application: "Wall & Floor", image: "/images/catalog/eleganz/castle-beige-decor.jpg" },
  { name: "Castle Beige", slug: "castle-beige", catalog: C, category: CAT, series: "Matt", size: S, finish: "Matt", application: "Floor", image: "/images/catalog/eleganz/castle-beige.jpg" },
  { name: "Castle Green Decor", slug: "castle-green-decor", catalog: C, category: CAT, series: "Matt", size: S, finish: "Matt", application: "Wall & Floor", image: "/images/catalog/eleganz/castle-green-decor.jpg" },
  { name: "Castle Green", slug: "castle-green", catalog: C, category: CAT, series: "Matt", size: S, finish: "Matt", application: "Floor", image: "/images/catalog/eleganz/castle-green.jpg" },
  { name: "Woody Walnut Decor", slug: "woody-walnut-decor", catalog: C, category: "Wood Look", series: "Matt", size: S, finish: "Matt", application: "Floor", image: "/images/catalog/eleganz/woody-walnut-decor.jpg" },
  { name: "Woody Walnut", slug: "woody-walnut", catalog: C, category: "Wood Look", series: "Matt", size: S, finish: "Matt", application: "Floor", image: "/images/catalog/eleganz/woody-walnut.jpg" },
  { name: "Woody Cedar", slug: "woody-cedar", catalog: C, category: "Wood Look", series: "Matt", size: S, finish: "Matt", application: "Floor", image: "/images/catalog/eleganz/woody-cedar.jpg" },
  { name: "Woody Teak Decor", slug: "woody-teak-decor", catalog: C, category: "Wood Look", series: "Matt", size: S, finish: "Matt", application: "Floor", image: "/images/catalog/eleganz/woody-teak-decor.jpg" },
  { name: "Woody Teak", slug: "woody-teak", catalog: C, category: "Wood Look", series: "Matt", size: S, finish: "Matt", application: "Floor", image: "/images/catalog/eleganz/woody-teak.jpg" },
  { name: "Woody Grey", slug: "woody-grey", catalog: C, category: "Wood Look", series: "Matt", size: S, finish: "Matt", application: "Floor", image: "/images/catalog/eleganz/woody-grey.jpg" },
  { name: "Driftwood Classic", slug: "driftwood-classic-1200", catalog: C, category: "Wood Look", series: "Matt", size: S, finish: "Matt", application: "Floor", image: "/images/catalog/eleganz/driftwood-classic.jpg" },
];

// ── CARVING SERIES ──

const carving: CatalogProduct[] = [
  { name: "Canterbury Beige", slug: "canterbury-beige", catalog: C, category: CAT, series: "Carving", size: S, finish: "Carving", application: "Floor", image: "/images/catalog/eleganz/canterbury-beige.jpg" },
  { name: "Sicilia Taupe", slug: "sicilia-taupe", catalog: C, category: CAT, series: "Carving", size: S, finish: "Carving", application: "Floor", image: "/images/catalog/eleganz/sicilia-taupe.jpg" },
  { name: "Terrazzo White", slug: "terrazzo-white", catalog: C, category: CAT, series: "Carving", size: S, finish: "Carving", application: "Floor", image: "/images/catalog/eleganz/terrazzo-white.jpg" },
  { name: "Godawari Marble Dotted Crema Viens", slug: "godawari-marble-dotted-crema-viens-1200", catalog: C, category: CAT, series: "Carving", size: S, finish: "Carving", application: "Wall & Floor", image: "/images/catalog/eleganz/godawari-marble-dotted-crema-viens.jpg" },
  { name: "Pulpis Crema", slug: "pulpis-crema", catalog: C, category: CAT, series: "Carving", size: S, finish: "Carving", application: "Floor", image: "/images/catalog/eleganz/pulpis-crema.jpg" },
  { name: "Pulpis Brown", slug: "pulpis-brown", catalog: C, category: CAT, series: "Carving", size: S, finish: "Carving", application: "Floor", image: "/images/catalog/eleganz/pulpis-brown.jpg" },
  { name: "Pulpis Light Grey", slug: "pulpis-light-grey", catalog: C, category: CAT, series: "Carving", size: S, finish: "Carving", application: "Floor", image: "/images/catalog/eleganz/pulpis-light-grey.jpg" },
  { name: "Pulpis Grey", slug: "pulpis-grey", catalog: C, category: CAT, series: "Carving", size: S, finish: "Carving", application: "Floor", image: "/images/catalog/eleganz/pulpis-grey.jpg" },
  { name: "Pulpis Dark Grey", slug: "pulpis-dark-grey", catalog: C, category: CAT, series: "Carving", size: S, finish: "Carving", application: "Floor", image: "/images/catalog/eleganz/pulpis-dark-grey.jpg" },
  { name: "Staturio Phenix", slug: "staturio-phenix", catalog: C, category: CAT, series: "Carving", size: S, finish: "Carving", application: "Wall & Floor", image: "/images/catalog/eleganz/staturio-phenix.jpg" },
];

export const eleganz600x1200: CatalogProduct[] = [
  ...glossy,
  ...highGloss,
  ...matt,
  ...carving,
];

// Technical specs for this catalog
export const eleganz600x1200Specs = {
  size: "600×1200 mm",
  tilesPerCarton: 2,
  areaPerCarton: "1.44 sq.m",
  waterAbsorption: "≤ 0.08%",
  breakingStrength: "≥ 1600 N",
  modulusOfRupture: "≥ 40 N/mm²",
  scratchHardness: "Min 5 (Moh's)",
  surfaceAbrasion: "Min Class 2",
  standard: "ISO 10545 / NS 617:2082",
};
