"use client";

import FadeIn from "@/components/animations/FadeIn";
import { careersIntro } from "@/data/careers";

export default function CareersIntro() {
  return (
    <section
      className="bg-surface"
      style={{
        paddingTop: "clamp(80px, 10vw, 140px)",
        paddingBottom: "clamp(80px, 10vw, 140px)",
      }}
    >
      <div className="container">
        <div
          className="grid grid-cols-1 lg:grid-cols-12"
          style={{ columnGap: "clamp(32px, 5vw, 80px)", rowGap: "32px" }}
        >
          <div className="lg:col-span-5">
            <FadeIn>
              <p className="eyebrow text-accent" style={{ marginBottom: "20px" }}>
                {careersIntro.eyebrow}
              </p>
              <h2
                className="font-serif font-light text-ink"
                style={{
                  fontSize: "clamp(2rem, 3.8vw, 3rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                {careersIntro.heading}
              </h2>
              <div
                className="bg-accent"
                style={{ width: "48px", height: "1.5px", marginTop: "28px" }}
              />
            </FadeIn>
          </div>

          <div className="lg:col-span-7 lg:pl-6">
            <FadeIn delay={0.1}>
              <p
                className="font-light text-ink-light"
                style={{
                  fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
                  lineHeight: 1.85,
                  maxWidth: "640px",
                }}
              >
                {careersIntro.body}
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
