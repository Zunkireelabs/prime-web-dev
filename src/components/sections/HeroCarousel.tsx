"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { heroCarouselSlides as slides } from "@/data/hero";

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback((idx: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setActive(idx);
    setTimeout(() => setTransitioning(false), 800);
  }, [transitioning]);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((active + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [active, goTo]);

  return (
    <section className="relative h-[85vh] lg:h-screen overflow-hidden bg-[var(--bg-alt)]">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 transition-opacity duration-[800ms]",
            i === active ? "opacity-100" : "opacity-0"
          )}
        >
          <img
            src={slide.image}
            alt={slide.label}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Floating label — bottom left (Simpolo-inspired: minimal overlay) */}
      <div className="absolute bottom-12 left-0 z-10">
        <div className="container">
          <div className="bg-white/95 backdrop-blur-sm px-8 py-6 inline-block max-w-sm">
            <p className="eyebrow text-[var(--accent)] mb-2">
              {slides[active].label}
            </p>
            <p className="text-sm text-[var(--ink)]">
              {slides[active].subtitle}
            </p>
            <a
              href="#collections"
              className="link-arrow mt-4 inline-flex text-[0.65rem]"
            >
              Explore <ArrowRight size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-12 right-0 z-10">
        <div className="container flex justify-end">
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={cn(
                  "h-[2px] transition-all duration-500",
                  i === active
                    ? "w-8 bg-[var(--accent)]"
                    : "w-4 bg-[var(--ink-faint)] hover:bg-[var(--ink-muted)]"
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
