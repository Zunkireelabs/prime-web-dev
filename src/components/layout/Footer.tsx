"use client";

import FadeIn from "@/components/animations/FadeIn";
import { footerColumns as cols } from "@/data/navigation";

const socials = [
  { name: "Facebook", href: "https://www.facebook.com/PrimeTiles.Official/" },
  { name: "Instagram", href: "https://www.instagram.com/primetiles.official/" },
  { name: "YouTube", href: "https://www.youtube.com/@primetiles.Official" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/primetilesofficial/" },
];

const contactItems = [
  { label: "Email", value: "info@primeceramics.com.np", href: "mailto:info@primeceramics.com.np" },
  { label: "Phone", value: "+977-1-5978860/61/62", href: "tel:+977-1-5978860" },
  { label: "Toll Free", value: "1810 500 0062", href: "tel:18105000062" },
  { label: "Factory", value: "Sakhuwa Dhamaura, Brindavan-6, Rautahat" },
  { label: "Office", value: "Level 4, Saket Complex, Tripureshwor, Kathmandu" },
];

export default function Footer() {
  return (
    <footer className="bg-surface-dark text-ink-on-dark">
      {/* Gold accent line */}
      <div className="gold-divider-full" />

      {/* ═══ ZONE 2 — Navigation + Contact ═══ */}

      <div className="container" style={{ padding: "64px 0" }}>
        <div
          className="max-md:[grid-template-columns:repeat(2,1fr)] max-sm:[grid-template-columns:1fr]"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "48px",
          }}
        >
          {/* Nav columns */}
          {cols.map((col, i) => (
            <FadeIn key={col.title} delay={0.06 * (i + 1)}>
              <div>
                <p className="eyebrow text-accent" style={{ marginBottom: "32px" }}>{col.title}</p>
                <ul style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-white/45 hover:text-white/80 transition-colors duration-300"
                        style={{ fontSize: "0.9rem", lineHeight: "1.6" }}
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}

          {/* Contact column */}
          <FadeIn delay={0.25}>
            <div>
              <p className="eyebrow text-accent" style={{ marginBottom: "32px" }}>Contact</p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {contactItems.map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-white/45 hover:text-white/80 transition-colors duration-300"
                        style={{ fontSize: "0.9rem", lineHeight: "1.6" }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white/45" style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
                        {item.value}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ═══ ZONE 3 — Copyright ═══ */}
      <div className="container">
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            padding: "40px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p className="text-white/30" style={{ fontSize: "0.78rem", letterSpacing: "0.03em" }}>
            &copy; {new Date().getFullYear()} Prime Ceramics Pvt. Ltd. All rights reserved.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "32px", flexWrap: "wrap", fontSize: "0.78rem" }}>
            <a href="/privacy" className="text-white/30 hover:text-white/55 transition-colors duration-300">
              Privacy Policy
            </a>
            <span style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.1)" }} />
            <a href="/terms" className="text-white/30 hover:text-white/55 transition-colors duration-300">
              Terms
            </a>
            <span style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.1)" }} />
            <span className="text-white/20">Designed by Zunkiee Labs</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
