import { useState, useRef, useEffect } from 'react';
import { FaSort } from 'react-icons/fa';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useSearchParams } from 'react-router-dom';

const FilterDropdown = ({ onFilterChange }) => {
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Define all filter options
  const filterOptions = [
    { label: 'Most Recent', value: 'recent' },
    { label: 'Highest Price', value: 'price-desc' },
    { label: 'Lowest Price', value: 'price-asc' },
    { label: 'Most Bedrooms', value: 'bedrooms-desc' },
    { label: 'Least Bedrooms', value: 'bedrooms-asc' }
  ];

  // Get current sort from URL or default to 'recent'
  const currentSort = searchParams.get('sort') || 'recent';
  const currentFilterLabel = filterOptions.find(opt => opt.value === currentSort)?.label || 'Most Recent';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle filter selection
  const handleFilterSelect = (filterValue, filterLabel) => {
    setIsOpen(false);
    if (onFilterChange) {
      onFilterChange(filterValue); // Updates URL in parent (Buy.js)
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2.5 bg-white text-gray-800 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200 hover:border-red-200 min-w-[180px] justify-between"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          <FaSort className="mr-2 text-red-500 text-sm" />
          <span className="font-medium text-sm">{currentFilterLabel}</span>
        </div>
        <RiArrowDropDownLine 
          className={`text-gray-600 text-2xl transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div 
          className="absolute z-50 mt-1 w-full origin-top-right bg-white rounded-lg shadow-md border border-gray-100"
          role="menu"
        >
          <div className="py-1">
            {filterOptions.map((option) => (
              <div
                key={option.value}
                className={`flex items-center px-4 py-2 text-sm hover:bg-gray-50 transition-colors cursor-pointer ${
                  option.value === currentSort ? 'text-red-600 font-medium' : 'text-gray-700'
                }`}
                onClick={() => handleFilterSelect(option.value, option.label)}
                role="menuitem"
              >
                {option.value === currentSort && (
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2"></div>
                )}
                <span className={option.value === currentSort ? 'ml-0' : 'ml-3.5'}>
                  {option.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;