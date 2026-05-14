"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/animations/FadeIn";

const SpiritOfNepalShowcase = dynamic(() => import("@/components/sections/SpiritOfNepalShowcase"), { ssr: false });
const SectionTransition = dynamic(() => import("@/components/ui/SectionTransition"), { ssr: false });
const CTASection = dynamic(() => import("@/components/sections/CTASection"), { ssr: false });

export default function SpiritOfNepalPage() {
  return (
    <SmoothScroll>
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section
          className="relative bg-ink flex items-center justify-center"
          style={{
            minHeight: "clamp(340px, 50vh, 480px)",
            paddingTop: "clamp(100px, 12vw, 140px)",
            paddingBottom: "clamp(60px, 8vw, 100px)",
          }}
        >
          <div className="container text-center" style={{ position: "relative", zIndex: 1 }}>
            <FadeIn>
              <p
                className="text-[0.6rem] font-medium tracking-[0.25em] uppercase"
                style={{ color: "var(--color-accent)", marginBottom: "16px" }}
              >
                Heritage Collection
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1
                className="font-serif font-light"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  lineHeight: 1.1,
                  color: "#fff",
                  marginBottom: "20px",
                }}
              >
                Spirit of Nepal
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p
                className="text-sm font-light max-w-lg mx-auto"
                style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}
              >
                Heritage tiles inspired by Nepali culture — Palpali Dhaka weaving,
                sacred Thangka paintings, ancient Mithila folk art, and natural Flagstone.
              </p>
            </FadeIn>
          </div>
        </section>

        <SectionTransition from="dark" to="light" variant="diagonal" />
        <SpiritOfNepalShowcase />
        <SectionTransition from="light" to="dark" variant="diagonal" />
        <CTASection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
