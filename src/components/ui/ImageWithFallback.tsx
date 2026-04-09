"use client";

import { useState, useCallback } from "react";

interface ImageWithFallbackProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackType?: "tile" | "space" | "location" | "generic";
}

/**
 * Drop-in <img> replacement with graceful fallback.
 * On error, renders a styled placeholder matching the design system.
 */
export default function ImageWithFallback({
  fallbackType = "generic",
  alt = "",
  className = "",
  style,
  ...props
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  const onError = useCallback(() => setFailed(true), []);

  if (failed) {
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(155deg, var(--color-surface-alt), var(--color-surface))",
          color: "var(--color-ink-muted)",
          fontSize: "0.65rem",
          fontWeight: 500,
          letterSpacing: "0.15em",
          textTransform: "uppercase" as const,
          textAlign: "center" as const,
          padding: "1rem",
        }}
        role="img"
        aria-label={alt}
      >
        {alt || fallbackLabels[fallbackType]}
      </div>
    );
  }

  return (
    <img
      alt={alt}
      className={className}
      style={style}
      onError={onError}
      {...props}
    />
  );
}

const fallbackLabels: Record<string, string> = {
  tile: "Tile Preview",
  space: "Space",
  location: "Location",
  generic: "Image",
};
