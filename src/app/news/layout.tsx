import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Media — Prime Ceramics in the Press",
  description:
    "Press coverage of Prime Ceramics — Nepal's first NS-certified manufacturer of wall and floor tiles. Articles from The Kathmandu Post, SACMI, Ceramic World, Business 360, and more.",
  openGraph: {
    title: "News & Media — Prime Ceramics in the Press",
    description:
      "Press coverage of Prime Ceramics — Nepal's first NS-certified manufacturer of wall and floor tiles.",
    type: "website",
  },
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
