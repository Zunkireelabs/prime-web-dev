import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — Prime Tiles Industries",
  description:
    "Explore Prime Ceramics services — tile installation guidance, project consultation, sample requests, and technical support.",
  openGraph: {
    title: "Services — Prime Tiles Industries",
    description:
      "Explore Prime Ceramics services — tile installation guidance, project consultation, and technical support.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
