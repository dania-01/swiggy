"use client";

import Image from "next/image";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { VegIndicator } from "@/components/ui/badge";
import { CDN_URL } from "@/lib/data/restaurants";
import { formatPrice } from "@/lib/utils/formatters";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/context/ToastContext";
import { cn } from "@/lib/utils";

function AddStepper({ quantity, onAdd, onRemove }) {
  return (
    <div className="flex items-center border border-(--swiggy-green) rounded-lg overflow-hidden bg-white">
      <button
        onClick={onRemove}
        className="flex items-center justify-center w-9 h-9 text-(--swiggy-green) hover:bg-(--swiggy-green-light) transition-colors font-bold"
      >
        <Minus size={14} />
      </button>
      <span className="w-8 text-center text-sm font-bold text-(--swiggy-green)">{quantity}</span>
      <button
        onClick={onAdd}
        className="flex items-center justify-center w-9 h-9 text-(--swiggy-green) hover:bg-(--swiggy-green-light) transition-colors font-bold"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}

export default function FoodItemCard({ item, restaurantId, restaurantName, onSwitchRestaurant }) {
  const { addItem, removeItem, getItemQuantity, isFromDifferentRestaurant } = useCart();
  const { show } = useToast();
  const quantity = getItemQuantity(item.id);
  const [imgError, setImgError] = useState(false);

  function handleAdd() {
    if (isFromDifferentRestaurant(restaurantId)) {
      onSwitchRestaurant(() => { addItem(item, restaurantId, restaurantName); show(`${item.name} added to cart`); });
      return;
    }
    addItem(item, restaurantId, restaurantName);
    if (quantity === 0) show(`${item.name} added to cart`);
  }

  function handleRemove() {
    removeItem(item.id);
  }

  return (
    <div className="flex items-start justify-between gap-4 py-5 border-b border-gray-100 last:border-0">
      {/* Left: info */}
      <div className="flex-1 min-w-0 space-y-1.5">
        <VegIndicator isVeg={item.isVeg} />

        {item.isPopular && (
          <span className="inline-block text-[10px] font-bold text-amber-600 border border-amber-300 bg-amber-50 px-1.5 py-0.5 rounded uppercase tracking-wide">
            Bestseller
          </span>
        )}

        <h4 className="font-semibold text-[15px] text-(--swiggy-text) leading-snug">{item.name}</h4>
        <p className="text-sm font-semibold text-(--swiggy-text)">₹{item.price}</p>

        {item.description && (
          <p className="text-xs text-(--swiggy-gray) leading-relaxed line-clamp-2 max-w-xs">
            {item.description}
          </p>
        )}
      </div>

      {/* Right: image + add button */}
      <div className="flex flex-col items-center gap-2 shrink-0">
        <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100">
          {!imgError && item.imageId ? (
            <Image
              src={`${CDN_URL}${item.imageId}`}
              alt={item.name}
              fill
              className="object-cover"
              sizes="96px"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl bg-gray-100">
              🍽️
            </div>
          )}
        </div>

        {/* ADD / Stepper */}
        {quantity === 0 ? (
          <button
            onClick={handleAdd}
            className="w-24 h-9 rounded-lg border border-(--swiggy-green) text-(--swiggy-green) bg-white text-xs font-bold tracking-widest hover:bg-(--swiggy-green-light) transition-colors"
          >
            ADD
          </button>
        ) : (
          <AddStepper quantity={quantity} onAdd={handleAdd} onRemove={handleRemove} />
        )}
      </div>
    </div>
  );
}
