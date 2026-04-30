"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Search, X, Menu, ChevronRight, ArrowRight } from "lucide-react";
import {
  navItems,
  megaSpaces as spaces,
  megaCollections as collections,
  megaFinishes as finishes,
  megaSizes as sizes,
} from "@/data/navigation";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [videoAdVisible, setVideoAdVisible] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const megaTimeout = useRef<ReturnType<typeof setTimeout>>();
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Listen for video ad visibility
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setVideoAdVisible(detail?.visible ?? false);
    };
    window.addEventListener("video-ad", handler);
    return () => window.removeEventListener("video-ad", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? "hidden" : "";
  }, [mobileOpen, searchOpen]);

  const openMega = () => {
    clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  };

  const closeMega = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 150);
  };

  const blendVideo = videoAdVisible && !scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          blendVideo
            ? "bg-transparent"
            : "bg-white",
          !blendVideo && (scrolled
            ? "shadow-[0_1px_0_rgba(0,0,0,0.04),0_4px_20px_rgba(0,0,0,0.03)]"
            : "shadow-[0_1px_0_rgba(0,0,0,0.06)]")
        )}
      >
        <div className="container flex items-center justify-between" style={{ height: "clamp(72px, 8vw, 88px)" }}>
          {/* Logo */}
          <a href="/" className="relative z-50">
            <img
              src="/images/prime-logo.png"
              alt="Prime Tiles"
              className="h-16 sm:h-20 md:h-24 w-auto transition-[filter] duration-300"
              style={blendVideo ? { filter: "brightness(0) invert(1)" } : undefined}
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center" style={{ gap: "40px" }}>
            {navItems.map((item) => {
              const hasDropdown = !!item.dropdown?.length;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => {
                    if (item.hasMega) openMega();
                    if (hasDropdown) {
                      clearTimeout(dropdownTimeout.current);
                      setActiveDropdown(item.label);
                    }
                  }}
                  onMouseLeave={() => {
                    if (item.hasMega) closeMega();
                    if (hasDropdown) {
                      dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
                    }
                  }}
                >
                  <a
                    href={item.href}
                    className={cn(
                      "relative text-[0.8rem] font-medium tracking-[0.18em] uppercase transition-colors duration-300 py-7 inline-flex items-center gap-1.5",
                      blendVideo ? "text-white/80 hover:text-white" : "text-ink hover:text-accent"
                    )}
                  >
                    {item.label}
                    {hasDropdown && (
                      <svg width="8" height="5" viewBox="0 0 8 5" fill="none" className={cn("transition-transform duration-200", activeDropdown === item.label ? "rotate-180" : "")}>
                        <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {/* Hover underline */}
                    <span className={cn("absolute bottom-5 left-0 right-0 h-[1.5px] scale-x-0 transition-transform duration-300 origin-left", blendVideo ? "bg-white" : "bg-accent")} />
                  </a>

                  {/* Dropdown menu */}
                  {hasDropdown && (
                    <div
                      className={cn(
                        "absolute top-full left-1/2 transition-all duration-300 linear",
                        activeDropdown === item.label ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-2"
                      )}
                      style={{ transform: activeDropdown === item.label ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-8px)", paddingTop: "12px" }}
                    >
                      <div
                        className="relative overflow-hidden"
                        style={{
                          background: "linear-gradient(165deg, var(--color-surface-dark-alt) 0%, var(--color-surface-dark) 100%)",
                          border: "1px solid var(--color-accent-subtle)",
                          boxShadow: "0 20px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.03)",
                          minWidth: "280px",
                          padding: "8px 0",
                        }}
                      >
                        {/* Top accent line */}
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1.5px", background: "linear-gradient(90deg, transparent, var(--color-accent-glow), transparent)" }} />

                        {/* Subtle corner glow */}
                        <div style={{ position: "absolute", top: 0, right: 0, width: "80px", height: "80px", background: "radial-gradient(circle at top right, var(--color-accent-subtle), transparent 70%)", pointerEvents: "none" }} />

                        {item.dropdown!.map((link, idx) => (
                          <a
                            key={link.href}
                            href={link.href}
                            className="group flex items-center justify-between transition-all duration-300 hover:bg-[var(--color-accent-subtle)]"
                            style={{
                              padding: "14px 28px",
                              margin: "0 8px",
                              borderRadius: "2px",
                            }}
                          >
                            <span
                              className="group-hover:translate-x-1 transition-all duration-300 group-hover:text-[var(--color-accent-light)]"
                              style={{
                                fontSize: "0.82rem",
                                letterSpacing: "0.04em",
                                color: "var(--color-ink-on-dark-light)",
                              }}
                            >
                              {link.label}
                            </span>
                            <ArrowRight
                              size={13}
                              className="opacity-0 -translate-x-2 group-hover:opacity-70 group-hover:translate-x-0 transition-all duration-300 text-accent-light"
                            />
                          </a>
                        ))}

                        {/* Bottom accent */}
                        <div style={{ position: "absolute", bottom: 0, left: "20%", right: "20%", height: "1px", background: "linear-gradient(90deg, transparent, var(--color-accent-subtle), transparent)" }} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center" style={{ gap: "24px" }}>
            <button
              onClick={() => setSearchOpen(true)}
              className={cn("transition-colors duration-300", blendVideo ? "text-white/60 hover:text-white" : "text-ink-light hover:text-ink")}
              aria-label="Search"
            >
              <Search size={17} strokeWidth={1.5} />
            </button>
            <div className={cn("w-px h-4", blendVideo ? "bg-white/20" : "bg-ink/10")} />
            <a
              href="/dealers"
              className={cn(
                "text-[0.7rem] font-medium tracking-[0.15em] uppercase border transition-all duration-300",
                blendVideo ? "border-white/25 text-white/80 hover:border-white/50 hover:text-white" : "border-ink/15 text-ink hover:border-accent hover:text-accent"
              )}
              style={{ padding: "10px 20px" }}
            >
              Find a Dealer
            </a>

          </div>

          {/* Mobile — close ad + menu toggle */}
          <div className="lg:hidden flex items-center gap-3 relative z-50">
            {!mobileOpen && (
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={22} className={blendVideo ? "text-white" : "text-ink"} />
              </button>
            )}
          </div>
        </div>

        {/* ─── Mega Dropdown ─── */}
        <div
          className={cn(
            "hidden lg:block absolute top-full left-0 right-0 transition-[opacity,transform] duration-300 linear",
            megaOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          )}
          onMouseEnter={openMega}
          onMouseLeave={closeMega}
        >
          <div className="bg-surface-dark border-b border-accent/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
            {/* Top gold accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />

            <div className="container" style={{ padding: "36px 0 40px" }}>
              <div className="grid grid-cols-12" style={{ gap: "40px" }}>
                {/* Left — Featured image */}
                <div className="col-span-3 flex">
                  <div className="w-full min-h-[260px] overflow-hidden group relative">
                    <img
                      src="/images/services/service-1.jpg"
                      alt="Premium tile collection"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute" style={{ bottom: "32px", left: "32px", right: "32px" }}>
                      <p className="text-[0.5rem] font-medium tracking-[0.25em] uppercase text-accent-light mb-1.5">Featured</p>
                      <p className="text-[0.9rem] text-white/90 font-serif leading-snug">Calacatta Luxe</p>
                      <p className="text-[0.7rem] text-white/40 mt-1">Our flagship collection</p>
                    </div>
                  </div>
                </div>

                {/* Right — Link columns */}
                <div className="col-span-9 grid grid-cols-4" style={{ gap: "32px" }}>
                  {/* By Space */}
                  <div>
                    <p className="text-[0.7rem] font-medium tracking-[0.3em] uppercase text-accent/80 border-b border-accent/10" style={{ paddingBottom: "16px", marginBottom: "28px" }}>By Space</p>
                    <ul className="space-y-0">
                      {spaces.map((s) => (
                        <li key={s}>
                          <a href={`/products?search=${encodeURIComponent(s)}`} className="group flex items-center gap-1.5 text-[0.95rem] leading-relaxed text-ink-on-dark-light hover:text-accent-light transition-colors duration-300" style={{ padding: "14px 0" }}>
                            <span>{s}</span>
                            <ArrowRight size={10} className="opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-200 text-accent-light" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* By Collection */}
                  <div>
                    <p className="text-[0.7rem] font-medium tracking-[0.3em] uppercase text-accent/80 border-b border-accent/10" style={{ paddingBottom: "16px", marginBottom: "28px" }}>Collections</p>
                    <ul className="space-y-0">
                      {collections.map((c) => (
                        <li key={c}>
                          <a href={`/products?collection=${encodeURIComponent(c)}`} className="group flex items-center justify-between text-[0.95rem] leading-relaxed text-ink-on-dark-light hover:text-accent-light transition-colors duration-300" style={{ padding: "14px 0" }}>
                            <div className="flex items-center gap-1.5">
                              <span>{c}</span>
                              <ArrowRight size={10} className="opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-200 text-accent-light" />
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* By Finish */}
                  <div>
                    <p className="text-[0.7rem] font-medium tracking-[0.3em] uppercase text-accent/80 border-b border-accent/10" style={{ paddingBottom: "16px", marginBottom: "28px" }}>By Finish</p>
                    <ul className="space-y-0">
                      {finishes.map((f) => (
                        <li key={f}>
                          <a href={`/products?finish=${encodeURIComponent(f)}`} className="group flex items-center gap-1.5 text-[0.95rem] leading-relaxed text-ink-on-dark-light hover:text-accent-light transition-colors duration-300" style={{ padding: "14px 0" }}>
                            <span>{f}</span>
                            <ArrowRight size={10} className="opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-200 text-accent-light" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* By Size */}
                  <div>
                    <p className="text-[0.7rem] font-medium tracking-[0.3em] uppercase text-accent/80 border-b border-accent/10" style={{ paddingBottom: "16px", marginBottom: "28px" }}>By Size</p>
                    <ul className="space-y-0">
                      {sizes.map((s) => (
                        <li key={s}>
                          <a href={`/products?size=${encodeURIComponent(s)}`} className="group flex items-center justify-between text-[0.95rem] leading-relaxed text-ink-on-dark-light hover:text-accent-light transition-colors duration-300" style={{ padding: "14px 0" }}>
                            <div className="flex items-center gap-1.5">
                              <span className={s === "600×1200 mm" ? "text-accent-light font-medium" : ""}>{s}</span>
                              <ArrowRight size={10} className="opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-200 text-accent-light" />
                            </div>
                            {s === "600×1200 mm" && (
                              <span className="text-[0.45rem] tracking-[0.15em] uppercase bg-accent/15 text-accent-light px-2 py-0.5">New</span>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Mobile Menu ─── */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-40 bg-surface-card transition-opacity duration-500",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Close button — top left */}
        <button
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
          className="absolute top-6 left-6 z-50 w-11 h-11 rounded-full border border-ink/15 flex items-center justify-center text-ink hover:text-accent hover:border-accent/40 transition-all duration-300"
        >
          <X size={20} />
        </button>

        <div className="h-full overflow-y-auto" style={{ padding: "clamp(80px, 12vw, 96px) clamp(20px, 5vw, 32px) clamp(40px, 6vw, 64px)" }}>
          <nav className="space-y-0" style={{ marginBottom: "40px" }}>
            {navItems.map((item, i) => (
              <div key={item.label}>
                <a
                  href={item.href}
                  onClick={() => {
                    if (item.dropdown?.length) {
                      setActiveDropdown(activeDropdown === item.label ? null : item.label);
                      return;
                    }
                    setMobileOpen(false);
                  }}
                  className={cn(
                    "flex items-center justify-between py-4 border-b border-ink/8 font-serif font-light text-ink hover:text-accent transition-all duration-500",
                    mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                  style={{
                    fontSize: "clamp(1.4rem, 5vw, 1.75rem)",
                    lineHeight: 1.25,
                    letterSpacing: "-0.005em",
                    transitionDelay: mobileOpen ? `${120 + i * 50}ms` : "0ms",
                  }}
                >
                  {item.label}
                  <ChevronRight size={18} className={cn("text-ink-muted transition-transform duration-200", item.dropdown?.length && activeDropdown === item.label ? "rotate-90" : "")} />
                </a>
                {/* Mobile sub-links */}
                {item.dropdown?.length && activeDropdown === item.label && (
                  <div className="pl-6 border-b border-ink/8">
                    {item.dropdown.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between py-3 text-[0.95rem] font-serif text-ink-light hover:text-accent transition-colors duration-200"
                      >
                        {link.label}
                        <ArrowRight size={14} className="text-ink-muted" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile CTA */}
          <div
            className={cn("transition-all duration-500", mobileOpen ? "opacity-100" : "opacity-0")}
            style={{ marginBottom: "40px", transitionDelay: mobileOpen ? "380ms" : "0ms" }}
          >
            <a
              href="/dealers"
              onClick={() => setMobileOpen(false)}
              className="inline-block text-[0.65rem] font-medium tracking-[0.15em] uppercase px-6 py-3 border border-accent/40 text-accent hover:bg-accent hover:text-white transition-all duration-300"
            >
              Find a Dealer
            </a>
          </div>

          {/* Mobile contact info */}
          <div
            className={cn("transition-all duration-500", mobileOpen ? "opacity-100" : "opacity-0")}
            style={{ transitionDelay: mobileOpen ? "450ms" : "0ms" }}
          >
            <div className="space-y-2 body-sm text-ink-light">
              <p>info@primeceramics.com.np</p>
              <p>+977-1-5978860/61/62</p>
              <p>Tripureshwor, Kathmandu</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Search Overlay ─── */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-surface/98 backdrop-blur-xl transition-opacity duration-400",
          searchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="container h-full flex flex-col items-center justify-center">
          <button
            onClick={() => setSearchOpen(false)}
            className="absolute top-6 right-6 text-ink-light hover:text-ink"
            aria-label="Close search"
          >
            <X size={24} />
          </button>

          <p className="eyebrow text-accent" style={{ marginBottom: "24px" }}>Search</p>
          <input
            type="text"
            placeholder="Search tiles, collections, finishes..."
            className="w-full max-w-xl text-center text-2xl md:text-3xl font-serif font-light text-ink bg-transparent border-b border-ink-faint pb-4 outline-none placeholder:text-ink-muted focus:border-accent transition-colors"
            autoFocus={searchOpen}
          />
          <p className="body-sm text-ink-muted" style={{ marginTop: "24px" }}>
            Try: &ldquo;bathroom tiles&rdquo;, &ldquo;large format&rdquo;, &ldquo;porcelain&rdquo;
          </p>
        </div>
      </div>
    </>
  );
}
