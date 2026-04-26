"use client";

import FadeIn from "@/components/animations/FadeIn";
import { ArrowRight } from "lucide-react";
import { dealers, dealerProvinces } from "@/data/dealers";

const provinces = dealerProvinces.filter((p) => p !== "All");
const totalDealers = dealers.length;

const dealersByProvince = provinces
  .map((province) => ({
    name: province,
    count: dealers.filter((d) => d.province === province).length,
  }))
  .sort((a, b) => b.count - a.count);

export default function DealerNetwork() {
  return (
    <section
      className="relative overflow-hidden bg-surface-dark"
      style={{ padding: "clamp(100px, 12vw, 180px) 0" }}
    >
      {/* Ambient warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 0%, rgba(181,138,82,0.07) 0%, transparent 55%), radial-gradient(ellipse at 70% 100%, rgba(181,138,82,0.04) 0%, transparent 55%)",
        }}
      />

      <div className="container relative z-10">

        {/* ══ HEADER ══ */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <FadeIn>
            <div className="flex items-center justify-center gap-4" style={{ marginBottom: "16px" }}>
              <div className="w-10 h-px bg-accent-light/30" />
              <p className="eyebrow text-accent-light">Dealer Network</p>
              <div className="w-10 h-px bg-accent-light/30" />
            </div>
          </FadeIn>

          <FadeIn delay={0.06}>
            <h2
              className="h1 text-white"
              style={{ textAlign: "center", marginBottom: "32px", textWrap: "balance" }}
            >
              Find a Dealer Near You
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p
              className="body-lg text-ink-on-dark"
              style={{
                textAlign: "center",
                maxWidth: "640px",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "48px",
                textWrap: "balance",
              }}
            >
              Our authorized dealers bring Prime Ceramics to every
              corner of Nepal — {provinces.length} provinces, one standard of excellence.
            </p>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div className="gold-divider-center" />
          </FadeIn>
        </div>

        {/* ══ PROVINCE CARDS ══ */}
        <FadeIn delay={0.15}>
          <div
            className="flex flex-wrap justify-center"
            style={{ gap: "clamp(16px, 3vw, 40px) clamp(12px, 2.5vw, 32px)" }}
          >
            {dealersByProvince.map((province) => (
              <a
                key={province.name}
                href={`/dealers?province=${province.name}`}
                className="group relative block border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-accent/20 transition-all duration-300 cursor-pointer overflow-hidden max-sm:!w-[calc(50%-8px)] max-[480px]:!w-full"
                style={{
                  textAlign: "center",
                  width: "calc(25% - 24px)",
                  minWidth: "130px",
                  padding: "clamp(28px, 5vw, 56px) clamp(20px, 4vw, 40px)",
                }}
              >
                {/* Bottom accent line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <h3
                  className="font-serif font-light text-white group-hover:text-accent-light transition-colors duration-300 leading-tight"
                  style={{ fontSize: "clamp(1.3rem, 1.6vw, 1.55rem)", marginBottom: "16px" }}
                >
                  {province.name}
                </h3>

                <p className="text-[0.75rem] font-medium tracking-[0.22em] uppercase text-white/30 group-hover:text-white/55 transition-colors duration-300">
                  {province.count} {province.count === 1 ? "Dealer" : "Dealers"}
                </p>
              </a>
            ))}
          </div>
        </FadeIn>

        {/* ══ CTA ══ */}
        <div style={{ marginTop: "clamp(48px, 7vw, 80px)" }}>
          <div
            className="bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
            style={{ height: "1px", marginBottom: "56px" }}
          />

          <FadeIn delay={0.2}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <p className="eyebrow text-accent-light" style={{ marginBottom: "32px" }}>
                Explore the Network
              </p>
              <a href="/dealers" className="btn-gold group">
                View All Dealers
                <ArrowRight
                  size={13}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <p className="body-sm text-ink-on-dark-light/40" style={{ marginTop: "32px" }}>
                {totalDealers} authorized dealers across Nepal
              </p>
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  );
}
