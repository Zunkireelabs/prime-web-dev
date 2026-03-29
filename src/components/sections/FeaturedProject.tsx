"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import FadeIn from "@/components/animations/FadeIn";
import { ArrowRight } from "lucide-react";
import { featuredProject } from "@/data/projects";

export default function FeaturedProject() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const rafId = useRef<number>(0);

  const handleScroll = useCallback(() => {
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      if (rect.bottom > 0 && rect.top < viewH) {
        const progress = (viewH - rect.top) / (viewH + rect.height);
        setOffset((progress - 0.5) * 60);
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [handleScroll]);

  return (
    <section ref={sectionRef} id="projects" className="relative h-[70vh] lg:h-[85vh] overflow-hidden">
      {/* Parallax image */}
      <img
        src={featuredProject.image}
        alt={featuredProject.title}
        className="w-full h-[110%] object-cover absolute top-0 left-0 will-change-transform"
        style={{ transform: `translateY(${offset}px)` }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      <div className="container relative z-10 h-full flex flex-col justify-end pb-14 lg:pb-20">
        <FadeIn>
          <p className="eyebrow text-[var(--accent-light)] mb-3 tracking-[0.35em]">Featured Project</p>
        </FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="h1 text-white mb-3 max-w-xl">{featuredProject.title}</h2>
        </FadeIn>
        <FadeIn delay={0.14}>
          <p className="body-sm text-white/60 max-w-md mb-6">
            {featuredProject.description}
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <a href="/#projects" className="link-arrow text-white/80 hover:text-white text-[0.65rem]">
            View Project <ArrowRight size={12} />
          </a>
        </FadeIn>

        {/* Project stats strip */}
        <FadeIn delay={0.3}>
          <div className="flex gap-8 mt-10 pt-6 border-t border-white/10">
            <div>
              <p className="text-2xl font-serif font-light text-white">{featuredProject.area}</p>
              <p className="text-[0.5rem] tracking-[0.2em] uppercase text-white/40 mt-1">Sq Ft</p>
            </div>
            <div>
              <p className="text-2xl font-serif font-light text-white">{featuredProject.collection}</p>
              <p className="text-[0.5rem] tracking-[0.2em] uppercase text-white/40 mt-1">Collection</p>
            </div>
            <div>
              <p className="text-2xl font-serif font-light text-white">{featuredProject.year}</p>
              <p className="text-[0.5rem] tracking-[0.2em] uppercase text-white/40 mt-1">Completed</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
