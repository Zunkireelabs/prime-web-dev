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
  useCdn: false,
});

const builder = createImageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

const allProductsQuery = `
  *[_type == "tileProduct" && !(hidden == true)] | order(sortOrder asc, name asc) {
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
    imageRotation,
    hasGallery,
    "gallery": gallery[]{ "url": image.asset->url, label, caption },
    showFirst,
    panelLayout,
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
  imageRotation?: number;
  hasGallery?: boolean;
  gallery?: { url: string; label?: string; caption?: string }[];
  showFirst?: string;
  panelLayout?: {
    cols?: number;
    rows?: number;
    orientation?: string;
  };
  sortOrder: number;
}

function dimsFor(size: string): { w: number; h: number } {
  const m = size.match(/(\d+)\s*[×x]\s*(\d+)/);
  if (!m) return { w: 800, h: 800 };
  const sw = parseInt(m[1], 10);
  const sh = parseInt(m[2], 10);
  const longest = Math.max(sw, sh);
  return {
    w: Math.round((sw / longest) * 800),
    h: Math.round((sh / longest) * 800),
  };
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

  const transformed = products.map((p) => {
    const dims = dimsFor(p.size);
    const isSquare = dims.w === dims.h;
    let imageUrl = "";
    if (p.image) {
      const builder = urlFor(p.image);
      imageUrl = isSquare
        ? builder
            .width(dims.w)
            .height(dims.h)
            .fit("crop")
            .quality(80)
            .format("webp")
            .url()
        : builder.width(800).quality(80).format("webp").url();
    }
    return {
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
      image: imageUrl,
      imageRotation: p.imageRotation || undefined,
      hasGallery: p.hasGallery || undefined,
      gallery: p.gallery?.length ? p.gallery : undefined,
      showFirst: p.showFirst || undefined,
      panelLayout:
        p.panelLayout?.cols && p.panelLayout?.rows
          ? {
              cols: p.panelLayout.cols,
              rows: p.panelLayout.rows,
              orientation:
                p.panelLayout.orientation === "vertical"
                  ? "vertical"
                  : "horizontal",
            }
          : undefined,
    };
  });

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
