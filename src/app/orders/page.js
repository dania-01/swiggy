"use client";

import Link from "next/link";
import { ChevronLeft, ShoppingBag, CheckCircle2, Clock, MapPin, Tag } from "lucide-react";
import { useOrders } from "@/hooks/useOrders";
import { formatPrice } from "@/lib/utils/formatters";

function timeAgo(iso) {
  const diff = (Date.now() - new Date(iso)) / 1000;
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function OrderCard({ order }) {
  return (
    <div className="bg-white rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.08)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div>
          <h3 className="text-base font-bold text-(--swiggy-text)">{order.restaurantName}</h3>
          <p className="text-xs text-(--swiggy-gray) mt-0.5">{timeAgo(order.placedAt)}</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-(--swiggy-green)">
          <CheckCircle2 size={14} />
          Delivered
        </div>
      </div>

      {/* Items */}
      <div className="px-5 py-3 border-b border-gray-100">
        <p className="text-sm text-(--swiggy-text)">
          {order.items.map((i) => `${i.name} × ${i.quantity}`).join(", ")}
        </p>
      </div>

      {/* Meta */}
      <div className="px-5 py-3 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-4 text-xs text-(--swiggy-gray)">
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {order.address?.slice(0, 30)}{order.address?.length > 30 ? "…" : ""}
          </span>
          {order.coupon && (
            <span className="flex items-center gap-1 text-(--swiggy-green)">
              <Tag size={12} />
              {order.coupon}
            </span>
          )}
        </div>
        <p className="text-sm font-bold text-(--swiggy-text)">{formatPrice(order.total)}</p>
      </div>

      {/* Reorder */}
      <div className="px-5 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 border border-(--swiggy-orange) text-(--swiggy-orange) text-xs font-bold px-4 py-2 rounded-xl hover:bg-(--swiggy-orange-light) transition-colors"
        >
          Reorder
        </Link>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const { orders } = useOrders();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 pb-16">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-(--swiggy-gray) hover:text-(--swiggy-text) mb-6 transition-colors">
        <ChevronLeft size={18} />
        Back
      </Link>

      <h1 className="text-2xl font-bold text-(--swiggy-text) mb-6">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="py-24 text-center">
          <ShoppingBag size={56} className="mx-auto text-gray-200 mb-4" />
          <h2 className="text-lg font-bold text-(--swiggy-text) mb-1">No orders yet</h2>
          <p className="text-sm text-(--swiggy-gray) mb-6">Your order history will appear here.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-(--swiggy-orange) text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#e04800] transition-colors">
            Browse Restaurants
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
