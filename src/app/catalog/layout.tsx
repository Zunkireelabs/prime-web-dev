import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tile Catalogue — Prime Tiles Industries",
  description:
    "Browse our complete tile catalogue — wall tiles, floor tiles, porcelain, ceramic, vitrified, and large format. 300mm to 1200mm sizes. Download PDF catalogues.",
  openGraph: {
    title: "Tile Catalogue — Prime Tiles Industries",
    description:
      "Browse our complete tile catalogue — wall tiles, floor tiles, porcelain, ceramic, vitrified, and large format.",
  },
};

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
