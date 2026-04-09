"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DealersHero from "@/components/sections/DealersHero";

const SectionTransition = dynamic(() => import("@/components/ui/SectionTransition"), { ssr: false });
const DealersExplorer = dynamic(() => import("@/components/sections/DealersExplorer"), { ssr: false });
const CTASection = dynamic(() => import("@/components/sections/CTASection"), { ssr: false });

export default function DealersPage() {
  const [activeProvince, setActiveProvince] = useState("All");

  return (
    <SmoothScroll>
      <Header />
      <main id="main-content">
        <DealersHero />
        <SectionTransition from="dark" to="light" variant="diagonal" />
        <DealersExplorer
          activeProvince={activeProvince}
          onProvinceChange={setActiveProvince}
        />
        <SectionTransition from="light" to="dark" variant="diagonal" />
        <CTASection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
