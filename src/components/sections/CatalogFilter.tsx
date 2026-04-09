"use client";

import { Search, X, ChevronDown } from "lucide-react";
import { useState } from "react";

const sizeTabs = [
  { label: "All Tiles", value: "all" },
  { label: "300×450", value: "300×450 mm" },
  { label: "300×600", value: "300×600 mm" },
  { label: "400×400", value: "400×400 mm" },
  { label: "600×600", value: "600×600 mm" },
  { label: "600×1200", value: "600×1200 mm" },
  { label: "Spirit of Nepal", value: "spirit" },
];

const finishOptions = [
  { label: "All Finishes", value: "all" },
  { label: "Glossy", value: "Glossy" },
  { label: "Matt", value: "Matt" },
  { label: "High Gloss", value: "High Gloss" },
  { label: "Carving", value: "Carving" },
  { label: "Satin", value: "Satin" },
];

interface Props {
  activeSize: string;
  activeFinish: string;
  searchQuery: string;
  totalShowing: number;
  totalFiltered: number;
  seriesList: string[];
  activeSeries: string;
  onSizeChange: (s: string) => void;
  onFinishChange: (f: string) => void;
  onSeriesChange: (s: string) => void;
  onSearchChange: (q: string) => void;
}

export default function CatalogFilter(props: Props) {
  const {
    activeSize, activeFinish, searchQuery, totalShowing, totalFiltered,
    seriesList, activeSeries,
    onSizeChange, onFinishChange, onSeriesChange, onSearchChange,
  } = props;

  const [mobileOpen, setMobileOpen] = useState(false);
  const hasFilters = activeSize !== "all" || activeFinish !== "all" || activeSeries !== "all" || searchQuery !== "";

  return (
    <div className="sticky z-30 bg-surface-alt/98 backdrop-blur-lg border-b border-ink/6" style={{ top: "clamp(64px, 8vw, 88px)" }}>
      <div className="container">
        {/* ── Desktop ── */}
        <div className="hidden md:block" style={{ padding: "20px 0", marginRight: "64px" }}>
          {/* Row 1 — Size tabs as pill chips with clear gaps */}
          <div className="flex items-center" style={{ gap: "16px", marginBottom: "24px" }}>
            {sizeTabs.map((tab) => {
              const active = activeSize === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => onSizeChange(tab.value)}
                  className={`px-5 py-2.5 text-xs font-medium tracking-[0.08em] uppercase whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    active
                      ? "bg-ink text-white"
                      : "border border-ink/15 text-ink-light hover:border-ink/40 hover:text-ink"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Row 2 — Filters + Search, separated by border top */}
          <div className="flex items-center justify-between border-t border-ink/8" style={{ paddingTop: "16px" }}>
            {/* Left — dropdowns */}
            <div className="flex items-center" style={{ gap: "24px" }}>
              <div className="relative">
                <select
                  value={activeFinish}
                  onChange={(e) => onFinishChange(e.target.value)}
                  className="appearance-none pr-7 py-1 text-xs font-medium tracking-[0.06em] uppercase bg-transparent text-ink-light hover:text-ink focus:outline-none focus-visible:outline-1 focus-visible:outline-accent focus-visible:outline-offset-2 cursor-pointer transition-colors"
                >
                  {finishOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
              </div>

              {seriesList.length > 1 && (
                <>
                  <div className="w-px h-5 bg-ink/12" />
                  <div className="relative">
                    <select
                      value={activeSeries}
                      onChange={(e) => onSeriesChange(e.target.value)}
                      className="appearance-none pr-7 py-1 text-xs font-medium tracking-[0.06em] uppercase bg-transparent text-ink-light hover:text-ink focus:outline-none focus-visible:outline-1 focus-visible:outline-accent focus-visible:outline-offset-2 cursor-pointer transition-colors"
                    >
                      <option value="all">All Series</option>
                      {seriesList.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
                  </div>
                </>
              )}
            </div>

            {/* Right — search + count */}
            <div className="flex items-center" style={{ gap: "24px" }}>
              <div className="relative" style={{ width: "clamp(208px, 18vw, 256px)" }}>
                <Search size={14} className="absolute top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" style={{ left: "14px" }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search tiles..."
                  className="w-full pr-8 py-2 text-sm bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus-visible:outline-1 focus-visible:outline-accent focus-visible:outline-offset-2 transition-colors"
                  style={{ paddingLeft: "40px", border: "1px solid rgba(61,58,54,0.12)" }}
                />
                {searchQuery && (
                  <button onClick={() => onSearchChange("")} aria-label="Clear search" className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 text-ink-muted hover:text-ink">
                    <X size={14} />
                  </button>
                )}
              </div>

              <span className="text-xs font-medium text-ink-muted tabular-nums whitespace-nowrap">
                {totalShowing} / {totalFiltered}
              </span>
            </div>
          </div>
        </div>

        {/* ── Mobile ── */}
        <div className="md:hidden border-b border-ink/6">
          <div className="flex items-center gap-2 py-3 overflow-x-auto no-scrollbar">
            {sizeTabs.map((tab) => {
              const active = activeSize === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => onSizeChange(tab.value)}
                  className={`px-4 py-2.5 text-[0.65rem] font-medium tracking-[0.1em] uppercase whitespace-nowrap shrink-0 transition-all duration-300 ${
                    active ? "bg-ink text-surface" : "text-ink-muted border border-ink-faint"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative ml-auto px-4 py-2.5 text-[0.65rem] font-medium tracking-[0.1em] uppercase text-ink-light border border-ink-faint shrink-0"
            >
              Filters
              {hasFilters && <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-accent rounded-full" />}
            </button>
          </div>

          {mobileOpen && (
            <div className="pb-4 pt-3 space-y-3 border-t border-ink-faint">
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
                <input type="text" value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} placeholder="Search tiles..."
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-surface border border-ink-faint text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none focus-visible:outline-1 focus-visible:outline-accent focus-visible:outline-offset-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <select value={activeFinish} onChange={(e) => onFinishChange(e.target.value)} className="px-3 py-2.5 text-[0.6rem] font-medium uppercase bg-surface border border-ink-faint text-ink-light focus:outline-none focus-visible:outline-1 focus-visible:outline-accent focus-visible:outline-offset-2">
                  {finishOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <select value={activeSeries} onChange={(e) => onSeriesChange(e.target.value)} className="px-3 py-2.5 text-[0.6rem] font-medium uppercase bg-surface border border-ink-faint text-ink-light focus:outline-none focus-visible:outline-1 focus-visible:outline-accent focus-visible:outline-offset-2">
                  <option value="all">All Series</option>
                  {seriesList.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
