"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, MessageCircle, Phone, X } from "lucide-react";

const WA_URL =
  "https://wa.me/9779802310000?text=" +
  encodeURIComponent("Hi, I have a question about Prime Tiles products. Could you help me?");
const PHONE_URL = "tel:+97715978860";
const EMAIL_URL = "mailto:info@primeceramics.com.np";

type ActionItem = {
  name: string;
  href: string;
  bg: string;
  external?: boolean;
  render: () => React.ReactNode;
};

/** Brand WhatsApp glyph — matches what was on the old single-icon button. */
function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

const ACTIONS: ActionItem[] = [
  {
    name: "Email Prime Tiles",
    href: EMAIL_URL,
    bg: "var(--color-ink)",
    render: () => <Mail size={20} strokeWidth={1.8} aria-hidden="true" />,
  },
  {
    name: "Call Prime Tiles",
    href: PHONE_URL,
    bg: "var(--color-accent)",
    render: () => <Phone size={20} strokeWidth={1.8} aria-hidden="true" />,
  },
  {
    name: "Chat on WhatsApp",
    href: WA_URL,
    bg: "#25D366",
    external: true,
    render: () => <WhatsAppIcon />,
  },
];

/**
 * Floating contact menu — replaces the single WhatsApp button.
 * Tap the chat-bubble at bottom-right to fan out three options
 * (Email / Call / WhatsApp) above it. Tap the X (or Escape, or
 * outside) to close.
 *
 * Visibility is gated on first-screen scroll — the button only
 * shows after the user has scrolled past the hero, matching the
 * previous WhatsApp-only behavior.
 */
export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Show after first viewport scroll
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Broadcast toggle so other floating UI (BackToTop) can react.
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("primecontact:toggle", { detail: { open } }));
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Close on outside click / tap
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("pointerdown", onPointer);
    return () => window.removeEventListener("pointerdown", onPointer);
  }, [open]);

  const lastIdx = ACTIONS.length - 1;

  return (
    <div
      ref={wrapperRef}
      className="fixed z-50 flex flex-col items-end"
      style={{
        bottom: "clamp(16px, 3vw, 24px)",
        right: "clamp(16px, 3vw, 24px)",
        gap: "12px",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.3s linear",
      }}
    >
      {ACTIONS.map((action, i) => {
        // Stagger: bottom item appears first on open; top item disappears first on close.
        const openDelay = (lastIdx - i) * 50; // ms
        const closeDelay = i * 40; // ms
        const delay = open ? openDelay : closeDelay;
        return (
          <a
            key={action.name}
            href={action.href}
            target={action.external ? "_blank" : undefined}
            rel={action.external ? "noopener noreferrer" : undefined}
            aria-label={action.name}
            tabIndex={open ? 0 : -1}
            className="flex items-center justify-center rounded-full"
            style={{
              width: "48px",
              height: "48px",
              background: action.bg,
              color: "white",
              boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0) scale(1)" : "translateY(8px) scale(0.85)",
              transition: `opacity 0.25s linear ${delay}ms, transform 0.25s linear ${delay}ms`,
              pointerEvents: open ? "auto" : "none",
            }}
          >
            {action.render()}
          </a>
        );
      })}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close contact menu" : "Open contact menu"}
        aria-expanded={open}
        className="flex items-center justify-center rounded-full"
        style={{
          width: "clamp(52px, 13vw, 60px)",
          height: "clamp(52px, 13vw, 60px)",
          background: "var(--color-accent)",
          color: "white",
          boxShadow: "0 4px 14px rgba(181,138,82,0.4)",
          border: "none",
          cursor: "pointer",
          transition: "transform 0.3s linear, box-shadow 0.3s linear, background 0.3s linear",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.06)";
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(181,138,82,0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 14px rgba(181,138,82,0.4)";
        }}
      >
        <span
          aria-hidden="true"
          className="relative flex items-center justify-center"
          style={{ width: "26px", height: "26px" }}
        >
          <MessageCircle
            size={26}
            strokeWidth={1.8}
            style={{
              position: "absolute",
              opacity: open ? 0 : 1,
              transform: open ? "rotate(-45deg) scale(0.8)" : "rotate(0) scale(1)",
              transition: "opacity 0.25s linear, transform 0.25s linear",
            }}
          />
          <X
            size={26}
            strokeWidth={2}
            style={{
              position: "absolute",
              opacity: open ? 1 : 0,
              transform: open ? "rotate(0) scale(1)" : "rotate(45deg) scale(0.8)",
              transition: "opacity 0.25s linear, transform 0.25s linear",
            }}
          />
        </span>
      </button>
    </div>
  );
}
