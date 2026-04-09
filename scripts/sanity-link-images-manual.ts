/**
 * Manual image linking for products that fuzzy match missed.
 * Maps product names → image filenames directly.
 */

import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("❌ Set env vars");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-04-01",
  token,
  useCdn: false,
});

function loadMap(catalogId: string): Record<string, string> {
  const path = resolve(__dirname, `image-map-${catalogId}.json`);
  return existsSync(path) ? JSON.parse(readFileSync(path, "utf-8")) : {};
}

// ── Manual mappings: Product Name → Image Filename ──

const manualMappings300x600: Record<string, string> = {
  // Florello → FIORELLO (spelling difference)
  "Florello Light": "FIORELLO_LIGHT.jpg",
  "Florello HL": "FIORELLO_HL.jpg",
  "Florello Dark": "FIORELLO_DARK.jpg",
  // Trevertino → TRAVERTINO (spelling difference)
  "Trevertino Light": "TRAVERTINO GREY LIGHT.jpg",
  "Trevertino Dark": "TRAVERTINO GREY DARK.jpg",
};

const manualMappings400x400: Record<string, string> = {
  "Zeal Dotted Brown": "zealdotted brown.jpg",
};

async function linkManual(
  catalogId: string,
  mappings: Record<string, string>
) {
  const imageMap = loadMap(catalogId);
  if (Object.keys(imageMap).length === 0) return;

  console.log(`\n📎 Manual linking for ${catalogId}...`);

  const entries = Object.entries(mappings);
  let linked = 0;

  for (const [productName, filename] of entries) {
    const assetId = imageMap[filename];
    if (!assetId) {
      console.log(`   ⚠️  No asset for filename: ${filename}`);
      continue;
    }

    // Find the product
    const products: { _id: string; name: string }[] = await client.fetch(
      `*[_type == "tileProduct" && name == $name && catalog->catalogId == $catalogId]{ _id, name }`,
      { name: productName, catalogId }
    );

    if (products.length === 0) {
      console.log(`   ⚠️  Product not found: ${productName}`);
      continue;
    }

    const tx = client.transaction();
    for (const p of products) {
      tx.patch(p._id, {
        set: {
          image: {
            _type: "image",
            asset: { _type: "reference", _ref: assetId },
          },
        },
      });
    }
    await tx.commit();
    console.log(`   ✅ ${productName} → ${filename}`);
    linked++;
  }

  console.log(`   Linked: ${linked}/${entries.length}`);
}

async function main() {
  await linkManual("wall-300x600", manualMappings300x600);
  await linkManual("vitrified-400x400", manualMappings400x400);

  // Report remaining unlinked
  for (const catalogId of ["wall-300x600", "vitrified-400x400"]) {
    const unlinked: { name: string }[] = await client.fetch(
      `*[_type == "tileProduct" && catalog->catalogId == $catalogId && !defined(image)] | order(name asc) { name }`,
      { catalogId }
    );
    if (unlinked.length > 0) {
      console.log(`\n⚠️  Still unlinked in ${catalogId} (${unlinked.length}):`);
      console.log(`   No images uploaded for these — need source photos:`);
      for (const p of unlinked) {
        console.log(`   - ${p.name}`);
      }
    }
  }

  console.log("\n🎉 Done!");
}

main().catch((err) => {
  console.error("❌ Failed:", err.message);
  process.exit(1);
});
