import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search, Sparkles, UtensilsCrossed } from 'lucide-react';
import heroBg from '../assets/hero-bg.jpg';

const POPULAR_TAGS = ['Chicken', 'Rice', 'Eggs', 'Cheese', 'Tomato', 'Pasta', 'Potato'];

const Hero = () => {
  const navigate = useNavigate();
  const [inputVal, setInputVal] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim()) {
      navigate(`/recipes?q=${encodeURIComponent(inputVal.trim())}`);
    } else {
      navigate('/recipes');
    }
  };

  const handleTagClick = (tag) => {
    navigate(`/recipes?q=${encodeURIComponent(tag)}`);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background with Dark/Emerald Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/80 to-emerald-950/85"></div>
      </div>

      <div className="relative max-w-5xl mx-auto text-center z-10 space-y-8">
        {/* Top Highlight Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-semibold backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          Smart Kitchen AI & Pantry Recipe Matcher
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.15]">
          Turn What’s In Your Fridge Into <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
            Delicious Gourmet Meals
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-300 leading-relaxed font-normal">
          Stop wondering what to cook tonight. Enter the ingredients you already have and discover
          tailored step-by-step recipes in seconds. Reduce waste, save money, and cook creatively.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-2 bg-white/10 p-2 rounded-2xl backdrop-blur-md border border-white/20 shadow-2xl"
        >
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white rounded-xl text-slate-800">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Enter ingredients: chicken, garlic, rice..."
              className="w-full bg-transparent focus:outline-none text-sm sm:text-base font-medium placeholder:text-slate-400"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-sm sm:text-base rounded-xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Find Recipes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Popular Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <span className="text-xs font-semibold text-slate-400">Popular pantry picks:</span>
          {POPULAR_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="text-xs bg-white/10 hover:bg-white/20 text-slate-200 px-3 py-1 rounded-full border border-white/10 backdrop-blur-xs transition"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Stats and Highlights */}
        <div className="grid grid-cols-3 max-w-lg mx-auto pt-6 border-t border-white/10 text-center gap-4">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">10,000+</div>
            <div className="text-[11px] sm:text-xs text-slate-400 font-medium">Recipes Indexed</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">0%</div>
            <div className="text-[11px] sm:text-xs text-slate-400 font-medium">Food Waste Goal</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">Instant</div>
            <div className="text-[11px] sm:text-xs text-slate-400 font-medium">Ingredient Match</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => navigate('/recipes')}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center gap-2 shadow-lg transition"
          >
            <UtensilsCrossed className="w-4 h-4" /> Go to Pantry Dashboard
          </button>
          <button
            onClick={() => navigate('/ai-chef')}
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 backdrop-blur-xs flex items-center gap-2 transition"
          >
            <Sparkles className="w-4 h-4 text-amber-400" /> AI Recipe Studio
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
