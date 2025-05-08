import React from "react";
import {
  FaPhone,
  FaWhatsapp,
  FaHeart,
  FaRegHeart,
  FaMapMarkerAlt
} from "react-icons/fa";
import { motion } from "framer-motion";
import "animate.css";

import locationImg from "../../assets/group-39519-2.svg";
import bath from "../../assets/ic_bath.svg";
import bed from "../../assets/ic_bed.svg";
import kitchen from "../../assets/vector-1.svg";
import divider from "../../assets/line-2.svg";
import { LiaBathSolid, LiaBedSolid } from "react-icons/lia";

const ProCard = ({ property }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  return (
    <motion.div 
      className="w-full h-[580px] p-[15px] my-5 md:my-0 border border-[#e6e6e6] rounded-[20px] bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-[15px] group">
        <motion.img 
          src={property?.image} 
          alt={property?.name} 
          className="w-full h-[214px] object-cover transition-transform duration-500 group-hover:scale-105" 
          whileHover={{ scale: 1.05 }}
        />
        <div className="absolute top-3 right-3 z-10">
          <motion.button 
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            {isFavorite ? (
              <FaHeart className="text-red-600" />
            ) : (
              <FaRegHeart className="text-gray-400" />
            )}
          </motion.button>
        </div>
        <div className="absolute bottom-3 left-3 z-10">
          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            {property?.deliveryDate}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <h3 className="truncate text-[20px] font-semibold text-gray-800 hover:text-red-600 transition-colors">
          {property?.name}
        </h3>
        <motion.span 
          className={`py-[5px] px-[10px] ml-[10px] ${property.propertyType =="Villa" ? 'bg-[#FFF5E7] text-[#FF9B17]' : 'bg-[#EBF8FF] text-[#256FFF]'} rounded-[10px] font-medium text-sm`}
          whileHover={{ scale: 1.05 }}
        >
          {property?.propertyType}
        </motion.span>
      </div>

      {/* location container */}
      <div className="flex justify-start items-center gap-2 mt-2">
        <FaMapMarkerAlt className="text-red-500" />
        <p className="text-[#999999] font-medium text-[14px]">{property?.location}</p>
        <div className="ml-auto text-sm font-medium text-gray-700">
          <span className="text-red-600">{property?.developer}</span>
        </div>
      </div>

      {/* features container */}
      <div className="flex justify-start gap-[20px] items-center my-4 bg-gray-50 p-3 rounded-xl">
        <div className="text-gray-700 flex justify-start items-center gap-2">
          <LiaBedSolid className="w-[20px] h-[20px] text-gray-600" />
          <p className="font-medium text-[16px]">{property?.beds} <span className="text-xs text-gray-500">Beds</span></p>
        </div>

        <div className="h-4 w-[1.5px] bg-[#e6e6e6]"></div>

        <div className="text-gray-700 flex justify-start items-center gap-2">
          <LiaBathSolid className="w-[20px] h-[20px] text-gray-600" />
          <p className="font-medium text-[16px]">{property?.baths} <span className="text-xs text-gray-500">Baths</span></p>
        </div>

        <div className="h-4 w-[1.5px] bg-[#e6e6e6]"></div>

        <div className="text-gray-700 flex justify-start items-center gap-2">
          <img className="w-5 h-5" src={kitchen} alt="Kitchen" />
          <p className="font-medium text-[16px]">{property?.kitchens} <span className="text-xs text-gray-500">Kitchen</span></p>
        </div>
      </div>

      {/* Agent container */}
      <div className="flex justify-between items-center my-4 gap-3 mb-5 bg-gray-50 p-3 rounded-xl">
        <div className="flex gap-3 items-center">
          <div className="relative">
            <img
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              src={property?.agentImage}
              alt={property?.agentName}
            />
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
          </div>

          {/* agent name and languages container */}
          <div>
            <h3 className="text-md font-semibold text-gray-800">
              {property?.agentName}
            </h3>
            <p className="text-[12px] text-gray-600">
              Speaks {property?.languages?.slice(0,2).join(", ")}
            </p>
          </div>
        </div>
        <motion.button 
          className="w-[auto] flex justify-center items-center gap-2 text-gray-700 bg-white border border-gray-200 px-[15px] py-[10px] rounded-[10px] shadow-sm hover:shadow-md transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaPhone className="text-[16px] text-gray-600" />
        </motion.button>
      </div>

      <div className="h-[1px] w-full bg-[#e6e6e6] my-4"></div>

      {/* buttons container */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[22px] font-bold text-gray-900">{property?.price}</h2>
          <p className="text-xs text-gray-500">Starting Price</p>
        </div>
        <motion.button 
          className="flex justify-center items-center gap-2 text-[#FF2626] bg-[#FFF0F0] hover:bg-[#FFE5E5] px-[20px] py-[10px] rounded-[15px] shadow-sm hover:shadow-md transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaWhatsapp className="text-xl" />
          <span className="font-medium">WhatsApp</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProCard;