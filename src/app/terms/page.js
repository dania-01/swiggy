import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata = { title: "Terms & Conditions" };

const SECTIONS = [
  { title: "Acceptance of Terms", body: "By accessing or using the Swiggy platform, you agree to be bound by these Terms. If you do not agree, please do not use the platform." },
  { title: "Use of the Platform", body: "You must be at least 18 years old to use Swiggy. You agree not to misuse the platform, including placing fraudulent orders, creating fake accounts, or attempting to exploit promotions." },
  { title: "Orders & Payments", body: "All orders are subject to availability and restaurant acceptance. Prices displayed are inclusive of applicable taxes. Payment is due at the time of order placement." },
  { title: "Cancellations & Refunds", body: "Orders may be cancelled within 60 seconds of placement without charge. Cancellations after restaurant confirmation may be subject to a fee. Refunds for eligible cancellations are processed within 5–7 business days." },
  { title: "Delivery", body: "Delivery times are estimates and may vary due to traffic, weather, or restaurant preparation time. Swiggy is not liable for delays beyond our reasonable control." },
  { title: "Intellectual Property", body: "All content on Swiggy — including logos, graphics, and software — is owned by Bundl Technologies Pvt. Ltd. and protected by applicable intellectual property laws." },
  { title: "Limitation of Liability", body: "Swiggy's liability for any claim arising out of your use of the platform is limited to the amount paid for the order in question." },
  { title: "Governing Law", body: "These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Bangalore, Karnataka." },
];

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pb-16">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors">
        <ChevronLeft size={16} /> Back
      </Link>
      <h1 className="text-3xl font-bold text-(--swiggy-text) mb-2">Terms & Conditions</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: January 1, 2026</p>
      <div className="space-y-8">
        {SECTIONS.map((s) => (
          <div key={s.title}>
            <h2 className="text-base font-bold text-(--swiggy-text) mb-2">{s.title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
