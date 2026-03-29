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
    <section className="bg-[var(--bg)] overflow-hidden">
      {/* Section header */}
      <div className="container pt-[var(--section-gap)]">
        <FadeIn>
          <div className="flex items-end justify-between mb-10 md:mb-14">
            <div>
              <p className="eyebrow text-[var(--accent)] mb-4">
                Find Tiles By Space
              </p>
              <h2 className="h2 text-[var(--ink)]">Explore By Room</h2>
            </div>
            <a href="/catalog" className="link-arrow text-[0.65rem] hidden md:flex">
              View All Spaces <ArrowRight size={12} />
            </a>
          </div>
        </FadeIn>
      </div>

      {/* ─── DESKTOP ACCORDION (lg+) ─── */}
      <div className="hidden lg:block pb-[var(--section-gap)]">
        <div className="container">
          <div className="flex h-[520px] xl:h-[580px] gap-2">
            {spaces.map((space, i) => {
              const isActive = i === active;
              return (
                <div
                  key={space.name}
                  className="relative overflow-hidden cursor-pointer group"
                  style={{
                    flex: isActive ? "5" : "1",
                    transition: "flex 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                  onMouseEnter={() => goTo(i)}
                  onMouseLeave={() => setAutoCycle(true)}
                  onClick={() => goTo(i)}
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
                        ? "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)"
                        : "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)",
                    }}
                  />

                  {/* ── Collapsed state: vertical text ── */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500"
                    style={{ opacity: isActive ? 0 : 1, pointerEvents: isActive ? "none" : "auto" }}
                  >
                    {/* Number */}
                    <span className="text-[0.5rem] font-medium tracking-[0.2em] text-[var(--accent-light)] mb-3">
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
                    className="absolute inset-0 flex flex-col justify-end p-8 xl:p-10 transition-opacity duration-500"
                    style={{
                      opacity: isActive ? 1 : 0,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    <p className="text-[0.55rem] font-medium tracking-[0.35em] uppercase text-[var(--accent-light)] mb-3">
                      {String(i + 1).padStart(2, "0")} / {String(spaces.length).padStart(2, "0")}
                    </p>
                    <h3
                      className="font-serif font-light text-white leading-[1.05] mb-3"
                      style={{
                        fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                        transform: isActive ? "translateY(0)" : "translateY(20px)",
                        transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s",
                      }}
                    >
                      {space.name}
                    </h3>
                    <p
                      className="text-sm text-white/45 max-w-sm mb-5 leading-relaxed"
                      style={{
                        transform: isActive ? "translateY(0)" : "translateY(15px)",
                        opacity: isActive ? 1 : 0,
                        transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.15s, opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.15s",
                      }}
                    >
                      {space.subtitle}
                    </p>
                    <a
                      href={`/catalog?space=${encodeURIComponent(space.name.toLowerCase())}`}
                      className="link-arrow text-white/50 hover:text-[var(--accent-light)] text-[0.6rem]"
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
        className="lg:hidden relative h-[75vh] min-h-[500px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {spaces.map((space, i) => (
          <div
            key={space.name}
            className="absolute inset-0 transition-opacity duration-500"
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

        <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 pb-10">
          <p className="text-[0.55rem] font-medium tracking-[0.35em] uppercase text-[var(--accent-light)] mb-3">
            Find Tiles By Space
          </p>

          <p className="text-[0.6rem] font-medium tracking-[0.2em] text-white/30 mb-2">
            <span className="text-[var(--accent-light)]">{String(mobileIndex + 1).padStart(2, "0")}</span>
            <span className="mx-1.5">/</span>
            {String(spaces.length).padStart(2, "0")}
          </p>

          <h2
            className="font-serif font-light text-white leading-[1.05] mb-2"
            style={{ fontSize: "clamp(2.2rem, 8vw, 3rem)" }}
          >
            {spaces[mobileIndex].name}
          </h2>

          <p className="text-sm text-white/50 mb-6">
            {spaces[mobileIndex].subtitle}
          </p>

          <div className="flex gap-2 mb-6">
            {spaces.map((_, i) => (
              <button
                key={i}
                onClick={() => setMobileIndex(i)}
                className="h-[2px] transition-all duration-300"
                style={{
                  width: i === mobileIndex ? "28px" : "10px",
                  background: i === mobileIndex ? "var(--accent-light)" : "rgba(255,255,255,0.2)",
                }}
                aria-label={`Go to ${spaces[i].name}`}
              />
            ))}
          </div>

          <a href={`/catalog?space=${encodeURIComponent(spaces[mobileIndex].name.toLowerCase())}`} className="link-arrow text-white/60 hover:text-white text-[0.6rem]">
            Explore {spaces[mobileIndex].name} <ArrowRight size={11} />
          </a>
        </div>
      </div>
    </section>
  );
}
