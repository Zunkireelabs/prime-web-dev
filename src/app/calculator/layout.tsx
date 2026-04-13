import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tile Calculator — Prime Tiles Industries",
  description:
    "Calculate exactly how many tiles you need. Enter room dimensions, select tile size, and get instant quantity estimates with wastage allowance.",
  openGraph: {
    title: "Tile Calculator — Prime Tiles Industries",
    description:
      "Calculate tile requirements for your project. Estimate quantity, boxes, and area coverage.",
  },
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
