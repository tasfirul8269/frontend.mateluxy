import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

// Import components
import PropertyHeroFixed from '../../components/PropertyDetails/Hero/PropertyHeroFixed';
import AboutSection from '../../components/PropertyDetails/Sections/AboutSection';
import GallerySection from '../../components/PropertyDetails/Sections/GallerySection';
import LocationSection from '../../components/PropertyDetails/Sections/LocationSection';

import PropertyDetailsCard from '../../components/PropertyDetails/Navigation/PropertyDetailsCard';
import Tabs from '../../components/PropertyDetails/Navigation/Tabs';

// Import image processing utility
import { processPropertyImages } from '../../utils/propertyImageConverter';

const PropertyDetails = () => {
  const [property, setProperty] = useState(null);
  const [agent, setAgent] = useState(null);
  const [relatedProperties, setRelatedProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { id } = useParams();
  
  // Fetch property data
  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch property data
        const propertyResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/properties/${id}`);
        
        // Process images using S3 proxy
        const processedProperty = processPropertyImages(propertyResponse.data);
        setProperty(processedProperty);
        
        if (processedProperty.agent) {
          // Fetch agent data if available
          try {
            const agentResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/agents/${processedProperty.agent}`);
            setAgent(agentResponse.data);
          } catch (agentError) {
            console.error('Error fetching agent data:', agentError);
            // Don't set an error so the page can still display
          }
        }
        
        // Fetch related properties based on category and state
        try {
          const relatedResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/properties`);
          if (relatedResponse.data && relatedResponse.data.length > 0) {
            // Filter similar properties based on category and state
            const filtered = relatedResponse.data
              .filter(item => 
                item._id !== id && // Not the current property
                item.category === processedProperty.category && // Same category
                (item.propertyState === processedProperty.propertyState || // Same state
                 item.propertyBedrooms === processedProperty.propertyBedrooms) // Or same number of bedrooms
              )
              .slice(0, 3); // Limit to 3 related properties
            
            // Process images for related properties
            const processedRelatedProperties = filtered.map(prop => processPropertyImages(prop));
            setRelatedProperties(processedRelatedProperties);
          }
        } catch (relatedError) {
          console.error('Error fetching related properties:', relatedError);
          // Don't set an error so the page can still display
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching property data:', err);
        setError('Failed to load property details. Please try again later.');
        setProperty(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchPropertyData();
    }
  }, [id]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading property details...</p>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-sm">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Property</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.href = '/properties'}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }
  
  // No property found state
  if (!property) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-sm">
          <div className="text-gray-400 text-5xl mb-4">🏠</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Property Not Found</h2>
          <p className="text-gray-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => window.location.href = '/properties'}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Browse Properties
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gray-50 pb-20"
    >
      {/* Property Hero Section with Fixed Layout */}
      <PropertyHeroFixed property={property} />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Column */}
          <div className="lg:w-2/3">
            <Tabs 
              property={property} 
              aboutComponent={<AboutSection property={property} />}
              galleryComponent={<GallerySection property={property} />}
              locationComponent={<LocationSection property={property} />}
            />
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3">
            <PropertyDetailsCard property={property} agent={agent} />
          </div>
        </div>
        
        {/* Related Properties Section */}
        {relatedProperties.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProperties.map((relatedProperty, index) => (
                <motion.div 
                  key={relatedProperty._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => window.location.href = `/properties/${relatedProperty._id}`}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={relatedProperty.propertyFeaturedImage} 
                      alt={relatedProperty.propertyTitle} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-800 mb-1 line-clamp-1">{relatedProperty.propertyTitle}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-1">{relatedProperty.propertyState || relatedProperty.propertyAddress}</p>
                    <p className="text-red-500 font-medium">AED {relatedProperty.propertyPrice?.toLocaleString() || 'Price on request'}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PropertyDetails;