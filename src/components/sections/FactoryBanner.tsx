"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import FadeIn from "@/components/animations/FadeIn";
import { ArrowRight } from "lucide-react";

export default function FactoryBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const rafId = useRef<number>(0);

  // Parallax
  const handleScroll = useCallback(() => {
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      if (rect.bottom > 0 && rect.top < viewH) {
        const progress = (viewH - rect.top) / (viewH + rect.height);
        setOffset((progress - 0.5) * 50);
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [handleScroll]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[70vh] md:h-[80vh] lg:h-[85vh] min-h-[500px] max-h-[800px] overflow-hidden"
    >
      {/* Parallax image */}
      <img
        src="/images/factory.jpg"
        alt="Prime Tiles Factory — Rautahat, Nepal"
        loading="lazy"
        className="absolute inset-0 w-full h-[120%] object-cover will-change-transform"
        style={{ transform: `translateY(${offset}px)` }}
      />

      {/* Gradient overlays — cinematic depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(139,101,66,0.08)_0%,transparent_60%)]" />

      {/* Content */}
      <div className="container relative z-10 h-full flex flex-col justify-end pb-12 md:pb-16 lg:pb-20">
        {/* Eyebrow */}
        <FadeIn>
          <p className="eyebrow text-[var(--accent-light)] mb-4">
            Our Manufacturing Plant
          </p>
        </FadeIn>

        {/* Headline */}
        <FadeIn delay={0.1}>
          <h2
            className="font-serif font-light text-white leading-[1] tracking-[-0.01em] mb-4 max-w-2xl"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            Nepal&apos;s No.1<br />
            <span className="text-white/60">Tile Manufacturing Facility</span>
          </h2>
        </FadeIn>

        {/* Description */}
        <FadeIn delay={0.2}>
          <p className="text-sm md:text-[0.95rem] text-white/45 max-w-lg mb-8 leading-relaxed">
            Spread across 50 bigha in Rautahat, our state-of-the-art facility is
            powered by Italian SACMI technology — producing premium ceramic, vitrified,
            and porcelain tiles that meet international quality standards.
          </p>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={0.3}>
          <a
            href="#craft"
            className="link-arrow text-white/70 hover:text-white mb-10 md:mb-12"
          >
            Learn About Our Process <ArrowRight size={12} />
          </a>
        </FadeIn>

      </div>
    </section>
  );
}
