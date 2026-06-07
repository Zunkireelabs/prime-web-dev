"use client";

import { useState, useEffect } from "react";
import { X, Download, Loader2 } from "lucide-react";
import { submitCatalogLead, markCatalogLeadCaptured, downloadFile } from "@/lib/leads";

interface CatalogDownloadModalProps {
  open: boolean;
  onClose: () => void;
  /** Catalogue the visitor clicked — never shown as a field, sent to the CRM with the lead. */
  catalogName: string;
  /** PDF that downloads once the form is submitted. */
  pdfUrl: string;
}

const inputStyle: React.CSSProperties = {
  fontSize: "0.95rem",
  padding: "12px 14px",
  border: "1px solid rgba(43,36,28,0.1)",
  borderRadius: "8px",
  background: "var(--color-surface-alt)",
  transition: "border-color 0.3s",
};

export default function CatalogDownloadModal({
  open,
  onClose,
  catalogName,
  pdfUrl,
}: CatalogDownloadModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Lock body scroll + Esc to close
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
    if (!name.trim() || !phone.trim() || !email.trim()) return;
    setSubmitting(true);
    setErrorMsg(null);

    const result = await submitCatalogLead({ name, phone, email, catalog: catalogName });

    if (!result.ok) {
      setSubmitting(false);
      setErrorMsg("Couldn't process your request. Please try again or call us directly.");
      return;
    }

    // Remember this visitor so future downloads skip the form, then deliver the PDF.
    markCatalogLeadCaptured();
    downloadFile(pdfUrl);

    setSubmitting(false);
    onClose();
    setName("");
    setPhone("");
    setEmail("");
  };

  if (!open) return null;

  const isValid = name.trim() && phone.trim() && email.trim() && !submitting;

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Download Catalogue">
      {/* Backdrop */}
      <div className="absolute inset-0" style={{ background: "rgba(15,12,9,0.6)" }} onClick={onClose} />

      {/* Modal */}
      <div
        className="absolute bg-surface overflow-y-auto"
        data-lenis-prevent
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(460px, 92vw)",
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
        <p className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-accent" style={{ marginBottom: "12px" }}>
          Catalogue
        </p>
        <h2
          className="font-serif font-light text-ink"
          style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", lineHeight: 1.15, marginBottom: "8px" }}
        >
          Download <span className="italic text-accent">Catalogue</span>
        </h2>
        <p className="text-ink-muted" style={{ fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "32px" }}>
          Enter your details and your catalogue download will begin instantly.
        </p>

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Name */}
          <div>
            <label className="text-[0.58rem] font-medium tracking-[0.14em] uppercase text-ink-muted block" style={{ marginBottom: "8px" }}>
              Full Name <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full text-ink font-light bg-transparent focus:outline-none"
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(43,36,28,0.1)"; }}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-[0.58rem] font-medium tracking-[0.14em] uppercase text-ink-muted block" style={{ marginBottom: "8px" }}>
              Phone Number <span className="text-accent">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+977 98XXXXXXXX"
              className="w-full text-ink font-light bg-transparent focus:outline-none"
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(43,36,28,0.1)"; }}
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-[0.58rem] font-medium tracking-[0.14em] uppercase text-ink-muted block" style={{ marginBottom: "8px" }}>
              Email <span className="text-accent">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full text-ink font-light bg-transparent focus:outline-none"
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(43,36,28,0.1)"; }}
            />
          </div>

          {errorMsg && (
            <div
              role="alert"
              className="text-accent"
              style={{
                fontSize: "0.8rem",
                padding: "10px 14px",
                background: "rgba(150,112,76,0.08)",
                border: "1px solid rgba(150,112,76,0.25)",
                borderRadius: "8px",
              }}
            >
              {errorMsg}
            </div>
          )}

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
                Download Catalogue
                <Download size={14} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
