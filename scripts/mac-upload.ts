/**
 * Standalone Sanity image upload script for Mac.
 * Upload product photos directly from Mac → Sanity CDN.
 *
 * Setup (one-time):
 *   mkdir ~/prime-sanity-upload && cd ~/prime-sanity-upload
 *   npm init -y && npm install @sanity/client tsx
 *   cp this file to ~/prime-sanity-upload/upload.ts
 *
 * Usage:
 *   npx tsx upload.ts --dir "path/to/300X600 MM" --catalog wall-300x600
 *   npx tsx upload.ts --dir "path/to/400X400 MM" --catalog vitrified-400x400
 *   npx tsx upload.ts --dir "path/to/600X600 MM" --catalog vitrified-600x600
 *   npx tsx upload.ts --dir "path/to/600X1200 MM" --catalog eleganz-600x1200
 */

import { createClient } from "@sanity/client";
import {
  readFileSync,
  writeFileSync,
  existsSync,
  readdirSync,
  createReadStream,
} from "fs";
import { resolve, basename, extname, join } from "path";

// ═══════════════════════════════════════════
// ⚠️  UPDATE THESE WITH YOUR CREDENTIALS
// ═══════════════════════════════════════════
const PROJECT_ID = "3jv6o4t6";
const DATASET = "production";
const API_TOKEN =
  "skmOKTulbh4hYAujc0PjCRldXUvN0GNXEj6z5K7HkJFh1RR4pGZLPdr49FSVnQvgFp18u3sCZocb2WjkqSKKYfNwoSvSv4FUwrgXK9nimELuBMUUWY2zf9O9rY6lNFdUwJ0oCOu3RWV5Z3CQXTncKo3ZhPTtulR56tfYPQW6Yie0UyXLKZX7";
// ═══════════════════════════════════════════

const args = process.argv.slice(2);
function getArg(name: string): string {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 ? args[idx + 1] || "" : "";
}

const sourceDir = getArg("dir");
const catalogId = getArg("catalog");
const batchSize = parseInt(getArg("batch") || "3", 10);

if (!sourceDir || !catalogId) {
  console.error(`
Usage: npx tsx upload.ts --dir <path> --catalog <id>

Catalogs:
  wall-300x600        → 300X600 MM folder
  vitrified-400x400   → 400X400 MM folder
  vitrified-600x600   → 600X600 MM folder
  eleganz-600x1200    → 600X1200 MM folder

Example:
  npx tsx upload.ts --dir ~/Desktop/zunkiee\\ labs/Prime\\ Tiles/tiles\\ category\\ and\\ product/300X600\\ MM --catalog wall-300x600
`);
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2026-04-01",
  token: API_TOKEN,
  useCdn: false,
});

const SUPPORTED_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const mapPath = resolve(__dirname, "image-map.json");

function loadMap(): Record<string, string> {
  if (existsSync(mapPath)) return JSON.parse(readFileSync(mapPath, "utf-8"));
  return {};
}

function saveMap(map: Record<string, string>) {
  writeFileSync(mapPath, JSON.stringify(map, null, 2));
}

async function uploadFile(filePath: string, filename: string): Promise<string> {
  const stream = createReadStream(filePath);
  const ext = extname(filename).slice(1).toLowerCase().replace("jpg", "jpeg");
  const asset = await client.assets.upload("image", stream, {
    filename,
    contentType: `image/${ext}`,
  });
  return asset._id;
}

async function main() {
  const dir = resolve(sourceDir);
  if (!existsSync(dir)) {
    console.error(`❌ Directory not found: ${dir}`);
    process.exit(1);
  }

  const files = readdirSync(dir)
    .filter((f) => {
      const ext = extname(f).toLowerCase();
      return SUPPORTED_EXTS.has(ext) && !f.startsWith(".");
    })
    .map((f) => ({ name: f, path: join(dir, f) }));

  if (files.length === 0) {
    console.error(`❌ No image files found in ${dir}`);
    process.exit(1);
  }

  const imageMap = loadMap();
  const toUpload = files.filter((f) => !imageMap[f.name]);

  console.log(`\n📸 Prime Ceramics — Image Upload to Sanity CDN`);
  console.log(`   Catalog:  ${catalogId}`);
  console.log(`   Source:   ${dir}`);
  console.log(`   Total:    ${files.length} images`);
  console.log(`   Upload:   ${toUpload.length} new (${files.length - toUpload.length} already done)`);
  console.log(`   Batch:    ${batchSize} concurrent\n`);

  for (let i = 0; i < toUpload.length; i += batchSize) {
    const batch = toUpload.slice(i, i + batchSize);
    const results = await Promise.allSettled(
      batch.map(async (file) => {
        const id = await uploadFile(file.path, file.name);
        imageMap[file.name] = id;
        return { name: file.name, id };
      })
    );

    for (let j = 0; j < results.length; j++) {
      const r = results[j];
      const idx = i + j + 1;
      if (r.status === "fulfilled") {
        console.log(`  [${idx}/${toUpload.length}] ✅ ${r.value.name}`);
      } else {
        console.error(`  [${idx}/${toUpload.length}] ❌ ${batch[j].name}: ${r.reason}`);
      }
    }
    saveMap(imageMap);
  }

  // Save catalog-specific map
  const catalogMap: Record<string, string> = {};
  for (const f of files) {
    if (imageMap[f.name]) catalogMap[f.name] = imageMap[f.name];
  }
  const catalogMapPath = resolve(__dirname, `image-map-${catalogId}.json`);
  writeFileSync(catalogMapPath, JSON.stringify(catalogMap, null, 2));

  console.log(`\n✅ Upload complete!`);
  console.log(`   Map: ${mapPath}`);
  console.log(`   Catalog map: ${catalogMapPath}`);
  console.log(`   Total assets: ${Object.keys(imageMap).length}\n`);
}

main().catch((err) => {
  console.error("❌ Upload failed:", err.message);
  process.exit(1);
});
