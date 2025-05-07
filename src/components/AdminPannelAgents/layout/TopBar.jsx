import React, { useState } from 'react';
import { Bell, Search, Plus, LogOut, Settings, User } from 'lucide-react';
import Button from '../ui/Button';
import { useAgents } from '../context/AgentContext';
import { useNotifications } from '../../../context/NotificationContext';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
  const navigate = useNavigate();
  const { openAddAgentModal, searchAgents } = useAgents();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const { currentAdmin, logout } = useAdminAuth();
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);

  const handleSearch = (e) => {
    searchAgents(e.target.value);
  };

  const handleNotificationClick = (id) => {
    markAsRead(id);
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate('/admin-login');
    }
  };

  return (
    <div className="bg-white px-4 md:px-6 py-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="lg:hidden">
            <svg viewBox="0 0 100 100" className="w-8 h-8">
              <path d="M50 0 L100 30 L100 70 L50 100 L0 70 L0 30 Z" fill="#e11d48" />
              <path d="M20 40 L50 20 L80 40 L80 60 L50 80 L20 60 Z" fill="white" />
            </svg>
          </div>
          <div className="hidden lg:block">
            <h1 className="text-xl font-semibold">Agents</h1>
          </div>
          <div className="hidden lg:block relative">
            <input 
              type="text"
              placeholder="Search agent..."
              onChange={handleSearch}
              className="ml-6 pl-10 pr-4 py-2 bg-[#F8F9FD] border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-64"
            />
            <Search size={16} className="absolute left-9 top-2.5 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full"
          >
            <Search size={20} />
          </button>

          <div className="hidden lg:block">
            <Button
              variant="primary"
              onClick={openAddAgentModal}
              className="bg-red-600 hover:bg-red-700"
            >
              Add Agent
            </Button>
          </div>

          {/* Notification Icon with Dropdown */}
          <div className="relative">
            <button 
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full relative"
              onClick={() => {
                setNotificationDropdownOpen(!notificationDropdownOpen);
                setProfileDropdownOpen(false);
              }}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {notificationDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20 border border-gray-200">
                <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-800">Notifications</h3>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllAsRead}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                        onClick={() => handleNotificationClick(notification.id)}
                      >
                        <div className="flex items-start cursor-pointer">
                          <div className={`rounded-full p-2 ${notification.type === 'property' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                            {notification.type === 'property' ? <Bell size={16} /> : <User size={16} />}
                          </div>
                          <div className="ml-3 flex-1">
                            <p className={`text-sm ${!notification.read ? 'font-medium text-gray-800' : 'text-gray-600'}`}>
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">No notifications</div>
                  )}
                </div>
                <div className="p-2 border-t border-gray-200 bg-gray-50">
                  <button className="w-full p-2 text-xs font-medium text-center text-gray-600 hover:text-gray-800">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Admin Profile with Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setProfileDropdownOpen(!profileDropdownOpen);
                setNotificationDropdownOpen(false);
              }}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-yellow-400 border-2 border-white">
                <img
                  src={currentAdmin?.profileImage || "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-gray-800">{currentAdmin?.fullName || 'Admin User'}</div>
                <div className="text-xs text-gray-500">{currentAdmin?.email || 'admin@example.com'}</div>
              </div>
            </button>

            {/* Profile Dropdown */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-lg z-20 border border-gray-200">
                <a href="/admin-profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <User size={16} className="mr-2" />
                  My Profile
                </a>
                <a href="/admin-settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <Settings size={16} className="mr-2" />
                  Settings
                </a>
                <div className="border-t border-gray-100 my-1"></div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <div className="lg:hidden mt-4">
          <input
            type="text"
            placeholder="Search agent..."
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 bg-[#F8F9FD] border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <Search size={16} className="absolute left-7 top-[4.2rem] text-gray-400" />
        </div>
      )}

      <button
        onClick={openAddAgentModal}
        className="lg:hidden fixed right-4 bottom-20 w-14 h-14 flex items-center justify-center bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors"
      >
        <Plus size={24} />
      </button>
    </div>
  );
};

export default TopBar;