"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Bottom-right back-to-top button. Sits above the FloatingContact
 * trigger so users can reach both. Auto-hides when the contact menu
 * is open so the fanned-out actions aren't fighting for the same
 * visual real estate.
 *
 * Coordinated via the `primecontact:toggle` window event dispatched
 * by FloatingContact — no shared provider required.
 */
export default function BackToTop() {
  const [show, setShow] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onToggle = (e: Event) => {
      const detail = (e as CustomEvent<{ open: boolean }>).detail;
      setChatOpen(!!detail?.open);
    };
    window.addEventListener("primecontact:toggle", onToggle);
    return () => window.removeEventListener("primecontact:toggle", onToggle);
  }, []);

  const visible = show && !chatOpen;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed z-40 flex items-center justify-center rounded-full bg-surface-card border border-ink-faint text-ink-light hover:border-accent hover:text-accent"
      style={{
        right: "clamp(16px, 3vw, 24px)",
        bottom: "clamp(84px, 16vw, 96px)",
        width: "44px",
        height: "44px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.10)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.3s linear, transform 0.3s linear, color 0.3s linear, border-color 0.3s linear",
      }}
    >
      <ArrowUp size={16} strokeWidth={1.8} />
    </button>
  );
}
