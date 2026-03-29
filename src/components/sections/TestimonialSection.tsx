"use client";

import { useState } from "react";
import FadeIn from "@/components/animations/FadeIn";
import SplitHeading from "@/components/animations/SplitHeading";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "Prime Ceramics transformed our vision into reality. The quality of their porcelain is unmatched — every surface in our hotel lobby speaks of luxury and permanence.",
    author: "Rajesh Sharma",
    role: "Principal Architect, Sharma & Associates",
    project: "The Grand Atrium, Kathmandu",
  },
  {
    quote:
      "As an interior designer, I need tiles that deliver both beauty and performance. Prime consistently exceeds on both. Their Nordic Wood range is a game-changer.",
    author: "Anita Gurung",
    role: "Lead Designer, Aura Interiors",
    project: "Lakeside Villa, Pokhara",
  },
  {
    quote:
      "We've sourced from Prime for over 8 years across dozens of projects. Their consistency, range, and technical support make them indispensable to our builds.",
    author: "Bikram Thapa",
    role: "Director, Thapa Construction Group",
    project: "Metropolitan Tower, Lalitpur",
  },
];

export default function TestimonialSection() {
  const [idx, setIdx] = useState(0);
  const t = testimonials[idx];

  return (
    <section className="surface-light section-padding">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left label */}
          <div className="lg:col-span-3">
            <FadeIn>
              <p className="eyebrow text-[var(--accent)] mb-5">Testimonials</p>
            </FadeIn>
            <SplitHeading as="h2" className="h3 text-[var(--ink-primary)] mb-8">
              Trusted by Industry Leaders
            </SplitHeading>

            <FadeIn delay={0.2}>
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setIdx((p) => (p - 1 + testimonials.length) % testimonials.length)
                  }
                  className="w-11 h-11 border border-[var(--ink-primary)] flex items-center justify-center hover:bg-[var(--ink-primary)] hover:text-[var(--surface-white)] transition-all duration-300"
                  aria-label="Previous"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setIdx((p) => (p + 1) % testimonials.length)}
                  className="w-11 h-11 border border-[var(--ink-primary)] flex items-center justify-center hover:bg-[var(--ink-primary)] hover:text-[var(--surface-white)] transition-all duration-300"
                  aria-label="Next"
                >
                  <ChevronRight size={16} />
                </button>
                <span className="text-sm text-[var(--ink-muted)] ml-2 tabular-nums">
                  {String(idx + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
                </span>
              </div>
            </FadeIn>
          </div>

          {/* Right quote */}
          <div className="lg:col-span-8 lg:col-start-5">
            <FadeIn delay={0.15}>
              <blockquote className="h3 text-[var(--ink-primary)] font-light leading-snug mb-10">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="divider-accent mb-6" />

              <p className="text-base font-medium text-[var(--ink-primary)]">
                {t.author}
              </p>
              <p className="body-sm text-[var(--ink-secondary)] mt-1">
                {t.role}
              </p>
              <p className="text-xs text-[var(--accent)] mt-2">{t.project}</p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
