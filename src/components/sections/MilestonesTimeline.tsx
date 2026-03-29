"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadeIn from "@/components/animations/FadeIn";
import { milestones } from "@/data/about";

gsap.registerPlugin(ScrollTrigger);

export default function MilestonesTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineRef.current || !sectionRef.current) return;

    const tween = gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: "left center",
        duration: 0.8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: true,
        },
      }
    );

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === sectionRef.current) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-[var(--bg)] section-pad">
      <div className="container">
        {/* ── Pattern C Header (Centered) ── */}
        <div className="text-center">
          <p className="eyebrow text-[var(--accent)] mb-4">Our Journey</p>
          <h2 className="h2 text-[var(--ink)] text-center mb-12 md:mb-16">
            Four Years of Impact
          </h2>
        </div>

        {/* ── Desktop: Horizontal Timeline ── */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Horizontal line */}
            <div
              ref={lineRef}
              className="absolute top-[24px] left-0 right-0 h-px bg-[var(--ink)]/10"
            />

            <div className="grid grid-cols-4 gap-8">
              {milestones.map((m, i) => (
                <FadeIn key={m.year} direction="up" delay={0.15 * i}>
                  <div className="flex flex-col items-center">
                    {/* Node dot */}
                    <div className="w-3 h-3 rounded-full bg-[var(--accent)] relative z-10 mx-auto mb-8" />
                    <p className="font-serif text-2xl text-[var(--ink)] text-center mb-2">
                      {m.year}
                    </p>
                    <h3 className="h3 text-[var(--ink)] text-center mb-2">
                      {m.title}
                    </h3>
                    <p className="body-sm text-[var(--ink-light)] text-center max-w-[200px] mx-auto">
                      {m.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>

        {/* ── Mobile: Vertical Timeline ── */}
        <div className="lg:hidden">
          <div className="border-l-2 border-[var(--ink)]/10 pl-8 ml-3">
            {milestones.map((m, i) => (
              <FadeIn key={m.year} direction="up" delay={0.15 * i}>
                <div
                  className={`relative ${
                    i === milestones.length - 1 ? "" : "mb-10"
                  }`}
                >
                  {/* Node dot */}
                  <div className="absolute -left-[calc(2rem+5px)] top-1 w-3 h-3 rounded-full bg-[var(--accent)]" />
                  <p className="font-serif text-xl text-[var(--accent)] mb-1">
                    {m.year}
                  </p>
                  <h3 className="h3 text-[var(--ink)] mb-2">{m.title}</h3>
                  <p className="body-sm text-[var(--ink-light)]">
                    {m.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
