/**
 * Reconcile script for vitrified-400x400 catalog.
 *
 * Behavior (idempotent, safe to re-run):
 *   - Fetches current vitrified-400x400 products from Sanity
 *   - Matches them against local src/data/catalog/vitrified-400x400.ts by normalized name
 *   - For each matching tile: patch series/category/application/sortOrder, set hidden=false
 *   - For existing tiles NOT in new data but WITH image: preserve visible, move to "Classic" series
 *   - For existing tiles NOT in new data and NO image: set hidden=true (preserved, not deleted)
 *   - For new tiles not in Sanity: create fresh with hidden=false
 *
 * Usage:
 *   export $(grep -v '^#' .env.local | xargs)
 *   npx tsx scripts/sanity-reconcile-400x400.ts              # dry run (default)
 *   npx tsx scripts/sanity-reconcile-400x400.ts --confirm    # execute
 */

import { createClient } from "@sanity/client";
import { vitrified400x400 } from "../src/data/catalog/vitrified-400x400";

const DRY_RUN = !process.argv.includes("--confirm");

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

const CATALOG_REF = "catalog-vitrified-400x400";

const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

interface SanityProduct {
  _id: string;
  name: string;
  series?: string;
  category?: string;
  application?: string;
  size?: string;
  hidden?: boolean;
  hasImage: boolean;
}

async function reconcile() {
  console.log(
    `\n🔧 Reconcile vitrified-400x400 — ${
      DRY_RUN ? "DRY RUN (no writes)" : "EXECUTING"
    }\n`
  );

  // 1. Fetch existing products in this catalog
  const existing: SanityProduct[] = await client.fetch(
    `*[_type == "tileProduct" && catalog->catalogId == "vitrified-400x400"] {
      _id,
      name,
      series,
      category,
      application,
      size,
      hidden,
      "hasImage": defined(image)
    }`
  );
  console.log(`📊 Current state: ${existing.length} products in Sanity\n`);

  // 2. Build match map
  const existingByKey = new Map<string, SanityProduct>();
  for (const p of existing) {
    existingByKey.set(normalize(p.name), p);
  }

  const newByKey = new Map<string, (typeof vitrified400x400)[number]>();
  for (const t of vitrified400x400) {
    newByKey.set(normalize(t.name), t);
  }

  // 3. Categorize actions
  const toPatchMatch: Array<{ ex: SanityProduct; newTile: (typeof vitrified400x400)[number] }> =
    [];
  const toPatchKeepVisible: SanityProduct[] = []; // has image, not in new data
  const toPatchHide: SanityProduct[] = []; // no image, not in new data
  const toCreate: (typeof vitrified400x400)[number] = [] as any;
  const toCreateList: typeof vitrified400x400 = [];

  for (const ex of existing) {
    const key = normalize(ex.name);
    const match = newByKey.get(key);
    if (match) {
      toPatchMatch.push({ ex, newTile: match });
    } else if (ex.hasImage) {
      toPatchKeepVisible.push(ex);
    } else {
      toPatchHide.push(ex);
    }
  }

  for (const t of vitrified400x400) {
    if (!existingByKey.has(normalize(t.name))) {
      toCreateList.push(t);
    }
  }

  // 4. Print plan
  console.log(
    `🔄 PATCH (${toPatchMatch.length}) — existing tiles that match new data:`
  );
  for (const { ex, newTile } of toPatchMatch) {
    const renameNote =
      ex.name !== newTile.name ? ` → rename to "${newTile.name}"` : "";
    console.log(
      `   ${ex.name.padEnd(30)} [${ex.series || "?"} → ${newTile.series}]${renameNote}`
    );
  }

  console.log(
    `\n👁️  PATCH visible (${toPatchKeepVisible.length}) — preserved tiles WITH image (not in new source folder):`
  );
  for (const ex of toPatchKeepVisible) {
    console.log(`   ${ex.name.padEnd(30)} [${ex.series || "?"} → Classic]`);
  }

  console.log(
    `\n🔒 HIDE (${toPatchHide.length}) — preserved tiles WITHOUT image (client can add image + unhide later):`
  );
  for (const ex of toPatchHide) {
    console.log(`   ${ex.name.padEnd(30)} series=${ex.series || "?"}`);
  }

  console.log(`\n➕ CREATE (${toCreateList.length}) — net-new tiles:`);
  for (const t of toCreateList) {
    console.log(
      `   ${t.name.padEnd(30)} series=${t.series} app=${t.application}`
    );
  }

  console.log(
    `\n📋 Summary: ${toPatchMatch.length} patched, ${toPatchKeepVisible.length} preserved visible, ${toPatchHide.length} hidden, ${toCreateList.length} created`
  );
  console.log(
    `   End state: ${toPatchMatch.length + toPatchKeepVisible.length + toCreateList.length} visible + ${toPatchHide.length} hidden = ${
      toPatchMatch.length + toPatchKeepVisible.length + toCreateList.length + toPatchHide.length
    } total\n`
  );

  if (DRY_RUN) {
    console.log("✅ Dry run complete. Re-run with --confirm to execute.\n");
    return;
  }

  // 5. Execute
  console.log("🚀 Executing...\n");

  const tx = client.transaction();

  // Patch matching tiles
  for (const { ex, newTile } of toPatchMatch) {
    tx.patch(ex._id, {
      set: {
        name: newTile.name,
        slug: { _type: "slug", current: newTile.slug },
        category: newTile.category,
        series: newTile.series,
        size: newTile.size,
        finish: newTile.finish,
        application: newTile.application,
        hidden: false,
      },
    });
  }

  // Patch tiles with image but not in new data → set series Classic, keep visible
  for (const ex of toPatchKeepVisible) {
    tx.patch(ex._id, {
      set: {
        series: "Classic",
        application: "Floor",
        category: "Vitrified",
        hidden: false,
      },
    });
  }

  // Patch orphan tiles without image → hide
  for (const ex of toPatchHide) {
    tx.patch(ex._id, {
      set: { hidden: true },
    });
  }

  // Create net-new tiles
  let sortCursor = 100;
  for (const t of toCreateList) {
    tx.create({
      _type: "tileProduct",
      name: t.name,
      slug: { _type: "slug", current: t.slug },
      catalog: { _type: "reference", _ref: CATALOG_REF },
      category: t.category,
      series: t.series,
      size: t.size,
      finish: t.finish,
      application: t.application,
      sortOrder: sortCursor++,
      hidden: false,
    });
  }

  await tx.commit();
  console.log("✅ Reconciliation committed.\n");
}

reconcile().catch((err) => {
  console.error("❌ Reconcile failed:", err.message);
  process.exit(1);
});
