"use client";

import { useState, useEffect } from "react";

export default function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [phase, setPhase] = useState<"show" | "exit" | "done">("show");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"), 1200);
    const t2 = setTimeout(() => { setPhase("done"); onComplete?.(); }, 2100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none bg-[var(--bg)]"
    >
      {/* Two curtain panels */}
      <div
        className="absolute top-0 left-0 w-1/2 h-full bg-[var(--bg)]"
        style={{
          transform: phase === "exit" ? "translateX(-100%)" : "translateX(0)",
          transition: "transform 0.9s cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      />
      <div
        className="absolute top-0 right-0 w-1/2 h-full bg-[var(--bg)]"
        style={{
          transform: phase === "exit" ? "translateX(100%)" : "translateX(0)",
          transition: "transform 0.9s cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      />

      {/* Center content */}
      <div
        className="relative z-10 flex flex-col items-center"
        style={{
          opacity: phase === "exit" ? 0 : 1,
          transition: "opacity 0.3s linear",
        }}
      >
        <img
          src="/images/prime-logo.png"
          alt="Prime Tiles"
          className="h-16 md:h-20 w-auto"
        />

        {/* Accent line */}
        <div
          className="mt-5 h-[1.5px] bg-[var(--accent)] transition-all duration-700"
          style={{
            width: phase === "show" ? "48px" : "0px",
            transitionDelay: "0.2s",
          }}
        />

        <p className="mt-3 text-[0.55rem] font-medium tracking-[0.35em] uppercase text-[var(--ink-muted)]">
          Premium Ceramics
        </p>
      </div>
    </div>
  );
}
