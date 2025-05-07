import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/AdminPannel/ui/dialog";
import TabbedPropertyForm from "./TabbedPropertyForm";
import { toast } from "sonner";
import { propertyApi } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";

export const PropertyFormDialog = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { id: "Buy", label: "Buy", icon: "🏠" },
    { id: "Rent", label: "Rent", icon: "🔑" },
    { id: "Off Plan", label: "Off Plan", icon: "🏗️" },
    { id: "Commercial for Buy", label: "Commercial for Buy", icon: "🏢" },
    { id: "Commercial for Rent", label: "Commercial for Rent", icon: "🏬" },
  ];

  const handleSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const propertyData = { ...data, category: selectedCategory };
      await propertyApi.createProperty(propertyData);
      toast.success("Property added successfully!");
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      onClose();
    } catch (error) {
      console.error("Error adding property:", error);
      toast.error("Failed to add property. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-white sm:max-w-[1100px] max-w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            {selectedCategory ? `Add New ${selectedCategory} Property` : "Select Property Category"}
          </DialogTitle>
        </DialogHeader>
        
        {isSubmitting ? (
          <div className="flex flex-col items-center justify-center py-12">
            <span className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></span>
            <p className="mt-4 text-gray-600">Submitting property...</p>
          </div>
        ) : selectedCategory ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4">
              <button 
                onClick={handleBack}
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                <span className="ml-1">Back to categories</span>
              </button>
            </div>
            <TabbedPropertyForm 
              onSubmit={handleSubmit} 
              onCancel={onClose} 
              selectedCategory={selectedCategory}
            />
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {categories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
                onClick={() => handleCategorySelect(category.id)}
              >
                <div className="p-8 flex flex-col items-center text-center">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.label}</h3>
                  <p className="text-gray-500 text-sm">
                    Add a new {category.label.toLowerCase()} property listing
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
};