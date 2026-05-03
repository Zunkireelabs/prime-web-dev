"use client";

import { ArrowUpRight, MapPin, Briefcase } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { careerOpenings, applyMailto, applyEmail } from "@/data/careers";

export default function CareersOpenings() {
  const hasOpenings = careerOpenings.length > 0;

  return (
    <section
      id="openings"
      className="bg-surface"
      style={{
        paddingTop: "clamp(100px, 12vw, 160px)",
        paddingBottom: "clamp(120px, 14vw, 180px)",
      }}
    >
      <div className="container">
        <FadeIn>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginBottom: "clamp(48px, 6vw, 72px)",
              maxWidth: "640px",
            }}
          >
            <p className="eyebrow text-accent">Open Roles</p>
            <h2
              className="font-serif font-light text-ink"
              style={{
                fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
              }}
            >
              {hasOpenings
                ? "Find your seat at the table."
                : "No openings right now — but we're always listening."}
            </h2>
          </div>
        </FadeIn>

        {hasOpenings ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {careerOpenings.map((opening, idx) => (
              <FadeIn key={opening.id} delay={idx * 0.04}>
                <a
                  href={opening.applyUrl ?? applyMailto(opening.title)}
                  target={opening.applyUrl ? "_blank" : undefined}
                  rel={opening.applyUrl ? "noopener noreferrer" : undefined}
                  className="group block"
                  style={{
                    padding: "clamp(28px, 3.5vw, 40px) 0",
                    borderTop:
                      idx === 0 ? "1px solid rgba(43,36,28,0.10)" : undefined,
                    borderBottom: "1px solid rgba(43,36,28,0.10)",
                    transition: "background 0.3s linear",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(43,36,28,0.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <div
                    className="grid grid-cols-1 md:grid-cols-12 items-center"
                    style={{
                      columnGap: "clamp(20px, 2.5vw, 32px)",
                      rowGap: "16px",
                    }}
                  >
                    <div className="md:col-span-6">
                      <h3
                        className="font-serif font-light text-ink group-hover:text-accent"
                        style={{
                          fontSize: "clamp(1.25rem, 2vw, 1.6rem)",
                          lineHeight: 1.25,
                          transition: "color 0.3s linear",
                        }}
                      >
                        {opening.title}
                      </h3>
                      <p
                        className="font-light text-ink-light"
                        style={{
                          fontSize: "0.9rem",
                          lineHeight: 1.6,
                          marginTop: "8px",
                        }}
                      >
                        {opening.summary}
                      </p>
                    </div>

                    <div
                      className="md:col-span-2 flex items-center text-ink-light"
                      style={{ gap: "8px", fontSize: "0.8rem" }}
                    >
                      <Briefcase size={13} strokeWidth={1.6} />
                      <span>{opening.team}</span>
                    </div>

                    <div
                      className="md:col-span-2 flex items-center text-ink-light"
                      style={{ gap: "8px", fontSize: "0.8rem" }}
                    >
                      <MapPin size={13} strokeWidth={1.6} />
                      <span>{opening.location}</span>
                    </div>

                    <div
                      className="md:col-span-2 flex items-center justify-start md:justify-end text-ink group-hover:text-accent"
                      style={{
                        gap: "10px",
                        fontSize: "0.65rem",
                        fontWeight: 500,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        transition: "color 0.3s linear",
                      }}
                    >
                      <span>Apply</span>
                      <ArrowUpRight
                        size={14}
                        strokeWidth={1.8}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        ) : (
          <FadeIn delay={0.05}>
            <div
              style={{
                padding: "clamp(40px, 5vw, 64px)",
                background: "var(--color-surface-card, #FFFFFF)",
                border: "1px solid rgba(43,36,28,0.08)",
                borderRadius: "4px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                maxWidth: "720px",
              }}
            >
              <p
                className="font-light text-ink-light"
                style={{ fontSize: "1rem", lineHeight: 1.85 }}
              >
                We hire when we find the right person, not the other way around.
                If your work resonates with what we&apos;re building, send us a
                short note about you. We read everything that lands in our
                inbox.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "8px" }}>
                <a
                  href={applyMailto()}
                  className="inline-flex items-center text-ink hover:text-accent"
                  style={{
                    gap: "10px",
                    padding: "14px 24px",
                    border: "1px solid var(--color-ink, #3D3A36)",
                    fontSize: "0.7rem",
                    fontWeight: 500,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    transition:
                      "color 0.3s linear, border-color 0.3s linear, background 0.3s linear",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-accent)";
                    e.currentTarget.style.background = "rgba(150,112,76,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-ink, #3D3A36)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  Send an open application
                  <ArrowUpRight size={14} strokeWidth={1.8} />
                </a>
                <a
                  href={`mailto:${applyEmail}`}
                  className="inline-flex items-center text-ink-light hover:text-accent"
                  style={{
                    gap: "8px",
                    padding: "14px 4px",
                    fontSize: "0.85rem",
                    transition: "color 0.3s linear",
                  }}
                >
                  {applyEmail}
                </a>
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
