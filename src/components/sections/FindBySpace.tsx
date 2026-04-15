"use client";

import { useState, useEffect, useRef } from "react";
import FadeIn from "@/components/animations/FadeIn";
import { ArrowRight } from "lucide-react";
import { spaces } from "@/data/spaces";

export default function FindBySpace() {
  const [active, setActive] = useState(0);
  const [autoCycle, setAutoCycle] = useState(true);
  const [mobileIndex, setMobileIndex] = useState(0);
  const touchStartX = useRef(0);

  // Auto-cycle every 5s
  useEffect(() => {
    if (!autoCycle) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % spaces.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoCycle]);

  const goTo = (i: number) => {
    setActive(i);
    setAutoCycle(false);
  };

  // Mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && mobileIndex < spaces.length - 1) setMobileIndex(mobileIndex + 1);
      if (diff < 0 && mobileIndex > 0) setMobileIndex(mobileIndex - 1);
    }
  };

  return (
    <section className="bg-surface overflow-hidden" style={{ padding: "clamp(100px, 12vw, 180px) 0" }}>
      {/* Section header */}
      <div className="container">
        <FadeIn>
          <div className="flex items-end justify-between" style={{ marginBottom: "clamp(40px, 5vw, 56px)" }}>
            <div>
              <p className="eyebrow text-accent" style={{ marginBottom: "16px" }}>
                Find Tiles By Space
              </p>
              <h2 className="h2 text-ink">Explore By Room</h2>
            </div>
            <a href="/catalog" className="link-arrow text-[0.65rem] hidden md:flex">
              View All Spaces <ArrowRight size={12} />
            </a>
          </div>
        </FadeIn>
      </div>

      {/* ─── DESKTOP ACCORDION (lg+) ─── */}
      <div className="hidden lg:block">
        <div className="container">
          <div className="flex h-[520px] xl:h-[580px] gap-4">
            {spaces.map((space, i) => {
              const isActive = i === active;
              return (
                <div
                  key={space.name}
                  role="button"
                  tabIndex={0}
                  className="relative overflow-hidden cursor-pointer group"
                  style={{
                    flex: isActive ? "5" : "1",
                    transition: "flex 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                  onMouseEnter={() => goTo(i)}
                  onMouseLeave={() => setAutoCycle(true)}
                  onClick={() => goTo(i)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goTo(i); } }}
                  aria-label={`Explore ${space.name}`}
                >
                  {/* Background image */}
                  <img
                    src={space.image}
                    alt={space.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-linear"
                    style={{
                      transform: isActive ? "scale(1.05)" : "scale(1.15)",
                      filter: isActive ? "grayscale(0) brightness(0.9)" : "grayscale(0.7) brightness(0.4)",
                      transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), filter 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  />

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-700"
                    style={{
                      background: isActive
                        ? "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.35) 40%, transparent 65%)"
                        : "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 100%)",
                    }}
                  />

                  {/* ── Collapsed state: vertical text ── */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-[600ms]"
                    style={{ opacity: isActive ? 0 : 1, pointerEvents: isActive ? "none" : "auto" }}
                  >
                    {/* Number */}
                    <span className="text-[0.5rem] font-medium tracking-[0.2em] text-accent-light" style={{ marginBottom: "12px", display: "block" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* Vertical name */}
                    <span
                      className="text-sm font-serif font-light text-white/60 group-hover:text-white/90 tracking-[0.1em] transition-colors duration-300"
                      style={{ writingMode: "vertical-lr", textOrientation: "mixed" }}
                    >
                      {space.short}
                    </span>
                  </div>

                  {/* ── Expanded state: full content ── */}
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-12 xl:p-16 transition-opacity duration-[600ms]"
                    style={{
                      opacity: isActive ? 1 : 0,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    <p className="text-[0.55rem] font-medium tracking-[0.35em] uppercase text-accent-light" style={{ marginBottom: "12px" }}>
                      {String(i + 1).padStart(2, "0")} / {String(spaces.length).padStart(2, "0")}
                    </p>
                    <h3
                      className="font-serif font-light text-white leading-[1.05]"
                      style={{
                        fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                        marginBottom: "16px",
                        transform: isActive ? "translateY(0)" : "translateY(20px)",
                        transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s",
                      }}
                    >
                      {space.name}
                    </h3>
                    <p
                      className="text-sm text-white/45 max-w-sm leading-relaxed"
                      style={{
                        marginBottom: "32px",
                        transform: isActive ? "translateY(0)" : "translateY(15px)",
                        opacity: isActive ? 1 : 0,
                        transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.15s, opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.15s",
                      }}
                    >
                      {space.subtitle}
                    </p>
                    <a
                      href={`/products?search=${encodeURIComponent(space.name)}`}
                      className="link-arrow text-white/50 hover:text-accent-light text-[0.6rem]"
                      style={{
                        transform: isActive ? "translateY(0)" : "translateY(10px)",
                        opacity: isActive ? 1 : 0,
                        transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s, opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.2s",
                      }}
                    >
                      Explore {space.name} <ArrowRight size={11} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── MOBILE (< lg) — Swipeable fullscreen carousel ─── */}
      <div
        className="lg:hidden relative h-[75vh] min-h-[400px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {spaces.map((space, i) => (
          <div
            key={space.name}
            className="absolute inset-0 transition-opacity duration-[600ms]"
            style={{ opacity: i === mobileIndex ? 1 : 0 }}
          >
            <img
              src={space.image}
              alt={space.name}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/20 z-[1]" />

        <div className="absolute inset-0 z-10 flex flex-col justify-end" style={{ padding: "32px clamp(20px, 5vw, 40px) 48px" }}>
          <p className="text-[0.65rem] font-medium tracking-[0.3em] uppercase text-accent-light" style={{ marginBottom: "12px" }}>
            Find Tiles By Space
          </p>

          <p className="text-[0.6rem] font-medium tracking-[0.2em] text-white/30" style={{ marginBottom: "8px" }}>
            <span className="text-accent-light">{String(mobileIndex + 1).padStart(2, "0")}</span>
            <span style={{ marginLeft: "6px", marginRight: "6px" }}>/</span>
            {String(spaces.length).padStart(2, "0")}
          </p>

          <h2
            className="font-serif font-light text-white leading-[1.05]"
            style={{ fontSize: "clamp(2.2rem, 8vw, 3rem)", marginBottom: "16px" }}
          >
            {spaces[mobileIndex].name}
          </h2>

          <p className="text-sm text-white/50" style={{ marginBottom: "32px" }}>
            {spaces[mobileIndex].subtitle}
          </p>

          <div className="flex" style={{ gap: "10px", marginBottom: "32px" }}>
            {spaces.map((_, i) => (
              <button
                key={i}
                onClick={() => setMobileIndex(i)}
                className="h-[2px] transition-all duration-300"
                style={{
                  width: i === mobileIndex ? "28px" : "10px",
                  background: i === mobileIndex ? "var(--color-accent-light)" : "rgba(255,255,255,0.2)",
                }}
                aria-label={`Go to ${spaces[i].name}`}
              />
            ))}
          </div>

          <a href={`/products?search=${encodeURIComponent(spaces[mobileIndex].name)}`} className="link-arrow text-white/60 hover:text-white text-[0.6rem]">
            Explore {spaces[mobileIndex].name} <ArrowRight size={11} />
          </a>
        </div>
      </div>
    </section>
  );
}
