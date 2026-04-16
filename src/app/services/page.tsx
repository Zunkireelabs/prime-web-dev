"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CollectionsGrid from "@/components/sections/CollectionsGrid";

const SectionTransition = dynamic(() => import("@/components/ui/SectionTransition"), { ssr: false });
const CTASection = dynamic(() => import("@/components/sections/CTASection"), { ssr: false });

export default function ServicesPage() {
  return (
    <SmoothScroll>
      <Header />
      <main id="main-content" style={{ paddingTop: "clamp(72px, 10vw, 96px)" }}>
        <CollectionsGrid />
        <CTASection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
