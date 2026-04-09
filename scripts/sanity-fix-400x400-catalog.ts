/**
 * Fix script: Reassign 400×400 products from vitrified-600x600 to vitrified-400x400 catalog.
 *
 * Usage: export $(grep -v '^#' .env.local | xargs) && npx tsx scripts/sanity-fix-400x400-catalog.ts
 */

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("❌ Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-04-01",
  token,
  useCdn: false,
});

async function fix() {
  // Step 1: Ensure vitrified-400x400 catalog document exists
  console.log("📁 Ensuring vitrified-400x400 catalog exists...");
  await client.createOrReplace({
    _id: "catalog-vitrified-400x400",
    _type: "tileCatalog",
    name: "Vitrified 400×400",
    slug: { _type: "slug", current: "vitrified-400x400" },
    catalogId: "vitrified-400x400",
    description: "Patio and driveway vitrified tiles in 400×400mm format",
  });
  console.log("   ✅ Catalog document ready\n");

  // Step 2: Find all 400×400 products currently in wrong catalog
  const query = `*[_type == "tileProduct" && size == "400×400 mm" && catalog._ref == "catalog-vitrified-600x600"] { _id, name }`;
  const products = await client.fetch(query);

  if (products.length === 0) {
    console.log("✅ No products need fixing — all 400×400 tiles already in correct catalog.");
    return;
  }

  console.log(`🔄 Found ${products.length} products to reassign:\n`);

  // Step 3: Patch all products to point to correct catalog
  const tx = client.transaction();
  for (const p of products) {
    console.log(`   → ${p.name}`);
    tx.patch(p._id, {
      set: {
        catalog: { _type: "reference", _ref: "catalog-vitrified-400x400" },
      },
    });
  }

  await tx.commit();
  console.log(`\n✅ Reassigned ${products.length} products to vitrified-400x400 catalog.`);
}

fix().catch((err) => {
  console.error("❌ Fix failed:", err.message);
  process.exit(1);
});
