import { formatDistanceToNow } from 'date-fns';

// Maximum number of notifications to store
const MAX_NOTIFICATIONS = 50;

// API URL from environment
const API_URL = import.meta.env.VITE_API_URL || '';

// Notification types and their configurations
export const NOTIFICATION_TYPES = {
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
  console.log(`Adding notification: ${type} - ${message}`);
  
  try {
    // Prepare the notification data
    const notificationData = {
      type,
      message,
      entityId,
      entityName
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
      
      // Dispatch event to notify components about the new notification
      window.dispatchEvent(new CustomEvent('notification', { 
        detail: { action: 'add', notification: createdNotification[0] }
      }));
      
      console.log("Successfully added notification to backend:", createdNotification);
      return createdNotification[0];
    } else {
      // If backend save fails, fall back to local storage
      console.warn("Failed to save notification to backend, using local storage instead");
      
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
    // Check if notifications were previously cleared
    const wasCleared = localStorage.getItem('notifications_cleared') === 'true';
    
    // Try to get notifications from backend
    const response = await fetch(`${API_URL}/api/notifications`, {
      method: 'GET',
      credentials: 'include'
    });
    
    if (response.ok) {
      const notifications = await response.json();
      
      // If we previously cleared notifications but backend returned some,
      // it means they were added after clearing or another user made changes
      if (notifications.length > 0) {
        // Reset the cleared flag
        localStorage.removeItem('notifications_cleared');
      } else if (wasCleared) {
        // If backend returned empty AND we have a cleared flag, return empty
        return [];
      }
      
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
      
      // If notifications were previously cleared, return empty array
      if (wasCleared) {
        return [];
      }
      
      // Fall back to local storage if API call fails
      const notifications = loadNotificationsFromStorage();
      return notifications.map(notification => ({
        ...notification,
        time: formatTime(notification.timestamp),
        // Ensure createdByName is preserved from local storage
        createdByName: notification.createdByName || null
      }));
    }
  } catch (error) {
    console.error("Error fetching notifications:", error);
    
    // Check if notifications were previously cleared
    const wasCleared = localStorage.getItem('notifications_cleared') === 'true';
    if (wasCleared) {
      return [];
    }
    
    // Fall back to local storage if API call fails
    const notifications = loadNotificationsFromStorage();
    return notifications.map(notification => ({
      ...notification,
      time: formatTime(notification.timestamp),
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

// Delete a notification
export const deleteNotification = async (id) => {
  try {
    // Try to delete on backend first
    const response = await fetch(`${API_URL}/api/notifications/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete notification');
    }
    
    // Update local storage as well
    const notifications = loadNotificationsFromStorage();
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    saveNotificationsToStorage(updatedNotifications);
    
    // Dispatch event to notify components
    window.dispatchEvent(new CustomEvent('notification', { 
      detail: { action: 'delete', id }
    }));
    
    return updatedNotifications;
  } catch (error) {
    console.error("Error deleting notification:", error);
    
    // Fall back to local storage update only
    const notifications = loadNotificationsFromStorage();
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    saveNotificationsToStorage(updatedNotifications);
    
    // Dispatch event to notify components
    window.dispatchEvent(new CustomEvent('notification', { 
      detail: { action: 'delete', id }
    }));
    
    return updatedNotifications;
  }
};

// Clear all notifications
export const clearAllNotifications = async () => {
  try {
    console.log("Attempting to clear all notifications from backend");
    
    // Try to clear on backend first
    const response = await fetch(`${API_URL}/api/notifications/clear-all`, {
      method: 'DELETE',
      credentials: 'include'
    });
    
    console.log("Clear all notifications response status:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Clear all error response:", errorText);
      throw new Error(`Failed to clear all notifications: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log("Clear all notifications successful:", result);
    
    // Clear local storage as well and store a flag to indicate notifications were cleared
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem('notifications_cleared', 'true');
    
    // Dispatch event to notify components
    window.dispatchEvent(new CustomEvent('notification', { 
      detail: { action: 'clearAll' }
    }));
    
    return [];
  } catch (error) {
    console.error("Error clearing all notifications:", error);
    
    // Fall back to local storage update only
    console.log("Falling back to clearing local storage only");
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem('notifications_cleared', 'true');
    
    // Dispatch event to notify components
    window.dispatchEvent(new CustomEvent('notification', { 
      detail: { action: 'clearAll' }
    }));
    
    return [];
  }
};

// Count unread notifications
export const getUnreadCount = () => {
  const notifications = loadNotificationsFromStorage();
  return notifications.filter(n => !n.read).length;
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