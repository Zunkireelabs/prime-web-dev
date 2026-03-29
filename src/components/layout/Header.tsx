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

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[var(--bg)]/97 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.04),0_4px_20px_rgba(0,0,0,0.03)]"
            : "bg-gradient-to-b from-black/50 via-black/25 to-transparent backdrop-blur-[2px]"
        )}
      >
        <div className="container flex items-center justify-between h-[72px] md:h-20">
          {/* Logo */}
          <a href="/" className="relative z-50">
            <img
              src="/images/prime-logo.png"
              alt="Prime Tiles"
              className="h-12 md:h-14 w-auto transition-[filter] duration-300"
              style={scrolled ? undefined : { filter: "brightness(0) invert(1)" }}
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
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
                      "relative text-[0.7rem] font-medium tracking-[0.18em] uppercase transition-colors duration-300 py-7 inline-flex items-center gap-1.5",
                      scrolled
                        ? "text-[var(--ink)] hover:text-[var(--accent)]"
                        : "text-white/70 hover:text-white"
                    )}
                  >
                    {item.label}
                    {hasDropdown && (
                      <svg width="8" height="5" viewBox="0 0 8 5" fill="none" className={cn("transition-transform duration-200", activeDropdown === item.label ? "rotate-180" : "")}>
                        <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {/* Hover underline */}
                    <span className={cn(
                      "absolute bottom-5 left-0 right-0 h-[1.5px] scale-x-0 transition-transform duration-300 origin-left",
                      scrolled ? "bg-[var(--accent)]" : "bg-white"
                    )} />
                  </a>

                  {/* Dropdown menu */}
                  {hasDropdown && (
                    <div
                      className={cn(
                        "absolute top-full left-0 pt-2 transition-all duration-200",
                        activeDropdown === item.label ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-1"
                      )}
                    >
                      <div className="bg-[var(--bg)] border border-[var(--ink)]/6 shadow-[0_12px_40px_rgba(0,0,0,0.08)] min-w-[240px] py-3">
                        {item.dropdown!.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            className="group flex items-center justify-between px-6 py-3 text-[0.8rem] text-[var(--ink-light)] hover:text-[var(--ink)] hover:bg-[var(--bg-alt)] transition-all duration-200"
                          >
                            {link.label}
                            <ArrowRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-40 group-hover:translate-x-0 transition-all duration-200" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => setSearchOpen(true)}
              className={cn(
                "transition-colors duration-300",
                scrolled
                  ? "text-[var(--ink-light)] hover:text-[var(--ink)]"
                  : "text-white/50 hover:text-white"
              )}
              aria-label="Search"
            >
              <Search size={17} strokeWidth={1.5} />
            </button>
            <div className={cn("w-px h-4", scrolled ? "bg-[var(--ink)]/10" : "bg-white/15")} />
            <a
              href="#showrooms"
              className={cn(
                "text-[0.65rem] font-medium tracking-[0.15em] uppercase px-5 py-2 border transition-all duration-300",
                scrolled
                  ? "border-[var(--ink)]/15 text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  : "border-white/20 text-white/70 hover:border-white/50 hover:text-white"
              )}
            >
              Where to Buy
            </a>

            {/* Close video button — only visible during video */}
            {videoAdVisible && !scrolled && (
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("dismiss-video-ad"))}
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/80 hover:text-white hover:border-white/60 hover:bg-white/10 transition-all duration-300 bg-black/20"
                aria-label="Close video"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            )}
          </div>

          {/* Mobile — close ad + menu toggle */}
          <div className="lg:hidden flex items-center gap-3 relative z-50">
            {videoAdVisible && !scrolled && !mobileOpen && (
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("dismiss-video-ad"))}
                className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center text-white/80 hover:text-white hover:border-white/60 hover:bg-white/10 transition-all duration-300 bg-black/20"
                aria-label="Close video"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <X size={22} className="text-[var(--ink-on-dark)]" />
              ) : (
                <Menu size={22} className={scrolled ? "text-[var(--ink)]" : "text-white"} />
              )}
            </button>
          </div>
        </div>

        {/* ─── Mega Dropdown ─── */}
        <div
          className={cn(
            "hidden lg:block absolute top-full left-0 right-0 transition-all duration-300 overflow-hidden",
            megaOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          )}
          onMouseEnter={openMega}
          onMouseLeave={closeMega}
        >
          <div className="bg-[var(--bg)] border-b border-[var(--ink)]/5 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
            <div className="container py-10">
              <div className="grid grid-cols-12 gap-8">
                {/* Left — Featured image */}
                <div className="col-span-4">
                  <div className="aspect-[4/3] img-gs overflow-hidden">
                    <img
                      src="/images/services/service-1.jpg"
                      alt="Premium tile collection"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-[var(--ink-muted)] mt-3 tracking-wide">
                    Calacatta Luxe — Our flagship collection
                  </p>
                </div>

                {/* Right — Link columns */}
                <div className="col-span-8 grid grid-cols-4 gap-6">
                  {/* By Space */}
                  <div>
                    <p className="text-[0.6rem] font-medium tracking-[0.25em] uppercase text-[var(--accent)] mb-5">By Space</p>
                    <ul className="space-y-2.5">
                      {spaces.map((s) => (
                        <li key={s}>
                          <a href={`/catalog?space=${encodeURIComponent(s.toLowerCase())}`} className="group flex items-center gap-1.5 text-[0.8rem] text-[var(--ink-light)] hover:text-[var(--ink)] transition-colors duration-200">
                            <span>{s}</span>
                            <ArrowRight size={10} className="opacity-0 -translate-x-1 group-hover:opacity-50 group-hover:translate-x-0 transition-all duration-200" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* By Collection */}
                  <div>
                    <p className="text-[0.6rem] font-medium tracking-[0.25em] uppercase text-[var(--accent)] mb-5">Collections</p>
                    <ul className="space-y-2.5">
                      {collections.map((c) => (
                        <li key={c}>
                          <a href={`/catalog?collection=${encodeURIComponent(c.toLowerCase())}`} className="group flex items-center justify-between text-[0.8rem] text-[var(--ink-light)] hover:text-[var(--ink)] transition-colors duration-200">
                            <div className="flex items-center gap-1.5">
                              <span className={c === "Spirit of Nepal" ? "text-[var(--accent)] font-medium" : ""}>{c}</span>
                              <ArrowRight size={10} className="opacity-0 -translate-x-1 group-hover:opacity-50 group-hover:translate-x-0 transition-all duration-200" />
                            </div>
                            {c === "Spirit of Nepal" && (
                              <span className="text-[0.5rem] tracking-[0.1em] uppercase bg-[var(--accent)]/10 text-[var(--accent)] px-1.5 py-0.5 rounded-sm">New</span>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* By Finish */}
                  <div>
                    <p className="text-[0.6rem] font-medium tracking-[0.25em] uppercase text-[var(--accent)] mb-5">By Finish</p>
                    <ul className="space-y-2.5">
                      {finishes.map((f) => (
                        <li key={f}>
                          <a href={`/catalog?finish=${encodeURIComponent(f.toLowerCase())}`} className="group flex items-center gap-1.5 text-[0.8rem] text-[var(--ink-light)] hover:text-[var(--ink)] transition-colors duration-200">
                            <span>{f}</span>
                            <ArrowRight size={10} className="opacity-0 -translate-x-1 group-hover:opacity-50 group-hover:translate-x-0 transition-all duration-200" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* By Size */}
                  <div>
                    <p className="text-[0.6rem] font-medium tracking-[0.25em] uppercase text-[var(--accent)] mb-5">By Size</p>
                    <ul className="space-y-2.5">
                      {sizes.map((s) => (
                        <li key={s}>
                          <a href={`/catalog?size=${encodeURIComponent(s)}`} className="group flex items-center gap-1.5 text-[0.8rem] text-[var(--ink-light)] hover:text-[var(--ink)] transition-colors duration-200">
                            <span>{s}</span>
                            <ArrowRight size={10} className="opacity-0 -translate-x-1 group-hover:opacity-50 group-hover:translate-x-0 transition-all duration-200" />
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
          "lg:hidden fixed inset-0 z-40 bg-[var(--bg-dark)] transition-opacity duration-500",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="h-full overflow-y-auto pt-24 pb-16 px-8">
          <nav className="space-y-0 mb-10">
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
                    "flex items-center justify-between py-5 border-b border-[var(--ink-on-dark)]/6 h2 text-[var(--ink-on-dark)] transition-all duration-500",
                    mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                  style={{ transitionDelay: mobileOpen ? `${120 + i * 50}ms` : "0ms" }}
                >
                  {item.label}
                  <ChevronRight size={18} className={cn("text-[var(--ink-on-dark-muted)] transition-transform duration-200", item.dropdown?.length && activeDropdown === item.label ? "rotate-90" : "")} />
                </a>
                {/* Mobile sub-links */}
                {item.dropdown?.length && activeDropdown === item.label && (
                  <div className="pl-6 border-b border-[var(--ink-on-dark)]/6">
                    {item.dropdown.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between py-4 text-[1rem] font-serif text-[var(--ink-on-dark-light)] hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                        <ArrowRight size={14} className="text-[var(--ink-on-dark-muted)]" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile CTA */}
          <div
            className={cn("transition-all duration-500 mb-10", mobileOpen ? "opacity-100" : "opacity-0")}
            style={{ transitionDelay: mobileOpen ? "380ms" : "0ms" }}
          >
            <a
              href="#showrooms"
              onClick={() => setMobileOpen(false)}
              className="inline-block text-[0.65rem] font-medium tracking-[0.15em] uppercase px-6 py-3 border border-[var(--accent-light)]/30 text-[var(--accent-light)] hover:border-[var(--accent-light)] transition-all duration-300"
            >
              Where to Buy
            </a>
          </div>

          {/* Mobile contact info */}
          <div
            className={cn("transition-all duration-500", mobileOpen ? "opacity-100" : "opacity-0")}
            style={{ transitionDelay: mobileOpen ? "450ms" : "0ms" }}
          >
            <div className="space-y-2 body-sm text-[var(--ink-on-dark-muted)]">
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
          "fixed inset-0 z-[60] bg-[var(--bg)]/98 backdrop-blur-xl transition-opacity duration-400",
          searchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="container h-full flex flex-col items-center justify-center">
          <button
            onClick={() => setSearchOpen(false)}
            className="absolute top-6 right-6 text-[var(--ink-light)] hover:text-[var(--ink)]"
            aria-label="Close search"
          >
            <X size={24} />
          </button>

          <p className="eyebrow text-[var(--accent)] mb-6">Search</p>
          <input
            type="text"
            placeholder="Search tiles, collections, finishes..."
            className="w-full max-w-xl text-center text-2xl md:text-3xl font-serif font-light text-[var(--ink)] bg-transparent border-b border-[var(--ink-faint)] pb-4 outline-none placeholder:text-[var(--ink-muted)] focus:border-[var(--accent)] transition-colors"
            autoFocus={searchOpen}
          />
          <p className="body-sm text-[var(--ink-muted)] mt-6">
            Try: &ldquo;bathroom tiles&rdquo;, &ldquo;large format&rdquo;, &ldquo;porcelain&rdquo;
          </p>
        </div>
      </div>
    </>
  );
}
