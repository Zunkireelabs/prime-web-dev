"use client";

import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SectionTransition from "@/components/ui/SectionTransition";
import CollectionsGrid from "@/components/sections/CollectionsGrid";
import CTASection from "@/components/sections/CTASection";

export default function ServicesPage() {
  return (
    <SmoothScroll>
      <Header />
      <main id="main-content" className="pt-24">
        <CollectionsGrid />
        <CTASection />
        <SectionTransition from="light" to="dark" variant="wave" />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
