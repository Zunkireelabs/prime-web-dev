"use client";

import { ArrowRight } from "lucide-react";

/**
 * Premium Design System — Reusable React wrappers
 *
 * CSS classes live in globals.css under "LUXURY DESIGN SYSTEM".
 * These components compose those classes with sensible defaults
 * so sections stay consistent across pages.
 *
 * Usage:
 *   import { Section, HeadingGroup, LuxuryCard, GoldDivider, ... } from "@/components/ui/Premium";
 */

/* ── Section Container ── */

interface SectionProps {
  surface?: "light" | "alt" | "dark";
  pad?: "sm" | "default" | "lg" | "none";
  className?: string;
  id?: string;
  children: React.ReactNode;
}

export function Section({ surface = "light", pad = "default", className = "", id, children }: SectionProps) {
  const surfaceCls = surface === "dark" ? "surface-dark" : surface === "alt" ? "surface-alt" : "surface-light";
  const padCls = pad === "sm" ? "section-pad-sm" : pad === "lg" ? "section-pad-lg" : pad === "none" ? "" : "section-pad";
  return (
    <section id={id} className={`${surfaceCls} ${padCls} relative overflow-hidden ${className}`}>
      <div className="container relative z-10">{children}</div>
    </section>
  );
}

/* ── Section Inner (narrow content width) ── */

interface SectionInnerProps {
  width?: "narrow" | "mid" | "full";
  className?: string;
  children: React.ReactNode;
}

export function SectionInner({ width = "full", className = "", children }: SectionInnerProps) {
  const widthCls = width === "narrow" ? "section-narrow" : width === "mid" ? "section-mid" : "";
  return <div className={`${widthCls} ${className}`}>{children}</div>;
}

/* ── Premium Heading Group ── */

interface HeadingGroupProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  dark?: boolean;
  className?: string;
}

export function HeadingGroup({ eyebrow, title, subtitle, align = "center", dark = false, className = "" }: HeadingGroupProps) {
  const wrapperCls = align === "center" ? "heading-group" : "heading-group-left";
  const inkCls = dark ? "text-ink-on-dark" : "text-ink";
  const eyebrowCls = dark ? "text-accent-light" : "text-accent";
  const subCls = dark ? "text-ink-on-dark-light" : "text-ink-light";

  return (
    <div className={`${wrapperCls} ${className}`}>
      <p className={`eyebrow ${eyebrowCls}`}>{eyebrow}</p>
      <h2 className={`h2 ${inkCls}`}>{title}</h2>
      {subtitle && <p className={`body-lg ${subCls}`}>{subtitle}</p>}
    </div>
  );
}

/* ── Luxury Card ── */

interface LuxuryCardProps {
  variant?: "light" | "dark";
  className?: string;
  children: React.ReactNode;
}

export function LuxuryCard({ variant = "light", className = "", children }: LuxuryCardProps) {
  const cls = variant === "dark" ? "luxury-card-dark" : "luxury-card";
  return <div className={`${cls} ${className}`}>{children}</div>;
}

/* ── Gold Accent Divider ── */

interface GoldDividerProps {
  variant?: "left" | "center" | "full";
  className?: string;
}

export function GoldDivider({ variant = "left", className = "" }: GoldDividerProps) {
  const cls = variant === "center" ? "gold-divider-center" : variant === "full" ? "gold-divider-full" : "gold-divider";
  return <div className={`${cls} ${className}`} />;
}

/* ── Premium Button — Gold Filled ── */

interface ButtonGoldProps {
  href: string;
  children: React.ReactNode;
  arrow?: boolean;
  className?: string;
}

export function ButtonGold({ href, children, arrow = true, className = "" }: ButtonGoldProps) {
  return (
    <a href={href} className={`btn-gold group ${className}`}>
      {children}
      {arrow && <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />}
    </a>
  );
}

/* ── Premium Button — Gold Outline ── */

interface ButtonGoldOutlineProps {
  href: string;
  children: React.ReactNode;
  arrow?: boolean;
  className?: string;
}

export function ButtonGoldOutline({ href, children, arrow = true, className = "" }: ButtonGoldOutlineProps) {
  return (
    <a href={href} className={`btn-gold-outline group ${className}`}>
      {children}
      {arrow && <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />}
    </a>
  );
}

/* ── Stats Strip Item ── */

interface StatItemProps {
  value: React.ReactNode;
  label: string;
  sub?: string;
  className?: string;
}

export function StatItem({ value, label, sub, className = "" }: StatItemProps) {
  return (
    <div className={`stat-item ${className}`}>
      <p className="stat-number">{value}</p>
      <div className="w-5 h-px bg-accent/30 mx-auto mb-3" />
      <p className="stat-label">{label}</p>
      {sub && <p className="stat-sub">{sub}</p>}
    </div>
  );
}

/* ── Editorial Quote Block ── */

interface QuoteBlockProps {
  quote: string;
  author: string;
  role: string;
  project?: string;
  className?: string;
}

export function QuoteBlock({ quote, author, role, project, className = "" }: QuoteBlockProps) {
  return (
    <div className={`quote-block ${className}`}>
      <blockquote>&ldquo;{quote}&rdquo;</blockquote>
      <div className="gold-divider-center mb-6" />
      <cite>
        <p className="quote-author">{author}</p>
        <p className="quote-role">{role}</p>
        {project && <p className="quote-project">{project}</p>}
      </cite>
    </div>
  );
}

/* ── Icon Circle ── */

interface IconCircleProps {
  size?: "default" | "lg";
  className?: string;
  children: React.ReactNode;
}

export function IconCircle({ size = "default", className = "", children }: IconCircleProps) {
  const cls = size === "lg" ? "icon-circle-lg" : "icon-circle";
  return <div className={`${cls} ${className}`}>{children}</div>;
}
