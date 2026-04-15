"use client";

import { MessageSquare } from "lucide-react";

export default function FloatingEnquiry() {
  return (
    <a
      href="#contact"
      aria-label="Enquire now — contact us"
      className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-accent text-white flex-col items-center hover:bg-accent-hover [writing-mode:vertical-lr] text-[0.55rem] font-medium tracking-[0.2em] uppercase rounded-l-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      style={{
        padding: "14px 8px",
        gap: "10px",
        boxShadow: "0 2px 12px rgba(181,138,82,0.25)",
        transition: "background 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <MessageSquare size={12} />
      Enquire Now
    </a>
  );
}
