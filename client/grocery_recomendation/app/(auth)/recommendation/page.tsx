"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../_components/header";
import Footer from "../_components/footer";
import api from "@/lib/api/axios";
import { 
  Sparkles, 
  Activity, 
  User, 
  Target, 
  ShieldAlert, 
  Apple, 
  Eye, 
  Loader2, 
  Compass 
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

export default function RecommendationPage() {
  const [formData, setFormData] = useState({
    age: 18,
    gender: "Female",
    height: 160,
    weight: 55,
    goal: "Healthy Eating",
    diet: "Balanced Diet",
    allergies: "",
  });

  useEffect(() => {
  loadProfile();
}, []);

const loadProfile = async () => {
  try {
    const response = await api.get("/profile");

    if (response.data.data) {
      const profile = response.data.data;

      setFormData({
        age: profile.age,
        gender: profile.gender,
        height: profile.height,
        weight: profile.weight,
        goal: profile.goal,
        diet: profile.diet,
        allergies: profile.allergies.join(", "),
      });

      // Load latest saved recommendations
      if (
        profile.recommendationHistory &&
        profile.recommendationHistory.length > 0
      ) {
        const latest =
          profile.recommendationHistory[
            profile.recommendationHistory.length - 1
          ];

        setRecommendations(latest.products);
        setHasSearched(true);
      }
    }
  } catch (error) {
    console.log("No saved profile found.");
  }
};

  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateRecommendations = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setHasSearched(true);

    try {
      await api.put("/profile", {
  age: Number(formData.age),
  gender: formData.gender,
  height: Number(formData.height),
  weight: Number(formData.weight),
  goal: formData.goal,
  diet: formData.diet,
  allergies: formData.allergies
    ? formData.allergies.split(",").map((item) => item.trim())
    : [],
});
      const response = await api.post("/recommendations", {
        ...formData,
        age: Number(formData.age),
        height: Number(formData.height),
        weight: Number(formData.weight),
        allergies: formData.allergies
          ? formData.allergies.split(",").map((item) => item.trim())
          : [],
      });

      setRecommendations(response.data.data || response.data);

await loadProfile();
    } catch (error: any) {
  console.log("FULL ERROR:", error);

  if (error.response) {
    console.log("Status:", error.response.status);
    console.log("Data:", error.response.data);

    alert(error.response.data.message);
  } else {
    alert(error.message);
  }
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f5] flex flex-col justify-between">
      <div>
        <Header />

        <main className="max-w-7xl mx-auto px-6 py-12">
          
          {/* Top Hero Description Banner */}
          <section className="pb-8 border-b border-[#e2eae0] mb-10 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f4f7f4] border border-[#e2eae0] rounded-full text-xs font-bold uppercase tracking-wider text-[#556b2f]">
              <Compass size={12} /> Computational Macro Formulation
            </span>
            <h1 className="text-4xl font-extrabold text-stone-900 tracking-tight">
              Personalized Grocery Recommendation
            </h1>
            <p className="text-stone-600 font-medium max-w-3xl leading-relaxed">
              Fill in your biometrics and health aspirations below. Our computational nutrition system will instantly align your profile data with optimal grocery components.
            </p>
          </section>

          {/* Core Grid System Layout */}
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Premium Biometrics Matrix Form Input Card */}
            <form 
              onSubmit={generateRecommendations}
              className="lg:col-span-4 bg-white border border-[#e2eae0] p-6 rounded-[32px] shadow-sm space-y-6"
            >
              <div className="flex items-center gap-2 text-[#556b2f] border-b border-stone-100 pb-3">
                <User size={18} />
                <h2 className="font-extrabold text-xs uppercase tracking-wider text-stone-900">
                  Biometric Data Framework
                </h2>
              </div>

              {/* Age, Height, Weight Compact Grid */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full bg-stone-50/50 border border-[#e2eae0] rounded-xl px-4 py-3 text-sm font-bold text-stone-900 outline-none focus:bg-white focus:border-[#556b2f] transition"
                      required
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full bg-stone-50/50 border border-[#e2eae0] rounded-xl px-3 py-3 text-sm font-bold text-stone-900 outline-none focus:bg-white focus:border-[#556b2f] transition"
                    >
                      <option>Female</option>
                      <option>Male</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Height (cm)</label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      className="w-full bg-stone-50/50 border border-[#e2eae0] rounded-xl px-4 py-3 text-sm font-bold text-stone-900 outline-none focus:bg-white focus:border-[#556b2f] transition"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Weight (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      className="w-full bg-stone-50/50 border border-[#e2eae0] rounded-xl px-4 py-3 text-sm font-bold text-stone-900 outline-none focus:bg-white focus:border-[#556b2f] transition"
                      required
                    />
                  </div>
                </div>

                {/* Target Strategy Dropdowns */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
                    <Target size={12} /> Target Fitness Goal
                  </label>
                  <select
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}
                    className="w-full bg-stone-50/50 border border-[#e2eae0] rounded-xl px-3 py-3 text-sm font-bold text-stone-900 outline-none focus:bg-white focus:border-[#556b2f] transition"
                  >
                    <option>Healthy Eating</option>
                    <option>Weight Loss</option>
                    <option>Weight Gain</option>
                    <option>Maintain Weight</option>
                    <option>Build Muscle</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
                    <Apple size={12} /> Dietary Framework
                  </label>
                  <select
                    name="diet"
                    value={formData.diet}
                    onChange={handleChange}
                    className="w-full bg-stone-50/50 border border-[#e2eae0] rounded-xl px-3 py-3 text-sm font-bold text-stone-900 outline-none focus:bg-white focus:border-[#556b2f] transition"
                  >
                    <option>Balanced Diet</option>
                    <option>Vegetarian</option>
                    <option>Vegan</option>
                    <option>High Protein</option>
                    <option>Low Carb</option>
                  </select>
                </div>

                {/* Optional Allergen Boundaries */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
                    <ShieldAlert size={12} /> Allergen Exclusions
                  </label>
                  <input
                    type="text"
                    name="allergies"
                    placeholder="e.g., Peanuts, Dairy, Gluten"
                    value={formData.allergies}
                    onChange={handleChange}
                    className="w-full bg-stone-50/50 border border-[#e2eae0] rounded-xl px-4 py-3 text-sm font-medium text-stone-900 placeholder-stone-400 outline-none focus:border-[#556b2f] transition"
                  />
                  <p className="text-[10px] text-stone-400 font-medium tracking-tight">Separate targets with commas.</p>
                </div>
              </div>

              {/* Functional CTA Execution Trigger */}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#556b2f] hover:bg-[#485b28] text-white font-extrabold px-6 py-3.5 rounded-xl shadow-sm disabled:opacity-50 transition duration-200"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Calculating Vectors...
                  </>
                ) : (
                  "Generate Recommendations"
                )}
              </button>
            </form>

            {/* Right Column: Interactive Evaluation Panel Grid Results */}
            <div className="lg:col-span-8">
              {loading ? (
                /* Dynamic Loading State Skeleton Grid */
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, idx) => (
                    <div key={idx} className="bg-white border border-[#e2eae0] rounded-[20px] p-3 space-y-3 animate-pulse">
                      <div className="bg-stone-200/60 aspect-[4/3] w-full rounded-xl" />
                      <div className="h-3.5 bg-stone-200/60 rounded w-2/3" />
                      <div className="h-14 bg-stone-100 rounded-lg w-full" />
                      <div className="h-8 bg-stone-100 rounded-lg w-full" />
                    </div>
                  ))}
                </div>
              ) : !hasSearched ? (
                /* Initial Idle Empty Callout Frame */
                <div className="text-center py-24 bg-white border border-[#e2eae0] border-dashed rounded-[32px] p-8 max-w-lg mx-auto shadow-sm">
                  <div className="bg-[#f4f7f4] w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#556b2f]">
                    <Activity size={26} />
                  </div>
                  <h3 className="text-xl font-bold text-stone-900">Awaiting Profile Matrix</h3>
                  <p className="text-stone-500 text-sm mt-1.5 leading-relaxed max-w-xs mx-auto">
                    Fill out the diagnostic framework parameters on the left to map target grocery categories dynamically.
                  </p>
                </div>
              ) : recommendations.length === 0 ? (
                /* Real Null Results fallback */
                <div className="text-center py-24 bg-white border border-[#e2eae0] border-dashed rounded-[32px] p-8 max-w-lg mx-auto shadow-sm">
                  <div className="bg-rose-50 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-rose-600">
                    <ShieldAlert size={26} />
                  </div>
                  <h3 className="text-xl font-bold text-stone-900">Zero Target Alignments</h3>
                  <p className="text-stone-500 text-sm mt-1.5 leading-relaxed max-w-xs mx-auto">
                    No recommendations found. We couldn't find any products that match your current health goals and dietary preferences. Try selecting a different parameter.
                  </p>
                </div>
              ) : (
                /* Compact Output Matrix Product Cards */
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center gap-2 text-stone-800">
                    <Sparkles size={16} className="text-[#556b2f]" />
                    <h2 className="text-lg font-extrabold tracking-tight">Recommended Healthy Grocery Products For You</h2>
                  </div>

                  {/* Enhanced 3-Column Grid for smaller items */}
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {recommendations.map((product) => {
                      const imageUrl = `http://localhost:5001/uploads/products/${product.image}`;

                      return (
                        <div
                          key={product._id}
                          className="bg-white border border-[#e2eae0] rounded-[20px] p-3 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
                        >
                          <div>
                            {/* Product Media Layout Window */}
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-stone-50 border border-stone-100 mb-3">
                              <img
                                src={imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>

                            <span className="text-[9px] font-extrabold tracking-wider text-[#556b2f] uppercase bg-[#f4f7f4] px-2 py-0.5 rounded">
                              {product.category || "Grocery Pack"}
                            </span>

                            <h3 className="text-sm font-extrabold text-stone-900 tracking-tight mt-2 line-clamp-1">
                              {product.name}
                            </h3>

                            {/* Denser Micro Metrics Array Section */}
                            <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-2.5 bg-[#faf9f5] p-2 rounded-lg border border-stone-100 text-[11px] font-bold text-stone-600">
                              <div className="flex justify-between border-b border-stone-200/50 pb-1">
                                <span className="text-stone-400 font-semibold">Cal</span>
                                <span className="text-stone-800">{product.calories}k</span>
                              </div>
                              <div className="flex justify-between border-b border-stone-200/50 pb-1">
                                <span className="text-stone-400 font-semibold">Prot</span>
                                <span className="text-[#556b2f]">{product.protein}g</span>
                              </div>
                              <div className="flex justify-between border-b border-stone-200/50 pb-1">
                                <span className="text-stone-400 font-semibold">Carb</span>
                                <span className="text-stone-800">{product.carbohydrates}g</span>
                              </div>
                              <div className="flex justify-between border-b border-stone-200/50 pb-1">
                                <span className="text-stone-400 font-semibold">Fat</span>
                                <span className="text-stone-800">{product.fat}g</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-stone-400 font-semibold">Fib</span>
                                <span className="text-stone-800">{product.fiber}g</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-stone-400 font-semibold">Sug</span>
                                <span className="text-stone-800">{product.sugar}g</span>
                              </div>
                            </div>
                          </div>

                          {/* Detail Navigation Action Core */}
                          <Link
                            href={`/products/${product._id}`}
                            className="mt-3.5 w-full inline-flex items-center justify-center gap-1.5 bg-[#556b2f] hover:bg-[#485b28] text-white text-[11px] font-bold py-2 rounded-lg transition shadow-sm"
                          >
                            <Eye size={12} /> View Nutritional Details
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}