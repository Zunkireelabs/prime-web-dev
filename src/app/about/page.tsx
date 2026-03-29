"use client";

import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SectionTransition from "@/components/ui/SectionTransition";
import AboutCinematic from "@/components/sections/AboutCinematic";

export default function AboutPage() {
  return (
    <SmoothScroll>
      <Header />

      <main id="main-content">
        <AboutCinematic />

        {/* ─── Transition: Light → Dark (footer) ─── */}
        <SectionTransition from="light" to="dark" variant="wave" />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
