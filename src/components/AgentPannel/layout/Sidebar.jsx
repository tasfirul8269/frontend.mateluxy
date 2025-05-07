import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LogOut, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar({ isOpen }) {
  const location = useLocation();
  const [agentData, setAgentData] = useState(null);
  const [propertyCount, setPropertyCount] = useState(0);

  // Function to fetch agent properties and update count
  const fetchAgentProperties = async (agentId) => {
    try {
      const propertiesRes = await fetch(`${import.meta.env.VITE_API_URL}/api/properties?agent=${agentId}`, {
        credentials: 'include',
      });
      
      if (propertiesRes.ok) {
        const propertiesData = await propertiesRes.json();
        
        // Filter properties to include only those added by this agent
        const agentProperties = propertiesData.filter(property => property.agent === agentId);
        
        // Set the count of properties added by this agent
        setPropertyCount(agentProperties.length);
        console.log("Agent properties count:", agentProperties.length);
      }
    } catch (error) {
      console.error('Error fetching agent properties:', error);
    }
  };

  // Fetch agent data when component mounts
  useEffect(() => {
    const fetchAgentData = async () => {
      try {
        // Get agent data
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/agents/auth-status`, {
          credentials: 'include',
        });
        
        if (res.ok) {
          const data = await res.json();
          setAgentData(data);
          
          // Fetch properties for this agent
          await fetchAgentProperties(data._id);
        }
      } catch (error) {
        console.error('Error fetching agent data:', error);
      }
    };
    
    fetchAgentData();
  }, []);

  // Update property count when location changes (e.g., after adding a property)
  useEffect(() => {
    if (agentData?._id) {
      fetchAgentProperties(agentData._id);
    }
  }, [location.pathname, agentData]);

  const handleLogout = async () => {
    try {
      document.cookie = 'agent_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      window.location.href = '/agent-login';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <aside
      className={cn(
        'bg-white border-r border-gray-200 w-64 h-full transition-all duration-300 ease-in-out fixed lg:static z-10',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <span className={cn('text-xl font-semibold text-gray-800', !isOpen && 'lg:hidden')}>
            Agent Panel
          </span>
          {!isOpen && (
            <span className="hidden lg:block text-xl font-semibold text-gray-800">AP</span>
          )}
        </div>

        {agentData && (
          <div className="flex flex-col items-center py-4 border-b border-gray-200">
            <div className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden mb-2">
              {agentData.profileImage ? (
                <img 
                  src={agentData.profileImage} 
                  alt={agentData.fullName} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 text-xl font-semibold">
                  {agentData.fullName?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            {isOpen && (
              <>
                <h3 className="text-sm font-semibold text-gray-800">{agentData.fullName}</h3>
                <p className="text-xs text-gray-500">{agentData.email}</p>
              </>
            )}
          </div>
        )}

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            <li>
              <Link
                to="/agent-pannel/properties"
                className={cn(
                  'flex items-center px-3 py-2 rounded-md transition-colors',
                  location.pathname.includes('/agent-pannel/properties')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <Home size={20} />
                {isOpen && <span className="ml-3">Properties</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/agent-pannel/add-property"
                className={cn(
                  'flex items-center px-3 py-2 rounded-md transition-colors',
                  location.pathname.includes('/agent-pannel/add-property')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <PlusCircle size={20} />
                {isOpen && <span className="ml-3">Add Property</span>}
              </Link>
            </li>
          </ul>
        </nav>

        {isOpen && (
          <div className="p-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-600 font-medium">My Listings</p>
                <p className="text-lg font-semibold text-gray-800">{propertyCount}</p>
              </div>
            </div>
          </div>
        )}

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-sm text-red-600 rounded-md hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            {isOpen && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
} 