"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { featuredNews } from "@/data/news";

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NewsHighlight() {
  if (!featuredNews) return null;

  return (
    <section
      className="bg-surface-alt"
      style={{
        paddingTop: "clamp(80px, 10vw, 120px)",
        paddingBottom: "clamp(80px, 10vw, 120px)",
      }}
    >
      <div className="container">
        <div
          className="grid grid-cols-1 lg:grid-cols-12"
          style={{ columnGap: "clamp(24px, 4vw, 56px)", rowGap: "32px" }}
        >
          {/* Left — eyebrow + heading + see all */}
          <div className="lg:col-span-4">
            <p className="eyebrow text-accent" style={{ marginBottom: "20px" }}>
              In the Press
            </p>
            <h2
              className="font-serif font-light text-ink"
              style={{
                fontSize: "clamp(1.8rem, 3.2vw, 2.4rem)",
                lineHeight: 1.15,
                marginBottom: "24px",
              }}
            >
              What people are saying about Prime.
            </h2>
            <p
              className="font-light text-ink-light"
              style={{
                fontSize: "1rem",
                lineHeight: 1.7,
                marginBottom: "28px",
              }}
            >
              Coverage from Nepali and international press — from launch to
              becoming Nepal&apos;s only NS-certified tile manufacturer.
            </p>
            <a
              href="/news"
              className="inline-flex items-center text-[0.7rem] font-medium tracking-[0.2em] uppercase text-ink hover:text-accent"
              style={{ gap: "10px", transition: "color 0.3s linear" }}
            >
              See all coverage
              <ArrowRight
                size={14}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          {/* Right — featured article card */}
          <div className="lg:col-span-8">
            <a
              href={featuredNews.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-surface-card h-full grid grid-cols-1 sm:grid-cols-2 overflow-hidden"
              style={{
                border: "1px solid rgba(43,36,28,0.10)",
                borderRadius: "4px",
                transition: "border-color 0.3s linear, box-shadow 0.3s linear",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-accent)";
                e.currentTarget.style.boxShadow =
                  "0 12px 40px rgba(0,0,0,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(43,36,28,0.10)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                className="relative overflow-hidden"
                style={{ minHeight: "260px", background: "var(--color-surface-alt)" }}
              >
                <img
                  src={featuredNews.image}
                  alt={featuredNews.title}
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-[1.04] ${
                    featuredNews.imageFit === "contain" ? "object-contain" : "object-cover"
                  }`}
                />
              </div>

              <div
                style={{
                  padding: "clamp(24px, 3vw, 40px)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
              <div
                className="flex items-center"
                style={{ gap: "16px", marginBottom: "20px" }}
              >
                <span className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-accent">
                  {featuredNews.source}
                </span>
                <span
                  style={{
                    width: "24px",
                    height: "1px",
                    background: "rgba(43,36,28,0.20)",
                  }}
                />
                <span className="text-[0.6rem] font-medium tracking-[0.14em] uppercase text-ink-muted tabular-nums">
                  {formatDate(featuredNews.date)}
                </span>
              </div>

              <h3
                className="font-serif font-light text-ink group-hover:text-accent"
                style={{
                  fontSize: "clamp(1.35rem, 2.4vw, 1.85rem)",
                  lineHeight: 1.2,
                  marginBottom: "20px",
                  transition: "color 0.3s linear",
                }}
              >
                {featuredNews.title}
              </h3>

              <p
                className="font-light text-ink-light"
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  marginBottom: "28px",
                }}
              >
                {featuredNews.summary}
              </p>

              <span
                className="inline-flex items-center text-[0.65rem] font-medium tracking-[0.2em] uppercase text-ink group-hover:text-accent"
                style={{ gap: "10px", transition: "color 0.3s linear" }}
              >
                Read full article
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
