"use client";

import { Suspense, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CatalogHero from "@/components/sections/CatalogHero";

const SectionTransition = dynamic(() => import("@/components/ui/SectionTransition"), { ssr: false });
const CatalogShowcase = dynamic(() => import("@/components/sections/CatalogShowcase"), { ssr: false });
const CatalogStats = dynamic(() => import("@/components/sections/CatalogStats"), { ssr: false });
const CTASection = dynamic(() => import("@/components/sections/CTASection"), { ssr: false });

function CatalogContent() {
  const showcaseRef = useRef<HTMLDivElement>(null);

  const handleViewCollection = useCallback((filterValue: string) => {
    showcaseRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <SmoothScroll>
      <Header />
      <main id="main-content">
        <CatalogHero />
        <SectionTransition from="dark" to="light" variant="diagonal" />
        <div ref={showcaseRef}>
          <CatalogShowcase onViewCollection={handleViewCollection} />
        </div>
        <SectionTransition from="light" to="dark" variant="wave" />
        <CatalogStats />
        <SectionTransition from="dark" to="dark" variant="diagonal" />
        <CTASection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}

export default function CatalogPage() {
  return (
    <Suspense>
      <CatalogContent />
    </Suspense>
  );
}
