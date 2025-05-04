import React from 'react';

const proximityLocations = [
  {
    timeRange: '5-15 minutes',
    places: 'Al Bateen Beach, Al Qana, Mushrif Mall'
  },
  {
    timeRange: '20-30 minutes',
    places: 'Al Bateen Executive Airport, UAE Presidential Palace'
  }
];

const LocationSection = () => {
  return (
    <section className="bg-white rounded-[30px] border border-[#e6e6e6] overflow-hidden mb-8 p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Location</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {proximityLocations.map((location, index) => (
          <div key={index} className="border border-[#f1f1f1] rounded-[15px] p-6 text-center">
            <h3 className="text-2xl font-semibold text-blue-400 mb-2">{location.timeRange}</h3>
            <p className="text-gray-600">{location.places}</p>
          </div>
        ))}
      </div>
      
      <div className="mb-6">
        <img 
          src="https://images.pexels.com/photos/936722/pexels-photo-936722.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Hudayriyat Island location" 
          className="w-full h-[400px] object-cover rounded-[20px]" 
        />
      </div>
      
      <div className="text-gray-600 space-y-4 leading-relaxed">
        <p>
          Hudayriyat Island is located in the southeast of Abu Dhabi opposite the popular Al Bateen Beach. Thanks to its
          many beaches, the island has become a popular tourist hotspot with many exciting things to do.
        </p>
        
        <p>
          After construction is completed, it will have its own social infrastructure, but in the meantime, the nearest
          educational institutions are located 10-15 minutes away, and hospitals are 15-20 minutes away. The closest
          kindergartens and schools are Bright Beginnings Nursery, Little Haven Nursery, Royal Palace Nursery, Al Jazira
          School, The International School of Choueifat and Al Qadisiya School. The nearest medical facilities are Emirates
          Health Hospital, Dr. Moza Alsweidi and Gulf Diagnostic Center Hospital.
        </p>
        
        <p>
          Hudayriyat Island is connected to the mainland of the emirate by a single bridge, and there will soon be several
          more built. A 10-minute drive from the island is the famous Al Qana promenade, where there is a huge selection of
          fashionable restaurants, shops and entertainment. The largest aquarium in the Middle East is located here. The
          Emirates Palace Hotel and Qasr Al Watan Presidential Palace are 15 minutes away.
        </p>
      </div>
    </section>
  );
};

export default LocationSection;