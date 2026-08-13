/**
 * Bulk-update tileProduct `finish` and `spaces` from the marketing xlsx sheets in temp-ss/.
 * Matches existing Sanity products by product name + size (case-insensitive).
 *
 * Usage:
 *   npx tsx scripts/sync-catalogue-xlsx.ts            # dry run — prints report only
 *   npx tsx scripts/sync-catalogue-xlsx.ts --confirm   # writes patches to Sanity
 */

import { createClient } from "@sanity/client";
import * as XLSX from "xlsx";
import * as path from "path";

const DRY_RUN = !process.argv.includes("--confirm");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "3jv6o4t6";
const token = process.env.SANITY_API_TOKEN;
if (!token) {
  console.error("Set SANITY_API_TOKEN in .env.local (source it first: `source .env.local`)");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-04-01",
  token,
  useCdn: false,
});

const BASE = path.resolve(__dirname, "../temp-ss");

// ── Size normalization ──
function normalizeSize(raw: string): string | null {
  const clean = raw.trim().toLowerCase().replace(/\s*mm\s*$/, "").replace(/x/i, "×");
  const map: Record<string, string> = {
    "300×300": "300×300 mm",
    "300×450": "300×450 mm",
    "300×600": "300×600 mm",
    "400×400": "400×400 mm",
    "600×600": "600×600 mm",
    "600×1200": "600×1200 mm",
  };
  return map[clean] || null;
}

// ── Finish normalization ──
const FINISH_MAP: Record<string, string> = {
  glossy: "Glossy",
  matt: "Matt",
  gloss: "Glossy",
  "high gloss": "High Gloss",
  carving: "Carving",
  satin: "Satin",
  polished: "Polished",
};
function normalizeFinish(raw?: string): string | null {
  if (!raw) return null;
  const key = raw.trim().toLowerCase();
  return FINISH_MAP[key] || null;
}

// ── Spaces keyword → schema enum ──
const SPACE_KEYWORDS: [RegExp, string][] = [
  [/living\s*room/i, "Living Room"],
  [/bedroom/i, "Bedroom"],
  [/kitchen/i, "Kitchen"],
  [/bath(room)?|washroom|spa|vanity|shower/i, "Bathroom"],
  [/dining/i, "Dining Room"],
  [/office|corporate|workspace/i, "Office"],
  [/balcon/i, "Balcony"],
  // Deliberately excludes bare "pool"/"poolside"/"garden" — in this dataset they
  // almost always describe indoor rooms ("pool washroom", "garden-facing bathroom",
  // "swimming pool changing rooms"), not an outdoor-rated tile.
  [/\boutdoor\b|\bpatio\b|\bcourtyard\b|\bterrace\b|\brooftop\b|\bdriveway\b|\bexterior\b/i, "Outdoor"],
  [/showroom|boutique/i, "Showroom"],
  [/commercial|retail|mall/i, "Commercial"],
  [/restaurant|cafe|bar\b|banquet/i, "Restaurant"],
  [/hotel|resort|lounge|lobby|reception/i, "Hotel"],
  [/hospital|clinic|medical/i, "Hospital"],
  [/apartment|residential/i, "Apartment"],
  [/staircase|stairs/i, "Staircase"],
  [/elevation|facade|façade/i, "Elevation"],
  [/parking|garage/i, "Parking"],
];
function extractSpaces(raw?: string): string[] {
  if (!raw) return [];
  const found = new Set<string>();
  for (const [re, tag] of SPACE_KEYWORDS) {
    if (re.test(raw)) found.add(tag);
  }
  return [...found];
}

interface FileSpec {
  file: string;
  sheet?: string;
  cols: {
    name: string;
    size: string;
    finish?: string;
    spaces: string; // header holding the freeform spaces text (may be named SPACES or Application)
  };
  skipFinish?: boolean; // whole column is a uniform placeholder value, not real data
  fuzzyName?: boolean; // fall back to name matching with Dark/Light/Floor/etc suffixes stripped
  manualOverrides?: Record<string, string>; // xlsx name (case-insensitive) -> live product name, for typo'd/renamed pairs a human confirmed
  // Site `application` value (Wall / Floor / Wall & Floor) every product in this
  // file should carry. The xlsx type/category columns are mislabeled & swapped
  // between files, but each file is uniform, so we hard-code the resolved value.
  application?: "Wall" | "Floor" | "Wall & Floor";
}

