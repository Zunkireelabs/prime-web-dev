import type { CatalogEntry } from "./types";

const localCatalogEntries: CatalogEntry[] = [
  {
    name: "600×1200MM Tiles",
    slug: "600x1200",
    size: "600×1200MM",
    filterValue: "600×1200 mm",
    count: "59 designs",
    types: "Glossy · High Gloss · Matt · Carving",
    description:
      "Large-format glazed vitrified tiles for statement floors and feature walls.",
    image: "/images/catalogs/floor-600x1200.png",
    pdf: "/catalogs/600x1200.pdf",
    featured: true,
    sortOrder: 10,
  },
  {
    name: "Floor Tiles — 600×600MM & 400×400MM",
    slug: "floor-tiles",
    size: "600×600MM & 400×400MM",
    filterValue: "600×600 mm",
    count: "92 designs",
    types: "Matt · Wood Look · Stone Look · Marble Look · Outdoor · Parking",
    description:
      "Vitrified floor tiles with natural wood, stone, and marble finishes for elegant interiors and durable outdoor spaces.",
    image: "/images/catalogs/floor-600x600.png",
    pdf: "/catalogs/floor-tiles.pdf",
    sortOrder: 20,
  },
  {
    name: "Wall Tiles — 300×600MM",
    slug: "300x600",
    size: "300×600MM",
    filterValue: "300×600 mm",
    count: "81 designs",
    types: "Glossy · Ceramic · Wall",
    description:
      "Premium digital ceramic wall tiles with outstanding finish and rich detailing.",
    image: "/images/catalogs/wall-300x600.png",
    pdf: "/catalogs/300x600.pdf",
    sortOrder: 30,
  },
  {
    name: "Wall Tiles — 300×450MM",
    slug: "300x450",
    size: "300×450MM",
    filterValue: "300×450 mm",
    count: "191 designs",
    types: "Glossy · Matt · Elevation",
    description:
      "Our finest ceramic wall tiles featuring modern designs and superior durability.",
    image: "/images/catalogs/wall-300x450.png",
    pdf: "/catalogs/300x450.pdf",
    sortOrder: 40,
  },
  {
    name: "Spirit of Nepal",
    slug: "spirit-of-nepal",
    size: "Mixed Sizes",
    filterValue: "spirit",
    count: "34 designs",
    types: "Dhaka · Thangka · Mithila · Flagstone",
    description:
      "Heritage tiles inspired by Nepali culture — Palpali Dhaka, Thangka Art, Mithila Art, and natural Flagstone.",
    image: "/images/catalogs/spirit-of-nepal.png",
    pdf: "/catalogs/spirit-of-nepal.pdf",
    sortOrder: 50,
  },
];

let sanityCatalogs: CatalogEntry[] | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  sanityCatalogs = require("./sanity-catalogs.json");
} catch {
  // JSON not yet generated — use local data
}

export const catalogEntries: CatalogEntry[] =
  sanityCatalogs && sanityCatalogs.length > 0
    ? sanityCatalogs
    : localCatalogEntries;
