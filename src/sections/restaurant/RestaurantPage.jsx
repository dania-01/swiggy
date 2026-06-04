"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Clock, ChevronLeft, Bike, Search, X } from "lucide-react";
import { VegIndicator } from "@/components/ui/badge";
import { CDN_URL } from "@/lib/data/restaurants";
import { formatRating, formatDeliveryTime, formatPriceForTwo } from "@/lib/utils/formatters";
import { useCart } from "@/hooks/useCart";
import MenuSection from "./MenuSection";
import CartBar from "./CartBar";

/* ── Switch-restaurant confirmation modal ───────────────── */
function SwitchModal({ fromName, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
        <h3 className="text-base font-bold text-(--swiggy-text) mb-2">
          Start fresh order?
        </h3>
        <p className="text-sm text-(--swiggy-gray) mb-5">
          Your cart has items from <span className="font-semibold text-(--swiggy-text)">{fromName}</span>. Adding from a different restaurant will clear it.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 h-10 rounded-xl border border-gray-300 text-sm font-semibold text-(--swiggy-text) hover:bg-gray-50 transition-colors"
          >
            No, keep
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 h-10 rounded-xl bg-(--swiggy-orange) text-white text-sm font-semibold hover:bg-[#e04800] transition-colors"
          >
            Yes, start fresh
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Restaurant info header ─────────────────────────────── */
function RestaurantHeader({ restaurant }) {
  const { name, imageId, cuisines, rating, ratingCount, deliveryTime, priceForTwo, isVeg, discount, locality, areaName } = restaurant;

  return (
    <div className="bg-white">
      {/* Back nav */}
      <div className="flex items-center gap-2 py-3 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-1.5 text-sm text-(--swiggy-gray) hover:text-(--swiggy-text) transition-colors">
          <ChevronLeft size={18} />
          Back to restaurants
        </Link>
      </div>

      {/* Banner + info */}
      <div className="py-6">
        <div className="flex flex-col sm:flex-row gap-5 items-start">
          {/* Thumbnail */}
          <div className="relative w-full sm:w-48 h-36 rounded-2xl bg-gray-50 shrink-0 flex items-center justify-center overflow-hidden">
            <Image
              src={`${CDN_URL}${imageId}`}
              alt={name}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, 192px"
              priority
            />
          </div>

          {/* Details */}
          <div className="flex-1 space-y-2">
            <div className="flex items-start gap-2">
              <h1 className="text-2xl font-bold text-(--swiggy-text) leading-tight">{name}</h1>
              {isVeg !== undefined && <VegIndicator isVeg={isVeg} className="mt-1.5 shrink-0" />}
            </div>

            <p className="text-sm text-(--swiggy-gray)">{cuisines.join(", ")}</p>

            {(locality || areaName) && (
              <p className="text-xs text-(--swiggy-gray)">{[locality, areaName].filter(Boolean).join(", ")}</p>
            )}

            {/* Stats row */}
            <div className="flex items-center gap-4 pt-1 flex-wrap">
              <div className="flex items-center gap-1.5 border border-gray-200 rounded-xl px-3 py-2">
                <span className="inline-flex items-center justify-center size-5 rounded-full bg-(--swiggy-green) shrink-0">
                  <svg viewBox="0 0 12 12" fill="white" className="size-3">
                    <path d="M6 1l1.236 2.506 2.764.402-2 1.948.472 2.752L6 7.506l-2.472 1.302.472-2.752-2-1.948 2.764-.402L6 1z" />
                  </svg>
                </span>
                <div>
                  <div className="text-sm font-bold text-(--swiggy-text) leading-none">{formatRating(rating)}</div>
                  {ratingCount && <div className="text-[10px] text-(--swiggy-gray) mt-0.5">{ratingCount} ratings</div>}
                </div>
              </div>

              <div className="flex items-center gap-1.5 border border-gray-200 rounded-xl px-3 py-2">
                <Clock size={16} className="text-(--swiggy-gray)" />
                <div>
                  <div className="text-sm font-bold text-(--swiggy-text) leading-none">{formatDeliveryTime(deliveryTime)}</div>
                  <div className="text-[10px] text-(--swiggy-gray) mt-0.5">Delivery time</div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 border border-gray-200 rounded-xl px-3 py-2">
                <Bike size={16} className="text-(--swiggy-gray)" />
                <div>
                  <div className="text-sm font-bold text-(--swiggy-text) leading-none">{formatPriceForTwo(priceForTwo)}</div>
                  <div className="text-[10px] text-(--swiggy-gray) mt-0.5">Cost for two</div>
                </div>
              </div>
            </div>

            {/* Discount badge */}
            {discount && (
              <div className="inline-flex items-center gap-1.5 bg-(--swiggy-orange-light) text-(--swiggy-orange) text-xs font-bold px-3 py-1.5 rounded-lg">
                <span>{discount}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t-8 border-gray-50" />
    </div>
  );
}

/* ── Main page ──────────────────────────────────────────── */
export default function RestaurantPage({ restaurant, menu }) {
  const [switchPayload, setSwitchPayload] = useState(null);
  const [vegOnly, setVegOnly] = useState(false);
  const [menuSearch, setMenuSearch] = useState("");
  const { restaurantName: cartRestaurantName } = useCart();

  const filteredMenu = menu
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((i) => {
        const matchVeg = vegOnly ? i.isVeg : true;
        const matchSearch = menuSearch.trim()
          ? i.name.toLowerCase().includes(menuSearch.toLowerCase())
          : true;
        return matchVeg && matchSearch;
      }),
    }))
    .filter((cat) => cat.items.length > 0);

  function handleSwitchRestaurant(callback) {
    setSwitchPayload({ callback });
  }

  function confirmSwitch() {
    if (switchPayload?.callback) switchPayload.callback();
    setSwitchPayload(null);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-28">
      <RestaurantHeader restaurant={restaurant} />

      {/* Menu search + veg toggle */}
      <div className="flex items-center justify-between gap-3 py-3 border-b border-gray-100 flex-wrap">
        {/* Search input */}
        <div className="relative flex-1 max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-(--swiggy-gray) pointer-events-none" />
          <input
            type="search"
            value={menuSearch}
            onChange={(e) => setMenuSearch(e.target.value)}
            placeholder="Search within menu…"
            className="w-full h-9 pl-8 pr-8 rounded-full border border-gray-200 bg-gray-50 text-xs text-(--swiggy-text) placeholder:text-gray-400 outline-none focus:border-(--swiggy-orange) focus:bg-white transition-colors"
          />
          {menuSearch && (
            <button onClick={() => setMenuSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-(--swiggy-gray)">
              <X size={13} />
            </button>
          )}
        </div>
        <span className="text-xs font-semibold text-(--swiggy-text)">Veg Only</span>
        <button
          onClick={() => setVegOnly((v) => !v)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${vegOnly ? "bg-(--swiggy-green)" : "bg-gray-200"}`}
          role="switch"
          aria-checked={vegOnly}
        >
          <span className={`inline-block size-4 rounded-full bg-white shadow transition-transform ${vegOnly ? "translate-x-6" : "translate-x-1"}`} />
        </button>
      </div>

      {/* Menu */}
      <div className="mt-2">
        <MenuSection
          menu={filteredMenu}
          restaurantId={restaurant.id}
          restaurantName={restaurant.name}
          onSwitchRestaurant={handleSwitchRestaurant}
        />
      </div>

      {/* Sticky cart bar */}
      <CartBar />

      {/* Switch modal */}
      {switchPayload && (
        <SwitchModal
          fromName={cartRestaurantName ?? "another restaurant"}
          onConfirm={confirmSwitch}
          onCancel={() => setSwitchPayload(null)}
        />
      )}
    </div>
  );
}
