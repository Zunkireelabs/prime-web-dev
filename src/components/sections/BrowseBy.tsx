"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadeIn from "@/components/animations/FadeIn";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { catalogEntries } from "@/data/catalogs";

gsap.registerPlugin(ScrollTrigger);

// Curated trio: everyday walls → premium statement → heritage
const featuredSlugs = ["300x450", "600x1200", "spirit-of-nepal"];
const featured = featuredSlugs
  .map((slug) => catalogEntries.find((c) => c.slug === slug))
  .filter((c): c is NonNullable<typeof c> => Boolean(c));

export default function BrowseBy() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const grid = gridRef.current;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>("[data-card]"));
    if (cards.length === 0) return;

    // Pre-set initial states
    cards.forEach((card) => {
      const cover = card.querySelector<HTMLElement>("[data-cover]");
      const img = card.querySelector<HTMLElement>("[data-cover-img]");
      const meta = Array.from(card.querySelectorAll<HTMLElement>("[data-meta]"));

      gsap.set(card, { y: 80, opacity: 0, scale: 0.94 });
      if (cover) gsap.set(cover, { clipPath: "inset(100% 0% 0% 0%)" });
      if (img) gsap.set(img, { scale: 1.18 });
      if (meta.length) gsap.set(meta, { y: 24, opacity: 0 });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: grid,
        start: "top 78%",
        toggleActions: "play none none none",
      },
    });

    cards.forEach((card, idx) => {
      const cover = card.querySelector<HTMLElement>("[data-cover]");
      const img = card.querySelector<HTMLElement>("[data-cover-img]");
      const meta = Array.from(card.querySelectorAll<HTMLElement>("[data-meta]"));
      const offset = idx * 0.18;

      tl.to(
        card,
        { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" },
        offset
      );
      if (cover) {
        tl.to(
          cover,
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power4.out" },
          offset + 0.1
        );
      }
      if (img) {
        tl.to(
          img,
          { scale: 1, duration: 1.4, ease: "power3.out" },
          offset + 0.1
        );
      }
      if (meta.length) {
        tl.to(
          meta,
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.08 },
          offset + 0.45
        );
      }
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section className="bg-surface" style={{ padding: "clamp(64px, 8vw, 112px) 0" }}>
      <div className="container">
        {/* ── Header ── */}
        <div style={{ marginBottom: "clamp(48px, 6vw, 64px)" }}>
          <FadeIn>
            <div className="flex items-center" style={{ gap: "16px", marginBottom: "16px" }}>
              <div className="w-10 h-px bg-accent" />
              <p className="eyebrow text-accent">Our Catalogues</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.06}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between" style={{ gap: "24px" }}>
              <div>
                <h2 className="h2" style={{ marginBottom: "16px" }}>Explore Our Catalogue</h2>
                <p className="body-sm text-ink-light max-w-md">
                  A curated preview from six complete catalogues — covering everyday
                  walls, large-format statements, and our heritage Spirit of Nepal collection.
                </p>
              </div>
              <a
                href="/catalog"
                className="link-arrow text-[0.65rem] hidden md:inline-flex shrink-0"
              >
                Browse All 6 Catalogues <ArrowUpRight size={12} />
              </a>
            </div>
          </FadeIn>
        </div>

        {/* ── Curated 3-card grid ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "clamp(24px, 3vw, 40px)" }}
        >
          {featured.map((cat) => {
            const isComingSoon = !cat.pdf;
            return (
              <a
                key={cat.slug}
                data-card
                href={isComingSoon ? undefined : `/catalog/view/${cat.slug}`}
                className={`group block will-change-transform ${isComingSoon ? "pointer-events-none opacity-70" : ""}`}
              >
                {/* Cover — clip-path revealed */}
                <div
                  data-cover
                  className="relative overflow-hidden bg-surface-alt transition-shadow duration-500 group-hover:shadow-[0_24px_60px_-20px_rgba(43,36,28,0.28)]"
                  style={{ aspectRatio: "4 / 5", borderRadius: "4px" }}
                >
                  <img
                    data-cover-img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-contain transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    style={isComingSoon ? { filter: "grayscale(0.8) brightness(0.8)" } : undefined}
                  />

                  {/* Soft hover gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Top-left expanding gold corner */}
                  <div
                    className="absolute top-0 left-0 w-0 h-0 transition-all duration-500 group-hover:w-10 group-hover:h-10"
                    style={{ background: "linear-gradient(135deg, var(--color-accent) 50%, transparent 50%)" }}
                  />

                  {/* Count badge — bottom-left */}
                  <div className="absolute" style={{ bottom: "14px", left: "14px" }}>
                    <span
                      className="text-[0.55rem] font-semibold tracking-[0.18em] uppercase bg-white/95 backdrop-blur-sm text-ink shadow-sm"
                      style={{ padding: "7px 14px", display: "inline-block", borderRadius: "2px" }}
                    >
                      {cat.count}
                    </span>
                  </div>

                  {/* Coming soon badge */}
                  {isComingSoon && (
                    <div className="absolute" style={{ top: "14px", right: "14px" }}>
                      <span
                        className="text-[0.5rem] font-medium tracking-[0.18em] uppercase bg-accent text-white"
                        style={{ padding: "6px 12px", display: "inline-block", borderRadius: "2px" }}
                      >
                        Coming Soon
                      </span>
                    </div>
                  )}

                  {/* Reveal arrow — top-right */}
                  <div
                    className="absolute w-9 h-9 border border-white/30 backdrop-blur-sm bg-white/10 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500"
                    style={{ top: "14px", right: "14px" }}
                  >
                    <ArrowUpRight size={13} className="text-white" />
                  </div>

                  {/* Accent bottom line */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>

                {/* Meta */}
                <div style={{ marginTop: "20px" }}>
                  <h3
                    data-meta
                    className="font-serif font-light text-ink group-hover:text-accent transition-colors duration-300"
                    style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.35rem)", lineHeight: 1.25, marginBottom: "8px" }}
                  >
                    {cat.name}
                  </h3>
                  <p
                    data-meta
                    className="text-[0.55rem] font-medium tracking-[0.18em] uppercase text-ink-muted"
                    style={{ marginBottom: "16px" }}
                  >
                    {cat.types}
                  </p>
                  <span
                    data-meta
                    className="inline-flex items-center text-[0.65rem] font-medium tracking-[0.12em] uppercase text-ink group-hover:text-accent transition-colors duration-300"
                    style={{ gap: "8px" }}
                  >
                    View Catalogue
                    <ArrowRight
                      size={12}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* ── Footer ── */}
        <FadeIn delay={0.4}>
          <div className="flex items-center justify-between md:justify-center" style={{ marginTop: "clamp(64px, 8vw, 88px)", gap: "24px" }}>
            <div className="h-[1px] flex-1 bg-ink-faint hidden md:block" style={{ maxWidth: "120px" }} />
            <a href="/catalog" className="link-arrow text-[0.65rem]">
              Browse All 6 Catalogues <ArrowUpRight size={12} />
            </a>
            <div className="h-[1px] flex-1 bg-ink-faint hidden md:block" style={{ maxWidth: "120px" }} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
