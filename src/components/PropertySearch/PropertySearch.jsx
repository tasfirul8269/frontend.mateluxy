import { useState } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

// Property types array from the codebase
const propertyTypes = [
  "Apartment", "Villa", "Townhouse", "Penthouse", "Duplex", 
  "Studio", "Office", "Retail", "Warehouse", "Land"
];

const PropertySearch = () => {
    const [activeTab, setActiveTab] = useState('rent');
    const [location, setLocation] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = () => {
      // Build query parameters for the search
      const params = new URLSearchParams();
      
      if (location.trim()) {
        // Using location parameter which is expected by the Buy/Rent components
        params.append('location', location.trim());
      }
      
      if (propertyType) {
        params.append('propertyType', propertyType);
      }
      
      // Navigate to the appropriate page with search parameters
      navigate(`/${activeTab}?${params.toString()}`);
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    };

  return (
    <div className="flex flex-col md:flex-row justify-between bg-white items-center gap-4">
      {/* Toggle Buttons */}
      <div className="flex p-1 gap-2">
        <button 
          className={`flex-1 py-2 px-4 transition-colors ${activeTab === 'rent' ? 'bg-white text-blue-600 border-b-2 border-[#256fff]' : 'text-gray-600 hover:bg-gray-200'}`}
          onClick={() => setActiveTab('rent')}
        >
          Rent
        </button>
        <button 
          className={`flex-1 py-2 px-4 transition-colors ${activeTab === 'buy' ? 'bg-white text-blue-600 border-b-2 border-[#256fff]' : 'text-gray-600 hover:bg-gray-200'}`}
          onClick={() => setActiveTab('buy')}
        >
          Buy
        </button>
      </div>

      {/* Search Fields */}
      <div className="grid md:grid-cols-3 gap-8 md:text-center w-full">
        {/* Location Field */}
        <div className="relative">
          <label className="block text-sm font-[600] text-left text-black mb-1">
            Locations
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter city, address or area"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full py-2 px-0 pr-8 border-0 border-b border-transparent focus:outline-none focus:border-b-2 focus:border-blue-500 bg-transparent"
            />
            <FaLocationCrosshairs className="absolute right-0 top-1/2 transform -translate-y-1/2 text-blue-400" />
          </div>
        </div>

        {/* Property Type Field */}
        <div className="relative">
          <label className="block text-sm text-black text-left font-[600] mb-1">
            Property type
          </label>
          <div className="relative">
            <div 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full py-2 px-0 border-0 border-b text-gray-500 border-transparent focus:outline-none focus:border-b-2 focus:border-blue-500 pr-8 bg-transparent cursor-pointer flex justify-between items-center"
            >
              <span>{propertyType || "Select property type"}</span>
              <RiArrowDropDownLine className="text-blue-400 text-4xl absolute right-0" />
            </div>
            
            {isDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 max-h-60 overflow-auto">
                {propertyTypes.map((type) => (
                  <div 
                    key={type} 
                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-left"
                    onClick={() => {
                      setPropertyType(type);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {type}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search Button */}
        <div className="flex items-center justify-end">
          <button 
            onClick={handleSearch}
            className="px-6 bg-blue-600 w-[200px] cursor-pointer hover:bg-blue-700 text-white py-4 rounded-[15px] flex items-center justify-center transition-colors"
          >
            <FaSearch className="mr-2" />
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertySearch;