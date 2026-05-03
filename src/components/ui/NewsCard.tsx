"use client";

import { ArrowUpRight } from "lucide-react";
import type { NewsItem } from "@/data/news";

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface Props {
  item: NewsItem;
}

export default function NewsCard({ item }: Props) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full bg-surface-card hover:border-accent overflow-hidden"
      style={{
        border: "1px solid rgba(43,36,28,0.10)",
        borderRadius: "4px",
        transition: "border-color 0.3s linear, transform 0.3s linear, box-shadow 0.3s linear",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "16 / 9", background: "var(--color-surface-alt)" }}
      >
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className={`absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-[1.04] ${
            item.imageFit === "contain" ? "object-contain" : "object-cover"
          }`}
        />
      </div>

      <div style={{ padding: "clamp(20px, 2.5vw, 28px)" }}>
        <div
          className="flex items-center justify-between"
          style={{ marginBottom: "16px" }}
        >
        <span className="text-[0.6rem] font-medium tracking-[0.18em] uppercase text-accent">
          {item.source}
        </span>
        <span className="text-[0.6rem] font-medium tracking-[0.12em] uppercase text-ink-muted tabular-nums">
          {formatDate(item.date)}
        </span>
      </div>

      <h3
        className="font-serif font-light text-ink group-hover:text-accent"
        style={{
          fontSize: "clamp(1.15rem, 1.6vw, 1.35rem)",
          lineHeight: 1.3,
          marginBottom: "16px",
          transition: "color 0.3s linear",
        }}
      >
        {item.title}
      </h3>

      <p
        className="text-sm text-ink-light"
        style={{ lineHeight: 1.7, marginBottom: "24px" }}
      >
        {item.summary}
      </p>

      <span
        className="inline-flex items-center text-[0.65rem] font-medium tracking-[0.18em] uppercase text-ink group-hover:text-accent"
        style={{ gap: "8px", transition: "color 0.3s linear" }}
      >
        Read article
        <ArrowUpRight
          size={13}
          strokeWidth={1.8}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
      </div>
    </a>
  );
}
