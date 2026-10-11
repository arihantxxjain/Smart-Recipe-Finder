import { useState } from 'react';
import { Clock, Flame, Sparkles } from 'lucide-react';
import pasta from '../assets/pasta.jpg';
import salad from '../assets/salad.jpg';
import paneer from '../assets/paneer.jpg';
import dosa from '../assets/dosa.jpg';
import eggplantparmesan from '../assets/eggplantparmesan.jpg';
import salmonasparagus from '../assets/salmonasparagus.jpg';
import stirfry from '../assets/stirfry.jpg';
import tacos from '../assets/tacos.jpg';

const FEATURED_ITEMS = [
  {
    idMeal: 'custom-1',
    strMeal: 'Creamy Tuscan Tomato Pasta',
    strMealThumb: pasta,
    strCategory: 'Pasta',
    strArea: 'Italian',
    time: '20 mins',
    cal: '420 kcal',
    tag: 'Vegetarian',
    strInstructions:
      'Boil pasta in salted water until al dente.\nSauté minced garlic in extra virgin olive oil.\nStir in tomato passata and double cream until smooth.\nCombine pasta with the sauce, top with fresh basil and aged parmesan.',
  },
  {
    idMeal: 'custom-2',
    strMeal: 'Crispy South Indian Masala Dosa',
    strMealThumb: dosa,
    strCategory: 'Breakfast',
    strArea: 'Indian',
    time: '35 mins',
    cal: '310 kcal',
    tag: 'Vegan',
    strInstructions:
      'Prepare seasoned spiced potato filling with mustard seeds and curry leaves.\nSpread fermented rice-lentil batter on a piping hot flat skillet into a thin circle.\nDrizzle ghee around the edges until golden and crisp.\nWrap around the potato masala and serve with coconut chutney.',
  },
  {
    idMeal: 'custom-3',
    strMeal: 'Spicy Shahi Paneer Curry',
    strMealThumb: paneer,
    strCategory: 'Vegetarian',
    strArea: 'Indian',
    time: '30 mins',
    cal: '480 kcal',
    tag: 'High Protein',
    strInstructions:
      'Sauté onions, tomatoes, ginger, and garlic, then blend into a silken gravy.\nSimmer gravy with butter, garam masala, and fresh cream.\nAdd fresh paneer cubes and let soak up the rich flavors for 5 minutes.\nGarnish with kasuri methi and fresh cilantro.',
  },
  {
    idMeal: 'custom-4',
    strMeal: 'Mediterranean Salmon & Asparagus',
    strMealThumb: salmonasparagus,
    strCategory: 'Seafood',
    strArea: 'Mediterranean',
    time: '25 mins',
    cal: '390 kcal',
    tag: 'High Protein',
    strInstructions:
      'Season salmon fillets with sea salt, lemon zest, and dill.\nArrange fresh asparagus spears beside the fish on a baking sheet.\nDrizzle with olive oil and bake at 200°C for 14 minutes until tender and flaky.',
  },
  {
    idMeal: 'custom-5',
    strMeal: 'Zesty Street-Style Street Tacos',
    strMealThumb: tacos,
    strCategory: 'Dinner',
    strArea: 'Mexican',
    time: '20 mins',
    cal: '350 kcal',
    tag: 'Quick Meal',
    strInstructions:
      'Warm small corn tortillas over an open flame.\nFill with seasoned protein of your choice.\nTop with diced red onion, fresh cilantro, salsa verde, and lime wedges.',
  },
  {
    idMeal: 'custom-6',
    strMeal: 'Fresh Summer Garden Salad',
    strMealThumb: salad,
    strCategory: 'Salad',
    strArea: 'American',
    time: '10 mins',
    cal: '190 kcal',
    tag: 'Vegan',
    strInstructions:
      'Toss crisp mixed greens, heirloom tomatoes, and cucumber slices.\nWhisk together Dijon mustard, olive oil, and balsamic vinegar.\nDrizzle dressing lightly over the greens right before serving.',
  },
  {
    idMeal: 'custom-7',
    strMeal: 'Classic Eggplant Parmesan Bake',
    strMealThumb: eggplantparmesan,
    strCategory: 'Vegetarian',
    strArea: 'Italian',
    time: '45 mins',
    cal: '410 kcal',
    tag: 'Comfort Food',
    strInstructions:
      'Slice eggplants, salt them, and bread with breadcrumbs and herbs.\nShallow fry slices until crisp and golden brown.\nLayer in a baking dish with rich marinara and mozzarella, bake until bubbling.',
  },
  {
    idMeal: 'custom-8',
    strMeal: 'Rainbow Veggie & Tofu Stir-Fry',
    strMealThumb: stirfry,
    strCategory: 'Asian',
    strArea: 'Chinese',
    time: '15 mins',
    cal: '280 kcal',
    tag: 'Quick Meal',
    strInstructions:
      'Heat sesame oil in a smoking hot wok.\nToss in sliced bell peppers, broccoli florets, and crispy tofu cubes.\nStir in garlic, ginger, and tamari sauce for 4 minutes until crisp-tender.',
  },
];

const FILTER_TABS = ['All', 'Vegetarian', 'Quick Meal', 'High Protein'];

const FeaturedRecipes = ({ onSelectMeal }) => {
  const [activeTab, setActiveTab] = useState('All');

  const filtered =
    activeTab === 'All'
      ? FEATURED_ITEMS
      : FEATURED_ITEMS.filter((item) => item.tag === activeTab || item.strCategory === activeTab);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-slate-50">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase">
          Curated Highlights
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
          Most Loved Home Recipes
        </h2>
        <p className="mt-3 text-base text-slate-600">
          Hand-picked reader favorites engineered for maximum taste with everyday pantry staples.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                activeTab === tab
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((item) => (
          <div
            key={item.idMeal}
            onClick={() => onSelectMeal && onSelectMeal(item)}
            className="group bg-white rounded-2xl overflow-hidden border border-slate-150 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="relative overflow-hidden aspect-[4/3]">
              <img
                src={item.strMealThumb}
                alt={item.strMeal}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> {item.tag}
              </span>
            </div>

            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-emerald-700 transition">
                  {item.strMeal}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                  {item.strArea} • {item.strCategory}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" /> {item.time}
                </span>
                <span className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500" /> {item.cal}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedRecipes;
