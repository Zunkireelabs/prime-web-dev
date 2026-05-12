"use client";

import { Heart, BookOpen, Droplets, Building, Users } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { csrIntro, csrInitiatives } from "@/data";

const categoryIcons: Record<string, React.ReactNode> = {
  "Health & Well-Being": <Heart size={20} strokeWidth={1.5} />,
  "Education & Knowledge": <BookOpen size={20} strokeWidth={1.5} />,
  "Hygiene & Sanitation": <Droplets size={20} strokeWidth={1.5} />,
  "Infrastructure & Community Development": <Building size={20} strokeWidth={1.5} />,
  "Livelihoods & Inclusion": <Users size={20} strokeWidth={1.5} />,
};

export default function CSRPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative flex items-center justify-center bg-surface-dark overflow-hidden"
        style={{ minHeight: "clamp(380px, 55vh, 520px)", paddingTop: "120px", paddingBottom: "clamp(48px, 6vw, 80px)" }}
      >
        {/* Background collage */}
        <div className="absolute inset-0 grid grid-cols-3 opacity-20">
          <img src="/images/csr/health-screening.jpg" alt="" className="w-full h-full object-cover" />
          <img src="/images/csr/education-library.jpg" alt="" className="w-full h-full object-cover" />
          <img src="/images/csr/community-development.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1815]/80 via-[#1A1815]/60 to-[#1A1815]/90" />

        <div className="relative z-10 text-center max-w-3xl mx-auto" style={{ padding: "0 clamp(16px, 4vw, 32px)" }}>
          <FadeIn>
            <p
              className="uppercase tracking-[0.3em] text-accent font-medium"
              style={{ fontSize: "clamp(0.55rem, 1vw, 0.65rem)", marginBottom: "clamp(12px, 2vw, 20px)" }}
            >
              {csrIntro.heading}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1
              className="font-heading font-light text-white"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1, marginBottom: "clamp(16px, 2vw, 24px)" }}
            >
              {csrIntro.subheading}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p
              className="text-white/45 font-light"
              style={{ fontSize: "clamp(0.8rem, 1.2vw, 0.95rem)", lineHeight: 1.8 }}
            >
              {csrIntro.description}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Initiatives ── */}
      <section
        className="bg-surface"
        style={{ padding: "clamp(48px, 6vw, 96px) clamp(16px, 4vw, 64px)" }}
      >
        <div className="max-w-6xl mx-auto">
          {csrInitiatives.map((item, i) => {
            const isEven = i % 2 === 0;
            return (
              <FadeIn key={item.id} delay={0.1}>
                <div
                  className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-stretch`}
                  style={{
                    gap: "0",
                    marginBottom: i < csrInitiatives.length - 1 ? "clamp(32px, 4vw, 56px)" : "0",
                    borderRadius: "8px",
                    overflow: "hidden",
                    background: "var(--color-surface-alt)",
                  }}
                >
                  {/* Image */}
                  <div className="md:w-1/2 relative overflow-hidden" style={{ minHeight: "280px" }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-top"
                    />
                    {/* Stats badge */}
                    {item.stats && (
                      <div
                        className="absolute bg-accent text-white"
                        style={{
                          bottom: "16px",
                          [isEven ? "right" : "left"]: "16px",
                          padding: "8px 18px",
                          borderRadius: "4px",
                          fontSize: "0.65rem",
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        {item.stats}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div
                    className="md:w-1/2 flex flex-col justify-center"
                    style={{ padding: "clamp(28px, 4vw, 48px)" }}
                  >
                    {/* Category with icon */}
                    <div
                      className="flex items-center text-accent"
                      style={{ gap: "8px", marginBottom: "clamp(12px, 1.5vw, 16px)" }}
                    >
                      {categoryIcons[item.category] || <Heart size={20} strokeWidth={1.5} />}
                      <span
                        className="uppercase tracking-[0.2em] font-medium"
                        style={{ fontSize: "0.6rem" }}
                      >
                        {item.category}
                      </span>
                    </div>

                    <h2
                      className="font-heading font-light text-ink"
                      style={{
                        fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                        lineHeight: 1.2,
                        marginBottom: "clamp(14px, 2vw, 20px)",
                      }}
                    >
                      {item.title}
                    </h2>

                    <div
                      className="bg-accent/30"
                      style={{ width: "32px", height: "1px", marginBottom: "clamp(14px, 2vw, 20px)" }}
                    />

                    <p
                      className="text-ink-light font-light"
                      style={{ fontSize: "clamp(0.8rem, 1.1vw, 0.88rem)", lineHeight: 1.85 }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* ── Impact Summary ── */}
      <section
        className="bg-surface-dark"
        style={{ padding: "clamp(48px, 6vw, 80px) clamp(16px, 4vw, 64px)" }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <FadeIn>
            <p
              className="uppercase tracking-[0.3em] text-white/40 font-medium"
              style={{ fontSize: "clamp(0.55rem, 1vw, 0.6rem)", marginBottom: "clamp(20px, 3vw, 32px)" }}
            >
              Our Impact at a Glance
            </p>
          </FadeIn>

          <div
            className="grid grid-cols-2 md:grid-cols-4"
            style={{ gap: "clamp(24px, 3vw, 40px)" }}
          >
            {[
              { value: "150+", label: "Women Screened", sub: "Cancer awareness" },
              { value: "350+", label: "Local Employees", sub: "From surrounding villages" },
              { value: "2,000+", label: "Masons Trained", sub: "Pan-Nepal outreach" },
              { value: "16K", label: "Tons CO\u2082 Saved", sub: "Annually via clean fuel" },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <div>
                  <p
                    className="font-heading font-light text-accent"
                    style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", lineHeight: 1, marginBottom: "8px" }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-white font-medium"
                    style={{ fontSize: "0.75rem", marginBottom: "4px" }}
                  >
                    {stat.label}
                  </p>
                  <p
                    className="text-white/30"
                    style={{ fontSize: "0.6rem", letterSpacing: "0.03em" }}
                  >
                    {stat.sub}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
