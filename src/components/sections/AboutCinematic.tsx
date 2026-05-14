"use client";

import dynamic from "next/dynamic";
import AboutHero from "./about/AboutHero";
import AboutNarrative from "./about/AboutNarrative";
import AboutLeadership from "./about/AboutLeadership";
import AboutStats from "./about/AboutStats";
import AboutPurpose from "./about/AboutPurpose";

const AboutNav = dynamic(() => import("@/components/ui/AboutNav"), { ssr: false });
const SectionTransition = dynamic(() => import("@/components/ui/SectionTransition"), { ssr: false });
const AboutTimeline = dynamic(() => import("./about/AboutTimeline"), { ssr: false });
const AboutCraft = dynamic(() => import("./about/AboutCraft"), { ssr: false });
const AboutQuality = dynamic(() => import("./about/AboutQuality"), { ssr: false });
const AboutCertifications = dynamic(() => import("./about/AboutCertifications"), { ssr: false });
const AboutClients = dynamic(() => import("./about/AboutClients"), { ssr: false });
const AboutCTA = dynamic(() => import("./about/AboutCTA"), { ssr: false });

export default function AboutCinematic() {
  return (
    <div>
      {/* Hero — cinematic opener */}
      <AboutHero />

      {/* Narrative — our story + promoters (dark, factory bg) */}
      <AboutNarrative />

      <SectionTransition from="dark" to="light-alt" variant="diagonal" />

      {/* Leadership — Chairman & MD quotes */}
      <AboutLeadership />

      <SectionTransition from="light-alt" to="red" variant="wave" />

      {/* Impact numbers — red strip */}
      <AboutStats />

      <SectionTransition from="red" to="dark" variant="diagonal" />

      {/* Vision + Mission */}
      <AboutPurpose />

      <SectionTransition from="dark" to="light" variant="wave" />

      {/* Timeline milestones */}
      <AboutTimeline />

      <SectionTransition from="light" to="dark" variant="diagonal" />

      {/* Manufacturing craft */}
      <AboutCraft />

      <SectionTransition from="dark" to="light" variant="wave" />

      {/* Quality & Sustainability */}
      <AboutQuality />

      <SectionTransition from="light" to="light" variant="mosaic" />

      {/* Certifications */}
      <AboutCertifications />

      <SectionTransition from="light" to="light" variant="mosaic" />

      {/* Client trust marquee */}
      <AboutClients />

      <SectionTransition from="light" to="red" variant="diagonal" />

      {/* CTA */}
      <AboutCTA />

      <style jsx>{`
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        :global(.animate-spin-slow) { animation: spinSlow 20s linear infinite; }
        @keyframes trustMarquee { from { transform: translateX(0); } to { transform: translateX(calc(-100% / 3)); } }
        :global(.animate-trust-marquee) { animation: trustMarquee 28s linear infinite; width: max-content; }
        :global(.animate-trust-marquee:hover) { animation-play-state: paused; }
        @keyframes scrollPulse { 0%, 100% { transform: translateY(0); opacity: 1; } 50% { transform: translateY(20px); opacity: 0; } 51% { transform: translateY(-8px); opacity: 0; } 70% { opacity: 1; } }
        :global(.animate-scroll-pulse) { animation: scrollPulse 2s linear infinite; }
      `}</style>
    </div>
  );
}
