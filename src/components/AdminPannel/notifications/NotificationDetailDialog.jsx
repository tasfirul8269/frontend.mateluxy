import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/AdminPannel/ui/dialog";
import { Button } from "@/components/AdminPannel/ui/button";
import { formatDistanceToNow } from "date-fns";
import { markAsRead } from "@/services/notificationService";
import { toast } from "sonner";

// Icons for notification types
const NOTIFICATION_ICONS = {
  PROPERTY_ADDED: '🏠',
  PROPERTY_UPDATED: '🔄',
  PROPERTY_DELETED: '🗑️',
  AGENT_ADDED: '👤',
  AGENT_UPDATED: '🔄',
  AGENT_DELETED: '🗑️',
  ADMIN_ADDED: '👑',
  ADMIN_UPDATED: '🔄',
  ADMIN_DELETED: '🗑️',
  SYSTEM: '⚙️'
};

export function NotificationDetailDialog({ notification, open, onOpenChange, onNotificationChange }) {
  if (!notification) return null;
  
  // Format the time
  const formattedTime = notification.createdAt 
    ? formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })
    : notification.time || 'Recently';
  
  // Get appropriate icon
  const icon = notification.icon || NOTIFICATION_ICONS[notification.type] || '📣';
  
  // Format entity type from notification type (e.g., PROPERTY_ADDED -> Property)
  const getEntityType = () => {
    if (!notification.type) return 'Item';
    
    const parts = notification.type.split('_');
    if (parts.length > 0) {
      return parts[0].charAt(0) + parts[0].slice(1).toLowerCase();
    }
    
    return 'Item';
  };
  
  const entityType = getEntityType();
  
  // Format action type from notification type (e.g., PROPERTY_ADDED -> added)
  const getActionType = () => {
    if (!notification.type) return 'modified';
    
    const parts = notification.type.split('_');
    if (parts.length > 1) {
      return parts[1].toLowerCase();
    }
    
    return 'modified';
  };
  
  const actionType = getActionType();
  
  // Handle the "Mark as Read" button click
  const handleMarkAsRead = async () => {
    if (!notification.read) {
      try {
        await markAsRead(notification.id);
        toast.success("Notification marked as read");
        
        // Call the parent component's callback to update the notification list
        if (onNotificationChange) {
          onNotificationChange();
        }
      } catch (error) {
        console.error("Error marking notification as read:", error);
        toast.error("Failed to mark notification as read");
      }
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white sm:max-w-[500px] p-0">
        <DialogHeader className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{icon}</div>
            <DialogTitle className="text-xl">{notification.title || `${entityType} ${actionType}`}</DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="p-6 space-y-4">
          <p className="text-gray-700 text-lg">{notification.message}</p>
          
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Time:</span>
              <span className="text-sm font-medium">{formattedTime}</span>
            </div>
            
            {notification.entityName && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">{entityType}:</span>
                <span className="text-sm font-medium">{notification.entityName}</span>
              </div>
            )}
            
            {(notification.createdByName || notification.createdBy) && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">By Admin:</span>
                <span className="text-sm font-medium">
                  {notification.createdByName || 
                   (typeof notification.createdBy === 'object' && notification.createdBy.fullName) || 
                   'Unknown Admin'}
                </span>
              </div>
            )}
            
            {notification.read !== undefined && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Status:</span>
                <span className={`text-sm font-medium ${notification.read ? 'text-gray-600' : 'text-blue-600'}`}>
                  {notification.read ? 'Read' : 'Unread'}
                </span>
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter className="p-4 border-t">
          <Button onClick={() => onOpenChange(false)} variant="outline">
            Close
          </Button>
          {!notification.read && (
            <Button onClick={handleMarkAsRead} variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
              Mark as Read
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 