"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft, CheckCircle2, Clock, Bike, Store, MapPin, UtensilsCrossed,
} from "lucide-react";
import { formatPrice } from "@/lib/utils/formatters";

// Each stage's seconds from placedAt
const STAGES = [
  {
    key: "placed",
    label: "Order Placed",
    sub: "We've received your order",
    Icon: CheckCircle2,
    seconds: 0,
  },
  {
    key: "confirmed",
    label: "Restaurant Confirmed",
    sub: "Your order has been accepted",
    Icon: Store,
    seconds: 8,
  },
  {
    key: "preparing",
    label: "Being Prepared",
    sub: "The chef is cooking your food",
    Icon: UtensilsCrossed,
    seconds: 22,
  },
  {
    key: "out_for_delivery",
    label: "Out for Delivery",
    sub: "Your delivery partner is on the way",
    Icon: Bike,
    seconds: 38,
  },
  {
    key: "delivered",
    label: "Delivered",
    sub: "Enjoy your meal!",
    Icon: CheckCircle2,
    seconds: 58,
  },
];

const TOTAL_SECONDS = STAGES[STAGES.length - 1].seconds;

function getStep(placedAt) {
  const elapsed = (Date.now() - new Date(placedAt)) / 1000;
  let step = 0;
  for (let i = 0; i < STAGES.length; i++) {
    if (elapsed >= STAGES[i].seconds) step = i;
  }
  return Math.min(step, STAGES.length - 1);
}

export default function TrackOrderPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    try {
      const orders = JSON.parse(localStorage.getItem("swiggy_orders") || "[]");
      const found = orders.find((o) => String(o.id) === String(id));
      if (found) {
        setOrder(found);
        setStep(getStep(found.placedAt));
      }
    } catch {}
  }, [id]);

  useEffect(() => {
    if (!order || step >= STAGES.length - 1) return;
    const timer = setInterval(() => {
      const s = getStep(order.placedAt);
      setStep(s);
      if (s >= STAGES.length - 1) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, [order, step]);

  if (!order) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <p className="text-(--swiggy-gray) mb-4">Order not found.</p>
        <Link href="/orders" className="text-(--swiggy-orange) text-sm font-semibold">
          View all orders
        </Link>
      </div>
    );
  }

  const isDelivered = step >= STAGES.length - 1;
  const deliveredAt = new Date(new Date(order.placedAt).getTime() + TOTAL_SECONDS * 1000);
  const minsLeft = Math.max(0, Math.ceil((deliveredAt - Date.now()) / 60000));
  const elapsed = Math.min((Date.now() - new Date(order.placedAt)) / 1000, TOTAL_SECONDS);
  const progressPct = Math.round((elapsed / TOTAL_SECONDS) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 py-6 pb-16">
        {/* Back */}
        <Link
          href="/orders"
          className="inline-flex items-center gap-1.5 text-sm text-(--swiggy-gray) hover:text-(--swiggy-text) mb-6 transition-colors"
        >
          <ChevronLeft size={18} /> My Orders
        </Link>

        {/* Header card */}
        <div className="bg-white rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.08)] p-5 mb-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-(--swiggy-text) truncate">
                {order.restaurantName}
              </h1>
              <p className="text-sm text-(--swiggy-gray) mt-0.5 line-clamp-2">
                {order.items.map((i) => `${i.name} × ${i.quantity}`).join(", ")}
              </p>
            </div>
            <p className="text-sm font-bold text-(--swiggy-text) shrink-0">
              {formatPrice(order.total)}
            </p>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-(--swiggy-green) rounded-full transition-all duration-1000"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* ETA / Delivered banner */}
          {isDelivered ? (
            <div className="mt-3 flex items-center gap-2 bg-(--swiggy-green-light) rounded-xl px-4 py-3">
              <CheckCircle2 size={16} className="text-(--swiggy-green) shrink-0" />
              <p className="text-sm font-semibold text-(--swiggy-green)">
                Order Delivered! Enjoy your meal.
              </p>
            </div>
          ) : (
            <div className="mt-3 flex items-center gap-2 bg-(--swiggy-orange-light) rounded-xl px-4 py-3">
              <Clock size={16} className="text-(--swiggy-orange) shrink-0" />
              <p className="text-sm font-semibold text-(--swiggy-orange)">
                {minsLeft > 0 ? `Arriving in ~${minsLeft} min` : "Arriving any moment!"}
              </p>
            </div>
          )}
        </div>

        {/* Step tracker */}
        <div className="bg-white rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.08)] p-6 mb-4">
          <h2 className="text-base font-bold text-(--swiggy-text) mb-6">Live Tracking</h2>

          <div className="space-y-0">
            {STAGES.map(({ key, label, sub, Icon }, idx) => {
              const done = idx <= step;
              const active = idx === step && !isDelivered;

              return (
                <div key={key} className="flex items-start gap-4 relative">
                  {/* Connector */}
                  {idx < STAGES.length - 1 && (
                    <div
                      className={`absolute left-[17px] top-9 w-0.5 h-10 transition-colors duration-700 ${
                        idx < step ? "bg-(--swiggy-green)" : "bg-gray-200"
                      }`}
                    />
                  )}

                  {/* Circle */}
                  <div
                    className={`size-[35px] rounded-full flex items-center justify-center shrink-0 z-10 transition-all duration-500 ${
                      done
                        ? "bg-(--swiggy-green)"
                        : "bg-gray-100"
                    } ${active ? "ring-2 ring-(--swiggy-green) ring-offset-2" : ""}`}
                  >
                    <Icon
                      size={15}
                      className={done ? "text-white" : "text-gray-400"}
                    />
                  </div>

                  {/* Label */}
                  <div className="pb-10 pt-1">
                    <p
                      className={`text-sm font-semibold leading-tight ${
                        done ? "text-(--swiggy-text)" : "text-gray-400"
                      }`}
                    >
                      {label}
                      {active && (
                        <span className="ml-2 inline-flex items-center gap-1 text-xs font-normal text-(--swiggy-orange)">
                          <span className="size-1.5 rounded-full bg-(--swiggy-orange) animate-pulse" />
                          In progress
                        </span>
                      )}
                    </p>
                    <p
                      className={`text-xs mt-0.5 ${
                        done ? "text-(--swiggy-gray)" : "text-gray-300"
                      }`}
                    >
                      {sub}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Delivery address */}
        <div className="bg-white rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.08)] px-5 py-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-full bg-(--swiggy-orange-light) flex items-center justify-center shrink-0">
              <MapPin size={18} className="text-(--swiggy-orange)" />
            </div>
            <div>
              <p className="text-sm font-semibold text-(--swiggy-text)">Delivering to</p>
              <p className="text-xs text-(--swiggy-gray)">{order.address}</p>
            </div>
          </div>
        </div>

        {/* CTA after delivery */}
        {isDelivered && (
          <Link
            href="/"
            className="block w-full text-center bg-(--swiggy-orange) text-white font-bold py-4 rounded-2xl text-sm hover:bg-[#e04800] transition-colors shadow-[0_4px_16px_rgba(255,82,0,0.25)]"
          >
            Order again →
          </Link>
        )}
      </div>
    </div>
  );
}
