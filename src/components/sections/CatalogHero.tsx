"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import FadeIn from "@/components/animations/FadeIn";
import { ArrowRight } from "lucide-react";

export default function CatalogHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const rafId = useRef(0);

  const handleScroll = useCallback(() => {
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      if (rect.bottom > 0 && rect.top < viewH) {
        setOffset(((viewH - rect.top) / (viewH + rect.height) - 0.5) * 40);
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => { window.removeEventListener("scroll", handleScroll); cancelAnimationFrame(rafId.current); };
  }, [handleScroll]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--bg-dark)]"
      style={{ minHeight: "55vh", maxHeight: "75vh", height: "65vh" }}
    >
      {/* Room scene — parallax */}
      <img
        src="/images/spaces/living-room.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-[115%] object-cover will-change-transform"
        style={{ transform: `translateY(${offset}px)`, filter: "brightness(0.55)" }}
      />

      {/* Gradient overlays for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

      {/* Content — left-aligned, bottom-weighted */}
      <div className="container relative z-10 h-full flex flex-col justify-end pb-14 md:pb-18 lg:pb-22">
        <FadeIn>
          <p className="eyebrow text-[var(--accent-light)] mb-4">Product Catalogs</p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h1 className="h1 text-white mb-5 max-w-2xl">
            The Complete Prime Collection
          </h1>
        </FadeIn>

        <FadeIn delay={0.14}>
          <p className="body-lg text-white/65 max-w-lg mb-8 leading-relaxed">
            Five catalogs, 395+ designs. Browse our complete range of ceramic,
            vitrified, and large format tiles — including the exclusive Spirit of Nepal
            heritage collection.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex items-center gap-6">
            <a href="#catalog-showcase" className="link-arrow text-white/80 hover:text-white">
              Browse Catalogs <ArrowRight size={12} />
            </a>
            <div className="h-4 w-px bg-white/20" />
            <span className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-white/35">
              5 Catalogs · 395+ Designs
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
