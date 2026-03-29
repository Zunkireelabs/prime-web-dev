"use client";

import { MessageSquare } from "lucide-react";

export default function FloatingEnquiry() {
  return (
    <a
      href="#contact"
      aria-label="Enquire now — contact us"
      className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-[var(--accent)] text-white px-4 py-6 flex-col items-center gap-3 shadow-lg hover:bg-[var(--accent-light)] transition-colors duration-300 [writing-mode:vertical-lr] text-[0.7rem] font-medium tracking-[0.25em] uppercase rounded-l-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
    >
      <MessageSquare size={16} />
      Enquire Now
    </a>
  );
}
