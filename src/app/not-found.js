import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="mb-6">
        <div className="size-20 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "#FF5200" }}>
          <svg viewBox="0 0 24 24" fill="none" className="size-10">
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
              fill="white"
            />
          </svg>
        </div>
        <h1 className="text-6xl font-bold text-(--swiggy-orange) mb-2">404</h1>
        <h2 className="text-2xl font-bold text-(--swiggy-text) mb-2">Page not found</h2>
        <p className="text-sm text-(--swiggy-gray) max-w-xs mx-auto">
          Looks like this page went out for delivery and never came back.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 bg-(--swiggy-orange) text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#e04800] transition-colors"
        >
          <Home size={16} />
          Go Home
        </Link>
        <Link
          href="/search"
          className="flex items-center gap-2 border border-gray-200 text-(--swiggy-text) px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
        >
          <Search size={16} />
          Search
        </Link>
      </div>
    </div>
  );
}
