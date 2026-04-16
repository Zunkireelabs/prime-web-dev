"use client";

import FadeIn from "@/components/animations/FadeIn";
import { ArrowRight } from "lucide-react";

export default function BrandIntro() {

  return (
    <section className="relative" style={{ padding: "clamp(100px, 12vw, 180px) 0" }}>
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center" style={{ gap: "clamp(40px, 6vw, 56px)", columnGap: "clamp(48px, 8vw, 96px)" }}>
          {/* Left — Image with badge (7 cols) */}
          <div className="lg:col-span-7">
            <FadeIn direction="up" distance={30}>
              <div className="relative">
                <div className="aspect-[16/10] overflow-hidden relative group">
                  <img
                    src="/images/about-factory.jpg"
                    alt="Prime Ceramics Facility"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  />
                  {/* Warm overlay on hover */}
                  <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/[0.04] transition-colors duration-700" />
                </div>

                {/* Badge — overlapping bottom-right */}
                <div className="absolute right-2 bottom-2 sm:-right-3 sm:-bottom-3 md:-right-6 md:-bottom-6 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 bg-surface rounded-full flex flex-col items-center justify-center shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-ink-faint/30 z-10">
                  <p className="font-serif font-light text-accent leading-none text-[clamp(1.8rem,2.5vw,2.4rem)]">
                    4+
                  </p>
                  <p className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase text-ink-muted mt-1.5">
                    Years
                  </p>
                </div>

              </div>
            </FadeIn>
          </div>

          {/* Right — Content (5 cols) */}
          <div className="lg:col-span-5">
            <FadeIn>
              <div className="flex items-center gap-4" style={{ marginBottom: "16px" }}>
                <div className="w-10 h-px bg-accent" />
                <p className="eyebrow text-accent">About Prime Ceramics</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="h2" style={{ marginBottom: "24px" }}>
                Nepal&apos;s First Manufacturer of Both Wall &amp; Floor Tiles
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="w-12 h-[1.5px] bg-accent" style={{ marginBottom: "32px" }} />
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="body-lg max-w-lg" style={{ marginBottom: "32px" }}>
                Established in 2021, Prime Ceramics operates Nepal&apos;s only
                plant equipped to manufacture both floor and wall tiles —
                powered by Italian SACMI technology with an annual capacity
                of 4 million square meters.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <a
                href="/about"
                className="btn-fill group"
              >
                Know More
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </FadeIn>
          </div>
        </div>
      </div>

    </section>
  );
}
