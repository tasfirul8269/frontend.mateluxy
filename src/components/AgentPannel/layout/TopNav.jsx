import React, { useState, useEffect } from 'react';
import { Menu, Bell } from 'lucide-react';
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
    <div className="flex items-center justify-between py-3 px-4 lg:px-6 border-b border-gray-200 bg-white">
      {/* Mobile menu toggle button */}
      <button
        onClick={onMenuClick}
        className="p-2 rounded-md text-gray-500 hover:bg-gray-100 lg:hidden"
      >
        <Menu size={20} />
      </button>
      
      {/* Right side with notifications and profile */}
      <div className="flex items-center space-x-4 ml-auto">
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
    </div>
  );
}