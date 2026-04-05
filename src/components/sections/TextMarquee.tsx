"use client";

interface TextMarqueeProps {
  items?: string[];
  speed?: number;
  variant?: "light" | "dark";
  className?: string;
}

export default function TextMarquee({
  items = ["Porcelain", "Ceramic", "Vitrified", "Large Format", "Wall Tiles", "Floor Tiles"],
  speed = 40,
  variant = "dark",
  className = "",
}: TextMarqueeProps) {
  const isDark = variant === "dark";

  // Two identical sets — first set scrolls left by 50%, second fills the gap seamlessly
  const renderSet = () =>
    items.map((t, idx) => (
      <span key={idx} className="inline-flex items-center shrink-0">
        <span
          className="mx-4 md:mx-8 font-serif font-light tracking-[-0.02em] select-none whitespace-nowrap"
          style={{
            fontSize: "clamp(3rem, 8vw, 7rem)",
            WebkitTextStroke: isDark
              ? "1px rgba(234, 231, 226, 0.12)"
              : "1px rgba(61, 58, 54, 0.1)",
            color: "transparent",
          }}
        >
          {t}
        </span>
        <span
          className="text-lg md:text-xl shrink-0"
          style={{ color: isDark ? "rgba(192, 57, 43, 0.2)" : "rgba(192, 57, 43, 0.15)" }}
        >
          &#x2022;
        </span>
      </span>
    ));

  return (
    <div className={`overflow-hidden py-10 md:py-14 ${isDark ? "bg-surface-dark" : "bg-surface"} ${className}`}>
      <div
        className="flex animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        {/* Two identical sets for seamless infinite scroll */}
        <div className="flex shrink-0">{renderSet()}</div>
        <div className="flex shrink-0">{renderSet()}</div>
      </div>
    </div>
  );
}
