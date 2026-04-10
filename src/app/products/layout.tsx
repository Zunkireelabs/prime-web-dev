import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products — Prime Tiles Industries",
  description:
    "Browse every Prime Ceramics tile. Filter by category, collection, size, finish, application, and series. Porcelain, vitrified, ceramic, and large-format surfaces.",
  openGraph: {
    title: "Products — Prime Tiles Industries",
    description:
      "Browse every Prime Ceramics tile. Filter by category, collection, size, finish, and application.",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
