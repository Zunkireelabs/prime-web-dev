"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const TestimonialsPage = dynamic(() => import("@/components/sections/TestimonialsPage"), { ssr: false });
const CTASection = dynamic(() => import("@/components/sections/CTASection"), { ssr: false });
const SectionTransition = dynamic(() => import("@/components/ui/SectionTransition"), { ssr: false });

export default function Testimonials() {
  return (
    <SmoothScroll>
      <Header />
      <main id="main-content">
        <TestimonialsPage />
        <SectionTransition from="light" to="dark" variant="diagonal" />
        <CTASection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
