import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/AdminPannel/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/AdminPannel/ui/form";
import { Input } from "@/components/AdminPannel/ui/input";
import { Textarea } from "@/components/AdminPannel/ui/textarea";
import { FileText, Image, MapPin, Map as MapIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/AdminPannel/ui/select";

// Property types
const propertyTypes = [
  "Apartment", "Villa", "Townhouse", "Penthouse", "Duplex", 
  "Studio", "Office", "Retail", "Warehouse", "Land"
];

// Off Plan property schema aligned with the specified fields
const offPlanSchema = z.object({
  launchType: z.string().min(1, "Launch type is required"),
  developerName: z.string().min(1, "Developer name is required"),
  developerImage: z.string().min(1, "Developer image is required"),
  propertyTitle: z.string().min(5, "Property title must be at least 5 characters"),
  propertyType: z.string().min(1, "Property type is required"), // Added property type field
  shortDescription: z.string().min(10, "Short description must be at least 10 characters"),
  brochureFile: z.string().min(1, "Brochure file is required"),
  dldPermitNumber: z.string().min(1, "DLD permit number is required"),
  startingPrice: z.coerce.number().positive("Starting price must be positive"),
  area: z.coerce.number().positive("Area must be positive"),
  bedrooms: z.coerce.number().int().nonnegative("Number of bedrooms must be non-negative"),
  location: z.string().min(1, "Location is required"),
  projectDescription: z.string().min(20, "Project description must be at least 20 characters"),
  exteriorsGallery: z.array(z.string()).min(1, "At least one exterior image is required"),
  interiorsGallery: z.array(z.string()).min(1, "At least one interior image is required"),
  exactLocation: z.string().min(1, "Exact location is required"),
  longitude: z.coerce.number(),
  latitude: z.coerce.number(),
});

export function OffPlanPropertyForm({ onSubmit, onCancel }) {
  const form = useForm({
    resolver: zodResolver(offPlanSchema),
    defaultValues: {
      launchType: "",
      developerName: "",
      developerImage: "",
      propertyTitle: "",
      propertyType: "", // Added default value
      shortDescription: "",
      brochureFile: "",
      dldPermitNumber: "",
      startingPrice: 0,
      area: 200,
      bedrooms: 0,
      location: "",
      projectDescription: "",
      exteriorsGallery: [""],
      interiorsGallery: [""],
      exactLocation: "",
      longitude: 0,
      latitude: 0,
    },
  });

  // Helper function to add new input field to the gallery arrays
  const addGalleryField = (galleryType) => {
    const currentGallery = form.getValues(galleryType);
    form.setValue(galleryType, [...currentGallery, ""]);
  };
  
  // Helper function to remove field from the gallery arrays
  const removeGalleryField = (galleryType, index) => {
    const currentGallery = form.getValues(galleryType);
    if (currentGallery.length > 1) {
      form.setValue(
        galleryType, 
        currentGallery.filter((_, i) => i !== index)
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Developer Information */}
        <div className="bg-white space-y-4">
          <h3 className="text-lg font-medium">Developer Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="launchType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Launch Type</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. New Launch" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="developerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Developer Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter developer name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="developerImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Image className="w-4 h-4 mr-1" /> Developer Image URL
                </FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/developer-logo.png" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        {/* Property Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Property Information</h3>
          <FormField
            control={form.control}
            name="propertyTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter property title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Add Property Type field */}
          <FormField
            control={form.control}
            name="propertyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="shortDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Brief description of the property"
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="brochureFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <FileText className="w-4 h-4 mr-1" /> Brochure PDF URL
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/brochure.pdf" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="dldPermitNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DLD Permit Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter permit number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="startingPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <span className="mr-1">Starting Price</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <span className="mr-1">Area (sq ft)</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="200" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="bedrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bedrooms</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Number of bedrooms" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" /> Location
                </FormLabel>
                <FormControl>
                  <Input placeholder="Property location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="projectDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About the Project</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Detailed description of the project"
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        {/* Image Galleries */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Image Galleries</h3>
          
          {/* Exteriors Gallery */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <FormLabel className="flex items-center">
                <Image className="w-4 h-4 mr-1" /> Exteriors Image Gallery
              </FormLabel>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => addGalleryField('exteriorsGallery')}
              >
                Add Image
              </Button>
            </div>
            
            {form.watch('exteriorsGallery').map((_, index) => (
              <div key={`ext-${index}`} className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name={`exteriorsGallery.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="Image URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon" 
                  onClick={() => removeGalleryField('exteriorsGallery', index)}
                  disabled={form.watch('exteriorsGallery').length <= 1}
                >
                  X
                </Button>
              </div>
            ))}
          </div>
          
          {/* Interiors Gallery */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <FormLabel className="flex items-center">
                <Image className="w-4 h-4 mr-1" /> Interiors Image Gallery
              </FormLabel>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => addGalleryField('interiorsGallery')}
              >
                Add Image
              </Button>
            </div>
            
            {form.watch('interiorsGallery').map((_, index) => (
              <div key={`int-${index}`} className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name={`interiorsGallery.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="Image URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon" 
                  onClick={() => removeGalleryField('interiorsGallery', index)}
                  disabled={form.watch('interiorsGallery').length <= 1}
                >
                  X
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Location Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Location Details</h3>
          
          <FormField
            control={form.control}
            name="exactLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" /> Exact Location
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 5 km from Downtown" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.000001" placeholder="Enter latitude" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.000001" placeholder="Enter longitude" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Map placeholder */}
          <div className="p-4 bg-gray-100 rounded-md text-gray-500 text-center flex items-center justify-center h-40">
            <div className="flex flex-col items-center">
              <MapIcon className="w-8 h-8 mb-2 text-gray-400" />
              <p>Map will be displayed using the coordinates above</p>
              <p className="text-xs mt-1">Add a map component for visual location representation</p>
            </div>
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Submit Property</Button>
        </div>
      </form>
    </Form>
  );
}