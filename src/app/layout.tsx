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
  title: "Prime | Premium Experience",
  description:
    "Premium experience crafted with care and attention to detail.",
  keywords: ["prime", "premium", "luxury", "experience"],
  openGraph: {
    title: "Prime | Premium Experience",
    description: "Premium experience crafted with care and attention to detail.",
    type: "website",
    locale: "en_US",
    siteName: "Prime",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prime | Premium Experience",
    description: "Premium experience crafted with care and attention to detail.",
  },
  robots: {
    index: true,
    follow: true,
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
