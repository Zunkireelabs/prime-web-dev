import type { StructureBuilder } from "sanity/structure";

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

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title("Prime Ceramics")
    .items([
      S.listItem()
        .title("Products by Catalog")
        .child(
          S.list()
            .title("Catalogs")
            .items([
              catalogFilter(S, "Wall 300×450", "wall-300x450"),
              catalogFilter(S, "Wall 300×600", "wall-300x600"),
              catalogFilter(S, "Vitrified 400×400", "vitrified-400x400"),
              catalogFilter(S, "Vitrified 600×600", "vitrified-600x600"),
              catalogFilter(S, "Eleganz 600×1200", "eleganz-600x1200"),
              catalogFilter(S, "Spirit of Nepal", "spirit-of-nepal"),
            ])
        ),
      S.divider(),
      S.documentTypeListItem("tileProduct").title("All Products"),
      S.documentTypeListItem("tileCatalog").title("Catalogs"),
    ]);
