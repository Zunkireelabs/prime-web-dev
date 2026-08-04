import type { StructureBuilder } from "sanity/structure";
import { ProductsTable } from "./plugins/bulk-upload/ProductsTable";

function catalogFilter(
  S: StructureBuilder,
  title: string,
  catalogId: string
) {
  return S.listItem()
    .title(title)
    .child(
      S.documentList()
        .title(title)
        .filter(
          '_type == "tileProduct" && catalog->catalogId == $catalogId'
        )
        .params({ catalogId })
        .defaultOrdering([{ field: "sortOrder", direction: "asc" }])
    );
}

// All tile sizes in descending order
const tileSizes = [
  "600×1200 mm",
  "600×600 mm",
  "400×400 mm",
  "300×600 mm",
  "300×450 mm",
  "300×300 mm",
];

/**
 * "All Products" broken down by Size → Series (design name).
 * Clicking a size shows all unique series within that size,
 * then clicking a series shows the individual tiles.
 */
function allProductsBySize(S: StructureBuilder) {
  return S.listItem()
    .title("All Products")
    .child(
      S.list()
        .title("All Products — by Size")
        .items(
          tileSizes.map((size) =>
            S.listItem()
              .title(size)
              .child(
                S.documentList()
                  .title(`Products — ${size}`)
                  .filter('_type == "tileProduct" && size == $size')
                  .params({ size })
                  .defaultOrdering([
                    { field: "series", direction: "asc" },
                    { field: "name", direction: "asc" },
                  ])
              )
          )
        )
    );
}

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title("Prime Ceramics")
    .items([
      // ── Products ──
      S.listItem()
        .title("Products")
        .child(
          S.list()
            .title("Products")
            .items([
              allProductsBySize(S),
              S.listItem()
                .title("Product Table")
                .child(S.component(ProductsTable).title("Product Table")),
              S.documentTypeListItem("tileCatalog").title("Catalogs"),
            ])
        ),

      S.divider(),

      // ── Website Content ──
      S.listItem()
        .title("Website Content")
        .child(
          S.list()
            .title("Website Content")
            .items([
              S.documentTypeListItem("heroBanner").title("Hero Banners"),
              S.documentTypeListItem("newsArticle").title("News & Media"),
              S.documentTypeListItem("projectHighlight").title("Project Highlights"),
              S.documentTypeListItem("projectTestimonial").title("Project Testimonials"),
              S.documentTypeListItem("testimonial").title("Testimonials"),
            ])
        ),

      S.divider(),

      // ── Operations ──
      S.listItem()
        .title("Operations")
        .child(
          S.list()
            .title("Operations")
            .items([
              S.documentTypeListItem("dealer").title("Dealers"),
              S.documentTypeListItem("jobOpening").title("Job Openings"),
            ])
        ),
    ]);
