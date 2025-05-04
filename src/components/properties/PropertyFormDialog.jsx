import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/AdminPannel/ui/dialog";
import { PropertyCategorySelector } from "@/components/AdminPannel/properties/PropertyCategorySelector";
import { PropertyForm } from "@/components/AdminPannel/properties/PropertyForm";
import { OffPlanPropertyForm } from "@/components/properties/OffPlanPropertyForm";
import { toast } from "sonner";
import { propertyApi } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";

export const PropertyFormDialog = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const queryClient = useQueryClient();
  
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };
  
  const handleSubmitForm = async (data) => {
    try {
      // Add the category to the data
      const propertyData = { ...data, category: selectedCategory };
      console.log("Submitting property data:", propertyData);
      
      // Send data to the API
      await propertyApi.createProperty(propertyData);
      
      // Show success message
      toast.success("Property added successfully!");
      
      // Invalidate and refetch the properties query
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      
      // Close the dialog and reset state
      resetAndClose();
    } catch (error) {
      console.error("Error adding property:", error);
      toast.error("Failed to add property. Please try again.");
    }
  };
  
  const resetAndClose = () => {
    setSelectedCategory(null);
    onClose();
  };
  
  // Render the correct form based on the selected category
  const renderForm = () => {
    if (!selectedCategory) {
      return <PropertyCategorySelector onSelectCategory={handleSelectCategory} />;
    }
    
    // Use the special Off Plan form for Off Plan properties
    if (selectedCategory === "Off Plan") {
      return (
        <OffPlanPropertyForm
          onSubmit={handleSubmitForm}
          onCancel={resetAndClose}
        />
      );
    }
    
    // For other categories, use the general PropertyForm with the appropriate category
    return (
      <PropertyForm
        category={selectedCategory}
        onSubmit={handleSubmitForm}
        onCancel={resetAndClose}
      />
    );
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && resetAndClose()}>
      <DialogContent className={`${!selectedCategory ? 'sm:max-w-[500px]' : 'sm:max-w-[700px] max-h-[90vh] overflow-y-auto'} bg-white`}>
        <DialogHeader>
          <DialogTitle>
            {selectedCategory ? `Add New ${selectedCategory} Property` : "Add New Property"}
          </DialogTitle>
        </DialogHeader>
        
        {renderForm()}
      </DialogContent>
    </Dialog>
  );
};