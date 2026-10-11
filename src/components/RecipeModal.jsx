import { useEffect, useState } from 'react';
import { Bookmark, BookmarkCheck, Check, Clock, ExternalLink, Globe, Sparkles, Utensils, X, Youtube } from 'lucide-react';
import { fetchRecipeDetails, isFavorite, removeFavorite, saveFavorite } from '../services/recipeApi';

const RecipeModal = ({ mealId, initialMeal, onClose, onFavoritesChanged }) => {
  const [meal, setMeal] = useState(initialMeal || null);
  const [loading, setLoading] = useState(!initialMeal?.strInstructions);
  const [bookmarked, setBookmarked] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState({});

  useEffect(() => {
    let isMounted = true;
    const loadDetails = async () => {
      if (mealId) {
        setBookmarked(isFavorite(mealId));
        if (!meal?.strInstructions) {
          setLoading(true);
          const details = await fetchRecipeDetails(mealId);
          if (isMounted && details) {
            setMeal(details);
          }
          if (isMounted) setLoading(false);
        }
      }
    };

    loadDetails();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      isMounted = false;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mealId, meal?.strInstructions, onClose]);

  const toggleFavorite = () => {
    if (!meal) return;
    if (bookmarked) {
      removeFavorite(meal.idMeal);
      setBookmarked(false);
    } else {
      saveFavorite(meal);
      setBookmarked(true);
    }
    if (onFavoritesChanged) onFavoritesChanged();
  };

  const toggleIngredientCheck = (idx) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  // Extract ingredients and measures (TheMealDB format: strIngredient1 to 20)
  const ingredientsList = [];
  if (meal) {
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ing && ing.trim()) {
        ingredientsList.push({
          ingredient: ing.trim(),
          measure: measure ? measure.trim() : '',
        });
      }
    }
  }

  // Parse instructions into steps
  const instructionSteps = meal?.strInstructions
    ? meal.strInstructions
        .split(/\r?\n+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 5 && !s.match(/^(STEP \d+|INSTRUCTIONS)/i))
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-modal border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-slate-900/60 hover:bg-slate-900 text-white p-2 rounded-full transition shadow-md"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 space-y-4">
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium">Loading recipe goodness...</p>
          </div>
        ) : meal ? (
          <div>
            {/* Header Hero Image */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-t-2xl">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent flex flex-col justify-end p-6">
                <div className="flex flex-wrap gap-2 mb-2">
                  {meal.strCategory && (
                    <span className="bg-emerald-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-xs flex items-center gap-1">
                      <Utensils className="w-3 h-3" /> {meal.strCategory}
                    </span>
                  )}
                  {meal.strArea && (
                    <span className="bg-amber-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-xs flex items-center gap-1">
                      <Globe className="w-3 h-3" /> {meal.strArea} Cuisine
                    </span>
                  )}
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {meal.strMeal}
                </h2>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-3.5 bg-slate-50/80">
              <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-600" /> ~25-35 mins
                </span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" /> {ingredientsList.length} Ingredients
                </span>
              </div>
              <button
                onClick={toggleFavorite}
                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                  bookmarked
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                {bookmarked ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-amber-600 fill-amber-500" /> Saved to Favorites
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" /> Save to Favorites
                  </>
                )}
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-8">
              {/* Ingredients Checklist */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    Ingredients Checklist
                  </h3>
                  <span className="text-xs text-slate-400">Click to check off as you cook</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {ingredientsList.map((item, idx) => {
                    const isChecked = checkedIngredients[idx];
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => toggleIngredientCheck(idx)}
                        className={`flex items-center justify-between text-left p-2.5 rounded-lg border transition text-sm ${
                          isChecked
                            ? 'bg-emerald-50/80 border-emerald-300 line-through text-slate-400'
                            : 'bg-white border-slate-200 text-slate-800 hover:border-emerald-400'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className={`w-4 h-4 rounded flex items-center justify-center border text-xs ${
                              isChecked
                                ? 'bg-emerald-500 border-emerald-500 text-white'
                                : 'border-slate-300'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </span>
                          <span className="font-medium">{item.ingredient}</span>
                        </span>
                        {item.measure && (
                          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            {item.measure}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step-by-Step Instructions */}
              <div>
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  Cooking Instructions
                </h3>
                {instructionSteps.length > 0 ? (
                  <div className="space-y-3">
                    {instructionSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-slate-100 shadow-xs hover:border-slate-200 transition"
                      >
                        <span className="shrink-0 w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <p className="text-slate-700 text-sm leading-relaxed pt-0.5">{step}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-600 text-sm whitespace-pre-line leading-relaxed bg-slate-50 p-4 rounded-xl">
                    {meal.strInstructions || 'No written instructions provided for this recipe.'}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
                {meal.strYoutube && (
                  <a
                    href={meal.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-xs transition"
                  >
                    <Youtube className="w-4 h-4" /> Watch Video Tutorial
                  </a>
                )}
                {meal.strSource && (
                  <a
                    href={meal.strSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm px-4 py-2.5 rounded-xl transition"
                  >
                    <ExternalLink className="w-4 h-4" /> Original Source
                  </a>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500">Recipe details could not be found.</div>
        )}
      </div>
    </div>
  );
};

export default RecipeModal;
