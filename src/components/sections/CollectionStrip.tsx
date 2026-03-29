"use client";

import { useRef } from "react";
import FadeIn from "@/components/animations/FadeIn";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { categoryStrips as tiles } from "@/data/collections";

export default function CollectionStrip() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "right" ? 400 : -400,
      behavior: "smooth",
    });
  };

  return (
    <section className="surface-dark py-20 md:py-28 overflow-hidden">
      <div className="container mb-10">
        <div className="flex items-end justify-between">
          <FadeIn>
            <p className="eyebrow text-[var(--accent-light)] mb-4">
              Browse by Type
            </p>
            <h2 className="h3 text-[var(--ink-on-dark)]">Surface Categories</h2>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="w-11 h-11 border border-[var(--ink-on-dark)]/15 flex items-center justify-center text-[var(--ink-on-dark-secondary)] hover:text-[var(--ink-on-dark)] hover:border-[var(--ink-on-dark)]/40 transition-all duration-300"
                aria-label="Scroll left"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-11 h-11 border border-[var(--ink-on-dark)]/15 flex items-center justify-center text-[var(--ink-on-dark-secondary)] hover:text-[var(--ink-on-dark)] hover:border-[var(--ink-on-dark)]/40 transition-all duration-300"
                aria-label="Scroll right"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scrollRef}
        className="flex gap-5 pl-[var(--gutter)] pr-[var(--gutter)] overflow-x-auto scrollbar-none"
        style={{ scrollbarWidth: "none" }}
      >
        {tiles.map((tile, i) => (
          <FadeIn key={tile.name} delay={i * 0.06} direction="left" distance={30}>
            <div
              className="shrink-0 w-[240px] sm:w-[280px] md:w-[320px] group cursor-pointer"
              data-hover
            >
              <div className="aspect-[3/4] overflow-hidden mb-4 relative">
                <img
                  src={tile.image}
                  alt={tile.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                />
                {/* Hover vignette */}
                <div className="absolute inset-0 bg-[var(--surface-dark)]/0 group-hover:bg-[var(--surface-dark)]/20 transition-colors duration-500" />
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-base font-serif text-[var(--ink-on-dark)] group-hover:text-[var(--accent-light)] transition-colors duration-300">
                  {tile.name}
                </h3>
                <span className="text-xs text-[var(--ink-on-dark-muted)]">
                  {tile.count}
                </span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
