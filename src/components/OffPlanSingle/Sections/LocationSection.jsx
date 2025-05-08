import React from 'react';
import { MapPin } from 'lucide-react';

const LocationSection = ({ property }) => {
  // Default map location (Dubai) if property doesn't have coordinates
  const defaultLocation = { lat: 25.2048, lng: 55.2708 };
  
  // Get property location or default
  const location = property?.location || defaultLocation;
  
  // Generate Google Maps URL
  const getGoogleMapsUrl = () => {
    if (property?.propertyAddress) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.propertyAddress)}`;
    }
    if (location) {
      return `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=Dubai`;
  };

  return (
    <section className="bg-white rounded-[30px] border border-[#e6e6e6] overflow-hidden mb-8 p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Location</h2>
      
      <div className="mb-6">
        <div className="flex items-start gap-2 mb-4">
          <MapPin className="text-blue-500 mt-1" size={20} />
          <p className="text-gray-700">
            {property?.propertyAddress || property?.propertyState || 'Location details not available'}
          </p>
        </div>
        
        <a 
          href={getGoogleMapsUrl()} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 font-medium hover:text-blue-700 transition-colors flex items-center gap-1"
        >
          View on Google Maps
        </a>
      </div>
      
      <div className="rounded-xl overflow-hidden h-[400px] border border-gray-200">
        <iframe 
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBMH4w3iEYGEPDGNcC6br9_HxO9Sj5Y1QQ&q=${property?.propertyAddress || property?.propertyState || 'Dubai'}`}
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default LocationSection;