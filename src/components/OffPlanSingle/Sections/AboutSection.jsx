import React from 'react';
import { Bean as Beach, Home, Utensils, Music, Dumbbell, Wifi } from 'lucide-react';

const features = [
  {
    icon: <Beach size={24} />,
    title: 'Access to a private sandy beach',
    description: 'Enjoy exclusive access to pristine sandy beaches with crystal clear water'
  },
  {
    icon: <Utensils size={24} />,
    title: 'Playgrounds for adults and children',
    description: 'Specially designed areas for entertainment and recreation for all ages'
  },
  {
    icon: <Home size={24} />,
    title: 'Clubhouse',
    description: 'Modern clubhouse with premium amenities and social spaces'
  },
  {
    icon: <Dumbbell size={24} />,
    title: 'Gym',
    description: 'State-of-the-art fitness center with latest equipment'
  },
  {
    icon: <Wifi size={24} />,
    title: 'Spa',
    description: 'Luxurious spa facilities for ultimate relaxation'
  },
  {
    icon: <Music size={24} />,
    title: 'Entertainment',
    description: 'Various entertainment options for residents and guests'
  }
];

const AboutSection = () => {
  return (
    <section className="bg-white rounded-[30px] border border-[#e6e6e6] overflow-hidden mb-8 p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">About the project</h2>

      <div className="mb-8">
        <img
          src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Modern luxury villa exterior"
          className="w-full h-[400px] object-cover rounded-[20px] mb-6"
        />

        <p className="text-gray-600 mb-4 leading-relaxed">
          Hudayriyat Island is an ambitious project that is made up of two exclusive communities – Nawayef and Al Naseem.
          The developer, Modon Properties, announced that three collections of villas and mansions located on 164-ft hills
          will be built in the Nawayef community - Nawayef Homes, Nawayef Mansions and Nawayef Heights. Thanks to the
          tiered location of the residences, it will provide stunning views of the Arabian Gulf and the skyscrapers of Abu Dhabi.
          The Al Naseem community offers villas in styles such as Californian and Art Nouveau.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Benefits</h2>
        <p className="text-gray-600 mb-4">The community will be brimming with all sorts of world-class amenities. These include:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {features.map((feature, index) => (
            <div key={index} className="flex mb-5 items-start gap-4">
              <div className="bg-blue-50 p-3 rounded-lg text-blue-500">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;