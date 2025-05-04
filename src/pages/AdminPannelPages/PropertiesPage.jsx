import React, { useState, useEffect } from "react";
import { PropertyCard } from "@/components/AdminPannel/properties/PropertyCard";
import { FloatingActionButton } from "@/components/AdminPannel/ui/UIComponents";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/AdminPannel/ui/pagination";
import { Filter } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/AdminPannel/ui/popover";
import { Label } from "@/components/AdminPannel/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/AdminPannel/ui/select";
import { Slider } from "@/components/AdminPannel/ui/slider";
import { PropertyFormDialog } from "@/components/properties/PropertyFormDialog";
import { useQuery } from "@tanstack/react-query";
import { propertyApi } from "@/services/api";

// Categories for the filter tabs
const CATEGORIES = ["All", "Rent", "Buy", "Off Plan", "Commercial for Rent", "Commercial for Buy"];

const PropertiesPage = () => {
  // State
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 4000000]);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  
  const itemsPerPage = 6;
  
  // Fetch properties from API - fixed the useQuery hook to use the correct format
  const { data: properties = [], isLoading, error, refetch } = useQuery({
    queryKey: ['properties'],
    queryFn: propertyApi.getProperties,
    meta: {
      onError: (error) => {
        console.error('Error fetching properties:', error);
      }
    }
  });

  // Listen for search event from Header
  useEffect(() => {
    const handleSearch = (event) => {
      setSearchQuery(event.detail);
      setCurrentPage(1); // Reset to first page when searching
    };

    window.addEventListener('search', handleSearch);
    return () => window.removeEventListener('search', handleSearch);
  }, []);
  
  // Extract all states/locations from properties
  const locations = Array.from(new Set(properties.map((property) => property.propertyState)));
  
  // Filter properties by category, search query, location and price
  const filteredProperties = properties
    .filter((property) => selectedCategory === "All" || property.category === selectedCategory)
    .filter((property) => 
      !searchQuery || 
      property.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.propertyType.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((property) => 
      selectedLocation === "all" || property.propertyState === selectedLocation
    )
    .filter((property) => 
      property.propertyPrice >= priceRange[0] && property.propertyPrice <= priceRange[1]
    );
  
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  
  const currentProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddProperty = () => {
    setIsFormDialogOpen(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const formatPrice = (value) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  // Transform property data for PropertyCard component
  const transformPropertyForCard = (property) => ({
    id: property._id,
    title: property.propertyTitle,
    address: property.propertyAddress,
    price: property.category === "Rent" ? `$${property.propertyPrice}/month` : `$${property.propertyPrice}`,
    priceValue: property.propertyPrice,
    type: property.category,
    bedrooms: property.propertyBedrooms,
    bathrooms: property.propertyBathrooms,
    area: `${property.propertySize} sq ft`,
    imageUrl: property.propertyFeaturedImage,
    location: property.propertyState,
    developer: property.developer, // Add developer info for Off Plan properties
  });

  return (
    <div className="flex-1 min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-gray-800 mb-4 sm:mb-0">Properties ({filteredProperties.length})</h2>
          
          {/* Advanced Filter */}
          <div className="flex items-center space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-white border border-gray-200 shadow-sm hover:bg-gray-50">
                  <Filter size={16} className="mr-2" />
                  Filters
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4" align="end">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger id="location">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="all">Any location</SelectItem>
                        {locations.map((location) => (
                          <SelectItem key={location} value={location}>{location}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Price Range</Label>
                      <div className="text-sm font-medium">
                        {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                      </div>
                    </div>
                    <Slider
                      defaultValue={[0, 4000000]}
                      max={4000000}
                      step={100000}
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value)}
                      className="py-4"
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="bg-white p-1 rounded-lg shadow-sm inline-flex mb-6 border border-gray-200 overflow-x-auto">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
              className={`px-5 py-2 text-sm font-medium rounded-md transition-all ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="text-lg font-medium text-gray-700">Loading properties...</div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="text-lg font-medium text-red-600">Error loading properties</div>
            <p className="text-gray-500 mt-1">Please try refreshing the page.</p>
          </div>
        )}

        {/* Properties Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProperties.map((property) => (
              <PropertyCard key={property._id} property={transformPropertyForCard(property)} />
            ))}
          </div>
        )}
        
        {/* No results */}
        {!isLoading && !error && currentProperties.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-700">No properties found</h3>
            <p className="text-gray-500 mt-1">Try changing your filter or add new properties.</p>
          </div>
        )}
        
        {/* Pagination */}
        {!isLoading && !error && filteredProperties.length > 0 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {/* Generate page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page);
                    }}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) handlePageChange(currentPage + 1);
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
      
      <FloatingActionButton
        label="Add Property"
        onClick={handleAddProperty}
      />
      
      {/* Property Form Dialog */}
      <PropertyFormDialog 
        isOpen={isFormDialogOpen}
        onClose={() => setIsFormDialogOpen(false)}
      />
    </div>
  );
};

export default PropertiesPage;