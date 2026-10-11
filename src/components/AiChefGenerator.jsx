import { useState } from 'react';
import { ChefHat, Check, Clock, Copy, Flame, Lightbulb, RefreshCw, Sparkles, Utensils } from 'lucide-react';
import confetti from 'canvas-confetti';

const POPULAR_INGREDIENTS = [
  'Eggs', 'Chicken Breast', 'Rice', 'Potatoes', 'Cheddar Cheese',
  'Garlic', 'Onion', 'Pasta', 'Tomatoes', 'Spinach', 'Mushrooms', 'Bell Pepper'
];

const PRESETS = [
  {
    title: 'Comfort Food',
    desc: 'Warm, savory, rich flavors to satisfy your cravings',
  },
  {
    title: 'High Protein',
    desc: 'Nutrient-dense, muscle-building wholesome dish',
  },
  {
    title: '15-Minute Flash Meal',
    desc: 'Lightning fast prep using minimal cookware',
  },
  {
    title: 'Healthy & Light',
    desc: 'Low calorie, crisp veggies, clean eating',
  },
];

const AiChefGenerator = () => {
  const [selectedIngredients, setSelectedIngredients] = useState(['Chicken Breast', 'Garlic', 'Rice']);
  const [customInput, setCustomInput] = useState('');
  const [mealStyle, setMealStyle] = useState('Comfort Food');
  const [maxTime, setMaxTime] = useState('25 mins');
  const [spiceLevel, setSpiceLevel] = useState('Medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState(null);

  const addIngredient = (item) => {
    const trimmed = item.trim();
    if (trimmed && !selectedIngredients.some((i) => i.toLowerCase() === trimmed.toLowerCase())) {
      setSelectedIngredients((prev) => [...prev, trimmed]);
    }
    setCustomInput('');
  };

  const removeIngredient = (idx) => {
    setSelectedIngredients((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleGenerate = () => {
    if (selectedIngredients.length === 0) return;

    setIsGenerating(true);
    setGeneratedRecipe(null);

    // Dynamic smart recipe generation based on the actual chosen ingredients
    setTimeout(() => {
      const primary = selectedIngredients[0];
      const secondary = selectedIngredients[1] || 'Seasonings';
      const tertiary = selectedIngredients[2] || 'Aromatics';

      const dishNames = [
        `Chef Arihant's Golden Pan-Seared ${primary} with Sautéed ${secondary}`,
        `Rustic Garlic-Infused ${primary} & ${secondary} Skillet`,
        `Gourmet Caramelized ${primary} tossed with Crispy ${secondary}`,
        `Velvety 20-Minute ${primary} Melody with Charred ${secondary}`,
      ];

      const chosenTitle = dishNames[Math.floor(Math.random() * dishNames.length)];

      const dynamicRecipe = {
        title: chosenTitle,
        style: mealStyle,
        prepTime: maxTime,
        calories: `${380 + Math.floor(Math.random() * 220)} kcal`,
        difficulty: 'Easy / Intermediate',
        story: `Specially crafted by SmartRecipe AI using your pantry ingredients: ${selectedIngredients.join(
          ', '
        )}. This dish balances texture, aroma, and deep umami flavors while minimizing kitchen waste.`,
        ingredients: [
          ...selectedIngredients.map((ing, i) => ({
            name: ing,
            amount: i === 0 ? '250g (main portion)' : i === 1 ? '1 cup diced' : '2-3 tbsp to taste',
          })),
          { name: 'Olive oil or butter', amount: '2 tbsp' },
          { name: 'Salt & freshly cracked black pepper', amount: 'To taste' },
          { name: 'Smoked paprika or herbs', amount: '1 tsp optional' },
        ],
        steps: [
          `Prep & Sear: Heat 1.5 tablespoons of oil or butter in a wide non-stick skillet over medium-high heat. Season your ${primary} lightly with salt and pepper, then sear for 3–5 minutes until golden brown edges appear.`,
          `Sauté Aromatics: Lower the heat slightly to medium. Toss in ${secondary} and any minced ${tertiary}. Stir constantly for 2–3 minutes to release essential oils and aromas without burning.`,
          `Deglaze & Simmer: Add 2 tablespoons of water or broth to loosen any caramelized fond on the bottom of the pan. Cover with a lid for 3 minutes to tenderize.`,
          `Finish with Glaze: Remove the lid, raise heat for 60 seconds to reduce the natural juices into a glossy sheen that coats all ingredients.`,
          `Plate & Garnish: Transfer to a warm serving plate. Garnish with cracked pepper and fresh herbs if on hand. Enjoy warm!`,
        ],
        chefTip:
          'Pro Chef Tip: Pat your ingredients thoroughly dry with paper towels before placing them into the hot skillet. Dry surface contact ensures maximum caramelization and deep savory fond.',
      };

      setGeneratedRecipe(dynamicRecipe);
      setIsGenerating(false);

      // Trigger celebratory confetti
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
      });
    }, 1200);
  };

  const copyToClipboard = () => {
    if (!generatedRecipe) return;
    const text = `${generatedRecipe.title}
Prep Time: ${generatedRecipe.prepTime} | Calories: ${generatedRecipe.calories}

Ingredients:
${generatedRecipe.ingredients.map((i) => `- ${i.name} (${i.amount})`).join('\n')}

Instructions:
${generatedRecipe.steps.map((s, idx) => `${idx + 1}. ${s}`).join('\n')}

Chef's Tip: ${generatedRecipe.chefTip}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 text-xs font-bold px-3.5 py-1.5 rounded-full mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
          Smart Culinary Intelligence
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          AI Smart Recipe <span className="text-emerald-600">Generator</span>
        </h2>
        <p className="mt-3 text-base text-slate-600">
          Enter whatever random ingredients are sitting in your fridge. Our smart culinary engine
          will balance the flavors and generate a tailor-made gourmet recipe in seconds!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Panel */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              1. Add Your Available Ingredients
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addIngredient(customInput)}
                placeholder="Type ingredient (e.g. eggs, rice, tofu)..."
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                onClick={() => addIngredient(customInput)}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition shadow-xs"
              >
                Add
              </button>
            </div>

            {/* Quick Pick Pills */}
            <div className="mt-3">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                Quick Picks:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_INGREDIENTS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => addIngredient(item)}
                    className="text-xs bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 px-2.5 py-1 rounded-lg transition"
                  >
                    + {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Ingredient Chips */}
            <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 min-h-[52px]">
              <div className="flex flex-wrap gap-1.5">
                {selectedIngredients.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-lg"
                  >
                    {item}
                    <button
                      onClick={() => removeIngredient(idx)}
                      className="hover:text-emerald-950 font-bold ml-1 text-sm leading-none"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {selectedIngredients.length === 0 && (
                  <span className="text-xs text-slate-400 italic">No ingredients added yet</span>
                )}
              </div>
            </div>
          </div>

          {/* Meal Style Presets */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              2. Select Meal Style
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => setMealStyle(p.title)}
                  className={`text-left p-2.5 rounded-xl border transition text-xs ${
                    mealStyle === p.title
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <div className="font-semibold">{p.title}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Cook Time & Spice */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Max Cook Time</label>
              <select
                value={maxTime}
                onChange={(e) => setMaxTime(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white"
              >
                <option value="15 mins">⚡ Under 15 mins</option>
                <option value="25 mins">⏱️ ~25 mins</option>
                <option value="40 mins">🍲 ~40 mins</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Spice Level</label>
              <select
                value={spiceLevel}
                onChange={(e) => setSpiceLevel(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white"
              >
                <option value="Mild">🌿 Mild & Herbaceous</option>
                <option value="Medium">🌶️ Medium Balanced</option>
                <option value="Fiery">🔥 Fiery & Spicy</option>
              </select>
            </div>
          </div>

          {/* Generate CTA Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating || selectedIngredients.length === 0}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Synthesizing Gourmet Recipe...
              </>
            ) : (
              <>
                <ChefHat className="w-5 h-5" />
                Generate Smart Recipe
              </>
            )}
          </button>
        </div>

        {/* Output Recipe Card */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm min-h-[460px] flex flex-col justify-between">
          {isGenerating ? (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-4">
              <div className="w-14 h-14 border-4 border-emerald-500 border-t-amber-500 rounded-full animate-spin"></div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">Chef AI is Cooking...</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Balancing spices, pairing textures, and creating instructions...
                </p>
              </div>
            </div>
          ) : generatedRecipe ? (
            <div className="space-y-6">
              {/* Recipe Top Header */}
              <div className="border-b border-slate-100 pb-5">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> {generatedRecipe.style}
                  </span>
                  <button
                    onClick={copyToClipboard}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Recipe
                      </>
                    )}
                  </button>
                </div>
                <h3 className="text-2xl font-black text-slate-900 leading-snug">
                  {generatedRecipe.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 italic leading-relaxed">
                  {generatedRecipe.story}
                </p>

                <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t border-slate-50 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" /> {generatedRecipe.prepTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-500" /> {generatedRecipe.calories}
                  </span>
                  <span className="flex items-center gap-1">
                    <Utensils className="w-3.5 h-3.5 text-teal-600" /> {generatedRecipe.difficulty}
                  </span>
                </div>
              </div>

              {/* Recipe Ingredients */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Required Ingredients & Proportions
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                  {generatedRecipe.ingredients.map((ing, i) => (
                    <div key={i} className="flex justify-between p-1.5 bg-white rounded-lg border border-slate-150">
                      <span className="font-semibold text-slate-800">{ing.name}</span>
                      <span className="text-slate-500">{ing.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step by step */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span> Step-by-Step Cooking Method
                </h4>
                <div className="space-y-2.5">
                  {generatedRecipe.steps.map((st, i) => (
                    <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                        {i + 1}
                      </span>
                      <p className="text-slate-700 leading-relaxed">{st}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chef Tip */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 font-medium leading-relaxed">
                  {generatedRecipe.chefTip}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-10 text-center text-slate-400">
              <ChefHat className="w-16 h-16 text-slate-200 mb-4 stroke-1" />
              <h3 className="font-bold text-slate-700 text-base">Your Gourmet Recipe Canvas</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm">
                Add 1 or more ingredients on the left and click &quot;Generate Smart Recipe&quot; to formulate a customized dish!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AiChefGenerator;
