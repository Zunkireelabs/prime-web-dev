/**
 * One-shot: unset the image field on specific products by name.
 *
 * Used after fuzzy image linking over-matches hidden orphan products
 * (e.g. "Antiquity Multi" got linked to antiquity.jpg because fuzzy
 * matcher stripped the "Multi" suffix).
 *
 * Usage:
 *   export $(grep -v '^#' .env.local | xargs)
 *   npx tsx scripts/sanity-unlink-orphan-images.ts
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

// Products that were over-matched by fuzzy image linking.
// Each entry: { catalogId, name } — will unset the image field.
const targets = [
  { catalogId: "vitrified-600x600", name: "Antiquity Multi" },
  { catalogId: "vitrified-600x600", name: "Antiquity Biege" },
  { catalogId: "vitrified-600x600", name: "Serendipity Multi" },
];

async function run() {
  const tx = client.transaction();
  let count = 0;

  for (const t of targets) {
    const docs = await client.fetch<{ _id: string }[]>(
      `*[_type == "tileProduct" && catalog->catalogId == $c && name == $n] { _id }`,
      { c: t.catalogId, n: t.name }
    );
    if (docs.length === 0) {
      console.warn(`   ⚠️  Not found: ${t.name}`);
      continue;
    }
    for (const d of docs) {
      tx.patch(d._id, { unset: ["image"] });
      console.log(`   ✂️  Unlink image: ${t.name} (${d._id})`);
      count++;
    }
  }

  if (count === 0) {
    console.log("Nothing to do.");
    return;
  }

  await tx.commit();
  console.log(`\n✅ Unlinked ${count} products.`);
}

run().catch((err) => {
  console.error("❌ Failed:", err.message);
  process.exit(1);
});
