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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { propertyApi } from "@/services/api";
import { toast } from "sonner";
import { useNotifications } from "@/context/NotificationContext";

// Categories for the filter tabs
const CATEGORIES = ["All", "Rent", "Buy", "Off Plan", "Commercial for Rent", "Commercial for Buy"];

const PropertiesPage = () => {
  // Get query client for invalidating queries after updates
  const queryClient = useQueryClient();
  const { notifyPropertyChange } = useNotifications();
  
  // State
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 4000000]);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [propertyToEdit, setPropertyToEdit] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
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

  // Handle successful property submission
  const handlePropertySubmit = async (propertyData) => {
    try {
      await propertyApi.addProperty(propertyData);
      
      // Show success message
      toast.success("Property added successfully!");
      
      // Create notification
      await notifyPropertyChange('added', propertyData.propertyTitle);
      
      // Refetch properties to update the list
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      
      // Close the dialog
      setIsFormDialogOpen(false);
    } catch (error) {
      console.error("Error adding property:", error);
      toast.error(error.message || "Failed to add property");
    }
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
    price: property.category === "Rent" ? `AED ${property.propertyPrice}/month` : `AED ${property.propertyPrice}`,
    priceValue: property.propertyPrice,
    type: property.category,
    bedrooms: property.propertyBedrooms,
    bathrooms: property.propertyBathrooms,
    area: `${property.propertySize} sq ft`,
    imageUrl: property.propertyFeaturedImage,
    location: property.propertyState,
    developer: property.developer, // For Off Plan properties
    completionDate: property.completionDate, // For Off Plan properties
    tags: property.tags || [], // Include tags array
    status: property.status || "Active",
    featured: property.featured || false,
  });

  // Handle property edit
  const handleEditProperty = async (propertyId) => {
    try {
      // Find the property in the list
      const property = properties.find(p => p._id === propertyId);
      if (!property) {
        toast.error("Property not found");
        return;
      }
      
      // Set the property to edit
      setPropertyToEdit(property);
      
      // Open the edit dialog
      setIsEditDialogOpen(true);
    } catch (error) {
      console.error("Error preparing property for edit:", error);
      toast.error("Error preparing property for edit");
    }
  };

  // Handle update property
  const handleUpdateProperty = async (updatedPropertyData) => {
    try {
      if (!propertyToEdit || !propertyToEdit._id) {
        toast.error("No property selected for update");
        return;
      }
      
      // Call the API to update the property
      await propertyApi.updateProperty(propertyToEdit._id, updatedPropertyData);
      
      // Create notification
      await notifyPropertyChange('updated', updatedPropertyData.propertyTitle);
      
      // Show success message
      toast.success("Property updated successfully!");
      
      // Refetch properties to update the list
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      
      // Close the edit dialog
      setIsEditDialogOpen(false);
      setPropertyToEdit(null);
    } catch (error) {
      console.error("Error updating property:", error);
      toast.error(error.message || "Failed to update property");
    }
  };

  // Handle property delete
  const handleDeleteProperty = async (propertyId) => {
    // Get property title before deleting
    const property = properties.find(p => p._id === propertyId);
    if (!property) {
      toast.error("Property not found");
      return;
    }
    
    // Confirm before deleting
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        setIsDeleting(true);
        
        // Call the API to delete the property
        await propertyApi.deleteProperty(propertyId);
        
        // Create notification
        await notifyPropertyChange('deleted', property.propertyTitle);
        
        // Show success message
        toast.success("Property deleted successfully!");
        
        // Refetch properties to update the list
        queryClient.invalidateQueries({ queryKey: ['properties'] });
      } catch (error) {
        console.error("Error deleting property:", error);
        toast.error(error.message || "Failed to delete property");
      } finally {
        setIsDeleting(false);
      }
    }
  };

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
                      onValueChange={setPriceRange}
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <button 
              onClick={handleAddProperty}
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-red-600 text-white hover:bg-red-700"
            >
              Add Property
            </button>
          </div>
        </div>
        
        {/* Category Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-1 border-b">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                  selectedCategory === category
                    ? "border-b-2 border-red-500 text-red-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Properties Grid */}
        {isLoading ? (
          <div className="text-center py-10">Loading properties...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">Error loading properties</div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-10 text-gray-500">No properties found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {currentProperties.map((property) => (
              <PropertyCard
                key={property._id}
                property={transformPropertyForCard(property)}
                onEdit={() => handleEditProperty(property._id)}
                onDelete={() => handleDeleteProperty(property._id)}
                isDeleting={isDeleting}
              />
            ))}
          </div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    onClick={() => handlePageChange(i + 1)}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
      
      {/* Add Property Dialog */}
      <PropertyFormDialog
        open={isFormDialogOpen}
        onOpenChange={setIsFormDialogOpen}
        onSubmit={handlePropertySubmit}
        title="Add New Property"
        description="Fill out the form below to add a new property."
        submitButtonText="Add Property"
        category={selectedCategory === "All" ? "Buy" : selectedCategory}
      />
      
      {/* Edit Property Dialog */}
      {propertyToEdit && (
        <PropertyFormDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSubmit={handleUpdateProperty}
          title="Edit Property"
          description="Update the property details below."
          submitButtonText="Update Property"
          initialData={propertyToEdit}
          category={propertyToEdit.category}
          isEditing={true}
        />
      )}
      
      {/* Floating Action Button for mobile */}
      <FloatingActionButton onClick={handleAddProperty} />
    </div>
  );
};

export default PropertiesPage;