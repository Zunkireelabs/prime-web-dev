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
        <div
          className={`relative overflow-hidden ${large ? "aspect-[16/9]" : "aspect-[4/3]"} ${isComingSoon ? "" : "img-gs"}`}
          style={{ marginBottom: "20px" }}
        >
          <img
            src={cat.image}
            alt={cat.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={isComingSoon ? { filter: "grayscale(0.8) brightness(0.75)" } : undefined}
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Count badge — bottom left */}
          <div style={{ position: "absolute", bottom: "16px", left: "16px" }}>
            <span
              className="text-[0.5rem] font-medium tracking-[0.15em] uppercase bg-white/90 backdrop-blur-sm text-ink"
              style={{ padding: "6px 12px", display: "inline-block" }}
            >
              {cat.count}
            </span>
          </div>

          {/* Coming soon badge — top right */}
          {isComingSoon && (
            <div style={{ position: "absolute", top: "16px", right: "16px" }}>
              <span
                className="text-[0.5rem] font-medium tracking-[0.15em] uppercase bg-accent text-white"
                style={{ padding: "6px 12px", display: "inline-block" }}
              >
                Coming Soon
              </span>
            </div>
          )}

          {/* Gold accent line at bottom on hover */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col">
          <h3
            className="h3 group-hover:text-accent transition-colors duration-300"
            style={{ marginBottom: "6px" }}
          >
            {cat.name}
          </h3>
          <p
            className="text-[0.55rem] font-medium tracking-[0.15em] uppercase text-ink-muted"
            style={{ marginBottom: "16px" }}
          >
            {cat.types}
          </p>
          <p className="body-sm text-ink-light flex-1" style={{ marginBottom: "24px" }}>
            {cat.description}
          </p>

          {/* Buttons */}
          <div className="flex items-center" style={{ gap: "24px" }}>
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
                  className="link-arrow text-ink-muted"
                >
                  <Download size={12} />
                  PDF
                </a>
              </>
            ) : (
              <span className="text-[0.65rem] font-medium tracking-[0.12em] uppercase text-ink-muted">
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
    <section id="catalog-showcase" className="bg-surface" style={{ padding: "clamp(100px, 12vw, 180px) 0" }}>
      <div className="container">
        {/* Section header */}
        <div style={{ marginBottom: "clamp(48px, 6vw, 64px)" }}>
          <FadeIn>
            <div className="flex items-center" style={{ gap: "16px", marginBottom: "16px" }}>
              <div className="w-10 h-px bg-accent" />
              <p className="eyebrow text-accent">Our Catalogs</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.06}>
            <h2 className="h2" style={{ marginBottom: "24px" }}>Browse by Collection</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="body-lg text-ink-light max-w-lg">
              Five curated catalogs with room scenes, technical specifications,
              and design inspiration for every surface.
            </p>
          </FadeIn>
        </div>

        {/* Row 1: Featured (2-col span) + Secondary (1-col) */}
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "clamp(24px, 3vw, 32px)", marginBottom: "clamp(24px, 3vw, 32px)" }}>
          <div className="md:col-span-2">
            <CatalogCard cat={featured} index={0} large onView={onViewCollection} />
          </div>
          <div>
            <CatalogCard cat={secondary} index={1} large={false} onView={onViewCollection} />
          </div>
        </div>

        {/* Row 2: Remaining 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "clamp(24px, 3vw, 32px)" }}>
          {rest.map((cat, i) => (
            <CatalogCard key={cat.name} cat={cat} index={i + 2} large={false} onView={onViewCollection} />
          ))}
        </div>
      </div>
    </section>
  );
}
