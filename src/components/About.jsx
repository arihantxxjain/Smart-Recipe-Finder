import { Award, Leaf, ShieldCheck, Zap } from 'lucide-react';
import cookingImg from '../assets/cooking.jpg';

const About = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Image with Badge */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img
              src={cookingImg}
              alt="Cooking fresh ingredients in a modern kitchen"
              className="w-full h-auto object-cover"
            />
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-800">100% Free & Open</div>
              <div className="text-xs text-slate-500">Created by Arihant Jain</div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            Our Mission & Purpose
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Stop Grocery Guesswork. <br />
            <span className="text-emerald-600">Cook Confidently</span> with What You Own.
          </h2>

          <p className="text-base text-slate-600 leading-relaxed">
            The average household throws away up to 30% of perishable groceries each month simply
            because they don’t know what to make with random ingredients. Smart Recipe Finder was
            created to eliminate that frustration by providing instant, reliable, and delicious
            recipes matched to your exact pantry contents.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <Zap className="w-4 h-4 text-emerald-600" /> Instant Matching
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connects directly to TheMealDB database and smart AI models to provide verified
                ingredients and methods in milliseconds.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Zero Food Waste
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                By prioritizing items you already have, you save hundreds on impulse takeout and
                keep fresh produce out of landfills.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
