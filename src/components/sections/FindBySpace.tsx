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
                    className="absolute inset-0 transition-opacity duration-[600ms]"
                    style={{ opacity: isActive ? 0 : 1, pointerEvents: isActive ? "none" : "auto" }}
                  >
                    {/* Number pinned to top-center */}
                    <span
                      className="absolute left-1/2 -translate-x-1/2 text-[0.5rem] font-medium tracking-[0.2em] text-accent-light"
                      style={{ top: "20px" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* Vertical name absolutely centered */}
                    <span
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-serif font-light text-white/60 group-hover:text-white/90 tracking-[0.1em] transition-colors duration-300"
                      style={{ writingMode: "vertical-lr", textOrientation: "mixed" }}
                    >
                      {space.short}
                    </span>
                  </div>

                  {/* ── Expanded state: full content ── */}
                  <div
                    className="absolute inset-0 flex flex-col justify-end transition-opacity duration-[600ms]"
                    style={{
                      opacity: isActive ? 1 : 0,
                      pointerEvents: isActive ? "auto" : "none",
                      paddingTop: "clamp(32px, 4vw, 64px)",
                      paddingRight: "clamp(24px, 3vw, 48px)",
                      paddingBottom: "clamp(80px, 11vw, 130px)",
                      paddingLeft: "clamp(64px, 8vw, 96px)",
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
                      className="text-sm text-white/85 max-w-sm leading-relaxed"
                      style={{
                        marginBottom: "32px",
                        transform: isActive ? "translateY(0)" : "translateY(15px)",
                        opacity: isActive ? 1 : 0,
                        transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.15s, opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.15s",
                        textShadow: "0 1px 2px rgba(0,0,0,0.35)",
                      }}
                    >
                      {space.subtitle}
                    </p>
                    <a
                      href={`/products?space=${encodeURIComponent(space.name)}`}
                      className="inline-flex items-center self-start text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-white hover:text-accent-light transition-colors duration-300"
                      style={{
                        gap: "10px",
                        padding: "12px 20px",
                        border: "1px solid rgba(255,255,255,0.85)",
                        borderRadius: "100px",
                        background: "rgba(0,0,0,0.30)",
                        backdropFilter: "blur(6px)",
                        WebkitBackdropFilter: "blur(6px)",
                        textShadow: "0 1px 2px rgba(0,0,0,0.4)",
                        transform: isActive ? "translateY(0)" : "translateY(10px)",
                        opacity: isActive ? 1 : 0,
                        transitionProperty: "transform, opacity, color",
                        transitionDuration: "0.4s, 0.4s, 0.3s",
                        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1), cubic-bezier(0.22, 1, 0.36, 1), linear",
                        transitionDelay: "0.2s, 0.2s, 0s",
                      }}
                    >
                      Explore {space.name}
                      <ArrowRight size={12} strokeWidth={2} />
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

        <div className="absolute inset-0 z-[1]" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.15) 65%, transparent 100%)" }} />

        <div className="absolute inset-0 z-10 flex flex-col justify-end" style={{ padding: "32px clamp(20px, 5vw, 40px) 48px" }}>
          <p className="text-[0.65rem] font-medium tracking-[0.3em] uppercase text-accent-light" style={{ marginBottom: "12px" }}>
            Find Tiles By Space
          </p>

          <p className="text-[0.6rem] font-medium tracking-[0.2em] text-white/65" style={{ marginBottom: "8px" }}>
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

          <p className="text-sm text-white/85" style={{ marginBottom: "32px" }}>
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
                  background: i === mobileIndex ? "var(--color-accent-light)" : "rgba(255,255,255,0.45)",
                }}
                aria-label={`Go to ${spaces[i].name}`}
              />
            ))}
          </div>

          <a
            href={`/products?space=${encodeURIComponent(spaces[mobileIndex].name)}`}
            className="inline-flex items-center self-start text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-white hover:text-accent-light transition-colors duration-300"
            style={{
              gap: "10px",
              padding: "12px 20px",
              border: "1px solid rgba(255,255,255,0.85)",
              borderRadius: "100px",
              background: "rgba(0,0,0,0.35)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              textShadow: "0 1px 2px rgba(0,0,0,0.4)",
            }}
          >
            Explore {spaces[mobileIndex].name}
            <ArrowRight size={12} strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
}
