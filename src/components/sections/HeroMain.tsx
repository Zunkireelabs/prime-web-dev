"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { heroSlides as slides } from "@/data/hero";

/* Each slide gets a unique drift direction for the Ken Burns effect */
const driftDirections = [
  { x: -12, y: -8 },   // drift top-left
  { x: 10, y: -6 },    // drift top-right
  { x: -8, y: 10 },    // drift bottom-left
  { x: 12, y: 6 },     // drift bottom-right
];

export default function HeroMain() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(-1);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  /* Track a key that resets per slide to restart CSS animation */
  const [slideKey, setSlideKey] = useState(0);

  const goTo = useCallback(
    (idx: number) => {
      if (animating || idx === current) return;
      setAnimating(true);
      setPrev(current);
      setCurrent(idx);
      setSlideKey((k) => k + 1);
      setTimeout(() => {
        setAnimating(false);
        setPrev(-1);
      }, 1200);
    },
    [animating, current]
  );

  const goNext = useCallback(
    () => goTo((current + 1) % slides.length),
    [current, goTo]
  );
  const goPrev = useCallback(
    () => goTo((current - 1 + slides.length) % slides.length),
    [current, goTo]
  );

  /* Auto-rotate */
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(goNext, 7000);
    return () => clearInterval(timer);
  }, [goNext, paused]);

  /* Keyboard */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
    };
    const el = sectionRef.current;
    if (!el) return;
    el.addEventListener("keydown", handleKey);
    return () => el.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  const slide = slides[current];

  return (
    <section
      ref={sectionRef}
      id="hero-main"
      className="relative h-screen overflow-hidden bg-surface-dark outline-none"
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Featured collections"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slide images with Ken Burns zoom-out + drift */}
      {slides.map((s, i) => {
        const isActive = i === current;
        const isLeaving = i === prev;
        const drift = driftDirections[i % driftDirections.length];

        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              opacity: isActive ? 1 : isLeaving ? 0 : 0,
              transition: isActive
                ? "opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1)"
                : isLeaving
                  ? "opacity 1.4s cubic-bezier(0.22, 1, 0.36, 1)"
                  : "none",
              zIndex: isActive ? 2 : isLeaving ? 1 : 0,
            }}
            aria-hidden={!isActive}
          >
            <img
              key={isActive ? `active-${slideKey}` : `idle-${i}`}
              src={s.image}
              alt={s.collection}
              className="w-full h-full object-cover will-change-transform"
              style={
                isActive
                  ? {
                      animation: `kenBurns 8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards`,
                      filter: "brightness(0.72)",
                      ["--drift-x" as string]: `${drift.x}px`,
                      ["--drift-y" as string]: `${drift.y}px`,
                    }
                  : isLeaving
                    ? {
                        transform: "scale(1.02)",
                        filter: "brightness(0.4) blur(4px)",
                        transition: "all 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
                      }
                    : {
                        transform: "scale(1.35)",
                        filter: "brightness(0.5)",
                      }
              }
            />
          </div>
        );
      })}

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[3] bg-gradient-to-b from-black/50 via-black/15 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-[3] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />

      {/* Content */}
      <div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
        aria-live="polite"
        aria-atomic="true"
      >
        <div
          key={current}
          style={{
            animation: "heroFadeIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
          }}
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4" style={{ marginBottom: "24px" }}>
            <div className="w-10 h-[1px] bg-accent/40" />
            <p className="text-[0.65rem] md:text-[0.6rem] font-medium tracking-[0.4em] uppercase text-accent-light">
              {slide.collection}
            </p>
            <div className="w-10 h-[1px] bg-accent/40" />
          </div>

          <h1
            className="font-display font-light text-white leading-[0.95] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5.5rem)", marginBottom: "32px" }}
          >
            {slide.tagline}
          </h1>

          <p className="text-white/35 text-[0.9rem] md:text-[0.85rem] font-light tracking-wide leading-relaxed" style={{ marginBottom: "48px", maxWidth: "480px", marginLeft: "auto", marginRight: "auto" }}>
            Premium ceramics for extraordinary spaces
          </p>

          <a href="#collections" className="btn-gold group">
            {slide.cta}
            <ArrowRight
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>

      {/* Prev / Next */}
      <button
        onClick={goPrev}
        className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center text-white/30 hover:text-white transition-all duration-500 group"
        aria-label="Previous slide"
      >
        <ChevronLeft
          size={20}
          strokeWidth={1}
          className="group-hover:-translate-x-0.5 transition-transform duration-300"
        />
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center text-white/30 hover:text-white transition-all duration-500 group"
        aria-label="Next slide"
      >
        <ChevronRight
          size={20}
          strokeWidth={1}
          className="group-hover:translate-x-0.5 transition-transform duration-300"
        />
      </button>

      {/* Bottom navigation tabs */}
      <FadeIn delay={0.5} direction="up" distance={10}>
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="container">
            <div className="flex items-center justify-center border-t border-white/[0.06]" style={{ gap: "clamp(24px, 4vw, 48px)", padding: "32px 0" }}>
              {slides.map((s, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`relative text-[0.7rem] md:text-[0.65rem] font-medium tracking-[0.25em] uppercase transition-all duration-500 pb-3 ${
                    i === current
                      ? "text-white"
                      : "text-white/20 hover:text-white/45"
                  }`}
                  aria-label={`Go to slide: ${s.collection}`}
                  aria-current={i === current ? "true" : undefined}
                >
                  <span className="hidden md:inline">{s.collection}</span>
                  <span className="md:hidden">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-700"
                    style={{
                      width: i === current ? "100%" : "0%",
                      opacity: i === current ? 1 : 0,
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Ken Burns keyframes */}
      <style jsx>{`
        @keyframes kenBurns {
          0% {
            transform: scale(1.35) translate(0px, 0px);
          }
          100% {
            transform: scale(1.0) translate(var(--drift-x), var(--drift-y));
          }
        }
      `}</style>
    </section>
  );
}
