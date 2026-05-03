import { collections, browseData } from "../src/data/collections";
import { allProducts } from "../src/data/catalog";

const productBySlug = new Map(allProducts.map((p) => [p.slug, p]));
const ALL = "All";
type Tab = "Finishes" | "Sizes" | "Colors" | "Types";

const STANDARD_SIZES = [
  "300×300 mm",
  "300×450 mm",
  "300×600 mm",
  "400×400 mm",
  "600×600 mm",
  "600×1200 mm",
];
const catalogSizes = new Set(allProducts.map((p) => p.size));
const collectionSizes = new Set(collections.flatMap((c) => c.sizes));
const allSizes = STANDARD_SIZES.filter((s) => collectionSizes.has(s) || catalogSizes.has(s));

const optionsByTab: Record<Tab, string[]> = {
  Finishes: [ALL, ...new Set(collections.map((c) => c.category))],
  Sizes: [ALL, ...allSizes],
  Colors: [ALL, ...browseData.Colors.map((c) => c.name)],
  Types: [ALL, ...browseData.Types.map((t) => t.name)],
};

const FALLBACK_SIZE = "600×600 mm";

const resolveImage = (product: { image?: string } | undefined, fallback: string) => {
  if (product?.image) return product.image;
  return fallback;
};

type Item = {
  name: string;
  slug: string;
  size: string;
  image: string;
  product: { name: string; image?: string; size?: string } | null;
};

function buildItems(tab: Tab, option: string): Item[] {
  if (tab === "Finishes") {
    const filtered = option === ALL ? collections : collections.filter((c) => c.category === option);
    return filtered.map((c) => {
      const product = productBySlug.get(c.slug);
      const size = c.sizes[0] || product?.size || FALLBACK_SIZE;
      return { name: c.name, slug: c.slug, size, image: resolveImage(product, c.image), product: product ?? null };
    });
  }
  if (tab === "Sizes") {
    const fromCollections = option === ALL ? collections : collections.filter((c) => c.sizes.includes(option));
    const usedSlugs = new Set(fromCollections.map((c) => c.slug));
    const collectionItems: Item[] = fromCollections.map((c) => {
      const product = productBySlug.get(c.slug);
      const size = c.sizes[0] || product?.size || FALLBACK_SIZE;
      return { name: c.name, slug: c.slug, size, image: resolveImage(product, c.image), product: product ?? null };
    });
    if (option !== ALL && collectionItems.length < 12) {
      const need = 12 - collectionItems.length;
      const catalogFill = allProducts
        .filter((p) => p.size === option && !usedSlugs.has(p.slug))
        .slice(0, need)
        .map((p) => ({ name: p.name, slug: p.slug, size: p.size, image: p.image, product: p }));
      return [...collectionItems, ...catalogFill];
    }
    return collectionItems;
  }
  if (tab === "Colors") {
    const entries = option === ALL ? browseData.Colors : browseData.Colors.filter((c) => c.name === option);
    return entries.map((c) => {
      const product = productBySlug.get(c.slug);
      const size = product?.size || FALLBACK_SIZE;
      return { name: product?.name ?? c.name, slug: c.slug, size, image: resolveImage(product, c.image), product: product ?? null };
    });
  }
  const entries = option === ALL ? browseData.Types : browseData.Types.filter((t) => t.name === option);
  return entries.map((t) => {
    const product = productBySlug.get(t.slug);
    const size = product?.size || FALLBACK_SIZE;
    return { name: product?.name ?? t.name, slug: t.slug, size, image: resolveImage(product, t.image), product: product ?? null };
  });
}

let total = 0;
let withProduct = 0;
let withoutProduct = 0;
const SIZE_RE = /^\d+×\d+\s*mm$/;
const sizeStats = new Map<string, number>();
const mismatches: string[] = [];
const sizeIssues: string[] = [];
const emptyOptions: string[] = [];

for (const tab of Object.keys(optionsByTab) as Tab[]) {
  for (const option of optionsByTab[tab]) {
    const items = buildItems(tab, option);
    if (items.length === 0) emptyOptions.push(`${tab} → ${option}`);
    for (const item of items) {
      total++;
      sizeStats.set(item.size, (sizeStats.get(item.size) ?? 0) + 1);
      if (!SIZE_RE.test(item.size)) {
        sizeIssues.push(`[${tab} → ${option}] slug=${item.slug} non-size value: ${JSON.stringify(item.size)}`);
      }
      if (!item.product) {
        withoutProduct++;
        continue;
      }
      withProduct++;
      const nameOk = item.name === item.product.name;
      const imageOk = item.image === (item.product.image ?? "");
      if (!nameOk || !imageOk) {
        mismatches.push(
          `[${tab} → ${option}] slug=${item.slug}\n` +
          `  card.name=${JSON.stringify(item.name)} prod.name=${JSON.stringify(item.product.name)}\n` +
          `  card.image=${JSON.stringify(item.image)} prod.image=${JSON.stringify(item.product.image)}`
        );
      }
    }
  }
}

console.log(`Total renders: ${total}`);
console.log(`  with product:    ${withProduct}`);
console.log(`  without product: ${withoutProduct}`);
console.log(`Sizes pill row: ${optionsByTab.Sizes.slice(1).join(" · ")}`);
console.log(`Empty options: ${emptyOptions.length}`);
if (emptyOptions.length) for (const o of emptyOptions) console.log(`  - ${o}`);
console.log(`Card→modal mismatches: ${mismatches.length}`);
if (mismatches.length) for (const m of mismatches) console.log(m);
console.log(`Size-string issues:    ${sizeIssues.length}`);
if (sizeIssues.length) for (const s of sizeIssues) console.log(s);
console.log("\nFrame-aspect distribution by size:");
for (const [size, n] of [...sizeStats].sort()) {
  console.log(`  ${size.padEnd(14)} ${n}`);
}

if (mismatches.length || sizeIssues.length) process.exit(1);
console.log("\nPASS — every clickable card matches the modal AND every card has a valid size string for the inner frame.");
