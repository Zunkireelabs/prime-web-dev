"use client";

import { MessageSquare } from "lucide-react";

export default function FloatingEnquiry() {
  return (
    <a
      href="#contact"
      aria-label="Enquire now — contact us"
      className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-accent text-white flex-col items-center shadow-lg hover:bg-accent-light transition-colors duration-300 [writing-mode:vertical-lr] text-[0.7rem] font-medium tracking-[0.25em] uppercase rounded-l-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      style={{ padding: "24px 16px", gap: "16px" }}
    >
      <MessageSquare size={16} />
      Enquire Now
    </a>
  );
}
