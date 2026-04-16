"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextRevealByWord from "@/components/animations/TextRevealByWord";
import { Pickaxe, Cpu, Flame, ShieldCheck, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    num: "01",
    title: "Sourcing",
    text: "Premium clays, feldspars, and natural pigments sourced from trusted quarries worldwide. Every raw material is tested for purity and consistency before entering our production line.",
    image: "/images/gallery/gallery-1.jpg",
    icon: Pickaxe,
    stat: { value: "100%", label: "Tested Materials" },
  },
  {
    num: "02",
    title: "Engineering",
    text: "Advanced digital printing and pressing technology from Italian SACMI — the global gold standard. Our facility is the only plant in Nepal equipped to manufacture both floor and wall tiles.",
    image: "/images/gallery/gallery-2.jpg",
    icon: Cpu,
    stat: { value: "SACMI", label: "Italian Technology" },
  },
  {
    num: "03",
    title: "Firing",
    text: "Kiln-fired at 1200°C+ for exceptional hardness, durability, and color permanence. Precise temperature control ensures uniform quality across every batch.",
    image: "/images/gallery/gallery-3.jpg",
    icon: Flame,
    stat: { value: "1200°C+", label: "Kiln Temperature" },
  },
  {
    num: "04",
    title: "Quality Control",
    text: "Every batch tested for water absorption, slip resistance, and dimensional accuracy. ISO 9001:2015 certified processes ensure nothing leaves our facility without meeting international standards.",
    image: "/images/gallery/gallery-4.jpg",
    icon: ShieldCheck,
    stat: { value: "ISO", label: "9001:2015 Certified" },
  },
];

