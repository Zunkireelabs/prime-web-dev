/**
 * Pre-build script: Fetches all tile products from Sanity CMS
 * and writes them as a static JSON file for the static export.
 *
 * Usage: npx tsx scripts/generate-catalog-data.ts
 * Runs automatically via `prebuild` npm script.
 */

import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import { writeFileSync, existsSync } from "fs";
import { resolve } from "path";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-04-01";

if (!projectId) {
  console.warn(
    "⚠️  NEXT_PUBLIC_SANITY_PROJECT_ID not set. Skipping Sanity data generation."
  );
  console.warn("   Using existing local catalog data instead.");
  process.exit(0);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

const allProductsQuery = `
  *[_type == "tileProduct"] | order(sortOrder asc, name asc) {
    name,
    "slug": slug.current,
    "catalog": catalog->catalogId,
    category,
    series,
    collection,
    size,
    finish,
    application,
    hasMatchingFloor,
    variants,
    image,
    sortOrder
  }
`;

interface SanityProduct {
  name: string;
  slug: string;
  catalog: string;
  category: string;
  series: string;
  collection?: string;
  size: string;
  finish: string;
  application: string;
  hasMatchingFloor?: string;
  variants?: string[];
  image: any;
  sortOrder: number;
}

async function generate() {
  console.log("📦 Fetching catalog data from Sanity...");

  const products: SanityProduct[] = await client.fetch(allProductsQuery);

  if (products.length === 0) {
    console.warn(
      "⚠️  No products found in Sanity. Keeping existing local data."
    );
    process.exit(0);
  }

  const transformed = products.map((p) => ({
    name: p.name,
    slug: p.slug,
    catalog: p.catalog,
    category: p.category,
    series: p.series,
    collection: p.collection || undefined,
    size: p.size,
    finish: p.finish,
    application: p.application,
    hasMatchingFloor: p.hasMatchingFloor || undefined,
    variants: p.variants || undefined,
    image: p.image
      ? urlFor(p.image).width(800).quality(80).format("webp").url()
      : "",
  }));

  const outputPath = resolve(
    __dirname,
    "../src/data/catalog/sanity-products.json"
  );
  writeFileSync(outputPath, JSON.stringify(transformed, null, 2));

  console.log(
    `✅ Generated ${transformed.length} products → src/data/catalog/sanity-products.json`
  );
}

generate().catch((err) => {
  console.error("❌ Failed to fetch catalog data from Sanity:", err.message);
  process.exit(1);
});
