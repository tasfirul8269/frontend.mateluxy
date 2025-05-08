import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Building, Tag, Download, X, ExternalLink, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HeroBanner = ({ property }) => {
  // Create images array from property data
  const getImages = () => {
    const images = [];
    
    if (property?.propertyFeaturedImage) {
      images.push({
        src: property.propertyFeaturedImage,
        alt: property.propertyTitle || 'Property image'
      });
    }

    if (property?.media?.length > 0) {
      property.media.forEach(img => {
        images.push({
          src: img,
          alt: property.propertyTitle || 'Property image'
        });
      });
    }

    return images.length > 0 ? images : null;
  };

  const images = getImages();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Reset loading state when image changes
  useEffect(() => {
    setIsLoading(true);
  }, [currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  // Handle touch events for swipe functionality
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left - go to next image
      goToNext();
    }
    
    if (touchEnd - touchStart > 100) {
      // Swipe right - go to previous image
      goToPrevious();
    }
  };
  
  // Toggle fullscreen gallery
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  
  // Toggle favorite
  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  // Get all property details dynamically
  const projectName = property?.propertyTitle;
  const description = property?.propertyDescription;
  const price = property?.propertyPrice ? `AED ${property.propertyPrice.toLocaleString()}` : 'Price on request';
  const area = property?.propertySize ? `${property.propertySize} sq. ft` : 'Area not specified';
  const bedrooms = property?.propertyBedrooms?.toString() || 'Not specified';
  const location = property?.propertyState || property?.propertyAddress || 'Location not specified';
  const developer = property?.developer || 'Developer not specified';
  const licenseNumber = property?.dldPermitNumber;
  const brochureFile = property?.brochureFile;
  const completionDate = property?.completionDate;
  const propertyType = property?.propertyType || 'Property type not specified';
  const features = property?.features || [];
  const amenities = property?.amenities || [];
  const exactLocation = property?.exactLocation;
  const tags = property?.tags || [];
  
  // Format completion date if available
  const formattedCompletionDate = completionDate 
    ? new Date(completionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : 'Not specified';

  // Only render if we have at least some property data
  if (!property) {
    return <div className="text-center py-10">Loading property data...</div>;
  }

  return (
    <>
      {/* Fullscreen Gallery */}
      <AnimatePresence>
        {isFullscreen && images && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex flex-col justify-center items-center p-4"
          >
            <button 
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition-all"
              aria-label="Close gallery"
            >
              <X size={24} />
            </button>
            
            <div className="relative w-full max-w-6xl h-[80vh] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentIndex}
                  src={images[currentIndex].src} 
                  alt={images[currentIndex].alt} 
                  className="w-full h-full object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onLoad={() => setIsLoading(false)}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                />
              </AnimatePresence>
              
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center w-full max-w-6xl mt-4">
              <button 
                onClick={goToPrevious}
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full text-white transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              
              <div className="text-white text-sm">
                {currentIndex + 1} / {images.length}
              </div>
              
              <button 
                onClick={goToNext}
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full text-white transition-all"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            
            <div className="flex justify-center mt-4 gap-2 overflow-x-auto max-w-full pb-2">
              {images.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative h-16 w-24 rounded-lg overflow-hidden transition-all ${currentIndex === index ? 'ring-2 ring-blue-500 scale-105' : 'opacity-70'}`}
                >
                  <img 
                    src={img.src} 
                    alt={`Thumbnail ${index + 1}`} 
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* New Hero Banner Design */}
      <section className="mb-8">
        {/* Main Hero Section */}
        <div className="relative rounded-[20px] overflow-hidden mb-6">
          {/* Main Image */}
          {images ? (
            <div className="relative h-[70vh] w-full">
              <motion.img 
                src={images[currentIndex].src} 
                alt={images[currentIndex].alt}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                onLoad={() => setIsLoading(false)}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
              
              {/* Image Navigation */}
              {images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
                  {images.map((_, index) => (
                    <button 
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? 'bg-white scale-125' : 'bg-white/50'}`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
              
              {/* Fullscreen Button */}
              <button 
                onClick={toggleFullscreen}
                className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 p-2 rounded-full text-white transition-all backdrop-blur-sm"
                aria-label="View fullscreen"
              >
                <ExternalLink size={20} />
              </button>
              
              {/* Favorite Button */}
              <button 
                onClick={toggleFavorite}
                className={`absolute top-4 right-16 p-2 rounded-full transition-all backdrop-blur-sm ${isFavorite ? 'bg-red-500 text-white' : 'bg-black/30 hover:bg-black/50 text-white'}`}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
              
              {/* Property Category Badge */}
              {property?.category && (
                <div className="absolute top-4 left-4 px-4 py-2 bg-blue-500 text-white font-medium rounded-full text-sm backdrop-blur-sm">
                  {property.category === 'Off Plan' ? 'New Launch' : property.category}
                </div>
              )}
              
              {/* Property Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {/* Developer Logo/Name */}
                  <div className="mb-4">
                    {property?.developerImage ? (
                      <img 
                        src={property.developerImage}
                        alt={developer ? `${developer} Logo` : 'Developer logo'} 
                        className="h-10 w-auto object-contain bg-white/10 backdrop-blur-sm p-2 rounded-lg" 
                      />
                    ) : developer ? (
                      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                        <Building size={16} />
                        <span className="font-medium">{developer}</span>
                      </div>
                    ) : null}
                  </div>
                  
                  {/* Property Title */}
                  {projectName && (
                    <h1 className="text-3xl md:text-5xl font-bold mb-3">
                      {projectName}
                    </h1>
                  )}
                  
                  {/* Property Location */}
                  {location && (
                    <div className="flex items-center gap-2 text-white/90 mb-4">
                      <MapPin size={18} />
                      <span className="text-lg">{location}</span>
                    </div>
                  )}
                  
                  {/* Property Key Info */}
                  <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
                    {price && (
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                        <span className="font-medium">{price}</span>
                      </div>
                    )}
                    {area && (
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                        <span className="font-medium">{area}</span>
                      </div>
                    )}
                    {bedrooms && (
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                        <span className="font-medium">{bedrooms} Bed</span>
                      </div>
                    )}
                    {completionDate && (
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                        <Calendar size={16} />
                        <span className="font-medium">{formattedCompletionDate}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 mt-6">
                    {brochureFile && (
                      <motion.a 
                        href={brochureFile} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-full transition-colors text-center flex items-center gap-2"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Download size={18} />
                        Download Brochure
                      </motion.a>
                    )}
                    <motion.button 
                      className="cursor-pointer bg-white/20 hover:bg-white/30 text-white py-3 px-6 rounded-full transition-colors flex items-center gap-2 backdrop-blur-sm"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get a consultation
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          ) : (
            <div className="h-[70vh] bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">No images available</p>
            </div>
          )}
        </div>
        
        {/* Property Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag, index) => (
              <span key={index} className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                <Tag size={14} />
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* License Number */}
        {licenseNumber && (
          <p className="text-gray-500 text-sm">License number: {licenseNumber}</p>
        )}
      </section>
    </>
  );
};

export default HeroBanner;