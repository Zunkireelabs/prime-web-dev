"use client";

export default function NewsHero() {
  return (
    <section
      className="relative bg-surface-dark"
      style={{
        paddingTop: "clamp(140px, 18vw, 200px)",
        paddingBottom: "clamp(80px, 10vw, 120px)",
      }}
    >
      <div className="container">
        <div
          className="max-w-3xl"
          style={{ display: "flex", flexDirection: "column", gap: "24px" }}
        >
          <p className="eyebrow text-accent">News & Media</p>
          <h1
            className="font-serif font-light text-white"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.25rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.015em",
            }}
          >
            In the press
          </h1>
          <p
            className="font-light text-white/70"
            style={{
              fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
              lineHeight: 1.7,
              maxWidth: "640px",
            }}
          >
            Coverage of Prime Ceramics across Nepali and international press —
            from the launch of Nepal's first wall-and-floor tile manufacturing
            facility to becoming the country's only NS-certified tile maker.
          </p>
        </div>
      </div>
    </section>
  );
}
