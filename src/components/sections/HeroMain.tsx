"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { heroSlides as slides } from "@/data/hero";

export default function HeroMain() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const goTo = useCallback(
    (idx: number) => {
      if (animating || idx === current) return;
      setAnimating(true);
      setCurrent(idx);
      setTimeout(() => setAnimating(false), 800);
    },
    [animating, current]
  );

  const next = useCallback(
    () => goTo((current + 1) % slides.length),
    [current, goTo]
  );
  const prev = useCallback(
    () => goTo((current - 1 + slides.length) % slides.length),
    [current, goTo]
  );

  /* Auto-rotate — pauses on hover */
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, paused]);

  /* Keyboard navigation */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    const el = sectionRef.current;
    if (!el) return;
    el.addEventListener("keydown", handleKey);
    return () => el.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  const slide = slides[current];

  return (
    <section
      ref={sectionRef}
      id="hero-main"
      className="relative h-screen overflow-hidden bg-[var(--bg-dark)]"
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Featured collections"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ outline: "none" }}
    >
      {/* Slide images */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            opacity: i === current ? 1 : 0,
            transition: "opacity 1s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          aria-hidden={i !== current}
        >
          <img
            src={s.image}
            alt={s.collection}
            className="w-full h-full object-cover"
            style={{
              transform: i === current ? "scale(1.06)" : "scale(1)",
              transition: "transform 10s cubic-bezier(0.22, 1, 0.36, 1)",
              filter: i === current ? "brightness(0.85)" : "brightness(0.7)",
            }}
          />
        </div>
      ))}

      {/* Gradient overlays — deeper, cinematic */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />

      {/* Content */}
      <div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center"
        aria-live="polite"
        aria-atomic="true"
      >
        <div
          key={current}
          style={{
            animation: "heroFadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
          }}
        >
          {/* Decorative accent line */}
          <div className="w-8 h-[1.5px] bg-[var(--accent)] mx-auto mb-6 opacity-60" />
          <p className="text-[0.6rem] font-medium tracking-[0.4em] uppercase text-[var(--accent-light)] mb-6">
            {slide.collection}
          </p>
          <h1
            className="font-[var(--font-display)] font-light text-white leading-[0.95] tracking-[-0.02em] mb-5"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 5rem)" }}
          >
            {slide.tagline}
          </h1>
          <p className="text-white/40 text-sm font-light tracking-wide mb-6 max-w-md mx-auto">
            Premium ceramics for extraordinary spaces
          </p>
          <a
            href="#collections"
            className="group inline-flex items-center gap-3 mt-2 px-10 py-4 text-[0.6rem] font-medium tracking-[0.25em] uppercase text-white/90 bg-white/5 backdrop-blur-md hover:bg-[var(--accent)] transition-all duration-500 border border-white/15 hover:border-[var(--accent)] hover:text-white"
          >
            {slide.cta} <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* Prev / Next */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-500 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-500 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight size={18} />
      </button>

      {/* Bottom navigation tabs */}
      <FadeIn delay={0.5} direction="up" distance={10}>
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="container">
            <div className="flex items-center justify-center gap-8 md:gap-12 py-6 border-t border-white/8">
              {slides.map((s, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`relative text-[0.6rem] md:text-[0.65rem] font-medium tracking-[0.25em] uppercase transition-all duration-500 pb-3 ${
                    i === current
                      ? "text-white"
                      : "text-white/25 hover:text-white/50"
                  }`}
                  aria-label={`Go to slide: ${s.collection}`}
                  aria-current={i === current ? "true" : undefined}
                >
                  <span className="hidden md:inline">{s.collection}</span>
                  <span className="md:hidden">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="absolute bottom-0 left-0 h-[1.5px] bg-[var(--accent)] transition-all duration-700"
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
    </section>
  );
}
