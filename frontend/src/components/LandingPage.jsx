import React from 'react';
import { ChefHat, ArrowRight, Compass, ShieldCheck, HeartPulse } from 'lucide-react';

export default function LandingPage({ onStart }) {
  return (
    <div className="relative overflow-hidden text-gray-100 min-h-[85vh] flex flex-col justify-center">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Hero Content */}
      <div className="max-w-4xl mx-auto text-center px-4 space-y-8 py-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-950/40 border border-emerald-900/40 rounded-full text-xs font-semibold text-emerald-400 mb-2 animate-bounce">
          <ChefHat className="w-3.5 h-3.5" />
          Introducing MealBot 2.0
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-none text-white">
          Turn Leftovers Into <br />
          <span className="text-gradient">Culinary Masterpieces</span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Stop wasting food. Enter what ingredients you have in your kitchen, and our advanced AI chef will suggest personalized recipes complete with an interactive cooking guide.
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={onStart}
            className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold rounded-2xl shadow-xl shadow-emerald-900/30 transition-all flex items-center gap-2 cursor-pointer active:scale-95 group"
          >
            Start Cooking Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 relative z-10">
        {/* Feature 1 */}
        <div className="glass-panel p-6 rounded-2xl border border-gray-800 hover:border-gray-700/60 transition-all">
          <div className="bg-emerald-950/55 border border-emerald-900/30 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <Compass className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Smart Ingredient Search</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Type or click popular staples from your pantry. Tell us your dietary constraints, and let our AI handle the brainstorming.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="glass-panel p-6 rounded-2xl border border-gray-800 hover:border-gray-700/60 transition-all">
          <div className="bg-amber-950/55 border border-amber-900/30 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <ChefHat className="w-6 h-6 text-amber-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">AI-Generated Recipes</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Get up to 5 customized recipes curated by the Gemini API complete with prep times, calorie counts, and list of missing ingredients.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="glass-panel p-6 rounded-2xl border border-gray-800 hover:border-gray-700/60 transition-all">
          <div className="bg-teal-950/55 border border-teal-900/30 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            <HeartPulse className="w-6 h-6 text-teal-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Interactive Active Cooking</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Follow step-by-step checklists. Check off each step as you complete it and watch your cooking progress live!
          </p>
        </div>
      </div>
    </div>
  );
}
