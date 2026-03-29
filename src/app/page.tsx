"use client";

import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/ui/LoadingScreen";
import SectionTransition from "@/components/ui/SectionTransition";
import VideoOverlay from "@/components/sections/VideoOverlay";
import HeroMain from "@/components/sections/HeroMain";
import BrandIntro from "@/components/sections/BrandIntro";
import FindBySpace from "@/components/sections/FindBySpace";
import BrowseBy from "@/components/sections/BrowseBy";
import StatsBar from "@/components/sections/StatsBar";
import SpiritSection from "@/components/sections/SpiritSection";
import CollectionsGrid from "@/components/sections/CollectionsGrid";
import CTASection from "@/components/sections/CTASection";
import ProductShowcase from "@/components/sections/ProductShowcase";
import FactoryBanner from "@/components/sections/FactoryBanner";
import VirtualShowroom from "@/components/sections/VirtualShowroom";
import ClientsSection from "@/components/sections/ClientsSection";
import DealerNetwork from "@/components/sections/DealerNetwork";

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
