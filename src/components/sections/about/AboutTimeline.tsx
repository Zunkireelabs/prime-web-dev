"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadeIn from "@/components/animations/FadeIn";
import { milestones } from "@/data/about";

gsap.registerPlugin(ScrollTrigger);

export default function AboutTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current) return;

    const ctx = gsap.context(() => {
      const tlLineH = timelineRef.current?.querySelector(".tl-progress-h");
      const tlLineV = timelineRef.current?.querySelector(".tl-progress-v");
      if (tlLineH) {
        gsap.fromTo(tlLineH, { scaleX: 0 }, {
          scaleX: 1, ease: "none",
          scrollTrigger: { trigger: timelineRef.current, start: "top 80%", end: "bottom 50%", scrub: true },
        });
      }
      if (tlLineV) {
        gsap.fromTo(tlLineV, { scaleY: 0 }, {
          scaleY: 1, ease: "none",
          scrollTrigger: { trigger: timelineRef.current, start: "top 80%", end: "bottom 50%", scrub: true },
        });
      }
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" className="bg-surface relative" style={{ padding: "clamp(80px, 10vw, 140px) 0" }}>
      <div className="container">
        {/* ── Section Header ── */}
        <div style={{ textAlign: "center", marginBottom: "clamp(56px, 7vw, 88px)" }}>
          <FadeIn>
            <div className="flex items-center justify-center gap-4" style={{ marginBottom: "20px" }}>
              <div className="w-8 h-px bg-accent" />
              <p className="eyebrow text-accent">Our Journey</p>
              <div className="w-8 h-px bg-accent" />
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2 className="h2 text-ink" style={{ marginBottom: "20px" }}>
              From Vision to Market Leader
            </h2>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="body-lg text-ink-light" style={{ maxWidth: "520px", marginLeft: "auto", marginRight: "auto" }}>
              A young company with an extraordinary trajectory — achieving
              market leadership in record time.
            </p>
          </FadeIn>
        </div>

        {/* ── Timeline ── */}
        <div ref={timelineRef} className="relative">
          {/* Horizontal progress line — desktop */}
          <div className="hidden md:block absolute left-0 right-0 h-[2px] bg-accent/8" style={{ top: "20px" }}>
            <div className="tl-progress-h absolute inset-0 bg-gradient-to-r from-accent via-accent/50 to-accent/15 origin-left" />
          </div>
          {/* Vertical progress line — mobile */}
          <div className="md:hidden absolute left-[18px] top-0 bottom-0 w-[2px] bg-accent/8">
            <div className="tl-progress-v absolute inset-0 bg-gradient-to-b from-accent via-accent/50 to-accent/15 origin-top" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4" style={{ gap: "0" }}>
            {milestones.map((m, i) => (
              <FadeIn key={m.year} direction="up" delay={i * 0.12} distance={30}>
                <div className="relative pl-12 md:pl-0" style={{ paddingBottom: "clamp(40px, 4vw, 56px)" }}>
                  {/* Dot — mobile */}
                  <div className="md:hidden absolute left-[10px] top-[6px] w-[18px] h-[18px]">
                    <div className="w-full h-full rounded-full bg-accent border-[3px] border-surface shadow-[0_0_12px_rgba(181,138,82,0.35)]" />
                  </div>

                  {/* Dot — desktop */}
                  <div className="hidden md:flex justify-center" style={{ marginBottom: "32px" }}>
                    <div className="w-[18px] h-[18px]">
                      <div className="w-full h-full rounded-full bg-accent border-[3px] border-surface shadow-[0_0_12px_rgba(181,138,82,0.35)]" />
                    </div>
                  </div>

                  {/* Card content */}
                  <div
                    className="rounded-sm md:text-center"
                    style={{
                      padding: "clamp(20px, 2.5vw, 28px)",
                      border: "1px solid rgba(0,0,0,0.04)",
                      background: "rgba(0,0,0,0.015)",
                      marginLeft: "0",
                      marginRight: "0",
                      ...(i < milestones.length - 1 ? { marginRight: "clamp(0px, 0.5vw, 4px)" } : {}),
                    }}
                  >
                    <p
                      className="font-serif font-light text-accent leading-none"
                      style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", marginBottom: "12px" }}
                    >
                      {m.year}
                    </p>
                    <p
                      className="font-semibold tracking-[0.2em] uppercase text-ink"
                      style={{ fontSize: "0.6rem", marginBottom: "12px" }}
                    >
                      {m.title}
                    </p>
                    <div className="w-6 h-[1px] bg-accent/25 md:mx-auto" style={{ marginBottom: "12px" }} />
                    <p
                      className="text-ink-light leading-[1.8] md:mx-auto"
                      style={{ fontSize: "0.85rem", maxWidth: "280px" }}
                    >
                      {m.description}
                    </p>
                    {m.highlight && (
                      <p
                        className="text-accent italic md:mx-auto"
                        style={{ fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.12em", marginTop: "12px", maxWidth: "280px" }}
                      >
                        {m.highlight}
                      </p>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
