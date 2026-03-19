"use client";

interface SectionTransitionProps {
  variant?: "wave" | "diamond" | "ornament" | "fade-gradient";
}

export default function SectionTransition({
  variant = "fade-gradient",
}: SectionTransitionProps) {
  if (variant === "wave") {
    return (
      <div className="relative h-24 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
        >
          <path
            d="M0,30 C360,60 720,0 1080,30 C1260,45 1350,30 1440,30 L1440,60 L0,60 Z"
            fill="var(--bg-primary)"
            opacity="0.5"
          />
        </svg>
      </div>
    );
  }

  if (variant === "diamond") {
    return (
      <div className="flex items-center justify-center py-12 gap-4">
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[var(--gold)]" />
        <div className="w-2 h-2 rotate-45 border border-[var(--gold)]" />
        <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[var(--gold)]" />
      </div>
    );
  }

  if (variant === "ornament") {
    return (
      <div className="flex items-center justify-center py-12 gap-3">
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent to-[rgba(201,169,110,0.4)]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
        <div className="w-3 h-3 rotate-45 border border-[var(--gold)] opacity-60" />
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
        <div className="w-24 h-[1px] bg-gradient-to-l from-transparent to-[rgba(201,169,110,0.4)]" />
      </div>
    );
  }

  // fade-gradient
  return (
    <div className="h-24 bg-gradient-to-b from-transparent via-[rgba(201,169,110,0.03)] to-transparent" />
  );
}
