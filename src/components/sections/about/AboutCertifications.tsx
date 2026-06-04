"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";
import TextRevealByWord from "@/components/animations/TextRevealByWord";
import FadeIn from "@/components/animations/FadeIn";
import { ArrowRight, ShieldCheck, Leaf, BadgeCheck, Cog } from "lucide-react";
import { certifications } from "@/data/about";

const certIconMap: Record<string, typeof ShieldCheck> = { ShieldCheck, Leaf, BadgeCheck, Cog };

export default function AboutCertifications() {
  return (
    <section id="about-certs" className="bg-surface section-pad">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-start" style={{ gap: "clamp(40px, 5vw, 64px)" }}>
          <div className="lg:col-span-5">
            <ScrollReveal from={{ y: 30, opacity: 0 }} to={{ y: 0, opacity: 1 }}>
              <div className="flex items-center gap-4" style={{ marginBottom: "16px" }}>
                <div className="w-10 h-px bg-accent" />
                <p className="eyebrow text-accent">Quality Assurance</p>
              </div>
            </ScrollReveal>
            <div style={{ marginBottom: "24px" }}>
              <TextRevealByWord as="h2" className="h2 text-ink" scrub={false}>
                Certified for Excellence
              </TextRevealByWord>
            </div>
            <FadeIn delay={0.15}>
              <p className="body-lg text-ink-light" style={{ marginBottom: "48px" }}>
                International standards that guarantee every Prime tile meets
                the highest benchmarks of quality, safety, and consistency.
                From ISO certification to Nepal Bureau of Standards approval.
              </p>
            </FadeIn>
            <FadeIn delay={0.22}>
              <a href="/about/awards" className="link-arrow text-accent hover:text-accent-hover">
                View All Awards &amp; Certifications <ArrowRight size={14} />
              </a>
            </FadeIn>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "24px" }}>
              {certifications.map((cert, i) => {
                const Icon = certIconMap[cert.icon];
                return (
                  <ScrollReveal key={cert.name} from={{ y: 30, opacity: 0, rotateY: 8 }} to={{ y: 0, opacity: 1, rotateY: 0 }} start="top 90%" end="top 55%">
                    <div className="luxury-card group" style={{ padding: "clamp(24px, 3vw, 40px)", perspective: "600px" }}>
                      <div className="w-11 h-11 rounded-full border border-accent/15 bg-accent/[0.05] flex items-center justify-center text-accent group-hover:border-accent/30 group-hover:bg-accent/[0.1] transition-all duration-300" style={{ marginBottom: "24px" }}>
                        {Icon && <Icon size={18} strokeWidth={1.5} />}
                      </div>
                      <p className="body-sm font-medium text-ink" style={{ marginBottom: "8px" }}>{cert.name}</p>
                      <p className="text-[0.6rem] text-ink-muted" style={{ marginBottom: "16px" }}>{cert.label}</p>
                      {cert.context && (
                        <p className="text-[0.7rem] text-ink-light leading-[1.7]">{cert.context}</p>
                      )}
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
