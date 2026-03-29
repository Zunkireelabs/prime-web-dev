"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import TextMarquee from "@/components/sections/TextMarquee";
import MagneticButton from "@/components/ui/MagneticButton";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.6 });

      // Image clip-path reveal
      tl.fromTo(
        imageRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 1.5, ease: "none" }
      );

      // Marquee fade in
      tl.fromTo(
        marqueeRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "none" },
        "-=0.8"
      );

      // Title words stagger
      tl.fromTo(
        titleRef.current?.querySelectorAll(".hero-word") || [],
        { y: "130%", rotateX: -60, opacity: 0 },
        {
          y: "0%",
          rotateX: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "none",
        },
        "-=0.9"
      );

      // Meta
      tl.fromTo(
        metaRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "none" },
        "-=0.6"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const words = [
    { text: "Surfaces", accent: false },
    { text: "That", accent: false },
    { text: "Define", accent: true },
    { text: "Spaces.", accent: false },
  ];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen surface-dark overflow-hidden"
    >
      {/* Background text marquee — runs behind everything */}
      <div
        ref={marqueeRef}
        className="absolute inset-0 flex items-center z-0 opacity-0"
      >
        <TextMarquee items={["Prime Ceramics"]} speed={60} />
      </div>

      {/* Content grid */}
      <div className="container relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-8 items-end lg:items-center py-28 lg:py-0">
        {/* Left — Typography */}
        <div className="order-2 lg:order-1 lg:col-span-6 pb-8 lg:pb-0">
          <p className="eyebrow text-[var(--accent-light)] mb-8">
            Premium Ceramics & Surfaces
          </p>

          <h1
            ref={titleRef}
            className="display text-[var(--ink-on-dark)] mb-10"
            style={{ perspective: "600px" }}
          >
            {words.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.22em]">
                <span
                  className="hero-word inline-block"
                  style={{ transformOrigin: "center bottom" }}
                >
                  {w.accent ? (
                    <em className="not-italic text-[var(--accent-light)]">
                      {w.text}
                    </em>
                  ) : (
                    w.text
                  )}
                </span>
              </span>
            ))}
          </h1>

          <div ref={metaRef}>
            <p className="body-lg text-[var(--ink-on-dark-secondary)] max-w-md mb-10">
              Crafted from earth, designed for tomorrow. Premium porcelain,
              ceramic, and natural stone for architecture that demands artistry.
            </p>

            <div className="flex flex-wrap items-center gap-5">
              <MagneticButton
                href="#collections"
                className="btn btn-outline-light"
              >
                Explore Collections
              </MagneticButton>
              <MagneticButton
                href="#contact"
                className="btn btn-text text-[var(--ink-on-dark-secondary)] hover:text-[var(--ink-on-dark)]"
              >
                Request a Quote →
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Right — Image with reveal */}
        <div className="order-1 lg:order-2 lg:col-span-6 relative">
          <div
            ref={imageRef}
            className="relative aspect-[3/4] lg:aspect-auto lg:h-[88vh] lg:max-h-[860px] overflow-hidden"
            style={{ clipPath: "inset(0 0 100% 0)" }}
          >
            <img
              src="/images/hero/slide-1.jpg"
              alt="Premium ceramic tile texture"
              className="w-full h-full object-cover"
            />

            {/* Gradient overlay on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-dark)] via-transparent to-transparent lg:bg-gradient-to-l lg:from-[var(--surface-dark)]/40 lg:via-transparent" />
          </div>

          {/* Floating collection label */}
          <div className="absolute bottom-6 left-6 lg:bottom-10 lg:-left-16 bg-[var(--surface-dark-secondary)] border border-[var(--ink-on-dark)]/5 px-6 py-4 z-20 backdrop-blur-sm">
            <p className="eyebrow text-[var(--accent-light)] mb-1">Featured</p>
            <p className="text-sm text-[var(--ink-on-dark)]">
              Calacatta Luxe — 120×260cm
            </p>
          </div>
        </div>
      </div>

      {/* Bottom scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center">
        <span className="eyebrow text-[var(--ink-on-dark-muted)] mb-4 text-[0.55rem]">
          Scroll to explore
        </span>
        <div className="w-[1px] h-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[var(--accent)]" style={{
            animation: "scrollLine 2s linear infinite",
          }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(0%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
}
