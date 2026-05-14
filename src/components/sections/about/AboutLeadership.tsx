"use client";

import FadeIn from "@/components/animations/FadeIn";
import { Quote } from "lucide-react";

const leaders = [
  {
    name: "Ashish Garg",
    title: "Chairman",
    image: "/images/team/chairman-ashish-garg.png",
    quote:
      "Our tiles are more than building materials; they are expressions of culture, emotion, and identity. With a portfolio of over 600 designs inspired by Nepali art and heritage, we\u2019ve brought the soul of Nepal into countless homes and public spaces. We proudly employ 350 local workers, playing a role in the region\u2019s economic upliftment. As we step into our third year, our ambitions grow \u2014 we\u2019re preparing to expand into neighboring markets, all while staying true to our roots.",
  },
  {
    name: "Prashant Agrawal",
    title: "Managing Director",
    image: "/images/team/md-prashant-agrawal.png",
    quote:
      "When you choose Prime Ceramics, you choose cutting-edge design that reflects global trends, rigorously tested quality that stands the test of time, and exceptional after-sales service. We\u2019ve built trust in our products, trust in our quality, trust in a Nepali brand that delivers international standards at unbeatable value. Our goal is simple but ambitious: to become Nepal\u2019s number one ceramics brand. We\u2019re building Nepal\u2019s future \u2014 one tile at a time.",
  },
];

export default function AboutLeadership() {
  return (
    <section
      id="leadership"
      className="bg-surface-alt"
      style={{ paddingTop: "clamp(80px, 10vw, 120px)", paddingBottom: "clamp(80px, 10vw, 120px)" }}
    >
      <div className="container">
        {/* Section header */}
        <div style={{ marginBottom: "clamp(48px, 6vw, 72px)", textAlign: "center" }}>
          <FadeIn>
            <div className="flex items-center justify-center" style={{ gap: "16px", marginBottom: "16px" }}>
              <div className="w-10 h-px bg-accent" />
              <p className="eyebrow text-accent">Leadership</p>
              <div className="w-10 h-px bg-accent" />
            </div>
          </FadeIn>
          <FadeIn delay={0.06}>
            <h2 className="h2">The Vision Behind Prime</h2>
          </FadeIn>
        </div>

        {/* Leader cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: "clamp(32px, 4vw, 48px)" }}
        >
          {leaders.map((leader, i) => (
            <FadeIn key={leader.name} delay={i * 0.12} direction="up" distance={20}>
              <div
                className="relative flex flex-col h-full"
                style={{
                  background: "var(--color-surface-alt)",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                {/* Photo + name */}
                <div className="flex items-center" style={{ gap: "20px", padding: "28px 32px 24px" }}>
                  <div
                    className="shrink-0 overflow-hidden"
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      border: "2px solid rgba(150,112,76,0.2)",
                    }}
                  >
                    <img
                      src={leader.image}
                      alt={leader.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p
                      className="font-serif font-light text-ink"
                      style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.3rem)", lineHeight: 1.2, marginBottom: "4px" }}
                    >
                      {leader.name}
                    </p>
                    <p className="text-[0.55rem] font-semibold tracking-[0.18em] uppercase text-accent">
                      {leader.title}
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <div className="flex-1" style={{ padding: "0 32px 32px" }}>
                  <Quote size={20} className="text-accent/30" style={{ marginBottom: "14px" }} />
                  <p
                    className="body-sm text-ink-light italic"
                    style={{ lineHeight: 1.85 }}
                  >
                    {leader.quote}
                  </p>
                </div>

                {/* Accent bottom line */}
                <div style={{ height: "3px", background: "linear-gradient(90deg, var(--color-accent), transparent)" }} />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
