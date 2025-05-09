import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ExternalLink } from 'lucide-react';

const LocationSection = ({ property }) => {
  // Get location data
  const locationName = property?.propertyAddress || property?.propertyState || 'Location not specified';
  
  // Create Google Maps URL using address
  const getGoogleMapsUrl = () => {
    if (property?.propertyAddress) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.propertyAddress)}`;
    } else if (property?.propertyState) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.propertyState)}`;
    } else {
      return null;
    }
  };
  
  const googleMapsUrl = getGoogleMapsUrl();
  
  return (
    <motion.section 
      id="location"
      className="bg-white rounded-2xl shadow-sm overflow-hidden p-8 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <MapPin className="text-red-500" size={24} />
          Location
        </h2>
        
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <MapPin className="text-red-500" size={18} />
          <span className="text-gray-700">{locationName}</span>
        </div>
      </div>
      
      {/* Map */}
      <div className="mb-8 rounded-xl overflow-hidden border border-gray-200 h-[400px]">
        {googleMapsUrl ? (
          <div className="relative h-full">
            <iframe 
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(locationName)}`}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Property Location"
              className="absolute inset-0"
            />
            <a 
              href={googleMapsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
            >
              <ExternalLink size={20} className="text-gray-700" />
            </a>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center bg-gray-100">
            <p className="text-gray-500">Map location not available</p>
          </div>
        )}
      </div>
      
      {/* Neighborhood Description */}
      {property?.neighborhoodDescription && (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">About the Neighborhood</h3>
          <p className="text-gray-700">
            {property.neighborhoodDescription}
          </p>
        </div>
      )}
      
      {/* If no neighborhood description is available */}
      {!property?.neighborhoodDescription && (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">About the Neighborhood</h3>
          <p className="text-gray-700">
            This property is located in {locationName}, offering convenient access to various amenities and facilities. 
            The neighborhood provides a blend of urban convenience and comfortable living with proximity to essential services.
          </p>
        </div>
      )}
    </motion.section>
  );
};

export default LocationSection;
