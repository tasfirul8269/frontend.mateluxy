import React from "react";
import { Edit, Trash2, MapPin } from "lucide-react";

export function PropertyCard({ property }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={property.imageUrl} 
          alt={property.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`
            text-xs font-semibold px-2.5 py-1 rounded-full 
            ${property.type === 'Rent' ? 'bg-green-100 text-green-800' : 
             property.type === 'Buy' ? 'bg-blue-100 text-blue-800' :
             property.type === 'Off Plan' ? 'bg-purple-100 text-purple-800' :
             property.type === 'Commercial for Rent' ? 'bg-amber-100 text-amber-800' :
             property.type === 'Commercial for Buy' ? 'bg-orange-100 text-orange-800' :
             'bg-gray-100 text-gray-800'}
          `}>
            {property.type}
          </span>
        </div>
        {property.location && (
          <div className="absolute bottom-3 left-3">
            <div className="bg-white bg-opacity-90 px-2 py-1 rounded-md flex items-center text-xs font-medium">
              <MapPin size={12} className="mr-1 text-gray-500" />
              {property.location}
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-1 truncate">{property.title}</h3>
        <p className="text-gray-500 text-sm mb-3 truncate">{property.address}</p>
        
        {/* Display developer name for Off Plan properties */}
        {property.type === 'Off Plan' && property.developer && (
          <p className="text-sm font-medium text-purple-700 mb-2">
            Developer: {property.developer}
          </p>
        )}
        
        <p className="font-bold text-blue-600 mb-3">{property.price}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <span className="mr-3">{property.bedrooms} beds</span>
            <span className="mr-3">{property.bathrooms} baths</span>
            <span>{property.area}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-1.5 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors">
              <Edit size={16} />
            </button>
            <button className="p-1.5 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}