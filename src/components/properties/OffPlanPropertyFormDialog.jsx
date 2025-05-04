import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/AdminPannel/ui/dialog";
import { OffPlanPropertyForm } from "./OffPlanPropertyForm";
import { toast } from "sonner";
import { propertyApi } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";

export const OffPlanPropertyFormDialog = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  
  const handleSubmit = async (data) => {
    try {
      // Transform the form data to match the backend model
      const propertyData = { 
        // Base required fields
        propertyTitle: data.propertyTitle,
        propertyDescription: data.projectDescription,
        propertyAddress: data.location,
        propertyCountry: "UAE", // default
        propertyState: data.location,
        propertyZip: "00000", // default
        propertyFeaturedImage: data.exteriorsGallery[0], // Use first exterior image
        media: [...data.exteriorsGallery, ...data.interiorsGallery], // Combine galleries
        
        // Category and type
        category: "Off Plan",
        propertyType: data.propertyType, // Use selected property type
        
        // Price details
        propertyPrice: data.startingPrice,
        brokerFee: 0, // default for off-plan
        
        // Off-plan specific
        developer: data.developerName,
        developerImage: data.developerImage,
        launchType: data.launchType,
        brochureFile: data.brochureFile,
        shortDescription: data.shortDescription,
        exactLocation: data.exactLocation,
        
        // Property features
        propertySize: data.area,
        propertyBedrooms: data.bedrooms,
        propertyRooms: data.bedrooms + 1, // simple calculation
        propertyBathrooms: data.bedrooms, // Assuming 1:1 ratio
        propertyKitchen: 1, // default
        
        // Legal
        dldPermitNumber: data.dldPermitNumber,
        dldQrCode: "https://example.com/qrcode.png", // placeholder
        agent: "1", // default agent ID
        
        // Location
        latitude: data.latitude,
        longitude: data.longitude,
      };
      
      console.log("Submitting Off Plan property:", propertyData);
      
      // Send data to the API
      await propertyApi.createProperty(propertyData);
      
      // Show success message
      toast.success("Off Plan property added successfully!");
      
      // Invalidate and refetch the properties query
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      
      // Close the dialog
      onClose();
    } catch (error) {
      console.error("Error adding Off Plan property:", error);
      toast.error("Failed to add property. Please try again.");
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-white sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Add New Off Plan Property</DialogTitle>
        </DialogHeader>
        
        <OffPlanPropertyForm 
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}