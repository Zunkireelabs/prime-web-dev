import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Prime Tiles Industries",
  description:
    "Learn how Prime Tiles Industries Pvt. Ltd. collects, uses, and protects your personal information.",
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
