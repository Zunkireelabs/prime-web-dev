/**
 * Bulk image upload script for Prime Ceramics.
 * Uploads product photos from a local directory to Sanity CDN.
 *
 * Usage:
 *   npx tsx scripts/sanity-upload-images.ts --dir ~/photos/300x600 --catalog wall-300x600
 *
 * Options:
 *   --dir       Source directory with .jpg/.png/.webp files
 *   --catalog   Catalog ID (wall-300x450, wall-300x600, etc.)
 *   --batch     Concurrent uploads (default: 5)
 *   --resume    Skip already-uploaded files (checks image-map.json)
 *
 * Output: scripts/image-map.json — { "filename.jpg": "image-assetId" }
 *
 * Cross-platform: Works on Linux and macOS (pure Node.js).
 */

import { createClient } from "@sanity/client";
import { readFileSync, writeFileSync, existsSync, readdirSync, createReadStream } from "fs";
import { resolve, basename, extname, join } from "path";

// ── Parse args ──

const args = process.argv.slice(2);
function getArg(name: string): string | undefined {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 ? args[idx + 1] : undefined;
}

const sourceDir = getArg("dir") || "";
const catalogId = getArg("catalog") || "";
const batchSize = parseInt(getArg("batch") || "5", 10);
const shouldResume = args.includes("--resume");

if (!sourceDir || !catalogId) {
  console.error("Usage: npx tsx scripts/sanity-upload-images.ts --dir <path> --catalog <id>");
  console.error("  --dir       Source directory with image files");
  console.error("  --catalog   Catalog ID (e.g., wall-300x600)");
  console.error("  --batch     Concurrent uploads (default: 5)");
  console.error("  --resume    Skip already-uploaded files");
  process.exit(1);
}

// ── Sanity client ──

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

// ── Image map (resume support) ──

const mapPath = resolve(__dirname, "image-map.json");

function loadImageMap(): Record<string, string> {
  if (existsSync(mapPath)) {
    return JSON.parse(readFileSync(mapPath, "utf-8"));
  }
  return {};
}

function saveImageMap(map: Record<string, string>) {
  writeFileSync(mapPath, JSON.stringify(map, null, 2));
}

// ── Supported extensions ──

const SUPPORTED_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

// ── Upload logic ──

async function uploadFile(
  filePath: string,
  filename: string
): Promise<string> {
  const stream = createReadStream(filePath);
  const asset = await client.assets.upload("image", stream, {
    filename,
    contentType: `image/${extname(filename).slice(1).replace("jpg", "jpeg")}`,
  });
  return asset._id;
}

async function processBatch(
  files: { path: string; name: string }[],
  imageMap: Record<string, string>,
  startIdx: number,
  total: number
) {
  const results = await Promise.allSettled(
    files.map(async (file) => {
      const assetId = await uploadFile(file.path, file.name);
      imageMap[file.name] = assetId;
      return { name: file.name, assetId };
    })
  );

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const idx = startIdx + i + 1;
    if (result.status === "fulfilled") {
      console.log(`  [${idx}/${total}] ✅ ${result.value.name}`);
    } else {
      console.error(`  [${idx}/${total}] ❌ ${files[i].name}: ${result.reason}`);
    }
  }

  // Save after each batch for resume safety
  saveImageMap(imageMap);
}

async function main() {
  const resolvedDir = resolve(sourceDir);

  if (!existsSync(resolvedDir)) {
    console.error(`❌ Directory not found: ${resolvedDir}`);
    process.exit(1);
  }

  // Collect image files
  const allFiles = readdirSync(resolvedDir)
    .filter((f) => SUPPORTED_EXTS.has(extname(f).toLowerCase()))
    .map((f) => ({ name: f, path: join(resolvedDir, f) }));

  if (allFiles.length === 0) {
    console.error(`❌ No image files found in ${resolvedDir}`);
    process.exit(1);
  }

  // Load existing map for resume
  const imageMap = loadImageMap();

  // Filter out already-uploaded files if resuming
  const filesToUpload = shouldResume
    ? allFiles.filter((f) => !imageMap[f.name])
    : allFiles;

  console.log(`\n📸 Uploading images to Sanity CDN`);
  console.log(`   Catalog: ${catalogId}`);
  console.log(`   Source:  ${resolvedDir}`);
  console.log(`   Total:   ${allFiles.length} images`);
  console.log(`   Upload:  ${filesToUpload.length} (${allFiles.length - filesToUpload.length} skipped)`);
  console.log(`   Batch:   ${batchSize} concurrent\n`);

  // Process in batches
  for (let i = 0; i < filesToUpload.length; i += batchSize) {
    const batch = filesToUpload.slice(i, i + batchSize);
    await processBatch(batch, imageMap, i, filesToUpload.length);
  }

  // Save final catalog mapping
  const catalogMapPath = resolve(__dirname, `image-map-${catalogId}.json`);
  const catalogImages: Record<string, string> = {};
  for (const file of allFiles) {
    if (imageMap[file.name]) {
      catalogImages[file.name] = imageMap[file.name];
    }
  }
  writeFileSync(catalogMapPath, JSON.stringify(catalogImages, null, 2));

  console.log(`\n✅ Upload complete!`);
  console.log(`   Combined map: ${mapPath}`);
  console.log(`   Catalog map:  ${catalogMapPath}`);
  console.log(`   Total assets: ${Object.keys(imageMap).length}`);
}

main().catch((err) => {
  console.error("❌ Upload failed:", err.message);
  process.exit(1);
});
