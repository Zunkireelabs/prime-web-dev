"use client";

import { MessageSquare } from "lucide-react";

export default function FloatingEnquiry() {
  return (
    <a
      href="#contact"
      aria-label="Enquire now — contact us"
      className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-accent text-white flex-col items-center hover:bg-accent-hover hover:scale-105 [writing-mode:vertical-lr] text-[0.7rem] font-medium tracking-[0.25em] uppercase rounded-l-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      style={{
        padding: "24px 16px",
        gap: "16px",
        boxShadow: "0 4px 20px rgba(181,138,82,0.3), 0 2px 8px rgba(0,0,0,0.1)",
        transition: "background 0.3s cubic-bezier(0.22,1,0.36,1), transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <MessageSquare size={16} />
      Enquire Now
    </a>
  );
}
