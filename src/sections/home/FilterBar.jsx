"use client";

import { SlidersHorizontal, ChevronDown, Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { SORT_OPTIONS, FILTER_CHIPS } from "@/config";
import { cn } from "@/lib/utils";

function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = SORT_OPTIONS.find((o) => o.value === value) ?? SORT_OPTIONS[0];

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const isActive = value && value !== "relevance";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border transition-colors whitespace-nowrap",
          isActive
            ? "border-(--swiggy-orange) bg-(--swiggy-orange-light) text-(--swiggy-orange) font-semibold"
            : "border-gray-300 text-(--swiggy-text) hover:border-(--swiggy-orange) hover:text-(--swiggy-orange)"
        )}
      >
        <SlidersHorizontal size={14} />
        Sort By
        <ChevronDown size={13} className={cn("transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute top-full mt-1.5 left-0 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.14)] border border-gray-100 py-1 z-50 min-w-[190px]">
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

export default function FilterBar({
  filters,
  onFilterChange,
  onSortChange,
  sortBy,
  resultCount,
  searchQuery,
  onSearch,
}) {
  const sentinelRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-64px 0px 0px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hasActiveFilters = filters.length > 0 || (sortBy && sortBy !== "relevance");

  return (
    <>
      {/* Sentinel — sits just above the bar; when it leaves viewport the bar "sticks" */}
      <div ref={sentinelRef} className="h-px -mt-px" />

      <div
        className={cn(
          "sticky top-16 z-40 bg-white transition-shadow",
          isSticky && "shadow-[0_2px_8px_rgba(0,0,0,0.10)]"
        )}
      >
        {isSticky ? (
          /* ── Compact sticky layout ── */
          <div className="flex items-center gap-3 py-2.5 px-0 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            <SortDropdown value={sortBy} onChange={onSortChange} />
            <div className="relative flex-1 max-w-sm">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-(--swiggy-gray) pointer-events-none">
                <Search size={16} />
              </span>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search for restaurant and food"
                className={cn(
                  "h-10 w-full rounded-full border border-gray-200 bg-(--swiggy-light-gray) pl-9 pr-4 text-sm text-(--swiggy-text) placeholder:text-gray-400",
                  "outline-none transition-colors focus:bg-white focus:border-(--swiggy-orange) focus:ring-2 focus:ring-(--swiggy-orange)/20"
                )}
              />
            </div>
          </div>
        ) : (
          /* ── Normal expanded layout ── */
          <div className="flex items-center gap-3 py-4 border-b border-gray-100 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            <SortDropdown value={sortBy} onChange={onSortChange} />
            <span className="h-6 w-px bg-gray-200 hidden sm:block" />
            {FILTER_CHIPS.map((chip) => {
              const active = filters.includes(chip.id);
              return (
                <button
                  key={chip.id}
                  onClick={() => onFilterChange(chip.id)}
                  className={cn(
                    "text-sm px-3 py-1.5 rounded-full border transition-colors whitespace-nowrap",
                    active
                      ? "border-(--swiggy-orange) bg-(--swiggy-orange-light) text-(--swiggy-orange) font-semibold"
                      : "border-gray-300 text-(--swiggy-text) hover:border-(--swiggy-orange) hover:text-(--swiggy-orange)"
                  )}
                >
                  {chip.label}
                </button>
              );
            })}
            {resultCount !== undefined && (
              <span className="ml-auto text-sm text-(--swiggy-gray) hidden sm:block">
                {resultCount} restaurant{resultCount !== 1 ? "s" : ""}
              </span>
            )}
            {hasActiveFilters && (
              <button
                onClick={() => { onFilterChange(null); onSortChange("relevance"); }}
                className="text-xs font-medium text-(--swiggy-orange) hover:underline"
              >
                Clear all
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
