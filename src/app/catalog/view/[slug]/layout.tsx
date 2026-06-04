import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "View Catalogue — Prime Tiles Industries",
  description: "Browse our tile catalogue online. View product details, specifications, and designs.",
};

export default function CatalogViewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
