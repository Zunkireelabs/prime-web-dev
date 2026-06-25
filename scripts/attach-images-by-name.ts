/**
 * Attach images to EXISTING tileProduct documents by matching filenames to
 * product names. Use when products already exist in Sanity (correct metadata)
 * but have no image attached.
 *
 * Matching: slugify(filename without extension) === slugify(product name).
 * Case- and extension-insensitive.
 *
 * Usage:
 *   # dry-run (no writes) — shows matched / unmatched
 *   source .env.local && export NEXT_PUBLIC_SANITY_PROJECT_ID NEXT_PUBLIC_SANITY_DATASET NEXT_PUBLIC_SANITY_API_VERSION SANITY_API_TOKEN
 *   npx tsx scripts/attach-images-by-name.ts --size "400×400 mm" --images ~/path/to/folder
 *
 *   # execute
 *   npx tsx scripts/attach-images-by-name.ts --size "400×400 mm" --images ~/path/to/folder --confirm
 */

import { createClient } from "@sanity/client";
import { readdirSync, statSync, createReadStream } from "fs";
import { join, extname, basename } from "path";

const args = process.argv.slice(2);
function getArg(name: string): string | undefined {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
}
const size = getArg("--size");
const imagesDir = getArg("--images");
const confirm = args.includes("--confirm");

if (!size || !imagesDir) {
  console.error(`Usage: npx tsx scripts/attach-images-by-name.ts --size "400×400 mm" --images <folder> [--confirm]`);
  process.exit(1);
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-04-01";
const token = process.env.SANITY_API_TOKEN;

if (!projectId) { console.error("❌ NEXT_PUBLIC_SANITY_PROJECT_ID not set"); process.exit(1); }
if (confirm && !token) { console.error("❌ SANITY_API_TOKEN required for --confirm"); process.exit(1); }

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const IMG_RE = /\.(jpe?g|png|webp)$/i;
const CONTENT_TYPE: Record<string, string> = {
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp",
};

function scanImages(dir: string): Map<string, string> {
  const map = new Map<string, string>();
  const walk = (d: string) => {
    for (const entry of readdirSync(d)) {
      const full = join(d, entry);
      if (statSync(full).isDirectory()) walk(full);
      else if (IMG_RE.test(entry)) {
        const key = slugify(basename(entry, extname(entry)));
        if (!map.has(key)) map.set(key, full);
      }
    }
  };
  walk(dir);
  return map;
}

async function main() {
  const products = await client.fetch<{ _id: string; name: string; slug?: string; hasImage: boolean }[]>(
    `*[_type=="tileProduct" && size==$size]{_id, name, "slug": slug.current, "hasImage": defined(image.asset)} | order(name asc)`,
    { size }
  );
  const fileMap = scanImages(imagesDir);

  console.log(`Size: ${size}`);
  console.log(`Products in Sanity: ${products.length}`);
  console.log(`Image files found: ${fileMap.size}\n`);

  const matched: { id: string; name: string; file: string; hadImage: boolean }[] = [];
  const unmatched: string[] = [];

  for (const p of products) {
    const key = p.slug || slugify(p.name);
    const file = fileMap.get(key) || fileMap.get(slugify(p.name));
    if (file) matched.push({ id: p._id, name: p.name, file, hadImage: p.hasImage });
    else unmatched.push(p.name);
  }

  console.log(`MATCHED (${matched.length}):`);
  matched.forEach((m) =>
    console.log(`  ✓ ${m.name.padEnd(26)} → ${basename(m.file)}${m.hadImage ? "  (replaces existing)" : ""}`)
  );
  if (unmatched.length) {
    console.log(`\nUNMATCHED — no file found (${unmatched.length}):`);
    unmatched.forEach((n) => console.log(`  ✗ ${n}`));
  }
  const unusedFiles = [...fileMap.keys()].filter(
    (k) => !matched.some((m) => slugify(basename(m.file, extname(m.file))) === k)
  );
  if (unusedFiles.length) {
    console.log(`\nUNUSED files — no product matched (${unusedFiles.length}):`);
    unusedFiles.forEach((k) => console.log(`  • ${basename(fileMap.get(k)!)}`));
  }

  if (!confirm) {
    console.log(`\n(dry-run) Add --confirm to upload & attach the ${matched.length} matched images.`);
    return;
  }

  console.log(`\nUploading & attaching ${matched.length} images...`);
  let ok = 0;
  for (const m of matched) {
    const ext = extname(m.file).toLowerCase();
    const asset = await client.assets.upload("image", createReadStream(m.file), {
      filename: basename(m.file),
      contentType: CONTENT_TYPE[ext] || "image/jpeg",
    });
    await client
      .patch(m.id)
      .set({ image: { _type: "image", asset: { _type: "reference", _ref: asset._id } } })
      .commit();
    ok++;
    console.log(`  ✓ ${m.name} → ${asset._id}`);
  }
  console.log(`\n✅ Attached ${ok}/${matched.length}. Unmatched: ${unmatched.length}.`);
  console.log(`Next: regenerate catalog JSON and redeploy staging.`);
}

main().catch((err) => { console.error("❌", err.message); process.exit(1); });
