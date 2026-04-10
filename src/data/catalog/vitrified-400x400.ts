import type { CatalogProduct } from "./types";

// ─── 400×400mm Vitrified Tiles — Product Catalogue 2025 ───
// General (27) + Outdoor (18) + Parking (4) = 49 tiles

const C = "vitrified-400x400" as const;
const S = "400×400 mm";

const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const tile = (
  name: string,
  series: string,
  category: CatalogProduct["category"] = "Vitrified",
  application: CatalogProduct["application"] = "Floor"
): CatalogProduct => ({
  name,
  slug: slugify(name),
  catalog: C,
  category,
  series,
  size: S,
  finish: "Matt",
  application,
  image: `/images/catalog/vitrified-400x400/${slugify(name)}.jpg`,
});

// ── CLASSIC SERIES ──
const classic: CatalogProduct[] = [
  tile("Cassion Velvet", "Classic"),
  tile("Cassion Velvet Grey", "Classic"),
  tile("Cosmic Brown", "Classic"),
  tile("Earthen Dark Grey", "Classic"),
  tile("Earthen Light Grey", "Classic"),
  tile("Komo Grid", "Classic"),
  tile("Luxury", "Classic"),
  tile("Rubra Strip", "Classic"),
  tile("Venezia Oak", "Classic"),
];

// ── ELITE SERIES ──
const elite: CatalogProduct[] = [
  tile("Elite Dark", "Elite"),
  tile("Elite Light", "Elite"),
];

// ── EPOQUE SERIES ──
const epoque: CatalogProduct[] = [tile("Epoque Brown", "Epoque")];

// ── INTEX SERIES (Floor) ──
const intex: CatalogProduct[] = [tile("Intex 1009", "Intex")];

// ── MONARCH SERIES ──
const monarch: CatalogProduct[] = [
  tile("Monarch Decore Coated", "Monarch"),
];

// ── PEDRA SERIES ──
const pedra: CatalogProduct[] = [
  tile("Pedra Cotto", "Pedra", "Stone Look"),
  tile("Pedra Nero", "Pedra", "Stone Look"),
];

// ── PLASTER SERIES ──
const plaster: CatalogProduct[] = [
  tile("Plaster Coated", "Plaster"),
  tile("Plaster Coated Decore", "Plaster"),
  tile("Plaster Fade Grey", "Plaster"),
  tile("Plaster Fade Grey Decore", "Plaster"),
];

// ── DECORATIVE SERIES (VID_LA_AK) ──
const decorative: CatalogProduct[] = [
  tile("VID LA AK10108", "Decorative"),
  tile("VID LA AK10109", "Decorative"),
  tile("VID LA AK10115", "Decorative"),
  tile("VID LA AK10116", "Decorative"),
  tile("VID LA AK10116 1", "Decorative"),
];

// ── ZEALDOTTED SERIES ──
const zealdotted: CatalogProduct[] = [
  tile("Zealdotted Brown", "Zealdotted"),
  tile("Zealdotted Grey", "Zealdotted"),
];

// ── OUTDOOR SERIES ──
const outdoor: CatalogProduct[] = [
  tile("Baltic White", "Outdoor", "Patio", "Outdoor"),
  tile("Chroma Blocks 2", "Outdoor", "Patio", "Outdoor"),
  tile("Chroma Blocks 3", "Outdoor", "Patio", "Outdoor"),
  tile("Chroma Blocks A", "Outdoor", "Patio", "Outdoor"),
  tile("Citrine Slate", "Outdoor", "Patio", "Outdoor"),
  tile("Citrine Slate HL 01", "Outdoor", "Patio", "Outdoor"),
  tile("Mayan Moss", "Outdoor", "Patio", "Outdoor"),
  tile("Mayan Moss Decor", "Outdoor", "Patio", "Outdoor"),
  tile("Mosaic Brown DK", "Outdoor", "Patio", "Outdoor"),
  tile("Mosaic Brown LT", "Outdoor", "Patio", "Outdoor"),
  tile("Mosaic Grey DK", "Outdoor", "Patio", "Outdoor"),
  tile("Mosaic Grey LT", "Outdoor", "Patio", "Outdoor"),
  tile("Orbit Nero Grey", "Outdoor", "Patio", "Outdoor"),
  tile("Sandstone", "Outdoor", "Patio", "Outdoor"),
  tile("Stonelo Brown", "Outdoor", "Patio", "Outdoor"),
  tile("Stonelo Grey", "Outdoor", "Patio", "Outdoor"),
  tile("Stonelo Gris", "Outdoor", "Patio", "Outdoor"),
  tile("Stonelo Multi", "Outdoor", "Patio", "Outdoor"),
];

// ── PARKING SERIES ──
const parking: CatalogProduct[] = [
  tile("Intex Beige", "Parking", "Driveway", "Driveway"),
  tile("Intex Dark Grey", "Parking", "Driveway", "Driveway"),
  tile("Intex Grey", "Parking", "Driveway", "Driveway"),
  tile("Intex Marfil", "Parking", "Driveway", "Driveway"),
];

export const vitrified400x400: CatalogProduct[] = [
  ...classic,
  ...elite,
  ...epoque,
  ...intex,
  ...monarch,
  ...pedra,
  ...plaster,
  ...decorative,
  ...zealdotted,
  ...outdoor,
  ...parking,
];
