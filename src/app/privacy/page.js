import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata = { title: "Privacy Policy" };

const SECTIONS = [
  {
    title: "Information We Collect",
    body: "We collect information you provide directly — name, email, phone number, and delivery address. We also collect usage data such as pages visited, items viewed, and orders placed to improve the experience.",
  },
  {
    title: "How We Use Your Information",
    body: "Your information is used to process orders, personalise recommendations, send order updates, and improve our services. We do not sell your personal data to third parties.",
  },
  {
    title: "Data Sharing",
    body: "We share your delivery address and name with our restaurant partners and delivery executives solely to fulfil your order. All partners are bound by confidentiality agreements.",
  },
  {
    title: "Cookies",
    body: "We use cookies to keep you signed in, remember cart contents, and measure usage patterns. You can manage cookie preferences in your browser settings.",
  },
  {
    title: "Data Retention",
    body: "We retain your account data for as long as your account is active. Order history is kept for 3 years for legal and accounting purposes. You can request deletion at any time.",
  },
  {
    title: "Your Rights",
    body: "You have the right to access, correct, or delete your personal data. You may also opt out of marketing communications at any time by clicking the unsubscribe link in any email.",
  },
  {
    title: "Security",
    body: "We use industry-standard encryption (TLS) for all data in transit. Payment details are processed via PCI-DSS-compliant payment gateways and are never stored on our servers.",
  },
  {
    title: "Contact",
    body: "For privacy-related queries, reach out to privacy@swiggy.com or write to Bundl Technologies Pvt. Ltd., #686/C, 3rd Floor, 13th Cross, Indira Nagar, Bangalore — 560 038.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pb-16">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors">
        <ChevronLeft size={16} /> Back
      </Link>
      <h1 className="text-3xl font-bold text-(--swiggy-text) mb-2">Privacy Policy</h1>
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
