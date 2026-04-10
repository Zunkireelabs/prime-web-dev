/**
 * Links uploaded Sanity image assets to product documents.
 *
 * Reads image-map-{catalogId}.json files and fuzzy-matches
 * filenames to product names, then patches the image field.
 *
 * Usage: npx tsx scripts/sanity-link-images.ts
 */

import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

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

// ── Load image maps ──

function loadMap(catalogId: string): Record<string, string> {
  const path = resolve(__dirname, `image-map-${catalogId}.json`);
  if (!existsSync(path)) {
    console.warn(`⚠️  No image map for ${catalogId}`);
    return {};
  }
  return JSON.parse(readFileSync(path, "utf-8"));
}

// ── Normalize for matching ──

function normalize(s: string): string {
  return s
    .replace(/\.[^.]+$/, "")        // remove extension
    .replace(/_300x600|_400x400/gi, "") // remove size suffixes
    .replace(/[_\-\.]/g, " ")        // normalize separators
    .replace(/\s+/g, " ")           // collapse whitespace
    .trim()
    .toUpperCase();
}

// ── Build mapping: product name variants → image asset IDs ──

// Naming conventions in image files:
//   "ANGEL_DB.jpg"  → product "Angel Dark"
//   "ANGEL_HL.jpg"  → product "Angel HL"
//   "ANGEL_LB.jpg"  → product "Angel Light"
//   "CLASSY BEIGE-DB.jpg" → "Classy Beige Dark"
//   "DOVE_BASE.jpg" → "Dove Dark" or similar
//   "CHAKOL SATUTARIO BASE.jpg" → ...
//   "BLARE MINT_DECOR.jpg" → ...
//   For 400x400: "CASSION VELVET .jpg" → "Cassion Velvet"

const SUFFIX_MAP: Record<string, string[]> = {
  "DB": ["DARK"],
  "LB": ["LIGHT"],
  "BASE": ["BASE", "DARK"],      // BASE sometimes maps to dark variant
  "HL": ["HL"],
  "HL1": ["HL1"],
  "HL2": ["HL2"],
  "HL01": ["HL01", "HL1"],
  "HL02": ["HL02", "HL2"],
  "HL03": ["HL03", "HL3"],
  "DECOR": ["HL", "DECOR"],       // decor is often the HL variant
  "DARK": ["DARK"],
  "LIGHT": ["LIGHT"],
};

function generateProductKeys(productName: string): string[] {
  const upper = productName.toUpperCase().trim();
  const keys = [upper];
  // Also try replacing spaces with underscores
  keys.push(upper.replace(/\s+/g, " "));
  return keys;
}

function generateFileKeys(filename: string): string[] {
  const norm = normalize(filename);
  const keys: string[] = [norm];

  // Try expanding suffixes: "ANGEL DB" → "ANGEL DARK"
  for (const [abbr, expansions] of Object.entries(SUFFIX_MAP)) {
    const pattern = new RegExp(`\\b${abbr}$`, "i");
    if (pattern.test(norm)) {
      for (const exp of expansions) {
        keys.push(norm.replace(pattern, exp));
      }
    }
  }

  return keys;
}

// ── Main ──

async function linkImages() {
  const catalogIds = ["wall-300x600", "vitrified-400x400", "vitrified-600x600"];

  for (const catalogId of catalogIds) {
    console.log(`\n📎 Processing ${catalogId}...`);

    const imageMap = loadMap(catalogId);
    const fileCount = Object.keys(imageMap).length;
    if (fileCount === 0) continue;
    console.log(`   ${fileCount} images in map`);

    // Fetch products without images for this catalog
    const products: { _id: string; name: string }[] = await client.fetch(
      `*[_type == "tileProduct" && catalog->catalogId == $catalogId && !defined(image) && !(hidden == true)] { _id, name }`,
      { catalogId }
    );
    console.log(`   ${products.length} products need images`);

    // Build filename → assetId lookup, indexed by normalized variants
    const fileIndex: Map<string, { filename: string; assetId: string }> = new Map();
    for (const [filename, assetId] of Object.entries(imageMap)) {
      for (const key of generateFileKeys(filename)) {
        fileIndex.set(key, { filename, assetId });
      }
    }

    let linked = 0;
    let unmatched: string[] = [];
    const patches: { id: string; assetId: string; name: string }[] = [];

    for (const product of products) {
      const productKeys = generateProductKeys(product.name);
      let match: { filename: string; assetId: string } | undefined;

      for (const key of productKeys) {
        match = fileIndex.get(key);
        if (match) break;
      }

      // Fallback: try partial match (product name contained in filename or vice versa)
      if (!match) {
        const pNorm = normalize(product.name);
        for (const [key, val] of fileIndex.entries()) {
          if (key.includes(pNorm) || pNorm.includes(key)) {
            match = val;
            break;
          }
        }
      }

      // Fallback 2: Try matching just the series name (first word(s) before variant suffix)
      if (!match) {
        const pNorm = normalize(product.name);
        // Remove common suffixes to get base series
        const seriesName = pNorm
          .replace(/\s+(DARK|LIGHT|HL\d*|BASE|DECOR|GREY|BLACK|WHITE|BLUE|BEIGE|BROWN|DB|LB)$/i, "")
          .trim();
        if (seriesName !== pNorm && seriesName.length > 2) {
          for (const [key, val] of fileIndex.entries()) {
            const fileBase = key
              .replace(/\s+(DARK|LIGHT|HL\d*|BASE|DECOR|GREY|BLACK|WHITE|BLUE|BEIGE|BROWN|DB|LB)$/i, "")
              .trim();
            if (fileBase === seriesName) {
              // Match series — pick the first available image for this product
              match = val;
              break;
            }
          }
        }
      }

      if (match) {
        patches.push({ id: product._id, assetId: match.assetId, name: product.name });
        linked++;
      } else {
        unmatched.push(product.name);
      }
    }

    // Apply patches in batches
    const BATCH = 50;
    for (let i = 0; i < patches.length; i += BATCH) {
      const batch = patches.slice(i, i + BATCH);
      const tx = client.transaction();
      for (const p of batch) {
        tx.patch(p.id, {
          set: {
            image: {
              _type: "image",
              asset: { _type: "reference", _ref: p.assetId },
            },
          },
        });
      }
      await tx.commit();
      console.log(`   [${Math.min(i + BATCH, patches.length)}/${patches.length}] patched`);
    }

    console.log(`   ✅ Linked: ${linked}`);
    if (unmatched.length > 0) {
      console.log(`   ❌ Unmatched (${unmatched.length}):`);
      for (const name of unmatched) {
        console.log(`      - ${name}`);
      }
    }
  }

  console.log("\n🎉 Done!");
}

linkImages().catch((err) => {
  console.error("❌ Failed:", err.message);
  process.exit(1);
});
