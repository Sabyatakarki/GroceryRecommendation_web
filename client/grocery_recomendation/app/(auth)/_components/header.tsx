"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, Leaf } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

 useEffect(() => {
  const token = localStorage.getItem("grocery_token");
  setIsLoggedIn(!!token);
}, []);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e2eae0] bg-white/80 backdrop-blur-md transition-all duration-200">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between px-6 sm:px-9 py-3.5 gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="bg-[#556b2f] w-11 h-11 rounded-2xl flex items-center justify-center shadow-md shadow-stone-900/5 group-hover:scale-105 transition-transform duration-200">
            <Leaf className="text-white" size={22} />
          </div>

          <div className="flex flex-col">
            <h1 className="text-lg font-extrabold text-stone-900 tracking-tight leading-none">
              Healthy<span className="text-[#556b2f]">Grocery</span>
            </h1>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">
              Personalized Nutrition
            </p>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex items-center relative flex-1 max-w-2xl mx-3 group">
          <Search
            className="absolute left-4 text-stone-400 group-focus-within:text-[#556b2f] transition-colors duration-200"
            size={18}
          />

          <input
            type="text"
            placeholder="Search groceries, metrics, dietary alternatives..."
            className="w-full bg-stone-50 border border-[#e2eae0] rounded-full pl-11 pr-5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none focus:bg-white focus:border-[#556b2f] focus:ring-4 focus:ring-[#556b2f]/5 transition-all duration-200"
          />
        </div>

        {/* Profile */}
        <div className="flex items-center gap-4 shrink-0">
          <Link
            href={isLoggedIn ? "/profile" : "/login"}
            className="flex items-center gap-2 px-3 h-10 rounded-xl text-stone-600 hover:text-[#556b2f] hover:bg-stone-50 active:scale-95 transition-all duration-200"
          >
            <User size={20} />
            <span className="text-sm font-medium">Profile</span>
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t border-stone-100 bg-stone-50/40">
        <div className="w-full flex justify-center items-center gap-7 py-1.5">
          {[
            { name: "Home", path: "/home" },
            { name: "Products", path: "/products" },
            { name: "Recommendations", path: "/recommendation" },
            { name: "About", path: "/about" },
          ].map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`relative px-4 py-1.5 text-sm tracking-tight rounded-xl transition-all duration-200 ${
                isActive(link.path)
                  ? "font-bold text-[#556b2f] bg-[#f4f7f4] border border-[#ccd6c4] shadow-sm opacity-100"
                  : "font-medium text-stone-500 opacity-70 hover:opacity-100 hover:text-[#556b2f] hover:bg-stone-100/50"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}