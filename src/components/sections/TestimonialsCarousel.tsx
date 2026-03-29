"use client";

import { useState, useEffect, useCallback } from "react";
import FadeIn from "@/components/animations/FadeIn";
import SplitHeading from "@/components/animations/SplitHeading";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (index === activeIndex || isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex(index);
        setIsTransitioning(false);
      }, 300);
    },
    [activeIndex, isTransitioning]
  );

  const next = useCallback(() => {
    const nextIndex = (activeIndex + 1) % testimonials.length;
    goTo(nextIndex);
  }, [activeIndex, goTo]);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  const current = testimonials[activeIndex];

  return (
    <section className="bg-[var(--bg-dark)] section-pad relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        {/* Pattern C Header — Centered */}
        <FadeIn className="text-center">
          <p className="eyebrow text-[var(--accent-light)] mb-4 text-center">
            What They Say
          </p>
        </FadeIn>
        <SplitHeading className="h2 text-[var(--ink-on-dark)] text-center mb-12 md:mb-16">
          Voices of Trust
        </SplitHeading>

        {/* Carousel */}
        <div className="max-w-3xl mx-auto text-center relative">
          {/* Large quote mark */}
          <span
            className="font-serif text-[6rem] leading-none text-[var(--accent)]/20 absolute -top-8 left-1/2 -translate-x-1/2 select-none pointer-events-none"
            aria-hidden="true"
          >
            {"\u201C"}
          </span>

          {/* Quote + Author */}
          <div
            className="transition-all duration-500"
            style={{
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning
                ? "translateY(12px)"
                : "translateY(0)",
            }}
          >
            <p className="h3 font-serif italic text-[var(--ink-on-dark)] leading-relaxed mb-8">
              &ldquo;{current.quote}&rdquo;
            </p>

            {/* Author block */}
            <div>
              <div className="w-8 h-[1.5px] bg-[var(--accent)] mx-auto mb-4" />
              <p className="body-sm font-medium text-[var(--ink-on-dark)] mb-1">
                {current.author}
              </p>
              <p className="text-[0.7rem] text-[var(--ink-on-dark-light)] mb-1">
                {current.role}
              </p>
              {current.project && (
                <p className="text-[0.65rem] text-[var(--ink-on-dark-light)]/60 italic">
                  {current.project}
                </p>
              )}
            </div>
          </div>

          {/* Dots navigation */}
          <div className="flex justify-center gap-3 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                  i === activeIndex
                    ? "bg-[var(--accent)] scale-125"
                    : "bg-[var(--ink-on-dark)]/20 hover:bg-[var(--ink-on-dark)]/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
