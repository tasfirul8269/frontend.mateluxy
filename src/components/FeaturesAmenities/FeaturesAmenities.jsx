import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaSwimmingPool, FaDumbbell, FaParking, FaWifi, FaShieldAlt, FaTree } from 'react-icons/fa';
import { MdBalcony, MdOutlineElevator, MdPets, MdLocalLaundryService } from 'react-icons/md';
import { GiTennisCourt, GiSoccerField } from 'react-icons/gi';
import { BsSmartwatch } from 'react-icons/bs';
import { TbAirConditioning } from 'react-icons/tb';
import { BiSolidWasher } from 'react-icons/bi';

const FeaturesAmenities = () => {
  const navigate = useNavigate();

  // Define common features and amenities with icons
  const featuresAmenities = [
    { name: 'Swimming Pool', icon: <FaSwimmingPool className="text-2xl text-red-600" />, type: 'amenities' },
    { name: 'Gym', icon: <FaDumbbell className="text-2xl text-red-600" />, type: 'amenities' },
    { name: 'Parking', icon: <FaParking className="text-2xl text-red-600" />, type: 'amenities' },
    { name: 'Security', icon: <FaShieldAlt className="text-2xl text-red-600" />, type: 'amenities' },
    { name: 'Balcony', icon: <MdBalcony className="text-2xl text-red-600" />, type: 'features' },
    { name: 'Tennis Court', icon: <GiTennisCourt className="text-2xl text-red-600" />, type: 'amenities' },
    { name: 'Garden', icon: <FaTree className="text-2xl text-red-600" />, type: 'amenities' },
    { name: 'Elevator', icon: <MdOutlineElevator className="text-2xl text-red-600" />, type: 'amenities' },
    { name: 'Pet Friendly', icon: <MdPets className="text-2xl text-red-600" />, type: 'features' },
    { name: 'Smart Home', icon: <BsSmartwatch className="text-2xl text-red-600" />, type: 'features' },
    { name: 'Air Conditioning', icon: <TbAirConditioning className="text-2xl text-red-600" />, type: 'features' },
    { name: 'Laundry', icon: <MdLocalLaundryService className="text-2xl text-red-600" />, type: 'amenities' },
    { name: 'WiFi', icon: <FaWifi className="text-2xl text-red-600" />, type: 'amenities' },
    { name: 'Football Field', icon: <GiSoccerField className="text-2xl text-red-600" />, type: 'amenities' },
    { name: 'Washer', icon: <BiSolidWasher className="text-2xl text-red-600" />, type: 'features' },
  ];

  // Handle click to navigate to properties page with filter
  const handleFeatureClick = (feature, type) => {
    navigate(`/properties?${type}=${encodeURIComponent(feature)}`);
  };

  return (
    <div className="py-12 container mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Features & Amenities</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover properties with your desired features and amenities to find your perfect home
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {featuresAmenities.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-4 flex flex-col items-center cursor-pointer border border-gray-100"
            whileHover={{ y: -5, scale: 1.02 }}
            onClick={() => handleFeatureClick(item.name, item.type)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-3">
              {item.icon}
            </div>
            <h3 className="font-medium text-gray-800 text-center">{item.name}</h3>
            <span className="text-xs text-gray-500 mt-1 bg-gray-100 px-2 py-1 rounded-full">
              {item.type === 'features' ? 'Feature' : 'Amenity'}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FeaturesAmenities;
