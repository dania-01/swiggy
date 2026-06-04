"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import RestaurantCard from "@/sections/home/RestaurantCard";
import { restaurants } from "@/lib/data/restaurants";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return restaurants.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.cuisines.some((c) => c.toLowerCase().includes(q)) ||
        r.locality?.toLowerCase().includes(q) ||
        r.areaName?.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 pb-16">
      {/* Search input */}
      <div className="relative mb-8">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-(--swiggy-gray) pointer-events-none">
          <Search size={20} />
        </span>
        <input
          type="search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for restaurants, cuisines or dishes…"
          className="w-full h-14 rounded-2xl border border-gray-200 bg-white pl-12 pr-12 text-base text-(--swiggy-text) placeholder:text-gray-400 outline-none shadow-[0_2px_12px_rgba(0,0,0,0.08)] focus:border-(--swiggy-orange) focus:ring-2 focus:ring-(--swiggy-orange)/15 transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-(--swiggy-gray) hover:text-(--swiggy-text)"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Empty state — no query */}
      {!query && (
        <div className="text-center py-16">
          <Search size={56} className="mx-auto text-gray-200 mb-4" />
          <h2 className="text-lg font-semibold text-(--swiggy-text) mb-1">Search for food</h2>
          <p className="text-sm text-(--swiggy-gray)">Try "pizza", "biryani" or a restaurant name</p>
        </div>
      )}

      {/* No results */}
      {query && results.length === 0 && (
        <div className="text-center py-16">
          <p className="text-4xl mb-4">🍽️</p>
          <h2 className="text-lg font-semibold text-(--swiggy-text) mb-1">
            No results for &ldquo;{query}&rdquo;
          </h2>
          <p className="text-sm text-(--swiggy-gray)">Try a different keyword</p>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <>
          <p className="text-sm text-(--swiggy-gray) mb-5">
            <span className="font-semibold text-(--swiggy-text)">{results.length}</span> result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8">
            {results.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
