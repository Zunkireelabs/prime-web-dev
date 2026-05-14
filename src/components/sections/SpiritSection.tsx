"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextRevealByWord from "@/components/animations/TextRevealByWord";
import TiltCard from "@/components/ui/TiltCard";
import { ArrowRight, MapPin } from "lucide-react";
import { spiritItems } from "@/data/spirit";

gsap.registerPlugin(ScrollTrigger);

const locationMap: Record<string, string> = {
  "Palpali Dhaka": "Palpa, Nepal",
  "Thangka Art": "Kathmandu Valley",
  "Mithila Art": "Janakpur, Nepal",
};

export default function SpiritSection() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;

    // Safety fallback: ensure cards become visible even if GSAP fails
    const fallback = setTimeout(() => {
      const cards = cardsRef.current?.querySelectorAll(".spirit-card");
      cards?.forEach((card) => {
        (card as HTMLElement).style.opacity = "1";
        (card as HTMLElement).style.transform = "none";
      });
    }, 3000);

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll(".spirit-card");
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.15,
            ease: "none",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              end: "top 35%",
              scrub: true,
            },
          }
        );
      }
    }, cardsRef);

    return () => {
      clearTimeout(fallback);
      ctx.revert();
    };
  }, []);

  return (
    <section className="bg-surface-red relative overflow-hidden" style={{ padding: "clamp(100px, 12vw, 180px) 0" }}>
      {/* Ambient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(245,221,213,0.06) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(245,221,213,0.04) 0%, transparent 70%)" }} />
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      <div className="container relative z-10">
        {/* ── Two-column header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-end" style={{ gap: "clamp(28px, 5vw, 40px)", columnGap: "clamp(40px, 6vw, 80px)", marginBottom: "clamp(40px, 6vw, 64px)" }}>
          {/* Left — Display heading */}
          <div>
            <ScrollReveal from={{ y: 20, opacity: 0 }} to={{ y: 0, opacity: 1 }} start="top 88%" end="top 65%">
              <div className="flex items-center" style={{ gap: "16px", marginBottom: "24px" }}>
                <div className="w-10 h-px bg-ink-on-red/30" />
                <p className="eyebrow text-ink-on-red/70">Exclusive Series</p>
              </div>
            </ScrollReveal>

            <TextRevealByWord as="h2" className="display text-ink-on-red" start="top 85%" end="top 55%">
              Spirit of Nepal
            </TextRevealByWord>
          </div>

          {/* Right — Description + CTA */}
          <div>
            <ScrollReveal from={{ y: 30, opacity: 0 }} to={{ y: 0, opacity: 1 }} start="top 82%" end="top 55%">
              <p className="text-ink-on-red-muted leading-[1.85]" style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.08rem)", marginBottom: "32px" }}>
                Heritage forged in fire. From the serene plains of Lumbini to
                the rugged peaks of the Himalayas — surfaces that carry the
                soul of our land.
              </p>
            </ScrollReveal>
            <ScrollReveal from={{ y: 20, opacity: 0 }} to={{ y: 0, opacity: 1 }} start="top 78%" end="top 52%">
              <a href="/spirit-of-nepal" className="link-arrow text-ink-on-red hover:text-white">
                Explore Collection <ArrowRight size={14} />
              </a>
            </ScrollReveal>
          </div>
        </div>

        {/* ── Divider ── */}
        <ScrollReveal from={{ scaleX: 0 }} to={{ scaleX: 1 }} start="top 75%" end="top 55%">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-ink-on-red/20 to-transparent origin-center" style={{ marginBottom: "64px" }} />
        </ScrollReveal>

        {/* ── Tile Cards ── */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "clamp(24px, 4vw, 32px)" }}>
          {spiritItems.map((item) => {
            const location = locationMap[item.name] || "Nepal";

            return (
              <div key={item.name} className="spirit-card opacity-0">
                <TiltCard intensity={5}>
                  <a href="/spirit-of-nepal" className="group block">
                    {/* Image — landscape ratio */}
                    <div className="relative aspect-[16/12] overflow-hidden rounded-sm" style={{ marginBottom: "20px" }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Location tag — top left */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/30 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5">
                        <MapPin size={10} className="text-accent-light" />
                        <p className="text-[0.55rem] font-medium tracking-[0.12em] uppercase text-white/80">
                          {location}
                        </p>
                      </div>

                      {/* Gold line at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </div>

                    {/* Info below image — always visible */}
                    <div>
                      <h3 className="font-serif font-light text-ink-on-red group-hover:text-white transition-colors duration-300" style={{ fontSize: "clamp(1.15rem, 1.6vw, 1.4rem)", marginBottom: "8px" }}>
                        {item.name}
                      </h3>
                      <p className="text-[0.55rem] font-medium tracking-[0.2em] uppercase text-ink-on-red/50" style={{ marginBottom: "12px" }}>
                        {item.type} · {item.size}
                      </p>
                      <p className="text-[0.85rem] text-ink-on-red-muted leading-[1.7]">
                        {item.desc}
                      </p>
                    </div>
                  </a>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
