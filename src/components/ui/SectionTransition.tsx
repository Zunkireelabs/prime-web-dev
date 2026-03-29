"use client";

interface SectionTransitionProps {
  from: "dark" | "light";
  to: "dark" | "light";
  variant?: "diagonal" | "wave" | "mosaic";
}

const colors = {
  dark: "var(--bg-dark)",
  light: "var(--bg)",
};

export default function SectionTransition({
  from,
  to,
  variant = "diagonal",
}: SectionTransitionProps) {
  const fromColor = colors[from];
  const toColor = colors[to];

  if (variant === "wave") {
    return (
      <div aria-hidden="true" className="relative" style={{ marginTop: "-1px" }}>
        {/* Top color fill */}
        <div className="h-8 md:h-12" style={{ background: fromColor }} />
        {/* SVG wave */}
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full block"
          style={{ height: "clamp(40px, 5vw, 80px)" }}
        >
          <path
            d="M0,0 C360,80 1080,0 1440,80 L1440,0 L0,0 Z"
            fill={fromColor}
          />
          <path
            d="M0,80 C360,0 1080,80 1440,0 L1440,80 L0,80 Z"
            fill={toColor}
          />
          {/* Thin accent line along the curve */}
          <path
            d="M0,40 C360,80 1080,0 1440,40"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
            opacity="0.3"
          />
        </svg>
        {/* Bottom color fill */}
        <div className="h-8 md:h-12" style={{ background: toColor }} />
      </div>
    );
  }

  if (variant === "mosaic") {
    return (
      <div aria-hidden="true" className="relative overflow-hidden" style={{ marginTop: "-1px" }}>
        {/* Gradient bg */}
        <div
          className="py-8 md:py-12 flex items-center justify-center"
          style={{ background: `linear-gradient(to bottom, ${fromColor} 0%, ${fromColor} 30%, ${toColor} 70%, ${toColor} 100%)` }}
        >
          {/* Mosaic tile strip */}
          <div className="container">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="h-[1px] flex-1" style={{ background: from === "dark" ? "rgba(234,231,226,0.06)" : "var(--ink-faint)" }} />
              {/* Small tile squares */}
              <div className="flex gap-[3px]">
                {[0.08, 0.15, 0.25, 0.4, 0.6, 0.4, 0.25, 0.15, 0.08].map((opacity, i) => (
                  <div
                    key={i}
                    className="w-[6px] h-[6px] md:w-2 md:h-2"
                    style={{
                      background: "var(--accent)",
                      opacity,
                    }}
                  />
                ))}
              </div>
              <div className="h-[1px] flex-1" style={{ background: to === "dark" ? "rgba(234,231,226,0.06)" : "var(--ink-faint)" }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default: diagonal
  return (
    <div aria-hidden="true" className="relative" style={{ marginTop: "-1px" }}>
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="w-full block"
        style={{ height: "clamp(50px, 6vw, 100px)" }}
      >
        {/* Top triangle */}
        <polygon points="0,0 1440,0 1440,30 0,100" fill={fromColor} />
        {/* Bottom triangle */}
        <polygon points="0,100 1440,30 1440,100" fill={toColor} />
        {/* Accent line at the diagonal seam */}
        <line
          x1="0" y1="100"
          x2="1440" y2="30"
          stroke="var(--accent)"
          strokeWidth="1.5"
          opacity="0.35"
        />
      </svg>
    </div>
  );
}
