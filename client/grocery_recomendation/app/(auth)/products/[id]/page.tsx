"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "../../_components/header";
import Footer from "../../_components/footer";
import api from "@/lib/api/axios";
import {
  ChevronLeft,
  Flame,
  Dumbbell,
  Wheat,
  Droplet,
  Leaf,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Activity,
  Heart
} from "lucide-react";

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
  sugar: number;
  nutritionDensityScore: number;
  sodium: number;
  cholesterol: number;
  calcium: number;
  iron: number;
  potassium: number;
  magnesium: number;
  zinc: number;
  vitaminA: number;
  vitaminC: number;
  vitaminD: number;
  vitaminE: number;
  vitaminK: number;
}

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id]);

  const getProduct = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/products/${id}`);
      setProduct(response.data.data || response.data);
    } catch (error) {
      console.log("Error fetching single product details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex flex-col justify-between">
        <Header />
        <main className="max-w-6xl mx-auto w-full px-6 py-12 flex-1 animate-pulse space-y-6">
          <div className="h-6 bg-stone-200/70 rounded w-1/4" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-96 bg-stone-200/60 rounded-2xl" />
            <div className="h-96 bg-stone-200/60 rounded-2xl" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex flex-col justify-between">
        <Header />
        <main className="flex-1 flex items-center justify-center px-6 py-16">
          <div className="bg-white border border-stone-200 p-8 rounded-2xl max-w-md w-full text-center shadow-sm">
            <h2 className="text-xl font-bold text-stone-900">Food Item Not Found</h2>
            <p className="text-stone-500 text-sm mt-2">
              We couldn't locate the nutrition details for this item.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col justify-between">
      <div>
        <Header />

        <main className="max-w-6xl mx-auto px-6 py-10 space-y-6">

          {/* MAIN HORIZONTAL SPLIT GRID (2 Equal-Height Columns on Large Screens) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            
            {/* LEFT COLUMN: Overview + Macros */}
            <div className="space-y-6">
              
              {/* Product Overview Playcard Header */}
              <div className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4 border-b border-stone-100 pb-5">
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#556b2f]">
                      Nutrition Facts Profile
                    </span>
                    <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">
                      {product.name}
                    </h1>
                    <p className="text-stone-500 text-xs font-medium leading-relaxed max-w-sm">
                      {product.description || "Nutritional details and health breakdown for standard serving size."}
                    </p>
                  </div>

                  {/* Playcard Health Score Badge */}
                  <div className="shrink-0 bg-[#f4f7f4] border border-[#e2eae0] p-3 rounded-xl text-center min-w-[95px]">
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-stone-500 block">
                      Health Score
                    </span>
                    <div className="flex items-baseline justify-center gap-0.5 text-[#556b2f] mt-0.5">
                      <span className="text-2xl font-black">{product.nutritionDensityScore ?? 0}</span>
                      <span className="text-[10px] font-bold text-stone-400">/100</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3.5 flex items-center justify-between text-xs text-stone-500 font-medium">
                  <span className="flex items-center gap-1 text-stone-700 font-semibold">
                    <ShieldCheck size={15} className="text-[#556b2f]" /> Quality Verified
                  </span>
                  <span className="flex items-center gap-1 text-stone-400">
                    <Activity size={15} /> Serving Standardized
                  </span>
                </div>
              </div>

              {/* Macronutrient Grid */}
              <div className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Heart size={16} className="text-[#556b2f]" />
                    <h2 className="text-xs font-extrabold uppercase tracking-wider text-stone-900">
                      Macronutrient Breakdown
                    </h2>
                  </div>
                  <span className="text-[11px] font-semibold text-stone-400">Per Serving</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { name: "Calories", desc: "Energy output", val: `${product.calories ?? 0}`, unit: "kcal", icon: Flame, accent: "border-l-amber-500 text-amber-600 bg-amber-50/30" },
                    { name: "Protein", desc: "Muscle building", val: `${product.protein ?? 0}`, unit: "g", icon: Dumbbell, accent: "border-l-indigo-500 text-indigo-600 bg-indigo-50/30" },
                    { name: "Carbohydrates", desc: "Body fuel", val: `${product.carbohydrates ?? 0}`, unit: "g", icon: Wheat, accent: "border-l-sky-500 text-sky-600 bg-sky-50/30" },
                    { name: "Total Fats", desc: "Healthy fats", val: `${product.fat ?? 0}`, unit: "g", icon: Droplet, accent: "border-l-rose-500 text-rose-600 bg-rose-50/30" },
                    { name: "Dietary Fiber", desc: "Digestion support", val: `${product.fiber ?? 0}`, unit: "g", icon: Leaf, accent: "border-l-emerald-500 text-emerald-600 bg-emerald-50/30" },
                    { name: "Sugars", desc: "Natural sugars", val: `${product.sugar ?? 0}`, unit: "g", icon: Sparkles, accent: "border-l-purple-500 text-purple-600 bg-purple-50/30" },
                  ].map((macro, idx) => {
                    const Icon = macro.icon;
                    return (
                      <div 
                        key={idx}
                        className={`border border-stone-200/80 border-l-4 ${macro.accent} rounded-xl p-3 flex items-center justify-between`}
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <Icon size={14} />
                            <span className="text-xs font-bold text-stone-900">{macro.name}</span>
                          </div>
                          <p className="text-[10px] text-stone-400 font-medium">{macro.desc}</p>
                        </div>

                        <div className="text-right">
                          <span className="text-lg font-extrabold text-stone-900">{macro.val}</span>
                          <span className="text-[10px] font-semibold text-stone-400 ml-0.5">{macro.unit}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Micronutrients + CTA Banner */}
            <div className="space-y-6">

              {/* Micronutrients Table */}
              <div className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-stone-900 border-b border-stone-100 pb-3">
                  Essential Vitamins & Minerals
                </h2>

                <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-xs">
                  {[
                    { name: "Sodium", val: `${product.sodium ?? 0} mg` },
                    { name: "Cholesterol", val: `${product.cholesterol ?? 0} mg` },
                    { name: "Calcium", val: `${product.calcium ?? 0} mg` },
                    { name: "Iron", val: `${product.iron ?? 0} mg` },
                    { name: "Potassium", val: `${product.potassium ?? 0} mg` },
                    { name: "Magnesium", val: `${product.magnesium ?? 0} mg` },
                    { name: "Zinc", val: `${product.zinc ?? 0} mg` },
                    { name: "Vitamin A", val: `${product.vitaminA ?? 0} mg` },
                    { name: "Vitamin C", val: `${product.vitaminC ?? 0} mg` },
                    { name: "Vitamin D", val: `${product.vitaminD ?? 0} mg` },
                    { name: "Vitamin E", val: `${product.vitaminE ?? 0} mg` },
                    { name: "Vitamin K", val: `${product.vitaminK ?? 0} mg` },
                  ].map((item, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center justify-between py-1.5 border-b border-stone-100/70"
                    >
                      <span className="text-stone-500 font-medium">{item.name}</span>
                      <span className="font-extrabold text-stone-800">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compatibility CTA Banner */}
              <div className="bg-stone-900 text-white rounded-2xl p-6 flex flex-col justify-between gap-4 shadow-sm">
                <div className="space-y-1">
                  <h3 className="font-extrabold text-base tracking-tight text-white">
                    Check Diet Alignment
                  </h3>
                  <p className="text-stone-300 text-xs font-normal leading-relaxed">
                    See how well <span className="text-white font-semibold">{product.name}</span> matches your personal nutrition goals and daily splits.
                  </p>
                </div>

                <div>
                  <button
                    onClick={() => router.push("/recommendation")}
                    className="inline-flex items-center gap-2 bg-[#556b2f] hover:bg-[#475b27] text-white px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition w-full justify-center shadow-sm"
                  >
                    <span>Run Diet Check</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </main>
      </div>

      <Footer />
    </div>
  );
}