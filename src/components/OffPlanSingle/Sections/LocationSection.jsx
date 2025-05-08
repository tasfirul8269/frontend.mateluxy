import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationSection = ({ property }) => {
  const position = property?.latitude && property?.longitude 
    ? [property.latitude, property.longitude] 
    : [0, 0]; // Default fallback

  const proximityLocations = [
    {
      timeRange: 'Exact Location',
      places: property?.exactLocation || property?.propertyAddress
    },
    {
      timeRange: 'Coordinates',
      places: `Lat: ${property?.latitude}, Lng: ${property?.longitude}`
    }
  ].filter(item => item.places);

  return (
    <section className="bg-white rounded-[30px] border border-[#e6e6e6] overflow-hidden mb-8 p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Location</h2>
      
      {proximityLocations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {proximityLocations.map((location, index) => (
            <div key={index} className="border border-[#f1f1f1] rounded-[15px] p-6 text-center">
              <h3 className="text-2xl font-semibold text-blue-400 mb-2">{location.timeRange}</h3>
              <p className="text-gray-600">{location.places}</p>
            </div>
          ))}
        </div>
      )}

      <div className="text-gray-600 space-y-4 leading-relaxed mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Full Address</h3>
        <p>
          {[
            property?.propertyAddress,
            property?.propertyState,
            property?.propertyZip,
            property?.propertyCountry
          ].filter(Boolean).join(', ')}
        </p>
      </div>

      {/* React-Leaflet Map */}
      {property?.latitude && property?.longitude && (
        <div className="mb-6 h-[400px] rounded-[20px] overflow-hidden">
          <MapContainer 
            center={position} 
            zoom={15} 
            style={{ height: '100%', width: '100%', borderRadius: '20px' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>
                {property?.propertyTitle || 'Property Location'}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </section>
  );
};

export default LocationSection;