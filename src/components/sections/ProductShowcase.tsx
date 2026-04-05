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
        className="overflow-hidden mb-8 border border-ink-faint/30 bg-surface-alt shadow-[0_4px_40px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.03)]"
      >
        <div
          className={`grid grid-cols-1 md:grid-cols-12 gap-0 items-stretch ${
            !isEven ? "md:[direction:rtl]" : ""
          }`}
        >
          {/* Image side — 6 cols */}
          <div className="md:col-span-6 relative overflow-hidden md:[direction:ltr]">
            <div
              className="h-full min-h-[260px] md:min-h-[380px] max-h-[460px]"
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
                loading="lazy"
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
            className="md:col-span-6 flex flex-col justify-center relative overflow-hidden md:[direction:ltr]"
            style={{ padding: "clamp(48px, 6vw, 80px) clamp(32px, 7vw, 96px)" }}
          >
            {/* Small index + category tag */}
            <div
              className="flex items-center"
              style={{
                gap: "16px",
                marginBottom: "24px",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(15px)",
                transition:
                  "opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDelay: "0.1s",
              }}
            >
              <span className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-ink-muted">
                {indexLabel}
              </span>
              <span className="w-8 h-[1px] bg-accent" />
              <span className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-accent">
                {item.label}
              </span>
            </div>

            {/* Category name */}
            <h3
              className="font-serif font-light text-ink uppercase"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                letterSpacing: "0.06em",
                lineHeight: 1,
                marginBottom: "24px",
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
              style={{
                marginBottom: "32px",
                opacity: visible ? 1 : 0,
                width: visible ? "48px" : "0px",
                transition:
                  "opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), width 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDelay: "0.25s",
              }}
            >
              <div className="h-[1.5px] bg-accent" />
            </div>

            {/* Description */}
            <p
              className="text-ink-light max-w-md leading-[1.85]"
              style={{
                fontSize: "clamp(0.85rem, 1.05vw, 0.95rem)",
                letterSpacing: "0.015em",
                wordSpacing: "0.05em",
                marginBottom: "48px",
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
              <a href={`/catalog?type=${encodeURIComponent(item.name.toLowerCase().replace(/\s+/g, '-'))}`} className="link-arrow text-[0.7rem]">
                Explore {item.name} <ArrowRight size={13} />
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductShowcase() {
  return (
    <section className="relative bg-surface" style={{ padding: "clamp(100px, 12vw, 180px) 0" }}>
      <div className="container relative z-[1]">
        {/* Section header */}
        <div style={{ marginBottom: "64px" }}>
          <p className="eyebrow text-accent" style={{ marginBottom: "16px" }}>
            Our Collections
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between" style={{ gap: "16px" }}>
            <h2 className="h2">Crafted for Every Surface</h2>
            <a href="/catalog" className="link-arrow text-[0.65rem]">
              View All Collections <ArrowRight size={12} />
            </a>
          </div>
          <div style={{ marginTop: "24px", height: "1px" }} className="bg-ink-faint" />
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
