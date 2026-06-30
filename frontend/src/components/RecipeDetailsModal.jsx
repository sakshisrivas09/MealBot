import React, { useEffect } from 'react';
import { X, Clock, Flame, CheckCircle2, AlertCircle } from 'lucide-react';

export default function RecipeDetailsModal({ recipe, onClose, onStartCooking }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!recipe) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300"
      ></div>

      {/* Modal Container */}
      <div className="relative glass-panel w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10 border border-gray-800 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex justify-between items-start p-6 md:p-8 border-b border-gray-800/80 bg-gray-900/40">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white text-gradient">
              {recipe.name}
            </h2>
            <p className="text-gray-400 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
              {recipe.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-xl transition-all cursor-pointer shadow-md"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="overflow-y-auto p-6 md:p-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left Column (Metadata + Ingredients) */}
            <div className="md:col-span-5 space-y-6">
              {/* Quick Specs */}
              <div className="grid grid-cols-3 gap-3 bg-gray-950/60 p-4 rounded-2xl border border-gray-900/50">
                <div className="text-center">
                  <div className="flex justify-center mb-1">
                    <Clock className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="block text-[10px] text-gray-500 uppercase tracking-wider">Prep Time</span>
                  <span className="text-xs font-bold text-gray-200">{recipe.prepTime || 'N/A'}</span>
                </div>
                <div className="text-center border-x border-gray-800/60">
                  <div className="flex justify-center mb-1">
                    <Clock className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="block text-[10px] text-gray-500 uppercase tracking-wider">Cook Time</span>
                  <span className="text-xs font-bold text-gray-200">{recipe.cookTime || 'N/A'}</span>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-1">
                    <Flame className="w-4 h-4 text-orange-400" />
                  </div>
                  <span className="block text-[10px] text-gray-500 uppercase tracking-wider">Calories</span>
                  <span className="text-xs font-bold text-gray-200">{recipe.calories || 'N/A'}</span>
                </div>
              </div>

              {/* Ingredients List */}
              <div className="space-y-4">
                {/* Available Ingredients */}
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-2.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Ingredients You Have
                  </h4>
                  <ul className="space-y-1.5">
                    {recipe.ingredientsUsed?.map((ing, i) => (
                      <li key={i} className="text-sm text-gray-300 flex items-center gap-2 bg-emerald-950/20 border border-emerald-950/40 px-3 py-2 rounded-xl">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        <span className="capitalize">{ing}</span>
                      </li>
                    ))}
                    {(!recipe.ingredientsUsed || recipe.ingredientsUsed.length === 0) && (
                      <li className="text-sm text-gray-500 italic">None listed</li>
                    )}
                  </ul>
                </div>

                {/* Missing Ingredients */}
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-500 mb-2.5 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    Ingredients You Need
                  </h4>
                  <ul className="space-y-1.5">
                    {recipe.ingredientsMissing?.map((ing, i) => (
                      <li key={i} className="text-sm text-gray-300 flex items-center gap-2 bg-amber-950/20 border border-amber-950/40 px-3 py-2 rounded-xl">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        <span className="capitalize">{ing}</span>
                      </li>
                    ))}
                    {(!recipe.ingredientsMissing || recipe.ingredientsMissing.length === 0) && (
                      <li className="text-sm text-emerald-400 font-medium italic">You have everything!</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column (Instructions preview) */}
            <div className="md:col-span-7 space-y-4">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs">
                  ★
                </span>
                Cooking Instructions
              </h4>
              <ol className="space-y-4">
                {recipe.instructions?.map((step, idx) => (
                  <li key={idx} className="flex gap-4 p-4 bg-gray-900/30 border border-gray-800/40 rounded-2xl">
                    <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-emerald-600/10 text-emerald-400 font-bold text-sm shrink-0 border border-emerald-500/20">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-gray-300 leading-relaxed pt-0.5">
                      {step}
                    </p>
                  </li>
                ))}
                {(!recipe.instructions || recipe.instructions.length === 0) && (
                  <li className="text-sm text-gray-500 italic">No instructions available.</li>
                )}
              </ol>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-800/80 bg-gray-900/40 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-xl font-medium transition-all cursor-pointer shadow-md active:scale-95 text-sm"
          >
            Close
          </button>
          <button
            onClick={() => onStartCooking(recipe)}
            className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-xl font-bold transition-all cursor-pointer shadow-md shadow-emerald-950/20 active:scale-95 text-sm"
          >
            Start Cooking 🍳
          </button>
        </div>

      </div>
    </div>
  );
}
