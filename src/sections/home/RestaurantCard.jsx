"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { CDN_URL } from "@/lib/data/restaurants";
import { formatRating, formatDeliveryTime } from "@/lib/utils/formatters";
import { useFavorites } from "@/hooks/useFavorites";

function StarRating({ rating, ratingCount, deliveryTime }) {
  const isNew = !rating || ratingCount === "NEW";
  return (
    <div className="flex items-center gap-1 text-sm text-(--swiggy-text)">
      {isNew ? (
        <span className="text-xs font-bold text-(--swiggy-orange) border border-(--swiggy-orange) rounded px-1 py-0.5 leading-none">NEW</span>
      ) : (
        <>
          <span className="inline-flex items-center justify-center size-4 rounded-full bg-(--swiggy-green) shrink-0">
            <svg viewBox="0 0 12 12" fill="white" className="size-2.5">
              <path d="M6 1l1.236 2.506 2.764.402-2 1.948.472 2.752L6 7.506l-2.472 1.302.472-2.752-2-1.948 2.764-.402L6 1z" />
            </svg>
          </span>
          <span className="font-medium">{formatRating(rating)}</span>
        </>
      )}
      <span className="text-(--swiggy-gray)">•</span>
      <span className="text-(--swiggy-gray)">{formatDeliveryTime(deliveryTime)}</span>
    </div>
  );
}

export default function RestaurantCard({ restaurant }) {
  const {
    id,
    name,
    imageId,
    cuisines,
    rating,
    ratingCount,
    deliveryTime,
    discount,
    locality,
    isOpen = true,
  } = restaurant;

  const { isFavorite, toggle } = useFavorites();
  const faved = isFavorite(id);

  return (
    <div className="group cursor-pointer">
      {/* Image */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-gray-100" style={{ aspectRatio: "3/2" }}>
        <Link href={`/restaurant/${id}`}>
          <Image
            src={`${CDN_URL}${imageId}`}
            alt={name}
            fill
            className={`object-cover transition-transform duration-300 group-hover:scale-105 ${!isOpen ? "grayscale opacity-60" : ""}`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Discount banner */}
          {discount && isOpen && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent px-3 py-3">
              <p className="text-white text-sm font-bold tracking-wide truncate">{discount}</p>
            </div>
          )}

          {/* Closed overlay */}
          {!isOpen && (
            <div className="absolute inset-0 bg-black/30 flex items-end justify-start p-3">
              <span className="text-white text-xs font-semibold bg-black/60 px-2 py-1 rounded">Closed</span>
            </div>
          )}
        </Link>

        {/* Heart button — outside the Link to avoid navigation */}
        <button
          onClick={(e) => { e.preventDefault(); toggle(id); }}
          className="absolute top-2.5 right-2.5 size-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform z-10"
          aria-label={faved ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            size={16}
            className={`transition-colors ${faved ? "fill-red-500 text-red-500" : "text-gray-500"}`}
          />
        </button>
      </div>

      {/* Info */}
      <Link href={`/restaurant/${id}`}>
        <div className="pt-2.5 pb-1 space-y-0.5">
          <h3 className="font-bold text-[15px] text-(--swiggy-text) leading-snug line-clamp-1 group-hover:text-(--swiggy-orange) transition-colors">
            {name}
          </h3>
          <StarRating rating={rating} ratingCount={ratingCount} deliveryTime={deliveryTime} />
          <p className="text-sm text-(--swiggy-gray) line-clamp-1">{cuisines.join(", ")}</p>
          {locality && (
            <p className="text-sm text-(--swiggy-gray) line-clamp-1">{locality}</p>
          )}
        </div>
      </Link>
    </div>
  );
}
