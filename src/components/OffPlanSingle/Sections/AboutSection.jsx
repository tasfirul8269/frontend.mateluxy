import React from 'react';
import { 
  Home, 
  Utensils, 
  Music, 
  Dumbbell, 
  Wifi,
  Shield,
  Droplet,
  ParkingSquare,
  Smartphone
} from 'lucide-react';

// Simplified icon mapping using only available exports
const featureIcons = {
  'Restaurant': <Utensils className="text-blue-500" size={24} />,
  'Clubhouse': <Home className="text-blue-500" size={24} />,
  'Gym': <Dumbbell className="text-blue-500" size={24} />,
  'Spa': <Droplet className="text-blue-500" size={24} />,
  'Entertainment': <Music className="text-blue-500" size={24} />,
  'Security': <Shield className="text-blue-500" size={24} />,
  'Parking': <ParkingSquare className="text-blue-500" size={24} />,
  'Smart Home': <Smartphone className="text-blue-500" size={24} />,
  'Wifi': <Wifi className="text-blue-500" size={24} />
};

const AboutSection = ({ property }) => {
  return (
    <section className="bg-white rounded-[30px] border border-[#e6e6e6] overflow-hidden mb-8 p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">About the project</h2>

      <div className="mb-8">
        {property?.propertyFeaturedImage && (
          <img
            src={property.propertyFeaturedImage}
            alt="Property overview"
            className="w-full h-[400px] object-cover rounded-[20px] mb-6"
          />
        )}

        {property?.propertyDescription && (
          <p className="text-gray-600 mb-4 leading-relaxed">
            {property.propertyDescription}
          </p>
        )}
      </div>

      {property?.features?.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {property.features.map((feature, index) => (
              <div key={index} className="flex mb-5 items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  {featureIcons[feature] || <Home className="text-blue-500" size={24} />}
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">{feature}</h3>
                  <p className="text-gray-600 text-sm">
                    {feature === 'Gym' ? 'Fully-equipped fitness center' : 
                     feature === 'Spa' ? 'Luxury spa facilities' :
                     `Premium ${feature} access`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutSection;