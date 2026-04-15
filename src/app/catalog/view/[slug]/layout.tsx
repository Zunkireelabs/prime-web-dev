import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "View Catalog — Prime Tiles Industries",
  description: "Browse our tile catalog online. View product details, specifications, and designs.",
};

export default function CatalogViewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
