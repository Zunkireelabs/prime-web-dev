"use client";

import { ArrowUpRight } from "lucide-react";
import { featuredNews } from "@/data/news";

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NewsFeatured() {
  if (!featuredNews) return null;

  return (
    <section
      className="bg-surface-alt"
      style={{
        paddingTop: "clamp(64px, 8vw, 96px)",
        paddingBottom: "clamp(64px, 8vw, 96px)",
      }}
    >
      <div className="container">
        <p className="eyebrow text-accent" style={{ marginBottom: "20px" }}>
          Featured Coverage
        </p>

        <a
          href={featuredNews.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group grid grid-cols-1 lg:grid-cols-2 bg-surface-card overflow-hidden"
          style={{
            border: "1px solid rgba(43,36,28,0.10)",
            borderRadius: "4px",
            transition: "border-color 0.3s linear, box-shadow 0.3s linear",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--color-accent)";
            e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.06)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(43,36,28,0.10)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <div
            className="relative overflow-hidden"
            style={{ minHeight: "320px", aspectRatio: "16 / 10", background: "var(--color-surface-alt)" }}
          >
            <img
              src={featuredNews.image}
              alt={featuredNews.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>

          <div
            style={{
              padding: "clamp(28px, 4vw, 56px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
          <div
            className="flex items-center"
            style={{ gap: "20px", marginBottom: "24px" }}
          >
            <span className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-accent">
              {featuredNews.source}
            </span>
            <span
              className="block"
              style={{
                width: "32px",
                height: "1px",
                background: "rgba(43,36,28,0.20)",
              }}
            />
            <span className="text-[0.65rem] font-medium tracking-[0.14em] uppercase text-ink-muted tabular-nums">
              {formatDate(featuredNews.date)}
            </span>
          </div>

          <h2
            className="font-serif font-light text-ink group-hover:text-accent"
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              lineHeight: 1.2,
              marginBottom: "20px",
              maxWidth: "880px",
              transition: "color 0.3s linear",
            }}
          >
            {featuredNews.title}
          </h2>

          <p
            className="font-light text-ink-light"
            style={{
              fontSize: "clamp(1rem, 1.3vw, 1.1rem)",
              lineHeight: 1.7,
              marginBottom: "32px",
              maxWidth: "760px",
            }}
          >
            {featuredNews.summary}
          </p>

          <span
            className="inline-flex items-center text-[0.7rem] font-medium tracking-[0.2em] uppercase text-ink group-hover:text-accent"
            style={{ gap: "10px", transition: "color 0.3s linear" }}
          >
            Read full article
            <ArrowUpRight
              size={15}
              strokeWidth={1.8}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
          </div>
        </a>
      </div>
    </section>
  );
}
