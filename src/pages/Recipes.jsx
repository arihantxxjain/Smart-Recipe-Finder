import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Dices, Filter, Plus, RefreshCw, Search, Sparkles, Trash2, UtensilsCrossed } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import RecipeModal from '../components/RecipeModal';
import FavoritesDrawer from '../components/FavoritesDrawer';
import { fetchCategories, fetchCuisines, fetchRandomRecipe, searchRecipes } from '../services/recipeApi';

const QUICK_PANTRY_ITEMS = [
  'Chicken', 'Rice', 'Eggs', 'Cheese', 'Tomato',
  'Garlic', 'Onion', 'Potato', 'Pasta', 'Mushroom', 'Spinach', 'Lemon'
];

const Recipes = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [ingredients, setIngredients] = useState(initialQuery ? [initialQuery] : []);
  const [ingredientInput, setIngredientInput] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const [category, setCategory] = useState('');
  const [cuisine, setCuisine] = useState('');

  const [categoriesList, setCategoriesList] = useState([]);
  const [cuisinesList, setCuisinesList] = useState([]);

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Modals
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favoritesDrawerOpen, setFavoritesDrawerOpen] = useState(false);

  // Load Categories and Cuisines on mount
  useEffect(() => {
    const initFilters = async () => {
      const [cats, cuis] = await Promise.all([fetchCategories(), fetchCuisines()]);
      setCategoriesList(cats);
      setCuisinesList(cuis);
    };
    initFilters();
  }, []);

  // Run search when ingredients or filters change
  const executeSearch = async (overrideParams = {}) => {
    setLoading(true);
    setError('');

    const searchObj = {
      ingredients: overrideParams.ingredients !== undefined ? overrideParams.ingredients : ingredients,
      category: overrideParams.category !== undefined ? overrideParams.category : category,
      cuisine: overrideParams.cuisine !== undefined ? overrideParams.cuisine : cuisine,
      keyword: overrideParams.keyword !== undefined ? overrideParams.keyword : keywordInput,
    };

    try {
      const results = await searchRecipes(searchObj);
      if (results && results.length > 0) {
        setMeals(results);
      } else {
        setMeals([]);
        setError('No recipes found matching these criteria. Try adjusting your ingredients or filters.');
      }
    } catch {
      setError('Failed to fetch recipes. Please check your internet connection.');
    }
    setLoading(false);
  };

  useEffect(() => {
    executeSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, cuisine]);

  const addIngredient = (itemToAdd) => {
    const trimmed = (itemToAdd || ingredientInput).trim();
    if (trimmed && !ingredients.some((i) => i.toLowerCase() === trimmed.toLowerCase())) {
      const newIngs = [...ingredients, trimmed];
      setIngredients(newIngs);
      setIngredientInput('');
      executeSearch({ ingredients: newIngs });
    }
  };

  const removeIngredient = (idx) => {
    const newIngs = ingredients.filter((_, i) => i !== idx);
    setIngredients(newIngs);
    executeSearch({ ingredients: newIngs });
  };

  const clearAllIngredients = () => {
    setIngredients([]);
    executeSearch({ ingredients: [] });
  };

  const handleKeywordSearch = (e) => {
    e.preventDefault();
    executeSearch({ keyword: keywordInput });
  };

  const handleSurpriseMe = async () => {
    setLoading(true);
    const randomMeal = await fetchRandomRecipe();
    setLoading(false);
    if (randomMeal) {
      setSelectedMeal(randomMeal);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar onOpenFavorites={() => setFavoritesDrawerOpen(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-26 pb-16 flex-grow w-full">
        {/* Page Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            Smart Pantry Engine
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Pantry Recipe <span className="text-emerald-600">Finder</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Tell us what is in your kitchen, or filter by category and cuisine to discover what you can cook right now.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left Column: Virtual Pantry */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  My Virtual Pantry
                </h2>
                <p className="text-xs text-slate-500">Add 1 or more ingredients</p>
              </div>
              {ingredients.length > 0 && (
                <button
                  onClick={clearAllIngredients}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 hover:underline"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              )}
            </div>

            {/* Input Form */}
            <div className="flex gap-2">
              <input
                type="text"
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addIngredient()}
                placeholder="Add ingredient (e.g. chicken, garlic, rice, eggs)..."
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                onClick={() => addIngredient()}
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition shadow-xs flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>

            {/* Quick Pick tags */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Quick Pantry Add:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_PANTRY_ITEMS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => addIngredient(item)}
                    className="text-xs bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200 border border-transparent text-slate-700 px-2.5 py-1.5 rounded-lg transition"
                  >
                    + {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Pantry Tags Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 min-h-[70px]">
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold text-xs px-3 py-1.5 rounded-xl shadow-2xs"
                  >
                    <span>{ing}</span>
                    <button
                      onClick={() => removeIngredient(idx)}
                      className="hover:text-red-700 font-black ml-1 text-sm leading-none"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {ingredients.length === 0 && (
                  <p className="text-xs text-slate-400 italic">
                    Your pantry is empty. Type an ingredient above or tap quick adds!
                  </p>
                )}
              </div>
            </div>

            {/* Search Action */}
            <button
              onClick={() => executeSearch()}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Find Recipes With These Ingredients
            </button>
          </div>

          {/* Right Column: Filters & Recipe Name Search */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Filter className="w-4 h-4 text-amber-500" />
                Refine by Category & Cuisine
              </h2>
              <p className="text-xs text-slate-500">Fine-tune your culinary discovery</p>
            </div>

            {/* Keyword Search */}
            <form onSubmit={handleKeywordSearch} className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  placeholder="Search by recipe name (e.g. Curry, Pizza)..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition"
              >
                Search
              </button>
            </form>

            {/* Category Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Meal Category
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setIngredients([]);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">All Categories (Vegetarian, Chicken, Seafood, etc.)</option>
                {categoriesList.map((c) => (
                  <option key={c.idCategory} value={c.strCategory}>
                    {c.strCategory}
                  </option>
                ))}
              </select>
            </div>

            {/* Cuisine Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Cuisine / Region
              </label>
              <select
                value={cuisine}
                onChange={(e) => {
                  setCuisine(e.target.value);
                  setIngredients([]);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">All Cuisines (Italian, Indian, Mexican, etc.)</option>
                {cuisinesList.map((c) => (
                  <option key={c} value={c}>
                    {c} Cuisine
                  </option>
                ))}
              </select>
            </div>

            {/* Surprise Me Button */}
            <div className="pt-2">
              <button
                onClick={handleSurpriseMe}
                type="button"
                className="w-full py-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Dices className="w-4 h-4 text-amber-600" />
                Surprise Me! (Pick Random Recipe)
              </button>
            </div>
          </div>
        </div>

        {/* Recipes Results Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                Matching Recipes
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                  {meals.length} Available
                </span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {ingredients.length > 0
                  ? `Filtered by ingredients: ${ingredients.join(', ')}`
                  : category
                  ? `Showing ${category} recipes`
                  : cuisine
                  ? `Showing ${cuisine} dishes`
                  : 'Popular culinary selections'}
              </p>
            </div>

            <button
              onClick={() => executeSearch()}
              className="text-xs text-slate-600 hover:text-emerald-700 font-semibold flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs hover:bg-slate-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh Results
            </button>
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div className="py-20 flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-4 border-emerald-500 border-t-amber-500 rounded-full animate-spin"></div>
              <p className="text-sm font-semibold text-slate-600">Fetching delicious recipes...</p>
            </div>
          )}

          {/* Error Message */}
          {!loading && error && (
            <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl text-center space-y-2 max-w-xl mx-auto">
              <p className="text-sm font-bold text-amber-900">{error}</p>
              <p className="text-xs text-amber-700">
                Tip: TheMealDB works best with common ingredients like &quot;Chicken&quot;, &quot;Beef&quot;, &quot;Eggs&quot;, &quot;Cheese&quot;, or by exploring categories.
              </p>
            </div>
          )}

          {/* Recipe Grid */}
          {!loading && meals.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {meals.map((meal) => (
                <RecipeCard
                  key={meal.idMeal}
                  meal={meal}
                  onSelect={(m) => setSelectedMeal(m)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Recipe Detail Modal */}
      {selectedMeal && (
        <RecipeModal
          mealId={selectedMeal.idMeal}
          initialMeal={selectedMeal}
          onClose={() => setSelectedMeal(null)}
        />
      )}

      {/* Favorites Drawer */}
      <FavoritesDrawer
        isOpen={favoritesDrawerOpen}
        onClose={() => setFavoritesDrawerOpen(false)}
        onSelectMeal={(m) => setSelectedMeal(m)}
      />

      <Footer />
    </div>
  );
};

export default Recipes;
