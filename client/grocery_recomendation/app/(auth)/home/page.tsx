import Link from "next/link";
import Image from "next/image";

import Header from "../_components/header";
import Footer from "../_components/footer";

import {
  UserPlus,
  ClipboardList,
  Sparkles,
  Apple,
  Carrot,
  Milk,
  Wheat,
  Fish,
  Heart,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#faf9f5] font-sans selection:bg-[#556b2f]/20 selection:text-[#3d4f21] antialiased text-stone-800">
      <Header />

      <main>
       {/* ================= HERO SECTION (Modern Premium Minimalist Layout) ================= */}
{/* ================= HERO SECTION (Warm Premium Olive & Linen Layout) ================= */}
<section className="relative overflow-hidden bg-gradient-to-b from-[#e1e9df] via-[#edf2eb] to-[#d9e5d4] pt-24 pb-20 md:pt-32 md:pb-28 border-b border-[#e2eae0]">
  {/* Soft Veggie Olive Glow Accents */}
  <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#808c73]/10 rounded-full blur-[120px] pointer-events-none" />
  <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-100/30 rounded-full blur-[120px] pointer-events-none" />

  <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
    
    {/* Left Column: Core Value Proposition */}
    <div className="lg:col-span-6 text-center md:text-left space-y-6 max-w-2xl mx-auto lg:mx-0">
      <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/90 border border-[#ccd6c4] rounded-full text-xs font-bold uppercase tracking-wider text-[#556b2f] backdrop-blur-sm shadow-sm">
        <Sparkles size={12} className="text-[#6b8e23]" /> Personalized Nutrition
      </span>

      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-stone-900">
        Eat Healthier. <br />
        <span className="bg-gradient-to-r from-[#556b2f] via-[#6b8e23] to-[#8a9a5b] bg-clip-text text-transparent">
          Shop Smarter.
        </span>
      </h1>

      <p className="text-lg text-stone-600 max-w-xl mx-auto md:mx-0 leading-relaxed font-medium">
        Discover healthier grocery products tailored to your nutritional needs, dietary preferences, and personal health goals through our recommendation system.
      </p>

      <div className="pt-4 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
        <Link
          href="/register"
          className="group inline-flex items-center justify-center gap-2 bg-[#556b2f] hover:bg-[#485b28] text-white font-extrabold px-8 py-4 rounded-2xl shadow-md shadow-olive-900/10 active:scale-[0.99] transition duration-200"
        >
          Get Started
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          href="/login"
          className="inline-flex items-center justify-center font-bold border border-[#ccd6c4] bg-white/80 hover:bg-white text-stone-700 px-8 py-4 rounded-2xl shadow-sm active:scale-[0.99] transition duration-200"
        >
          Login
        </Link>
      </div>
    </div>

    {/* Right Column: Premium Application UI Frame Mockup */}
    <div className="lg:col-span-6 flex justify-center relative">
      <div className="relative w-full max-w-[460px]">
        
        {/* Master Interface Frame using original canvas aesthetics */}
        <div className="bg-white p-3.5 rounded-[44px] shadow-2xl border border-[#e2eae0] relative overflow-hidden group">
          <div className="relative rounded-[34px] overflow-hidden bg-[#faf9f5]">
            <Image
              src="/heading.png"
              alt="Healthy Grocery Selection Dashboard Interface"
              width={440}
              height={440}
              className="w-full object-cover pointer-events-none select-none transition duration-500 group-hover:scale-[1.02]"
              priority
            />
          </div>

          {/* Floating Live Recommendation Micro-Widget */}
          <div className="absolute top-8 -left-6 bg-white/95 backdrop-blur-sm border border-[#ccd6c4] p-4 rounded-2xl shadow-lg max-w-[190px] hidden sm:flex items-center gap-3 transition-all duration-300 hover:-translate-y-0.5">
            <div className="w-9 h-9 rounded-xl bg-[#edf2eb] border border-[#e2eae0] flex items-center justify-center text-[#556b2f] shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Product Match</p>
              <h4 className="text-xs font-bold text-stone-800 leading-tight">98% Clean Rating</h4>
            </div>
          </div>

          {/* Floating Health Metric Badge Widget */}
          <div className="absolute bottom-8 -right-4 bg-[#556b2f] text-white p-4 rounded-2xl shadow-xl border border-[#485b28] max-w-[210px] hidden sm:block transition-all duration-300 hover:-translate-y-0.5">
            <div className="flex items-center justify-between gap-4 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#d9e5d4]">Dietary Targets</span>
              <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
            </div>
            <p className="text-xs text-[#f1f5f0]/90 leading-normal font-medium">
              Optimized macros tailored for <span className="text-white font-bold">Optimal Longevity</span> parameters.
            </p>
          </div>

        </div>
      </div>
    </div>

  </div>
</section>

         {/* ================= CATEGORIES SECTION ================= */}
        <section className="bg-[#faf9f5] border-y border-[#e2eae0] py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#556b2f]">Fresh Curation</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
                Healthy Categories
              </h2>
              <div className="h-1 w-10 bg-[#6b8e23] mx-auto rounded-full mt-3" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 mt-16">
              {[
                { icon: Apple, title: "Fruits", color: "hover:border-red-100 hover:bg-red-50/40 text-red-500 border-stone-200" },
                { icon: Carrot, title: "Vegetables", color: "hover:border-orange-100 hover:bg-orange-50/40 text-orange-500 border-stone-200" },
                { icon: Milk, title: "Dairy", color: "hover:border-sky-100 hover:bg-sky-50/40 text-sky-500 border-stone-200" },
                { icon: Wheat, title: "Grains", color: "hover:border-amber-100 hover:bg-amber-50/40 text-amber-600 border-stone-200" },
                { icon: Fish, title: "Protein", color: "hover:border-indigo-100 hover:bg-indigo-50/40 text-indigo-500 border-stone-200" },
                { icon: Heart, title: "Healthy Picks", color: "hover:border-pink-100 hover:bg-pink-50/40 text-pink-500 border-stone-200" },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`group bg-white border border-stone-200/40 rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 ${item.color}`}
                >
                  <item.icon
                    className="mx-auto group-hover:scale-105 transition-transform duration-200"
                    size={30}
                  />
                  <h3 className="mt-3.5 font-bold text-sm tracking-tight text-stone-700">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* ================= WHY CHOOSE US SECTION (White Background with Beautiful Olive Veggie Playcards) ================= */}
        <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-2xl mx-auto text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#556b2f]">Core Benefits</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
                Why Choose Our Platform?
              </h2>
              <p className="text-stone-500 font-medium text-sm max-w-2xl mx-auto leading-relaxed mt-2">
                Our recommendation system uses intelligent product mapping to match real dietary parameters with verified nutritional analysis.
              </p>
            </div>

           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
  {[
    { title: "Personalized Nutrition", desc: "Grocery suggestions are tailored directly to your health profile, preferences, and macronutrient targets.", icon: "🥗" },
    { title: "Health Goals", desc: "Whether you look to lose weight, maintain a premium lifestyle, or address target conditions.", icon: "🌱" },
    { title: "Smart Shopping", desc: "Save valuable micro-moments by uncovering pristine alternatives matching clean standards.", icon: "🛒" },
    { title: "Better Decisions", desc: "Gain analytical confidence using contextual transparency algorithms and grading charts.", icon: "📊" }
  ].map((feature, i) => (
    /* Beautiful deep olive veggie playcards matching the Get Started button */
    <div 
      key={i} 
      className="bg-[#556b2f] border border-[#485b28] rounded-[28px] p-7 shadow-sm hover:shadow-md hover:bg-[#485b28] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-white"
    >
      <div>
        {/* Soft cream icon badge to contrast against the deep olive */}
        <span className="text-2xl inline-block mb-4 p-2.5 bg-[#faf9f5] rounded-xl border border-[#e2eae0] shadow-sm">
          {feature.icon}
        </span>
        <h3 className="font-bold text-lg text-white mb-2 tracking-tight">
          {feature.title}
        </h3>
        <p className="text-[#f1f5f0]/90 text-sm leading-relaxed font-medium">
          {feature.desc}
        </p>
      </div>
    </div>
  ))}
</div>
          </div>
        </section>


                {/* ================= HOW IT WORKS SECTION (Beautiful Veggie Olive Background) ================= */}
        <section className="py-24 bg-[#f4f7f4] border-b border-[#e2eae0]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#556b2f]">Simplicity First</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
                How It Works
              </h2>
              <div className="h-1 w-10 bg-[#6b8e23] mx-auto rounded-full mt-3" />
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-16 relative">
              <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[2px] bg-[#ccd6c4]/40 -translate-y-8 z-0" />

              {/* Step 1 Playcard */}
              <div className="group relative bg-[#faf9f5] border border-[#e2eae0] rounded-3xl p-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:bg-white z-10">
                <div className="mx-auto w-14 h-14 bg-[#f4f7f4] border border-[#e2eae0] rounded-2xl flex items-center justify-center text-[#556b2f] shadow-sm group-hover:bg-[#556b2f] group-hover:text-white group-hover:border-[#556b2f] transition duration-300">
                  <UserPlus size={24} />
                </div>
                <h3 className="font-extrabold text-xl text-stone-900 mt-6">
                  Create Account
                </h3>
                <p className="mt-3 text-stone-600 text-sm leading-relaxed font-medium">
                  Register and begin your healthy grocery journey in less than a minute.
                </p>
              </div>

              {/* Step 2 Playcard */}
              <div className="group relative bg-[#faf9f5] border border-[#e2eae0] rounded-3xl p-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:bg-white z-10">
                <div className="mx-auto w-14 h-14 bg-[#f4f7f4] border border-[#e2eae0] rounded-2xl flex items-center justify-center text-[#556b2f] shadow-sm group-hover:bg-[#556b2f] group-hover:text-white group-hover:border-[#556b2f] transition duration-300">
                  <ClipboardList size={24} />
                </div>
                <h3 className="font-extrabold text-xl text-stone-900 mt-6">
                  Complete Profile
                </h3>
                <p className="mt-3 text-stone-600 text-sm leading-relaxed font-medium">
                  Enter your health criteria, dietary goals, and allergen requirements securely.
                </p>
              </div>

              {/* Step 3 Playcard */}
              <div className="group relative bg-[#faf9f5] border border-[#e2eae0] rounded-3xl p-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:bg-white z-10">
                <div className="mx-auto w-14 h-14 bg-[#f4f7f4] border border-[#e2eae0] rounded-2xl flex items-center justify-center text-[#556b2f] shadow-sm group-hover:bg-[#556b2f] group-hover:text-white group-hover:border-[#556b2f] transition duration-300">
                  <Sparkles size={24} />
                </div>
                <h3 className="font-extrabold text-xl text-stone-900 mt-6">
                  Get Recommendations
                </h3>
                <p className="mt-3 text-stone-600 text-sm leading-relaxed font-medium">
                  Receive curated, intelligent grocery recommendations tailor-made for your lifestyle.
                </p>
              </div>
            </div>
          </div>
        </section>

       

        {/* ================= HEALTHY TIPS & CALL TO ACTION ================= */}
        <section className="py-24 bg-[#faf9f5]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Daily Nutrition Tips Content Box (Earthy Olive Insights) */}
              <div className="lg:col-span-7 bg-[#f4f7f4] border border-[#e2eae0] rounded-[32px] p-8 sm:p-10 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 text-[#556b2f] mb-6">
                    <TrendingUp size={20} />
                    <h3 className="font-extrabold text-xl tracking-tight text-stone-900">
                      Daily Nutrition Insights
                    </h3>
                  </div>

                  <ul className="space-y-4 text-sm sm:text-base font-medium">
                    {[
                      { text: "Aim for at least five distinct color profiles of fresh fruit & produce.", icon: Apple, color: "text-red-500" },
                      { text: "Hydrate actively: maintain dynamic physical homeostasis with filtered water.", icon: Zap, color: "text-sky-500" },
                      { text: "Prioritize unrefined whole grains to guarantee complex fiber digestion.", icon: Wheat, color: "text-amber-600" },
                      { text: "Reduce reliance on ultra-processed simple sugars and high-sodium additives.", icon: ShieldCheck, color: "text-[#556b2f]" },
                      { text: "Incorporate balanced, clean essential amino acids across your food log.", icon: Fish, color: "text-indigo-500" }
                    ].map((li, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <li.icon size={18} className={`${li.color} shrink-0 mt-1`} />
                        <span className="leading-relaxed text-stone-600">{li.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-[#e2eae0] mt-6 text-xs font-bold uppercase tracking-wider text-stone-400">
                  Small habits build compound long-term longevity metrics.
                </div>
              </div>

              {/* Action Banner Panel (Deep Olive Garden Meadow Frame) */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#556b2f] to-[#485b28] rounded-[32px] p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden shadow-md shadow-olive-900/5">
                <div className="absolute inset-0 bg-white/[0.01] bg-[size:16px_16px] pointer-events-none" />
                
                <div className="relative z-10 space-y-4">
                  <h3 className="font-extrabold text-3xl tracking-tight leading-tight">
                    Start Your Healthy <br />Journey Today
                  </h3>
                  <p className="text-[#f1f5f0] text-sm sm:text-base leading-relaxed font-medium opacity-90">
                    Create your personal baseline profile and let our recommendation analytics evaluate grocery solutions matching your goals seamlessly.
                  </p>
                </div>

                <div className="relative z-10 pt-8">
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center bg-white hover:bg-stone-50 text-[#556b2f] font-extrabold px-8 py-3.5 rounded-2xl shadow-sm hover:shadow-md active:scale-[0.99] transition duration-200 text-sm sm:text-base"
                  >
                    Create Account
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}