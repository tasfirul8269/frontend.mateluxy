import React, { useState, useEffect } from 'react';
import { Building2, MapPin, Download } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const [agent, setAgent] = useState({
    name: 'MateLuxy Agent',
    phone: '+971 50 123 4567',
    whatsapp: '+971 50 123 4567',
    email: 'agent@mateluxy.com'
  });
  const [isLoadingAgent, setIsLoadingAgent] = useState(false);

  // Fetch agent data when component mounts
  useEffect(() => {
    const fetchAgentData = async () => {
      if (!property || !property.agent) return;
      
      setIsLoadingAgent(true);
      try {
        // Determine agent ID from property
        let agentId;
        if (typeof property.agent === 'string') {
          agentId = property.agent;
        } else if (property.agent && property.agent._id) {
          agentId = property.agent._id;
        } else {
          console.log('No valid agent ID found');
          setIsLoadingAgent(false);
          return;
        }
        
        // Fetch agent data
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/agents/${agentId}`);
        if (response.data) {
          setAgent({
            name: response.data.fullName || 'MateLuxy Agent',
            phone: response.data.contactNumber || '+971 50 123 4567',
            whatsapp: response.data.whatsapp || response.data.contactNumber || '+971 50 123 4567',
            email: response.data.email || 'agent@mateluxy.com'
          });
        }
      } catch (error) {
        console.error('Error fetching agent data:', error);
      } finally {
        setIsLoadingAgent(false);
      }
    };
    
    fetchAgentData();
  }, [property]);

  const handleClick = (e) => {
    // Prevent click event from bubbling to parent div
    // when clicking on buttons
    if (e.target.closest('button')) {
      e.stopPropagation();
      return;
    }
    navigate(`/off-plan-single/${property._id || property.id}`); 
  }
  
  const handleWhatsAppClick = (e) => {
    e.stopPropagation(); // Prevent navigation to property details
    // Format WhatsApp number by removing non-numeric characters
    const whatsappNumber = agent.whatsapp.replace(/[^0-9]/g, '');
    // Open WhatsApp with pre-filled message
    window.open(
      `https://wa.me/${whatsappNumber}?text=Hi, I'm interested in the property: ${property.propertyTitle}`,
      '_blank'
    );
  }
  
  const handleDownloadBrochure = (e) => {
    e.stopPropagation(); // Prevent navigation to property details
    if (property.brochureFile) {
      // If brochure file exists, download it
      window.open(property.brochureFile, '_blank');
    } else {
      // If no brochure file, show alert
      alert('Brochure not available for this property. Please contact the agent for more information.');
    }
  }

  return (
    <div onClick={handleClick} className="bg-white rounded-[20px] overflow-hidden hover:shadow-xl border border-[#e6e6e6] transition-all duration-300 cursor-pointer shadow-md">
      <div className="relative">
        <img 
          src={property.propertyFeaturedImage} 
          alt={property.propertyTitle}
          className="w-full h-[240px] object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {property.tags?.map((tag, index) => (
            <span 
              key={index}
              className="bg-white/90 backdrop-blur-sm text-sm px-4 py-1 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

      </div>

      <div className="p-5 bg-white">
        <div className="flex justify-between items-center mt-0">
          <h3 className="flex-1 truncate text-[20px] font-medium">
            {property?.propertyTitle}
          </h3>
          <div className="py-[5px] px-[10px] ml-[10px] bg-[#FFF0F0] w-fit text-[#FF2626] rounded-[10px] font-medium">
            AED {property.propertyPrice}
          </div>
        </div>

        <div className="flex justify-start items-center gap-2 mt-2">
          <div className="text-[#FF2626]">
            <MapPin size={16} />
          </div>
          <p className="text-[#666666] font-medium text-[14px]">{property.propertyAddress}</p>
        </div>
        
        <div className="flex items-center gap-4 mb-4 mt-3">
          <div className="flex items-center gap-2 text-gray-500">
            <Building2 className='text-[#FF2626]' size={16} />
            <p className="text-[#666666] font-medium text-[14px]">Developer: {property.developer}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="border border-[#f2f2f2] rounded-[10px] px-[12px] py-[8px] hover:border-[#FF2626]/20 transition-colors">
            <div className="text-[12px] font-medium text-gray-500">Area from</div>
            <div className="text-[#FF2626] font-medium text-[14px]">{property.propertySize} sq.ft</div>
          </div>
          <div className="border border-[#f2f2f2] rounded-[10px] px-[12px] py-[8px] hover:border-[#FF2626]/20 transition-colors">
            <div className="text-[12px] font-medium text-gray-500">Bedrooms</div>
            <div className="text-[#FF2626] font-medium text-[14px]">{property.propertyBedrooms}</div>
          </div>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-[#FF2626]/10 via-[#FF2626]/20 to-[#FF2626]/10 my-4"></div>

        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={handleDownloadBrochure}
            className="w-[auto] flex-grow flex justify-center items-center gap-2 text-white bg-[#FF2626] hover:bg-[#FF2626]/80 cursor-pointer px-[5px] py-[10px] rounded-[10px] transition-colors"
          >
            <span className="font-medium text-[14px]">Download Brochure</span>
          </button>
          <button 
            onClick={handleWhatsAppClick}
            className="w-[auto] flex-shrink cursor-pointer flex justify-center items-center gap-2 text-[#25D366] bg-transparent hover:bg-[#f0f9f0] px-[5px] py-[10px] rounded-[10px] border border-[#e6e6e6] transition-colors"
          >
            <FaWhatsapp className="text-[16px]" />
            <span className="font-medium text-[14px]">WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;