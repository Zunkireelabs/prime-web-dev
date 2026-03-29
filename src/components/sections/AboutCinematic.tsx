"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadeIn from "@/components/animations/FadeIn";
import MaskReveal from "@/components/animations/MaskReveal";
import SplitHeading from "@/components/animations/SplitHeading";
import CountUp from "@/components/animations/CountUp";
import { craftSteps } from "@/data/craft";
import { spiritItems } from "@/data/spirit";
import { milestones, visionQuote, aboutStats, promoters, certifications } from "@/data/about";
import { testimonials } from "@/data/testimonials";
import { clients } from "@/data/clients";
import { ArrowRight, MoveUpRight, ShieldCheck, Leaf, BadgeCheck, Cog } from "lucide-react";
import Image from "next/image";
import SectionTransition from "@/components/ui/SectionTransition";

const certIconMap: Record<string, typeof ShieldCheck> = { ShieldCheck, Leaf, BadgeCheck, Cog };

export default function AboutCinematic() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const factBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      /* Hero entrance timeline */
      const tl = gsap.timeline({ delay: 0.3 });

      const heroEye = heroRef.current?.querySelector(".hero-eye");
      const heroTitle = heroRef.current?.querySelector(".hero-title");
      const heroLine = heroRef.current?.querySelector(".hero-line");
      const heroBody = heroRef.current?.querySelector(".hero-body");
      const heroCta = heroRef.current?.querySelector(".hero-cta");
      const factItems = factBarRef.current?.querySelectorAll(".fact-item");

      if (heroEye) tl.fromTo(heroEye, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "none" });
      if (heroTitle) tl.fromTo(heroTitle, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power1.out" }, "-=0.15");
      if (heroLine) tl.fromTo(heroLine, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "none" }, "-=0.3");
      if (heroBody) tl.fromTo(heroBody, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "none" }, "-=0.2");
      if (heroCta) tl.fromTo(heroCta, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "none" }, "-=0.1");
      if (factItems?.length) tl.fromTo(factItems, { y: 8, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.3, ease: "none" }, "-=0.1");

      /* Hero image — subtle scale on scroll */
      const heroImage = heroImgRef.current?.querySelector("img");
      if (heroImage) {
        gsap.fromTo(heroImage,
          { scale: 1.08 },
          { scale: 1, ease: "none", scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true } }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const bestTestimonial = testimonials[0];

  return (
    <div>
      {/* ═══════════════════════════════════════════════════════════ */}
      {/*  1. HERO — Full-viewport, image bg, text bottom-left      */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen bg-[var(--bg-dark)] overflow-hidden flex flex-col">
        {/* Background image */}
        <div ref={heroImgRef} className="absolute inset-0 overflow-hidden">
          <img
            src="/images/about-factory.jpg"
            alt="Prime Ceramics factory — aerial view"
            loading="lazy"
            className="w-full h-full object-cover will-change-transform"
          />
          {/* Overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-dark)] via-[var(--bg-dark)]/50 to-[var(--bg-dark)]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-dark)]/60 to-transparent" />
        </div>

        {/* Content — positioned bottom-left */}
        <div className="relative z-10 mt-auto">
          <div className="container py-16 md:py-20 lg:py-24">
            <div className="max-w-2xl">
              <p className="hero-eye eyebrow text-[var(--accent-light)] mb-4 opacity-0">
                About Prime Ceramics
              </p>

              <h1 className="hero-title display text-[var(--ink-on-dark)] mb-6 opacity-0">
                Crafting Nepal&apos;s Future,
                One Tile at a Time
              </h1>

              <div className="hero-line w-16 h-[1.5px] bg-[var(--accent)] mb-6 origin-left" />

              <p className="hero-body body-lg text-[var(--ink-on-dark-light)] max-w-lg mb-8 opacity-0">
                Nepal&apos;s first manufacturer of both wall &amp; floor tiles.
                Italian SACMI technology. 4 million sq m annual capacity.
              </p>

              <div className="hero-cta opacity-0">
                <a href="#story" className="link-arrow text-white/80 hover:text-[var(--accent-light)]">
                  Our Story
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Fact strip */}
          <div className="border-t border-white/8">
            <div ref={factBarRef} className="container flex flex-wrap gap-8 md:gap-12 py-6">
              {[
                { label: "Est.", value: "2021" },
                { label: "Technology", value: "SACMI" },
                { label: "Capacity", value: "4M sq m" },
                { label: "Dealers", value: "120+" },
              ].map((f) => (
                <div key={f.label} className="fact-item opacity-0">
                  <p className="text-[0.5rem] font-medium tracking-[0.25em] uppercase text-white/30 mb-1">{f.label}</p>
                  <p className="text-sm font-serif font-light text-white/70">{f.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Transition: Dark → Light ─── */}
      <SectionTransition from="dark" to="light" variant="diagonal" />

      {/* ═══════════════════════════════════════════════════════════ */}
      {/*  2. THE STORY — Editorial two-column                      */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section id="story" className="bg-[var(--bg)] section-pad">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Left — Image with rotating badge */}
            <div className="lg:col-span-7">
              <MaskReveal direction="up">
                <div className="relative">
                  <div className="aspect-[16/10] overflow-hidden group">
                    <img
                      src="/images/about-factory.jpg"
                      alt="Prime Ceramics manufacturing facility"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)]"
                    />
                  </div>

                  {/* Rotating badge */}
                  <div className="absolute -right-4 -bottom-4 md:-right-6 md:-bottom-6 w-24 h-24 md:w-32 md:h-32 bg-[var(--bg)] rounded-full flex items-center justify-center shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-[var(--ink-faint)]/30 z-10">
                    <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 140 140">
                      <defs><path id="aboutBadgePath" d="M 70,70 m -48,0 a 48,48 0 1,1 96,0 a 48,48 0 1,1 -96,0" /></defs>
                      <text className="fill-[var(--ink-muted)]" style={{ fontSize: "9.5px", fontWeight: 500, letterSpacing: "0.3em", textTransform: "uppercase" }}>
                        <textPath href="#aboutBadgePath">Experience In Industry &bull; Experience In Industry &bull;&nbsp;</textPath>
                      </text>
                    </svg>
                    <div className="text-center z-10">
                      <p className="font-serif font-light text-[var(--ink)] leading-none" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}>4+</p>
                      <p className="text-[0.5rem] font-semibold tracking-[0.25em] uppercase text-[var(--ink-light)] mt-1">Years</p>
                    </div>
                  </div>
                </div>
              </MaskReveal>
            </div>

            {/* Right — Narrative */}
            <div className="lg:col-span-5 lg:pt-4">
              <FadeIn>
                <p className="eyebrow text-[var(--accent)] mb-4">Our Story</p>
              </FadeIn>
              <FadeIn delay={0.08}>
                <h2 className="h2 text-[var(--ink)] mb-6">
                  Nepal&apos;s First.<br />Nepal&apos;s Finest.
                </h2>
              </FadeIn>
              <FadeIn delay={0.12}>
                <div className="w-10 h-[1.5px] bg-[var(--accent)] mb-8" />
              </FadeIn>
              <FadeIn delay={0.16}>
                <p className="body-lg text-[var(--ink-light)] mb-6 max-w-md">
                  Established in 2021, Prime Ceramics is Nepal&apos;s only facility equipped
                  to manufacture both floor and wall tiles — powered by Italian SACMI
                  technology with an annual capacity of 4 million square meters.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="body-lg text-[var(--ink-light)] mb-10 max-w-md">
                  Promoted by CMS and Fortune Ventures — two of Nepal&apos;s most
                  respected business houses with over two decades of excellence — we
                  achieved the highest sales volume among all tile manufacturers in
                  Nepal for FY 2023–24.
                </p>
              </FadeIn>

              {/* Compact stats */}
              <FadeIn delay={0.24}>
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[var(--accent)]/15">
                  {[
                    { n: "4M", l: "Sq m / Year" },
                    { n: "120+", l: "Dealers" },
                    { n: "₹3B", l: "Investment" },
                  ].map((s) => (
                    <div key={s.l}>
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

      {/* ═══════════════════════════════════════════════════════════ */}
      {/*  3. IMPACT NUMBERS — Ledger-style                         */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[var(--bg-alt)] section-pad-sm">
        <div className="container">
          <div className="space-y-0">
            {aboutStats.map((stat, i) => (
              <FadeIn key={stat.label} direction="up" delay={i * 0.08}>
                <div className="flex items-baseline gap-4 md:gap-8 py-6 border-b border-[var(--ink)]/6 last:border-0">
                  <p className="font-serif font-light text-[var(--ink)] leading-none shrink-0" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
                    {stat.prefix && <span className="text-[var(--ink-muted)]" style={{ fontSize: "60%" }}>{stat.prefix}</span>}
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </p>
                  <div className="flex-1 h-[1px] bg-[var(--ink)]/8 hidden md:block" />
                  <div className="text-right shrink-0">
                    <p className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-[var(--ink)]">{stat.label}</p>
                    <p className="text-[0.55rem] text-[var(--ink-muted)] mt-1">{stat.sub}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/*  4. THE CRAFT — Cinematic image + process steps           */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[var(--bg)] section-pad">
        <div className="container">
          {/* Split header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end mb-12 md:mb-16">
            <div>
              <FadeIn>
                <p className="eyebrow text-[var(--accent)] mb-4">The Prime Process</p>
              </FadeIn>
              <SplitHeading as="h2" className="h2 text-[var(--ink)]">
                Art Meets Engineering
              </SplitHeading>
            </div>
            <FadeIn delay={0.15}>
              <p className="body-lg text-[var(--ink-light)] max-w-md lg:text-right">
                Italian SACMI technology. 1200°C+ precision firing.
                Every surface engineered for permanence.
              </p>
            </FadeIn>
          </div>

          {/* Full-width factory image */}
          <MaskReveal direction="up">
            <div className="aspect-[2/1] md:aspect-[21/9] overflow-hidden img-gs mb-12 md:mb-16">
              <img
                src="/images/about-factory.jpg"
                alt="Prime Ceramics factory"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </MaskReveal>

          {/* 4 craft steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {craftSteps.map((step, i) => (
              <FadeIn key={step.num} direction="up" delay={i * 0.1}>
                <div className="relative border-t border-[var(--ink)]/8 pt-8 pb-8 lg:px-6 first:lg:pl-0 last:lg:pr-0 lg:border-t-0 lg:border-l lg:first:border-l-0">
                  <p className="font-serif font-light text-[var(--ink)]/[0.05] leading-none absolute top-4 lg:top-0 right-0 lg:right-4 select-none pointer-events-none" style={{ fontSize: "5rem" }}>
                    {step.num}
                  </p>
                  <div className="relative z-10">
                    <p className="text-[0.55rem] font-medium tracking-[0.25em] uppercase text-[var(--accent)] mb-4">
                      Step {step.num}
                    </p>
                    <h3 className="h3 text-[var(--ink)] mb-4">{step.title}</h3>
                    <p className="body-sm text-[var(--ink-light)] max-w-[240px]">{step.text}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Transition: Light → Dark ─── */}
      <SectionTransition from="light" to="dark" variant="wave" />

      {/* ═══════════════════════════════════════════════════════════ */}
      {/*  5. VISION + TIMELINE — Split layout                      */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[var(--bg-dark)] section-pad relative overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-16 lg:gap-20">
            {/* Left — Vision quote */}
            <div className="flex flex-col justify-center">
              <FadeIn direction="left" distance={30}>
                <div className="relative">
                  <span
                    className="absolute -top-10 -left-4 font-serif text-[var(--accent)]/[0.08] leading-none select-none pointer-events-none"
                    style={{ fontSize: "8rem" }}
                    aria-hidden="true"
                  >
                    {"\u201C"}
                  </span>
                  <blockquote className="border-l-2 border-[var(--accent)]/30 pl-8">
                    <p className="h3 font-serif italic text-[var(--ink-on-dark)] leading-[1.4]">
                      &ldquo;{visionQuote}&rdquo;
                    </p>
                  </blockquote>
                  <div className="pl-8 mt-8">
                    <div className="w-8 h-[1px] bg-[var(--accent)]/40 mb-4" />
                    {promoters.map((p) => (
                      <p key={p.name} className="text-[0.6rem] font-medium tracking-[0.15em] uppercase text-[var(--ink-on-dark-light)]/60 mb-1">
                        {p.name} — {p.role}
                      </p>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right — Timeline */}
            <div>
              <FadeIn>
                <p className="eyebrow text-[var(--accent-light)] mb-10">Our Journey</p>
              </FadeIn>
              <div className="space-y-0">
                {milestones.map((m, i) => (
                  <FadeIn key={m.year} direction="up" delay={i * 0.1}>
                    <div className="flex gap-6 md:gap-8 py-6 border-b border-white/6 last:border-0">
                      <p className="font-serif font-light text-[var(--accent-light)] leading-none shrink-0 w-16 md:w-20" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}>
                        {m.year}
                      </p>
                      <div>
                        <p className="text-[0.65rem] font-medium tracking-[0.1em] uppercase text-white mb-2">{m.title}</p>
                        <p className="body-sm text-white/40 max-w-sm">{m.description}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/*  6. SPIRIT COLLECTION — Full-bleed showcase               */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[var(--bg-dark)] overflow-hidden">
        <div className="container section-pad pb-0">
          <div className="text-center mb-12 md:mb-16">
            <FadeIn>
              <p className="eyebrow text-[var(--accent-light)] mb-4">Heritage Collection</p>
            </FadeIn>
            <SplitHeading as="h2" className="h2 text-white">
              Spirit of Nepal
            </SplitHeading>
            <FadeIn delay={0.15}>
              <p className="body-lg text-white/40 max-w-lg mx-auto mt-6">
                Tiles that carry the soul of our land — from the serene plains of Lumbini
                to the rugged peaks of the Himalayas.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Edge-to-edge grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[3px]">
          {spiritItems.map((item, i) => (
            <FadeIn key={item.name} direction="up" delay={i * 0.12}>
              <div className="group relative overflow-hidden cursor-pointer">
                <div className="aspect-[3/4] img-gs">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="text-[0.55rem] font-medium tracking-[0.25em] uppercase text-[var(--accent-light)] mb-2">
                    {item.type} &middot; {item.size}
                  </p>
                  <h3 className="text-white font-serif text-xl md:text-2xl font-light">{item.name}</h3>
                  <p className="text-white/40 text-sm mt-2 max-w-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">{item.desc}</p>
                </div>
                <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/40 group-hover:text-white group-hover:bg-[var(--accent)]/80 transition-all duration-500">
                  <MoveUpRight size={16} />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="container py-10">
          <FadeIn delay={0.3}>
            <div className="text-center">
              <a href="/catalog?collection=spirit-of-nepal" className="link-arrow text-white/50 hover:text-[var(--accent-light)]">
                Explore Collection
                <ArrowRight size={14} />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Transition: Dark → Light ─── */}
      <SectionTransition from="dark" to="light" variant="diagonal" />

      {/* ═══════════════════════════════════════════════════════════ */}
      {/*  7. TRUST — Certs + Testimonial + Clients                 */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[var(--bg-alt)] section-pad overflow-hidden">
        <div className="container">
          {/* Certifications */}
          <FadeIn>
            <p className="eyebrow text-[var(--ink-muted)] mb-10 md:mb-12 text-center">Certifications &amp; Partners</p>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-20">
            {certifications.map((cert, i) => {
              const Icon = certIconMap[cert.icon];
              return (
                <FadeIn key={cert.name} direction="up" delay={i * 0.08}>
                  <div className="text-center py-6 px-4 border border-[var(--ink)]/6 hover:border-[var(--accent)]/20 transition-colors duration-300">
                    <div className="w-10 h-10 mx-auto mb-4 flex items-center justify-center text-[var(--accent)]">
                      {Icon && <Icon size={22} strokeWidth={1.5} />}
                    </div>
                    <p className="body-sm font-medium text-[var(--ink)] mb-1">{cert.name}</p>
                    <p className="text-[0.6rem] text-[var(--ink-muted)]">{cert.label}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* Testimonial */}
          <FadeIn direction="up">
            <div className="max-w-2xl mx-auto text-center mb-16 md:mb-20">
              <div className="w-10 h-[1px] bg-[var(--accent)]/30 mx-auto mb-8" />
              <p className="h3 font-serif italic text-[var(--ink)] leading-[1.5] mb-8">
                &ldquo;{bestTestimonial.quote}&rdquo;
              </p>
              <p className="text-[0.65rem] font-medium tracking-[0.15em] uppercase text-[var(--ink)] mb-1">
                {bestTestimonial.author}
              </p>
              <p className="text-[0.6rem] text-[var(--ink-muted)]">{bestTestimonial.role}</p>
            </div>
          </FadeIn>

          {/* Client logos */}
          <FadeIn>
            <p className="eyebrow text-[var(--ink-muted)] mb-8 text-center">Trusted By</p>
          </FadeIn>
          <FadeIn direction="none" delay={0.1}>
            <div className="relative w-full">
              <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-[var(--bg-alt)] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-[var(--bg-alt)] to-transparent z-10 pointer-events-none" />
              <div className="flex items-center gap-8 md:gap-14 animate-trust-marquee">
                {[...clients, ...clients, ...clients].map((c, i) => (
                  <div key={`${c.name}-${i}`} className="flex items-center justify-center flex-shrink-0 w-[160px] md:w-[200px] h-[80px] md:h-[100px] group">
                    <div className="grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
                      <Image src={c.logo} alt={c.name} width={c.width} height={c.height} className="object-contain max-h-[50px] md:max-h-[60px] w-auto" unoptimized />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/*  8. CTA — "Tiles with Stile."                             */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[var(--bg)] section-pad-lg">
        <div className="container text-center">
          <FadeIn>
            <p className="display text-[var(--ink)] mb-6">
              Tiles with Stile.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="body-lg text-[var(--ink-light)] max-w-md mx-auto mb-10">
              Visit our showrooms or connect with a dealer near you.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a href="/dealers" className="btn-fill group">
                Visit Showroom
                <ArrowRight size={14} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="/dealers" className="btn-line group">
                Find Dealer
                <ArrowRight size={14} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
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
