"use client";

import { useState, useMemo, useEffect } from "react";
import { MapPin, Phone, User, Search } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import SplitHeading from "@/components/animations/SplitHeading";
import { dealers, dealerProvinces } from "@/data/dealers";

const INITIAL_COUNT = 24;
const LOAD_MORE_COUNT = 24;

interface DealersGridProps {
  activeProvince?: string;
  onProvinceChange?: (province: string) => void;
}

export default function DealersGrid({
  activeProvince: externalProvince,
  onProvinceChange,
}: DealersGridProps = {}) {
  const [internalProvince, setInternalProvince] = useState("All");
  const activeProvince = externalProvince ?? internalProvince;
  const setActiveProvince = onProvinceChange ?? setInternalProvince;

  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  // Read province from URL on mount (for homepage links)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get("province");
    if (p && dealerProvinces.includes(p as typeof dealerProvinces[number])) {
      setActiveProvince(p);
    }
  }, [setActiveProvince]);

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

  return (
    <section id="dealers-grid" className="section-pad bg-[var(--bg)]">
      <div className="container">

        {/* ── Section Header ── */}
        <div className="mb-12 md:mb-16">
          <FadeIn>
            <p className="eyebrow text-[var(--accent)] mb-4">
              Browse Dealers
            </p>
          </FadeIn>
          <SplitHeading as="h2" className="h2 text-[var(--ink)] mb-6">
            Our Nationwide Network
          </SplitHeading>
          <FadeIn delay={0.2}>
            <p className="body-lg text-[var(--ink-light)] max-w-lg">
              Search by name, city, or filter by province to find an
              authorized Prime Ceramics dealer near you.
            </p>
          </FadeIn>
        </div>

        {/* ── Search & Filter Toolbar ── */}
        <FadeIn delay={0.25}>
          <div className="bg-[var(--bg-alt)] border border-[var(--ink)]/6 p-6 md:p-10 mb-14">
            {/* Search */}
            <div className="relative max-w-2xl mb-8">
              <Search
                size={20}
                className="absolute top-1/2 -translate-y-1/2 text-[var(--ink-muted)]"
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
                className="w-full pr-5 py-4 text-[0.95rem] bg-white border border-[var(--ink)]/8 rounded-none text-[var(--ink)] placeholder:text-[var(--ink-muted)] focus:border-[var(--accent)] focus:outline-none focus-visible:outline-1 focus-visible:outline-[var(--accent)] transition-colors duration-300"
                style={{ paddingLeft: "3.5rem" }}
              />
            </div>

            {/* Province label */}
            <p className="text-[0.6rem] font-medium tracking-[0.25em] uppercase text-[var(--ink-muted)] mb-4">
              Filter by Province
            </p>

            {/* Province pills */}
            <div className="flex flex-wrap gap-3">
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
                    className={`cursor-pointer px-5 py-3 text-[0.7rem] font-medium tracking-[0.15em] uppercase transition-all duration-300 border ${
                      isActive
                        ? "bg-[var(--accent)] border-[var(--accent)] text-white"
                        : "bg-white border-[var(--ink)]/10 text-[var(--ink-light)] hover:border-[var(--accent)]/40 hover:text-[var(--ink)]"
                    }`}
                  >
                    {province}
                    <span className={isActive ? "text-white/70 ml-2" : "text-[var(--ink-muted)] ml-2"}>
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* ── Results Divider ── */}
        <div className="flex items-center gap-4 mb-10">
          <p className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-[var(--ink-muted)] whitespace-nowrap">
            {filtered.length} {filtered.length === 1 ? "Dealer" : "Dealers"} found
            {activeProvince !== "All" && ` in ${activeProvince}`}
          </p>
          <div className="h-px flex-1 bg-[var(--ink)]/8" />
        </div>

        {/* ── Dealer Cards Grid ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 md:py-24">
            <p className="body-lg text-[var(--ink-light)]">
              No dealers found. Try a different search or province.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {visible.map((dealer, i) => (
              <FadeIn
                key={dealer.name}
                delay={Math.min(i * 0.03, 0.4)}
                direction="up"
                distance={20}
              >
                <div className="group relative p-6 border border-[var(--ink)]/6 hover:border-[var(--accent)]/30 bg-white transition-all duration-300 h-full hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
                  {/* Accent top line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--accent)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                  {/* Dealer Name */}
                  <h3 className="text-[0.9rem] font-normal text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors duration-300 mb-4 leading-snug">
                    {dealer.name}
                  </h3>

                  {/* Details */}
                  <div className="space-y-3">
                    <p className="flex items-start gap-3 text-[0.8rem] text-[var(--ink-light)] leading-relaxed">
                      <MapPin
                        size={14}
                        className="mt-0.5 text-[var(--accent)] shrink-0 opacity-60"
                      />
                      <span>
                        {dealer.city}
                        <span className="text-[var(--ink-muted)]">
                          {" "}&middot; {dealer.province}
                        </span>
                      </span>
                    </p>

                    {dealer.phone && (
                      <p className="flex items-center gap-3 text-[0.8rem] text-[var(--ink-light)]">
                        <Phone
                          size={14}
                          className="text-[var(--accent)] shrink-0 opacity-60"
                        />
                        <a
                          href={`tel:${dealer.phone}`}
                          className="hover:text-[var(--accent)] transition-colors duration-300"
                        >
                          {dealer.phone}
                        </a>
                      </p>
                    )}

                    {dealer.contactPerson && (
                      <p className="flex items-center gap-3 text-[0.8rem] text-[var(--ink-muted)]">
                        <User
                          size={14}
                          className="text-[var(--accent)] shrink-0 opacity-40"
                        />
                        {dealer.contactPerson}
                      </p>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}

        {/* ── Load More ── */}
        {hasMore && (
          <div className="text-center mt-14">
            <button
              onClick={() => setVisibleCount((c) => c + LOAD_MORE_COUNT)}
              className="cursor-pointer px-10 py-4 text-[0.65rem] font-medium tracking-[0.2em] uppercase text-[var(--ink)] border border-[var(--ink)]/15 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300"
            >
              Load More Dealers
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
