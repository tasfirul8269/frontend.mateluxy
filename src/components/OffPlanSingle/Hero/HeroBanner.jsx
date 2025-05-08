import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Get all property details dynamically
  const projectName = property?.propertyTitle;
  const description = property?.propertyDescription;
  const price = property?.propertyPrice ? `AED ${property.propertyPrice.toLocaleString()}` : null;
  const area = property?.propertySize ? `${property.propertySize} sq. ft` : null;
  const bedrooms = property?.propertyBedrooms?.toString();
  const location = property?.propertyState || property?.propertyAddress;
  const developer = property?.developer;
  const licenseNumber = property?.dldPermitNumber;
  const brochureFile = property?.brochureFile;
  const completionDate = property?.completionDate;
  const propertyType = property?.propertyType;
  const features = property?.features;
  const amenities = property?.amenities;
  const exactLocation = property?.exactLocation;
  const tags = property?.tags;

  // Only render if we have at least some property data
  if (!property) {
    return <div className="text-center py-10">Loading property data...</div>;
  }

  return (
    <section className="overflow-hidden mb-8">
      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-white rounded-[30px] border border-[#e6e6e6] p-8">
          <div className="flex items-center gap-4 mb-6">
            {property?.category && (
              <span className="inline-block px-3 py-2 bg-green-100 text-green-500 text-[14px] font-medium rounded-[8px]">
                {property.category === 'Off Plan' ? 'New Launch!' : property.category}
              </span>
            )}
            {property?.developerImage ? (
              <img 
                src={property.developerImage}
                alt={developer ? `${developer} Logo` : 'Developer logo'} 
                className="h-10 w-auto object-contain" 
              />
            ) : developer ? (
              <div className="text-lg font-semibold">{developer}</div>
            ) : null}
          </div>

          {projectName && (
            <h1 className="text-5xl font-semibold text-gray-800 mb-6">
              {projectName}
            </h1>
          )}

          {description && (
            <p className="text-gray-600 mb-8 leading-relaxed">
              {description}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {brochureFile && (
              <a 
                href={brochureFile} 
                target="_blank" 
                rel="noopener noreferrer"
                className="cursor-pointer bg-blue-400 hover:bg-blue-500 text-white py-3 px-6 rounded-[15px] transition-colors text-center"
              >
                Download Brochure
              </a>
            )}
            <button className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-[15px] transition-colors">
              Get a consultation
            </button>
          </div>

          {licenseNumber && (
            <p className="text-gray-500 text-[12px]">License number: {licenseNumber}</p>
          )}
        </div>
        
        {images ? (
          <div className="bg-white rounded-[30px] border border-[#e6e6e6] overflow-hidden z-0 relative h-[420px] md:h-auto">
            <img 
              src={images[currentIndex].src} 
              alt={images[currentIndex].alt} 
              className="w-full h-full object-cover"
            />
            
            {images.length > 1 && (
              <>
                <button 
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full text-gray-700 transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                
                <button 
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full text-gray-700 transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button 
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${currentIndex === index ? 'bg-white w-4' : 'bg-white/60'}`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="bg-gray-100 rounded-[30px] border border-[#e6e6e6] h-[420px] md:h-auto flex items-center justify-center">
            <p className="text-gray-500">No images available</p>
          </div>
        )}
      </div>

      {(price || area || bedrooms || location) && (
        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 divide-x mt-[30px] divide-gray-100">
          {price && (
            <div className="bg-white rounded-[30px] border border-[#e6e6e6] p-6">
              <p className="text-[14px] font-medium text-gray-500">Starting Price</p>
              <h3 className="text-blue-400 text-xl font-semibold">{price}</h3>
            </div>
          )}
          {area && (
            <div className="bg-white rounded-[30px] border border-[#e6e6e6] p-6">
              <p className="text-gray-500 text-[14px] font-medium">Area from</p>
              <h3 className="text-blue-400 text-xl font-semibold">{area}</h3>
            </div>
          )}
          {bedrooms && (
            <div className="bg-white rounded-[30px] border border-[#e6e6e6] p-6">
              <p className="text-[14px] font-medium text-gray-500">Number of Bedrooms</p>
              <h3 className="text-blue-400 text-xl font-semibold">{bedrooms}</h3>
            </div>
          )}
          {location && (
            <div className="bg-white rounded-[30px] border border-[#e6e6e6] p-6">
              <p className="text-[14px] font-medium text-gray-500">Location</p>
              <h3 className="text-blue-400 text-xl font-semibold">{location}</h3>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default HeroBanner;