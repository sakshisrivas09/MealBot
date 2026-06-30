import React from 'react';
import { Clock, BarChart, Flame, Sparkles } from 'lucide-react';

export default function RecipeCard({ recipe, onClick, onStartCooking }) {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'bg-emerald-950/50 border-emerald-800/40 text-emerald-400';
      case 'medium':
        return 'bg-amber-950/50 border-amber-800/40 text-amber-400';
      case 'hard':
        return 'bg-rose-950/50 border-rose-800/40 text-rose-400';
      default:
        return 'bg-gray-800 border-gray-700 text-gray-400';
    }
  };

  const usedCount = recipe.ingredientsUsed?.length || 0;
  const missingCount = recipe.ingredientsMissing?.length || 0;
  const totalCount = usedCount + missingCount;
  const matchPercentage = totalCount > 0 ? Math.round((usedCount / totalCount) * 100) : 0;

  const handleStartCooking = (e) => {
    e.stopPropagation(); // Avoid triggering open modal
    onStartCooking(recipe);
  };

  return (
    <div
      onClick={onClick}
      className="glass-panel rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-800 hover:border-emerald-500/50 cursor-pointer transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1.5"
    >
      <div>
        {/* Match Percentage Badge */}
        <div className="flex justify-between items-start mb-4">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(recipe.difficulty)}`}>
            <BarChart className="w-3.5 h-3.5" />
            {recipe.difficulty || 'Easy'}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-950/30 border border-emerald-900/30 text-emerald-400 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
            {matchPercentage}% Match
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-100 group-hover:text-emerald-400 transition-colors mb-2 line-clamp-1">
          {recipe.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-400 mb-6 line-clamp-2 leading-relaxed">
          {recipe.description}
        </p>
      </div>

      <div>
        {/* Ingredient Count Summary */}
        <div className="flex gap-4 text-xs font-medium text-gray-400 mb-4 border-t border-gray-800/60 pt-4">
          <div>
            <span className="text-emerald-400 font-bold">{usedCount}</span> Have
          </div>
          <div>
            <span className="text-amber-500 font-bold">{missingCount}</span> Need
          </div>
        </div>

        {/* Specs footer */}
        <div className="flex justify-between text-xs text-gray-500 bg-gray-950/40 p-2.5 rounded-xl border border-gray-900/30 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span>Prep: {recipe.prepTime || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span>Cook: {recipe.cookTime || 'N/A'}</span>
          </div>
          {recipe.calories && (
            <div className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>{recipe.calories}</span>
            </div>
          )}
        </div>

        {/* Start Cooking CTA Button */}
        <button
          onClick={handleStartCooking}
          className="w-full py-3 bg-emerald-600/10 hover:bg-emerald-600 hover:text-slate-950 border border-emerald-500/20 text-emerald-400 rounded-xl font-bold transition-all text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md active:scale-95 group"
        >
          Start Cooking 🍳
        </button>
      </div>
    </div>
  );
}
