/**
 * One-time seed script: Populates Sanity CMS with existing local data.
 *
 * Usage: NEXT_PUBLIC_SANITY_PROJECT_ID=3jv6o4t6 SANITY_API_TOKEN=sk... npx tsx scripts/sanity-seed-content.ts
 *
 * Seeds: catalog metadata, hero banners, news articles, job openings, dealers,
 *        project highlights, testimonials, project testimonials
 */

import { createClient } from "@sanity/client";
import { createReadStream, existsSync } from "fs";
import { resolve } from "path";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token || token === "your-write-token") {
  console.error("❌ Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-04-01",
  token,
  useCdn: false,
});

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "").replace(/^-+/, "");
}

async function uploadPdf(localPath: string, filename: string): Promise<string | null> {
  const absPath = resolve(__dirname, "../public", localPath.replace(/^\//, ""));
  if (!existsSync(absPath)) {
    console.log(`      ⚠️  PDF not found at ${absPath} — skipping`);
    return null;
  }
  const asset = await client.assets.upload("file", createReadStream(absPath), {
    filename,
    contentType: "application/pdf",
  });
  return asset._id;
}

async function uploadImage(localPath: string, filename: string): Promise<string | null> {
  const absPath = resolve(__dirname, "../public", localPath.replace(/^\//, ""));
  if (!existsSync(absPath)) {
    console.log(`      ⚠️  Image not found at ${absPath} — skipping`);
    return null;
  }
  const ext = filename.split(".").pop()?.toLowerCase() || "png";
  const contentType = ext === "jpg" || ext === "jpeg" ? "image/jpeg" : "image/png";
  const asset = await client.assets.upload("image", createReadStream(absPath), {
    filename,
    contentType,
  });
  return asset._id;
}

async function seed() {
  console.log("🌱 Seeding Sanity with local content data...\n");

  // ── 0. Catalog Metadata ──
  console.log("── Catalog Metadata ──");
  const catalogs = [
    {
      catalogId: "eleganz-600x1200",
      name: "600×1200MM Tiles",
      slug: "600x1200",
      size: "600×1200MM",
      filterValue: "600×1200 mm",
      count: "59 designs",
      types: "Glossy · High Gloss · Matt · Carving",
      description: "Large-format glazed vitrified tiles for statement floors and feature walls.",
      imagePath: "/images/catalogs/floor-600x1200.png",
      pdfPath: "/catalogs/600x1200.pdf",
      featured: true,
      sortOrder: 10,
    },
    {
      catalogId: "vitrified-600x600",
      name: "Floor Tiles — 600×600MM & 400×400MM",
      slug: "floor-tiles",
      size: "600×600MM & 400×400MM",
      filterValue: "600×600 mm",
      count: "92 designs",
      types: "Matt · Wood Look · Stone Look · Marble Look · Outdoor · Parking",
      description: "Vitrified floor tiles with natural wood, stone, and marble finishes for elegant interiors and durable outdoor spaces.",
      imagePath: "/images/catalogs/floor-600x600.png",
      pdfPath: "/catalogs/floor-tiles.pdf",
      featured: false,
      sortOrder: 20,
    },
    {
      catalogId: "wall-300x600",
      name: "Wall Tiles — 300×600MM",
      slug: "300x600",
      size: "300×600MM",
      filterValue: "300×600 mm",
      count: "81 designs",
      types: "Glossy · Ceramic · Wall",
      description: "Premium digital ceramic wall tiles with outstanding finish and rich detailing.",
      imagePath: "/images/catalogs/wall-300x600.png",
      pdfPath: "/catalogs/300x600.pdf",
      featured: false,
      sortOrder: 30,
    },
    {
      catalogId: "wall-300x450",
      name: "Wall Tiles — 300×450MM",
      slug: "300x450",
      size: "300×450MM",
      filterValue: "300×450 mm",
      count: "191 designs",
      types: "Glossy · Matt · Elevation",
      description: "Our finest ceramic wall tiles featuring modern designs and superior durability.",
      imagePath: "/images/catalogs/wall-300x450.png",
      pdfPath: "/catalogs/300x450.pdf",
      featured: false,
      sortOrder: 40,
    },
    {
      catalogId: "spirit-of-nepal",
      name: "Spirit of Nepal",
      slug: "spirit-of-nepal",
      size: "Mixed Sizes",
      filterValue: "spirit",
      count: "34 designs",
      types: "Dhaka · Thangka · Mithila · Flagstone",
      description: "Heritage tiles inspired by Nepali culture — Palpali Dhaka, Thangka Art, Mithila Art, and natural Flagstone.",
      imagePath: "/images/catalogs/spirit-of-nepal.png",
      pdfPath: "/catalogs/spirit-of-nepal.pdf",
      featured: false,
      sortOrder: 50,
    },
  ];

  for (const c of catalogs) {
    // Upload cover image
    let imageRef: { _type: "image"; asset: { _type: "reference"; _ref: string } } | undefined;
    const imageAssetId = await uploadImage(c.imagePath, c.imagePath.split("/").pop()!);
    if (imageAssetId) {
      imageRef = { _type: "image", asset: { _type: "reference", _ref: imageAssetId } };
    }

    // Upload PDF
    let pdfRef: { _type: "file"; asset: { _type: "reference"; _ref: string } } | undefined;
    const pdfAssetId = await uploadPdf(c.pdfPath, c.pdfPath.split("/").pop()!);
    if (pdfAssetId) {
      pdfRef = { _type: "file", asset: { _type: "reference", _ref: pdfAssetId } };
    }

    // Patch existing catalog documents (matched by catalogId) with new metadata fields.
    // Using patch-by-query preserves existing product references.
    await client
      .patch({ query: `*[_type == "tileCatalog" && catalogId == $catalogId][0]`, params: { catalogId: c.catalogId } })
      .set({
        name: c.name,
        slug: { _type: "slug", current: c.slug },
        size: c.size,
        filterValue: c.filterValue,
        count: c.count,
        types: c.types,
        description: c.description,
        featured: c.featured,
        sortOrder: c.sortOrder,
        ...(imageRef ? { coverImage: imageRef } : {}),
        ...(pdfRef ? { catalogPdf: pdfRef } : {}),
      })
      .commit({ returnDocuments: false });

    const status = [imageRef ? "image" : null, pdfRef ? "PDF" : null].filter(Boolean).join(" + ") || "no assets";
    console.log(`   ✅ ${c.name} (${c.catalogId}) — ${status}`);
  }

  // ── 1. Hero Banners ──
  console.log("── Hero Banners ──");
  const heroes = [
    { title: "Carrara White", tagline: "Timeless Italian Elegance", collection: "Carrara White", cta: "Discover More" },
    { title: "Spirit of Nepal", tagline: "Culture Meets Craftsmanship", collection: "Spirit of Nepal", cta: "Explore Collection" },
    { title: "Bottichino", tagline: "Make Your Space Luxurious", collection: "Bottichino", cta: "View Collection" },
    { title: "Onyx", tagline: "The Art of Living Well", collection: "Onyx", cta: "Discover More" },
  ];
  for (let i = 0; i < heroes.length; i++) {
    const h = heroes[i];
    await client.createOrReplace({
      _id: `hero-banner-${i + 1}`,
      _type: "heroBanner",
      title: h.title,
      tagline: h.tagline,
      collection: h.collection,
      cta: h.cta,
      sortOrder: (i + 1) * 10,
      active: true,
    });
    console.log(`   ✅ ${h.title}`);
  }

  // ── 2. News Articles ──
  console.log("\n── News Articles ──");
  const newsItems = [
    { id: "ns-certified-2026", title: "Prime Tiles Becomes Nepal's First and Only NS-Certified Tile Manufacturer", source: "Aarthik News", date: "2026-01-29", url: "https://english.aarthiknews.com/news/detail/19343/", summary: "Prime Tiles is awarded NS 617 certification by the Nepal Bureau of Standards and Metrology.", featured: true },
    { id: "sacmi-partnership-2025", title: "Prime Ceramics Launches World-Class Tile Production with SACMI Technology", source: "Business360", date: "2025-08-15", url: "#", summary: "Prime Ceramics partners with Italian giant SACMI to bring cutting-edge HD digital printing technology to Nepal.", featured: false },
    { id: "buildcon-2025", title: "Prime Ceramics Showcases Innovation at BuildCon 2025", source: "Construction Nepal", date: "2025-07-20", url: "#", summary: "Prime Ceramics displayed their latest tile collections at Nepal's premier construction expo.", featured: false },
    { id: "spirit-of-nepal-launch", title: "Spirit of Nepal Collection Celebrates Nepali Heritage in Ceramic Art", source: "Nepal Times", date: "2025-06-10", url: "#", summary: "Prime Tiles launches the Spirit of Nepal Collection featuring designs inspired by traditional Nepali art and culture.", featured: false },
    { id: "iso-certification", title: "Prime Ceramics Achieves ISO 9001:2015 Certification", source: "Industry Today", date: "2025-03-05", url: "#", summary: "Prime Ceramics receives international quality management certification.", featured: false },
  ];
  for (const n of newsItems) {
    await client.createOrReplace({
      _id: `news-${n.id}`,
      _type: "newsArticle",
      title: n.title,
      source: n.source,
      date: n.date,
      url: n.url,
      summary: n.summary,
      imageFit: "cover",
      featured: n.featured,
    });
    console.log(`   ✅ ${n.title.substring(0, 60)}...`);
  }

  // ── 3. Job Openings ──
  console.log("\n── Job Openings ──");
  const jobs = [
    { id: "production-engineer", title: "Production Engineer", team: "Manufacturing", location: "Rautahat", type: "Full-time", summary: "Own daily operations of a SACMI kiln line — yield, quality, throughput." },
    { id: "qc-lead", title: "Quality Control Lead", team: "Manufacturing", location: "Rautahat", type: "Full-time", summary: "Set and enforce QC standards across wall and floor lines." },
    { id: "showroom-lead", title: "Showroom Experience Lead", team: "Retail", location: "Kathmandu", type: "Full-time", summary: "Turn our Kathmandu showroom into the best tile-buying experience in the country." },
    { id: "regional-sales", title: "Regional Sales Manager — Western Nepal", team: "Sales", location: "Butwal / Pokhara", type: "Full-time", summary: "Build and manage the dealer network across Lumbini and Gandaki provinces." },
    { id: "digital-marketing", title: "Digital Marketing Specialist", team: "Marketing", location: "Kathmandu", type: "Full-time", summary: "Run SEO, social, and paid campaigns that drive dealer and homeowner leads." },
    { id: "content-lead", title: "Content & Brand Lead", team: "Marketing", location: "Kathmandu", type: "Full-time", summary: "Tell the Prime story across web, dealer materials, and press." },
  ];
  for (const j of jobs) {
    await client.createOrReplace({
      _id: `job-${j.id}`,
      _type: "jobOpening",
      title: j.title,
      team: j.team,
      location: j.location,
      type: j.type,
      summary: j.summary,
      active: true,
    });
    console.log(`   ✅ ${j.title}`);
  }

  // ── 4. Dealers (batch via transaction) ──
  console.log("\n── Dealers ──");
  // Import from the local data file
  const { dealers: localDealers } = await import("../src/data/dealers");
  // Use the localDealers array (the original one before Sanity override)
  const dealerList = (localDealers as Array<{ name: string; city: string; province: string; address: string; phone?: string; contactPerson?: string }>);

  const BATCH_SIZE = 50;
  let dealerCount = 0;
  for (let i = 0; i < dealerList.length; i += BATCH_SIZE) {
    const batch = dealerList.slice(i, i + BATCH_SIZE);
    const tx = client.transaction();
    for (const d of batch) {
      const id = `dealer-${slugify(d.name)}-${slugify(d.city)}`.substring(0, 120);
      tx.createOrReplace({
        _id: id,
        _type: "dealer",
        name: d.name,
        city: d.city,
        province: d.province,
        address: d.address || "",
        phone: d.phone || undefined,
        contactPerson: d.contactPerson || undefined,
      });
    }
    await tx.commit();
    dealerCount += batch.length;
    console.log(`   ✅ Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${batch.length} dealers (${dealerCount}/${dealerList.length})`);
  }

  // ── 5. Project Highlights ──
  console.log("\n── Project Highlights ──");
  const projects = [
    { title: "Kamal Pokhari Commercial Complex", location: "Kathmandu", type: "Commercial", tile: "Pleasant White / Faith", size: "600×600 mm", area: "10,000 sq.ft" },
    { title: "Nepal Music School", location: "Kathmandu", type: "Institutional", tile: "Smoky Blue", size: "600×600 mm", area: "5,000 sq.ft" },
    { title: "Sagacity Apartment", location: "Maharajgunj, Kathmandu", type: "Residential", tile: "Earthen Light Grey", size: "400×400 mm", area: "9,000 sq.ft" },
    { title: "Nana Hotel & Resort", location: "Pokhara", type: "Hospitality", tile: "Mirage Dark", size: "300×450 mm", area: "8,000 sq.ft" },
    { title: "Dhumbarahi Commercial Complex", location: "Kathmandu", type: "Commercial", tile: "Venise", size: "600×600 mm", area: "22,000 sq.ft" },
    { title: "S.R Complex", location: "Bhairahawa", type: "Commercial", tile: "Lenox Grey", size: "600×600 mm", area: "56,000 sq.ft" },
    { title: "Helios Hospital", location: "Kathmandu", type: "Healthcare", tile: "Greige Grey", size: "600×600 mm", area: "2,000 sq.ft" },
    { title: "Hotel Nagarjun Palace", location: "Kathmandu", type: "Hospitality", tile: "Windy Smug", size: "600×600 mm", area: "10,000 sq.ft" },
    { title: "CG Motors", location: "Nepal", type: "Commercial", tile: "Sand Beige", size: "600×600 mm", area: "4,000 sq.ft" },
    { title: "Godavari Valley Housing", location: "Kathmandu", type: "Residential", tile: "Elite Light", size: "400×400 mm", area: "5,000 sq.ft" },
    { title: "BYD Showroom", location: "Nepal", type: "Commercial", tile: "Sand Beige", size: "600×600 mm", area: "30,000 sq.ft" },
    { title: "Alpha Capital", location: "Kathmandu", type: "Commercial", tile: "", size: "", area: "" },
    { title: "Mercure Hotel", location: "Kathmandu", type: "Hospitality", tile: "", size: "", area: "" },
    { title: "Karnali Stadium", location: "Karnali", type: "Infrastructure", tile: "", size: "", area: "" },
    { title: "Krishi Bikash Bank", location: "Nepal", type: "Commercial", tile: "", size: "", area: "" },
    { title: "Pokhara Event Center", location: "Pokhara", type: "Commercial", tile: "", size: "", area: "" },
    { title: "Manipal International Teaching Hospital", location: "Pokhara", type: "Healthcare", tile: "", size: "", area: "" },
  ];
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    await client.createOrReplace({
      _id: `project-${slugify(p.title)}`,
      _type: "projectHighlight",
      title: p.title,
      location: p.location,
      type: p.type,
      tile: p.tile || undefined,
      size: p.size || undefined,
      area: p.area || undefined,
      sortOrder: (i + 1) * 10,
    });
    console.log(`   ✅ ${p.title}`);
  }

  // ── 6. Testimonials ──
  console.log("\n── Testimonials ──");
  const testimonials = [
    { author: "Rajesh Sharma", role: "Principal Architect, Sharma & Associates", project: "The Grand Atrium, Kathmandu", quote: "Prime Ceramics transformed our vision into reality. The quality of their porcelain is unmatched — every surface speaks of luxury and permanence." },
    { author: "Anita Gurung", role: "Lead Designer, Aura Interiors", project: "Lakeside Villa, Pokhara", quote: "As an interior designer, I need tiles that deliver both beauty and performance. Prime consistently exceeds on both. Their Nordic Wood range is a game-changer." },
    { author: "Bikram Thapa", role: "Director, Thapa Construction Group", project: "Metropolitan Tower, Lalitpur", quote: "We've sourced from Prime for over 8 years. Their consistency, range, and technical support make them indispensable." },
  ];
  for (const t of testimonials) {
    await client.createOrReplace({
      _id: `testimonial-${slugify(t.author)}`,
      _type: "testimonial",
      quote: t.quote,
      author: t.author,
      role: t.role,
      project: t.project,
    });
    console.log(`   ✅ ${t.author}`);
  }

  // ── 7. Project Testimonials ──
  console.log("\n── Project Testimonials ──");
  const projectTestimonials = [
    { project: "Nepalgunj Airport", location: "Nepalgunj", type: "Infrastructure" },
    { project: "Aadhar Mall", location: "Nepal", type: "Commercial" },
    { project: "Kathmandu Metropolitan Ward Office", location: "Kathmandu", type: "Government" },
    { project: "Durbarmarg Commercial Building", location: "Kathmandu", type: "Commercial" },
    { project: "Sagacity Apartment", location: "Maharajgunj, Kathmandu", type: "Residential", tile: "Earthen Light Grey", size: "400×400 mm", area: "9,000 sq.ft" },
    { project: "Karnali Province Stadium", location: "Karnali", type: "Infrastructure" },
    { project: "S.R Complex", location: "Bhairahawa", type: "Commercial", tile: "Lenox Grey", size: "600×600 mm", area: "56,000 sq.ft" },
    { project: "Manipal International Teaching Hospital", location: "Pokhara", type: "Healthcare" },
    { project: "Godawari Valley Housing", location: "Kathmandu", type: "Residential", tile: "Elite Light", size: "400×400 mm", area: "5,000 sq.ft" },
    { project: "Suryabinayak Municipality Office", location: "Bhaktapur", type: "Government" },
    { project: "Agriculture Development Bank", location: "Nepal", type: "Commercial" },
    { project: "Durbarmarg Commercial Building II", location: "Kathmandu", type: "Commercial" },
  ];
  for (let i = 0; i < projectTestimonials.length; i++) {
    const p = projectTestimonials[i];
    await client.createOrReplace({
      _id: `project-testimonial-${slugify(p.project)}-${i}`,
      _type: "projectTestimonial",
      project: p.project,
      location: p.location,
      type: p.type,
      tile: (p as any).tile || undefined,
      size: (p as any).size || undefined,
      area: (p as any).area || undefined,
      sortOrder: (i + 1) * 10,
    });
    console.log(`   ✅ ${p.project}`);
  }

  console.log("\n🎉 Seed complete!");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});
