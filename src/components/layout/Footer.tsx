"use client";

import FadeIn from "@/components/animations/FadeIn";
import { footerColumns as cols } from "@/data/navigation";
import { ArrowUpRight } from "lucide-react";

const socials = [
  { name: "Facebook", abbr: "Fb", href: "https://www.facebook.com/PrimeTiles.Official/" },
  { name: "Instagram", abbr: "Ig", href: "https://www.instagram.com/primetiles.official/" },
  { name: "YouTube", abbr: "Yt", href: "https://www.youtube.com/@primetiles.Official" },
  { name: "LinkedIn", abbr: "Li", href: "https://www.linkedin.com/company/primetilesofficial/" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-dark)] text-[var(--ink-on-dark)]">
      {/* Top accent line */}
      <div className="container">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent" />
      </div>

      {/* Main content */}
      <div className="container pt-20 pb-10 md:pt-24 md:pb-12">
        {/* ── Row 1: Brand + Navigation ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-14 lg:gap-8">
          {/* Brand — 4 cols */}
          <div className="lg:col-span-4">
            <FadeIn>
              <img
                src="/images/prime-logo.png"
                alt="Prime Tiles"
                loading="lazy"
                className="h-11 md:h-12 w-auto mb-7"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <p className="text-[0.85rem] text-white/40 leading-relaxed max-w-xs mb-8">
                Nepal&apos;s No.1 tile manufacturer. Crafting premium surfaces
                with Italian SACMI technology since inception.
              </p>

              {/* Social */}
              <div className="flex items-center gap-3">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="w-11 h-11 border border-white/8 flex items-center justify-center text-white/30 hover:border-[var(--accent)]/40 hover:text-[var(--accent-light)] transition-all duration-300 text-[0.6rem] font-medium tracking-wider uppercase"
                  >
                    {s.abbr}
                  </a>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Nav columns — 8 cols, 3 sub-columns */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 lg:gap-12 lg:pl-12">
              {cols.map((col, i) => (
                <FadeIn key={col.title} delay={0.06 * (i + 1)}>
                  <div>
                    <p className="text-[0.55rem] font-medium tracking-[0.3em] uppercase text-[var(--accent)] mb-6">
                      {col.title}
                    </p>
                    <ul className="space-y-3">
                      {col.links.map((l) => (
                        <li key={l.label}>
                          <a
                            href={l.href}
                            className="group inline-flex items-center gap-1.5 text-[0.85rem] text-white/40 hover:text-white transition-colors duration-300"
                          >
                            {l.label}
                            <ArrowUpRight
                              size={10}
                              className="opacity-0 -translate-x-1 group-hover:opacity-40 group-hover:translate-x-0 transition-all duration-300"
                            />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>

        {/* ── Row 2: Contact strip ── */}
        <FadeIn delay={0.25}>
          <div className="mt-16 md:mt-20 pt-10 border-t border-white/6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
              <a href="mailto:info@primeceramics.com.np" className="group">
                <p className="text-[0.5rem] font-medium tracking-[0.25em] uppercase text-[var(--accent)]/60 mb-2">Email</p>
                <p className="text-[0.9rem] text-white/50 group-hover:text-white/80 transition-colors duration-300">info@primeceramics.com.np</p>
              </a>
              <a href="tel:+977-1-5978860" className="group">
                <p className="text-[0.5rem] font-medium tracking-[0.25em] uppercase text-[var(--accent)]/60 mb-2">Phone</p>
                <p className="text-[0.9rem] text-white/50 group-hover:text-white/80 transition-colors duration-300">+977-1-5978860/61/62</p>
              </a>
              <div>
                <p className="text-[0.5rem] font-medium tracking-[0.25em] uppercase text-[var(--accent)]/60 mb-2">Factory</p>
                <p className="text-[0.9rem] text-white/50">Sakhuwa Dhamaura, Brindavan-6, Rautahat</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* ── Copyright bar ── */}
      <div className="container">
        <div className="border-t border-white/6 py-7 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[0.7rem] text-white/25 tracking-wide">
            &copy; {new Date().getFullYear()} Prime Ceramics Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-[0.7rem] text-white/25">
            <a href="/privacy" className="hover:text-white/50 transition-colors duration-300">Privacy Policy</a>
            <span className="w-px h-3 bg-white/10" />
            <a href="/terms" className="hover:text-white/50 transition-colors duration-300">Terms</a>
            <span className="w-px h-3 bg-white/10" />
            <span>Designed by Zunkiee Labs</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
