import React from "react";
import {
  FaPhone,
  FaWhatsapp,

} from "react-icons/fa";
import "animate.css";

import locationImg from "../../assets/group-39519-2.svg";
import bath from "../../assets/ic_bath.svg";
import bed from "../../assets/ic_bed.svg";
import kitchen from "../../assets/vector-1.svg";
import divider from "../../assets/line-2.svg";
import { LiaBathSolid, LiaBedSolid } from "react-icons/lia";




const ProCard = ({ property }) => {
  return (
    <div className="w-[365px] p-[15px] my-5 md:my-0 border border-[#e6e6e6] rounded-[20px] animate__animated animate__fadeInUp]">
      <img src={property?.image} alt={property?.name} className="rounded-[15px] w-[350px] h-[214px]" />
      <div className="flex justify-between items-center mt-4">
        <h3 className="truncate text-[20px] font-medium">
          {property?.name}
        </h3>
        {property.propertyType =="Villa" ? <button className="py-[5px] px-[10px] ml-[10px] bg-[#FFF5E7] text-[#FF9B17] rounded-[10px]">
          {property?.propertyType}
        </button> :  <button className="py-[5px] px-[10px] ml-[10px] bg-[#E8F7FF] text-[#256fff] rounded-[10px]">
          {property?.propertyType}
        </button>}
       
      </div>

      {/* location container */}
      <div className="flex justify-start items-center gap-2">
        <img src={locationImg} alt={property?.location} />
        <p className="mt-[5px] text-[#999999] font-medium text-[14px]">{property?.location}</p>
      </div>

      {/* features container */}
      <div className="flex justify-start gap-[30px] items-center my-4">
        <div className="text-[#999999] flex justify-start items-center gap-3">
          <LiaBedSolid className="w-[20px] h-[20px] text-[2xl]" />
          <p className="font-medium text-[16px]">{property?.beds}</p>
        </div>

        <div className="h-3 w-[1.5px] bg-[#e6e6e6] mx-4"></div>

        <div className="text-[#999999] flex justify-start items-center gap-3">
        <LiaBathSolid  className="w-[20px] h-[20px] text-2xl" />
          <p className="font-medium text-[16px]">{property?.baths}</p>
        </div>

        <div class="h-3 w-[1.5px] bg-[#e6e6e6] mx-4"></div>


        <div className="text-[#999999] flex justify-start items-center gap-3">
         <img className="w-6  h-6" src={kitchen} alt="Kitchen" />
          <p className="font-medium text-[16px]">{property?.kitchens}</p>
        </div>
      </div>

      {/* Agent container */}
      <div className="flex justify-between items-center my-4 gap-3 mb-5">
        <div className="flex gap-3 items-center"><img
            className="w-13 h-13 rounded-full"
          src={property?.agentImage}
          alt={property?.agentName}
        />

        {/* agent name ana languages container */}
        <div>
          <h3 className="text-md font-medium">
            {
                property?.agentName
            }
          </h3>
          <p className="text-[12px] text-gray-600">
            Speaks {property?.languages?.slice(0,2).join(", ")}
          </p>
        </div>
       
        </div>
        <button  className="w-[auto] flex justify-center items-center gap-2 text-[#00BD1C] bg-[#e6e6e6] px-[15px] py-[10px] rounded-[10px]">
        <FaPhone className="text-[16px] text-[#999999]" />
        </button>
      </div>

      <div class="h-[1px] w-80% bg-[#e6e6e6] my-4"></div>


      {/* buttons container */}
      <div className="flex items-center justify-between">
      <h2 className="ml-[10px] text-[18px] font-medium">{property?.price}</h2>
        <button  className="w-[auto] flex justify-center items-center gap-2 text-[#00BD1C] bg-[#CEFFD5] px-[20px] py-[10px] rounded-[15px]">
        <FaWhatsapp className="text-xl text-[#00BD1C]" />
          <span className="font-medium">WhatsApp</span>
        </button>
      </div>
    </div>
  );
};

export default ProCard;