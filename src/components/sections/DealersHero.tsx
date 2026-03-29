"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import FadeIn from "@/components/animations/FadeIn";
import CountUp from "@/components/animations/CountUp";
import { ArrowRight } from "lucide-react";
import { dealers } from "@/data/dealers";
import { nepalProvinces } from "@/data/nepal-map";

export default function DealersHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const rafId = useRef<number>(0);

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
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [handleScroll]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--bg-dark)]"
      style={{ minHeight: "50vh", maxHeight: "70vh", height: "60vh" }}
    >
      {/* Parallax background image */}
      <img
        src="/images/spaces/living-room.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 w-full h-[115%] object-cover will-change-transform"
        style={{ transform: `translateY(${offset}px)`, filter: "brightness(0.4)" }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

      {/* Content — left-aligned, bottom-weighted */}
      <div className="container relative z-10 h-full flex flex-col justify-end pb-12 md:pb-16 lg:pb-20">
        <FadeIn>
          <p className="eyebrow text-[var(--accent-light)] mb-4">
            Dealer Network
          </p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h1 className="h1 text-white mb-5 max-w-2xl">
            Find an Authorized<br />
            <span className="text-white/70">Dealer Near You</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.14}>
          <p className="body-lg text-white/50 max-w-lg mb-8 leading-relaxed">
            Explore our network of trusted dealers across Nepal. Each one
            carries the full range of Prime Ceramics collections.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex items-center gap-6">
            <a href="#dealers-grid" className="link-arrow text-white/80 hover:text-white">
              Browse Dealers <ArrowRight size={12} />
            </a>
            <div className="h-4 w-px bg-white/20" />
            <span className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-white/35">
              <CountUp target={dealers.length} suffix="+" /> Dealers &middot; {nepalProvinces.length} Provinces
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
