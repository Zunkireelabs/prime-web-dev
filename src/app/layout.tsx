import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import Providers from "@/components/layout/Providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://primeceramics.com.np"),
  title: "Prime Tiles Industries — Nepal's No.1 Tile Manufacturer",
  description:
    "Premium wall and floor tiles powered by Italian SACMI technology. Nepal's first manufacturer of both wall and floor tiles. ISO certified. 300mm to 1200mm formats.",
  keywords: [
    "Prime Tiles",
    "tiles Nepal",
    "floor tiles Nepal",
    "wall tiles Nepal",
    "ceramic tiles",
    "vitrified tiles",
    "porcelain tiles",
    "Prime Ceramics",
    "SACMI technology",
    "tile manufacturer Nepal",
    "Kathmandu tiles",
    "Spirit of Nepal tiles",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Prime Tiles Industries — Nepal's No.1 Tile Manufacturer",
    description:
      "Premium wall and floor tiles powered by Italian SACMI technology. Nepal's first manufacturer of both wall and floor tiles.",
    url: "https://primeceramics.com.np",
    type: "website",
    locale: "en_US",
    siteName: "Prime Tiles Industries",
    images: [
      {
        url: "/images/factory.jpg",
        width: 1200,
        height: 635,
        alt: "Prime Tiles Industries manufacturing facility in Nepal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prime Tiles Industries — Nepal's No.1 Tile Manufacturer",
    description:
      "Premium wall and floor tiles powered by Italian SACMI technology. Nepal's first manufacturer of both wall and floor tiles.",
    images: ["/images/factory.jpg"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/images/prime-favicon.png",
    apple: "/images/prime-favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              window.scrollTo(0, 0);
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${cormorant.variable} ${inter.className} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Prime Tiles Industries",
                "alternateName": "Prime Ceramics",
                "url": "https://primeceramics.com.np",
                "logo": "https://primeceramics.com.np/images/prime-favicon.png",
                "image": "https://primeceramics.com.np/images/factory.jpg",
                "description": "Nepal's No.1 tile manufacturer. First to manufacture both wall and floor tiles with Italian SACMI technology.",
                "foundingDate": "2021",
                "numberOfEmployees": {
                  "@type": "QuantitativeValue",
                  "minValue": 100,
                },
                "areaServed": "Nepal",
                "sameAs": [],
              },
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "Prime Tiles Industries Pvt. Ltd.",
                "url": "https://primeceramics.com.np",
                "image": "https://primeceramics.com.np/images/factory.jpg",
                "description": "Nepal's largest tile manufacturing facility with 4M sq m annual capacity.",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Rautahat",
                  "addressRegion": "Madhesh Pradesh",
                  "addressCountry": "NP",
                },
                "priceRange": "$$",
              },
            ]),
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:text-sm"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
