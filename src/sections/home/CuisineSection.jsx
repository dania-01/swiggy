"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { CUISINE_CATEGORIES, CDN_URL } from "@/config";

function CuisineTile({ category }) {
  const slug = category.label.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link
      href={`/restaurants/${slug}`}
      className="flex flex-col items-center shrink-0 hover:opacity-80 transition-opacity"
    >
      <div className="relative size-28">
        <Image
          src={`${CDN_URL}${category.imageId}`}
          alt={category.label}
          fill
          className="object-contain"
          sizes="112px"
        />
      </div>
    </Link>
  );
}

export default function CuisineSection() {
  const scrollRef = useRef(null);

  function scroll(dir) {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 300, behavior: "smooth" });
  }

  return (
    <section className="py-6 border-b border-gray-100">
      <h2 className="text-xl font-bold text-(--swiggy-text) mb-5">What&apos;s on your mind?</h2>

      <div className="relative">
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 bg-white rounded-full shadow-md size-8 flex items-center justify-center text-(--swiggy-text) hover:text-(--swiggy-orange) transition-colors hidden md:flex"
          aria-label="Scroll left"
        >
          <ChevronLeft size={18} />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {CUISINE_CATEGORIES.map((cat) => (
            <CuisineTile key={cat.id} category={cat} />
          ))}
        </div>

        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 bg-white rounded-full shadow-md size-8 flex items-center justify-center text-(--swiggy-text) hover:text-(--swiggy-orange) transition-colors hidden md:flex"
          aria-label="Scroll right"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
