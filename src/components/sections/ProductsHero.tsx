"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { allProducts } from "@/data/catalog";
import { useMemo } from "react";

export default function ProductsHero() {
  const total = allProducts.length;
  const sizes = useMemo(() => [...new Set(allProducts.map((p) => p.size))].length, []);
  const finishes = useMemo(() => [...new Set(allProducts.map((p) => p.finish))].length, []);

  const featured = useMemo(() => {
    const imaged = allProducts.filter((p) => p.image && p.image.startsWith("http"));
    return imaged.slice(0, 3);
  }, []);

  return (
    <section
      className="bg-surface-dark relative overflow-hidden"
      style={{ paddingTop: "clamp(120px, 14vw, 180px)", paddingBottom: "clamp(80px, 10vw, 120px)" }}
    >
      {/* Decorative radial glow */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: "-100px",
          right: "20%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(181,138,82,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between" style={{ gap: "clamp(40px, 6vw, 80px)" }}>
          {/* Left — text */}
          <div style={{ maxWidth: "560px" }}>
            <FadeIn>
              <nav
                aria-label="Breadcrumb"
                className="flex items-center text-[0.6rem] font-medium tracking-[0.16em] uppercase text-ink-on-dark-muted"
                style={{ gap: "10px", marginBottom: "32px" }}
              >
                <Link href="/" className="hover:text-ink-on-dark" style={{ transition: "color 0.3s" }}>
                  Home
                </Link>
                <ChevronRight size={10} className="text-ink-on-dark-muted" aria-hidden="true" />
                <span className="text-ink-on-dark-light">Products</span>
              </nav>
            </FadeIn>

            <FadeIn delay={0.05}>
              <p className="eyebrow text-accent-light" style={{ marginBottom: "16px" }}>
                Full Catalogue
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1
                className="font-serif font-light text-ink-on-dark"
                style={{
                  fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.015em",
                  marginBottom: "24px",
                  maxWidth: "16ch",
                }}
              >
                Every Surface, Perfected
              </h1>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p
                className="text-ink-on-dark-light font-light"
                style={{
                  fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                  lineHeight: 1.7,
                  maxWidth: "440px",
                  marginBottom: "32px",
                }}
              >
                Explore {total} surfaces across {sizes} sizes, {finishes} finishes
                and multiple applications. Filter, compare, and find the right tile for your space.
              </p>
            </FadeIn>

            {/* Stats row */}
            <FadeIn delay={0.2}>
              <div className="flex items-center" style={{ gap: "clamp(24px, 3vw, 40px)" }}>
                <div>
                  <p
                    className="font-display font-light text-accent-light"
                    style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: 1, marginBottom: "4px" }}
                  >
                    {total}
                  </p>
                  <p className="text-[0.55rem] font-medium tracking-[0.16em] uppercase text-ink-on-dark-muted">
                    Products
                  </p>
                </div>
                <div style={{ width: "1px", height: "36px", background: "rgba(232,220,200,0.12)" }} />
                <div>
                  <p
                    className="font-display font-light text-accent-light"
                    style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: 1, marginBottom: "4px" }}
                  >
                    {sizes}
                  </p>
                  <p className="text-[0.55rem] font-medium tracking-[0.16em] uppercase text-ink-on-dark-muted">
                    Sizes
                  </p>
                </div>
                <div style={{ width: "1px", height: "36px", background: "rgba(232,220,200,0.12)" }} />
                <div>
                  <p
                    className="font-display font-light text-accent-light"
                    style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: 1, marginBottom: "4px" }}
                  >
                    {finishes}
                  </p>
                  <p className="text-[0.55rem] font-medium tracking-[0.16em] uppercase text-ink-on-dark-muted">
                    Finishes
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right — featured tile images (desktop) */}
          {featured.length >= 3 && (
            <FadeIn delay={0.15} direction="up" distance={24}>
              <div
                className="hidden lg:grid"
                style={{
                  gridTemplateColumns: "1fr 1fr",
                  gridTemplateRows: "1fr 1fr",
                  gap: "8px",
                  width: "clamp(340px, 32vw, 460px)",
                  aspectRatio: "1",
                }}
              >
                {/* Large tile — spans 2 rows on left */}
                <div
                  className="overflow-hidden"
                  style={{ gridRow: "1 / 3", borderRadius: "12px" }}
                >
                  <img
                    src={featured[0].image}
                    alt={featured[0].name}
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.95)" }}
                  />
                </div>
                {/* Top-right tile */}
                <div
                  className="overflow-hidden"
                  style={{ borderRadius: "12px" }}
                >
                  <img
                    src={featured[1].image}
                    alt={featured[1].name}
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.95)" }}
                  />
                </div>
                {/* Bottom-right tile */}
                <div
                  className="overflow-hidden"
                  style={{ borderRadius: "12px" }}
                >
                  <img
                    src={featured[2].image}
                    alt={featured[2].name}
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.95)" }}
                  />
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-accent/15" />
    </section>
  );
}
