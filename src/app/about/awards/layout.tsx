import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Awards & Certifications — Prime Ceramics | ISO 9001, SASO, NS Mark",
  description:
    "Prime Ceramics holds ISO 9001:2015, SASO Quality Mark, NS Mark License, and Nepal Government's Highest Revenue Contributor award. Certified quality for ceramic tiles.",
  openGraph: {
    title: "Awards & Certifications — Prime Ceramics | ISO 9001, SASO, NS Mark",
    description:
      "Prime Ceramics holds ISO 9001:2015, SASO Quality Mark, NS Mark License, and Nepal Government's Highest Revenue Contributor award. Certified quality for ceramic tiles.",
  },
};

export default function AwardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
