"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Minus, Plus, ChevronLeft, ShoppingBag, MapPin, Tag, ChevronRight, X, CheckCircle2, Ticket, Clock } from "lucide-react";
import { VegIndicator } from "@/components/ui/badge";
import { CDN_URL } from "@/lib/data/restaurants";
import { formatPrice } from "@/lib/utils/formatters";
import { useCart } from "@/hooks/useCart";
import { useLocation } from "@/context/LocationContext";

const COUPONS = {
  SWIGGY50:  { discount: 0.50, max: 100, label: "50% off up to ₹100" },
  WELCOME20: { discount: 0.20, max: 60,  label: "20% off up to ₹60" },
  SAVE100:   { discount: 0,    flat: 100, label: "Flat ₹100 off" },
  FLAT30:    { discount: 0.30, max: 80,  label: "30% off up to ₹80" },
  FREEDEL:   { discount: 0,    flat: 30,  label: "Free delivery" },
};

/* ── Stepper ──────────────────────────────────────────────── */
function Stepper({ quantity, onAdd, onRemove }) {
  return (
    <div className="flex items-center border border-(--swiggy-green) rounded-lg overflow-hidden bg-white">
      <button onClick={onRemove} className="flex items-center justify-center w-8 h-8 text-(--swiggy-green) hover:bg-(--swiggy-green-light) transition-colors">
        <Minus size={13} />
      </button>
      <span className="w-7 text-center text-sm font-bold text-(--swiggy-green)">{quantity}</span>
      <button onClick={onAdd} className="flex items-center justify-center w-8 h-8 text-(--swiggy-green) hover:bg-(--swiggy-green-light) transition-colors">
        <Plus size={13} />
      </button>
    </div>
  );
}

