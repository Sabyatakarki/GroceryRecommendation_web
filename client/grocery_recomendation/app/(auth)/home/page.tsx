"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../_components/header";
import Footer from "../_components/footer";
import api from "@/lib/api/axios";
import { 
  Sparkles, 
  ArrowRight, 
  Eye,
  Loader2,
  Grid,
  TrendingUp,
  HeartHandshake,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

interface Product {
  _id: string;
  name: string;
  image: string;
  category: string;
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
  sugar: number;
}

export default function HomePage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data?.data?.slice(0, 6) || []);
    } catch (error) {
      console.error("Failed to load catalog metrics:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const requireLogin = (path: string) => {
    const token = localStorage.getItem("grocery_token");

    if (!token) {
      router.push("/login");
      return;
    }

    router.push(path);
  };

  return (
    <div className="min-h-screen bg-[#faf9f5] flex flex-col justify-between">
      <div>
        <Header />

        <main className="bg-[#FAF9F5]">
          
          {/* Vibrant Hero Section */}
          <section className="relative overflow-hidden bg-gradient-to-br from-[#FAF9F5] via-[#F4F8F0] to-[#EBF3E3] border-b border-[#e2eae0]">
            {/* Soft decorative background glow */}
            <div className="absolute top-0 right-0 -z-10 w-[40%] h-[60%] rounded-full bg-radial from-[#e2ece0]/60 to-transparent blur-3xl pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-12 gap-12 items-center relative z-10">
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#d6e4d2] rounded-full text-xs font-extrabold uppercase tracking-wider text-[#556b2f] shadow-xs">
                  <Sparkles size={12} className="animate-pulse text-[#556b2f]" /> Healthy Grocery Recommendation System
                </span>

                <h1 className="text-5xl lg:text-[72px] font-extrabold leading-[1.1] text-stone-900 tracking-tight">
                  Eat Better. <br />
                  <span className="text-[#556B2F] bg-clip-text">Shop Smarter.</span>
                </h1>

                <p className="text-stone-600 text-base lg:text-lg font-medium leading-relaxed max-w-xl">
                  Discover highly nutritious grocery products customized precisely to your biology and fitness metrics. Step away from guesswork and embrace data-driven healthy eating today.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => requireLogin("/recommendation")}
                    className="bg-[#556B2F] hover:bg-[#465a27] text-white px-8 py-4 rounded-xl font-extrabold text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition duration-200 active:scale-[0.99]"
                  >
                    Get Recommendation
                  </button>

                  <button
                    onClick={() => requireLogin("/products")}
                    className="border border-[#c6d8c2] bg-white/80 backdrop-blur-xs text-stone-700 hover:bg-white px-8 py-4 rounded-xl font-extrabold text-sm uppercase tracking-wider shadow-xs transition duration-200 active:scale-[0.99]"
                  >
                    Browse Products
                  </button>
                </div>
              </div>

              {/* Hero Visual Block */}
              <div className="lg:col-span-5 w-full h-full flex items-center justify-center">
                <div className="relative p-2.5 bg-white/90 backdrop-blur-xs border border-[#e2eae0] rounded-[32px] shadow-md hover:shadow-xl transition-all duration-500">
                  <img
                    src="/heading.png"
                    className="w-full max-h-[380px] object-cover rounded-[24px]"
                    alt="Healthy Grocery Showcase"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Featured Products (Refined to be beautifully compact) */}
          <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#556B2F] bg-[#EEF5E8] px-2.5 py-1 rounded-sm">
                  Top Curated Picks
                </span>
                <h2 className="text-2xl lg:text-3xl font-extrabold text-stone-900 tracking-tight mt-2.5">
                  Highly Nutritious Products
                </h2>
                <p className="text-stone-500 font-medium text-sm mt-1">
                  Explore outstanding profiles from our healthiest grocery catalog.
                </p>
              </div>

              <button
                onClick={() => requireLogin("/shop")}
                className="inline-flex items-center gap-1.5 text-[#556B2F] font-extrabold text-xs uppercase tracking-wider hover:underline transition"
              >
                View All <ArrowRight size={14} />
              </button>
            </div>

            {loadingProducts ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-3">
                <Loader2 className="w-8 h-8 animate-spin text-[#556B2F]" />
                <p className="text-xs font-bold uppercase tracking-wider text-stone-400">Loading catalog matrix...</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => {
                  const imageUrl = `http://localhost:5001/uploads/products/${product.image}`;

                  return (
                    <div
                      key={product._id}
                      onClick={() => requireLogin(`/products/${product._id}`)}
                      className="bg-white border border-[#e2eae0] rounded-[20px] p-3.5 flex flex-col justify-between shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                    >
                      <div>
                        {/* Compact Image Frame */}
                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-stone-50 border border-stone-100 mb-3">
                          <img
                            src={imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        <span className="text-[9px] font-extrabold tracking-wider text-[#556b2f] uppercase bg-[#f4f7f4] px-2 py-0.5 rounded-sm">
                          {product.category || "Grocery Item"}
                        </span>

                        <h3 className="text-sm lg:text-base font-extrabold text-stone-900 tracking-tight mt-1.5 line-clamp-1">
                          {product.name}
                        </h3>

                        {/* Compact Micro Nutrition Grid */}
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-2.5 bg-[#faf9f5] p-2.5 rounded-lg border border-stone-100 text-[11px] font-bold text-stone-600">
                          <div className="flex justify-between border-b border-stone-200/40 pb-0.5">
                            <span className="text-stone-400 font-semibold">Calories</span>
                            <span className="text-stone-800">{product.calories}kcal</span>
                          </div>
                          <div className="flex justify-between border-b border-stone-200/40 pb-0.5">
                            <span className="text-stone-400 font-semibold">Protein</span>
                            <span className="text-[#556b2f]">{product.protein}g</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-stone-400 font-semibold">Carbs</span>
                            <span className="text-stone-800">{product.carbohydrates}g</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-stone-400 font-semibold">Fat</span>
                            <span className="text-stone-800">{product.fat}g</span>
                          </div>
                        </div>
                      </div>

                      {/* Details Trigger Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          requireLogin(`/products/${product._id}`);
                        }}
                        className="mt-3.5 w-full inline-flex items-center justify-center gap-1.5 bg-[#556b2f] hover:bg-[#465a27] text-white text-[11px] font-extrabold uppercase tracking-wider py-2.5 rounded-lg transition duration-200 shadow-xs"
                      >
                        <Eye size={12} /> View Details
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Browse by Category */}
          <section className="max-w-7xl mx-auto px-6 py-20 border-t border-[#e2eae0]">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#EEF5E8] border border-[#e2eae0] rounded-full text-xs font-extrabold uppercase tracking-wider text-[#556b2f]">
                <Grid size={12} /> System Categorization
              </span>
              <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight mt-3">
                Browse by Category
              </h2>
              <p className="text-stone-500 font-medium text-sm mt-1 max-w-lg mx-auto">
                Sort, explore, and isolate healthy components tailored by dietary groups.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: "Fruits", emoji: "🍎" },
                { name: "Vegetables", emoji: "🥦" },
                { name: "Grains", emoji: "🌾" },
                { name: "Protein", emoji: "🥚" },
                { name: "Dairy", emoji: "🥛" },
                { name: "Nuts", emoji: "🥜" },
              ].map((item) => (
                <div
                  key={item.name}
                  onClick={() => requireLogin("/products")}
                  className="cursor-pointer bg-white border border-[#e2eae0] rounded-[20px] p-5 text-center hover:-translate-y-1 hover:shadow-md transition duration-300 group"
                >
                  <div className="text-4xl transition-transform duration-300 group-hover:scale-110">
                    {item.emoji}
                  </div>
                  <h3 className="mt-3 font-extrabold text-stone-800 text-xs tracking-tight">
                    {item.name}
                  </h3>
                </div>
              ))}
            </div>
          </section>

          {/* Why Choose Our Platform */}
          <section className="max-w-7xl mx-auto px-6 py-20 border-t border-[#e2eae0]">
            <div className="text-center mb-14">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#556B2F] bg-[#EEF5E8] px-2.5 py-1 rounded">
                Our Capabilities
              </span>
              <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight mt-3">
                Why Choose Our Recommendation System?
              </h2>
              <p className="text-stone-500 font-medium text-sm mt-2 max-w-xl mx-auto leading-relaxed">
                We combine scientific macronutrient targets with a secure, highly intuitive environment to build healthier lives.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Sparkles className="text-emerald-600" size={20} />,
                  title: "Personalized Engine",
                  desc: "Receive curated foods dynamically adjusted to match your age, BMI, and calorie parameters.",
                  bg: "bg-emerald-50/50 border-emerald-100"
                },
                {
                  icon: <TrendingUp className="text-[#556B2F]" size={20} />,
                  title: "Detailed Analytics",
                  desc: "Review precise calculations for calories, protein, carbs, fibers, and fats beforehand.",
                  bg: "bg-[#F8FBF6] border-[#E6EFE2]"
                },
                {
                  icon: <HeartHandshake className="text-amber-600" size={20} />,
                  title: "Optimized Wellness",
                  desc: "Avoid allergic ingredients and discover nutrient-rich food alternatives automatically.",
                  bg: "bg-amber-50/50 border-amber-100"
                },
                {
                  icon: <ShieldCheck className="text-sky-600" size={20} />,
                  title: "Secure Framework",
                  desc: "Save your health profiles and calculated targets securely in your dynamic dashboard.",
                  bg: "bg-sky-50/50 border-sky-100"
                }
              ].map((card, index) => (
                <div key={index} className={`border rounded-[20px] p-6 flex flex-col items-center text-center shadow-xs ${card.bg}`}>
                  <div className="p-2.5 bg-white rounded-xl shadow-xs border border-stone-100 mb-3.5">
                    {card.icon}
                  </div>
                  <h3 className="text-sm font-extrabold text-stone-900 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-stone-500 font-semibold text-xs mt-2 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Healthy Eating Tips */}
          <section className="max-w-7xl mx-auto px-6 py-20 border-t border-[#e2eae0]">
            <div className="text-center mb-12">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#556B2F] bg-[#EEF5E8] px-2.5 py-1 rounded">
                Daily Integration
              </span>
              <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight mt-3">
                Healthy Eating Tips
              </h2>
              <p className="text-stone-500 font-medium text-sm mt-1">
                Small consistent daily adaptations lead to massive wellness upgrades over time.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  emoji: "🥦",
                  title: "Eat More Vegetables",
                  desc: "Fill at least half your meal plan with fresh vegetables to maximize essential mineral, enzyme, and fiber absorption."
                },
                {
                  emoji: "🍎",
                  title: "Choose Fresh Fruits",
                  desc: "Replace highly processed artificial sweets with seasonal organic fruits for clean, immediate ATP production."
                },
                {
                  emoji: "💧",
                  title: "Prioritize Hydration",
                  desc: "Ensure adequate daily water intake to assist complex cellular absorption, joint lubrication, and digestive processes."
                },
                {
                  emoji: "🥚",
                  title: "Anchor with Proteins",
                  desc: "Prioritize lean source structures to preserve skeletal mass index levels and elevate muscle tissue integration."
                }
              ].map((tip, idx) => (
                <div key={idx} className="bg-white border border-[#e2eae0] rounded-[20px] p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="text-4xl mb-3.5">{tip.emoji}</div>
                    <h3 className="font-extrabold text-stone-950 text-sm tracking-tight">
                      {tip.title}
                    </h3>
                    <p className="text-stone-500 font-medium text-xs mt-2 leading-relaxed">
                      {tip.desc}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-[#556B2F] uppercase">
                    <CheckCircle2 size={12} /> Lifestyle Habit
                  </div>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>

      <Footer />
    </div>
  );
}