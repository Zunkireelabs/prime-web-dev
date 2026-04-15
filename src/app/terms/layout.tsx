import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use — Prime Tiles Industries",
  description:
    "Terms and conditions governing the use of the Prime Tiles Industries website and services.",
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