export default function AboutCraft() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !progressRef.current) return;

    // Safety fallback: ensure content is visible even if GSAP fails
    const fallback = setTimeout(() => {
      const blocks = sectionRef.current?.querySelectorAll(".process-content, .process-img");
      blocks?.forEach((el) => {
        (el as HTMLElement).style.opacity = "1";
        (el as HTMLElement).style.transform = "none";
      });
    }, 3000);

    const ctx = gsap.context(() => {
      // Progress bar scrubs with section scroll
      gsap.fromTo(
        progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: true,
          },
        }
      );

      // Each step block animates
      const blocks = sectionRef.current?.querySelectorAll(".process-block");
      blocks?.forEach((block) => {
        const img = block.querySelector(".process-img");
        const content = block.querySelector(".process-content");

        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.15, opacity: 0.6 },
            {
              scale: 1,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: block,
                start: "top 80%",
                end: "top 30%",
                scrub: true,
              },
            }
          );
        }

        if (content) {
          gsap.fromTo(
            content,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: block,
                start: "top 75%",
                end: "top 35%",
                scrub: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => {
      clearTimeout(fallback);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manufacturing"
      className="bg-surface-dark relative overflow-hidden"
      style={{ padding: "clamp(56px, 7vw, 96px) 0" }}
    >
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(181,138,82,0.04) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="container relative z-10">
        {/* ── Section Header ── */}
        <div style={{ textAlign: "center", marginBottom: "clamp(48px, 6vw, 64px)" }}>
          <ScrollReveal
            from={{ y: 20, opacity: 0 }}
            to={{ y: 0, opacity: 1 }}
            start="top 85%"
            end="top 60%"
          >
            <div className="flex items-center justify-center gap-4" style={{ marginBottom: "16px" }}>
              <div className="w-10 h-px bg-accent/40" />
              <p className="eyebrow text-accent-light">Craftsmanship</p>
              <div className="w-10 h-px bg-accent/40" />
            </div>
          </ScrollReveal>

          <div style={{ marginBottom: "24px" }}>
            <TextRevealByWord
              as="h2"
              className="font-serif font-light text-white leading-[1.1]"
              start="top 80%"
              end="top 55%"
            >
              The Art &amp; Science of Premium Tile Making
            </TextRevealByWord>
          </div>

          <ScrollReveal
            from={{ y: 20, opacity: 0 }}
            to={{ y: 0, opacity: 1 }}
            start="top 75%"
            end="top 55%"
          >
            <p className="text-ink-on-dark-light max-w-xl mx-auto leading-[1.85]" style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.08rem)" }}>
              From raw earth to polished surface — every Prime tile passes
              through a meticulous 4-stage process powered by Italian SACMI
              technology.
            </p>
          </ScrollReveal>
        </div>

        {/* ── Process Steps — vertical editorial ── */}
        <div className="relative overflow-hidden">
          {/* Vertical progress line (left side on desktop) */}
          <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[2px] bg-accent/8">
            <div
              ref={progressRef}
              className="absolute inset-0 bg-gradient-to-b from-accent via-accent/50 to-accent/15 origin-top"
            />
          </div>

          <div style={{ paddingLeft: "clamp(0px, 2vw, 64px)", display: "flex", flexDirection: "column", gap: "clamp(40px, 6vw, 80px)" }}>
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              const isReversed = i % 2 !== 0;

              return (
                <div key={step.num} className="process-block relative">
                  {/* Step dot on progress line */}
                  <div className="hidden lg:block absolute -left-16 top-8 w-[14px] h-[14px]">
                    <div className="w-full h-full rounded-full bg-accent border-[3px] border-surface-dark shadow-[0_0_12px_rgba(181,138,82,0.35)]" />
                  </div>

                  <div
                    className={`grid grid-cols-1 lg:grid-cols-12 items-center ${isReversed ? "lg:direction-rtl" : ""}`}
                    style={{ gap: "clamp(32px, 4vw, 56px)" }}
                  >
                    {/* Image */}
                    <div
                      className={`lg:col-span-6 ${isReversed ? "lg:order-2" : ""}`}
                    >
                      <div className="process-img relative overflow-hidden rounded-sm will-change-transform">
                        <div className="aspect-[3/2] overflow-hidden group">
                          <img
                            src={step.image}
                            alt={`${step.title} — Prime Ceramics manufacturing process`}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)]"
                          />
                        </div>
                        {/* Step number overlay */}
                        <div className="absolute top-4 left-4 md:top-6 md:left-6">
                          <span
                            className="font-serif font-light text-white/15 leading-none select-none"
                            style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
                          >
                            {step.num}
                          </span>
                        </div>
                        {/* Bottom gradient */}
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      className={`lg:col-span-6 ${isReversed ? "lg:order-1" : ""}`}
                    >
                      <div className="process-content will-change-transform">
                        {/* Icon + Title */}
                        <div className="flex items-center gap-4" style={{ marginBottom: "24px" }}>
                          <div className="w-12 h-12 rounded-full border border-accent/20 bg-accent/[0.06] flex items-center justify-center">
                            <Icon
                              size={20}
                              strokeWidth={1.5}
                              className="text-accent-light"
                            />
                          </div>
                          <div>
                            <p className="text-[0.55rem] font-medium tracking-[0.3em] uppercase text-accent-light/50" style={{ marginBottom: "8px" }}>
                              Step {step.num}
                            </p>
                            <h3
                              className="font-serif font-light text-white leading-tight"
                              style={{
                                fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                              }}
                            >
                              {step.title}
                            </h3>
                          </div>
                        </div>

                        <div className="w-10 h-[1.5px] bg-accent/25" style={{ marginBottom: "24px" }} />

                        <p className="text-ink-on-dark-light leading-[1.85]" style={{ fontSize: "clamp(0.92rem, 1.05vw, 1.02rem)", marginBottom: "32px" }}>
                          {step.text}
                        </p>

                        {/* Stat badge */}
                        <div className="inline-flex items-center gap-3 border border-accent/15 rounded-sm bg-accent/[0.03]" style={{ padding: "12px 20px" }}>
                          <p className="font-serif font-light text-accent-light leading-none" style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.3rem)" }}>
                            {step.stat.value}
                          </p>
                          <div className="w-px h-5 bg-accent/15" />
                          <p className="text-[0.55rem] font-medium tracking-[0.2em] uppercase text-ink-on-dark-muted">
                            {step.stat.label}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div style={{ marginTop: "clamp(56px, 7vw, 80px)", textAlign: "center" }}>
          <ScrollReveal
            from={{ y: 20, opacity: 0 }}
            to={{ y: 0, opacity: 1 }}
          >
            <p className="text-ink-on-dark-muted text-sm" style={{ marginBottom: "24px" }}>
              See the results of our craftsmanship
            </p>
            <a
              href="/catalog"
              className="link-arrow text-accent-light hover:text-accent"
            >
              Explore Our Catalog <ArrowRight size={14} />
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
