"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadeIn from "@/components/animations/FadeIn";
import MaskReveal from "@/components/animations/MaskReveal";
import SplitHeading from "@/components/animations/SplitHeading";
import CountUp from "@/components/animations/CountUp";
import { craftSteps } from "@/data/craft";
import { milestones, visionQuote, visionStatement, missionStatements, aboutStats, promoters, certifications } from "@/data/about";
import { testimonials } from "@/data/testimonials";
import { clients } from "@/data/clients";
import { ArrowRight, ShieldCheck, Leaf, BadgeCheck, Cog, Eye, Target, Check } from "lucide-react";
import Image from "next/image";
import SectionTransition from "@/components/ui/SectionTransition";

const certIconMap: Record<string, typeof ShieldCheck> = { ShieldCheck, Leaf, BadgeCheck, Cog };

export default function AboutCinematic() {
  const heroRef = useRef<HTMLDivElement>(null);
  const factBarRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const craftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      /* ── Hero entrance ── */
      const tl = gsap.timeline({ delay: 0.3 });
      const q = (s: string) => heroRef.current?.querySelector(s);
      const heroEye = q(".hero-eye");
      const heroTitle = q(".hero-title");
      const heroLine = q(".hero-line");
      const heroBody = q(".hero-body");
      const heroCta = q(".hero-cta");
      const factItems = factBarRef.current?.querySelectorAll(".fact-item");

      if (heroEye) tl.fromTo(heroEye, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "none" });
      if (heroTitle) tl.fromTo(heroTitle, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power1.out" }, "-=0.2");
      if (heroLine) tl.fromTo(heroLine, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "none" }, "-=0.3");
      if (heroBody) tl.fromTo(heroBody, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "none" }, "-=0.2");
      if (heroCta) tl.fromTo(heroCta, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "none" }, "-=0.1");
      if (factItems?.length) tl.fromTo(factItems, { y: 10, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.35, ease: "none" }, "-=0.15");

      /* Hero parallax + slow scale */
      const heroImg = q(".hero-img");
      if (heroImg) {
        gsap.fromTo(heroImg, { scale: 1.08 }, {
          scale: 1, y: 60, ease: "none",
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
        });
      }

      /* Timeline progress */
      const tlLine = timelineRef.current?.querySelector(".tl-progress");
      if (tlLine) {
        gsap.fromTo(tlLine, { scaleY: 0 }, {
          scaleY: 1, ease: "none",
          scrollTrigger: { trigger: timelineRef.current, start: "top 80%", end: "bottom 50%", scrub: true },
        });
      }

      /* Craft cards stagger */
      const craftCards = craftRef.current?.querySelectorAll(".craft-card");
      if (craftCards?.length) {
        gsap.fromTo(craftCards, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: "power1.out",
          scrollTrigger: { trigger: craftRef.current, start: "top 75%" },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const bestTestimonial = testimonials[0];

  return (
    <div>
      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  1. HERO — Cinematic full-viewport                           */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen bg-[var(--bg-dark)] overflow-hidden flex flex-col">
        {/* Background with parallax + vignette */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/about-factory.jpg"
            alt="Prime Ceramics factory"
            className="hero-img w-full h-[120%] object-cover will-change-transform"
            style={{ opacity: 0.35 }}
          />
          {/* Multi-layer overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c09] via-[#0f0c09]/50 to-[#0f0c09]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0c09]/85 via-[#0f0c09]/30 to-transparent" />
          {/* Vignette */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, #0f0c09 100%)" }} />
          {/* Grain texture */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="container pt-28 md:pt-32 pb-8">
            <div className="max-w-[620px]">
              {/* Eyebrow with gold line */}
              <div className="hero-eye flex items-center gap-4 mb-7 opacity-0">
                <div className="w-10 h-px bg-[var(--accent)]" />
                <p className="text-[0.6rem] font-medium tracking-[0.35em] uppercase text-[var(--accent-light)]">About Prime Ceramics</p>
              </div>

              <h1 className="hero-title font-serif font-light text-[var(--ink-on-dark)] mb-8 opacity-0 leading-[0.92]" style={{ fontSize: "clamp(3rem, 6.5vw, 5.8rem)", letterSpacing: "-0.03em" }}>
                Crafting Nepal&apos;s<br />Future, One Tile<br />at a Time
              </h1>

              <div className="hero-line w-20 h-[2px] bg-gradient-to-r from-[var(--accent)] to-[var(--accent)]/30 mb-8 origin-left" />

              <p className="hero-body text-[var(--ink-on-dark-light)] max-w-[480px] mb-10 opacity-0 leading-[1.85]" style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.1rem)" }}>
                The only plant in Nepal equipped to manufacture both floor and wall tiles.
                Italian SACMI technology. NPR 3 billion investment. 4 million sq m annual capacity.
              </p>

              <div className="hero-cta opacity-0 mb-4">
                <a href="#story" className="link-arrow text-[var(--accent-light)] hover:text-[var(--accent)]">
                  Our Story <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar — luxury strip */}
        <div className="relative z-10 stat-bar bg-[#0f0c09]/80 backdrop-blur-md">
          <div ref={factBarRef} className="container grid grid-cols-2 md:grid-cols-4">
            {[
              { label: "Established", value: "2021" },
              { label: "Technology", value: "SACMI" },
              { label: "Capacity", value: "4M sq m" },
              { label: "Dealers", value: "120+" },
            ].map((f, i) => (
              <div
                key={f.label}
                className={`fact-item opacity-0 py-6 md:py-7 text-center ${i > 0 ? "border-l border-[var(--accent)]/10" : ""} group hover:bg-white/[0.02] transition-colors duration-500`}
              >
                <p className="text-[0.5rem] font-medium tracking-[0.3em] uppercase text-[var(--accent-light)]/50 mb-2">{f.label}</p>
                <p className="text-lg md:text-xl font-serif font-light text-[var(--ink-on-dark)] group-hover:text-[var(--accent-light)] transition-colors duration-500">{f.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from="dark" to="light" variant="diagonal" />

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  2. THE STORY — Premium editorial split                      */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="story" className="bg-[var(--bg)] section-pad relative">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Left — Image */}
            <div className="lg:col-span-7">
              <MaskReveal direction="up">
                <div className="relative">
                  <div className="aspect-[16/10] overflow-hidden group">
                    <img
                      src="/images/factory.jpg"
                      alt="Prime Ceramics manufacturing facility"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)]"
                    />
                  </div>
                  {/* Rotating badge */}
                  <div className="absolute -right-3 -bottom-3 md:-right-5 md:-bottom-5 w-24 h-24 md:w-28 md:h-28 bg-[var(--bg)] rounded-full flex items-center justify-center shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-[var(--accent)]/15 z-10">
                    <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 140 140">
                      <defs><path id="aboutBadgePath" d="M 70,70 m -48,0 a 48,48 0 1,1 96,0 a 48,48 0 1,1 -96,0" /></defs>
                      <text className="fill-[var(--ink-muted)]" style={{ fontSize: "9.5px", fontWeight: 500, letterSpacing: "0.3em", textTransform: "uppercase" }}>
                        <textPath href="#aboutBadgePath">Industry Excellence &bull; Industry Excellence &bull;&nbsp;</textPath>
                      </text>
                    </svg>
                    <div className="text-center z-10">
                      <p className="font-serif font-light text-[var(--accent)] leading-none" style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }}>4+</p>
                      <p className="text-[0.5rem] font-semibold tracking-[0.25em] uppercase text-[var(--ink-muted)] mt-1">Years</p>
                    </div>
                  </div>
                </div>
              </MaskReveal>
            </div>

            {/* Right — Content panel */}
            <div className="lg:col-span-5 lg:pt-4">
              <FadeIn>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-px bg-[var(--accent)]" />
                  <p className="eyebrow text-[var(--accent)]">Our Story</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.08}>
                <h2 className="h2 text-[var(--ink)] mb-8">Nepal&apos;s First.<br />Nepal&apos;s Finest.</h2>
              </FadeIn>
              <FadeIn delay={0.14}>
                <p className="body-lg text-[var(--ink-light)] mb-6 max-w-md">
                  Prime Ceramics Private Limited, established in 2021, operates from
                  a state-of-the-art facility in Brindavan Municipality, Rautahat — the
                  only plant in Nepal equipped to manufacture both floor and wall tiles,
                  with an annual capacity of 4 million square meters.
                </p>
              </FadeIn>
              <FadeIn delay={0.18}>
                <p className="body-lg text-[var(--ink-light)] mb-6 max-w-md">
                  Promoted by CMS and Fortune Ventures — each with over two decades
                  of proven excellence in construction materials — PCPL achieved the
                  highest sales volume among all tile manufacturers in Nepal for FY 2023–24.
                </p>
              </FadeIn>
              <FadeIn delay={0.22}>
                <p className="body-lg text-[var(--ink-light)] mb-10 max-w-md">
                  Guided by the promise <span className="italic text-[var(--accent)]">&ldquo;Prime: Tiles with Stile,&rdquo;</span> we
                  deliver premium-quality products with unwavering adherence to ethical
                  business practices, transparency, and sustainable growth.
                </p>
              </FadeIn>

              <FadeIn delay={0.26}>
                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[var(--accent)]/12">
                  {[
                    { n: "4M", l: "Sq m / Year" },
                    { n: "120+", l: "Dealers" },
                    { n: "₹3B", l: "Investment" },
                  ].map((s) => (
                    <div key={s.l} className="border-l-2 border-[var(--accent)]/25 pl-4">
                      <p className="text-2xl font-serif font-light text-[var(--ink)] leading-none">{s.n}</p>
                      <p className="text-[0.5rem] font-medium tracking-[0.15em] uppercase text-[var(--ink-muted)] mt-2">{s.l}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  3. IMPACT NUMBERS — Luxury dark strip                       */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="bg-[var(--bg-dark)] relative overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(181,138,82,0.06) 0%, transparent 70%)" }} />

        <div className="container relative z-10">
          <div className="stat-bar">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {aboutStats.map((stat, i) => (
                <FadeIn key={stat.label} direction="up" delay={i * 0.1}>
                  <div className={`text-center py-14 md:py-20 ${i > 0 ? "border-l border-[var(--accent)]/10" : ""} group`}>
                    <p className="font-serif font-light text-[var(--ink-on-dark)] leading-none mb-4 group-hover:text-[var(--accent-light)] transition-colors duration-500" style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)" }}>
                      {stat.prefix && <span className="text-[var(--accent-light)]" style={{ fontSize: "55%" }}>{stat.prefix}</span>}
                      <CountUp target={stat.value} suffix={stat.suffix} />
                    </p>
                    <div className="w-5 h-px bg-[var(--accent)]/30 mx-auto mb-3" />
                    <p className="text-[0.6rem] font-medium tracking-[0.25em] uppercase text-[var(--ink-on-dark-light)]">{stat.label}</p>
                    <p className="text-[0.55rem] text-[var(--ink-on-dark-muted)] mt-1">{stat.sub}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  4. THE CRAFT — Premium process cards                        */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="bg-[var(--bg-alt)] section-pad relative">
        <div className="container">
          <div className="text-center mb-14 md:mb-20 max-w-2xl mx-auto">
            <FadeIn>
              <div className="flex items-center justify-center gap-4 mb-5">
                <div className="w-8 h-px bg-[var(--accent)]" />
                <p className="eyebrow text-[var(--accent)]">The Prime Process</p>
                <div className="w-8 h-px bg-[var(--accent)]" />
              </div>
            </FadeIn>
            <SplitHeading as="h2" className="h2 text-[var(--ink)] mb-6">
              Art Meets Engineering
            </SplitHeading>
            <FadeIn delay={0.15}>
              <p className="body-lg text-[var(--ink-light)] max-w-lg mx-auto">
                Italian SACMI technology. 1200°C+ precision firing.
                Every surface engineered for permanence.
              </p>
            </FadeIn>
          </div>

          {/* Full-width image */}
          <MaskReveal direction="up">
            <div className="aspect-[2/1] md:aspect-[21/9] overflow-hidden img-gs mb-14 md:mb-20">
              <img
                src="/images/gallery/gallery-1.jpg"
                alt="Prime Ceramics production line"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </MaskReveal>

          {/* 4 craft cards */}
          <div ref={craftRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {craftSteps.map((step) => (
              <div key={step.num} className="craft-card luxury-card p-8 group h-full relative overflow-hidden opacity-0">
                {/* Gold step number */}
                <p className="font-serif font-light text-[var(--accent)]/[0.08] leading-none absolute -top-2 -right-1 select-none pointer-events-none" style={{ fontSize: "7rem" }}>
                  {step.num}
                </p>
                <div className="relative z-10">
                  <p className="text-[var(--accent)] font-serif font-light text-2xl mb-1">{step.num}</p>
                  <div className="w-6 h-[2px] bg-[var(--accent)]/40 mb-5 group-hover:w-10 group-hover:bg-[var(--accent)] transition-all duration-500" />
                  <h3 className="h3 text-[var(--ink)] mb-3">{step.title}</h3>
                  <p className="body-sm text-[var(--ink-light)] leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from="light" to="dark" variant="wave" />

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  5. VISION + MISSION + TIMELINE — Dark section               */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="bg-[var(--bg-dark)] section-pad relative overflow-hidden">
        {/* Radial glow behind content */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(181,138,82,0.05) 0%, transparent 70%)" }} />

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-16 lg:gap-24">
            {/* Left — Vision & Mission */}
            <div className="flex flex-col justify-center">
              <FadeIn direction="left" distance={30}>
                <div className="mb-14">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/[0.06] flex items-center justify-center">
                      <Eye size={17} className="text-[var(--accent-light)]" strokeWidth={1.5} />
                    </div>
                    <p className="eyebrow text-[var(--accent-light)]">Our Vision</p>
                  </div>
                  <p className="h3 font-serif text-[var(--ink-on-dark)] leading-[1.45]">
                    {visionStatement}
                  </p>
                </div>
              </FadeIn>

              <FadeIn direction="left" distance={30} delay={0.15}>
                <div className="mb-14">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/[0.06] flex items-center justify-center">
                      <Target size={17} className="text-[var(--accent-light)]" strokeWidth={1.5} />
                    </div>
                    <p className="eyebrow text-[var(--accent-light)]">Our Mission</p>
                  </div>
                  <ul className="space-y-5">
                    {missionStatements.map((m, i) => (
                      <li key={i} className="flex gap-4 items-start">
                        <div className="w-5 h-5 rounded-full border border-[var(--accent)]/25 flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={10} className="text-[var(--accent-light)]" strokeWidth={2.5} />
                        </div>
                        <p className="text-[var(--ink-on-dark-light)] text-sm leading-relaxed">{m}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              <FadeIn direction="left" distance={30} delay={0.25}>
                <div className="border-t border-[var(--accent)]/10 pt-8">
                  <p className="text-[0.55rem] font-medium tracking-[0.25em] uppercase text-[var(--accent-light)]/40 mb-6">Promoted By</p>
                  <div className="grid grid-cols-2 gap-8">
                    {promoters.map((p) => (
                      <div key={p.name}>
                        <p className="text-[0.7rem] font-medium tracking-[0.12em] uppercase text-[var(--ink-on-dark)] mb-2">{p.name}</p>
                        <p className="text-[0.6rem] text-[var(--ink-on-dark-muted)] leading-[1.7]">{p.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right — Timeline */}
            <div ref={timelineRef}>
              <FadeIn>
                <div className="flex items-center gap-3 mb-12">
                  <div className="w-8 h-px bg-[var(--accent)]" />
                  <p className="eyebrow text-[var(--accent-light)]">Our Journey</p>
                </div>
              </FadeIn>
              <div className="relative">
                {/* Gold progress line */}
                <div className="absolute left-[2.25rem] md:left-[2.75rem] top-0 bottom-0 w-px bg-[var(--accent)]/8">
                  <div className="tl-progress absolute inset-0 bg-gradient-to-b from-[var(--accent)] to-[var(--accent)]/30 origin-top" />
                </div>

                <div className="space-y-0">
                  {milestones.map((m, i) => (
                    <FadeIn key={m.year} direction="up" delay={i * 0.12}>
                      <div className="flex gap-6 md:gap-8 py-8 relative group">
                        <div className="shrink-0 w-[4.5rem] md:w-[5.5rem] relative">
                          <p className="font-serif font-light text-[var(--accent-light)] leading-none group-hover:text-[var(--accent)] transition-colors duration-500" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}>
                            {m.year}
                          </p>
                          {/* Glowing dot */}
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[calc(0.75rem+1px)] md:translate-x-[calc(0.75rem+1px)]">
                            <div className="w-3 h-3 rounded-full bg-[var(--accent)] border-[3px] border-[var(--bg-dark)] shadow-[0_0_8px_rgba(181,138,82,0.3)]" />
                          </div>
                        </div>
                        <div className="flex-1 border-b border-[var(--accent)]/8 pb-8">
                          <p className="text-[0.65rem] font-medium tracking-[0.15em] uppercase text-[var(--ink-on-dark)] mb-2">{m.title}</p>
                          <p className="text-sm text-[var(--ink-on-dark-light)] max-w-sm leading-relaxed">{m.description}</p>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionTransition from="dark" to="light" variant="diagonal" />

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  6. CERTIFICATIONS — Luxury badge cards                      */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="bg-[var(--bg)] section-pad">
        <div className="container">
          <div className="text-center mb-12 md:mb-16">
            <FadeIn>
              <div className="flex items-center justify-center gap-4 mb-5">
                <div className="w-8 h-px bg-[var(--accent)]" />
                <p className="eyebrow text-[var(--accent)]">Quality Assurance</p>
                <div className="w-8 h-px bg-[var(--accent)]" />
              </div>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h2 className="h2 text-[var(--ink)]">Certified Excellence</h2>
            </FadeIn>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5">
            {certifications.map((cert, i) => {
              const Icon = certIconMap[cert.icon];
              return (
                <FadeIn key={cert.name} direction="up" delay={i * 0.08}>
                  <div className="luxury-card text-center py-10 px-5">
                    <div className="w-12 h-12 mx-auto mb-5 rounded-full border border-[var(--accent)]/15 bg-[var(--accent)]/[0.05] flex items-center justify-center text-[var(--accent)]">
                      {Icon && <Icon size={20} strokeWidth={1.5} />}
                    </div>
                    <p className="body-sm font-medium text-[var(--ink)] mb-1">{cert.name}</p>
                    <p className="text-[0.6rem] text-[var(--ink-muted)]">{cert.label}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  7. TESTIMONIAL — Editorial quote block                      */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="bg-[var(--bg-alt)] py-24 md:py-32 relative overflow-hidden">
        {/* Large decorative quote mark */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 font-serif text-[var(--accent)]/[0.04] leading-none select-none pointer-events-none" style={{ fontSize: "clamp(15rem, 25vw, 28rem)" }}>
          &ldquo;
        </div>

        <div className="container relative z-10">
          <FadeIn direction="up">
            <div className="max-w-2xl mx-auto text-center">
              <p className="font-serif italic text-[var(--ink)] leading-[1.55] mb-10" style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.65rem)" }}>
                &ldquo;{bestTestimonial.quote}&rdquo;
              </p>
              <div className="w-12 h-px bg-[var(--accent)]/40 mx-auto mb-6" />
              <p className="text-[0.65rem] font-medium tracking-[0.18em] uppercase text-[var(--ink)]">
                {bestTestimonial.author}
              </p>
              <p className="text-[0.6rem] text-[var(--ink-muted)] mt-1">{bestTestimonial.role}</p>
              {bestTestimonial.project && (
                <p className="text-[0.55rem] text-[var(--accent)] mt-3 italic">{bestTestimonial.project}</p>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  8. CLIENT LOGOS — Monochrome strip                          */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="bg-[var(--bg)] py-16 md:py-20 overflow-hidden border-t border-[var(--accent)]/8 border-b border-b-[var(--accent)]/8">
        <div className="container">
          <FadeIn>
            <p className="eyebrow text-[var(--ink-muted)] mb-10 text-center">Trusted By Leading Developers</p>
          </FadeIn>
        </div>
        <FadeIn direction="none" delay={0.1}>
          <div className="relative w-full">
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[var(--bg)] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[var(--bg)] to-transparent z-10 pointer-events-none" />
            <div className="flex items-center gap-10 md:gap-16 animate-trust-marquee">
              {[...clients, ...clients, ...clients].map((c, i) => (
                <div key={`${c.name}-${i}`} className="flex items-center justify-center flex-shrink-0 w-[160px] md:w-[200px] h-[70px] md:h-[80px] group">
                  <div className="grayscale opacity-25 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
                    <Image src={c.logo} alt={c.name} width={c.width} height={c.height} className="object-contain max-h-[45px] md:max-h-[55px] w-auto" unoptimized />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  9. CTA — Luxury conversion section                          */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="bg-[var(--bg-alt)] section-pad-lg relative overflow-hidden">
        {/* Layered decorative elements */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(181,138,82,0.06) 0%, transparent 60%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[var(--accent)]/[0.03] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[var(--accent)]/[0.05] pointer-events-none" />

        <div className="container text-center relative z-10">
          <FadeIn>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-8 h-px bg-[var(--accent)]" />
              <p className="eyebrow text-[var(--accent)]">Get Started</p>
              <div className="w-8 h-px bg-[var(--accent)]" />
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="display text-[var(--ink)] mb-6">Tiles with Stile.</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="body-lg text-[var(--ink-light)] max-w-md mx-auto mb-12">
              Visit our showrooms or connect with a dealer near you.
            </p>
          </FadeIn>
          <FadeIn delay={0.22}>
            <div className="flex flex-wrap items-center justify-center gap-5">
              <a href="/dealers" className="btn-gold group">
                Visit Showroom
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="/catalog" className="btn-gold-outline group">
                Explore Catalog
                <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <style jsx>{`
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spinSlow 20s linear infinite; }
        @keyframes trustMarquee { from { transform: translateX(0); } to { transform: translateX(calc(-100% / 3)); } }
        .animate-trust-marquee { animation: trustMarquee 28s linear infinite; width: max-content; }
        .animate-trust-marquee:hover { animation-play-state: paused; }
      `}</style>
    </div>
  );
}
