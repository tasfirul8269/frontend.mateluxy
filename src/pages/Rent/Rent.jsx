import { useEffect, useState } from "react";
import CommunitySlider from "../../components/CommunitySlider/CommunitySlider";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import PropertySearchBar from "../../components/PropertySearchBar/PropertySearchBar";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import FilterDropdown from "../../components/FilterDropdown/FilterDropdown";
import { useLocation } from "react-router-dom";

const Rent = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checked, setChecked] = useState(false);
  const location = useLocation();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/properties`)
      .then((res) => {
        // Filter by Rent category immediately after fetch
        const rentProperties = res.data.filter(property => property.category === 'Rent');
        setProperties(rentProperties);
        setFilteredProperties(rentProperties);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (properties.length === 0) return;

    const queryParams = new URLSearchParams(location.search);
    const filtered = properties.filter(property => {
      // Location filter (using propertyAddress)
      if (queryParams.get('location')) {
        const searchLocation = queryParams.get('location').toLowerCase();
        if (!property.propertyAddress.toLowerCase().includes(searchLocation)) {
          return false;
        }
      }
      
      // Property type filter (using propertyType)
      if (queryParams.get('propertyType') && 
          property.propertyType !== queryParams.get('propertyType')) {
        return false;
      }
      
      // Price range filter
      const minPrice = queryParams.get('minPrice') ? Number(queryParams.get('minPrice')) : null;
      const maxPrice = queryParams.get('maxPrice') ? Number(queryParams.get('maxPrice')) : null;
      
      if (minPrice !== null && property.propertyPrice < minPrice) return false;
      if (maxPrice !== null && property.propertyPrice > maxPrice) return false;
      
      // Beds filter (using propertyBedrooms)
      if (queryParams.get('beds')) {
        const bedsFilter = queryParams.get('beds');
        if (bedsFilter === 'Studio') {
          if (property.propertyBedrooms !== 0) return false;
        } else if (bedsFilter.endsWith('+')) {
          const minBeds = parseInt(bedsFilter, 10);
          if (property.propertyBedrooms < minBeds) return false;
        } else if (bedsFilter !== 'All') {
          if (property.propertyBedrooms !== parseInt(bedsFilter, 10)) return false;
        }
      }
      
      // Baths filter (using propertyBathrooms)
      if (queryParams.get('baths')) {
        const bathsFilter = queryParams.get('baths');
        if (bathsFilter.endsWith('+')) {
          const minBaths = parseInt(bathsFilter, 10);
          if (property.propertyBathrooms < minBaths) return false;
        } else if (bathsFilter !== 'All') {
          if (property.propertyBathrooms !== parseInt(bathsFilter, 10)) return false;
        }
      }
      
      return true;
    });
    
    // Apply sorting
    const sortParam = queryParams.get('sort');
    const sortedProperties = sortProperties([...filtered], sortParam);
    setFilteredProperties(sortedProperties);
  }, [location.search, properties]);

  const sortProperties = (propertiesToSort, sortParam) => {
    if (!sortParam) return propertiesToSort;

    return [...propertiesToSort].sort((a, b) => {
      switch (sortParam) {
        case 'price-desc':
          return b.propertyPrice - a.propertyPrice;
        case 'price-asc':
          return a.propertyPrice - b.propertyPrice;
        case 'bedrooms-desc':
          return b.propertyBedrooms - a.propertyBedrooms;
        case 'bedrooms-asc':
          return a.propertyBedrooms - b.propertyBedrooms;
        case 'recent':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });
  };

  const handleCommunityClick = (communityName) => {
    const searchTerm = communityName.toLowerCase();
    const filtered = properties.filter(property => 
      property.propertyAddress.toLowerCase().includes(searchTerm) || 
      (property.community && property.community.toLowerCase().includes(searchTerm)) ||
      (property.neighborhood && property.neighborhood.toLowerCase().includes(searchTerm))
    );
    setFilteredProperties(filtered);
  };

  const handleFilterChange = (filterValue) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('sort', filterValue);
    window.history.pushState({}, '', `${location.pathname}?${queryParams.toString()}`);
    setFilteredProperties(prev => [...prev]); // Trigger re-render
  };

  return (
    <div>
      <div className="pt-24 px-4 md:px-0">
        <PropertySearchBar />
        <CommunitySlider onCommunityClick={handleCommunityClick} />

        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-6 md:mb-8">
            <div className="w-full md:w-auto">
              <h3 className="text-xl text-green-900 font-bold text-center md:text-left px-4 md:pl-[5%]">
                Properties for rent in Dubai
              </h3>
              <p className="text-center md:text-left text-gray-500 font-light mt-2 md:mt-0 px-4 md:pl-[5%]">
                Results: {filteredProperties.length}
              </p>
            </div>

            <div className="w-full md:w-auto flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4 px-4 md:px-0">
              <div className="w-full md:w-auto">
                <FilterDropdown onFilterChange={handleFilterChange} />
              </div>

              <div className="w-[46%] md:w-auto flex items-center px-4 py-3 bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200 shadow-sm">
                <img
                  className="h-6 w-6 md:h-8 md:w-8 pr-2"
                  src="https://i.ibb.co.com/PzmwQHck/map-717498.png"
                  alt="MAP"
                />
                <FaMapMarkerAlt className="mr-2 text-gray-600 hidden md:block" />
                <span className="font-medium text-sm md:text-base">
                  <span className="hidden md:inline">View on</span> Map
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto p-4 md:px-0">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              loading={loading}
              error={error}
              checked={checked}
              setChecked={setChecked}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rent;