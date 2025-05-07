import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroBanner = ({ property }) => {
  // If no property is provided, use default fallback images
  const defaultImages = [
    {
      src: 'https://images.pexels.com/photos/3935349/pexels-photo-3935349.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      alt: 'Luxurious waterfront villa with private pool'
    },
    {
      src: 'https://images.pexels.com/photos/5997992/pexels-photo-5997992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      alt: 'Modern beachfront property with terrace'
    },
    {
      src: 'https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      alt: 'Exclusive villa with garden and sea view'
    }
  ];

  // Format property images if available
  const images = property?.propertyImages?.length > 0 
    ? property.propertyImages.map(img => ({ 
        src: img, 
        alt: property.propertyTitle || 'Property image' 
      })) 
    : defaultImages;

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Get property details or use fallbacks
  const projectName = property?.propertyTitle || "Hudayriyat Island by Modon Properties";
  const description = property?.propertyDescription || "Exclusive off-plan development with luxury amenities.";
  const price = property?.propertyPrice ? `AED ${property.propertyPrice.toLocaleString()}` : "AED 6M (USD 1.63M)";
  const area = property?.propertySize ? `${property.propertySize} sq. ft` : "3,595 sq. ft";
  const bedrooms = property?.propertyBedrooms ? property.propertyBedrooms.toString() : "3-8";
  const location = property?.propertyState || "Hudayriyat Island";
  const developer = property?.developer || "Modon Properties";

  return (
    <section className="overflow-hidden mb-8">
      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-white rounded-[30px] border border-[#e6e6e6] p-8">
          <div className="flex items-center gap-4 mb-6">
            <span className="inline-block px-3 py-2 bg-green-100 text-green-500 text-[14px] font-medium rounded-[8px]">
              {property?.type === 'Off Plan' ? 'New Launch!' : property?.type || 'Off Plan'}
            </span>
            {/* Show developer logo if available */}
            {property?.developerLogo ? (
              <img 
                src={property.developerLogo}
                alt={`${developer} Logo`} 
                className="h-10 w-auto object-contain" 
              />
            ) : (
              <div className="text-lg font-semibold">{developer}</div>
            )}
          </div>

          <h1 className="text-5xl font-semibold text-gray-800 mb-6">
            {projectName}
          </h1>

          <p className="text-gray-600 mb-8 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button className="cursor-pointer bg-blue-400 hover:bg-blue-500 text-white py-3 px-6 rounded-[15px] transition-colors">
              Download Brochure
            </button>
            <button className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-[15px] transition-colors">
              Get a consultation
            </button>
          </div>

          <p className="text-gray-500 text-[12px]">License number: {property?.licenseNumber || "202402273451"}</p>
        </div>
        
        <div className="bg-white rounded-[30px] border border-[#e6e6e6] overflow-hidden z-0 relative h-[420px] md:h-auto">
          <img 
            src={images[currentIndex].src} 
            alt={images[currentIndex].alt} 
            className="w-full h-full object-cover"
          />
           
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
        </div>
      </div>

      <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 divide-x mt-[30px] divide-gray-100">
        <div className="bg-white rounded-[30px] border border-[#e6e6e6] p-6">
          <p className="text-[14px] font-medium text-gray-500">Starting Price</p>
          <h3 className="text-blue-400 text-xl font-semibold">{price}</h3>
        </div>
        <div className="bg-white rounded-[30px] border border-[#e6e6e6] p-6">
          <p className="text-gray-500 text-[14px] font-medium">Area from</p>
          <h3 className="text-blue-400 text-xl font-semibold">{area}</h3>
        </div>
        <div className="bg-white rounded-[30px] border border-[#e6e6e6] p-6">
          <p className="text-[14px] font-medium text-gray-500">Number of Bedrooms</p>
          <h3 className="text-blue-400 text-xl font-semibold">{bedrooms}</h3>
        </div>
        <div className="bg-white rounded-[30px] border border-[#e6e6e6] p-6">
          <p className="text-[14px] font-medium text-gray-500">Location</p>
          <h3 className="text-blue-400 text-xl font-semibold">{location}</h3>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
