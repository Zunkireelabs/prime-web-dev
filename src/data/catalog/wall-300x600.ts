import type { CatalogProduct } from "./types";

// ─── 300×600mm Ceramic Wall Tiles — Product Catalogue 2025 ───
// Sections: Digital Wall Tiles (Glossy & Matt), Elevation Tiles (Matt)

const C = "wall-300x600" as const;
const S = "300×600 mm";
const CAT = "Ceramic" as const;

// Helper: create a wall tile series (Light + HL + Dark variants)
const series = (
  name: string,
  finish: "Glossy" | "Matt",
  hlCount: 1 | 2 | 3 = 1,
  hasFloor = true
): CatalogProduct[] => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
  const base = { catalog: C, category: CAT, series: name, size: S, finish, application: "Wall" as const };
  const img = (v: string) => `/images/catalog/wall-600/${slug}-${v}.jpg`;

  const tiles: CatalogProduct[] = [
    { ...base, name: `${name} Light`, slug: `${slug}-light`, image: img("light") },
  ];

  if (hlCount === 3) {
    tiles.push(
      { ...base, name: `${name} HL01`, slug: `${slug}-hl-01`, image: img("hl-01") },
      { ...base, name: `${name} HL02`, slug: `${slug}-hl-02`, image: img("hl-02") },
      { ...base, name: `${name} HL03`, slug: `${slug}-hl-03`, image: img("hl-03") },
    );
  } else if (hlCount === 2) {
    tiles.push(
      { ...base, name: `${name} HL1`, slug: `${slug}-hl-1`, image: img("hl-1") },
      { ...base, name: `${name} HL2`, slug: `${slug}-hl-2`, image: img("hl-2") },
    );
  } else {
    tiles.push(
      { ...base, name: `${name} HL`, slug: `${slug}-hl`, image: img("hl") },
    );
  }

  tiles.push(
    { ...base, name: `${name} Dark`, slug: `${slug}-dark`, image: img("dark") },
  );

  if (hasFloor) {
    tiles[0].hasMatchingFloor = "300×300 mm";
  }

  return tiles;
};

// Helper: standalone tile (no Light/HL/Dark variants)
const single = (
  name: string,
  finish: "Glossy" | "Matt",
  app: "Wall" | "Elevation" = "Wall"
): CatalogProduct => ({
  name,
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, ""),
  catalog: C,
  category: CAT,
  series: name,
  size: S,
  finish,
  application: app,
  image: `/images/catalog/wall-600/${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}.jpg`,
});

// Helper: pair tile (two variants only, no HL)
const pair = (
  name: string,
  v1: string,
  v2: string,
  finish: "Glossy" | "Matt",
): CatalogProduct[] => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
  const base = { catalog: C, category: CAT, series: name, size: S, finish, application: "Wall" as const };
  const img = (v: string) => `/images/catalog/wall-600/${slug}-${v}.jpg`;
  return [
    { ...base, name: `${name} ${v1}`, slug: `${slug}-${v1.toLowerCase().replace(/\s+/g, "-")}`, image: img(v1.toLowerCase().replace(/\s+/g, "-")) },
    { ...base, name: `${name} ${v2}`, slug: `${slug}-${v2.toLowerCase().replace(/\s+/g, "-")}`, image: img(v2.toLowerCase().replace(/\s+/g, "-")) },
  ];
};

// ══════════════════════════════════════════
//  GLOSSY DIGITAL WALL TILES (pages 08–43)
// ══════════════════════════════════════════

const glossyWall: CatalogProduct[] = [
  ...series("Acklam Blue", "Glossy", 2),
  single("Carrara", "Glossy"),
  ...pair("Arvita", "Base", "HL", "Glossy"),
  ...series("Angel", "Glossy"),
  ...series("Classy Beige", "Glossy"),
  ...series("Destiny", "Glossy"),
  ...series("Dazzle", "Glossy", 1, false),
  ...series("Dusk Gris", "Glossy"),
  ...series("Dove", "Glossy", 3),
  ...series("Ford", "Glossy", 2),
  ...series("Edmonton", "Glossy"),
  ...series("Florello", "Glossy"),
  ...series("Fantasy Floral", "Glossy"),
  ...pair("Infinity", "Grey", "Slate", "Glossy"),
  ...series("Inlay Beige", "Glossy"),
  ...pair("Lavena", "Grey", "Dark", "Glossy"),
  ...series("Lignum", "Glossy"),
  ...series("James", "Glossy"),
  ...series("Oceanic Blue", "Glossy", 2),
  single("White", "Glossy"),
  ...series("Noble White", "Glossy", 2),
  { name: "Noble Black", slug: "noble-black", catalog: C, category: CAT, series: "Noble White", size: S, finish: "Glossy", application: "Wall", image: "/images/catalog/wall-600/noble-black.jpg" },
];

// ══════════════════════════════════════════
//  MATT DIGITAL WALL TILES (pages 08–45)
// ══════════════════════════════════════════

const mattWall: CatalogProduct[] = [
  ...series("Avila Grey", "Matt"),
  ...series("Crust Grey", "Matt"),
  ...series("Desert Marble", "Matt"),
  ...series("Dusk Grey", "Matt"),
  ...series("Marcon", "Matt"),
  ...series("Magadh", "Matt"),
  ...series("Soapstone", "Matt"),
  ...pair("Trevertino", "Light", "Dark", "Matt"),
  ...series("Faith", "Matt", 2),
];

// ══════════════════════════════════════════
//  ELEVATION TILES — MATT (pages 47–52)
// ══════════════════════════════════════════

const elevation: CatalogProduct[] = [
  single("Brick Beige", "Matt", "Elevation"),
  single("Brick Blue", "Matt", "Elevation"),
  single("Brick Multi", "Matt", "Elevation"),
  single("Brick Natural", "Matt", "Elevation"),
  single("Brick Nero", "Matt", "Elevation"),
  single("Brick Slate", "Matt", "Elevation"),
  single("Terracotta", "Matt", "Elevation"),
];

export const wall300x600: CatalogProduct[] = [
  ...glossyWall,
  ...mattWall,
  ...elevation,
];
