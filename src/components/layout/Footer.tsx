"use client";

import FadeIn from "@/components/animations/FadeIn";
import { footerColumns as cols } from "@/data/navigation";
import { Mail, Phone, Factory, Building2, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const socials = [
  { name: "Facebook", href: "https://www.facebook.com/PrimeTiles.Official/" },
  { name: "Instagram", href: "https://www.instagram.com/primetiles.official/" },
  { name: "YouTube", href: "https://www.youtube.com/@primetiles.Official" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/primetilesofficial/" },
];

const contactItems = [
  { label: "Email", value: "info@primeceramics.com.np", href: "mailto:info@primeceramics.com.np", icon: "mail" },
  { label: "WhatsApp", value: "Chat with us", href: "https://wa.me/9779802310000?text=Hi%2C%20I%20have%20a%20question%20about%20Prime%20Tiles%20products.", icon: "phone" },
  { label: "Phone", value: "+977-1-5978860/61/62", href: "tel:+977-1-5978860", icon: "phone" },
  { label: "Toll Free", value: "1810 500 0062", href: "tel:18105000062", icon: "phone" },
  { label: "Factory", value: "Sakhuwa Dhamaura, Brindavan-6, Rautahat", icon: "factory" },
  { label: "Office", value: "Level 4, Saket Complex, Tripureshwor, Kathmandu", icon: "office" },
];

const iconMap: Record<string, React.ReactNode> = {
  mail: <Mail size={14} strokeWidth={1.4} />,
  phone: <Phone size={14} strokeWidth={1.4} />,
  factory: <Factory size={14} strokeWidth={1.4} />,
  office: <Building2 size={14} strokeWidth={1.4} />,
};

export default function Footer() {
  return (
    <footer className="bg-surface-dark text-ink-on-dark relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, rgba(181,138,82,0.04) 0%, transparent 50%)",
        }}
      />

      {/* Gold accent line */}
      <div className="gold-divider-full" />

      {/* ═══ Navigation + Contact Grid ═══ */}
      <div className="container relative z-10" style={{ padding: "clamp(40px, 6vw, 64px) 0" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "48px",
          }}
          className="max-md:!grid-cols-2 max-sm:!grid-cols-1 max-sm:!gap-[32px] max-md:!gap-[36px]"
        >
          {/* Nav columns */}
          {cols.map((col, i) => (
            <FadeIn key={col.title} delay={0.06 * (i + 1)}>
              <div>
                <p
                  className="eyebrow text-accent"
                  style={{ marginBottom: "28px" }}
                >
                  {col.title}
                </p>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-white/35 hover:text-white/70 transition-colors duration-300"
                        style={{ fontSize: "0.85rem", lineHeight: "1.6" }}
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
              <p
                className="eyebrow text-accent"
                style={{ marginBottom: "28px" }}
              >
                Contact
              </p>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                }}
              >
                {contactItems.map((item) => {
                  const inner = (
                    <>
                      <span
                        className="text-accent/30 group-hover:text-accent transition-colors duration-300"
                        style={{ marginTop: "2px", flexShrink: 0 }}
                      >
                        {iconMap[item.icon]}
                      </span>
                      <span>
                        <span
                          className="text-white/18 block"
                          style={{
                            fontSize: "0.62rem",
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            marginBottom: "2px",
                          }}
                        >
                          {item.label}
                        </span>
                        <span
                          className="text-white/35 group-hover:text-white/70 transition-colors duration-300"
                          style={{ fontSize: "0.82rem", lineHeight: "1.5" }}
                        >
                          {item.value}
                        </span>
                      </span>
                    </>
                  );

                  return (
                    <li key={item.label}>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="group flex items-start"
                          style={{ gap: "10px" }}
                        >
                          {inner}
                        </a>
                      ) : (
                        <div
                          className="group flex items-start"
                          style={{ gap: "10px" }}
                        >
                          {inner}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ═══ Divider ═══ */}
      <div className="container relative z-10">
        <div style={{ height: "1px", background: "var(--color-ink-on-dark-muted)" }} />
      </div>

      {/* ═══ Social Links Row ═══ */}
      <div className="container relative z-10">
        <div
          style={{
            padding: "24px 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "clamp(20px, 4vw, 40px)",
            flexWrap: "wrap",
          }}
        >
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/20 hover:text-accent transition-colors duration-300"
              style={{
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              {s.name}
            </a>
          ))}
        </div>
      </div>

      {/* ═══ Divider ═══ */}
      <div className="container relative z-10">
        <div style={{ height: "1px", background: "var(--color-ink-on-dark-muted)" }} />
      </div>

      {/* ═══ Bottom Bar ═══ */}
      <div className="container relative z-10">
        <div
          style={{
            padding: "clamp(20px, 3vw, 28px) 0 clamp(28px, 4vw, 36px)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          {/* Copyright */}
          <p
            className="text-white/20"
            style={{ fontSize: "0.72rem", letterSpacing: "0.03em" }}
          >
            &copy; {new Date().getFullYear()} Prime Ceramics Pvt. Ltd. All
            rights reserved.
          </p>

          {/* Legal + Designed by */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(14px, 2.5vw, 22px)",
              flexWrap: "wrap",
            }}
          >
            <a
              href="/privacy"
              className="text-white/20 hover:text-white/45 transition-colors duration-300"
              style={{ fontSize: "0.72rem" }}
            >
              Privacy Policy
            </a>
            <span
              style={{
                width: "1px",
                height: "10px",
                background: "var(--color-ink-on-dark-muted)",
              }}
            />
            <a
              href="/terms"
              className="text-white/20 hover:text-white/45 transition-colors duration-300"
              style={{ fontSize: "0.72rem" }}
            >
              Terms
            </a>

            <span
              style={{
                width: "1px",
                height: "10px",
                background: "var(--color-ink-on-dark-muted)",
              }}
            />

            {/* ── Zunkiee Labs — Designed by badge ── */}
            <a
              href="https://zunkireelabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center transition-all duration-300"
              style={{ gap: "8px" }}
            >
              {/* Logo icon */}
              <span
                className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Image
                  src="/images/zunkiee-labs-logo.png"
                  alt="Zunkiee Labs"
                  width={24}
                  height={24}
                  unoptimized
                  style={{ borderRadius: "50%" }}
                />
              </span>

              {/* Text */}
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: 1,
                }}
              >
                <span
                  className="text-white/25 group-hover:text-white/45 transition-colors duration-300"
                  style={{
                    fontSize: "0.55rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Designed &amp; built by
                </span>
                <span
                  className="text-white/45 group-hover:text-white/70 transition-colors duration-300"
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginTop: "2px",
                  }}
                >
                  Zunkiee Labs
                </span>
              </span>

              {/* Arrow */}
              <ArrowUpRight
                size={11}
                strokeWidth={1.8}
                className="text-white/25 group-hover:text-white/50 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300"
              />

              {/* Underline on hover */}
              <span
                className="absolute bottom-[-3px] left-0 right-0 h-px bg-gradient-to-r from-white/0 via-white/20 to-white/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
