import React, { useState, useRef, useEffect } from "react";
import { Search, Bell, User, LogOut, Settings, X } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/AdminPannel/ui/dropdown-menu";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/AdminPannel/ui/popover";
import { Button } from "@/components/AdminPannel/ui/button";
import { toast } from "@/components/AdminPannel/ui/sonner";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

const NOTIFICATIONS = [
  {
    id: "n1",
    title: "New property listed",
    message: "A new property was added in Downtown area",
    time: "2 minutes ago",
    read: false
  },
  {
    id: "n2",
    title: "Agent request approved",
    message: "Janet Miller is now an approved agent",
    time: "1 hour ago",
    read: false
  },
  {
    id: "n3",
    title: "Weekly report",
    message: "Your weekly performance report is ready",
    time: "Yesterday",
    read: true
  },
];

const PROPERTY_SUGGESTIONS = [
  { id: "ps1", value: "Modern Waterfront Villa", type: "property" },
  { id: "ps2", value: "Luxury Downtown Apartment", type: "property" },
  { id: "ps3", value: "Dubai Marina", type: "location" },
  { id: "ps4", value: "Palm Jumeirah", type: "location" },
];

const AGENT_SUGGESTIONS = [
  { id: "as1", value: "Michael Johnson", type: "name" },
  { id: "as2", value: "Sarah Williams", type: "name" },
  { id: "as3", value: "info@realestate.com", type: "email" },
  { id: "as4", value: "+971501234567", type: "phone" },
];

const ADMIN_SUGGESTIONS = [
  { id: "ad1", value: "John Admin", type: "name" },
  { id: "ad2", value: "Lisa Manager", type: "name" },
  { id: "ad3", value: "admin@realestate.com", type: "email" },
  { id: "ad4", value: "Super Admin", type: "role" },
];

export function Header({ title, searchPlaceholder, onSearch }) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchInputRef = useRef(null);
  const location = useLocation();
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const getSuggestions = () => {
    const pathname = location.pathname;
    if (pathname === "/agents") return AGENT_SUGGESTIONS;
    if (pathname === "/admins") return ADMIN_SUGGESTIONS;
    return PROPERTY_SUGGESTIONS;
  };

  const filteredSuggestions = getSuggestions().filter(
    suggestion => suggestion.value.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchValue);
    setShowSuggestions(false);
    if (searchValue.trim()) {
      toast.success(`Searching for "${searchValue}"`);
    }
  };

  const handleSelectSuggestion = (value) => {
    setSearchValue(value);
    onSearch(value);
    setShowSuggestions(false);
    toast.success(`Searching for "${value}"`);
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    toast.success("All notifications marked as read");
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchInputRef.current && !searchInputRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 py-3 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">{title}</h1>

      <div className="flex items-center space-x-3 sm:space-x-6">
        <div className="relative">
          <form 
            onSubmit={handleSearchSubmit}
            className={cn(
              "relative flex items-center transition-all duration-300 bg-gray-100 rounded-full overflow-hidden",
              isSearchFocused 
                ? 'w-40 sm:w-64 md:w-80 ring-2 ring-red-500' 
                : 'w-40 sm:w-48 hover:bg-gray-200'
            )}
          >
            <Search 
              size={18} 
              className="absolute left-3 text-gray-500" 
            />
            <input
              ref={searchInputRef}
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={handleSearchChange}
              className="w-full py-2 pl-10 pr-4 bg-transparent text-sm outline-none text-gray-700"
              onFocus={() => {
                setIsSearchFocused(true);
                if (searchValue) setShowSuggestions(true);
              }}
              onBlur={() => setIsSearchFocused(false)}
            />
            {searchValue && (
              <button
                type="button"
                onClick={() => {
                  setSearchValue('');
                  setShowSuggestions(false);
                }}
                className="absolute right-3 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </form>

          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden z-50 animate-fade-in">
              {filteredSuggestions.length > 0 ? (
                <ul className="max-h-64 overflow-auto">
                  {filteredSuggestions.map(suggestion => (
                    <li 
                      key={suggestion.id}
                      onClick={() => handleSelectSuggestion(suggestion.value)}
                      className="px-4 py-2 hover:bg-red-50 cursor-pointer flex items-center justify-between"
                    >
                      <span>{suggestion.value}</span>
                      <span className="text-xs text-gray-500 capitalize">{suggestion.type}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No suggestions found
                </div>
              )}
            </div>
          )}
        </div>

        <Popover open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
          <PopoverTrigger asChild>
            <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 mr-4" align="end">
            <div className="flex items-center justify-between p-3 border-b border-gray-100">
              <h3 className="font-medium">Notifications</h3>
              {unreadCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={markAllAsRead}
                  className="text-sm font-normal h-8"
                >
                  Mark all as read
                </Button>
              )}
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={cn(
                      "p-3 border-b border-gray-100 flex items-start hover:bg-gray-50 transition-colors",
                      notification.read ? "opacity-70" : "bg-red-50/50"
                    )}
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <button 
                          onClick={() => dismissNotification(notification.id)} 
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                      <span className="text-xs text-gray-400 mt-1 block">{notification.time}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center">
                  <p className="text-gray-500 text-sm">No notifications</p>
                </div>
              )}
            </div>
            {notifications.length > 0 && (
              <div className="p-2 border-t border-gray-100">
                <Button variant="ghost" size="sm" className="w-full text-sm">
                  View all notifications
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-3 hover:bg-gray-100 p-1 px-2 rounded-full transition-colors">
              <div className="h-8 w-8 bg-red-600 rounded-full text-white flex items-center justify-center text-sm font-medium">
                JD
              </div>
              <span className="text-sm font-medium text-gray-700 hidden md:inline">John Doe</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Edit Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Security</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer text-red-600 focus:text-red-600"
              onClick={() => toast.success("Logout successful!")}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}