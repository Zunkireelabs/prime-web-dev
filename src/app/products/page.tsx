"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductsHero from "@/components/sections/ProductsHero";

const ProductsBrowser = dynamic(() => import("@/components/sections/ProductsBrowser"), { ssr: false });
const SectionTransition = dynamic(() => import("@/components/ui/SectionTransition"), { ssr: false });
const CTASection = dynamic(() => import("@/components/sections/CTASection"), { ssr: false });

export default function ProductsPage() {
  return (
    <Suspense>
      <SmoothScroll>
        <Header />
        <main id="main-content">
          <ProductsHero />
          <SectionTransition from="dark" to="light-alt" variant="wave" />
          <ProductsBrowser />
          <SectionTransition from="light-alt" to="dark" variant="diagonal" />
          <CTASection />
        </main>
        <Footer />
      </SmoothScroll>
    </Suspense>
  );
}
