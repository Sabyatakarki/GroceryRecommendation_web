"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "../../_components/header";
import Footer from "../../_components/footer";
import api from "@/lib/api/axios";
import { 
  Sparkles, 
  ChevronLeft, 
  Activity, 
  AlertTriangle,
  Flame,
  Dumbbell,
  Wheat,
  Droplet,
  Leaf,
  CheckCircle2
} from "lucide-react";

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
  fiber: number;
  sugar: number;
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
      <div className="min-h-screen bg-[#faf9f5] flex flex-col justify-between">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#556b2f] border-t-transparent rounded-full animate-spin" />
          <p className="text-stone-500 font-bold tracking-wider text-xs uppercase">Loading nutrition index...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#faf9f5] flex flex-col justify-between">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto p-8 text-center">
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-amber-600 mb-4">
            <AlertTriangle size={32} />
          </div>
          <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">Product Missing</h2>
          <p className="text-stone-500 text-sm mt-2 leading-relaxed">
            The target grocery profile could not be found. It may have been unmapped from our system indexes.
          </p>
          <button 
            onClick={() => router.push("/products")}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#e2eae0] rounded-xl text-stone-700 font-bold text-sm shadow-sm hover:bg-stone-50 transition"
          >
            <ChevronLeft size={16} /> Return to Shop
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const imageUrl = `http://localhost:5001/uploads/products/${product.image}`;

  return (
    <div className="min-h-screen bg-[#faf9f5] flex flex-col justify-between">
      <div>
        <Header />

        <main className="max-w-7xl mx-auto px-6 py-10">

          {/* 3-Column Compact Grid Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Column 1: Balanced Left Sidebar Container */}
            <div className="lg:col-span-4 space-y-5">
              {/* Image Frame */}
              <div className="bg-white p-3 rounded-3xl shadow-sm border border-[#e2eae0]">
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-stone-50">
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
                  />
                </div>
              </div>

              {/* Dynamic Storage & Prep Quick Card (Fills up the empty white space beautifully) */}
              <div className="bg-white border border-[#e2eae0]/70 rounded-2xl p-5 shadow-sm space-y-3.5">
                <div className="flex items-center gap-1.5 text-[#556b2f] border-b border-stone-100 pb-2">
                  <Leaf size={14} />
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-900">
                    Sourcing & Freshness
                  </h3>
                </div>
                
                <div className="space-y-2.5 text-xs text-stone-600 font-medium">
                  <div className="flex gap-2 items-start">
                    <CheckCircle2 size={14} className="text-[#556b2f] shrink-0 mt-0.5" />
                    <p>100% Organic, fresh whole food selection.</p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <CheckCircle2 size={14} className="text-[#556b2f] shrink-0 mt-0.5" />
                    <p>Keep refrigerated inside a breathable bag for premium lifespan.</p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <CheckCircle2 size={14} className="text-[#556b2f] shrink-0 mt-0.5" />
                    <p>Wash thoroughly under cool running water before food prep.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2 & 3: Primary Data Layout Blocks */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Product Typography Header */}
              <div className="space-y-2">
                
                <p className="text-xs font-bold tracking-widest text-[#556b2f] uppercase">
                  {product.category || "Grocery Item"}
                </p>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  {product.name}
                </h1>
              </div>

              {/* Description Snippet */}
              <div className="bg-white border border-[#e2eae0]/60 rounded-2xl p-5 shadow-sm space-y-1.5">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Product Overview</h3>
                <p className="text-stone-600 leading-relaxed font-medium text-sm">
                  {product.description || "No overview profile details attached to this product block yet."}
                </p>
              </div>

              {/* Functional Nutrition Matrix */}
              <div className="bg-white border border-[#e2eae0] rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-[#556b2f] border-b border-stone-100 pb-2">
                  <Activity size={16} />
                  <h2 className="font-extrabold text-xs uppercase tracking-wider text-stone-900">
                    Nutrition Facts <span className="text-stone-400 font-normal lowercase">(per serving)</span>
                  </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { label: "Calories", val: `${product.calories ?? 0} kcal`, icon: Flame, color: "bg-amber-50/70 border-amber-100 text-amber-800" },
                    { label: "Protein", val: `${product.protein ?? 0} g`, icon: Dumbbell, color: "bg-indigo-50/70 border-indigo-100 text-indigo-800" },
                    { label: "Carbohydrates", val: `${product.carbohydrates ?? 0} g`, icon: Wheat, color: "bg-sky-50/70 border-sky-100 text-sky-800" },
                    { label: "Fat", val: `${product.fat ?? 0} g`, icon: Droplet, color: "bg-rose-50/70 border-rose-100 text-rose-800" },
                    { label: "Fiber", val: `${product.fiber ?? 0} g`, icon: Activity, color: "bg-emerald-50/70 border-emerald-100 text-emerald-800" },
                    { label: "Sugar", val: `${product.sugar ?? 0} g`, icon: Sparkles, color: "bg-pink-50/70 border-pink-100 text-pink-800" },
                  ].map((macro, idx) => {
                    const Icon = macro.icon;
                    return (
                      <div key={idx} className={`border rounded-xl p-3 flex flex-col justify-between gap-2.5 ${macro.color}`}>
                        <div className="flex items-center justify-between opacity-70">
                          <p className="text-[9px] font-bold uppercase tracking-wider">{macro.label}</p>
                          <Icon size={12} />
                        </div>
                        <h4 className="text-base font-black tracking-tight">{macro.val}</h4>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Assessment CTA Callout */}
              <div className="bg-[#f4f7f4] border border-[#e2eae0] rounded-2xl p-5 relative overflow-hidden group">
                <div className="absolute right-0 top-0 translate-x-6 -translate-y-6 text-[#556b2f]/5 pointer-events-none transition-transform group-hover:scale-110 duration-500">
                  <Sparkles size={100} />
                </div>

                <h3 className="font-extrabold text-stone-900 text-xs uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#556b2f] rounded-full inline-block" />
                  Personalized Recommendation Engine
                </h3>

                <p className="text-stone-600 text-xs leading-relaxed font-medium mb-4 max-w-2xl">
                  Wondering if <span className="font-bold text-[#556b2f]">{product.name}</span> matches your micro/macro balance profiles perfectly? Align your biometric targets instantly.
                </p>

                <button
                  onClick={() => router.push("/recommendation")}
                  className="inline-flex items-center gap-2 bg-[#556b2f] text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-[#465927] shadow-sm transition"
                >
                  <Sparkles size={14} />
                  View my recommendation history
                </button>
              </div>

            </div>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}