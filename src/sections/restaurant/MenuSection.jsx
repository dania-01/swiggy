"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import FoodItemCard from "./FoodItemCard";
import { cn } from "@/lib/utils";

function catId(name) {
  return `cat-${name.replace(/\s+/g, "-").toLowerCase()}`;
}

function CategoryAccordion({ category, restaurantId, restaurantName, onSwitchRestaurant }) {
  const [open, setOpen] = useState(true);

  return (
    <div id={catId(category.category)}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-base font-bold text-(--swiggy-text)">
          {category.category}
          <span className="text-(--swiggy-gray) font-normal ml-2 text-sm">
            ({category.items.length})
          </span>
        </span>
        {open ? <ChevronUp size={18} className="text-(--swiggy-gray)" /> : <ChevronDown size={18} className="text-(--swiggy-gray)" />}
      </button>

      {open && (
        <div>
          {category.items.map((item) => (
            <FoodItemCard
              key={item.id}
              item={item}
              restaurantId={restaurantId}
              restaurantName={restaurantName}
              onSwitchRestaurant={onSwitchRestaurant}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function MenuSection({ menu, restaurantId, restaurantName, onSwitchRestaurant }) {
  const [activeCategory, setActiveCategory] = useState(menu[0]?.category ?? "");
  const observerRef = useRef(null);
  const tabsRef = useRef(null);

  useEffect(() => {
    const sections = menu.map((c) => document.getElementById(catId(c.category))).filter(Boolean);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const slug = entry.target.id.replace("cat-", "");
            const matched = menu.find(
              (c) => c.category.replace(/\s+/g, "-").toLowerCase() === slug
            );
            if (matched) {
              setActiveCategory(matched.category);
              // Auto-scroll the mobile tab into view
              const btn = tabsRef.current?.querySelector(`[data-cat="${matched.category}"]`);
              btn?.scrollIntoView({ inline: "center", block: "nearest" });
            }
          }
        }
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );

    sections.forEach((s) => observerRef.current.observe(s));
    return () => observerRef.current?.disconnect();
  }, [menu]);

  function scrollToCategory(cat) {
    document.getElementById(catId(cat))?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveCategory(cat);
  }

  return (
    <div className="mt-2">
      {/* Mobile / tablet — horizontal scrollable tab strip */}
      <div
        ref={tabsRef}
        className="lg:hidden sticky top-16 z-30 bg-white border-b border-gray-100 flex gap-0 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {menu.map((cat) => (
          <button
            key={cat.category}
            data-cat={cat.category}
            onClick={() => scrollToCategory(cat.category)}
            className={cn(
              "shrink-0 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
              activeCategory === cat.category
                ? "border-(--swiggy-orange) text-(--swiggy-orange)"
                : "border-transparent text-(--swiggy-gray) hover:text-(--swiggy-text)"
            )}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* Main layout */}
      <div className="flex gap-0">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-56 shrink-0 self-start sticky top-20 pt-4">
          <nav className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
            {menu.map((cat) => (
              <button
                key={cat.category}
                onClick={() => scrollToCategory(cat.category)}
                className={cn(
                  "w-full text-left px-4 py-3 text-sm transition-colors border-l-2",
                  activeCategory === cat.category
                    ? "border-(--swiggy-orange) bg-white text-(--swiggy-text) font-semibold"
                    : "border-transparent text-(--swiggy-gray) hover:bg-white hover:text-(--swiggy-text)"
                )}
              >
                {cat.category}
              </button>
            ))}
          </nav>
        </aside>

        {/* Menu items */}
        <div className="flex-1 min-w-0 lg:px-8 divide-y divide-gray-100">
          {menu.map((cat) => (
            <CategoryAccordion
              key={cat.category}
              category={cat}
              restaurantId={restaurantId}
              restaurantName={restaurantName}
              onSwitchRestaurant={onSwitchRestaurant}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
