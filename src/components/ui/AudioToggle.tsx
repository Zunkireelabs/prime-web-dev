"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import AudioManager from "@/lib/audioManager";

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const manager = AudioManager.getInstance();
    manager.init("/audio/ambient.mp3");
    setIsPlaying(manager.getIsPlaying());
  }, []);

  const handleToggle = () => {
    const manager = AudioManager.getInstance();
    manager.toggle();
    setIsPlaying(manager.getIsPlaying());
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-6 left-6 z-50 w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[rgba(201,169,110,0.2)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--gold)] hover:border-[var(--gold)] transition-all duration-300"
      aria-label={isPlaying ? "Mute audio" : "Play audio"}
    >
      {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
    </button>
  );
}
