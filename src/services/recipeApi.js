// Smart Recipe API & LocalStorage helper

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Fetch categories
export const fetchCategories = async () => {
  try {
    const res = await fetch(`${BASE_URL}/categories.php`);
    const data = await res.json();
    return data.categories || [];
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
};

// Fetch areas / cuisines
export const fetchCuisines = async () => {
  try {
    const res = await fetch(`${BASE_URL}/list.php?a=list`);
    const data = await res.json();
    return data.meals ? data.meals.map(m => m.strArea) : [];
  } catch (error) {
    console.error('Failed to fetch cuisines:', error);
    return [];
  }
};

// Fetch single recipe details by ID
export const fetchRecipeDetails = async idMeal => {
  try {
    const res = await fetch(`${BASE_URL}/lookup.php?i=${idMeal}`);
    const data = await res.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error('Failed to fetch recipe details:', error);
    return null;
  }
};

// Fetch random recipe
export const fetchRandomRecipe = async () => {
  try {
    const res = await fetch(`${BASE_URL}/random.php`);
    const data = await res.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error('Failed to fetch random recipe:', error);
    return null;
  }
};

// Search recipes by keyword or ingredient or category or cuisine
export const searchRecipes = async ({ ingredients = [], category = '', cuisine = '', keyword = '' }) => {
  try {
    // 1. If keyword is provided, search by meal name
    if (keyword && keyword.trim().length > 0) {
      const res = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(keyword.trim())}`);
      const data = await res.json();
      return data.meals || [];
    }

    // 2. If ingredients are provided
    if (ingredients.length > 0) {
      if (ingredients.length === 1) {
        const res = await fetch(`${BASE_URL}/filter.php?i=${encodeURIComponent(ingredients[0].trim().toLowerCase())}`);
        const data = await res.json();
        return data.meals || [];
      } else {
        // Multi-ingredient matching: fetch for first ingredient and rank/score
        const primaryIng = ingredients[0].trim().toLowerCase();
        const res = await fetch(`${BASE_URL}/filter.php?i=${encodeURIComponent(primaryIng)}`);
        const data = await res.json();
        const primaryMeals = data.meals || [];

        // If secondary ingredients exist, also query second ingredient to combine/intersect
        if (ingredients.length > 1 && primaryMeals.length > 0) {
          const secondIng = ingredients[1].trim().toLowerCase();
          const res2 = await fetch(`${BASE_URL}/filter.php?i=${encodeURIComponent(secondIng)}`);
          const data2 = await res2.json();
          const secondMeals = data2.meals || [];

          if (secondMeals.length > 0) {
            const secondIds = new Set(secondMeals.map(m => m.idMeal));
            const intersected = primaryMeals.filter(m => secondIds.has(m.idMeal));
            if (intersected.length > 0) {
              return intersected;
            }
          }
        }
        return primaryMeals;
      }
    }

    // 3. If category is selected
    if (category) {
      const res = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
      const data = await res.json();
      return data.meals || [];
    }

    // 4. If cuisine is selected
    if (cuisine) {
      const res = await fetch(`${BASE_URL}/filter.php?a=${encodeURIComponent(cuisine)}`);
      const data = await res.json();
      return data.meals || [];
    }

    // Default: fetch recipes starting with popular letter or generic search
    const res = await fetch(`${BASE_URL}/search.php?s=chicken`);
    const data = await res.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};

// Favorites Storage helpers
const FAVORITES_KEY = 'smart_recipe_favorites';

export const getFavorites = () => {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveFavorite = recipe => {
  try {
    const current = getFavorites();
    const exists = current.some(r => r.idMeal === recipe.idMeal);
    if (!exists) {
      const updated = [recipe, ...current];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return updated;
    }
    return current;
  } catch {
    return [];
  }
};

export const removeFavorite = idMeal => {
  try {
    const current = getFavorites();
    const updated = current.filter(r => r.idMeal !== idMeal);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
};

export const isFavorite = idMeal => {
  const current = getFavorites();
  return current.some(r => r.idMeal === idMeal);
};
