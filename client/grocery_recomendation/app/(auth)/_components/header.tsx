"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, Leaf, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/lib/api/axios";

export default function Header() {
  const pathname = usePathname();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("grocery_token");
    setIsLoggedIn(!!token);

    fetchProducts();
  }, []);

  const isActive = (path: string) => pathname === path;
  
  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!search.trim()) {
      setFilteredProducts([]);
      return;
    }

    const result = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredProducts(result);
  }, [search, products]);

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

        {/* Beautiful Search Bar with Dropdown Container */}
        <div className="hidden md:flex items-center relative flex-1 max-w-2xl mx-3 group">
          <Search
            className="absolute left-4 text-stone-400 group-focus-within:text-[#556b2f] transition-colors duration-200"
            size={18}
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search groceries by name or category..."
            className="w-full bg-stone-50 border border-[#e2eae0] rounded-full pl-11 pr-5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none focus:bg-white focus:border-[#556b2f] focus:ring-4 focus:ring-[#556b2f]/5 transition-all duration-200"
          />

          {filteredProducts.length > 0 && (
            <div className="absolute top-[52px] left-0 w-full bg-white/95 backdrop-blur-md border border-[#e2eae0] rounded-2xl shadow-xl shadow-stone-900/10 max-h-96 overflow-y-auto z-50 p-2 divide-y divide-stone-100 animate-in fade-in slide-in-from-top-2 duration-250">
              <div className="px-3 py-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                Matching Catalog Profiles ({filteredProducts.length})
              </div>
              
              {filteredProducts.map((product) => (
                <Link
                  key={product._id}
                  href={`/products/${product._id}`}
                  onClick={() => {
                    setSearch("");
                    setFilteredProducts([]);
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF9F5] transition group/item"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-50 border border-stone-100 shrink-0">
                      <img
                        src={`http://localhost:5001/uploads/products/${product.image}`}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover/item:scale-105 transition duration-300"
                      />
                    </div>

                    <div className="space-y-0.5">
                      <p className="text-sm font-extrabold text-stone-900 tracking-tight line-clamp-1 group-hover/item:text-[#556b2f] transition">
                        {product.name}
                      </p>
                      <span className="inline-block text-[10px] font-bold tracking-wide text-stone-400 uppercase">
                        {product.category || "Grocery Product"}
                      </span>
                    </div>
                  </div>

                  {/* Micro Nutrition Indicators & Arrow */}
                  <div className="flex items-center gap-4 shrink-0 pl-3">
                    <div className="hidden sm:flex items-center gap-2 text-[11px] font-bold">
                      {product.calories && (
                        <span className="bg-stone-100 text-stone-600 px-2 py-0.5 rounded-sm">
                          {product.calories} kcal
                        </span>
                      )}
                      {product.protein && (
                        <span className="bg-[#EEF5E8] text-[#556b2f] px-2 py-0.5 rounded-sm">
                          {product.protein}g P
                        </span>
                      )}
                    </div>
                    
                    <ArrowRight 
                      size={14} 
                      className="text-stone-300 group-hover/item:text-[#556b2f] group-hover/item:translate-x-0.5 transition duration-200" 
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
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
            { name: "About", path: "/aboutus" },
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