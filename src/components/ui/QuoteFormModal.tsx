"use client";

import { useState, useEffect } from "react";
import { X, ArrowRight, Loader2 } from "lucide-react";

const PROJECT_TYPES = ["Home", "Commercial", "Hotel", "Office", "Other"];
const TILE_SIZES = ["300×300 mm", "300×450 mm", "300×600 mm", "400×400 mm", "600×600 mm", "600×1200 mm"];

const SHEET_URL = "https://script.google.com/macros/s/AKfycbxuRHRiJ9b5IjfbD_lqzAboGQ0Gb1e9LUTuzsauzWVLu_kbRLFaO1M6oC-hGR8GjucZtg/exec";

interface QuoteFormModalProps {
  open: boolean;
  onClose: () => void;
  /** Pre-fill context from calculator or product detail */
  prefill?: {
    tileSize?: string;
    message?: string;
  };
}

export default function QuoteFormModal({ open, onClose, prefill }: QuoteFormModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [tileSize, setTileSize] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Apply prefill when modal opens
  useEffect(() => {
    if (open && prefill) {
      if (prefill.tileSize) setTileSize(prefill.tileSize);
      if (prefill.message) setMessage(prefill.message);
    }
  }, [open, prefill]);

  // Lock body scroll
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim() || !projectType) return;
    setSubmitting(true);

    // Save to Google Sheets
    try {
      await fetch(SHEET_URL, {
        method: "POST",
        body: JSON.stringify({
          name,
          phone,
          email,
          projectType,
          tileSize,
          message,
        }),
      });
    } catch {
      // Don't block WhatsApp if sheet save fails
    }

    // Open WhatsApp
    const lines = [
      `Hi, I'd like to request a quote for tiles.`,
      ``,
      `Name: ${name}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : null,
      `Project: ${projectType}`,
      tileSize ? `Tile Size: ${tileSize}` : null,
      message ? `\nMessage: ${message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const waUrl = `https://wa.me/9779802310000?text=${encodeURIComponent(lines)}`;
    window.open(waUrl, "_blank");
    setSubmitting(false);
    onClose();
    // Reset form
    setName("");
    setPhone("");
    setEmail("");
    setProjectType("");
    setTileSize("");
    setMessage("");
  };

  if (!open) return null;

  const isValid = name.trim() && phone.trim() && projectType && !submitting;

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Request a Quote">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(15,12,9,0.6)" }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="absolute bg-surface overflow-y-auto"
        data-lenis-prevent
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(520px, 92vw)",
          maxHeight: "90vh",
          borderRadius: "16px",
          boxShadow: "var(--shadow-lg)",
          padding: "clamp(28px, 4vw, 48px)",
        }}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute flex items-center justify-center text-ink-muted hover:text-ink"
          style={{
            top: "16px",
            right: "16px",
            width: "36px",
            height: "36px",
            background: "var(--color-surface-alt)",
            borderRadius: "50%",
            transition: "color 0.3s",
            cursor: "pointer",
          }}
        >
          <X size={16} />
        </button>

        {/* Header */}
        <p
          className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-accent"
          style={{ marginBottom: "12px" }}
        >
          Get in Touch
        </p>
        <h2
          className="font-serif font-light text-ink"
          style={{
            fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
            lineHeight: 1.15,
            marginBottom: "8px",
          }}
        >
          Request a <span className="italic text-accent">Quote</span>
        </h2>
        <p
          className="text-ink-muted"
          style={{
            fontSize: "0.85rem",
            lineHeight: 1.6,
            marginBottom: "32px",
          }}
        >
          Fill in your details and we&apos;ll get back to you shortly via WhatsApp.
        </p>

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Name */}
          <div>
            <label
              className="text-[0.58rem] font-medium tracking-[0.14em] uppercase text-ink-muted block"
              style={{ marginBottom: "8px" }}
            >
              Full Name <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full text-ink font-light bg-transparent focus:outline-none"
              style={{
                fontSize: "0.95rem",
                padding: "12px 14px",
                border: "1px solid rgba(43,36,28,0.1)",
                borderRadius: "8px",
                background: "var(--color-surface-alt)",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(43,36,28,0.1)"; }}
            />
          </div>

          {/* Phone */}
          <div>
            <label
              className="text-[0.58rem] font-medium tracking-[0.14em] uppercase text-ink-muted block"
              style={{ marginBottom: "8px" }}
            >
              Phone Number <span className="text-accent">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+977 98XXXXXXXX"
              className="w-full text-ink font-light bg-transparent focus:outline-none"
              style={{
                fontSize: "0.95rem",
                padding: "12px 14px",
                border: "1px solid rgba(43,36,28,0.1)",
                borderRadius: "8px",
                background: "var(--color-surface-alt)",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(43,36,28,0.1)"; }}
            />
          </div>

          {/* Email */}
          <div>
            <label
              className="text-[0.58rem] font-medium tracking-[0.14em] uppercase text-ink-muted block"
              style={{ marginBottom: "8px" }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full text-ink font-light bg-transparent focus:outline-none"
              style={{
                fontSize: "0.95rem",
                padding: "12px 14px",
                border: "1px solid rgba(43,36,28,0.1)",
                borderRadius: "8px",
                background: "var(--color-surface-alt)",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(43,36,28,0.1)"; }}
            />
          </div>

          {/* Two columns: Project Type + Tile Size */}
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "20px" }}>
            {/* Project Type */}
            <div>
              <label
                className="text-[0.58rem] font-medium tracking-[0.14em] uppercase text-ink-muted block"
                style={{ marginBottom: "8px" }}
              >
                Project Type <span className="text-accent">*</span>
              </label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full text-ink font-light bg-transparent focus:outline-none appearance-none cursor-pointer"
                style={{
                  fontSize: "0.95rem",
                  padding: "12px 14px",
                  border: "1px solid rgba(43,36,28,0.1)",
                  borderRadius: "8px",
                  background: "var(--color-surface-alt)",
                  transition: "border-color 0.3s",
                  color: projectType ? "var(--color-ink)" : "var(--color-ink-muted)",
                }}
              >
                <option value="" disabled>Select...</option>
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Tile Size */}
            <div>
              <label
                className="text-[0.58rem] font-medium tracking-[0.14em] uppercase text-ink-muted block"
                style={{ marginBottom: "8px" }}
              >
                Tile Size
              </label>
              <select
                value={tileSize}
                onChange={(e) => setTileSize(e.target.value)}
                className="w-full text-ink font-light bg-transparent focus:outline-none appearance-none cursor-pointer"
                style={{
                  fontSize: "0.95rem",
                  padding: "12px 14px",
                  border: "1px solid rgba(43,36,28,0.1)",
                  borderRadius: "8px",
                  background: "var(--color-surface-alt)",
                  transition: "border-color 0.3s",
                  color: tileSize ? "var(--color-ink)" : "var(--color-ink-muted)",
                }}
              >
                <option value="" disabled>Select...</option>
                {TILE_SIZES.map((s) => (
                  <option key={s} value={s}>{s.replace(" mm", "")}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              className="text-[0.58rem] font-medium tracking-[0.14em] uppercase text-ink-muted block"
              style={{ marginBottom: "8px" }}
            >
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your project..."
              rows={3}
              className="w-full text-ink font-light bg-transparent focus:outline-none resize-none"
              style={{
                fontSize: "0.95rem",
                padding: "12px 14px",
                border: "1px solid rgba(43,36,28,0.1)",
                borderRadius: "8px",
                background: "var(--color-surface-alt)",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(43,36,28,0.1)"; }}
            />
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid}
            className="btn-gold group w-full justify-center"
            style={{
              opacity: isValid ? 1 : 0.5,
              cursor: isValid ? "pointer" : "not-allowed",
              marginTop: "8px",
            }}
          >
            {submitting ? (
              <>
                Sending...
                <Loader2 size={14} className="animate-spin" />
              </>
            ) : (
              <>
                Send via WhatsApp
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
