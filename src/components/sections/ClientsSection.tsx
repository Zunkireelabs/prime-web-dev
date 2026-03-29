"use client";

import Image from "next/image";
import FadeIn from "@/components/animations/FadeIn";
import { clients } from "@/data/clients";

function ClientLogo({
  name,
  logo,
  width,
  height,
}: {
  name: string;
  logo: string;
  width: number;
  height: number;
}) {
  return (
    <div className="flex items-center justify-center flex-shrink-0 w-[180px] md:w-[220px] h-[80px] md:h-[100px] group">
      <div className="relative grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
        <Image
          src={logo}
          alt={name}
          width={width}
          height={height}
          className="object-contain max-h-[50px] md:max-h-[60px] w-auto"
          unoptimized
        />
      </div>
    </div>
  );
}

export default function ClientsSection() {
  const logoSet = clients.map((c) => (
    <ClientLogo key={c.name} {...c} />
  ));

  return (
    <section className="bg-[var(--bg-alt)] section-pad overflow-hidden">
      {/* Heading */}
      <FadeIn direction="up" distance={30}>
        <div className="text-center mb-4 md:mb-6">
          <span className="eyebrow text-[var(--ink-muted)] tracking-[0.3em]">
            Trusted By
          </span>
        </div>
      </FadeIn>

      <FadeIn direction="up" distance={30} delay={0.1}>
        <h2 className="h2 text-[var(--ink)] text-center mb-10 md:mb-14">
          Our Clients
        </h2>
      </FadeIn>

      {/* Marquee — infinite scroll */}
      <FadeIn direction="none" delay={0.2}>
        <div className="relative w-full">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-[var(--bg-alt)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-[var(--bg-alt)] to-transparent z-10 pointer-events-none" />

          <div className="flex items-center gap-8 md:gap-14 animate-marquee-clients">
            {logoSet}
            {logoSet}
            {logoSet}
          </div>
        </div>
      </FadeIn>

      {/* Thin accent line below marquee */}
      <FadeIn direction="up" distance={10} delay={0.4}>
        <div className="max-w-[var(--max-w)] mx-auto px-[var(--gutter)] mt-16 md:mt-24">
          <div className="h-px bg-[var(--ink-faint)] opacity-40" />
        </div>
      </FadeIn>

      <style jsx>{`
        @keyframes marqueeClients {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-100% / 3)); }
        }
        .animate-marquee-clients {
          animation: marqueeClients 25s linear infinite;
          width: max-content;
        }
        .animate-marquee-clients:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
