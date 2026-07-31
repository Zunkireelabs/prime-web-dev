"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Volume2, VolumeX, ChevronDown, X } from "lucide-react";

export default function VideoOverlay() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [dismissed, setDismissed] = useState(false);
  const [muted, setMuted] = useState(true);
  const [loaded, setLoaded] = useState(false);
  // Tracks an explicit user mute so we never auto-unmute against their wish.
  const userMutedRef = useRef(false);

  // Turn sound on (idempotent). Browsers may block sound-on-load; if so we
  // cleanly fall back to muted playback and stay silent until allowed.
  const enableSound = useCallback(() => {
    const video = videoRef.current;
    if (!video || userMutedRef.current) return;
    video.muted = false;
    video.play()
      .then(() => setMuted(false))
      .catch(() => {
        video.muted = true;
        setMuted(true);
        video.play().catch(() => {});
      });
  }, []);

  const muteSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    setMuted(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // If the browser already loaded the video before hydration, mark as loaded
      if (video.readyState >= 2) setLoaded(true);
    }

    window.dispatchEvent(new CustomEvent("video-ad", { detail: { visible: true } }));
    return () => {
      window.dispatchEvent(new CustomEvent("video-ad", { detail: { visible: false } }));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          muteSound(); // another section is showing → mute
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [enableSound, muteSound]);

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
    // Read the live element state so we stay correct even if the first-gesture
    // fallback already unmuted on this same interaction.
    if (video.muted) {
      userMutedRef.current = false; // user opted back into sound
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
      userMutedRef.current = true; // remember explicit mute → don't auto-unmute
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
  }, []);

  const scrollDown = () => {
    const heroEl = document.getElementById("hero-main");
    if (heroEl) heroEl.scrollIntoView({ behavior: "smooth" });
  };

  if (dismissed) return null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-surface-dark"
      style={{ height: "100svh" }}
    >
      {/* Desktop: cover fills viewport. Mobile: contain shows full video, centered vertically */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setLoaded(true)}
        onPause={() => !dismissed && videoRef.current?.play().catch(() => {})}
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}
        poster="/images/hero/hero-bg.jpg"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Responsive video fit */}
      <style jsx>{`
        video {
          object-fit: contain;
          object-position: center center;
        }
        @media (min-width: 768px) {
          video {
            object-fit: cover;
          }
        }
      `}</style>

      {/* Skip Video — top right, below header */}
      <div className="absolute z-10" style={{ top: "clamp(80px, 10vw, 110px)", right: "clamp(16px, 3vw, 32px)" }}>
        <button
          onClick={dismiss}
          className="flex items-center bg-black/40 backdrop-blur-md border border-white/15 text-white/70 hover:text-white hover:border-white/30 hover:bg-black/60 transition-all duration-300"
          style={{ gap: "8px", padding: "10px 20px" }}
        >
          <span className="text-[0.6rem] font-medium tracking-[0.2em] uppercase">Skip Video</span>
          <X size={14} strokeWidth={1.5} />
        </button>
      </div>

      {/* Sound toggle — bottom left */}
      <div className="absolute z-10" style={{ bottom: "32px", left: "clamp(16px, 3vw, 32px)" }}>
        <button
          onClick={toggleSound}
          className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all duration-300 bg-black/20 backdrop-blur-sm"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </section>
  );
}
