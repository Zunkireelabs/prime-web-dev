"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextRevealByWord from "@/components/animations/TextRevealByWord";
import CountUp from "@/components/animations/CountUp";
import FadeIn from "@/components/animations/FadeIn";
import { ArrowRight, MapPin, Factory, Award } from "lucide-react";
import { promoters } from "@/data/about";

gsap.registerPlugin(ScrollTrigger);

export default function AboutNarrative() {
  const imageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!imageRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Image mask reveal — clips from bottom to top
      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
        }
      );

      // Image inner zoom — settles as it reveals
      const img = imageRef.current?.querySelector(".story-img");
      if (img) {
        gsap.fromTo(
          img,
          { scale: 1.2 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 20%",
              scrub: true,
            },
          }
        );
      }

      // Image horizontal parallax
      gsap.fromTo(
        imageRef.current,
        { x: -30 },
        {
          x: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="narrative" className="bg-surface relative overflow-hidden" style={{ padding: "clamp(56px, 7vw, 96px) 0" }}>
      <div className="container">
        {/* ── Main editorial grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center" style={{ gap: "clamp(40px, 5vw, 64px)", marginBottom: "clamp(64px, 8vw, 96px)" }}>

          {/* Left — Factory Image (7 cols) */}
          <div className="lg:col-span-7 relative">
            <div ref={imageRef} className="relative will-change-transform">
              {/* Main image */}
              <div className="relative overflow-hidden group rounded-sm">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src="/images/factory-aerial.jpg"
                    alt="Prime Ceramics state-of-the-art manufacturing facility — aerial view"
                    loading="lazy"
                    className="story-img w-full h-full object-cover will-change-transform group-hover:scale-[1.03] transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  />
                </div>

                {/* Hover overlay with factory info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="flex items-center gap-2" style={{ marginBottom: "8px" }}>
                      <MapPin size={12} className="text-accent-light" />
                      <p className="text-[0.55rem] font-medium tracking-[0.25em] uppercase text-white/70">
                        Brindavan Municipality, Rautahat
                      </p>
                    </div>
                    <p className="text-white/90 font-serif font-light text-lg">
                      4 Million sq m Annual Capacity
                    </p>
                  </div>
                </div>
              </div>

              {/* Rotating badge — overlaps bottom-right */}
              <div className="absolute -right-3 -bottom-3 md:-right-5 md:-bottom-5 w-24 h-24 md:w-28 md:h-28 bg-surface rounded-full flex items-center justify-center shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-accent/15 z-10">
                <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 140 140">
                  <defs>
                    <path id="aboutBadge" d="M 70,70 m -48,0 a 48,48 0 1,1 96,0 a 48,48 0 1,1 -96,0" />
                  </defs>
                  <text className="fill-ink-muted" style={{ fontSize: "9.5px", fontWeight: 500, letterSpacing: "0.3em", textTransform: "uppercase" }}>
                    <textPath href="#aboutBadge">Made in Nepal &bull; Made in Nepal &bull;&nbsp;</textPath>
                  </text>
                </svg>
                <div className="text-center z-10">
                  <p className="font-serif font-light text-accent leading-none" style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }}>4+</p>
                  <p className="text-[0.5rem] font-semibold tracking-[0.25em] uppercase text-ink-muted" style={{ marginTop: "8px" }}>Years</p>
                </div>
              </div>

              {/* Accent line — top-left decorative */}
              <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-accent/20 pointer-events-none hidden md:block" />
            </div>
          </div>

          {/* Right — Content (5 cols) */}
          <div className="lg:col-span-5">
            <ScrollReveal from={{ y: 30, opacity: 0 }} to={{ y: 0, opacity: 1 }} start="top 85%" end="top 60%">
              <div className="flex items-center gap-4" style={{ marginBottom: "16px" }}>
                <div className="w-10 h-px bg-accent" />
                <p className="eyebrow text-accent">Our Story</p>
              </div>
            </ScrollReveal>

            <div style={{ marginBottom: "24px" }}>
              <TextRevealByWord as="h2" className="h2 text-ink" start="top 82%" end="top 55%">
                Nepal&apos;s First. Nepal&apos;s Finest.
              </TextRevealByWord>
            </div>

            <ScrollReveal from={{ y: 35, opacity: 0 }} to={{ y: 0, opacity: 1 }} start="top 75%" end="top 48%">
              <p className="body-lg text-ink-light" style={{ marginBottom: "24px" }}>
                Prime Ceramics Private Limited was born from a bold vision —
                to build a world-class manufacturing enterprise on Nepalese
                soil. Established in 2021 with an NPR 3 billion investment,
                our facility is the only plant in Nepal equipped to manufacture
                both floor and wall tiles.
              </p>
            </ScrollReveal>

            <ScrollReveal from={{ y: 35, opacity: 0 }} to={{ y: 0, opacity: 1 }} start="top 70%" end="top 43%">
              <p className="body-lg text-ink-light" style={{ marginBottom: "48px" }}>
                Powered by Italian SACMI technology, we achieved the highest
                sales volume among all tile manufacturers in Nepal for
                FY 2023–24 — in just our second year of full operation.
              </p>
            </ScrollReveal>

            {/* Quote — decorative treatment */}
            <ScrollReveal from={{ y: 30, opacity: 0 }} to={{ y: 0, opacity: 1 }} start="top 65%" end="top 38%">
              <div className="relative" style={{ marginBottom: "48px" }}>
                <span className="absolute -top-5 -left-2 font-serif text-accent/[0.06] leading-none select-none pointer-events-none" style={{ fontSize: "6rem" }}>
                  &ldquo;
                </span>
                <blockquote className="relative pl-6 border-l-2 border-accent/30">
                  <p className="font-serif italic text-ink leading-[1.6]" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)" }}>
                    Prime: Tiles with Stile — premium quality with unwavering
                    adherence to ethical business practices, transparency, and
                    sustainable growth.
                  </p>
                </blockquote>
              </div>
            </ScrollReveal>

            {/* Inline stats */}
            <ScrollReveal from={{ y: 25, opacity: 0 }} to={{ y: 0, opacity: 1 }} start="top 60%" end="top 35%">
              <div className="grid grid-cols-3 border-t border-accent/12" style={{ gap: "16px", paddingTop: "32px", marginBottom: "32px" }}>
                {[
                  { value: 4, suffix: "M", label: "Sq m / Year" },
                  { value: 200, suffix: "+", label: "Dealers" },
                  { value: 3, suffix: "B", prefix: "₹", label: "Investment" },
                ].map((s) => (
                  <div key={s.label} className="border-l-2 border-accent/25 pl-4 group">
                    <p className="text-2xl font-serif font-light text-ink leading-none group-hover:text-accent transition-colors duration-300">
                      {s.prefix}
                      <CountUp target={s.value} suffix={s.suffix} />
                    </p>
                    <p className="text-[0.5rem] font-medium tracking-[0.15em] uppercase text-ink-muted" style={{ marginTop: "8px" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal from={{ y: 20, opacity: 0 }} to={{ y: 0, opacity: 1 }} start="top 55%" end="top 32%">
              <a href="#journey" className="link-arrow text-accent hover:text-accent-hover">
                See Our Journey <ArrowRight size={14} />
              </a>
            </ScrollReveal>
          </div>
        </div>

        {/* ── Promoters — luxury cards ── */}
        <div className="border-t border-accent/10" style={{ paddingTop: "clamp(48px, 6vw, 64px)" }}>
          <ScrollReveal from={{ y: 20, opacity: 0 }} to={{ y: 0, opacity: 1 }}>
            <div className="flex items-center gap-3" style={{ marginBottom: "40px" }}>
              <div className="w-8 h-px bg-accent/30" />
              <p className="text-[0.55rem] font-medium tracking-[0.35em] uppercase text-ink-muted">Promoted By</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "clamp(24px, 3vw, 32px)" }}>
            {promoters.map((p, i) => (
              <ScrollReveal key={p.name} from={{ y: 35, opacity: 0, x: i === 0 ? -30 : 30 }} to={{ y: 0, opacity: 1, x: 0 }} start="top 85%" end="top 55%">
                <div className="luxury-card p-8 md:p-10 group relative overflow-hidden">
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(181,138,82,0.06) 0%, transparent 60%)" }} />

                  <div className="relative">
                    <div className="flex items-center gap-4" style={{ marginBottom: "24px" }}>
                      <div className="w-10 h-10 rounded-full border border-accent/20 bg-accent/[0.05] flex items-center justify-center text-accent group-hover:border-accent/40 group-hover:bg-accent/[0.1] transition-all duration-300">
                        {i === 0 ? <Factory size={16} strokeWidth={1.5} /> : <Award size={16} strokeWidth={1.5} />}
                      </div>
                      <div>
                        <p className="text-[0.75rem] font-medium tracking-[0.12em] uppercase text-ink">
                          {p.name}
                        </p>
                        <p className="text-[0.55rem] font-medium tracking-[0.15em] uppercase text-accent/70">{p.role}</p>
                      </div>
                    </div>

                    <div className="gold-divider" style={{ marginBottom: "24px" }} />

                    <p className="body-sm text-ink-light leading-[1.85]">{p.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spinSlow 20s linear infinite; }
      `}</style>
    </section>
  );
}
