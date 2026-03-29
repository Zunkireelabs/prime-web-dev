"use client";

import FadeIn from "@/components/animations/FadeIn";
import { ArrowRight, Download } from "lucide-react";
import { catalogEntries } from "@/data/catalogs";
import type { CatalogEntry } from "@/data/types";

function CatalogCard({
  cat,
  index,
  large,
  onView,
}: {
  cat: CatalogEntry;
  index: number;
  large: boolean;
  onView?: (filterValue: string) => void;
}) {
  const isComingSoon = !cat.pdf;

  return (
    <FadeIn delay={index * 0.06} direction="up" distance={20}>
      <div className={`group h-full flex flex-col ${isComingSoon ? "opacity-70" : ""}`}>
        {/* Image */}
        <div className={`relative overflow-hidden mb-4 ${large ? "aspect-[16/9]" : "aspect-[4/3]"} ${isComingSoon ? "" : "img-gs"}`}>
          <img
            src={cat.image}
            alt={cat.name}
            className="w-full h-full object-cover"
            style={isComingSoon ? { filter: "grayscale(0.8) brightness(0.75)" } : undefined}
          />

          {/* Count badge — bottom left */}
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1.5 text-[0.5rem] font-medium tracking-[0.15em] uppercase bg-white/90 backdrop-blur-sm text-[var(--ink)]">
              {cat.count}
            </span>
          </div>

          {/* Coming soon badge — top right */}
          {isComingSoon && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1.5 text-[0.5rem] font-medium tracking-[0.15em] uppercase bg-[var(--accent)] text-white">
                Coming Soon
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col">
          <h3 className="h3 mb-1 group-hover:text-[var(--accent)] transition-colors duration-300">
            {cat.name}
          </h3>
          <p className="text-[0.55rem] font-medium tracking-[0.15em] uppercase text-[var(--ink-muted)] mb-3">
            {cat.types}
          </p>
          <p className="body-sm mb-6 flex-1">
            {cat.description}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-6">
            {!isComingSoon ? (
              <>
                <button
                  onClick={() => onView?.(cat.filterValue)}
                  className="link-arrow cursor-pointer"
                >
                  View Collection <ArrowRight size={12} />
                </button>
                <a
                  href={cat.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-arrow text-[var(--ink-muted)]"
                >
                  <Download size={12} />
                  PDF
                </a>
              </>
            ) : (
              <span className="text-[0.65rem] font-medium tracking-[0.12em] uppercase text-[var(--ink-muted)]">
                Catalog arriving soon
              </span>
            )}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

export default function CatalogShowcase({
  onViewCollection,
}: {
  onViewCollection?: (filterValue: string) => void;
}) {
  const featured = catalogEntries[0];
  const secondary = catalogEntries[1];
  const rest = catalogEntries.slice(2);

  return (
    <section id="catalog-showcase" className="bg-[var(--bg)] section-pad">
      <div className="container">
        {/* Section header */}
        <div className="mb-10 md:mb-14">
          <FadeIn>
            <p className="eyebrow text-[var(--accent)] mb-4">Our Catalogs</p>
          </FadeIn>
          <FadeIn delay={0.06}>
            <h2 className="h2 mb-6">Browse by Collection</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="body-lg max-w-lg">
              Five curated catalogs with room scenes, technical specifications,
              and design inspiration for every surface.
            </p>
          </FadeIn>
        </div>

        {/* Row 1: Featured (2-col span) + Secondary (1-col) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          <div className="md:col-span-2">
            <CatalogCard cat={featured} index={0} large onView={onViewCollection} />
          </div>
          <div>
            <CatalogCard cat={secondary} index={1} large={false} onView={onViewCollection} />
          </div>
        </div>

        {/* Row 2: Remaining 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {rest.map((cat, i) => (
            <CatalogCard key={cat.name} cat={cat} index={i + 2} large={false} onView={onViewCollection} />
          ))}
        </div>
      </div>
    </section>
  );
}
