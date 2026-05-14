"use client";

import FadeIn from "@/components/animations/FadeIn";
import { CheckCircle, Leaf, Zap, Shield, Users, BarChart3 } from "lucide-react";

const principles = [
  {
    icon: Users,
    title: "Customer-Centric Excellence",
    description: "Every product is created with a deep understanding of customer expectations in terms of quality, design, functionality, and value.",
  },
  {
    icon: Shield,
    title: "Consistent Product Quality",
    description: "Every tile is manufactured under strict quality control using SACMI HD printing from Italy. All outputs are subject to rigorous inspection.",
  },
  {
    icon: Leaf,
    title: "Compliance & Sustainability",
    description: "Our processes reduce waste, conserve energy, and promote a greener future. We use LPG instead of coal, saving 16,000 tons of CO\u2082 annually.",
  },
  {
    icon: BarChart3,
    title: "Continuous Improvement",
    description: "We invest in technology, training, and process optimization. Feedback from customers and dealers drives product and service enhancements.",
  },
  {
    icon: CheckCircle,
    title: "Accountability & Integrity",
    description: "We promote transparency and ethical practices at every level. We take full responsibility for the quality of every tile we deliver.",
  },
  {
    icon: Zap,
    title: "Green Manufacturing",
    description: "Nepal\u2019s only eco-conscious tile producer using LPG gas, solar renewable power, and dust collector technology for cleaner production.",
  },
];

export default function AboutQuality() {
  return (
    <section
      id="quality"
      className="bg-surface"
      style={{ paddingTop: "clamp(80px, 10vw, 120px)", paddingBottom: "clamp(80px, 10vw, 120px)" }}
    >
      <div className="container">
        {/* Header */}
        <div className="text-center" style={{ marginBottom: "clamp(48px, 6vw, 72px)" }}>
          <FadeIn>
            <div className="flex items-center justify-center" style={{ gap: "16px", marginBottom: "16px" }}>
              <div className="w-10 h-px bg-accent" />
              <p className="eyebrow text-accent">Quality Policy</p>
              <div className="w-10 h-px bg-accent" />
            </div>
          </FadeIn>
          <FadeIn delay={0.06}>
            <h2 className="h2" style={{ marginBottom: "16px" }}>
              Built on Core Principles
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="body-lg text-ink-light max-w-lg mx-auto" style={{ lineHeight: 1.8 }}>
              &ldquo;Customer service is our business. Quality is our brand.&rdquo;
            </p>
          </FadeIn>
        </div>

        {/* Principles grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "clamp(20px, 3vw, 28px)" }}
        >
          {principles.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.06} direction="up" distance={15}>
              <div
                className="group h-full"
                style={{
                  background: "var(--color-surface-alt)",
                  borderRadius: "8px",
                  padding: "clamp(24px, 3vw, 32px)",
                  border: "1px solid rgba(43,36,28,0.04)",
                  transition: "border-color 0.3s",
                }}
              >
                <p.icon
                  size={22}
                  strokeWidth={1.5}
                  className="text-accent group-hover:text-accent-hover transition-colors duration-300"
                  style={{ marginBottom: "16px", opacity: 0.7 }}
                />
                <h3
                  className="font-serif font-light text-ink"
                  style={{ fontSize: "clamp(1rem, 1.3vw, 1.15rem)", marginBottom: "10px" }}
                >
                  {p.title}
                </h3>
                <p className="text-[0.78rem] text-ink-light" style={{ lineHeight: 1.8 }}>
                  {p.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
