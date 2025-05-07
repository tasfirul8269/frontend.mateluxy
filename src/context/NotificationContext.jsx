import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch notifications on mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Function to fetch notifications from API
  const fetchNotifications = async () => {
    try {
      // Replace with actual API call when implemented
      // For now, we'll use mock data
      const mockNotifications = [
        { id: 1, type: 'property', action: 'added', message: 'New property added', time: '2 min ago', read: false },
        { id: 2, type: 'agent', action: 'updated', message: 'Agent profile updated', time: '1 hour ago', read: false },
        { id: 3, type: 'property', action: 'deleted', message: 'Property has been deleted', time: '2 hours ago', read: true },
      ];
      
      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter(n => !n.read).length);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  // Add a new notification
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      time: 'just now',
      read: false,
      ...notification
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  // Mark a notification as read
  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true } 
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
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
    
    addNotification({
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
    
    addNotification({
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