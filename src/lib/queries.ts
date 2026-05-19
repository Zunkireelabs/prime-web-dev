// ─── Prime Ceramics — Sanity GROQ Queries ───

// ── Products ──

// All products for catalog grid (fetched at build time)
export const allProductsQuery = `
  *[_type == "tileProduct"] | order(sortOrder asc, name asc) {
    name,
    "slug": slug.current,
    "catalog": catalog->catalogId,
    category,
    series,
    collection,
    size,
    finish,
    application,
    hasMatchingFloor,
    variants,
    image,
    imageRotation,
    hasGallery,
    "gallery": gallery[]{ "url": image.asset->url, label, caption },
    showFirst,
    sortOrder
  }
`;

// Products filtered by catalog ID
export const productsByCatalogQuery = `
  *[_type == "tileProduct" && catalog->catalogId == $catalogId]
    | order(sortOrder asc, name asc) {
    name,
    "slug": slug.current,
    "catalog": catalog->catalogId,
    category,
    series,
    collection,
    size,
    finish,
    application,
    hasMatchingFloor,
    variants,
    image,
    imageRotation,
    hasGallery,
    "gallery": gallery[]{ "url": image.asset->url, label, caption },
    showFirst,
    sortOrder
  }
`;

// All catalog documents (ordered for the catalog showcase grid)
export const allCatalogsQuery = `
  *[_type == "tileCatalog"] | order(sortOrder asc, name asc) {
    name,
    "slug": slug.current,
    catalogId,
    size,
    filterValue,
    count,
    types,
    description,
    "image": coverImage.asset->url,
    "pdf": catalogPdf.asset->url,
    featured,
    sortOrder
  }
`;

// Aggregate catalog statistics
export const catalogStatsQuery = `
  {
    "total": count(*[_type == "tileProduct"]),
    "sizes": array::unique(*[_type == "tileProduct"].size),
    "finishes": array::unique(*[_type == "tileProduct"].finish),
    "series": array::unique(*[_type == "tileProduct"].series)
  }
`;

// ── Hero Banners ──

export const heroBannersQuery = `
  *[_type == "heroBanner" && active == true] | order(sortOrder asc) {
    title,
    tagline,
    image,
    collection,
    cta
  }
`;

// ── News & Media ──

export const newsQuery = `
  *[_type == "newsArticle"] | order(date desc) {
    title,
    source,
    date,
    url,
    summary,
    image,
    imageFit,
    imagePosition,
    featured
  }
`;

// ── Job Openings ──

export const jobOpeningsQuery = `
  *[_type == "jobOpening" && active == true] | order(title asc) {
    title,
    team,
    location,
    type,
    summary,
    applyUrl
  }
`;

// ── Dealers ──

export const dealersQuery = `
  *[_type == "dealer"] | order(province asc, name asc) {
    name,
    city,
    province,
    address,
    phone,
    contactPerson
  }
`;

// ── Project Highlights ──

export const projectHighlightsQuery = `
  *[_type == "projectHighlight"] | order(sortOrder asc) {
    title,
    location,
    type,
    tile,
    size,
    area,
    image,
    sortOrder
  }
`;

// ── Testimonials ──

export const testimonialsQuery = `
  *[_type == "testimonial"] {
    quote,
    author,
    role,
    project,
    image
  }
`;

// ── Project Testimonials ──

export const projectTestimonialsQuery = `
  *[_type == "projectTestimonial"] | order(sortOrder asc) {
    project,
    location,
    type,
    tile,
    size,
    area,
    image,
    sortOrder
  }
`;
