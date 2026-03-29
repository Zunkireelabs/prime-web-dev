"use client";

import { useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CatalogHero from "@/components/sections/CatalogHero";

const SectionTransition = dynamic(() => import("@/components/ui/SectionTransition"), { ssr: false });
const CatalogShowcase = dynamic(() => import("@/components/sections/CatalogShowcase"), { ssr: false });
const CatalogStats = dynamic(() => import("@/components/sections/CatalogStats"), { ssr: false });
const CatalogGrid = dynamic(() => import("@/components/sections/CatalogGrid"), { ssr: false });
const CTASection = dynamic(() => import("@/components/sections/CTASection"), { ssr: false });

export default function CatalogPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const gridRef = useRef<HTMLDivElement>(null);

  const handleViewCollection = useCallback((filterValue: string) => {
    setActiveFilter(filterValue);
    setTimeout(() => {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, []);

  return (
    <SmoothScroll>
      <Header />
      <main id="main-content">
        {/* 1. Hero — dark, room scene, emotional hook */}
        <CatalogHero />

        {/* Dark → Light transition */}
        <SectionTransition from="dark" to="light" variant="diagonal" />

        {/* 2. Showcase — light bg, featured + grid cards */}
        <CatalogShowcase onViewCollection={handleViewCollection} />

        {/* 3. Stat strip — dark, thin, rhythm break */}
        <CatalogStats />

        {/* 4. Explorer — alt bg, filter + grid */}
        <div ref={gridRef}>
          <CatalogGrid initialSize={activeFilter} />
        </div>

        {/* 5. CTA — light bg */}
        <CTASection />

        {/* Light → Dark transition */}
        <SectionTransition from="light" to="dark" variant="wave" />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
