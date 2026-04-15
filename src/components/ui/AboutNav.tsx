"use client";

import { useState, useEffect } from "react";

const sections = [
  { id: "about-hero", label: "Hero" },
  { id: "narrative", label: "Our Story" },
  { id: "about-stats", label: "Impact" },
  { id: "about-purpose", label: "Purpose" },
  { id: "journey", label: "Journey" },
  { id: "manufacturing", label: "Craft" },
  { id: "about-certs", label: "Quality" },
  { id: "about-clients", label: "Trust" },
  { id: "about-cta", label: "Connect" },
];

export default function AboutNav() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sections.findIndex((s) => s.id === entry.target.id);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className="fixed right-12 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-4"
      aria-label="Page sections"
    >
      {sections.map((s, i) => (
        <button
          key={s.id}
          onClick={() => scrollTo(s.id)}
          className="group flex items-center gap-3"
          aria-label={`Go to ${s.label}`}
          aria-current={i === active ? "true" : undefined}
        >
          {/* Label — shows on hover */}
          <span
            className={`text-[0.55rem] font-medium tracking-[0.15em] uppercase transition-all duration-300 ${
              i === active
                ? "opacity-100 text-accent translate-x-0"
                : "opacity-0 text-ink-muted translate-x-2 group-hover:opacity-70 group-hover:translate-x-0"
            }`}
          >
            {s.label}
          </span>

          {/* Dot */}
          <span
            className={`block rounded-full transition-all duration-300 ${
              i === active
                ? "w-2.5 h-2.5 bg-accent shadow-[0_0_8px_rgba(181,138,82,0.4)]"
                : "w-1.5 h-1.5 bg-ink-muted/40 group-hover:bg-ink-muted group-hover:w-2 group-hover:h-2"
            }`}
          />
        </button>
      ))}
    </nav>
  );
}
