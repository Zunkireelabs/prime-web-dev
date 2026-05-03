"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { X, ArrowRight, Check, Loader2 } from "lucide-react";
import {
  validate,
  submitApplication,
  emptyApplicationForm,
  sourceOptions,
  type ApplicationFormData,
  type FieldErrors,
} from "@/lib/apply";
import type { CareerOpening } from "@/data/careers";

interface ApplyModalProps {
  open: boolean;
  opening: CareerOpening | null; // null = open application
  onClose: () => void;
}

type Phase = "form" | "submitting" | "success";

export default function ApplyModal({ open, opening, onClose }: ApplyModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const [phase, setPhase] = useState<Phase>("form");
  const [data, setData] = useState<ApplicationFormData>(emptyApplicationForm);
  const [errors, setErrors] = useState<FieldErrors>({});

  // Sync role into form data when opening changes
  useEffect(() => {
    if (open) {
      setData({
        ...emptyApplicationForm,
        role: opening?.title ?? "",
        roleId: opening?.id ?? "",
      });
      setErrors({});
      setPhase("form");
    }
  }, [open, opening]);

  // Body scroll lock + ESC handler + initial focus
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);

    // Initial focus — give the modal a tick to mount
    const focusTimer = setTimeout(() => {
      firstFieldRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKey);
      clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  if (!open) return null;

  const update = <K extends keyof ApplicationFormData>(
    key: K,
    value: ApplicationFormData[K]
  ) => {
    setData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(data);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      // focus first error
      const first = Object.keys(found)[0];
      const el = dialogRef.current?.querySelector<HTMLElement>(
        `[name="${first}"]`
      );
      el?.focus();
      return;
    }
    setPhase("submitting");
    try {
      await submitApplication(data);
      setPhase("success");
    } catch {
      setPhase("form");
      setErrors({ coverNote: "Something went wrong. Please try again." });
    }
  };

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const roleLabel = opening
    ? `${opening.title} · ${opening.team} · ${opening.location}`
    : "Open application";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onMouseDown={onBackdropClick}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        background: "rgba(26,24,21,0.55)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "clamp(0px, 4vw, 64px) clamp(0px, 3vw, 32px)",
        overflowY: "auto",
        backdropFilter: "blur(2px)",
      }}
    >
      <div
        ref={dialogRef}
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "640px",
          background: "var(--color-surface-card, #FFFFFF)",
          border: "1px solid rgba(43,36,28,0.10)",
          borderRadius: "4px",
          boxShadow: "0 24px 80px rgba(0,0,0,0.18)",
          overflow: "hidden",
          marginTop: "clamp(0px, 4vh, 56px)",
          marginBottom: "clamp(0px, 4vh, 56px)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "clamp(24px, 3.5vw, 36px) clamp(24px, 3.5vw, 40px) 0",
            position: "relative",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-ink-light hover:text-ink"
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid transparent",
              background: "transparent",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "color 0.3s linear, border-color 0.3s linear",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(43,36,28,0.10)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "transparent";
            }}
          >
            <X size={18} strokeWidth={1.6} />
          </button>

          <p
            className="eyebrow text-accent"
            style={{ marginBottom: "12px" }}
          >
            Apply
          </p>
          <h2
            id={titleId}
            className="font-serif font-light text-ink"
            style={{
              fontSize: "clamp(1.4rem, 2.4vw, 1.85rem)",
              lineHeight: 1.2,
            }}
          >
            {opening?.title ?? "Send an open application"}
          </h2>
          <p
            className="font-light text-ink-light"
            style={{
              fontSize: "0.85rem",
              marginTop: "8px",
              lineHeight: 1.5,
            }}
          >
            {roleLabel}
          </p>
          <div
            className="bg-accent"
            style={{ width: "32px", height: "1.5px", marginTop: "20px" }}
          />
        </div>

        {/* Body */}
        {phase === "success" ? (
          <SuccessPanel name={data.fullName} role={opening?.title} onClose={onClose} />
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            style={{
              padding: "clamp(24px, 3.5vw, 36px) clamp(24px, 3.5vw, 40px) clamp(28px, 4vw, 40px)",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Field
              label="Full name"
              name="fullName"
              required
              error={errors.fullName}
              inputRef={firstFieldRef}
              value={data.fullName}
              onChange={(v) => update("fullName", v)}
              placeholder="Bibek Sharma"
              autoComplete="name"
            />

            <Field
              label="Email"
              name="email"
              type="email"
              required
              error={errors.email}
              value={data.email}
              onChange={(v) => update("email", v)}
              placeholder="you@example.com"
              autoComplete="email"
            />

            <Field
              label="Phone"
              name="phone"
              type="tel"
              error={errors.phone}
              value={data.phone}
              onChange={(v) => update("phone", v)}
              placeholder="+977 98XXXXXXXX"
              autoComplete="tel"
              hint="Optional, but recommended."
            />

            <Field
              label="LinkedIn URL"
              name="linkedin"
              type="url"
              error={errors.linkedin}
              value={data.linkedin}
              onChange={(v) => update("linkedin", v)}
              placeholder="https://linkedin.com/in/…"
              autoComplete="url"
            />

            <Field
              label="Resume URL"
              name="resumeUrl"
              type="url"
              error={errors.resumeUrl}
              value={data.resumeUrl}
              onChange={(v) => update("resumeUrl", v)}
              placeholder="Google Drive / Dropbox link"
              hint="Make sure it's set to view-accessible."
            />

            <FieldTextarea
              label="Why Prime?"
              name="coverNote"
              required
              error={errors.coverNote}
              value={data.coverNote}
              onChange={(v) => update("coverNote", v)}
              placeholder="A few sentences on why you'd like to join, what you'd own, anything you've shipped you're proud of."
              rows={5}
            />

            <FieldSelect
              label="How did you hear about us?"
              name="source"
              value={data.source}
              onChange={(v) => update("source", v)}
              options={sourceOptions}
              error={errors.source}
            />

            {/* Submit row */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                marginTop: "8px",
              }}
            >
              <button
                type="submit"
                disabled={phase === "submitting"}
                className="text-white"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "16px 28px",
                  background: "var(--color-ink, #3D3A36)",
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  cursor: phase === "submitting" ? "wait" : "pointer",
                  border: "1px solid var(--color-ink, #3D3A36)",
                  borderRadius: "2px",
                  opacity: phase === "submitting" ? 0.7 : 1,
                  transition: "background 0.3s linear, opacity 0.3s linear",
                }}
                onMouseEnter={(e) => {
                  if (phase !== "submitting") {
                    e.currentTarget.style.background = "var(--color-accent, #96704C)";
                    e.currentTarget.style.borderColor = "var(--color-accent, #96704C)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (phase !== "submitting") {
                    e.currentTarget.style.background = "var(--color-ink, #3D3A36)";
                    e.currentTarget.style.borderColor = "var(--color-ink, #3D3A36)";
                  }
                }}
              >
                {phase === "submitting" ? (
                  <>
                    <Loader2 size={14} strokeWidth={1.8} className="animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    Submit application
                    <ArrowRight size={14} strokeWidth={1.8} />
                  </>
                )}
              </button>
              <p
                className="text-ink-light font-light"
                style={{ fontSize: "0.75rem" }}
              >
                Required fields marked <span className="text-accent">*</span>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────────── */

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  autoComplete?: string;
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  error,
  hint,
  inputRef,
  autoComplete,
}: FieldProps) {
  const hintId = `${name}-hint`;
  const errId = `${name}-error`;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label
        htmlFor={name}
        className="text-ink"
        style={{
          fontSize: "0.7rem",
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <input
        ref={inputRef}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={
          [error ? errId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
          undefined
        }
        className="bg-transparent text-ink placeholder:text-ink-muted/70"
        style={{
          padding: "12px 14px",
          fontSize: "0.95rem",
          border: error
            ? "1px solid #B5443A"
            : "1px solid rgba(43,36,28,0.18)",
          borderRadius: "2px",
          outline: "none",
          transition: "border-color 0.3s linear",
        }}
        onFocus={(e) => {
          if (!error) {
            e.currentTarget.style.borderColor = "var(--color-accent, #96704C)";
          }
        }}
        onBlur={(e) => {
          if (!error) {
            e.currentTarget.style.borderColor = "rgba(43,36,28,0.18)";
          }
        }}
      />
      {error ? (
        <p
          id={errId}
          style={{
            fontSize: "0.75rem",
            color: "#B5443A",
            lineHeight: 1.5,
          }}
        >
          {error}
        </p>
      ) : hint ? (
        <p
          id={hintId}
          className="text-ink-light"
          style={{ fontSize: "0.75rem", lineHeight: 1.5 }}
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
}

interface FieldTextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  rows?: number;
}

function FieldTextarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  error,
  rows = 4,
}: FieldTextareaProps) {
  const errId = `${name}-error`;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label
        htmlFor={name}
        className="text-ink"
        style={{
          fontSize: "0.7rem",
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        value={value}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errId : undefined}
        className="bg-transparent text-ink placeholder:text-ink-muted/70"
        style={{
          padding: "12px 14px",
          fontSize: "0.95rem",
          border: error
            ? "1px solid #B5443A"
            : "1px solid rgba(43,36,28,0.18)",
          borderRadius: "2px",
          outline: "none",
          resize: "vertical",
          minHeight: "120px",
          fontFamily: "inherit",
          lineHeight: 1.6,
          transition: "border-color 0.3s linear",
        }}
        onFocus={(e) => {
          if (!error) {
            e.currentTarget.style.borderColor = "var(--color-accent, #96704C)";
          }
        }}
        onBlur={(e) => {
          if (!error) {
            e.currentTarget.style.borderColor = "rgba(43,36,28,0.18)";
          }
        }}
      />
      {error && (
        <p
          id={errId}
          style={{ fontSize: "0.75rem", color: "#B5443A", lineHeight: 1.5 }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

interface FieldSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  error?: string;
}

function FieldSelect({
  label,
  name,
  value,
  onChange,
  options,
  error,
}: FieldSelectProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label
        htmlFor={name}
        className="text-ink"
        style={{
          fontSize: "0.7rem",
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
        className="bg-transparent text-ink"
        style={{
          padding: "12px 14px",
          fontSize: "0.95rem",
          border: "1px solid rgba(43,36,28,0.18)",
          borderRadius: "2px",
          outline: "none",
          appearance: "none",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' fill='none' stroke='%237A7670' stroke-width='1.5'%3E%3Cpath d='M3 4.5l3 3 3-3'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 14px center",
          backgroundSize: "12px",
          paddingRight: "40px",
          fontFamily: "inherit",
          transition: "border-color 0.3s linear",
        }}
        onFocus={(e) =>
          (e.currentTarget.style.borderColor = "var(--color-accent, #96704C)")
        }
        onBlur={(e) =>
          (e.currentTarget.style.borderColor = "rgba(43,36,28,0.18)")
        }
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt === "" ? "Select…" : opt}
          </option>
        ))}
      </select>
      {error && (
        <p
          style={{ fontSize: "0.75rem", color: "#B5443A", lineHeight: 1.5 }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

interface SuccessPanelProps {
  name: string;
  role?: string;
  onClose: () => void;
}

function SuccessPanel({ name, role, onClose }: SuccessPanelProps) {
  const firstName = name.trim().split(/\s+/)[0] || "there";
  return (
    <div
      style={{
        padding: "clamp(40px, 5vw, 64px) clamp(24px, 3.5vw, 40px)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "999px",
          background: "rgba(150,112,76,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-accent, #96704C)",
        }}
      >
        <Check size={20} strokeWidth={1.8} />
      </div>
      <h3
        className="font-serif font-light text-ink"
        style={{
          fontSize: "clamp(1.4rem, 2.4vw, 1.85rem)",
          lineHeight: 1.2,
        }}
      >
        Thanks, {firstName}.
      </h3>
      <p
        className="font-light text-ink-light"
        style={{ fontSize: "1rem", lineHeight: 1.7 }}
      >
        We&apos;ve received your application
        {role ? (
          <>
            {" "}
            for <span className="text-ink">{role}</span>
          </>
        ) : null}
        . Someone from our team will be in touch within five business days.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="text-ink hover:text-accent"
        style={{
          marginTop: "12px",
          padding: "12px 20px",
          fontSize: "0.7rem",
          fontWeight: 500,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          background: "transparent",
          border: "1px solid var(--color-ink, #3D3A36)",
          borderRadius: "2px",
          cursor: "pointer",
          transition: "color 0.3s linear, border-color 0.3s linear",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--color-accent, #96704C)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--color-ink, #3D3A36)";
        }}
      >
        Done
      </button>
    </div>
  );
}
