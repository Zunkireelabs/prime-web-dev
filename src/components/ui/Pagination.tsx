"use client";

import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

function getPageNumbers(page: number, totalPages: number): (number | "...")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (page <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }
  if (page >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }
  return [1, "...", page - 1, page, page + 1, "...", totalPages];
}

const baseBtn: React.CSSProperties = {
  minWidth: "36px",
  height: "36px",
  padding: "0 12px",
  border: "1px solid rgba(43,36,28,0.1)",
  borderRadius: "20px",
  background: "var(--color-surface-card)",
  transition: "color 0.3s, border-color 0.3s, background 0.3s",
};

const activeBtn: React.CSSProperties = {
  ...baseBtn,
  background: "var(--color-ink, #3D3A36)",
  color: "var(--color-surface, #FAFAF8)",
  borderColor: "var(--color-ink, #3D3A36)",
};

const disabledBtn: React.CSSProperties = {
  ...baseBtn,
  opacity: 0.4,
  cursor: "not-allowed",
};

const ellipsisBtn: React.CSSProperties = {
  ...baseBtn,
  border: "none",
  background: "transparent",
};

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) {
  const pages = useMemo(
    () => getPageNumbers(page, totalPages),
    [page, totalPages],
  );

  if (totalPages <= 1) return null;

  const goPrev = () => onPageChange(Math.max(1, page - 1));
  const goNext = () => onPageChange(Math.min(totalPages, page + 1));
  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  const labelClasses =
    "inline-flex items-center justify-center text-[0.65rem] font-medium tracking-[0.12em] uppercase tabular-nums";

  return (
    <nav
      className={`flex flex-wrap items-center justify-center ${className}`}
      style={{ gap: "8px" }}
      aria-label="Product pagination"
    >
      <button
        type="button"
        onClick={goPrev}
        disabled={isFirst}
        aria-label="Previous page"
        className={`${labelClasses} ${isFirst ? "text-ink-muted" : "text-ink-light hover:text-accent"}`}
        style={isFirst ? disabledBtn : baseBtn}
      >
        <ChevronLeft size={14} style={{ marginRight: "4px" }} />
        Prev
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className={`${labelClasses} text-ink-muted`}
            style={ellipsisBtn}
            aria-hidden="true"
          >
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            aria-label={`Page ${p}`}
            aria-current={p === page ? "page" : undefined}
            className={`${labelClasses} ${p === page ? "" : "text-ink-light hover:text-accent"}`}
            style={p === page ? activeBtn : baseBtn}
          >
            {p}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={goNext}
        disabled={isLast}
        aria-label="Next page"
        className={`${labelClasses} ${isLast ? "text-ink-muted" : "text-ink-light hover:text-accent"}`}
        style={isLast ? disabledBtn : baseBtn}
      >
        Next
        <ChevronRight size={14} style={{ marginLeft: "4px" }} />
      </button>
    </nav>
  );
}
