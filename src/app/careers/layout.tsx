import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at Prime Ceramics — Build with us",
  description:
    "Join Nepal's first NS-certified tile manufacturer. Italian engineering, Nepali craftsmanship, global ambition — open roles and open applications welcome.",
  openGraph: {
    title: "Careers at Prime Ceramics — Build with us",
    description:
      "Join Nepal's first NS-certified tile manufacturer. Italian engineering, Nepali craftsmanship, global ambition.",
    type: "website",
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
