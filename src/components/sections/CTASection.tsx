"use client";

import FadeIn from "@/components/animations/FadeIn";
import { ArrowRight, Phone, Mail, Headphones } from "lucide-react";

export default function CTASection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{ padding: "clamp(80px, 10vw, 140px) 0", background: "var(--color-surface-dark-warm)" }}
    >
      {/* Primary radial glow — stronger, centered on heading */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 35%, rgba(181,138,82,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Secondary glow — subtle warmth at bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 90%, rgba(181,138,82,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="container relative z-10">
        <div style={{ maxWidth: "900px", marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>

          {/* Eyebrow */}
          <FadeIn>
            <p
              className="text-[0.65rem] font-medium tracking-[0.22em] uppercase"
              style={{ marginBottom: "20px", textAlign: "center", color: "var(--color-accent-light)" }}
            >
              Start Your Project
            </p>
          </FadeIn>

          {/* Heading */}
          <FadeIn delay={0.08}>
            <h2
              className="font-serif font-light"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.4rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                marginBottom: "28px",
                textAlign: "center",
                textWrap: "balance",
                color: "var(--color-ink-on-dark)",
              }}
            >
              Ready to Transform{" "}
              <span className="italic" style={{ color: "var(--color-accent-light)" }}>
                Your Space?
              </span>
            </h2>
          </FadeIn>

          {/* Animated accent line */}
          <FadeIn delay={0.1}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "28px" }}>
              <div style={{ width: "40px", height: "1px", background: "rgba(181,138,82,0.3)" }} />
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--color-accent)", opacity: 0.6 }} />
              <div style={{ width: "40px", height: "1px", background: "rgba(181,138,82,0.3)" }} />
            </div>
          </FadeIn>

          {/* Description */}
          <FadeIn delay={0.14}>
            <p
              style={{
                textAlign: "center",
                maxWidth: "520px",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "44px",
                textWrap: "balance",
                color: "var(--color-ink-on-dark-light)",
                fontSize: "clamp(0.9rem, 1.15vw, 1.05rem)",
                lineHeight: 1.7,
              }}
            >
              Whether you&apos;re an architect, designer, or homeowner — our
              team is here to help you find the perfect surface for every vision.
            </p>
          </FadeIn>

          {/* Buttons */}
          <FadeIn delay={0.2}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "20px" }}>
              <a
                href="mailto:sales@primeceramics.com.np?subject=Quote%20Request"
                className="btn-gold group"
              >
                Request a Quote
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a
                href="/catalog"
                className="btn-gold-outline group"
              >
                View Catalogue
                <ArrowRight
                  size={14}
                  className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                />
              </a>
            </div>
          </FadeIn>

          {/* Contact strip with icon circles */}
          <FadeIn delay={0.25}>
            <div style={{ marginTop: "56px", paddingTop: "40px", borderTop: "1px solid rgba(181,138,82,0.12)" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "40px",
                  textAlign: "center",
                }}
                className="max-sm:[grid-template-columns:1fr] max-sm:[gap:32px]"
              >
                {/* Phone */}
                <a href="tel:+977-1-5978860" className="group flex flex-col items-center">
                  <div
                    className="flex items-center justify-center group-hover:border-accent"
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      border: "1px solid rgba(181,138,82,0.2)",
                      marginBottom: "16px",
                      transition: "border-color 0.3s",
                    }}
                  >
                    <Phone size={16} style={{ color: "var(--color-accent)", opacity: 0.7 }} />
                  </div>
                  <p
                    className="text-[0.6rem] font-medium tracking-[0.18em] uppercase"
                    style={{ marginBottom: "8px", color: "var(--color-ink-on-dark-muted)" }}
                  >
                    Phone
                  </p>
                  <p
                    className="font-serif font-light group-hover:text-white"
                    style={{ fontSize: "0.95rem", color: "var(--color-ink-on-dark-light)", transition: "color 0.3s" }}
                  >
                    +977-1-5978860/61/62
                  </p>
                </a>

                {/* Email */}
                <a href="mailto:info@primeceramics.com.np" className="group flex flex-col items-center">
                  <div
                    className="flex items-center justify-center group-hover:border-accent"
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      border: "1px solid rgba(181,138,82,0.2)",
                      marginBottom: "16px",
                      transition: "border-color 0.3s",
                    }}
                  >
                    <Mail size={16} style={{ color: "var(--color-accent)", opacity: 0.7 }} />
                  </div>
                  <p
                    className="text-[0.6rem] font-medium tracking-[0.18em] uppercase"
                    style={{ marginBottom: "8px", color: "var(--color-ink-on-dark-muted)" }}
                  >
                    Email
                  </p>
                  <p
                    className="font-serif font-light group-hover:text-white"
                    style={{ fontSize: "0.95rem", color: "var(--color-ink-on-dark-light)", transition: "color 0.3s" }}
                  >
                    info@primeceramics.com.np
                  </p>
                </a>

                {/* Toll Free */}
                <a href="tel:18105000062" className="group flex flex-col items-center">
                  <div
                    className="flex items-center justify-center group-hover:border-accent"
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      border: "1px solid rgba(181,138,82,0.2)",
                      marginBottom: "16px",
                      transition: "border-color 0.3s",
                    }}
                  >
                    <Headphones size={16} style={{ color: "var(--color-accent)", opacity: 0.7 }} />
                  </div>
                  <p
                    className="text-[0.6rem] font-medium tracking-[0.18em] uppercase"
                    style={{ marginBottom: "8px", color: "var(--color-ink-on-dark-muted)" }}
                  >
                    Toll Free
                  </p>
                  <p
                    className="font-serif font-light group-hover:text-white"
                    style={{ fontSize: "0.95rem", color: "var(--color-ink-on-dark-light)", transition: "color 0.3s" }}
                  >
                    1810 500 0062
                  </p>
                </a>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
