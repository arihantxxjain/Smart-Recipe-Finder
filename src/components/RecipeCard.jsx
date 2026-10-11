import { useState } from 'react';
import { Bookmark, BookmarkCheck, ChevronRight, Sparkles } from 'lucide-react';
import { isFavorite, removeFavorite, saveFavorite } from '../services/recipeApi';

const RecipeCard = ({ meal, onSelect, onFavoriteToggled }) => {
  const [favorite, setFavorite] = useState(isFavorite(meal?.idMeal));

  const handleBookmark = (e) => {
    e.stopPropagation();
    if (!meal) return;
    if (favorite) {
      removeFavorite(meal.idMeal);
      setFavorite(false);
    } else {
      saveFavorite(meal);
      setFavorite(true);
    }
    if (onFavoriteToggled) onFavoriteToggled();
  };

  const title = meal?.strMeal || 'Delicious Recipe';
  const imgUrl = meal?.strMealThumb || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=600&q=80';

  return (
    <div
      onClick={() => onSelect && onSelect(meal)}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-150 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={imgUrl}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

        {/* Favorite Icon */}
        <button
          onClick={handleBookmark}
          aria-label={favorite ? 'Remove from favorites' : 'Save to favorites'}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition shadow-md ${
            favorite
              ? 'bg-amber-500 text-white'
              : 'bg-white/80 text-slate-700 hover:bg-white hover:text-amber-600'
          }`}
        >
          {favorite ? <BookmarkCheck className="w-4 h-4 fill-white" /> : <Bookmark className="w-4 h-4" />}
        </button>

        {meal?.strCategory && (
          <span className="absolute bottom-3 left-3 bg-slate-900/80 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-xs flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" /> {meal.strCategory}
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-emerald-700 transition">
            {title}
          </h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-1">
            {meal?.strArea ? `${meal.strArea} Style` : 'Chef tested & verified'}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 group-hover:translate-x-0.5 transition">
            View Recipe <ChevronRight className="w-3.5 h-3.5" />
          </span>
          <span className="text-[11px] font-medium text-slate-400">TheMealDB</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
