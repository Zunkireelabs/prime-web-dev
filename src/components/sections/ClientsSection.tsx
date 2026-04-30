"use client";

import Image from "next/image";
import FadeIn from "@/components/animations/FadeIn";
import { clients } from "@/data/clients";

export default function ClientsSection() {
  return (
    <section className="bg-surface-alt relative" style={{ padding: "clamp(100px, 12vw, 180px) 0" }}>
      {/* Heading */}
      <div className="container" style={{ marginBottom: "64px" }}>
        <div style={{ textAlign: "center" }}>
          <FadeIn>
            <div className="flex items-center justify-center gap-4" style={{ marginBottom: "16px" }}>
              <div className="w-8 h-px bg-accent" />
              <p className="eyebrow text-accent">Trusted By</p>
              <div className="w-8 h-px bg-accent" />
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2 className="h2 text-ink" style={{ marginBottom: "24px", textAlign: "center" }}>Leading Developers &amp; Builders</h2>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className="body-sm text-ink-light" style={{ textAlign: "center", maxWidth: "480px", marginLeft: "auto", marginRight: "auto" }}>
              Partnering with Nepal&apos;s most prestigious construction and development firms.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Logo grid — static, staggered reveal */}
      <div className="container">
        <div className="grid grid-cols-3 md:grid-cols-6 items-center justify-items-center" style={{ gap: "clamp(24px, 4vw, 32px)" }}>
          {clients.map((c, i) => (
            <FadeIn key={c.name} delay={Math.min(i * 0.08, 0.4)} direction="up" distance={16}>
              <div className="flex items-center justify-center w-full group" style={{ height: "clamp(72px, 9vw, 80px)", padding: "0 16px" }}>
                <div className="relative opacity-80 md:grayscale md:opacity-65 md:group-hover:grayscale-0 md:group-hover:opacity-100 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
                  <Image
                    src={c.logo}
                    alt={c.name}
                    width={c.width}
                    height={c.height}
                    className="object-contain max-h-[52px] md:max-h-[56px] w-auto"
                    unoptimized
                  />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Bottom divider */}
      <FadeIn direction="up" distance={10} delay={0.4}>
        <div className="container" style={{ marginTop: "clamp(56px, 7vw, 80px)" }}>
          <div className="h-px bg-gradient-to-r from-transparent via-ink-faint to-transparent opacity-50" />
        </div>
      </FadeIn>
    </section>
  );
}
