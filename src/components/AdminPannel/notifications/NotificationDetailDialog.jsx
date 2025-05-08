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
import { cn } from "@/lib/utils";

// Helper function to get notification color class based on type
const getNotificationColorClass = (notification) => {
  if (!notification || !notification.type) return "bg-gray-100 text-gray-500";
  
  // Get the entity type from the notification type (e.g., PROPERTY_ADDED -> PROPERTY)
  const type = notification.type.split('_')[0]; 
  
  switch (type) {
    case 'PROPERTY':
      return "bg-green-100 text-green-600";
    case 'AGENT':
      return "bg-blue-100 text-blue-600";
    case 'ADMIN':
      return "bg-purple-100 text-purple-600";
    case 'SYSTEM':
      return "bg-gray-100 text-gray-600";
    default:
      return "bg-gray-100 text-gray-500";
  }
};

// Get notification title based on type
const getNotificationTitle = (notification) => {
  if (notification.title) return notification.title;
  
  if (!notification.type) return "Notification";
  
  const parts = notification.type.split('_');
  if (parts.length !== 2) return "Notification";
  
  const entity = parts[0].charAt(0) + parts[0].slice(1).toLowerCase();
  const action = parts[1].charAt(0) + parts[1].slice(1).toLowerCase();
  
  return `${entity} ${action}`;
};

// Get appropriate icon for notification
const getNotificationIcon = (notification) => {
  if (notification.icon) return notification.icon;
  
  if (!notification.type) return "📢";
  
  const type = notification.type.split('_')[0];
  const action = notification.type.split('_')[1];
  
  // Default icons based on entity type and action
  switch (type) {
    case 'PROPERTY':
      return action === 'ADDED' ? "🏠" : (action === 'DELETED' ? "🗑️" : "🔄");
    case 'AGENT':
      return action === 'ADDED' ? "👤" : (action === 'DELETED' ? "🗑️" : "🔄");
    case 'ADMIN':
      return action === 'ADDED' ? "👑" : (action === 'DELETED' ? "🗑️" : "🔄");
    default:
      return "📢";
  }
};

export function NotificationDetailDialog({ notification, open, onOpenChange, onNotificationChange }) {
  if (!notification) return null;
  
  // Format the time
  const formattedTime = notification.createdAt 
    ? formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })
    : notification.time || 'Recently';
  
  // Get appropriate icon
  const icon = getNotificationIcon(notification);
  
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
      <DialogContent className="bg-white sm:max-w-[500px] p-0 overflow-hidden">
        <DialogHeader className={cn("p-6 border-b", getNotificationColorClass(notification).replace("bg-", "bg-opacity-20 bg-"))}>
          <div className="flex items-center gap-3">
            <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-2xl", getNotificationColorClass(notification))}>
              {icon}
            </div>
            <div>
              <DialogTitle className="text-xl">
                {getNotificationTitle(notification)}
              </DialogTitle>
              <p className="text-xs text-gray-500 mt-1">
                {formattedTime}
              </p>
            </div>
          </div>
        </DialogHeader>
        
        <div className="p-6 space-y-4">
          <p className="text-gray-700 text-lg leading-relaxed">{notification.message}</p>
          
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
            
            {notification.entityId && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">ID:</span>
                <span className="text-sm font-medium text-gray-800 font-mono">{notification.entityId}</span>
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
                <span className={`text-sm font-medium flex items-center ${notification.read ? 'text-gray-600' : 'text-blue-600'}`}>
                  {notification.read ? 'Read' : 'Unread'}
                  {!notification.read && <span className="w-2 h-2 bg-blue-500 rounded-full ml-2"></span>}
                </span>
              </div>
            )}
            
            {notification.type && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Type:</span>
                <span className="text-sm font-medium font-mono">{notification.type}</span>
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