/**
 * Read-only inspection script — prints current Sanity catalog/product state.
 *
 * Usage: export $(grep -v '^#' .env.local | xargs) && npx tsx scripts/sanity-inspect.ts
 */

import { createClient } from "@sanity/client";

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

async function inspect() {
  console.log("\n🔍 Sanity inspection report\n");

  const catalogs = await client.fetch(
    `*[_type == "tileCatalog"] | order(catalogId asc) { _id, name, catalogId }`
  );
  console.log(`📁 Catalogs (${catalogs.length}):`);
  for (const c of catalogs) {
    console.log(`   ${c.catalogId.padEnd(22)} → ${c._id}`);
  }

  console.log("");

  const groups = await client.fetch(
    `*[_type == "tileProduct"] { "catalogId": catalog->catalogId, "hasImage": defined(image) }`
  );

  const byCat: Record<string, { total: number; withImage: number }> = {};
  for (const p of groups) {
    const key = p.catalogId || "(no catalog)";
    if (!byCat[key]) byCat[key] = { total: 0, withImage: 0 };
    byCat[key].total++;
    if (p.hasImage) byCat[key].withImage++;
  }

  console.log(`🧱 Products by catalog:`);
  const cats = Object.keys(byCat).sort();
  let grandTotal = 0;
  let grandImages = 0;
  for (const cat of cats) {
    const { total, withImage } = byCat[cat];
    grandTotal += total;
    grandImages += withImage;
    console.log(
      `   ${cat.padEnd(22)} ${String(total).padStart(4)} total · ${String(
        withImage
      ).padStart(4)} with image`
    );
  }
  console.log(
    `   ${"TOTAL".padEnd(22)} ${String(grandTotal).padStart(4)} total · ${String(
      grandImages
    ).padStart(4)} with image\n`
  );

  // List current 400×400 products specifically
  const v400 = await client.fetch(
    `*[_type == "tileProduct" && catalog->catalogId == "vitrified-400x400"] | order(name asc) { _id, name, size, series, "hasImage": defined(image) }`
  );
  console.log(`📐 Current vitrified-400x400 products (${v400.length}):`);
  for (const p of v400) {
    const img = p.hasImage ? "✅" : "❌";
    console.log(
      `   ${img} ${p.name.padEnd(30)} size=${p.size || "?"} series=${
        p.series || "?"
      }`
    );
  }

  // List fake patio/driveway that may still live in vitrified-600x600
  const fakes = await client.fetch(
    `*[_type == "tileProduct" && catalog->catalogId == "vitrified-600x600" && (series == "Patio" || series == "Driveway")] | order(name asc) { _id, name, series, size }`
  );
  console.log(
    `\n🗑️  Stale patio/driveway products still in vitrified-600x600 (${fakes.length}):`
  );
  for (const p of fakes) {
    console.log(`   ${p.name.padEnd(30)} series=${p.series} size=${p.size}`);
  }

  console.log("");
}

inspect().catch((err) => {
  console.error("❌ Inspection failed:", err.message);
  process.exit(1);
});
