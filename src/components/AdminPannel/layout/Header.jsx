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
import { propertyApi } from "@/services/api";

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

export function Header({ title, searchPlaceholder, onSearch }) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const searchInputRef = useRef(null);
  const location = useLocation();
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Fetch dynamic suggestions based on current location and search value
  useEffect(() => {
    if (!searchValue || searchValue.length < 2) {
      // Don't fetch suggestions for very short queries
      setSuggestions([]);
      return;
    }
    
    const fetchSuggestions = async () => {
      setIsLoadingSuggestions(true);
      try {
        const pathname = location.pathname;
        
        if (pathname.includes("properties") || pathname === "/") {
          // Fetch property suggestions
          const properties = await propertyApi.getProperties();
          
          // Create suggestions from property titles
          const titleSuggestions = properties
            .filter(p => p.propertyTitle?.toLowerCase().includes(searchValue.toLowerCase()))
            .slice(0, 5)
            .map(p => ({ id: p._id, value: p.propertyTitle, type: "property" }));
          
          // Create suggestions from property addresses
          const addressSuggestions = properties
            .filter(p => p.propertyAddress?.toLowerCase().includes(searchValue.toLowerCase()))
            .slice(0, 3)
            .map(p => ({ id: `addr-${p._id}`, value: p.propertyAddress, type: "address" }));
          
          // Create suggestions from property types
          const typeSuggestions = [...new Set(
            properties
              .filter(p => p.propertyType?.toLowerCase().includes(searchValue.toLowerCase()))
              .map(p => p.propertyType)
          )]
            .slice(0, 3)
            .map((type, i) => ({ id: `type-${i}`, value: type, type: "type" }));
          
          // Create suggestions from locations
          const locationSuggestions = [...new Set(
            properties
              .filter(p => p.propertyState?.toLowerCase().includes(searchValue.toLowerCase()))
              .map(p => p.propertyState)
          )]
            .slice(0, 3)
            .map((location, i) => ({ id: `loc-${i}`, value: location, type: "location" }));
          
          // Combine suggestions
          setSuggestions([
            ...titleSuggestions,
            ...addressSuggestions,
            ...typeSuggestions,
            ...locationSuggestions
          ]);
        } 
        else if (pathname.includes("agents")) {
          // In a real implementation, you would fetch agents from an API
          // For now, let's use mock data
          const mockAgents = [
            { _id: "a1", fullName: "Michael Johnson", email: "michael@realestate.com", contactNumber: "+971501234567" },
            { _id: "a2", fullName: "Sarah Williams", email: "sarah@realestate.com", contactNumber: "+971509876543" },
            { _id: "a3", fullName: "Ahmed Al Mansoori", email: "ahmed@realestate.com", contactNumber: "+971504567890" },
            { _id: "a4", fullName: "Jessica Thompson", email: "jessica@realestate.com", contactNumber: "+971502345678" },
          ];
          
          // Create suggestions from agent names
          const nameSuggestions = mockAgents
            .filter(a => a.fullName?.toLowerCase().includes(searchValue.toLowerCase()))
            .map(a => ({ id: a._id, value: a.fullName, type: "name" }));
          
          // Create suggestions from agent emails
          const emailSuggestions = mockAgents
            .filter(a => a.email?.toLowerCase().includes(searchValue.toLowerCase()))
            .map(a => ({ id: `email-${a._id}`, value: a.email, type: "email" }));
          
          // Create suggestions from agent phone numbers
          const phoneSuggestions = mockAgents
            .filter(a => a.contactNumber?.includes(searchValue))
            .map(a => ({ id: `phone-${a._id}`, value: a.contactNumber, type: "phone" }));
          
          // Combine suggestions
          setSuggestions([...nameSuggestions, ...emailSuggestions, ...phoneSuggestions]);
        } 
        else if (pathname.includes("admins")) {
          // Mock admin data
          const mockAdmins = [
            { id: "ad1", fullName: "John Admin", email: "john@admin.com", username: "johnadmin" },
            { id: "ad2", fullName: "Lisa Manager", email: "lisa@admin.com", username: "lisamanager" },
            { id: "ad3", fullName: "Robert Super", email: "robert@admin.com", username: "robertsuper" },
          ];
          
          // Create suggestions from admin names
          const nameSuggestions = mockAdmins
            .filter(a => a.fullName?.toLowerCase().includes(searchValue.toLowerCase()))
            .map(a => ({ id: a.id, value: a.fullName, type: "name" }));
          
          // Create suggestions from admin emails
          const emailSuggestions = mockAdmins
            .filter(a => a.email?.toLowerCase().includes(searchValue.toLowerCase()))
            .map(a => ({ id: `email-${a.id}`, value: a.email, type: "email" }));
          
          // Create suggestions from admin usernames
          const usernameSuggestions = mockAdmins
            .filter(a => a.username?.toLowerCase().includes(searchValue.toLowerCase()))
            .map(a => ({ id: `user-${a.id}`, value: a.username, type: "username" }));
          
          // Combine suggestions
          setSuggestions([...nameSuggestions, ...emailSuggestions, ...usernameSuggestions]);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsLoadingSuggestions(false);
      }
    };
    
    // Debounce the fetch to prevent too many API calls
    const timeoutId = setTimeout(fetchSuggestions, 300);
    
    return () => clearTimeout(timeoutId);
  }, [searchValue, location.pathname]);

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
              {isLoadingSuggestions ? (
                <div className="p-4 text-center text-gray-500">
                  <div className="inline-block h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin mr-2"></div>
                  Loading suggestions...
                </div>
              ) : suggestions.length > 0 ? (
                <ul className="max-h-64 overflow-auto">
                  {suggestions.map(suggestion => (
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
                  {searchValue.length < 2 ? "Type at least 2 characters" : "No suggestions found"}
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
                      <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                      <span className="text-gray-400 text-xs mt-2 block">{notification.time}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  <p>No notifications</p>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
              <User size={18} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="mr-4 w-56">
            <div className="flex items-center px-3 py-2">
              <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                <User size={20} className="text-gray-600" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Admin User</span>
                <span className="text-xs text-gray-500">admin@realestate.com</span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Settings size={16} className="mr-2" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 cursor-pointer">
              <LogOut size={16} className="mr-2" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}