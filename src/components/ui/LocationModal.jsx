"use client";

import { useState } from "react";
import { MapPin, Navigation, X, Search, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const PRESET_LOCATIONS = [
  { label: "Connaught Place", sublabel: "New Delhi, Delhi", city: "Delhi" },
  { label: "Koramangala", sublabel: "Bangalore, Karnataka", city: "Bangalore" },
  { label: "Bandra West", sublabel: "Mumbai, Maharashtra", city: "Mumbai" },
  { label: "Jubilee Hills", sublabel: "Hyderabad, Telangana", city: "Hyderabad" },
  { label: "Anna Nagar", sublabel: "Chennai, Tamil Nadu", city: "Chennai" },
  { label: "Vastrapur", sublabel: "Ahmedabad, Gujarat", city: "Ahmedabad" },
];

export default function LocationModal({ onClose, onSelect }) {
  const [search, setSearch] = useState("");
  const [detecting, setDetecting] = useState(false);
  const [error, setError] = useState("");

  async function detectLocation() {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setDetecting(true);
    setError("");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const addr = data.address;
          const label =
            addr.neighbourhood ||
            addr.suburb ||
            addr.city_district ||
            addr.county ||
            "Current Location";
          const sublabel = [addr.city || addr.town, addr.state].filter(Boolean).join(", ");
          onSelect({ label, sublabel, city: addr.city || addr.town || label });
        } catch {
          onSelect({ label: "Current Location", sublabel: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`, city: "Nearby" });
        }
        setDetecting(false);
        onClose();
      },
      (err) => {
        setDetecting(false);
        setError(
          err.code === 1
            ? "Location access denied. Please allow location in browser settings."
            : "Could not detect location. Try again."
        );
      },
      { timeout: 10000 }
    );
  }

  const filtered = search.trim()
    ? PRESET_LOCATIONS.filter(
        (l) =>
          l.label.toLowerCase().includes(search.toLowerCase()) ||
          l.sublabel.toLowerCase().includes(search.toLowerCase())
      )
    : PRESET_LOCATIONS;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/40" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h2 className="text-base font-bold text-(--swiggy-text)">Change delivery location</h2>
          <button onClick={onClose} className="p-1 text-(--swiggy-gray) hover:text-(--swiggy-text)">
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="px-5 pb-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-(--swiggy-gray)" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for area, street name…"
              className="w-full h-10 pl-9 pr-4 rounded-xl border border-gray-200 text-sm text-(--swiggy-text) placeholder:text-gray-400 outline-none focus:border-(--swiggy-orange) focus:ring-2 focus:ring-(--swiggy-orange)/15 transition-colors"
            />
          </div>
        </div>

        {/* Detect */}
        <button
          onClick={detectLocation}
          disabled={detecting}
          className="flex items-center gap-3 w-full px-5 py-3 hover:bg-orange-50 transition-colors border-b border-gray-100"
        >
          {detecting ? (
            <Loader2 size={18} className="text-(--swiggy-orange) animate-spin" />
          ) : (
            <Navigation size={18} className="text-(--swiggy-orange)" />
          )}
          <div className="text-left">
            <p className="text-sm font-semibold text-(--swiggy-orange)">
              {detecting ? "Detecting location…" : "Use my current location"}
            </p>
            {!detecting && <p className="text-xs text-(--swiggy-gray)">Using GPS</p>}
          </div>
        </button>

        {error && (
          <p className="text-xs text-red-500 px-5 py-2 bg-red-50">{error}</p>
        )}

        {/* Preset list */}
        <div className="max-h-64 overflow-y-auto">
          {filtered.map((loc) => (
            <button
              key={loc.label}
              onClick={() => { onSelect(loc); onClose(); }}
              className="flex items-start gap-3 w-full px-5 py-3.5 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-0"
            >
              <MapPin size={16} className="text-(--swiggy-gray) shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-(--swiggy-text)">{loc.label}</p>
                <p className="text-xs text-(--swiggy-gray)">{loc.sublabel}</p>
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="text-sm text-(--swiggy-gray) px-5 py-4">No locations found</p>
          )}
        </div>
      </div>
    </div>
  );
}
