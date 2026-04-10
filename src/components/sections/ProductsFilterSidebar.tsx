"use client";

import { useState } from "react";
import { ChevronDown, Check, SlidersHorizontal, X } from "lucide-react";
import type { FilterKey, ProductFilters } from "./ProductsBrowser";

interface Options {
  category: string[];
  collection: string[];
  size: string[];
  finish: string[];
  application: string[];
  series: string[];
}

interface Props {
  filters: ProductFilters;
  options: Options;
  activeCount: number;
  totalResults: number;
  onToggle: (key: FilterKey, value: string) => void;
  onClearGroup: (key: FilterKey) => void;
  onClearAll: () => void;
}

interface Group {
  key: FilterKey;
  label: string;
  displayTransform?: (v: string) => string;
}

const GROUPS: Group[] = [
  { key: "category", label: "Category" },
  { key: "collection", label: "Collection" },
  { key: "size", label: "Size", displayTransform: (v) => v.replace(" mm", "") },
  { key: "finish", label: "Finish" },
  { key: "application", label: "Application" },
  { key: "series", label: "Series" },
];

function FilterGroup({
  group,
  values,
  selected,
  onToggle,
  onClear,
  defaultOpen,
}: {
  group: Group;
  values: string[];
  selected: string[];
  onToggle: (key: FilterKey, value: string) => void;
  onClear: (key: FilterKey) => void;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [query, setQuery] = useState("");

  const filteredValues =
    group.key === "series" && query.trim()
      ? values.filter((v) => v.toLowerCase().includes(query.toLowerCase()))
      : values;

  return (
    <div style={{ borderBottom: "1px solid rgba(43,36,28,0.08)" }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left cursor-pointer group"
        style={{ padding: "18px 0" }}
        aria-expanded={open}
      >
        <span className="text-[0.7rem] font-medium tracking-[0.14em] uppercase text-ink flex items-center" style={{ gap: "8px" }}>
          {group.label}
          {selected.length > 0 && (
            <span className="bg-accent text-white text-[0.55rem] font-medium tracking-[0.1em] px-1.5 py-[1px] tabular-nums">
              {selected.length}
            </span>
          )}
        </span>
        <ChevronDown
          size={14}
          className="text-ink-muted transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {open && (
        <div style={{ paddingBottom: "20px" }}>
          {group.key === "series" && values.length > 8 && (
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search series..."
              className="w-full text-xs bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus-visible:outline-1 focus-visible:outline-accent focus-visible:outline-offset-2 transition-colors"
              style={{
                padding: "8px 12px",
                border: "1px solid rgba(43,36,28,0.12)",
                marginBottom: "12px",
              }}
            />
          )}

          <ul className="max-h-[240px] overflow-y-auto" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {filteredValues.map((v) => {
              const isOn = selected.includes(v);
              return (
                <li key={v}>
                  <label className="flex items-center cursor-pointer group/row" style={{ gap: "10px" }}>
                    <span
                      className="relative flex items-center justify-center shrink-0 transition-colors duration-300"
                      style={{
                        width: "14px",
                        height: "14px",
                        border: `1px solid ${isOn ? "var(--color-accent)" : "rgba(43,36,28,0.25)"}`,
                        background: isOn ? "var(--color-accent)" : "transparent",
                      }}
                    >
                      {isOn && <Check size={10} strokeWidth={3} className="text-white" />}
                    </span>
                    <input
                      type="checkbox"
                      checked={isOn}
                      onChange={() => onToggle(group.key, v)}
                      className="sr-only"
                    />
                    <span className={`text-xs transition-colors duration-300 ${isOn ? "text-ink" : "text-ink-light group-hover/row:text-ink"}`}>
                      {group.displayTransform ? group.displayTransform(v) : v}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>

          {selected.length > 0 && (
            <button
              type="button"
              onClick={() => onClear(group.key)}
              className="text-[0.6rem] font-medium tracking-[0.12em] uppercase text-ink-muted hover:text-accent transition-colors duration-300"
              style={{ marginTop: "14px" }}
            >
              Clear {group.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function FilterBody({
  filters,
  options,
  activeCount,
  totalResults,
  onToggle,
  onClearGroup,
  onClearAll,
}: Omit<Props, never>) {
  return (
    <div>
      {/* Header */}
      <div
        className="flex items-center justify-between"
        style={{ paddingBottom: "16px", borderBottom: "1px solid rgba(43,36,28,0.12)", marginBottom: "4px" }}
      >
        <h2 className="text-[0.75rem] font-medium tracking-[0.14em] uppercase text-ink">
          Filters
        </h2>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-[0.6rem] font-medium tracking-[0.12em] uppercase text-ink-muted hover:text-accent transition-colors duration-300"
          >
            Clear All ({activeCount})
          </button>
        )}
      </div>

      {GROUPS.map((g, i) => (
        <FilterGroup
          key={g.key}
          group={g}
          values={options[g.key]}
          selected={filters[g.key]}
          onToggle={onToggle}
          onClear={onClearGroup}
          defaultOpen={i < 3}
        />
      ))}

      <div
        className="text-[0.6rem] font-medium tracking-[0.14em] uppercase text-ink-muted tabular-nums"
        style={{ paddingTop: "20px" }}
      >
        {totalResults} Tiles Found
      </div>
    </div>
  );
}

export default function ProductsFilterSidebar(props: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ── Desktop sticky sidebar ── */}
      <aside className="hidden lg:block shrink-0" style={{ width: "260px" }}>
        <div className="sticky" style={{ top: "clamp(88px, 10vw, 112px)" }}>
          <FilterBody {...props} />
        </div>
      </aside>

      {/* ── Mobile trigger button ── */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex items-center justify-center w-full text-xs font-medium tracking-[0.12em] uppercase text-ink border border-ink/15 hover:border-ink/40 transition-colors duration-300"
          style={{ padding: "14px 16px", gap: "10px", marginBottom: "24px" }}
        >
          <SlidersHorizontal size={14} />
          Filters
          {props.activeCount > 0 && (
            <span className="bg-accent text-white text-[0.55rem] font-medium tracking-[0.1em] px-1.5 py-[1px] tabular-nums">
              {props.activeCount}
            </span>
          )}
        </button>
      </div>

      {/* ── Mobile sheet ── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-label="Filters">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-ink/40"
          />
          <div className="relative ml-auto h-full w-[85vw] max-w-sm bg-surface overflow-y-auto" style={{ padding: "24px" }}>
            <div className="flex items-center justify-between" style={{ marginBottom: "12px" }}>
              <h2 className="text-[0.75rem] font-medium tracking-[0.14em] uppercase text-ink">
                Filters
              </h2>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="text-ink-muted hover:text-ink transition-colors duration-300"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <FilterBody {...props} />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="w-full bg-ink text-white text-xs font-medium tracking-[0.12em] uppercase transition-colors duration-300 hover:bg-accent"
              style={{ padding: "14px 16px", marginTop: "24px" }}
            >
              View {props.totalResults} Tiles
            </button>
          </div>
        </div>
      )}
    </>
  );
}
