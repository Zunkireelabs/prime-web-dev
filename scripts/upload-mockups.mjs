import { createClient } from "@sanity/client";
import { createReadStream, readdirSync, statSync } from "fs";
import { join, basename, extname } from "path";

const client = createClient({
  projectId: "3jv6o4t6",
  dataset: "production",
  apiVersion: "2026-04-01",
  token: "skbRdeqUEx2RfTOXaQJfpqcGJ3HyDXNPVezbP1wFRr9zO4RUNDu1EkMfJ0DDZoDiueIHSLhT3Itk3L1JFMwvxNSSyTQpBLwsBZXb6gsXD1pWzA5jm6oYeVbqtz20YEC18tl3EUhP0DojC8E4uaw1YvVhNQcbfs7YgcjzjmXigsHFRRxddQ5Z",
  useCdn: false,
});

const MOCKUPS_DIR = new URL("../docs/mockups/converted", import.meta.url).pathname;

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[&]/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function uploadMockup(filePath) {
  const filename = basename(filePath);
  const title = basename(filePath, extname(filePath));
  const slug = slugify(title);

  console.log(`\nUploading: ${filename}`);

  // Upload image asset
  const asset = await client.assets.upload("image", createReadStream(filePath), {
    filename,
    contentType: "image/jpeg",
  });

  console.log(`  ✓ Asset uploaded: ${asset._id}`);

  // Create roomMockup document
  const doc = await client.createOrReplace({
    _type: "roomMockup",
    _id: `roomMockup-${slug}`,
    title,
    slug: { _type: "slug", current: slug },
    image: {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt: title,
    },
    sortOrder: 100,
    hidden: false,
  });

  console.log(`  ✓ Document created: ${doc._id}`);
  return doc;
}

async function main() {
  const files = readdirSync(MOCKUPS_DIR)
    .filter((f) => f.endsWith(".jpg"))
    .map((f) => join(MOCKUPS_DIR, f));

  console.log(`Found ${files.length} mockups to upload...`);

  for (const file of files) {
    await uploadMockup(file);
  }

  console.log("\n✅ All mockups uploaded to Sanity.");
  console.log("Open Sanity Studio to set room types and link products.");
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
