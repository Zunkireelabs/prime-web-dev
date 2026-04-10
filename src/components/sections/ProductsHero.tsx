"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { allProducts } from "@/data/catalog";

export default function ProductsHero() {
  const total = allProducts.length;

  return (
    <section
      className="bg-surface-alt"
      style={{ paddingTop: "clamp(120px, 14vw, 180px)", paddingBottom: "clamp(48px, 6vw, 72px)" }}
    >
      <div className="container">
        {/* Breadcrumb */}
        <FadeIn>
          <nav
            aria-label="Breadcrumb"
            className="flex items-center text-[0.65rem] font-medium tracking-[0.14em] uppercase text-ink-muted"
            style={{ gap: "10px", marginBottom: "32px" }}
          >
            <Link href="/" className="hover:text-ink transition-colors duration-300">
              Home
            </Link>
            <ChevronRight size={12} className="text-ink-faint" aria-hidden="true" />
            <span className="text-ink">Products</span>
          </nav>
        </FadeIn>

        {/* Eyebrow */}
        <FadeIn delay={0.05}>
          <p className="eyebrow text-accent" style={{ marginBottom: "16px" }}>
            Full Catalogue
          </p>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.1}>
          <h1 className="h1" style={{ marginBottom: "24px", maxWidth: "18ch" }}>
            Every Prime Tile, One Place
          </h1>
        </FadeIn>

        {/* Subcopy */}
        <FadeIn delay={0.15}>
          <p className="body-lg text-ink-light max-w-xl">
            Explore {total} surfaces across categories, collections, sizes and finishes. Filter,
            compare, and find the right tile for your space.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
