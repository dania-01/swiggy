"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CDN_URL } from "@/lib/data/restaurants";
import { formatRating, formatDeliveryTime } from "@/lib/utils/formatters";

function StarRating({ rating, deliveryTime }) {
  return (
    <div className="flex items-center gap-1 text-sm text-(--swiggy-text)">
      <span className="inline-flex items-center justify-center size-4 rounded-full bg-(--swiggy-green) shrink-0">
        <svg viewBox="0 0 12 12" fill="white" className="size-2.5">
          <path d="M6 1l1.236 2.506 2.764.402-2 1.948.472 2.752L6 7.506l-2.472 1.302.472-2.752-2-1.948 2.764-.402L6 1z" />
        </svg>
      </span>
      <span className="font-medium">{formatRating(rating)}</span>
      <span className="text-(--swiggy-gray)">•</span>
      <span className="text-(--swiggy-gray)">{formatDeliveryTime(deliveryTime)}</span>
    </div>
  );
}

function FeaturedCard({ restaurant }) {
  const { id, name, imageId, cuisines, rating, deliveryTime, discount, locality } = restaurant;

  return (
    <Link href={`/restaurant/${id}`} className="shrink-0 w-[260px] group cursor-pointer">
      <div
        className="relative w-full overflow-hidden rounded-2xl bg-gray-100"
        style={{ aspectRatio: "16/9" }}
      >
        <Image
          src={`${CDN_URL}${imageId}`}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="260px"
        />
        {discount && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-3 py-3">
            <p className="text-white text-sm font-bold tracking-wide truncate">{discount}</p>
          </div>
        )}
      </div>
      <div className="pt-2.5 space-y-0.5">
        <h3 className="font-bold text-[15px] text-(--swiggy-text) line-clamp-1 group-hover:text-(--swiggy-orange) transition-colors">
          {name}
        </h3>
        <StarRating rating={rating} deliveryTime={deliveryTime} />
        <p className="text-sm text-(--swiggy-gray) line-clamp-1">{cuisines.join(", ")}</p>
        {locality && <p className="text-sm text-(--swiggy-gray) line-clamp-1">{locality}</p>}
      </div>
    </Link>
  );
}

export default function FeaturedCarousel({ restaurants, title }) {
  const scrollRef = useRef(null);

  function scroll(dir) {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 560, behavior: "smooth" });
  }

  if (!restaurants || restaurants.length === 0) return null;

  return (
    <section className="py-6 border-b border-gray-100">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-(--swiggy-text)">{title}</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll(-1)}
            className="size-8 rounded-full border border-gray-300 flex items-center justify-center text-(--swiggy-text) hover:border-(--swiggy-orange) hover:text-(--swiggy-orange) transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll(1)}
            className="size-8 rounded-full border border-gray-300 flex items-center justify-center text-(--swiggy-text) hover:border-(--swiggy-orange) hover:text-(--swiggy-orange) transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scroll-smooth pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {restaurants.map((r) => (
          <FeaturedCard key={r.id} restaurant={r} />
        ))}
      </div>
    </section>
  );
}
