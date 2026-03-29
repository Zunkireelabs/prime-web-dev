"use client";

import { useState, useCallback, useRef } from "react";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SectionTransition from "@/components/ui/SectionTransition";
import CatalogHero from "@/components/sections/CatalogHero";
import CatalogShowcase from "@/components/sections/CatalogShowcase";
import CatalogStats from "@/components/sections/CatalogStats";
import CatalogGrid from "@/components/sections/CatalogGrid";
import CTASection from "@/components/sections/CTASection";

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
