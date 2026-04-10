/**
 * Bootstrap a draft CSV for a new catalog by walking a source folder of tile photos.
 *
 * Designed to handle the client's folder layout:
 *   <source>/                        ← top-level tiles
 *     Outdoor Tiles/                 ← subfolder → series "Outdoor", application "Outdoor"
 *     Parking Tiles/                 ← subfolder → series "Parking", application "Driveway"
 *
 * Pure discovery: never touches Sanity, never writes to data-exports/.
 * Output goes to data-drafts/ — human opens in Excel, fills missing fields,
 * then runs `sanity-import-csv.ts`.
 *
 * Usage:
 *   npx tsx scripts/catalog-from-folder.ts \
 *     --dir "/Users/x/.../400X400 MM" \
 *     --catalog vitrified-400x400 \
 *     --size "400×400 mm" \
 *     --out data-drafts/vitrified-400x400.csv
 */

import Papa from "papaparse";
import { readdirSync, statSync, writeFileSync, mkdirSync } from "fs";
import { resolve, join, basename, extname, dirname } from "path";

const args = process.argv.slice(2);
const getArg = (name: string) => {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 ? args[idx + 1] : undefined;
};

const sourceDir = getArg("dir");
const catalogId = getArg("catalog");
const size = getArg("size");
const outPath = getArg("out");

if (!sourceDir || !catalogId || !size || !outPath) {
  console.error(
    "Usage: npx tsx scripts/catalog-from-folder.ts --dir <path> --catalog <id> --size <size> --out <csv>"
  );
  console.error('  --dir      Source folder of images (e.g. "~/Desktop/.../400X400 MM")');
  console.error('  --catalog  Catalog ID (e.g. "vitrified-400x400")');
  console.error('  --size     Size string (e.g. "400×400 mm")');
  console.error('  --out      Output CSV path (e.g. "data-drafts/vitrified-400x400.csv")');
  process.exit(1);
}

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Turn a source filename into a clean display name.
//   "CASSION VELVET .jpg"      → "Cassion Velvet"
//   "VID_LA_AK10116 -1.jpg"    → "Vid La Ak10116 1"
//   "plaster fade grey.jpg"    → "Plaster Fade Grey"
function filenameToName(filename: string): string {
  const base = basename(filename, extname(filename));
  return base
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

interface DraftRow {
  sanity_id: string;
  name: string;
  slug: string;
  catalog: string;
  series: string;
  category: string;
  size: string;
  finish: string;
  application: string;
  collection: string;
  has_matching_floor: string;
  variants: string;
  image_filename: string;
  image_url: string;
  hidden: string;
  sort_order: string;
  notes: string;
}

const COLUMNS: (keyof DraftRow)[] = [
  "sanity_id",
  "name",
  "slug",
  "catalog",
  "series",
  "category",
  "size",
  "finish",
  "application",
  "collection",
  "has_matching_floor",
  "variants",
  "image_filename",
  "image_url",
  "hidden",
  "sort_order",
  "notes",
];

// Guess category + application from a subfolder name.
// These are heuristics — humans can override in Excel.
function guessFromFolder(folderName: string | null): {
  series: string;
  category: string;
  application: string;
} {
  if (!folderName) {
    return { series: "Classic", category: "Vitrified", application: "Floor" };
  }
  const lower = folderName.toLowerCase();
  if (lower.includes("outdoor")) {
    return { series: "Outdoor", category: "Patio", application: "Outdoor" };
  }
  if (lower.includes("parking") || lower.includes("driveway")) {
    return { series: "Parking", category: "Driveway", application: "Driveway" };
  }
  if (lower.includes("wall")) {
    return { series: "Classic", category: "Ceramic", application: "Wall" };
  }
  if (lower.includes("floor")) {
    return { series: "Classic", category: "Vitrified", application: "Floor" };
  }
  return { series: folderName, category: "Vitrified", application: "Floor" };
}

function walk(dir: string, subfolder: string | null = null): DraftRow[] {
  const rows: DraftRow[] = [];
  const entries = readdirSync(dir);

  // Sort: files first, then subfolders (so top-level tiles appear before subcategories)
  const files: string[] = [];
  const folders: string[] = [];
  for (const entry of entries) {
    if (entry.startsWith(".")) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) folders.push(entry);
    else if (IMAGE_EXT.has(extname(entry).toLowerCase())) files.push(entry);
  }

  for (const file of files) {
    const name = filenameToName(file);
    const slug = slugify(name);
    const guess = guessFromFolder(subfolder);
    rows.push({
      sanity_id: "",
      name,
      slug,
      catalog: catalogId!,
      series: guess.series,
      category: guess.category,
      size: size!,
      finish: "Matt",
      application: guess.application,
      collection: "",
      has_matching_floor: "",
      variants: "",
      image_filename: file,
      image_url: "",
      hidden: "FALSE",
      sort_order: "",
      notes: "",
    });
  }

  for (const folder of folders) {
    rows.push(...walk(join(dir, folder), folder));
  }

  return rows;
}

function main() {
  console.log(`\n📂 Walking ${sourceDir}...\n`);
  const rows = walk(resolve(sourceDir!));
  console.log(`   Found ${rows.length} image files`);

  // Group + report by series
  const bySeries: Record<string, number> = {};
  for (const r of rows) bySeries[r.series] = (bySeries[r.series] || 0) + 1;
  for (const [series, n] of Object.entries(bySeries)) {
    console.log(`   • ${series.padEnd(15)} ${n}`);
  }

  // Assign sortOrder 100, 101, 102...
  rows.forEach((r, i) => {
    r.sort_order = String(100 + i);
  });

  const csv = Papa.unparse(
    { fields: COLUMNS as string[], data: rows.map((r) => COLUMNS.map((c) => r[c])) },
    { quotes: true }
  );

  const absOut = resolve(outPath!);
  mkdirSync(dirname(absOut), { recursive: true });
  writeFileSync(absOut, csv, "utf8");
  console.log(`\n✅ Wrote ${absOut}`);
  console.log("   Open in Excel, review series/category/finish columns, then import.\n");
}

main();
