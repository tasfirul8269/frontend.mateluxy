import React from 'react';

import { useProperties } from '../../hooks/useProperties';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import PropertyCardSkeleton from './PropertyCardSkeleton';
import PropertyCard from './PropertyCard';

const PropertyListing = () => {
  const {
    properties,
    loading,
    selectedCategory,
    handleCategoryChange,
    handleSearch,
    handleLoadMore,
    hasMore
  } = useProperties();

  return (
    <div>
      
      
      <SearchBar onSearch={handleSearch} />
      <div className="my-8">
        <h1 className="text-4xl font-bold text-gray-800">
        Start your <span className="text-[#00A3FF]">Off Plan </span>properties search 
        </h1>
      </div>
      <CategoryFilter 
        selectedCategory={selectedCategory} 
        onCategoryChange={handleCategoryChange} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <PropertyCardSkeleton key={index} />
          ))
        ) : properties.length > 0 ? (
          properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <div className="col-span-3 text-center py-10">
            <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
            <button 
              onClick={() => {
                handleCategoryChange('All');
                handleSearch({});
              }}
              className="mt-4 text-[#00A3FF] hover:text-[#0093e9] underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {hasMore && !loading && (
        <div className="text-center">
          <button 
            onClick={handleLoadMore}
            className="text-[#00A3FF] hover:text-[#0093e9] text-lg font-medium"
          >
            More projects
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyListing;