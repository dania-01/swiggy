import Link from "next/link";
import { Briefcase, Users, Clock, Shield } from "lucide-react";

const PERKS = [
  { icon: Briefcase, title: "Centralized billing", desc: "One invoice for your entire team's food orders every month." },
  { icon: Users, title: "Team accounts", desc: "Add unlimited employees and set individual spending limits." },
  { icon: Clock, title: "Scheduled meals", desc: "Pre-schedule breakfast, lunch, or dinner for your office." },
  { icon: Shield, title: "Compliance-ready", desc: "GST invoices, audit trails and expense tagging built in." },
];

export default function CorporatePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 pb-16">
      {/* Hero */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 bg-(--swiggy-orange-light) text-(--swiggy-orange) text-xs font-bold px-3 py-1.5 rounded-full mb-4">
          <Briefcase size={14} />
          SWIGGY FOR BUSINESS
        </div>
        <h1 className="text-4xl font-bold text-(--swiggy-text) leading-tight mb-4">
          Feed your team,<br />
          <span style={{ color: "#FF5200" }}>delight your people</span>
        </h1>
        <p className="text-base text-(--swiggy-gray) max-w-xl mx-auto leading-relaxed">
          Swiggy Corporate makes it easy to manage food for your entire company — from daily lunches to client meetings.
        </p>
        <div className="flex items-center justify-center gap-3 mt-7">
          <Link href="/auth/signup" className="bg-(--swiggy-orange) text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#e04800] transition-colors shadow-[0_4px_14px_rgba(255,82,0,0.3)]">
            Get started free
          </Link>
          <Link href="/help" className="border border-gray-300 text-(--swiggy-text) px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors">
            Talk to sales
          </Link>
        </div>
      </div>

      {/* Perks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
        {PERKS.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-white rounded-2xl shadow-[0_1px_8px_rgba(0,0,0,0.08)] p-5">
            <div className="size-10 rounded-xl bg-(--swiggy-orange-light) flex items-center justify-center mb-3">
              <Icon size={20} className="text-(--swiggy-orange)" />
            </div>
            <h3 className="text-sm font-bold text-(--swiggy-text) mb-1">{title}</h3>
            <p className="text-xs text-(--swiggy-gray) leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 sm:p-10 text-white text-center">
        <h2 className="text-2xl font-bold mb-8">Trusted by 10,000+ companies</h2>
        <div className="grid grid-cols-3 gap-6">
          {[["10K+", "Companies"], ["5M+", "Orders/month"], ["500+", "Cities"]].map(([val, label]) => (
            <div key={label}>
              <p className="text-3xl font-bold">{val}</p>
              <p className="text-white/70 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
