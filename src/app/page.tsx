"use client";

import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/ui/LoadingScreen";
import HeroSection from "@/components/sections/HeroSection";
import MarqueeStrip from "@/components/sections/MarqueeStrip";
import AboutSection from "@/components/sections/AboutSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import ServicesTeaser from "@/components/sections/ServicesTeaser";
import GallerySection from "@/components/sections/GallerySection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import LocationsSection from "@/components/sections/LocationsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import SectionTransition from "@/components/animations/SectionTransition";

export default function Home() {
  const handleLoadingComplete = () => {
    window.dispatchEvent(new CustomEvent("prime-loading-complete"));
  };

  return (
    <SmoothScroll>
      <LoadingScreen onComplete={handleLoadingComplete} />
      <Header />

      <main className="grain-overlay">
        {/* Mystery: arrival */}
        <HeroSection />
        <MarqueeStrip />

        {/* Warmth: candlelit room */}
        <div className="bridge-to-warm" />
        <AboutSection />
        <div className="bridge-from-warm" />

        {/* Nature: roots */}
        <div className="bridge-to-forest" />
        <PhilosophySection />
        <div className="bridge-from-forest" />

        <SectionTransition variant="wave" />

        {/* Luxury: indulgence */}
        <div className="bridge-to-plum" />
        <ServicesTeaser />
        <div className="bridge-from-plum" />

        {/* Clean: photos speak */}
        <GallerySection />

        <SectionTransition variant="diamond" />

        {/* Trust: credibility */}
        <div className="bridge-to-navy" />
        <ExperienceSection />
        <div className="bridge-from-navy" />

        {/* Voices: social proof */}
        <TestimonialsSection />

        <SectionTransition variant="ornament" />

        {/* Clean: informational */}
        <LocationsSection />

        <SectionTransition variant="fade-gradient" />

        {/* Invitation: warm welcome */}
        <div className="bridge-to-amber" />
        <CTASection />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
