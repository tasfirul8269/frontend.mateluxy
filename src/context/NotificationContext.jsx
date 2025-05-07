import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper function to format relative time
  const getRelativeTime = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  };

  // Fetch notifications from API
  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to get from API first
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/notifications`, {
          method: 'GET',
          credentials: 'include',
        });
        
        if (response.ok) {
          const data = await response.json();
          const formattedNotifications = data.map(notification => ({
            ...notification,
            time: getRelativeTime(notification.createdAt)
          }));
          
          setNotifications(formattedNotifications);
          setUnreadCount(formattedNotifications.filter(n => !n.read).length);
          // Store in localStorage as fallback
          localStorage.setItem('adminNotifications', JSON.stringify(formattedNotifications));
          return;
        }
      } catch (err) {
        console.error('Failed to fetch notifications from API:', err);
      }
      
      // Fallback to localStorage if API fails
      const storedNotifications = localStorage.getItem('adminNotifications');
      if (storedNotifications) {
        const parsedNotifications = JSON.parse(storedNotifications);
        setNotifications(parsedNotifications);
        setUnreadCount(parsedNotifications.filter(n => !n.read).length);
      } else {
        // If nothing in storage, use demo data
        const demoNotifications = [
          { id: 1, type: 'property', action: 'added', message: 'New property added', time: '2 min ago', read: false },
          { id: 2, type: 'agent', action: 'updated', message: 'Agent profile updated', time: '1 hour ago', read: false },
          { id: 3, type: 'property', action: 'deleted', message: 'Property has been deleted', time: '2 hours ago', read: true },
        ];
        
        setNotifications(demoNotifications);
        setUnreadCount(demoNotifications.filter(n => !n.read).length);
      }
    } catch (err) {
      setError('Failed to load notifications');
      console.error('Error in fetchNotifications:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch notifications on mount and set up polling
  useEffect(() => {
    fetchNotifications();
    
    // Poll for new notifications every minute
    const intervalId = setInterval(fetchNotifications, 60000);
    
    return () => clearInterval(intervalId);
  }, [fetchNotifications]);

  // Add a new notification
  const addNotification = async (notification) => {
    try {
      const newNotification = {
        id: Date.now(),
        time: 'just now',
        read: false,
        createdAt: new Date().toISOString(),
        ...notification
      };
      
      // Try to save to API
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/notifications`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(newNotification),
        });
        
        if (response.ok) {
          const savedNotification = await response.json();
          setNotifications(prev => [
            { ...savedNotification, time: 'just now' },
            ...prev
          ]);
        } else {
          // If API fails, still add to local state
          setNotifications(prev => [newNotification, ...prev]);
        }
      } catch (err) {
        // If API fails, still add to local state
        console.error('Failed to save notification to API:', err);
        setNotifications(prev => [newNotification, ...prev]);
      }
      
      // Update local storage
      const updatedNotifications = [newNotification, ...notifications];
      localStorage.setItem('adminNotifications', JSON.stringify(updatedNotifications));
      
      // Update unread count
      setUnreadCount(prev => prev + 1);
      
      return newNotification;
    } catch (err) {
      console.error('Error adding notification:', err);
      setError('Failed to add notification');
    }
  };

  // Mark a notification as read
  const markAsRead = async (notificationId) => {
    try {
      // Update local state first for responsiveness
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, read: true } 
            : notification
        )
      );
      
      setUnreadCount(prev => Math.max(0, prev - 1));
      
      // Try to update in API
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/api/admin/notifications/${notificationId}/read`, {
          method: 'PUT',
          credentials: 'include',
        });
      } catch (err) {
        console.error('Failed to mark notification as read in API:', err);
      }
      
      // Update localStorage
      const updatedNotifications = notifications.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true } 
          : notification
      );
      localStorage.setItem('adminNotifications', JSON.stringify(updatedNotifications));
      
    } catch (err) {
      console.error('Error marking notification as read:', err);
      setError('Failed to update notification');
      // Revert the change if there was an error
      fetchNotifications();
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      // Update local state first for responsiveness
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, read: true }))
      );
      
      setUnreadCount(0);
      
      // Try to update in API
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/api/admin/notifications/read-all`, {
          method: 'PUT',
          credentials: 'include',
        });
      } catch (err) {
        console.error('Failed to mark all notifications as read in API:', err);
      }
      
      // Update localStorage
      const updatedNotifications = notifications.map(notification => ({ ...notification, read: true }));
      localStorage.setItem('adminNotifications', JSON.stringify(updatedNotifications));
      
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
      setError('Failed to update notifications');
      // Revert the change if there was an error
      fetchNotifications();
    }
  };

  // Create notification for property events
  const notifyPropertyChange = (action, propertyName) => {
    let message = '';
    
    switch (action) {
      case 'added':
        message = `New property "${propertyName}" has been added`;
        break;
      case 'updated':
        message = `Property "${propertyName}" has been updated`;
        break;
      case 'deleted':
        message = `Property "${propertyName}" has been deleted`;
        break;
      default:
        message = `Property "${propertyName}" has been ${action}`;
    }
    
    return addNotification({
      type: 'property',
      action,
      message
    });
  };

  // Create notification for agent events
  const notifyAgentChange = (action, agentName) => {
    let message = '';
    
    switch (action) {
      case 'added':
        message = `New agent "${agentName}" has been added`;
        break;
      case 'updated':
        message = `Agent "${agentName}" profile has been updated`;
        break;
      case 'deleted':
        message = `Agent "${agentName}" has been removed`;
        break;
      default:
        message = `Agent "${agentName}" has been ${action}`;
    }
    
    return addNotification({
      type: 'agent',
      action,
      message
    });
  };

  return (
    <NotificationContext.Provider 
      value={{ 
        notifications,
        unreadCount,
        loading,
        error,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        notifyPropertyChange,
        notifyAgentChange
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider; 