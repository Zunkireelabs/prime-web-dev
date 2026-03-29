"use client";

import { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { productCategories as categories } from "@/data/collections";

function StickyCard({
  item,
  index,
  total,
}: {
  item: (typeof categories)[0];
  index: number;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isEven = index % 2 === 0;
  const indexLabel = String(index + 1).padStart(2, "0");

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stickyTop = 70 + index * 14;

  return (
    <div
      className="sticky"
      style={{ top: `${stickyTop}px`, zIndex: index + 1 }}
    >
      <div
        ref={cardRef}
        className="overflow-hidden mb-5 border border-[var(--ink-faint)]/30"
        style={{
          background: "var(--bg-alt)",
          boxShadow: "0 4px 40px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.03)",
        }}
      >
        <div
          className={`grid grid-cols-1 md:grid-cols-12 gap-0 items-stretch ${
            !isEven ? "md:[direction:rtl]" : ""
          }`}
        >
          {/* Image side — 6 cols */}
          <div className="md:col-span-6 relative overflow-hidden md:[direction:ltr]">
            <div
              className="h-full min-h-[250px] md:min-h-[340px] max-h-[420px]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible
                  ? "scale(1)"
                  : `scale(1.05)`,
                transition:
                  "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 1s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-[1s] ease-[cubic-bezier(0.22,1,0.36,1)]"
              />
            </div>

            {/* Index number overlay on image */}
            <span
              className="absolute top-5 font-serif text-white/20 pointer-events-none leading-none"
              style={{
                fontSize: "clamp(4rem, 8vw, 7rem)",
                fontWeight: 300,
                ...(isEven ? { left: "20px" } : { right: "20px" }),
              }}
            >
              {indexLabel}
            </span>
          </div>

          {/* Content side — 6 cols */}
          <div
            className="md:col-span-6 flex flex-col justify-center px-6 py-8 md:px-10 md:py-10 lg:px-14 lg:py-12 relative overflow-hidden md:[direction:ltr]"
          >
            {/* Subtle tile-grid texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, var(--ink) 1px, transparent 1px),
                  linear-gradient(to bottom, var(--ink) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Small index + category tag */}
            <div
              className="flex items-center gap-3 mb-6"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(15px)",
                transition:
                  "opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDelay: "0.1s",
              }}
            >
              <span className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-[var(--ink-muted)]">
                {indexLabel}
              </span>
              <span className="w-8 h-[1px] bg-[var(--accent)]" />
              <span className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-[var(--accent)]">
                {item.label}
              </span>
            </div>

            {/* Category name */}
            <h3
              className="font-serif font-light text-[var(--ink)] uppercase mb-2"
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                letterSpacing: "0.06em",
                lineHeight: 1,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(25px)",
                transition:
                  "opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDelay: "0.2s",
              }}
            >
              {item.name}
            </h3>

            {/* Accent divider */}
            <div
              className="mb-5"
              style={{
                opacity: visible ? 1 : 0,
                width: visible ? "48px" : "0px",
                transition:
                  "opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), width 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDelay: "0.25s",
              }}
            >
              <div className="h-[1.5px] bg-[var(--accent)]" />
            </div>

            {/* Description */}
            <p
              className="text-[var(--ink-light)] max-w-md leading-[1.8] mb-7"
              style={{
                fontSize: "clamp(0.82rem, 1vw, 0.9rem)",
                letterSpacing: "0.01em",
                wordSpacing: "0.05em",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(18px)",
                transition:
                  "opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDelay: "0.3s",
              }}
            >
              {item.description}
            </p>

            {/* CTA */}
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                transition:
                  "opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDelay: "0.4s",
              }}
            >
              <a href={`/catalog?type=${encodeURIComponent(item.name.toLowerCase().replace(/\s+/g, '-'))}`} className="link-arrow text-[0.65rem]">
                Explore {item.name} <ArrowRight size={12} />
              </a>
            </div>

            {/* Decorative corner accent — thin L-shape */}
            <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
              <div className="absolute bottom-0 right-0 w-full h-[1px] bg-[var(--accent)] opacity-20" />
              <div className="absolute bottom-0 right-0 w-[1px] h-full bg-[var(--accent)] opacity-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductShowcase() {
  return (
    <section className="section-pad relative" style={{ background: "var(--bg)" }}>
      {/* Full-section tile texture background — uses clip-path instead of overflow-hidden to preserve sticky */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.02, clipPath: "inset(0)" }}
      >
        {/* Large grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--ink) 1px, transparent 1px),
              linear-gradient(to bottom, var(--ink) 1px, transparent 1px)
            `,
            backgroundSize: "120px 120px",
          }}
        />
        {/* Diagonal accent lines */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 169px,
              var(--accent) 169px,
              var(--accent) 170px
            )`,
            opacity: 0.4,
          }}
        />
      </div>

      <div className="container relative z-[1]">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <p className="eyebrow text-[var(--accent)] mb-4">
            Our Collections
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="h2">Crafted for Every Surface</h2>
            <a href="/catalog" className="link-arrow text-[0.65rem]">
              View All Collections <ArrowRight size={12} />
            </a>
          </div>
          <div className="mt-6 h-[1px] bg-[var(--ink-faint)]" />
        </div>

        {/* Sticky stacking cards */}
        <div>
          {categories.map((item, i) => (
            <StickyCard
              key={item.name}
              item={item}
              index={i}
              total={categories.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
