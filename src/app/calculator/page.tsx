"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CalculatorHero from "@/components/sections/CalculatorHero";

const SectionTransition = dynamic(() => import("@/components/ui/SectionTransition"), { ssr: false });
const CalculatorForm = dynamic(() => import("@/components/sections/CalculatorForm"), { ssr: false });
const CTASection = dynamic(() => import("@/components/sections/CTASection"), { ssr: false });

export default function CalculatorPage() {
  return (
    <SmoothScroll>
      <Header />
      <main id="main-content">
        <CalculatorHero />
        <CalculatorForm />
        <SectionTransition from="light-alt" to="dark" variant="mosaic" />
        <CTASection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
