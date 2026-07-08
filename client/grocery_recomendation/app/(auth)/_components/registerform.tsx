"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";

const API_URL = "http://localhost:5001/api/users";

export default function RegisterForm() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // UI Notification State
  const [uiStatus, setUiStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setUiStatus({ type: null, message: "" }); // Clear previous notifications

    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/register`, formData);
      
      // Inline Success State
      setUiStatus({
        type: "success",
        message: `${response.data.message || "Account created successfully!"} Redirecting to login...`,
      });

      setFormData({ fullName: "", email: "", password: "" });

      setTimeout(() => {
        router.push("/login");
      }, 3000);

    } catch (error: any) {
      // Inline Error State
      setUiStatus({
        type: "error",
        message: error.response?.data?.message || "Registration failed. Please try again.",
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-stone-100 p-4 sm:p-6 md:p-10 font-sans tracking-tight">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-[32px] bg-white shadow-2xl transition-all min-h-[650px]">
        
        {/* LEFT SIDE: Image Panel */}
        <div className="relative hidden w-1/2 md:block self-stretch min-h-[550px]">
          <Image
            src="/enter.jpg"
            alt="Registration Presentation Visual"
            fill
            className="object-cover pointer-events-none select-none"
            sizes="50vw"
            priority
          />
        </div>

        {/* RIGHT SIDE: Interactive Registration Form Panel */}
        <div className="flex w-full flex-col justify-center px-8 py-12 md:w-1/2 sm:px-16 lg:px-20 bg-white">
          <div className="mx-auto w-full max-w-sm">
            
            <header className="mb-6 text-center md:text-left">
              <h2 className="text-3xl font-extrabold text-stone-900 tracking-tighter">
                Create Account
              </h2>
              <p className="text-sm text-stone-500 mt-2">
                Join FreshPicks today and start your journey with healthy grocery recommendations.
              </p>
            </header>

            {/* Dynamic In-UI Notification Banner */}
            {uiStatus.type && (
              <div
                className={`mb-5 flex items-start gap-3 rounded-xl p-4 text-sm font-medium border animate-in fade-in slide-in-from-top-2 duration-200 ${
                  uiStatus.type === "success"
                    ? "bg-emerald-50 border-emerald-200/60 text-emerald-800"
                    : "bg-rose-50 border-rose-200/60 text-rose-800"
                }`}
              >
                {uiStatus.type === "success" ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 shrink-0 text-rose-600 mt-0.5" />
                )}
                <span className="leading-relaxed">{uiStatus.message}</span>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4 text-left">
              <div className="space-y-1.5">
                <label htmlFor="fullName" className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  placeholder="Sabyata Karki"
                  className="w-full bg-stone-50 border border-stone-200/80 rounded-xl px-4 py-3.5 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all duration-200"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  className="w-full bg-stone-50 border border-stone-200/80 rounded-xl px-4 py-3.5 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all duration-200"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••••••"
                    className="w-full bg-stone-50 border border-stone-200/80 rounded-xl pl-4 pr-12 py-3.5 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all duration-200"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 focus:outline-none transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <p className="text-xs text-stone-500 leading-relaxed pt-1">
                By creating an account, you agree to our{" "}
                <Link href="/terms" className="text-emerald-600 font-semibold hover:underline">Terms of Service</Link> and{" "}
                <Link href="/privacy" className="text-emerald-600 font-semibold hover:underline">Privacy Policy</Link>.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] disabled:opacity-70 disabled:pointer-events-none text-white py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 shadow-lg shadow-emerald-600/10"
              >
                {loading && uiStatus.type !== "success" ? "Creating Account..." : loading ? "Redirecting..." : "Register"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-stone-500">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors">
                Login
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}