import Link from "next/link";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left panel — branding */}
      <div
        className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #FF5200 0%, #FF8C00 100%)" }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border-2 border-white"
              style={{
                width: `${200 + i * 120}px`,
                height: `${200 + i * 120}px`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 relative z-10">
          <div className="size-10 bg-white rounded-xl flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="size-6">
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
                fill="#FF5200"
              />
            </svg>
          </div>
          <span className="text-2xl font-bold text-white">Swiggy</span>
        </Link>

        {/* Central message */}
        <div className="relative z-10 space-y-4">
          <h1 className="text-4xl font-bold text-white leading-tight">
            Order food from<br />
            <span className="text-white/80">India&apos;s best</span><br />
            restaurants
          </h1>
          <p className="text-white/70 text-base leading-relaxed max-w-xs">
            Fast delivery · Great discounts · 75+ restaurants near you
          </p>
          <div className="flex items-center gap-3 pt-2">
            {["Pizza", "Chinese", "Biryani", "Burgers"].map((tag) => (
              <span key={tag} className="text-xs bg-white/20 text-white px-3 py-1.5 rounded-full font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <p className="text-white/50 text-sm relative z-10">
          © 2024 Swiggy Clone
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex items-center justify-center p-6 sm:p-10 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="size-9 rounded-xl flex items-center justify-center" style={{ background: "#FF5200" }}>
              <svg viewBox="0 0 24 24" fill="none" className="size-5">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" fill="white" />
              </svg>
            </div>
            <span className="text-xl font-bold" style={{ color: "#FF5200" }}>Swiggy</span>
          </Link>

          {children}
        </div>
      </div>
    </div>
  );
}
