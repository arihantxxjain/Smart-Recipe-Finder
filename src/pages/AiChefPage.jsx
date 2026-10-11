import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AiChefGenerator from '../components/AiChefGenerator';
import FavoritesDrawer from '../components/FavoritesDrawer';
import RecipeModal from '../components/RecipeModal';

const AiChefPage = () => {
  const [favoritesDrawerOpen, setFavoritesDrawerOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar onOpenFavorites={() => setFavoritesDrawerOpen(true)} />
      <main className="pt-24 pb-16 flex-grow">
        <AiChefGenerator />
      </main>

      {selectedMeal && (
        <RecipeModal
          mealId={selectedMeal.idMeal}
          initialMeal={selectedMeal}
          onClose={() => setSelectedMeal(null)}
        />
      )}

      <FavoritesDrawer
        isOpen={favoritesDrawerOpen}
        onClose={() => setFavoritesDrawerOpen(false)}
        onSelectMeal={(m) => setSelectedMeal(m)}
      />
      <Footer />
    </div>
  );
};

export default AiChefPage;
