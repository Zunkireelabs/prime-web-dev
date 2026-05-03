"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CareersHero from "@/components/sections/careers/CareersHero";

const SectionTransition = dynamic(
  () => import("@/components/ui/SectionTransition"),
  { ssr: false }
);
const CareersIntro = dynamic(
  () => import("@/components/sections/careers/CareersIntro"),
  { ssr: false }
);
const CareersValues = dynamic(
  () => import("@/components/sections/careers/CareersValues"),
  { ssr: false }
);
const CareersBenefits = dynamic(
  () => import("@/components/sections/careers/CareersBenefits"),
  { ssr: false }
);
const CareersOpenings = dynamic(
  () => import("@/components/sections/careers/CareersOpenings"),
  { ssr: false }
);
const CTASection = dynamic(
  () => import("@/components/sections/CTASection"),
  { ssr: false }
);

export default function CareersPage() {
  return (
    <SmoothScroll>
      <Header />
      <main id="main-content">
        <CareersHero />

        <SectionTransition from="dark" to="light" variant="wave" />
        <CareersIntro />

        <SectionTransition from="light" to="light-alt" variant="diagonal" />
        <CareersValues />

        <SectionTransition from="light-alt" to="dark" variant="wave" />
        <CareersBenefits />

        <SectionTransition from="dark" to="light" variant="diagonal" />
        <CareersOpenings />

        <SectionTransition from="light" to="dark" variant="wave" />
        <CTASection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
