/**
 * All-in-one bulk upload: reads a CSV, uploads images, creates/updates products.
 *
 * CSV columns (header row required):
 *   image_name     — Filename of the image (e.g., "ALCAZAR LIGHT.jpg")
 *   product_name   — Display name (e.g., "Alcazar Light")
 *   size           — Tile size (e.g., "300×450 mm")
 *   series         — Series/design name (e.g., "Alcazar")
 *   finish         — Glossy | Matt | High Gloss | Carving | Satin | Polished
 *   tile_type      — Wall | Floor | Wall & Floor | Elevation | Outdoor | Art Panel
 *   category       — Ceramic | Vitrified | Glazed Vitrified | etc.
 *   spaces         — Comma-separated: Living Room, Kitchen, Bathroom, etc.
 *   collection     — (optional) Collection grouping
 *   has_matching_floor — (optional) e.g., "300×300 mm"
 *
 * Usage:
 *   # Dry run (preview what will happen):
 *   npx tsx scripts/bulk-upload.ts --csv products.csv --images ./tile-photos
 *
 *   # Execute:
 *   npx tsx scripts/bulk-upload.ts --csv products.csv --images ./tile-photos --confirm
 */

import { createClient } from "@sanity/client";
import Papa from "papaparse";
import {
  readFileSync,
  existsSync,
  createReadStream,
  readdirSync,
} from "fs";
import { resolve, basename, join } from "path";

// ── Parse CLI args ──

const args = process.argv.slice(2);
const getArg = (name: string) => {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 ? args[idx + 1] : undefined;
};
const hasFlag = (name: string) => args.includes(`--${name}`);

const csvPath = getArg("csv");
const imagesDir = getArg("images");
const DRY_RUN = !hasFlag("confirm");

if (!csvPath) {
  console.error(`
\u2554${"═".repeat(62)}\u2557
\u2551  Prime Ceramics — Bulk Product Upload                          \u2551
\u255A${"═".repeat(62)}\u255D

Usage:
  npx tsx scripts/bulk-upload.ts --csv <file.csv> --images <folder> [--confirm]

Options:
  --csv       Path to CSV file with product data (required)
  --images    Folder containing tile images (optional)
  --confirm   Execute the upload (default: dry-run preview)

CSV Columns:
  image_name       — Image filename (e.g., "ALCAZAR LIGHT.jpg")
  product_name     — Product display name (e.g., "Alcazar Light")
  size             — 300\u00d7300 mm | 300\u00d7450 mm | 300\u00d7600 mm | 400\u00d7400 mm | 600\u00d7600 mm | 600\u00d71200 mm
  series           — Design series (e.g., "Alcazar")
  finish           — Glossy | Matt | High Gloss | Carving | Satin | Polished
  tile_type        — Wall | Floor | Both
  category         — Ceramic | Vitrified | Glazed Vitrified | Porcelain | etc.
  spaces           — Where to use (comma-separated): Living Room, Kitchen, Bathroom, etc.
  collection       — (optional) Collection grouping
  has_matching_floor — (optional) e.g., "300\u00d7300 mm"

Example:
  image_name,product_name,size,series,finish,tile_type,category,spaces,collection,has_matching_floor
  ALCAZAR LIGHT.jpg,Alcazar Light,300\u00d7450 mm,Alcazar,Glossy,Wall,Ceramic,"Living Room, Bathroom",,300\u00d7300 mm
  `);
  process.exit(1);
}

// ── Sanity client ──

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    "\u274C Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN in .env.local"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-04-01",
  token,
  useCdn: false,
});

// ── Validation ──

const ALLOWED_SIZES = new Set([
  "300\u00d7300 mm", "300\u00d7450 mm", "300\u00d7600 mm",
  "400\u00d7400 mm", "600\u00d7600 mm", "600\u00d71200 mm",
  "800\u00d7800 mm", "800\u00d71600 mm", "1200\u00d71200 mm", "1200\u00d72400 mm",
]);

const ALLOWED_FINISH = new Set([
  "Glossy", "Matt", "High Gloss", "Carving", "Satin", "Polished", "Rustic",
]);

const ALLOWED_TILE_TYPE = new Set([
  "Wall", "Floor", "Both",
]);

// Map CSV tile_type to Sanity application field
const TILE_TYPE_TO_APPLICATION: Record<string, string> = {
  "Wall": "Wall",
  "Floor": "Floor",
  "Both": "Wall & Floor",
};

