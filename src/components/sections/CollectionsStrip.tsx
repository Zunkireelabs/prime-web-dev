"use client";

import { useRef } from "react";
import FadeIn from "@/components/animations/FadeIn";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { collections } from "@/data/collections";

// Map to strip format with type/size for display
const stripCollections = collections.slice(0, 8).map((c) => ({
  name: c.name,
  slug: c.slug,
  type: c.category,
  size: c.sizes[0] || "",
  image: c.image,
}));

export default function CollectionsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (d: "l" | "r") =>
    ref.current?.scrollBy({ left: d === "r" ? 360 : -360, behavior: "smooth" });

  return (
    <section id="collections" className="bg-[var(--bg-dark)] pt-6 md:pt-10 pb-16 md:pb-24">
      <div className="container mb-10 flex items-end justify-between">
        <FadeIn>
          <p className="eyebrow text-[var(--accent-light)] mb-4 tracking-[0.35em]">Collections</p>
          <h2 className="h2 text-[var(--ink-on-dark)]">Our Collections</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("l")}
              className="w-10 h-10 border border-[var(--ink-on-dark)]/10 flex items-center justify-center text-[var(--ink-on-dark-light)] hover:border-[var(--accent)]/40 hover:text-[var(--accent-light)] transition-all duration-300"
              aria-label="Scroll left"
            >
              <ArrowLeft size={14} />
            </button>
            <button
              onClick={() => scroll("r")}
              className="w-10 h-10 border border-[var(--ink-on-dark)]/10 flex items-center justify-center text-[var(--ink-on-dark-light)] hover:border-[var(--accent)]/40 hover:text-[var(--accent-light)] transition-all duration-300"
              aria-label="Scroll right"
            >
              <ArrowRight size={14} />
            </button>
          </div>
        </FadeIn>
      </div>

      <div ref={ref} className="flex gap-4 pl-[var(--gutter)] overflow-x-auto no-scrollbar pb-2">
        {stripCollections.map((c, i) => (
          <FadeIn key={c.name} delay={i * 0.05} direction="left" distance={20}>
            <a href={`/catalog?collection=${encodeURIComponent(c.slug)}`} className="block shrink-0 w-[260px] md:w-[300px] group">
              {/* Image with number overlay */}
              <div className="aspect-[3/4] img-gs mb-4 relative overflow-hidden">
                <img src={c.image} alt={c.name} loading="lazy" className="w-full h-full object-cover" />
                {/* Editorial number */}
                <span className="absolute top-3 left-4 text-[0.55rem] font-medium tracking-[0.2em] text-white/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {/* Bottom gradient for readability */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Metadata */}
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="eyebrow text-[var(--ink-on-dark-muted)] mb-1.5 text-[0.5rem]">{c.type}</p>
                  <p className="text-sm font-serif text-[var(--ink-on-dark)] group-hover:text-[var(--accent-light)] transition-colors duration-300">
                    {c.name}
                  </p>
                </div>
                <p className="text-[0.55rem] text-[var(--ink-on-dark-muted)] tracking-wider">{c.size}</p>
              </div>
            </a>
          </FadeIn>
        ))}
      </div>

      {/* Collection count indicator */}
      <div className="container mt-8">
        <div className="flex items-center gap-3">
          <div className="h-[1px] flex-1 bg-[var(--ink-on-dark)]/6" />
          <span className="text-[0.55rem] tracking-[0.2em] text-[var(--ink-on-dark-muted)]">
            {stripCollections.length} COLLECTIONS
          </span>
          <div className="h-[1px] flex-1 bg-[var(--ink-on-dark)]/6" />
        </div>
      </div>
    </section>
  );
}
