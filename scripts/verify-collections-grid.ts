import { collections, browseData } from "../src/data/collections";
import { allProducts } from "../src/data/catalog";

const productBySlug = new Map(allProducts.map((p) => [p.slug, p]));
const ALL = "All";
type Tab = "Finishes" | "Sizes" | "Colors" | "Types";

const optionsByTab: Record<Tab, string[]> = {
  Finishes: [ALL, ...new Set(collections.map((c) => c.category))],
  Sizes: [ALL, ...new Set(collections.flatMap((c) => c.sizes))],
  Colors: [ALL, ...browseData.Colors.map((c) => c.name)],
  Types: [ALL, ...browseData.Types.map((t) => t.name)],
};

const resolveImage = (product: { image?: string } | undefined, fallback: string) => {
  if (product?.image) return product.image;
  return fallback;
};

type Item = {
  name: string;
  slug: string;
  image: string;
  product: { name: string; image?: string } | null;
};

function buildItems(tab: Tab, option: string): Item[] {
  if (tab === "Finishes") {
    const filtered = option === ALL ? collections : collections.filter((c) => c.category === option);
    return filtered.map((c) => {
      const product = productBySlug.get(c.slug);
      return {
        name: c.name,
        slug: c.slug,
        image: resolveImage(product, c.image),
        product: product ?? null,
      };
    });
  }
  if (tab === "Sizes") {
    const filtered = option === ALL ? collections : collections.filter((c) => c.sizes.includes(option));
    return filtered.map((c) => {
      const product = productBySlug.get(c.slug);
      return {
        name: c.name,
        slug: c.slug,
        image: resolveImage(product, c.image),
        product: product ?? null,
      };
    });
  }
  if (tab === "Colors") {
    const colorEntries = option === ALL ? browseData.Colors : browseData.Colors.filter((c) => c.name === option);
    return colorEntries.map((c) => {
      const product = productBySlug.get(c.slug);
      return {
        name: product?.name ?? c.name,
        slug: c.slug,
        image: resolveImage(product, c.image),
        product: product ?? null,
      };
    });
  }
  const typeEntries = option === ALL ? browseData.Types : browseData.Types.filter((t) => t.name === option);
  return typeEntries.map((t) => {
    const product = productBySlug.get(t.slug);
    return {
      name: product?.name ?? t.name,
      slug: t.slug,
      image: resolveImage(product, t.image),
      product: product ?? null,
    };
  });
}

let total = 0;
let withProduct = 0;
let withoutProduct = 0;
const mismatches: string[] = [];

for (const tab of Object.keys(optionsByTab) as Tab[]) {
  for (const option of optionsByTab[tab]) {
    const items = buildItems(tab, option);
    for (const item of items) {
      total++;
      if (!item.product) {
        withoutProduct++;
        continue;
      }
      withProduct++;
      // The card shows: item.name + item.image
      // The modal opens: item.product.name + item.product.image
      // They must match (or the card name MUST be the product's name).
      const nameOk = item.name === item.product.name;
      const imageOk = item.image === (item.product.image ?? "");
      if (!nameOk || !imageOk) {
        mismatches.push(
          `[${tab} → ${option}] slug=${item.slug}\n` +
          `  card.name=${JSON.stringify(item.name)}\n` +
          `  prod.name=${JSON.stringify(item.product.name)}\n` +
          `  card.image=${JSON.stringify(item.image)}\n` +
          `  prod.image=${JSON.stringify(item.product.image)}`
        );
      }
    }
  }
}

console.log(`Total card renders inspected: ${total}`);
console.log(`  with product (clickable):   ${withProduct}`);
console.log(`  without product (no click): ${withoutProduct}`);
console.log(`Mismatches: ${mismatches.length}`);
if (mismatches.length > 0) {
  console.log("\n=== MISMATCH DETAILS ===\n");
  for (const m of mismatches) console.log(m + "\n");
  process.exit(1);
}
console.log("\nPASS — every clickable card opens the same product whose image and name it shows.");
