import React from "react";
import { MapPin, Building, Calendar, Bed, Bath, Move, Edit, Trash2, } from "lucide-react";

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
        
        {/* Location on image bottom left */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="px-3 py-1.5 bg-black bg-opacity-50 rounded-full text-xs font-medium text-white flex items-center">
            <MapPin size={12} className="mr-1 text-white flex-shrink-0" />
            {property.location || property.address?.split(',').pop()?.trim()}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        {/* Title only - removed price */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{property.title}</h3>
        </div>
        {/* Address */}
        {property.type != 'Off Plan' && (
          <div className="mb-3 text-sm text-left text-gray-500">
            <span className="flex items-top text-ellipsis whitespace-wrap w-[80$] overflow-hidden justify-start">
              <MapPin size={16} className="mr-1.5 flex-shrink-0" />
              {property.address}
            </span>
          </div>
        )}
         {/* Off Plan Completion Date */}
         {property.type === 'Off Plan' && property.completionDate && (
          <div className="mb-3 text-sm text-left text-gray-500">
            <span className="flex items-center justify-start">
              <Calendar size={16} className="mr-1.5 flex-shrink-0" />
              Delivery: {property.completionDate}
            </span>
          </div>
        )}
        
        {/* Developer for Off Plan - removed location */}
        {property.type === 'Off Plan' && property.developer && (
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <Building size={16} className="mr-1.5 text-gray-400 flex-shrink-0" />
            <span>Developer: {property.developer}</span>
          </div>
        )}
        
        {/* Horizontal line */}
        <div className="border-t border-gray-100 my-3"></div>
        
        {/* Price display - Left aligned */}
        <div className="flex justify-start mb-4">
          <div className="text-left">
            <p className="text-blue-600 font-bold text-xl">{property.price}</p>
            {/* <p className="text-xs text-gray-500">{property.type === 'Rent' ? 'Per Month' : 'Price'}</p> */}
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
        
       
      </div>
    </div>
  );
}