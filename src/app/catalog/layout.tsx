import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tile Catalog — Prime Tiles Industries",
  description:
    "Browse our complete tile catalog — wall tiles, floor tiles, porcelain, ceramic, vitrified, and large format. 300mm to 1200mm sizes. Download PDF catalogs.",
  openGraph: {
    title: "Tile Catalog — Prime Tiles Industries",
    description:
      "Browse our complete tile catalog — wall tiles, floor tiles, porcelain, ceramic, vitrified, and large format.",
  },
};

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
