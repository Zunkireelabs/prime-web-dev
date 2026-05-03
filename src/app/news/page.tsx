"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NewsHero from "@/components/sections/NewsHero";

const SectionTransition = dynamic(() => import("@/components/ui/SectionTransition"), { ssr: false });
const NewsFeatured = dynamic(() => import("@/components/sections/NewsFeatured"), { ssr: false });
const NewsGrid = dynamic(() => import("@/components/sections/NewsGrid"), { ssr: false });
const CTASection = dynamic(() => import("@/components/sections/CTASection"), { ssr: false });

export default function NewsPage() {
  return (
    <SmoothScroll>
      <Header />
      <main id="main-content">
        <NewsHero />
        <SectionTransition from="dark" to="light-alt" variant="wave" />
        <NewsFeatured />
        <NewsGrid />
        <SectionTransition from="light" to="dark" variant="diagonal" />
        <CTASection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
