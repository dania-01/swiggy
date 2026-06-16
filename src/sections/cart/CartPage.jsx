"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Minus, Plus, ChevronLeft, ShoppingBag, MapPin, Tag, ChevronRight,
  X, Ticket, CreditCard, Banknote, Eye, EyeOff,
} from "lucide-react";
import { VegIndicator } from "@/components/ui/badge";
import { CDN_URL } from "@/lib/data/restaurants";
import { formatPrice } from "@/lib/utils/formatters";
import { useCart } from "@/hooks/useCart";
import { useLocation } from "@/context/LocationContext";
import { useOrders } from "@/hooks/useOrders";

const COUPONS = {
  SWIGGY50:  { discount: 0.50, max: 100,  label: "50% off up to ₹100" },
  WELCOME20: { discount: 0.20, max: 60,   label: "20% off up to ₹60"  },
  FLAT100:   { discount: 0,    flat: 100,  minOrder: 399, label: "Flat ₹100 off above ₹399" },
  FLAT30:    { discount: 0.30, max: 80,   label: "30% off up to ₹80"  },
  FREEDEL:   { discount: 0,    freeDelivery: true, label: "Free delivery" },
};

const UPI_APPS = [
  { id: "gpay",    label: "GPay",    initials: "G",  bg: "#e8f0fe", color: "#1a73e8" },
  { id: "phonepe", label: "PhonePe", initials: "Pe", bg: "#ede7f6", color: "#5f259f" },
  { id: "paytm",   label: "Paytm",   initials: "Pa", bg: "#e3f2fd", color: "#002970" },
];

/* ── Bill helper ──────────────────────────────────────────── */
function calcBill({ totalPrice, coupon }) {
  const c = coupon ? COUPONS[coupon.code] : null;
  const couponDiscount = c
    ? c.freeDelivery ? 0
    : c.flat ? (c.minOrder && totalPrice < c.minOrder ? 0 : Math.min(c.flat, totalPrice))
    : Math.min(Math.round(totalPrice * c.discount), c.max)
    : 0;
  const afterCoupon = totalPrice - couponDiscount;
  const freeDelivery = c?.freeDelivery || afterCoupon >= 299;
  const deliveryFee = freeDelivery ? 0 : 30;
  const platformFee = 5;
  const gst = Math.round(afterCoupon * 0.05);
  const grandTotal = afterCoupon + deliveryFee + platformFee + gst;
  return { deliveryFee, platformFee, gst, grandTotal, couponDiscount, afterCoupon };
}

