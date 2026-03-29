import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Awards & Certifications — Prime Ceramics",
  description:
    "Prime Ceramics certifications, quality standards, and milestones of excellence in tile manufacturing.",
  openGraph: {
    title: "Awards & Certifications — Prime Ceramics",
    description:
      "Prime Ceramics certifications, quality standards, and milestones of excellence in tile manufacturing.",
  },
};

export default function AwardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
