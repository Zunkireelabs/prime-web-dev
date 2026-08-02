/**
 * Import a CSV of tile products into Sanity.
 *
 * Follows the same reconcile pattern as sanity-reconcile-400x400.ts:
 *   - Match existing products by sanity_id OR normalized name
 *   - Patch matched products with CSV values
 *   - Create net-new products for unmatched CSV rows
 *   - Hide existing Sanity products that match no CSV row (if --hide-missing)
 *
 * Never deletes. Never touches catalogs other than --catalog.
 * Dry-run by default. Pass --confirm to execute.
 *
 * Usage:
 *   export $(grep -v '^#' .env.local | xargs)
 *   npx tsx scripts/sanity-import-csv.ts \
 *     --csv data-drafts/vitrified-600x600.csv \
 *     --catalog vitrified-600x600
 *
 *   # Execute
 *   npx tsx scripts/sanity-import-csv.ts \
 *     --csv data-drafts/vitrified-600x600.csv \
 *     --catalog vitrified-600x600 \
 *     --confirm
 *
 *   # Also hide existing Sanity products that aren't in the CSV (for full-replace workflows)
 *   npx tsx scripts/sanity-import-csv.ts \
 *     --csv ... --catalog ... --hide-missing --confirm
 */

import { createClient } from "@sanity/client";
import Papa from "papaparse";
import { readFileSync } from "fs";
import { resolve } from "path";

const args = process.argv.slice(2);
const getArg = (name: string) => {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 ? args[idx + 1] : undefined;
};
const hasFlag = (name: string) => args.includes(`--${name}`);

const csvPath = getArg("csv");
const catalogId = getArg("catalog");
const DRY_RUN = !hasFlag("confirm");
const HIDE_MISSING = hasFlag("hide-missing");

