"use client";

import { useState, useMemo } from "react";
import FadeIn from "@/components/animations/FadeIn";
import { nepalProvinces, NEPAL_VIEWBOX } from "@/data/nepal-map";
import { dealers } from "@/data/dealers";

interface NepalMapProps {
  activeProvince: string;
  onProvinceSelect: (province: string) => void;
  embedded?: boolean;
}

export default function NepalMap({ activeProvince, onProvinceSelect, embedded }: NepalMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    dealers.forEach((d) => {
      map[d.province] = (map[d.province] || 0) + 1;
    });
    return map;
  }, []);

  const total = dealers.length;

  const mapContent = (
    <>
      {/* Section header */}
      <div style={{ textAlign: embedded ? "left" : "center", marginBottom: embedded ? "24px" : "64px" }}>
        <FadeIn>
          <p className="eyebrow" style={{ marginBottom: "16px", textAlign: embedded ? "left" : "center" }}>Select a Province</p>
        </FadeIn>
        <FadeIn delay={0.06}>
          <h2 className={embedded ? "h3" : "h2"} style={{ marginBottom: embedded ? "12px" : "24px", textAlign: embedded ? "left" : "center" }}>Explore by Region</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="body-lg text-ink-light" style={{ maxWidth: embedded ? "none" : "480px", marginLeft: embedded ? "0" : "auto", marginRight: embedded ? "0" : "auto", textAlign: embedded ? "left" : "center" }}>
            {total} authorized dealers across {nepalProvinces.length} provinces.
            Click a province to filter.
          </p>
        </FadeIn>
      </div>

      {/* Map — SVG */}
      <FadeIn delay={0.15} direction="up" distance={20}>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: embedded ? "flex-start" : "center" }}>
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
                        ? "var(--color-accent-glow)"
                        : isHovered
                        ? "var(--color-accent-subtle)"
                        : "var(--color-surface-alt)"
                    }
                    stroke={
                      isActive
                        ? "var(--color-accent)"
                        : isHovered
                        ? "var(--color-accent-light)"
                        : "var(--color-ink-faint)"
                    }
                    strokeWidth={isActive ? 2.5 : isHovered ? 1.5 : 0.8}
                    strokeLinejoin="round"
                    className="cursor-pointer"
                    style={{
                      transition: "fill 0.3s linear, stroke 0.3s linear, stroke-width 0.3s linear",
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
                      transition: "opacity 0.3s linear",
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
                          ? "var(--color-accent)"
                          : highlighted
                          ? "var(--color-ink)"
                          : "var(--color-ink-light)",
                        transition: "fill 0.3s linear",
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
                          ? "var(--color-accent)"
                          : "var(--color-ink-muted)",
                        transition: "fill 0.3s linear",
                      }}
                    >
                      {count} {count === 1 ? "dealer" : "dealers"}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Instruction text */}
            <p className="text-[0.6rem] font-medium tracking-[0.25em] uppercase text-ink-muted" style={{ marginTop: "20px", textAlign: "center" }}>
              {activeProvince !== "All"
                ? `Showing ${activeProvince} \u2014 click again to clear`
                : "Click a province to filter dealers below"}
            </p>

            {/* Province quick-select */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginTop: "16px", flexWrap: "wrap" }}>
              {nepalProvinces.map((p) => {
                const isActive = activeProvince === p.province;
                return (
                  <button
                    key={p.id}
                    onClick={() => onProvinceSelect(isActive ? "All" : p.province)}
                    className={`font-medium tracking-[0.12em] uppercase transition-all duration-300 border-b ${
                      isActive
                        ? "text-accent border-accent"
                        : "text-ink-muted border-transparent hover:text-ink-light hover:border-ink-faint"
                    }`}
                    style={{ fontSize: "0.6rem", paddingBottom: "4px" }}
                  >
                    {p.province}
                  </button>
                );
              })}
            </div>
          </div>
        </FadeIn>
    </>
  );

  if (embedded) {
    return <div>{mapContent}</div>;
  }

  return (
    <section className="bg-surface" style={{ padding: "clamp(100px, 12vw, 180px) 0" }}>
      <div className="container">{mapContent}</div>
    </section>
  );
}
