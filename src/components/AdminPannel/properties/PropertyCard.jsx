import React from "react";
import { MapPin, Building, Calendar, Bed, Bath, Move, Edit, Trash2 } from "lucide-react";

export function PropertyCard({ property, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative">
        {/* Tags on top */}
        <div className="absolute top-3 left-3 z-10 flex gap-2">
          {property.type && (
            <span className={`
              px-4 py-1.5 bg-white rounded-full text-xs font-semibold
              ${property.type === 'Rent' ? 'text-green-600' : 
               property.type === 'Buy' ? 'text-blue-600' :
               property.type === 'Off Plan' ? 'text-purple-600' :
               property.type === 'Commercial for Rent' ? 'text-amber-600' :
               property.type === 'Commercial for Buy' ? 'text-orange-600' :
               'text-gray-600'}
            `}>
              {property.type}
            </span>
          )}
          {/* Display tags for Off Plan properties */}
          {property.type === 'Off Plan' && property.tags && property.tags.map((tag, index) => (
            <span key={index} className="px-4 py-1.5 bg-white rounded-full text-xs font-medium">
              {tag}
            </span>
          ))}
        </div>
        
        {/* Property Image */}
        <div className="h-52 overflow-hidden">
          <img 
            src={property.imageUrl} 
            alt={property.title} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
      
      <div className="p-5">
        {/* Title and Price */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{property.title}</h3>
          <span className="text-blue-500 font-bold">{property.price}</span>
        </div>
        
        {/* Location with icon */}
        <div className="flex items-center text-gray-500 mb-3">
          <MapPin size={16} className="mr-1.5 text-gray-400 flex-shrink-0" />
          <span className="text-sm truncate">{property.address}</span>
        </div>
        
        {/* Developer for Off Plan */}
        {property.type === 'Off Plan' && property.developer && (
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <Building size={16} className="mr-1.5 text-gray-400 flex-shrink-0" />
            <span>Developer: {property.developer}</span>
          </div>
        )}
        
        {/* Horizontal line */}
        <div className="border-t border-gray-100 my-3"></div>
        
        {/* Price display - Emphasized */}
        <div className="flex justify-center mb-4">
          <div className="text-center">
            <p className="text-blue-600 font-bold text-xl">{property.price}</p>
            <p className="text-xs text-gray-500">{property.type === 'Rent' ? 'Per Month' : 'Price'}</p>
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex justify-between items-center">
          <a 
            href={`/property-details/${property.id}`}
            className="px-5 py-2 bg-blue-50 text-blue-500 rounded-full text-sm font-medium"
          >
            View Details
          </a>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => onEdit && onEdit(property.id)}
              className="p-1.5 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
            >
              <Edit size={16} />
            </button>
            <button 
              onClick={() => onDelete && onDelete(property.id)}
              className="p-1.5 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        
        {/* Off Plan Completion Date */}
        {property.type === 'Off Plan' && property.completionDate && (
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