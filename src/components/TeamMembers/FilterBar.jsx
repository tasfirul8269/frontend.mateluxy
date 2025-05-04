import React from 'react';
import { Search, Filter } from 'lucide-react';

const FilterBar = ({
  searchTerm,
  setSearchTerm,
  selectedDepartment,
  setSelectedDepartment,
  selectedLanguage,
  setSelectedLanguage,
  departments,
  languages
}) => {
  return (
    <div className="bg-white rounded-[20px] border border-[#e6e6e6] pt-[20px] pr-[20px] pl-[20px] pb-[20px] mb-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 mb-4 md:mb-0 md:mr-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search team members..."
              className="w-full h-[50px] pl-10 pr-4 py-2 border  border-[#e6e6e6] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#256fff] focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:flex md:items-center">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
            <select 
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full h-[50px] pl-10 pr-4 py-2 border border-[#e6e6e6] rounded-[10px] appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department === 'All' ? 'All Departments' : department}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full h-[50px] pl-10 pr-4 py-2 border border-gray-300 rounded-[10px] appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {languages.map((language) => (
                <option key={language} value={language}>
                  {language === 'All' ? 'All Languages' : language}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;