"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SectionTransition from "@/components/ui/SectionTransition";
import FadeIn from "@/components/animations/FadeIn";
import SplitHeading from "@/components/animations/SplitHeading";
import MaskReveal from "@/components/animations/MaskReveal";
import CountUp from "@/components/animations/CountUp";
import { awardsData, certificationsData } from "@/data/about";
import {
  ShieldCheck,
  BadgeCheck,
  Globe,
  Fingerprint,
  Building2,
  Trophy,
  ArrowRight,
  X,
  ZoomIn,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const certIconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  BadgeCheck,
  Globe,
  Fingerprint,
  Building2,
  Trophy,
};

const featuredAward = awardsData[0];

/* ── Certificate Lightbox ── */
function CertLightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  // Lock body scroll while lightbox is open
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-sm cursor-pointer"
      onClick={onClose}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-5 right-5 z-[10000] w-11 h-11 flex items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 transition-colors duration-300 cursor-pointer"
        aria-label="Close lightbox"
      >
        <X size={22} strokeWidth={2} />
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="max-w-[92vw] max-h-[90vh] w-auto h-auto object-contain rounded-sm shadow-2xl cursor-default"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

/* ── Awards Hero — Parallax, bottom-weighted ── */
function AwardsHero({ onCertClick }: { onCertClick: (src: string, alt: string) => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const rafId = useRef(0);

  const handleScroll = useCallback(() => {
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      if (rect.bottom > 0 && rect.top < viewH) {
        setOffset(((viewH - rect.top) / (viewH + rect.height) - 0.5) * 40);
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [handleScroll]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-surface-dark"
      style={{ minHeight: "55vh", maxHeight: "80vh", height: "70vh" }}
    >
      {/* Parallax background — factory image */}
      <img
        src="/images/factory.jpg"
        alt=""
        aria-hidden="true"
        loading="eager"
        className="absolute inset-0 w-full h-[120%] object-cover will-change-transform"
        style={{ transform: `translateY(${offset}px)`, filter: "brightness(0.35) saturate(0.8)" }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

      {/* Content — left-aligned, bottom-weighted */}
      <div className="container relative z-10 h-full flex flex-col justify-end" style={{ paddingBottom: "clamp(80px, 8vw, 120px)" }}>
        <FadeIn>
          <p className="eyebrow text-accent-light" style={{ marginBottom: "16px" }}>
            Awards &amp; Certifications
          </p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h1 className="h1 text-white max-w-2xl" style={{ marginBottom: "24px" }}>
            Built on Trust,<br />
            <span className="text-white/65">Certified for the World</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.14}>
          <p className="body-lg text-white/50 max-w-lg leading-relaxed" style={{ marginBottom: "40px" }}>
            From Nepal&rsquo;s highest customs revenue award to international ISO
            and SASO certifications — every credential represents our unwavering
            commitment to excellence.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <a href="#certifications" className="link-arrow text-white/80 hover:text-white">
              View Certifications <ArrowRight size={12} />
            </a>
            <div style={{ height: "16px", width: "1px", background: "rgba(255,255,255,0.2)" }} />
            <span className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-white/35">
              <CountUp target={6} /> Certifications &middot; 3 Int&rsquo;l Standards
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default function AwardsPage() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  return (
    <SmoothScroll>
      <Header />

      {lightbox && (
        <CertLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}

      <main id="main-content">
        {/* ═══════════════════════════════════════════
            Section 1 — HERO (Parallax, Cinematic)
        ═══════════════════════════════════════════ */}
        <AwardsHero onCertClick={(src, alt) => setLightbox({ src, alt })} />

        <SectionTransition from="dark" to="light" variant="diagonal" />

        {/* ═══════════════════════════════════════════
            Section 2 — FEATURED AWARD (Light)
            Customs Award — Dramatic Showcase
        ═══════════════════════════════════════════ */}
        <section className="bg-surface" style={{ padding: "clamp(100px, 12vw, 180px) 0" }}>
          <div className="container">
            {/* Section header */}
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <FadeIn>
                <p className="eyebrow text-accent" style={{ marginBottom: "16px", textAlign: "center" }}>Government Recognition</p>
              </FadeIn>
              <FadeIn delay={0.08}>
                <h2 className="h2 text-ink" style={{ marginBottom: "16px", textAlign: "center" }}>
                  Nepal&rsquo;s Highest Revenue Contributor
                </h2>
              </FadeIn>
              <FadeIn delay={0.12}>
                <p className="text-[0.7rem] font-medium tracking-[0.15em] uppercase text-accent" style={{ textAlign: "center" }}>
                  74th International Customs Day &middot; Fiscal Year 2081/82
                </p>
              </FadeIn>
            </div>

            {/* Award showcase — certificate on dark bg with flanking details */}
            <FadeIn delay={0.15}>
              <div className="relative bg-surface-dark rounded-sm overflow-hidden">
                {/* Ambient glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 50%, rgba(181,138,82,0.08) 0%, transparent 60%)",
                  }}
                />

                <div className="relative grid grid-cols-1 lg:grid-cols-12 items-center">
                  {/* Left — details */}
                  <div className="lg:col-span-4 order-2 lg:order-1" style={{ padding: "clamp(40px, 5vw, 64px)" }}>
                    <FadeIn delay={0.2} direction="right">
                      <div className="flex items-center" style={{ gap: "12px", marginBottom: "24px" }}>
                        <div className="w-10 h-10 flex items-center justify-center rounded-full border border-accent/20 bg-accent/5">
                          <Trophy size={18} strokeWidth={1.5} className="text-accent-light" />
                        </div>
                        <p className="text-[0.6rem] font-medium tracking-[0.25em] uppercase text-accent-light">
                          Award of Excellence
                        </p>
                      </div>

                      <p className="body-lg text-ink-on-dark-light" style={{ marginBottom: "32px" }}>
                        {featuredAward.description}
                      </p>

                      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <div className="border-t border-accent/10" style={{ paddingTop: "16px" }}>
                          <p className="text-[0.55rem] font-medium tracking-[0.25em] uppercase text-ink-on-dark-muted" style={{ marginBottom: "4px" }}>
                            Date Awarded
                          </p>
                          <p className="body-sm text-ink-on-dark font-medium">{featuredAward.date}</p>
                        </div>
                        <div className="border-t border-accent/10" style={{ paddingTop: "16px" }}>
                          <p className="text-[0.55rem] font-medium tracking-[0.25em] uppercase text-ink-on-dark-muted" style={{ marginBottom: "4px" }}>
                            Issuing Authority
                          </p>
                          <p className="body-sm text-ink-on-dark font-medium">Gaur Customs Office</p>
                          <p className="body-sm text-ink-on-dark-light">Dept of Customs, Government of Nepal</p>
                        </div>
                        <div className="border-t border-accent/10" style={{ paddingTop: "16px" }}>
                          <p className="text-[0.55rem] font-medium tracking-[0.25em] uppercase text-ink-on-dark-muted" style={{ marginBottom: "4px" }}>
                            EXIM Code
                          </p>
                          <p className="body-sm text-ink-on-dark font-medium">6049188450125NP</p>
                        </div>
                      </div>
                    </FadeIn>
                  </div>

                  {/* Center — Certificate image, elevated */}
                  <div className="lg:col-span-4 flex justify-center order-1 lg:order-2" style={{ padding: "clamp(32px, 4vw, 48px)" }}>
                    <FadeIn delay={0.1} direction="up">
                      <div
                        className="relative group cursor-pointer"
                        onClick={() =>
                          setLightbox({
                            src: featuredAward.image,
                            alt: featuredAward.title,
                          })
                        }
                      >
                        {/* Gold frame effect */}
                        <div className="absolute -inset-3 border border-accent/15 rounded-sm" />
                        <div className="absolute -inset-1.5 border border-accent/8 rounded-sm" />

                        <div className="relative overflow-hidden rounded-sm shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
                          <Image
                            src={featuredAward.image}
                            alt={featuredAward.title}
                            width={400}
                            height={560}
                            className="w-full max-w-[320px] h-auto transition-transform duration-700 group-hover:scale-[1.02]"
                            unoptimized
                          />
                        </div>

                        {/* Zoom hint */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-11 h-11 flex items-center justify-center rounded-full bg-white/90 text-ink shadow-xl">
                            <ZoomIn size={18} strokeWidth={1.5} />
                          </div>
                        </div>

                        {/* Rotating badge */}
                        <div className="absolute -right-4 -bottom-4 w-20 h-20 md:w-24 md:h-24 bg-surface-dark rounded-full flex items-center justify-center shadow-[0_8px_40px_rgba(0,0,0,0.3)] border border-accent/20 z-10">
                          <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 140 140">
                            <defs>
                              <path id="awardBadgePath" d="M 70,70 m -48,0 a 48,48 0 1,1 96,0 a 48,48 0 1,1 -96,0" />
                            </defs>
                            <text
                              className="fill-accent-light"
                              style={{ fontSize: "9px", fontWeight: 500, letterSpacing: "0.3em", textTransform: "uppercase" }}
                            >
                              <textPath href="#awardBadgePath">
                                Government Award &bull; Nepal &bull;&nbsp;
                              </textPath>
                            </text>
                          </svg>
                          <Trophy size={16} strokeWidth={1.5} className="text-accent-light z-10" />
                        </div>
                      </div>
                    </FadeIn>
                  </div>

                  {/* Right — decorative + quote */}
                  <div className="lg:col-span-4 order-3" style={{ padding: "clamp(40px, 5vw, 64px)" }}>
                    <FadeIn delay={0.25} direction="left">
                      <div className="relative">
                        {/* Large decorative quote mark */}
                        <span
                          className="absolute -top-6 -left-2 font-serif text-accent/[0.06] leading-none select-none pointer-events-none"
                          style={{ fontSize: "8rem" }}
                        >
                          &ldquo;
                        </span>

                        <blockquote className="relative">
                          <p className="font-serif font-light text-ink-on-dark leading-relaxed italic" style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)", marginBottom: "24px" }}>
                            This recognition from the Government of Nepal validates our commitment
                            to building a world-class manufacturing enterprise that contributes
                            meaningfully to the national economy.
                          </p>
                          <footer>
                            <div className="gold-divider" style={{ marginBottom: "16px" }} />
                            <p className="text-[0.6rem] font-medium tracking-[0.25em] uppercase text-accent-light">
                              Prime Ceramics Pvt. Ltd.
                            </p>
                            <p className="body-sm text-ink-on-dark-muted" style={{ marginTop: "4px" }}>
                              Brindavan Municipality, Rautahat
                            </p>
                          </footer>
                        </blockquote>
                      </div>
                    </FadeIn>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            Section 3 — QUALITY STANDARDS (Dark)
            ISO 9001 + NS Mark + SASO — with images
        ═══════════════════════════════════════════ */}
        <section className="relative bg-surface-dark overflow-hidden" style={{ padding: "clamp(100px, 12vw, 180px) 0" }}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(181,138,82,0.05) 0%, transparent 50%)",
            }}
          />
          <div className="container relative">
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <FadeIn>
                <p className="eyebrow text-accent-light" style={{ marginBottom: "16px", textAlign: "center" }}>Quality Standards</p>
              </FadeIn>
              <FadeIn delay={0.08}>
                <h2 className="h2 text-ink-on-dark" style={{ marginBottom: "24px", textAlign: "center" }}>
                  Certified for Excellence
                </h2>
              </FadeIn>
              <FadeIn delay={0.12}>
                <div className="gold-divider-center" style={{ marginBottom: "24px" }} />
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="body-lg text-ink-on-dark-light" style={{ maxWidth: "580px", marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                  International standards that guarantee every Prime tile meets the
                  highest benchmarks of quality, safety, and consistency.
                </p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "32px" }}>
              {certificationsData
                .filter((c) => ["quality", "national", "export"].includes(c.category))
                .map((cert, i) => {
                  const Icon = certIconMap[cert.icon];
                  return (
                    <FadeIn key={cert.name} direction="up" delay={i * 0.12}>
                      <div className="luxury-card-dark h-full flex flex-col overflow-hidden group" style={{ padding: "0" }}>
                        {/* Certificate image */}
                        <div
                          className="relative overflow-hidden cursor-pointer bg-white"
                          onClick={() => setLightbox({ src: cert.image, alt: cert.name })}
                        >
                          <Image
                            src={cert.image}
                            alt={cert.name}
                            width={400}
                            height={560}
                            className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.03]"
                            unoptimized
                          />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/15">
                            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white/90 text-ink shadow-lg">
                              <ZoomIn size={16} strokeWidth={1.5} />
                            </div>
                          </div>
                        </div>

                        {/* Card content */}
                        <div className="flex-1 flex flex-col" style={{ padding: "clamp(32px, 4vw, 48px)" }}>
                          <div className="flex items-center" style={{ gap: "12px", marginBottom: "16px" }}>
                            <div className="icon-circle shrink-0">
                              {Icon && <Icon size={16} strokeWidth={1.5} />}
                            </div>
                            <div>
                              <h3 className="text-ink-on-dark font-serif font-light text-lg leading-tight">
                                {cert.name}
                              </h3>
                              <p className="text-[0.6rem] font-medium tracking-[0.15em] uppercase text-accent-light">
                                {cert.label}
                              </p>
                            </div>
                          </div>

                          <div className="divider-dark" style={{ marginBottom: "16px" }} />

                          <div className="mt-auto" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <div className="flex justify-between">
                              <span className="text-[0.6rem] tracking-[0.15em] uppercase text-ink-on-dark-muted">
                                Issuing Body
                              </span>
                              <span className="body-sm text-ink-on-dark-light text-right max-w-[55%]">
                                {cert.issuingBody}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[0.6rem] tracking-[0.15em] uppercase text-ink-on-dark-muted">
                                Certificate
                              </span>
                              <span className="body-sm text-ink-on-dark-light">
                                #{cert.certificateNumber}
                              </span>
                            </div>
                            {cert.validFrom && cert.validTo && (
                              <div className="flex justify-between">
                                <span className="text-[0.6rem] tracking-[0.15em] uppercase text-ink-on-dark-muted">
                                  Valid
                                </span>
                                <span className="body-sm text-ink-on-dark-light">
                                  {cert.validFrom} — {cert.validTo}
                                </span>
                              </div>
                            )}
                          </div>

                          {cert.accreditation && (
                            <div className="border-t border-accent/10" style={{ marginTop: "20px", paddingTop: "16px" }}>
                              <p className="text-[0.55rem] font-medium tracking-[0.25em] uppercase text-accent-light text-center">
                                {cert.accreditation}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </FadeIn>
                  );
                })}
            </div>
          </div>
        </section>

        <SectionTransition from="dark" to="light" variant="wave" />

        {/* ═══════════════════════════════════════════
            Section 4 — BRAND & INDUSTRY (Light)
            Trademark + CNI — editorial alternating rows
        ═══════════════════════════════════════════ */}
        <section className="bg-surface" style={{ padding: "clamp(100px, 12vw, 180px) 0" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <FadeIn>
                <p className="eyebrow text-accent" style={{ marginBottom: "16px", textAlign: "center" }}>Brand &amp; Industry</p>
              </FadeIn>
              <FadeIn delay={0.08}>
                <h2 className="h2 text-ink" style={{ marginBottom: "24px", textAlign: "center" }}>
                  Recognized. Registered. Respected.
                </h2>
              </FadeIn>
              <FadeIn delay={0.12}>
                <p className="body-lg text-ink-light" style={{ maxWidth: "580px", marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                  From trademark protection to institutional membership, Prime Ceramics
                  is fully established in Nepal&rsquo;s industrial ecosystem.
                </p>
              </FadeIn>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
              {certificationsData
                .filter((c) => ["brand", "industry"].includes(c.category))
                .map((cert, i) => {
                  const Icon = certIconMap[cert.icon];
                  const isReversed = i % 2 !== 0;
                  return (
                    <FadeIn key={cert.name} direction="up" delay={0.1}>
                      <div className="grid grid-cols-1 lg:grid-cols-12 items-center" style={{ gap: "56px" }}>
                        {/* Certificate image */}
                        <div className={`lg:col-span-5 ${isReversed ? "lg:order-2" : ""}`}>
                          <div
                            className="relative group cursor-pointer"
                            onClick={() => setLightbox({ src: cert.image, alt: cert.name })}
                          >
                            <div className="bg-surface-alt rounded-sm border border-ink/5" style={{ padding: "clamp(24px, 3vw, 32px)" }}>
                              <Image
                                src={cert.image}
                                alt={cert.name}
                                width={600}
                                height={850}
                                className="w-full h-auto rounded-sm shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-transform duration-700 group-hover:scale-[1.02]"
                                style={{ maxWidth: "380px", marginLeft: "auto", marginRight: "auto", display: "block" }}
                                unoptimized
                              />
                            </div>
                            {/* Zoom overlay */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm">
                              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 text-ink shadow-lg">
                                <ZoomIn size={18} strokeWidth={1.5} />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Details */}
                        <div className={`lg:col-span-7 ${isReversed ? "lg:order-1" : ""}`}>
                          <div className="flex items-center" style={{ gap: "12px", marginBottom: "20px" }}>
                            <div className="icon-circle-lg">
                              {Icon && <Icon size={20} strokeWidth={1.5} />}
                            </div>
                            <div>
                              <h3 className="h3 text-ink leading-tight">{cert.name}</h3>
                              <p className="text-[0.65rem] font-medium tracking-[0.15em] uppercase text-accent">
                                {cert.label}
                              </p>
                            </div>
                          </div>

                          <p className="body-lg text-ink-light" style={{ marginBottom: "24px" }}>
                            {cert.scope}
                          </p>

                          <div className="gold-divider" style={{ marginBottom: "24px" }} />

                          <div className="grid grid-cols-2" style={{ columnGap: "32px", rowGap: "16px" }}>
                            <div>
                              <p className="text-[0.55rem] font-medium tracking-[0.2em] uppercase text-ink-muted" style={{ marginBottom: "4px" }}>
                                Issuing Body
                              </p>
                              <p className="body-sm text-ink font-medium">{cert.issuingBody}</p>
                            </div>
                            <div>
                              <p className="text-[0.55rem] font-medium tracking-[0.2em] uppercase text-ink-muted" style={{ marginBottom: "4px" }}>
                                Certificate No.
                              </p>
                              <p className="body-sm text-ink font-medium">{cert.certificateNumber}</p>
                            </div>
                            {cert.standard && (
                              <div>
                                <p className="text-[0.55rem] font-medium tracking-[0.2em] uppercase text-ink-muted" style={{ marginBottom: "4px" }}>
                                  Classification
                                </p>
                                <p className="body-sm text-ink font-medium">{cert.standard}</p>
                              </div>
                            )}
                            {cert.validFrom && cert.validTo && (
                              <div>
                                <p className="text-[0.55rem] font-medium tracking-[0.2em] uppercase text-ink-muted" style={{ marginBottom: "4px" }}>
                                  Validity
                                </p>
                                <p className="body-sm text-ink font-medium">
                                  {cert.validFrom} — {cert.validTo}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  );
                })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            Section 5 — TRUST NUMBERS (Alt)
        ═══════════════════════════════════════════ */}
        <section className="bg-surface-alt" style={{ padding: "clamp(80px, 10vw, 140px) 0" }}>
          <div className="container">
            <div style={{ borderTop: "1px solid rgba(181,138,82,0.12)", borderBottom: "1px solid rgba(181,138,82,0.12)", padding: "48px 0" }}>
              <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: "48px", textAlign: "center" }}>
                {[
                  { value: 6, suffix: "", label: "Active Certifications" },
                  { value: 3, suffix: "", label: "Countries Recognized" },
                  { value: 5, suffix: "+", label: "Years of Excellence" },
                  { value: 120, suffix: "+", label: "Nationwide Dealers" },
                ].map((stat, i) => (
                  <FadeIn key={stat.label} direction="up" delay={i * 0.1}>
                    <div>
                      <p
                        className="font-serif font-light text-accent leading-none"
                        style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", marginBottom: "12px" }}
                      >
                        <CountUp target={stat.value} suffix={stat.suffix} />
                      </p>
                      <p className="text-[0.6rem] font-medium tracking-[0.25em] uppercase text-ink-muted">
                        {stat.label}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            Section 6 — CTA (Dark)
        ═══════════════════════════════════════════ */}
        <section className="relative bg-surface-dark overflow-hidden" style={{ padding: "clamp(100px, 12vw, 180px) 0" }}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(181,138,82,0.06) 0%, transparent 60%)",
            }}
          />
          <div className="container relative" style={{ textAlign: "center" }}>
            <FadeIn>
              <p className="eyebrow text-accent-light" style={{ marginBottom: "16px", textAlign: "center" }}>Experience Our Quality</p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h2 className="h2 text-ink-on-dark" style={{ marginBottom: "24px", textAlign: "center" }}>
                See the Difference Certified Quality Makes
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="body-lg text-ink-on-dark-light" style={{ maxWidth: "500px", marginLeft: "auto", marginRight: "auto", marginBottom: "48px", textAlign: "center" }}>
                Visit a showroom to experience the precision, finish, and consistency
                that international certifications guarantee.
              </p>
            </FadeIn>
            <FadeIn delay={0.22}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "24px" }}>
                <a href="/dealers" className="btn-gold group">
                  Visit Showroom
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    style={{ marginLeft: "8px" }}
                  />
                </a>
                <a href="/about" className="btn-gold-outline group">
                  Company Information
                  <ArrowRight
                    size={14}
                    className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    style={{ marginLeft: "8px" }}
                  />
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        <SectionTransition from="dark" to="light" variant="mosaic" />
      </main>

      <Footer />

      <style jsx>{`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spinSlow 20s linear infinite;
        }
      `}</style>
    </SmoothScroll>
  );
}
