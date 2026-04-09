"use client";

import FadeIn from "@/components/animations/FadeIn";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{ padding: "clamp(64px, 8vw, 110px) 0", background: "var(--color-surface-dark-warm)" }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, var(--color-accent-subtle) 0%, transparent 60%)",
        }}
      />

      <div className="container relative z-10">
        <div style={{ maxWidth: "860px", marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>

          {/* Eyebrow */}
          <FadeIn>
            <p className="eyebrow" style={{ marginBottom: "16px", textAlign: "center", color: "var(--color-ink-on-dark-muted)" }}>
              Start Your Project
            </p>
          </FadeIn>

          {/* Heading */}
          <FadeIn delay={0.08}>
            <h2
              className="h2"
              style={{ marginBottom: "24px", textAlign: "center", textWrap: "balance", color: "var(--color-ink-on-dark)" }}
            >
              Ready to Transform{" "}
              <span style={{ color: "white" }}>Your Space?</span>
            </h2>
          </FadeIn>

          {/* Divider */}
          <FadeIn delay={0.1}>
            <div style={{ width: "36px", height: "2px", background: "var(--color-accent)", marginLeft: "auto", marginRight: "auto", marginBottom: "24px" }} />
          </FadeIn>

          {/* Description */}
          <FadeIn delay={0.14}>
            <p
              className="body-lg"
              style={{
                textAlign: "center",
                maxWidth: "540px",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "36px",
                textWrap: "balance",
                color: "var(--color-ink-on-dark-light)",
              }}
            >
              Whether you&apos;re an architect, designer, or homeowner — our
              team is here to help you find the perfect surface for every vision.
            </p>
          </FadeIn>

          {/* Buttons */}
          <FadeIn delay={0.2}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "24px" }}>
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

          {/* Contact strip */}
          <FadeIn delay={0.25}>
            <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
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
                <a href="tel:+977-1-5978860" className="group">
                  <p className="eyebrow" style={{ marginBottom: "16px", textAlign: "center", color: "var(--color-ink-on-dark-muted)" }}>
                    Phone
                  </p>
                  <p
                    className="font-serif font-light group-hover:text-white transition-colors duration-300"
                    style={{ fontSize: "1.05rem", textAlign: "center", color: "var(--color-ink-on-dark-light)" }}
                  >
                    +977-1-5978860/61/62
                  </p>
                </a>

                {/* Email */}
                <a href="mailto:info@primeceramics.com.np" className="group">
                  <p className="eyebrow" style={{ marginBottom: "16px", textAlign: "center", color: "var(--color-ink-on-dark-muted)" }}>
                    Email
                  </p>
                  <p
                    className="font-serif font-light group-hover:text-white transition-colors duration-300"
                    style={{ fontSize: "1.05rem", textAlign: "center", color: "var(--color-ink-on-dark-light)" }}
                  >
                    info@primeceramics.com.np
                  </p>
                </a>

                {/* Toll Free */}
                <a href="tel:18105000062" className="group">
                  <p className="eyebrow" style={{ marginBottom: "16px", textAlign: "center", color: "var(--color-ink-on-dark-muted)" }}>
                    Toll Free
                  </p>
                  <p
                    className="font-serif font-light group-hover:text-white transition-colors duration-300"
                    style={{ fontSize: "1.05rem", textAlign: "center", color: "var(--color-ink-on-dark-light)" }}
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
