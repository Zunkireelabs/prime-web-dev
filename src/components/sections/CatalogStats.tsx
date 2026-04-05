"use client";

import FadeIn from "@/components/animations/FadeIn";

const stats = [
  { value: "395", label: "designs" },
  { value: "5", label: "catalogs" },
  { value: "4", label: "sizes" },
  { value: "5", label: "finishes" },
];

export default function CatalogStats() {
  return (
    <section className="bg-surface-dark relative overflow-hidden">
      {/* Subtle warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(181,138,82,0.06) 0%, transparent 70%)" }}
      />

      <div className="container relative z-10" style={{ padding: "clamp(40px, 5vw, 56px) 0" }}>
        <FadeIn>
          <div className="flex items-center justify-center" style={{ gap: "clamp(32px, 5vw, 56px)" }}>
            {stats.map((s, i) => (
              <div key={s.label} className="flex items-center" style={{ gap: "clamp(32px, 5vw, 56px)" }}>
                <div style={{ textAlign: "center" }}>
                  <p className="font-serif font-light text-accent-light leading-none" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", marginBottom: "6px" }}>
                    {s.value}
                  </p>
                  <p className="text-[0.55rem] font-medium tracking-[0.3em] uppercase text-ink-on-dark-light">
                    {s.label}
                  </p>
                </div>
                {i < stats.length - 1 && (
                  <div style={{ width: "1px", height: "32px", background: "rgba(255,255,255,0.08)" }} />
                )}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
