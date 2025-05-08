import React, { useState } from 'react';

const ContactForm = ({ property }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    privacyConsent: false,
    marketingConsent: false,
    propertyId: property?._id || '',
    propertyTitle: property?.propertyTitle || ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      ...formState,
      propertyInfo: {
        id: property?._id,
        title: property?.propertyTitle
      }
    };
    console.log('Form submitted:', submissionData);
    alert(`Thank you for your interest in ${property?.propertyTitle || 'this property'}! We will contact you shortly.`);
  };

  return (
    <div className="bg-white rounded-[30px] border border-[#e6e6e6] p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {property ? `Contact about ${property.propertyTitle}` : 'Get a special offer'}
      </h2>
      
      <p className="text-gray-600 mb-6">
        {property ? 
          `Get more information about this ${property.propertyType}` : 
          'We will call you back within an hour with more information'
        }
      </p>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Hidden property fields */}
          <input type="hidden" name="propertyId" value={formState.propertyId} />
          <input type="hidden" name="propertyTitle" value={formState.propertyTitle} />
          
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formState.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-[10px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          
          <div>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formState.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-[10px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          
          <div className="flex items-center gap-2">
            <select 
              name="countryCode"
              className="w-auto px-2 py-3 rounded-[10px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              defaultValue={property?.propertyCountry === 'UAE' ? '+971' : '+1'}
            >
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+971">🇦🇪 +971</option>
            </select>
            
            <input
              type="tel"
              name="phone"
              placeholder="(201) 555-0123"
              value={formState.phone}
              onChange={handleChange}
              className="flex-1 px-4 py-3 rounded-[10px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              name="privacyConsent"
              id="privacyConsent"
              checked={formState.privacyConsent}
              onChange={handleChange}
              className="mt-1"
              required
            />
            <label htmlFor="privacyConsent" className="text-sm text-gray-600">
              By accepting and providing my personal information I am consenting to Metropolitan Group <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>, the applicable data protection laws and <a href="#" className="text-blue-500 hover:underline">Terms of Use</a>.
            </label>
          </div>
          
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              name="marketingConsent"
              id="marketingConsent"
              checked={formState.marketingConsent}
              onChange={handleChange}
              className="mt-1"
            />
            <label htmlFor="marketingConsent" className="text-sm text-gray-600">
              I agree to receive information about offers, deals and services from this website (optional).
            </label>
          </div>
          
          <button
            type="submit"
            className="cursor-pointer w-full bg-blue-400 hover:bg-blue-500 text-white py-3 px-6 rounded-[15px] transition-colors font-medium"
          >
            {property ? 'Request Property Details' : 'Get a consultation'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;