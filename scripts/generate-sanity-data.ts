/**
 * Pre-build script: Fetches all non-product content from Sanity CMS
 * and writes them as static JSON files for the static export.
 *
 * Usage: npx tsx scripts/generate-sanity-data.ts
 * Runs automatically via `prebuild` npm script (after generate-catalog-data.ts).
 */

import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import { writeFileSync } from "fs";
import { resolve } from "path";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-04-01";

if (!projectId || projectId === "your-project-id") {
  console.warn(
    "⚠️  NEXT_PUBLIC_SANITY_PROJECT_ID not set. Skipping content data generation."
  );
  process.exit(0);
}

const client = createClient({ projectId, dataset, apiVersion, useCdn: true });
const builder = createImageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function urlFor(source: any) {
  return builder.image(source);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function imageUrl(image: any, width = 1200): string {
  if (!image) return "";
  return urlFor(image).width(width).quality(80).format("webp").url();
}

// ── GROQ Queries ──

const queries = {
  catalogs: `
    *[_type == "tileCatalog"] | order(sortOrder asc, name asc) {
      name,
      "slug": slug.current,
      catalogId,
      size,
      filterValue,
      count,
      types,
      description,
      coverImage,
      "pdf": catalogPdf.asset->url,
      featured,
      sortOrder
    }
  `,
  heroes: `
    *[_type == "heroBanner" && active == true] | order(sortOrder asc) {
      title, tagline, image, collection, cta
    }
  `,
  news: `
    *[_type == "newsArticle"] | order(date desc) {
      title, source, date, url, summary, image, imageFit, imagePosition, featured
    }
  `,
  jobs: `
    *[_type == "jobOpening" && active == true] | order(title asc) {
      title, team, location, type, summary, applyUrl
    }
  `,
  dealers: `
    *[_type == "dealer"] | order(province asc, name asc) {
      name, city, province, address, phone, contactPerson
    }
  `,
  projects: `
    *[_type == "projectHighlight"] | order(sortOrder asc) {
      title, location, type, tile, size, area, image, sortOrder
    }
  `,
  testimonials: `
    *[_type == "testimonial"] {
      quote, author, role, project, image
    }
  `,
  projectTestimonials: `
    *[_type == "projectTestimonial"] | order(sortOrder asc) {
      project, location, type, tile, size, area, image, sortOrder
    }
  `,
};

// ── Transform & Write ──

interface ContentType {
  key: string;
  query: string;
  outputFile: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform: (items: any[]) => any[];
}

const contentTypes: ContentType[] = [
  {
    key: "catalogs",
    query: queries.catalogs,
    outputFile: "sanity-catalogs.json",
    // Only include catalogs that have been fully configured for display (have a count field set)
    transform: (items) =>
      items
        .filter((c) => c.count)
        .map((c) => ({
          name: c.name,
          slug: c.slug || "",
          size: c.size || "",
          filterValue: c.filterValue || "",
          count: c.count || "",
          types: c.types || "",
          description: c.description || "",
          image: imageUrl(c.coverImage, 800),
          pdf: c.pdf || "",
          featured: c.featured || false,
          sortOrder: c.sortOrder || 50,
        })),
  },
  {
    key: "heroes",
    query: queries.heroes,
    outputFile: "sanity-heroes.json",
    transform: (items) =>
      items.map((h) => ({
        image: imageUrl(h.image, 1920),
        collection: h.collection || "",
        tagline: h.tagline || "",
        cta: h.cta || "Discover More",
      })),
  },
  {
    key: "news",
    query: queries.news,
    outputFile: "sanity-news.json",
    transform: (items) =>
      items.map((n, i) => ({
        id: `sanity-news-${i}`,
        title: n.title,
        source: n.source,
        date: n.date,
        url: n.url,
        summary: n.summary,
        image: imageUrl(n.image, 800),
        imageFit: n.imageFit || "cover",
        imagePosition: n.imagePosition || undefined,
        featured: n.featured || false,
      })),
  },
  {
    key: "jobs",
    query: queries.jobs,
    outputFile: "sanity-jobs.json",
    transform: (items) =>
      items.map((j, i) => ({
        id: `sanity-job-${i}`,
        title: j.title,
        team: j.team,
        location: j.location,
        type: j.type,
        summary: j.summary,
        applyUrl: j.applyUrl || undefined,
      })),
  },
  {
    key: "dealers",
    query: queries.dealers,
    outputFile: "sanity-dealers.json",
    transform: (items) =>
      items.map((d) => ({
        name: d.name,
        city: d.city,
        province: d.province,
        address: d.address || "",
        phone: d.phone || undefined,
        contactPerson: d.contactPerson || undefined,
      })),
  },
  {
    key: "projects",
    query: queries.projects,
    outputFile: "sanity-projects.json",
    transform: (items) =>
      items.map((p, i) => ({
        id: i + 1,
        title: p.title,
        location: p.location || "",
        type: p.type || "",
        tile: p.tile || "",
        size: p.size || "",
        area: p.area || "",
        image: imageUrl(p.image, 1200),
      })),
  },
  {
    key: "testimonials",
    query: queries.testimonials,
    outputFile: "sanity-testimonials.json",
    transform: (items) =>
      items.map((t) => ({
        quote: t.quote,
        author: t.author,
        role: t.role || "",
        project: t.project || "",
        image: imageUrl(t.image, 200) || undefined,
      })),
  },
  {
    key: "projectTestimonials",
    query: queries.projectTestimonials,
    outputFile: "sanity-project-testimonials.json",
    transform: (items) =>
      items.map((p, i) => ({
        id: i + 1,
        project: p.project,
        location: p.location || "",
        type: p.type || "",
        tile: p.tile || undefined,
        size: p.size || undefined,
        area: p.area || undefined,
        image: imageUrl(p.image, 1200),
      })),
  },
];

async function generate() {
  console.log("📦 Fetching content data from Sanity...");

  const results = await Promise.all(
    contentTypes.map(async (ct) => {
      const raw = await client.fetch(ct.query);
      return { ...ct, raw };
    })
  );

  let totalCount = 0;

  for (const { key, raw, outputFile, transform } of results) {
    if (!raw || raw.length === 0) {
      console.log(`   ⏭  ${key}: 0 items — skipping`);
      continue;
    }

    const transformed = transform(raw);
    const outputPath = resolve(__dirname, `../src/data/${outputFile}`);
    writeFileSync(outputPath, JSON.stringify(transformed, null, 2));
    console.log(`   ✅ ${key}: ${transformed.length} items → src/data/${outputFile}`);
    totalCount += transformed.length;
  }

  console.log(`\n✅ Generated ${totalCount} content items across ${results.filter((r) => r.raw.length > 0).length} types`);
}

generate().catch((err) => {
  console.error("❌ Failed to fetch content data from Sanity:", err.message);
  process.exit(1);
});
