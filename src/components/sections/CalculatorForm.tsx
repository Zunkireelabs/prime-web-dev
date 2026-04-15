"use client";

import { useState, useMemo, useCallback } from "react";
import {
  ArrowRight,
  Copy,
  Check,
  RotateCcw,
  Ruler,
  Grid3X3,
  Percent,
  Package,
} from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

/* ─── Constants ─── */

const TILE_DATA = [
  { size: "300×300 mm", label: "300×300", dimMm: [300, 300], tilesPerBox: 10, sqmPerTile: 0.09 },
  { size: "300×450 mm", label: "300×450", dimMm: [300, 450], tilesPerBox: 8, sqmPerTile: 0.135 },
  { size: "300×600 mm", label: "300×600", dimMm: [300, 600], tilesPerBox: 6, sqmPerTile: 0.18 },
  { size: "400×400 mm", label: "400×400", dimMm: [400, 400], tilesPerBox: 6, sqmPerTile: 0.16 },
  { size: "600×600 mm", label: "600×600", dimMm: [600, 600], tilesPerBox: 4, sqmPerTile: 0.36 },
  { size: "600×1200 mm", label: "600×1200", dimMm: [600, 1200], tilesPerBox: 2, sqmPerTile: 0.72 },
];

const WASTAGE_OPTIONS = [
  { value: 5, label: "5%", desc: "Simple layout" },
  { value: 10, label: "10%", desc: "Standard" },
  { value: 15, label: "15%", desc: "Diagonal / cuts" },
];

const SQM_TO_SQFT = 10.7639;

/* ─── Sub-components ─── */

function SectionLabel({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div
      className="flex items-center"
      style={{ gap: "8px", marginBottom: "12px" }}
    >
      <Icon
        size={12}
        style={{ color: "var(--color-accent)", opacity: 0.6 }}
      />
      <p className="text-[0.58rem] font-medium tracking-[0.16em] uppercase text-ink-muted">
        {label}
      </p>
    </div>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  unit,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  unit: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        className="text-[0.55rem] font-medium tracking-[0.14em] uppercase text-ink-muted block"
        style={{ marginBottom: "8px" }}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "0"}
          className="w-full text-ink font-light bg-transparent focus:outline-none"
          style={{
            fontSize: "0.95rem",
            padding: "12px 52px 12px 14px",
            border: "1px solid rgba(43,36,28,0.1)",
            borderRadius: "8px",
            background: "rgba(247,244,239,0.5)",
            transition: "border-color 0.3s, box-shadow 0.3s",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--color-accent)";
            e.currentTarget.style.boxShadow =
              "0 0 0 3px rgba(181,138,82,0.06)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(43,36,28,0.1)";
            e.currentTarget.style.boxShadow = "none";
          }}
          min="0"
          step="any"
        />
        <span
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[0.6rem] font-medium tracking-[0.1em] uppercase text-ink-muted"
          style={{ opacity: 0.5 }}
        >
          {unit}
        </span>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */

