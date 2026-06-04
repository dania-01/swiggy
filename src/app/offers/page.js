"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Clock, SlidersHorizontal } from "lucide-react";
import { restaurants, CDN_URL } from "@/lib/data/restaurants";
import { formatRating, formatDeliveryTime } from "@/lib/utils/formatters";
import { cn } from "@/lib/utils";

function RestaurantOfferCard({ r }) {
  return (
    <Link href={`/restaurant/${r.id}`} className="group block">
      <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-[4/3]">
        <Image
          src={`${CDN_URL}${r.imageId}`}
          alt={r.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-white font-bold text-sm">{r.name}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="inline-flex items-center justify-center size-4 rounded-full bg-(--swiggy-green)">
              <svg viewBox="0 0 12 12" fill="white" className="size-2.5"><path d="M6 1l1.236 2.506 2.764.402-2 1.948.472 2.752L6 7.506l-2.472 1.302.472-2.752-2-1.948 2.764-.402L6 1z"/></svg>
            </span>
            <span className="text-white text-xs font-medium">{formatRating(r.rating)}</span>
            <span className="text-white/60 text-xs">·</span>
            <span className="text-white/80 text-xs">{formatDeliveryTime(r.deliveryTime)}</span>
          </div>
        </div>
        {r.discount && (
          <div className="absolute top-2 left-2 bg-(--swiggy-orange) text-white text-[10px] font-bold px-2 py-0.5 rounded">
            {r.discount}
          </div>
        )}
      </div>
      <div className="mt-1.5 px-0.5">
        <p className="text-xs text-(--swiggy-gray) truncate">{r.cuisines.slice(0, 2).join(" · ")}</p>
        <p className="text-xs text-(--swiggy-gray)">{r.locality}</p>
      </div>
    </Link>
  );
}

const TABS = ["Order Online", "Dineout"];
const FILTERS = ["Sort By", "Rating 4+", "Pure Veg", "Under 30 Min"];

export default function OffersPage() {
  const [tab, setTab] = useState("Order Online");
  const [activeFilters, setActiveFilters] = useState([]);

  const withOffers = useMemo(() => {
    let list = restaurants.filter((r) => r.discount && r.isOpen);
    if (activeFilters.includes("Rating 4+")) list = list.filter((r) => r.rating >= 4);
    if (activeFilters.includes("Pure Veg")) list = list.filter((r) => r.isVeg);
    if (activeFilters.includes("Under 30 Min")) list = list.filter((r) => r.deliveryTime <= 30);
    if (activeFilters.includes("Sort By")) list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [activeFilters]);

  function toggleFilter(f) {
    setActiveFilters((p) => p.includes(f) ? p.filter((x) => x !== f) : [...p, f]);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
      {/* Hero banner */}
      <div className="relative mt-4 rounded-3xl overflow-hidden h-52 sm:h-64 bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 z-20">
          <p className="text-white/70 text-sm mb-1 font-medium">Exclusive deals · Limited time</p>
          <h1 className="text-white text-2xl sm:text-3xl font-bold leading-tight max-w-md">
            Restaurants With Great Offers Near Me
          </h1>
        </div>
        {/* Decorative table image feel */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-amber-900/40 to-transparent" />
        <div className="absolute right-8 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-amber-700/30 blur-2xl" />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 mt-6 border-b border-gray-200">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "pb-3 text-sm font-semibold transition-colors border-b-2 -mb-px",
              tab === t
                ? "border-(--swiggy-orange) text-(--swiggy-text)"
                : "border-transparent text-(--swiggy-gray) hover:text-(--swiggy-text)"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 py-4 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => toggleFilter(f)}
            className={cn(
              "flex items-center gap-1.5 shrink-0 text-sm px-3 py-1.5 rounded-full border transition-colors",
              activeFilters.includes(f)
                ? "border-(--swiggy-orange) bg-(--swiggy-orange-light) text-(--swiggy-orange) font-semibold"
                : "border-gray-300 text-(--swiggy-text) hover:border-gray-400"
            )}
          >
            {f === "Sort By" && <SlidersHorizontal size={13} />}
            {f}
          </button>
        ))}
      </div>

      {tab === "Order Online" ? (
        <>
          <p className="text-lg font-bold text-(--swiggy-text) mb-5">
            {withOffers.length} restaurants with offers
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {withOffers.map((r) => <RestaurantOfferCard key={r.id} r={r} />)}
          </div>
          {withOffers.length === 0 && (
            <div className="py-16 text-center text-(--swiggy-gray)">No offers matching your filters.</div>
          )}
        </>
      ) : (
        <div className="py-16 text-center">
          <p className="text-2xl mb-3">🍽️</p>
          <h2 className="text-lg font-bold text-(--swiggy-text) mb-1">Dineout coming soon</h2>
          <p className="text-sm text-(--swiggy-gray)">Book tables at top restaurants near you.</p>
        </div>
      )}
    </div>
  );
}
