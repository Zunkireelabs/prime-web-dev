"use client";

import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  return (
    <section className="relative h-screen overflow-hidden bg-[var(--bg-dark)]">
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}
          poster="/images/hero/hero-bg.jpg"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlays — lighter top to let video show through */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 h-full flex flex-col justify-end pb-20 md:pb-24">
        <div className="mb-14 md:mb-16">
          <FadeIn delay={0.3} direction="up" distance={30}>
            <p className="text-[0.6rem] font-medium tracking-[0.35em] uppercase text-[var(--accent-light)] mb-4 md:mb-5">
              Nepal&apos;s No.1 Tile Manufacturer
            </p>
          </FadeIn>

          <FadeIn delay={0.5} direction="up" distance={40}>
            <h1
              className="font-serif font-light text-white leading-[0.95] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}
            >
              Surfaces that<br />
              <span className="italic text-white/80">define spaces.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.7} direction="up" distance={20}>
            <p className="text-[0.95rem] leading-relaxed text-white/45 max-w-md mt-5 md:mt-6">
              Where earth, fire, and design converge — crafted in Nepal.
            </p>
          </FadeIn>

          <FadeIn delay={0.9} direction="up" distance={15}>
            <div className="mt-8 md:mt-9">
              <a href="#collections" className="btn-fill bg-white/10 border-white/20 text-white hover:bg-white hover:text-[var(--bg-dark)] hover:border-white backdrop-blur-sm">
                Explore Collections <ArrowRight size={14} />
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Bottom credentials strip */}
        <FadeIn delay={1.1} direction="up" distance={10}>
          <div className="flex items-center justify-between border-t border-white/10 pt-5">
            <div className="hidden md:flex items-center gap-6 text-[0.6rem] font-medium tracking-[0.2em] uppercase text-white/30">
              <span>Est. 2023</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>Italian SACMI Technology</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>300 – 1200mm Formats</span>
            </div>

            {/* Scroll indicator */}
            <div className="flex items-center gap-3 text-white/30">
              <span className="text-[0.55rem] font-medium tracking-[0.2em] uppercase">Scroll</span>
              <div className="w-[1px] h-8 relative overflow-hidden">
                <div
                  className="absolute inset-x-0 h-full bg-white/50"
                  style={{ animation: "scrollLine 2.5s linear infinite" }}
                />
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      <style jsx>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(0%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
}
