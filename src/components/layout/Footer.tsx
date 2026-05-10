"use client";

import { useId } from "react";
import FadeIn from "@/components/animations/FadeIn";
import { footerColumns as cols } from "@/data/navigation";
import { Mail, Phone, Factory, Building2, ArrowUpRight, Facebook, Youtube, Linkedin, type LucideIcon } from "lucide-react";
import Image from "next/image";

/** Instagram glyph with the official brand radial gradient — replaces the
 *  flat lucide outline so the icon doesn't look fake on a dark footer. */
function InstagramBrandIcon({ size = 22, strokeWidth = 1.8 }: { size?: number; strokeWidth?: number }) {
  const id = useId().replace(/:/g, "");
  const stroke = `url(#${id}-stroke)`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <defs>
        {/* Instagram brand gradient — diagonal from yellow/orange to magenta/purple. */}
        <linearGradient id={`${id}-stroke`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FEDA77" />
          <stop offset="20%" stopColor="#F58529" />
          <stop offset="50%" stopColor="#DD2A7B" />
          <stop offset="75%" stopColor="#8134AF" />
          <stop offset="100%" stopColor="#515BD4" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke={stroke} />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke={stroke} />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke={stroke} />
    </svg>
  );
}

type SocialEntry = {
  name: string;
  href: string;
  Icon?: LucideIcon;
  Custom?: () => React.ReactElement;
  color?: string;
};

const socials: SocialEntry[] = [
  { name: "Facebook", href: "https://www.facebook.com/PrimeTiles.Official/", Icon: Facebook, color: "#1877F2" },
  { name: "Instagram", href: "https://www.instagram.com/primetiles.official/", Custom: () => <InstagramBrandIcon size={22} strokeWidth={1.8} /> },
  { name: "YouTube", href: "https://www.youtube.com/@primetiles.Official", Icon: Youtube, color: "#FF0000" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/primetilesofficial/", Icon: Linkedin, color: "#0A66C2" },
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
      <div
        className="container relative z-10"
        style={{ padding: "clamp(28px, 5vw, 64px) 0 clamp(20px, 4vw, 56px)" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "48px",
          }}
          className="max-md:!grid-cols-2 max-sm:!gap-x-[20px] max-sm:!gap-y-[32px] max-md:!gap-[36px]"
        >
          {/* Nav columns */}
          {cols.map((col, i) => (
            <FadeIn key={col.title} delay={0.06 * (i + 1)}>
              <div>
                <p
                  className="eyebrow text-accent"
                  style={{ marginBottom: "20px" }}
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
                        className="text-white/70 hover:text-white transition-colors duration-300"
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
                style={{ marginBottom: "20px" }}
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
                        className="text-accent/60 group-hover:text-accent transition-colors duration-300"
                        style={{ marginTop: "2px", flexShrink: 0 }}
                      >
                        {iconMap[item.icon]}
                      </span>
                      <span>
                        <span
                          className="text-white/55 block"
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
                          className="text-white/85 group-hover:text-white transition-colors duration-300"
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
            padding: "28px 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "clamp(28px, 5vw, 44px)",
            flexWrap: "wrap",
          }}
        >
          {socials.map(({ name, href, Icon, Custom, color }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="transition-opacity duration-300 inline-flex items-center justify-center opacity-85 hover:opacity-100"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                color,
              }}
            >
              {Custom ? <Custom /> : Icon ? <Icon size={22} strokeWidth={1.8} /> : null}
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
            className="text-white/50"
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
              className="text-white/50 hover:text-white/80 transition-colors duration-300"
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
              className="text-white/50 hover:text-white/80 transition-colors duration-300"
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

            {/* ── Zunkiree Labs — Designed by badge ── */}
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
                  alt="Zunkiree Labs"
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
                  className="text-white/50 group-hover:text-white/70 transition-colors duration-300"
                  style={{
                    fontSize: "0.55rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Designed &amp; built by
                </span>
                <span
                  className="text-white/70 group-hover:text-white transition-colors duration-300"
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginTop: "2px",
                  }}
                >
                  Zunkiree Labs
                </span>
              </span>

              {/* Arrow */}
              <ArrowUpRight
                size={11}
                strokeWidth={1.8}
                className="text-white/50 group-hover:text-white/80 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300"
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
