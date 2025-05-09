import React, { useState, useEffect } from "react";
import {
  FaPhone,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaBuilding,
  FaSearch,
  FaArrowRight,
} from "react-icons/fa";
import "animate.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AgentSlider from "../../components/AgentSlider/AgentSlider";
import PropertySearchBar from "../../components/PropertySearchBar/PropertySearchBar";
import PropertyCardSlider from "../../components/PropertyCardSlider/PropertyCardSlider";
import CommunitySlider from "../../components/CommunitySlider/CommunitySlider";
import PopularCommunities from "../../components/PopularCommunities/PopularCommunities";

// Hero Banner component for Off Plan page
const OffPlanHeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  
  // High-quality luxury off-plan property images
  const slides = [
    {
      image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
      title: "Off Plan",
      subtitle: "Investments"
    },
    {
      image: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg",
      title: "Future",
      subtitle: "Residences"
    },
    {
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      title: "Premium",
      subtitle: "Developments"
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
    <div className="mx-auto w-full overflow-hidden relative rounded-[30px] shadow-2xl">
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
                Invest in Tomorrow's Luxury
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
                Secure your future in Dubai's most prestigious developments. Exclusive payment plans and prime locations with exceptional ROI potential.
              </p>
            </div>
            
            {/* Animated buttons */}
            <div className="flex flex-wrap gap-4 animate-fadeInUp" style={{animationDelay: '0.6s'}}>
              <button 
                onClick={() => document.getElementById('offplan-listings').scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 text-sm md:text-base font-medium rounded-full border-2 border-white text-white hover:bg-white hover:text-[#FF2626] transition-all duration-300 backdrop-blur-sm flex items-center"
              >
                <FaSearch className="mr-2" /> Browse Properties
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="px-6 py-3 text-sm md:text-base font-medium rounded-full bg-[#FF2626] text-white hover:bg-[#FF4040] transition-all duration-300 flex items-center"
              >
                Speak to a Specialist <FaArrowRight className="ml-2" />
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
      <style dangerouslySetInnerHTML={{ __html: `
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
      `}} />
    </div>
  );
};

const OffPlanPropertiesPage = () => {
  const [allProperties] = useState([
    {
      id: 1,
      name: "The Acres",
      location: "Dubailand",
      deliveryDate: "Dec. 2028",
      price: "AED 5,090,000",
      developer: "MERAAS",
      image: "https://i.ibb.co.com/tMyVpjdk/the-acres-hausandhaus-main-1-50fe8d0045.webp",
      type: "Villa",
      beds: 4,
      baths: 5
    },
    {
      id: 2,
      name: "Serenia District",
      location: "Jumariah Islands",
      deliveryDate: "Dec. 2028",
      price: "AED 1,860,000",
      developer: "Palma Holding",
      image: "https://i.ibb.co.com/39dHgZNQ/serenia-district-jumeirah-islands-hausandhaus-101-c6273717cc.webp",
      type: "Apartment",
      beds: 2,
      baths: 2
    },
    {
      id: 3,
      name: "Palmiera The Oasis",
      location: "The Oasis",
      deliveryDate: "Dec. 2027",
      price: "AED 8,500,000",
      developer: "EMAAR",
      image: "https://i.ibb.co.com/0pRGvhSp/OASIS-PALMIERA-x-hausandhaus-1-e125317ee0.webp",
      type: "Penthouse",
      beds: 3,
      baths: 3
    },
    {
      id: 4,
      name: "Orise by Beyond",
      location: "Dubai Maritime City",
      deliveryDate: "Mar. 2028",
      price: "AED 1,900,000",
      developer: "OIMINAT",
      image: "https://i.ibb.co.com/TB1DYX9h/orise-by-beyond-omniyat-hausandhaus-11-954e43c5d0.webp",
      type: "Apartment",
      beds: 1,
      baths: 1
    },
  ]);

  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    
    const filtered = allProperties.filter(property => {
      // Location filter
      if (queryParams.get('location')) {
        const searchLocation = queryParams.get('location').toLowerCase();
        if (!property.location.toLowerCase().includes(searchLocation)) {
          return false;
        }
      }

      // Property type filter
      if (queryParams.get('propertyType')) {
        if (property.type !== queryParams.get('propertyType')) {
          return false;
        }
      }

      // Price range filter
      const minPrice = extractPriceValue(queryParams.get('minPrice'));
      const maxPrice = extractPriceValue(queryParams.get('maxPrice'));
      const propertyPrice = extractPriceValue(property.price);
      
      if (minPrice && propertyPrice < minPrice) return false;
      if (maxPrice && propertyPrice > maxPrice) return false;

      // Bedrooms filter
      if (queryParams.get('beds')) {
        const bedsFilter = queryParams.get('beds');
        if (bedsFilter === 'Studio' && property.beds !== 0) return false;
        if (bedsFilter.endsWith('+')) {
          const minBeds = parseInt(bedsFilter);
          if (property.beds < minBeds) return false;
        } else if (bedsFilter !== 'All' && property.beds !== parseInt(bedsFilter)) {
          return false;
        }
      }

      // Bathrooms filter
      if (queryParams.get('baths')) {
        const bathsFilter = queryParams.get('baths');
        if (bathsFilter.endsWith('+')) {
          const minBaths = parseInt(bathsFilter);
          if (property.baths < minBaths) return false;
        } else if (bathsFilter !== 'All' && property.baths !== parseInt(bathsFilter)) {
          return false;
        }
      }

      return true;
    });

    setFilteredProperties(filtered);
  }, [location.search, allProperties]);

  const extractPriceValue = (priceStr) => {
    if (!priceStr) return 0;
    const numericValue = priceStr.replace(/[^0-9]/g, '');
    return parseInt(numericValue, 10) || 0;
  };

  return (
    <div className="text-black pt-10 mb-20 container mx-auto">
      <div className="mb-6 pt-6">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-6">
          {/* Hero Banner Section */}
          <div className="relative">
            <OffPlanHeroBanner />
            <div className="sm:absolute sm:-bottom-12 sm:left-1/2 sm:transform sm:-translate-x-1/2 w-full max-w-4xl px-3 sm:px-4 bg-white rounded-[20px] shadow-lg mx-auto z-40 p-3 sm:p-4">
              <PropertySearchBar />
            </div>
          </div>
          
          {/* Main Content with spacing to account for the search bar */}
          <div className="mt-16 sm:mt-20 md:mt-24 sm:px-3 md:px-4 lg:px-5 mx-auto">
            <div id="offplan-listings" className="flex flex-col space-y-6 pt-8">
              <CommunitySlider />

              {/* Search results header */}
              <div className="mb-8 px-4">
                <h3 className="text-2xl font-semibold">
                  {location.search ? "Search Results" : "Start your off plan properties search"}
                </h3>
                <p className="text-lg text-gray-500 font-light">
                  {location.search 
                    ? `Found ${filteredProperties.length} properties matching your criteria`
                    : "From waterfront projects and luxury towers to family communities, Dubai offers an exciting array of off plan properties. Let's find yours."}
                </p>
              </div>

              {/* Main properties grid */}
              <div className="px-4 py-12 animate__animated animate__fadeIn">
                <div className="space-y-8">
                  {Array.from({ length: Math.ceil(filteredProperties.length / 3) }).map(
                    (_, chunkIndex) => {
                      const startIndex = chunkIndex * 3;
                      const chunk = filteredProperties.slice(startIndex, startIndex + 3);

                      return (
                        <div key={chunkIndex} className="space-y-8">
                          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {chunk.map((property) => (
                              <div
                                key={property.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 animate__animated animate__fadeInUp"
                              >
                                <Link to={`/off-plan-property/${property.id}`}>
                                  <div className="h-48 overflow-hidden">
                                    <img
                                      src={property.image}
                                      alt={property.name}
                                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                  </div>
                                </Link>

                                <div className="p-6 border border-gray-300">
                                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                    {property.name}
                                  </h2>
                                  <p className="text-gray-600 mb-4 flex items-center">
                                    <FaMapMarkerAlt className="mr-2" />
                                    {property.location}
                                  </p>

                                  <div className="space-y-3 my-4">
                                    <p className="text-gray-700 text-xs flex items-center">
                                      <FaCalendarAlt className="mr-2" />
                                      <span className="font-bold">Delivery: </span>
                                      {property.deliveryDate}
                                    </p>
                                    <p className="text-gray-700 text-xs flex items-center">
                                      <FaMoneyBillWave className="mr-2" />
                                      <span className="font-bold">Price from: </span>
                                      {property.price}
                                    </p>
                                    <p className="text-gray-700 text-xs flex items-center">
                                      <FaBuilding className="mr-2" />
                                      <span className="font-bold">Developer: </span>
                                      {property.developer}
                                    </p>
                                  </div>

                                  <div className="border font-extralight border-gray-200"></div>

                                  <div className="flex space-x-4 justify-between mt-6 pb-5">
                                    <button className="flex items-center justify-center px-4 py-2 btn btn-outline rounded-md bg-gray-200 hover:text-white hover:bg-red-300 border-none transition flex-1">
                                      <FaPhone className="mr-2" /> Call
                                    </button>
                                    <button className="flex items-center justify-center px-4 py-2 btn btn-outline rounded-md bg-gray-200 hover:text-white hover:bg-red-300 border-none transition flex-1">
                                      <FaWhatsapp className="text-2xl" /> Whatsapp
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Additional sections */}
              <h3 className="text-2xl font-semibold px-4">Best payment plans</h3>
              <p className="text-lg text-gray-500 font-light px-4 mb-6">
                Discover properties with the most attractive payment options in Dubai.
              </p>
              <PropertyCardSlider />

              <div className="space-y-4 pt-10 px-4">
                <h3 className="text-2xl font-semibold">Off Plan Developers</h3>
                <p className="text-lg text-gray-500 font-light">
                  Learn more about Dubai's world famous developers and what makes them unique.
                </p>
                <AgentSlider />
              </div>

              {/* Luxury branded projects section */}
              <div className="pt-10">
                <h3 className="text-2xl font-semibold px-4">Luxury branded projects</h3>
                <p className="text-lg text-gray-500 font-light px-4 mb-6">
                  Take luxury to a whole new level with branded residences by leading names.
                </p>
                <PropertyCardSlider />
              </div>

              <div className="px-4">
                <h3 className="text-4xl font-semibold text-center my-20">
                  Elevate your lifestyle with resort-branded amenities in the heart of the city
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffPlanPropertiesPage;