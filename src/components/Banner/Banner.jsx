import React, { useState, useEffect } from "react";
import "../../components/Navbar/colors.css";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // High-quality luxury property images from Pexels
  const slides = [
    {
      image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
      title: "Luxury Living",
      subtitle: "Redefined"
    },
    {
      image: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg",
      title: "Premium",
      subtitle: "Properties"
    },
    {
      image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
      title: "Exclusive",
      subtitle: "Listings"
    }
  ];

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Handle manual navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="mx-auto mb-11 w-full overflow-hidden relative rounded-[30px] shadow-2xl">
      {/* Main banner container */}
      <div className="relative min-h-[650px] md:min-h-[650px]">
        
        {/* Image slider with transition effects */}
        <div className="absolute inset-0 w-full h-full">
          {slides.map((slide, index) => (
            <div 
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                currentSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              ></div>
              
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
            </div>
          ))}
        </div>

        {/* Content overlay */}
        <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 py-12">
          <div className="max-w-xl">
            {/* Animated subtitle */}
            <div className="overflow-hidden">
              <p className="text-white/80 text-sm md:text-base uppercase tracking-widest mb-2 animate-fadeInUp">
                Discover Your Dream Home
              </p>
            </div>
            
            {/* Animated title with dynamic content */}
            <div className="overflow-hidden mb-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white animate-fadeInUp" style={{animationDelay: '0.2s'}}>
                {slides[currentSlide].title} <br />
                <span className="text-[#FF2626]">{slides[currentSlide].subtitle}</span>
              </h1>
            </div>
            
            {/* Animated description */}
            <div className="overflow-hidden mb-8">
              <p className="text-white/70 text-base md:text-lg max-w-md animate-fadeInUp" style={{animationDelay: '0.4s'}}>
                We provide a complete service for the sale, purchase or rental of real estate with a modern approach and personalized experience.
              </p>
            </div>
            
            {/* Animated buttons */}
            <div className="flex flex-wrap gap-4 animate-fadeInUp" style={{animationDelay: '0.6s'}}>
              <button className="px-6 py-3 text-sm md:text-base font-medium rounded-full border-2 border-white text-white hover:bg-white hover:text-[#FF2626] transition-all duration-300 backdrop-blur-sm">
                Learn More
              </button>
              <button className="px-6 py-3 text-sm md:text-base font-medium rounded-full bg-[#FF2626] text-white hover:bg-[#FF4040] transition-all duration-300">
                Explore Properties
              </button>
            </div>
          </div>
        </div>
        
        {/* Slide indicators */}
        <div className="absolute bottom-8 right-8 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-[#FF2626] w-8' : 'bg-white/50 hover:bg-white'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
      
      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Banner;