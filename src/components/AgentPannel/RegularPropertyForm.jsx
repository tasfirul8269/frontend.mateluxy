import React, { useState } from 'react';
import { ArrowLeft, Save, Upload } from 'lucide-react';

const propertyTypes = ['Apartment', 'Villa', 'Townhouse', 'Penthouse', 'Office', 'Retail', 'Warehouse', 'Land'];
  
const amenities = [
  'Swimming Pool', 'Gym', 'Sauna', 'Jacuzzi', 'BBQ Area', 'Kids Play Area', 
  'Security', '24/7 Concierge', 'Parking', 'Garden', 'Beach Access'
];

const features = [
  'Balcony', 'Built-in Wardrobes', 'Central A/C', 'Maids Room', 'Study Room', 
  'Walk-in Closet', 'Furnished', 'Pets Allowed', 'Shared Pool'
];

export const RegularPropertyForm = ({ category, agentData, onSubmit, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    propertyTitle: '',
    propertyDescription: '',
    propertyAddress: '',
    propertyCountry: 'UAE',
    propertyState: 'Dubai',
    propertyZip: '',
    propertyFeaturedImage: '',
    media: [],
    category: category,
    propertyType: 'Apartment',
    propertyPrice: '',
    numberOfCheques: 1,
    brokerFee: '',
    propertySize: '',
    propertyRooms: '',
    propertyBedrooms: '',
    propertyKitchen: '',
    propertyBathrooms: '',
    dldPermitNumber: '',
    dldQrCode: '',
    latitude: 25.2048,
    longitude: 55.2708,
    features: [],
    amenities: [],
    tags: [],
    // Rent-specific fields
    roiPercentage: category === 'Rent' || category === 'Commercial for Rent' ? 0 : undefined,
    // Commercial-specific
    commercialType: category.includes('Commercial') ? 'Office' : undefined
  });

  const compressImage = (imageDataURL, maxWidth = 1200) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imageDataURL;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ratio = maxWidth / img.width;
        const width = maxWidth;
        const height = img.height * ratio;
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        const compressedDataURL = canvas.toDataURL('image/jpeg', 0.7);
        resolve(compressedDataURL);
      };
    });
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setFormData({
        ...formData,
        [name]: value === '' ? '' : Number(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleCheckboxChange = (e, list) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setFormData({
        ...formData,
        [list]: [...formData[list], value]
      });
    } else {
      setFormData({
        ...formData,
        [list]: formData[list].filter(item => item !== value)
      });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const compressedImage = await compressImage(reader.result);
          setFormData({
            ...formData,
            propertyFeaturedImage: compressedImage
          });
        } catch (error) {
          console.error("Error compressing image:", error);
          setError("Error processing image. Please try a smaller image.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMediaUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      try {
        const newMedia = [];
        
        for (const file of files) {
          const result = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = async () => {
              try {
                const compressedImage = await compressImage(reader.result);
                resolve(compressedImage);
              } catch (err) {
                reject(err);
              }
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
          
          newMedia.push(result);
        }
        
        setFormData({
          ...formData,
          media: [...formData.media, ...newMedia]
        });
      } catch (error) {
        console.error("Error processing images:", error);
        setError("Error processing images. Please try smaller images.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (!agentData) {
        throw new Error('Agent data not available');
      }
      
      // Validate images
      if (!formData.propertyFeaturedImage) {
        throw new Error('Featured image is required');
      }
      
      // Create the property data to send
      const propertyData = {
        ...formData,
        agent: agentData._id // Use the agent's ID to link the property to this agent
      };
      
      // Log the size of the request for debugging
      const jsonSize = JSON.stringify(propertyData).length / (1024 * 1024);
      console.log(`Request size: ${jsonSize.toFixed(2)} MB`);
      
      if (jsonSize > 45) {
        throw new Error('Request size too large. Please use smaller images or fewer images.');
      }

      onSubmit(propertyData);
    } catch (error) {
      console.error('Error preparing property data:', error);
      setError(error.message || 'An error occurred while preparing the property data');
      setLoading(false);
    }
  };

  const isCommercial = category.includes('Commercial');
  const isRent = category === 'Rent' || category === 'Commercial for Rent';

  const commercialTypes = [
    'Office', 'Retail', 'Warehouse', 'Industrial', 
    'Shop', 'Showroom', 'Land', 'Hotel'
  ];
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* General Information */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">General Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Title*
              </label>
              <input
                type="text"
                name="propertyTitle"
                value={formData.propertyTitle}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Address*
              </label>
              <input
                type="text"
                name="propertyAddress"
                value={formData.propertyAddress}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country*
              </label>
              <input
                type="text"
                name="propertyCountry"
                value={formData.propertyCountry}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State/Emirate*
              </label>
              <input
                type="text"
                name="propertyState"
                value={formData.propertyState}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ZIP/Postal Code*
              </label>
              <input
                type="text"
                name="propertyZip"
                value={formData.propertyZip}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Description*
              </label>
              <textarea
                name="propertyDescription"
                value={formData.propertyDescription}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        
        {/* Property Details */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Property Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {isCommercial && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Commercial Type*
                </label>
                <select
                  name="commercialType"
                  value={formData.commercialType}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {commercialTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Type*
              </label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (AED)*
              </label>
              <input
                type="number"
                name="propertyPrice"
                value={formData.propertyPrice}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {isRent && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Cheques*
                </label>
                <input
                  type="number"
                  name="numberOfCheques"
                  value={formData.numberOfCheques}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            
            {isRent && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ROI Percentage
                </label>
                <input
                  type="number"
                  name="roiPercentage"
                  value={formData.roiPercentage}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Broker Fee (%)*
              </label>
              <input
                type="number"
                name="brokerFee"
                value={formData.brokerFee}
                onChange={handleChange}
                required
                min="0"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Size (sq ft)*
              </label>
              <input
                type="number"
                name="propertySize"
                value={formData.propertySize}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        
        {/* Property Features */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Property Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rooms*
              </label>
              <input
                type="number"
                name="propertyRooms"
                value={formData.propertyRooms}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bedrooms*
              </label>
              <input
                type="number"
                name="propertyBedrooms"
                value={formData.propertyBedrooms}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bathrooms*
              </label>
              <input
                type="number"
                name="propertyBathrooms"
                value={formData.propertyBathrooms}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kitchen*
              </label>
              <input
                type="number"
                name="propertyKitchen"
                value={formData.propertyKitchen}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Features
              </label>
              <div className="grid grid-cols-2 gap-2">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`feature-${feature}`}
                      value={feature}
                      checked={formData.features.includes(feature)}
                      onChange={(e) => handleCheckboxChange(e, 'features')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`feature-${feature}`} className="ml-2 text-sm text-gray-700">
                      {feature}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Amenities
              </label>
              <div className="grid grid-cols-2 gap-2">
                {amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`amenity-${amenity}`}
                      value={amenity}
                      checked={formData.amenities.includes(amenity)}
                      onChange={(e) => handleCheckboxChange(e, 'amenities')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`amenity-${amenity}`} className="ml-2 text-sm text-gray-700">
                      {amenity}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Legal Information */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Legal Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                DLD Permit Number*
              </label>
              <input
                type="text"
                name="dldPermitNumber"
                value={formData.dldPermitNumber}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                DLD QR Code URL*
              </label>
              <input
                type="text"
                name="dldQrCode"
                value={formData.dldQrCode}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        
        {/* Media */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Media</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Featured Image*
              </label>
              <div className="mt-1 flex items-center">
                <div className="flex-shrink-0 h-24 w-24 border border-gray-300 rounded-md overflow-hidden bg-gray-100">
                  {formData.propertyFeaturedImage ? (
                    <img 
                      src={formData.propertyFeaturedImage} 
                      alt="Featured" 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-400">
                      <Upload size={24} />
                    </div>
                  )}
                </div>
                <label className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Media
              </label>
              <div className="mt-1 flex items-center">
                <label className="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                  Upload Multiple
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleMediaUpload}
                    className="sr-only"
                  />
                </label>
              </div>
              
              {formData.media.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {formData.media.map((image, index) => (
                    <div key={index} className="h-20 w-20 border border-gray-300 rounded-md overflow-hidden">
                      <img 
                        src={image} 
                        alt={`Media ${index + 1}`} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save size={18} className="mr-2" />
                Save Property
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}; 