"use client";

import FadeIn from "@/components/animations/FadeIn";
import { clients } from "@/data/clients";
import Image from "next/image";

export default function AboutClients() {
  return (
    <section id="about-clients" className="bg-surface-alt section-pad-sm overflow-hidden">
      <div className="container">
        <FadeIn>
          <p className="eyebrow text-ink-muted" style={{ marginBottom: "40px", textAlign: "center" }}>Trusted By Leading Developers</p>
        </FadeIn>
      </div>

      <FadeIn direction="none" delay={0.1}>
        <div className="relative w-full">
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-surface-alt to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-surface-alt to-transparent z-10 pointer-events-none" />
          <div className="flex items-center gap-12 md:gap-20 animate-trust-marquee">
            {[...clients, ...clients, ...clients].map((c, i) => (
              <div key={`${c.name}-${i}`} className="flex items-center justify-center flex-shrink-0 w-[140px] md:w-[160px] h-[60px] group">
                <div className="grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                  <Image src={c.logo} alt={c.name} width={c.width} height={c.height} className="object-contain max-h-[35px] md:max-h-[40px] w-auto" unoptimized />
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
