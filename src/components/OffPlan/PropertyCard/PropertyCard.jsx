import React from 'react';
import { Building2, MapPin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import locationImg from "../../../assets/group-39519-2.svg";
import { useNavigate } from 'react-router-dom';


const PropertyCard = ({ property }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/off-plan-single'); 
  }
  return (
    <div onClick={handleClick} className="bg-white rounded-[20px] overflow-hidden hover:shadow-lg border border-[#e6e6e6]  transition-all duration-300">
      <div className="relative">
        <img 
          src={property.image} 
          alt={property.name}
          className="w-full h-[240px] object-cover"
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {property.tags.map((tag, index) => (
            <span 
              key={index}
              className="bg-white/90 backdrop-blur-sm text-sm px-4 py-1 rounded-full font-medium"
            >
              {tag.text}
            </span>
          ))}
        </div>
      </div>

      <div className="p-5">
        {/* <div className="text-[#00A3FF] text-[16px] font-semibold mb-2">
          AED {property.price.toLocaleString()}
        </div> */}

        {/* Property Name */}
        <div className="flex justify-between items-center mt-0">
        <h3 className=" flex-1 truncate text-[20px] font-medium">
          {property?.name}
        </h3>
        <div className="py-[5px] px-[10px] ml-[10px] bg-[#E8F7FF] w-fit text-[#256fff]  rounded-[10px]">
          AED {property.price}
        </div>
       
      </div>


        {/* Property Location */}

        <div className="flex justify-start items-center gap-2">
            <img src={locationImg} alt={property.location} />
            <p className="mt-[5px] text-[#999999] font-medium text-[14px]">{property.location}</p>
        </div>
        
        {/* Developer */}

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1 text-gray-500">
            <Building2 className='text-[#256fff] mr-1' size={16} />
            <p className="mt-[5px] text-[#999999] font-medium text-[14px]">Developer : {property.developer}</p>          </div>
          
         
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Area from */}
          <div className="border border-[#f2f2f2] rounded-[8px] px-[10px] py-[5px]">
            <div className="text-[12px] font-medium text-gray-500">Area froom</div>
            <div className="text-[#00A3FF] font-medium text-[14px]">{property.details.find(d => d.label === 'Size')?.value}</div>
          </div>
          {/* Berooms  */}
          <div className="border border-[#f2f2f2] rounded-[8px] px-[10px] py-[5px]">
            <div className="text-[12px] font-medium text-gray-500">Bedrooms</div>
            <div className="text-[#00A3FF] font-medium text-[14px]">{property.beds}</div>
          </div>
        </div>

        <div class="h-[1px] w-80% bg-[#e6e6e6] my-4"></div>


        <div className="grid grid-cols-2 gap-3">
          <button  className="w-[auto] flex-grow flex justify-center items-center gap-2 text-[#256fff] bg-[#EBF8FF] px-[5px] py-[10px] rounded-[15px]">
                   <span className="font-medium text-[14px]">Download Brochure</span>
          </button>
          <button  className="w-[auto] flex-shrink flex justify-center items-center gap-2 text-[#00BD1C] bg-[#CEFFD5] px-[5px] py-[10px] rounded-[15px]">
                 <FaWhatsapp className="text-[14px] text-[#00BD1C]" />
                   <span className="font-medium text-[14px]">WhatsApp</span>
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;