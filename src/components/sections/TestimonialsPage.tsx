"use client";

import { useState } from "react";
import { MapPin, Building2, Ruler, Maximize2 } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { projectTestimonials, testimonials } from "@/data";

const types = ["All", ...Array.from(new Set(projectTestimonials.map((p) => p.type)))];

export default function TestimonialsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? projectTestimonials
      : projectTestimonials.filter((p) => p.type === activeFilter);

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative flex items-center justify-center bg-surface-dark overflow-hidden"
        style={{ minHeight: "clamp(340px, 50vh, 480px)", paddingTop: "120px", paddingBottom: "clamp(48px, 6vw, 80px)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        <div className="relative z-10 text-center" style={{ padding: "0 clamp(16px, 4vw, 32px)" }}>
          <FadeIn>
            <p
              className="uppercase tracking-[0.3em] text-white/50 font-medium"
              style={{ fontSize: "clamp(0.55rem, 1vw, 0.65rem)", marginBottom: "clamp(12px, 2vw, 20px)" }}
            >
              Our Impact
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1
              className="font-heading font-light text-white"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1, marginBottom: "clamp(16px, 2vw, 24px)" }}
            >
              Project Testimonials
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p
              className="text-white/50 font-light max-w-xl mx-auto"
              style={{ fontSize: "clamp(0.8rem, 1.2vw, 0.95rem)", lineHeight: 1.7 }}
            >
              From airports to apartments, hospitals to stadiums — Prime Tiles
              are trusted across Nepal&apos;s most ambitious projects.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Project Grid ── */}
      <section
        className="bg-surface"
        style={{ padding: "clamp(48px, 6vw, 96px) clamp(16px, 4vw, 64px)" }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Filter tabs */}
          <FadeIn>
            <div
              className="flex flex-wrap justify-center"
              style={{ gap: "8px", marginBottom: "clamp(32px, 4vw, 56px)" }}
            >
              {types.map((type) => {
                const isActive = type === activeFilter;
                return (
                  <button
                    key={type}
                    onClick={() => setActiveFilter(type)}
                    className="transition-all duration-300 cursor-pointer"
                    style={{
                      padding: "9px 22px",
                      fontSize: "0.6rem",
                      fontWeight: 500,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      borderRadius: "100px",
                      border: "1px solid",
                      borderColor: isActive ? "var(--color-accent)" : "rgba(61, 58, 54, 0.16)",
                      background: isActive ? "var(--color-accent)" : "transparent",
                      color: isActive ? "#fff" : "var(--color-ink-light)",
                    }}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </FadeIn>

          {/* Grid — 2 columns for wide landscape images */}
          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: "clamp(20px, 2.5vw, 32px)" }}
          >
            {filtered.map((project, i) => (
              <FadeIn key={project.id} delay={i * 0.06}>
                <div
                  className="group relative overflow-hidden bg-surface-dark"
                  style={{ borderRadius: "6px" }}
                >
                  {/* Full image — natural aspect ratio */}
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.project}
                      className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>

                  {/* Info bar below the image */}
                  <div
                    className="flex items-center justify-between flex-wrap"
                    style={{ padding: "clamp(14px, 2vw, 20px) clamp(16px, 2vw, 24px)", gap: "8px 16px" }}
                  >
                    <div className="flex items-center" style={{ gap: "8px" }}>
                      {/* Number */}
                      <span
                        className="font-heading font-light text-accent/40"
                        style={{ fontSize: "1.1rem", lineHeight: 1 }}
                      >
                        {String(project.id).padStart(2, "0")}
                      </span>
                      <span className="text-white/10">|</span>
                      {/* Title */}
                      <h3
                        className="font-heading font-light text-white"
                        style={{ fontSize: "clamp(0.85rem, 1.4vw, 1.05rem)", lineHeight: 1.3 }}
                      >
                        {project.project}
                      </h3>
                    </div>

                    <div className="flex items-center" style={{ gap: "14px" }}>
                      <span className="flex items-center text-white/40" style={{ gap: "4px", fontSize: "0.6rem" }}>
                        <MapPin size={11} strokeWidth={1.5} />
                        {project.location}
                      </span>
                      <span className="flex items-center text-white/40" style={{ gap: "4px", fontSize: "0.6rem" }}>
                        <Building2 size={11} strokeWidth={1.5} />
                        {project.type}
                      </span>
                      {project.tile && (
                        <span className="flex items-center text-white/40" style={{ gap: "4px", fontSize: "0.6rem" }}>
                          <Ruler size={11} strokeWidth={1.5} />
                          {project.tile}
                        </span>
                      )}
                      {project.area && (
                        <span className="flex items-center text-white/40" style={{ gap: "4px", fontSize: "0.6rem" }}>
                          <Maximize2 size={11} strokeWidth={1.5} />
                          {project.area}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Client Quotes ── */}
      <section
        className="bg-surface-alt"
        style={{ padding: "clamp(48px, 6vw, 96px) clamp(16px, 4vw, 64px)" }}
      >
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p
              className="uppercase tracking-[0.3em] text-ink-muted font-medium text-center"
              style={{ fontSize: "clamp(0.55rem, 1vw, 0.65rem)", marginBottom: "clamp(12px, 2vw, 20px)" }}
            >
              What They Say
            </p>
            <h2
              className="font-heading font-light text-ink text-center"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", marginBottom: "clamp(32px, 4vw, 56px)" }}
            >
              Trusted by Industry Leaders
            </h2>
          </FadeIn>

          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ gap: "clamp(20px, 2.5vw, 32px)" }}
          >
            {testimonials.map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div
                  className="bg-surface border border-ink-faint/10 relative"
                  style={{ padding: "clamp(24px, 3vw, 40px)", borderRadius: "4px" }}
                >
                  {/* Quote mark */}
                  <div
                    className="font-heading text-accent/15 absolute"
                    style={{ fontSize: "5rem", lineHeight: 1, top: "8px", left: "20px" }}
                  >
                    &ldquo;
                  </div>
                  <p
                    className="text-ink-light font-light relative"
                    style={{ fontSize: "clamp(0.8rem, 1.1vw, 0.9rem)", lineHeight: 1.8, marginBottom: "clamp(16px, 2vw, 24px)", paddingTop: "24px" }}
                  >
                    {t.quote}
                  </p>
                  <div
                    className="bg-accent/20"
                    style={{ width: "24px", height: "1px", marginBottom: "16px" }}
                  />
                  <p
                    className="text-ink font-medium"
                    style={{ fontSize: "0.8rem", marginBottom: "4px" }}
                  >
                    {t.author}
                  </p>
                  <p
                    className="text-ink-muted"
                    style={{ fontSize: "0.65rem", letterSpacing: "0.03em", marginBottom: "2px" }}
                  >
                    {t.role}
                  </p>
                  <p
                    className="text-accent/70"
                    style={{ fontSize: "0.6rem", letterSpacing: "0.05em" }}
                  >
                    {t.project}
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
