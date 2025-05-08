import React from 'react';

const ProjectDetailsCard = ({ property }) => {
  // Dynamic details derived from property data
  const details = [
    { 
      label: 'Starting Price', 
      value: property?.propertyPrice ? `AED ${property.propertyPrice.toLocaleString()}` : 'Price not specified' 
    },
    { 
      label: 'Area from', 
      value: property?.propertySize ? `${property.propertySize} sq. ft` : 'Size not specified' 
    },
    { 
      label: 'Number of Bedrooms', 
      value: property?.propertyBedrooms ?? 'Not specified' 
    },
    { 
      label: 'Location', 
      value: property?.propertyState || property?.propertyAddress || 'Location not specified' 
    }
  ];

  return (
    <div className="bg-white rounded-[30px] border border-[#e6e6e6] p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Project details</h2>
      
      <div className="space-y-4">
        {details.map((detail, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-600">{detail.label}</span>
            <span className={`font-regular text-[14px] ${index === 0 ? 'text-blue-400' : 'text-blue-400'}`}>
              {detail.value}
            </span>
          </div>
        ))}
      </div>
      
      {property?.brochureFile && (
        <a 
          href={property.brochureFile} 
          target="_blank" 
          rel="noopener noreferrer"
          className="cursor-pointer w-full bg-blue-400 hover:bg-blue-500 text-white py-3 px-6 rounded-[15px] transition-colors font-medium mt-6 block text-center"
        >
          Download Brochure
        </a>
      )}
    </div>
  );
};

export default ProjectDetailsCard;