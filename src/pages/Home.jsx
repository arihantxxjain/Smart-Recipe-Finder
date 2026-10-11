import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AiChefGenerator from '../components/AiChefGenerator';
import FeaturedRecipes from '../components/FeaturedRecipes';
import About from '../components/About';
import Testimonials from '../components/Testimonial';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import RecipeModal from '../components/RecipeModal';
import FavoritesDrawer from '../components/FavoritesDrawer';

export default function Home() {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favoritesDrawerOpen, setFavoritesDrawerOpen] = useState(false);

  return (
    <div className="font-sans min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar onOpenFavorites={() => setFavoritesDrawerOpen(true)} />

      <main>
        <Hero />
        <FeaturedRecipes onSelectMeal={(meal) => setSelectedMeal(meal)} />
        <AiChefGenerator />
        <About />
        <Testimonials />
        <ContactForm />
      </main>

      <Footer />

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
        onSelectMeal={(meal) => setSelectedMeal(meal)}
      />
    </div>
  );
}
