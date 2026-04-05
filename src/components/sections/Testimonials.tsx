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
    <section className="bg-surface relative overflow-hidden" style={{ paddingBottom: "clamp(80px, 10vw, 140px)" }}>
      {/* Divider connecting from CraftProcess */}
      <div className="container"><div className="divider" style={{ marginBottom: "clamp(80px, 10vw, 140px)" }} /></div>

      {/* Large decorative quote mark */}
      <div className="absolute left-1/2 -translate-x-1/2 text-[12rem] md:text-[16rem] font-serif leading-none text-ink/[0.03] select-none pointer-events-none" style={{ top: "48px" }}>
        &ldquo;
      </div>

      <div className="container relative z-10" style={{ maxWidth: "900px", marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
        <FadeIn>
          <p className="eyebrow text-accent tracking-[0.35em]" style={{ marginBottom: "40px", textAlign: "center" }}>Testimonials</p>
        </FadeIn>

        <div
          className="transition-all duration-300"
          style={{
            opacity: fading ? 0 : 1,
            transform: fading ? "translateY(8px)" : "translateY(0)",
          }}
        >
          <blockquote className="h3 font-light text-ink leading-relaxed italic" style={{ marginBottom: "40px" }}>
            &ldquo;{t.q}&rdquo;
          </blockquote>

          <div className="accent-line" style={{ marginLeft: "auto", marginRight: "auto", marginBottom: "24px" }} />

          <p className="text-sm font-medium tracking-wide text-ink">{t.a}</p>
          <p className="body-sm text-ink-light" style={{ marginTop: "4px" }}>{t.r}</p>
          <p className="text-xs text-accent tracking-wider" style={{ marginTop: "8px" }}>{t.p}</p>
        </div>

        <FadeIn delay={0.2}>
          <div className="flex items-center justify-center" style={{ gap: "16px", marginTop: "48px" }}>
            <button
              onClick={() => goTo((i - 1 + items.length) % items.length)}
              className="w-11 h-11 border border-ink-faint flex items-center justify-center text-ink-light hover:border-ink hover:text-ink transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={14} />
            </button>

            {/* Dot indicators */}
            <div className="flex items-center" style={{ gap: "8px", marginLeft: "8px", marginRight: "8px" }}>
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`h-[3px] transition-all duration-300 ${
                    idx === i
                      ? "w-6 bg-accent"
                      : "w-3 bg-ink-faint hover:bg-ink-muted"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => goTo((i + 1) % items.length)}
              className="w-11 h-11 border border-ink-faint flex items-center justify-center text-ink-light hover:border-ink hover:text-ink transition-all duration-300"
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
