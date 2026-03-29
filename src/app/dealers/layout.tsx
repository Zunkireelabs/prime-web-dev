import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find a Dealer — Prime Tiles Industries",
  description:
    "Find authorized Prime Ceramics dealers across all provinces of Nepal. Search by city or filter by province.",
  openGraph: {
    title: "Find a Dealer — Prime Tiles Industries",
    description:
      "Find authorized Prime Ceramics dealers across all provinces of Nepal.",
  },
};

export default function DealersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