// Special classifications set deliberately in Studio (HL borders shown in elevation,
// art panels) — never clobbered by the file-level `application` remap.
const PROTECTED_APPLICATIONS = new Set(["Art Panel", "Elevation"]);

const FILES: FileSpec[] = [
  {
    file: "Wall Catalogue 300x300 working.xlsx",
    cols: { name: "Product Name", size: "Size", finish: "Finishing/ Surface", spaces: "Application" },
    fuzzyName: true, // xlsx names carry a "DARK" suffix live product names mostly drop
    application: "Wall", // Wall Catalogue — live has these mislabeled as Floor
    manualOverrides: {
      "TREVERTINO DARK": "Travertino Dark", // xlsx typo
      "MIRAGE DARK": "Mirag", // live product name is typo'd
      "MOSAIC DARK": "Mosic", // live product name is typo'd
      "KETTLE DARK": "Kettle", // ambiguous vs "Kettle Light Floor" — user confirmed Dark variant
    },
  },
  {
    file: "300X450 mm.xlsx",
    cols: { name: "PRODUCT_NAME", size: "SIZE", finish: "FINISH", spaces: "SPACES" },
    application: "Wall",
  },
  {
    file: "300X600 mm.xlsx",
    cols: { name: "PRODUCT_NAME", size: "SIZE", finish: "FINISH", spaces: "SPACES" },
    skipFinish: true, // every row is "MATT/GLOSS" — not real per-product data
    application: "Wall",
  },
  {
    file: "400X400 Floor Tiles (3).xlsx",
    cols: { name: "PRODUCT_NAME", size: "SIZE", finish: "FINISH", spaces: "Application" },
    application: "Floor",
  },
  {
    file: "600X600 mm.xlsx",
    cols: { name: "PRODUCT_NAME", size: "SIZE", finish: "FINISH", spaces: "SPACES" },
    application: "Floor",
  },
  {
    file: "600x1200 catalog working.xlsx",
    sheet: "600x1200 ",
    cols: { name: "Product Name", size: "Size", finish: "Finishing/ Surface", spaces: "Application" },
    application: "Wall & Floor",
  },
];

interface Row {
  name: string;
  size: string;
  finish: string | null;
  spaces: string[];
}

function readFile(spec: FileSpec): Row[] {
  const wb = XLSX.readFile(path.join(BASE, spec.file));
  const sheet = spec.sheet ? wb.Sheets[spec.sheet] : wb.Sheets[wb.SheetNames[0]];
  const rows: Record<string, any>[] = XLSX.utils.sheet_to_json(sheet, { defval: "" });

  const out: Row[] = [];
  for (const r of rows) {
    const rawName = String(r[spec.cols.name] || "").trim();
    const rawSize = String(r[spec.cols.size] || "").trim();
    if (!rawName || !rawSize) continue;
    const size = normalizeSize(rawSize);
    if (!size) continue;
    const finish = spec.skipFinish ? null : normalizeFinish(spec.cols.finish ? r[spec.cols.finish] : undefined);
    const spaces = extractSpaces(r[spec.cols.spaces]);
    out.push({ name: rawName, size, finish, spaces });
  }
  return out;
}

