
import React, { useState, useRef, useEffect } from 'react';
import ProCard from "../ProCard/ProCard";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const TopProperties = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [totalDots, setTotalDots] = useState(0);
  const [activeDot, setActiveDot] = useState(0);
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  const properties = [
    {
      name: "The Acres",
      location: "Dubailand",
      deliveryDate: "Dec. 2028",
      price: "AED 5,090,000",
      developer: "MERAAS",
      image: "https://i.ibb.co.com/tMyVpjdk/the-acres-hausandhaus-main-1-50fe8d0045.webp",
      propertyType: "Villa",
      beds: 5,
      baths: 4,
      kitchens: 1,
      languages: ["English", "Arabic"],
      bgColor: "#f0f7f4",
      agentName: "Sarah Johnson",
      agentImage: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Serenia District Apartment",
      location: "Jumariah Islands",
      deliveryDate: "Dec. 2028",
      price: "AED 1,860,000",
      developer: "Palma Holding",
      image: "https://i.ibb.co.com/39dHgZNQ/serenia-district-jumeirah-islands-hausandhaus-101-c6273717cc.webp",
      propertyType: "Apartment",
      beds: 2,
      baths: 2,
      kitchens: 1,
      languages: ["English", "Arabic", "Russian"],
      bgColor: "#fff5e6",
      agentName: "Ahmed Al-Maktoum",
      agentImage: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      name: "Palmiera The Oasis",
      location: "The Oasis",
      deliveryDate: "Dec. 2027",
      price: "AED 8,500,000",
      developer: "EMAAR",
      image: "https://i.ibb.co.com/0pRGvhSp/OASIS-PALMIERA-x-hausandhaus-1-e125317ee0.webp",
      propertyType: "Mansion",
      beds: 7,
      baths: 6,
      kitchens: 2,
      languages: ["English", "Arabic", "French"],
      bgColor: "#f9f2e8",
      agentName: "Fatima Al-Farsi",
      agentImage: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      name: "Orise by Beyond",
      location: "Dubai Maritime City",
      deliveryDate: "Mar. 2028",
      price: "AED 1,900,000",
      developer: "OIMINAT",
      image: "https://i.ibb.co.com/TB1DYX9h/orise-by-beyond-omniyat-hausandhaus-11-954e43c5d0.webp",
      propertyType: "Apartment",
      beds: 1,
      baths: 1,
      kitchens: 1,
      languages: ["English", "Arabic", "Chinese"],
      bgColor: "#e6f3ff",
      agentName: "Li Wei",
      agentImage: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      name: "Marina Heights",
      location: "Dubai Marina",
      deliveryDate: "Jun. 2027",
      price: "AED 3,250,000",
      developer: "DAMAC",
      image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
      propertyType: "Apartment",
      beds: 3,
      baths: 3,
      kitchens: 1,
      languages: ["English", "Arabic", "Russian"],
      bgColor: "#e6f3ff",
      agentName: "Maria Gonzalez",
      agentImage: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      name: "Palm Residences",
      location: "Palm Jumeirah",
      deliveryDate: "Sep. 2028",
      price: "AED 12,500,000",
      developer: "Nakheel",
      image: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg",
      propertyType: "Villa",
      beds: 6,
      baths: 7,
      kitchens: 2,
      languages: ["English", "Arabic", "French"],
      bgColor: "#f0f7f4",
      agentName: "John Smith",
      agentImage: "https://randomuser.me/api/portraits/men/7.jpg",
    },
  ];

  // Calculate total dots based on visible area
  useEffect(() => {
    if (!scrollRef.current) return;
    
    const calculateDots = () => {
      const containerWidth = scrollRef.current.clientWidth;
      const scrollWidth = scrollRef.current.scrollWidth;
      const cardWidth = scrollRef.current.querySelector('.property-card-container')?.offsetWidth || 300;
      const visibleCards = Math.floor(containerWidth / cardWidth);
      const totalCards = properties.length;
      const dots = Math.ceil((totalCards - visibleCards) / 1) + 1;
      setTotalDots(dots > 1 ? dots : 0);
    };
    
    calculateDots();
    window.addEventListener('resize', calculateDots);
    return () => window.removeEventListener('resize', calculateDots);
  }, [properties.length]);

  // Scroll to next or previous card
  const scroll = (direction) => {
    if (isAnimating || !scrollRef.current) return;
    
    setIsAnimating(true);
    
    const cardWidth = scrollRef.current.querySelector('.property-card-container')?.offsetWidth || 300;
    const scrollAmount = cardWidth + 15; // Card width + gap
    
    const currentScroll = scrollRef.current.scrollLeft;
    const newScroll = direction === 'next' 
      ? currentScroll + scrollAmount 
      : currentScroll - scrollAmount;
    
    scrollRef.current.scrollTo({
      left: newScroll,
      behavior: 'smooth'
    });
    
    // Update active dot
    const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    const scrollPercentage = newScroll / maxScroll;
    const newActiveDot = Math.min(Math.floor(scrollPercentage * totalDots), totalDots - 1);
    setActiveDot(newScroll <= 0 ? 0 : newActiveDot >= 0 ? newActiveDot : 0);
    
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  // Handle scroll buttons
  const handleNext = () => scroll('next');
  const handlePrev = () => scroll('prev');
  
  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current && !containerRef.current.matches(':hover')) {
        handleNext();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Update active dot on scroll
  useEffect(() => {
    if (!scrollRef.current) return;
    
    const handleScroll = () => {
      if (isAnimating || totalDots <= 1) return;
      
      const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      const scrollPercentage = scrollRef.current.scrollLeft / maxScroll;
      const newActiveDot = Math.min(Math.floor(scrollPercentage * totalDots), totalDots - 1);
      setActiveDot(scrollRef.current.scrollLeft <= 0 ? 0 : newActiveDot >= 0 ? newActiveDot : 0);
    };
    
    scrollRef.current.addEventListener('scroll', handleScroll);
    return () => scrollRef.current?.removeEventListener('scroll', handleScroll);
  }, [isAnimating, totalDots]);

  return (
    <div className="py-12 container mx-auto" ref={containerRef}>
      {/* Header with navigation controls */}
      <div className="flex justify-between items-center mb-8 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Premium Properties</h2>
        <div className="flex gap-2">
          <button 
            onClick={handlePrev} 
            className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
            aria-label="Previous property"
          >
            <FaChevronLeft />
          </button>
          <button 
            onClick={handleNext} 
            className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
            aria-label="Next property"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Carousel container */}
      <div className="relative">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-[15px] pb-4 hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {properties.map((property, index) => (
            <div 
              key={index} 
              className="property-card-container flex-shrink-0"
              style={{ width: 'calc((100% - 15px * 3) / 4)', minWidth: '385px' }} // Added another 10px more width (total +20px)
            >
              <ProCard property={property} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Pagination dots */}
      {totalDots > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalDots }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                if (isAnimating || !scrollRef.current) return;
                
                setIsAnimating(true);
                const cardWidth = scrollRef.current.querySelector('.property-card-container')?.offsetWidth || 300;
                const scrollAmount = index * cardWidth;
                
                scrollRef.current.scrollTo({
                  left: scrollAmount,
                  behavior: 'smooth'
                });
                
                setActiveDot(index);
                setTimeout(() => setIsAnimating(false), 500);
              }}
              className={`h-3 rounded-full transition-all ${activeDot === index ? 'bg-red-600 w-6' : 'bg-gray-300 w-3'}`}
              aria-label={`Go to slide ${index + 1}`}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      )}
      
      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default TopProperties;
