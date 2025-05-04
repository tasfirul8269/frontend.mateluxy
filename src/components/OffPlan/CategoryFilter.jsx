import React from 'react';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const categories = ['All', 'Villas', 'Apartments', 'Penthouses', 'Townhouses', 'Plots', 'Commercial property'];
  
  return (
    <div className="overflow-x-auto mb-8">
      <div className="flex space-x-3 pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-[#00A3FF] text-white'
                : 'bg-[#f6f6f6] text-gray-600 hover:bg-[#e6e6e6]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;