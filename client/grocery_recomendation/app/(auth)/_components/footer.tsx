import Link from "next/link";
import { Leaf, Mail, MapPin, Heart, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-stone-900 text-stone-300 border-t border-stone-800/60 font-sans tracking-tight">
      
      {/* Primary Brand & Information Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">

        {/* Column 1: Logo & Mission Statement (Spans 4 columns for prominence) */}
        <div className="md:col-span-4 space-y-5">
          <Link href="/" className="flex items-center gap-3 group w-max">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <Leaf className="text-white" size={20} />
            </div>
            <h2 className="text-xl font-extrabold text-white tracking-tighter">
              Healthy<span className="text-emerald-500">Grocery</span>
            </h2>
          </Link>

          <p className="text-sm text-stone-400 leading-relaxed font-medium">
            An intelligent, personalization-first ecosystem designed to bridge real dietary parameters with verified nutritional analysis for an elevated grocery experience.
          </p>
        </div>

        {/* Column 2: Navigational Links (Spans 2 columns) */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white">
            Navigation
          </h3>
          <ul className="space-y-2.5 text-sm font-semibold">
            {[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/shop" },
              { label: "Recommendations", href: "/recommendation" },
              { label: "About Platform", href: "/about" }
            ].map((link, idx) => (
              <li key={idx}>
                <Link 
                  href={link.href} 
                  className="text-stone-400 hover:text-emerald-400 transition-colors duration-150 inline-flex items-center gap-0.5 group"
                >
                  {link.label}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Resource Links (Spans 3 columns) */}
        <div className="md:col-span-3 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white">
            Healthy Resources
          </h3>
          <ul className="space-y-2.5 text-sm font-medium text-stone-400">
            {[
              "Healthy Eating Tips",
              "Balanced Nutrition Indices",
              "Dietary Guidance Frameworks",
              "Nutrition Education Hub"
            ].map((tip, idx) => (
              <li key={idx} className="cursor-pointer hover:text-stone-200 transition-colors duration-150">
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Metadata & Academic Project Info (Spans 3 columns) */}
        <div className="md:col-span-3 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white">
            Project Matrix
          </h3>
          <div className="space-y-3.5 text-sm font-medium text-stone-400">
            <div className="flex items-center gap-2.5">
              <MapPin size={16} className="text-emerald-500 shrink-0" />
              <span>Kathmandu, Nepal</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail size={16} className="text-emerald-500 shrink-0" />
              <a href="mailto:support@healthygrocery.com" className="hover:text-emerald-400 transition-colors">
                support@healthygrocery.com
              </a>
            </div>

            <p className="text-xs leading-relaxed border-t border-stone-800/80 pt-3 text-stone-500 italic">
              Engineered as a definitive Final Year Capstone Project to advance consumer wellness literacy through personalized systems.
            </p>
          </div>
        </div>

      </div>

      {/* Border & Copyright Sub-Footer */}
      <div className="border-t border-stone-800/60 bg-stone-950/40">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-stone-500">

          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Healthy Grocery Recommendation System. All Rights Reserved.
          </p>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-stone-900 border border-stone-800/80 rounded-full">
            <span>Made with</span>
            <Heart size={12} className="text-rose-500 fill-rose-500 animate-pulse" />
            <span className="text-stone-400">for healthier living</span>
          </div>

        </div>
      </div>
    </footer>
  );
}