"use client";

import { useState } from "react";
import { MapPin, Building2, Ruler, Maximize2, Grid3X3 } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { projectHighlights } from "@/data";

const types = ["All", ...Array.from(new Set(projectHighlights.map((p) => p.type)))];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? projectHighlights
      : projectHighlights.filter((p) => p.type === activeFilter);

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative flex items-end bg-surface-dark overflow-hidden"
        style={{ minHeight: "clamp(420px, 60vh, 560px)", paddingBottom: "clamp(48px, 6vw, 80px)" }}
      >
        {/* Background image */}
        <img
          src="/images/projects/projects-hero.jpg"
          alt="Project Highlights"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.35 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />

        <div className="relative z-10 w-full max-w-7xl mx-auto" style={{ padding: "0 clamp(16px, 4vw, 64px)" }}>
          <FadeIn>
            <p
              className="uppercase tracking-[0.3em] text-accent font-medium"
              style={{ fontSize: "clamp(0.55rem, 1vw, 0.65rem)", marginBottom: "clamp(12px, 2vw, 20px)" }}
            >
              Project Highlights
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1
              className="font-heading font-light text-white"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", lineHeight: 1.1, marginBottom: "clamp(16px, 2vw, 24px)" }}
            >
              Built to Last,<br />Designed to Inspire
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p
              className="text-white/50 font-light max-w-lg"
              style={{ fontSize: "clamp(0.8rem, 1.2vw, 0.95rem)", lineHeight: 1.7 }}
            >
              From commercial landmarks to healthcare facilities — see how Prime Tiles
              transform spaces across Nepal.
            </p>
          </FadeIn>

          {/* Stats strip */}
          <FadeIn delay={0.3}>
            <div
              className="flex items-center flex-wrap"
              style={{ gap: "clamp(24px, 4vw, 48px)", marginTop: "clamp(28px, 3vw, 40px)" }}
            >
              {[
                { value: "17+", label: "Projects" },
                { value: "200K+", label: "Sq.ft Tiled" },
                { value: "8+", label: "Sectors" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading font-light text-white" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", lineHeight: 1 }}>
                    {stat.value}
                  </p>
                  <p className="text-white/30 uppercase tracking-[0.15em]" style={{ fontSize: "0.55rem", marginTop: "4px" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
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
              style={{ gap: "8px", marginBottom: "clamp(36px, 5vw, 64px)" }}
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

          {/* Masonry-style grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start"
            style={{ gap: "clamp(16px, 2vw, 24px)" }}
          >
            {filtered.map((project, i) => (
              <FadeIn
                key={project.id}
                delay={i * 0.05}
                className={
                  // Make first and every 5th item span 2 columns on large screens
                  i === 0 || i === 5 ? "lg:col-span-2" : ""
                }
              >
                <div
                  className="group relative overflow-hidden bg-surface-dark"
                  style={{ borderRadius: "6px", aspectRatio: i === 0 || i === 5 ? "16 / 9" : "4 / 3" }}
                >
                  {/* Image */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                    {/* Number badge */}
                    <div
                      className="absolute font-heading font-light text-white/10"
                      style={{ top: "16px", left: "20px", fontSize: "3rem", lineHeight: 1 }}
                    >
                      {String(project.id).padStart(2, "0")}
                    </div>

                    {/* Type pill */}
                    <div
                      className="absolute"
                      style={{ top: "16px", right: "16px" }}
                    >
                      <span
                        className="text-white/70 bg-white/10 backdrop-blur-sm"
                        style={{
                          padding: "5px 14px",
                          fontSize: "0.5rem",
                          fontWeight: 500,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          borderRadius: "100px",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                      >
                        {project.type}
                      </span>
                    </div>

                    {/* Bottom info */}
                    <div
                      className="absolute bottom-0 left-0 right-0"
                      style={{ padding: "clamp(16px, 2vw, 24px)" }}
                    >
                      <h3
                        className="font-heading font-light text-white"
                        style={{
                          fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
                          marginBottom: "8px",
                          lineHeight: 1.3,
                        }}
                      >
                        {project.title}
                      </h3>

                      <div className="flex items-center flex-wrap" style={{ gap: "12px" }}>
                        <span className="flex items-center text-white/50" style={{ gap: "4px", fontSize: "0.6rem" }}>
                          <MapPin size={11} strokeWidth={1.5} />
                          {project.location}
                        </span>
                        {project.tile && (
                          <span className="flex items-center text-white/50" style={{ gap: "4px", fontSize: "0.6rem" }}>
                            <Grid3X3 size={11} strokeWidth={1.5} />
                            {project.tile}
                          </span>
                        )}
                        {project.size && (
                          <span className="flex items-center text-white/50" style={{ gap: "4px", fontSize: "0.6rem" }}>
                            <Ruler size={11} strokeWidth={1.5} />
                            {project.size}
                          </span>
                        )}
                        {project.area && (
                          <span className="flex items-center text-white/50" style={{ gap: "4px", fontSize: "0.6rem" }}>
                            <Maximize2 size={11} strokeWidth={1.5} />
                            {project.area}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