export default function CalculatorForm() {
  const [unit, setUnit] = useState<"ft" | "m">("ft");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [directArea, setDirectArea] = useState("");
  const [selectedTile, setSelectedTile] = useState(0);
  const [wastage, setWastage] = useState(10);
  const [copied, setCopied] = useState(false);

  const tile = TILE_DATA[selectedTile];

  const results = useMemo(() => {
    let areaSqm = 0;

    if (directArea && parseFloat(directArea) > 0) {
      const val = parseFloat(directArea);
      areaSqm = unit === "ft" ? val / SQM_TO_SQFT : val;
    } else if (
      length &&
      width &&
      parseFloat(length) > 0 &&
      parseFloat(width) > 0
    ) {
      const l = parseFloat(length);
      const w = parseFloat(width);
      const areaInUnit = l * w;
      areaSqm = unit === "ft" ? areaInUnit / SQM_TO_SQFT : areaInUnit;
    }

    if (areaSqm <= 0) return null;

    const areaSqft = areaSqm * SQM_TO_SQFT;
    const tilesNeeded = Math.ceil(areaSqm / tile.sqmPerTile);
    const wastageExtra = Math.ceil(tilesNeeded * (wastage / 100));
    const totalTiles = tilesNeeded + wastageExtra;
    const boxesNeeded = Math.ceil(totalTiles / tile.tilesPerBox);

    return {
      areaSqm: Math.round(areaSqm * 100) / 100,
      areaSqft: Math.round(areaSqft * 100) / 100,
      tilesNeeded,
      wastageExtra,
      totalTiles,
      boxesNeeded,
      tilesPerBox: tile.tilesPerBox,
    };
  }, [length, width, directArea, unit, selectedTile, wastage, tile]);

  const handleCopy = useCallback(() => {
    if (!results) return;
    const text = [
      `Prime Tiles — Calculator Results`,
      `─────────────────────────────────`,
      ``,
      `Room Area: ${results.areaSqft} sq ft (${results.areaSqm} sq m)`,
      `Tile Size: ${tile.size}`,
      ``,
      `Base Tiles: ${results.tilesNeeded}`,
      `Wastage (${wastage}%): +${results.wastageExtra} tiles`,
      `Total Tiles: ${results.totalTiles}`,
      `Boxes Needed: ${results.boxesNeeded} (${results.tilesPerBox} tiles/box)`,
      ``,
      `www.primeceramics.com.np`,
    ].join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [results, tile, wastage]);

  const handleClear = () => {
    setLength("");
    setWidth("");
    setDirectArea("");
  };

  const quoteBody = results
    ? `Hi, I need tiles for my project:\n\nRoom Area: ${results.areaSqft} sq ft (${results.areaSqm} sq m)\nTile Size: ${tile.size}\nTotal Tiles: ${results.totalTiles}\nBoxes: ${results.boxesNeeded}\n\nPlease send me a quotation.`
    : "";

  const hasInput = length || width || directArea;

  return (
    <section
      className="bg-surface-alt"
      style={{ padding: "56px 0 64px" }}
    >
      <div className="container">
        <div
          className="flex flex-col lg:flex-row lg:items-stretch"
          style={{ gap: "40px" }}
        >
          {/* ═══════════ LEFT — Inputs ═══════════ */}
          <FadeIn>
            <div
              className="lg:w-[420px] shrink-0"
              style={{
                padding: "32px",
                background: "var(--color-surface-card)",
                borderRadius: "12px",
                border: "1px solid rgba(43,36,28,0.06)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 6px 24px rgba(0,0,0,0.03)",
              }}
            >
              {/* ── Unit Toggle ── */}
              <div style={{ marginBottom: "28px" }}>
                <SectionLabel icon={Ruler} label="Unit" />
                <div
                  className="inline-flex"
                  style={{
                    padding: "3px",
                    borderRadius: "8px",
                    background: "rgba(43,36,28,0.04)",
                    border: "1px solid rgba(43,36,28,0.06)",
                  }}
                >
                  {(["ft", "m"] as const).map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setUnit(u)}
                      className="text-[0.68rem] font-medium tracking-[0.1em] uppercase"
                      style={{
                        padding: "8px 24px",
                        borderRadius: "6px",
                        background:
                          unit === u ? "var(--color-surface-card)" : "transparent",
                        color:
                          unit === u
                            ? "var(--color-accent)"
                            : "var(--color-ink-muted)",
                        boxShadow:
                          unit === u ? "0 1px 4px rgba(0,0,0,0.05)" : "none",
                        transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                        cursor: "pointer",
                      }}
                    >
                      {u === "ft" ? "Feet" : "Meters"}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Dimensions ── */}
              <div style={{ marginBottom: "20px" }}>
                <SectionLabel icon={Ruler} label="Room Dimensions" />
                <div className="grid grid-cols-2" style={{ gap: "12px" }}>
                  <NumberInput
                    label="Length"
                    value={length}
                    onChange={(v) => {
                      setLength(v);
                      if (v) setDirectArea("");
                    }}
                    unit={unit}
                    placeholder="12"
                  />
                  <NumberInput
                    label="Width"
                    value={width}
                    onChange={(v) => {
                      setWidth(v);
                      if (v) setDirectArea("");
                    }}
                    unit={unit}
                    placeholder="10"
                  />
                </div>
              </div>

              {/* ── OR Divider ── */}
              <div
                className="flex items-center"
                style={{ gap: "12px", marginBottom: "20px" }}
              >
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background: "rgba(43,36,28,0.08)",
                  }}
                />
                <span className="text-[0.5rem] font-medium tracking-[0.14em] uppercase text-ink-muted">
                  or enter area
                </span>
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background: "rgba(43,36,28,0.08)",
                  }}
                />
              </div>

              {/* ── Direct Area ── */}
              <div style={{ marginBottom: "28px" }}>
                <NumberInput
                  label="Total Area"
                  value={directArea}
                  onChange={(v) => {
                    setDirectArea(v);
                    if (v) {
                      setLength("");
                      setWidth("");
                    }
                  }}
                  unit={unit === "ft" ? "sq ft" : "sq m"}
                  placeholder="120"
                />
              </div>

              {/* ── Tile Size Selector ── */}
              <div style={{ marginBottom: "28px" }}>
                <SectionLabel icon={Grid3X3} label="Tile Size" />
                <div className="grid grid-cols-3" style={{ gap: "10px" }}>
                  {TILE_DATA.map((t, i) => {
                    const isActive = selectedTile === i;
                    const ratio = t.dimMm[1] / t.dimMm[0];
                    const isSquare = ratio === 1;
                    return (
                      <button
                        key={t.size}
                        type="button"
                        onClick={() => setSelectedTile(i)}
                        className="text-center"
                        style={{
                          padding: "12px 6px 10px",
                          borderRadius: "8px",
                          border: `1px solid ${isActive ? "var(--color-accent)" : "rgba(43,36,28,0.08)"}`,
                          background: isActive
                            ? "rgba(181,138,82,0.06)"
                            : "transparent",
                          cursor: "pointer",
                          transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                        }}
                      >
                        {/* Mini tile shape */}
                        <div
                          className="mx-auto"
                          style={{
                            width: isSquare ? "16px" : "12px",
                            height: isSquare ? "16px" : `${12 * ratio}px`,
                            border: `1.5px solid ${isActive ? "var(--color-accent)" : "rgba(43,36,28,0.15)"}`,
                            borderRadius: "1.5px",
                            marginBottom: "6px",
                            transition: "border-color 0.3s",
                          }}
                        />
                        <p
                          className="font-medium"
                          style={{
                            fontSize: "0.75rem",
                            color: isActive
                              ? "var(--color-accent)"
                              : "var(--color-ink)",
                            transition: "color 0.3s",
                            lineHeight: 1.2,
                          }}
                        >
                          {t.label}
                        </p>
                        <p
                          className="text-ink-muted"
                          style={{
                            fontSize: "0.48rem",
                            marginTop: "2px",
                            letterSpacing: "0.06em",
                          }}
                        >
                          mm
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── Wastage Allowance ── */}
              <div style={{ marginBottom: hasInput ? "24px" : "0" }}>
                <SectionLabel icon={Percent} label="Wastage Allowance" />
                <div className="grid grid-cols-3" style={{ gap: "10px" }}>
                  {WASTAGE_OPTIONS.map((w) => {
                    const isActive = wastage === w.value;
                    return (
                      <button
                        key={w.value}
                        type="button"
                        onClick={() => setWastage(w.value)}
                        className="text-center"
                        style={{
                          padding: "12px 6px 10px",
                          borderRadius: "8px",
                          border: `1px solid ${isActive ? "var(--color-accent)" : "rgba(43,36,28,0.08)"}`,
                          background: isActive
                            ? "rgba(181,138,82,0.06)"
                            : "transparent",
                          cursor: "pointer",
                          transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                        }}
                      >
                        <p
                          className="font-display"
                          style={{
                            fontSize: "1rem",
                            fontWeight: 400,
                            color: isActive
                              ? "var(--color-accent)"
                              : "var(--color-ink)",
                            transition: "color 0.3s",
                            lineHeight: 1,
                            marginBottom: "4px",
                          }}
                        >
                          {w.label}
                        </p>
                        <p
                          className="text-ink-muted"
                          style={{ fontSize: "0.48rem", letterSpacing: "0.04em" }}
                        >
                          {w.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── Clear Button ── */}
              {hasInput && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="flex items-center text-ink-muted hover:text-accent"
                  style={{
                    gap: "6px",
                    fontSize: "0.65rem",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase" as const,
                    cursor: "pointer",
                    transition: "color 0.3s",
                    background: "none",
                    border: "none",
                    padding: 0,
                  }}
                >
                  <RotateCcw size={11} />
                  Clear
                </button>
              )}
            </div>
          </FadeIn>

          {/* ═══════════ RIGHT — Results ═══════════ */}
          <FadeIn delay={0.1} className="flex-1 min-w-0 flex flex-col">
            <div className="flex-1 flex flex-col justify-center">
              {results ? (
                <div>
                  {/* Room area header */}
                  <div
                    className="flex items-end justify-between flex-wrap"
                    style={{ marginBottom: "24px", gap: "12px" }}
                  >
                    <div>
                      <p
                        className="text-[0.55rem] font-medium tracking-[0.16em] uppercase text-ink-muted"
                        style={{ marginBottom: "6px" }}
                      >
                        Your Room Area
                      </p>
                      <p
                        className="font-serif font-light text-ink"
                        style={{ fontSize: "1.5rem", lineHeight: 1 }}
                      >
                        {results.areaSqft}{" "}
                        <span className="text-ink-muted" style={{ fontSize: "0.7rem" }}>
                          sq ft
                        </span>
                        <span className="text-ink-muted" style={{ fontSize: "0.65rem", marginLeft: "6px" }}>
                          ({results.areaSqm} sq m)
                        </span>
                      </p>
                    </div>
                    <p
                      className="text-[0.55rem] font-medium tracking-[0.1em] uppercase"
                      style={{
                        padding: "5px 12px",
                        borderRadius: "20px",
                        background: "var(--color-accent-subtle)",
                        color: "var(--color-accent)",
                        border: "1px solid rgba(181,138,82,0.1)",
                      }}
                    >
                      {tile.label} mm
                    </p>
                  </div>

                  {/* ── Primary result card ── */}
                  <div
                    style={{
                      padding: "32px",
                      background: "var(--color-surface-card)",
                      borderRadius: "12px",
                      border: "1px solid rgba(43,36,28,0.06)",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 6px 24px rgba(0,0,0,0.03)",
                      marginBottom: "16px",
                      position: "relative" as const,
                      overflow: "hidden" as const,
                    }}
                  >
                    {/* Corner glow */}
                    <div
                      className="absolute top-0 right-0 pointer-events-none"
                      style={{
                        width: "100px",
                        height: "100px",
                        background:
                          "radial-gradient(ellipse at 100% 0%, rgba(181,138,82,0.05) 0%, transparent 70%)",
                      }}
                    />

                    <div className="relative">
                      <p
                        className="text-[0.55rem] font-medium tracking-[0.16em] uppercase text-ink-muted"
                        style={{ marginBottom: "10px" }}
                      >
                        Total Tiles Needed
                      </p>

                      {/* Big number */}
                      <div
                        className="flex items-baseline"
                        style={{ gap: "10px", marginBottom: "20px" }}
                      >
                        <p
                          className="font-display font-light"
                          style={{
                            fontSize: "clamp(3rem, 6vw, 5rem)",
                            lineHeight: 0.85,
                            color: "var(--color-accent)",
                            letterSpacing: "-0.02em",
                          }}
                        >
                          {results.totalTiles}
                        </p>
                        <span className="text-ink-muted font-light" style={{ fontSize: "0.8rem" }}>
                          tiles
                        </span>
                      </div>

                      {/* Gold divider */}
                      <div
                        style={{
                          width: "48px",
                          height: "1.5px",
                          background:
                            "linear-gradient(90deg, var(--color-accent), transparent)",
                          marginBottom: "20px",
                        }}
                      />

                      {/* Breakdown */}
                      <div className="grid grid-cols-3" style={{ gap: "16px" }}>
                        <div>
                          <p className="text-[0.48rem] font-medium tracking-[0.14em] uppercase text-ink-muted" style={{ marginBottom: "4px" }}>
                            Base Tiles
                          </p>
                          <p className="font-display font-light text-ink" style={{ fontSize: "1.2rem", lineHeight: 1 }}>
                            {results.tilesNeeded}
                          </p>
                        </div>
                        <div>
                          <p className="text-[0.48rem] font-medium tracking-[0.14em] uppercase text-ink-muted" style={{ marginBottom: "4px" }}>
                            Wastage +{wastage}%
                          </p>
                          <p className="font-display font-light" style={{ fontSize: "1.2rem", lineHeight: 1, color: "var(--color-accent)" }}>
                            +{results.wastageExtra}
                          </p>
                        </div>
                        <div>
                          <p className="text-[0.48rem] font-medium tracking-[0.14em] uppercase text-ink-muted" style={{ marginBottom: "4px" }}>
                            Per Tile
                          </p>
                          <p className="font-display font-light text-ink" style={{ fontSize: "1.2rem", lineHeight: 1 }}>
                            {tile.sqmPerTile}
                            <span className="text-ink-muted" style={{ fontSize: "0.55rem", marginLeft: "2px" }}>m²</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ── Secondary cards ── */}
                  <div className="grid grid-cols-2" style={{ gap: "16px", marginBottom: "32px" }}>
                    {/* Boxes */}
                    <div
                      style={{
                        padding: "20px",
                        background: "rgba(181,138,82,0.04)",
                        borderRadius: "10px",
                        border: "1px solid rgba(181,138,82,0.1)",
                      }}
                    >
                      <p className="text-[0.48rem] font-medium tracking-[0.14em] uppercase text-ink-muted" style={{ marginBottom: "6px" }}>
                        Boxes to Buy
                      </p>
                      <p className="font-display font-light" style={{ fontSize: "1.5rem", lineHeight: 1, color: "var(--color-accent)" }}>
                        {results.boxesNeeded}
                      </p>
                      <p className="text-[0.6rem] text-ink-muted" style={{ marginTop: "4px" }}>
                        {tile.tilesPerBox} tiles per box
                      </p>
                    </div>

                    {/* Coverage */}
                    <div
                      style={{
                        padding: "20px",
                        background: "var(--color-surface-card)",
                        borderRadius: "10px",
                        border: "1px solid rgba(43,36,28,0.06)",
                      }}
                    >
                      <p className="text-[0.48rem] font-medium tracking-[0.14em] uppercase text-ink-muted" style={{ marginBottom: "6px" }}>
                        Total Coverage
                      </p>
                      <p className="font-display font-light text-ink" style={{ fontSize: "1.5rem", lineHeight: 1 }}>
                        {(results.totalTiles * tile.sqmPerTile).toFixed(1)}
                      </p>
                      <p className="text-[0.6rem] text-ink-muted" style={{ marginTop: "4px" }}>
                        sq m ({(results.totalTiles * tile.sqmPerTile * SQM_TO_SQFT).toFixed(1)} sq ft)
                      </p>
                    </div>
                  </div>

                  {/* ── Divider ── */}
                  <div
                    style={{
                      width: "100%",
                      height: "1px",
                      background: "linear-gradient(90deg, transparent, rgba(43,36,28,0.08) 20%, rgba(43,36,28,0.08) 80%, transparent)",
                      marginBottom: "32px",
                    }}
                  />

                  {/* ── Actions ── */}
                  <div className="flex flex-wrap items-center" style={{ gap: "12px" }}>
                    <a
                      href={`mailto:sales@primeceramics.com.np?subject=Tile%20Quote%20Request&body=${encodeURIComponent(quoteBody)}`}
                      className="btn-gold group"
                    >
                      Request a Quote
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="btn-line group"
                      style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      {copied ? "Copied!" : "Copy Result"}
                    </button>
                  </div>
                </div>
              ) : (
                /* ═══════════ Empty State (Light) ═══════════ */
                <div
                  className="flex flex-col items-center justify-center text-center relative overflow-hidden"
                  style={{
                    padding: "56px 32px",
                    background: "var(--color-surface-card)",
                    borderRadius: "12px",
                    border: "1px solid rgba(43,36,28,0.06)",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 6px 24px rgba(0,0,0,0.03)",
                    height: "100%",
                    minHeight: "480px",
                  }}
                >
                  {/* Subtle tile pattern */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.025]"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='1' y='1' width='22' height='22' fill='none' stroke='%232b241c' stroke-width='0.4'/%3E%3Crect x='25' y='25' width='22' height='22' fill='none' stroke='%232b241c' stroke-width='0.4'/%3E%3C/svg%3E\")",
                    }}
                  />

                  {/* Radial warm glow */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(181,138,82,0.04) 0%, transparent 60%)",
                    }}
                  />

                  <div className="relative z-10 flex flex-col items-center">
                    {/* Tile grid illustration */}
                    <div style={{ marginBottom: "28px" }}>
                      <svg
                        width="56"
                        height="56"
                        viewBox="0 0 56 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="4"
                          y="4"
                          width="20"
                          height="20"
                          rx="2"
                          stroke="var(--color-accent)"
                          strokeWidth="1"
                          opacity="0.3"
                        />
                        <rect
                          x="32"
                          y="4"
                          width="20"
                          height="20"
                          rx="2"
                          stroke="var(--color-accent)"
                          strokeWidth="1"
                          opacity="0.2"
                        />
                        <rect
                          x="4"
                          y="32"
                          width="20"
                          height="20"
                          rx="2"
                          stroke="var(--color-accent)"
                          strokeWidth="1"
                          opacity="0.2"
                        />
                        <rect
                          x="32"
                          y="32"
                          width="20"
                          height="20"
                          rx="2"
                          stroke="var(--color-accent)"
                          strokeWidth="1"
                          opacity="0.15"
                        />
                      </svg>
                    </div>

                    <p
                      className="font-serif font-light text-ink"
                      style={{
                        fontSize: "1.4rem",
                        marginBottom: "12px",
                        lineHeight: 1.2,
                      }}
                    >
                      Your Results
                    </p>

                    {/* Gold accent */}
                    <div
                      style={{
                        width: "32px",
                        height: "1.5px",
                        background:
                          "linear-gradient(90deg, transparent, var(--color-accent), transparent)",
                        marginBottom: "16px",
                      }}
                    />

                    <p
                      className="text-ink-muted"
                      style={{
                        fontSize: "0.82rem",
                        maxWidth: "300px",
                        lineHeight: 1.65,
                        marginBottom: "32px",
                      }}
                    >
                      Enter your room dimensions on the left. Your tile
                      estimate will appear here instantly.
                    </p>

                    {/* Step flow */}
                    <div
                      className="flex items-center"
                      style={{ gap: "16px" }}
                    >
                      {[
                        { icon: Ruler, text: "Dimensions" },
                        { icon: Grid3X3, text: "Tile Size" },
                        { icon: Package, text: "Results" },
                      ].map((step, i) => (
                        <div
                          key={step.text}
                          className="flex items-center"
                          style={{ gap: "6px" }}
                        >
                          {i > 0 && (
                            <div
                              style={{
                                width: "16px",
                                height: "1px",
                                background: "rgba(43,36,28,0.1)",
                                marginRight: "10px",
                              }}
                            />
                          )}
                          <step.icon
                            size={13}
                            style={{
                              color: "var(--color-accent)",
                              opacity: 0.4,
                            }}
                          />
                          <span className="text-[0.58rem] font-medium tracking-[0.06em] uppercase text-ink-muted">
                            {step.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
