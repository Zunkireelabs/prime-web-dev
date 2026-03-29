"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DealersHero from "@/components/sections/DealersHero";

const SectionTransition = dynamic(() => import("@/components/ui/SectionTransition"), { ssr: false });
const NepalMap = dynamic(() => import("@/components/sections/NepalMap"), { ssr: false });
const DealersGrid = dynamic(() => import("@/components/sections/DealersGrid"), { ssr: false });
const CTASection = dynamic(() => import("@/components/sections/CTASection"), { ssr: false });

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
