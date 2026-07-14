"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Header from "../_components/header";
import Footer from "../_components/footer";
import api from "@/lib/api/axios";
import { Search, Sparkles, ShoppingBag, Eye, RotateCcw } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  image: string;
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

  // Combines existing backend values with required grocery options to ensure everything renders properly
  const categories = useMemo(() => {
    const defaultCategories = [
      "All",
      "Fruits",
      "Vegetables",
      "Dairy",
      "Grains",
      "Protein",
      "Beverages",
      "Snacks",
      "Nuts & Seeds"
    ];
    
    const incomingCategories = products.map((p) => p.category).filter(Boolean);
    
    // Merge everything together, maintaining proper formatting
    const merged = [...defaultCategories, ...incomingCategories].map(cat => 
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
    <div className="min-h-screen bg-[#faf9f5] flex flex-col justify-between">
      <div>
        <Header />

        <main className="max-w-7xl mx-auto px-6 py-12">
          
          {/* Header Description Section */}
          <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#e2eae0] mb-10">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f4f7f4] border border-[#e2eae0] rounded-full text-xs font-bold uppercase tracking-wider text-[#556b2f]">
                <Sparkles size={12} /> Nutrition Metrics Index
              </span>
              <h1 className="text-4xl font-extrabold text-stone-900 tracking-tight">
                Healthy Products
              </h1>
              <p className="text-stone-600 font-medium max-w-2xl leading-relaxed">
                Browse healthy grocery products and explore their nutrition information. Compare macro thresholds to fine-tune your grocery habits.
              </p>
            </div>
          </section>

          {/* Search Input */}
          <div className="relative max-w-xl mb-8 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-[#556b2f] transition-colors duration-200" size={18} />
            <input
              type="text"
              placeholder="Search by specific grocery item names..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-[#e2eae0] rounded-2xl pl-11 pr-5 py-3.5 text-sm text-stone-900 placeholder-stone-400 outline-none focus:border-[#556b2f] focus:ring-4 focus:ring-[#556b2f]/5 shadow-sm transition-all duration-200"
            />
          </div>

          {/* Complete Category Horizontal Tubes Grid */}
          <div className="flex items-center gap-2 overflow-x-auto pb-6 scrollbar-hide mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2 rounded-xl text-sm font-bold tracking-tight transition-all shrink-0 border capitalize ${
                  category.toLowerCase() === cat.toLowerCase()
                    ? "bg-[#556b2f] border-[#485b28] text-white shadow-md shadow-[#556b2f]/10"
                    : "bg-white border-[#e2eae0] text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Dynamic Content Results Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, idx) => (
                <div key={idx} className="bg-white border border-[#e2eae0] rounded-[24px] p-4 space-y-4 animate-pulse">
                  <div className="bg-stone-200/60 aspect-square w-full rounded-2xl" />
                  <div className="h-4 bg-stone-200/60 rounded-md w-2/3" />
                  <div className="h-3 bg-stone-200/60 rounded-md w-full" />
                  <div className="h-10 bg-stone-100 rounded-xl w-full pt-2" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white border border-[#e2eae0] border-dashed rounded-[32px] max-w-lg mx-auto p-8 shadow-sm">
              <div className="bg-[#f4f7f4] w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="text-[#556b2f]" size={26} />
              </div>
              <h2 className="text-xl font-bold text-stone-900">No Products Available</h2>
              <p className="text-stone-500 text-sm mt-1.5 max-w-xs mx-auto mb-5">
                We couldn't locate any items registered under "{category}". Switch categories or clear filters to reset.
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#556b2f] text-white text-xs font-bold rounded-xl hover:bg-[#485b28] transition"
              >
                <RotateCcw size={14} /> View All Groceries
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-in fade-in duration-300">
              {filteredProducts.map((product) => {
                const imageUrl = `http://localhost:5001/uploads/products/${product.image}`;

                return (
                  <div
                    key={product._id}
                    className="bg-white border border-[#e2eae0] rounded-[24px] p-4 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div>
                      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-stone-50 border border-stone-100 mb-4">
                        <img
                          src={imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <span className="text-[11px] font-extrabold tracking-wider text-[#556b2f] uppercase bg-[#f4f7f4] px-2.5 py-1 rounded-md">
                        {product.category || "Grocery"}
                      </span>

                      <h2 className="text-lg font-extrabold text-stone-900 tracking-tight mt-3 line-clamp-1">
                        {product.name}
                      </h2>

                      <div className="grid grid-cols-2 gap-2 mt-3 bg-[#faf9f5] p-2.5 rounded-xl border border-stone-100 text-xs font-semibold text-stone-600">
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase text-stone-400 font-bold">Energy</span>
                          <span className="text-stone-800 font-bold">{product.calories ?? 0} kcal</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase text-stone-400 font-bold">Protein</span>
                          <span className="text-[#556b2f] font-bold">{product.protein ?? 0}g</span>
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/products/${product._id}`}
                      className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-[#556b2f] hover:bg-[#485b28] text-white text-xs font-bold py-3 rounded-xl shadow-sm transition"
                    >
                      <Eye size={14} />
                      View Nutrition Details
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}