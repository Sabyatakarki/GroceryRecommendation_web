"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Header from "../_components/header";
import Footer from "../_components/footer";
import api from "@/lib/api/axios";
import { Search, Sparkles, ShoppingBag, Eye, RotateCcw, Flame, Dumbbell, ChevronRight, Scale } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/products");
      setProducts(response.data.data || response.data);
    } catch (error) {
      console.log("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => {
    const defaultCategories = [
      "All",
      "Fruits",
      "Vegetables",
      "Dairy",
      "Grains",
      "Beverages",
      "Nuts & Seeds",
    ];

    const incomingCategories = products.map((p) => p.category).filter(Boolean);
    const merged = [...defaultCategories, ...incomingCategories].map((cat) =>
      cat.trim()
    );

    return Array.from(new Set(merged));
  }, [products]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = (product.name || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      (product.category || "").toLowerCase() === category.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const handleResetFilters = () => {
    setSearch("");
    setCategory("All");
  };

  return (
    <div className="min-h-screen bg-[#faf9f5] flex flex-col justify-between selection:bg-[#556b2f] selection:text-white">
      <div>
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Header Banner */}
          <section className="relative overflow-hidden bg-gradient-to-b from-[#f3f6f1] to-transparent p-6 sm:p-8 rounded-3xl border border-[#e2eae0]/80 mb-8 sm:mb-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative z-10">
              <div className="space-y-3 max-w-2xl">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/80 backdrop-blur-md border border-[#e2eae0] rounded-full text-xs font-bold uppercase tracking-wider text-[#556b2f] shadow-xs">
                  <Sparkles size={13} className="animate-pulse" /> Nutrition Index
                </span>
                <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight">
                  Healthy Products
                </h1>
                <p className="text-stone-600 font-medium leading-relaxed text-sm sm:text-base">
                  Browse healthy grocery products and explore their nutrition metrics. Compare macro thresholds to fine-tune your nutrition habits.
                </p>
              </div>

              {/* Counter Badge */}
              <div className="inline-flex items-center gap-2 self-start lg:self-auto px-4 py-2.5 bg-white rounded-2xl border border-[#e2eae0] shadow-xs text-xs font-bold text-stone-700">
                <span className="w-2 h-2 rounded-full bg-[#556b2f]" />
                Showing <span className="text-[#556b2f] text-sm">{filteredProducts.length}</span> Items
              </div>
            </div>
          </section>

          {/* Search & Category Filter Section */}
          <div className="space-y-4 mb-8">
            <div className="relative max-w-xl group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-[#556b2f] transition-colors duration-200"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by grocery item name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-[#e2eae0] rounded-2xl pl-11 pr-10 py-3.5 text-sm text-stone-900 placeholder-stone-400 outline-none focus:border-[#556b2f] focus:ring-4 focus:ring-[#556b2f]/10 shadow-xs transition-all duration-200"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-full w-5 h-5 flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Scrollbar-Free Category Pill Controls */}
            <div className="relative">
              <div
                className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-none [ms-overflow-style:none] [scrollbar-width:none]"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {categories.map((cat) => {
                  const isActive = category.toLowerCase() === cat.toLowerCase();
                  return (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 shrink-0 border capitalize ${
                        isActive
                          ? "bg-[#556b2f] border-[#485b28] text-white shadow-md shadow-[#556b2f]/20 scale-[1.02]"
                          : "bg-white border-[#e2eae0] text-stone-600 hover:text-stone-900 hover:bg-stone-50 hover:border-stone-300"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Product Grid Layout */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#e2eae0] rounded-2xl p-5 space-y-4 animate-pulse"
                >
                  <div className="h-3 bg-stone-200/80 rounded-md w-1/4" />
                  <div className="h-5 bg-stone-200/80 rounded-md w-3/4" />
                  <div className="h-12 bg-stone-100 rounded-xl w-full" />
                  <div className="h-9 bg-stone-100 rounded-xl w-full" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16 sm:py-20 bg-white border border-[#e2eae0] border-dashed rounded-3xl max-w-md mx-auto p-8 shadow-xs">
              <div className="bg-[#f4f7f4] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#556b2f]">
                <ShoppingBag size={28} />
              </div>
              <h2 className="text-lg font-bold text-stone-900">No Products Found</h2>
              <p className="text-stone-500 text-xs sm:text-sm mt-1.5 max-w-xs mx-auto mb-6">
                We couldn't locate any items matching your active query under "{category}".
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#556b2f] text-white text-xs font-bold rounded-xl hover:bg-[#485b28] transition shadow-md shadow-[#556b2f]/15"
              >
                <RotateCcw size={14} /> Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <Link
                  key={product._id}
                  href={`/products/${product._id}`}
                  className="bg-white border border-[#e2eae0] rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1 hover:border-[#556b2f]/40 transition-all duration-300 group"
                >
                  <div>
                    {/* Header: Category Badge */}
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[10px] font-extrabold tracking-wider text-[#556b2f] uppercase bg-[#f4f7f4] px-2.5 py-1 rounded-md border border-[#e2eae0]">
                        {product.category || "Grocery"}
                      </span>
                    </div>

                    {/* Product Title */}
                    <h2 className="text-base font-extrabold text-stone-900 tracking-tight group-hover:text-[#556b2f] transition-colors line-clamp-1 mb-4">
                      {product.name}
                    </h2>

                    {/* Nutrition Stats Panel */}
                    <div className="grid grid-cols-2 gap-2 bg-[#faf9f5] p-3 rounded-xl border border-stone-100 mb-5">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600">
                          <Flame size={14} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-tight">Energy</p>
                          <p className="text-xs font-extrabold text-stone-800">{product.calories ?? 0} kcal</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-[#556b2f]/10 text-[#556b2f]">
                          <Dumbbell size={14} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-tight">Protein</p>
                          <p className="text-xs font-extrabold text-stone-800">{product.protein ?? 0}g</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* View Details Action Link */}
                  <span className="w-full inline-flex items-center justify-center gap-1.5 bg-[#f4f7f4] group-hover:bg-[#556b2f] text-stone-700 group-hover:text-white text-xs font-bold py-2.5 rounded-xl border border-[#e2eae0] group-hover:border-[#556b2f] transition-all duration-300">
                    <Eye size={13} />
                    View Details
                    <ChevronRight size={13} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}