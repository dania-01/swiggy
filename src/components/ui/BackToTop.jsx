"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() { setVisible(window.scrollY > 400); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 size-11 rounded-full bg-white border border-gray-200 shadow-[0_4px_16px_rgba(0,0,0,0.15)] flex items-center justify-center text-(--swiggy-text) hover:border-(--swiggy-orange) hover:text-(--swiggy-orange) transition-colors"
      aria-label="Back to top"
    >
      <ArrowUp size={18} />
    </button>
  );
}
