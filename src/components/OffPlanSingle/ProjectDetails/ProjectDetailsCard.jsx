import React from 'react';

const details = [
  { label: 'Starting Price', value: 'AED 6M (USD 1.63M)' },
  { label: 'Area from', value: '3,595 sq. ft' },
  { label: 'Number of Bedrooms', value: '3-8' },
  { label: 'Location', value: 'Hudayriyat Island' }
];

const ProjectDetailsCard = () => {
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
      
      <button className="cursor-pointer w-full bg-blue-400 hover:bg-blue-500 text-white py-3 px-6 rounded-[15px] transition-colors font-medium mt-6">
        Download Brochure
      </button>
    </div>
  );
};

export default ProjectDetailsCard;