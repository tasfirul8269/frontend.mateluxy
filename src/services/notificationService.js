import { formatDistanceToNow } from 'date-fns';

// Maximum number of notifications to store
const MAX_NOTIFICATIONS = 50;

// API URL from environment
const API_URL = import.meta.env.VITE_API_URL || '';

// Notification types and their configurations
export const NOTIFICATION_TYPES = {
  // Property notifications
  PROPERTY_ADDED: {
    icon: '🏠',
    color: 'bg-green-500',
    title: 'New Property Added'
  },
  PROPERTY_UPDATED: {
    icon: '🔄',
    color: 'bg-blue-500',
    title: 'Property Updated'
  },
  PROPERTY_DELETED: {
    icon: '🗑️',
    color: 'bg-red-500',
    title: 'Property Deleted'
  },
  
  // Agent notifications
  AGENT_ADDED: {
    icon: '👤',
    color: 'bg-green-500',
    title: 'New Agent Added'
  },
  AGENT_UPDATED: {
    icon: '🔄',
    color: 'bg-blue-500',
    title: 'Agent Updated'
  },
  AGENT_DELETED: {
    icon: '🗑️',
    color: 'bg-red-500',
    title: 'Agent Deleted'
  },
  
  // Admin notifications
  ADMIN_ADDED: {
    icon: '👑',
    color: 'bg-green-500',
    title: 'New Admin Added'
  },
  ADMIN_UPDATED: {
    icon: '🔄',
    color: 'bg-blue-500',
    title: 'Admin Updated'
  },
  ADMIN_DELETED: {
    icon: '🗑️',
    color: 'bg-red-500',
    title: 'Admin Deleted'
  },
  
  // System notifications
  SYSTEM: {
    icon: '⚙️',
    color: 'bg-gray-500',
    title: 'System Notification'
  }
};

// Storage key for notifications (fallback for offline mode)
const STORAGE_KEY = 'admin_notifications';

// Load notifications from local storage (fallback for offline mode)
const loadNotificationsFromStorage = () => {
  try {
    const savedNotifications = localStorage.getItem(STORAGE_KEY);
    return savedNotifications ? JSON.parse(savedNotifications) : [];
  } catch (error) {
    console.error('Error loading notifications from storage:', error);
    return [];
  }
};

// Save notifications to local storage (fallback for offline mode)
const saveNotificationsToStorage = (notifications) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  } catch (error) {
    console.error('Error saving notifications to storage:', error);
  }
};

// Generate a unique ID for notifications
const generateId = () => `n_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Format time for display
const formatTime = (timestamp) => {
  try {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  } catch (error) {
    return 'Just now';
  }
};

// Add a new notification
export const addNotification = async (type, message, entityId = null, entityName = null) => {
  if (!type || !message) {
    console.error('Invalid notification: type and message are required');
    return null;
  }
  
  console.log(`Adding notification: ${type} - ${message}`);
  
  try {
    // Prepare the notification data
    const notificationData = {
      type,
      message,
      entityId: entityId || null,
      entityName: entityName || null
    };
    
    // Try to save to the backend first
    const response = await fetch(`${API_URL}/api/notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(notificationData),
    });
    
    if (response.ok) {
      // If successful, get the created notification from the response
      const createdNotification = await response.json();
      
      // Get the first notification if an array is returned (multiple recipients)
      const mainNotification = Array.isArray(createdNotification) ? 
        createdNotification[0] : createdNotification;
      
      // Dispatch event to notify components about the new notification
      window.dispatchEvent(new CustomEvent('notification', { 
        detail: { action: 'add', notification: mainNotification }
      }));
      
      console.log("Successfully added notification to backend:", mainNotification);
      return mainNotification;
    } else {
      // If backend save fails, fall back to local storage
      console.warn("Failed to save notification to backend, using local storage instead");
      const errorText = await response.text();
      console.error("Backend error:", errorText);
      
      // Fall back to local storage
      const notifications = loadNotificationsFromStorage();
      const typeConfig = NOTIFICATION_TYPES[type] || NOTIFICATION_TYPES.SYSTEM;
      
      const newNotification = {
        id: generateId(),
        type,
        title: typeConfig.title,
        message,
        icon: typeConfig.icon,
        color: typeConfig.color,
        timestamp: new Date().toISOString(),
        read: false,
        entityId,
        entityName,
        // When using local storage, we don't have the admin ID, so we mark as system-generated
        createdByName: 'System'
      };
      
      // Add to beginning of array and limit the size
      const updatedNotifications = [newNotification, ...notifications].slice(0, MAX_NOTIFICATIONS);
      saveNotificationsToStorage(updatedNotifications);
      
      // Dispatch event to notify components about the new notification
      window.dispatchEvent(new CustomEvent('notification', { 
        detail: { action: 'add', notification: newNotification }
      }));
      
      return newNotification;
    }
  } catch (error) {
    console.error("Error in addNotification:", error);
    
    // Fallback to local storage in case of any error
    const notifications = loadNotificationsFromStorage();
    const typeConfig = NOTIFICATION_TYPES[type] || NOTIFICATION_TYPES.SYSTEM;
    
    const newNotification = {
      id: generateId(),
      type,
      title: typeConfig.title,
      message,
      icon: typeConfig.icon,
      color: typeConfig.color,
      timestamp: new Date().toISOString(),
      read: false,
      entityId,
      entityName,
      // When using local storage, we don't have the admin ID, so we mark as system-generated
      createdByName: 'System'
    };
    
    // Add to beginning of array and limit the size
    const updatedNotifications = [newNotification, ...notifications].slice(0, MAX_NOTIFICATIONS);
    saveNotificationsToStorage(updatedNotifications);
    
    // Dispatch event to notify components about the new notification
    window.dispatchEvent(new CustomEvent('notification', { 
      detail: { action: 'add', notification: newNotification }
    }));
    
    return newNotification;
  }
};

// Get all notifications
export const getNotifications = async () => {
  try {
    // Try to get notifications from backend
    const response = await fetch(`${API_URL}/api/notifications`, {
      method: 'GET',
      credentials: 'include'
    });
    
    if (response.ok) {
      const notifications = await response.json();
      
      console.log(`Received ${notifications.length} notifications from backend`);
      
      // Format time strings for display
      const formattedNotifications = notifications.map(notification => ({
        ...notification,
        id: notification._id, // Map MongoDB _id to id for consistency
        time: formatTime(notification.createdAt || notification.timestamp),
        // Ensure createdByName is preserved
        createdByName: notification.createdByName || null,
        // Ensure the full admin object isn't lost when saving to local storage
        createdBy: typeof notification.createdBy === 'object' ? 
          { fullName: notification.createdBy.fullName, _id: notification.createdBy._id } : 
          notification.createdBy
      }));
      
      // Also save to local storage as backup
      saveNotificationsToStorage(formattedNotifications);
      
      return formattedNotifications;
    } else {
      console.warn("Failed to fetch notifications from backend, using local storage");
      
      // Fall back to local storage if API call fails
      const notifications = loadNotificationsFromStorage();
        
      return notifications.map(notification => ({
        ...notification,
        time: formatTime(notification.timestamp || notification.createdAt),
        // Ensure createdByName is preserved from local storage
        createdByName: notification.createdByName || null
      }));
    }
  } catch (error) {
    console.error("Error fetching notifications:", error);
    
    // Fall back to local storage if API call fails
    const notifications = loadNotificationsFromStorage();
      
    return notifications.map(notification => ({
      ...notification,
      time: formatTime(notification.timestamp || notification.createdAt),
      // Ensure createdByName is preserved from local storage
      createdByName: notification.createdByName || null
    }));
  }
};

// Mark a notification as read
export const markAsRead = async (id) => {
  try {
    // Try to update on backend first
    const response = await fetch(`${API_URL}/api/notifications/${id}/read`, {
      method: 'PUT',
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error('Failed to mark notification as read');
    }
    
    // Update local storage as well
    const notifications = loadNotificationsFromStorage();
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    saveNotificationsToStorage(updatedNotifications);
    
    // Dispatch event to notify components
    window.dispatchEvent(new CustomEvent('notification', { 
      detail: { action: 'markAsRead', id }
    }));
    
    return updatedNotifications;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    
    // Fall back to local storage update only
    const notifications = loadNotificationsFromStorage();
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    saveNotificationsToStorage(updatedNotifications);
    
    // Dispatch event to notify components
    window.dispatchEvent(new CustomEvent('notification', { 
      detail: { action: 'markAsRead', id }
    }));
    
    return updatedNotifications;
  }
};

// Mark all notifications as read
export const markAllAsRead = async () => {
  try {
    // Try to update on backend first
    const response = await fetch(`${API_URL}/api/notifications/mark-all-read`, {
      method: 'PUT',
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error('Failed to mark all notifications as read');
    }
    
    // Update local storage as well
    const notifications = loadNotificationsFromStorage();
    const updatedNotifications = notifications.map(notification => 
      ({ ...notification, read: true })
    );
    saveNotificationsToStorage(updatedNotifications);
    
    // Dispatch event to notify components
    window.dispatchEvent(new CustomEvent('notification', { 
      detail: { action: 'markAllAsRead' }
    }));
    
    return updatedNotifications;
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    
    // Fall back to local storage update only
    const notifications = loadNotificationsFromStorage();
    const updatedNotifications = notifications.map(notification => 
      ({ ...notification, read: true })
    );
    saveNotificationsToStorage(updatedNotifications);
    
    // Dispatch event to notify components
    window.dispatchEvent(new CustomEvent('notification', { 
      detail: { action: 'markAllAsRead' }
    }));
    
    return updatedNotifications;
  }
};

// Count unread notifications
export const getUnreadCount = () => {
  try {
    // Get notifications from local storage
    const notifications = loadNotificationsFromStorage();
    return notifications.filter(n => !n.read).length;
  } catch (error) {
    console.error("Error getting unread count:", error);
    return 0;
  }
};

// Sample function to create some initial notifications (for testing)
export const createSampleNotifications = async () => {
  console.log("Checking if sample notifications need to be created");
  
  try {
    // Check if there are any notifications in the system
    const existingNotifications = await getNotifications();
    console.log("Existing notifications:", existingNotifications);
    
    if (existingNotifications.length === 0) {
      console.log("Creating sample notifications");
      
      // Add sample notifications - these will show the current admin as the creator
      // since they're created through the API
      const propNotification = await addNotification(
        'PROPERTY_ADDED',
        'Example: A new luxury villa was added in Downtown Dubai',
        'prop_123',
        'Luxury Villa'
      );
      
      const agentNotification = await addNotification(
        'AGENT_UPDATED',
        'Example: Agent John Smith updated their profile',
        'agent_456',
        'John Smith'
      );
      
      const adminNotification = await addNotification(
        'ADMIN_ADDED',
        'Example: New administrator Sarah Johnson joined the team',
        'admin_789',
        'Sarah Johnson'
      );
      
      return true;
    } else {
      console.log("Sample notifications already exist, not creating new ones");
      return false;
    }
  } catch (error) {
    console.error("Error in createSampleNotifications:", error);
    return false;
  }
}; 