"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, MessageCircle, Phone, Mail } from "lucide-react";

const FAQS = [
  {
    q: "How do I track my order?",
    a: "After placing your order, you'll see a live tracking screen showing your order status — confirmed, being prepared, picked up, and on the way.",
  },
  {
    q: "What if my order is late?",
    a: "If your order is significantly delayed, you can contact our support team via chat or call. We'll resolve it immediately or offer a refund.",
  },
  {
    q: "Can I cancel my order?",
    a: "You can cancel within 60 seconds of placing the order. After the restaurant accepts, cancellations may incur a fee.",
  },
  {
    q: "How do I apply a coupon?",
    a: "Go to your cart and tap 'Apply coupon'. Enter a valid coupon code or pick one of the suggested codes shown.",
  },
  {
    q: "Why was my payment deducted but order not placed?",
    a: "Payments sometimes take a few minutes to reflect. If not resolved in 10 minutes, contact support — your money is safe and will be refunded.",
  },
  {
    q: "How do I change my delivery address?",
    a: "Tap the location bar at the top of the app or click 'Other' in the header to update your delivery address.",
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between py-4 text-left gap-4">
        <span className="text-sm font-semibold text-(--swiggy-text)">{q}</span>
        {open ? <ChevronUp size={18} className="text-(--swiggy-gray) shrink-0" /> : <ChevronDown size={18} className="text-(--swiggy-gray) shrink-0" />}
      </button>
      {open && <p className="text-sm text-(--swiggy-gray) leading-relaxed pb-4">{a}</p>}
    </div>
  );
}

export default function HelpPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 pb-16">
      <h1 className="text-2xl font-bold text-(--swiggy-text) mb-1">Help & Support</h1>
      <p className="text-sm text-(--swiggy-gray) mb-8">We're here to help. Find answers below or reach out to us.</p>

      {/* Contact cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { icon: MessageCircle, label: "Live Chat", sub: "Avg. reply in 2 min", color: "text-(--swiggy-orange)" },
          { icon: Phone, label: "Call Us", sub: "1800-208-9999 (toll free)", color: "text-(--swiggy-green)" },
          { icon: Mail, label: "Email", sub: "support@swiggy.com", color: "text-blue-500" },
        ].map(({ icon: Icon, label, sub, color }) => (
          <div key={label} className="bg-white rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.08)] p-5 flex items-start gap-3">
            <Icon size={22} className={color} />
            <div>
              <p className="text-sm font-bold text-(--swiggy-text)">{label}</p>
              <p className="text-xs text-(--swiggy-gray) mt-0.5">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.08)] px-6">
        <h2 className="text-base font-bold text-(--swiggy-text) pt-5 pb-2">Frequently Asked Questions</h2>
        {FAQS.map((f) => <FAQItem key={f.q} {...f} />)}
      </div>

      <p className="text-center text-xs text-(--swiggy-gray) mt-8">
        Still need help?{" "}
        <Link href="/auth/login" className="text-(--swiggy-orange) hover:underline font-medium">Sign in</Link>{" "}
        for faster support with your orders.
      </p>
    </div>
  );
}
