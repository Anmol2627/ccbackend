import React, { createContext, useContext, useState, useCallback } from 'react';
import { toast } from 'sonner';

const NotificationContext = createContext();

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    const newNotification = {
      id: `notif${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...notification
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast based on type
    switch (notification.type) {
      case 'sos':
        toast.error(notification.title, {
          description: notification.message,
          duration: 10000
        });
        break;
      case 'success':
        toast.success(notification.title, {
          description: notification.message
        });
        break;
      case 'warning':
        toast.warning(notification.title, {
          description: notification.message
        });
        break;
      default:
        toast.info(notification.title, {
          description: notification.message
        });
    }
    
    return newNotification.id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const sendSOSNotification = useCallback((incident) => {
    return addNotification({
      type: 'sos',
      title: `${incident.type} Emergency`,
      message: `${incident.distance}m away - ${incident.victim.name} needs help`,
      data: incident
    });
  }, [addNotification]);

  const sendHelperNotification = useCallback((helper, status) => {
    return addNotification({
      type: 'info',
      title: 'Helper Update',
      message: `${helper.name} ${status}`,
      data: helper
    });
  }, [addNotification]);

  const sendBadgeNotification = useCallback((badge, points) => {
    return addNotification({
      type: 'success',
      title: '🎉 Badge Unlocked!',
      message: `You earned "${badge.name}" and +${points} points!`,
      data: { badge, points }
    });
  }, [addNotification]);

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    sendSOSNotification,
    sendHelperNotification,
    sendBadgeNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}
