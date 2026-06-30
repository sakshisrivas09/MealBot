import React, { useState } from 'react';
import { Plus, X, Utensils, ShieldAlert } from 'lucide-react';

const QUICK_ADD_INGREDIENTS = [
  'Chicken', 'Tomato', 'Egg', 'Rice', 'Onion', 
  'Potato', 'Garlic', 'Cheese', 'Milk', 'Flour',
  'Beef', 'Spinach', 'Mushrooms', 'Lemon', 'Butter'
];

const DIETARY_OPTIONS = [
  { value: '', label: 'No Restrictions' },
  { value: 'Vegetarian', label: 'Vegetarian' },
  { value: 'Vegan', label: 'Vegan' },
  { value: 'Gluten-Free', label: 'Gluten-Free' },
  { value: 'Keto', label: 'Keto' },
  { value: 'Dairy-Free', label: 'Dairy-Free' }
];

export default function IngredientSelector({ onGenerate, loading }) {
  const [ingredients, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [dietary, setDietary] = useState('');
  const [error, setError] = useState('');

  const handleAddIngredient = (name) => {
    const trimmed = name.trim().toLowerCase();
    if (!trimmed) return;
    if (ingredients.includes(trimmed)) {
      setError(`"${name}" is already added.`);
      return;
    }
    setIngredients([...ingredients, trimmed]);
    setInputValue('');
    setError('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddIngredient(inputValue);
    }
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ingredients.length === 0) {
      setError('Please add at least one ingredient to start.');
      return;
    }
    onGenerate(ingredients, dietary);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-xl max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-emerald-400">
        <Utensils className="w-5 h-5" />
        What is in your kitchen?
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tag Input Field */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Enter your ingredients
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type ingredient (e.g. egg, chicken) and press Enter"
                className="w-full bg-gray-900/80 border border-gray-700/80 rounded-xl px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm"
              />
            </div>
            <button
              type="button"
              onClick={() => handleAddIngredient(inputValue)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl px-4 flex items-center justify-center transition-all cursor-pointer shadow-lg shadow-emerald-900/20 active:scale-95"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          {error && (
            <p className="mt-2 text-sm text-rose-400 flex items-center gap-1.5 animate-pulse">
              <ShieldAlert className="w-4 h-4" />
              {error}
            </p>
          )}
        </div>

        {/* Selected Tags list */}
        {ingredients.length > 0 && (
          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
              Selected Ingredients ({ingredients.length})
            </span>
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-1">
              {ingredients.map((ing, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 rounded-lg text-sm font-medium transition-all hover:bg-emerald-900/50"
                >
                  {ing}
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(idx)}
                    className="text-emerald-500 hover:text-emerald-300 cursor-pointer transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Quick Add Suggestions */}
        <div>
          <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
            Quick Add Staples
          </span>
          <div className="flex flex-wrap gap-2">
            {QUICK_ADD_INGREDIENTS.map((item) => {
              const isAdded = ingredients.includes(item.toLowerCase());
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleAddIngredient(item)}
                  disabled={isAdded}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                    isAdded
                      ? 'bg-gray-800/50 border-gray-700/30 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-900/50 border-gray-700/60 text-gray-300 hover:border-emerald-500/50 hover:bg-emerald-950/20 active:scale-95'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dietary Restrictions Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Dietary restrictions (Optional)
          </label>
          <select
            value={dietary}
            onChange={(e) => setDietary(e.target.value)}
            className="w-full bg-gray-900/80 border border-gray-700/80 rounded-xl px-4 py-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm cursor-pointer"
          >
            {DIETARY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-gray-900">
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={loading || ingredients.length === 0}
          className={`w-full py-4 rounded-xl font-semibold text-white shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
            loading || ingredients.length === 0
              ? 'bg-gray-800 border border-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 active:scale-[0.98] shadow-emerald-900/30'
          }`}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Cooking up recipe ideas...
            </>
          ) : (
            'Find Recipes'
          )}
        </button>
      </form>
    </div>
  );
}
