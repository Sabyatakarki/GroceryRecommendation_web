"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";

const API_URL = "http://localhost:5001/api/users";

export default function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // UI Notification State
  const [uiStatus, setUiStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUiStatus({ type: null, message: "" }); // Clear previous notifications

    try {
      setLoading(true);

  const response = await axios.post(`${API_URL}/login`, {
  email: formData.email,
  password: formData.password,
  rememberMe,
});

// Save token and user
const { token, user } = response.data.data;

localStorage.setItem("grocery_token", token);
localStorage.setItem("user", JSON.stringify(user));

// Inline Success State
setUiStatus({
  type: "success",
  message: "Login successful! Redirecting to home page...",
});

setTimeout(() => {
  router.push("/home");
}, 3000);

    } catch (error: any) {
      // Inline Error State
      setUiStatus({
        type: "error",
        message: error.response?.data?.message || "Login failed. Please check your credentials.",
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-stone-100 p-4 sm:p-6 md:p-10 font-sans tracking-tight">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-[32px] bg-white shadow-2xl transition-all min-h-[650px]">
        
        {/* LEFT SIDE: Interactive Login Form Panel */}
        <div className="flex w-full flex-col justify-center px-8 py-12 md:w-1/2 sm:px-16 lg:px-20 bg-white">
          <div className="mx-auto w-full max-w-sm">
            
            <header className="mb-6 text-center md:text-left">
              <h2 className="text-3xl font-extrabold text-stone-900 tracking-tighter">
                Welcome Back
              </h2>
              <p className="text-sm text-stone-500 mt-2">
                Discover personalized, fresh grocery recommendations curated just for you.
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

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
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
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors tracking-wide"
                  >
                    Forgot password?
                  </Link>
                </div>
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

              <div className="flex items-center justify-between pt-1.5 pb-1">
                <span className="text-sm font-medium text-stone-600">Remember sign-in details</span>
                <button
                  type="button"
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    rememberMe ? 'bg-emerald-500' : 'bg-stone-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      rememberMe ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] disabled:opacity-70 disabled:pointer-events-none text-white py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 shadow-lg shadow-emerald-600/10"
              >
                {loading && uiStatus.type !== "success" ? "Logging in..." : loading ? "Redirecting..." : "Log In"}
              </button>
            </form>

            <div className="relative flex py-6 items-center">
              <div className="flex-grow border-t border-stone-200"></div>
              <span className="flex-shrink mx-4 text-xs font-bold text-stone-400 tracking-wider uppercase">Or</span>
              <div className="flex-grow border-t border-stone-200"></div>
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700 shadow-sm hover:bg-stone-50 transition"
            >
              <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.63 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span>Continue with Google</span>
            </button>

            <p className="mt-8 text-center text-sm text-stone-500">
              Don't have an account?{' '}
              <Link href="/register" className="font-bold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors">
                Sign up
              </Link>
            </p>

          </div>
        </div>

        {/* RIGHT SIDE: Image Panel */}
        <div className="relative hidden w-1/2 md:block self-stretch min-h-[550px]">
          <Image
            src="/enter.jpg"
            alt="Login Presentation Visual"
            fill
            className="object-cover pointer-events-none select-none"
            sizes="50vw"
            priority
          />
        </div>

      </div>
    </div>
  );
}