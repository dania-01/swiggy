"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronDown,
  Search,
  Briefcase,
  Tag,
  HelpCircle,
  User,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useLocation } from "@/context/LocationContext";
import { useAuth } from "@/context/AuthContext";
import LocationModal from "@/components/ui/LocationModal";
import { cn } from "@/lib/utils";

function SwiggyLogo() {
  return (
    <Link href="/" className="shrink-0">
      {/* Orange rounded square with lightning-bolt pin — matches Swiggy's actual logo mark */}
      <div className="size-10 rounded-xl flex items-center justify-center" style={{ background: "#FF5200" }}>
        <svg viewBox="0 0 24 24" fill="none" className="size-6">
          <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
            fill="white"
          />
        </svg>
      </div>
    </Link>
  );
}

function LocationPill({ location, onClick }) {
  return (
    <button onClick={onClick} className="flex items-end gap-1.5 group max-w-65 py-1">
      <div className="text-left leading-none">
        <div className="flex items-center gap-1">
          <span className="text-sm font-bold text-(--swiggy-text) border-b-2 border-(--swiggy-text) truncate max-w-28">
            {location.label}
          </span>
          <ChevronDown size={16} className="text-(--swiggy-orange) mt-0.5 shrink-0" />
        </div>
        <p className="hidden sm:block text-xs text-(--swiggy-gray) truncate max-w-50 mt-0.5">
          {location.sublabel}
        </p>
      </div>
    </button>
  );
}

function NavLink({ href, icon: Icon, label, badge, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-1.5 px-2 py-1 text-sm font-medium text-(--swiggy-text) hover:text-(--swiggy-orange) transition-colors group whitespace-nowrap"
    >
      {Icon && (
        <Icon size={18} className="text-(--swiggy-text) group-hover:text-(--swiggy-orange) transition-colors" />
      )}
      {label}
      {badge && (
        <span className="text-[9px] font-bold text-(--swiggy-orange) border border-(--swiggy-orange) rounded px-0.5 leading-tight ml-0.5">
          {badge}
        </span>
      )}
    </Link>
  );
}

function CartNavLink() {
  const { totalItems } = useCart();
  return (
    <Link href="/cart" className="flex items-center gap-1.5 px-2 py-1 text-sm font-medium text-(--swiggy-text) hover:text-(--swiggy-orange) transition-colors group whitespace-nowrap">
      <ShoppingCart size={18} className="text-(--swiggy-text) group-hover:text-(--swiggy-orange) transition-colors" />
      <span className="flex items-center gap-1">
        <span className="text-(--swiggy-orange) font-bold">{totalItems}</span>
        Cart
      </span>
    </Link>
  );
}

function UserMenu({ onClose }) {
  const { user, logout } = useAuth();
  if (!user) return (
    <NavLink href="/auth/login" icon={User} label="Sign In" onClick={onClose} />
  );
  return (
    <div className="relative group">
      <button className="flex items-center gap-1.5 px-2 py-1 text-sm font-medium text-(--swiggy-text) hover:text-(--swiggy-orange) transition-colors whitespace-nowrap">
        <div className="size-7 rounded-full bg-(--swiggy-orange) flex items-center justify-center text-white text-xs font-bold shrink-0">
          {user.name?.[0]?.toUpperCase() ?? "U"}
        </div>
        <span className="hidden lg:block max-w-24 truncate">{user.name?.split(" ")[0]}</span>
        <ChevronDown size={14} />
      </button>
      {/* Dropdown */}
      <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.12)] border border-gray-100 py-1 z-50 min-w-[160px] hidden group-hover:block">
        <Link href="/orders" onClick={onClose} className="flex items-center gap-2 px-4 py-2.5 text-sm text-(--swiggy-text) hover:bg-gray-50 transition-colors">
          <ShoppingCart size={15} className="text-(--swiggy-gray)" /> My Orders
        </Link>
        <button onClick={() => { logout(); onClose?.(); }} className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
          <User size={15} /> Logout
        </button>
      </div>
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [locationModal, setLocationModal] = useState(false);
  const { location, setLocation } = useLocation();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.08)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-6 h-16">
          {/* Logo */}
          <SwiggyLogo />

          {/* Location */}
          <LocationPill location={location} onClick={() => setLocationModal(true)} />

          {/* Spacer */}
          <div className="flex-1" />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center">
            <NavLink href="/corporate" icon={Briefcase} label="Swiggy Corporate" />
            <NavLink href="/search" icon={Search} label="Search" />
            <NavLink href="/offers" icon={Tag} label="Offers" badge="NEW" />
            <NavLink href="/help" icon={HelpCircle} label="Help" />
            <UserMenu />
            <CartNavLink />
          </nav>

          {/* Mobile: cart + hamburger */}
          <div className="md:hidden flex items-center gap-1">
            <CartNavLink />
            <button
              className="p-2 text-(--swiggy-gray) hover:text-(--swiggy-text)"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
                {mobileOpen ? (
                  <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Location modal */}
      {locationModal && (
        <LocationModal
          onClose={() => setLocationModal(false)}
          onSelect={(loc) => setLocation(loc)}
        />
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-2 flex flex-col">
          <NavLink href="/corporate" icon={Briefcase} label="Swiggy Corporate" onClick={() => setMobileOpen(false)} />
          <NavLink href="/search" icon={Search} label="Search" onClick={() => setMobileOpen(false)} />
          <NavLink href="/offers" icon={Tag} label="Offers" badge="NEW" onClick={() => setMobileOpen(false)} />
          <NavLink href="/help" icon={HelpCircle} label="Help" onClick={() => setMobileOpen(false)} />
          {user ? (
            <>
              <NavLink href="/orders" icon={ShoppingCart} label="My Orders" onClick={() => setMobileOpen(false)} />
              <button onClick={() => { logout(); setMobileOpen(false); }} className="flex items-center gap-1.5 px-2 py-2 text-sm font-medium text-red-500 hover:text-red-600 transition-colors">
                <User size={18} /> Logout
              </button>
            </>
          ) : (
            <NavLink href="/auth/login" icon={User} label="Sign In" onClick={() => setMobileOpen(false)} />
          )}
        </div>
      )}
    </header>
  );
}
