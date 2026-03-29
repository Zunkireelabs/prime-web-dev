"use client";

import { useState } from "react";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SectionTransition from "@/components/ui/SectionTransition";
import DealersHero from "@/components/sections/DealersHero";
import NepalMap from "@/components/sections/NepalMap";
import DealersGrid from "@/components/sections/DealersGrid";
import CTASection from "@/components/sections/CTASection";

export default function DealersPage() {
  const [activeProvince, setActiveProvince] = useState("All");

  return (
    <SmoothScroll>
      <Header />
      <main id="main-content">
        <DealersHero />
        <NepalMap
          activeProvince={activeProvince}
          onProvinceSelect={setActiveProvince}
        />
        <SectionTransition from="light" to="light" variant="mosaic" />
        <DealersGrid
          activeProvince={activeProvince}
          onProvinceChange={setActiveProvince}
        />
        <CTASection />
        <SectionTransition from="light" to="dark" variant="wave" />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
