import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { FiSearch, FiSliders, FiMapPin, FiHome, FiDollarSign } from "react-icons/fi";
import * as DropdownMenu from "../AdminPannel/ui/dropdown-menu";
import { Slider } from "../AdminPannel/ui/slider";

const PropertySearchBar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchParams, setSearchParams] = useState({
    location: "",
    propertyType: "",
    priceRange: [300000, 5000000],
    beds: "",
    baths: "",
    amenities: [],
  });
  const [minMaxPrices, setMinMaxPrices] = useState({ min: 300000, max: 5000000 });
  const [amenitiesOptions, setAmenitiesOptions] = useState([]);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Set the active tab based on the current path
  useEffect(() => {
    if (location.pathname.includes('/rent')) {
      setActiveTab(1);
    } else if (location.pathname.includes('/buy')) {
      setActiveTab(0);
    }
  }, [location.pathname]);
  
  // Fetch dynamic amenities and price ranges from all properties
  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/properties`);
        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }
        
        const properties = await response.json();
        
        // Extract unique amenities
        const allAmenities = new Set();
        properties.forEach(property => {
          if (property.amenities && Array.isArray(property.amenities)) {
            property.amenities.forEach(amenity => allAmenities.add(amenity));
          }
        });
        
        // Format amenities for display
        const formattedAmenities = Array.from(allAmenities).map(amenity => ({
          id: amenity.toLowerCase().replace(/\\s+/g, '_'),
          label: amenity
        }));
        
        if (formattedAmenities.length > 0) {
          setAmenitiesOptions(formattedAmenities);
        }
        
        // Find min and max prices
        let minPrice = Number.MAX_SAFE_INTEGER;
        let maxPrice = 0;
        
        properties.forEach(property => {
          if (property.price) {
            const price = parseFloat(property.price);
            if (!isNaN(price)) {
              minPrice = Math.min(minPrice, price);
              maxPrice = Math.max(maxPrice, price);
            }
          }
        });
        
        // Set min/max prices if found, otherwise use defaults
        if (minPrice !== Number.MAX_SAFE_INTEGER && maxPrice > 0) {
          setMinMaxPrices({
            min: Math.floor(minPrice),
            max: Math.ceil(maxPrice)
          });
          
          // Update search params with the new range
          setSearchParams(prev => ({
            ...prev,
            priceRange: [Math.floor(minPrice), Math.ceil(maxPrice)]
          }));
        }
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    };
    
    fetchPropertyData();
  }, []);

  // Property types for dropdown
  const propertyTypes = [
    "Apartment",
    "Penthouse",
    "Villa",
    "Land",
    "Townhouse",
    "Duplex",
  ];

  // Bed and bath options
  const bedOptions = ["Any", "Studio", "1", "2", "3", "4", "5", "6+"];
  const bathOptions = ["Any", "1", "2", "3", "4", "5", "6+"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handlePriceRangeChange = (values) => {
    setSearchParams((prev) => ({
      ...prev,
      priceRange: values,
    }));
  };
  
  const handleAmenityToggle = (amenityId) => {
    setSearchParams((prev) => {
      const currentAmenities = [...prev.amenities];
      if (currentAmenities.includes(amenityId)) {
        return {
          ...prev,
          amenities: currentAmenities.filter(id => id !== amenityId),
        };
      } else {
        return {
          ...prev,
          amenities: [...currentAmenities, amenityId],
        };
      }
    });
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams();

    // Add non-empty parameters to the query
    Object.entries(searchParams).forEach(([key, value]) => {
      if (key === 'priceRange') {
        queryParams.append('minPrice', value[0]);
        queryParams.append('maxPrice', value[1]);
      } else if (key === 'amenities' && value.length > 0) {
        queryParams.append('amenities', value.join(','));
      } else if (value) {
        queryParams.append(key, value);
      }
    });

    // Determine the base path based on active tab
    const basePath = activeTab === 0 ? "/buy" : "/rent";

    // Navigate to the appropriate page with query parameters
    navigate(`${basePath}?${queryParams.toString()}`);
  };
  
  const clearFilters = () => {
    setSearchParams({
      location: "",
      propertyType: "",
      priceRange: [minMaxPrices.min, minMaxPrices.max],
      beds: "",
      baths: "",
      amenities: [],
    });
  };

  // Count active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (searchParams.propertyType) count++;
    if (searchParams.beds) count++;
    if (searchParams.baths) count++;
    if (searchParams.priceRange[0] > minMaxPrices.min) count++;
    if (searchParams.priceRange[1] < minMaxPrices.max) count++;
    count += searchParams.amenities.length;
    return count;
  };
  
  const formatPrice = (price) => {
    return `AED ${price.toLocaleString()}`;
  };

  return (
    <div className="relative bg-gray-50 flex justify-center z-50 w-full mx-auto">
      {/* Main Search Bar */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-50 max-w-6xl rounded-xl  p-5 "
      >
        {/* Search Fields */}
        <div className="flex flex-col md:flex-row gap-3 items-center">
          {/* Buy/Rent Selector */}
          <div className="flex bg-white border border-[#e6e6e6] p-1 rounded-lg md:w-auto w-full md:self-auto self-stretch">
            <button
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 0
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => {
                setActiveTab(0);
                navigate("/buy");
              }}
            >
              Buy
            </button>
            <button
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 1
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => {
                setActiveTab(1);
                navigate("/rent");
              }}
            >
              Rent
            </button>
          </div>
          
          {/* Location Input */}
          <div className="relative flex-1 min-w-[200px] w-full">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <FiMapPin className="text-red-500" />
            </div>
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={searchParams.location}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />
          </div>
          
          {/* Property Type Field */}
          <div className="relative flex-1 min-w-[200px] w-full">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <FiHome className="text-red-500" />
            </div>
            <select
              name="propertyType"
              value={searchParams.propertyType}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all appearance-none cursor-pointer"
            >
              <option value="">Property Type</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          
          {/* Price Dropdown Menu */}
          <div className="relative flex-1 min-w-[200px] w-full">
            <DropdownMenu.DropdownMenu>
              <DropdownMenu.DropdownMenuTrigger asChild>
                <button className="w-full flex items-center justify-between pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all">
                  <div className="flex items-center">
                    <FiDollarSign className="absolute left-3 text-red-500" />
                    <span className="text-gray-700">
                      {(searchParams.priceRange[0] > minMaxPrices.min || searchParams.priceRange[1] < minMaxPrices.max) 
                        ? `${formatPrice(searchParams.priceRange[0])} - ${formatPrice(searchParams.priceRange[1])}` 
                        : "Price (Any)"}
                    </span>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
              </DropdownMenu.DropdownMenuTrigger>
              
              <DropdownMenu.DropdownMenuContent className="w-72 p-4" sideOffset={5}>
                <DropdownMenu.DropdownMenuLabel>Price Range</DropdownMenu.DropdownMenuLabel>
                <DropdownMenu.DropdownMenuSeparator />
                
                <div className="mt-4 mb-8">
                  <div className="flex justify-between text-xs text-gray-700 mb-2">
                    <span>{formatPrice(searchParams.priceRange[0])}</span>
                    <span>{formatPrice(searchParams.priceRange[1])}</span>
                  </div>
                  
                  <Slider
                    defaultValue={searchParams.priceRange}
                    min={minMaxPrices.min}
                    max={minMaxPrices.max}
                    step={(minMaxPrices.max - minMaxPrices.min) / 100}
                    color="red"
                    onValueChange={handlePriceRangeChange}
                    className="mt-6"
                  />
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </DropdownMenu.DropdownMenuContent>
            </DropdownMenu.DropdownMenu>
          </div>
          
          {/* Filters Dropdown Menu */}
          <div className="relative flex-1 min-w-[200px] w-full">
            <DropdownMenu.DropdownMenu>
              <DropdownMenu.DropdownMenuTrigger asChild>
                <button className="w-full flex items-center justify-between pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all">
                  <div className="flex items-center">
                    <FiSliders className="absolute left-3 text-red-500" />
                    <span className="text-gray-700">Filters</span>
                  </div>
                  {getActiveFilterCount() > 0 && (
                    <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
                      {getActiveFilterCount()}
                    </span>
                  )}
                </button>
              </DropdownMenu.DropdownMenuTrigger>
              
              <DropdownMenu.DropdownMenuContent className="w-72 p-4 max-h-[80vh] overflow-y-auto" sideOffset={5} align="end">
                <div className="sticky top-0 bg-white pb-2 z-10">
                  <DropdownMenu.DropdownMenuLabel>Bedrooms</DropdownMenu.DropdownMenuLabel>
                  <DropdownMenu.DropdownMenuSeparator />
                </div>
                
                <div className="flex flex-wrap gap-2 my-2">
                  {bedOptions.map((bed) => (
                    <button
                      key={bed}
                      onClick={() => handleInputChange({ target: { name: 'beds', value: bed === 'Any' ? '' : bed } })}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                        (bed === 'Any' && !searchParams.beds) || searchParams.beds === bed
                          ? "bg-red-100 text-red-600 border border-red-200"
                          : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                      }`}
                    >
                      {bed}
                    </button>
                  ))}
                </div>
                
                <div className="sticky top-0 bg-white pt-3 pb-2 z-10">
                  <DropdownMenu.DropdownMenuLabel>Bathrooms</DropdownMenu.DropdownMenuLabel>
                  <DropdownMenu.DropdownMenuSeparator />
                </div>
                
                <div className="flex flex-wrap gap-2 my-2">
                  {bathOptions.map((bath) => (
                    <button
                      key={bath}
                      onClick={() => handleInputChange({ target: { name: 'baths', value: bath === 'Any' ? '' : bath } })}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                        (bath === 'Any' && !searchParams.baths) || searchParams.baths === bath
                          ? "bg-red-100 text-red-600 border border-red-200"
                          : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                      }`}
                    >
                      {bath}
                    </button>
                  ))}
                </div>
                
                {amenitiesOptions.length > 0 && (
                  <>
                    <div className="sticky top-0 bg-white pt-3 pb-2 z-10">
                      <DropdownMenu.DropdownMenuLabel>Amenities</DropdownMenu.DropdownMenuLabel>
                      <DropdownMenu.DropdownMenuSeparator />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 my-2">
                      {amenitiesOptions.map((amenity) => (
                        <button
                          key={amenity.id}
                          onClick={() => handleAmenityToggle(amenity.id)}
                          className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between ${
                            searchParams.amenities.includes(amenity.id)
                              ? "bg-red-100 text-red-600 border border-red-200"
                              : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                          }`}
                        >
                          <span>{amenity.label}</span>
                          {searchParams.amenities.includes(amenity.id) && (
                            <svg className="w-4 h-4 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
                
                <div className="sticky bottom-0 bg-white pt-3 mt-2 z-10">
                  <DropdownMenu.DropdownMenuSeparator />
                  <div className="mt-3 flex justify-between">
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 border border-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      Reset
                    </button>
                    <button
                      onClick={handleSearch}
                      className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </DropdownMenu.DropdownMenuContent>
            </DropdownMenu.DropdownMenu>
          </div>
          
          {/* Search Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearch}
            className="flex-shrink-0 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center shadow-md"
          >
            <FiSearch className="text-xl" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default PropertySearchBar;
