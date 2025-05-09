import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import PropertyCardSkeleton from './PropertyCardSkeleton';
import PropertyCard from './PropertyCard';
import Banner from '../Banner/OffPlanBanner';
import LatestLaunchesSlider from './LatestLaunchesSlider/LatestLaunchesSlider';

const PropertyListing = ({ offPlanProjects }) => {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const projectsPerPage = 6;

  // Filter off-plan projects (category === "Off Plan")
  const allOffPlanProjects = offPlanProjects.filter(
    project => project.category === "Off Plan"
  );
  
  // Initialize data
  useEffect(() => {
    setLoading(true);
    // Simulate loading time
    const timer = setTimeout(() => {
      setFilteredProjects(allOffPlanProjects);
      setDisplayedProjects(allOffPlanProjects.slice(0, projectsPerPage));
      setHasMore(allOffPlanProjects.length > projectsPerPage);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [offPlanProjects]);
  
  // Apply category filtering
  useEffect(() => {
    let result = [...allOffPlanProjects];
    
    if (selectedCategory !== 'All') {
      result = result.filter(property => {
        // Exact match with the propertyType field from the database
        return property.propertyType === selectedCategory;
      });
    }
    
    setFilteredProjects(result);
    setDisplayedProjects(result.slice(0, projectsPerPage));
    setHasMore(result.length > projectsPerPage);
  }, [selectedCategory, allOffPlanProjects]);
  
  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  
  // Handle search
  const handleSearch = (params) => {
    // Implement search functionality if needed
    console.log('Search params:', params);
  };
  
  // Load more properties
  const handleLoadMore = () => {
    const currentlyDisplayed = displayedProjects.length;
    const newProjects = filteredProjects.slice(0, currentlyDisplayed + projectsPerPage);
    setDisplayedProjects(newProjects);
    setHasMore(newProjects.length < filteredProjects.length);
  };

  return (
    <div>
      <div className="relative">
          <Banner></Banner>
          <div className="sm:absolute sm:-bottom-16 sm:left-1/2 sm:transform sm:-translate-x-1/2 w-full max-w-4xl z-40 ">
          <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      <div className="mt-16 mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Start your <span className="text-[#FF2626]">Off Plan </span>Property Journey with Mateluxy 
        </h1>
        <p className="text-gray-600 max-w-[80%] mt-4">
        From stunning waterfront developments and iconic luxury towers to vibrant family-friendly communities - Dubai's off-plan market has it all. 
        </p>
        <h3 className="text-2xl font-bold text-gray-800 mt-2">
        Let Mateluxy help you find the perfect one.        </h3>
      </div>
      <CategoryFilter 
        selectedCategory={selectedCategory} 
        onCategoryChange={handleCategoryChange} 
      />
      
      {/* Latest Project Launches Slider */}
      {!loading && allOffPlanProjects.length > 0 && (
        <LatestLaunchesSlider properties={allOffPlanProjects} />
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 p-2">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <PropertyCardSkeleton key={index} />
          ))
        ) : displayedProjects.length > 0 ? (
          displayedProjects.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))
        ) : (
          <div className="col-span-3 text-center py-10">
            <p className="text-gray-500 text-lg">No off-plan properties found matching your criteria.</p>
            <button 
              onClick={() => {
                handleCategoryChange('All');
                handleSearch({});
              }}
              className="mt-4 text-[#FF2626] hover:text-[#FF4040] underline"
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
            className="text-[#FF2626] hover:text-[#FF4040] text-lg font-medium"
          >
            More projects
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyListing;