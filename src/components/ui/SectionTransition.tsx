"use client";

interface SectionTransitionProps {
  from: "dark" | "light" | "light-alt" | "red";
  to: "dark" | "light" | "light-alt" | "red";
  variant?: "diagonal" | "wave" | "mosaic";
}

const colors: Record<string, string> = {
  dark: "var(--color-surface-dark)",
  light: "var(--color-surface)",
  "light-alt": "var(--color-surface-alt)",
  red: "var(--color-surface-red)",
};

export default function SectionTransition({
  from,
  to,
  variant = "diagonal",
}: SectionTransitionProps) {
  const fromColor = colors[from];
  const toColor = colors[to];
  const touchesRed = from === "red" || to === "red";
  const accentColor = touchesRed ? "rgba(253, 224, 219, 0.2)" : "rgba(181, 138, 82, 0.25)";
  const accentDotColor = touchesRed ? "var(--color-red-light)" : "var(--color-accent)";

  if (variant === "wave") {
    return (
      <div aria-hidden="true" className="relative block leading-[0]" style={{ marginTop: "-1px", marginBottom: "-1px", background: toColor }}>
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="w-full block"
          style={{ height: "clamp(20px, 3vw, 40px)" }}
        >
          <path d="M0,0 C480,60 960,0 1440,60 L1440,0 L0,0 Z" fill={fromColor} />
          <path d="M0,60 C480,-2 960,62 1440,-2 L1440,60 L0,60 Z" fill={toColor} />
        </svg>
      </div>
    );
  }

  if (variant === "mosaic") {
    return (
      <div aria-hidden="true" className="relative overflow-hidden" style={{ marginTop: "-1px" }}>
        <div
          className="py-4 md:py-6 flex items-center justify-center"
          style={{ background: `linear-gradient(to bottom, ${fromColor} 0%, ${fromColor} 35%, ${toColor} 65%, ${toColor} 100%)` }}
        >
          <div className="container">
            <div className="flex items-center gap-4">
              <div className="h-[1px] flex-1" style={{ background: from === "dark" || from === "red" ? "rgba(234,231,226,0.06)" : "var(--color-ink-faint)" }} />
              <div className="flex gap-[3px]">
                {[0.08, 0.15, 0.25, 0.4, 0.6, 0.4, 0.25, 0.15, 0.08].map((opacity, i) => (
                  <div
                    key={i}
                    className="w-[6px] h-[6px] md:w-2 md:h-2"
                    style={{ background: accentDotColor, opacity }}
                  />
                ))}
              </div>
              <div className="h-[1px] flex-1" style={{ background: to === "dark" || to === "red" ? "rgba(234,231,226,0.06)" : "var(--color-ink-faint)" }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default: diagonal
  return (
    <div aria-hidden="true" className="relative block leading-[0]" style={{ marginTop: "-1px", marginBottom: "-1px", background: toColor }}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full block"
        style={{ height: "clamp(24px, 3vw, 48px)" }}
      >
        <polygon points="0,0 1440,0 1440,18 0,80" fill={fromColor} />
        <polygon points="0,78 1440,18 1440,80 0,80" fill={toColor} />
      </svg>
    </div>
  );
}
