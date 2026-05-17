import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "3jv6o4t6",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-04-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const BASE = path.resolve(__dirname, "../temp-ss");

// Image file path → Sanity product slug mapping
const mappings: [string, string][] = [
  // Alderation
  ["Alderation/ALDERATION LIGHT.jpg", "alderation-light"],

  // Atlantica
  ["Atlantica/Atlantica_LB.jpg", "atlantica-light"],
  ["Atlantica/Atlantica_HL-01.jpg", "atlantica-hl-01"],
  ["Atlantica/Atlantica_HL-02.jpg", "atlantica-hl-02"],
  ["Atlantica/Atlantica_DB.jpg", "atlantica-dark"],

  // Blossom
  ["Blossom/BLOSSOM LIGHT.jpg", "blossom-light"],
  ["Blossom/BLOSSOM HL.jpg", "blossom-hl"],
  ["Blossom/BLOSSOM DARK.jpg", "blossom-dark"],

  // Botany
  ["Botany/BOTANY LIGHT.jpg", "botany-light"],
  ["Botany/BOTANY HL.jpg", "botany-hl"],
  ["Botany/BOTANY DARK.jpg", "botany-dark"],

  // Centro
  ["Centro/CENTRO LT.jpg", "centro-light"],
  ["Centro/CENTRO HL.jpg", "centro-hl"],
  ["Centro/CENTRO DB.jpg", "centro-dark"],

  // Cubixa
  ["Cubixa/CUBIXA LT.jpg", "cubixa-light"],
  ["Cubixa/CUBIXA HL.jpg", "cubixa-hl"],
  ["Cubixa/CUBIXA DB.jpg", "cubixa-dark"],

  // Durben
  ["Durben/DURBEN LT.jpg", "durben-light"],

  // Flowery
  ["Flowery/FLOWERY_LIGHT.jpg", "flowery-light"],
  ["Flowery/FLOWERY_HL01.jpg", "flowery-hl-01"],
  ["Flowery/FLOWERY_HL02.jpg", "flowery-hl-02"],

  // Fusion
  ["Fusion/FUSION_LIGHT.jpg", "fusion-light"],
  ["Fusion/FUSION_HL.jpg", "fusion-hl"],
  ["Fusion/FUSION_DARK.jpg", "fusion-dark"],

  // Gabba
  ["Gabba/GABBA LT.jpg", "gabba-light"],
  ["Gabba/GABBA HL.jpg", "gabba-hl"],

  // Gem Crema
  ["Gem Crema/GEM CREMA LIGHT.jpg", "gem-crema-light"],
  ["Gem Crema/GEM CREMA HL.jpg", "gem-crema-hl"],
  ["Gem Crema/GEM CREMA DARK.jpg", "gem-crema-dark"],

  // Gem Wood
  ["Gem Wood/GEM WOOD LIGHT.jpg", "gem-wood-light"],
  ["Gem Wood/GEM WOOD HL.jpg", "gem-wood-hl"],
  ["Gem Wood/GEM WOOD DARK.jpg", "gem-wood-dark"],

  // Ivy
  ["ivy/IVY LIGHT.jpg", "ivy-light"],

  // Kyoto
  ["Kyoto/KYOTO_LIGHT.jpg", "kyoto-light"],
  ["Kyoto/KYOTO_HL.jpg", "kyoto-hl"],
  ["Kyoto/KYOTO_DARK.jpg", "kyoto-dark"],

  // Liam
  ["Liam/LIAM LT.jpg", "liam-light"],
  ["Liam/LIAM HL.jpg", "liam-hl"],
  ["Liam/LIAM DB.jpg", "liam-dark"],

  // Ritz
  ["Ritz/RITZ LT.jpg", "ritz-light"],
  ["Ritz/RITZ HL.jpg", "ritz-hl"],
  ["Ritz/RITZ DB.jpg", "ritz-dark"],

  // Satin White
  ["Satin White/Satin White.jpg", "satin-white"],

  // Savoy
  ["Savoy/SAVOY LT.jpg", "savoy-light"],
  ["Savoy/SAVOY HL.jpg", "savoy-hl"],
  ["Savoy/SAVOY DB.jpg", "savoy-dark"],

  // Swan
  ["Swan/SWAN_LB.jpg", "swan-light"],
  ["Swan/SWAN_HL01.jpg", "swan-hl-01"],
  ["Swan/SWAN_HL02.jpg", "swan-hl-02"],
  ["Swan/SWAN_DB.jpg", "swan-dark"],

  // Trevertino (already has images but updating if needed)
  ["Trevertino/Trevertino Light.jpg", "trevertino-light"],
  ["Trevertino/Trevertino HL.jpg", "trevertino-hl"],
  ["Trevertino/Trevertino Dark.jpg", "trevertino-dark"],

  // Unser
  ["Unser Brown/UNSER DARK.jpg", "unser-dark"],
  ["Unser Multi/UNSER MULTI.jpg", "unser-multi"],
];

async function main() {
  let success = 0;
  let skipped = 0;
  let failed = 0;

  for (const [filePath, slug] of mappings) {
    const fullPath = path.join(BASE, filePath);

    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  File not found: ${filePath}, skipping`);
      skipped++;
      continue;
    }

    // Find product by slug
    const product = await client.fetch(
      `*[_type == "tileProduct" && slug.current == $slug][0]`,
      { slug }
    );

    if (!product) {
      console.log(`⚠️  Product not found for slug "${slug}", skipping`);
      skipped++;
      continue;
    }

    try {
      console.log(`📤 Uploading ${filePath} → "${product.name}"...`);

      const imageAsset = await client.assets.upload(
        "image",
        fs.createReadStream(fullPath),
        { filename: path.basename(filePath) }
      );

      await client
        .patch(product._id)
        .set({
          image: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: imageAsset._id,
            },
          },
        })
        .commit();

      console.log(`✅ Updated "${product.name}"`);
      success++;
    } catch (err: any) {
      console.error(`❌ Failed "${product.name}": ${err.message}`);
      failed++;
    }
  }

  console.log(`\n🎉 Done! ${success} uploaded, ${skipped} skipped, ${failed} failed`);
  console.log(`Run 'npm run prebuild' to regenerate local data.`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
