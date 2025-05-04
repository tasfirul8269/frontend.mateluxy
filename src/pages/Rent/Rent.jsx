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
      .get("properties.json")
      .then((res) => {
        setProperties(res.data);
        setFilteredProperties(res.data);
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
      // Location filter (case insensitive)
      if (queryParams.get('location')) {
        const locationRegex = new RegExp(queryParams.get('location'), 'i');
        if (!locationRegex.test(property.location)) return false;
      }
      
      // Property type filter
      if (queryParams.get('propertyType') && 
          property.type !== queryParams.get('propertyType')) {
        return false;
      }
      
      // Price range filter
      const minPrice = extractPriceValue(queryParams.get('minPrice'));
      const maxPrice = extractPriceValue(queryParams.get('maxPrice'));
      const propertyPrice = extractPriceValue(property.price);
      
      if (minPrice && propertyPrice < minPrice) return false;
      if (maxPrice && propertyPrice > maxPrice) return false;
      
      // Beds filter
      if (queryParams.get('beds')) {
        const bedsFilter = queryParams.get('beds');
        if (bedsFilter === 'All') {
          // Include all
        } else if (bedsFilter === 'Studio') {
          if (property.bedrooms !== 0) return false;
        } else if (bedsFilter.endsWith('+')) {
          const minBeds = parseInt(bedsFilter, 10);
          if (property.bedrooms < minBeds) return false;
        } else {
          if (property.bedrooms !== parseInt(bedsFilter, 10)) return false;
        }
      }
      
      // Baths filter
      if (queryParams.get('baths')) {
        const bathsFilter = queryParams.get('baths');
        if (bathsFilter === 'All') {
          // Include all
        } else if (bathsFilter.endsWith('+')) {
          const minBaths = parseInt(bathsFilter, 10);
          if (property.bathrooms < minBaths) return false;
        } else {
          if (property.bathrooms !== parseInt(bathsFilter, 10)) return false;
        }
      }
      
      return true;
    });
    
    // Apply sorting based on URL params
    const sortParam = queryParams.get('sort');
    const sortedProperties = sortProperties([...filtered], sortParam);
    setFilteredProperties(sortedProperties);
  }, [location.search, properties]);

  const sortProperties = (propertiesToSort, sortParam) => {
    if (!sortParam) return propertiesToSort;

    switch (sortParam) {
      case 'price-desc':
        return propertiesToSort.sort((a, b) => extractPriceValue(b.price) - extractPriceValue(a.price));
      case 'price-asc':
        return propertiesToSort.sort((a, b) => extractPriceValue(a.price) - extractPriceValue(b.price));
      case 'bedrooms-desc':
        return propertiesToSort.sort((a, b) => b.bedrooms - a.bedrooms);
      case 'bedrooms-asc':
        return propertiesToSort.sort((a, b) => a.bedrooms - b.bedrooms);
      case 'recent':
      default:
        // Assuming there's a dateAdded field, otherwise keep original order
        if (propertiesToSort[0]?.dateAdded) {
          return propertiesToSort.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        }
        return propertiesToSort;
    }
  };

  const handleCommunityClick = (communityName) => {
    const regex = new RegExp(communityName, 'i');
    
    const filtered = properties.filter(property => 
      regex.test(property.location) || 
      regex.test(property.community) || 
      regex.test(property.neighborhood)
    );
    
    setFilteredProperties(filtered);
  };

  const extractPriceValue = (priceStr) => {
    if (!priceStr) return 0;
    const match = priceStr.toString().replace(/,/g, '').match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const handleFilterChange = (filterValue) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('sort', filterValue);
    window.history.pushState({}, '', `${location.pathname}?${queryParams.toString()}`);
    
    // Trigger the useEffect that handles filtering and sorting
    setFilteredProperties(prev => [...prev]);
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
                Properties for sell in Dubai
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
              key={property.id}
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