import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryData } from '../../../data/gallery';

const tabs = [
  { id: 'exteriors', label: 'Exteriors', active: true },
  { id: 'interiors', label: 'Interiors' }
];

const GallerySection = () => {
  const [activeTab, setActiveTab] = useState('exteriors');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const images = galleryData[activeTab];

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <section className="bg-white rounded-[30px] border border-[#e6e6e6] overflow-hidden mb-8 p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Gallery</h2>
      
      <div className="flex mb-6 border-b border-[#e6e6e6]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setCurrentIndex(0);
            }}
            className={`py-3 px-8 text-center transition-colors ${
              activeTab === tab.id
                ? 'text-blue-500 border-b-2 border-blue-500 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-[15px] overflow-hidden">
        <img 
          src={images[currentIndex].src} 
          alt={images[currentIndex].alt} 
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        
        <button 
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full text-gray-700 transition-all"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full text-gray-700 transition-all"
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
    </section>
  );
};

export default GallerySection;