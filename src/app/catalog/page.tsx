"use client";

import { Suspense, useState, useCallback, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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

/* Map URL ?collection= values to CatalogFilter tab values */
const collectionFilterMap: Record<string, string> = {
  "spirit-of-nepal": "spirit",
};

function CatalogContent() {
  const searchParams = useSearchParams();
  const collectionParam = searchParams.get("collection");
  const initialFilter = (collectionParam && collectionFilterMap[collectionParam]) || "all";

  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const gridRef = useRef<HTMLDivElement>(null);

  /* Scroll to grid when arriving with a collection filter */
  useEffect(() => {
    if (initialFilter !== "all") {
      setTimeout(() => {
        gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 600);
    }
  }, [initialFilter]);

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
        <CatalogHero />
        <SectionTransition from="dark" to="light" variant="diagonal" />
        <CatalogShowcase onViewCollection={handleViewCollection} />
        <CatalogStats />
        <div ref={gridRef}>
          <CatalogGrid initialSize={activeFilter} />
        </div>
        <CTASection />
        <SectionTransition from="light" to="dark" variant="wave" />
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
