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
      className="relative overflow-hidden bg-surface-dark"
      style={{ minHeight: "60vh", maxHeight: "80vh", height: "70vh" }}
    >
      {/* Room scene — parallax, full coverage */}
      <img
        src="/images/spaces/living-room.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-[120%] object-cover will-change-transform"
        style={{
          transform: `translateY(${offset}px)`,
          filter: "brightness(0.65)",
          objectPosition: "center 40%",
        }}
      />

      {/* Gradient overlays — strong enough for text readability */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.35) 100%)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)" }}
      />

      {/* Subtle warm accent glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 20% 80%, rgba(181,138,82,0.08) 0%, transparent 60%)" }}
      />

      {/* Content — left-aligned, bottom-weighted */}
      <div className="container relative z-10 h-full flex flex-col justify-end" style={{ paddingBottom: "clamp(80px, 8vw, 120px)" }}>
        <FadeIn>
          <div className="flex items-center" style={{ gap: "16px", marginBottom: "16px" }}>
            <div className="w-10 h-px bg-accent-light/50" />
            <p className="eyebrow text-accent-light">Product Catalogs</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h1 className="h1 text-white max-w-2xl" style={{ marginBottom: "24px" }}>
            The Complete Prime Collection
          </h1>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="w-12 h-[1.5px] bg-accent/60" style={{ marginBottom: "24px" }} />
        </FadeIn>

        <FadeIn delay={0.16}>
          <p className="body-lg text-white/90 max-w-lg leading-relaxed" style={{ marginBottom: "40px" }}>
            Five catalogs, 395+ designs. Browse our complete range of ceramic,
            vitrified, and large format tiles — including the exclusive Spirit of Nepal
            heritage collection.
          </p>
        </FadeIn>

        <FadeIn delay={0.22}>
          <div className="flex items-center" style={{ gap: "24px" }}>
            <a href="#catalog-showcase" className="btn-gold group">
              Browse Catalogs
              <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <div style={{ height: "16px", width: "1px", background: "rgba(255,255,255,0.25)" }} />
            <span className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-white/60">
              5 Catalogs · 395+ Designs
            </span>
          </div>
        </FadeIn>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
    </section>
  );
}
