"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { MapPin, Phone, User, Search, X } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import SplitHeading from "@/components/animations/SplitHeading";
import { dealers, dealerProvinces } from "@/data/dealers";

const INITIAL_COUNT = 24;
const LOAD_MORE_COUNT = 24;

interface DealersGridProps {
  activeProvince?: string;
  onProvinceChange?: (province: string) => void;
  embedded?: boolean;
}

export default function DealersGrid({
  activeProvince: externalProvince,
  onProvinceChange,
  embedded,
}: DealersGridProps = {}) {
  const [internalProvince, setInternalProvince] = useState("All");
  const activeProvince = externalProvince ?? internalProvince;
  const setActiveProvince = onProvinceChange ?? setInternalProvince;

  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [isFading, setIsFading] = useState(false);
  const prevProvinceRef = useRef(activeProvince);

  // Read province from URL on mount (for homepage links)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get("province");
    if (p && dealerProvinces.includes(p as typeof dealerProvinces[number])) {
      setActiveProvince(p);
    }
  }, [setActiveProvince]);

  // Fade transition on province change
  useEffect(() => {
    if (prevProvinceRef.current !== activeProvince) {
      setIsFading(true);
      setVisibleCount(INITIAL_COUNT);
      const timer = setTimeout(() => setIsFading(false), 150);
      prevProvinceRef.current = activeProvince;
      return () => clearTimeout(timer);
    }
  }, [activeProvince]);

  const filtered = useMemo(() => {
    let result = dealers;
    if (activeProvince !== "All") {
      result = result.filter((d) => d.province === activeProvince);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.city.toLowerCase().includes(q) ||
          d.address.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeProvince, search]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // Group visible dealers alphabetically for letter markers
  const groupedDealers = useMemo(() => {
    if (visible.length < 20) return null;
    const groups: { letter: string; dealers: typeof visible }[] = [];
    let currentLetter = "";
    visible.forEach((dealer) => {
      const letter = dealer.name.charAt(0).toUpperCase();
      if (letter !== currentLetter) {
        currentLetter = letter;
        groups.push({ letter, dealers: [dealer] });
      } else {
        groups[groups.length - 1].dealers.push(dealer);
      }
    });
    return groups;
  }, [visible]);

  const showProvinceInCards = activeProvince === "All";

  const renderDealerCard = (dealer: typeof dealers[0], i: number) => (
    <FadeIn
      key={`${dealer.name}-${dealer.address}`}
      delay={Math.min(i * 0.03, 0.4)}
      direction="up"
      distance={20}
    >
      <div
        className="group relative bg-white transition-all duration-300 h-full hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
        style={{
          padding: embedded ? "20px 24px" : "28px",
          borderLeft: "2px solid transparent",
          borderTop: "1px solid var(--color-ink-faint)",
          borderRight: "1px solid var(--color-ink-faint)",
          borderBottom: "1px solid var(--color-ink-faint)",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderLeftColor = "var(--color-accent)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderLeftColor = "transparent"; }}
      >
        {/* Dealer Name */}
        <h3
          className="text-[0.88rem] font-medium text-ink group-hover:text-accent transition-colors duration-300 leading-snug"
          style={{ marginBottom: "12px" }}
        >
          {dealer.name}
        </h3>

        {/* Details */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <p className="flex items-start gap-3 text-[0.78rem] text-ink-light leading-relaxed">
            <MapPin
              size={13}
              className="mt-0.5 text-accent shrink-0 opacity-60"
            />
            <span>
              {dealer.city}
              {showProvinceInCards && (
                <span className="text-ink-muted">
                  {" "}&middot; {dealer.province}
                </span>
              )}
            </span>
          </p>

          {dealer.phone && (
            <p className="flex items-center gap-3 text-[0.78rem] text-ink-light">
              <Phone
                size={13}
                className="text-accent shrink-0 opacity-60"
              />
              <a
                href={`tel:${dealer.phone}`}
                className="hover:text-accent transition-colors duration-300"
              >
                {dealer.phone}
              </a>
            </p>
          )}

          {dealer.contactPerson && (
            <p className="flex items-center gap-3 text-[0.78rem] text-ink-muted">
              <User
                size={13}
                className="text-accent shrink-0 opacity-40"
              />
              {dealer.contactPerson}
            </p>
          )}
        </div>
      </div>
    </FadeIn>
  );

  const gridCols = embedded
    ? "grid-cols-1 sm:grid-cols-2"
    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  const gridGap = embedded ? "12px" : "24px";

  const gridContent = (
    <>
      {/* ── Section Header (hidden in embedded mode) ── */}
      {!embedded && (
        <div style={{ marginBottom: "56px" }}>
          <FadeIn>
            <p className="eyebrow text-accent" style={{ marginBottom: "16px" }}>
              Find a Dealer
            </p>
          </FadeIn>
          <div style={{ marginBottom: "24px" }}>
            <SplitHeading as="h2" className="h2 text-ink">
              Our Nationwide Network
            </SplitHeading>
          </div>
          <FadeIn delay={0.2}>
            <p className="body-lg text-ink-light max-w-lg">
              Search by name, city, or filter by province to find an
              authorized Prime Ceramics dealer near you.
            </p>
          </FadeIn>
        </div>
      )}

      {/* ── Compact Search ── */}
      {embedded && (
        <div
          className="sticky z-10"
          style={{
            top: "0",
            background: "var(--color-surface)",
            paddingTop: "8px",
            paddingBottom: "8px",
            marginBottom: "24px",
          }}
        >
          <div className="relative">
            <Search
              size={16}
              className="absolute top-1/2 -translate-y-1/2 text-ink-muted"
              style={{ left: "0" }}
            />
            <input
              type="text"
              placeholder="Search dealers..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleCount(INITIAL_COUNT);
              }}
              aria-label="Search dealers by name or city"
              className="w-full py-3 text-[0.85rem] bg-transparent border-b border-ink/10 text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none transition-colors duration-300"
              style={{ paddingLeft: "28px" }}
            />
          </div>
        </div>
      )}
      {!embedded && (
      <FadeIn delay={0.25}>
        <div style={{ marginBottom: "56px" }}>
            {/* Standalone: full toolbar with pills */}
            <div className="bg-surface-alt border border-ink/6 sticky z-20" style={{ padding: "clamp(24px, 4vw, 48px)", top: "clamp(72px, 8vw, 88px)" }}>
              <div className="relative max-w-2xl" style={{ marginBottom: "32px" }}>
                <Search
                  size={20}
                  className="absolute top-1/2 -translate-y-1/2 text-ink-muted"
                  style={{ left: "1.25rem" }}
                />
                <input
                  type="text"
                  placeholder="Search by dealer name or city..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setVisibleCount(INITIAL_COUNT);
                  }}
                  aria-label="Search dealers by name or city"
                  className="w-full pr-5 py-4 text-[0.95rem] bg-white border border-ink/8 rounded-none text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none focus-visible:outline-1 focus-visible:outline-accent transition-colors duration-300"
                  style={{ paddingLeft: "3.5rem" }}
                />
              </div>
              <p className="text-[0.6rem] font-medium tracking-[0.25em] uppercase text-ink-muted" style={{ marginBottom: "16px" }}>
                Filter by Province
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {dealerProvinces.map((province) => {
                  const isActive = province === activeProvince;
                  const count =
                    province === "All"
                      ? dealers.length
                      : dealers.filter((d) => d.province === province).length;
                  return (
                    <button
                      key={province}
                      onClick={() => {
                        setActiveProvince(province);
                        setVisibleCount(INITIAL_COUNT);
                      }}
                      className={isActive ? "btn-gold" : "btn-gold-outline"}
                      style={{ padding: "12px 24px" }}
                    >
                      {province}
                      <span className={isActive ? "opacity-70" : "text-ink-muted"}>
                        ({count})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
        </div>
      </FadeIn>
      )}

      {/* ── Results + Cards (fade on province change) ── */}
      <div style={{ opacity: isFading ? 0 : 1, transition: "opacity 0.15s linear" }}>

        {/* Province indicator strip (embedded + filtered) */}
        {embedded && activeProvince !== "All" ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              marginBottom: "24px",
              background: "var(--color-accent-subtle)",
              borderLeft: "3px solid var(--color-accent)",
            }}
          >
            <p className="text-[0.65rem] font-medium tracking-[0.15em] uppercase text-ink">
              {activeProvince}
              <span className="text-ink-muted" style={{ marginLeft: "8px" }}>
                — {filtered.length} {filtered.length === 1 ? "dealer" : "dealers"}
              </span>
            </p>
            <button
              onClick={() => setActiveProvince("All")}
              className="text-ink-muted hover:text-accent transition-colors duration-300"
              aria-label="Clear province filter"
              style={{ display: "flex", alignItems: "center", gap: "4px" }}
            >
              <span className="text-[0.6rem] font-medium tracking-[0.1em] uppercase">Clear</span>
              <X size={12} />
            </button>
          </div>
        ) : (
          /* Default results divider */
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
            <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-ink-muted whitespace-nowrap">
              {filtered.length} {filtered.length === 1 ? "Dealer" : "Dealers"} found
              {activeProvince !== "All" && ` in ${activeProvince}`}
            </p>
            <div className="h-px flex-1 bg-ink/8" />
          </div>
        )}

        {/* Dealer Cards */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 md:py-24">
            <p className="body-lg text-ink-light">
              No dealers found. Try a different search or province.
            </p>
          </div>
        ) : groupedDealers ? (
          /* Alphabetical grouping (20+ dealers) */
          <div>
            {groupedDealers.map((group) => (
              <div key={group.letter} style={{ marginBottom: "24px" }}>
                {/* Letter marker */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                  <span
                    className="text-accent font-serif"
                    style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1, width: "24px", textAlign: "center" }}
                  >
                    {group.letter}
                  </span>
                  <div className="h-px flex-1 bg-ink/6" />
                </div>
                {/* Cards for this letter */}
                <div className={`grid ${gridCols}`} style={{ gap: gridGap }}>
                  {group.dealers.map((dealer, i) => renderDealerCard(dealer, i))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Flat grid (< 20 dealers) */
          <div className={`grid ${gridCols}`} style={{ gap: gridGap }}>
            {visible.map((dealer, i) => renderDealerCard(dealer, i))}
          </div>
        )}

        {/* Load More */}
        {hasMore && (
          <div style={{ textAlign: "center", marginTop: embedded ? "32px" : "64px" }}>
            <button
              onClick={() => setVisibleCount((c) => c + LOAD_MORE_COUNT)}
              className="btn-line"
            >
              Load More Dealers
            </button>
          </div>
        )}
      </div>
    </>
  );

  if (embedded) {
    return <div>{gridContent}</div>;
  }

  return (
    <section id="dealers-grid" className="bg-surface" style={{ padding: "clamp(64px, 8vw, 112px) 0" }}>
      <div className="container">{gridContent}</div>
    </section>
  );
}
