// ─── Prime Ceramics — Sanity GROQ Queries ───

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
    sortOrder
  }
`;

// All catalog documents
export const allCatalogsQuery = `
  *[_type == "tileCatalog"] | order(name asc) {
    name,
    "slug": slug.current,
    catalogId,
    description,
    coverImage
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
