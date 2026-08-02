/**
 * Export tile products from Sanity to CSV.
 *
 * Used for:
 *   - Audit / archival snapshots (commit to data-exports/)
 *   - Starting point for bulk edits (copy to data-drafts/, edit, then import)
 *
 * Usage:
 *   export $(grep -v '^#' .env.local | xargs)
 *   npx tsx scripts/sanity-export-csv.ts --catalog vitrified-400x400
 *   npx tsx scripts/sanity-export-csv.ts --all
 *
 * Output: data-exports/<catalog>.csv (one file per catalog)
 */

import { createClient } from "@sanity/client";
import Papa from "papaparse";
import { writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";

const args = process.argv.slice(2);
const getArg = (name: string) => {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 ? args[idx + 1] : undefined;
};
const hasFlag = (name: string) => args.includes(`--${name}`);

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

interface ExportedRow {
  sanity_id: string;
  name: string;
  slug: string;
  catalog: string;
  series: string;
  category: string;
  size: string;
  finish: string;
  application: string;
  spaces: string;
  collection: string;
  has_matching_floor: string;
  variants: string;
  image_filename: string;
  image_url: string;
  hidden: string;
  sort_order: string;
  notes: string;
}

const COLUMNS: (keyof ExportedRow)[] = [
  "sanity_id",
  "name",
  "slug",
  "catalog",
  "series",
  "category",
  "size",
  "finish",
  "application",
  "spaces",
  "collection",
  "has_matching_floor",
  "variants",
  "image_filename",
  "image_url",
  "hidden",
  "sort_order",
  "notes",
];

async function fetchCatalog(catalogId: string): Promise<ExportedRow[]> {
  const query = `
    *[_type == "tileProduct" && catalog->catalogId == $catalogId] | order(sortOrder asc, name asc) {
      "sanity_id": _id,
      name,
      "slug": slug.current,
      "catalog": catalog->catalogId,
      series,
      category,
      size,
      finish,
      application,
      spaces,
      collection,
      "has_matching_floor": hasMatchingFloor,
      variants,
      "image_filename": image.asset->originalFilename,
      "image_url": image.asset->url,
      hidden,
      "sort_order": sortOrder
    }
  `;
  const docs = await client.fetch(query, { catalogId });

  return docs.map((d: any): ExportedRow => ({
    sanity_id: d.sanity_id || "",
    name: d.name || "",
    slug: d.slug || "",
    catalog: d.catalog || catalogId,
    series: d.series || "",
    category: d.category || "",
    size: d.size || "",
    finish: d.finish || "",
    application: d.application || "",
    spaces: Array.isArray(d.spaces) ? d.spaces.join(", ") : "",
    collection: d.collection || "",
    has_matching_floor: d.has_matching_floor || "",
    variants: Array.isArray(d.variants) ? d.variants.join("|") : "",
    image_filename: d.image_filename || "",
    image_url: d.image_url || "",
    hidden: d.hidden === true ? "TRUE" : "FALSE",
    sort_order: d.sort_order != null ? String(d.sort_order) : "",
    notes: "",
  }));
}

async function exportCatalog(catalogId: string) {
  console.log(`📥 Fetching ${catalogId}...`);
  const rows = await fetchCatalog(catalogId);
  console.log(`   ${rows.length} products`);

  const csv = Papa.unparse(
    { fields: COLUMNS as string[], data: rows.map((r) => COLUMNS.map((c) => r[c])) },
    { quotes: true }
  );

  const outPath = resolve(`data-exports/${catalogId}.csv`);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, csv, "utf8");
  console.log(`   ✅ Wrote ${outPath}\n`);

  return rows.length;
}

async function listCatalogs(): Promise<string[]> {
  const result = await client.fetch<{ catalogId: string }[]>(
    `*[_type == "tileCatalog"] | order(catalogId asc) { catalogId }`
  );
  return result.map((r) => r.catalogId);
}

async function main() {
  const single = getArg("catalog");
  const all = hasFlag("all");

  if (!single && !all) {
    console.error(
      "Usage: npx tsx scripts/sanity-export-csv.ts --catalog <id>  | --all"
    );
    process.exit(1);
  }

  console.log("\n📦 Sanity → CSV export\n");

  const catalogs = single ? [single] : await listCatalogs();
  let total = 0;
  for (const cat of catalogs) {
    total += await exportCatalog(cat);
  }
  console.log(`🎉 Exported ${total} products across ${catalogs.length} catalog(s).\n`);
}

main().catch((err) => {
  console.error("❌ Export failed:", err.message);
  process.exit(1);
});
