import React from 'react';

export default function RecipeSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {[1, 2, 3].map((n) => (
        <div 
          key={n} 
          className="glass-panel rounded-2xl p-6 shadow-lg border border-gray-800 flex flex-col justify-between h-[250px] animate-pulse"
        >
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="h-6 w-16 bg-gray-800 rounded-full"></div>
              <div className="h-6 w-20 bg-gray-800 rounded-full"></div>
            </div>
            <div className="h-6 bg-gray-800 rounded-lg w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-800 rounded-lg w-full mb-2"></div>
            <div className="h-4 bg-gray-800 rounded-lg w-5/6"></div>
          </div>
          <div>
            <div className="h-3 bg-gray-800 rounded-lg w-1/3 mb-4 mt-6"></div>
            <div className="h-10 bg-gray-800/80 rounded-xl w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
