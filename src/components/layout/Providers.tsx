"use client";

import dynamic from "next/dynamic";

const ScrollProgress = dynamic(() => import("@/components/ui/ScrollProgress"), { ssr: false });
const BackToTop = dynamic(() => import("@/components/ui/BackToTop"), { ssr: false });
const FloatingEnquiry = dynamic(() => import("@/components/ui/FloatingEnquiry"), { ssr: false });

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ScrollProgress />
      <BackToTop />
      <FloatingEnquiry />
    </>
  );
}
