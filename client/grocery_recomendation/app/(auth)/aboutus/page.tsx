"use client";

import { useRouter } from "next/navigation";
import Header from "../_components/header";
import Footer from "../_components/footer";
import { 
  Sparkles, 
  Target, 
  ShieldCheck, 
  Heart, 
  Users, 
  Leaf,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  Apple
} from "lucide-react";

export default function AboutPage() {
  const router = useRouter();

  const handleCTA = () => {
    const token = localStorage.getItem("grocery_token");
    if (!token) {
      router.push("/login");
    } else {
      router.push("/recommendation");
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f5] flex flex-col justify-between">
      <div>
        <Header />

        <main className="bg-[#FAF9F5]">
          
          {/* Elegant Storytelling Hero */}
          <section className="relative overflow-hidden bg-gradient-to-br from-[#FAF9F5] via-[#F4F8F0] to-[#EBF3E3] border-b border-[#e2eae0]">
            <div className="absolute top-0 left-0 -z-10 w-[50%] h-[50%] rounded-full bg-radial from-[#e2ece0]/40 to-transparent blur-3xl pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-12 gap-12 items-center relative z-10">
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#d6e4d2] rounded-full text-xs font-extrabold uppercase tracking-wider text-[#556b2f] shadow-xs">
                  <Leaf size={12} className="text-[#556b2f]" /> Our Philosophy & Mission
                </span>

                <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] text-stone-900 tracking-tight">
                  Bridging Science <br />
                  <span className="text-[#556B2F]">With Your Grocery Cart.</span>
                </h1>

                <p className="text-stone-600 text-base lg:text-lg font-medium leading-relaxed max-w-xl">
                  We believe that eating healthy shouldn't require a biochemistry degree. Our platform translating complex clinical nutritional standards into straightforward, actionable grocery choices custom-tailored to your unique biology.
                </p>
              </div>

              {/* Interactive Mock Graphic Card */}
              <div className="lg:col-span-5 w-full h-full flex items-center justify-center">
                <div className="relative p-6 bg-white border border-[#e2eae0] rounded-[32px] shadow-sm max-w-sm w-full space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#EEF5E8] text-[#556B2F] rounded-xl">
                      <BrainCircuit size={24} />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-stone-900 text-sm">Algorithmic Nutrition</h4>
                      <p className="text-xs text-stone-400 font-semibold">Calculated biologically</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-xs font-bold text-stone-600">
                    <div className="flex justify-between bg-[#faf9f5] p-2.5 rounded-lg border border-stone-100">
                      <span className="text-stone-400">Personalization Accuracy</span>
                      <span className="text-[#556B2F]">99.4%</span>
                    </div>
                    <div className="flex justify-between bg-[#faf9f5] p-2.5 rounded-lg border border-stone-100">
                      <span className="text-stone-400">Allergen Protection</span>
                      <span className="text-emerald-600">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Core Computational Metrics (Stats Section) */}
          <section className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white border border-[#e2eae0] rounded-[24px] p-8 shadow-xs">
              {[
                { number: "10K+", label: "Daily Suggestions" },
                { number: "100%", label: "Allergen Monitored" },
                { number: "250+", label: "Verified Ingredients" },
                { number: "98.7%", label: "Customer Satisfaction" }
              ].map((stat, idx) => (
                <div key={idx} className="text-center space-y-1">
                  <div className="text-3xl lg:text-4xl font-black text-stone-900">{stat.number}</div>
                  <div className="text-[11px] font-extrabold text-[#556B2F] uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Behind the System (Our Core Pillars) */}
          <section className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-center mb-12">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#556B2F] bg-[#EEF5E8] px-2.5 py-1 rounded">
                The Principles
              </span>
              <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight mt-3">
                Built Upon Strict Scientific Pillars
              </h2>
              <p className="text-stone-500 font-medium text-sm mt-1 max-w-lg mx-auto">
                Our operations rely on three distinct operational laws designed with your longevity in mind.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Target className="text-[#556B2F]" size={20} />,
                  title: "Clinical Accuracy",
                  desc: "We analyze nutritional components relative to daily metabolic thresholds recommended by leading endocrinologists."
                },
                {
                  icon: <ShieldCheck className="text-emerald-600" size={20} />,
                  title: "Defensive Diagnostics",
                  desc: "Our systems constantly verify your allergen profile to filter out hidden proteins or cross-contaminated products."
                },
                {
                  icon: <Heart className="text-rose-600" size={20} />,
                  title: "Uncompromising Taste",
                  desc: "We believe that nutritional integration should feel like a premium lifestyle experience, never a restrictive chore."
                }
              ].map((pillar, idx) => (
                <div key={idx} className="bg-white border border-[#e2eae0] rounded-[20px] p-6 flex flex-col justify-between shadow-xs">
                  <div className="space-y-4">
                    <div className="p-2.5 bg-[#faf9f5] w-fit rounded-lg border border-stone-100">
                      {pillar.icon}
                    </div>
                    <h3 className="font-extrabold text-stone-950 text-base tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-stone-500 font-medium text-xs leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Interactive Story Timeline */}
          <section className="max-w-5xl mx-auto px-6 py-16 border-t border-[#e2eae0]">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">How We Got Here</h2>
              <p className="text-stone-500 font-medium text-sm mt-1">Tracing our journey back to our foundational roots.</p>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-[2px] before:bg-[#e2eae0]">
              {[
                {
                  year: "2024",
                  title: "Initial Integration Prototype",
                  desc: "We launched a lightweight nutritional scoring system to analyze individual barcode data for key inflammatory elements."
                },
                {
                  year: "2025",
                  title: "Biometric Auto-Tuning Engine",
                  desc: "Introduced deep integration algorithms connecting age, BMI, and customized fitness indexes directly to product matching."
                },
                {
                  year: "2026",
                  title: "Next-Gen Preventive Grocery Ecosystem",
                  desc: "Today, we offer fully dynamic, allergen-aware grocery recommendation matrices for users globally."
                }
              ].map((milestone, idx) => (
                <div key={idx} className={`relative flex flex-col sm:flex-row items-start ${idx % 2 === 0 ? "sm:flex-row-reverse" : ""} justify-between`}>
                  {/* Timeline dot */}
                  <div className="absolute left-4 sm:left-1/2 transform -translate-x-[7px] w-4.5 h-4.5 bg-[#556B2F] border-4 border-white rounded-full z-10" />
                  
                  <div className="w-full sm:w-[45%] pl-10 sm:pl-0">
                    <div className="bg-white border border-[#e2eae0] rounded-[20px] p-5 shadow-xs">
                      <span className="text-xs font-black text-[#556B2F] bg-[#EEF5E8] px-2 py-0.5 rounded-sm">
                        {milestone.year}
                      </span>
                      <h3 className="text-sm lg:text-base font-extrabold text-stone-900 tracking-tight mt-2.5">
                        {milestone.title}
                      </h3>
                      <p className="text-stone-500 font-medium text-xs mt-1.5 leading-relaxed">
                        {milestone.desc}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:block w-[45%]" />
                </div>
              ))}
            </div>
          </section>

          {/* Premium Vision Action Banner (CTA) */}
          <section className="max-w-7xl mx-auto px-6 py-20 border-t border-[#e2eae0]">
            <div className="bg-gradient-to-br from-[#556B2F] to-[#445625] rounded-[32px] p-10 lg:p-16 text-center space-y-6 text-white relative overflow-hidden shadow-md">
              {/* Abstract soft glow backdrop */}
              <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/5 blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-black/10 blur-2xl" />

              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[#EEF5E8]">
                <Sparkles size={11} /> Start Nourishing Smarter
              </span>

              <h2 className="text-3xl lg:text-5xl font-black tracking-tight max-w-xl mx-auto leading-tight">
                Ready to Upgrade Your Daily Grocery Choices?
              </h2>

              <p className="text-stone-200/90 font-medium text-sm lg:text-base max-w-lg mx-auto">
                Join thousands of individuals using calculated physiological targets to fuel longevity.
              </p>

              <div className="pt-4">
                <button
                  onClick={handleCTA}
                  className="bg-[#faf9f5] hover:bg-[#FAF9F5]/90 text-[#556B2F] px-8 py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition shadow-sm hover:shadow active:scale-[0.99] inline-flex items-center gap-2"
                >
                  Configure My Profile <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </section>

        </main>
      </div>

      <Footer />
    </div>
  );
}