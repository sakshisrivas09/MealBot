import React, { useState } from 'react';
import { ChefHat, AlertTriangle, BookOpen } from 'lucide-react';
import LandingPage from './components/LandingPage';
import CookingMode from './components/CookingMode';
import IngredientSelector from './components/IngredientSelector';
import RecipeCard from './components/RecipeCard';
import RecipeDetailsModal from './components/RecipeDetailsModal';
import RecipeSkeleton from './components/RecipeSkeleton';
import { generateRecipes } from './services/api';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing'); // landing, app, cooking
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [activeCookingRecipe, setActiveCookingRecipe] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleGenerate = async (ingredients, dietary) => {
    setLoading(true);
    setError(null);
    setRecipes([]);
    setHasSearched(true);

    try {
      const data = await generateRecipes(ingredients, dietary);
      if (data && data.recipes) {
        setRecipes(data.recipes);
      } else {
        setError("Invalid response format received from server. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 
        "Could not connect to the backend server. Make sure it's running on http://localhost:8080 and that your GEMINI_API_KEY is set."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStartCooking = (recipe) => {
    setActiveCookingRecipe(recipe);
    setSelectedRecipe(null);
    setCurrentPage('cooking');
  };

  return (
    <div className="min-h-screen pb-16 bg-[#0b0f19]">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Navbar Header */}
      <header className="border-b border-gray-800/80 bg-gray-900/30 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div 
            onClick={() => setCurrentPage('landing')} 
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div className="bg-gradient-to-tr from-emerald-500 to-teal-400 p-2.5 rounded-xl shadow-lg shadow-emerald-500/10">
              <ChefHat className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-1.5 m-0">
                Meal<span className="text-gradient">Bot</span>
              </h1>
              <p className="text-[10px] text-gray-400 font-medium">AI-Powered Chef</p>
            </div>
          </div>
          
          <nav className="flex items-center gap-6">
            <button
              onClick={() => setCurrentPage('landing')}
              className={`text-sm font-semibold transition-colors cursor-pointer ${
                currentPage === 'landing' ? 'text-emerald-400 font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('app')}
              className={`text-sm font-semibold transition-colors cursor-pointer ${
                currentPage === 'app' ? 'text-emerald-400 font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              Recipe Finder
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-6xl mx-auto px-4 mt-12 space-y-12">
        {currentPage === 'landing' && (
          <LandingPage onStart={() => setCurrentPage('app')} />
        )}

        {currentPage === 'cooking' && (
          <CookingMode recipe={activeCookingRecipe} onBack={() => setCurrentPage('app')} />
        )}

        {currentPage === 'app' && (
          <>
            {/* Banner Section */}
            <section className="text-center max-w-2xl mx-auto space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
              <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                Cook with what you <span className="text-gradient">have</span>
              </h2>
              <p className="text-gray-400 text-base leading-relaxed">
                Enter the ingredients lingering in your fridge or pantry. MealBot will cook up to 5 customized recipes matching your dietary preferences.
              </p>
            </section>

            {/* Input Selector Panel */}
            <section className="relative z-10">
              <IngredientSelector onGenerate={handleGenerate} loading={loading} />
            </section>

            {/* Error Notification */}
            {error && (
              <section className="max-w-3xl mx-auto glass-panel border-rose-900/30 bg-rose-950/10 p-5 rounded-2xl flex items-start gap-3 shadow-lg">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-rose-400 font-bold text-sm">Failed to suggest recipes</h4>
                  <p className="text-gray-300 text-xs mt-1 leading-relaxed">{error}</p>
                </div>
              </section>
            )}

            {/* Skeleton Loader during Queries */}
            {loading && (
              <section className="space-y-6">
                <h3 className="text-lg font-bold text-gray-400 text-center animate-pulse">
                  Consulting the AI Chef...
                </h3>
                <RecipeSkeleton />
              </section>
            )}

            {/* Recipe Suggestion Results */}
            {!loading && hasSearched && recipes.length > 0 && (
              <section className="space-y-6">
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2 border-b border-gray-800/80 pb-4">
                  <BookOpen className="w-5 h-5 text-emerald-400" />
                  Suggested Culinary Creations ({recipes.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  {recipes.map((recipe, index) => (
                    <RecipeCard
                      key={index}
                      recipe={recipe}
                      onClick={() => setSelectedRecipe(recipe)}
                      onStartCooking={handleStartCooking}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Empty Search Results Edge-Case */}
            {!loading && hasSearched && !error && recipes.length === 0 && (
              <section className="text-center py-12 glass-panel rounded-2xl max-w-xl mx-auto border-gray-800">
                <ChefHat className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-200">No matching recipes found</h3>
                <p className="text-sm text-gray-400 mt-2 px-6">
                  Try adding a broader range of ingredients or checking your spelling!
                </p>
              </section>
            )}
          </>
        )}
      </main>

      {/* Active Recipe Details Modal */}
      {selectedRecipe && (
        <RecipeDetailsModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onStartCooking={handleStartCooking}
        />
      )}

      {/* Simple Footer */}
      <footer className="text-center text-xs text-gray-600 mt-24 pt-8 border-t border-gray-900/60 max-w-6xl mx-auto px-4">
        &copy; {new Date().getFullYear()} MealBot. Built with ❤️ by Sakshi Srivastava.
      </footer>
    </div>
  );
}
