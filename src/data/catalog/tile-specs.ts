// ─── Prime Ceramics — Tile Technical Specifications ───
// Single source of truth for per-size specs.
// Used by: CalculatorForm, ProductDetailPanel, CatalogShowcase, spec sheets.

export interface TileSpecs {
  size: string;
  dimensions: string;
  thickness: string;
  tilesPerBox: number;
  sqmPerTile: number;
  areaPerBox: string;
  weightPerBox: number;
  tileType: "Wall" | "Floor";
  waterAbsorption: string;
  breakingStrength: string;
  modulusOfRupture: string;
  scratchHardness: string;
  surfaceAbrasion: string;
  standard: string;
}

export const tileSpecsBySize: Record<string, TileSpecs> = {
  "300×300 mm": {
    size: "300×300 mm",
    dimensions: "300 x 300 mm",
    thickness: "8.5 mm",
    tilesPerBox: 10,
    sqmPerTile: 0.09,
    areaPerBox: "0.90 sq.m",
    weightPerBox: 13.1,
    tileType: "Floor",
    waterAbsorption: "≤ 3%",
    breakingStrength: "≥ 600 N",
    modulusOfRupture: "≥ 22 N/mm²",
    scratchHardness: "≥ 5 Mohs",
    surfaceAbrasion: "Class 3 (PEI III)",
    standard: "ISO 10545 / NS 617:2082",
  },
  "300×450 mm": {
    size: "300×450 mm",
    dimensions: "300 x 450 mm",
    thickness: "8.5 mm",
    tilesPerBox: 8,
    sqmPerTile: 0.135,
    areaPerBox: "1.08 sq.m",
    weightPerBox: 11.9,
    tileType: "Wall",
    waterAbsorption: "6% – 10%",
    breakingStrength: "≥ 600 N",
    modulusOfRupture: "≥ 15 N/mm²",
    scratchHardness: "≥ 3 Mohs",
    surfaceAbrasion: "Class 1 (PEI I)",
    standard: "ISO 10545 / NS 617:2082",
  },
  "300×600 mm": {
    size: "300×600 mm",
    dimensions: "300 x 600 mm",
    thickness: "8.5 mm",
    tilesPerBox: 6,
    sqmPerTile: 0.18,
    areaPerBox: "1.08 sq.m",
    weightPerBox: 15.5,
    tileType: "Wall",
    waterAbsorption: "6% – 10%",
    breakingStrength: "≥ 800 N",
    modulusOfRupture: "≥ 15 N/mm²",
    scratchHardness: "≥ 3 Mohs",
    surfaceAbrasion: "Class 1 (PEI I)",
    standard: "ISO 10545 / NS 617:2082",
  },
  "400×400 mm": {
    size: "400×400 mm",
    dimensions: "400 x 400 mm",
    thickness: "8.5 mm",
    tilesPerBox: 6,
    sqmPerTile: 0.16,
    areaPerBox: "0.96 sq.m",
    weightPerBox: 18,
    tileType: "Floor",
    waterAbsorption: "≤ 3%",
    breakingStrength: "≥ 1000 N",
    modulusOfRupture: "≥ 22 N/mm²",
    scratchHardness: "≥ 5 Mohs",
    surfaceAbrasion: "Class 4 (PEI IV)",
    standard: "ISO 10545 / NS 617:2082",
  },
  "600×600 mm": {
    size: "600×600 mm",
    dimensions: "600 x 600 mm",
    thickness: "8.5 mm",
    tilesPerBox: 4,
    sqmPerTile: 0.36,
    areaPerBox: "1.44 sq.m",
    weightPerBox: 25,
    tileType: "Floor",
    waterAbsorption: "≤ 0.5%",
    breakingStrength: "≥ 1300 N",
    modulusOfRupture: "≥ 35 N/mm²",
    scratchHardness: "≥ 6 Mohs",
    surfaceAbrasion: "Class 4 (PEI IV)",
    standard: "ISO 10545 / NS 617:2082",
  },
  "600×1200 mm": {
    size: "600×1200 mm",
    dimensions: "600 x 1200 mm",
    thickness: "8.5 mm",
    tilesPerBox: 2,
    sqmPerTile: 0.72,
    areaPerBox: "1.44 sq.m",
    weightPerBox: 29.5,
    tileType: "Floor",
    waterAbsorption: "≤ 0.08%",
    breakingStrength: "≥ 1600 N",
    modulusOfRupture: "≥ 35 N/mm²",
    scratchHardness: "≥ 7 Mohs",
    surfaceAbrasion: "Class 5 (PEI V)",
    standard: "ISO 10545 / NS 617:2082",
  },
};

/** Look up specs by size string (e.g. "300×450 mm") */
export function getSpecsBySize(size: string): TileSpecs | null {
  return tileSpecsBySize[size] ?? null;
}

/** All size keys */
export const allSizes = Object.keys(tileSpecsBySize);
