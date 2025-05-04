import React from 'react';

export const PriceRangeSelector = ({ minPrice, maxPrice, onChange }) => {
  const priceOptions = [
    { value: null, label: 'Min Price' },
    { value: 500000, label: 'AED 500K' },
    { value: 1000000, label: 'AED 1M' },
    { value: 2000000, label: 'AED 2M' },
    { value: 3000000, label: 'AED 3M' },
    { value: 5000000, label: 'AED 5M' },
    { value: 10000000, label: 'AED 10M' },
    { value: 20000000, label: 'AED 20M' },
  ];
  
  const maxPriceOptions = [
    { value: null, label: 'Max Price' },
    { value: 1000000, label: 'AED 1M' },
    { value: 2000000, label: 'AED 2M' },
    { value: 3000000, label: 'AED 3M' },
    { value: 5000000, label: 'AED 5M' },
    { value: 10000000, label: 'AED 10M' },
    { value: 20000000, label: 'AED 20M' },
    { value: 50000000, label: 'AED 50M' },
  ].filter(option => option.value === null || option.value > (minPrice || 0));
  
  return (
    <div className="price-selector grid grid-cols-2 gap-2 ">
      <select
        value={minPrice?.toString() || ''}
        onChange={(e) => {
          const newValue = e.target.value ? parseInt(e.target.value) : null;
          onChange(newValue, maxPrice);
        }}
        className="min-price text-sm"
      >
        {priceOptions.map((option) => (
          <option 
            key={`min-${option.value || 'null'}`} 
            value={option.value || ''}
          >
            {option.label}
          </option>
        ))}
      </select>
      
      <select
        value={maxPrice?.toString() || ''}
        onChange={(e) => {
          const newValue = e.target.value ? parseInt(e.target.value) : null;
          onChange(minPrice, newValue);
        }}
        className="max-price text-sm"
      >
        {maxPriceOptions.map((option) => (
          <option 
            key={`max-${option.value || 'null'}`} 
            value={option.value || ''}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};