"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils/formatters";

export default function CartBar() {
  const { totalItems, totalPrice } = useCart();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-5 pointer-events-none">
      <Link
        href="/cart"
        className="pointer-events-auto flex items-center justify-between gap-6 bg-(--swiggy-orange) text-white rounded-2xl px-5 py-4 shadow-[0_8px_30px_rgba(255,82,0,0.4)] w-full max-w-md hover:bg-[#e04800] transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <span className="bg-white/20 rounded-lg px-2 py-0.5 text-sm font-bold">
            {totalItems} item{totalItems > 1 ? "s" : ""}
          </span>
          <span className="text-sm font-medium">View Cart</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold">{formatPrice(totalPrice)}</span>
          <ShoppingCart size={18} />
        </div>
      </Link>
    </div>
  );
}
