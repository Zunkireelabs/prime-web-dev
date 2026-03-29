"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/ui/LoadingScreen";
import VideoOverlay from "@/components/sections/VideoOverlay";
import HeroMain from "@/components/sections/HeroMain";
import BrandIntro from "@/components/sections/BrandIntro";

const SectionTransition = dynamic(() => import("@/components/ui/SectionTransition"), { ssr: false });
const FindBySpace = dynamic(() => import("@/components/sections/FindBySpace"), { ssr: false });
const BrowseBy = dynamic(() => import("@/components/sections/BrowseBy"), { ssr: false });
const StatsBar = dynamic(() => import("@/components/sections/StatsBar"), { ssr: false });
const SpiritSection = dynamic(() => import("@/components/sections/SpiritSection"), { ssr: false });
const CollectionsGrid = dynamic(() => import("@/components/sections/CollectionsGrid"), { ssr: false });
const CTASection = dynamic(() => import("@/components/sections/CTASection"), { ssr: false });
const ProductShowcase = dynamic(() => import("@/components/sections/ProductShowcase"), { ssr: false });
const FactoryBanner = dynamic(() => import("@/components/sections/FactoryBanner"), { ssr: false });
const VirtualShowroom = dynamic(() => import("@/components/sections/VirtualShowroom"), { ssr: false });
const ClientsSection = dynamic(() => import("@/components/sections/ClientsSection"), { ssr: false });
const DealerNetwork = dynamic(() => import("@/components/sections/DealerNetwork"), { ssr: false });

export default function Home() {
  return (
    <SmoothScroll>
      <LoadingScreen />
      <Header />

      <main id="main-content">
        {/* Video Ad — scrollable section, user scrolls past it */}
        <VideoOverlay />

        {/* ═══ BLOCK 1 — Hero (dark) ═══ */}
        <HeroMain />

        {/* ═══ BLOCK 2 — Light: About + Browsing ═══ */}
        <BrandIntro />
        <FindBySpace />
        <ProductShowcase />

        {/* Factory banner + Stats — connected dark unit */}
        <FactoryBanner />
        <StatsBar />

        {/* ─── Transition: Dark → Light ─── */}
        <SectionTransition from="dark" to="light" variant="diagonal" />

        <BrowseBy />

        {/* ═══ BLOCK 3 — Dark Showcase ═══ */}
        <SpiritSection />
        
        {/* ─── Transition: Dark → Light ─── */}
        <SectionTransition from="dark" to="light" variant="diagonal" />
        
        <CollectionsGrid />

        {/* ─── Transition: Light → Dark (wave — like flowing ceramic) ─── */}
        <SectionTransition from="light" to="dark" variant="wave" />

        {/* ═══ Virtual Showroom — The Invitation (dark) ═══ */}
        <VirtualShowroom />

        {/* ─── Transition: Dark → Light ─── */}
        <SectionTransition from="dark" to="light" variant="wave" />

        <ClientsSection />

        {/* ─── Transition: Light → Dark ─── */}
        <SectionTransition from="light" to="dark" variant="mosaic" />

        {/* ═══ Dealer Network (dark) ═══ */}
        <DealerNetwork />

        {/* ─── Transition: Dark → Light ─── */}
        <SectionTransition from="dark" to="light" variant="diagonal" />

        {/* ═══ CTA — Light section for contrast ═══ */}
        <CTASection />

        {/* ─── Transition: Light → Dark ─── */}
        <SectionTransition from="light" to="dark" variant="wave" />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
