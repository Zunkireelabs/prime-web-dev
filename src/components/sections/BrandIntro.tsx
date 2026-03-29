"use client";

import { useState, useRef, useEffect } from "react";
import FadeIn from "@/components/animations/FadeIn";
import { ArrowRight, X } from "lucide-react";

export default function BrandIntro() {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [expanded]);

  return (
    <section className="section-pad">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left — Image with rotating badge (7 cols) */}
          <div className="lg:col-span-7">
            <FadeIn direction="up" distance={30}>
              <div className="relative">
                <div className="aspect-[16/10] overflow-hidden relative group">
                  <img
                    src="/images/about-factory.jpg"
                    alt="Prime Ceramics Facility"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  />
                  {/* Subtle warm overlay on hover */}
                  <div className="absolute inset-0 bg-[var(--accent)]/0 group-hover:bg-[var(--accent)]/5 transition-colors duration-700" />
                </div>

                {/* Rotating circular badge — overlapping bottom-right */}
                <div className="absolute -right-5 -bottom-5 md:-right-8 md:-bottom-8 w-28 h-28 md:w-36 md:h-36 bg-[var(--bg)] rounded-full flex items-center justify-center shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-[var(--ink-faint)]/30 z-10">
                  {/* Rotating text ring */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 140 140"
                    style={{ animation: "spinSlow 20s linear infinite" }}
                  >
                    <defs>
                      <path
                        id="circlePath"
                        d="M 70,70 m -48,0 a 48,48 0 1,1 96,0 a 48,48 0 1,1 -96,0"
                      />
                    </defs>
                    <text
                      className="fill-[var(--ink-muted)]"
                      style={{
                        fontSize: "9.5px",
                        fontWeight: 500,
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                      }}
                    >
                      <textPath href="#circlePath">
                        Experience In Industry &bull; Experience In Industry &bull;&nbsp;
                      </textPath>
                    </text>
                  </svg>

                  {/* Center number */}
                  <div className="text-center z-10">
                    <p
                      className="font-serif font-light text-[var(--ink)] leading-none"
                      style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
                    >
                      4+
                    </p>
                    <p className="text-[0.5rem] md:text-[0.55rem] font-semibold tracking-[0.25em] uppercase text-[var(--ink-light)] mt-1">
                      Years
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right — Content (5 cols) */}
          <div className="lg:col-span-5">
            <FadeIn>
              <p className="eyebrow text-[var(--accent)] mb-4">
                About Prime Ceramics
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="h2 mb-5">
                Nepal&apos;s First Manufacturer of Both Wall &amp; Floor Tiles
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="body-lg max-w-md mb-6">
                Established in 2021, Prime Ceramics operates Nepal&apos;s only
                plant equipped to manufacture both floor and wall tiles —
                powered by Italian SACMI technology with an annual capacity
                of 4 million square meters.
              </p>
            </FadeIn>

            {/* Expandable content with smooth transition */}
            <div
              ref={contentRef}
              className="overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                maxHeight: expanded ? `${height}px` : "0px",
                opacity: expanded ? 1 : 0,
              }}
            >
              <div className="max-w-md">
                <p className="body-lg mb-5">
                  Promoted by CMS and Fortune Ventures — two of Nepal&apos;s
                  most respected business houses with over two decades of
                  excellence — we achieved the highest sales volume among all
                  tile manufacturers in Nepal for FY 2023–24.
                </p>

                <p className="body-lg mb-8">
                  With NPR 3 billion in investment and 120+ dealers nationwide,
                  we deliver premium quality and responsive service — guided by
                  our promise:
                  <span className="italic text-[var(--ink)]">
                    {" "}&ldquo;Prime: Tiles with Stile.&rdquo;
                  </span>
                </p>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-5 pt-6 mb-8 border-t border-[var(--accent)]/15">
                  <div>
                    <p className="text-2xl md:text-[1.7rem] font-serif font-light text-[var(--ink)] leading-none">
                      4M
                    </p>
                    <p className="text-[0.55rem] font-medium tracking-[0.15em] uppercase text-[var(--ink-muted)] mt-2">
                      Sq m / Year
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl md:text-[1.7rem] font-serif font-light text-[var(--ink)] leading-none">
                      120+
                    </p>
                    <p className="text-[0.55rem] font-medium tracking-[0.15em] uppercase text-[var(--ink-muted)] mt-2">
                      Dealers
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl md:text-[1.7rem] font-serif font-light text-[var(--ink)] leading-none">
                      ₹3B
                    </p>
                    <p className="text-[0.55rem] font-medium tracking-[0.15em] uppercase text-[var(--ink-muted)] mt-2">
                      Investment
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <FadeIn delay={0.3}>
              <button
                onClick={() => setExpanded(!expanded)}
                className="btn-fill group"
              >
                {expanded ? "Show Less" : "Know More"}
                {expanded ? (
                  <X size={14} />
                ) : (
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                )}
              </button>
            </FadeIn>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
