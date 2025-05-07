import React from "react";
import { MapPin, Building, Calendar, Bed, Bath, Move, ExternalLink, Trash2 } from "lucide-react";

export function PropertyCard({ property, onDelete }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative">
        {/* Tags on top */}
        <div className="absolute top-3 left-3 z-10 flex gap-2">
          {property.category && (
            <span className={`
              px-4 py-1.5 bg-white rounded-full text-xs font-semibold
              ${property.category === 'Rent' ? 'text-green-600' : 
               property.category === 'Buy' ? 'text-blue-600' :
               property.category === 'Off Plan' ? 'text-purple-600' :
               property.category === 'Commercial for Rent' ? 'text-amber-600' :
               property.category === 'Commercial for Buy' ? 'text-orange-600' :
               'text-gray-600'}
            `}>
              {property.category}
            </span>
          )}
          {/* Display tags for Off Plan properties */}
          {property.category === 'Off Plan' && property.tags && property.tags.map((tag, index) => (
            <span key={index} className="px-4 py-1.5 bg-white rounded-full text-xs font-medium">
              {tag}
            </span>
          ))}
        </div>
        
        {/* Property Image */}
        <div className="h-52 overflow-hidden">
          <img 
            src={property.propertyFeaturedImage} 
            alt={property.propertyTitle}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
      
      <div className="p-5">
        {/* Title and Price */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{property.propertyTitle}</h3>
          <span className="text-blue-500 font-bold">
            AED {property.propertyPrice?.toLocaleString() || 0}
            {property.category === 'Rent' && '/month'}
          </span>
        </div>
        
        {/* Location with icon */}
        <div className="flex items-center text-gray-500 mb-3">
          <MapPin size={16} className="mr-1.5 text-gray-400 flex-shrink-0" />
          <span className="text-sm truncate">{property.propertyAddress}</span>
        </div>
        
        {/* Developer for Off Plan */}
        {property.category === 'Off Plan' && property.developer && (
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <Building size={16} className="mr-1.5 text-gray-400 flex-shrink-0" />
            <span>Developer: {property.developer}</span>
          </div>
        )}
        
        {/* Horizontal line */}
        <div className="border-t border-gray-100 my-3"></div>
        
        {/* Property specs row */}
        <div className="flex justify-between mb-4">
          {property.propertySize > 0 && (
            <div className="text-center">
              <p className="text-blue-500 font-semibold">{property.propertySize} sq ft</p>
              <p className="text-xs text-gray-500">Area</p>
            </div>
          )}
          
          {property.propertyBedrooms > 0 && (
            <div className="text-center">
              <p className="text-blue-500 font-semibold">{property.propertyBedrooms}</p>
              <p className="text-xs text-gray-500">Bedrooms</p>
            </div>
          )}
        </div>
        
        {/* Buttons */}
        <div className="flex justify-between items-center">
          <a
            href={`/property-details/${property._id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-blue-50 text-blue-500 rounded-full text-sm font-medium flex items-center"
          >
            <ExternalLink size={14} className="mr-1.5" />
            View Details
          </a>
          
          <button
            onClick={() => onDelete && onDelete(property._id)}
            className="px-3 py-1.5 bg-red-50 text-red-600 rounded-full text-sm font-medium flex items-center"
          >
            <Trash2 size={14} className="mr-1.5" />
            Delete
          </button>
        </div>
        
        {/* Off Plan Completion Date */}
        {property.category === 'Off Plan' && property.completionDate && (
          <div className="mt-3 text-xs text-right text-gray-500">
            <span className="flex items-center justify-end">
              <Calendar size={12} className="mr-1 flex-shrink-0" />
              Delivery: {property.completionDate}
            </span>
          </div>
        )}
      </div>
    </div>
  );
} 