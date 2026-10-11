import { useEffect, useState } from 'react';
import { Bookmark, ChevronRight, Trash2, X } from 'lucide-react';
import { getFavorites, removeFavorite } from '../services/recipeApi';

const FavoritesDrawer = ({ isOpen, onClose, onSelectMeal }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setFavorites(getFavorites());
    }
  }, [isOpen]);

  const handleRemove = (e, idMeal) => {
    e.stopPropagation();
    const updated = removeFavorite(idMeal);
    setFavorites(updated);
  };

  const handleClearAll = () => {
    localStorage.removeItem('smart_recipe_favorites');
    setFavorites([]);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-modal border-l border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-700">
              <Bookmark className="w-5 h-5 fill-amber-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Saved Recipes</h2>
              <p className="text-xs text-slate-500">{favorites.length} recipes bookmarked</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer List */}
        <div className="p-5 overflow-y-auto flex-1 space-y-3">
          {favorites.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bookmark className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-slate-700">No saved recipes yet</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Click the bookmark button on any recipe card to save it for quick access later!
              </p>
            </div>
          ) : (
            favorites.map((meal) => (
              <div
                key={meal.idMeal}
                onClick={() => {
                  if (onSelectMeal) onSelectMeal(meal);
                  onClose();
                }}
                className="group flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-emerald-300 hover:shadow-md transition bg-white cursor-pointer"
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-16 h-16 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-slate-800 truncate group-hover:text-emerald-700 transition">
                    {meal.strMeal}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {meal.strCategory || 'Gourmet Dish'}
                  </p>
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-1">
                    Open recipe <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
                <button
                  onClick={(e) => handleRemove(e, meal.idMeal)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="Remove from favorites"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {favorites.length > 0 && (
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            <button
              onClick={handleClearAll}
              className="text-xs text-red-600 hover:text-red-700 font-semibold hover:underline"
            >
              Clear All Favorites
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesDrawer;
