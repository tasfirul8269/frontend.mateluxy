import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "animate.css";
import { CiSearch } from "react-icons/ci";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";

const PropertySearchBar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchParams, setSearchParams] = useState({
    location: "",
    propertyType: "",
    minPrice: "",
    maxPrice: "",
    beds: "",
    baths: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  // Property types for dropdown
  const propertyTypes = [
    "Apartment",
    "Penthouse",
    "Villa",
    "Land",
    "Townhouse",
    "Duplex",
  ];

  // Price ranges (simplified generation)
  const generatePriceOptions = () => {
    const options = [];
    for (let i = 3; i <= 50; i++) {
      const value = i * 100000;
      options.push(`AED ${value.toLocaleString()}`);
    }
    return options;
  };
  const priceOptions = generatePriceOptions();

  // Bed and bath options
  const bedOptions = ["All", "Studio", "1", "2", "3", "4", "5", "7+"];
  const bathOptions = ["All", "1", "2", "3", "4", "5", "7+"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams();

    // Add non-empty parameters to the query
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });

    // Determine the base path based on active tab
    const basePath = activeTab === 0 ? "/buy" : "/rent";

    // Navigate to the appropriate page with query parameters
    navigate(`${basePath}?${queryParams.toString()}`);
  };

  return (
    <div className="w-full mx-auto z-50 p-4 md:p-6 bg-white rounded-lg shadow-lg animate__animated animate__fadeIn">
      <Tabs
        selectedIndex={activeTab}
        onSelect={(index) => {
          setActiveTab(index);
          setSearchParams({
            location: "",
            propertyType: "",
            minPrice: "",
            maxPrice: "",
            beds: "",
            baths: "",
          });
        }}
        className="w-full"
      >
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch md:items-center w-full">
          {/* Tabs Section - unchanged */}
          <TabList
            className={`flex items-center gap-2 p-1 md:p-2 rounded-lg min-h-[50px] w-full md:w-auto ${
              location.pathname === "/off-plan-properties" && "hidden"
            }`}
          >
            <Tab
              className={`flex-grow md:flex-grow-0 px-3 md:px-4 py-2 text-sm font-medium rounded-md cursor-pointer transition-all duration-300 flex items-center justify-center ${
                activeTab === 0
                  ? "bg-red-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Link to="/buy" className="w-full text-center">
                Buy
              </Link>
            </Tab>

            <Tab
              className={`flex-grow md:flex-grow-0 px-3 md:px-4 py-2 text-sm font-medium rounded-md cursor-pointer transition-all duration-300 flex items-center justify-center ${
                activeTab === 1
                  ? "bg-red-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Link to="/rent" className="w-full text-center">
                Rent
              </Link>
            </Tab>
          </TabList>

          {/* Search Filters Section */}
          <div className="w-full overflow-x-auto pb-2">
            {/* Buy Tab Panel */}
            <TabPanel>
              <div className="animate__animated animate__fadeIn">
                <div className="flex flex-col md:flex-row items-stretch gap-2 md:gap-4 w-full">
                  {/* Location Input - unchanged */}
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={searchParams.location}
                    onChange={handleInputChange}
                    className="p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none transition flex-1 text-sm font-medium w-full md:min-w-[180px]"
                  />

                  {/* Property Type Dropdown - already a dropdown, keeping exact same styling */}
                  <div className="relative flex-1 w-full md:min-w-[180px] z-10">
                    <select
                      name="propertyType"
                      value={searchParams.propertyType}
                      onChange={handleInputChange}
                      className="w-full p-2 md:p-3 border border-gray-300 rounded-lg cursor-pointer focus:outline-none transition text-sm font-medium text-center md:text-left bg-white"
                    >
                      <option value="">Property Type</option>
                      {propertyTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range Container - unchanged */}
                  <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full">
                    <div className="relative w-full">
                      <select
                        name="minPrice"
                        value={searchParams.minPrice}
                        onChange={handleInputChange}
                        className="w-full p-2 md:p-3 border border-gray-300 rounded-lg cursor-pointer focus:outline-none transition text-sm font-medium text-center appearance-none"
                      >
                        <option value="">Min Price</option>
                        {priceOptions.map((price) => (
                          <option key={`min-${price}`} value={price}>
                            {price}
                          </option>
                        ))}
                      </select>
                      <MdOutlineKeyboardArrowDown className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    </div>
                    <div className="relative w-full">
                      <select
                        name="maxPrice"
                        value={searchParams.maxPrice}
                        onChange={handleInputChange}
                        className="w-full p-2 md:p-3 border border-gray-300 rounded-lg cursor-pointer focus:outline-none transition text-sm font-medium text-center appearance-none"
                      >
                        <option value="">Max Price</option>
                        {priceOptions.map((price) => (
                          <option key={`max-${price}`} value={price}>
                            {price}
                          </option>
                        ))}
                      </select>
                      <MdOutlineKeyboardArrowDown className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Bed/Bath Container - unchanged */}
                  <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full">
                    <div className="relative w-full">
                      <select
                        name="beds"
                        value={searchParams.beds}
                        onChange={handleInputChange}
                        className="w-full p-2 md:p-3 border border-gray-300 rounded-lg cursor-pointer focus:outline-none transition text-sm font-medium text-center appearance-none"
                      >
                        <option value="">Beds</option>
                        {bedOptions.map((bed) => (
                          <option key={bed} value={bed}>
                            {bed}
                          </option>
                        ))}
                      </select>
                      <MdOutlineKeyboardArrowDown className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    </div>
                    <div className="relative w-full">
                      <select
                        name="baths"
                        value={searchParams.baths}
                        onChange={handleInputChange}
                        className="w-full p-2 md:p-3 border border-gray-300 rounded-lg cursor-pointer focus:outline-none transition text-sm font-medium text-center appearance-none"
                      >
                        <option value="">Baths</option>
                        {bathOptions.map((bath) => (
                          <option key={bath} value={bath}>
                            {bath}
                          </option>
                        ))}
                      </select>
                      <MdOutlineKeyboardArrowDown className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>

            {/* Rent Tab Panel - identical to Buy panel */}
            <TabPanel>
              <div className="animate__animated animate__fadeIn w-full">
                <div className="flex flex-col md:flex-row items-stretch gap-2 md:gap-4 w-full">
                  {/* Location Input - unchanged */}
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={searchParams.location}
                    onChange={handleInputChange}
                    className="p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none transition flex-1 text-sm font-medium w-full md:min-w-[180px]"
                  />

                  {/* Property Type Dropdown - already a dropdown */}
                  <div className="relative flex-1 w-full md:min-w-[180px]">
                    <select
                      name="propertyType"
                      value={searchParams.propertyType}
                      onChange={handleInputChange}
                      className="w-full p-2 md:p-3 border border-gray-300 rounded-lg cursor-pointer focus:outline-none transition text-sm font-medium text-center md:text-left appearance-none"
                    >
                      <option value="">Property Type</option>
                      {propertyTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <MdOutlineKeyboardArrowDown className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* Price Range Container - unchanged */}
                  <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full">
                    <div className="relative w-full">
                      <select
                        name="minPrice"
                        value={searchParams.minPrice}
                        onChange={handleInputChange}
                        className="w-full p-2 md:p-3 border border-gray-300 rounded-lg cursor-pointer focus:outline-none transition text-sm font-medium text-center appearance-none"
                      >
                        <option value="">Min Price</option>
                        {priceOptions.map((price) => (
                          <option key={`min-${price}`} value={price}>
                            {price}
                          </option>
                        ))}
                      </select>
                      <MdOutlineKeyboardArrowDown className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    </div>
                    <div className="relative w-full">
                      <select
                        name="maxPrice"
                        value={searchParams.maxPrice}
                        onChange={handleInputChange}
                        className="w-full p-2 md:p-3 border border-gray-300 rounded-lg cursor-pointer focus:outline-none transition text-sm font-medium text-center appearance-none"
                      >
                        <option value="">Max Price</option>
                        {priceOptions.map((price) => (
                          <option key={`max-${price}`} value={price}>
                            {price}
                          </option>
                        ))}
                      </select>
                      <MdOutlineKeyboardArrowDown className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Bed/Bath Container - unchanged */}
                  <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full">
                    <div className="relative w-full">
                      <select
                        name="beds"
                        value={searchParams.beds}
                        onChange={handleInputChange}
                        className="w-full p-2 md:p-3 border border-gray-300 rounded-lg cursor-pointer focus:outline-none transition text-sm font-medium text-center appearance-none"
                      >
                        <option value="">Beds</option>
                        {bedOptions.map((bed) => (
                          <option key={bed} value={bed}>
                            {bed}
                          </option>
                        ))}
                      </select>
                      <MdOutlineKeyboardArrowDown className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    </div>
                    <div className="relative w-full">
                      <select
                        name="baths"
                        value={searchParams.baths}
                        onChange={handleInputChange}
                        className="w-full p-2 md:p-3 border border-gray-300 rounded-lg cursor-pointer focus:outline-none transition text-sm font-medium text-center appearance-none"
                      >
                        <option value="">Baths</option>
                        {bathOptions.map((bath) => (
                          <option key={bath} value={bath}>
                            {bath}
                          </option>
                        ))}
                      </select>
                      <MdOutlineKeyboardArrowDown className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
          </div>

          {/* Search Button - unchanged */}
          <button
            onClick={handleSearch}
            className="bg-red-600 text-white p-2 md:p-3 w-full md:w-auto rounded-lg md:rounded-full hover:bg-red-700 transition min-w-[50px] h-[50px] flex items-center justify-center flex-shrink-0 cursor-pointer self-center md:self-auto"
          >
            <span className="text-white pr-3 md:hidden">Search</span>
            <CiSearch className="text-xl md:text-2xl" />
          </button>
        </div>
      </Tabs>
    </div>
  );
};

export default PropertySearchBar;
