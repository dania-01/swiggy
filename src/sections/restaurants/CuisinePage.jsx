"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import RestaurantGrid from "@/sections/home/RestaurantGrid";
import { restaurants } from "@/lib/data/restaurants";
import { filterRestaurants } from "@/lib/utils/helpers";
import { SORT_OPTIONS } from "@/config";
import { cn } from "@/lib/utils";

const SUBTITLES = {
  "north-indian": "Indulge with the best of North Indian cuisines.",
  "south-indian": "Authentic South Indian flavours, right at your door.",
  pizzas: "Hot, cheesy pizzas delivered fresh to you.",
  burgers: "Juicy burgers from the best joints around.",
  biryani: "Fragrant, slow-cooked biryanis you'll love.",
  chinese: "Indo-Chinese classics made with love.",
  desserts: "Sweet endings to every meal.",
  "ice-cream": "Cool off with the creamiest ice creams.",
  "pav-bhaji": "Mumbai's favourite street food, delivered.",
  rolls: "Rolls packed with flavour, rolled just right.",
  momos: "Steamed, fried, or sauced — momos your way.",
  default: "Great food from great restaurants near you.",
};

function SortChip({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const current = SORT_OPTIONS.find((o) => o.value === value) ?? SORT_OPTIONS[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border transition-colors whitespace-nowrap",
          value && value !== "relevance"
            ? "border-(--swiggy-orange) bg-(--swiggy-orange-light) text-(--swiggy-orange) font-semibold"
            : "border-gray-300 text-(--swiggy-text) hover:border-gray-400"
        )}
      >
        Sort By
        <ChevronDown size={13} className={cn("transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute top-full mt-1.5 left-0 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.12)] border border-gray-100 py-1 z-20 min-w-[190px]">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={cn(
                "w-full text-left px-4 py-2.5 text-sm transition-colors",
                opt.value === value
                  ? "text-(--swiggy-orange) font-semibold bg-(--swiggy-orange-light)"
                  : "text-(--swiggy-text) hover:bg-gray-50"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CuisinePage({ slug, label }) {
  const [sortBy, setSortBy] = useState("relevance");
  const [vegOnly, setVegOnly] = useState(false);

  const subtitle = SUBTITLES[slug] ?? SUBTITLES.default;

  const list = useMemo(() => {
    return filterRestaurants(restaurants, {
      cuisine: label,
      sortBy,
      searchQuery: "",
      vegOnly,
    });
  }, [label, sortBy, vegOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 pt-6">
      {/* Page heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-(--swiggy-text)">{label}</h1>
        <p className="text-sm text-(--swiggy-gray) mt-1">{subtitle}</p>
      </div>

      {/* Filter row */}
      <div className="flex items-center gap-3 flex-wrap mb-6 pb-5 border-b border-gray-100">
        <SortChip value={sortBy} onChange={setSortBy} />

        <button
          onClick={() => setVegOnly((v) => !v)}
          className={cn(
            "flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border transition-colors whitespace-nowrap",
            vegOnly
              ? "border-(--swiggy-green) bg-(--swiggy-green-light) text-(--swiggy-green) font-semibold"
              : "border-gray-300 text-(--swiggy-text) hover:border-gray-400"
          )}
        >
          <span className={cn("size-2.5 rounded-full border", vegOnly ? "bg-(--swiggy-green) border-(--swiggy-green)" : "border-gray-400")} />
          Veg Only
        </button>
      </div>

      {/* Count */}
      <p className="text-lg font-bold text-(--swiggy-text) mb-5">
        {list.length} Restaurant{list.length !== 1 ? "s" : ""} to explore
      </p>

      <RestaurantGrid restaurants={list} />
    </div>
  );
}
