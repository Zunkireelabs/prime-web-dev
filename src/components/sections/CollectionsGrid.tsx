"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadeIn from "@/components/animations/FadeIn";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TiltCard from "@/components/ui/TiltCard";
import { ArrowUpRight, ArrowRight, ArrowLeft } from "lucide-react";
import { collections } from "@/data/collections";

gsap.registerPlugin(ScrollTrigger);

// Extract unique categories
const ALL = "All";
const categories = [
  ALL,
  ...Array.from(new Set(collections.map((c) => c.category))),
];

export default function CollectionsGrid() {
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeCategory === ALL
      ? collections
      : collections.filter((c) => c.category === activeCategory);

  // Animate cards on category change
  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll(".tile-card");
    gsap.fromTo(
      cards,
      { y: 30, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.05,
        duration: 0.5,
        ease: "none",
        overwrite: true,
      }
    );
  }, [activeCategory]);

  // Scroll strip with buttons
  const scroll = useCallback((dir: "left" | "right") => {
    if (!stripRef.current) return;
    const amount = stripRef.current.clientWidth * 0.6;
    stripRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }, []);

  return (
    <section
      id="collections"
      className="bg-surface-alt relative overflow-hidden"
      style={{ padding: "clamp(64px, 8vw, 112px) 0" }}
    >
      <div className="container">
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between" style={{ gap: "24px", marginBottom: "48px" }}>
          <div>
            <ScrollReveal
              from={{ y: 20, opacity: 0 }}
              to={{ y: 0, opacity: 1 }}
              start="top 90%"
              end="top 65%"
            >
              <div className="flex items-center" style={{ gap: "16px", marginBottom: "16px" }}>
                <div className="w-10 h-px bg-accent" />
                <p className="eyebrow text-accent">Collections</p>
              </div>
            </ScrollReveal>
            <ScrollReveal
              from={{ y: 25, opacity: 0 }}
              to={{ y: 0, opacity: 1 }}
              start="top 88%"
              end="top 62%"
            >
              <h2 className="h2 text-ink" style={{ marginBottom: "16px" }}>Curated for Every Vision</h2>
              <p className="body-sm text-ink-light max-w-md">
                Explore our premium collections — crafted for spaces that demand
                distinction.
              </p>
            </ScrollReveal>
          </div>

          {/* Nav arrows + View All */}
          <FadeIn delay={0.2}>
            <div className="flex items-center" style={{ gap: "16px" }}>
              <button
                onClick={() => scroll("left")}
                className="w-10 h-10 border border-ink-faint flex items-center justify-center hover:border-accent hover:text-accent transition-colors duration-300 cursor-pointer"
                aria-label="Scroll left"
              >
                <ArrowLeft size={14} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-10 h-10 border border-ink-faint flex items-center justify-center hover:border-accent hover:text-accent transition-colors duration-300 cursor-pointer"
                aria-label="Scroll right"
              >
                <ArrowRight size={14} />
              </button>
              <div className="w-px h-6 bg-ink-faint" style={{ marginLeft: "4px", marginRight: "4px" }} />
              <a
                href="/catalog"
                className="link-arrow text-[0.65rem]"
              >
                View All <ArrowUpRight size={12} />
              </a>
            </div>
          </FadeIn>
        </div>

        {/* ── Divider ── */}
        <FadeIn delay={0.12}>
          <div className="h-[1px] bg-ink-faint" style={{ marginBottom: "clamp(40px, 5vw, 48px)" }} />
        </FadeIn>

        {/* ── Category Tabs ── */}
        <FadeIn delay={0.15}>
          <div className="flex items-center overflow-x-auto no-scrollbar" style={{ gap: "clamp(8px, 1.5vw, 12px)", marginBottom: "clamp(48px, 6vw, 64px)", paddingBottom: "8px" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{ padding: "10px 28px" }}
                className={`text-[0.58rem] md:text-[0.62rem] font-medium tracking-[0.18em] uppercase whitespace-nowrap transition-all duration-300 cursor-pointer border rounded-full ${
                  activeCategory === cat
                    ? "bg-accent text-white border-accent shadow-[0_2px_12px_rgba(181,138,82,0.25)]"
                    : "bg-transparent text-ink-muted border-ink-faint hover:border-accent/40 hover:text-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* ── Horizontal Scroll Strip ── */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-surface-alt to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-surface-alt to-transparent z-10 pointer-events-none" />

          <div
            ref={stripRef}
            className="flex overflow-x-auto no-scrollbar scroll-smooth"
            style={{ scrollSnapType: "x mandatory", gap: "20px", padding: "8px" }}
          >
            <div ref={cardsRef} className="flex" style={{ gap: "20px" }}>
              {filtered.map((c, i) => (
                <div
                  key={c.slug}
                  className="tile-card flex-shrink-0"
                  style={{
                    width: "clamp(200px, 22vw, 280px)",
                    scrollSnapAlign: "start",
                  }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <TiltCard intensity={6} className="h-full">
                    <a
                      href={`/catalog?collection=${encodeURIComponent(c.slug)}`}
                      className="group block h-full"
                    >
                      {/* Image */}
                      <div className="relative aspect-[3/4] overflow-hidden bg-surface" style={{ marginBottom: "16px" }}>
                        <img
                          src={c.image}
                          alt={c.name}
                          loading="lazy"
                          className={`w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            hoveredIdx === i
                              ? "scale-[1.06]"
                              : hoveredIdx !== null
                                ? "scale-[0.98] brightness-[0.85]"
                                : ""
                          }`}
                        />

                        {/* Dark gradient — always visible at bottom */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Category tag */}
                        <div className="absolute bg-white/90 backdrop-blur-sm" style={{ top: "12px", left: "12px", padding: "4px 10px" }}>
                          <p className="text-[0.45rem] font-semibold tracking-[0.2em] uppercase text-ink">
                            {c.category}
                          </p>
                        </div>

                        {/* Hover info — slides up */}
                        <div className="absolute bottom-0 left-0 right-0 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500" style={{ padding: "16px" }}>
                          <p className="font-serif font-light text-white text-lg leading-tight" style={{ marginBottom: "4px" }}>
                            {c.name}
                          </p>
                          <p className="text-[0.5rem] font-medium tracking-[0.15em] uppercase text-white/60">
                            {c.sizes[0]}
                          </p>
                        </div>

                        {/* Arrow */}
                        <div className="absolute w-8 h-8 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500 bg-white/5 backdrop-blur-sm" style={{ top: "12px", right: "12px" }}>
                          <ArrowUpRight size={12} className="text-white" />
                        </div>

                        {/* Gold accent line at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      </div>

                      {/* Text below (visible when not hovered) */}
                      <div className="group-hover:opacity-0 transition-opacity duration-300">
                        <h3 className="font-serif font-light text-ink text-[0.95rem] truncate" style={{ marginBottom: "4px" }}>
                          {c.name}
                        </h3>
                        <p className="text-[0.5rem] font-medium tracking-[0.15em] uppercase text-ink-muted">
                          {c.sizes[0]}
                        </p>
                      </div>
                    </a>
                  </TiltCard>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Collection Count ── */}
        <div className="flex items-center justify-between" style={{ marginTop: "clamp(32px, 4vw, 40px)" }}>
          <p className="text-[0.55rem] font-medium tracking-[0.2em] uppercase text-ink-muted">
            {filtered.length} {filtered.length === 1 ? "Collection" : "Collections"}
            {activeCategory !== ALL && (
              <span className="text-accent" style={{ marginLeft: "8px" }}>in {activeCategory}</span>
            )}
          </p>

          {/* Mobile View All */}
          <a
            href="/catalog"
            className="link-arrow text-[0.6rem] sm:hidden"
          >
            View All <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </section>
  );
}
