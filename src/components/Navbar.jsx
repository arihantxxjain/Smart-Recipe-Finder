import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bookmark, ChefHat, Github, Menu, Sparkles, UtensilsCrossed, X } from 'lucide-react';
import { getFavorites } from '../services/recipeApi';

const Navbar = ({ onOpenFavorites }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [favCount, setFavCount] = useState(0);
  const location = useLocation();

  const updateCount = () => {
    setFavCount(getFavorites().length);
  };

  useEffect(() => {
    updateCount();
    window.addEventListener('storage', updateCount);
    return () => window.removeEventListener('storage', updateCount);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/85 backdrop-blur-md border-b border-slate-200/80 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition">
            <ChefHat className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-700 transition flex items-center gap-1">
              SmartRecipe <span className="text-emerald-600">Finder</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              By Arihant Jain
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 font-medium text-sm">
          <Link
            to="/"
            className={`px-3.5 py-2 rounded-lg transition ${
              isActive('/')
                ? 'text-emerald-700 bg-emerald-50 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Home
          </Link>
          <Link
            to="/recipes"
            className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 ${
              isActive('/recipes')
                ? 'text-emerald-700 bg-emerald-50 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4 text-emerald-600" /> Pantry Search
          </Link>
          <Link
            to="/ai-chef"
            className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 ${
              isActive('/ai-chef')
                ? 'text-emerald-700 bg-emerald-50 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" /> AI Recipe Gen
          </Link>
          <a
            href="/#about"
            className="px-3.5 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
          >
            About
          </a>
          <a
            href="/#contact"
            className="px-3.5 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
          >
            Contact
          </a>
        </div>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Favorites Button */}
          <button
            onClick={() => {
              updateCount();
              if (onOpenFavorites) onOpenFavorites();
            }}
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition text-sm font-semibold"
            title="View Saved Favorites"
          >
            <Bookmark className="w-4 h-4 text-amber-500" />
            <span>Saved</span>
            {favCount > 0 && (
              <span className="bg-emerald-600 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full">
                {favCount}
              </span>
            )}
          </button>

          {/* GitHub Repo Button */}
          <a
            href="https://github.com/arihantxxjain/Smart-Recipe-Finder"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition shadow-xs"
          >
            <Github className="w-4 h-4" />
            <span>Star on GitHub</span>
          </a>
        </div>

        {/* Mobile Menu Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => {
              updateCount();
              if (onOpenFavorites) onOpenFavorites();
            }}
            className="relative p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label="Favorites"
          >
            <Bookmark className="w-5 h-5 text-amber-500" />
            {favCount > 0 && (
              <span className="absolute top-1 right-1 bg-emerald-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {favCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-modal">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
          >
            Home
          </Link>
          <Link
            to="/recipes"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
          >
            <UtensilsCrossed className="w-4 h-4 text-emerald-600" /> Pantry Search
          </Link>
          <Link
            to="/ai-chef"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
          >
            <Sparkles className="w-4 h-4 text-amber-500" /> AI Recipe Gen
          </Link>
          <a
            href="/#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
          >
            About
          </a>
          <a
            href="/#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
          >
            Contact
          </a>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <a
              href="https://github.com/arihantxxjain/Smart-Recipe-Finder"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-800 text-sm font-semibold p-2"
            >
              <Github className="w-4 h-4" /> arihantxxjain/Smart-Recipe-Finder
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