// Strips common variant suffixes (Dark/Light/Floor/HL/EC/DB) so e.g. "ALCAZAR DARK"
// can match live product "Alcazar". Only used as a fallback — ambiguous normalized
// keys (multiple live products collapsing to the same stripped name) are skipped.
function normName(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/-/g, " ")
    .replace(/\b(dark|light|floor|hl|ec|db)\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function main() {
  console.log(DRY_RUN ? "DRY RUN — no writes will happen\n" : "LIVE RUN — writing patches\n");

  // Fetch all products once
  const products: { _id: string; name: string; size: string; finish?: string; spaces?: string[]; application?: string }[] =
    await client.fetch(`*[_type == "tileProduct"]{ _id, name, size, finish, spaces, application }`);

  const productIndex = new Map<string, typeof products[0]>();
  const fuzzyIndex = new Map<string, typeof products[0][]>();
  for (const p of products) {
    const key = `${p.name.trim().toLowerCase()}|${p.size}`;
    productIndex.set(key, p);
    const fuzzyKey = `${normName(p.name)}|${p.size}`;
    if (!fuzzyIndex.has(fuzzyKey)) fuzzyIndex.set(fuzzyKey, []);
    fuzzyIndex.get(fuzzyKey)!.push(p);
  }

  let totalMatched = 0;
  let totalUnmatched = 0;
  let totalPatched = 0;
  const unmatchedSamples: string[] = [];

  for (const spec of FILES) {
    const rows = readFile(spec);
    let matched = 0;
    let unmatched = 0;
    let patched = 0;
    let appPatched = 0;

    for (const row of rows) {
      const key = `${row.name.trim().toLowerCase()}|${row.size}`;
      let product = productIndex.get(key);
      const override = spec.manualOverrides?.[row.name.trim().toUpperCase()];
      if (!product && override) {
        product = productIndex.get(`${override.trim().toLowerCase()}|${row.size}`);
      }
      if (!product && spec.fuzzyName) {
        const candidates = fuzzyIndex.get(`${normName(row.name)}|${row.size}`);
        if (candidates && candidates.length === 1) product = candidates[0];
      }
      if (!product) {
        unmatched++;
        totalUnmatched++;
        if (unmatchedSamples.length < 25) unmatchedSamples.push(`${row.name} (${row.size}) [${spec.file}]`);
        continue;
      }
      matched++;
      totalMatched++;

      const patch: Record<string, any> = {};
      if (row.finish && row.finish !== product.finish) patch.finish = row.finish;
      if (
        spec.application &&
        product.application !== spec.application &&
        !PROTECTED_APPLICATIONS.has(product.application ?? "")
      ) {
        patch.application = spec.application;
      }
      if (row.spaces.length > 0) {
        const existing = product.spaces || [];
        const same =
          existing.length === row.spaces.length &&
          existing.every((s) => row.spaces.includes(s));
        if (!same) {
          patch.spaces = row.spaces; // replace — existing values are mostly freeform marketing text, not the schema's enum tags
        }
      }

      if (Object.keys(patch).length === 0) continue;

      patched++;
      totalPatched++;

      if (patch.application) appPatched++;

      if (DRY_RUN) {
        if (patched <= 5) {
          console.log(`  [${spec.file}] "${product.name}" (${product.size})`);
          if (patch.finish) console.log(`    finish: ${product.finish || "—"} → ${patch.finish}`);
          if (patch.application) console.log(`    application: ${product.application || "—"} → ${patch.application}`);
          if (patch.spaces) console.log(`    spaces: [${(product.spaces || []).join(", ") || "—"}] → [${patch.spaces.join(", ")}]`);
        }
      } else {
        await client.patch(product._id).set(patch).commit();
      }
    }

    console.log(`${spec.file}: ${rows.length} rows, ${matched} matched, ${unmatched} unmatched, ${patched} would patch${DRY_RUN ? "" : "d"} (${appPatched} application)`);
  }

  console.log(`\nTotals: ${totalMatched} matched, ${totalUnmatched} unmatched, ${totalPatched} ${DRY_RUN ? "would be " : ""}patched`);
  if (unmatchedSamples.length > 0) {
    console.log(`\nSample unmatched (first ${unmatchedSamples.length}):`);
    unmatchedSamples.forEach((s) => console.log(`  - ${s}`));
  }
  if (DRY_RUN) {
    console.log(`\nRe-run with --confirm to write these changes.`);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
