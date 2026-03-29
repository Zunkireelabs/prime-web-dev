"use client";

import { useState, useMemo } from "react";
import FadeIn from "@/components/animations/FadeIn";
import { nepalProvinces, NEPAL_VIEWBOX } from "@/data/nepal-map";
import { dealers } from "@/data/dealers";

interface NepalMapProps {
  activeProvince: string;
  onProvinceSelect: (province: string) => void;
}

export default function NepalMap({ activeProvince, onProvinceSelect }: NepalMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    dealers.forEach((d) => {
      map[d.province] = (map[d.province] || 0) + 1;
    });
    return map;
  }, []);

  const total = dealers.length;

  return (
    <section className="bg-[var(--bg)] py-20 md:py-28 lg:py-32">
      <div className="container">
        {/* Section header */}
        <div className="text-center mb-14 md:mb-20">
          <FadeIn>
            <p className="eyebrow mb-4">Select a Province</p>
          </FadeIn>
          <FadeIn delay={0.06}>
            <h2 className="h2 mb-5">Explore by Region</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="body-lg text-[var(--ink-light)] mx-auto" style={{ maxWidth: "480px" }}>
              {total} authorized dealers across {nepalProvinces.length} provinces.
              Click a province to filter.
            </p>
          </FadeIn>
        </div>

        {/* Map — full container width, SVG handles centering */}
        <FadeIn delay={0.15} direction="up" distance={20}>
          <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <svg
              viewBox={NEPAL_VIEWBOX}
              style={{
                width: "100%",
                maxWidth: "900px",
                height: "auto",
                display: "block",
                touchAction: "manipulation",
              }}
              role="img"
              aria-label="Interactive map of Nepal divided by provinces"
            >
              {/* Province shapes */}
              {nepalProvinces.map((p) => {
                const isActive = activeProvince === p.province;
                const isHovered = hovered === p.province;

                return (
                  <path
                    key={`path-${p.id}`}
                    d={p.d}
                    fill={
                      isActive
                        ? "rgba(139, 101, 66, 0.18)"
                        : isHovered
                        ? "rgba(139, 101, 66, 0.08)"
                        : "var(--bg-alt)"
                    }
                    stroke={
                      isActive
                        ? "var(--accent)"
                        : isHovered
                        ? "rgba(139, 101, 66, 0.5)"
                        : "var(--ink-faint)"
                    }
                    strokeWidth={isActive ? 2.5 : isHovered ? 1.5 : 0.8}
                    strokeLinejoin="round"
                    className="cursor-pointer"
                    style={{
                      transition: "fill 0.4s cubic-bezier(0.22,1,0.36,1), stroke 0.4s cubic-bezier(0.22,1,0.36,1), stroke-width 0.3s cubic-bezier(0.22,1,0.36,1)",
                    }}
                    onMouseEnter={() => setHovered(p.province)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() =>
                      onProvinceSelect(isActive ? "All" : p.province)
                    }
                  />
                );
              })}

              {/* Labels */}
              {nepalProvinces.map((p) => {
                const isActive = activeProvince === p.province;
                const isHovered = hovered === p.province;
                const count = counts[p.province] || 0;
                const highlighted = isActive || isHovered;
                const isMadhesh = p.province === "Madhesh";

                return (
                  <g
                    key={`label-${p.id}`}
                    className="pointer-events-none select-none"
                    style={{
                      opacity: highlighted ? 1 : 0.65,
                      transition: "opacity 0.4s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    <text
                      x={p.labelX}
                      y={p.labelY - (isMadhesh ? 2 : 5)}
                      textAnchor="middle"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: isMadhesh ? 7 : 10,
                        fontWeight: 600,
                        letterSpacing: "0.12em",
                        fill: isActive
                          ? "var(--accent)"
                          : highlighted
                          ? "var(--ink)"
                          : "var(--ink-light)",
                        transition: "fill 0.4s cubic-bezier(0.22,1,0.36,1)",
                      }}
                    >
                      {p.province.toUpperCase()}
                    </text>

                    <text
                      x={p.labelX}
                      y={p.labelY + (isMadhesh ? 7 : 10)}
                      textAnchor="middle"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: isMadhesh ? 6 : 8,
                        fontWeight: 400,
                        fill: isActive
                          ? "var(--accent)"
                          : "var(--ink-muted)",
                        transition: "fill 0.4s cubic-bezier(0.22,1,0.36,1)",
                      }}
                    >
                      {count} {count === 1 ? "dealer" : "dealers"}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Instruction text */}
            <p className="mt-8 text-center text-[0.6rem] font-medium tracking-[0.25em] uppercase text-[var(--ink-muted)]">
              {activeProvince !== "All"
                ? `Showing ${activeProvince} \u2014 click again to clear`
                : "Click a province to filter dealers below"}
            </p>

            {/* Province quick-select */}
            <div className="flex items-center justify-center gap-5 mt-5 flex-wrap">
              {nepalProvinces.map((p) => {
                const isActive = activeProvince === p.province;
                return (
                  <button
                    key={p.id}
                    onClick={() => onProvinceSelect(isActive ? "All" : p.province)}
                    className={`text-[0.55rem] font-medium tracking-[0.12em] uppercase transition-all duration-300 pb-0.5 border-b ${
                      isActive
                        ? "text-[var(--accent)] border-[var(--accent)]"
                        : "text-[var(--ink-muted)] border-transparent hover:text-[var(--ink-light)] hover:border-[var(--ink-faint)]"
                    }`}
                  >
                    {p.province}
                  </button>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
