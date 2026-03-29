import type { CatalogProduct } from "./types";

// ─── 300×450mm Ceramic Wall Tiles — Product Catalogue 2025 ───
// Sections: Wall Tile Glossy, Wall Tile Matt, Elevation Tiles Matt, Elevation Tiles Glossy

const C = "wall-300x450" as const;
const S = "300×450 mm";
const CAT = "Ceramic" as const;

// Helper: create a wall tile series (Light + HL + Dark variants)
const series = (
  name: string,
  finish: "Glossy" | "Matt",
  hlCount: 1 | 2 = 1,
  hasFloor = true
): CatalogProduct[] => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
  const base = { catalog: C, category: CAT, series: name, size: S, finish, application: "Wall" as const };
  const img = (v: string) => `/images/catalog/wall/${slug}-${v}.jpg`;

  const tiles: CatalogProduct[] = [
    { ...base, name: `${name} Light`, slug: `${slug}-light`, image: img("light") },
  ];

  if (hlCount === 2) {
    tiles.push(
      { ...base, name: `${name} HL 01`, slug: `${slug}-hl-01`, image: img("hl-01") },
      { ...base, name: `${name} HL 02`, slug: `${slug}-hl-02`, image: img("hl-02") },
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

// Helper: single standalone tile
const single = (name: string, finish: "Glossy" | "Matt", app: "Wall" | "Elevation" = "Wall"): CatalogProduct => ({
  name,
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, ""),
  catalog: C,
  category: CAT,
  series: name,
  size: S,
  finish,
  application: app,
  image: `/images/catalog/wall/${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}.jpg`,
});

// ══════════════════════════════════════════
//  GLOSSY WALL TILES (pages 06–45)
// ══════════════════════════════════════════

const glossyWall: CatalogProduct[] = [
  ...series("Atlantica", "Glossy", 2),
  ...series("Mosaic Dolphin", "Glossy", 2),
  ...series("Swan", "Glossy", 2),
  ...series("Alcazar", "Glossy"),
  ...series("Alderation", "Glossy"),
  ...series("Fade Grey", "Glossy"),
  ...series("Blue Mist", "Glossy"),
  ...series("Purple Mist", "Glossy"),
  ...series("Botany", "Glossy"),
  ...series("Calendula Venezia", "Glossy", 2),
  ...series("Ocean", "Glossy", 2),
  ...series("Silken Malena", "Glossy", 2),
  ...series("Cubixa", "Glossy"),
  ...series("Durben", "Glossy"),
  ...series("Daltrix", "Glossy"),
  ...series("Blossom", "Glossy"),
  ...series("Florida", "Glossy"),
  ...series("Gabba", "Glossy"),
  ...series("Gem Crema", "Glossy"),
  ...series("Gem Wood", "Glossy"),
  ...series("Graffit", "Glossy"),
  ...series("Jewel", "Glossy"),
  ...series("Ivy", "Glossy"),
  ...series("Kettle", "Glossy", 2),
  ...series("Richmond", "Glossy", 2),
  ...series("Rocher Pink", "Glossy", 2, false),
  ...series("Oyster", "Glossy"),
  ...series("Vantel", "Glossy"),
  ...series("Rover", "Glossy"),
  ...series("Orson", "Glossy"),
  ...series("Purple", "Glossy"),
  ...series("Mirage", "Glossy"),
  ...series("Liam", "Glossy"),
  ...series("Ligen", "Glossy"),
  ...series("Mosaic", "Glossy"),
  ...series("Sweden", "Glossy"),
  ...series("Ritz", "Glossy"),
  ...series("Pristine Grey", "Glossy"),
  ...series("Rachel", "Glossy"),
  ...series("Savoy", "Glossy"),
  ...series("Trevertino", "Glossy"),
  ...series("Shangrila", "Glossy"),
  ...series("Teramo Creme", "Glossy"),
  ...series("Triangle", "Glossy"),
  ...series("Fern", "Glossy"),
  ...series("Vase", "Glossy"),
  ...series("Centro", "Glossy"),
  ...series("Collage", "Glossy"),
  // Standalone glossy tiles
  single("Satuario", "Glossy"),
  single("Plain White", "Glossy"),
  single("Light Ivory", "Glossy"),
  single("Dark Ivory", "Glossy"),
];

// ══════════════════════════════════════════
//  MATT WALL TILES (pages 46–53)
// ══════════════════════════════════════════

const mattWall: CatalogProduct[] = [
  ...series("Kyoto", "Matt"),
  ...series("Teramo Creme Matt", "Matt"),
  ...series("Fern Matt", "Matt"),
  ...series("Jewel Matt", "Matt"),
  ...series("Flowery", "Matt", 2),
  ...series("Fusion", "Matt"),
  ...series("Fade Grey Matt", "Matt"),
  ...series("Centro Matt", "Matt"),
  single("Satin White", "Matt"),
];

// ══════════════════════════════════════════
//  ELEVATION TILES — MATT (pages 54–59)
// ══════════════════════════════════════════

const elevationMatt: CatalogProduct[] = [
  { name: "Unser Multi", slug: "unser-multi", catalog: C, category: CAT, series: "Elevation", size: S, finish: "Matt", application: "Elevation", image: "/images/catalog/wall/unser-multi.jpg" },
  { name: "Elenaz Multi", slug: "elenaz-multi", catalog: C, category: CAT, series: "Elevation", size: S, finish: "Matt", application: "Elevation", image: "/images/catalog/wall/elenaz-multi.jpg" },
  { name: "Elenaz Blue", slug: "elenaz-blue", catalog: C, category: CAT, series: "Elevation", size: S, finish: "Matt", application: "Elevation", image: "/images/catalog/wall/elenaz-blue.jpg" },
  { name: "Elenaz Teak", slug: "elenaz-teak", catalog: C, category: CAT, series: "Elevation", size: S, finish: "Matt", application: "Elevation", image: "/images/catalog/wall/elenaz-teak.jpg" },
  { name: "Unser Dark", slug: "unser-dark", catalog: C, category: CAT, series: "Elevation", size: S, finish: "Matt", application: "Elevation", image: "/images/catalog/wall/unser-dark.jpg" },
  { name: "Unser Cold", slug: "unser-cold", catalog: C, category: CAT, series: "Elevation", size: S, finish: "Matt", application: "Elevation", image: "/images/catalog/wall/unser-cold.jpg" },
  { name: "Caliber Beige", slug: "caliber-beige", catalog: C, category: CAT, series: "Elevation", size: S, finish: "Matt", application: "Elevation", image: "/images/catalog/wall/caliber-beige.jpg" },
  { name: "Star Mosaic", slug: "star-mosaic", catalog: C, category: CAT, series: "Elevation", size: S, finish: "Matt", application: "Elevation", image: "/images/catalog/wall/star-mosaic.jpg" },
];

export const wall300x450: CatalogProduct[] = [
  ...glossyWall,
  ...mattWall,
  ...elevationMatt,
];