if (!csvPath || !catalogId) {
  console.error(
    "Usage: npx tsx scripts/sanity-import-csv.ts --csv <path> --catalog <id> [--confirm] [--hide-missing]"
  );
  process.exit(1);
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    "❌ Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN in .env.local"
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

const CATALOG_REF = `catalog-${catalogId}`;

interface CsvRow {
  sanity_id: string;
  name: string;
  slug: string;
  catalog: string;
  series: string;
  category: string;
  size: string;
  finish: string;
  application: string;
  spaces?: string;
  collection?: string;
  has_matching_floor?: string;
  variants?: string;
  image_filename?: string;
  image_url?: string;
  hidden: string;
  sort_order?: string;
  notes?: string;
}

interface ExistingProduct {
  _id: string;
  name: string;
  series?: string;
  category?: string;
  size?: string;
  finish?: string;
  application?: string;
  hidden?: boolean;
  hasImage: boolean;
}

// ── Validation ──

const ALLOWED_FINISH = new Set([
  "Glossy",
  "Matt",
  "High Gloss",
  "Carving",
  "Satin",
  "Rustic",
  "Polished",
]);
const ALLOWED_APPLICATION = new Set([
  "Wall",
  "Floor",
  "Wall & Floor",
  "Elevation",
  "Outdoor",
  "Patio",
  "Driveway",
  "Art Panel",
]);
const ALLOWED_SPACES = new Set([
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Bathroom",
  "Dining Room",
  "Office",
  "Balcony",
  "Outdoor",
  "Commercial",
  "Restaurant",
  "Hotel",
  "Hospital",
  "Apartment",
  "Showroom",
  "Staircase",
  "Elevation",
  "Parking",
]);
const ALLOWED_CATEGORY = new Set([
  "Ceramic",
  "Vitrified",
  "Glazed Vitrified",
  "Porcelain",
  "Wood Look",
  "Stone Look",
  "Marble Look",
  "Monochrome",
  "Patio",
  "Driveway",
  "Special Edition",
  "Art",
  "Cultural Heritage",
]);

function validateRow(row: CsvRow, lineNum: number): string[] {
  const errors: string[] = [];
  if (!row.name?.trim()) errors.push(`line ${lineNum}: missing name`);
  if (!row.catalog?.trim()) errors.push(`line ${lineNum}: missing catalog`);
  if (row.catalog !== catalogId) {
    errors.push(
      `line ${lineNum}: catalog "${row.catalog}" != --catalog "${catalogId}"`
    );
  }
  if (!row.series?.trim()) errors.push(`line ${lineNum}: missing series`);
  if (!row.category?.trim()) errors.push(`line ${lineNum}: missing category`);
  else if (!ALLOWED_CATEGORY.has(row.category))
    errors.push(`line ${lineNum}: invalid category "${row.category}"`);
  if (!row.size?.trim()) errors.push(`line ${lineNum}: missing size`);
  if (!row.finish?.trim()) errors.push(`line ${lineNum}: missing finish`);
  else if (!ALLOWED_FINISH.has(row.finish))
    errors.push(`line ${lineNum}: invalid finish "${row.finish}"`);
  if (!row.application?.trim())
    errors.push(`line ${lineNum}: missing application`);
  else if (!ALLOWED_APPLICATION.has(row.application))
    errors.push(`line ${lineNum}: invalid application "${row.application}"`);
  if (row.spaces?.trim()) {
    for (const sp of row.spaces.split(",").map((s) => s.trim()).filter(Boolean)) {
      if (!ALLOWED_SPACES.has(sp))
        errors.push(`line ${lineNum}: invalid space "${sp}"`);
    }
  }
  return errors;
}

const parseSpaces = (s?: string): string[] =>
  (s || "").split(",").map((v) => v.trim()).filter(Boolean);

const normalize = (s: string) =>
  (s || "").toLowerCase().replace(/[^a-z0-9]/g, "");

const slugify = (s: string) =>
  (s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function parseBool(v: string): boolean {
  const t = (v || "").trim().toLowerCase();
  return t === "true" || t === "yes" || t === "1";
}

// ── Main ──

async function main() {
  console.log(
    `\n📥 Import CSV → Sanity — ${DRY_RUN ? "DRY RUN (no writes)" : "EXECUTING"}`
  );
  console.log(`   catalog: ${catalogId}`);
  console.log(`   csv: ${csvPath}`);
  console.log(`   hide-missing: ${HIDE_MISSING ? "yes" : "no"}\n`);

  // Load CSV
  const raw = readFileSync(resolve(csvPath!), "utf8");
  const parsed = Papa.parse<CsvRow>(raw, {
    header: true,
    skipEmptyLines: true,
  });
  if (parsed.errors.length > 0) {
    console.error("❌ CSV parse errors:");
    for (const err of parsed.errors) console.error(`   ${err.message}`);
    process.exit(1);
  }
  const rows = parsed.data;
  console.log(`   Parsed ${rows.length} rows`);

  // Validate
  const allErrors: string[] = [];
  rows.forEach((r, i) => allErrors.push(...validateRow(r, i + 2))); // +2 = header + 1-indexed
  if (allErrors.length > 0) {
    console.error("\n❌ Validation errors:");
    for (const e of allErrors) console.error(`   ${e}`);
    process.exit(1);
  }
  console.log("   ✅ Validation passed\n");

  // Fetch existing products in this catalog
  const existing = await client.fetch<ExistingProduct[]>(
    `*[_type == "tileProduct" && catalog->catalogId == $c] {
      _id, name, series, category, size, finish, application, hidden,
      "hasImage": defined(image)
    }`,
    { c: catalogId }
  );
  console.log(`   Sanity has ${existing.length} existing products in ${catalogId}\n`);

  // Build lookup maps
  const existingById = new Map(existing.map((p) => [p._id, p]));
  const existingByName = new Map(existing.map((p) => [normalize(p.name), p]));

  // Categorize rows
  const toPatch: Array<{ row: CsvRow; existing: ExistingProduct }> = [];
  const toCreate: CsvRow[] = [];
  const matchedIds = new Set<string>();

  for (const row of rows) {
    let match: ExistingProduct | undefined;
    if (row.sanity_id && existingById.has(row.sanity_id)) {
      match = existingById.get(row.sanity_id);
    } else {
      match = existingByName.get(normalize(row.name));
    }

    if (match) {
      matchedIds.add(match._id);
      toPatch.push({ row, existing: match });
    } else {
      toCreate.push(row);
    }
  }

  // Existing products not referenced by any CSV row
  const orphans = existing.filter((p) => !matchedIds.has(p._id));
  const toHide = HIDE_MISSING ? orphans.filter((p) => !p.hidden) : [];
  const orphansSkipped = HIDE_MISSING ? [] : orphans;

  // Print plan
  console.log(`🔄 PATCH (${toPatch.length}) — matched rows:`);
  for (const { row, existing: ex } of toPatch.slice(0, 20)) {
    const changes: string[] = [];
    if (ex.series !== row.series) changes.push(`series ${ex.series}→${row.series}`);
    if (ex.category !== row.category)
      changes.push(`category ${ex.category}→${row.category}`);
    if (ex.application !== row.application)
      changes.push(`app ${ex.application}→${row.application}`);
    if (ex.hidden !== parseBool(row.hidden))
      changes.push(`hidden ${ex.hidden}→${parseBool(row.hidden)}`);
    const diff = changes.length ? ` [${changes.join(", ")}]` : " (no changes)";
    console.log(`   ${row.name.padEnd(30)}${diff}`);
  }
  if (toPatch.length > 20) console.log(`   ... and ${toPatch.length - 20} more`);

  console.log(`\n➕ CREATE (${toCreate.length}) — new rows:`);
  for (const row of toCreate.slice(0, 30)) {
    console.log(
      `   ${row.name.padEnd(30)} series=${row.series} app=${row.application}`
    );
  }
  if (toCreate.length > 30) console.log(`   ... and ${toCreate.length - 30} more`);

  if (HIDE_MISSING) {
    console.log(
      `\n🔒 HIDE (${toHide.length}) — existing Sanity products not in CSV:`
    );
    for (const ex of toHide.slice(0, 30)) {
      console.log(`   ${ex.name.padEnd(30)} series=${ex.series || "?"}`);
    }
    if (toHide.length > 30) console.log(`   ... and ${toHide.length - 30} more`);
  } else if (orphansSkipped.length > 0) {
    console.log(
      `\n⚠️  ${orphansSkipped.length} existing products in Sanity but not in CSV. Use --hide-missing to hide them; otherwise they are untouched.`
    );
  }

  console.log(
    `\n📋 Summary: ${toPatch.length} patched, ${toCreate.length} created, ${toHide.length} hidden, ${orphansSkipped.length} untouched`
  );

  if (DRY_RUN) {
    console.log("\n✅ Dry run complete. Re-run with --confirm to execute.\n");
    return;
  }

  // Execute
  console.log("\n🚀 Executing...\n");
  const tx = client.transaction();

  for (const { row, existing: ex } of toPatch) {
    const patch: any = {
      name: row.name,
      slug: { _type: "slug", current: row.slug || slugify(row.name) },
      category: row.category,
      series: row.series,
      size: row.size,
      finish: row.finish,
      application: row.application,
      hidden: parseBool(row.hidden),
    };
    if (row.collection) patch.collection = row.collection;
    if (row.has_matching_floor) patch.hasMatchingFloor = row.has_matching_floor;
    if (row.variants) patch.variants = row.variants.split("|").filter(Boolean);
    if (row.sort_order) patch.sortOrder = Number(row.sort_order);
    if (row.spaces?.trim()) patch.spaces = parseSpaces(row.spaces);
    tx.patch(ex._id, { set: patch });
  }

  let sortCursor = 1000;
  for (const row of toCreate) {
    const doc: any = {
      _type: "tileProduct",
      name: row.name,
      slug: { _type: "slug", current: row.slug || slugify(row.name) },
      catalog: { _type: "reference", _ref: CATALOG_REF },
      category: row.category,
      series: row.series,
      size: row.size,
      finish: row.finish,
      application: row.application,
      sortOrder: row.sort_order ? Number(row.sort_order) : sortCursor++,
      hidden: parseBool(row.hidden),
    };
    if (row.collection) doc.collection = row.collection;
    if (row.has_matching_floor) doc.hasMatchingFloor = row.has_matching_floor;
    if (row.variants) doc.variants = row.variants.split("|").filter(Boolean);
    if (row.spaces?.trim()) doc.spaces = parseSpaces(row.spaces);
    tx.create(doc);
  }

  for (const ex of toHide) {
    tx.patch(ex._id, { set: { hidden: true } });
  }

  await tx.commit();
  console.log("✅ Import committed.\n");
}

main().catch((err) => {
  console.error("❌ Import failed:", err.message);
  process.exit(1);
});
