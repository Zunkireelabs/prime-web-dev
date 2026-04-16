"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { useWebGLSupport } from "@/components/three/useWebGLSupport";

gsap.registerPlugin(ScrollTrigger);

const TileHero = dynamic(() => import("@/components/three/TileHero"), { ssr: false });

export default function AboutHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const factBarRef = useRef<HTMLDivElement>(null);
  const heroScrollProgress = useRef(0);
  const webglTier = useWebGLSupport();
  const [currentTile, setCurrentTile] = useState<{ name: string; category: string; sizes: string[] } | null>(null);
  const handleTileChange = useCallback((tile: { name: string; category: string; sizes: string[] }) => {
    setCurrentTile(tile);
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const q = (s: string) => heroRef.current?.querySelector(s);

      /* Entrance timeline */
      const tl = gsap.timeline({ delay: 0.3 });
      const heroEye = q(".hero-eye");
      const heroTitle = q(".hero-title");
      const heroLine = q(".hero-line");
      const heroBody = q(".hero-body");
      const heroCta = q(".hero-cta");
      const heroScroll = q(".hero-scroll");
      const factItems = factBarRef.current?.querySelectorAll(".fact-item");

      if (heroEye) tl.fromTo(heroEye, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "none" });
      if (heroTitle) tl.fromTo(heroTitle, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power1.out" }, "-=0.2");
      if (heroLine) tl.fromTo(heroLine, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "none" }, "-=0.3");
      if (heroBody) tl.fromTo(heroBody, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "none" }, "-=0.2");
      if (heroCta) tl.fromTo(heroCta, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "none" }, "-=0.1");
      if (heroScroll) tl.fromTo(heroScroll, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "none" }, "-=0.1");
      if (factItems?.length) tl.fromTo(factItems, { y: 10, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.35, ease: "none" }, "-=0.15");

      /* BG parallax */
      const heroImg = q(".hero-img");
      if (heroImg) {
        gsap.fromTo(heroImg, { scale: 1.12 }, {
          scale: 1, y: 80, ease: "none",
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
        });
      }

      /* Scroll progress → 3D tile */
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => { heroScrollProgress.current = self.progress; },
      });

      /* Content parallax exit */
      const heroContent = q(".hero-content");
      if (heroContent) {
        gsap.to(heroContent, {
          y: -60, opacity: 0.3, ease: "none",
          scrollTrigger: { trigger: heroRef.current, start: "60% top", end: "bottom top", scrub: true },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} id="about-hero" className="relative min-h-screen bg-surface-dark overflow-hidden flex flex-col">
      {/* BG */}
      <div className="absolute inset-0 overflow-hidden">
        <img src="/images/about-factory.jpg" alt="Prime Ceramics factory" className="hero-img w-full h-[130%] object-cover will-change-transform" style={{ opacity: 0.25 }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c09] via-[#0f0c09]/50 to-[#0f0c09]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0c09]/90 via-[#0f0c09]/40 to-transparent" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, #0f0c09 100%)" }} />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
      </div>

      {/* 3D Floating Tile — desktop only */}
      {webglTier === "high" && (
        <>
          <TileHero scrollProgress={heroScrollProgress} onTileChange={handleTileChange} />
          {/* Tile label overlay */}
          {currentTile && (
            <div className="hidden lg:flex absolute right-[8%] bottom-[100px] z-10 flex-col items-end pointer-events-none">
              <p className="text-[0.55rem] font-medium tracking-[0.3em] uppercase text-accent-light/40" style={{ marginBottom: "8px" }}>
                {currentTile.category}
              </p>
              <p className="font-serif font-light text-white/70 leading-tight" style={{ fontSize: "clamp(1rem, 1.5vw, 1.3rem)" }}>
                {currentTile.name}
              </p>
              <p className="text-[0.5rem] text-white/25" style={{ marginTop: "8px" }}>
                {currentTile.sizes.join(" · ")}
              </p>
            </div>
          )}
        </>
      )}

      {/* Content */}
      <div className="hero-content relative z-10 flex-1 flex items-center">
        <div className="container" style={{ paddingTop: "clamp(80px, 10vw, 128px)", paddingBottom: "32px" }}>
          <div style={{ maxWidth: "580px" }}>
            <div className="hero-eye flex items-center gap-4 opacity-0" style={{ marginBottom: "32px" }}>
              <div className="w-10 h-px bg-accent" />
              <p className="text-[0.6rem] font-medium tracking-[0.35em] uppercase text-accent-light">About Prime Ceramics</p>
            </div>

            <h1 className="hero-title font-serif font-light text-ink-on-dark opacity-0 leading-[0.92]" style={{ fontSize: "clamp(2.2rem, 6vw, 5.5rem)", letterSpacing: "-0.03em", marginBottom: "clamp(20px, 4vw, 32px)" }}>
              Crafting Nepal&apos;s<br />Future, One Tile<br />at a Time
            </h1>

            <div className="hero-line w-20 h-[2px] bg-gradient-to-r from-accent to-accent/30 origin-left" style={{ marginBottom: "32px" }} />

            <p className="hero-body text-ink-on-dark-light opacity-0 leading-[1.85]" style={{ fontSize: "clamp(0.92rem, 1.1vw, 1.08rem)", maxWidth: "460px", marginBottom: "40px" }}>
              Nepal&apos;s largest tile manufacturer. Italian SACMI technology.
              NPR 3 billion investment. The only plant manufacturing both
              floor and wall tiles.
            </p>

            <div className="hero-cta opacity-0">
              <a href="#narrative" className="link-arrow text-accent-light hover:text-accent">
                Discover Our Story <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll opacity-0 absolute bottom-28 md:bottom-24 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <p className="text-[0.5rem] font-medium tracking-[0.3em] uppercase text-accent-light/40">Scroll</p>
        <div className="w-px h-8 bg-gradient-to-b from-accent/40 to-transparent relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-3 bg-accent animate-scroll-pulse" />
        </div>
      </div>

      {/* Fact strip */}
      <div className="relative z-10 stat-bar bg-[#0f0c09]/80 backdrop-blur-md">
        <div ref={factBarRef} className="container grid grid-cols-2 md:grid-cols-4">
          {[
            { label: "Established", value: "2021" },
            { label: "Technology", value: "SACMI" },
            { label: "Capacity", value: "4M sq m" },
            { label: "Dealers", value: "200+" },
          ].map((f, i) => (
            <div key={f.label} className={`fact-item opacity-0 ${i > 0 ? "border-l border-accent/10" : ""} group hover:bg-white/[0.02] transition-colors duration-300`} style={{ padding: "clamp(24px, 3vw, 32px) 0", textAlign: "center" }}>
              <p className="text-[0.55rem] font-medium tracking-[0.25em] uppercase text-accent-light/50" style={{ marginBottom: "8px" }}>{f.label}</p>
              <p className="text-lg md:text-xl font-serif font-light text-ink-on-dark group-hover:text-accent-light transition-colors duration-300">{f.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
