import React, { useState, useEffect } from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TopNav({ onMenuClick }) {
  const [agentData, setAgentData] = useState(null);

  useEffect(() => {
    const fetchAgentData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/agents/auth-status`, {
          credentials: 'include',
        });
        
        if (res.ok) {
          const data = await res.json();
          setAgentData(data);
        }
      } catch (error) {
        console.error('Error fetching agent data:', error);
      }
    };
    
    fetchAgentData();
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 sticky top-0 z-10">
      <div className="flex-1 flex items-center">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-md text-gray-500 hover:bg-gray-100 lg:hidden"
        >
          <Menu size={20} />
        </button>
        
        <div className="hidden lg:flex items-center ml-4 relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-md text-gray-500 hover:bg-gray-100 relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        {agentData && (
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
              {agentData.profileImage ? (
                <img 
                  src={agentData.profileImage} 
                  alt={agentData.fullName} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 text-sm font-semibold">
                  {agentData.fullName?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700 hidden lg:inline-block">
              {agentData.fullName}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}