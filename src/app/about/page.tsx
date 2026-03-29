"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutCinematic from "@/components/sections/AboutCinematic";

const SectionTransition = dynamic(() => import("@/components/ui/SectionTransition"), { ssr: false });

export default function AboutPage() {
  return (
    <SmoothScroll>
      <Header />

      <main id="main-content">
        <AboutCinematic />

        {/* ─── Transition: Alt → Dark (footer) ─── */}
        <SectionTransition from="light" to="dark" variant="wave" />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
