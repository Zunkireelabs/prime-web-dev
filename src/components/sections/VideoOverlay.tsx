"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Volume2, VolumeX, ChevronDown } from "lucide-react";

export default function VideoOverlay() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [dismissed, setDismissed] = useState(false);
  const [muted, setMuted] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) video.play().catch(() => {});
    window.dispatchEvent(new CustomEvent("video-ad", { detail: { visible: true } }));
    return () => {
      window.dispatchEvent(new CustomEvent("video-ad", { detail: { visible: false } }));
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handler = () => dismiss();
    window.addEventListener("dismiss-video-ad", handler);
    return () => window.removeEventListener("dismiss-video-ad", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dismissed) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dismissed]);

  const dismiss = useCallback(() => {
    if (dismissed) return;
    const video = videoRef.current;
    if (video) video.pause();
    setDismissed(true);
    window.dispatchEvent(new CustomEvent("video-ad", { detail: { visible: false } }));
    setTimeout(() => {
      const heroEl = document.getElementById("hero-main");
      if (heroEl) heroEl.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, [dismissed]);

  const toggleSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (muted) {
      video.muted = false;
      video.volume = 0;
      let vol = 0;
      const fade = setInterval(() => {
        vol += 0.05;
        if (vol >= 1) { vol = 1; clearInterval(fade); }
        video.volume = vol;
      }, 30);
      video.play().then(() => setMuted(false)).catch(() => {});
    } else {
      let vol = video.volume;
      const fade = setInterval(() => {
        vol -= 0.1;
        if (vol <= 0) {
          vol = 0; clearInterval(fade);
          video.muted = true;
          setMuted(true);
        }
        video.volume = Math.max(0, vol);
      }, 30);
    }
  }, [muted]);

  const scrollDown = () => {
    const heroEl = document.getElementById("hero-main");
    if (heroEl) heroEl.scrollIntoView({ behavior: "smooth" });
  };

  if (dismissed) return null;

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[var(--bg-dark)]"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}
        poster="/images/hero/hero-bg.jpg"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Controls */}
      <div className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-3">
        <button
          onClick={toggleSound}
          className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all duration-300 bg-black/20 backdrop-blur-sm"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>

        <button
          onClick={scrollDown}
          className="flex flex-col items-center gap-1 text-white/30 hover:text-white/60 transition-colors"
        >
          <span className="text-[0.45rem] tracking-[0.2em] uppercase">Scroll</span>
          <ChevronDown size={14} className="animate-bounce" />
        </button>
      </div>
    </section>
  );
}
