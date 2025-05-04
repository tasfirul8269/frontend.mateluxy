import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


const images = [
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

const HeroBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (

    <section className="  overflow-hidden mb-8">
      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-white rounded-[30px] border border-[#e6e6e6] p-8">
          <div className="flex items-center gap-4 mb-6">
            <span className="inline-block px-3 py-2 bg-green-100 text-green-500 text-[14px] font-medium rounded-[8px]">
              New Launch!
            </span>
            <img 
              src="https://cdn.prod.website-files.com/65b8ae9b3af43cf735dab067/65ca07c11aed2a3e77cc2c7d_65b8ae9b3af43cf735dacccf_65a7ec4ce7d5ecd0257b8943_Luxury%252520properties%252520in%252520Abu%252520Dhabi%252520for%252520Sale%252520and%252520Rent%252520_%252520Metropolitan%252520Capital%252520Real%252520Estate-2%252520(1).svg" 
              alt="Metropolitan Logo" 
              className="h-10 w-auto object-contain" 
            />
            <img 
              src="https://cdn.prod.website-files.com/65b8ae9b3af43cf735dab067/65ecd9d61c72d324ac86a518_logo%20black%20(2).svg" 
              alt="Modon Logo" 
              className="h-8 w-auto object-contain" 
            />
          </div>


          <h1 className="text-5xl font-semibold text-gray-800 mb-6">
            Hudayriyat Island by Modon Properties
          </h1>

          <p className="text-gray-600 mb-8 leading-relaxed">
            Hudayriyat Island is an exclusive and highly-anticipated project by Modon Properties. 
            This island occupies 11.6 sq. mi, and the coastline stretches for 9.9 mi. The dreams of all 
            connoisseurs of nature, sports, comfort and resort recreation is being made into a reality here. 
            The Nawayef community has three collections of villas and mansions, while Al Naseem has 
            California-style and Art Nouveau villas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button className="cursor-pointer bg-blue-400 hover:bg-blue-500 text-white py-3 px-6 rounded-[15px] transition-colors">
              Download Brochure
            </button>
            <button className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-[15px] transition-colors">
              Get a consultation
            </button>
          </div>

          <p className="text-gray-500 text-[12px]">License number: 202402273451</p>
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

      <div className="hidden lg:grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 divide-x mt-[30px] divide-gray-100">
        <div className="bg-white rounded-[30px] border border-[#e6e6e6] p-6">
        <p className="text-[14px] font-medium text-gray-500">Starting Price</p>
          <h3 className="text-blue-400 text-xl font-semibold">AED 6M (USD 1.63M)</h3>
          
        </div>
        <div  className="bg-white rounded-[30px] border border-[#e6e6e6] p-6">
        <p className="text-gray-500 text-[14px] font-medium">Area from</p>
          <h3 className="text-blue-400 text-xl font-semibold">3,595 sq. ft</h3>
         
        </div>
        <div className="bg-white rounded-[30px] border border-[#e6e6e6] p-6">
        <p className="text-[14px] font-medium text-gray-500">Number of Bedrooms</p>

          <h3 className="text-blue-400 text-xl font-semibold">3-8</h3>
        </div>
        <div className="bg-white rounded-[30px] border border-[#e6e6e6] p-6">
        <p className="text-[14px] font-medium text-gray-500">Location</p>

          <h3 className="text-blue-400 text-xl font-semibold">Hudayriyat Island</h3>
        </div>
      </div>
    </section>
    
  );
};

export default HeroBanner;
