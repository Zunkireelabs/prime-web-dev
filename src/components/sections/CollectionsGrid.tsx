"use client";

import FadeIn from "@/components/animations/FadeIn";
import { ArrowUpRight } from "lucide-react";
import { collections } from "@/data/collections";

/* Cards are rendered twice for seamless infinite loop */
const doubled = [...collections, ...collections];

export default function CollectionsGrid() {
  return (
    <section id="collections" className="bg-[var(--bg-alt)] overflow-hidden py-20 md:py-28 lg:py-32">
      <div className="container mb-12 md:mb-16">
        <div className="flex items-end justify-between">
          <div>
            <FadeIn>
              <p className="eyebrow text-[var(--accent)] mb-4">Collections</p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h2 className="h2 text-[var(--ink)]">Curated for Every Vision</h2>
            </FadeIn>
          </div>
          <FadeIn delay={0.15}>
            <a href="/catalog" className="link-arrow text-[0.65rem] hidden sm:flex">
              View All <ArrowUpRight size={12} />
            </a>
          </FadeIn>
        </div>
      </div>

      {/* Marquee strip — pauses on hover */}
      <div className="group/marquee mb-6">
        <div
          className="flex gap-6 md:gap-8 w-max group-hover/marquee:[animation-play-state:paused]"
          style={{
            animation: "collectionsMarquee 50s linear infinite",
          }}
        >
          {doubled.map((c, i) => (
            <a
              key={`${c.name}-${i}`}
              href={`/catalog?collection=${encodeURIComponent(c.slug)}`}
              className="group relative block w-[260px] md:w-[300px] lg:w-[320px] flex-shrink-0"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[var(--bg)] mb-4">
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 right-4 w-9 h-9 border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 bg-white/5 backdrop-blur-sm">
                  <ArrowUpRight size={14} className="text-white" />
                </div>
              </div>

              {/* Text */}
              <p className="text-[0.55rem] font-medium tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-1">
                {c.category}
              </p>
              <h3 className="font-serif font-light text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors duration-300 text-[1.05rem]">
                {c.name}
              </h3>
            </a>
          ))}
        </div>
      </div>

      {/* Mobile View All link */}
      <div className="container sm:hidden mt-8">
        <a href="/catalog" className="link-arrow text-[0.65rem]">
          View All Collections <ArrowUpRight size={12} />
        </a>
      </div>
    </section>
  );
}
