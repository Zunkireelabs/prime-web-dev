"use client";

const items = [
  "Premium",
  "Luxury",
  "Excellence",
  "Craftsmanship",
  "Elegance",
  "Innovation",
  "Quality",
  "Distinction",
];

export default function MarqueeStrip() {
  return (
    <div className="bg-[var(--bg-secondary)] border-y border-[rgba(201,169,110,0.1)] py-4 overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="mx-8 text-sm uppercase tracking-[0.3em] text-[var(--text-muted)] font-light"
          >
            {item}
            <span className="mx-8 text-[var(--gold)] opacity-40">&#9670;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
