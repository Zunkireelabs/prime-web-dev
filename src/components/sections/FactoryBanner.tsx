"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import FadeIn from "@/components/animations/FadeIn";
import { ArrowRight } from "lucide-react";

export default function FactoryBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const rafId = useRef<number>(0);

  const [scale, setScale] = useState(1);

  const handleScroll = useCallback(() => {
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      if (rect.bottom > 0 && rect.top < viewH) {
        const progress = (viewH - rect.top) / (viewH + rect.height);
        setOffset((progress - 0.5) * 60);
        setScale(1 + progress * 0.1);
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
      className="relative h-[60vh] md:h-[70vh] lg:h-[75vh] min-h-[450px] max-h-[700px] overflow-hidden"
    >
      {/* Parallax image */}
      <img
        src="/images/factory.jpg"
        alt="Prime Tiles Factory — Rautahat, Nepal"
        loading="lazy"
        className="absolute inset-0 w-full h-[125%] object-cover will-change-transform"
        style={{ transform: `translateY(${offset}px) scale(${scale})` }}
      />

      {/* Gradient overlays — cinematic depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(139,101,66,0.1)_0%,transparent_60%)]" />

      {/* Content */}
      <div className="container relative z-10 h-full flex flex-col justify-center">
        <FadeIn>
          <div className="flex items-center gap-4" style={{ marginBottom: "16px" }}>
            <div className="w-10 h-[1px] bg-accent-light/50" />
            <p className="eyebrow text-accent-light">
              Our Manufacturing Plant
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2
            className="font-serif font-light text-white leading-[1] tracking-[-0.01em] max-w-2xl"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", marginBottom: "24px" }}
          >
            Nepal&apos;s No.1<br />
            <span className="text-white/75">Tile Manufacturing Facility</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="w-14 h-[1.5px] bg-accent/60" style={{ marginBottom: "24px" }} />
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="body-lg text-white/80 max-w-lg" style={{ marginBottom: "40px" }}>
            Spread across 50 bigha in Rautahat, our state-of-the-art facility is
            powered by Italian SACMI technology — producing premium ceramic, vitrified,
            and porcelain tiles that meet international quality standards.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <a
            href="#craft"
            className="link-arrow text-white/75 hover:text-accent-light"
          >
            Learn About Our Process <ArrowRight size={12} />
          </a>
        </FadeIn>
      </div>

      {/* Bottom gradient blend into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent" />
    </section>
  );
}
