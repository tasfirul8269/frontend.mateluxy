

import React from 'react';
import ProCard from "../ProCard/ProCard";

const TopProperties = () => {
  
  const properties = [
        {
          name: "The Acres",
          location: "Dubailand",
          deliveryDate: "Dec. 2028",
          price: "AED 5,090,000",
          developer: "MERAAS",
          image:
            "https://i.ibb.co.com/tMyVpjdk/the-acres-hausandhaus-main-1-50fe8d0045.webp",
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
          image:
            "https://i.ibb.co.com/39dHgZNQ/serenia-district-jumeirah-islands-hausandhaus-101-c6273717cc.webp",
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
          image:
            "https://i.ibb.co.com/0pRGvhSp/OASIS-PALMIERA-x-hausandhaus-1-e125317ee0.webp",
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
          image:
            "https://i.ibb.co.com/TB1DYX9h/orise-by-beyond-omniyat-hausandhaus-11-954e43c5d0.webp",
          propertyType: "Apartment",
          beds: 1,
          baths: 1,
          kitchens: 1,
          languages: ["English", "Arabic", "Chinese"],
          bgColor: "#e6f3ff",
          agentName: "Li Wei",
          agentImage: "https://randomuser.me/api/portraits/men/5.jpg",
        },
      ];


  return (
    <div className="px-0 py-8 animate__animated animate__fadeIn container mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-[#083819] mb-4">Browse our top properties</h1>
      {/* cards container */}
    <div  className="overflow-x-auto "
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
      <div className="grid grid-flow-col auto-cols-max gap-4">
        {/* card */}
        {
          properties.slice(0,4).map((property, index) => <ProCard key={index} property={property}></ProCard>)
        }
      </div>
      </div>
    </div>
  );
};

export default TopProperties;
