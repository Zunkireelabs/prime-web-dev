"use client";

import { useState, useEffect } from "react";

interface SoundInvitationProps {
  onEnable: () => void;
  onDismiss: () => void;
}

export default function SoundInvitation({ onEnable, onDismiss }: SoundInvitationProps) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Only show on first visit
    if (localStorage.getItem("prime-sound-invited")) return;

    const showTimer = setTimeout(() => setVisible(true), 2800);

    // Auto-dismiss after 10 seconds
    const hideTimer = setTimeout(() => handleDismiss(), 12800);

    return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDismiss = () => {
    setExiting(true);
    localStorage.setItem("prime-sound-invited", "1");
    setTimeout(() => { setVisible(false); onDismiss(); }, 600);
  };

  const handleEnable = () => {
    setExiting(true);
    localStorage.setItem("prime-sound-invited", "1");
    setTimeout(() => { setVisible(false); onEnable(); }, 400);
  };

  if (!visible) return null;

  return (
    <div
      className="absolute bottom-24 md:bottom-28 left-1/2 z-20"
      style={{
        transform: exiting
          ? "translateX(-50%) translateY(20px)"
          : "translateX(-50%) translateY(0)",
        opacity: exiting ? 0 : 1,
        transition: "all 0.3s linear",
      }}
    >
      <div className="bg-white/[0.07] backdrop-blur-xl border border-white/[0.08] px-6 py-4 md:px-8 md:py-5 flex items-center gap-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        {/* Animated sound wave icon */}
        <button
          onClick={handleEnable}
          aria-label="Enable ambient sound"
          className="relative w-12 h-12 shrink-0 rounded-full border border-white/20 flex items-center justify-center group hover:border-white/40 transition-all duration-300"
        >
          {/* Pulsing ring */}
          <div className="absolute inset-0 rounded-full border border-white/10 animate-[soundPulse_2s_ease-in-out_infinite]" />

          {/* Sound wave bars */}
          <div className="flex items-end gap-[3px] h-4">
            {[1, 2, 3, 4, 3].map((h, i) => (
              <div
                key={i}
                className="w-[2px] bg-white/70 group-hover:bg-white rounded-full"
                style={{
                  animation: `soundBar 1.2s ease-in-out ${i * 0.15}s infinite alternate`,
                }}
              />
            ))}
          </div>
        </button>

        <div>
          <p className="text-white/90 text-sm font-serif font-light tracking-wide">
            Experience with sound
          </p>
          <p className="text-white/30 text-[0.6rem] tracking-[0.1em] mt-1">
            Immerse yourself in the craft
          </p>
        </div>

        {/* Dismiss */}
        <button
          onClick={handleDismiss}
          className="text-white/20 hover:text-white/50 transition-colors ml-2 text-[0.55rem] tracking-[0.15em] uppercase shrink-0"
        >
          Skip
        </button>
      </div>

      <style jsx>{`
        @keyframes soundBar {
          0% { height: 3px; }
          100% { height: 16px; }
        }
        @keyframes soundPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
