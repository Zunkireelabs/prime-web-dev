"use client";

import { useState, useEffect, useRef } from "react";
import FadeIn from "@/components/animations/FadeIn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";

const items = testimonials.map((t) => ({
  q: t.quote, a: t.author, r: t.role, p: t.project,
}));

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [fading, setFading] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const t = items[i];

  const goTo = (next: number) => {
    if (fading) return;
    setFading(true);
    setTimeout(() => {
      setI(next);
      setFading(false);
    }, 300);
  };

  // Auto-rotate — uses ref to avoid dependency issues
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setI((prev) => {
        const next = (prev + 1) % items.length;
        setFading(true);
        setTimeout(() => setFading(false), 300);
        return next;
      });
    }, 6000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section className="pb-[var(--section-gap)] bg-[var(--bg)] relative overflow-hidden">
      {/* Divider connecting from CraftProcess */}
      <div className="container"><div className="divider mb-[var(--section-gap)]" /></div>

      {/* Large decorative quote mark */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-[12rem] md:text-[16rem] font-serif leading-none text-[var(--ink)]/[0.03] select-none pointer-events-none">
        &ldquo;
      </div>

      <div className="container max-w-4xl text-center relative z-10">
        <FadeIn>
          <p className="eyebrow text-[var(--accent)] mb-10 tracking-[0.35em]">Testimonials</p>
        </FadeIn>

        <div
          className="transition-all duration-300"
          style={{
            opacity: fading ? 0 : 1,
            transform: fading ? "translateY(8px)" : "translateY(0)",
          }}
        >
          <blockquote className="h3 font-light text-[var(--ink)] leading-relaxed mb-10 italic">
            &ldquo;{t.q}&rdquo;
          </blockquote>

          <div className="accent-line mx-auto mb-6" />

          <p className="text-sm font-medium tracking-wide text-[var(--ink)]">{t.a}</p>
          <p className="body-sm text-[var(--ink-light)] mt-1">{t.r}</p>
          <p className="text-xs text-[var(--accent)] mt-2 tracking-wider">{t.p}</p>
        </div>

        <FadeIn delay={0.2}>
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={() => goTo((i - 1 + items.length) % items.length)}
              className="w-11 h-11 border border-[var(--ink-faint)] flex items-center justify-center text-[var(--ink-light)] hover:border-[var(--ink)] hover:text-[var(--ink)] transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={14} />
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-2 mx-2">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`h-[3px] transition-all duration-300 ${
                    idx === i
                      ? "w-6 bg-[var(--accent)]"
                      : "w-3 bg-[var(--ink-faint)] hover:bg-[var(--ink-muted)]"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => goTo((i + 1) % items.length)}
              className="w-11 h-11 border border-[var(--ink-faint)] flex items-center justify-center text-[var(--ink-light)] hover:border-[var(--ink)] hover:text-[var(--ink)] transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
