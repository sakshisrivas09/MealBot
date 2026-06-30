import React, { useState } from 'react';
import { ArrowLeft, Clock, BarChart, Flame, CheckSquare, Square, Check, Sparkles, AlertCircle } from 'lucide-react';

export default function CookingMode({ recipe, onBack }) {
  const instructions = recipe.instructions || [];
  const ingredientsUsed = recipe.ingredientsUsed || [];
  const ingredientsMissing = recipe.ingredientsMissing || [];

  // Track step checklist states
  const [completedSteps, setCompletedSteps] = useState(new Array(instructions.length).fill(false));
  // Track ingredient gathering states
  const [gatheredIngredients, setGatheredIngredients] = useState(
    new Array(ingredientsUsed.length + ingredientsMissing.length).fill(false)
  );

  const toggleStep = (idx) => {
    const updated = [...completedSteps];
    updated[idx] = !updated[idx];
    setCompletedSteps(updated);
  };

  const toggleIngredient = (idx) => {
    const updated = [...gatheredIngredients];
    updated[idx] = !updated[idx];
    setGatheredIngredients(updated);
  };

  const stepsDone = completedSteps.filter(Boolean).length;
  const totalSteps = instructions.length;
  const progressPercent = totalSteps > 0 ? Math.round((stepsDone / totalSteps) * 100) : 0;
  const allStepsCompleted = totalSteps > 0 && stepsDone === totalSteps;

  const allIngredients = [...ingredientsUsed, ...ingredientsMissing];

  return (
    <div className="glass-panel rounded-3xl p-6 md:p-8 shadow-2xl max-w-5xl mx-auto border border-gray-800 animate-in fade-in slide-in-from-bottom-6 duration-300">
      
      {/* Navigation Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800/80 pb-6 mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-xl transition-all cursor-pointer shadow-md active:scale-95 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Active Cooking Mode</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">{recipe.name}</h2>
          </div>
        </div>

        {/* Floating statistics */}
        <div className="flex gap-4 text-xs text-gray-400 bg-gray-950/40 px-4 py-2.5 rounded-2xl border border-gray-900/40 shrink-0 self-start md:self-center">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Prep: {recipe.prepTime || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-1.5 border-x border-gray-800/60 px-4">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Cook: {recipe.cookTime || 'N/A'}</span>
          </div>
          {recipe.calories && (
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>{recipe.calories}</span>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar Area */}
      <div className="bg-gray-950/50 border border-gray-900 rounded-2xl p-5 mb-8 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1 w-full space-y-2">
          <div className="flex justify-between text-sm font-semibold text-gray-300">
            <span>Cooking Progress</span>
            <span className="text-emerald-400">{progressPercent}% ({stepsDone}/{totalSteps} Steps)</span>
          </div>
          <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 rounded-full shadow-lg shadow-emerald-500/20"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
        
        {allStepsCompleted && (
          <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl px-5 py-3 flex items-center gap-2 animate-bounce">
            <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            <span className="text-sm font-bold text-emerald-300">Chef Mode Completed!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Panel: Ingredients Checklist */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gray-900/20 border border-gray-800/80 p-5 rounded-2xl">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              1. Gather Ingredients
            </h3>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              Check off your ingredients as you take them out and prepare them on your counter.
            </p>
            <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-1">
              {allIngredients.map((ing, idx) => {
                const isMissing = idx >= ingredientsUsed.length;
                const isGathered = gatheredIngredients[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleIngredient(idx)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border cursor-pointer transition-all ${
                      isGathered
                        ? 'bg-emerald-950/15 border-emerald-800/20 text-gray-500 line-through'
                        : 'bg-gray-950/40 border-gray-800/50 text-gray-300 hover:border-gray-700'
                    }`}
                  >
                    <button className="shrink-0 transition-colors">
                      {isGathered ? (
                        <CheckSquare className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Square className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                    <span className="text-sm capitalize font-medium flex items-center justify-between w-full">
                      {ing}
                      {isMissing && !isGathered && (
                        <span className="text-[10px] bg-amber-950/60 border border-amber-900/30 text-amber-400 px-1.5 py-0.5 rounded-md leading-none font-semibold uppercase">
                          Staple/Need
                        </span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Panel: Step-by-Step Cooking Steps */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            2. Cook Step-by-Step
          </h3>
          
          <div className="space-y-4">
            {instructions.map((step, idx) => {
              const isCompleted = completedSteps[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleStep(idx)}
                  className={`flex gap-4 p-5 border rounded-2xl cursor-pointer transition-all duration-200 ${
                    isCompleted
                      ? 'bg-emerald-950/10 border-emerald-900/40 opacity-50'
                      : 'bg-gray-950/30 border-gray-800 hover:bg-gray-950/50 hover:border-gray-700 shadow-sm'
                  }`}
                >
                  {/* Custom Checkbox circle */}
                  <div className="shrink-0 mt-0.5">
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                      isCompleted 
                        ? 'bg-emerald-500 border-emerald-500 text-slate-950 font-extrabold' 
                        : 'border-gray-700 group-hover:border-gray-500'
                    }`}>
                      {isCompleted && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>
                  </div>

                  {/* Instruction text */}
                  <div className="space-y-1">
                    <span className={`text-xs font-semibold uppercase tracking-wider ${
                      isCompleted ? 'text-emerald-500' : 'text-gray-500'
                    }`}>
                      Step {idx + 1}
                    </span>
                    <p className={`text-sm leading-relaxed ${
                      isCompleted ? 'text-gray-400 line-through' : 'text-gray-200'
                    }`}>
                      {step}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cooking Complete Celebration Panel */}
          {allStepsCompleted && (
            <div className="bg-gradient-to-tr from-emerald-950/50 to-teal-900/30 border border-emerald-500/30 p-6 rounded-3xl text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="inline-flex p-3 bg-emerald-900/30 rounded-2xl text-emerald-400 border border-emerald-500/20">
                <Sparkles className="w-8 h-8 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
              </div>
              <h4 className="text-xl font-bold text-white">Your dish is ready! 🍲</h4>
              <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
                Congratulations, you've completed all the steps. Turn off the stove, plate your meal beautifully, and enjoy!
              </p>
              <button
                onClick={onBack}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold cursor-pointer transition-all active:scale-95 shadow-md"
              >
                Return to Recipe Dashboard
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
