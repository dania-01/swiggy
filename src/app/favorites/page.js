"use client";

import Link from "next/link";
import { ChevronLeft, Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { restaurants } from "@/lib/data/restaurants";
import RestaurantCard from "@/sections/home/RestaurantCard";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const saved = restaurants.filter((r) => favorites.has(r.id));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-16">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-(--swiggy-gray) hover:text-(--swiggy-text) mb-6 transition-colors"
      >
        <ChevronLeft size={18} /> Back
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold text-(--swiggy-text)">Favourites</h1>
        {saved.length > 0 && (
          <span className="text-sm font-semibold text-(--swiggy-gray) bg-gray-100 px-2.5 py-0.5 rounded-full">
            {saved.length}
          </span>
        )}
      </div>

      {saved.length === 0 ? (
        <div className="py-24 text-center">
          <div className="size-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
            <Heart size={38} className="text-red-300" strokeWidth={1.5} />
          </div>
          <h2 className="text-lg font-bold text-(--swiggy-text) mb-1">No favourites yet</h2>
          <p className="text-sm text-(--swiggy-gray) mb-6 max-w-xs mx-auto">
            Tap the heart on any restaurant to save it here.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-(--swiggy-orange) text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#e04800] transition-colors"
          >
            Browse Restaurants
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
          {saved.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      )}
    </div>
  );
}
