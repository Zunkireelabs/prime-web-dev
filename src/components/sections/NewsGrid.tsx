"use client";

import { otherNews } from "@/data/news";
import NewsCard from "@/components/ui/NewsCard";

export default function NewsGrid() {
  if (otherNews.length === 0) return null;

  return (
    <section
      className="bg-surface"
      style={{
        paddingTop: "clamp(80px, 10vw, 120px)",
        paddingBottom: "clamp(120px, 14vw, 160px)",
      }}
    >
      <div className="container">
        <p className="eyebrow text-accent" style={{ marginBottom: "20px" }}>
          More Coverage
        </p>
        <h2
          className="font-serif font-light text-ink"
          style={{
            fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)",
            lineHeight: 1.15,
            marginBottom: "clamp(40px, 5vw, 64px)",
            maxWidth: "640px",
          }}
        >
          Everything that&apos;s been written about us.
        </h2>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{
            columnGap: "clamp(20px, 2.5vw, 32px)",
            rowGap: "clamp(20px, 2.5vw, 32px)",
          }}
        >
          {otherNews.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
