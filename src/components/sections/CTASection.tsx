"use client";

import FadeIn from "@/components/animations/FadeIn";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

export default function CTASection() {
  return (
    <section id="contact" className="bg-[var(--bg)] relative overflow-hidden">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--ink) 1px, transparent 1px),
            linear-gradient(to bottom, var(--ink) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Accent top line */}
      <div className="container relative z-10">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />
      </div>

      {/* Main CTA */}
      <div className="container relative z-10 py-24 md:py-32 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left — Message */}
          <div>
            <FadeIn>
              <p className="text-[0.6rem] font-medium tracking-[0.35em] uppercase text-[var(--accent)] mb-6">
                Start Your Project
              </p>
            </FadeIn>

            <FadeIn delay={0.08}>
              <h2
                className="font-serif font-light text-[var(--ink)] leading-[1.05] mb-6"
                style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}
              >
                Ready to transform<br />
                <span className="text-[var(--accent)]">your space?</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.14}>
              <p className="text-[0.95rem] text-[var(--ink-light)] max-w-md leading-relaxed mb-10">
                Whether you&apos;re an architect, designer, or homeowner — our
                team is here to help you find the perfect surface.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex flex-wrap items-center gap-5">
                <a
                  href="mailto:sales@primeceramics.com.np?subject=Quote%20Request"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-[var(--accent)] text-white text-[0.7rem] font-medium tracking-[0.15em] uppercase hover:bg-[var(--accent-hover)] transition-all duration-500 hover:shadow-[0_4px_20px_rgba(139,101,66,0.25)]"
                >
                  Request a Quote
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href="/catalog"
                  className="group inline-flex items-center gap-3 px-8 py-4 border border-[var(--ink)]/12 text-[var(--ink)] text-[0.7rem] font-medium tracking-[0.15em] uppercase hover:border-[var(--accent)]/40 hover:text-[var(--accent)] transition-all duration-500"
                >
                  View Catalogue
                  <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right — Contact cards */}
          <div>
            <FadeIn delay={0.25}>
              <div className="space-y-0">
                {/* Phone */}
                <a
                  href="tel:+977-1-5978860"
                  className="group flex items-center gap-5 py-6 border-b border-[var(--ink)]/8 hover:border-[var(--accent)]/30 transition-colors duration-300"
                >
                  <div className="w-12 h-12 border border-[var(--ink)]/10 flex items-center justify-center shrink-0 group-hover:border-[var(--accent)]/40 transition-colors duration-300">
                    <Phone size={18} strokeWidth={1.5} className="text-[var(--accent)]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[0.5rem] font-medium tracking-[0.25em] uppercase text-[var(--ink-muted)] mb-1">Phone</p>
                    <p className="text-[var(--ink)] font-serif font-light text-lg group-hover:text-[var(--accent)] transition-colors duration-300">
                      +977-1-5978860/61/62
                    </p>
                  </div>
                  <ArrowRight size={14} className="text-transparent group-hover:text-[var(--ink-muted)] transition-colors duration-300" />
                </a>

                {/* Email */}
                <a
                  href="mailto:info@primeceramics.com.np"
                  className="group flex items-center gap-5 py-6 border-b border-[var(--ink)]/8 hover:border-[var(--accent)]/30 transition-colors duration-300"
                >
                  <div className="w-12 h-12 border border-[var(--ink)]/10 flex items-center justify-center shrink-0 group-hover:border-[var(--accent)]/40 transition-colors duration-300">
                    <Mail size={18} strokeWidth={1.5} className="text-[var(--accent)]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[0.5rem] font-medium tracking-[0.25em] uppercase text-[var(--ink-muted)] mb-1">Email</p>
                    <p className="text-[var(--ink)] font-serif font-light text-lg group-hover:text-[var(--accent)] transition-colors duration-300">
                      info@primeceramics.com.np
                    </p>
                  </div>
                  <ArrowRight size={14} className="text-transparent group-hover:text-[var(--ink-muted)] transition-colors duration-300" />
                </a>

                {/* Toll Free */}
                <a
                  href="tel:18105000062"
                  className="group flex items-center gap-5 py-6 border-b border-[var(--ink)]/8 hover:border-[var(--accent)]/30 transition-colors duration-300"
                >
                  <div className="w-12 h-12 border border-[var(--ink)]/10 flex items-center justify-center shrink-0 group-hover:border-[var(--accent)]/40 transition-colors duration-300">
                    <Phone size={18} strokeWidth={1.5} className="text-[var(--accent)]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[0.5rem] font-medium tracking-[0.25em] uppercase text-[var(--ink-muted)] mb-1">Toll Free</p>
                    <p className="text-[var(--ink)] font-serif font-light text-lg group-hover:text-[var(--accent)] transition-colors duration-300">
                      1810 500 0062
                    </p>
                  </div>
                  <ArrowRight size={14} className="text-transparent group-hover:text-[var(--ink-muted)] transition-colors duration-300" />
                </a>

                {/* Office */}
                <div className="flex items-center gap-5 py-6">
                  <div className="w-12 h-12 border border-[var(--ink)]/10 flex items-center justify-center shrink-0">
                    <MapPin size={18} strokeWidth={1.5} className="text-[var(--accent)]" />
                  </div>
                  <div>
                    <p className="text-[0.5rem] font-medium tracking-[0.25em] uppercase text-[var(--ink-muted)] mb-1">Corporate Office</p>
                    <p className="text-[var(--ink)] font-serif font-light text-lg">
                      Level 4, Saket Complex, Tripureshwor
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
