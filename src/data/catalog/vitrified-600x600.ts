import type { CatalogProduct } from "./types";

// ─── 600×600mm Vitrified Floor Tiles — Product Catalogue 2025 ───
// 7 Sub-Series (Elegant, Glossy, Marble, Monochrome, Wooden, Stone)

const C = "vitrified-600x600" as const;
const S = "600×600 mm";
const V = "Vitrified" as const;

// Helper to create tiles quickly
const tile = (
  name: string,
  series: string,
  finish: "Matt" | "Glossy" | "Satin",
  category: typeof V | "Wood Look" | "Stone Look" | "Marble Look" | "Monochrome" = V
): CatalogProduct => ({
  name,
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, ""),
  catalog: C,
  category,
  series,
  size: S,
  finish,
  application: "Floor",
  image: `/images/catalog/vitrified/${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}.jpg`,
});

// ── ELEGANT SERIES (Matt) ──

const elegant: CatalogProduct[] = [
  tile("Zotak Slate", "Elegant", "Matt"),
  tile("Zotak Beige", "Elegant", "Matt"),
  tile("Zotak Marfil", "Elegant", "Matt"),
  tile("Zotak Grey", "Elegant", "Matt"),
  tile("Zotak Brown", "Elegant", "Matt"),
  tile("Dyna Natural", "Elegant", "Matt"),
  tile("Dyna Camel", "Elegant", "Matt"),
  tile("Lenox Grey", "Elegant", "Matt"),
  tile("Lenox Beige", "Elegant", "Matt"),
  tile("Venise", "Elegant", "Matt"),
  tile("Sand Beige", "Elegant", "Matt"),
  tile("Smoky Choco", "Elegant", "Matt"),
  tile("Smoky Blue", "Elegant", "Matt"),
  tile("Smoky Grey", "Elegant", "Matt"),
  tile("Smoky Dark", "Elegant", "Matt"),
  tile("Smoky Beige", "Elegant", "Matt"),
  tile("Smoky Taupe", "Elegant", "Matt"),
  tile("Cloudy Beige", "Elegant", "Matt"),
  tile("Cloudy Marfil", "Elegant", "Matt"),
  tile("Cloudy Grey", "Elegant", "Matt"),
  tile("Griege Beige", "Elegant", "Matt"),
  tile("Griege Grey", "Elegant", "Matt"),
  tile("Armani White", "Elegant", "Matt"),
  tile("Armani Sun", "Elegant", "Matt"),
  tile("Armani Bianca", "Elegant", "Matt"),
  tile("Vinyl Blue", "Elegant", "Matt"),
  tile("Vinyl Grey", "Elegant", "Matt"),
];

// ── GLOSSY SERIES (Glossy/Satin) ──

const glossy: CatalogProduct[] = [
  tile("Botticino", "Glossy", "Glossy"),
  tile("Onyx", "Glossy", "Glossy"),
  tile("Emperador Brown", "Glossy", "Glossy"),
  tile("Carrara", "Glossy", "Glossy"),
  tile("Breccia", "Glossy", "Glossy"),
  tile("Tiama Teak", "Glossy", "Satin"),
];

// ── MARBLE SERIES (Matt) ──

const marble: CatalogProduct[] = [
  tile("Sigma Gold", "Marble", "Matt", "Marble Look"),
  tile("Windy Smug", "Marble", "Matt", "Marble Look"),
  tile("Sigma Bianco Random", "Marble", "Matt", "Marble Look"),
  tile("Marvel Bright", "Marble", "Matt", "Marble Look"),
];

// ── MONOCHROME SERIES (Matt) ──

const monochrome: CatalogProduct[] = [
  tile("Echo Beige", "Monochrome", "Matt", "Monochrome"),
  tile("Echo Grey", "Monochrome", "Matt", "Monochrome"),
  tile("Pleasant Beige", "Monochrome", "Matt", "Monochrome"),
  tile("Cemento Slate", "Monochrome", "Matt", "Monochrome"),
  tile("Cryptic Pink Endless", "Monochrome", "Matt", "Monochrome"),
  tile("Pleasant White", "Monochrome", "Matt", "Monochrome"),
  tile("Plain Ivory", "Monochrome", "Matt", "Monochrome"),
  tile("Plain White", "Monochrome", "Matt", "Monochrome"),
  tile("Dark Ivory", "Monochrome", "Matt", "Monochrome"),
];

// ── WOODEN SERIES (Matt) ──

const wooden: CatalogProduct[] = [
  tile("Bright Log", "Wooden", "Matt", "Wood Look"),
  tile("Matrix Pine", "Wooden", "Matt", "Wood Look"),
  tile("Marble Grey", "Wooden", "Matt", "Wood Look"),
  tile("Noughts & Crosses", "Wooden", "Matt", "Wood Look"),
  tile("Magic Mocha", "Wooden", "Matt", "Wood Look"),
  tile("Wooden Galaicha", "Wooden", "Matt", "Wood Look"),
  tile("Twizel Blue", "Wooden", "Matt", "Wood Look"),
  tile("Woody Marble", "Wooden", "Matt", "Wood Look"),
  tile("White Oak", "Wooden", "Matt", "Wood Look"),
  tile("Woody Bright", "Wooden", "Matt", "Wood Look"),
  tile("Toscana Grid", "Wooden", "Matt", "Wood Look"),
  tile("Marble Grid", "Wooden", "Matt", "Wood Look"),
  tile("Edged Wood", "Wooden", "Matt", "Wood Look"),
  tile("Woody Impression", "Wooden", "Matt", "Wood Look"),
  tile("Rav Brown", "Wooden", "Matt", "Wood Look"),
  tile("Lavish Log", "Wooden", "Matt", "Wood Look"),
  tile("Eleganza Teak", "Wooden", "Matt", "Wood Look"),
  tile("Serendipity Multi", "Wooden", "Matt", "Wood Look"),
  tile("Woody Foist", "Wooden", "Matt", "Wood Look"),
  tile("Driftwood Ash", "Wooden", "Matt", "Wood Look"),
  tile("Serendipity", "Wooden", "Matt", "Wood Look"),
  tile("Driftwood Classic", "Wooden", "Matt", "Wood Look"),
  tile("Timbre Bliss", "Wooden", "Matt", "Wood Look"),
  tile("Driftwood Teak", "Wooden", "Matt", "Wood Look"),
];

// ── STONE SERIES (Matt) ──

const stone: CatalogProduct[] = [
  tile("Norwich Light Grey", "Stone", "Matt", "Stone Look"),
  tile("Norwich Nero", "Stone", "Matt", "Stone Look"),
  tile("Norwich Grey", "Stone", "Matt", "Stone Look"),
  tile("Norwich Marfl", "Stone", "Matt", "Stone Look"),
  tile("Norwich Biege", "Stone", "Matt", "Stone Look"),
  tile("Antiquity Grey", "Stone", "Matt", "Stone Look"),
  tile("Antiquity Multi", "Stone", "Matt", "Stone Look"),
  tile("Antiquity Biege", "Stone", "Matt", "Stone Look"),
];

export const vitrified600x600: CatalogProduct[] = [
  ...elegant,
  ...glossy,
  ...marble,
  ...monochrome,
  ...wooden,
  ...stone,
];
