"use client";

import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SectionTransition from "@/components/ui/SectionTransition";
import FadeIn from "@/components/animations/FadeIn";
import SplitHeading from "@/components/animations/SplitHeading";
import { certifications } from "@/data/about";
import { ShieldCheck, Leaf, BadgeCheck, Cog, ArrowRight, Award, Trophy, Star } from "lucide-react";

const certIconMap: Record<string, typeof ShieldCheck> = { ShieldCheck, Leaf, BadgeCheck, Cog };

const awards = [
  {
    title: "Highest Sales Volume",
    year: "2023–24",
    description: "Achieved the highest sales volume among all tile manufacturers in Nepal for FY 2023–24.",
    icon: Trophy,
  },
  {
    title: "First Wall & Floor Manufacturer",
    year: "2021",
    description: "Nepal's first and only facility equipped to manufacture both wall and floor tiles.",
    icon: Award,
  },
  {
    title: "SACMI Technology Partner",
    year: "2022",
    description: "Official technology partner with Italy's SACMI — the world leader in ceramic machinery.",
    icon: Star,
  },
];

export default function AwardsPage() {
  return (
    <SmoothScroll>
      <Header />

      <main id="main-content">
        {/* ═══ Hero ═══ */}
        <section className="bg-[var(--bg-dark)] pt-32 md:pt-40 pb-16 md:pb-20">
          <div className="container">
            <FadeIn>
              <p className="eyebrow text-[var(--accent-light)] mb-4">About Prime Ceramics</p>
            </FadeIn>
            <SplitHeading as="h1" className="h1 text-[var(--ink-on-dark)] mb-6">
              Awards &amp; Certification
            </SplitHeading>
            <FadeIn delay={0.15}>
              <p className="body-lg text-[var(--ink-on-dark-light)] max-w-lg">
                Recognized for quality, innovation, and manufacturing excellence
                across Nepal and beyond.
              </p>
            </FadeIn>
          </div>
        </section>

        <SectionTransition from="dark" to="light" variant="diagonal" />

        {/* ═══ Awards ═══ */}
        <section className="bg-[var(--bg)] section-pad">
          <div className="container">
            <FadeIn>
              <p className="eyebrow text-[var(--accent)] mb-4">Recognition</p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h2 className="h2 text-[var(--ink)] mb-12 md:mb-16">
                Milestones of Excellence
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {awards.map((award, i) => {
                const Icon = award.icon;
                return (
                  <FadeIn key={award.title} direction="up" delay={i * 0.1}>
                    <div className="border border-[var(--ink)]/8 p-8 hover:border-[var(--accent)]/20 transition-colors duration-300 h-full flex flex-col">
                      <div className="w-12 h-12 flex items-center justify-center text-[var(--accent)] mb-6">
                        <Icon size={28} strokeWidth={1.5} />
                      </div>
                      <p className="eyebrow text-[var(--ink-muted)] mb-4">{award.year}</p>
                      <h3 className="h3 text-[var(--ink)] mb-4">{award.title}</h3>
                      <p className="body-sm text-[var(--ink-light)] mt-auto">{award.description}</p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ Certifications ═══ */}
        <section className="bg-[var(--bg-alt)] section-pad">
          <div className="container">
            <FadeIn>
              <p className="eyebrow text-[var(--accent)] mb-4">Quality Standards</p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h2 className="h2 text-[var(--ink)] mb-6">
                Certified for Excellence
              </h2>
            </FadeIn>
            <FadeIn delay={0.12}>
              <p className="body-lg text-[var(--ink-light)] max-w-lg mb-12 md:mb-16">
                Our manufacturing processes meet the highest international standards,
                ensuring every tile delivers on quality, safety, and environmental responsibility.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, i) => {
                const Icon = certIconMap[cert.icon];
                return (
                  <FadeIn key={cert.name} direction="up" delay={i * 0.1}>
                    <div className="bg-[var(--bg)] border border-[var(--ink)]/6 p-8 hover:border-[var(--accent)]/20 hover:shadow-[var(--shadow-sm)] transition-all duration-300 text-center">
                      <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center rounded-full bg-[var(--accent)]/5 text-[var(--accent)]">
                        {Icon && <Icon size={26} strokeWidth={1.5} />}
                      </div>
                      <h3 className="h3 text-[var(--ink)] mb-2">{cert.name}</h3>
                      <p className="body-sm text-[var(--ink-light)]">{cert.label}</p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>

            <FadeIn delay={0.4}>
              <p className="body-sm text-[var(--ink-muted)] text-center mt-10 italic">
                Certification logos will be updated with official badges.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="bg-[var(--bg)] section-pad-lg">
          <div className="container text-center">
            <FadeIn>
              <h2 className="h2 text-[var(--ink)] mb-6">
                Experience Our Quality
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="body-lg text-[var(--ink-light)] max-w-md mx-auto mb-10">
                Visit a showroom to see and feel the difference that certified
                manufacturing makes.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="flex flex-wrap items-center justify-center gap-6">
                <a href="/dealers" className="btn-fill group">
                  Find a Showroom
                  <ArrowRight size={14} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a href="/about" className="btn-line group">
                  Company Information
                  <ArrowRight size={14} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        <SectionTransition from="light" to="dark" variant="wave" />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