/* ── Cart item row ────────────────────────────────────────── */
function CartItem({ item }) {
  const { addItem, removeItem, restaurantId, restaurantName } = useCart();
  return (
    <div className="flex items-center gap-3 py-4 border-b border-gray-100 last:border-0">
      <div className="relative size-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
        {item.imageId ? (
          <Image src={`${CDN_URL}${item.imageId}`} alt={item.name} fill className="object-cover" sizes="64px" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xl bg-gray-100" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <VegIndicator isVeg={item.isVeg} />
          <h4 className="text-sm font-semibold text-(--swiggy-text) line-clamp-1">{item.name}</h4>
        </div>
        <p className="text-sm font-bold text-(--swiggy-text)">{formatPrice(item.price * item.quantity)}</p>
        {item.quantity > 1 && <p className="text-xs text-(--swiggy-gray)">{formatPrice(item.price)} each</p>}
      </div>
      <Stepper
        quantity={item.quantity}
        onAdd={() => addItem(item, restaurantId, restaurantName)}
        onRemove={() => removeItem(item.id)}
      />
    </div>
  );
}

/* ── Coupon section ───────────────────────────────────────── */
function CouponSection({ coupon, onApply, onRemove }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  function handleApply() {
    const code = input.trim().toUpperCase();
    if (!code) { setError("Enter a coupon code"); return; }
    if (COUPONS[code]) {
      onApply(code, COUPONS[code]);
      setError("");
      setOpen(false);
      setInput("");
    } else {
      setError("Invalid coupon code");
    }
  }

  if (coupon) {
    return (
      <div className="bg-white rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.08)] px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-full bg-(--swiggy-green-light) flex items-center justify-center shrink-0">
              <Ticket size={18} className="text-(--swiggy-green)" />
            </div>
            <div>
              <p className="text-sm font-semibold text-(--swiggy-green)">{coupon.code} applied!</p>
              <p className="text-xs text-(--swiggy-gray)">{COUPONS[coupon.code]?.label}</p>
            </div>
          </div>
          <button onClick={onRemove} className="text-(--swiggy-gray) hover:text-red-500 transition-colors">
            <X size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.08)] overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full px-5 py-4"
      >
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-full bg-(--swiggy-orange-light) flex items-center justify-center shrink-0">
            <Tag size={18} className="text-(--swiggy-orange)" />
          </div>
          <p className="text-sm font-semibold text-(--swiggy-text)">Apply coupon</p>
        </div>
        <ChevronRight size={18} className={`text-(--swiggy-gray) transition-transform ${open ? "rotate-90" : ""}`} />
      </button>

      {open && (
        <div className="px-5 pb-4 border-t border-gray-100">
          <div className="flex gap-2 mt-3">
            <input
              value={input}
              onChange={(e) => { setInput(e.target.value.toUpperCase()); setError(""); }}
              placeholder="Enter coupon code"
              className="flex-1 h-10 px-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-(--swiggy-orange) transition-colors uppercase font-mono tracking-wider"
            />
            <button
              onClick={handleApply}
              className="px-4 h-10 rounded-xl bg-(--swiggy-orange) text-white text-sm font-bold hover:bg-[#e04800] transition-colors"
            >
              Apply
            </button>
          </div>
          {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.keys(COUPONS).map((code) => (
              <button
                key={code}
                onClick={() => { setInput(code); setError(""); }}
                className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg border border-dashed border-(--swiggy-orange) text-(--swiggy-orange) hover:bg-(--swiggy-orange-light) transition-colors"
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Bill details ─────────────────────────────────────────── */
function BillDetails({ totalPrice, coupon }) {
  const couponDiscount = coupon
    ? COUPONS[coupon.code]?.flat
      ? Math.min(COUPONS[coupon.code].flat, totalPrice)
      : Math.min(Math.round(totalPrice * COUPONS[coupon.code].discount), COUPONS[coupon.code].max)
    : 0;
  const afterCoupon = totalPrice - couponDiscount;
  const deliveryFee = afterCoupon >= 299 ? 0 : 30;
  const platformFee = 5;
  const gst = Math.round(afterCoupon * 0.05);
  const grandTotal = afterCoupon + deliveryFee + platformFee + gst;

  return { deliveryFee, platformFee, gst, grandTotal, couponDiscount, afterCoupon };
}

/* ── Checkout button ──────────────────────────────────────── */
function CheckoutButton({ totalPrice, coupon, onPlace }) {
  const { grandTotal } = BillDetails({ totalPrice, coupon });
  return (
    <button
      onClick={onPlace}
      className="w-full mt-6 h-14 rounded-2xl bg-(--swiggy-orange) text-white font-bold text-base hover:bg-[#e04800] active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(255,82,0,0.3)]"
    >
      Proceed to pay · {formatPrice(grandTotal)}
    </button>
  );
}

/* ── Order placed screen ──────────────────────────────────── */
function OrderPlacedScreen({ restaurantName, total }) {
  return (
    <div className="max-w-md mx-auto py-20 px-4 text-center space-y-5">
      <div className="flex justify-center">
        <div className="size-24 rounded-full bg-(--swiggy-green-light) flex items-center justify-center">
          <CheckCircle2 size={52} className="text-(--swiggy-green)" strokeWidth={1.5} />
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-(--swiggy-text)">Order Placed!</h2>
        <p className="text-(--swiggy-gray) text-sm mt-1">
          Your order from <span className="font-semibold text-(--swiggy-text)">{restaurantName}</span> is confirmed.
        </p>
      </div>
      <div className="bg-white rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.08)] p-5 text-left space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <CheckCircle2 size={18} className="text-(--swiggy-green) shrink-0" />
          <span className="text-(--swiggy-text) font-medium">Payment of <strong>{formatPrice(total)}</strong> received</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Clock size={18} className="text-(--swiggy-orange) shrink-0" />
          <span className="text-(--swiggy-text)">Estimated delivery: <strong>30–45 mins</strong></span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <MapPin size={18} className="text-(--swiggy-gray) shrink-0" />
          <span className="text-(--swiggy-gray)">Delivering to your saved address</span>
        </div>
      </div>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-(--swiggy-orange) text-white px-7 py-3 rounded-xl font-bold text-sm hover:bg-[#e04800] transition-colors"
      >
        Order more food →
      </Link>
    </div>
  );
}

/* ── Bill card ────────────────────────────────────────────── */
function BillCard({ totalPrice, coupon }) {
  const { deliveryFee, platformFee, gst, grandTotal, couponDiscount } = BillDetails({ totalPrice, coupon });

  return (
    <div className="bg-white rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.08)] p-5">
      <h3 className="text-base font-bold text-(--swiggy-text) mb-3">Bill Details</h3>
      <div className="divide-y divide-gray-100 text-sm">
        <div className="pb-3 space-y-2">
          <div className="flex justify-between text-(--swiggy-gray)"><span>Item Total</span><span className="text-(--swiggy-text)">{formatPrice(totalPrice)}</span></div>
          {couponDiscount > 0 && (
            <div className="flex justify-between text-(--swiggy-green) font-medium"><span>Coupon Discount</span><span>− {formatPrice(couponDiscount)}</span></div>
          )}
          <div className="flex justify-between text-(--swiggy-gray)">
            <span>Delivery Fee</span>
            <span className={deliveryFee === 0 ? "text-(--swiggy-green) font-semibold" : "text-(--swiggy-text)"}>{deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}</span>
          </div>
        </div>
        <div className="py-3 space-y-2">
          <div className="flex justify-between text-(--swiggy-gray)"><span>Platform Fee</span><span className="text-(--swiggy-text)">{formatPrice(platformFee)}</span></div>
          <div className="flex justify-between text-(--swiggy-gray)"><span>GST & Charges</span><span className="text-(--swiggy-text)">{formatPrice(gst)}</span></div>
        </div>
        <div className="pt-3 flex justify-between font-bold text-(--swiggy-text) text-base">
          <span>To Pay</span><span>{formatPrice(grandTotal)}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Empty cart ───────────────────────────────────────────── */
function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <ShoppingBag size={64} className="text-gray-200 mb-4" />
      <h2 className="text-xl font-bold text-(--swiggy-text) mb-2">Your cart is empty</h2>
      <p className="text-sm text-(--swiggy-gray) mb-6 max-w-xs">Looks like you haven&apos;t added anything yet.</p>
      <Link href="/" className="inline-flex items-center gap-2 bg-(--swiggy-orange) text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#e04800] transition-colors">
        Browse Restaurants
      </Link>
    </div>
  );
}

/* ── Main ─────────────────────────────────────────────────── */
export default function CartPage() {
  const { items, restaurantName, totalPrice, clearCart } = useCart();
  const { location } = useLocation();
  const [coupon, setCoupon] = useState(null);
  const [placed, setPlaced] = useState(false);
  const [placedMeta, setPlacedMeta] = useState(null);

  function handlePlace() {
    const { grandTotal } = BillDetails({ totalPrice, coupon });
    setPlacedMeta({ restaurantName, total: grandTotal });
    setPlaced(true);
    clearCart();
    setCoupon(null);
  }

  if (placed && placedMeta) {
    return (
      <div className="min-h-screen bg-gray-50">
        <OrderPlacedScreen restaurantName={placedMeta.restaurantName} total={placedMeta.total} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-(--swiggy-gray) hover:text-(--swiggy-text) transition-colors mb-6">
          <ChevronLeft size={18} />Back to restaurants
        </Link>

        {items.length === 0 ? <EmptyCart /> : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">
            {/* Left */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.08)] px-5 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-(--swiggy-gray) uppercase tracking-wide mb-0.5">Order from</p>
                    <h2 className="text-base font-bold text-(--swiggy-text)">{restaurantName}</h2>
                  </div>
                  <button onClick={clearCart} className="text-xs font-semibold text-(--swiggy-orange) hover:underline">Clear cart</button>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.08)] px-5">
                {items.map((item) => <CartItem key={item.id} item={item} />)}
              </div>

              {/* Delivery address — from LocationContext */}
              <div className="bg-white rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.08)] px-5 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-full bg-(--swiggy-orange-light) flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-(--swiggy-orange)" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-(--swiggy-text)">Delivering to</p>
                      <p className="text-xs text-(--swiggy-gray) truncate max-w-64">
                        {location.sublabel || location.label}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-(--swiggy-gray)" />
                </div>
              </div>

              <CouponSection
                coupon={coupon}
                onApply={(code, data) => setCoupon({ code, ...data })}
                onRemove={() => setCoupon(null)}
              />
            </div>

            {/* Right */}
            <div className="space-y-4 lg:sticky lg:top-20">
              <BillCard totalPrice={totalPrice} coupon={coupon} />
              <CheckoutButton totalPrice={totalPrice} coupon={coupon} onPlace={handlePlace} />
              <p className="text-center text-xs text-(--swiggy-gray)">Review your order before placing.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
