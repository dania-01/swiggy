"use client";

import Link from "next/link";
import { useState } from "react";
import { Phone, Lock, Eye, EyeOff, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

function Field({ label, id, type = "text", placeholder, value, onChange, error, icon: Icon, rightSlot }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-semibold text-(--swiggy-gray) uppercase tracking-wide">
        {label}
      </label>
      <div className="relative flex items-center">
        {Icon && (
          <span className="absolute left-3.5 text-(--swiggy-gray) pointer-events-none">
            <Icon size={17} />
          </span>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn(
            "w-full h-12 rounded-xl border bg-white text-sm text-(--swiggy-text) placeholder:text-gray-400 outline-none transition-colors",
            "focus:border-(--swiggy-orange) focus:ring-2 focus:ring-(--swiggy-orange)/15",
            Icon ? "pl-10" : "pl-4",
            rightSlot ? "pr-11" : "pr-4",
            error ? "border-red-400" : "border-gray-200"
          )}
        />
        {rightSlot && (
          <span className="absolute right-3 flex items-center">{rightSlot}</span>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default function LoginForm() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function validate() {
    const e = {};
    if (!phone.trim()) e.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(phone.replace(/\s/g, ""))) e.phone = "Enter a valid 10-digit number";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Minimum 6 characters";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSuccess(true);
  }

  if (success) {
    return (
      <div className="text-center py-8 space-y-3">
        <div className="flex justify-center">
          <CheckCircle2 size={56} className="text-(--swiggy-green)" strokeWidth={1.5} />
        </div>
        <h3 className="text-lg font-bold text-(--swiggy-text)">Welcome back!</h3>
        <p className="text-sm text-(--swiggy-gray)">You&apos;re successfully logged in.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-2 bg-(--swiggy-orange) text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#e04800] transition-colors"
        >
          Browse Restaurants <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-(--swiggy-text)">Login</h2>
        <p className="text-sm text-(--swiggy-gray) mt-1">
          or{" "}
          <Link href="/auth/signup" className="text-(--swiggy-orange) font-semibold hover:underline">
            create an account
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Field
          id="phone"
          label="Phone number"
          type="tel"
          placeholder="98765 43210"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={errors.phone}
          icon={Phone}
        />
        <Field
          id="password"
          label="Password"
          type={showPass ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          icon={Lock}
          rightSlot={
            <button type="button" onClick={() => setShowPass((v) => !v)} className="text-(--swiggy-gray) hover:text-(--swiggy-text)">
              {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          }
        />

        <div className="flex justify-end">
          <button type="button" className="text-xs text-(--swiggy-orange) hover:underline">
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl bg-(--swiggy-orange) text-white font-bold text-sm hover:bg-[#e04800] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_14px_rgba(255,82,0,0.3)]"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin size-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Logging in…
            </span>
          ) : "Login"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <span className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-(--swiggy-gray) font-medium">or continue with</span>
        <span className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Social buttons */}
      <div className="grid grid-cols-2 gap-3">
        {[
          {
            label: "Google",
            icon: (
              <svg viewBox="0 0 24 24" className="size-5">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            ),
          },
          {
            label: "Facebook",
            icon: (
              <svg viewBox="0 0 24 24" fill="#1877F2" className="size-5">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            ),
          },
        ].map((s) => (
          <button
            key={s.label}
            type="button"
            className="flex items-center justify-center gap-2 h-11 rounded-xl border border-gray-200 text-sm font-medium text-(--swiggy-text) hover:bg-gray-50 hover:border-gray-300 transition-colors"
          >
            {s.icon}
            {s.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-(--swiggy-gray) text-center leading-relaxed">
        By continuing, you agree to our{" "}
        <Link href="#" className="text-(--swiggy-orange) hover:underline">Terms of Service</Link>{" "}
        &{" "}
        <Link href="#" className="text-(--swiggy-orange) hover:underline">Privacy Policy</Link>
      </p>
    </div>
  );
}
