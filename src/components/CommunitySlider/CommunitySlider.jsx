import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FiChevronLeft, FiChevronRight, FiSearch } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/navigation';
import 'animate.css';

const CommunitySlider = ({ onCommunityClick }) => {
  const swiperRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const communities = [
    { name: 'Downtown Dubai' },
    { name: 'Business Bay' },
    { name: 'Dubai Marina' },
    { name: 'Dubai Creek Harbour' },
    { name: 'Dubai Hills Estate' },
    { name: 'Emirates Living' },
    { name: 'Jumeirah Village Circle' },
    { name: 'Jumeirah Village Triangle' }
  ];

  const filterCommunities = () => {
    if (!searchTerm.trim()) return communities;
    
    try {
      const regex = new RegExp(searchTerm, 'i');
      return communities.filter(community => regex.test(community.name));
    } catch (e) {
      return communities.filter(community => 
        community.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  };

  const filteredCommunities = filterCommunities();

  return (
    <div className="w-full bg-gray-50 relative">
      <div className="max-w-7xl mx-auto relative px-10">
        {/* Hidden search input that appears when needed */}
        <div className="absolute right-10 top-0 z-20 opacity-0 w-0 h-0 overflow-hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search communities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        
        <Swiper
          ref={swiperRef}
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 }
          }}
          modules={[Navigation]}
          className="w-full"
        >
          {filteredCommunities.map((community, index) => (
            <SwiperSlide key={index}>
              <div
                onClick={() => onCommunityClick(community.name)}
                className="block p-6 text-center text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300 animate__animated animate__fadeIn cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-white rounded-xl shadow-md border border-gray-300 px-6 py-3 h-full flex items-center justify-center">
                  <span className="animate__animated animate__fadeInUp text-sm font-medium">
                    {community.name}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
          
          {filteredCommunities.length === 0 && (
            <SwiperSlide>
              <div className="block p-6 text-center text-lg font-semibold text-gray-500">
                <div className="bg-white rounded-xl shadow-md border border-gray-300 px-6 py-3 h-full flex items-center justify-center">
                  No communities found
                </div>
              </div>
            </SwiperSlide>
          )}
        </Swiper>

        <button 
          onClick={() => swiperRef.current?.swiper.slidePrev()}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hover:bg-red-600 p-3 rounded-full shadow-md bg-red-700 transition-colors cursor-pointer"
        >
          <FiChevronLeft className="h-5 w-5 text-white" />
        </button>
        <button 
          onClick={() => swiperRef.current?.swiper.slideNext()}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hover:bg-red-600 p-3 rounded-full shadow-md bg-red-700 transition-colors cursor-pointer"
        >
          <FiChevronRight className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default CommunitySlider;