"use client";

import FadeIn from "@/components/animations/FadeIn";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section
      id="contact"
      className="bg-surface-red relative overflow-hidden"
      style={{ padding: "clamp(100px, 12vw, 180px) 0" }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(253, 224, 219, 0.08) 0%, transparent 60%)",
        }}
      />

      <div className="container relative z-10">
        <div style={{ maxWidth: "860px", marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>

          {/* Eyebrow */}
          <FadeIn>
            <p className="eyebrow text-ink-on-red/60" style={{ marginBottom: "16px", textAlign: "center" }}>
              Start Your Project
            </p>
          </FadeIn>

          {/* Heading */}
          <FadeIn delay={0.08}>
            <h2
              className="font-serif font-light text-ink-on-red leading-[1.05]"
              style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)", marginBottom: "32px", textAlign: "center", textWrap: "balance" }}
            >
              Ready to Transform{" "}
              <span className="text-white">Your Space?</span>
            </h2>
          </FadeIn>

          {/* Red divider */}
          <FadeIn delay={0.1}>
            <div className="red-divider-center" style={{ marginBottom: "32px" }} />
          </FadeIn>

          {/* Description */}
          <FadeIn delay={0.14}>
            <p
              className="body-lg text-ink-on-red-muted"
              style={{
                textAlign: "center",
                maxWidth: "540px",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "48px",
                textWrap: "balance",
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
                className="btn-on-red group"
              >
                Request a Quote
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a href="/catalog" className="btn-on-red-outline group">
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
            <div style={{ marginTop: "64px", paddingTop: "40px", borderTop: "1px solid rgba(253, 224, 219, 0.08)" }}>
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
                  <p className="eyebrow text-ink-on-red-muted/50" style={{ marginBottom: "16px", textAlign: "center" }}>
                    Phone
                  </p>
                  <p
                    className="font-serif font-light text-ink-on-red/80 group-hover:text-white transition-colors duration-300"
                    style={{ fontSize: "1.05rem", textAlign: "center" }}
                  >
                    +977-1-5978860/61/62
                  </p>
                </a>

                {/* Email */}
                <a href="mailto:info@primeceramics.com.np" className="group">
                  <p className="eyebrow text-ink-on-red-muted/50" style={{ marginBottom: "16px", textAlign: "center" }}>
                    Email
                  </p>
                  <p
                    className="font-serif font-light text-ink-on-red/80 group-hover:text-white transition-colors duration-300"
                    style={{ fontSize: "1.05rem", textAlign: "center" }}
                  >
                    info@primeceramics.com.np
                  </p>
                </a>

                {/* Toll Free */}
                <a href="tel:18105000062" className="group">
                  <p className="eyebrow text-ink-on-red-muted/50" style={{ marginBottom: "16px", textAlign: "center" }}>
                    Toll Free
                  </p>
                  <p
                    className="font-serif font-light text-ink-on-red/80 group-hover:text-white transition-colors duration-300"
                    style={{ fontSize: "1.05rem", textAlign: "center" }}
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
