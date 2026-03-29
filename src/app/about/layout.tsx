import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Prime Ceramics — Nepal's First Wall & Floor Tile Manufacturer",
  description:
    "Established in 2021 with Italian SACMI technology and 4M sq m annual capacity. Nepal's first manufacturer of both wall and floor tiles.",
  openGraph: {
    title: "About Prime Ceramics — Nepal's First Wall & Floor Tile Manufacturer",
    description:
      "Established in 2021 with Italian SACMI technology and 4M sq m annual capacity. Nepal's first manufacturer of both wall and floor tiles.",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
