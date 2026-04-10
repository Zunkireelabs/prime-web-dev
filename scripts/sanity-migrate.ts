/**
 * Migration script: Exports existing TypeScript product data to Sanity CMS.
 *
 * Usage: npx tsx scripts/sanity-migrate.ts
 *
 * Prerequisites:
 *   1. Sanity project created with schemas deployed
 *   2. SANITY_API_TOKEN set in .env.local
 *   3. (Optional) Run sanity-upload-images.ts first to populate image-map.json
 *
 * This script:
 *   1. Creates tileCatalog documents (6 catalogs)
 *   2. Creates tileProduct documents for all existing products
 *   3. Links images from image-map.json if available
 */

import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

// ── Sanity client ──

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

// ── Load image map ──

const mapPath = resolve(__dirname, "image-map.json");
const imageMap: Record<string, string> = existsSync(mapPath)
  ? JSON.parse(readFileSync(mapPath, "utf-8"))
  : {};

console.log(
  `📎 Image map: ${Object.keys(imageMap).length} assets loaded\n`
);

// ── Catalog definitions ──

const catalogs = [
  {
    _id: "catalog-wall-300x450",
    _type: "tileCatalog" as const,
    name: "Wall Tiles 300×450",
    slug: { _type: "slug" as const, current: "wall-300x450" },
    catalogId: "wall-300x450",
    description: "Ceramic wall tiles in 300×450mm format",
  },
  {
    _id: "catalog-wall-300x600",
    _type: "tileCatalog" as const,
    name: "Wall Tiles 300×600",
    slug: { _type: "slug" as const, current: "wall-300x600" },
    catalogId: "wall-300x600",
    description: "Ceramic and porcelain wall tiles in 300×600mm format",
  },
  {
    _id: "catalog-vitrified-400x400",
    _type: "tileCatalog" as const,
    name: "Vitrified 400×400",
    slug: { _type: "slug" as const, current: "vitrified-400x400" },
    catalogId: "vitrified-400x400",
    description: "Patio and driveway vitrified tiles in 400×400mm format",
  },
  {
    _id: "catalog-vitrified-600x600",
    _type: "tileCatalog" as const,
    name: "Vitrified 600×600",
    slug: { _type: "slug" as const, current: "vitrified-600x600" },
    catalogId: "vitrified-600x600",
    description: "Vitrified floor tiles in 600×600mm format",
  },
  {
    _id: "catalog-eleganz-600x1200",
    _type: "tileCatalog" as const,
    name: "Eleganz 600×1200",
    slug: { _type: "slug" as const, current: "eleganz-600x1200" },
    catalogId: "eleganz-600x1200",
    description: "Premium large format glazed vitrified tiles",
  },
  {
    _id: "catalog-spirit-of-nepal",
    _type: "tileCatalog" as const,
    name: "Spirit of Nepal",
    slug: { _type: "slug" as const, current: "spirit-of-nepal" },
    catalogId: "spirit-of-nepal",
    description: "Heritage and cultural collection inspired by Nepal",
  },
];

// ── Map catalog ID → Sanity document ID ──

const catalogRefMap: Record<string, string> = {};
for (const cat of catalogs) {
  catalogRefMap[cat.catalogId] = cat._id;
}

// ── Image matching ──

function findImageAsset(imagePath: string): string | null {
  if (!imagePath) return null;

  // Extract filename from path like "/images/catalog/wall-600/zotak-slate.jpg"
  const filename = imagePath.split("/").pop();
  if (!filename) return null;

  // Direct match
  if (imageMap[filename]) return imageMap[filename];

  // Try without extension
  const nameWithoutExt = filename.replace(/\.[^.]+$/, "");
  for (const [key, val] of Object.entries(imageMap)) {
    if (key.replace(/\.[^.]+$/, "") === nameWithoutExt) return val;
  }

  return null;
}

// ── Main migration ──

async function migrate() {
  // Step 1: Create catalog documents
  console.log("📁 Creating catalog documents...");
  const catalogTx = client.transaction();
  for (const cat of catalogs) {
    catalogTx.createOrReplace(cat);
  }
  await catalogTx.commit();
  console.log(`   ✅ ${catalogs.length} catalogs created\n`);

  // Step 2: Import existing products from TypeScript data
  // Dynamic import to handle TS paths
  console.log("📦 Loading existing product data...");

  // We import the compiled data directly
  const {
    wall300x450,
  } = await import("../src/data/catalog/wall-300x450");
  const {
    wall300x600,
  } = await import("../src/data/catalog/wall-300x600");
  const {
    vitrified400x400,
  } = await import("../src/data/catalog/vitrified-400x400");
  const {
    vitrified600x600,
  } = await import("../src/data/catalog/vitrified-600x600");
  const {
    eleganz600x1200,
  } = await import("../src/data/catalog/eleganz-600x1200");
  const {
    spiritOfNepal,
  } = await import("../src/data/catalog/spirit-of-nepal");

  const allProducts = [
    ...wall300x450,
    ...wall300x600,
    ...vitrified400x400,
    ...vitrified600x600,
    ...eleganz600x1200,
    ...spiritOfNepal,
  ];

  console.log(`   Found ${allProducts.length} products\n`);

  // Step 3: Create product documents in batches
  console.log("🏗️  Creating product documents...");

  const BATCH_SIZE = 50;
  let created = 0;
  let skippedImages = 0;

  for (let i = 0; i < allProducts.length; i += BATCH_SIZE) {
    const batch = allProducts.slice(i, i + BATCH_SIZE);
    const tx = client.transaction();

    for (const product of batch) {
      const catalogRef = catalogRefMap[product.catalog];
      if (!catalogRef) {
        console.warn(
          `   ⚠️  Unknown catalog "${product.catalog}" for ${product.name}`
        );
        continue;
      }

      const imageAssetId = findImageAsset(product.image);
      if (!imageAssetId) skippedImages++;

      const doc: any = {
        _type: "tileProduct",
        name: product.name,
        slug: { _type: "slug", current: product.slug },
        catalog: { _type: "reference", _ref: catalogRef },
        category: product.category,
        series: product.series,
        size: product.size,
        finish: product.finish,
        application: product.application,
        sortOrder: 100 + i + batch.indexOf(product),
      };

      if (product.collection) doc.collection = product.collection;
      if (product.hasMatchingFloor)
        doc.hasMatchingFloor = product.hasMatchingFloor;
      if (product.variants && product.variants.length > 0)
        doc.variants = product.variants;

      if (imageAssetId) {
        doc.image = {
          _type: "image",
          asset: { _type: "reference", _ref: imageAssetId },
          alt: product.name,
        };
      }

      tx.create(doc);
      created++;
    }

    await tx.commit();
    console.log(
      `   [${Math.min(i + BATCH_SIZE, allProducts.length)}/${allProducts.length}] batch committed`
    );
  }

  console.log(`\n✅ Migration complete!`);
  console.log(`   Products created: ${created}`);
  console.log(`   Images linked: ${created - skippedImages}`);
  console.log(`   Images missing: ${skippedImages}`);
  if (skippedImages > 0) {
    console.log(
      `   → Run sanity-upload-images.ts first, then re-run this script`
    );
  }
}

migrate().catch((err) => {
  console.error("❌ Migration failed:", err.message);
  process.exit(1);
});
