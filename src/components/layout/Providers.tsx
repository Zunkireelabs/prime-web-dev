"use client";

import dynamic from "next/dynamic";

const AudioToggle = dynamic(() => import("@/components/ui/AudioToggle"), {
  ssr: false,
});
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), {
  ssr: false,
});
const ScrollProgress = dynamic(() => import("@/components/ui/ScrollProgress"), {
  ssr: false,
});
const BackToTop = dynamic(() => import("@/components/ui/BackToTop"), {
  ssr: false,
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <AudioToggle />
      <CustomCursor />
      <ScrollProgress />
      <BackToTop />
    </>
  );
}
