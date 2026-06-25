/**
 * One-off: re-point products off the redundant standalone catalogs, then delete them.
 *   catalog-vitrified-400x400 (34 products) -> catalog-vitrified-600x600 (Floor 600x600 & 400x400)
 *   catalog-floor-300x300    (105 products) -> catalog-wall-300x450     (Wall 300x450 + Floor 300x300)
 * Dry-run by default. Pass --confirm to write.
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { join } from "path";

const TOKEN =
  process.env.SANITY_WRITE_TOKEN ||
  readFileSync(join(__dirname, "../src/sanity/plugins/bulk-upload/BulkUploadTool.tsx"), "utf8")
    .match(/SANITY_WRITE_TOKEN\s*=\s*"([^"]+)"/)?.[1];

const client = createClient({
  projectId: "3jv6o4t6",
  dataset: "production",
  apiVersion: "2026-04-01",
  useCdn: false,
  token: TOKEN,
});

const MOVES = [
  { from: "catalog-vitrified-400x400", to: "catalog-vitrified-600x600" },
  { from: "catalog-floor-300x300", to: "catalog-wall-300x450" },
];

async function main() {
  const confirm = process.argv.includes("--confirm");
  console.log(confirm ? "🔴 WRITE MODE\n" : "🟡 DRY RUN (pass --confirm to write)\n");

  for (const { from, to } of MOVES) {
    const ids: string[] = await client.fetch(
      `*[_type=="tileProduct" && catalog._ref==$from]._id`,
      { from }
    );
    console.log(`${from} -> ${to}: ${ids.length} products to re-point`);
    if (confirm && ids.length) {
      let tx = client.transaction();
      for (const id of ids) tx = tx.patch(id, (p) => p.set({ catalog: { _type: "reference", _ref: to } }));
      await tx.commit();
      console.log(`  ✅ re-pointed ${ids.length}`);
    }
  }

  for (const { from } of MOVES) {
    const remaining: number = await client.fetch(`count(*[_type=="tileProduct" && catalog._ref==$from])`, { from });
    if (confirm) {
      if (remaining === 0) {
        await client.delete(from);
        console.log(`🗑️  deleted ${from}`);
      } else {
        console.log(`⚠️  NOT deleting ${from} — still ${remaining} refs`);
      }
    } else {
      console.log(`would delete ${from} (refs after re-point: ${remaining})`);
    }
  }

  console.log("\nDone.");
}

main().catch((e) => {
  console.error("ERR", e.message);
  process.exit(1);
});