/* ── Step indicator ───────────────────────────────────────── */
function StepIndicator({ current }) {
  const steps = ["Cart", "Address", "Payment"];
  return (
    <div className="flex items-center gap-2 mb-6">
      {steps.map((s, i) => {
        const active = i === current;
        const done = i < current;
        return (
          <div key={s} className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 text-xs font-semibold ${active ? "text-(--swiggy-orange)" : done ? "text-(--swiggy-green)" : "text-gray-400"}`}>
              <span className={`size-5 rounded-full flex items-center justify-center text-[10px] font-bold ${active ? "bg-(--swiggy-orange) text-white" : done ? "bg-(--swiggy-green) text-white" : "bg-gray-200 text-gray-500"}`}>
                {done ? "✓" : i + 1}
              </span>
              {s}
            </div>
            {i < steps.length - 1 && (
              <div className={`h-px w-6 ${done ? "bg-(--swiggy-green)" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

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
          <div className="w-full h-full bg-gray-100" />
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

/* ── Bill card ────────────────────────────────────────────── */
function BillCard({ totalPrice, coupon }) {
  const { deliveryFee, platformFee, gst, grandTotal, couponDiscount } = calcBill({ totalPrice, coupon });
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

/* ── Address Step ─────────────────────────────────────────── */
function AddressStep({ savedAddress, onNext, onBack }) {
  const [useCustom, setUseCustom] = useState(false);
  const [custom, setCustom] = useState("");

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <StepIndicator current={1} />
      <h2 className="text-xl font-bold text-(--swiggy-text)">Confirm Delivery Address</h2>

      {/* Saved address */}
      <button
        onClick={() => setUseCustom(false)}
        className={`w-full text-left bg-white rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.08)] p-5 border-2 transition-colors ${!useCustom ? "border-(--swiggy-green)" : "border-transparent"}`}
      >
        <div className="flex items-start gap-3">
          <div className={`mt-0.5 size-5 rounded-full border-2 flex items-center justify-center shrink-0 ${!useCustom ? "border-(--swiggy-green)" : "border-gray-300"}`}>
            {!useCustom && <div className="size-2.5 rounded-full bg-(--swiggy-green)" />}
          </div>
          <div>
            <p className="text-sm font-semibold text-(--swiggy-text)">Current location</p>
            <p className="text-xs text-(--swiggy-gray) mt-0.5">{savedAddress}</p>
          </div>
        </div>
      </button>

      {/* Custom address */}
      <div className={`bg-white rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.08)] overflow-hidden border-2 transition-colors ${useCustom ? "border-(--swiggy-green)" : "border-transparent"}`}>
        <button
          onClick={() => setUseCustom(true)}
          className="flex items-center gap-3 w-full px-5 py-4"
        >
          <div className={`size-5 rounded-full border-2 flex items-center justify-center shrink-0 ${useCustom ? "border-(--swiggy-green)" : "border-gray-300"}`}>
            {useCustom && <div className="size-2.5 rounded-full bg-(--swiggy-green)" />}
          </div>
          <p className="text-sm font-semibold text-(--swiggy-text)">Enter a different address</p>
        </button>
        {useCustom && (
          <div className="px-5 pb-5">
            <input
              autoFocus
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="House no., Street, Area, City…"
              className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-(--swiggy-orange) transition-colors"
            />
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          onClick={onBack}
          className="h-14 px-6 rounded-2xl border border-gray-200 text-(--swiggy-text) font-semibold text-sm hover:bg-gray-50 transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={() => onNext(useCustom && custom.trim() ? custom.trim() : savedAddress)}
          disabled={useCustom && !custom.trim()}
          className="flex-1 h-14 rounded-2xl bg-(--swiggy-orange) text-white font-bold text-base hover:bg-[#e04800] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_4px_16px_rgba(255,82,0,0.25)]"
        >
          Deliver Here →
        </button>
      </div>
    </div>
  );
}

/* ── Card form ────────────────────────────────────────────── */
function CardForm({ selected, onSelect }) {
  const [num, setNum] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [showCvv, setShowCvv] = useState(false);

  function fmtCard(v) {
    return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  }
  function fmtExpiry(v) {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  }

  return (
    <div>
      <button
        onClick={() => onSelect("card")}
        className={`flex items-center gap-3 w-full px-5 py-4 transition-colors ${selected === "card" ? "bg-(--swiggy-orange-light)" : "hover:bg-gray-50"}`}
      >
        <div className={`size-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selected === "card" ? "border-(--swiggy-orange)" : "border-gray-300"}`}>
          {selected === "card" && <div className="size-2.5 rounded-full bg-(--swiggy-orange)" />}
        </div>
        <CreditCard size={18} className="text-(--swiggy-gray)" />
        <p className="text-sm font-semibold text-(--swiggy-text)">Credit / Debit Card</p>
      </button>

      {selected === "card" && (
        <div className="px-5 pb-5 space-y-3">
          <input
            value={num}
            onChange={(e) => setNum(fmtCard(e.target.value))}
            placeholder="Card number"
            className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-(--swiggy-orange) font-mono tracking-wider transition-colors"
          />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name on card"
            className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-(--swiggy-orange) transition-colors"
          />
          <div className="flex gap-3">
            <input
              value={expiry}
              onChange={(e) => setExpiry(fmtExpiry(e.target.value))}
              placeholder="MM/YY"
              className="flex-1 h-10 px-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-(--swiggy-orange) font-mono transition-colors"
            />
            <div className="relative flex-1">
              <input
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                type={showCvv ? "text" : "password"}
                placeholder="CVV"
                className="w-full h-10 pl-3 pr-9 rounded-xl border border-gray-200 text-sm outline-none focus:border-(--swiggy-orange) font-mono transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowCvv((v) => !v)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCvv ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Payment Step ─────────────────────────────────────────── */
function PaymentStep({ totalPrice, coupon, address, onPay, onBack }) {
  const { grandTotal } = calcBill({ totalPrice, coupon });
  const [method, setMethod] = useState(null);
  const [upiId, setUpiId] = useState("");

  const canPay = method === "upi_id" ? upiId.trim().includes("@") : !!method;

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <StepIndicator current={2} />
      <h2 className="text-xl font-bold text-(--swiggy-text)">Choose Payment</h2>

      {/* Mini order summary */}
      <div className="bg-white rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.08)] px-5 py-3 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-(--swiggy-gray) min-w-0">
          <MapPin size={14} className="shrink-0" />
          <span className="truncate">{address}</span>
        </div>
        <span className="font-bold text-(--swiggy-text) shrink-0 ml-4">{formatPrice(grandTotal)}</span>
      </div>

      {/* UPI apps */}
      <div className="bg-white rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.08)] overflow-hidden">
        <p className="px-5 pt-4 pb-2 text-xs font-semibold text-(--swiggy-gray) uppercase tracking-wide">UPI</p>
        <div className="grid grid-cols-4 gap-3 px-5 pb-4">
          {UPI_APPS.map(({ id, label, initials, bg, color }) => (
            <button
              key={id}
              onClick={() => setMethod(id)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${method === id ? "border-(--swiggy-orange)" : "border-transparent bg-gray-50 hover:bg-gray-100"}`}
            >
              <span
                className="size-10 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: bg, color }}
              >
                {initials}
              </span>
              <span className="text-xs font-medium text-(--swiggy-text)">{label}</span>
            </button>
          ))}
          {/* UPI ID tile */}
          <button
            onClick={() => setMethod("upi_id")}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${method === "upi_id" ? "border-(--swiggy-orange)" : "border-transparent bg-gray-50 hover:bg-gray-100"}`}
          >
            <span className="size-10 rounded-full bg-(--swiggy-orange-light) flex items-center justify-center text-xs font-bold text-(--swiggy-orange)">
              ID
            </span>
            <span className="text-xs font-medium text-(--swiggy-text)">UPI ID</span>
          </button>
        </div>
        {method === "upi_id" && (
          <div className="px-5 pb-4 border-t border-gray-100 pt-3">
            <input
              autoFocus
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="yourname@upi"
              className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-(--swiggy-orange) transition-colors"
            />
            {upiId && !upiId.includes("@") && (
              <p className="text-xs text-red-500 mt-1.5">Enter a valid UPI ID (e.g. name@upi)</p>
            )}
          </div>
        )}
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.08)] overflow-hidden">
        <p className="px-5 pt-4 pb-2 text-xs font-semibold text-(--swiggy-gray) uppercase tracking-wide">Cards</p>
        <div className="border-t border-gray-100">
          <CardForm selected={method} onSelect={setMethod} />
        </div>
      </div>

      {/* COD */}
      <div className="bg-white rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.08)] overflow-hidden">
        <button
          onClick={() => setMethod("cod")}
          className={`flex items-center gap-3 w-full px-5 py-4 transition-colors ${method === "cod" ? "bg-(--swiggy-orange-light)" : "hover:bg-gray-50"}`}
        >
          <div className={`size-5 rounded-full border-2 flex items-center justify-center shrink-0 ${method === "cod" ? "border-(--swiggy-orange)" : "border-gray-300"}`}>
            {method === "cod" && <div className="size-2.5 rounded-full bg-(--swiggy-orange)" />}
          </div>
          <Banknote size={18} className="text-(--swiggy-gray)" />
          <div className="text-left">
            <p className="text-sm font-semibold text-(--swiggy-text)">Cash on Delivery</p>
            <p className="text-xs text-(--swiggy-gray)">Pay when your order arrives</p>
          </div>
        </button>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          onClick={onBack}
          className="h-14 px-6 rounded-2xl border border-gray-200 text-(--swiggy-text) font-semibold text-sm hover:bg-gray-50 transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={() => canPay && onPay(method, address)}
          disabled={!canPay}
          className="flex-1 h-14 rounded-2xl bg-(--swiggy-orange) text-white font-bold text-base hover:bg-[#e04800] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_4px_16px_rgba(255,82,0,0.25)]"
        >
          {method === "cod" ? "Place Order" : `Pay ${formatPrice(grandTotal)}`}
        </button>
      </div>
    </div>
  );
}

/* ── Main ─────────────────────────────────────────────────── */
export default function CartPage() {
  const { items, restaurantId, restaurantName, totalPrice, clearCart } = useCart();
  const { location } = useLocation();
  const { addOrder } = useOrders();
  const router = useRouter();
  const [coupon, setCoupon] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState(null); // null | "address" | "payment"
  const [checkoutAddress, setCheckoutAddress] = useState("");

  const savedAddress = location.sublabel || location.label;

  function handlePlace(paymentMethod, address) {
    const { grandTotal } = calcBill({ totalPrice, coupon });
    const order = {
      id: Date.now(),
      restaurantId,
      restaurantName,
      items: items.map((i) => ({ name: i.name, price: i.price, quantity: i.quantity })),
      total: grandTotal,
      coupon: coupon?.code || null,
      address,
      paymentMethod,
      placedAt: new Date().toISOString(),
    };
    addOrder(order);
    clearCart();
    setCoupon(null);
    setCheckoutStep(null);
    router.push(`/orders/${order.id}`);
  }

  /* Checkout steps replace the cart view */
  if (checkoutStep === "address") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <AddressStep
            savedAddress={savedAddress}
            onNext={(addr) => { setCheckoutAddress(addr); setCheckoutStep("payment"); }}
            onBack={() => setCheckoutStep(null)}
          />
        </div>
      </div>
    );
  }

  if (checkoutStep === "payment") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <PaymentStep
            totalPrice={totalPrice}
            coupon={coupon}
            address={checkoutAddress}
            onPay={handlePlace}
            onBack={() => setCheckoutStep("address")}
          />
        </div>
      </div>
    );
  }

  /* Normal cart view */
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-(--swiggy-gray) hover:text-(--swiggy-text) transition-colors mb-6">
          <ChevronLeft size={18} />Back to restaurants
        </Link>

        {items.length === 0 ? <EmptyCart /> : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">
            {/* Left column */}
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

              <div className="bg-white rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.08)] px-5 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-full bg-(--swiggy-orange-light) flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-(--swiggy-orange)" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-(--swiggy-text)">Delivering to</p>
                      <p className="text-xs text-(--swiggy-gray) truncate max-w-64">{savedAddress}</p>
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

            {/* Right column */}
            <div className="space-y-4 lg:sticky lg:top-20">
              <BillCard totalPrice={totalPrice} coupon={coupon} />
              <button
                onClick={() => setCheckoutStep("address")}
                className="w-full h-14 rounded-2xl bg-(--swiggy-orange) text-white font-bold text-base hover:bg-[#e04800] active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(255,82,0,0.3)]"
              >
                Proceed to pay · {formatPrice(calcBill({ totalPrice, coupon }).grandTotal)}
              </button>
              <p className="text-center text-xs text-(--swiggy-gray)">Review your order before placing.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
