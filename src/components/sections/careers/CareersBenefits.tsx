"use client";

import FadeIn from "@/components/animations/FadeIn";
import { careerBenefits } from "@/data/careers";

export default function CareersBenefits() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: "clamp(100px, 12vw, 160px)",
        paddingBottom: "clamp(100px, 12vw, 160px)",
        background: "var(--color-surface-dark-warm, #2A1F18)",
      }}
    >
      {/* Subtle accent glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(181,138,82,0.10) 0%, transparent 60%)",
        }}
      />

      <div className="container relative z-10">
        <FadeIn>
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              marginBottom: "clamp(56px, 7vw, 88px)",
            }}
          >
            <p className="eyebrow text-accent">Why Join</p>
            <h2
              className="font-serif font-light text-white"
              style={{
                fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                maxWidth: "720px",
              }}
            >
              What working at Prime looks like.
            </h2>
            <div className="bg-accent" style={{ width: "48px", height: "1.5px" }} />
          </div>
        </FadeIn>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{
            columnGap: "clamp(20px, 2.5vw, 32px)",
            rowGap: "clamp(20px, 2.5vw, 32px)",
          }}
        >
          {careerBenefits.map((benefit, idx) => (
            <FadeIn key={benefit.id} delay={(idx % 3) * 0.06}>
              <div
                style={{
                  padding: "clamp(28px, 3.5vw, 40px)",
                  height: "100%",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "4px",
                  background: "rgba(255,255,255,0.02)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  transition: "border-color 0.3s linear, background 0.3s linear",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(181,138,82,0.40)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                }}
              >
                <h3
                  className="font-serif font-light text-white"
                  style={{
                    fontSize: "clamp(1.15rem, 1.6vw, 1.35rem)",
                    lineHeight: 1.3,
                  }}
                >
                  {benefit.title}
                </h3>
                <p
                  className="font-light text-white/65"
                  style={{ fontSize: "0.9rem", lineHeight: 1.7 }}
                >
                  {benefit.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
