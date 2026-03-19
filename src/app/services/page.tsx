"use client";

import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServicesSection from "@/components/sections/ServicesSection";

export default function ServicesPage() {
  return (
    <SmoothScroll>
      <Header />
      <main className="grain-overlay pt-20">
        <ServicesSection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
