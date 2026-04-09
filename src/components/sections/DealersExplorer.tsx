"use client";

import { useRef, useCallback } from "react";
import NepalMap from "./NepalMap";
import DealersGrid from "./DealersGrid";

interface DealersExplorerProps {
  activeProvince: string;
  onProvinceChange: (province: string) => void;
}

export default function DealersExplorer({ activeProvince, onProvinceChange }: DealersExplorerProps) {
  const dealersRef = useRef<HTMLDivElement>(null);

  const handleProvinceSelect = useCallback((province: string) => {
    onProvinceChange(province);
    // On mobile, scroll to dealers panel
    if (window.innerWidth < 768 && province !== "All") {
      setTimeout(() => {
        dealersRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [onProvinceChange]);

  return (
    <section className="bg-surface" style={{ padding: "clamp(40px, 5vw, 72px) 0" }}>
      <div className="container">
        <div className="dealers-explorer-layout">
          {/* Left: Map Panel */}
          <div className="dealers-explorer-map">
            <NepalMap
              activeProvince={activeProvince}
              onProvinceSelect={handleProvinceSelect}
              embedded
            />
          </div>

          {/* Right: Dealers Panel */}
          <div
            ref={dealersRef}
            className="dealers-explorer-list dealers-scroll"
            data-lenis-prevent
          >
            <DealersGrid
              activeProvince={activeProvince}
              onProvinceChange={onProvinceChange}
              embedded
            />
          </div>
        </div>
      </div>
    </section>
  );
}
