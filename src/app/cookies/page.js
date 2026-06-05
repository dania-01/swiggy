import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata = { title: "Cookie Policy" };

const TYPES = [
  { name: "Strictly Necessary", desc: "Required for the platform to function. Includes session cookies that keep you logged in and cart cookies that remember your items.", canDisable: false },
  { name: "Performance", desc: "Help us understand how visitors interact with the platform by collecting anonymous usage statistics. No personally identifiable information is stored.", canDisable: true },
  { name: "Functional", desc: "Remember your preferences such as delivery address, language, and past orders to personalise your experience.", canDisable: true },
  { name: "Marketing", desc: "Used to deliver relevant offers and promotions based on your browsing behaviour. Shared with trusted advertising partners.", canDisable: true },
];

export default function CookiesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pb-16">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors">
        <ChevronLeft size={16} /> Back
      </Link>
      <h1 className="text-3xl font-bold text-(--swiggy-text) mb-2">Cookie Policy</h1>
      <p className="text-sm text-gray-500 mb-4">Last updated: January 1, 2026</p>
      <p className="text-sm text-gray-600 leading-relaxed mb-8">
        Swiggy uses cookies and similar technologies to give you a better experience, analyse traffic, and serve personalised content. This page explains what cookies we use and why.
      </p>

      <div className="space-y-4">
        {TYPES.map((t) => (
          <div key={t.name} className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_6px_rgba(0,0,0,0.06)] p-5">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold text-(--swiggy-text)">{t.name}</h2>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${t.canDisable ? "bg-yellow-50 text-yellow-700" : "bg-(--swiggy-green-light) text-(--swiggy-green)"}`}>
                {t.canDisable ? "Optional" : "Always on"}
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{t.desc}</p>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-500 mt-8">
        To manage or delete cookies, visit your browser&apos;s settings. Note that disabling certain cookies may affect platform functionality.
      </p>
    </div>
  );
}