const ALLOWED_CATEGORY = new Set([
  "Ceramic", "Vitrified", "Glazed Vitrified", "Porcelain",
  "Wood Look", "Stone Look", "Marble Look", "Monochrome",
  "Patio", "Driveway", "Special Edition", "Art", "Cultural Heritage",
]);

const ALLOWED_SPACES = new Set([
  "Living Room", "Bedroom", "Kitchen", "Bathroom", "Dining Room",
  "Office", "Balcony", "Outdoor", "Commercial", "Restaurant",
  "Hotel", "Hospital", "Apartment", "Showroom", "Staircase",
  "Elevation", "Parking",
]);

const SIZE_TO_CATALOG: Record<string, string> = {
  "300\u00d7300 mm": "wall-300x450",
  "300\u00d7450 mm": "wall-300x450",
  "300\u00d7600 mm": "wall-300x600",
  "400\u00d7400 mm": "vitrified-600x600",
  "600\u00d7600 mm": "vitrified-600x600",
  "600\u00d71200 mm": "eleganz-600x1200",
};

interface CsvRow {
  image_name: string;
  product_name: string;
  size: string;
  series: string;
  finish: string;
  tile_type: string;
  category: string;
  spaces: string;
  collection?: string;
  has_matching_floor?: string;
}

function slugify(s: string): string {
  return (s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseSpaces(s: string): string[] {
  if (!s?.trim()) return [];
  return s.split(",").map((v) => v.trim()).filter((v) => v.length > 0);
}

function validateRow(row: CsvRow, line: number): string[] {
  const errors: string[] = [];
  if (!row.product_name?.trim()) errors.push(`Line ${line}: missing product_name`);
  if (!row.size?.trim()) errors.push(`Line ${line}: missing size`);
  else if (!ALLOWED_SIZES.has(row.size.trim())) errors.push(`Line ${line}: invalid size "${row.size}". Use \u00d7 (multiplication sign), e.g., "300\u00d7450 mm"`);
  if (!row.series?.trim()) errors.push(`Line ${line}: missing series`);
  if (!row.finish?.trim()) errors.push(`Line ${line}: missing finish`);
  else if (!ALLOWED_FINISH.has(row.finish.trim())) errors.push(`Line ${line}: invalid finish "${row.finish}". Allowed: ${[...ALLOWED_FINISH].join(", ")}`);
  if (!row.tile_type?.trim()) errors.push(`Line ${line}: missing tile_type`);
  else if (!ALLOWED_TILE_TYPE.has(row.tile_type.trim())) errors.push(`Line ${line}: invalid tile_type "${row.tile_type}". Allowed: Wall, Floor, Both`);
  if (!row.category?.trim()) errors.push(`Line ${line}: missing category`);
  else if (!ALLOWED_CATEGORY.has(row.category.trim())) errors.push(`Line ${line}: invalid category "${row.category}"`);

  // Validate spaces
  const spaces = parseSpaces(row.spaces);
  for (const sp of spaces) {
    if (!ALLOWED_SPACES.has(sp)) {
      errors.push(`Line ${line}: invalid space "${sp}". Allowed: ${[...ALLOWED_SPACES].join(", ")}`);
    }
  }

  return errors;
}

// ── Main ──

async function main() {
  console.log(`\n${"═".repeat(60)}`);
  console.log(`  Prime Ceramics — Bulk Upload ${DRY_RUN ? "(DRY RUN)" : "(LIVE)"}`);
  console.log(`${"═".repeat(60)}\n`);

  // 1. Parse CSV
  const csvContent = readFileSync(resolve(csvPath!), "utf-8");
  const { data: rawRows, errors: parseErrors } = Papa.parse<CsvRow>(csvContent, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h: string) => h.trim().toLowerCase().replace(/\s+/g, "_"),
  });

  if (parseErrors.length > 0) {
    console.error("\u274C CSV parse errors:");
    parseErrors.forEach((e) => console.error(`  Line ${e.row}: ${e.message}`));
    process.exit(1);
  }

  console.log(`\uD83D\uDCC4 CSV: ${rawRows.length} rows from ${csvPath}`);

  // 2. Validate all rows
  const allErrors: string[] = [];
  rawRows.forEach((row, i) => {
    allErrors.push(...validateRow(row, i + 2));
  });

  if (allErrors.length > 0) {
    console.error(`\n\u274C Validation failed (${allErrors.length} errors):`);
    allErrors.forEach((e) => console.error(`  ${e}`));
    process.exit(1);
  }
  console.log(`\u2705 All rows validated\n`);

  // 3. Find available images
  const imageFiles = new Map<string, string>();
  if (imagesDir) {
    const dir = resolve(imagesDir);
    if (!existsSync(dir)) {
      console.error(`\u274C Images directory not found: ${dir}`);
      process.exit(1);
    }

    function scanDir(d: string) {
      for (const entry of readdirSync(d, { withFileTypes: true })) {
        if (entry.isDirectory()) {
          scanDir(join(d, entry.name));
        } else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) {
          imageFiles.set(entry.name.toLowerCase(), join(d, entry.name));
        }
      }
    }
    scanDir(dir);
    console.log(`\uD83D\uDDBC\uFE0F  Found ${imageFiles.size} images in ${imagesDir}\n`);
  }

  // 4. Process each row
  let created = 0;
  let updated = 0;
  let imagesUploaded = 0;
  let failed = 0;

  for (let i = 0; i < rawRows.length; i++) {
    const row = rawRows[i];
    const name = row.product_name.trim();
    const slug = slugify(name);
    const size = row.size.trim();
    const catalogId = SIZE_TO_CATALOG[size];

    if (!catalogId) {
      console.log(`  \u26A0\uFE0F  No catalog for size "${size}", skipping "${name}"`);
      failed++;
      continue;
    }

    const existing = await client.fetch(
      `*[_type == "tileProduct" && slug.current == $slug][0]{ _id, image }`,
      { slug }
    );

    const spaces = parseSpaces(row.spaces);

    const doc: Record<string, any> = {
      _type: "tileProduct",
      name,
      slug: { _type: "slug", current: slug },
      catalog: { _type: "reference", _ref: `catalog-${catalogId}` },
      category: row.category.trim(),
      series: row.series.trim(),
      size,
      finish: row.finish.trim(),
      application: TILE_TYPE_TO_APPLICATION[row.tile_type.trim()] || row.tile_type.trim(),
      hidden: false,
      sortOrder: 100,
    };

    if (spaces.length > 0) doc.spaces = spaces;
    if (row.collection?.trim()) doc.collection = row.collection.trim();
    if (row.has_matching_floor?.trim()) doc.hasMatchingFloor = row.has_matching_floor.trim();

    // Find image
    const imageName = (row.image_name || "").trim();
    const imagePath = imageFiles.get(imageName.toLowerCase());

    if (DRY_RUN) {
      const action = existing ? "UPDATE" : "CREATE";
      const imgStatus = imagePath ? "\uD83D\uDCF7" : imageName ? "\u26A0\uFE0F no img" : "\u2014";
      console.log(`  [${action}] ${name} | ${size} | ${row.tile_type} | ${row.finish} | ${spaces.join(", ") || "-"} ${imgStatus}`);
      if (existing) updated++;
      else created++;
      continue;
    }

    try {
      let imageRef: any = undefined;
      if (imagePath) {
        console.log(`  \uD83D\uDCE4 Uploading: ${basename(imagePath)}...`);
        const asset = await client.assets.upload(
          "image",
          createReadStream(imagePath),
          { filename: basename(imagePath) }
        );
        imageRef = {
          _type: "image",
          asset: { _type: "reference", _ref: asset._id },
        };
        imagesUploaded++;
      }

      if (existing) {
        const patch = client.patch(existing._id).set(doc);
        if (imageRef) patch.set({ image: imageRef });
        await patch.commit();
        console.log(`  \u2705 Updated "${name}"`);
        updated++;
      } else {
        if (imageRef) doc.image = imageRef;
        await client.create(doc);
        console.log(`  \u2705 Created "${name}"`);
        created++;
      }
    } catch (err: any) {
      console.error(`  \u274C Failed "${name}": ${err.message}`);
      failed++;
    }
  }

  // 5. Summary
  console.log(`\n${"═".repeat(60)}`);
  console.log(`  Summary ${DRY_RUN ? "(DRY RUN \u2014 no changes made)" : ""}`);
  console.log(`${"═".repeat(60)}`);
  console.log(`  Created:  ${created}`);
  console.log(`  Updated:  ${updated}`);
  console.log(`  Images:   ${imagesUploaded}`);
  console.log(`  Failed:   ${failed}`);
  console.log(`  Total:    ${rawRows.length}`);
  if (!DRY_RUN) {
    console.log(`\n  Run 'npm run prebuild' to regenerate local data.`);
  } else {
    console.log(`\n  Add --confirm to execute the upload.`);
  }
  console.log();
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
