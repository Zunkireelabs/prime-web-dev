"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fn = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed z-40 w-10 h-10 md:w-11 md:h-11 flex items-center justify-center border border-ink-faint text-ink-light hover:border-ink hover:text-ink transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{ bottom: "clamp(16px, 3vw, 24px)", left: "clamp(16px, 3vw, 24px)" }}
      aria-label="Back to top"
    >
      <ArrowUp size={14} />
    </button>
  );
}
