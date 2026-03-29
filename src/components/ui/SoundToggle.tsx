"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function SoundToggle() {
  const [muted, setMuted] = useState(true);
  const [show, setShow] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fadeRef = useRef<ReturnType<typeof setInterval>>();

  // Find the hero video element on mount
  useEffect(() => {
    const findVideo = () => {
      const video = document.querySelector("video") as HTMLVideoElement | null;
      if (video) {
        videoRef.current = video;
        setShow(true);
      }
    };
    // Delay slightly to ensure video is in DOM
    const t = setTimeout(findVideo, 500);
    return () => clearTimeout(t);
  }, []);

  const fadeVolume = useCallback((target: number, ms: number, cb?: () => void) => {
    const video = videoRef.current;
    if (!video) return;
    clearInterval(fadeRef.current);
    const start = video.volume;
    const diff = target - start;
    const steps = 20;
    let step = 0;
    fadeRef.current = setInterval(() => {
      step++;
      video.volume = Math.max(0, Math.min(1, start + diff * (step / steps)));
      if (step >= steps) {
        clearInterval(fadeRef.current);
        video.volume = target;
        cb?.();
      }
    }, ms / steps);
  }, []);

  const toggle = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (muted) {
      video.muted = false;
      video.volume = 0;
      video.play().then(() => {
        setMuted(false);
        fadeVolume(1, 800);
      }).catch(() => {});
    } else {
      fadeVolume(0, 400, () => {
        video.muted = true;
        setMuted(true);
      });
    }
  }, [muted, fadeVolume]);

  useEffect(() => {
    return () => clearInterval(fadeRef.current);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={toggle}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-11 h-11 rounded-full bg-[var(--bg-dark)]/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-white/25 transition-all duration-300 group"
      aria-label={muted ? "Unmute" : "Mute"}
    >
      {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}

      {/* Pulse ring when playing */}
      {!muted && (
        <span
          className="absolute inset-0 rounded-full border border-white/15"
          style={{ animation: "soundPulse 2s ease-out infinite" }}
        />
      )}

      <style jsx>{`
        @keyframes soundPulse {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </button>
  );
}
