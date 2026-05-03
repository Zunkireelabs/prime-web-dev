"use client";

import FadeIn from "@/components/animations/FadeIn";
import { careerValues } from "@/data/careers";

export default function CareersValues() {
  return (
    <section
      className="bg-surface-alt"
      style={{
        paddingTop: "clamp(80px, 10vw, 140px)",
        paddingBottom: "clamp(80px, 10vw, 140px)",
      }}
    >
      <div className="container">
        <FadeIn>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              maxWidth: "640px",
              marginBottom: "clamp(56px, 7vw, 88px)",
            }}
          >
            <p className="eyebrow text-accent">How We Work</p>
            <h2
              className="font-serif font-light text-ink"
              style={{
                fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
              }}
            >
              The people we hire share four things.
            </h2>
          </div>
        </FadeIn>

        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{
            columnGap: "clamp(32px, 4vw, 56px)",
            rowGap: "clamp(40px, 5vw, 56px)",
          }}
        >
          {careerValues.map((value, idx) => (
            <FadeIn key={value.id} delay={idx * 0.06}>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <span
                  className="font-serif text-accent"
                  style={{
                    fontSize: "1rem",
                    fontWeight: 400,
                    letterSpacing: "0.04em",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  0{idx + 1}
                </span>
                <div
                  className="bg-accent"
                  style={{ width: "32px", height: "1px" }}
                />
                <h3
                  className="font-serif font-light text-ink"
                  style={{
                    fontSize: "clamp(1.35rem, 2vw, 1.6rem)",
                    lineHeight: 1.25,
                    marginTop: "4px",
                  }}
                >
                  {value.title}
                </h3>
                <p
                  className="font-light text-ink-light"
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: 1.75,
                    maxWidth: "480px",
                  }}
                >
                  {value.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
