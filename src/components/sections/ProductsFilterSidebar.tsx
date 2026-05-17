"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  isOpen,
  onToggleOpen,
}: {
  group: Group;
  values: string[];
  selected: string[];
  onToggle: (key: FilterKey, value: string) => void;
  onClear: (key: FilterKey) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}) {
  const [query, setQuery] = useState("");

  const filteredValues = useMemo(
    () =>
      group.key === "series" && query.trim()
        ? values.filter((v) => v.toLowerCase().includes(query.toLowerCase()))
        : values,
    [group.key, query, values]
  );

  return (
    <div style={{ borderBottom: "1px solid rgba(43,36,28,0.08)" }}>
      <button
        type="button"
        onClick={onToggleOpen}
        className="w-full flex items-center justify-between text-left cursor-pointer"
        style={{ padding: "20px 0" }}
        aria-expanded={isOpen}
      >
        <span
          className="text-[0.7rem] font-medium tracking-[0.14em] uppercase text-ink flex items-center hover:text-accent"
          style={{ gap: "8px", transition: "color 0.3s" }}
        >
          {group.label}
          {selected.length > 0 && (
            <span
              className="bg-accent text-white text-[0.55rem] font-medium tracking-[0.1em] px-1.5 py-[1px] tabular-nums"
              style={{ borderRadius: "2px" }}
            >
              {selected.length}
            </span>
          )}
        </span>
        <ChevronDown
          size={14}
          className="text-ink-muted"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </button>

      <div
        className="grid"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 0.3s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div className="overflow-hidden">
          <div style={{ paddingBottom: "20px" }}>
            {group.key === "series" && values.length > 8 && (
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search series..."
                className="w-full text-xs bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus-visible:outline-1 focus-visible:outline-accent focus-visible:outline-offset-2"
                style={{
                  padding: "8px 12px",
                  border: "1px solid rgba(43,36,28,0.12)",
                  borderRadius: "6px",
                  marginBottom: "12px",
                  transition: "border-color 0.3s",
                }}
              />
            )}

            <ul className="max-h-[240px] overflow-y-auto" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {filteredValues.map((v) => {
                const isOn = selected.includes(v);
                const isRadio = group.key === "size";
                return (
                  <li key={v}>
                    <label className="flex items-center cursor-pointer group/row" style={{ gap: "10px" }}>
                      <span
                        className="relative flex items-center justify-center shrink-0"
                        style={{
                          width: "16px",
                          height: "16px",
                          borderRadius: isRadio ? "50%" : "3px",
                          border: `1px solid ${isOn ? "var(--color-accent)" : "rgba(43,36,28,0.25)"}`,
                          background: isOn && !isRadio ? "var(--color-accent)" : "transparent",
                          transition: "background 0.3s, border-color 0.3s",
                        }}
                      >
                        {isOn && isRadio && (
                          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--color-accent)" }} />
                        )}
                        {isOn && !isRadio && <Check size={10} strokeWidth={3} className="text-white" />}
                      </span>
                      <input
                        type={isRadio ? "radio" : "checkbox"}
                        checked={isOn}
                        onChange={() => onToggle(group.key, v)}
                        className="sr-only"
                        name={isRadio ? "size-filter" : undefined}
                      />
                      <span
                        className={`text-[0.8rem] ${isOn ? "text-ink" : "text-ink-light group-hover/row:text-ink"}`}
                        style={{ transition: "color 0.3s" }}
                      >
                        {group.displayTransform ? group.displayTransform(v) : v}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>

            {selected.length > 0 && !(group.key === "size" && selected.length === 1 && selected[0] === "600\u00d71200 mm") && (
              <button
                type="button"
                onClick={() => onClear(group.key)}
                className="text-[0.6rem] font-medium tracking-[0.12em] uppercase text-ink-muted hover:text-accent"
                style={{ marginTop: "16px", transition: "color 0.3s" }}
              >
                Clear {group.label}
              </button>
            )}
          </div>
        </div>
      </div>
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
  const [openKey, setOpenKey] = useState<FilterKey | null>("category");

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
            className="text-[0.6rem] font-medium tracking-[0.12em] uppercase text-ink-muted hover:text-accent"
            style={{ transition: "color 0.3s" }}
          >
            Clear All ({activeCount})
          </button>
        )}
      </div>

      {GROUPS.map((g) => (
        <FilterGroup
          key={g.key}
          group={g}
          values={options[g.key]}
          selected={filters[g.key]}
          onToggle={onToggle}
          onClear={onClearGroup}
          isOpen={openKey === g.key}
          onToggleOpen={() => setOpenKey(openKey === g.key ? null : g.key)}
        />
      ))}

      <div className="gold-divider-full" style={{ marginTop: "20px" }} />
      <div
        className="text-[0.6rem] font-medium tracking-[0.14em] uppercase text-ink-muted tabular-nums"
        style={{ paddingTop: "24px" }}
      >
        {totalResults} Tiles Found
      </div>
    </div>
  );
}

export default function ProductsFilterSidebar(props: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);
  const sheetTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (mobileOpen) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setSheetVisible(true));
      });
    } else {
      setSheetVisible(false);
    }
    return () => clearTimeout(sheetTimerRef.current);
  }, [mobileOpen]);

  const handleCloseSheet = () => {
    setSheetVisible(false);
    sheetTimerRef.current = setTimeout(() => setMobileOpen(false), 300);
  };

  return (
    <>
      {/* Desktop sticky sidebar */}
      <aside className="hidden lg:block shrink-0" style={{ width: "280px" }}>
        <div className="sticky" style={{ top: "clamp(88px, 10vw, 112px)" }}>
          <FilterBody {...props} />
        </div>
      </aside>

      {/* Mobile trigger button */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex items-center justify-center w-full text-xs font-medium tracking-[0.12em] uppercase text-ink border border-ink/15 hover:border-ink/40"
          style={{ padding: "14px 16px", gap: "10px", marginBottom: "24px", borderRadius: "8px", transition: "border-color 0.3s" }}
        >
          <SlidersHorizontal size={14} />
          Filters
          {props.activeCount > 0 && (
            <span className="bg-accent text-white text-[0.55rem] font-medium tracking-[0.1em] px-1.5 py-[1px] tabular-nums" style={{ borderRadius: "2px" }}>
              {props.activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile sheet */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-label="Filters">
          <button
            type="button"
            aria-label="Close filters"
            onClick={handleCloseSheet}
            className="absolute inset-0"
            style={{
              background: "rgba(15,12,9,0.4)",
              opacity: sheetVisible ? 1 : 0,
              transition: "opacity 0.3s linear",
            }}
          />
          <div
            className="relative ml-auto h-full w-[85vw] max-w-sm bg-surface overflow-y-auto"
            style={{
              padding: "24px",
              transform: sheetVisible ? "translateX(0)" : "translateX(100%)",
              transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <div className="flex items-center justify-between" style={{ marginBottom: "12px" }}>
              <h2 className="text-[0.75rem] font-medium tracking-[0.14em] uppercase text-ink">
                Filters
              </h2>
              <button
                type="button"
                onClick={handleCloseSheet}
                className="text-ink-muted hover:text-ink"
                style={{ transition: "color 0.3s" }}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <FilterBody {...props} />
            <button
              type="button"
              onClick={handleCloseSheet}
              className="w-full bg-ink text-white text-xs font-medium tracking-[0.12em] uppercase hover:bg-accent"
              style={{ padding: "14px 16px", marginTop: "24px", borderRadius: "8px", transition: "background 0.3s" }}
            >
              View {props.totalResults} Tiles
            </button>
          </div>
        </div>
      )}
    </>
  );
}
