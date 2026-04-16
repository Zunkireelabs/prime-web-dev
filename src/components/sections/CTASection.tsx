"use client";

import { useState } from "react";
import FadeIn from "@/components/animations/FadeIn";
import { ArrowRight, Phone, Mail, Headphones } from "lucide-react";
import QuoteFormModal from "@/components/ui/QuoteFormModal";

const WA = "https://wa.me/9779802310000";

const contactItems = [
  { icon: Phone, label: "Phone", value: "+977-1-5978860/61/62", href: "tel:+977-1-5978860" },
  { icon: Mail, label: "WhatsApp", value: "Chat with us", href: `${WA}?text=${encodeURIComponent("Hi, I have a question about Prime Tiles products. Could you help me?")}` },
  { icon: Headphones, label: "Toll Free", value: "1810 500 0062", href: "tel:18105000062" },
];

export default function CTASection() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{ padding: "clamp(100px, 12vw, 180px) 0", background: "var(--color-surface-dark-warm)" }}
    >
      {/* Layered radial glows for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 90% 70% at 50% 30%, rgba(181,138,82,0.14) 0%, transparent 65%)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 50% at 50% 40%, rgba(181,138,82,0.08) 0%, transparent 50%)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 95%, rgba(181,138,82,0.06) 0%, transparent 50%)" }}
      />

      {/* Noise grain texture for tactile feel */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Decorative border frame */}
      <div
        className="absolute pointer-events-none hidden lg:block"
        style={{
          top: "clamp(32px, 4vw, 56px)",
          left: "clamp(48px, 6vw, 96px)",
          right: "clamp(48px, 6vw, 96px)",
          bottom: "clamp(32px, 4vw, 56px)",
          border: "1px solid rgba(181,138,82,0.08)",
        }}
      />

      {/* Corner accents on the frame */}
      <div className="absolute pointer-events-none hidden lg:block" style={{ top: "clamp(28px, 3.5vw, 52px)", left: "clamp(44px, 5.5vw, 92px)", width: "24px", height: "24px", borderTop: "2px solid rgba(181,138,82,0.2)", borderLeft: "2px solid rgba(181,138,82,0.2)" }} />
      <div className="absolute pointer-events-none hidden lg:block" style={{ top: "clamp(28px, 3.5vw, 52px)", right: "clamp(44px, 5.5vw, 92px)", width: "24px", height: "24px", borderTop: "2px solid rgba(181,138,82,0.2)", borderRight: "2px solid rgba(181,138,82,0.2)" }} />
      <div className="absolute pointer-events-none hidden lg:block" style={{ bottom: "clamp(28px, 3.5vw, 52px)", left: "clamp(44px, 5.5vw, 92px)", width: "24px", height: "24px", borderBottom: "2px solid rgba(181,138,82,0.2)", borderLeft: "2px solid rgba(181,138,82,0.2)" }} />
      <div className="absolute pointer-events-none hidden lg:block" style={{ bottom: "clamp(28px, 3.5vw, 52px)", right: "clamp(44px, 5.5vw, 92px)", width: "24px", height: "24px", borderBottom: "2px solid rgba(181,138,82,0.2)", borderRight: "2px solid rgba(181,138,82,0.2)" }} />

      <div className="container relative z-10">
        <div style={{ maxWidth: "900px", marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>

          {/* Eyebrow */}
          <FadeIn>
            <p
              className="text-[0.65rem] font-medium tracking-[0.22em] uppercase"
              style={{ marginBottom: "24px", textAlign: "center", color: "var(--color-accent-light)" }}
            >
              Start Your Project
            </p>
          </FadeIn>

          {/* Heading */}
          <FadeIn delay={0.08}>
            <h2
              className="font-serif font-light"
              style={{
                fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.015em",
                marginBottom: "32px",
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

          {/* Gold gradient divider */}
          <FadeIn delay={0.1}>
            <div
              style={{
                width: "clamp(80px, 12vw, 140px)",
                height: "1px",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "32px",
                background: "linear-gradient(90deg, transparent, var(--color-accent) 30%, var(--color-accent) 70%, transparent)",
              }}
            />
          </FadeIn>

          {/* Description */}
          <FadeIn delay={0.14}>
            <p
              style={{
                textAlign: "center",
                maxWidth: "520px",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "48px",
                textWrap: "balance",
                color: "var(--color-ink-on-dark-light)",
                fontSize: "clamp(0.9rem, 1.15vw, 1.05rem)",
                lineHeight: 1.75,
              }}
            >
              Whether you&apos;re an architect, designer, or homeowner — our
              team is here to help you find the perfect surface for every vision.
            </p>
          </FadeIn>

          {/* Buttons */}
          <FadeIn delay={0.2}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "20px" }}>
              <button
                type="button"
                onClick={() => setQuoteOpen(true)}
                className="btn-gold group"
              >
                Request a Quote
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
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

          {/* Contact strip with card backgrounds */}
          <FadeIn delay={0.25}>
            <div style={{ marginTop: "64px", paddingTop: "48px", borderTop: "1px solid rgba(181,138,82,0.1)" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "24px",
                  textAlign: "center",
                }}
                className="max-sm:!grid-cols-1 max-sm:!gap-[16px]"
              >
                {contactItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group flex flex-col items-center"
                    style={{
                      padding: "clamp(20px, 4vw, 28px) clamp(16px, 3vw, 20px)",
                      borderRadius: "12px",
                      background: "rgba(181,138,82,0.04)",
                      border: "1px solid rgba(181,138,82,0.06)",
                      transition: "background 0.3s cubic-bezier(0.22,1,0.36,1), border-color 0.3s cubic-bezier(0.22,1,0.36,1), transform 0.3s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        border: "1px solid rgba(181,138,82,0.15)",
                        marginBottom: "16px",
                        transition: "border-color 0.3s, background 0.3s",
                      }}
                    >
                      <item.icon size={16} style={{ color: "var(--color-accent)", opacity: 0.7 }} />
                    </div>
                    <p
                      className="text-[0.6rem] font-medium tracking-[0.18em] uppercase"
                      style={{ marginBottom: "8px", color: "var(--color-ink-on-dark-muted)" }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="font-serif font-light group-hover:text-white"
                      style={{ fontSize: "0.95rem", color: "var(--color-ink-on-dark-light)", transition: "color 0.3s" }}
                    >
                      {item.value}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>

        </div>
      </div>

      <style jsx>{`
        .group:hover {
          background: rgba(181,138,82,0.08) !important;
          border-color: rgba(181,138,82,0.15) !important;
          transform: translateY(-2px);
        }
      `}</style>

      <QuoteFormModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </section>
  );
}
