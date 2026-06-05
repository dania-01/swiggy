import Link from "next/link";

// Internal links use Next.js Link; external open in new tab
const COMPANY = [
  { label: "About Us",          href: "/help"        },
  { label: "Swiggy Corporate",  href: "/corporate"   },
  { label: "Careers",           href: "/help"         },
  { label: "Team",              href: "/help"         },
  { label: "Swiggy One",        href: "/offers"      },
  { label: "Swiggy Instamart",  href: "/offers"      },
  { label: "Swiggy Dineout",    href: "/offers"      },
  { label: "Swiggy Genie",      href: "/offers"      },
  { label: "Minis",             href: "/offers"      },
  { label: "Pyng",              href: "/offers"      },
];

const CONTACT = [
  { label: "Help & Support",   href: "/help"                     },
  { label: "Partner with us",  href: "/help"                     },
  { label: "Ride with us",     href: "/help"                     },
];

const LEGAL = [
  { label: "Terms & Conditions", href: "/terms"   },
  { label: "Cookie Policy",      href: "/cookies" },
  { label: "Privacy Policy",     href: "/privacy" },
  { label: "Investor Relations", href: "/help"    },
];

const CITIES = [
  "Bangalore", "Gurgaon", "Hyderabad", "Delhi", "Mumbai", "Pune",
];

const LIFE = [
  { label: "Explore with Swiggy", href: "/offers"  },
  { label: "Swiggy News",         href: "/help"    },
  { label: "Snackables",          href: "/offers"  },
];

const SOCIAL = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/swiggy-in",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/swiggy_in",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/swiggy.in",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "https://in.pinterest.com/swiggy",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com/swiggy_in",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

function FooterLinks({ links }) {
  return (
    <ul className="space-y-2.5 mt-3">
      {links.map(({ label, href }) => (
        <li key={label}>
          <Link
            href={href}
            className="text-sm text-gray-600 hover:text-(--swiggy-text) transition-colors"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#f0f0f5] mt-auto">
      {/* App download banner */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-base font-bold text-(--swiggy-text) text-center sm:text-left">
            For better experience, download the Swiggy app now
          </p>
          <div className="flex items-center gap-3">
            <a href="https://play.google.com/store/apps/details?id=bundl.swiggy" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-black text-white px-4 py-2.5 rounded-xl hover:bg-gray-900 transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path d="M3.18 23.76a2 2 0 01-.87-1.71V1.95a2 2 0 01.87-1.71l.1-.06 12.16 12.16v.28L3.28 23.82l-.1-.06z" fill="#EA4335" />
                <path d="M20.06 16.47l-4.05-4.05V12l4.05-4.05.09.05 4.8 2.73a1.37 1.37 0 010 2.42l-4.8 2.73-.09.05z" fill="#FBBC04" />
                <path d="M20.15 16.42L15.29 11.5 3.18 23.76c.44.37 1.1.42 1.6.11l15.37-7.45" fill="#34A853" />
                <path d="M20.15 7.58L4.78.13c-.5-.3-1.16-.26-1.6.11L15.29 11.5l4.86-4.92z" fill="#4285F4" />
              </svg>
              <div className="leading-tight">
                <div className="text-[9px] text-gray-300 uppercase tracking-wide">GET IT ON</div>
                <div className="text-sm font-semibold">Google Play</div>
              </div>
            </a>
            <a href="https://apps.apple.com/in/app/swiggy-food-grocery-delivery/id989540920" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-black text-white px-4 py-2.5 rounded-xl hover:bg-gray-900 transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="leading-tight">
                <div className="text-[9px] text-gray-300 uppercase tracking-wide">Download on the</div>
                <div className="text-sm font-semibold">App Store</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="size-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#FF5200" }}>
                <svg viewBox="0 0 24 24" fill="none" className="size-6">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" fill="white" />
                </svg>
              </div>
              <span className="text-2xl font-bold" style={{ color: "#FF5200" }}>Swiggy</span>
            </Link>
            <p className="text-sm text-gray-500">© 2026 Swiggy Limited</p>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold text-(--swiggy-text)">Company</h4>
            <FooterLinks links={COMPANY} />
          </div>

          {/* Contact + Legal */}
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold text-(--swiggy-text)">Contact us</h4>
              <FooterLinks links={CONTACT} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-(--swiggy-text)">Legal</h4>
              <FooterLinks links={LEGAL} />
            </div>
          </div>

          {/* Available in */}
          <div>
            <h4 className="text-sm font-bold text-(--swiggy-text)">Available in:</h4>
            <ul className="space-y-2.5 mt-3">
              {CITIES.map((city) => (
                <li key={city}>
                  <Link
                    href={`/search?q=${city.toLowerCase()}`}
                    className="text-sm text-gray-600 hover:text-(--swiggy-text) transition-colors"
                  >
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <Link href="/search" className="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-300 rounded px-3 py-1.5 hover:border-(--swiggy-orange) hover:text-(--swiggy-orange) transition-colors bg-white w-fit">
                679 cities
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5">
                  <path strokeLinecap="round" d="M6 9l6 6 6-6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Life at Swiggy + Social */}
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold text-(--swiggy-text)">Life at Swiggy</h4>
              <FooterLinks links={LIFE} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-(--swiggy-text) mb-3">Social Links</h4>
              <div className="flex items-center gap-3">
                {SOCIAL.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    aria-label={s.label}
                    className="text-gray-500 hover:text-(--swiggy-orange) transition-colors">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
